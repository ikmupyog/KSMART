import cloneDeep from "lodash/cloneDeep";
import { notifyManager } from "react-query";
import { TLService } from "../../elements/TL";

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
const getAddress = (address, t) => {
  return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
    }${t(Digit.Utils.pt.getMohallaLocale(address?.locality.code, address?.tenantId))}, ${t(Digit.Utils.pt.getCityLocale(address?.tenantId))}${address?.pincode && t(address?.pincode) ? `, ${address.pincode}` : " "
    }`;
};
export const TLSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response.Licenses[0];
  },
  correctionapplication: async (details) => {
    const response = await TLService.search(details);
    return response.Licenses[0];
  },
  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response.Licenses;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType, applicationType) => {
    const filter = applicationType === "CORRECTION" ? { applicationNumber: applicationNumber, applicationType: applicationType} : { applicationNumber };
 //   const response = applicationType === "CORRECTION" ? await TLSearch.correctionapplication(filter) : await TLSearch.application(tenantId, filter);
    const response = await TLSearch.application(tenantId, filter);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const licenseNumbers = response?.licenseNumber;
      const filters = { licenseNumbers, offset: 0 };
      numOfApplications = await TLSearch.numberOfApplications(tenantId, filters);
    }
    // let propertyAddress = "";
    // if (propertyDetails && propertyDetails?.Properties.length) {
    //   propertyAddress = getAddress(propertyDetails?.Properties[0]?.address, t);
    // }
    // console.log("response"+response);


    let employeeResponse = [];
    const tradesummary = {
      title: "TL_TRADE_APPLICATION_DETAILS_LABEL",
      asSectionHeader: true,
    }
    const tradedetails = {
      title: "TL_COMMON_TR_DETAILS",
      //asSectionHeader: true,
      values: [
        { title: "TL_FINANCIAL_YEAR_LABEL", value: response?.financialYear ? `FY${response?.financialYear}` : "NA" },
        { title: "TL_APPLICANT_ID_LABEL", value: response?.applicationNumber ? `${response?.applicationNumber}` : "NA" },
        // { title: "TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL", value: response?.licenseType ? `TRADELICENSE_LICENSETYPE_${response?.licenseType}` : "NA" },
        { title: "TL_COMMON_TABLE_COL_TRD_NAME", value: response?.licenseUnitName },
        {
          title: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL",
          value: response?.commencementDate ? convertEpochToDate(response?.commencementDate) : "NA",
        },
        {
          title: "TL_LOCALIZATION_SECTOR",
          value: response?.tradeLicenseDetail?.businessSector
            ? response?.tradeLicenseDetail?.businessSector
            : "NA",
        },
        {
          title: "TL_LOCALIZATION_CAPITAL_AMOUNT",
          value: response?.tradeLicenseDetail?.capitalInvestment
            ? response?.tradeLicenseDetail?.capitalInvestment
            : "NA",
        },
        {
          title: "TL_NEW_NUMBER_OF_EMPLOYEES_LABEL",
          value: response?.tradeLicenseDetail?.noOfEmployees || "NA"
        },
      ],
    };
    const tradeUnits = {
      title: "TL_TRADE_UNITS_HEADER",
      values: []
    };
    response?.tradeLicenseDetail?.tradeUnits?.map((unit, index) => {
      if (index === 0) {
        tradeUnits.values.push({
          title: "TRADELICENSE_TRADECATEGORY_LABEL",
          value: unit?.businessCategory ? `${unit?.businessCategory}` : "NA"
        });
      }
      tradeUnits.values.push({
        title: "TRADELICENSE_TRADETYPE_LABEL",
        value: unit?.businessType ? `${stringReplaceAll(unit?.businessType, ".", "_")}` : "NA"
      });
      tradeUnits.values.push({
        title: "TL_NEW_TRADE_SUB_TYPE_LABEL",
        value: unit?.businessSubtype ? `${stringReplaceAll(unit?.businessSubtype, ".", "_")}` : "NA"
      })
    });


    let strucutreplacedet = [];
    if (response?.tradeLicenseDetail?.structureType?.includes("LAND")) {
      response?.tradeLicenseDetail?.structurePlace.map((structreplace) => {
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_BLOCK_NO",
          value: structreplace?.blockNo
            ? structreplace?.blockNo
            : "NA"
        });
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_SURVEY_NO",
          value: structreplace?.surveyNo
            ? structreplace?.surveyNo
            : "NA"
        });
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_SUBDIVISION_NO",
          value: structreplace?.subDivisionNo
            ? structreplace?.subDivisionNo
            : "NA"
        });
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_PARTITION_NO",
          value: structreplace?.partitionNo
            ? structreplace?.partitionNo
            : "NA"
        });
      })
    }
    if (response?.tradeLicenseDetail?.structureType?.includes("BUILDING")) {
      response?.tradeLicenseDetail?.structurePlace.map((structreplace) => {
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_DOOR_NO",
          value: structreplace?.doorNo
            ? structreplace?.doorNo
            : "NA"
        });
        strucutreplacedet.push({
          title: "TL_LOCALIZATION_DOOR_NO_SUB",
          value: structreplace?.doorNoSub
            ? structreplace?.doorNoSub
            : "NA"
        })
      })
    }
    if (response?.tradeLicenseDetail?.structureType?.includes("VEHICLE")) {
      response?.tradeLicenseDetail?.structurePlace.map((structreplace) => {
        strucutreplacedet.push({
          title: "TL_VECHICLE_NO",
          value: structreplace?.vehicleNo
            ? structreplace?.vehicleNo
            : "NA"
        })
      })
    }
    if (response?.tradeLicenseDetail?.structureType?.includes("WATER")) {
      response?.tradeLicenseDetail?.structurePlace.map((structreplace) => {
        strucutreplacedet.push({
          title: "TL_VESSEL_NO",
          value: structreplace?.vesselNo
            ? structreplace?.vesselNo
            : "NA"
        })
      })
    }
    const structurePlace1 = {
      title: "TL_PLACE_ACTIVITY",
      values: [
        {
          title: "TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL",
          value: response?.tradeLicenseDetail?.structureType
        },
        {
          title: "TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL",
          value: response?.tradeLicenseDetail?.structurePlaceSubtype
            ? response?.tradeLicenseDetail?.structurePlaceSubtype
            : "NA",
        },
      ],

    }

    strucutreplacedet.map((ob) => {
      structurePlace1.values.push(ob)
    })
    const tradeAddress = {
      title: "TL_CHECK_ADDRESS",
      values: [
        { title: "TL_LOCALIZATION_WARD_NO", value: response?.tradeLicenseDetail?.address?.wardNo || "NA" },
        { title: "TL_LOCALIZATION_BUILDING_NO", value: response?.tradeLicenseDetail?.address?.doorNo || "NA" },
        { title: "TL_LOCALIZATION_STREET_NAME", value: response?.tradeLicenseDetail?.address?.street || "NA" },
        { title: "TL_LOCALIZATION_LAND_MARK", value: response?.tradeLicenseDetail?.address?.landmark || "NA" },
        { title: "CORE_COMMON_PINCODE", value: response?.tradeLicenseDetail?.address?.pincode || "NA" },
        { title: "TL_CONTACT_NO", value: response?.tradeLicenseDetail?.address?.contactNo || "NA" },
        { title: "TL_LOCALIZATION_EMAIL_ID", value: response?.tradeLicenseDetail?.address?.email || "NA" },

      ],
    };

    const owners = {
      title: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
      values: []
    };
    response?.tradeLicenseDetail?.licenseeType?.includes("INSTITUTION") ?
      response?.tradeLicenseDetail?.owners?.map((owner, index) => {
        let licenseeType = response?.tradeLicenseDetail?.licenseeType
          ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
          : "NA";

        owners.values.push({ title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType });
        owners.values.push({ title: "TL_INSTITUTION_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.instituionName || "NA" });
        owners.values.push({ title: "TL_NEW_OWNER_DESIG_LABEL", value: response?.tradeLicenseDetail?.institution?.designation || "NA" });
        owners.values.push({
          title: "TL_TELEPHONE_NUMBER_LABEL",
          value:
            response?.tradeLicenseDetail?.institution?.contactNo || response?.tradeLicenseDetail?.institution?.contactNo !== ""
              ? response?.tradeLicenseDetail?.institution?.contactNo
              : "NA",
        });
        owners.values.push({ title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" });
        owners.values.push({ title: "TL_NEW_OWNER_DETAILS_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.name || "NA" });
        owners.values.push({ title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || owner?.emailId !== "" ? owner?.emailId : "NA" });
      }) :
      response?.tradeLicenseDetail?.owners?.map((owner, index) => {
        let licenseeType = response?.tradeLicenseDetail?.licenseeType
          ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
          : "NA";
        owners.values.push({ title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType });
        owners.values.push({ title: "TL_OWNER_S_NAME_LABEL", value: owner?.name || "NA" });
        owners.values.push({ title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" });
        owners.values.push({ title: "TL_GUARDIAN_S_NAME_LABEL", value: owner?.careOf + " " + owner?.careOfName || "NA" });
        owners.values.push({ title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || "NA" });
      });

    const ownersdocument = {
      title: "PT_COMMON_DOCS",
      additionalDetails: {
        documents: [
          {
            //  title: "PT_COMMON_DOCS",
            values: []
          }
        ]
      }
    };

    response?.tradeLicenseDetail?.applicationDocuments?.map((document) => {
      ownersdocument.additionalDetails.documents[0].values.push({
        title: `TL_NEW_${document?.documentType.replace(".", "_")}`,
        documentType: document?.documentType,
        documentUid: document?.documentUid,
        fileStoreId: document?.fileStoreId,
      })
    });

    let correctiontag = JSON.parse(response?.correction);
    const correctionbasedet = {
      title: "TL_CORRECTION_DET",
      values: []
    }
    if (correctiontag?.tradeName != "") {
      correctionbasedet.values.push({ title: "TL_COMMON_TABLE_COL_TRD_NAME", value: correctiontag?.licenseUnitName || "NA" });
      correctionbasedet.values.push({ title: "TL_COMMON_TABLE_COL_TRD_NAME", value: correctiontag?.licenseUnitNameLocal || "NA" });
      // correctionbasedet.values.push({ title: "TL_LOCALIZATION_WARD_NO", value: correctiontag?.wardNo || "NA" });
    }


    correctiontag?.tradeUnits?.map((unit) => {
      correctionbasedet.values.push({ title: "TRADELICENSE_TRADECATEGORY_LABEL", value: unit?.businessCategory ? `${unit?.businessCategory}` : "NA" });
      correctionbasedet.values.push({ title: "TRADELICENSE_TRADETYPE_LABEL", value: unit?.businessType ? `${stringReplaceAll(unit?.businessType, ".", "_")}` : "NA" });
      correctionbasedet.values.push({ title: "TL_NEW_TRADE_SUB_TYPE_LABEL", value: unit?.businessSubtype ? `${stringReplaceAll(unit?.businessSubtype, ".", "_")}` : "NA" });
    });
    if (correctiontag?.structurePlace.length > 0) {
      correctionbasedet.values.push({
        title: "TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL",
        value: response?.tradeLicenseDetail?.structureType
      });
      correctionbasedet.values.push({
        title: "TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL",
        value: response?.tradeLicenseDetail?.structurePlaceSubtype
          ? response?.tradeLicenseDetail?.structurePlaceSubtype
          : "NA",
      });
      if (response?.tradeLicenseDetail?.structureType?.includes("LAND")) {
        correctiontag?.structurePlace?.map((structreplace) => {
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_BLOCK_NO",
            value: structreplace?.blockNo
              ? structreplace?.blockNo
              : "NA"
          });
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_SURVEY_NO",
            value: structreplace?.surveyNo
              ? structreplace?.surveyNo
              : "NA"
          });
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_SUBDIVISION_NO",
            value: structreplace?.subDivisionNo
              ? structreplace?.subDivisionNo
              : "NA"
          });
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_PARTITION_NO",
            value: structreplace?.partitionNo
              ? structreplace?.partitionNo
              : "NA"
          });
        });
      }
      if (response?.tradeLicenseDetail?.structureType?.includes("BUILDING")) {
        correctiontag?.structurePlace?.map((structreplace) => {
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_DOOR_NO",
            value: structreplace?.doorNo
              ? structreplace?.doorNo
              : "NA"
          });
          correctionbasedet.values.push({
            title: "TL_LOCALIZATION_DOOR_NO_SUB",
            value: structreplace?.doorNoSub
              ? structreplace?.doorNoSub
              : "NA"
          })
        })
      }
      if (response?.tradeLicenseDetail?.structureType?.includes("VEHICLE")) {
        correctiontag?.structurePlace?.map((structreplace) => {
          correctionbasedet.values.push({
            title: "TL_VECHICLE_NO",
            value: structreplace?.vehicleNo
              ? structreplace?.vehicleNo
              : "NA"
          })
        })
      }
      if (response?.tradeLicenseDetail?.structureType?.includes("WATER")) {
        correctiontag?.structurePlace?.map((structreplace) => {
          correctionbasedet.values.push({
            title: "TL_VESSEL_NO",
            value: structreplace?.vesselNo
              ? structreplace?.vesselNo
              : "NA"
          })
        })
      }
    }
    if (correctiontag?.owners.length > 0) {
      response?.tradeLicenseDetail?.licenseeType?.includes("INSTITUTION") ?
        correctiontag?.owners?.map((owner) => {
          let licenseeType = response?.tradeLicenseDetail?.licenseeType
            ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
            : "NA";

          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType });
          correctionbasedet.values.push({ title: "TL_INSTITUTION_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.instituionName || "NA" });
          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DESIG_LABEL", value: response?.tradeLicenseDetail?.institution?.designation || "NA" });
          correctionbasedet.values.push({
            title: "TL_TELEPHONE_NUMBER_LABEL",
            value:
              response?.tradeLicenseDetail?.institution?.contactNo || response?.tradeLicenseDetail?.institution?.contactNo !== ""
                ? response?.tradeLicenseDetail?.institution?.contactNo
                : "NA",
          });
          correctionbasedet.values.push({ title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" });
          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DETAILS_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.name || "NA" });
          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || owner?.emailId !== "" ? owner?.emailId : "NA" });
        }) :
        correctiontag?.owners?.map((owner) => {
          let licenseeType = response?.tradeLicenseDetail?.licenseeType
            ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
            : "NA";
          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType });
          correctionbasedet.values.push({ title: "TL_OWNER_S_NAME_LABEL", value: owner?.name + "  " + owner?.applicantNameLocal || "NA" });
          correctionbasedet.values.push({ title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" });
          correctionbasedet.values.push({ title: "TL_GUARDIAN_S_NAME_LABEL", value: owner?.careOf + " " + owner?.careOfName || "NA" });
          correctionbasedet.values.push({ title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || "NA" });
        });
    }


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

    response && employeeResponse.push(tradesummary);
    if ((response?.correctionId !== null && response?.correctionId !== "" &&
      response?.correctionAppNumber !== null && response?.correctionAppNumber !== "")) {
      if (correctionbasedet.values.length !== 0) {
        response && employeeResponse.push(correctionbasedet);
      }
    }
    response && employeeResponse.push(tradedetails);
    response?.tradeLicenseDetail?.tradeUnits && employeeResponse.push(tradeUnits);
    response?.tradeLicenseDetail?.structureType && employeeResponse.push(structurePlace1);

    // response?.tradeLicenseDetail?.accessories && employeeResponse.push(accessories);
    // propertyDetails?.Properties?.length > 0 && employeeResponse.push(PropertyDetail);
    // response && !(propertyDetails?.Properties?.length > 0) && employeeResponse.push(tradeAddress);
    response?.tradeLicenseDetail?.address && employeeResponse.push(tradeAddress);
    response?.tradeLicenseDetail?.owners && employeeResponse.push(owners);


    response?.tradeLicenseDetail?.applicationDocuments && employeeResponse.push(ownersdocument);
    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      //   additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
