import cloneDeep from "lodash/cloneDeep";
import { CRAbandonedDeathService } from "../../elements/CRABANDONEDDEATH";
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
export const CRAbandonedDeathsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRAbandonedDeathService.CRAbandonedDeathsearch({ tenantId, filters });
    return response;
  },

  application: async (tenantId, filters = {}) => {
    const response = await CRAbandonedDeathService.CRAbandonedDeathsearch({ tenantId, filters });
    return response.deathAbandonedDtls[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRAbandonedDeathService.CRAbandonedDeathsearch({ tenantId, filters });
    return response.deathAbandonedDtls;
  },

  applicationDetails: async (t, tenantId, DeathACKNo, userType) => {
    const filter = { DeathACKNo };
    const response = await CRAbandonedDeathsearch.application(tenantId, filter);
    console.log("response",response.DeathAbandonedDocuments.map((doc) => doc?.FileStoreId));
  
    let numOfApplications = [];
    if (response?.DeathACKNo) {
      const deathNumbers = response?.DeathACKNo;
      const filters = { deathNumbers, offset: 0 };
      numOfApplications = await CRAbandonedDeathsearch.numberOfApplications(tenantId, filters);
    }

    let employeeResponse = [];
    const AbandonedDeathdetails = {
      title: "CR_ABANDONED_DEATH_INFORMATION",
      asSectionHeader: true,      
    }
    const InformationDeathAbandoned = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        {
          title: "PDF_DECEASED_NAME",
          value: response?.InformationDeathAbandoned?.DeceasedFirstNameEn + " " +
              response?.InformationDeathAbandoned?.DeceasedMiddleNameEn +
              " " +
              response?.InformationDeathAbandoned?.DeceasedLastNameEn +
              " / " +
              response?.InformationDeathAbandoned?.DeceasedFirstNameMl +
              " " +
              response?.InformationDeathAbandoned?.DeceasedMiddleNameMl +
              " " +
              response?.InformationDeathAbandoned?.DeceasedLastNameMl || "NA",
        },

        { title: "CR_GENDER", value: 
        response?.InformationDeathAbandoned?.DeceasedGender || "NA"
       },
       response?.InformationDeath?.DeathDateUnavailable === false &&
       {
        
         title: t("Date of Death"),
         value:response?.InformationDeath?.DateOfDeath?
         Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath, "dd/MM/yyyy") :
          t("CS_NA"),
       },
       response?.InformationDeath?.DeathDateUnavailable ===true &&   {
        
         title: t("CR_FROM_DATE"),
         value:response?.InformationDeath?.DateOfDeath?
         Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath, "dd/MM/yyyy") :
          t("CS_NA"),
       },
       response?.InformationDeath?.DeathDateUnavailable ===true &&  {
        
         title: t("CR_TO_DATE"),
         value:response?.InformationDeath?.DateOfDeath1?
         Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath1, "dd/MM/yyyy") :
          t("CS_NA"),
       },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeathAbandoned?.DateOfDeath ? convertEpochToDate(response?.InformationDeathAbandoned?.DateOfDeath) : "NA",
        },
        {
          title:"CR_LEGAL_INFORMATION",
          value:response?.InformationDeathAbandoned?.DeceasedAadharNumber||"NA"
        },
        {
          title:"CR_AGE",
          value:response?.InformationDeathAbandoned?.Age||"NA"
        },
        {
          title:"CR_GENDER",
          value:response?.InformationDeathAbandoned?.DeceasedGender||"NA"
        },
        {
          title:"CR_NATIONALITY",
          value:response?.InformationDeathAbandoned?.CR_NATIONALITY||"NA"
        },
        {
          title:"CS_COMMON_RELIGION",
          value:response?.InformationDeathAbandoned?.Religion ||"NA"
        },
        {
          title:"CR_PROFESSIONAL",
          value:response?.InformationDeathAbandoned?.Occupation||"NA"
        },
        {
          title: "CR_ADDRESS",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn +
              "," +
              response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn +
              "," +
              response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || "NA",
        },
        // 
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInfoDeathAbandoned?.SpouseNameEn||"NA" + 
          " / " + response?.FamilyInfoDeathAbandoned?.SpouseNameML || "NA ",
        },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.FamilyInfoDeathAbandoned?.FatherNameEn || "NA" + 
          " / " + response?.FamilyInfoDeathAbandoned?.FatherNameMl || "NA",
        },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.FamilyInfoDeathAbandoned?.MotherNameEn || "NA" + 
          " / " + response?.FamilyInfoDeathAbandoned?.MotherNameMl || "NA",
        },
        {
          title: "PDF_PLACE_OF_DEATH",
          value: response?.InformationDeathAbandoned?.DeathPlaceHospitalNameEn || "NA"+ 
          "/" + response?.InformationDeathAbandoned?.DeathPlaceHospitalNameMl || "NA",
        },

        // ...(InformationDeathAbandoned.DeathPlace.code === "HOSPITAL" && {

        // }),
      ],
    };
    // CR_FAMILY_DETAILS
    const FamilyInfo = {
      title: "CR_FAMILY_DETAILS",
      values: [
        { title: "CR_SPOUSE_TYPE_EN", value: response?.FamilyInfoDeathAbandoned?.SpouseType|| "NA"},
        { title: "CR_NAME", value: response?.FamilyInfoDeathAbandoned?.SpouseNameEn || "NA"},

        { title: "CS_COMMON_AADHAAR", value: response?.FamilyInfoDeathAbandoned?.SpouseAadhaar|| "NA"},

        // { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.PresentAddrLocalityEn|| "NA"},
      ],
    };

    const addressInfo = {
      title: "CR_ADDRESS",
      values: [
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.PresentAddrDistrictId|| "NA"},
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.PresentAddrTalukId || "NA"},

        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.PresentAddrVillageId|| "NA"},

        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.PresentAddrLocalityEn|| "NA"},

        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.PresentAddrWardId|| "NA"},
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntInKeralaAdrPostOffice   || "NA"},
    

