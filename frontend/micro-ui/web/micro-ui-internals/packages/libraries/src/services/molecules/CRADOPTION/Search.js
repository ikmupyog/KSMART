import cloneDeep from "lodash/cloneDeep";
import { CRService } from "../../elements/CR";
// import { convertEpochToDateDMY } from  "../../utils";
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
export const CRsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response.ChildDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRsearch.application(tenantId, filter);
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
    const AdoptionDetails = {
      title: "CR_ADOPTION_SUMMARY_DETAILS",
      asSectionHeader: true,      
    }
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value:getFormattedValue(response, "birthPlace",false) },
       ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_NAME_OF_MOTHER", value: getFormattedValue(response, "ParentsDetails.motherFirstName") },
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar || "NA"},   
        // { title: "CR_BIRTH_MOTHER_AADHAR_LABEL", value: response?.ParentsDetails?.motherAadhar || NA },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.motherNationality || "NA"},  
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.motherEducation || "NA"},   
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.motherProfession || "NA"},     
        // { title: "CR_BIRTH_MOTHER_EMAIL_LABEL", value: response?.ParentsDetails.emailid || "NA" },
        // { title: "CR_BIRTH_MOTHER_MOBILE_LABEL", value: response?.ParentsDetails.mobileno || "NA" },
        
        { title: "PDF_BIRTH_NAME_OF_FATHER", value: getFormattedValue(response, "ParentsDetails.fatherFirstName") },
        { title: "CR_BIRTH_FATHER_AADHAR_LABEL", value: response?.ParentsDetails?.fatherAadhar || NA },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.fatherNationality || "NA" },       
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.fatherEducation || "NA" },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.fatherProfession   || "NA" },
        { title: "CS_COMMON_RELIGION", value: response?.ParentsDetails?.Religion || "NA" },  
       
        { title: "CR_BIRTH_FATHER_MOBILE_LABEL", value: response?.ParentsDetails?.fatherMobile || NA },
        { title: "CR_BIRTH_FATHER_EMAIL_LABEL", value: response?.ParentsDetails?.fatherEmail || NA },
      ],
    };
    const AddressBirthDetailsInfo = {
      title: "CR_ADDRESS_INFORMATION_HEADER",
      values: [
        // { title: "CR_BIRTH_PERS_HO_NAME_LABEL", value: getFormattedValue(response, "AddressBirthDetails.presentInsideKeralaHouseName") },
        // { title: "CR_BIRTH_PERS_STREET_LABEL", value: getFormattedValue(response, "AddressBirthDetails.presentInsideKeralaStreetName") },
        // { title: "CR_BIRTH_PERS_LOCALITY_LABEL", value: getFormattedValue(response, "AddressBirthDetails.presentInsideKeralaLocalityName") },
        // { title: "CR_BIRTH_PERS_POSTOFFICE_LABEL", value: getFormattedValue(response, "AddressBirthDetails.presentInsideKeralaPostOffice", false) },
        // { title: "CR_BIRTH_PERS_PINCODE_LABEL", value: response?.AddressBirthDetails?.presentInsideKeralaPincode || NA },
        // { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.AddressBirthDetails?.presentInsideKeralaDistrict || NA },
        // { title: "CR_BIRTH_PERS_STATE_LABEL", value: response?.AddressBirthDetails?.presentaddressStateName || NA },
        // { title: "CR_BIRTH_PERS_COUNTRY_LABEL", value: response?.AddressBirthDetails?.presentaddressCountry || NA },
        // { title: "CR_BIRTH_PERM_HO_NAME_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrHouseName") },
        // { title: "CR_BIRTH_PERM_STREET_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrStreetName") },
        // { title: "CR_BIRTH_PERM_LOCALITY_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrLocalityName") },
        // { title: "CR_BIRTH_PERM_POSTOFFICE_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrPostOffice", false) },
        // { title: "CR_BIRTH_PERM_PINCODE_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrPincode", false) },
        // { title: "CR_BIRTH_PERM_DISTRICT_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permntInKeralaAdrDistrict", false) },
        // { title: "CR_BIRTH_PERM_STATE_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permtaddressStateName", false) },
        //  { title: "CR_BIRTH_PERM_COUNTRY_LABEL", value: getFormattedValue(response, "AddressBirthDetails.permtaddressCountry", false) },

        { title: "PDF_BIRTH_PRESENT_ADDRESS",  value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn + " , " + response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn  + " , " + response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn + " , " + response?.AddressBirthDetails?.presentInsideKeralaPostOffice?.name + " , " + response?.AddressBirthDetails?.presentInsideKeralaPincode
        + " , " +  response?.AddressBirthDetails?.presentInsideKeralaDistrict    + " , " +  response?.AddressBirthDetails?.presentaddressStateName + " , " +    response?.AddressBirthDetails?.presentaddressCountry },
          {  value:response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl + " , " + response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl  + " , " + response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl + " , " + response?.AddressBirthDetails?.presentInsideKeralaPostOffice + " , " + 
          response?.AddressBirthDetails?.presentInsideKeralaPincode   + " , " +  response?.AddressBirthDetails?.presentInsideKeralaDistrict     + " , " +  response?.AddressBirthDetails?.presentaddressStateName  + " , " +    response?.AddressBirthDetails?.presentaddressCountry  || "CR_NOT_RECORDED"},
      
      
          { title: "PDF_BIRTH_PERMANENT_ADDRESS",  value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn + " , " + response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn  + " , " + response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrPostOffice?.name + " , " + response?.AddressBirthDetails?.permntInKeralaAdrPincode
          + " , " +  response?.AddressBirthDetails?.permntInKeralaAdrDistrict?.name     + " , " +  response?.AddressBirthDetails?.permtaddressStateName?.name + " , " +    response?.AddressBirthDetails?.permtaddressCountry.name },
      {value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl + " , " + response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl  + " , " + response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl?.name + " , " + response?.AddressBirthDetails?.permntInKeralaAdrPincode
      + " , " +  response?.AddressBirthDetails?.permntInKeralaAdrDistrict?.namelocal     + " , " +  response?.AddressBirthDetails?.permtaddressStateName.namelocal + " , " +    response?.AddressBirthDetails?.permtaddressCountry?.namelocal },
       
    ],
  
    };

    response && employeeResponse.push(AdoptionDetails);
    response && employeeResponse.push(childdetails);
    response && employeeResponse.push(parentInfo);
    response && employeeResponse.push(AddressBirthDetailsInfo);
    // response && employeeResponse.push(motherInfo);
    // response && employeeResponse.push(addressInfo);
    // response && employeeResponse.push(statisticalInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};