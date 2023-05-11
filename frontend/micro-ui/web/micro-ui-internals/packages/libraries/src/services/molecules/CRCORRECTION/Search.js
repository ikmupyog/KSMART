import { CRService } from "../../elements/CR";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";

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
export const CRCorrectionSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response;
  },
  birthApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRBirthCorrectionSearch({ tenantId, filters });
    console.log("birth resp==",response);
    return response?.CorrectionApplication?.[0];
  },
  deathApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRDeathCorrectionSearch({ tenantId, filters });
    console.log("death resp==",response);
    return response;
  },
  marriageApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageCorrectionSearch({ tenantId, filters });
    console.log("marriage resp==",response);
    return response;
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, correctionType) => {
    console.log("applicationNumber",correctionType,correctionType === "birth");
    const filter = { applicationNumber };
    let response = [];
    if(correctionType === "birth"){
     response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    } else if(correctionType === "death"){
      response = await CRCorrectionSearch.deathApplication(tenantId, filter);
    } else if(correctionType === "marriage") {
      response = await CRCorrectionSearch.marriageApplication(tenantId, filter);
    }
    console.log("resappp===",response);

    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    // if (response?.licenseNumber) {
    //   const birthNumbers = response?.applicationNumber;
    //   const filters = { birthNumbers, offset: 0 };
    //   numOfApplications = await CRsearch.numberOfApplications(tenantId, filters);
    // }
    let employeeResponse = [];

    const getCorrectionFieldValues = (correctionFieldValues) =>{
      const formattedCorrectionvalues =  correctionFieldValues?.map((item)=>{
       
         return ({ title: t(item.column), oldValue: item.oldValue ,newValue: item.newValue  })
      })
      console.log("returnd correction values==",formattedCorrectionvalues);
      return formattedCorrectionvalues;
    }

    const formatBirthCorrectionDetails = (correctionData) =>{
      if(correctionData?.length > 0 ){
         const formattedCorrectionData = correctionData?.map((item)=>{
          console.log("looped item",item);  
          const correctionValues = item.correctionFieldValue;
          const correctionTitle = item.correctionFieldName;
          const correctionFieldValues = getCorrectionFieldValues(item.correctionFieldValue)
          // correctionValues.map((corr)=>{
          // console.log("corr-----item",corr);
         
          return (
            {
              title: t(correctionTitle),
              asSectionHeader: true,
              fieldValues: correctionFieldValues,
              // documents:
            }
          )
        // })
         })
         return formattedCorrectionData;
    }
  }

    const birthCorrectionDetails =  await formatBirthCorrectionDetails(response?.CorrectionField);

    console.log("birthCorrectionDetails==",birthCorrectionDetails);
    // {
    //   title: "CR_BIRTH_CHILD_DETAILS",
    //   asSectionHeader: true,
    //   values: [
    //     { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
    //     { title: "CR_DATE_OF_BIRTH_TIME", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : NA },
    //     { title: "CR_TIME_OF_BIRTH", value: response?.birthDateTime ? response?.birthDateTime : NA },
    //     { title: "CR_GENDER", value: response?.gender },
    //     { title: "CS_COMMON_CHILD_AADHAAR", value: response?.childAadharNo ? response?.childAadharNo : "NA" },
    //     { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + " " + response?.childLastNameEn },
    //     { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameMl + " " + response?.childMiddleNameMl + " " + response?.childLastNameMl },

    //   ],
    // };

    const Birthdetails = {
      title: "CR_BIRTH_SUMMARY_DETAILS",
      asSectionHeader: true,
    }
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "CR_DATE_OF_BIRTH_TIME", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : NA },
        { title: "CR_TIME_OF_BIRTH", value: response?.birthDateTime ? response?.birthDateTime : NA },
        { title: "CR_GENDER", value: response?.gender },
        { title: "CS_COMMON_CHILD_AADHAAR", value: response?.childAadharNo ? response?.childAadharNo : "NA" },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + " " + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameMl + " " + response?.childMiddleNameMl + " " + response?.childLastNameMl },

      ],
    };
    const birthPlaceHospDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_HOSPITAL_EN", value: response?.hospitalName || "NA" },
        { title: "CR_HOSPITAL_ML", value: response?.hospitalNameMl || "NA" },
      ],
    };
    const birthPlaceINSTITUTIONDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || "NA" },
        { title: "CR_INSTITUTION_NAME_EN", value:  response?.institutionId ? response?.institutionId : "NA" },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.institutionIdMl ? response?.institutionIdMl : "NA" },
      ],
    };
    const birthPlaceHOMEDetails = {
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
    const birthPlaceVEHICLEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_VEHICLE_TYPE", value: response?.hospitalName || "NA" },
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
    const birthPlacePUBLICPLACESDetails = {
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
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: response?.medicalAttensionSubEn + " / " + response?.medicalAttensionSubMl || "NA" },
        { title: "CR_PREGNANCY_DURATION", value: response?.pregnancyDuration || NA },
        { title: "CR_DELIVERY_METHOD", value: response?.deliveryMethodsEn + " / " + response?.deliveryMethodsMl || "NA" },
        { title: "CR_BIRTH_WEIGHT", value: response?.birthWeight || NA },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "CS_COMMON_AADHAAR", value: response?.ParentsDetails?.motherAadhar || "NA" },
        { title: "CR_MOTHER_NAME_EN", value: response?.ParentsDetails.motherFirstNameEn || "NA" },
        { title: "CR_MOTHER_NAME_ML", value: response?.ParentsDetails.motherFirstNameMl || "NA" },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.motherNationalityEn + " / " + (response?.ParentsDetails?.motherNationalityMl != null ? response?.ParentsDetails?.motherNationalityMl : "") || "NA" },
        { title: "CR_MOTHER_MARITAL_STATUS", value: response?.ParentsDetails?.motherMaritalStatus || "NA" },
        { title: "CR_MOTHER_AGE_MARRIAGE", value: response?.ParentsDetails?.motherMarriageAge || "NA" },
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.ParentsDetails?.motherMarriageBirth || "NA" },
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.ParentsDetails?.orderofChildren || "NA" },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.motherEducationEn + " / " + response?.ParentsDetails?.motherEducationMl || "NA" },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.motherProfessionEn + " / " + response?.ParentsDetails?.motherProfessionMl || "NA" },
        { title: "CS_COMMON_AADHAAR", value: response?.ParentsDetails?.fatherAadhar || NA },
        { title: "CR_FATHER_NAME_EN", value: response?.ParentsDetails.fatherFirstNameEn || "NA" },
        { title: "CR_FATHER_NAME_ML", value: response?.ParentsDetails.fatherFirstNameMl || "NA" },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.fatherNationalityEn + " / " + (response?.ParentsDetails?.motherNationalityMl != null ? response?.ParentsDetails?.fatherNationalityMl : "") || "NA" },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.fatherEducationEn + " / " + response?.ParentsDetails?.fatherEducationMl || "NA" },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.fatherProfessionEn + " / " + response?.ParentsDetails?.fatherProfessionMl || "NA" },
        { title: "CS_COMMON_RELIGION", value: response?.ParentsDetails?.ReligionEn + " / " + response?.ParentsDetails?.ReligionMl || "NA" },
        { title: "CR_PARENTS_CONTACT_NO", value: response?.ParentsDetails?.fatherMobile || NA },
        { title: "CR_PARENTS_EMAIL", value: response?.ParentsDetails?.fatherEmail || NA },
      ],
    };
    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPresentEn + " / " + (response?.AddressBirthDetails?.countryIdPresentMl != null ? response?.AddressBirthDetails?.countryIdPresentMl : "") || "NA" },
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
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.countryIdPermanentEn + " / " + (response?.AddressBirthDetails?.countryIdPermanentMl != null ? response?.AddressBirthDetails?.countryIdPermanentMl : "") || "NA" },
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
    // } else if (response?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

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
    const InitiatorDetails = {
      title: "CR_INITIATOR_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "CR_RELATION", value: response?.InitiatorinfoDetails?.relation || "NA" },
        { title: "PDF_INITIATOR_NAME", value: response?.InitiatorinfoDetails?.initiatorNameEn || "NA" },
        { title: "PDF_INITIATOR_AADHAR", value: response?.InitiatorinfoDetails?.initiatorAadhar || "NA" },
        { title: "PDF_INITIATOR_MOBILE_NO", value: response?.InitiatorinfoDetails?.initiatorMobile || "NA" },
        { title: "PDF_INITIATOR_DESIGNATION", value: response?.InitiatorinfoDetails?.initiatorDesi || "NA" },
        { title: "PDF_INITIATOR_ADDRESS", value: response?.InitiatorinfoDetails?.initiatorAddress || "NA" },

      ],
    };
    const InformarHospitalInstitution = {
      title: "CR_INFORMANT_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.InformarHosInstDetails?.infomantFirstNameEn || "NA" },
        { title: "PDF_INFORMER_AADHAR", value: response?.InformarHosInstDetails?.infomantAadhar || "NA" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.InformarHosInstDetails?.infomantMobile || "NA" },
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.InformarHosInstDetails?.informerDesi || "NA" },
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.InformarHosInstDetails?.informerAddress || "NA" },

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
    } else if (response?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA" ) {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    }
    response && employeeResponse.push(statisticalInfo);
    response && employeeResponse.push(InitiatorDetails);
    response && employeeResponse.push(InformarHospitalInstitution);
    return {
      tenantId: response.tenantId,
      // applicationDetails: employeeResponse,
      applicationDetails: birthCorrectionDetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response, 
      numOfApplications: numOfApplications,
    };
  },
};