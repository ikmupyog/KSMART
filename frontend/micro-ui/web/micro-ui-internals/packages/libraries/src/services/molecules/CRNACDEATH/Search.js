import cloneDeep from "lodash/cloneDeep";
import { CRNACDeathService } from "../../elements/CRNACDEATH";
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
export const CRNACDeathsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRNACDeathService.CRNACDeathsearch({ tenantId, filters });
    console.log("response");
    return response;
  },

  application: async (tenantId, filters = {}) => {
    const response = await CRNACDeathService.CRNACDeathsearch({ tenantId, filters });
    return response.deathNACDtls[0] || {};
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRNACDeathService.CRNACDeathsearch({ tenantId, filters });
    return response.deathNACDtls;
  },

  applicationDetails: async (t, tenantId, DeathACKNo, userType) => {
    const filter = { DeathACKNo };
    const response = await CRNACDeathsearch.application(tenantId, filter);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.DeathACKNo) {
      const deathNumbers = response?.DeathACKNo;
      const filters = { deathNumbers, offset: 0 };
      numOfApplications = await CRNACDeathsearch.numberOfApplications(tenantId, filters);
    }

    let employeeResponse = [];
    const Deathdetails = {
      title: "Death SUMMARY DETAILS",
      asSectionHeader: true,
    }
    const InformationDeath = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        {
          title: "PDF_DECEASED_NAME",
          value:
            response?.InformationDeath?.DeceasedFirstNameEn +

            response?.InformationDeath?.DeceasedMiddleNameEn +

            response?.InformationDeath?.DeceasedLastNameEn +
            " / " +
            response?.InformationDeath?.DeceasedFirstNameMl +
            " " +
            response?.InformationDeath?.DeceasedMiddleNameMl +
            " " +
            response?.InformationDeath?.DeceasedLastNameMl || "NA",
        },

        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || "NA" },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "NA",
        },
        {
          title: "CR_ADDRESS",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn + "," +
            response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn + "," +
            response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
            || "NA",
        },
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.InformationDeath?.SpouseNameEn + " / " + response?.InformationDeath?.SpouseNameML || "NA ",
        },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.InformationDeath?.FatherNameEn + " / " + response?.InformationDeath?.FatherNameMl || "NA",
        },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.InformationDeath?.MotherNameEn + " / " + response?.InformationDeath?.MotherNameMl || "NA",
        },
        { title: "PDF_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlaceHospitalNameEn + "/" + response?.InformationDeath?.DeathPlaceHospitalNameMl || "NA" },

        // ...(InformationDeath.DeathPlace.code === "HOSPITAL" && {

        // }),
      ],
    };
    const Docdetails = {
      title: "Document SUMMARY DETAILS",
      documents: true,
      tenentId:Digit.ULBService.getStateId(),
      values:response.DeathNACDocuments.map((doc) => doc?.FileStoreId)
    }

    response && employeeResponse.push(Deathdetails);
    response && employeeResponse.push(InformationDeath);
    // response && employeeResponse.push(DeathPlaceHome);
    // response && employeeResponse.push(FamilyInformationDeath);
    // response && employeeResponse.push(statisticalInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents:Docdetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
