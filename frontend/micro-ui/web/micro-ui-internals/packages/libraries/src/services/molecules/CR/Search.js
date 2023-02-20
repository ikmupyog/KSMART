import cloneDeep from "lodash/cloneDeep";
import { CRService } from "../../elements/CR";
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
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"},       
       ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "PDF_BIRTH_NAME_OF_MOTHER", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA"},
        { title: "PDF_BIRTH_NAME_OF_FATHER", value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},       
      ],
    };
    const AddressBirthDetailsInfo = {
      title: "CR_ADDRESS_INFORMATION_HEADER",
      // values: [
      //   { title: "CR_BIRTH_PERS_HO_NAME_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_STREET_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaStreetNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_LOCALITY_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_POSTOFFICE_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaPostOffice.name || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_PINCODE_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.AddressBirthDetails.presentInsideKeralaDistrict.name|| "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_STATE_LABEL", value: response?.AddressBirthDetails. AddressBirthDetails.presentaddressStateName.name || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERS_COUNTRY_LABEL", value: response?.AddressBirthDetails.presentaddressCountry.name || "CR_NOT_RECORDED"},

      //   { title: "CR_BIRTH_PERM_HO_NAME_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_STREET_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_LOCALITY_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_POSTOFFICE_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrPostOffice.name || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_PINCODE_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_DISTRICT_LABEL", value: response?.AddressBirthDetails.permntInKeralaAdrDistrict.name|| "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_STATE_LABEL", value: response?.AddressBirthDetails.permtaddressStateName.name || "CR_NOT_RECORDED"},
      //   { title: "CR_BIRTH_PERM_COUNTRY_LABEL", value: response?.AddressBirthDetails.permtaddressCountry.name || "CR_NOT_RECORDED"},
        
        
      // ],
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
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      // values: [
      //   { title: "CR_STATSTICAL_WEIGHT_LABEL", value: response?.birthStatistical.weight_of_child || "NA" },
      //   { title: "CR_STATSTICAL_HEIGHT_LABEL", value: response?.birthStatistical.height_of_child || "NA" },
      //   { title: "CR_STATSTICAL_PWEEK_LABEL", value: response?.birthStatistical.duration_of_pregnancy_in_week || "NA" },
      //   { title: "CR_STATSTICAL_DEL_METHOD_LABEL", value: response?.birthStatistical.delivery_method || "NA" },
      // ],
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
    response && employeeResponse.push(parentInfo);
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