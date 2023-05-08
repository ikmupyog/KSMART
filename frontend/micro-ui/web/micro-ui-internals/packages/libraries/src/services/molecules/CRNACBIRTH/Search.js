import cloneDeep from "lodash/cloneDeep";
import { CRNACBirthService } from "../../elements/CRNACBIRTH";
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

export const CRNACsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response.nacDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response.nacDetails[0];
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    const filter = { applicationNumber };
    const response = await CRNACsearch.application(tenantId, filter);

    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRNACsearch.numberOfApplications(tenantId, filters);
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
        {
          title: "PDF_BIRTH_CHILD_NAME",
          value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + "  " + response?.childLastNameEn,
        },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_AADHAR_NO", value: response?.childAadharNo || t("CR_NOT_RECORDED") },
        { title: "PDF_BIRTH_ORDER", value: response?.nacorderofChildren || t("CR_NOT_RECORDED") },
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
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || t("CR_NOT_RECORDED"),
        },
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar || t("CR_NOT_RECORDED") },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || t("CR_NOT_RECORDED"),
        },
        { title: "PDF_BIRTH_FATHER_AADHAR", value: response?.ParentsDetails?.fatherAadhar || t("CR_NOT_RECORDED") },
      ],
    };

    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.countryIdPresentEn +
              " / " +
              (response?.AddressBirthDetails?.countryIdPresentMl != null ? response?.AddressBirthDetails?.countryIdPresentMl : "") ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_STATE",
          value: response?.AddressBirthDetails.stateIdPresentEn + " / " + response?.AddressBirthDetails.stateIdPresentMl || t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AddressBirthDetails?.districtIdPresentEn + " / " + response?.AddressBirthDetails.districtIdPresentMl || t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_TALUK",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + response?.AddressBirthDetails.presentInsideKeralaTalukMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_VILLAGE",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + response?.AddressBirthDetails.presentInsideKeralaVillageMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.presentWardNo || t("CR_NOT_RECORDED") },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },
        //Permanent Address
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.countryIdPermanentEn +
              " / " +
              (response?.AddressBirthDetails?.countryIdPermanentMl != null ? response?.AddressBirthDetails?.countryIdPermanentMl : "") ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_STATE",
          value: response?.AddressBirthDetails.stateIdPermanentEn + " / " + response?.AddressBirthDetails.stateIdPermanentMl || t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AddressBirthDetails?.districtIdPermanentEn + " / " + response?.AddressBirthDetails.districtIdPermanentMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_TALUK",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrTalukMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_VILLAGE",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrVillageMl ||
            t("CR_NOT_RECORDED"),
        },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.permntInKeralaWardNo || t("CR_NOT_RECORDED") },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl ||
            t("CR_NOT_RECORDED"),
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || t("CR_NOT_RECORDED") },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateName || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntOutsideKeralaDistrict || t("CR_NOT_RECORDED") },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.permntOutsideKeralaTaluk || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || t("CR_NOT_RECORDED") },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.permntOutsideKeralaPincode || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || t("CR_NOT_RECORDED") },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || t("CR_NOT_RECORDED") },
      ],
    };
    // } else if (response?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || t("CR_NOT_RECORDED") },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || t("CR_NOT_RECORDED") },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || t("CR_NOT_RECORDED") },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaVillage || t("CR_NOT_RECORDED") },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaCityTown || t("CR_NOT_RECORDED") },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.permanentOutsideIndiaPostCode || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.permntOutsideIndiaLineoneEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || t("CR_NOT_RECORDED") },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || t("CR_NOT_RECORDED") },
      ],
    };

    const initiatorInfo = {
      title: "CR_APPLICANT_INFORMATION_HEADER",
      values: [
        {
          title: "CR_APPLICANT_NAME",
          value: response?.ApplicantDetails.applicantNameEn || t("CR_NOT_RECORDED"),
        },
        { title: "CR_APPLICANT_AADHAR", value: response?.ApplicantDetails.aadharNo || t("CR_NOT_RECORDED") },
        { title: "CR_APPLICANT_MOBILE", value: response?.ApplicantDetails.mobileNo || t("CR_NOT_RECORDED") },
        { title: "CR_APPLICANT_ADDRESS", value: response?.ApplicantDetails.applicantAddressEn || t("CR_NOT_RECORDED") },
        { title: "CR_CARE_OF_APPLICATION", value: response?.ApplicantDetails.careofapplicant || t("CR_NOT_RECORDED") },
      ],
    };

    // const childInfo = {
    //   title: "CR_APPLICANT_OTHER_CHILDREN_HEADER",
    //   values: [
    //     { title: "PDF_BIRTH_CHILD_NAME", value: response?.OtherChildren.childNameEn || t("CR_NOT_RECORDED") },
    //     { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.OtherChildren.dob || t("CR_NOT_RECORDED") },
    //     { title: "PDF_BIRTH_CHILD_SEX", value: response?.OtherChildren.sex || t("CR_NOT_RECORDED") },
    //     { title: "PDF_BIRTH_ORDER", value: response?.OtherChildren.nacorderofChildren || t("CR_NOT_RECORDED") },
    //   ],
    // };
    const Docdetails = {
      title: "Document SUMMARY DETAILS",
      documents: true,
      tenentId: Digit.ULBService.getStateId(),
      values: response.BirthNACDocuments.map((doc) => doc?.fileStoreId),
    };

    response && employeeResponse.push(Birthdetails);
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
    if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName === "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    } else if (
      response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" &&
      response?.AddressBirthDetails?.presentaddressStateName != "kl"
    ) {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    }
    response && employeeResponse.push(initiatorInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents: Docdetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