//CS_COMMON_PIN_CODE
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.PresentAddrHoueNameEn || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.PresentAddrLocalityEn || "NA" },
        // { title: "CR_DEATH_ADDRESS_HOUSE_CITY_LABEL", value: response?.AddressBirthDetails?.presentAddress.cityEn || "NA" },
      ],
    };
    // const DeathPlaceHome = "";
    // console.log(response?.InformationDeathAbandoned?.DeathPlace);
    // if (response?.InformationDeathAbandoned?.DeathPlace === "HOSPITAL") {
    //   DeathPlaceHome = {
    //     title: "PDF_PLACE_OF_DEATH",
    //     values: [
    //       {
    //         title: "PDF_BIRTH_NAME_OF_MOTHER",
    //         value: response?.FamilyInfoDeathAbandoned?.DeathPlaceType  || "NA",
    //       },
    //     ],
    //   };
    // }

    // const childdetails = {
    //   title: "CR_BIRTH_CHILD_DETAILS",
    //   asSectionHeader: true,
    //   values: [
    //     { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
    //     { title: "CR_BIRTH_CHILDNAME_LABEL", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
    //     { title: "CR_BIRTH_GENDER_LABEL", value: response?.gender},
    //     { title: "CR_BIRTH_DOB_LABEL", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
    //     { title: "CR_BIRTH_PLACE_LABEL", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"},
    //     { title: "CR_BIRTH_MOTHER_NAME_LABEL", value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA"},
    //     { title: "CR_BIRTH_FATHER_NAME_LABEL", value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA"},
    //    ],
    // };
    const InformantDetailsDeathAbandoned = {
      title: "CR_INFORMANT_DETAILS",
      values: [
        { title: "CS_COMMON_AADHAAR", value: response?.InformantDetailsDeathAbandoned?.InformantAadhaarNo|| "NA"},
        { title: "CR_INFORMANT_NAME", value: response?.InformantDetailsDeathAbandoned?.InformantName || "NA" },
        { title: "CR_INFORMER_DESIGNATION", value: response?.InformantDetailsDeathAbandoned?.InformantDesignation || "NA" },
        { title: "CR_MOBILE_NO", value: response?.InformantDetailsDeathAbandoned?.InformantMobileNo|| "NA" },
        { title: "CR_ADDRESS", value: response?.InformantDetailsDeathAbandoned?.InformantAddress || "NA" },

      ],
    };
  
    const statisticalInfo = {
      title: "CR_DEATH_MORE_INFO",
      values: [
        { title: "CR_MEDICAL_ATTENTION_DEATH", value: response?.StatisticalInfoDeathAbandoned.DeathCauseMain|| "NA" },
        { title: "CR_AUTOPSY_PERFORM", value: response?.StatisticalInfoDeathAbandoned.IsAutopsyPerformed || "NA" },
        { title: "CR_WERE_AUTOPSY", value: response?.StatisticalInfoDeathAbandoned.IsAutopsyCompleted|| "NA" },
      ],
    };

    
      const Documents = {

         title: "Document SUMMARY DETAILS",
      
         documents: true,
      
         tenentId: Digit.ULBService.getStateId(),
      
         values: response.DeathAbandonedDocuments.map((doc) => doc?.FileStoreId),
      
        };
    // const permanentAddress = {
    //   title: "CR_DEATH_PERMANENT_ADDRESS_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_DEATH_PERM_HOUSE_NO_LABEL", value: response?.addressInfo?.permanentAddress.houseNo || "NA"},
    //     { title: "CR_DEATH_PERM_HOUSE_NAME_LABEL", value: response?.addressInfo?.permanentAddress.houeNameEn || "NA" },
    //     { title: "CR_DEATH_PERM_HOUSE_LOCALITY_LABEL", value: response?.addressInfo?.permanentAddress.localityEn || "NA" },
    //     { title: "CR_DEATH_PERM_HOUSE_CITY_LABEL", value: response?.addressInfo?.permanentAddress.cityEn || "NA" },
    //   ],
    // };

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
    response && employeeResponse.push(AbandonedDeathdetails);
    response && employeeResponse.push(InformationDeathAbandoned);
    response && employeeResponse.push(FamilyInfo);
    response && employeeResponse.push(addressInfo);
    response && employeeResponse.push(statisticalInfo);
    response && employeeResponse.push(InformantDetailsDeathAbandoned);
    

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents: Documents,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
