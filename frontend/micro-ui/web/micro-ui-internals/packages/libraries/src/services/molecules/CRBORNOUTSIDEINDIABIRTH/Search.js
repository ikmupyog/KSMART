import cloneDeep from "lodash/cloneDeep";
import { CRBornOutSideIndiaBirthService } from "../../elements/CRBORNOUTSIDEINDIABIRTH";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";
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
export const CRBornOutsideIndiasearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRBornOutSideIndiaBirthService.CRBornOutsideIndiasearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRBornOutSideIndiaBirthService.CRBornOutsideIndiasearch({ tenantId, filters });
    return response.BornOutsideChildDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRBornOutSideIndiaBirthService.CRBornOutsideIndiasearch({ tenantId, filters });
    console.log(response, 'response');
    return response.BornOutsideChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    // console.log("applicationNumber" + applicationNumber);
    const filter = { applicationNumber };
    const response = await CRBornOutsideIndiasearch.application(tenantId, filter);
    // console.log(response);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRBornOutsideIndiasearch.numberOfApplications(tenantId, filters);
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
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : t("CR_NOT_RECORDED") },
        { title: "CR_DATE_OF_ARRIVAL", value: response?.childArrivalDate ? convertEpochToDate(response?.childArrivalDate) : t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.outsideBirthPlaceEn + "/" + response?.outsideBirthPlaceMl || t("CR_NOT_RECORDED") },
        { title: "CR_CHILD_PASSPORT_NO", value: response?.childPassportNo },
        { title: "CS_COMMON_COUNTRY", value: response?.country },
        { title: "CR_STATE_REGION_PROVINCE", value: response?.provinceEn + "/" + response?.provinceMl || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN", value: response?.cityTownEn + "/" + response?.cityTownMl || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.postCode },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.BornOutsideParentsDetails?.motherFirstNameEn + " / " + response?.BornOutsideParentsDetails?.motherFirstNameMl || t("CR_NOT_RECORDED"),
        },
        { title: "CR_MOTHER_PASSPORT_NO", value: response?.BornOutsideParentsDetails?.motherPassport || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_NATIONALITY", value: response?.BornOutsideParentsDetails?.motherNationality || t("CR_NOT_RECORDED") },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.BornOutsideParentsDetails?.fatherFirstNameEn + " / " + response?.BornOutsideParentsDetails?.fatherFirstNameMl || t("CR_NOT_RECORDED"),
        },
        { title: "CR_FATHER_PASSPORT_NO", value: response?.BornOutsideParentsDetails?.fatherPassport || t("CR_NOT_RECORDED") }, 
        { title: "CR_FATHER_NATIONALITY", value: response?.BornOutsideParentsDetails?.fatherNationality || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_AGE_MARRIAGE", value: response?.BornOutsideParentsDetails?.motherMarriageAge || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.BornOutsideParentsDetails?.motherMarriageBirth || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_EDUCATION", value: response?.BornOutsideParentsDetails?.motherEducation || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_PROFESSIONAL", value: response?.BornOutsideParentsDetails?.motherProfession || t("CR_NOT_RECORDED") },
        { title: "CR_FATHER_EDUCATION", value: response?.BornOutsideParentsDetails?.fatherEducation || t("CR_NOT_RECORDED") },
        { title: "CR_FATHER_PROFESSIONAL", value: response?.BornOutsideParentsDetails?.fatherProfession || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_RELIGION", value: response?.BornOutsideParentsDetails?.Religion || t("CR_NOT_RECORDED") },
        { title: "CR_PARENTS_CONTACT_NO", value: response?.BornOutsideParentsDetails?.fatherMobile || t("CR_NOT_RECORDED") },
        { title: "CR_PARENTS_EMAIL", value: response?.BornOutsideParentsDetails?.fatherEmail || t("CR_NOT_RECORDED") },
      ],
    };
    const PermanentrAddressBirthDetailsInfo = {
      title: "CR_PERMANENT_ADDRESS",
      values: [
        // { title: "CR_BIRTH_PERS_HO_NAME_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_STREET_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_LOCALITY_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaLocalityNameEn || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_POSTOFFICE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaPostOffice || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_PINCODE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaPincode || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaDistrict|| t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_STATE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentaddressStateName || t("CR_NOT_RECORDED")},
        // { title: "CR_BIRTH_PERS_COUNTRY_LABEL", value: response?.BornOutsideAddressBirthDetails.presentaddressCountry || t("CR_NOT_RECORDED")},

        { title: "CR_BIRTH_PERM_HO_NAME_LABEL",  value:
        response?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn +
          " / " +
          response?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl || t("CR_NOT_RECORDED"), },
        { title: "CR_BIRTH_PERM_STREET_LABEL", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameEn || t("CR_NOT_RECORDED") },
        {
          title: "CR_BIRTH_PERM_LOCALITY_LABEL",
          value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrLocalityNameEn + " / " +
          response?.BornOutsideAddressBirthDetails?.permntInKeralaAdrLocalityNameMl || t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_POST_OFFICE", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrPostOffice || t("CR_NOT_RECORDED") },
        { title: "CR_BIRTH_PERM_PINCODE_LABEL", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrPincode || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_VILLAGE", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrVillage || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_TALUK", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrTaluk || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_DISTRICT", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrDistrict || t("CR_NOT_RECORDED") },
        { title: "CR_BIRTH_PERM_STATE_LABEL", value: response?.BornOutsideAddressBirthDetails.permtaddressStateName || t("CR_NOT_RECORDED") },
        { title: "CR_BIRTH_PERM_COUNTRY_LABEL", value: response?.BornOutsideAddressBirthDetails.permtaddressCountry || t("CR_NOT_RECORDED") },
      ],
    };
    const OutsideAddressBirthDetailsInfo = {
      title: "CR_PARENTS_FOREIGN_ADDRESS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.BornOutsideAddressBirthDetails.presentOutSideCountry || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN_EN", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsCityTown || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaPostCode || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.BornOutsideAddressBirthDetails.presentOutSideIndiaAdressEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB || t("CR_NOT_RECORDED") },
      ],
    };
    
    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "CR_BIRTH_WEIGHT", value: response?.BornOutsideStaticInfn?.birthWeight || t("CR_NOT_RECORDED") },
        // { title: "CR_STATSTICAL_HEIGHT_LABEL", value: response?.BornOutsideStaticInfn.height_of_child || "NA" },
        { title: "CR_PREGNANCY_DURATION", value: response?.BornOutsideStaticInfn?.pregnancyDuration || t("CR_NOT_RECORDED") },
        { title: "CR_DELIVERY_METHOD", value: response?.BornOutsideStaticInfn?.deliveryMethods || t("CR_NOT_RECORDED") },
        { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: response?.BornOutsideStaticInfn?.medicalAttensionSub || t("CR_NOT_RECORDED") },
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.BornOutsideStaticInfn?.orderofChildren || t("CR_NOT_RECORDED") },
        { title: "CR_RELATION", value: response?.BornOutsideStaticInfn?.relation || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_AADHAAR", value: response?.BornOutsideStaticInfn?.informarAadhar || t("CR_NOT_RECORDED") },
        { title: "CR_INFORMANT_NAME", value: response?.BornOutsideStaticInfn?.informarNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_MOBILE_NO", value: response?.BornOutsideStaticInfn?.informarMobile || t("CR_NOT_RECORDED") },
        { title: "CR_INFORMER_ADDRESS", value: response?.BornOutsideStaticInfn?.informarAddress || t("CR_NOT_RECORDED") },

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
    response && employeeResponse.push(Birthdetails);
    response && employeeResponse.push(childdetails);
    response && employeeResponse.push(parentInfo);
    response && employeeResponse.push(PermanentrAddressBirthDetailsInfo);
    response && employeeResponse.push(OutsideAddressBirthDetailsInfo);
    response && employeeResponse.push(statisticalInfo);
    console.log(response, "response");
    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
