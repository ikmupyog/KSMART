import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

//  const getTradeDetails = (application, t) => {
//   return {
//     title: t("TL_COMMON_TR_DETAILS"),
//     values: [
//       { title: t("TL_APPLICATION_TYPE"), value: t(`TRADELICENSE_APPLICATIONTYPE_${application?.applicationType}`) || "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL"), value: application?.licenseType ? t(`TRADELICENSE_LICENSETYPE_${application?.licenseType}`) : "CR_NOT_RECORDED" },
//       { title: t("TL_COMMON_TABLE_COL_TRD_NAME"), value: application?.tradeName || "CR_NOT_RECORDED" },
//       { title: t("reports.tl.fromDate"), value: application?.validFrom ? Digit.DateUtils.ConvertTimestampToDate(application?.validFrom, "dd/MM/yyyy") : "CR_NOT_RECORDED" },
//       { title: t("reports.tl.toDate"), value: application?.validTo ? Digit.DateUtils.ConvertTimestampToDate(application?.validTo, "dd/MM/yyyy") : "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL"), value: application?.tradeLicenseDetail?.structureType ? t(`COMMON_MASTERS_STRUCTURETYPE_${application?.tradeLicenseDetail?.structureType?.split('.')[0]}`) : "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL"), value: application?.tradeLicenseDetail?.structureType ? t(`COMMON_MASTERS_STRUCTURETYPE_${stringReplaceAll(application?.tradeLicenseDetail?.structureType, ".", "_")}`) : "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"), value: Digit.DateUtils.ConvertTimestampToDate(application?.commencementDate, "dd/MM/yyyy") || "CR_NOT_RECORDED", },
//       { title: t("TL_NEW_GST_NUMBER_LABEL"), value: application?.tradeLicenseDetail?.additionalDetail?.gstNo || "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_OPERATIONAL_SQ_FT_AREA_LABEL"), value: application?.tradeLicenseDetail?.operationalArea || "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_NUMBER_OF_EMPLOYEES_LABEL"), value: application?.tradeLicenseDetail?.noOfEmployees || "CR_NOT_RECORDED" },
//     ],
//   };
// };
// const getAccessoriesDetails = (application, t) => {
//   let values = [];
//   application.tradeLicenseDetail?.accessories?.map((accessory) => {
//     let accessoryCategory = "CR_NOT_RECORDED";
//     if (accessory?.accessoryCategory) {
//       accessoryCategory = stringReplaceAll(accessory?.accessoryCategory, ".", "_");
//       accessoryCategory = t(`TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(accessoryCategory, "-", "_")}`);
//     }
//     let value = [
//       { title: t("TL_NEW_TRADE_DETAILS_ACC_LABEL"), value: accessoryCategory },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"), value: accessory?.uom || "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"), value: accessory?.uomValue || "CR_NOT_RECORDED" },
//       { title: t("TL_ACCESSORY_COUNT_LABEL"), value: accessory?.count || "CR_NOT_RECORDED" }
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
//       { title: t("TRADELICENSE_TRADECATEGORY_LABEL"), value: unit?.tradeType ? t(`TRADELICENSE_TRADETYPE_${unit?.tradeType?.split('.')[0]}`) : "CR_NOT_RECORDED" },
//       { title: t("TRADELICENSE_TRADETYPE_LABEL"), value: unit?.tradeType ? t(`TRADELICENSE_TRADETYPE_${unit?.tradeType?.split('.')[1]}`) : "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_SUB_TYPE_LABEL"), value: tradeSubType ? t(`TRADELICENSE_TRADETYPE_${tradeSubType}`) : "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"), value: unit?.uom || "CR_NOT_RECORDED" },
//       { title: t("TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"), value: unit?.uomValue || "CR_NOT_RECORDED" },
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
const getAbandonedDeathDetails = (application, t) => {
    console.log("application",application)
  application.owners = application?.deathAbandonedDtls?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: "",
    values: [
      {
        title: t("Date of Birth"),
        value:application?.InformationDeathAbandoned?.DateOfDeath?Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeathAbandoned?.DateOfDeath, "dd/MM/yyyy") : "CR_NOT_RECORDED",
      },
      { title: t("Gender"), value: application?.InformationDeathAbandoned?.DeceasedGender ? application?.InformationDeathAbandoned?.DeceasedGender?.code : "CR_NOT_RECORDED" },
      { title: t("CR_NATIONALITY"), value: application?.InformationDeathAbandoned?.Nationality ? application?.InformationDeathAbandoned?.Nationality : "CR_NOT_RECORDED" },
      { title: t("CS_COMMON_RELIGION"), value: application?.InformationDeathAbandoned?.Religion ? application?.InformationDeathAbandoned?.Religion : "CR_NOT_RECORDED" },
      {title: t("CR_PLACE_OF_DEATH") , value: application?.InformationDeathAband.DeathPlace.code === "HOSPITAL"
      ? application?.InformationDeathAbandoned?.hospitalNameEn.hospitalName 
      : application?.InformationDeathAbandoned?.DeathPlace.code === "INSTITUTION"
      ? t(application?.InformationDeathAbandoned?.DeathPlaceInstId.institutionName) +
        "," +
        application?.InformationDeathAbandoned?.DeathPlace.code +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceInstId.institutionName
      : application?.InformationDeathAbandoned?.DeathPlace.code === "HOME"
      ? 
      application?.InformationDeathAbandoned?.DeathPlaceHomePostofficeId.pincode +
        "/" +
        application?.InformationDeathAbandoned?.DeathPlaceHomeHoueNameEn +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceHomeLocalityEn +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceHomeStreetNameEn +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceHomePostofficeId.name +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceHomePostofficeId.pincode
      : application?.InformationDeathAbandoned?.DeathPlace.code === "VEHICLE"
      ? `${application?.InformationDeathAbandoned?.vehicleType.name}`
      : application?.InformationDeathAbandoned?.DeathPlace.code === "PUBLIC_PLACES"
      ?
      application?.InformationDeathAbandoned?.DeathPlaceLocalityEn +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceStreetEn
      : application?.InformationDeathAbandoned?.DeathPlace.code === "OUTSIDE_JURISDICTION"
      ? 
      
        application?.InformationDeathAbandoned?.DeathPlaceDistrict.name +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceState.name +
        "," +
        application?.InformationDeathAbandoned?.DeathPlaceCountry.name
      : "CR_NOT_RECORDED"},
      {title: t("PDF_BIRTH_CHILD_NAME"), value: application?.InformationDeathAbandoned?.DeceasedFirstNameEn
      ?application?.InformationDeathAbandoned?.DeceasedFirstNameEn: "CR_NOT_RECORDED"},
      {title: t("CR_AGE"), value: application?.InformationDeathAbandoned?.Age?
      application?.InformationDeathAbandoned?.Age: "CR_NOT_RECORDED"},
      {title: t("CR_AADHAR"), value: application?.InformationDeathAbandoned?.DeceasedAadharNumberL?application?.InformationDeathAbandoned?.DeceasedAadharNumberL: "CR_NOT_RECORDED"},
     
    ],
  };
};
const getAddressDetails = (application, t) => {
  return {
    title: "",
    values: [
      // { title: t("CORE_COMMON_PINCODE"), value: application?.tradeLicenseDetail?.address?.pincode || "CR_NOT_RECORDED" },
      // { title: t("MYCITY_CODE_LABEL"), value: t(application?.tradeLicenseDetail?.address?.city) || "CR_NOT_RECORDED" },
      // { title: t("TL_LOCALIZATION_LOCALITY"), value: t(getTransaltedLocality(application?.tradeLicenseDetail?.address)) || "CR_NOT_RECORDED" },
      { title: t("Locality"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || "CR_NOT_RECORDED" },
      { title: t("House Name"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "CR_NOT_RECORDED" },
   
    ],
  };
};

const getFamilyDetails = (application, t) => {
  return {
    title: "CR_FAMILY_DETAILS",
    values:[
      {title: "Spouse Type", value: 
      application?.FamilyAbandonedDeath.SpouseType ? application?.FamilyAbandonedDeath.SpouseType?.code : "CR_NOT_RECORDED"},
      {title: "Spouse Name", value: application?.FamilyAbandonedDeath?.SpouseNameEN?
        application?.FamilyAbandonedDeath?.SpouseNameEN: "CR_NOT_RECORDED"},
      {title: "Aadhar No", value: application?.FamilyAbandonedDeath?.SpouseAadhaar?
        application?.FamilyAbandonedDeath?.SpouseAadhaar: "CR_NOT_RECORDED"},
      {title: "Father Name", value: application?.FamilyAbandonedDeath?.FatherNameEn?
        application?.FamilyAbandonedDeath?.FatherNameEn: "CR_NOT_RECORDED"},
      {title: "Aadhar No", value: application?.FamilyAbandonedDeath?.FatherAadharNo?
        application?.FamilyAbandonedDeath?.FatherAadharNo: "CR_NOT_RECORDED"},
        {title: "Mother Name", value: application?.FamilyAbandonedDeath?.MotherNameEn?
        application?.FamilyAbandonedDeath?.MotherNameEn: "CR_NOT_RECORDED"},
      {title: "Aadhar No", value: application?.FamilyAbandonedDeath?.MotherAadharNo?
        application?.FamilyAbandonedDeath?.MotherAadharNo: "CR_NOT_RECORDED"},
    ],
  }
}

const getMoreInfoDetails = (application, t) => {
  return {
    title: "CR_MORE_INFO",
    values:[
      {title:"CR_MEDICAL_ATTENTION_DEATH",value:application?.StatisticalInfoAbandoned?.MedicalAttentionType?
      application?.StatisticalInfoAbandoned?.MedicalAttentionType?.name:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
      // {title:"",value:application?.StatisticalInfoAbandoned?
      // application?.StatisticalInfoAbandoned:"CR_NOT_RECORDED"},
    ]
  }
}

const getCRAbandonedDeathAcknowledgementData = async (application, tenantInfo, t) => {
  console.log(application, "applicationgetCRAbandonedDeathAcknowledgementData");

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
          { title: t("Application No"), value: application?.InformationDeathAbandoned?.DeathACKNo},
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeathAbandoned?.ApplicationDate, "dd/MM/yyyy"),
          },
        ],
      },
      getAbandonedDeathDetails(application, t),
      getAddressDetails(application, t),
      getFamilyDetails(application, t),
      getMoreInfoDetails(application, t)
    ],
  };
};

export default getCRAbandonedDeathAcknowledgementData;
