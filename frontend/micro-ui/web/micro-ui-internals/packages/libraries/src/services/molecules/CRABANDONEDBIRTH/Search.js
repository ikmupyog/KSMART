import cloneDeep from "lodash/cloneDeep";
import { CRABNBirthService } from "../../elements/CRABANDONEDBIRTH";
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
export const CRAbandonedsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRABNBirthService.CRAbandonedsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRABNBirthService.CRAbandonedsearch({ tenantId, filters });
    console.log(response);
    return response.AbandonedDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRABNBirthService.CRAbandonedsearch({ tenantId, filters });
    return response.AbandonedDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRAbandonedsearch.application(tenantId, filter);
    // console.log(response);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRAbandonedsearch.numberOfApplications(tenantId, filters);
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
        // { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NOT_RECORDED" },
        // { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NOT_RECORDED"}, 
        
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
        // { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || "NOT_RECORDED" },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeCode ? response?.institutionTypeCode : "NOT_RECORDED" },
        { title: "CR_INSTITUTION_NAME_EN", value:  response?.institutionId ? response?.institutionId : "NOT_RECORDED" },
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
        { title: "CR_VEHICLE_TYPE", value: response?.vehicleType || "NOT_RECORDED" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || "NOT_RECORDED" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || "NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || "NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || "NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || "NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || "NOT_RECORDED" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.setadmittedHospitalEn || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NOT_RECORDED" },
      ],
    };
    const birthPlacePUBLICPLACESDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NOT_RECORDED" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceType || "NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "NOT_RECORDED" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "NOT_RECORDED" },
      ],
    };
    // const parentInfo = {
    //   title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
    //   values: [
    //     { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NOT_RECORDED"},
    //     { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar  || "NOT_RECORDED"},
    //     { title: "PDF_BIRTH_MOTHER_ADDRESS", value: response?.ParentsDetails?.addressOfMother  || "NOT_RECORDED"},
    //   ],
    // };
    const motherInfo = {
      title: "CR_BIRTH_MOTHER_INFORMATION_HEADER",
      values: [
        { title: "CR_MOTHER_NAME_EN", value: response?.ParentsDetails.motherFirstNameEn || "NOT_RECORDED" },
        { title: "CR_MOTHER_NAME_ML", value: response?.ParentsDetails.motherFirstNameMl || "NOT_RECORDED" },        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar  || "NOT_RECORDED"},
        { title: "PDF_BIRTH_MOTHER_ADDRESS", value: response?.ParentsDetails?.addressOfMother  || "NOT_RECORDED"},
      ],
    };
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: response?.medicalAttensionSub || "NOT_RECORDED" },
        { title: "CR_PREGNANCY_DURATION", value: response?.pregnancyDuration || "NOT_RECORDED" },
        { title: "CR_DELIVERY_METHOD", value: response?.deliveryMethods || "NOT_RECORDED" },
        { title: "CR_BIRTH_WEIGHT", value: response?.birthWeight || "NOT_RECORDED" },
      ],
    };
    const childCustodyInfo = {
      title: "CR_CARETAKER_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_INSTITUTION", value: response?.caretakerDetails?.institutionName || "NOT_RECORDED" },
        { title: "PDF_BIRTH_CARETAKER_NAME", value: response?.caretakerDetails?.caretakerName || "NOT_RECORDED" },
        { title: "PDF_BIRTH_CARETAKER_DESI", value: response?.caretakerDetails?.caretakerDesignation || "NOT_RECORDED" },
        { title: "PDF_BIRTH_CARETAKER_MOBILE", value: response?.caretakerDetails?.caretakerMobile || "NOT_RECORDED" },     
        { title: "PDF_BIRTH_CARETAKER_ADDRESS", value: response?.caretakerDetails?.caretakerAddress || "NOT_RECORDED" },
        
      ],
    };
   
    const informantDetailsInfo = {
      title: "CR_OFFICIAL_INFORMANT_HEADER",
      values: [
        { title: "PDF_BIRTH_OFFICE_INSTITUTION", value: response?.InformarHosInstDetails?.infomantinstitution || "NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.InformarHosInstDetails?.infomantFirstNameEn || "NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.InformarHosInstDetails?.informerDesi || "NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.InformarHosInstDetails?.infomantMobile || "NOT_RECORDED" },
        { title: "CS_COMMON_AADHAAR", value: response?.InformarHosInstDetails?.infomantAadhar || "NOT_RECORDED" },  
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.InformarHosInstDetails?.informerAddress || "NOT_RECORDED" },
        
      ],
    };
    // if (response?.workflowCode == "NewTL" && response?.status !== "APPROVED") {
    //   const details = {
    //     title: "",
    //     values: [
    //       { title: "TL_COMMON_TABLE_COL_APP_NO", value: response?.applicationNumber || "NOT_RECORDED" },
    //       {
    //         title: "TL_APPLICATION_CHALLAN_LABEL",
    //         value: (response?.tradeLicenseDetail?.channel && `TL_CHANNEL_${response?.tradeLicenseDetail?.channel}`) || "NOT_RECORDED",
    //       },
    //     ],
    //   };
    //   response && employeeResponse.push(details);
    // }
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
    response && employeeResponse.push(motherInfo);
    response && employeeResponse.push(statisticalInfo);
    response && employeeResponse.push(childCustodyInfo);
    response && employeeResponse.push(informantDetailsInfo);
    

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};