import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToStillBirthRegistration,convertToEditStillBirthRegistration  } from "../../../utils/stillbirthindex";
import getPDFData from "../../../utils/getTLAcknowledgementData";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  // console.log(JSON.stringify(props));
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.StillBirthChildDetails[0]?.applicationNumber}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};

const StillBirthAcknowledgement = ({ data, onSuccess, userType }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const [isEditStillBirth, setIsEditStillBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG")? true : false);
  
 
  const mutation = Digit.Hooks.cr.useCivilRegistrationStillBirthAPI(
    tenantId, isEditStillBirth ? false : true
  );

  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_CREATE_STILLBIRTH_REG", {});

  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
 
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    clearParams();
  }, [mutation?.data])
  useEffect(() => {
    if (isInitialRender) {
     
      try {
        setIsInitialRender(false);
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
      
          let formdata = !isEditStillBirth ? convertToStillBirthRegistration(data) : convertToEditStillBirthRegistration(data);

         
            mutation.mutate(formdata, {
              onSuccess,
            })
         
       
        } else {
    
        }
      } catch (err) {
      }
    }
  }, [mutation]);

 

  const handleDownloadPdf = async () => {
    const { Licenses = [] } = mutation.data
    const License = (Licenses && Licenses[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };
  let enableLoader = (mutation.isIdle || mutation.isLoading);
  if (enableLoader) { return (<Loader />) }
  else if (((mutation?.isSuccess == false && mutation?.isIdle == false))) {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation?.isLoading)} />
        {<CardText>{t("CR_BIRTH_CREATION_FAILED_RESPONSE")}</CardText>}
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>)
  }
 
  else
  
    if (mutation.isSuccess && mutation?.isError === null) {
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

export default StillBirthAcknowledgement;
