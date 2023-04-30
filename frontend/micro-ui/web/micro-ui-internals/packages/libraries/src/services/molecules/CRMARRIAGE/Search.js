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
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response.MarriageDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRMarriageService.CRMarriagesearch({ tenantId, filters });
    return response.MarriageDetails;
  },

  applicationDetails: async (t, tenantId, applicationNo, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNo };
    const response = await CRSearchMarriage.application(tenantId, filter);
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
        { title: `${t("CR_SEARCH_APP_NO_LABEL")}`, value: response?.applicationNumber || "NA" },
        { title: `${t("CR_DATE_OF_MARRIAGE")}`, value: response?.marriageDOM ? convertEpochToDate(response?.marriageDOM) : "NA" },
        { title: `${t("CS_COMMON_DISTRICT")}`, value: response?.marriageDistrictid ? response?.marriageDistrictid : "NA" },
        { title: `${t("CS_COMMON_TALUK")}`, value: response?.marriageTalukID ? response?.marriageTalukID : "NA" },
        { title: `${t("CS_COMMON_VILLAGE")}`, value: response?.marriageVillageName ? response?.marriageVillageName : "NA" },
        { title: `${t("CS_LBTYPE")}`, value: response?.marriageLBtype ? response?.marriageLBtype : "NA" },
        { title: `${t("CS_LB")}`, value: response?.marriageTenantid ? response?.marriageTenantid : "NA" },
        { title: `${t("CS_COMMON_WARD")}`, value: response?.marriageWardCode ? response?.marriageWardCode : "NA" },
        { title: `${t("CR_MARRIAGE_PLACE_TYPE")}`, value: response?.marriagePlacetype ? response?.marriagePlacetype : "NA" },
        {
          title: `${t("CR_MARRIAGE_TYPE")}`,
          value: response?.marriageType,
        },
      ],
    };

    if (
      response?.marriagePlacetype === "RELIGIOUS_INSTITUTION" ||
      response?.marriagePlacetype === "MANDAPAM_HALL_AND_OTHER" ||
      response?.marriagePlacetype === "SUB_REGISTRAR_OFFICE"
    ) {
      MarriageDetails.values.push({
        title: `${t("CR_NAME_OF_PLACE_EN")}/${t("CR_NAME_OF_PLACE_MAL")}`,
        value: `${response?.placeid}`,
      });
    } else if (response?.marriagePlacetype === "OTHER") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}/${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`,
          value: `${response?.marriagePlacenameEn}/${response?.marriagePlacenameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    } else if (response?.marriagePlacetype === "HOUSE") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_HOUSE_NO_AND_NAME_EN")}/${t("CR_HOUSE_NO_AND_NAME_MAL")}`,
          value: `${response?.marriageHouseNoAndNameEn}/${response?.marriageHouseNoAndNameMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    } else if (response?.marriagePlacetype === "PUBLIC_PLACE" || response?.marriagePlacetype === "PRIVATE_PLACE") {
      MarriageDetails.values.push(
        {
          title: `${t("CR_PUBLIC_PRIVATE_PLACE_EN")}/${t("CR_PUBLIC_PRIVATE_PLACE_ML")}`,
          value: `${response?.marriagePublicOrPrivateNamePlaceEn}/${response?.marriagePublicOrPrivateNamePlaceMl}`,
        },
        {
          title: `${t("CR_STREET_NAME_EN")}/${t("CR_STREET_NAME_ML")}`,
          value: `${response?.marriageStreetEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LOCALITY_EN")}/${t("CR_LOCALITY_ML")}`,
          value: `${response?.marriageLocalityEn}/${response?.marriageStreetMl}`,
        },
        {
          title: `${t("CR_LANDMARK")}`,
          value: response?.marriageLandmark,
        }
      );
    }

    const GroomDetails = {
      title: "CR_GROOM_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_GROOM_NATIONALITY_AND_RESIDENTSHIP")}`,
          value: response?.GroomDetails?.groomResidentShip ? response?.GroomDetails?.groomResidentShip : "NA",
        },
        {
          title: `${t("CR_GROOM_NAME")}`,
          value: `${response?.GroomDetails?.groomFirstnameEn ? response?.GroomDetails?.groomFirstnameEn : ""} ${
            response?.GroomDetails?.groomMiddlenameEn ? response?.GroomDetails?.groomMiddlenameEn : ""
          } ${response?.GroomDetails?.groomLastnameEn ? response?.GroomDetails?.groomLastnameEn : ""} / ${
            response?.GroomDetails?.groomFirstnameMl ? response?.GroomDetails?.groomFirstnameMl : ""
          } ${response?.GroomDetails?.groomMiddlenameMl ? response?.GroomDetails?.groomMiddlenameMl : ""} ${
            response?.GroomDetails?.groomLastnameMl ? response?.GroomDetails?.groomLastnameMl : ""
          }`,
        },
        {
          title: `${t("CR_GROOM_MOBILE_NO")}`,
          value: response?.GroomDetails?.groomMobile,
        },
        {
          title: `${t("CR_GROOM_EMAIL")}`,
          value: response?.GroomDetails?.groomEmailid,
        },
        {
          title: `${t("CR_GROOM_GENDER")}`,
          value: response?.GroomDetails?.groomGender,
        },
        {
          title: `${t("CR_GROOM_DATE_OF_BIRTH")}`,
          value: response?.GroomDetails?.groomDOB,
        },
        {
          title: `${t("CR_GROOM_AGE")}`,
          value: response?.GroomDetails?.groomAge,
        },
      ],
    };
    if (response?.GroomDetails?.groomResidentShip === "NRI" || response?.GroomDetails?.groomResidentShip === "FOREIGN") {
      GroomDetails.values.push(
        {
          title: `${t("CR_GROOM_PASSPORT_NO")}`,
          value: response?.GroomDetails?.groomPassportNo ? response?.GroomDetails?.groomPassportNo : "NA",
        },
        {
          title: `${t("CR_GROOM_SOCIAL_SECURITY_NO")}`,
          value: response?.GroomDetails?.groomSocialSecurityNo ? response?.GroomDetails?.groomSocialSecurityNo : "NA",
        }
      );
    } else if (response?.GroomDetails?.groomResidentShip === "INDIAN") {
      GroomDetails.values.push({
        title: `${t("CR_GROOM_AADHAR_NO")}`,
        value: response?.GroomDetails?.groomAadharNo ? response?.GroomDetails?.groomAadharNo : "NA",
      });
    }
    if (response?.GroomDetails?.groomMaritalstatusID === "MARRIED") {
      GroomDetails.values.push({
        title: `${t("CR_ANY_SPOUSE_LIVING")}`,
        value: response?.GroomDetails?.groomIsSpouseLiving ? "Yes" : "No",
      });
    }
    if (response?.GroomDetails?.groomMaritalstatusID === "MARRIED" && response?.GroomDetails?.groomIsSpouseLiving) {
      GroomDetails.values.push({ title: `${t("CR_NUMBER_OF_SPOUSE_LIVING")}`, value: response?.GroomDetails?.groomNoOfSpouse });
    }
    if (response?.GroomDetails?.groomParentGuardian === "PARENT") {
      GroomDetails.values.push(
        {
          title: `${t("CR_GROOM_FATHER_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomFatherAadharNo,
        },
        {
          title: `${t("CR_FATHER_NAME")}`,
          value: `${response?.GroomDetails?.groomFathernameEn} / ${response?.GroomDetails?.groomFathernameMl}`,
        },
        {
          title: `${t("CR_GROOM_MOTHER_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomMotherAadharNo,
        },
        {
          title: `${t("CR_MOTHER_NAME")}`,
          value: `${response?.GroomDetails?.groomMothernameEn} / ${response?.GroomDetails?.groomMothernameMl}`,
        }
      );
    } else if (response?.GroomDetails?.groomParentGuardian === "GUARDIAN") {
      GroomDetails.values.push(
        ({
          title: `${t("CR_GROOM_GUARDIAN_AADHAR_NO")}`,
          value: response?.GroomDetails?.groomGuardianAadharNo,
        },
        {
          title: `${t("CR_GUARDIAN_NAME")}`,
          value: `${response?.GroomDetails?.groomGuardiannameEn}/${response?.GroomDetails?.groomGuardiannameMl}`,
        })
      );
    }

    const GroomAddressDetails = {
      title: "CR_GROOM_ADDRESS_DETAILS",
      asSectionHeader: true,
      values: [],
    };
    if (response?.GroomAddressDetails?.countryIdPermanent === "COUNTRY_INDIA" && response?.GroomAddressDetails?.stateIdPermanent === "kl") {
      GroomAddressDetails.values.push(
        {
          title: `${t("CS_COMMON_COUNTRY")}`,
          value: response?.GroomAddressDetails?.countryIdPermanent ? response?.GroomAddressDetails?.countryIdPermanent : "NA",
        },
        {
          title: `${t("CS_COMMON_STATE")}`,
          value: response?.GroomAddressDetails?.stateIdPermanent ? response?.GroomAddressDetails?.stateIdPermanent : "NA",
        },
        {
          title: `${t("CS_COMMON_DISTRICT")}`,
          value: response?.GroomAddressDetails?.districtIdPermanent ? response?.GroomAddressDetails?.districtIdPermanent : "NA",
        },
        {
          title: `${t("CS_COMMON_TALUK")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaTaluk ? response?.GroomAddressDetails?.presentInsideKeralaTaluk : "NA",
        },
        {
          title: `${t("CS_COMMON_VILLAGE")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaVillage ? response?.GroomAddressDetails?.presentInsideKeralaVillage : "NA",
        },
        {
          title: `${t("CS_COMMON_LB_NAME")}`,
          value: response?.GroomAddressDetails?.presentInsideKeralaLBName ? response?.GroomAddressDetails?.presentInsideKeralaLBName : "NA",
        },
        {
          title: `${t("CS_COMMON_WARD")}`,
          value: response?.GroomAddressDetails?.presentWardNo ? response?.GroomAddressDetails?.presentWardNo : "NA",
        }
      );
    }

    const BrideDetails = {
      title: "CR_BRIDE_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`,
          value: response?.BrideDetails?.brideResidentShip ? response?.BrideDetails?.brideResidentShip : "NA",
        },
        {
          title: `${t("CR_BRIDE_NAME")}`,
          value: `${response?.BrideDetails?.brideFirstnameEn ? response?.BrideDetails?.brideFirstnameEn : ""} ${
            response?.BrideDetails?.brideMiddlenameEn ? response?.BrideDetails?.brideMiddlenameEn : ""
          } ${response?.BrideDetails?.brideLastnameEn ? response?.BrideDetails?.brideLastnameEn : ""} / ${
            response?.BrideDetails?.brideFirstnameMl ? response?.BrideDetails?.brideFirstnameMl : ""
          } ${response?.BrideDetails?.brideMiddlenameMl ? response?.BrideDetails?.brideMiddlenameMl : ""} ${
            response?.BrideDetails?.brideLastnameMl ? response?.BrideDetails?.brideLastnameMl : ""
          }`,
        },
        {
          title: `${t("CR_BRIDE_MOBILE_NO")}`,
          value: response?.BrideDetails?.brideMobile,
        },
        {
          title: `${t("CR_BRIDE_EMAIL")}`,
          value: response?.BrideDetails?.brideEmailid,
        },
        {
          title: `${t("CR_BRIDE_GENDER")}`,
          value: response?.BrideDetails?.brideGender,
        },
        {
          title: `${t("CR_BRIDE_DATE_OF_BIRTH")}`,
          value: response?.BrideDetails?.brideDOB,
        },
        {
          title: `${t("CR_BRIDE_AGE")}`,
          value: response?.BrideDetails?.brideAge,
        },
      ],
    };
    if (response?.BrideDetails?.brideResidentShip === "NRI" || response?.BrideDetails?.brideResidentShip === "FOREIGN") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_PASSPORT_NO")}`,
          value: response?.BrideDetails?.bridePassportNo ? response?.BrideDetails?.bridePassportNo : "NA",
        },
        {
          title: `${t("CR_BRIDE_SOCIAL_SECURITY_NO")}`,
          value: response?.BrideDetails?.brideSocialSecurityNo ? response?.BrideDetails?.brideSocialSecurityNo : "NA",
        }
      );
    } else if (response?.BrideDetails?.brideResidentShip === "INDIAN") {
      BrideDetails.values.push({
        title: `${t("CR_BRIDE_AADHAR_NO")}`,
        value: response?.BrideDetails?.brideAadharNo ? response?.BrideDetails?.brideAadharNo : "NA",
      });
    }
    if (response?.BrideDetails?.brideMaritalstatusID === "MARRIED") {
      BrideDetails.values.push({
        title: `${t("CR_ANY_SPOUSE_LIVING")}`,
        value: response?.BrideDetails?.brideIsSpouseLiving ? "Yes" : "No",
      });
    }
    if (response?.BrideDetails?.brideMaritalstatusID === "MARRIED" && response?.BrideDetails?.brideIsSpouseLiving) {
      BrideDetails.values.push({ title: `${t("CR_NUMBER_OF_SPOUSE_LIVING")}`, value: response?.BrideDetails?.brideNoOfSpouse });
    }
    if (response?.BrideDetails?.brideParentGuardian === "PARENT") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_FATHER_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideFatherAadharNo,
        },
        {
          title: `${t("CR_FATHER_NAME")}`,
          value: `${response?.BrideDetails?.brideFathernameEn} / ${response?.BrideDetails?.brideFathernameMl}`,
        },
        {
          title: `${t("CR_BRIDE_MOTHER_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideMotherAadharNo,
        },
        {
          title: `${t("CR_MOTHER_NAME")}`,
          value: `${response?.BrideDetails?.brideMothernameEn} / ${response?.BrideDetails?.brideMothernameMl}`,
        }
      );
    } else if (response?.BrideDetails?.brideParentGuardian === "GUARDIAN") {
      BrideDetails.values.push(
        {
          title: `${t("CR_BRIDE_GUARDIAN_AADHAR_NO")}`,
          value: response?.BrideDetails?.brideGuardianAadharNo,
        },
        {
          title: `${t("CR_GUARDIAN_NAME")}`,
          value: `${response?.BrideDetails?.brideGuardiannameEn} / ${response?.BrideDetails?.brideGuardiannameMl}`,
        }
      );
    }

    const WitnessDetails = {
      title: "CR_WITNESS_DETAILS",
      asSectionHeader: true,
      values: [
        {
          title: `${t("CR_WITNESS1_ADHAR_NO")}`,
          value: response?.WitnessDetails?.witness1AadharNo ? response?.WitnessDetails?.witness1AadharNo : "NA",
        },
        {
          title: `${t("CR_WITNESS1_NAME")}`,
          value: response?.WitnessDetails?.witness1NameEn ? response?.WitnessDetails?.witness1NameEn : "NA",
        },
        {
          title: `${t("CR_WITNESS1_AGE")}`,
          value: response?.WitnessDetails?.witness1Age ? response?.WitnessDetails?.witness1Age : "NA",
        },
        {
          title: `${t("CR_WITNESS1_ADDRESS")}`,
          value: response?.WitnessDetails?.witness1AddresSEn ? response?.WitnessDetails?.witness1AddresSEn : "NA",
        },
        {
          title: `${t("CR_WITNESS1_MOBILE_NO")}`,
          value: response?.WitnessDetails?.witness1Mobile ? response?.WitnessDetails?.witness1Mobile : "NA",
        },
        {
          title: `${t("CR_WITNESS2_ADHAR_NO")}`,
          value: response?.WitnessDetails?.witness2AadharNo ? response?.WitnessDetails?.witness2AadharNo : "NA",
        },
        {
          title: `${t("CR_WITNESS2_NAME")}`,
          value: response?.WitnessDetails?.witness2NameEn ? response?.WitnessDetails?.witness2NameEn : "NA",
        },
        {
          title: `${t("CR_WITNESS2_AGE")}`,
          value: response?.WitnessDetails?.witness2Age ? response?.WitnessDetails?.witness2Age : "NA",
        },
        {
          title: `${t("CR_WITNESS2_ADDRESS")}`,
          value: response?.WitnessDetails?.witness2AddresSEn ? response?.WitnessDetails?.witness2AddresSEn : "NA",
        },
        {
          title: `${t("CR_WITNESS2_MOBILE_NO")}`,
          value: response?.WitnessDetails?.witness2Mobile ? response?.WitnessDetails?.witness2Mobile : "NA",
        },
      ],
    };

    //Groom groom GROOM
    // if (response?.workflowCode == "NewTL" && response?.status !== "APPROVED") {
    //   const details = {
    //     title: "",
    //     values: [
    //       { title: "TL_COMMON_TABLE_COL_APP_NO", value: response?.applicationNumber || "NA" },
    //       {
    //         title: "TL_APPLICATION_CHALLAN_LABEL",
    // value: (response?.tradeLicenseDetail?.channel && `TL_CHANNEL_${response?.tradeLicenseDetail?.channel}`) || "NA",
    //       },
    //     ],
    //   };
    //   response && employeeResponse.push(details);
    // }
    response && employeeResponse.push(MarriageSummaryDetails);
    response && employeeResponse.push(MarriageDetails);
    response && employeeResponse.push(GroomDetails);
    response && employeeResponse.push(GroomAddressDetails);
    response && employeeResponse.push(BrideDetails);
    response && employeeResponse.push(WitnessDetails);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};

// /${response?.placeidMl}`,
