import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getNACChildDetails = (application, t) => {
  console.log(application, "application");
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: t("CR_BIRTH_CHILD_DETAILS"),
    values: [
      {
        title: "Date of Birth",
        value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CR_NOT_RECORDED"),
      },
      { title: "Gender", value: application?.gender ? application?.gender : t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_CHILD_AADHAAR", value: application?.childAadharNo ? application?.childAadharNo : t("CR_NOT_RECORDED") },
      { title: "ORDER_OF_BIRTH", value: application?.nacorderofChildren ? application?.nacorderofChildren : t("CR_NOT_RECORDED") },
      {
        title: "CR_FIRST_NAME_EN",
        value:
          application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
            ? application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
            : t("CR_NOT_RECORDED"),
      },
      { title: "Birth Place", value: application?.birthPlace ? application?.birthPlace : t("CR_NOT_RECORDED") },
      { title: "Birth Place Name", value: application?.hospitalName ? application?.hospitalName : t("CR_NOT_RECORDED") },
    ],
  };
};
const getParentsDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: "CR_PARENTS_DETAILS",
    values: [
      {
        title: "CS_COMMON_AADHAAR",
        value: application?.ParentsDetails?.motherAadhar ? application?.ParentsDetails?.motherAadhar : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_MOTHER_NAME_EN",
        value: application?.ParentsDetails?.motherFirstNameEn ? application?.ParentsDetails?.motherFirstNameEn : t("CR_NOT_RECORDED"),
      },
      {
        title: "CS_COMMON_AADHAAR",
        value: application?.ParentsDetails?.fatherAadhar ? application?.ParentsDetails?.fatherAadhar : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_FATHER_NAME_EN",
        value: application?.ParentsDetails?.fatherFirstNameEn ? application?.ParentsDetails?.fatherFirstNameEn : t("CR_NOT_RECORDED"),
      },
    ],
  };
};
const getAddressDetails = (application, t) => {
  return {
    title: "BIRTH_TIME_LINE_ADDRESS",
    values: [
      { title: "CS_COMMON_DISTRICT", value: application?.AddressBirthDetails?.presentInsideKeralaDistrict.name || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_TALUK", value: application?.AddressBirthDetails?.presentInsideKeralaTaluk.name || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_VILLAGE", value: application?.AddressBirthDetails?.presentInsideKeralaVillage.name || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_LB_NAME", value: application?.AddressBirthDetails?.presentInsideKeralaLBName.name || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_WARD", value: application?.AddressBirthDetails?.presentWardNo.namecmb || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_POST_OFFICE", value: application?.AddressBirthDetails?.presentInsideKeralaPostOffice.name || t("CR_NOT_RECORDED") },
      { title: "CS_COMMON_PIN_CODE", value: application?.AddressBirthDetails?.presentInsideKeralaPincode || t("CR_NOT_RECORDED") },
      { title: "Locality", value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
      { title: "CR_STREET_NAME_EN", value: application?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
      { title: "House Name", value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
    ],
  };
};
const getApplicantDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: "CR_INITIATOR_DETAILS",
    values: [
      {
        title: "CS_COMMON_AADHAAR",
        value: application?.ApplicantDetails?.initiatorAadhar ? application?.ApplicantDetails?.initiatorAadhar : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_INITIATOR_NAME",
        value: application?.ApplicantDetails?.initiatorNameEn ? application?.ApplicantDetails?.initiatorNameEn : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_IS_CAREOF",
        value: application?.ApplicantDetails?.careofapplicant ? application?.ApplicantDetails?.careofapplicant : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_MOBILE_NO",
        value: application?.ApplicantDetails?.initiatorMobile ? application?.ApplicantDetails?.initiatorMobile : t("CR_NOT_RECORDED"),
      },
      {
        title: "CR_INFORMER_ADDRESS",
        value: application?.ApplicantDetails?.initiatorAddress ? application?.ApplicantDetails?.initiatorAddress : t("CR_NOT_RECORDED"),
      },
    ],
  };
};
const getCRBirthNACAcknowledgementData = async (application, tenantInfo, t) => {
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title: t("Acknowledgment Details"),
        values: [
          { title: "Application No", value: application?.applicationNumber },
          {
            title: "Application Date",
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateofreport, "dd/MM/yyyy"),
          },
        ],
      },
      getNACChildDetails(application, t),
      getParentsDetails(application, t),
      getAddressDetails(application, t),
      getApplicantDetails(application, t),
    ],
  };
};

export default getCRBirthNACAcknowledgementData;
