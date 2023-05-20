import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToTradeCorrection } from "../../../utils";
import getPDFData from "../../../utils/getTLAcknowledgementData";
import { convertEpochToDateDMY } from "../../../utils";

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

const TLCorrectionAcknowledgement = ({ data, datanew, onSuccess }) => {
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

  // const handleDownloadPdf = async () => {
  //   const { Licenses = [] } = mutation.data ;
  //   const License = (Licenses && Licenses[0]) || {};
  //   const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
  //   let res = License;
  //   const data = getPDFData({ ...res }, tenantInfo, t);
  //   data.then((ress) => Digit.Utils.pdf.generate(ress));
  // };
  const handleDownloadPdf = async () => {
    const { Licenses = [] } = mutation.data || mutation1.data || mutation2.data;
    const License = (Licenses && Licenses[0]) || {};

    const TLackfile = License?.fileStoreId && License?.fileStoreId !== null ? { fileStoreIds: [License?.fileStoreId]} : { fileStoreIds: [] };
    const Licensedata = rearrangeAcknowledgment(License[0]);
    if(!TLackfile?.fileStoreIds?.[0]){
      const TLack = await Digit.PaymentService.generatePdf(tenantId, { Licenses: Licensedata }, "tlacknowledgment");
      TLackfile.License.fileStoreId = TLack.filestoreIds[0];
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLack.filestoreIds[0] });
      window.open(fileStore[TLack.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLackfile.fileStoreIds[0] });
      window.open(fileStore[TLackfile?.fileStoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };
  function rearrangeAcknowledgment(application) {
    if (application.applicationNumber) {
      let tenantIdV = application.tenantId;

      let applicationNumberV = application.correctionAppNumber;
      let applicationDateV = convertEpochToDateDMY(application.auditDetails.createdBy);
     
      let owners = [];
      let ownerName = "";
      application.tradeLicenseDetail.owners.map((owner, index) => {
        let address = owner?.designation ? owner?.designation + ", " : "" +
          owner.houseName ? owner.houseName + "," : '' +
            owner.street ? owner.street + "," : '' +
              owner.locality ? owner.locality + "," : '' +
                owner.postOffice ? owner.postOffice + "," : '' + "-" +
                  owner.pincode ? owner.pincode : '';



        let singleOwner = {
          name: owner.name, mobileNumber: owner.mobileNumber, emailId: owner.emailId,
          applicantNameLocal: owner.applicantNameLocal, careOf: owner.careOf, careOfName: owner.careOfName,
          designation: owner?.designation ? owner?.designation : '', address: address
        }
        owners.push(singleOwner);
        ownerName = ownerName === "" ? owner.name : (", " + owner.name);
      });

      let licenseUnitName = application?.tradeLicenseDetail?.institution?.licenseUnitId ? application?.tradeLicenseDetail?.institution?.licenseUnitId + " - " : "" +
        application?.licenseUnitName ? application?.licenseUnitName : ""
          + application?.licenseUnitNameLocal ? " ( " + application?.licenseUnitNameLocal + " ) " : "";
      let applicationDocuments = "";
      application?.tradeLicenseDetail?.applicationDocuments.map((doc)=>{
        applicationDocuments += doc?.documentType === "" ? doc?.documentType : ", " + doc?.documentType
      });
      let fileStoreId = application?.fileStoreId;
      let serviceV = "IFTE & OS License Correction";
      let finalJson =
        [{
          tenantId: tenantIdV,
          service : serviceV,
          applicationNumber: applicationNumberV,
          licenseUnitName: licenseUnitName,
          applicationDate: applicationDateV,
          tradeLicenseDetail: {
            owners: ownerName,
            address : owners[0].address,
            applicationDocuments: applicationDocuments
          },
          signedCertificate: "Efile No : "+applicationNumberV+"\nLicensee : " + ownerName + "\nUnitName : " + licenseUnitName,
          fileStoreId: fileStoreId
        }];
      return finalJson;
    }
    else {
      return [{}];
    }
  }
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
      {(mutation.isSuccess) && <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={handleDownloadPdf} />}
      <Link to={`/digit-ui/citizen`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>)
  }
};

export default TLCorrectionAcknowledgement;
