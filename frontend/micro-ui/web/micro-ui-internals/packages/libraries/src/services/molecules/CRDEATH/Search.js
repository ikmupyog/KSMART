import cloneDeep from "lodash/cloneDeep";
import { CRDeathService } from "../../elements/CRDEATH";
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
    const Deathdetails = {
      title: "CR_DEATH_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const InformationDeath = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [        
          
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.InformationDeath?.DeathACKNo || "NA" },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "NA",
        },

        // {
        //   title: "PDF_CR_PLACE_OF_DEATH",
        //   value:
        //     response?.InformationDeath?.DeathPlaceHospitalNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceInstitutionNameMl || "NA",
        // },

        {
          title: "PDF_DECEASED_NAME",
          value:
            response?.InformationDeath?.DeceasedFirstNameEn + " "+
              response?.InformationDeath?.DeceasedMiddleNameEn + " "  +
              response?.InformationDeath?.DeceasedLastNameEn +  " "+
              " / " +
              response?.InformationDeath?.DeceasedFirstNameMl +
              " " +
              response?.InformationDeath?.DeceasedMiddleNameMl +
              " " +
              response?.InformationDeath?.DeceasedLastNameMl || "NA",
        },
        { title: "CR_AADHAR", value: response?.InformationDeath?.DeceasedAadharNumber || "NA" },
        { title: "CR_AGE", value: response?.InformationDeath?.Age +" "+ response?.InformationDeath?.ageUnitEn +"/"+ response?.InformationDeath?.Age +" "+ response?.InformationDeath?.ageUnitMl || "NA" },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || "NA" },

        { title: "CR_NATIONALITY", value: response?.InformationDeath?.nationalityEn +"/"+ response?.InformationDeath?.nationalityMl || "NA" },

        { title: "CS_COMMON_RELIGION", value: response?.InformationDeath?.religionEn +"/" + response?.InformationDeath?.religionMl  || "NA" },
        { title: "CR_PROFESSIONAL", value: response?.InformationDeath?.occupationEn  + "/" + response?.InformationDeath?.occupationMl|| "NA" },

        // }),
      ],
    };
    const deathPlaceHospDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
       // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CR_HOSPITAL_EN", value: response?.InformationDeath?.DeathPlaceHospitalNameEn || "NA" },
        { title: "CR_HOSPITAL_ML", value: response?.InformationDeath?.DeathPlaceHospitalNameMl || "NA" },
      ],
    };
    const deathPlaceINSTITUTIONDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
       // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CR_INSTITUTION_TYPE", value: response?.InformationDeath?.institution || "NA" },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.InformationDeath?.DeathPlaceInstitutionNameEn || "NA" },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.InformationDeath?.DeathPlaceInstitutionNameMl || "NA" },
      ],
    };
    const deathPlaceHOMEDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
      // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CS_COMMON_WARD", value: response?.InformationDeath?.homeWardEn + " / " + response?.InformationDeath?.homeWardMl || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.InformationDeath?.deathPlaceHomePostofficeEn +"/"+response?.InformationDeath?.deathPlaceHomePostofficeMl  || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.InformationDeath?.DeathPlaceHomePincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.InformationDeath?.DeathPlaceHomeLocalityEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.InformationDeath?.DeathPlaceHomeLocalityMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeHoueNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeHoueNameMl || "NA" },
      ],
    };
    const deathPlaceVEHICLEDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        //{ title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CR_VEHICLE_TYPE", value: response?.hospitalName || "NA" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.vehicleRegistrationNo || "NA" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.VehicleFirstHaltEn + "/" + response?.VehicleFirstHaltMl || "NA" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.VehicleFromplaceEn || "NA" },
        { title: "CR_VEHICLE_TO_EN", value: response?.VehicleToPlaceEn || "NA" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.VehicleFromplaceMl || "NA" },
        { title: "CR_VEHICLE_TO_ML", value: response?.VehicleToPlaceMl || "NA" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.VehicleHospitalEn || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
      ],
    };
    const deathPlacePUBLICPLACESDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
       // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceEn + " / " + response?.publicPlaceMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.DeathPlaceWardId + " / " + response?.DeathPlaceWardIdMl || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.DeathPlaceLocalityEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.DeathPlaceLocalityMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.DeathPlaceStreetEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.DeathPlaceStreetMl || "NA" },
        { title: "CR_DESCRIPTION", value: response?.GeneralRemarks || "NA" },
      ],
    };
    const deathPlaceOUTSIDEJURISDICTIONDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
      //  { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "NA" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "NA" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "NA" },
      ],
    };
    

    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountryNameEn + " / " + (response?.AddressBirthDetails?.presentaddressCountryNameMl != null ? response?.AddressBirthDetails?.presentaddressCountryNameMl : "") || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.presentaddressStateNameEn + " / " + response?.AddressBirthDetails.presentaddressStateNameMl || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentInsideKeralaDistrictEn + " / " + response?.AddressBirthDetails.presentInsideKeralaDistrictMl || "NA" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + response?.AddressBirthDetails.presentInsideKeralaTalukMl || "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + response?.AddressBirthDetails.presentInsideKeralaVillageMl || "NA" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.presentWardNoEn + " / " + response?.AddressBirthDetails?.presentWardNoMl || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || "NA" },
        //Permanent Address
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.permanentAddrCountryNameEn + " / " + (response?.AddressBirthDetails?.permanentAddrCountryNameMl != null ? response?.AddressBirthDetails?.permanentAddrCountryNameMl : "") || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails.permtaddressStateNameEn + " / " + response?.AddressBirthDetails.permtaddressStateNameMl || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntInKeralaAdrDistrictEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrDistrictMl || "NA" },
        { title: "CS_COMMON_TALUK", value: response?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrTalukMl|| "NA" },
        { title: "CS_COMMON_VILLAGE", value: response?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " +response?.AddressBirthDetails?.permntInKeralaAdrVillageMl || "NA" },
        { title: "CS_COMMON_LB_NAME", value: response?.AddressBirthDetails?.permntInKeralaAdrLBName + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl || "NA" },
        { title: "CS_COMMON_WARD", value: response?.AddressBirthDetails?.prmttWardNoEn + " / " + response?.AddressBirthDetails?.prmttWardNoMl || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || "NA" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || "NA" },

      ]
    }
    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.presentaddressStateNameEn +"/" +response?.AddressBirthDetails?.presentaddressStateNameMl|| "NA" },

        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || "NA" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || "NA" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || "NA" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.permanentAddrCountryNameEn || "NA" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.permtaddressStateNameEn || "NA" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntOutsideKeralaDistrict || "NA" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.permntOutsideKeralaTaluk || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaVillage || "NA" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || "NA" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || "NA" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.permntOutsideKeralaPincode || "NA" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || "NA" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || "NA" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || "NA" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || "NA" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || "NA" },
      ]
    }
    // } else if (response?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.permanentOutSideCountryNameEn || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || "NA" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || "NA" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || "NA" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || "NA" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || "NA" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || "NA" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || "NA" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || "NA" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaVillage || "NA" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaCityTown || "NA" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.permanentOutsideIndiaPostCode || "NA" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.permntOutsideIndiaLineoneEn || "NA" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || "NA" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || "NA" },
      ]
    }

    // const AddressBirthDetails = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [

   
    const FamilyInformationDeath = {
      title: "CR_FAMILY_DETAILS",
      values: [
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInformationDeath?.SpouseNameEn + " / " + response?.FamilyInformationDeath?.SpouseNameML || "NA ",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.SpouseAadhaar || "NA" },
        { title: "CR_SPOUSE_AGE", value: response?.FamilyInformationDeath?.spouseAge || "NA" },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.FamilyInformationDeath?.FatherNameEn + " / " + response?.FamilyInformationDeath?.FatherNameMl || "NA",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.FatherAadharNo || "NA" },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.FamilyInformationDeath?.MotherNameEn + " / " + response?.FamilyInformationDeath?.MotherNameMl || "NA",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.MotherAadharNo || "NA" },
        { title: "CR_FAMILY_MOBILE_NO", value: response?.FamilyInformationDeath?.FamilyMobileNo || "NA" },
        { title: "CR_EMAIL_ID", value: response?.FamilyInformationDeath?.FamilyEmailId || "NA" },
        // {
        //   title: "PDF_PLACE_OF_DEATH",
        //   value:
        //     response?.InformationDeath?.DeathPlaceHospitalNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceInstitutionNameMl || "NA",
        // },
      ],
    };

    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        { title: "CR_MEDICAL_ATTENTION_DEATH", value: response?.StatisticalInfo?.medicalAttentionTypeEn +"/" + response?.StatisticalInfo?.medicalAttentionTypeMl  || "NA" },
        { title: "CR_AUTOPSY_PERFORM", value: response?.StatisticalInfo?.IsAutopsyPerformed || "NA" },
        { title: "CR_MANNER_OF_DEATH", value: response?.StatisticalInfo?.mannerOfDeathEn +"/" + response?.StatisticalInfo?.mannerOfDeathMl || "NA" },
        { title: "CR_CAUSE_OF_DEATH", value: response?.StatisticalInfo?.DeathCauseSub || "NA" },
        { title: "CR_CAUSE_DEATH_MEDICALLY_CERTIFIED", value: response?.StatisticalInfo?.DeathMedicallyCertified || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_MAIN", value: response?.StatisticalInfo?.DeathCauseMain + " / " +response?.StatisticalInfo?.deathCauseMainMl || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseMainCustom || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseMainInterval || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseMainTimeUnit || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_A", value: response?.StatisticalInfo?.deathCauseSubEn +"/" + response?.statisticalInfo?.deathCauseSubMl|| "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_B", value: response?.StatisticalInfo?.deathCauseSub2En +"/" + response?.statisticalInfo?.deathCauseSub2Ml|| "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom2 || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval2 || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit2 || "NA" },
        { title: "CR_DEATH_CAUASE_OTHER", value: response?.StatisticalInfo?.DeathCauseSub2 || "NA" },
        { title: "CR_HABITUALLY_SMOKE", value: response?.StatisticalInfo?.SmokingType || "NA" },
        { title: "CR_HABITUALLY_CHEW_TOBACCO", value: response?.StatisticalInfo?.TobaccoType || "NA" },
        { title: "CR_HABITUALLY_DRINK_ALCOHOL", value: response?.StatisticalInfo?.AlcoholType || "NA" },

        //{ title: "CR_STATSTICAL_DEATH_OCCUPATION", value: response?.statisticalInfo?.occupation || "NA" },
      ],
    };
    const InitiatorDetails = {
      title: "CR_INITIATOR_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "CR_RELATION", value: response?.Initiator?.InitiatorRelation || "NA" },
        { title: "PDF_INITIATOR_NAME", value: response?.Initiator?.InitiatorName || "NA" },
        { title: "PDF_INITIATOR_AADHAR", value: response?.Initiator?.InitiatorAadhaar || "NA" },
        { title: "PDF_INITIATOR_MOBILE_NO", value: response?.Initiator?.InitiatorMobile || "NA" },
        { title: "PDF_INITIATOR_DESIGNATION", value: response?.Initiator?.initiatorDesi || "NA" },
        { title: "PDF_INITIATOR_ADDRESS", value: response?.Initiator?.InitiatorAddress || "NA" },

      ],
    };
    const InformarHospitalInstitution = {
      title: "CR_INFORMANT_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.InformantDetails?.infomantFirstNameEn || "NA" },
        { title: "PDF_INFORMER_AADHAR", value: response?.InformantDetails?.infomantAadhar || "NA" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.InformantDetails?.infomantMobile || "NA" },
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.InformantDetails?.informerDesi || "NA" },
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.InformantDetails?.informerAddress || "NA" },

      ],
    };
    response && employeeResponse.push(Deathdetails);
    response && employeeResponse.push(InformationDeath);
    if (response?.InformationDeath?.DeathPlace === "HOSPITAL") {
      response && employeeResponse.push(deathPlaceHospDetails);
    } else if (response?.InformationDeath?.DeathPlace === "INSTITUTION") {
      response && employeeResponse.push(deathPlaceINSTITUTIONDetails);
    }else if (response?.InformationDeath?.DeathPlace === "HOME") {
      response && employeeResponse.push(deathPlaceHOMEDetails);
    } else if (response?.InformationDeath?.DeathPlace === "VEHICLE") {
      response && employeeResponse.push(deathPlaceVEHICLEDetails);
    } else if (response?.InformationDeath?.DeathPlace === "PUBLIC_PLACES") {
      response && employeeResponse.push(deathPlacePUBLICPLACESDetails);
    }

    // response && employeeResponse.push(parentInfo);
    if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName === "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry === "COUNTRY_INDIA" && response?.AddressBirthDetails?.presentaddressStateName != "kl") {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideKeralaInfo);
    } else if (response?.AddressBirthDetails?.presentaddressCountry != "COUNTRY_INDIA" ) {
      response && employeeResponse.push(AddressBirthDetailsPresentOutsideIndiaInfo);
    }
    response && employeeResponse.push(FamilyInformationDeath);    
    response && employeeResponse.push(statisticalInfo);
    response && employeeResponse.push(InitiatorDetails);
    response && employeeResponse.push(InformarHospitalInstitution);
    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
