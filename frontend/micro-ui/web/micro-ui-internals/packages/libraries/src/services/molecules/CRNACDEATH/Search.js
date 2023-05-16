import cloneDeep from "lodash/cloneDeep";
import { CRNACDeathService } from "../../elements/CRNACDEATH";
import { NA } from "../../../utils/dataFormatter";
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
      title: "CR_DEATH_SUMMARY",
      asSectionHeader: true,
    }
    const InformationDeath = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.InformationDeath?.DeathACKNo || NA },
        {
          title: "PDF_BIRTH_CHILD_NAME",
          value:
            response?.InformationDeath?.DeceasedFirstNameEn + " " +

            response?.InformationDeath?.DeceasedMiddleNameEn + " " +

            response?.InformationDeath?.DeceasedLastNameEn + "  " +
            " / " +
            response?.InformationDeath?.DeceasedFirstNameMl +
            " " +
            response?.InformationDeath?.DeceasedMiddleNameMl +
            " " +
            response?.InformationDeath?.DeceasedLastNameMl || NA,
        },

        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || NA },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : NA,
        },
        {
          title: "CS_COMMON_AADHAAR",
          value: response?.InformationDeath?.DeceasedAadharNumber  || NA,
        },
        // ...(InformationDeath.DeathPlace.code === "HOSPITAL" && {

        // }),
      ],
    };
    const DeathHospitalDetail = {
      title: "Death Place Details",
      asSectionHeader: true,
      values: [
        { title: "PLACE OF DEATH", value: response?.InformationDeath?.DeathPlace  || NA },
        { title: "CR_HOSPITAL_EN", value: response?.InformationDeath?.DeathPlaceHospitalNameEn  || NA },
        { title: "CR_HOSPITAL_ML", value: response?.InformationDeath?.DeathPlaceHospitalNameMl  || NA },
      ],
    };
    const DeathPlaceINSTITUTIONDetails = {
      title: "Death Place Details",
      asSectionHeader: true,
      values: [
        { title: "PLACE OF DEATH", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_INSTITUTION_TYPE", value: response?.InformationDeath?.institution + " / " + response?.InformationDeath?.institution || NA },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.InformationDeath?.DeathPlaceInstitutionNameEn ? response?.InformationDeath?.DeathPlaceInstitutionNameEn : NA },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.InformationDeath?.DeathPlaceInstitutionNameMl ? response?.InformationDeath?.DeathPlaceInstitutionNameMl : NA },
      ],
    };
    const DeathPlaceHOMEDetails = {
      title: "Death Place Details",
      asSectionHeader: true,
      values: [
        { title: "PLACE OF DEATH", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_HOUSE_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeHoueNameEn || NA },
        { title: "CR_HOUSE_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeHoueNameMl || NA },
        { title: "CR_LOCALITY_EN", value: response?.InformationDeath?.DeathPlaceHomeLocalityEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.InformationDeath?.DeathPlaceHomeLocalityMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeStreetNameEn || NA },
        { title: "CR_STREET_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeStreetNameMl || NA },
        { title: "CS_COMMON_WARD_EN", value: response?.InformationDeath?.homeWardEn || NA },
        { title: "CS_COMMON_WARD_ML", value: response?.InformationDeath?.homeWardMl || NA },
        { title: "CS_COMMON_POST_OFFICE_EN", value: response?.InformationDeath?.deathPlaceHomePostofficeEn || NA },
        { title: "CS_COMMON_POST_OFFICE_ML", value: response?.InformationDeath?.deathPlaceHomePostofficeMl || NA },
        { title: "CS_COMMON_PIN_CODE", value: response?.InformationDeath?.DeathPlaceHomePincode || NA },
      ],
    };
    const DeathPlaceVEHICLEDetails = {
      title: "Death Place Details",
      asSectionHeader: true,
      values: [
        { title: "PLACE OF DEATH", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_VEHICLE_TYPE_EN", value: response?.InformationDeath?.vehicleTypeEn || NA },
        { title: "CR_VEHICLE_TYPE_ML", value: response?.InformationDeath?.vehicleTypeMl || NA },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.InformationDeath?.VehicleNumber || NA },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT", value: response?.InformationDeath?.VehicleFirstHaltEn || NA },
        { title: "CR_VEHICLE_FROM_EN", value: response?.InformationDeath?.VehicleFromplaceEn || NA },
        { title: "CR_VEHICLE_TO_EN", value: response?.InformationDeath?.VehicleToPlaceEn || NA },
        { title: "CR_VEHICLE_FROM_ML", value: response?.InformationDeath?.VehicleFromplaceMl || NA },
        { title: "CR_VEHICLE_TO_ML", value: response?.InformationDeath?.VehicleToPlaceMl || NA },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.InformationDeath?.vehicleHospitalNameEn || NA },
        { title: "CR_ADMITTED_HOSPITAL_ML", value: response?.InformationDeath?.vehicleHospitalNameMl || NA },
      ],
    };
    const DeathPlacePUBLICPLACESDetails = {
      title: "Death Place Details",
      asSectionHeader: true,
      values: [
        { title: "PLACE OF DEATH", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.InformationDeath?.publicPlaceEn + " / " + response?.InformationDeath?.publicPlaceMl || NA },
        { title: "CS_COMMON_WARD", value: response?.InformationDeath?.DeathPlace + " / " + response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_LOCALITY_EN", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_LOCALITY_ML", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_STREET_NAME_EN", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_STREET_NAME_ML", value: response?.InformationDeath?.DeathPlace || NA },
        { title: "CR_DESCRIPTION", value: response?.InformationDeath?.DeathPlace || NA },
      ],
    };
    const DeathParentDetail = {
      title: "Family Details",
      asSectionHeader: true,
      values: [
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.InformationDeath?.SpouseNameEn + " / " + response?.InformationDeath?.SpouseNameML || NA,
        },
        {
          title: "CS_COMMON_AADHAAR",
          value: response?.InformationDeath?.SpouseAadhaar  || NA,
        },
      {
        title: "PDF_BIRTH_NAME_OF_FATHER",
        value: response?.InformationDeath?.FatherNameEn + " / " + response?.InformationDeath?.FatherNameMl || NA,
      },
      {
        title: "CS_COMMON_AADHAAR",
        value: response?.InformationDeath?.FatherAadharNo  || NA,
      },
      {
        title: "PDF_BIRTH_NAME_OF_MOTHER",
        value: response?.InformationDeath?.MotherNameEn + " / " + response?.InformationDeath?.MotherNameMl || NA,
      },
      {
        title: "CS_COMMON_AADHAAR",
        value: response?.InformationDeath?.MotherAadharNo  || NA,
      },
      ],
    };
    const PresentAddressInsidekeralaDetail = {
      title: "Deceased Present Address",
      asSectionHeader: true,
      values: [
        {
          title: "Country",
          value: response?.AddressBirthDetails?.presentaddressCountryNameEn + " / " + response?.AddressBirthDetails?.presentaddressCountryNameMl || NA,
        },
        {
          title: "State",
          value: response?.AddressBirthDetails?.presentaddressStateNameEn + " / " + response?.AddressBirthDetails?.presentaddressStateNameMl || NA,
        },
        {
          title: "District",
          value: response?.AddressBirthDetails?.presentInsideKeralaDistrictEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaDistrictMl || NA,
        },
        {
          title: "Taluk",
          value: response?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaTalukMl || NA,
        },
        {
          title: "Village",
          value: response?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaVillageMl || NA,
        },
        {
          title: "Local Body",
          value: response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || NA,
        },
        {
          title: "Ward",
          value: response?.AddressBirthDetails?.presentWardNoEn + " / " + response?.AddressBirthDetails?.presentWardNoMl || NA,
        },
        {
          title: "Post Office",
          value: response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl || NA,
        },
        {
          title: "Pincode",
          value: response?.AddressBirthDetails?.PresentAddrPincode || NA,
        },
        {
          title: "Locality (English)",
          value: response?.AddressBirthDetails?.PresentAddrLocalityEn || NA,
        },
        {
          title: "Locality (Malayalam)",
          value: response?.AddressBirthDetails?.PresentAddrLocalityMl || NA,
        },
        {
          title: "Street (English)",
          value: response?.AddressBirthDetails?.PresentAddrStreetNameEn || NA,
        },
        {
          title: "Street (Malayalam)",
          value: response?.AddressBirthDetails?.PresentAddrStreetNameMl || NA,
        },
        {
          title: "House Name/NO (English)",
          value: response?.AddressBirthDetails?.PresentAddrHoueNameEn || NA,
        },
        {
          title: "House Name/NO (Malayalam)",
          value: response?.AddressBirthDetails?.PresentAddrHoueNameMl || NA,
        },
      ],
    };
    const PermanentAddressInsidekeralaDetail = {
      title: "Deceased Permanent Address",
      asSectionHeader: true,
      values: [
        {
          title: "Country",
          value: response?.AddressBirthDetails?.permanentAddrCountryNameEn + " / " + response?.AddressBirthDetails?.permanentAddrCountryNameMl || NA,
        },
        {
          title: "State",
          value: response?.AddressBirthDetails?.permtaddressStateNameEn + " / " + response?.AddressBirthDetails?.permtaddressStateNameMl || NA,
        },
        {
          title: "District",
          value: response?.AddressBirthDetails?.permntInKeralaAdrDistrictEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrDistrictMl || NA,
        },
        {
          title: "Taluk",
          value: response?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrTalukMl || NA,
        },
        {
          title: "Village",
          value: response?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrVillageMl || NA,
        },
        {
          title: "Local Body",
          value: response?.AddressBirthDetails?.permntInKeralaAdrLBNameEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || NA,
        },
        {
          title: "Ward",
          value: response?.AddressBirthDetails?.prmttWardNoEn + " / " + response?.AddressBirthDetails?.prmttWardNoMl || NA,
        },
        {
          title: "Post Office",
          value: response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl || NA,
        },
        {
          title: "Pincode",
          value: response?.AddressBirthDetails?.PermanentAddrPincode || NA,
        },
        {
          title: "Locality (English)",
          value: response?.AddressBirthDetails?.PermanentAddrLocalityEn || NA,
        },
        {
          title: "Locality (Malayalam)",
          value: response?.AddressBirthDetails?.PermanentAddrLocalityMl || NA,
        },
        {
          title: "Street (English)",
          value: response?.AddressBirthDetails?.PermanentAddrStreetNameEn || NA,
        },
        {
          title: "Street (Malayalam)",
          value: response?.AddressBirthDetails?.PermanentAddrStreetNameMl || NA,
        },
        {
          title: "House Name/NO (English)",
          value: response?.AddressBirthDetails?.PermanentAddrHoueNameEn || NA,
        },
        {
          title: "House Name/NO (Malayalam)",
          value: response?.AddressBirthDetails?.PermanentAddrHoueNameMl || NA,
        },
      ],
    };
    const PermanentAddressOutsidekeralaDetail = {
      title: "Decent Address",
      asSectionHeader: true,
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountryNameEn || NA },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateNameEn || NA },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || NA },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || NA },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || NA },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || NA },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || NA },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || NA },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || NA },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || NA },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || NA },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || NA },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || NA },
      ],
    };
    const PermanentAddressOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || NA },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || NA },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || NA },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || NA },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || NA },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || NA },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || NA },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || NA },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || NA },
      ],
    };
    const ApplicantDetail = {
      title: "CR_APPLICANT_INFORMATION_HEADER",
      asSectionHeader: true,
      values: [
        {
          title: "CR_APPLICANT_NAME",
          value:
            response?.DeathApplicantDtls?.ApplicantName || NA,
        },

        { title: "CR_APPLICANT_AADHAR", value: response?.DeathApplicantDtls?.ApplicantAadhaarNo || NA },
        { title: "CR_APPLICANT_MOBILE", value: response?.DeathApplicantDtls?.ApplicantMobileNo || NA},
        { title: "CR_RELATION_WITH_DECEASED", value: response?.DeathApplicantDtls?.ApplicantRelation || NA,},
        { title: "CR_APPLICANT_ADDRESS", value: response?.DeathApplicantDtls?.ApplicantAddress  || NA,},
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
    if(response?.InformationDeath?.DeathPlace === "HOSPITAL"){
      response && employeeResponse.push(DeathHospitalDetail);
    }
    else if(response?.InformationDeath?.DeathPlace === "INSTITUTION"){
      response && employeeResponse.push(DeathPlaceINSTITUTIONDetails);
    }
    else if(response?.InformationDeath?.DeathPlace === "HOME"){
      response && employeeResponse.push(DeathPlaceHOMEDetails);
    }
    else if(response?.InformationDeath?.DeathPlace === "VEHICLE"){
      response && employeeResponse.push(DeathPlaceVEHICLEDetails);
    }
    else if(response?.InformationDeath?.DeathPlace === "PUBLIC_PLACES"){
      response && employeeResponse.push(DeathPlacePUBLICPLACESDetails);
    }
    response && employeeResponse.push(DeathParentDetail);
    if(response?.AddressBirthDetails?.permtaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.permtaddressStateName === "kl"){
      response && employeeResponse.push(PresentAddressInsidekeralaDetail);
      response && employeeResponse.push(PermanentAddressInsidekeralaDetail);
    }
    else if(response?.AddressBirthDetails?.permtaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.permtaddressStateName !== "kl"){
      response && employeeResponse.push(PermanentAddressOutsidekeralaDetail);
    }
    else if(response?.AddressBirthDetails?.permtaddressCountry !== "COUNTRY_INDIA"){
      response && employeeResponse.push(PermanentAddressOutsideIndiaInfo);
    }
    response && employeeResponse.push(ApplicantDetail);
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
