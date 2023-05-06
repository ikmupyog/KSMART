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
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        // { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        // { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"}, 
        
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
        // { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || "NA" },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeCode ? response?.institutionTypeCode : "NA" },
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
        { title: "CR_VEHICLE_TYPE", value: response?.vehicleType || "NA" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || "NA" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || "NA" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || "NA" },
        { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || "NA" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || "NA" },
        { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || "NA" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.setadmittedHospitalEn || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
      ],
    };
    const birthPlacePUBLICPLACESDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : "NA" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceType || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "NA" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "NA" },
      ],
    };
    // const parentInfo = {
    //   title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
    //   values: [
    //     { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA"},
    //     { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar  || "NA"},
    //     { title: "PDF_BIRTH_MOTHER_ADDRESS", value: response?.ParentsDetails?.addressOfMother  || "NA"},
    //   ],
    // };
    const motherInfo = {
      title: "CR_BIRTH_MOTHER_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA"},
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar  || "NA"},
        { title: "PDF_BIRTH_MOTHER_ADDRESS", value: response?.ParentsDetails?.addressOfMother  || "NA"},
      ],
    };
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_NATURE_MEDICAL_ATTENTION", value: response?.medicalAttensionSub || "NA" },
        { title: "PDF_BIRTH_DURATION_PREGNANCY", value: response?.pregnancyDuration || "NA" },
        { title: "PDF_BIRTH_DELIVERYMETHOD", value: response?.deliveryMethods || "NA" },
        { title: "PDF_BIRTH_WEIGHT", value: response?.birthWeight || "NA" },
      ],
    };
    const childCustodyInfo = {
      title: "CR_CARETAKER_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_INSTITUTION", value: response?.caretakerDetails?.institutionName || "NA" },
        { title: "PDF_BIRTH_CARETAKER_NAME", value: response?.caretakerDetails?.caretakerName || "NA" },
        { title: "PDF_BIRTH_CARETAKER_DESI", value: response?.caretakerDetails?.caretakerDesignation || "NA" },
        { title: "PDF_BIRTH_CARETAKER_MOBILE", value: response?.caretakerDetails?.caretakerMobile || "NA" },     
        { title: "PDF_BIRTH_CARETAKER_ADDRESS", value: response?.caretakerDetails?.caretakerAddress || "NA" },
        
      ],
    };
   
    const informantDetailsInfo = {
      title: "CR_OFFICIAL_INFORMANT_HEADER",
      values: [
        { title: "PDF_BIRTH_OFFICE_INSTITUTION", value: response?.InformarHosInstDetails?.infomantinstitution || "NA" },
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.InformarHosInstDetails?.infomantFirstNameEn || "NA" },
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.InformarHosInstDetails?.informerDesi || "NA" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.InformarHosInstDetails?.infomantMobile || "NA" },
        { title: "CS_COMMON_AADHAAR", value: response?.InformarHosInstDetails?.infomantAadhar || "NA" },  
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.InformarHosInstDetails?.informerAddress || "NA" },
        
      ],
    };
    // if (response?.workflowCode == "NewTL" && response?.status !== "APPROVED") {
    //   const details = {
    //     title: "",
    //     values: [
    //       { title: "TL_COMMON_TABLE_COL_APP_NO", value: response?.applicationNumber || "NA" },
    //       {
    //         title: "TL_APPLICATION_CHALLAN_LABEL",
    //         value: (response?.tradeLicenseDetail?.channel && `TL_CHANNEL_${response?.tradeLicenseDetail?.channel}`) || "NA",
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