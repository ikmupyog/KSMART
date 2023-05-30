import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect,useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToEditTrade, convertToResubmitTrade, convertToTrade, convertToUpdateTrade, stringToBoolean } from "../../../utils";
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
      applicationNumber={props.data?.Licenses[0]?.applicationNumber}
      info={props.isSuccess ? props.t("TL_REF_NO_LABEL") : ""}
      successful={props.isSuccess}
    />
  );
};

const TLAcknowledgement = ({ data, onSuccess }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade")
  const mutation = Digit.Hooks.tl.useTradeLicenseAPI(
    data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : data?.tenantId,
    isRenewTrade
  );
  const mutation1 = Digit.Hooks.tl.useTradeLicenseAPI(
    data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : data?.tenantId,
    false
  );
  const mutation2 = Digit.Hooks.tl.useTradeLicenseAPI(
    data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : data?.tenantId,
    false
  );
  const isEdit = window.location.href.includes("renew-trade");
  //const isEdit= data?.TradeDetails?.workflowCode==="RenewalTL" ? true :false;
  const isRenewalEdit=data?.TradeDetails?.workflowCode==="RenewalTL" ? true :false
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");
  let isDirectRenewal = sessionStorage.getItem("isDirectRenewal") ? stringToBoolean(sessionStorage.getItem("isDirectRenewal")) : null;
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [resubmitnew, setResubmitnew] = useState(false);
  useEffect(() => {
    if (isInitialRender) {
    const onSuccessedit = () => {
      setMutationHappened(true);
      setResubmitnew(false);
    };
    try {
      setIsInitialRender(false);
      let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
      data.tenantId = tenantId1;
      if (!resubmit || resubmitnew) {
        saveAppln();
      }
      else {
        let formdata = convertToResubmitTrade(data);
        formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
        !mutation2.isLoading && !mutation2.isSuccess &&!mutationHappened && mutation2.mutate(formdata, {
          onSuccessedit,
        })

      }
    } catch (err) {
    }
  }
  }, [fydata,isInitialRender,resubmitnew]);

  function saveAppln(){
    let formdata = !isRenewalEdit ? convertToTrade(data) : convertToEditTrade(data?.TradeDetails)   //(data, fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "TL") : []);
    formdata.Licenses[0].tenantId = formdata?.Licenses[0]?.tenantId || tenantId1;
    if(!isEdit)
    {
      mutation.mutate(formdata, {
        onSuccess,
      })
    }
    else{
      if((fydata["egf-master"] && fydata["egf-master"].FinancialYear.length > 0 && isDirectRenewal))
      {
        mutation2.mutate(formdata, {
          onSuccess,
        })
      }
      else
      {
        mutation1.mutate(formdata, {
          onSuccess,
        })
      }
    }
  }

  useEffect(() => {
    if (mutation.isSuccess || (mutation1.isSuccess && isEdit && !isDirectRenewal)) {
      try {
        let Licenses = !isEdit ? convertToUpdateTrade(mutation.data, data) : convertToUpdateTrade(mutation1.data, data);
        mutation2.mutate(Licenses, {
          onSuccess,
        });
      }
      catch (er) {
      }
    }
  }, [mutation.isSuccess, mutation1.isSuccess]);
  function setResubmit(){
    setResubmitnew(true);
    setIsInitialRender(true);
    setMutationHappened(false);
  }
  // const handleDownloadPdf = async () => {
  //   const { Licenses = [] } = mutation.data || mutation1.data || mutation2.data;
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
    const Licensedata = rearrangeAcknowledgment(License);
    const TLack = await Digit.PaymentService.generatePdf(tenantId, { Licenses: Licensedata }, "tlacknowledgment");
    const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLack.filestoreIds[0] });
    window.open(fileStore[TLack.filestoreIds[0]], "_blank");
  };
  function rearrangeAcknowledgment(application) {
    if (application.applicationNumber) {
      let tenantIdV = application.tenantId;

      let applicationNumberV = application.applicationNumber;
      let applicationDateV = convertEpochToDateDMY(application.applicationDate);
     
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
      
      ((application?.tradeLicenseDetail?.applicationDocuments !== [])||(application?.tradeLicenseDetail?.applicationDocuments !== null)) ? application?.tradeLicenseDetail?.applicationDocuments?.map((doc)=>{
        applicationDocuments += doc?.documentType === "" ? doc?.documentType : ", " + doc?.documentType
      }) : [];
      let fileStoreId = application?.fileStoreId;
      let serviceV = application?.applicationType === "NEW" ? "IFTE & OS New License" : application?.applicationType === "RENEWAL" ? "IFTE & OS Renewal License" : "";
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

  let enableLoader = !resubmit ? (!isEdit ? mutation.isIdle || mutation.isLoading : isDirectRenewal ? false : mutation1.isIdle || mutation1.isLoading):false;
  if(enableLoader)
  {return (<Loader />)}
  else if( ((mutation?.isSuccess == false && mutation?.isIdle == false) || (mutation1?.isSuccess == false && mutation1?.isIdle == false )) && !isDirectRenewal && !resubmit)
  {
    return (
    <Card>
      <BannerPicker t={t} data={mutation.data || mutation1.data} isSuccess={mutation.isSuccess || mutation1.isSuccess} isLoading={(mutation?.isLoading || mutation1?.isLoading)} />
      {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
      <div><CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")} </CardText><SubmitBar label={t("TL_RESUBMIT")} onSubmit={setResubmit} /></div>
      <Link to={`/digit-ui/citizen`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
      
    </Card>)
  }
  else if(mutation2.isLoading || mutation2.isIdle ){
    return (<Loader />)
  }
  else
  return(
    <Card>
      <BannerPicker t={t} data={mutation2.data} isSuccess={mutation2.isSuccess} isLoading={(mutation2.isIdle || mutation2.isLoading)} />
      {(mutation2.isSuccess) && <CardText>{!isDirectRenewal?t("TL_FILE_TRADE_RESPONSE"):t("TL_FILE_TRADE_RESPONSE_DIRECT_REN")}</CardText>}
      {(!mutation2.isSuccess) && <div><CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")} </CardText><SubmitBar label={t("TL_RESUBMIT")} onSubmit={setResubmit} /></div>}
      {!isEdit && mutation2.isSuccess && <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={handleDownloadPdf} />}
      {(mutation2.isSuccess) && isEdit && (
        <LinkButton
          label={
            <div className="response-download-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("TL_DOWNLOAD_ACK_FORM")}</span>
            </div>
          }
          //style={{ width: "100px" }}
          onClick={handleDownloadPdf}
        />)}
        
      {mutation2?.data?.Licenses[0]?.status === "PENDINGPAYMENT" && <Link to={{
        pathname: `/digit-ui/citizen/payment/collect/${mutation2.data.Licenses[0].businessService}/${mutation2.data.Licenses[0].applicationNumber}`,
        state: { tenantId: mutation2.data.Licenses[0].tenantId },
      }}>
        <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
      </Link>}
      <Link to={`/digit-ui/citizen`}>
        <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default TLAcknowledgement;
