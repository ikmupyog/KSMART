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
      title: "Birth Application Summary Details",
      asSectionHeader: true,      
    }
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "CR_BIRTH_CHILDNAME_LABEL", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "CR_BIRTH_GENDER_LABEL", value: response?.gender},
        { title: "CR_BIRTH_DOB_LABEL", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "CR_BIRTH_PLACE_LABEL", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"},       
       ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "CR_BIRTH_MOTHER_NAME_LABEL", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA"},
        { title: "CR_BIRTH_FATHER_NAME_LABEL", value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},       
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
    response && employeeResponse.push(Birthdetails);
    response && employeeResponse.push(childdetails);
    response && employeeResponse.push(parentInfo);
    // response && employeeResponse.push(motherInfo);
    // response && employeeResponse.push(addressInfo);
    response && employeeResponse.push(statisticalInfo);
    // response?.tradeLicenseDetail?.tradeUnits && employeeResponse.push(tradeUnits);
    // response?.tradeLicenseDetail?.accessories && employeeResponse.push(accessories);
    // propertyDetails?.Properties?.length > 0 && employeeResponse.push(PropertyDetail);
    // response && !(propertyDetails?.Properties?.length > 0) && employeeResponse.push(tradeAddress);
    // response?.tradeLicenseDetail?.owners && employeeResponse.push(owners);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
