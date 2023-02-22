import cloneDeep from "lodash/cloneDeep";
import { CRDeathService } from "../../elements/CRDEATH";
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
export const CRDeathsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRDeathService.CRDeathsearch({ tenantId, filters });
    console.log("response");
    return response;
  },

  application: async (tenantId, filters = {}) => {
    const response = await CRDeathService.CRDeathsearch({ tenantId, filters });
    console.log(response.deathCertificateDtls);
    return response.deathCertificateDtls[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRDeathService.CRDeathsearch({ tenantId, filters });
    return response.deathCertificateDtls;
  },

  applicationDetails: async (t, tenantId, DeathACKNo, userType) => {
    const filter = { DeathACKNo };
    const response = await CRDeathsearch.application(tenantId, filter);
    console.log(response);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.DeathACKNo) {
      const deathNumbers = response?.DeathACKNo;
      const filters = { deathNumbers, offset: 0 };
      numOfApplications = await CRDeathsearch.numberOfApplications(tenantId, filters);
    }

    let employeeResponse = [];
    const InformationDeath = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        {
          title: "PDF_BIRTH_CHILD_NAME",
          value:
            response?.InformationDeath?.DeceasedFirstNameEn +
              " " +
              response?.InformationDeath?.DeceasedMiddleNameEn +
              " " +
              response?.InformationDeath?.DeceasedLastNameEn +
              " / " +
              response?.InformationDeath?.DeceasedFirstNameMl +
              " " +
              response?.InformationDeath?.DeceasedMiddleNameMl +
              " " +
              response?.InformationDeath?.DeceasedLastNameMl || "NA",
        },

        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || "NA" },
        { title: "PDF_CR_DEATH_OF_DATE", value: response?.InformationDeath ? convertEpochToDate(response?.DateOfDeath) : "NA" },
        // { title: "PDF_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlaceType.hospitalName || "NA" },

        {
          title: "CR_ADDRESS",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn +
              response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn +
              response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NA",
        },
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInformationDeath?.SpouseNameEn + " / " + response?.FamilyInformationDeath?.SpouseNameML || "NA",
        },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.FamilyInformationDeath?.FatherNameEn + " / " + response?.FamilyInformationDeath?.FatherNameMl || "NA",
        },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.FamilyInformationDeath?.MotherNameEn + " / " + response?.FamilyInformationDeath?.MotherNameMl || "NA",
        },
        { title: "PDF_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlaceType + "/" + response?.InformationDeath?.DeathPlaceType || "NA" },

        // ...(InformationDeath.DeathPlace.code === "HOSPITAL" && {

        // }),
      ],
    };

    // const DeathPlaceHome = "";
    // console.log(response?.InformationDeath?.DeathPlace);
    // if (response?.InformationDeath?.DeathPlace === "HOSPITAL") {
    //   DeathPlaceHome = {
    //     title: "PDF_PLACE_OF_DEATH",
    //     values: [
    //       {
    //         title: "PDF_BIRTH_NAME_OF_MOTHER",
    //         value: response?.FamilyInformationDeath?.DeathPlaceType  || "NA",
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
    // const FamilyInformationDeath = {
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

    response && employeeResponse.push(InformationDeath);
    // response && employeeResponse.push(DeathPlaceHome);
    // response && employeeResponse.push(FamilyInformationDeath);
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
