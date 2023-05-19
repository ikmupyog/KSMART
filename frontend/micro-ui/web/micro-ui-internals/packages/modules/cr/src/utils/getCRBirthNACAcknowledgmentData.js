import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getNACChildDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: t("Child Details"),
    values: [
      {
        title: "Date of Birth",
        value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CR_NOT_RECORDED"),
      },
      { title: "Gender", value: application?.gender ? application?.gender : t("CR_NOT_RECORDED") },
      { title: "Child Aadhar", value: application?.childAadharNo ? application?.childAadharNo : t("CR_NOT_RECORDED") },
      { title: "Order of Birth", value: application?.nacorderofChildren ? application?.nacorderofChildren : t("CR_NOT_RECORDED") },
      {
        title: "Child Name",
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
// const birthPlaceHospDetails = {
//   title: "CR_BIRTH_PLACE_DETAILS",
//   asSectionHeader: true,
//   values: [
//     { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
//     { title: "CR_HOSPITAL_EN", value: response?.hospitalName || t("CR_NOT_RECORDED") },
//     { title: "CR_HOSPITAL_ML", value: response?.hospitalNameMl || t("CR_NOT_RECORDED") },
//   ],
// };
// const birthPlaceINSTITUTIONDetails = {
//   title: "CR_BIRTH_PLACE_DETAILS",
//   asSectionHeader: true,
//   values: [
//     { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
//     { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || t("CR_NOT_RECORDED") },
//     { title: "CR_INSTITUTION_NAME_EN", value: response?.institutionId ? response?.institutionId : t("CR_NOT_RECORDED") },
//     { title: "CR_INSTITUTION_NAME_ML", value: response?.institutionIdMl ? response?.institutionIdMl : t("CR_NOT_RECORDED") },
//   ],
// };
// const birthPlaceHOMEDetails = {
//   title: "CR_BIRTH_PLACE_DETAILS",
//   asSectionHeader: true,
//   values: [
//     { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
//     { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
//     { title: "CS_COMMON_POST_OFFICE", value: response?.adrsPostOffice || t("CR_NOT_RECORDED") },
//     { title: "CS_COMMON_PIN_CODE", value: response?.adrsPincode || t("CR_NOT_RECORDED") },
//     { title: "CR_LOCALITY_EN", value: response?.adrsLocalityNameEn || t("CR_NOT_RECORDED") },
//     { title: "CR_LOCALITY_ML", value: response?.adrsLocalityNameMl || t("CR_NOT_RECORDED") },
//     { title: "CR_STREET_NAME_EN", value: response?.adrsStreetNameEn || t("CR_NOT_RECORDED") },
//     { title: "CR_STREET_NAME_ML", value: response?.adrsStreetNameMl || t("CR_NOT_RECORDED") },
//     { title: "CR_HOUSE_NAME_EN", value: response?.adrsHouseNameEn || t("CR_NOT_RECORDED") },
//     { title: "CR_HOUSE_NAME_ML", value: response?.adrsHouseNameMl || t("CR_NOT_RECORDED") },
//   ],
// };
// const birthPlaceVEHICLEDetails = {
//   title: "CR_BIRTH_PLACE_DETAILS",
//   asSectionHeader: true,
//   values: [
//     { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_TYPE", value: response?.hospitalName || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || t("CR_NOT_RECORDED") },
//     { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || t("CR_NOT_RECORDED") },
//     { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.hospitalName || t("CR_NOT_RECORDED") },
//     { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
//   ],
// };
// const birthPlacePUBLICPLACESDetails = {
//   title: "CR_BIRTH_PLACE_DETAILS",
//   asSectionHeader: true,
//   values: [
//     { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
//     { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || t("CR_NOT_RECORDED") },
//     { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
//     { title: "CR_LOCALITY_EN", value: response?.localityNameEn || t("CR_NOT_RECORDED") },
//     { title: "CR_LOCALITY_ML", value: response?.localityNameMl || t("CR_NOT_RECORDED") },
//     { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || t("CR_NOT_RECORDED") },
//     { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || t("CR_NOT_RECORDED") },
//     { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || t("CR_NOT_RECORDED") },
//   ],
// };
const getParentsDetails = (application, t) => {
  application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  return {
    title: "Parents Details",
    values: [
      {
        title: "Mother's Aadhar",
        value: application?.ParentsDetails?.motherAadhar ? application?.ParentsDetails?.motherAadhar : t("CR_NOT_RECORDED"),
      },
      {
        title: "Mother's Name",
        value: application?.ParentsDetails?.motherFirstNameEn ? application?.ParentsDetails?.motherFirstNameEn : t("CR_NOT_RECORDED"),
      },
      {
        title: "Father's Aadhar",
        value: application?.ParentsDetails?.fatherAadhar ? application?.ParentsDetails?.fatherAadhar : t("CR_NOT_RECORDED"),
      },
      {
        title: "Father's Name",
        value: application?.ParentsDetails?.fatherFirstNameEn ? application?.ParentsDetails?.fatherFirstNameEn : t("CR_NOT_RECORDED"),
      },
    ],
  };
};
const getAddressDetails = (application, t) => {
  return {
    title: "Address",
    values: [
      { title: "District", value: application?.AddressBirthDetails?.presentInsideKeralaDistrictEn || t("CR_NOT_RECORDED") },
      { title: "Taluk", value: application?.AddressBirthDetails?.presentInsideKeralaTaluk || t("CR_NOT_RECORDED") },
      { title: "Village", value: application?.AddressBirthDetails?.presentInsideKeralaVillage || t("CR_NOT_RECORDED") },
      { title: "Local Body", value: application?.AddressBirthDetails?.presentInsideKeralaLBName || t("CR_NOT_RECORDED") },
      { title: "Ward", value: application?.AddressBirthDetails?.presentWardNo || t("CR_NOT_RECORDED") },
      { title: "Post Office", value: application?.AddressBirthDetails?.presentInsideKeralaPostOffice || t("CR_NOT_RECORDED") },
      { title: "Pin Code", value: application?.AddressBirthDetails?.presentInsideKeralaPincode || t("CR_NOT_RECORDED") },
      { title: "Locality", value: application?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
      { title: "Street Name", value: application?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
      { title: "House Name", value: application?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
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
    ],
  };
};

export default getCRBirthNACAcknowledgementData;
