import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToAbandonedBirthRegistration, convertToEditAbandonedBirthRegistration } from "../../../utils/abandonedbirthindex";
import getPDFData from "../../../utils/getCRAbandonedBirthAcknowledgementData";
import { useHistory } from "react-router-dom";


const GetActionMessage = (props) => {
  const [isEditAbandonedBirth,  setIsEditAbandonedBirth] = useState(sessionStorage.getItem("CR_ABANDONEDBIRTH_EDIT_FLAG") ? true : false);
  const { t } = useTranslation();
  if (props.isSuccess && isEditAbandonedBirth === false) {
    return t("CR_CREATE_SUCCESS_MSG");
  }  if (props.isSuccess && isEditAbandonedBirth === true) {
    return t("CR_UPDATE_SUCCESS_MSG");
  } 
  else if (props.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");
    // return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  const [isEditAbandonedBirth,  setIsEditAbandonedBirth] = useState(sessionStorage.getItem("CR_ABANDONEDBIRTH_EDIT_FLAG") ? true : false);
  if (props.isSuccess && sessionStorage.getItem("CR_ABANDONEDBIRTH_EDIT_FLAG")) {
    // console.log(JSON.stringify(props));
    sessionStorage.setItem("applicationNumber", props.data?.AbandonedChildDetails[0]?.applicationNumber);
    // console.log(sessionStorage.getItem("applicationNumber"));
    // if (sessionStorage.getItem("applicationNumber") != null && props.isSuccess) {
      window.location.assign(`${window.location.origin}/digit-ui/employee/cr/application-details/${sessionStorage.getItem("applicationNumber")}`);
    // } else {
  //     sessionStorage.removeItem("applicationNumber");
  //   }
  // } else {
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.AbandonedDetails[0]?.applicationNumber}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />

  );

  } else {
    return (
      <Banner
        message={GetActionMessage(props)}
        applicationNumber={props.data?.AbandonedDetails[0]?.applicationNumber}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }
};
// console.log(props.data?.AbandonedChildDetails?.ParentsDetails?.applicationNumber);

const AbandonedBirthAcknowledgement = ({ data, onSuccess, userType }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [isEditAbandonedBirth, setIsEditAbandonedBirth] = useState(sessionStorage.getItem("CR_ABANDONEDBIRTH_EDIT_FLAG")? true : false);
  let applicationNumber = sessionStorage.getItem("applicationNumber") != null ? sessionStorage.getItem("applicationNumber") : null;
 
 
  const mutation = Digit.Hooks.cr.useCivilRegistrationAbandonedBirthAPI( tenantId ,isEditAbandonedBirth ? false : true);

// console.log(mutation);

  useEffect(() => {    
    if (isInitialRender) {
      try {     
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!isEditAbandonedBirth && applicationNumber === null) {  
          setIsInitialRender(false);
          let formdata = !isEditAbandonedBirth ? convertToAbandonedBirthRegistration(data) : convertToEditAbandonedBirthRegistration(data);    
          // let formdata = convertToAbandonedBirthRegistration(data);
            mutation.mutate(formdata, {
            onSuccess,
            })          
        }
      //    else {
      //     let formdata = isEditBirth ? convertToAbandonedBirthRegistration(data) : [];
      //     // let formdata = isEditAbandonedBirth ? convertToEditAbandonedBirthRegistration(data) : [];
      //     mutation.mutate(formdata, {
      //       onSuccess,    
      //   })
      //   setIsInitialRender(false);
      // }
      } catch (err) {
      }
    }
  }, [mutation]);
  useEffect(() => {
    //console.log(mutation.data);
    if (mutation.isSuccess) {      
      applicationNumber = mutation.data?.AbandonedDetails[0].applicationNumber;
      sessionStorage.setItem("applicationNumber", applicationNumber);
      //console.log(applicationNumber);
    } else {
      applicationNumber = null;
    }
  }, [mutation.isSuccess]);
 

  const handleDownloadPdf = async () => {
    const { AbandonedDetails = [] } = mutation.data
    const ChildDet = (AbandonedDetails && AbandonedDetails[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === ChildDet.tenantId);
    let res = ChildDet;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };
  let enableLoader = (mutation.isIdle || mutation.isLoading);
  if (enableLoader) {
  if (mutation?.isLoading === false && mutation?.isSuccess === false && mutation?.isError == false && mutation?.isIdle === true && applicationNumber != null) {
  return (
    <Card>
    <Link to={`/digit-ui/employee`}>
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
        <Link to={`/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>)
  } 
  else  
  if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false && isEditAbandonedBirth === false) {
    return (
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={(mutation.isIdle || mutation.isLoading)} />
       
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
          
            onClick={handleDownloadPdf}
          />
     
     {/* {mutation?.data?.AbandonedDetails[0]?.applicationStatus === "PENDINGPAYMENT" && <Link to={{
            pathname: `/digit-ui/employee/payment/collect/${mutation.data.AbandonedDetails[0].businessservice}/${mutation.data.AbandonedDetails[0].applicationNumber}`,
            state: { tenantId: mutation.data.AbandonedDetails[0].tenantid },
          }}>
            <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
          </Link>}
          <Link to={`/digit-ui/employee`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link> */}


        </Card>
      );
    } else {
      return (

        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
          {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
          <Link to={`/digit-ui/employee`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>


      );
    }

};

export default AbandonedBirthAcknowledgement;
