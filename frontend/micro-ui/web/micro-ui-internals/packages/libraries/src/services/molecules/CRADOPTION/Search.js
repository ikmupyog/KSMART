import cloneDeep from "lodash/cloneDeep";
import { CRService } from "../../elements/CR";
// import { convertEpochToDateDMY } from  "../../utils";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";

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

export const CRsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response.ChildDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRAdoptionSearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    const filter = { applicationNumber };
    const response = await CRsearch.application(tenantId, filter);

    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRsearch.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const AdoptionDetails = {
      title: "CR_ADOPTION_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_CHILD_NAME", value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + " " + response?.childLastNameEn },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : t("CR_NOT_RECORDED") },
      ],
    };
    const birthPlaceHospDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
        { title: "CR_HOSPITAL_EN", value: response?.hospitalName || t("CR_NOT_RECORDED") },
        { title: "CR_HOSPITAL_ML", value: response?.hospitalNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    const birthPlaceINSTITUTIONDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
        { title: "CR_INSTITUTION_TYPE", value: response?.institutionTypeEn + " / " + response?.institutionTypeMl || t("CR_NOT_RECORDED") },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.institutionId ? response?.institutionId : t("CR_NOT_RECORDED") },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.institutionIdMl ? response?.institutionIdMl : t("CR_NOT_RECORDED") },
      ],
    };
    const birthPlaceHOMEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_POST_OFFICE", value: response?.adrsPostOffice || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_PIN_CODE", value: response?.adrsPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.adrsLocalityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.adrsLocalityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.adrsStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.adrsStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.adrsHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.adrsHouseNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    const birthPlaceVEHICLEDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_TYPE", value: response?.hospitalName || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.vehicleHaltPlace || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_FROM_EN", value: response?.vehicleFromEn || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_TO_EN", value: response?.vehicleToEn || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_FROM_ML", value: response?.vehicleFromMl || t("CR_NOT_RECORDED") },
        { title: "CR_VEHICLE_TO_ML", value: response?.vehicleToMl || t("CR_NOT_RECORDED") },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.hospitalName || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    const birthPlacePUBLICPLACESDetails = {
      title: "CR_BIRTH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace ? response?.birthPlace : t("CR_NOT_RECORDED") },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || t("CR_NOT_RECORDED") },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        { title: "CR_MOTHER_NAME_EN", value: response?.ParentsDetails.motherFirstNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_MOTHER_NAME_ML", value: response?.ParentsDetails.motherFirstNameMl || t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar || t("CR_NOT_RECORDED") },
        // { title: "CR_BIRTH_MOTHER_AADHAR_LABEL", value: response?.ParentsDetails?.motherAadhar || Not Recorded },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.motherNationality || t("CR_NOT_RECORDED") },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.motherEducation || t("CR_NOT_RECORDED") },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.motherProfession || t("CR_NOT_RECORDED") },
        // { title: "CR_BIRTH_MOTHER_EMAIL_LABEL", value: response?.ParentsDetails.emailid || t("CR_NOT_RECORDED") },
        // { title: "CR_BIRTH_MOTHER_MOBILE_LABEL", value: response?.ParentsDetails.mobileno || t("CR_NOT_RECORDED") },

        { title: "PDF_BIRTH_NAME_OF_FATHER", value: response?.ParentsDetails?.fatherFirstNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_BIRTH_FATHER_AADHAR_LABEL", value: response?.ParentsDetails?.fatherAadhar || NA },
        { title: "CR_NATIONALITY", value: response?.ParentsDetails?.fatherNationality || t("CR_NOT_RECORDED") },
        { title: "CR_EDUCATION", value: response?.ParentsDetails?.fatherEducation || t("CR_NOT_RECORDED") },
        { title: "CR_PROFESSIONAL", value: response?.ParentsDetails?.fatherProfession || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_RELIGION", value: response?.ParentsDetails?.Religion || t("CR_NOT_RECORDED") },

        { title: "CR_BIRTH_FATHER_MOBILE_LABEL", value: response?.ParentsDetails?.fatherMobile || NA },
        { title: "CR_BIRTH_FATHER_EMAIL_LABEL", value: response?.ParentsDetails?.fatherEmail || NA },
      ],
    };
    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AdoptionAddressBasePage.countryIdPresentEn +
              " / " +
              (response?.AdoptionAddressBasePage?.countryIdPresentMl != null ? response?.AdoptionAddressBasePage?.countryIdPresentMl : "") ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_STATE",
          value:
            response?.AdoptionAddressBasePage.stateIdPresentEn + " / " + response?.AdoptionAddressBasePage.stateIdPresentMl || t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AdoptionAddressBasePage?.districtIdPresentEn + " / " + response?.AdoptionAddressBasePage.districtIdPresentMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_TALUK", value: response?.AdoptionAddressBasePage?.presentInsideKeralaTaluk || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_VILLAGE", value: response?.AdoptionAddressBasePage?.presentInsideKeralaVillage || t("CR_NOT_RECORDED") },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AdoptionAddressBasePage?.presentInsideKeralaLBNameEn + " / " + response?.AdoptionAddressBasePage?.presentInsideKeralaLBNameMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_WARD", value: response?.AdoptionAddressBasePage?.presentWardNo || t("CR_NOT_RECORDED") },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AdoptionAddressBasePage?.presentInsideKeralaPostOfficeEn +
              " / " +
              response?.AdoptionAddressBasePage?.presentInsideKeralaPostOfficeMl || t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AdoptionAddressBasePage.presentInsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AdoptionAddressBasePage?.presentInsideKeralaLocalityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AdoptionAddressBasePage?.presentInsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AdoptionAddressBasePage?.presentInsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },
        //Permanent Address
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AdoptionAddressBasePage.countryIdPermanentEn +
              " / " +
              (response?.AdoptionAddressBasePage?.countryIdPermanentMl != null ? response?.AdoptionAddressBasePage?.countryIdPermanentMl : "") ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_STATE",
          value:
            response?.AdoptionAddressBasePage.stateIdPermanentEn + " / " + response?.AdoptionAddressBasePage.stateIdPermanentMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AdoptionAddressBasePage?.districtIdPermanentEn + " / " + response?.AdoptionAddressBasePage.districtIdPermanentMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_TALUK",
          value:
            response?.AdoptionAddressBasePage?.permntInKeralaAdrTalukEn + " / " + response?.AdoptionAddressBasePage.permntInKeralaAdrTalukMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_VILLAGE",
          value:
            response?.AdoptionAddressBasePage?.permntInKeralaAdrVillageEn + " / " + response?.AdoptionAddressBasePage.permntInKeralaAdrVillageMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AdoptionAddressBasePage?.permntInKeralaAdrLBNameEn + " / " + response?.AdoptionAddressBasePage?.permntInKeralaAdrLBNameMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_WARD", value: response?.AdoptionAddressBasePage?.permntInKeralaWardNo || t("CR_NOT_RECORDED") },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AdoptionAddressBasePage?.permntInKeralaAdrPostOfficeEn +
              " / " +
              response?.AdoptionAddressBasePage?.permntInKeralaAdrPostOfficeMl || t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AdoptionAddressBasePage.permntInKeralaAdrPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrLocalityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AdoptionAddressBasePage?.permntInKeralaAdrHouseNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AdoptionAddressBasePage.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_STATE", value: response?.AdoptionAddressBasePage?.presentaddressStateName || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_DISTRICT", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict || t("CR_NOT_RECORDED") },
        { title: "CR_TALUK_TEHSIL", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaCityVilgeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaPostOfficeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_PIN_CODE", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AdoptionAddressBasePage.presentOutsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AdoptionAddressBasePage?.presentOutsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },

        { title: "CS_COMMON_COUNTRY", value: response?.AdoptionAddressBasePage.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_STATE", value: response?.AdoptionAddressBasePage?.presentaddressStateName || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_DISTRICT", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaDistrict || t("CR_NOT_RECORDED") },
        { title: "CR_TALUK_TEHSIL", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaTaluk || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaCityVilgeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaPostOfficeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_PIN_CODE", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AdoptionAddressBasePage.permntOutsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AdoptionAddressBasePage?.permntOutsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    // } else if (response?.AdoptionAddressBasePage?.presentaddressCountry?.code != "COUNTRY_INDIA") {

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AdoptionAddressBasePage.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceEn || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaProvinceMl || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaadrsVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN_EN", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaadrsCityTown || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaPostCode || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AdoptionAddressBasePage.presentOutSideIndiaAdressEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaAdressEnB || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AdoptionAddressBasePage?.presentOutSideIndiaAdressMlB || t("CR_NOT_RECORDED") },

        { title: "CS_COMMON_COUNTRY", value: response?.AdoptionAddressBasePage.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceEn || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaprovinceMl || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN_EN", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaCityTown || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.AdoptionAddressBasePage?.permanentOutsideIndiaPostCode || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AdoptionAddressBasePage.permntOutsideIndiaLineoneEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaLineoneMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AdoptionAddressBasePage?.permntOutsideIndiaLinetwoMl || t("CR_NOT_RECORDED") },
      ],
    };
    const Docdetails = {
      title: "Document SUMMARY DETAILS",
      documents: true,
      tenentId: Digit.ULBService.getStateId(),
      values: response.AdoptionDocuments.map((doc) => doc?.fileStoreId),
    };

    response && employeeResponse.push(AdoptionDetails);
    response && employeeResponse.push(childdetails);
    if (response?.birthPlace === "HOSPITAL") {
      response && employeeResponse.push(birthPlaceHospDetails);
    } else if (response?.birthPlace === "INSTITUTION") {
      response && employeeResponse.push(birthPlaceINSTITUTIONDetails);
    } else if (response?.birthPlace === "HOME") {
      response && employeeResponse.push(birthPlaceHOMEDetails);
    } else if (response?.birthPlace === "VEHICLE") {
      response && employeeResponse.push(birthPlaceVEHICLEDetails);
    } else if (response?.birthPlace === "PUBLIC_PLACES") {
      response && employeeResponse.push(birthPlacePUBLICPLACESDetails);
    }
    response && employeeResponse.push(parentInfo);
    if (
      response?.AdoptionAddressBasePage?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.AdoptionAddressBasePage?.presentaddressStateName === "kl"
    ) {
      response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    } else if (
      response?.AdoptionAddressBasePage?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.AdoptionAddressBasePage?.presentaddressStateName != "kl"
    ) {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    } else if (response?.AdoptionAddressBasePage?.presentaddressCountry != "COUNTRY_INDIA") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    } // response && employeeResponse.push(motherInfo);
    // response && employeeResponse.push(addressInfo);
    // response && employeeResponse.push(statisticalInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents: Docdetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
