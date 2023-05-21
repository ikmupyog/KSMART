import { Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToStillBirthRegistration,convertToEditStillBirthRegistration  } from "../../../utils/stillbirthindex";
import getPDFData from "../../../utils/getCRStillBirthAcknowledgementData";
import { useHistory } from "react-router-dom";

const GetActionMessage = (props) => {
  const [isEditStillBirth, setIsEditStillBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG") ? true : false);
  const { t } = useTranslation();
  if (props.isSuccess && isEditStillBirth === false) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isSuccess && isEditStillBirth === true) {
    return t("CR_UPDATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");  
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  const [isEditStillBirth, setIsEditStillBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG") ? true : false);
  if (props.isSuccess && sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG")) {
 //console.log(JSON.stringify(props));
    sessionStorage.setItem("applicationNumber", props.data?.StillBirthChildDetails[0]?.applicationNumber);   
      window.location.assign(`${window.location.origin}/digit-ui/employee/cr/application-stillbirth/${sessionStorage.getItem("applicationNumber")}`);   
    return (
      <Banner
        message={GetActionMessage(props)}
        applicationNumber={props.data?.StillBirthChildDetails[0]?.applicationNumber}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }else {
    return (
      <Banner
        message={GetActionMessage(props)}
        applicationNumber={props.data?.StillBirthChildDetails[0]?.applicationNumber}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }
};

const StillBirthAcknowledgement = ({ data, onSuccess, userType }) => {
  const [toast, setToast] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  //console.log(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG"));
  const [isEditStillBirth, setIsEditStilllBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG") ? true : false);
  let applicationNumber = sessionStorage.getItem("applicationNumber") != null ? sessionStorage.getItem("applicationNumber") : null;
  // console.log(applicationNumber);
  //console.log("isEditStillBirth" + isEditStillBirth);
  const mutation = Digit.Hooks.cr.useCivilRegistrationStillBirthAPI(
    tenantId, isEditStillBirth ? false : true
  );

  useEffect(() => {
    if (isInitialRender) {
      try {
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!isEditStillBirth && applicationNumber === null) {
          setIsInitialRender(false);
          let formdata = !isEditStillBirth ? convertToStillBirthRegistration(data) : convertToEditStillBirthRegistration(data);
          mutation.mutate(formdata, {
            onSuccess,
          })
        } else {
          let formdata = isEditStillBirth ? convertToEditStillBirthRegistration(data) : [];
          mutation.mutate(formdata, {
            onSuccess,
          })
          setIsInitialRender(false);
        }
      } catch (err) {
      }
    }
   
  }, [mutation]);


  useEffect(() => {
    //console.log(mutation.data);
    if (mutation.isSuccess) {    
      applicationNumber = mutation.data?.StillBirthChildDetails[0].applicationNumber;
      sessionStorage.setItem("applicationNumber", applicationNumber);      
    } else {
      applicationNumber = null;
    }
  }, [mutation.isSuccess]);
  const handleDownloadPdf = async () => {
    const { StillBirthChildDetails = [] } = mutation.data
    const ChildDet = (StillBirthChildDetails && StillBirthChildDetails[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === ChildDet.tenantid);
    console.log(tenantInfo);
    let res = ChildDet;
    //console.log(res);
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };

  let enableLoader = (mutation.isIdle || mutation.isLoading);
  // console.log(JSON.stringify(mutation));
  if (enableLoader) {
    if (mutation?.isLoading === false && mutation?.isSuccess === false && mutation?.isError == false && mutation?.isIdle === true && applicationNumber != null) {
      return (
        <Card>
          <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>
      )
    } else if (mutation.isIdle || mutation.isLoading) {
      return (<Loader />)
    }
  }
  else if (((mutation?.isSuccess == false && mutation?.isIdle == false))) {
    return (
      <Card>
      <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation?.isLoading)} />
      {/* {<CardText>{t("CR_BIRTH_CREATION_FAILED_RESPONSE")}</CardText>} */}
      {<CardText>{t("COMMON_REASON")} : {mutation?.error?.response?.data?.Errors[0]?.message}</CardText>}
      <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>)
  }
  else
 //   console.log(JSON.stringify(mutation));
 if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false && isEditStillBirth === false) {
      return (
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={(mutation.isIdle || mutation.isLoading)} />
          {/* <CardText>{!isDirectRenewal?t("Application Submitted Successfully"):t("TL_FILE_TRADE_RESPONSE_DIRECT_REN")}</CardText>
     */}
          <LinkButton
            label={
              <div className="response-download-button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </span>
                <span className="download-button">{t("Acknowledgment")}</span>
              </div>
            }
            //style={{ width: "100px" }}
            onClick={handleDownloadPdf}
          />
         
          {mutation?.data?.StillBirthChildDetails[0]?.applicationStatus === "PENDINGPAYMENT" && <Link to={{
            pathname: `/digit-ui/citizen/payment/collect/${mutation.data.StillBirthChildDetails[0].businessservice}/${mutation.data.StillBirthChildDetails[0].applicationNumber}`,
            state: { tenantId: mutation.data.StillBirthChildDetails[0].tenantid },
          }}>
            <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
          </Link>}
          <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
      );
    } else if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false && isEditStillBirth === true) {
      return (
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={(mutation.isIdle || mutation.isLoading)} />
        </Card>
      );
    } else {
      return (

        <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}        
        <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>


      );
    }

};

export default StillBirthAcknowledgement;
