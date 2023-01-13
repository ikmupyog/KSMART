import cloneDeep from "lodash/cloneDeep";
import { DFMService } from "../../elements/DFM";
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
export const DFMsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await DFMService.DFMsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await DFMService.DFMsearch({ tenantId, filters });
    console.log('dfm-appl',response);
    return response.ApplicantPersonals[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await DFMService.DFMsearch({ tenantId, filters });
    return response.ApplicantPersonals;
  },

  applicationDetails: async (t, tenantId, fileCode, userType) => {
    console.log("applicationNo" + fileCode);
    const filter = { fileCode };
    const response = await DFMsearch.application(tenantId, filter);
    console.log('DFM-res',response);
    
  
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    // if (response?.licenseNumber) {
    //   const licenseNumbers = response?.applicationno;
    //   const filters = { licenseNumbers, offset: 0 };
    //   numOfApplications = await DFMsearch.numberOfApplications(tenantId, filters);
    // }

    // let propertyAddress = "";
    // if (propertyDetails && propertyDetails?.Properties.length) {
    //   propertyAddress = getAddress(propertyDetails?.Properties[0]?.address, t);
    // }
//     File Code, Applicant Name, Service Name, Name of Owner, Owner Mobile Number,
// Ward Name, Building No, Sub No, House Name, Street,PostOffice,Pincode,
// Name of Occupier,Duration of residence of occupier
// Documents Uploaded details
    let employeeResponse = [];
    const applicationInfo = {
      title: "Applicant Personal",
      asSectionHeader: true,
      values: [
        { title: "First Name", value: response?.firstName || "NA" },
        { title: "First Name Mal", value: response?.lastName || "NA" },
        { title: "Aadhar No ", value: response?.aadhaarNo || "NA" },
        { title: "Mobile No", value: response?.mobileNo || "NA" },
        // { title: "Email", value: response?.email || "NA" },
        // { title: "File Code", value: response?.fileDetail?.fileCode || "NA" },
        // { title: "Applicant Name", value: response?.firstName +' '+response?.lastName || "NA" },
        // { title: "Service Name", value: response?.serviceDetails?.serviceId?.fileCode || "NA" },
        // { title: "Name of Owner", value: response?.applicantAddress?.ownerName|| "NA" },
        // { title: "Owner Mobile Number", value: response?.mobileNo || "NA" },
     
      
        // { title: "Street", value: response?.applicantAddress?.street || "NA" },
     
        // { title: "Documents Uploaded details", value: response?.fileDetail?.fileNumber || "NA" },
       
      ],
    };
    const addressInfo = {
      title: "Applicant Address",
      values: [
         { title: "Door No", value: response?.applicantAddress?.DoorNo || "NA" },
        //  { title: "Sub No", value: response?.applicantAddress?.subNo || "NA" },
         { title: "House Name", value: response?.applicantAddress?.houseName || "NA" },
         { title: "House Name Mal", value: response?.applicantAddress?.houseName || "NA" },
         { title: "Pincode", value: response?.applicantAddress?.pincode || "NA" },
         { title: "PostOffice", value: response?.applicantAddress?.postOfficeName || "NA" },
         { title: "Local place", value: response?.applicantAddress?.localPlace || "NA" },
         { title: "Local place Mal ", value: response?.applicantAddress?.localPlace || "NA" },
         { title: "Main place", value: response?.applicantAddress?.mainPlace || "NA" },
         { title: "Main place Mal", value: response?.applicantAddress?.mainPlace || "NA" },
          { title: "Ward No", value: response?.applicantAddress?.WardNo || "NA" },
        // { title: "Taluk", value: response?.applicantAddress?.taluk || "NA" },
        // { title: "Village", value: response?.applicantAddress?.village || "NA" },
      
      ],
    };
    const documentInfo = {
      title: "Applicant Document",
      values: [
        { title: "documentInfo", value: "NA"},
      ],
    };
    const serviceDetailInfo = {
      title: "Applicant Service Detail",
      values: [
         { title: "Service Code", value: response?.serviceDetails?.NameOccupier  },
        { title: "Service SubType", value: response?.serviceDetails?.OwnerName || "NA"},
        { title: "Service MinorType", value: response?.serviceDetails?.OwnerMobileNo || "NA" },

        // { title: "Name of Occupier", value: response?.serviceDetails?.NameOccupier  },
        // { title: "Name of owner", value: response?.serviceDetails?.OwnerName || "NA"},
        // { title: "Owner Mobile No", value: response?.serviceDetails?.OwnerMobileNo || "NA" },
        // { title: "Residence Duration", value: response?.serviceDetails?.ResidenceDuration || "NA" },
        // { title: "Details", value: response?.serviceDetails?.ServiceDetailsTxt || "NA" },
      ],
    };

    const serviceDocumentInfo = {
      title: "ApplicantServiceDocument",
      values: [
        { title: "fileArisingMode", value: "NA"},
        { title: "fileArisingDate", value: "NA"},
        { title: "applicationDate", value: "NA"},
        { title: "workflowCode", value: "NA"},
        { title: "action", value: "NA"},
        { title: "businessService", value: "NA"},
        { title: "assignees", value: "NA"},
        // { title: "List all attachments (While clicking can view from AWS)", value: "NA"},
      ],
    };
    // const statisticalInfo = {
    //   title: "CR_STATSTICAL_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_STATSTICAL_WEIGHT_LABEL", value: response?.birthStatistical?.weight_of_child || "NA" },
    //     { title: "CR_STATSTICAL_HEIGHT_LABEL", value: response?.birthStatistical?.height_of_child || "NA" },
    //     { title: "CR_STATSTICAL_PWEEK_LABEL", value: response?.birthStatistical?.duration_of_pregnancy_in_week || "NA" },
    //     { title: "CR_STATSTICAL_DEL_METHOD_LABEL", value: response?.birthStatistical?.delivery_method || "NA" },
    //   ],
    // };
    // console.log('res-em',childdetails);

    // const tradeUnits = {
    //   title: "TL_TRADE_UNITS_HEADER",
    //   additionalDetails: {
    //     units: response?.tradeLicenseDetail?.tradeUnits?.map((unit, index) => {
    //       let tradeSubType = stringReplaceAll(unit?.tradeType, ".", "_");
    //       tradeSubType = stringReplaceAll(tradeSubType, "-", "_");
    //       return {
    //         title: "TL_UNIT_HEADER",
    //         values: [
    //           {
    //             title: "TRADELICENSE_TRADECATEGORY_LABEL",
    //             value: unit?.tradeType ? `TRADELICENSE_TRADETYPE_${unit?.tradeType?.split(".")[0]}` : "NA",
    //           },
    //           { title: "TRADELICENSE_TRADETYPE_LABEL", value: unit?.tradeType ? `TRADELICENSE_TRADETYPE_${unit?.tradeType?.split(".")[1]}` : "NA" },
    //           { title: "TL_NEW_TRADE_SUB_TYPE_LABEL", value: tradeSubType ? `TRADELICENSE_TRADETYPE_${tradeSubType}` : "NA" },
    //           { title: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER", value: unit?.uom || "NA" },
    //           { title: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL", value: unit?.uomValue || "NA" },
    //         ],
    //       };
    //     }),
    //   },
    // };

    // const accessories = {
    //   title: "TL_NEW_TRADE_DETAILS_HEADER_ACC",
    //   // asSectionHeader: true,
    //   additionalDetails: {
    //     accessories: response?.tradeLicenseDetail?.accessories?.map((unit, index) => {
    //       let accessoryCategory = "NA";
    //       if (unit?.accessoryCategory) {
    //         accessoryCategory = stringReplaceAll(unit?.accessoryCategory, ".", "_");
    //         accessoryCategory = `TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(accessoryCategory, "-", "_")}`;
    //       }
    //       return {
    //         title: "TL_ACCESSORY_LABEL",
    //         values: [
    //           { title: "TL_NEW_TRADE_DETAILS_ACC_LABEL", value: accessoryCategory },
    //           { title: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER", value: unit?.uom || "NA" },
    //           { title: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL", value: unit?.uomValue || "NA" },
    //           { title: "TL_ACCESSORY_COUNT_LABEL", value: unit?.count || "NA" },
    //         ],
    //       };
    //     }),
    //   },
    // };

    // const PropertyDetail = {
    //   title: "PT_DETAILS",
    //   values: [
    //     { title: "TL_PROPERTY_ID", value: propertyDetails?.Properties?.[0]?.propertyId || "NA" },
    //     { title: "PT_OWNER_NAME", value: propertyDetails?.Properties?.[0]?.owners[0]?.name || "NA" },
    //     { title: "PROPERTY_ADDRESS", value: propertyAddress || "NA" },
    //     {
    //       title: "TL_VIEW_PROPERTY_DETAIL",
    //       to: `/digit-ui/employee/commonpt/view-property?propertyId=${propertyDetails?.Properties?.[0]?.propertyId}&tenantId=${propertyDetails?.Properties?.[0]?.tenantId}&from=TL_APPLICATION_DETAILS_LABEL`,
    //       value: "",
    //       isLink: true,
    //     },
    //   ],
    // };

    // const cityOfApp = cloneDeep(response?.tradeLicenseDetail?.address?.city);
    // const localityCode = cloneDeep(response?.tradeLicenseDetail?.address?.locality?.code);
    // const tradeAddress = {
    //   title: "TL_CHECK_ADDRESS",
    //   values: [
    //     { title: "CORE_COMMON_PINCODE", value: response?.tradeLicenseDetail?.address?.pincode || "NA" },
    //     { title: "MYCITY_CODE_LABEL", value: response?.tradeLicenseDetail?.address?.city || "NA" },
    //     { title: "TL_LOCALIZATION_LOCALITY", value: `${stringReplaceAll(cityOfApp?.toUpperCase(), ".", "_")}_REVENUE_${localityCode}` },
    //     { title: "TL_LOCALIZATION_BUILDING_NO", value: response?.tradeLicenseDetail?.address?.doorNo || "NA" },
    //     { title: "TL_LOCALIZATION_STREET_NAME", value: response?.tradeLicenseDetail?.address?.street || "NA" },
    //   ],
    // };

    // const checkOwnerLength = response?.tradeLicenseDetail?.owners?.length || 1;
    // const owners = response?.tradeLicenseDetail?.subOwnerShipCategory.includes("INSTITUTIONAL")
    //   ? {
    //       title: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
    //       additionalDetails: {
    //         owners: response?.tradeLicenseDetail?.owners?.map((owner, index) => {
    //           let subOwnerShipCategory = response?.tradeLicenseDetail?.subOwnerShipCategory
    //             ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.subOwnerShipCategory, ".", "_")}`
    //             : "NA";
    //           return {
    //             title: Number(checkOwnerLength) > 1 ? "TL_PAYMENT_PAID_BY_PLACEHOLDER" : "",
    //             values: [
    //               { title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: subOwnerShipCategory },
    //               { title: "TL_INSTITUTION_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.instituionName || "NA" },
    //               { title: "TL_NEW_OWNER_DESIG_LABEL", value: response?.tradeLicenseDetail?.institution?.designation || "NA" },
    //               {
    //                 title: "TL_TELEPHONE_NUMBER_LABEL",
    //                 value:
    //                   response?.tradeLicenseDetail?.institution?.contactNo || response?.tradeLicenseDetail?.institution?.contactNo !== ""
    //                     ? response?.tradeLicenseDetail?.institution?.contactNo
    //                     : "NA",
    //               },
    //               { title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" },
    //               { title: "TL_NEW_OWNER_DETAILS_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.name || "NA" },
    //               { title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || owner?.emailId !== "" ? owner?.emailId : "NA" },
    //             ],
    //           };
    //         }),
    //         documents: [
    //           {
    //             title: "PT_COMMON_DOCS",
    //             values: response?.tradeLicenseDetail?.applicationDocuments?.map((document) => {
    //               return {
    //                 title: `TL_NEW_${document?.documentType.replace(".", "_")}`,
    //                 documentType: document?.documentType,
    //                 documentUid: document?.documentUid,
    //                 fileStoreId: document?.fileStoreId,
    //               };
    //             }),
    //           },
    //         ],
    //       },
    //     }
    //   : {
    //       title: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
    //       additionalDetails: {
    //         owners: response?.tradeLicenseDetail?.owners?.map((owner, index) => {
    //           let subOwnerShipCategory = response?.tradeLicenseDetail?.subOwnerShipCategory
    //             ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.subOwnerShipCategory, ".", "_")}`
    //             : "NA";
    //           return {
    //             title: Number(checkOwnerLength) > 1 ? "TL_PAYMENT_PAID_BY_PLACEHOLDER" : "",
    //             values: [
    //               { title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: subOwnerShipCategory },
    //               { title: "TL_OWNER_S_NAME_LABEL", value: owner?.name || "NA" },
    //               { title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" },
    //               { title: "TL_GUARDIAN_S_NAME_LABEL", value: owner?.fatherOrHusbandName || "NA" },
    //               { title: "TL_RELATIONSHIP_WITH_GUARDIAN_LABEL", value: owner?.relationship || "NA" },
    //               { title: "TL_NEW_OWNER_DETAILS_GENDER_LABEL", value: owner?.gender || "NA" },
    //               { title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || "NA" },
    //               { title: "TL_OWNER_SPECIAL_CATEGORY", value: owner?.ownerType ? `COMMON_MASTERS_OWNERTYPE_${owner?.ownerType}` : "NA" },
    //               { title: "TL_NEW_OWNER_DETAILS_ADDR_LABEL", value: owner?.permanentAddress || "NA" },
    //             ],
    //           };
    //         }),
    //         documents: [
    //           {
    //             title: "PT_COMMON_DOCS",
    //             values: response?.tradeLicenseDetail?.applicationDocuments?.map((document) => {
    //               return {
    //                 title: `TL_NEW_${document?.documentType.replace(".", "_")}`,
    //                 documentType: document?.documentType,
    //                 documentUid: document?.documentUid,
    //                 fileStoreId: document?.fileStoreId,
    //               };
    //             }),
    //           },
    //         ],
    //       },
    //     };

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

     employeeResponse.push(applicationInfo);
     employeeResponse.push(addressInfo);
     employeeResponse.push(documentInfo);
     employeeResponse.push(serviceDetailInfo);
     employeeResponse.push(serviceDocumentInfo);
    //  employeeResponse.push(statisticalInfo);
    // response?.tradeLicenseDetail?.tradeUnits && employeeResponse.push(tradeUnits);
    // response?.tradeLicenseDetail?.accessories && employeeResponse.push(accessories);
    // propertyDetails?.Properties?.length > 0 && employeeResponse.push(PropertyDetail);
    // response && !(propertyDetails?.Properties?.length > 0) && employeeResponse.push(tradeAddress);
    // response?.tradeLicenseDetail?.owners && employeeResponse.push(owners);

    console.log('das',employeeResponse); 
    return {
      tenantId: response?.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
    // return employeeResponse
    // return response
  },
};
