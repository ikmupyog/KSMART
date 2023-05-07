import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getNACChildDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: "",
    values: [
      {
        title: t("Date of Birth"),
        value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CS_NA"),
      },
      { title: t("Gender"), value: application?.gender ? application?.gender : t("CS_NA") },
      { title: t("CS_COMMON_CHILD_AADHAAR"), value: application?.childAadharNo ? application?.childAadharNo : t("CS_NA") },
      { title: t("ORDER_OF_BIRTH"), value: application?.nacorderofChildren ? application?.nacorderofChildren : t("CS_NA") },
      {
        title: t("CR_FIRST_NAME_EN"),
        value:
          application?.childFirstNameEn + "" + childMiddleNameEn + "" + childLastNameEn
            ? application?.childFirstNameEn + "" + childMiddleNameEn + "" + childLastNameEn
            : t("CS_NA"),
      },
      {
        title: t("CR_FIRST_NAME_ML"),
        value:
          application?.childFirstNameMl + "" + childMiddleNameMl + "" + childLastNameMl
            ? application?.childFirstNameMl + "" + childMiddleNameMl + "" + childLastNameMl
            : t("CS_NA"),
      },
      { title: t("Birth Place"), value: application?.birthPlace ? application?.birthPlace : t("CS_NA") },
      { title: t("Birth Place Name"), value: application?.hospitalName ? application?.hospitalName : t("CS_NA") },
    ],
  };
};
const getParentsDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: "",
    values: [
      { title: t("CS_COMMON_AADHAAR"), value: application?.motherAadhar ? application?.motherAadhar : t("CS_NA") },
      { title: t("CR_MOTHER_NAME_EN"), value: application?.motherFirstNameEn ? application?.motherFirstNameEn : t("CS_NA") },
      { title: t("CR_MOTHER_NAME_ML"), value: application?.motherFirstNameMl ? application?.motherFirstNameMl : t("CS_NA") },
      { title: t("CS_COMMON_AADHAAR"), value: application?.fatherAadhar ? application?.fatherAadhar : t("CS_NA") },
      { title: t("CR_FATHER_NAME_EN"), value: application?.fatherFirstNameEn ? application?.fatherFirstNameEn : t("CS_NA") },
      { title: t("Birth CR_FATHER_NAME_ML"), value: application?.fatherFirstNameMl ? application?.fatherFirstNameMl : t("CS_NA") },
    ],
  };
};
const getAddressDetails = (application, t) => {
  return {
    title: "",
    values: [
      { title: t("Locality"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CS_NA") },
      { title: t("House Name"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CS_NA") },
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
          { title: t("Application No"), value: application?.applicationNumber },
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateofreport, "dd/MM/yyyy"),
          },
        ],
      },
      getNACChildDetails(application, t),
      getParentsDetails(application, t),
      getAddressDetails(application, t),
    ],
  };
};

export default getCRBirthNACAcknowledgementData;
