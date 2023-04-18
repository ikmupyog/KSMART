import cloneDeep from "lodash/cloneDeep";
import { CRMarriageService } from "../../elements/CRMARRIAGE";
// import { convertEpochToDateDMY } from  "../../utils";

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

/* method to get date from epoch */
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
export const CRSearchMarriage = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageService({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageService({ tenantId, filters });
    return response.MarriageDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageService({ tenantId, filters });
    return response.MarriageDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRMarriageService.application(tenantId, filter);
    console.log({ response });
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const marriageNumbers = response?.applicationNumber;
      const filters = { marriageNumbers, offset: 0 };
      numOfApplications = await CRMarriageService.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const MarriageSummaryDetails = {
      title: "CR_MARRIAGE_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const MarriageDetails = {
      title: "CR_MARRIAGE_REGISTRATION_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "CR_DATE_OF_MARRIAGE", value: response?.marriageDOM ? convertEpochToDate(response?.marriageDOM) : "NA" },
        { title: "MARRIAGE_DISTRICT_ID", value: response?.marriageDistrictid },
        // { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        // { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA" },
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
    response && employeeResponse.push(MarriageDetails);
    // response && employeeResponse.push(childdetails);
    // response && employeeResponse.push(parentInfo);
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
