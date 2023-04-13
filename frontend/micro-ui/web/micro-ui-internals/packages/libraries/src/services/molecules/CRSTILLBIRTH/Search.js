import cloneDeep from "lodash/cloneDeep";
import { CRStillBirthService } from "../../elements/CRSTILLBIRTH";
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
    // console.log(response);
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
        // { title: "PDF_BIRTH_CHILD_NAME", value: response?.stillbirthchilddetails?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"},       
         { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.adrsHouseNameEn   || "NA"},    
       ],
       
    };
    
    const StillBirthParentsDetails = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.StillBirthParentsDetails?.motherAadhar || "NA"},   
        { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.StillBirthParentsDetails?.motherFirstNameEn + " / " + response?.StillBirthParentsDetails?.motherFirstNameMl || "NA"},
     
        { title: "CR_NATIONALITY", value: response?.StillBirthParentsDetails?.motherNationality || "NA"},   
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.StillBirthParentsDetails?.motherMarriageBirth || "NA"},   
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.StillBirthParentsDetails?.orderofChildren || "NA"},   
        { title: "CR_EDUCATION", value: response?.StillBirthParentsDetails?.motherEducation || "NA"},   
        { title: "CR_PROFESSIONAL", value: response?.StillBirthParentsDetails?.motherProfession || "NA"},     
        { title: "CR_NATIONALITY", value: response?.StillBirthParentsDetails?.motherNationality || "NA"},   
       
        { title: "PDF_BIRTH_FATHER_AADHAR", value: response?.StillBirthParentsDetails?.fatherAadhar || "NA"},  
        { title: "PDF_BIRTH_NAME_OF_FATHER", value: response?.StillBirthParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},       
        { title: "CR_NATIONALITY", value: response?.StillBirthParentsDetails?.fatherNationality || "NA" },       
       { title: "CR_EDUCATION", value: response?.StillBirthParentsDetails?.fatherEducation || "NA" },
       { title: "CR_PROFESSIONAL", value: response?.fatherProfession   || "NA" },
     
       { title: "CS_COMMON_RELIGION", value: response?.StillBirthParentsDetails?.Religion || "NA" },  
       { title: "PDF_BIRTH_FATHER_MOBILE_NO", value: response?.StillBirthParentsDetails?.fatherMobile || "NA" },
       { title: "PDF_BIRTH_FATHER_EMAIL", value: response?.StillBirthParentsDetails?.fatherEmail || "NA" },       
       
      ],
    };
    const AddressBirthDetails = {
      title: "CR_ADDRESS_INFORMATION_HEADER",
      values: [
   
        { title: "PDF_BIRTH_PRESENT_ADDRESS",  value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameEn  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice.name + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode
        + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict    + " , " +  response?.AddressBirthDetails.presentaddressStateName + " , " +    response?.AddressBirthDetails.presentaddressCountry },
          {  value:response?.AddressBirthDetails.presentInsideKeralaHouseNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameMl  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode   + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict     + " , " +  response?.AddressBirthDetails.presentaddressStateName  + " , " +    response?.AddressBirthDetails.presentaddressCountry  || "CR_NOT_RECORDED"},
          { title: "PDF_BIRTH_PERMANENT_ADDRESS",  value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrPostOffice.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
          + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.name     + " , " +  response?.AddressBirthDetails.permtaddressStateName.name + " , " +    response?.AddressBirthDetails.permtaddressCountry.name },
      {value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameMl  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
      + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.namelocal     + " , " +  response?.AddressBirthDetails.permtaddressStateName.namelocal + " , " +    response?.AddressBirthDetails.permtaddressCountry.namelocal },
      
      
          // { title: "PDF_BIRTH_NAME_OF_FATHER", value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},
        // { title: "CR_BIRTH_PERS_HO_NAME_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_STREET_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaStreetNameEn || "CR_NOT_RECORDED"},
        //  { title: "CR_BIRTH_PERS_LOCALITY_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn || "CR_NOT_RECORDED"},
        //  { title: "CR_BIRTH_PERS_POSTOFFICE_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaPostOffice.name || "CR_NOT_RECORDED"},
        //   { title: "CR_BIRTH_PERS_PINCODE_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED"},
        //  { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaDistrict.name|| "CR_NOT_RECORDED"},
        //  { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.AddressBirthDetails.presentaddressStateName.name|| "CR_NOT_RECORDED"},
       
        // { title: "CR_BIRTH_PERS_COUNTRY_LABEL", value: response?.AddressBirthDetails.presentaddressCountry.name || "CR_NOT_RECORDED"},

        // { title: "CR_BIRTH_PERM_HO_NAME_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_STREET_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_LOCALITY_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_POSTOFFICE_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrPostOffice.name || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_PINCODE_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_DISTRICT_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrDistrict.name|| "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_STATE_LABEL", value: response?.AddressBirthDetails.permtaddressStateName.name || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERM_COUNTRY_LABEL", value: response?.AddressBirthDetails.permtaddressCountry.name || "CR_NOT_RECORDED"},
        
      
      ],
      

    };
    




    
    // const fatherInfo = {
    //   title: "CR_BIRTH_FATHER_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_BIRTH_FATHERNAME_LABEL", value: response?.birthFather.firstname_en + response?.birthFather.middlename_en + response?.birthFather.lastname_en },
    //     { title: "CR_BIRTH_FATHER_AADHAR_LABEL", value: response?.birthFather.aadharno || "NA" },
    //     { title: "CR_BIRTH_FATHER_EMAIL_LABEL", value: response?.birthFather.emailid || "NA" },
    //     { title: "CR_BIRTH_FATHER_MOBILE_LABEL", value: response?.birthFather.mobileno || "NA" },
    //   ],
    // };
    // const motherInfo = {
    //   title: "CR_BIRTH_MOTHER_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_BIRTH_MOTHERNAME_LABEL", value: response?.birthMother.firstname_en + " " + response?.birthMother.middlename_en + " " + response?.birthMother.lastname_en },
    //     { title: "CR_BIRTH_MOTHER_AADHAR_LABEL", value: response?.birthMother.aadharnoaadharno || "NA"},
    //     { title: "CR_BIRTH_MOTHER_EMAIL_LABEL", value: response?.birthMother.emailid || "NA" },
    //     { title: "CR_BIRTH_MOTHER_MOBILE_LABEL", value: response?.birthMother.mobileno || "NA" },
    //   ],
    // };
    // const addressInfo = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_BIRTH_PERM_HO_NO_LABEL", value: response?.birthPermanent.houseno || "NA"},
    //     { title: "CR_BIRTH_PERM_HO_NAME_LABEL", value: response?.birthPermanent.housename_en || "NA" },
    //     { title: "CR_BIRTH_PERM_HO_LOCALITY_LABEL", value: response?.birthPermanent.locality_en || "NA" },
    //     { title: "CR_BIRTH_PERM_HO_CITY_LABEL", value: response?.birthPermanent.city_en || "NA" },
    //   ],
    // };
    // const statisticalInfo = {
    //   title: "CR_STATSTICAL_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_STATSTICAL_WEIGHT_LABEL", value: response?.birthStatistical.weight_of_child || "NA" },
    //     { title: "CR_STATSTICAL_HEIGHT_LABEL", value: response?.birthStatistical.height_of_child || "NA" },
    //     { title: "CR_STATSTICAL_PWEEK_LABEL", value: response?.birthStatistical.duration_of_pregnancy_in_week || "NA" },
    //     { title: "CR_STATSTICAL_DEL_METHOD_LABEL", value: response?.birthStatistical.delivery_method || "NA" },
    //   ],
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
    const StillBirthInformarHosInstDetails = {
      title: "CR_INFORMANT_DETAILS",
     // asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.StillBirthInformarDetails?.infomantFirstNameEn || "NA" },
        { title: "PDF_INFORMER_AADHAR", value: response?.StillBirthInformarDetails?.infomantAadhar   || "NA" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.StillBirthInformarDetails?.infomantMobile  || "NA"},
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.StillBirthInformarDetails?.informerDesi || "NA" },
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.StillBirthInformarDetails?.informerAddress || "NA" },
        
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
    response && employeeResponse.push(StillBirthdetails);
    response && employeeResponse.push(stillbirthchilddetails);
    response && employeeResponse.push(StillBirthParentsDetails);
    // response && employeeResponse.push(motherInfo);
    response && employeeResponse.push(AddressBirthDetails);
     response && employeeResponse.push(statisticalInfo);
     response && employeeResponse.push(StillBirthInitiatorDetails);
     response && employeeResponse.push(StillBirthInformarHosInstDetails);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};