import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

//  const getTradeDetails = (application, t) => {
//   return {
//     title: t("TL_COMMON_TR_DETAILS"),
//     values: [
//       { title: t("TL_APPLICATION_TYPE"), value: t(`TRADELICENSE_APPLICATIONTYPE_${application?.applicationType}`) || t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL"), value: application?.licenseType ? t(`TRADELICENSE_LICENSETYPE_${application?.licenseType}`) : t("CS_NA") },
//       { title: t("TL_COMMON_TABLE_COL_TRD_NAME"), value: application?.tradeName || t("CS_NA") },
//       { title: t("reports.tl.fromDate"), value: application?.validFrom ? Digit.DateUtils.ConvertTimestampToDate(application?.validFrom, "dd/MM/yyyy") : t("CS_NA") },
//       { title: t("reports.tl.toDate"), value: application?.validTo ? Digit.DateUtils.ConvertTimestampToDate(application?.validTo, "dd/MM/yyyy") : t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL"), value: application?.tradeLicenseDetail?.structureType ? t(`COMMON_MASTERS_STRUCTURETYPE_${application?.tradeLicenseDetail?.structureType?.split('.')[0]}`) : t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL"), value: application?.tradeLicenseDetail?.structureType ? t(`COMMON_MASTERS_STRUCTURETYPE_${stringReplaceAll(application?.tradeLicenseDetail?.structureType, ".", "_")}`) : t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"), value: Digit.DateUtils.ConvertTimestampToDate(application?.commencementDate, "dd/MM/yyyy") || t("CS_NA"), },
//       { title: t("TL_NEW_GST_NUMBER_LABEL"), value: application?.tradeLicenseDetail?.additionalDetail?.gstNo || t("CS_NA") },
//       { title: t("TL_NEW_OPERATIONAL_SQ_FT_AREA_LABEL"), value: application?.tradeLicenseDetail?.operationalArea || t("CS_NA") },
//       { title: t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL"), value: application?.tradeLicenseDetail?.noOfEmployees || t("CS_NA") },
//     ],
//   };
// };
// const getAccessoriesDetails = (application, t) => {
//   let values = [];
//   application.tradeLicenseDetail?.accessories?.map((accessory) => {
//     let accessoryCategory = t("CS_NA");
//     if (accessory?.accessoryCategory) {
//       accessoryCategory = stringReplaceAll(accessory?.accessoryCategory, ".", "_");
//       accessoryCategory = t(`TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(accessoryCategory, "-", "_")}`);
//     }
//     let value = [
//       { title: t("TL_NEW_TRADE_DETAILS_ACC_LABEL"), value: accessoryCategory },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"), value: accessory?.uom || t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"), value: accessory?.uomValue || t("CS_NA") },
//       { title: t("TL_ACCESSORY_COUNT_LABEL"), value: accessory?.count || t("CS_NA") }
//     ];
//     values.push(...value);
//   });

//   return {
//     title: "",
//     values: values,
//   };
// };

// const getTradeUnitsDetails = (application, t) => {
//   let values = [];
//   application.tradeLicenseDetail?.tradeUnits?.map((unit) => {
//     let tradeSubType = stringReplaceAll(unit?.tradeType, ".", "_");
//     tradeSubType = stringReplaceAll(tradeSubType, "-", "_");
//     let value = [
//       { title: t("TRADELICENSE_TRADECATEGORY_LABEL"), value: unit?.tradeType ? t(`TRADELICENSE_TRADETYPE_${unit?.tradeType?.split('.')[0]}`) : t("CS_NA") },
//       { title: t("TRADELICENSE_TRADETYPE_LABEL"), value: unit?.tradeType ? t(`TRADELICENSE_TRADETYPE_${unit?.tradeType?.split('.')[1]}`) : t("CS_NA") },
//       { title: t("TL_NEW_TRADE_SUB_TYPE_LABEL"), value: tradeSubType ? t(`TRADELICENSE_TRADETYPE_${tradeSubType}`) : t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"), value: unit?.uom || t("CS_NA") },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"), value: unit?.uomValue || t("CS_NA") },
//       { title: "", value: ""},
//       { title: "", value: ""},
//       { title: "", value: ""}
//     ];
//     values.push(...value);
//   });

//   return {
//     title: "",
//     values: values,
//   };
// };
const getInformationDeath = (application, t) => {
    console.log("application",application)
  application.owners = application?.deathCertificateDtls?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "",
    values: [
      {
        title: t("Date of Death"),
        value:application?.InformationDeath?.DateOfDeath?Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeath?.DateOfDeath, "dd/MM/yyyy") : t("CS_NA"),
      },
      { title: t("CR_GENDER"), value: application?.InformationDeath?.DeceasedGender ? application?.InformationDeath?.DeceasedGender : t("CS_NA") },
      { title: t("CR_NATIONALITY"), value: application?.InformationDeath?.Nationality ? application?.InformationDeath?.Nationality : t("CS_NA") },
      { title: t("CS_COMMON_RELIGION"), value: application?.InformationDeath?.Religion ? application?.InformationDeath?.Religion : t("CS_NA") },

      // { title: t("TL_OWNER_S_NAME_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.name || t("CS_NA") },
      // { title: t("TL_OWNER_S_MOBILE_NUM_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.mobileNumber || t("CS_NA") },
      // // { title: t("TL_GUARDIAN_S_NAME_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.fatherOrHusbandName || t("CS_NA") },
      // // { title: t("TL_RELATIONSHIP_WITH_GUARDIAN_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.relationship || t("CS_NA") },
      // { title: t("TL_NEW_OWNER_DETAILS_GENDER_LABEL"), value: t(application?.tradeLicenseDetail?.owners[0]?.gender) || t("CS_NA") },
      // { title: t("TL_NEW_OWNER_DETAILS_EMAIL_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.emailId || t("CS_NA") },
      // { title: t("TL_OWNER_SPECIAL_CATEGORY"), value: application?.tradeLicenseDetail?.owners[0]?.ownerType ? t(`COMMON_MASTERS_OWNERTYPE_${application?.tradeLicenseDetail?.owners[0]?.ownerType}`) : t("CS_NA") },
      // { title: t("TL_NEW_OWNER_DETAILS_ADDR_LABEL"), value: application?.tradeLicenseDetail?.owners[0]?.permanentAddress || t("CS_NA") },
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

const getCRDeathAcknowledgementData = async (application, tenantInfo, t) => {
  //console.log(application, "applicationgetCRAbandonedDeathAcknowledgementData");

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
          { title: t("Application No"), value: application?.InformationDeath?.DeathACKNo},
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeath?.ApplicationDate, "dd/MM/yyyy"),
          },
        ],
      },
      getInformationDeath(application, t),
      getAddressDetails(application, t),
    ],
  };
};

export default getCRDeathAcknowledgementData;
