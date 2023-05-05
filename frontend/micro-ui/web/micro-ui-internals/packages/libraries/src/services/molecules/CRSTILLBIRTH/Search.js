//import cloneDeep from "lodash/cloneDeep";
import { CRStillBirthService } from "../../elements/CRSTILLBIRTH";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";
// import { convertEpochToDateDMY } from  "../../utils";

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
export const CRStillBirthsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRStillBirthService.CRStillBirthsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRStillBirthService.CRStillBirthsearch({ tenantId, filters });
    return response.StillBirthChildDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRStillBirthService.CRStillBirthsearch({ tenantId, filters });
    return response.StillBirthChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRStillBirthsearch.application(tenantId, filter);
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
    const StillBirthdetails = {
      title: "CR_BIRTH_SUMMARY_DETAILS",
      asSectionHeader: true,      
    }
    const stillbirthchilddetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },        
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "CR_DATE_OF_BIRTH_TIME", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : NA },      
        { title: "CR_TIME_OF_BIRTH", value: response?.birthDateTime ? response?.birthDateTime : NA },              
        
       ],
       
    };
    const stillbirthPlaceHospDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_HOSPITAL_EN", value: response?.hospitalName || "NA" },
        { title: "CR_HOSPITAL_ML", value: response?.hospitalNameMl || "NA" },
      ],
    };
    const stillbirthPlaceINSTITUTIONDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || "NA" },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.hospitalNameMl || "NA" },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.hospitalNameMl || "NA" },
      ],
    };
    const stillbirthPlaceHOMEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.adrsPostOffice || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.adrsPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.adrsLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.adrsLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.adrsStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.adrsStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.adrsHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.adrsHouseNameMl || "NA" },
      ],
    };
    const stillbirthPlaceVEHICLEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_VEHICLE_TYPE", value: response?.vehicleType || "NA" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || "NA" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || "NA" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || "NA" },
        { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || "NA" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || "NA" },
        { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || "NA" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.hospitalName || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
      ],
    };
    const stillbirthPlacePUBLICPLACESDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "NA" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "NA" },
      ],
    };
    const StillBirthParentsDetails = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        
        { title: "CR_BIRTH_MOTHER_AADHAR", value: response?.StillBirthParentsDetails?.motherAadhar || "NA"},   
        { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.StillBirthParentsDetails?.motherFirstNameEn + " / " + response?.StillBirthParentsDetails?.motherFirstNameMl || "NA"},
     
        { title: "CR_NATIONALITY", value: response?.StillBirthParentsDetails?.motherNationality || "NA"},   
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.StillBirthParentsDetails?.motherMarriageBirth || "NA"},   
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.StillBirthParentsDetails?.orderofChildren || "NA"},   
        { title: "CR_EDUCATION", value: response?.StillBirthParentsDetails?.motherEducation || "NA"},   
        { title: "CR_PROFESSIONAL", value: response?.StillBirthParentsDetails?.motherProfession || "NA"}, 
      
       
        { title: "CR_BIRTH_FATHER_AADHAR", value: response?.StillBirthParentsDetails?.fatherAadhar || "NA"},  
        { title: "PDF_BIRTH_NAME_OF_FATHER", value: response?.StillBirthParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},       
        { title: "CR_NATIONALITY", value: response?.StillBirthParentsDetails?.fatherNationality || "NA" },       
       { title: "CR_EDUCATION", value: response?.StillBirthParentsDetails?.fatherEducation || "NA" },
       { title: "CR_PROFESSIONAL", value: response?.fatherProfession   || "NA" },
     
       { title: "CS_COMMON_RELIGION", value: response?.StillBirthParentsDetails?.Religion || "NA" },  
       { title: "PDF_BIRTH_FATHER_MOBILE_NO", value: response?.StillBirthParentsDetails?.fatherMobile || "NA" },
       { title: "PDF_BIRTH_FATHER_EMAIL", value: response?.StillBirthParentsDetails?.fatherEmail || "NA" },       
      
      ],
    };
    // const AddressBirthDetails = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [
   
    //     { title: "PDF_BIRTH_PRESENT_ADDRESS",  value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameEn  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice.name + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode
    //     + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict    + " , " +  response?.AddressBirthDetails.presentaddressStateName + " , " +    response?.AddressBirthDetails.presentaddressCountry },
    //       {  value:response?.AddressBirthDetails.presentInsideKeralaHouseNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameMl  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode   + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict     + " , " +  response?.AddressBirthDetails.presentaddressStateName  + " , " +    response?.AddressBirthDetails.presentaddressCountry  || "CR_NOT_RECORDED"},
    //       { title: "PDF_BIRTH_PERMANENT_ADDRESS",  value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrPostOffice.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
    //       + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.name     + " , " +  response?.AddressBirthDetails.permtaddressStateName.name + " , " +    response?.AddressBirthDetails.permtaddressCountry.name },
    //   {value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameMl  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
    //   + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.namelocal     + " , " +  response?.AddressBirthDetails.permtaddressStateName.namelocal + " , " +    response?.AddressBirthDetails.permtaddressCountry.namelocal },
      
     
        
      
    //   ],
      

    // };
    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPresentEn + " / " + (response?.ParentsDetails?.countryIdPresentMl != null ? response?.ParentsDetails?.countryIdPresentMl : "") || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.stateIdPresentEn + " / " + response?.AddressBirthDetails.stateIdPresentMl || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.districtIdPresentEn + " / " + response?.AddressBirthDetails.districtIdPresentMl || "NA" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.presentInsideKeralaTaluk || "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.presentInsideKeralaVillage || "NA" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.presentWardNo || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || "NA" },
        //Permanent Address
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPermanentEn + " / " + (response?.ParentsDetails?.countryIdPermanentMl != null ? response?.ParentsDetails?.countryIdPermanentMl : "") || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.stateIdPermanentEn + " / " + response?.AddressBirthDetails.stateIdPermanentMl || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.districtIdPermanentEn + " / " + response?.AddressBirthDetails.districtIdPermanentMl || "NA" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.permntInKeralaAdrTaluk || "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.permntInKeralaAdrVillage || "NA" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.permntInKeralaWardNo || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || "NA" },

      ]
    }


    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || "NA" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || "NA" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || "NA" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntOutsideKeralaDistrict || "NA" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.permntOutsideKeralaTaluk || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaVillage || "NA" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.permntOutsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || "NA" },
      ]
    }

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || "NA" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || "NA" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || "NA" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || "NA" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || "NA" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || "NA" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaVillage || "NA" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaCityTown || "NA" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.permanentOutsideIndiaPostCode || "NA" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.permntOutsideIndiaLineoneEn || "NA" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || "NA" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || "NA" },
      ]
    }
    
    
   // };
    
    const statisticalInfo = {
      title: "CR_STATISTICAL_DETAILS",
     // asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_NATURE_MEDICAL_ATTENTION", value: response?.medicalAttensionSub || "NA" },
        { title: "PDF_BIRTH_DURATION_PREGNANCY", value: response?.pregnancyDuration   || "NA" },
        { title: "PDF_BIRTH_DELIVERYMETHOD", value: response?.deliveryMethods },
        { title: "PDF_CAUSE_FOETAL_DEATH", value: response?.causeFoetalDeath || "NA" },
          
       ],
    };
    const StillBirthInitiatorDetails = {
      title: "CR_INITIATOR_DETAILS",
     // asSectionHeader: true,
      values: [
        { title: "PDF_INITIATOR_NAME", value: response?.StillBirthInitiatorDetails?.initiatorNameEn || "NA" },
        { title: "PDF_INITIATOR_AADHAR", value: response?.StillBirthInitiatorDetails?.initiatorAadhar   || "NA" },
        { title: "PDF_INITIATOR_MOBILE_NO", value: response?.StillBirthInitiatorDetails?.initiatorMobile  || "NA"},
        { title: "PDF_INITIATOR_DESIGNATION", value: response?.StillBirthInitiatorDetails?.initiatorDesi || "NA" },
        { title: "PDF_INITIATOR_ADDRESS", value: response?.StillBirthInitiatorDetails?.initiatorAddress || "NA" },
        
       ],
    };
    // const StillBirthInformarHosInstDetails = {
    //   title: "CR_INFORMANT_DETAILS",
    //  // asSectionHeader: true,
    //   values: [
    //     { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.StillBirthInformarDetails?.infomantFirstNameEn || "NA" },
    //     { title: "PDF_INFORMER_AADHAR", value: response?.StillBirthInformarDetails?.infomantAadhar   || "NA" },
    //     { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.StillBirthInformarDetails?.infomantMobile  || "NA"},
    //     { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.StillBirthInformarDetails?.informerDesi || "NA" },
    //     { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.StillBirthInformarDetails?.informerAddress || "NA" },
        
    //    ],
    // };
   
    response && employeeResponse.push(StillBirthdetails);
     response && employeeResponse.push(stillbirthchilddetails);
    if (response?.birthPlace === "HOSPITAL") {
      response && employeeResponse.push(stillbirthPlaceHospDetails);
    } else if (response?.birthPlace === "INSTITUTION") {
      response && employeeResponse.push(stillbirthPlaceINSTITUTIONDetails);
    } else if (response?.birthPlace === "HOME") {
       response && employeeResponse.push(stillbirthPlaceHOMEDetails);
   } 
   if (response?.birthPlace === "VEHICLE") {
      response && employeeResponse.push(stillbirthPlaceVEHICLEDetails);
    } else if (response?.belseirthPlace === "PUBLIC_PLACES") {
      response && employeeResponse.push(stillbirthPlacePUBLICPLACESDetails);
     }
    response && employeeResponse.push(StillBirthParentsDetails);
    if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName === "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName != "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA" ) {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    }  
    
     response && employeeResponse.push(statisticalInfo);
     response && employeeResponse.push(StillBirthInitiatorDetails);
    //  response && employeeResponse.push(StillBirthInformarHosInstDetails);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};