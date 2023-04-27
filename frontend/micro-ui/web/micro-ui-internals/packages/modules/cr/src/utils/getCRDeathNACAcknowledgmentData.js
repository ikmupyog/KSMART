import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getNACDeathDetails = (application, t) => {
  console.log(application, "application");
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "",
    values: [
      {
        title: t("Date of Death"),
        value: application?.InformationDeath?.DateOfDeath ? Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeath?.DateOfDeath, "dd/MM/yyyy") : t("CS_NA"),
      },
      { title: t("Gender"), value: application?.InformationDeath?.DeceasedGender ? application?.InformationDeath?.DeceasedGender : t("CS_NA") },
      { title: t("Death Place"), value: application?.InformationDeath?.DeathPlace ? application?.InformationDeath?.DeathPlace : t("CS_NA") },
      { title: t("Death Place Name"), value: application?.InformationDeath?.hospitalNameEn ? application?.InformationDeath?.hospitalNameEn : t("CS_NA") },
    ],
  };
};
const getAddressDetails = (application, t) => {
  return {
    title: "",
    values: [
      // { title: t("CORE_COMMON_PINCODE"), value: application?.tradeLicenseDetail?.address?.pincode || t("CS_NA") },
      // { title: t("MYCITY_CODE_LABEL"), value: t(application?.tradeLicenseDetail?.address?.city) || t("CS_NA") },
      // { title: t("TL_LOCALIZATION_LOCALITY"), value: t(getTransaltedLocality(application?.tradeLicenseDetail?.address)) || t("CS_NA") },
      { title: t("Locality"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CS_NA") },
      { title: t("House Name"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CS_NA") },
    ],
  };
};

const getCRDeathNACAcknowledgementData = async (application, tenantInfo, t) => {
  console.log(application, "application");

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
      getAddressDetails(application, t),
    ],
  };
};

export default getCRDeathNACAcknowledgementData;
