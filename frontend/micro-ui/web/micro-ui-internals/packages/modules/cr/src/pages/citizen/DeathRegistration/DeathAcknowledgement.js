import {Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToDeathRegistration,convertToEditDeathRegistration} from "../../../utils/deathindex";
import getPDFData from "../../../utils/getCRDeathAcknowledgementData";
// import getPDFData from "../../../utils/getTLAcknowledgementData";
import { useHistory } from "react-router-dom";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");
    // !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  if (props.isSuccess && sessionStorage.getItem("CR_DEATH_EDIT_FLAG")) {
    //console.log(JSON.stringify(props));
    sessionStorage.setItem("applicationNumber", props.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo);
    // console.log(sessionStorage.getItem("applicationNumber"));
    // if (sessionStorage.getItem("applicationNumber") != null) {
    //   window.location.assign(`${window.location.origin}/digit-ui/employee/cr/application-details/${sessionStorage.getItem("applicationNumber")}`);
    // }
    return (
      <Banner
        message={GetActionMessage(props)}
       // applicationNumber={props.data?.deathCertificateDtls[0]?.applicationNumber}
       applicationNumber={props.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  } else {
    return (
      <Banner
        message={GetActionMessage(props)}
       // applicationNumber={props.data?.deathCertificateDtls[0]?.applicationNumber}
       applicationNumber={props.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }


};

const DeathAcknowledgement = ({ data, onSuccess, userType }) => {
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
  //console.log(sessionStorage.getItem("CR_BIRTH_EDIT_FLAG"));
  const [isEditDeath, setIsEditDeath] = useState(sessionStorage.getItem("CR_DEATH_EDIT_FLAG") ? true : false);

  let applicationNumber = sessionStorage.getItem("applicationNumber") != null ? sessionStorage.getItem("applicationNumber") : null;
  // console.log(applicationNumber);
  //console.log("isEditBirth" + isEditBirth);
  //const mutation = Digit.Hooks.cr.useCivilRegistrationAPI(tenantId, isEditDeath ? false : true  );
  const mutation = Digit.Hooks.cr.useCivilRegistrationDeathAPI(tenantId, isEditDeath ? false : true);
  // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_CREATE_DEATH_REG", {});
  // const [editParams, seEditParams, clearEditParams] = Digit.Hooks.useSessionStorage("CR_EDIT_DEATH_REG", {});
  // useEffect(()=>{
  //   clearParams()
  //   clearEditParams()
  // },[mutation?.data])
  useEffect(() => {
    if (isInitialRender && applicationNumber === null) {
      // const onSuccessedit = () => {
      //   setMutationHappened(true);
      // };
      try {
        setIsInitialRender(false);
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
          let formdata = !isEditDeath ? convertToDeathRegistration(data) : convertToEditDeathRegistration(data);
          // formdata.BirthDetails[0].tenantId = formdata?.BirthDetails[0]?.tenantId || tenantId1;
          // if (!isEditBirth) {
          //   mutation.mutate(formdata, {
          //     onSuccess,
          //   })
          // } else {
          mutation.mutate(formdata, {
            onSuccess,
          })
          // }
          // else{
          //   if((fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal))
          //   {
          //     mutation2.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          //   else
          //   {
          //     mutation1.mutate(formdata, {
          //       onSuccess,
          //     })
          //   }
          // }

          // !isEditBirth ? mutation.mutate(formdata, {
          //   onSuccess,
          // }) : (fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal ? mutation2.mutate(formdata, {
          //   onSuccess,
          // }) :mutation1.mutate(formdata, {
          //   onSuccess,
          // }));
        } else {
          // let formdata = convertToResubmitTrade(data);
          // formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
          // !mutation2.isLoading && !mutation2.isSuccess &&!mutationHappened && mutation2.mutate(formdata, {
          //   onSuccessedit,
          // })

        }
      } catch (err) {
      }
    }
    // else {
    //   history.push(`/digit-ui/citizen`)
    // }
  }, [mutation]);

  useEffect(() => {
    //console.log(mutation.data);
    if (mutation.isSuccess) {
      //console.log(mutation.data?.ChildDetails[0].applicationNumber);
      applicationNumber = mutation.data?.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo;
      sessionStorage.setItem("applicationNumber", applicationNumber);
      //console.log(applicationNumber);
    } else {
      applicationNumber = null;
    }
  }, [mutation.isSuccess]);

  const handleDownloadPdf = async () => {
    const { deathCertificateDtls = [] } = mutation.data
    const ChildDet = (deathCertificateDtls && deathCertificateDtls[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === ChildDet.tenantid);
    console.log(tenantInfo);
    let res = ChildDet;
    console.log(res);
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };

  let enableLoader = (mutation.isIdle || mutation.isLoading);
  console.log(JSON.stringify(mutation.data));
  if (enableLoader) {
    if (mutation?.isLoading === false && mutation?.isSuccess === false && mutation?.isError == false && mutation?.isIdle === true && applicationNumber != null) {
      return (
        <Card>
          <Link to={`/digit-ui/citizen`}>
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
        {/* {<CardText>{t("CR_DEATH_CREATION_FAILED_RESPONSE")}</CardText>} */}
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>)
  }
  else
    console.log(JSON.stringify(mutation));
    if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false) {
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
         
          {mutation?.data?.deathCertificateDtls[0]?.applicationStatus === "PENDINGPAYMENT" && <Link to={{
            pathname: `/digit-ui/citizen/payment/collect/${mutation.data.deathCertificateDtls[0]?.businessService}/${mutation.data.deathCertificateDtls[0]?.InformationDeath?.DeathACKNo}`,
            state: { tenantId: mutation.data.deathCertificateDtls[0]?.InformationDeath?.TenantId },
          }}>
            <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
          </Link>}
          <Link to={`/digit-ui/citizen`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>
      );
    } else {
      return (

        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
          {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
          <Link to={`/digit-ui/citizen`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>


      );
    }

};

export default DeathAcknowledgement;
