import cloneDeep from "lodash/cloneDeep";
import { CRAbandonedDeathService } from "../../elements/CRDEATH";
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
    console.log("response");
    return response;
  },

  application: async (tenantId, filters = {}) => {
    const response = await CRAbandonedDeathService.CRAbandonedDeathsearch({ tenantId, filters });
    console.log(response.deathAbandonedDtls);
    return response.deathAbandonedDtls[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRAbandonedDeathService.CRAbandonedDeathsearch({ tenantId, filters });
    return response.deathAbandonedDtls;
  },

  applicationDetails: async (t, tenantId, DeathACKNo, userType) => {
    const filter = { DeathACKNo };
    const response = await CRAbandonedDeathsearch.application(tenantId, filter);
    console.log(response);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.DeathACKNo) {
      const deathNumbers = response?.DeathACKNo;
      const filters = { deathNumbers, offset: 0 };
      numOfApplications = await CRAbandonedDeathsearch.numberOfApplications(tenantId, filters);
    }

    let employeeResponse = [];
    const InformationDeathAbandoned = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        {
          title: "PDF_DECEASED_NAME",
          value:
            response?.InformationDeathAbandoned?.DeceasedFirstNameEn +
              " " +
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

        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeathAbandoned?.DeceasedGender || "NA" },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeathAbandoned?.DateOfDeath ? convertEpochToDate(response?.InformationDeathAbandoned?.DateOfDeath) : "NA",
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
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInformationDeathAbandoned?.SpouseNameEn + " / " + response?.FamilyInformationDeathAbandoned?.SpouseNameML || "NA ",
        },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.FamilyInformationDeathAbandoned?.FatherNameEn + " / " + response?.FamilyInformationDeathAbandoned?.FatherNameMl || "NA",
        },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.FamilyInformationDeathAbandoned?.MotherNameEn + " / " + response?.FamilyInformationDeathAbandoned?.MotherNameMl || "NA",
        },
        {
          title: "PDF_PLACE_OF_DEATH",
          value: response?.InformationDeathAbandoned?.DeathPlaceHospitalNameEn + "/" + response?.InformationDeathAbandoned?.DeathPlaceHospitalNameMl || "NA",
        },

        // ...(InformationDeathAbandoned.DeathPlace.code === "HOSPITAL" && {

        // }),
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
    //         value: response?.FamilyInformationDeathAbandoned?.DeathPlaceType  || "NA",
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
    // const FamilyInformationDeathAbandoned = {
    //   title: "CR_DEATH_INFORMANT_ADDRESS_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_DEATH_INFORMANT_HOUSE_NO_LABEL", value: response?.addressInfo?.informantAddress.houseNo || "NA"},
    //     { title: "CR_DEATH_INFORMANT_HOUSE_NAME_LABEL", value: response?.addressInfo?.informantAddress.houeNameEn || "NA" },
    //     { title: "CR_DEATH_INFORMANT_LOCALITY_LABEL", value: response?.addressInfo?.informantAddress.localityEn || "NA" },
    //     { title: "CR_DEATH_INFORMANT_CITY_LABEL", value: response?.addressInfo?.informantAddress.cityEn || "NA" },
    //   ],
    // };
    // const addressInfo = {
    //   title: "CR_DEATH_ADDRESS_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_DEATH_ADDRESS_HOUSE_NO_LABEL", value: response?.addressInfo?.presentAddress.houseNo || "NA"},
    //     { title: "CR_DEATH_ADDRESS_HOUSE_NAME_LABEL", value: response?.addressInfo?.presentAddress.houeNameEn || "NA" },
    //     { title: "CR_DEATH_ADDRESS_HOUSE_LOCALITY_LABEL", value: response?.addressInfo?.presentAddress.localityEn || "NA" },
    //     { title: "CR_DEATH_ADDRESS_HOUSE_CITY_LABEL", value: response?.addressInfo?.presentAddress.cityEn || "NA" },
    //   ],
    // };
    // const statisticalInfo = {
    //   title: "CR_DEATH_STATSTICAL_INFORMATION_HEADER",
    //   values: [
    //     { title: "CR_STATSTICAL_DEATH_CAUSE_MAIN", value: response?.statisticalInfo.deathCauseMain || "NA" },
    //     { title: "CR_STATSTICAL_DEATH_MEDICAL_ATTENTION_TYPE", value: response?.statisticalInfo.medicalAttentionType || "NA" },
    //     { title: "CR_STATSTICAL_DEATH_OCCUPATION", value: response?.statisticalInfo.occupation || "NA" },
    //     { title: "CR_STATSTICAL_DEATH_SMOKING_NUM_YEARS", value: response?.statisticalInfo.smokingNumYears || "NA" },
    //   ],
    // };
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

    response && employeeResponse.push(InformationDeathAbandoned);
    // response && employeeResponse.push(DeathPlaceHome);
    // response && employeeResponse.push(FamilyInformationDeathAbandoned);
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
