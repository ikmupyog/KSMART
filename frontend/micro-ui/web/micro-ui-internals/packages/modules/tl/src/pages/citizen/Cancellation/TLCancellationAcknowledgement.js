import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToTradeCorrection } from "../../../utils";
import getPDFData from "../../../utils/getTLAcknowledgementData";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_SUCCESS");
  } else if (props.isLoading) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_FAILED") : t("CS_TRADE_UPDATE_APPLICATION_FAILED");
  }
};

const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.LicenseCorrection[0]?.applicationNumber}
      info={props.isSuccess ? props.t("TL_REF_NO_LABEL") : ""}
      successful={props.isSuccess}
    />
  );
};

const TLCancellationAcknowledgement = ({ data, datanew, onSuccess }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade")
  const mutation = Digit.Hooks.tl.useTradeLicenseCorrectionAPI(
    data?.tenantId,
    isRenewTrade
  );
  
  const isEdit = window.location.href.includes("renew-trade");
  //const isEdit= data?.TradeDetails?.workflowCode==="RenewalTL" ? true :false;
  const isRenewalEdit=data?.TradeDetails?.workflowCode==="RenewalTL" ? true :false
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    if (isInitialRender) {
    
    const onSuccessedit = () => {
      setMutationHappened(true);
    };
    try {
      setIsInitialRender(false);
      //let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
     // data.tenantId = tenantId1;
      if (!resubmit) {
         let formdata =  convertToTradeCorrection(data,datanew.TradeDetails);   
      //  formdata.LicenseCorrection[0].tenantId = formdata?.LicenseCorrection[0]?.tenantId || tenantId1;
        if(!isEdit)
        {
          mutation.mutate(formdata, {
            onSuccess,
          })
        }
      } 
    } catch (err) {
    }
  }
  }, [isInitialRender]);

  useEffect(() => {
    if (mutation.isSuccess ) {
      try {
        let Licenses =  convertToUpdateTrade(mutation.data, data) ;
      }
      catch (er) {
      }
    }
  }, [mutation.isSuccess]);

  const handleDownloadPdf = async () => {
    const { Licenses = [] } = mutation.data ;
    const License = (Licenses && Licenses[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };

  let enableLoader = !resubmit ? (mutation.isIdle || mutation.isLoading ):false;
  if(enableLoader)
  {return (<Loader />)}
  else if(mutation.isLoading || mutation.isIdle ){
    return (<Loader />)
  }
  else if( ((mutation?.isSuccess == true && mutation?.isIdle == false) ))
  {
    return (
    <Card>
      <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation.isIdle || mutation.isLoading)} />
      {(mutation.isSuccess) && <CardText>{t("TL_FILE_TRADE_RESPONSE")}</CardText>}
      {(!mutation.isSuccess) && <CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>}
      <Link to={`/digit-ui/citizen`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>)
  }
};

export default TLCancellationAcknowledgement;
