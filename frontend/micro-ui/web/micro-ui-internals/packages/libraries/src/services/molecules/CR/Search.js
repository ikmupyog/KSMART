import { CRService } from "../../elements/CR";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";
import { useTranslation } from "react-i18next";

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

/* methid to get date from epoch */
const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  } else {
    return null;
  }
};
// const getAddress = (address, t) => {
//   return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
//     address?.landmark ? `${address?.landmark}, ` : ""
//   }${t(Digit.Utils.pt.getMohallaLocale(address?.locality.code, address?.tenantId))}, ${t(Digit.Utils.pt.getCityLocale(address?.tenantId))}${
//     address?.pincode && t(address?.pincode) ? `, ${address.pincode}` : " "
//   }`;
// };
export const CRsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRsearch.application(tenantId, filter);
    console.log(response);

    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRsearch.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const Birthdetails = {
      title: "CR_BIRTH_SUMMARY_DETAILS",
      asSectionHeader: true,
    }
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NOT_RECORDED" },
        { title: "CR_DATE_OF_BIRTH_TIME", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NOT_RECORDED" },
        { title: "CR_TIME_OF_BIRTH", value: response?.birthDateTime ? response?.birthDateTime : "NOT_RECORDED" },
        { title: "CR_GENDER", value: response?.gender },
        { title: "CS_COMMON_CHILD_AADHAAR", value: response?.childAadharNo ? response?.childAadharNo : "NOT_RECORDED" },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + " " + response?.childMiddleNameEn|| + " " + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameMl + " " + response?.childMiddleNameMl + " " + response?.childLastNameMl },

      ],
    };
    const birthPlaceHospDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CR_HOSPITAL_EN", value: response?.hospitalName || "NOT_RECORDED" },
        { title: "CR_HOSPITAL_ML", value: response?.hospitalNameMl || "NOT_RECORDED" },
      ],
    };
    const birthPlaceINSTITUTIONDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || "NOT_RECORDED" },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.institutionId ? response?.institutionId : "NOT_RECORDED" },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.institutionIdMl ? response?.institutionIdMl : "NOT_RECORDED" },
      ],
    };
    const birthPlaceHOMEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.adrsPostOffice || "NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.adrsPincode || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.adrsLocalityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.adrsLocalityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.adrsStreetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.adrsStreetNameMl || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.adrsHouseNameEn || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.adrsHouseNameMl || "NOT_RECORDED" },
      ],
    };
    const birthPlaceVEHICLEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CR_VEHICLE_TYPE", value: response?.hospitalName || "NOT_RECORDED" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || "NOT_RECORDED" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || "NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || "NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || "NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || "NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || "NOT_RECORDED" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.hospitalName || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NOT_RECORDED" },
      ],
    };
    const birthPlacePUBLICPLACESDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "NOT_RECORDED" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "NOT_RECORDED" },
      ],
    };
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: response?.medicalAttensionSubEn + " / " + response?.medicalAttensionSubMl || "NOT_RECORDED" },
        { title: "CR_PREGNANCY_DURATION", value: response?.pregnancyDuration || "NOT_RECORDED" },
        { title: "CR_DELIVERY_METHOD", value: response?.deliveryMethodsEn + " / " + response?.deliveryMethodsMl || "NOT_RECORDED" },
        { title: "CR_BIRTH_WEIGHT", value: response?.birthWeight || "NOT_RECORDED" },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "CS_COMMON_AADHAAR", value: response?.ParentsDetails?.motherAadhar || "NOT_RECORDED" },
        { title: "CR_MOTHER_NAME_EN", value: response?.ParentsDetails.motherFirstNameEn || "NOT_RECORDED" },
        { title: "CR_MOTHER_NAME_ML", value: response?.ParentsDetails.motherFirstNameMl || "NOT_RECORDED" },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.motherNationalityEn + " / " + (response?.ParentsDetails?.motherNationalityMl != null ? response?.ParentsDetails?.motherNationalityMl : "") || "NOT_RECORDED" },
        { title: "CR_MOTHER_MARITAL_STATUS", value: response?.ParentsDetails?.motherMaritalStatus || "NOT_RECORDED" },
        { title: "CR_MOTHER_AGE_MARRIAGE", value: response?.ParentsDetails?.motherMarriageAge || "NOT_RECORDED" },
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.ParentsDetails?.motherMarriageBirth || "NOT_RECORDED" },
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.ParentsDetails?.orderofChildren || "NOT_RECORDED" },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.motherEducationEn + " / " + response?.ParentsDetails?.motherEducationMl || "NOT_RECORDED" },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.motherProfessionEn + " / " + response?.ParentsDetails?.motherProfessionMl || "NOT_RECORDED" },
        { title: "CS_COMMON_AADHAAR", value: response?.ParentsDetails?.fatherAadhar || "NOT_RECORDED" },
        { title: "CR_FATHER_NAME_EN", value: response?.ParentsDetails.fatherFirstNameEn || "NOT_RECORDED" },
        { title: "CR_FATHER_NAME_ML", value: response?.ParentsDetails.fatherFirstNameMl || "NOT_RECORDED" },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.fatherNationalityEn + " / " + (response?.ParentsDetails?.fatherNationalityMl != null ? response?.ParentsDetails?.fatherNationalityMl : "") || "NOT_RECORDED" },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.fatherEducationEn + " / " + response?.ParentsDetails?.fatherEducationMl || "NOT_RECORDED" },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.fatherProfessionEn + " / " + response?.ParentsDetails?.fatherProfessionMl || "NOT_RECORDED" },
        { title: "CS_COMMON_RELIGION", value: response?.ParentsDetails?.ReligionEn + " / " + response?.ParentsDetails?.ReligionMl || "NOT_RECORDED" },
        { title: "CR_PARENTS_CONTACT_NO", value: response?.ParentsDetails?.fatherMobile || "NOT_RECORDED" },
        { title: "CR_PARENTS_EMAIL", value: response?.ParentsDetails?.fatherEmail || "NOT_RECORDED" },
      ],
    };
    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { subTitle:true,title: "CR_PRESENT_ADDRESS", value:"CR_PRESENT_ADDRESS" },
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPresentEn + " / " + (response?.AddressBirthDetails?.countryIdPresentMl != null ? response?.AddressBirthDetails?.countryIdPresentMl : "") || "NOT_RECORDED" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.stateIdPresentEn + " / " + response?.AddressBirthDetails.stateIdPresentMl || "NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.districtIdPresentEn + " / " + response?.AddressBirthDetails.districtIdPresentMl || "NOT_RECORDED" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + response?.AddressBirthDetails.presentInsideKeralaTalukMl || "NOT_RECORDED" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + response?.AddressBirthDetails.presentInsideKeralaVillageMl || "NOT_RECORDED" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.presentWardNoEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || "NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentWardNoMl || "NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || "NOT_RECORDED" },
        //Permanent Address
        { subTitle:true,title: "CR_PERMANENT_ADDRESS", value:"CR_PERMANENT_ADDRESS" },
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPermanentEn + " / " + (response?.AddressBirthDetails?.countryIdPermanentMl != null ? response?.AddressBirthDetails?.countryIdPermanentMl : "") || "NOT_RECORDED" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.stateIdPermanentEn + " / " + response?.AddressBirthDetails.stateIdPermanentMl || "NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.districtIdPermanentEn + " / " + response?.AddressBirthDetails.districtIdPermanentMl || "NOT_RECORDED" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrTalukMl || "NOT_RECORDED" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrVillageMl || "NOT_RECORDED" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.permntInKeralaWardNoEn + " / " + response?.AddressBirthDetails?.permntInKeralaWardNoMl || "NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl || "NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || "NOT_RECORDED" },

      ]
    }
    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NOT_RECORDED" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || "NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || "NOT_RECORDED" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || "NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || "NOT_RECORDED" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || "NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || "NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || "NOT_RECORDED" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NOT_RECORDED" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || "NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntOutsideKeralaDistrict || "NOT_RECORDED" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.permntOutsideKeralaTaluk || "NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaVillage || "NOT_RECORDED" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || "NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || "NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.permntOutsideKeralaPincode || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || "NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || "NOT_RECORDED" },
      ]
    }
    // } else if (response?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || "NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || "NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || "NOT_RECORDED" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || "NOT_RECORDED" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || "NOT_RECORDED" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || "NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || "NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaVillage || "NOT_RECORDED" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaCityTown || "NOT_RECORDED" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.permanentOutsideIndiaPostCode || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.permntOutsideIndiaLineoneEn || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || "NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || "NOT_RECORDED" },
      ]
    }
    const InitiatorDetails = {
      title: "CR_INITIATOR_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "CR_RELATION", value: response?.InitiatorinfoDetails?.relation || "NOT_RECORDED" },
        { title: "PDF_INITIATOR_NAME", value: response?.InitiatorinfoDetails?.initiatorNameEn || "NOT_RECORDED" },
        { title: "PDF_INITIATOR_AADHAR", value: response?.InitiatorinfoDetails?.initiatorAadhar || "NOT_RECORDED" },
        { title: "PDF_INITIATOR_MOBILE_NO", value: response?.InitiatorinfoDetails?.initiatorMobile || "NOT_RECORDED" },
        { title: "PDF_INITIATOR_DESIGNATION", value: response?.InitiatorinfoDetails?.initiatorDesi || "NOT_RECORDED" },
        { title: "PDF_INITIATOR_ADDRESS", value: response?.InitiatorinfoDetails?.initiatorAddress || "NOT_RECORDED" },

      ],
    };
    const InformarHospitalInstitution = {
      title: "CR_INFORMANT_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "CR_INFORMANT_NAME", value: response?.InformarHosInstDetails?.infomantFirstNameEn || "NOT_RECORDED" },
        { title: "CS_COMMON_AADHAAR", value: response?.InformarHosInstDetails?.infomantAadhar || "NOT_RECORDED" },
        { title: "CR_MOBILE_NO", value: response?.InformarHosInstDetails?.infomantMobile || "NOT_RECORDED" },
        { title: "CR_INFORMER_DESIGNATION", value: response?.InformarHosInstDetails?.informerDesi || "NOT_RECORDED" },
        { title: "CR_INFORMER_ADDRESS", value: response?.InformarHosInstDetails?.informerAddress || "NOT_RECORDED" },

      ],
    };

    response && employeeResponse.push(Birthdetails);
    response && employeeResponse.push(childdetails);
    if (response?.birthPlace === "HOSPITAL") {
      response && employeeResponse.push(birthPlaceHospDetails);
    } else if (response?.birthPlace === "INSTITUTION") {
      response && employeeResponse.push(birthPlaceINSTITUTIONDetails);
    } else if (response?.birthPlace === "HOME") {
      response && employeeResponse.push(birthPlaceHOMEDetails);
    } else if (response?.birthPlace === "VEHICLE") {
      response && employeeResponse.push(birthPlaceVEHICLEDetails);
    } else if (response?.birthPlace === "PUBLIC_PLACES") {
      response && employeeResponse.push(birthPlacePUBLICPLACESDetails);
    }
    response && employeeResponse.push(parentInfo);
    if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName === "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName != "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    }
    response && employeeResponse.push(statisticalInfo);
    if (response?.InitiatorinfoDetails?.initiatorAadhar != null) {
      response && employeeResponse.push(InitiatorDetails);
    } else if (response?.InformarHosInstDetails?.infomantAadhar != null) {
      response && employeeResponse.push(InformarHospitalInstitution);
    }
    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};