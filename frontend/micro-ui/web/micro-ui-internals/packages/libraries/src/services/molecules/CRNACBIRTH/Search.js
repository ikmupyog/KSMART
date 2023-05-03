import cloneDeep from "lodash/cloneDeep";
import { CRNACBirthService } from "../../elements/CRNACBIRTH";
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
export const CRNACsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    console.log(response, "response");

    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    console.log(response, "response");

    return response.nacDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    console.log(response, "response");

    return response.nacDetails[0];
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    const filter = { applicationNumber };
    const response = await CRNACsearch.application(tenantId, filter);
    console.log(response, "response");

    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRNACsearch.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const Birthdetails = {
      title: "CR_BIRTH_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        {
          title: "PDF_BIRTH_CHILD_NAME",
          value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + "  " + response?.childLastNameEn,
        },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace || "NA" },
        { title: "PDF_BIRTH_AADHAR_NO", value: response?.childAadharNo || "NA" },
        { title: "PDF_BIRTH_ORDER", value: response?.nacorderofChildren || "NA" },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA",
        },
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar || "NA" },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA",
        },
        { title: "PDF_BIRTH_FATHER_AADHAR", value: response?.ParentsDetails?.fatherAadhar || "NA" },
      ],
    };
    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.countryIdPresentEn +
              " / " +
              (response?.AddressBirthDetails?.countryIdPresentMl != null ? response?.AddressBirthDetails?.countryIdPresentMl : "") || "NA",
        },
        {
          title: "CS_COMMON_STATE",
          value: response?.AddressBirthDetails.stateIdPresentEn + " / " + response?.AddressBirthDetails.stateIdPresentMl || "NA",
        },
        {
          title: "CS_COMMON_DISTRICT",
          value: response?.AddressBirthDetails?.districtIdPresentEn + " / " + response?.AddressBirthDetails.districtIdPresentMl || "NA",
        },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.presentInsideKeralaTaluk || "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.presentInsideKeralaVillage || "NA" },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || "NA",
        },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.presentWardNo || "NA" },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl ||
            "NA",
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || "NA" },
        //Permanent Address
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.countryIdPermanentEn +
              " / " +
              (response?.ParentsDetails?.countryIdPermanentMl != null ? response?.ParentsDetails?.countryIdPermanentMl : "") || "NA",
        },
        {
          title: "CS_COMMON_STATE",
          value: response?.AddressBirthDetails.stateIdPermanentEn + " / " + response?.AddressBirthDetails.stateIdPermanentMl || "NA",
        },
        {
          title: "CS_COMMON_DISTRICT",
          value: response?.AddressBirthDetails?.districtIdPermanentEn + " / " + response?.AddressBirthDetails.districtIdPermanentMl || "NA",
        },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.permntInKeralaAdrTaluk || "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.permntInKeralaAdrVillage || "NA" },
        {
          title: "CS_COMMON_LB_NAME",
          value: response?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || "NA",
        },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.permntInKeralaWardNo || "NA" },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl ||
            "NA",
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || "NA" },
      ],
    };
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
      ],
    };
    // const PresentAddressBirthDetailsInfo = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [
    //     {
    //       title: "PDF_BIRTH_PRESENT_ADDRESS",
    //       value:
    //         response?.AddressBirthDetails.presentInsideKeralaHouseNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaStreetNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaVillage +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaTaluk +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaDistrict +
    //         " , " +
    //         response?.AddressBirthDetails.presentaddressStateName +
    //         " , " +
    //         response?.AddressBirthDetails.presentaddressCountry +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaPostOffice +
    //         " , " +
    //         response?.AddressBirthDetails.presentInsideKeralaPincode,
    //     },

    //     {
    //       value:
    //         response?.AddressBirthDetails.presentInsideKeralaHouseNameMl +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaStreetNameMl +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaVillage +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaTaluk +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaDistrict +
    //           " , " +
    //           response?.AddressBirthDetails.presentaddressStateName +
    //           " , " +
    //           response?.AddressBirthDetails.presentaddressCountry +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaPostOffice +
    //           " , " +
    //           response?.AddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED",
    //     },

    //     {
    //       title: "PDF_BIRTH_PERMANENT_ADDRESS",
    //       value:
    //         response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrVillage +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrTaluk +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrDistrict +
    //         " , " +
    //         response?.AddressBirthDetails.permtaddressStateName +
    //         " , " +
    //         response?.AddressBirthDetails.permtaddressCountry +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrPostOffice +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrPincode,
    //     },
    //     {
    //       value:
    //         response?.AddressBirthDetails.permntInKeralaAdrHouseNameMl +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrStreetNameMl +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrVillage +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrTaluk +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrDistrict +
    //         " , " +
    //         response?.AddressBirthDetails.permtaddressStateName +
    //         " , " +
    //         response?.AddressBirthDetails.permtaddressCountry +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrPostOffice +
    //         " , " +
    //         response?.AddressBirthDetails.permntInKeralaAdrPincode,
    //     },
    //   ],
    // };
    const initiatorInfo = {
      title: "CR_APPLICANT_INFORMATION_HEADER",
      values: [
        {
          title: "CR_APPLICANT_NAME",
          value: response?.ApplicantDetails.applicantNameEn || "NA",
        },
        { title: "CR_APPLICANT_AADHAR", value: response?.ApplicantDetails.aadharNo || "NA" },
        { title: "CR_APPLICANT_MOBILE", value: response?.ApplicantDetails.mobileNo || "NA" },
        { title: "CR_APPLICANT_ADDRESS", value: response?.ApplicantDetails.applicantAddressEn || "NA" },
        { title: "CR_CARE_OF_APPLICATION", value: response?.ApplicantDetails.careofapplicant || "NA" },
      ],
    };

    // const childInfo = {
    //   title: "CR_APPLICANT_OTHER_CHILDREN_HEADER",
    //   values: [
    //     { title: "PDF_BIRTH_CHILD_NAME", value: response?.OtherChildren.childNameEn || "NA" },
    //     { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.OtherChildren.dob || "NA" },
    //     { title: "PDF_BIRTH_CHILD_SEX", value: response?.OtherChildren.sex || "NA" },
    //     { title: "PDF_BIRTH_ORDER", value: response?.OtherChildren.nacorderofChildren || "NA" },
    //   ],
    // };
    const Docdetails = {
      title: "Document SUMMARY DETAILS",
      documents: true,
      tenentId: Digit.ULBService.getStateId(),
      values: response.BirthNACDocuments.map((doc) => doc?.fileStoreId),
    };

    response && employeeResponse.push(Birthdetails);
    response && employeeResponse.push(childdetails);
    response && employeeResponse.push(parentInfo);
    response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    response && employeeResponse.push(initiatorInfo);
    // response && employeeResponse.push(childInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents: Docdetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
