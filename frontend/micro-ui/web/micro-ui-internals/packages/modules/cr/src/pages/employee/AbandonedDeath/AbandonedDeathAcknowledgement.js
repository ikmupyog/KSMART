import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToAbandonedDeathRegistration,convertToEditAbandonedDeathRegistration } from "../../../utils/abandoneddeathindex";
import getPDFData from "../../../utils/getCRAbandonedDeathACknowledgementData";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");
    // !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    console.log("props",props)
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  // console.log(JSON.stringify(props));
  {console.log("props",props)}
  return (
    // <Banner
    //   message={GetActionMessage(props)}
    //   applicationNumber={props.data?.Licenses[0]?.applicationNumber}
    //   info={props.isSuccess ? props.t("AK-16-2023-CRDRNR-C-KOCHI-KL") : ""}
    //   successful={props.isSuccess}
    // />
   
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.deathAbandonedDtls[0]?.InformationDeathAbandoned?.DeathACKNo}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};
const AbandonedDeathAcknowledgement = ({ data, onSuccess, userType }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade");

  const [isEditAbandonedDeath, setisEditAbandonedDeath] = useState(sessionStorage.getItem("CR_DEATH_AbandonedEDIT_FLAG")? true : false);
  
  //console.log("isEditBirth" + isEditBirth);
  const mutation = Digit.Hooks.cr.useAbandonedDeathCreationAPI(
    tenantId, isEditAbandonedDeath ? false : true
  );
  let formdata = [];
  // const mutation1 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  // const mutation2 = Digit.Hooks.cr.useCivilRegistrationDeathAPI(
  //   data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId,
  //   false
  // );
  // const isEditAbandonedDeath = window.location.href.includes("renew-trade");
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  // const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");
  // let isDirectRenewal = sessionStorage.getItem("isDirectRenewal") ? stringToBoolean(sessionStorage.getItem("isDirectRenewal")) : null;
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      // const onSuccessedit = () => {
      //   setMutationHappened(true);
      // };
      try {
        setIsInitialRender(false);
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
          // let formdata = !isEdit ? convertToDeathRegistration(data) : convertToEditTrade(data, fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "CR") : []);

          formdata =  !isEditAbandonedDeath?convertToAbandonedDeathRegistration(data):
          convertToEditAbandonedDeathRegistration(data) ;
          console.log(formdata,"!isEdit? convertToAbandonedDeathRegistration(data)",data);
          // formdata.BirthDetails[0].tenantId = formdata?.BirthDetails[0]?.tenantId || tenantId1;
          
            mutation.mutate(formdata)
          
         
        } else {
          // let formdata = convertToResubmitTrade(data);
          // formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
          // !mutation2.isLoading && !mutation2.isSuccess &&!mutationHappened && mutation2.mutate(formdata, {
          //   onSuccessedit,
          // })
        }
      } catch (err) {}
    }
  }, [mutation]);

  useEffect(() => {
  formdata=[]
  }, [mutation.isSuccess]);


  const handleDownloadPdf = async () => {
    console.log("mutation.data",mutation.data)
    const { deathAbandonedDtls = [] } = mutation.data
    const License = (deathAbandonedDtls && deathAbandonedDtls[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };
  let enableLoader = mutation.isIdle || mutation.isLoading; 
  if (enableLoader) {
     if ( mutation?.isLoading === false && 
      mutation?.isSuccess === false &&
       mutation?.isError == false &&
        mutation?.isIdle === true && mutation.data?.deathAbandonedDtls[0]?.InformationDeathAbandoned?.DeathACKNo != null ) {
           return (
             <Card> 
              <Link to={`/digit-ui/citizen`}> 
              <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} /> 
              </Link> </Card> );
               }
                else if (mutation.isIdle || mutation.isLoading)
                 { return <Loader />; } 
                }  
                  else if (mutation.isSuccess && mutation?.isError === null) {
    console.log({formdata, isEditAbandonedDeath});
    if (isEditAbandonedDeath) {
      history.push(`/digit-ui/employee/cr/application-abandoneddeathdetails/${formdata.InformationDeathAbandoned["DeathACKNo"]}`);
    } else {
      return (
        <Card>
          <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={mutation.isIdle || mutation.isLoading} />
          {console.log("mutation",mutation)}
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
     
        </Card>
      );
    }
  }
  else {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {<CardText>{mutation?.error?.message}</CardText>}
        
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
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default AbandonedDeathAcknowledgement;
