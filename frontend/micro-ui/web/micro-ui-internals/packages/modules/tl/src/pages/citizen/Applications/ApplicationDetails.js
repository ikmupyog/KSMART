import {
  Card,
  CardHeader,
  Loader,
  MultiLink,
  Row,
  SubmitBar,
  Header,
  CardSubHeader,
  CardSectionHeader,
  LinkLabel,
  LinkButton,
  StatusTable,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import getPDFData from "../../../utils/getTLAcknowledgementData";
import TLWFApplicationTimeline from "../../../pageComponents/TLWFApplicationTimeline";
import TLDocument from "../../../pageComponents/TLDocumets";
import { concat, isUndefined } from "lodash";

const getAddress = (address, t) => {
  return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
    }${t(address?.locality.code)}, ${t(address?.city.code)},${t(address?.pincode) ? `${address.pincode}` : " "}`
}


const TLApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { tenantId } = useParams();
  const history = useHistory();
  const [bill, setBill] = useState(null);
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const { tenants } = storeData || {};
  let multiBoxStyle = {
    border: "groove",
    background: "#FAFAFA",
    borderRadius: "4px",
    paddingInline: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  };
  const hstyle = {
    fontSize: "20px",
    fontWeight: "500",
    color: "#2B2F3E",
    marginBottom: ".5rem",
    lineHieght: "1.5rem"

  };
  let multiHeaderStyle = { marginBottom: "10px", marginTop: "10px", color: "#505A5F" };
  //todo: hook should return object to render the data
  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.tl.useTLApplicationDetails({
    tenantId: tenantId,
    applicationNumber: id,
  });
  const [application_cert, setApplication_cert] = useState();

  // const { isLoading: PTLoading, isError: isPTError, data: PTData } = Digit.Hooks.pt.usePropertySearch(
  //   {
  //     tenantId,
  //     filters: { propertyIds: application?.[0]?.tradeLicenseDetail?.additionalDetail?.propertyId },
  //   },
  //   { enabled: application?.[0]?.tradeLicenseDetail?.additionalDetail?.propertyId ? true : false }
  // );

  useEffect(() => {
    setMutationHappened(false);
  }, [mutationHappened]);

  const { data: paymentsHistory } = Digit.Hooks.tl.useTLPaymentHistory(tenantId, id);
  if (application !== undefined && application_cert === undefined) {
    Digit.PaymentService.fetchBill(tenantId, {
      consumerCode: application[0]?.applicationNumber,
      businessService: application[0]?.businessService,
    }).then((res) => {
      setBill(res?.Bill[0]);
    });
    setApplication_cert(rearrangeApplication(application));
  }


  function rearrangeApplication(application) {
    if (application[0].applicationNumber) {
      let tenantIdV = application[0].tenantId;
      let businessServiceV = application[0].businessService;
      let licenseTypeV = application[0].licenseType;
      let applicationTypeV = application[0].applicationType;
      let licenseNumberV = application[0].licenseNumber;
      let applicationNumberV = application[0].applicationNumber;
      // let licenseUnitNameV = application[0].licenseUnitName;
      let applicationDateV = application[0].applicationDate;
      let issuedDateV = application[0].issuedDate;
      let financialYearV = application[0].financialYear;
      let validFromV = application[0].validFrom;
      let validToV = application[0].validTo;
      let commencementDateV = application[0].commencementDate;
      let structureTypeV = application[0].tradeLicenseDetail.structureType;
      let owners = [];
      application[0].tradeLicenseDetail.owners.map((owner, index) => {
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
      });
      let structurePlaceV = [];
      let tempString = "";
      if (structureTypeV === "BUILDING" || structureTypeV === "LBBUILDING") {
        application[0].tradeLicenseDetail.structurePlace.map((strutPlace, index) => {
          let tempStructurePlace = {
            doorNo: strutPlace.doorNo, doorNoSub: strutPlace.doorNoSub, stallNo: strutPlace.stallNo,
            blockNo: null, surveyNo: null, subDivisionNo: null, partitionNo: null, vehicleNo: null, vesselNo: null
          };
          if(index === 0) { 
            tempString += strutPlace?.doorNo ? strutPlace?.doorNo : "" ;
            strutPlace?.doorNoSub ? tempString += "/" + strutPlace?.doorNoSub : "";
          }
          else {
            tempString += ", " + strutPlace?.doorNo ? strutPlace?.doorNo : "";
            tempString += strutPlace?.doorNoSub ? tempString += "/" + strutPlace?.doorNoSub : "";
          }
          if((index === 0) &&(strutPlace?.stallNo)){
            tempString += ", Stall Nos : " ;
            tempString += strutPlace?.stallNo ? strutPlace?.stallNo : "";
          }  
          else{
             tempString += ", " + strutPlace?.stallNo;
          }

          structurePlaceV.push(tempStructurePlace);
        });
      }
      else if (structureTypeV === "LAND") {
        let tempStructurePlace = {
          doorNo: null, doorNoSub: null, stallNo: null,
          blockNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo,
          surveyNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo,
          subDivisionNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo,
          partitionNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo,
          vehicleNo: null, vesselNo: null
        }
        tempString += "Survey No : ";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.blockNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.surveyNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.subDivisionNo : "";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo ? " / " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.partitionNo : "";
        structurePlaceV.push(tempStructurePlace);
      }
      else if (structureTypeV === "VEHICLE") {
        let tempStructurePlace = {
          doorNo: '', doorNoSub: '', stallNo: '',
          blockNo: '',
          surveyNo: '',
          subDivisionNo: '',
          partitionNo: '',
          vehicleNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo, vesselNo: null
        };
        tempString += "Vehicle No : ";
        tempString += application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.vehicleNo : "";
        structurePlaceV.push(tempStructurePlace);
      }
      else if (structureTypeV === "WATER") {
        let tempStructurePlace = {
          doorNo: '', doorNoSub: '', stallNo: '',
          blockNo: '',
          surveyNo: '',
          subDivisionNo: '',
          partitionNo: '',
          vehicleNo: '', vesselNo: application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo
        }
        tempString += "Vessel No : " + application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo ? application[0]?.tradeLicenseDetail?.structurePlace[0]?.vesselNo : "";
        structurePlaceV.push(tempStructurePlace);
      }

      let structureTypeDetails = application[0].tradeLicenseDetail.address.wardNo;
      if (structureTypeV === "BUILDING") {
        structureTypeDetails += "/" + application[0].tradeLicenseDetail.address.doorNo;
      }

      let addressV = "Ward No : " + application[0].tradeLicenseDetail.address.wardNo + ", " + tempString;
      addressV += application[0].tradeLicenseDetail.address.buildingName ? application[0].tradeLicenseDetail.address.buildingName : "";
      addressV += application[0].tradeLicenseDetail.address.street ? ", " + application[0].tradeLicenseDetail.address.street : "";
      addressV += application[0].tradeLicenseDetail.address.locality ? ", " + application[0].tradeLicenseDetail.address.locality : "";
      addressV += application[0].tradeLicenseDetail.address.landmark ? ", " + application[0].tradeLicenseDetail.address.landmark : "";
      addressV += application[0].tradeLicenseDetail.address.waterbody ? ", " + application[0].tradeLicenseDetail.address.waterbody : "";
      addressV += application[0].tradeLicenseDetail.address.serviceArea ? ", " + application[0].tradeLicenseDetail.address.serviceArea : "";
      addressV += application[0].tradeLicenseDetail.address.localityName ? ", " + application[0].tradeLicenseDetail.address.localityName : "";
      addressV += application[0].tradeLicenseDetail.address.postOffice ? ", " + application[0].tradeLicenseDetail.address.postOffice : "";
      addressV += application[0].tradeLicenseDetail.address.pincode ? "-" + application[0].tradeLicenseDetail.address.pincode : "";

      let tradeUnitsV = application[0].tradeLicenseDetail.tradeUnits;
      let ownerPhotoV = application[0]?.tradeLicenseDetail?.applicationDocuments?.filter((doc) => {
        doc?.documentType === "OWNERPHOTO"
        doc?.documentType.includes("OWNERPHOTO")
      })[0];

      let institution = [];
      if (application[0]?.tradeLicenseDetail?.institution) {
        let tempInst = {
          institutionName: application[0]?.tradeLicenseDetail?.institution?.institutionName,
          organisationregistrationno: application[0]?.tradeLicenseDetail?.institution?.organisationregistrationno,
          address: application[0]?.tradeLicenseDetail?.institution?.address,
          licenseUnitId: application[0]?.tradeLicenseDetail?.institution?.licenseUnitId
        };
        institution.push(tempInst);
      }
      let licenseUnitName = application[0]?.tradeLicenseDetail?.institution?.licenseUnitId ? application[0]?.tradeLicenseDetail?.institution?.licenseUnitId + " - " : "" +
        application[0]?.licenseUnitName ? application[0]?.licenseUnitName : ""
          + application[0]?.licenseUnitNameLocal ? " ( " + application[0]?.licenseUnitNameLocal + " ) " : "";
      let desiredLicensePeriodV = application[0]?.desiredLicensePeriod;
      let businessSector = application[0]?.businessSector;
      let capitalInvestment = application[0]?.capitalInvestment;
      let enterpriseType = application[0]?.enterpriseType;
      let structurePlaceSubtype = application[0]?.structurePlaceSubtype;
      let businessActivityDesc = application[0]?.businessActivityDesc;
      let licenseeType = application[0]?.licenseeType;
      let ownershipCategory = application[0]?.tradeLicenseDetail?.ownershipCategory;
      let applicationDocuments = application[0]?.tradeLicenseDetail?.applicationDocuments;
      let finalJson =
        [{
          tenantId: tenantIdV,
          businessService: businessServiceV,
          licenseType: licenseTypeV,
          applicationType: applicationTypeV,
          licenseNumber: licenseNumberV,
          applicationNumber: applicationNumberV,
          licenseUnitName: licenseUnitName,
          applicationDate: applicationDateV,
          issuedDate: issuedDateV,
          financialYear: financialYearV,
          validFrom: validFromV,
          validTo: validToV,
          commencementDate: commencementDateV,
          tradeLicenseDetail: {
            ownershipCategory: ownershipCategory,
            structureType: structureTypeV,
            owners: owners,
            address: addressV,
            tradeUnits: tradeUnitsV,
            ownerPhoto: ownerPhotoV,
            structurePlace: structurePlaceV,
            businessSector: businessSector,
            capitalInvestment: capitalInvestment,
            enterpriseType: enterpriseType,
            structurePlaceSubtype: structurePlaceSubtype,
            businessActivityDesc: businessActivityDesc,
            licenseeType: licenseeType,
            institution: institution,
            applicationDocuments: applicationDocuments
          },
          desiredLicensePeriod: desiredLicensePeriodV,
          signedCertificate: "111111111111"
        }];
      return finalJson;
    }
    else {
      return [{}];
    }
  }

  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => { }, [application, errorApplication]);

  const businessService = application?.[0]?.businessService;
  const { isLoading: iswfLoading, data: wfdata } = Digit.Hooks.useWorkflowDetails({
    tenantId: application?.[0]?.tenantId,
    id: id,
    moduleCode: businessService,
  });

  let workflowDocs = [];
  if (wfdata) {
    wfdata?.timeline?.map((ob) => {
      if (ob?.wfDocuments?.length > 0) workflowDocs.push(ob?.wfDocuments?.[0])
    })
  }

  if (isLoading || iswfLoading) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const handleDownloadPdf = async () => {
    const tenantInfo = tenants.find((tenant) => tenant.code === application[0]?.tenantId);
    let res = application[0];
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
    setShowOptions(false);
  };

  const downloadPaymentReceipt = async () => {
    const receiptFile = { filestoreIds: [paymentsHistory.Payments[0]?.fileStoreId] };
    if (!receiptFile?.fileStoreIds?.[0]) {
      const newResponse = await Digit.PaymentService.generatePdf(tenantId, { Payments: [paymentsHistory.Payments[0]] }, "tradelicense-receipt");
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: newResponse.filestoreIds[0] });
      window.open(fileStore[newResponse.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: receiptFile.filestoreIds[0] });
      window.open(fileStore[receiptFile.filestoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };

  const downloadTLcertificate = async () => {
    const TLcertificatefile = await Digit.PaymentService.generatePdf(tenantId, { Licenses: application_cert }, "tlcertificate");
    const receiptFile = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: TLcertificatefile.filestoreIds[0] });
    window.open(receiptFile[TLcertificatefile.filestoreIds[0]], "_blank");
    setShowOptions(false);
  };

  let propertyAddress = "";
  // if (PTData && PTData?.Properties?.length) {
  //   propertyAddress=getAddress(PTData?.Properties[0]?.address,t);
  // }

  const dowloadOptions =
    paymentsHistory?.Payments?.length > 0
      ? [
        {
          label: t("TL_CERTIFICATE"),
          onClick: downloadTLcertificate,
        },
        {
          label: t("CS_COMMON_PAYMENT_RECEIPT"),
          onClick: downloadPaymentReceipt,
        },
      ]
      : [
        {
          label: t("CS_COMMON_APPLICATION_ACKNOWLEDGEMENT"),
          onClick: handleDownloadPdf,
        },
      ];
      // let correctiontag = JSON.parse(application[0]?.correction);
      // const correctionbasedet = {
      //   title : "TL_CORRECTION_DET",
      //   values : []
      // }
      
      

  return (
    <React.Fragment>
      <div className="cardHeaderWithOptions">
        <h1 style={hstyle}>{t("CS_TITLE_APPLICATION_DETAILS")}</h1>
        {/* <Header>{t("CS_TITLE_APPLICATION_DETAILS")}</Header> */}
        <MultiLink
          className="multilinkWrapper"
          onHeadClick={() => setShowOptions(!showOptions)}
          displayOptions={showOptions}
          options={dowloadOptions}
        />
      </div>
      <Card style={{ position: "relative" }}>
        {application?.map((application, index) => {
          return (
            <div key={index} className="employee-data-table">
              <Row
                className="employee-data-table"
                label={t("TL_COMMON_TABLE_COL_APP_NO")}
                text={application?.applicationNumber}
                textStyle={{ whiteSpace: "pre-wrap", border: "none", width: "70%" }}
              />
              <Row label={t("TL_APPLICATION_CATEGORY")} text={t("ACTION_TEST_TRADE_LICENSE")} textStyle={{ whiteSpace: "pre-wrap", width: "70%" }} />
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_STATUS")}
                text={t(`WF_NEWTL_${application?.status}`)}
                textStyle={{ whiteSpace: "pre-wrap", width: "70%" }}
              />
              {/* <Row
              style={{ border: "none" }}
              label={t("TL_COMMON_TABLE_COL_SLA_NAME")}
              text={`${Math.round(application?.SLA / (1000 * 60 * 60 * 24))} ${t("TL_SLA_DAYS")}`}
              textStyle={{ whiteSpace: "pre" }}
            /> */}
              <Row
                style={{ border: "none" }}
                label={t("TL_COMMON_TABLE_COL_TRD_NAME")}
                text={application?.licenseUnitName}
                textStyle={{ whiteSpace: "pre-wrap", width: "70%" }}
              />
              <CardSectionHeader>{t("TL_OWNERSHIP_DETAILS_HEADER")}</CardSectionHeader>
              {application?.tradeLicenseDetail.owners.map((ele, index) => {
                return application?.tradeLicenseDetail?.licenseeType?.includes("INSTITUTIONAL") ? (
                  <div key={index} style={multiBoxStyle}>
                    <CardSectionHeader style={multiHeaderStyle}>{`${t("TL_PAYMENT_PAID_BY_PLACEHOLDER")} - ` + (index + 1)}</CardSectionHeader>
                    <Row
                      label={`${t("TL_INSTITUTION_NAME_LABEL")}`}
                      text={t(application?.tradeLicenseDetail?.institution?.instituionName)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      label={`${t("TL_INSTITUTION_TYPE_LABEL")}`}
                      text={t(`TL_${application?.tradeLicenseDetail?.licenseeType}`)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row label={`${t("TL_MOBILE_NUMBER_LABEL")}`} text={t(ele.mobileNumber)} textStyle={{ whiteSpace: "pre" }} />
                    <Row
                      label={`${t("TL_TELEPHONE_NUMBER_LABEL")}`}
                      text={t(application?.tradeLicenseDetail?.institution?.contactNo || t("CS_NA"))}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row
                      label={`${t("TL_LOCALIZATION_OWNER_NAME")}`}
                      text={t(ele.fatherOrHusbandName || application?.tradeLicenseDetail?.institution?.name)}
                      textStyle={{ whiteSpace: "pre" }}
                    />
                    <Row label={`${t("TL_LOCALIZATION_EMAIL_ID")}`} text={t(ele.emailId || t("CS_NA"))} textStyle={{ whiteSpace: "pre" }} />
                  </div>
                ) : (
                  <div key={index} style={multiBoxStyle}>
                    <CardSectionHeader style={multiHeaderStyle}>{`${t("TL_PAYMENT_PAID_BY_PLACEHOLDER")} - ` + (index + 1)}</CardSectionHeader>
                    <Row label={`${t("TL_COMMON_TABLE_COL_OWN_NAME")}`} text={t(ele.name)} textStyle={{ whiteSpace: "pre", width: "70%" }} />
                    <Row label={`${t("TL_MOBILE_NUMBER_LABEL")}`} text={t(ele.mobileNumber)} textStyle={{ whiteSpace: "pre", width: "70%" }} />
                    <Row label={`${t("TL_LOCALIZATION_EMAIL_ID")}`} text={t(ele.emailId)} textStyle={{ whiteSpace: "pre", width: "70%" }} />
                    <Row label={`${t("TL_GUARDIAN_S_NAME_LABEL")}`} text={`${t(ele.careOf)} ` + `${t(ele.careOfName)}`} textStyle={{ whiteSpace: "pre", width: "70%" }} />
                  </div>
                );
              })}

              {workflowDocs?.length > 0 && <div>
                <CardSubHeader>{t("TL_TIMELINE_DOCS")}</CardSubHeader>
                {/* <div>
              {workflowDocs?.length > 0 ? (
                <TLDocument value={{"workflowDocs":workflowDocs}}></TLDocument>
              ) : (
                <StatusTable>
                  <Row text={t("TL_NO_DOCUMENTS_MSG")} />
                </StatusTable>
              )}
            </div> */}
              </div>}
              <TLWFApplicationTimeline application={application} id={id} />
              {application?.status === "CITIZENACTIONREQUIRED" ? (
                <Link
                  to={{
                    pathname: `/digit-ui/citizen/tl/tradelicence/edit-application/${application?.applicationNumber}/${application?.tenantId}`,
                    state: {},
                  }}
                >
                  <SubmitBar label={t("COMMON_EDIT")} />
                </Link>
              ) : null}
              {/* //TODO: change the actions to be fulfilled from workflow nextactions */}
              {application?.status === "PENDINGPAYMENT" ? (
                <Link
                  to={{
                    pathname: `/digit-ui/citizen/payment/collect/${application?.businessService}/${application?.applicationNumber}`,
                    state: { bill, tenantId: tenantId },
                  }}
                >
                  <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
                </Link>
              ) : null}
            </div>
          );
        })}
      </Card>
    </React.Fragment>
  );
};

export default TLApplicationDetails;
