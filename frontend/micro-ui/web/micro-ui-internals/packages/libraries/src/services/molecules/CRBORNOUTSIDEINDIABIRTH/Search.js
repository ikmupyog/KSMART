import cloneDeep from "lodash/cloneDeep";
import { CRBornOutSideIndiaBirthService } from "../../elements/CRBORNOUTSIDEINDIABIRTH";
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
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + response?.childMiddleNameEn + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "CR_DATE_OF_ARRIVAL", value: response?.childArrivalDate ? convertEpochToDate(response?.childArrivalDate) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.outsideBirthPlaceEn + "/" + response?.outsideBirthPlaceMl || "NA" },
        { title: "CR_CHILD_PASSPORT_NO", value: response?.childPassportNo },
        { title: "CS_COMMON_COUNTRY", value: response?.country },
        { title: "CR_STATE_REGION_PROVINCE", value: response?.provinceEn + "/" + response?.provinceMl || "NA" },
        { title: "CR_CITY_TOWN", value: response?.cityTownEn + "/" + response?.cityTownMl || "NA" },
        { title: "CR_ZIP_CODE", value: response?.postCode },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.BornOutsideParentsDetails?.motherFirstNameEn + " / " + response?.BornOutsideParentsDetails?.motherFirstNameMl || "NA",
        },
        { title: "CR_MOTHER_PASSPORT_NO", value: response?.BornOutsideParentsDetails?.motherPassport },
        { title: "CR_MOTHER_NATIONALITY", value: response?.BornOutsideParentsDetails?.motherNationality },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.BornOutsideParentsDetails?.fatherFirstNameEn + " / " + response?.BornOutsideParentsDetails?.fatherFirstNameMl || "NA",
        },
        { title: "CR_FATHER_PASSPORT_NO", value: response?.BornOutsideParentsDetails?.fatherPassport },
        { title: "CR_FATHER_NATIONALITY", value: response?.BornOutsideParentsDetails?.fatherNationality },
        { title: "CR_MOTHER_AGE_MARRIAGE", value: response?.BornOutsideParentsDetails?.motherMarriageAge },
        { title: "CR_MOTHER_AGE_BIRTH", value: response?.BornOutsideParentsDetails?.motherMarriageBirth },
        { title: "CR_MOTHER_EDUCATION", value: response?.BornOutsideParentsDetails?.motherEducation },
        { title: "CR_MOTHER_PROFESSIONAL", value: response?.BornOutsideParentsDetails?.motherProfession },
        { title: "CR_FATHER_EDUCATION", value: response?.BornOutsideParentsDetails?.fatherEducation },
        { title: "CR_FATHER_PROFESSIONAL", value: response?.BornOutsideParentsDetails?.fatherProfession },
        { title: "CS_COMMON_RELIGION", value: response?.BornOutsideParentsDetails?.Religion },
        { title: "CR_PARENTS_CONTACT_NO", value: response?.BornOutsideParentsDetails?.fatherMobile },
        { title: "CR_PARENTS_EMAIL", value: response?.BornOutsideParentsDetails?.fatherEmail },
      ],
    };
    const PermanentrAddressBirthDetailsInfo = {
      title: "CR_PERMANENT_ADDRESS",
      values: [
        // { title: "CR_BIRTH_PERS_HO_NAME_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_STREET_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaStreetNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_LOCALITY_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaLocalityNameEn || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_POSTOFFICE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaPostOffice || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_PINCODE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_DISTRICT_LABEL", value: response?.BornOutsideAddressBirthDetails.presentInsideKeralaDistrict|| "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_STATE_LABEL", value: response?.BornOutsideAddressBirthDetails.presentaddressStateName || "CR_NOT_RECORDED"},
        // { title: "CR_BIRTH_PERS_COUNTRY_LABEL", value: response?.BornOutsideAddressBirthDetails.presentaddressCountry || "CR_NOT_RECORDED"},

        { title: "CR_BIRTH_PERM_HO_NAME_LABEL",  value:
        response?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameEn +
          " / " +
          response?.BornOutsideAddressBirthDetails?.permntInKeralaAdrHouseNameMl || "NA", },
        { title: "CR_BIRTH_PERM_STREET_LABEL", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameEn || "CR_NOT_RECORDED" },
        {
          title: "CR_BIRTH_PERM_LOCALITY_LABEL",
          value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrLocalityNameEn || "CR_NOT_RECORDED",
        },
        { title: "CS_COMMON_POST_OFFICE", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrPostOffice || "CR_NOT_RECORDED" },
        { title: "CR_BIRTH_PERM_PINCODE_LABEL", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrPincode || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_VILLAGE", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrVillage || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_TALUK", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrTaluk || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.BornOutsideAddressBirthDetails.permntInKeralaAdrDistrict || "CR_NOT_RECORDED" },
        { title: "CR_BIRTH_PERM_STATE_LABEL", value: response?.BornOutsideAddressBirthDetails.permtaddressStateName || "CR_NOT_RECORDED" },
        { title: "CR_BIRTH_PERM_COUNTRY_LABEL", value: response?.BornOutsideAddressBirthDetails.permtaddressCountry || "CR_NOT_RECORDED" },
      ],
    };
    const OutsideAddressBirthDetailsInfo = {
      title: "CR_PARENTS_FOREIGN_ADDRESS",
      values: [
        {
          title: "CR_ADDRES_LINE_ONE",
          value:
            response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEn +
              " / " +
              response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMl || "NA",
        },
        {
          title: "CR_ADDRES_LINE_TWO",
          value:
            response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressEnB +
              " / " +
              response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaAdressMlB || "NA",
        },
        { title: "CR_ZIP_CODE", value: response?.BornOutsideAddressBirthDetails.permanentOutsideIndiaPostCode || "CR_NOT_RECORDED" },
        { title: "CR_CITY_TOWN_EN", value: response?.BornOutsideAddressBirthDetails.presentOutSideIndiaadrsCityTown || "CR_NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaadrsVillage || "NA" },
        {
          title: "CR_STATE_REGION_PROVINCE",
          value:
            response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceEn +
              " / " +
              response?.BornOutsideAddressBirthDetails?.presentOutSideIndiaProvinceMl || "NA",
        },
        { title: "CS_COMMON_COUNTRY", value: response?.BornOutsideAddressBirthDetails.presentOutSideCountry || "CR_NOT_RECORDED" },
      ],
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
      values: [
        { title: "CR_BIRTH_WEIGHT", value: response?.BornOutsideStaticInfn?.birthWeight || "NA" },
        // { title: "CR_STATSTICAL_HEIGHT_LABEL", value: response?.BornOutsideStaticInfn.height_of_child || "NA" },
        { title: "CR_PREGNANCY_DURATION", value: response?.BornOutsideStaticInfn?.pregnancyDuration || "NA" },
        { title: "CR_DELIVERY_METHOD", value: response?.BornOutsideStaticInfn?.deliveryMethods || "NA" },
        { title: "CR_NATURE_OF_MEDICAL_ATTENTION", value: response?.BornOutsideStaticInfn?.medicalAttensionSub || "NA" },
        { title: "CR_ORDER_CURRENT_DELIVERY", value: response?.BornOutsideStaticInfn?.orderofChildren || "NA" },
        { title: "CR_RELATION", value: response?.BornOutsideStaticInfn?.relation || "NA" },
        { title: "CS_COMMON_AADHAAR", value: response?.BornOutsideStaticInfn?.informarAadhar || "NA" },
        { title: "CR_INFORMANT_NAME", value: response?.BornOutsideStaticInfn?.informarNameEn || "NA" },
        { title: "CR_MOBILE_NO", value: response?.BornOutsideStaticInfn?.informarMobile || "NA" },
        { title: "CR_INFORMER_ADDRESS", value: response?.BornOutsideStaticInfn?.informarAddress || "NA" },

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
