import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getNACDeathDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "",
    values: [
      {
        title: t("Date of Death"),
        value: application?.InformationDeath?.DateOfDeath ? Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeath?.DateOfDeath, "dd/MM/yyyy") : t("CS_NA"),
      },
      { title: t("Name"), value: application?.InformationDeath?.DeceasedFirstNameEn ? application?.InformationDeath?.DeceasedFirstNameEn + " " + application?.InformationDeath?.DeceasedMiddleNameEn +" "+ application?.InformationDeath?.DeceasedLastNameEn  : t("CS_NA") },
      { title: t("Gender"), value: application?.InformationDeath?.DeceasedGender ? application?.InformationDeath?.DeceasedGender : t("CS_NA") },
      { title: t("Death Place"), value: application?.InformationDeath?.DeathPlace ? application?.InformationDeath?.DeathPlace : t("CS_NA") },
    ],
  };
};
const getNACFamilyDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "Family Details",
    values: [
      { title: t("Father"), value: application?.InformationDeath?.FatherNameEn ? application?.InformationDeath?.FatherNameEn  : t("CS_NA") },
      { title: t("Mother"), value: application?.InformationDeath?.MotherNameEn ? application?.InformationDeath?.MotherNameEn  : t("CS_NA") },
      { title: t("Spouse"), value: application?.InformationDeath?.SpouseNameEn ? application?.InformationDeath?.SpouseNameEn  : t("CS_NA") },
      ],
  };
};
const getAddressDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];

  return {
    title: "Address Details",
    values: [
      { title: t("District"), value: application?.AddressBirthDetails?.presentInsideKeralaDistrict || t("CS_NA") },
      { title: t("Taluk"), value: application?.AddressBirthDetails?.presentInsideKeralaTaluk || t("CS_NA") },
      { title: t("Village"), value: application?.AddressBirthDetails?.presentInsideKeralaVillage || t("CS_NA") },
      { title: t("Localody"), value: application?.AddressBirthDetails?.presentInsideKeralaLBName || t("CS_NA") },
      { title: t("Ward"), value: application?.AddressBirthDetails?.presentWardNoEn || t("CS_NA") },
      { title: t("Post Office"), value: application?.AddressBirthDetails?.presentInsideKeralaPostOffice || t("CS_NA") },
      { title: t("PIN"), value: application?.AddressBirthDetails?.presentInsideKeralaPincode || t("CS_NA") },
      { title: t("Locality EN"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CS_NA") },
      { title: t("Street EN"), value: application?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || t("CS_NA") },
      { title: t("Hosuse EN"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CS_NA") },
    ],
  };
};
const getNACApplicantDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "Applicant Details",
    values: [
      { title: t("Name"), value: application?.DeathApplicantDtls?.ApplicantName ? application?.DeathApplicantDtls?.ApplicantName  : t("CS_NA") },
      { title: t("ApplicantRelation"), value: application?.DeathApplicantDtls?.ApplicantRelation ? application?.DeathApplicantDtls?.ApplicantRelation  : t("CS_NA") },
      { title: t("ApplicantMobileNo"), value: application?.DeathApplicantDtls?.ApplicantMobileNo ? application?.DeathApplicantDtls?.ApplicantMobileNo  : t("CS_NA") },
      { title: t("ApplicantAddress"), value: application?.DeathApplicantDtls?.ApplicantAddress ? application?.DeathApplicantDtls?.ApplicantAddress  : t("CS_NA") },
      ],
  };
};

const getCRDeathNACAcknowledgementData = async (application, tenantInfo, t) => {

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
          { title: t("Application No"), value: application?.InformationDeath?.DeathACKNo },
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeath?.ApplicationDate, "dd/MM/yyyy"),
          },
        ],
      },
      getNACDeathDetails(application, t),
      getNACFamilyDetails(application, t),
      getAddressDetails(application, t),
      getNACApplicantDetails(application, t),
    ],
  };
};

export default getCRDeathNACAcknowledgementData;
