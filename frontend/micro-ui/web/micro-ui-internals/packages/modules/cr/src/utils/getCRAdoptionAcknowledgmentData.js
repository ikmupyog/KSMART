import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getChildDetails = (application, t) => {
  application.owners = application?.ChildDetailsAdoption?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {

  return {
    title: t("CR_BIRTH_CHILD_DETAILS"),
    values: [
      {
        title: t("Date of Birth"),
        value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CR_NOT_RECORDED"),
      },
      { title: t("Gender"), value: application?.gender ? application?.gender : t("CR_NOT_RECORDED") },
      {
        title: t("CR_FIRST_NAME_EN"),
        value:
          application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
            ? application?.childFirstNameEn + "" + application?.childMiddleNameEn + "" + application?.childLastNameEn
            : t("CR_NOT_RECORDED"),
      },
      {
        title: t("CR_FIRST_NAME_ML"),
        value:
          application?.childFirstNameMl + "" + application?.childMiddleNameMl + "" + application?.childLastNameMl
            ? application?.childFirstNameMl + "" + application?.childMiddleNameMl + "" + application?.childLastNameMl
            : t("CR_NOT_RECORDED"),
      },
      { title: t("Birth Place"), value: application?.birthPlace ? application?.birthPlace : t("CR_NOT_RECORDED") },
      { title: t("Birth Place Name"), value: application?.hospitalName ? application?.hospitalName : t("CR_NOT_RECORDED") },
    ],
  };
};
// const getParentsDetails = (application, t) => {
//   application.owners = application?.ChildDetailsAdoption?.filter((applicationNumber) => applicationNumber.active == true) || [];
//   return {
//     title: "CR_MOTHER_INFORMATION",
//     values: [
//       {
//         title: t("CS_COMMON_AADHAAR"),
//         value: application?.AdoptionParentsDetails?.motherAadhar ? application?.AdoptionParentsDetails?.motherAadhar : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_MOTHER_NAME_EN"),
//         value: application?.AdoptionParentsDetails?.motherFirstNameEn ? application?.AdoptionParentsDetails?.motherFirstNameEn : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_MOTHER_NAME_ML"),
//         value: application?.AdoptionParentsDetails?.motherFirstNameMl ? application?.AdoptionParentsDetails?.motherFirstNameMl : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_NATIONALITY"),
//         value: application?.AdoptionParentsDetails?.motherNationality.nationalityname
//           ? application?.AdoptionParentsDetails?.motherNationality.nationalityname
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_MOTHER_MARITAL_STATUS"),
//         value: application?.AdoptionParentsDetails?.motherMaritalStatus.code
//           ? application?.AdoptionParentsDetails?.motherMaritalStatus.code
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_MOTHER_AGE_MARRIAGE"),
//         value: application?.AdoptionParentsDetails?.motherMarriageAge ? application?.AdoptionParentsDetails?.motherMarriageAge : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_MOTHER_AGE_BIRTH"),
//         value: application?.AdoptionParentsDetails?.motherMarriageBirth
//           ? application?.AdoptionParentsDetails?.motherMarriageBirth
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("Birth CR_ORDER_CURRENT_DELIVERY"),
//         value: application?.AdoptionParentsDetails?.orderofChildren ? application?.AdoptionParentsDetails?.orderofChildren : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_EDUCATION"),
//         value: application?.AdoptionParentsDetails?.motherEducation.name
//           ? application?.AdoptionParentsDetails?.motherEducation.name
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_PROFESSIONAL"),
//         value: application?.AdoptionParentsDetails?.motherProfession.name
//           ? application?.AdoptionParentsDetails?.motherProfession.name
//           : t("CR_NOT_RECORDED"),
//       },
//     ],
//     title: "CR_FATHER_INFORMATION",
//     values: [
//       {
//         title: t("CS_COMMON_AADHAAR"),
//         value: application?.AdoptionParentsDetails?.fatherAadhar ? application?.AdoptionParentsDetails?.fatherAadhar : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_FATHER_NAME_EN"),
//         value: application?.AdoptionParentsDetails?.fatherFirstNameEn ? application?.AdoptionParentsDetails?.fatherFirstNameEn : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_FATHER_NAME_ML"),
//         value: application?.AdoptionParentsDetails?.fatherFirstNameMl ? application?.AdoptionParentsDetails?.fatherFirstNameMl : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_NATIONALITY"),
//         value: application?.AdoptionParentsDetails?.fatherNationality.nationalityname
//           ? application?.AdoptionParentsDetails?.fatherNationality.nationalityname
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_EDUCATION"),
//         value: application?.AdoptionParentsDetails?.fatherEducation.name
//           ? application?.AdoptionParentsDetails?.fatherEducation.name
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_PROFESSIONAL"),
//         value: application?.AdoptionParentsDetails?.fatherProfession.name
//           ? application?.AdoptionParentsDetails?.fatherProfession.name
//           : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CS_COMMON_RELIGION"),
//         value: application?.AdoptionParentsDetails?.Religion.name ? application?.AdoptionParentsDetails?.Religion.name : t("CR_NOT_RECORDED"),
//       },
//       {
//         title: t("CR_PARENTS_CONTACT_NO"),
//         value: application?.AdoptionParentsDetails?.fatherMobile ? application?.AdoptionParentsDetails?.fatherMobile : t("CR_NOT_RECORDED"),
//       },
//     ],
//   };
// };
const getAddressDetails = (application, t) => {
  return {
    title: "BIRTH_TIME_LINE_ADDRESS",
    values: [
      { title: t("CS_COMMON_DISTRICT"), value: application?.AddressBirthDetails?.presentInsideKeralaDistrict.name || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_TALUK"), value: application?.AddressBirthDetails?.presentInsideKeralaTaluk.name || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_VILLAGE"), value: application?.AddressBirthDetails?.presentInsideKeralaVillage.name || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_LB_NAME"), value: application?.AddressBirthDetails?.presentInsideKeralaLBName.name || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_WARD"), value: application?.AddressBirthDetails?.presentWardNo.namecmb || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_POST_OFFICE"), value: application?.AddressBirthDetails?.presentInsideKeralaPostOffice.name || t("CR_NOT_RECORDED") },
      { title: t("CS_COMMON_PIN_CODE"), value: application?.AddressBirthDetails?.presentInsideKeralaPincode || t("CR_NOT_RECORDED") },
      { title: t("Locality"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
      { title: t("CR_LOCALITY_ML"), value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || t("CR_NOT_RECORDED") },
      { title: t("CR_STREET_NAME_EN"), value: application?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
      { title: t("CR_STREET_NAME_ML"), value: application?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
      { title: t("House Name"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
      { title: t("CR_HOUSE_NAME_ML"), value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },
    ],
  };
};

const getCRAdoptionAcknowledgementData = async (application, tenantInfo, t) => {
  //   const filesArray = application?.tradeLicenseDetail?.applicationDocuments?.map((value) => value?.fileStoreId);
  //   let res;
  //   if (filesArray) {
  //     res = await Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getStateId());
  //   }
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
      getChildDetails(application, t),
      //getParentsDetails(application, t),
      getAddressDetails(application, t),
    ],
  };
};

export default getCRAdoptionAcknowledgementData;
