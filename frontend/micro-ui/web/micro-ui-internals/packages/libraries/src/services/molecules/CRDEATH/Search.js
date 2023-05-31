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

      values:
        response?.InformationDeath?.DeathDateUnavailable === false
          ? [
              { title: "CR_SEARCH_APP_NO_LABEL", value: response?.InformationDeath?.DeathACKNo || "CR_NOT_RECORDED" },
              // {
              //   title: "PDF_CR_DEATH_OF_DATE",
              //   value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "CR_NOT_RECORDED",
              // },

              {
                title: t("Date of Death"),
                value: response?.InformationDeath?.DateOfDeath
                  ? Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath, "dd/MM/yyyy")
                  : t("CS_NA"),
              },

              // {
              //   title: "PDF_CR_PLACE_OF_DEATH",
              //   value:
              //     response?.InformationDeath?.DeathPlaceHospitalNameEn +
              //       "/" +
              //       response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
              //       "/" +
              //       response?.InformationDeath?.DeathPlaceInstitutionNameMl || "CR_NOT_RECORDED",
              // },

              {
                title: "PDF_DECEASED_NAME",
                value:
                  response?.InformationDeath?.DeceasedFirstNameEn +
                    " " +
                    response?.InformationDeath?.DeceasedMiddleNameEn +
                    " " +
                    response?.InformationDeath?.DeceasedLastNameEn +
                    " " +
                    " / " +
                    response?.InformationDeath?.DeceasedFirstNameMl +
                    " " +
                    response?.InformationDeath?.DeceasedMiddleNameMl +
                    " " +
                    response?.InformationDeath?.DeceasedLastNameMl || "CR_NOT_RECORDED",
              },
              { title: "CR_AADHAR", value: response?.InformationDeath?.DeceasedAadharNumber || "CR_NOT_RECORDED" },
              {
                title: "CR_AGE",
                value:
                  response?.InformationDeath?.Age +
                    " " +
                    response?.InformationDeath?.ageUnitEn +
                    "/" +
                    response?.InformationDeath?.Age +
                    " " +
                    response?.InformationDeath?.ageUnitMl || "CR_NOT_RECORDED",
              },
              { title: "CR_GENDER", value: response?.InformationDeath?.DeceasedGender || "CR_NOT_RECORDED" },

              {
                title: "CR_NATIONALITY",
                value: response?.InformationDeath?.nationalityEn + "/" + response?.InformationDeath?.nationalityMl || "CR_NOT_RECORDED",
              },

              {
                title: "CS_COMMON_RELIGION",
                value: response?.InformationDeath?.religionEn + "/" + response?.InformationDeath?.religionMl || "CR_NOT_RECORDED",
              },
              {
                title: "CR_PROFESSIONAL",
                value: response?.InformationDeath?.occupationEn
                  ? response?.InformationDeath?.occupationEn
                  : "CR_NOT_RECORDED" + "/" + response?.InformationDeath?.occupationMl
                  ? response?.InformationDeath?.occupationMl
                  : "CR_NOT_RECORDED",
              },

              // }),
            ]
          : [
              { title: "CR_SEARCH_APP_NO_LABEL", value: response?.InformationDeath?.DeathACKNo || "CR_NOT_RECORDED" },
              // {
              //   title: "PDF_CR_DEATH_OF_DATE",
              //   value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "CR_NOT_RECORDED",
              // },

              {
                title: t("CR_FROM_DATE"),
                value: response?.InformationDeath?.DateOfDeath
                  ? Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath, "dd/MM/yyyy")
                  : t("CS_NA"),
              },
              {
                title: t("CR_TO_DATE"),
                value: response?.InformationDeath?.DateOfDeath1
                  ? Digit.DateUtils.ConvertTimestampToDate(response?.InformationDeath?.DateOfDeath1, "dd/MM/yyyy")
                  : t("CS_NA"),
              },

              // {
              //   title: "PDF_CR_PLACE_OF_DEATH",
              //   value:
              //     response?.InformationDeath?.DeathPlaceHospitalNameEn +
              //       "/" +
              //       response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
              //       "/" +
              //       response?.InformationDeath?.DeathPlaceInstitutionNameMl || "CR_NOT_RECORDED",
              // },

              {
                title: "PDF_DECEASED_NAME",
                value:
                  response?.InformationDeath?.DeceasedFirstNameEn +
                    " " +
                    response?.InformationDeath?.DeceasedMiddleNameEn +
                    " " +
                    response?.InformationDeath?.DeceasedLastNameEn +
                    " " +
                    " / " +
                    response?.InformationDeath?.DeceasedFirstNameMl +
                    " " +
                    response?.InformationDeath?.DeceasedMiddleNameMl +
                    " " +
                    response?.InformationDeath?.DeceasedLastNameMl || "CR_NOT_RECORDED",
              },
              { title: "CR_AADHAR", value: response?.InformationDeath?.DeceasedAadharNumber || "CR_NOT_RECORDED" },
              {
                title: "CR_AGE",
                value:
                  response?.InformationDeath?.Age +
                    " " +
                    response?.InformationDeath?.ageUnitEn +
                    "/" +
                    response?.InformationDeath?.Age +
                    " " +
                    response?.InformationDeath?.ageUnitMl || "CR_NOT_RECORDED",
              },
              { title: "CR_GENDER", value: response?.InformationDeath?.DeceasedGender || "CR_NOT_RECORDED" },

              {
                title: "CR_NATIONALITY",
                value: response?.InformationDeath?.nationalityEn + "/" + response?.InformationDeath?.nationalityMl || "CR_NOT_RECORDED",
              },

              {
                title: "CS_COMMON_RELIGION",
                value: response?.InformationDeath?.religionEn + "/" + response?.InformationDeath?.religionMl || "CR_NOT_RECORDED",
              },
              {
                title: "CR_PROFESSIONAL",
                value: response?.InformationDeath?.occupationEn
                  ? response?.InformationDeath?.occupationEn
                  : "CR_NOT_RECORDED" + "/" + response?.InformationDeath?.occupationMl
                  ? response?.InformationDeath?.occupationMl
                  : "CR_NOT_RECORDED",
              },

              // }),
            ],
    };
    const deathPlaceHospDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        { title: "CR_HOSPITAL_EN", value: response?.InformationDeath?.DeathPlaceHospitalNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOSPITAL_ML", value: response?.InformationDeath?.DeathPlaceHospitalNameMl || "CR_NOT_RECORDED" },
      ],
    };
    const deathPlaceINSTITUTIONDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        { title: "CR_INSTITUTION_TYPE", value: response?.InformationDeath?.institution || "CR_NOT_RECORDED" },
        { title: "CR_INSTITUTION_NAME_EN", value: response?.InformationDeath?.DeathPlaceInstitutionNameEn || "CR_NOT_RECORDED" },
        { title: "CR_INSTITUTION_NAME_ML", value: response?.InformationDeath?.DeathPlaceInstitutionNameMl || "CR_NOT_RECORDED" },
      ],
    };
    const deathPlaceHOMEDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        {
          title: "CS_COMMON_WARD",
          value: response?.InformationDeath?.homeWardEn + " / " + response?.InformationDeath?.homeWardMl || "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.InformationDeath?.deathPlaceHomePostofficeEn + "/" + response?.InformationDeath?.deathPlaceHomePostofficeMl ||
            "CR_NOT_RECORDED",
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.InformationDeath?.DeathPlaceHomePincode || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.InformationDeath?.DeathPlaceHomeLocalityEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.InformationDeath?.DeathPlaceHomeLocalityMl || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeStreetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeStreetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.InformationDeath?.DeathPlaceHomeHoueNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.InformationDeath?.DeathPlaceHomeHoueNameMl || "CR_NOT_RECORDED" },
      ],
    };
    const deathPlaceVEHICLEDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        //{ title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_TYPE", value: response?.InformationDeath?.vehicleType || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_REGISTRATION_NO", value: response?.InformationDeath?.VehicleNumber || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_PLACE_FIRST_HALT_EN", value: response?.InformationDeath?.VehicleFirstHaltEn + "/" + response?.InformationDeath?.VehicleFirstHaltMl || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_EN", value: response?.InformationDeath?.VehicleFromplaceEn || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_EN", value: response?.InformationDeath?.VehicleToPlaceEn || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_FROM_ML", value: response?.InformationDeath?.VehicleFromplaceMl || "CR_NOT_RECORDED" },
        { title: "CR_VEHICLE_TO_ML", value: response?.InformationDeath?.VehicleToPlaceMl || "CR_NOT_RECORDED" },
        { title: "CR_ADMITTED_HOSPITAL_EN", value: response?.InformationDeath?.VehicleHospitalEn || "CR_NOT_RECORDED" },
      ],
    };
    const deathPlacePUBLICPLACESDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        // { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceEn + " / " + response?.publicPlaceMl || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.DeathPlaceWardId + " / " + response?.DeathPlaceWardIdMl || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.DeathPlaceLocalityEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.DeathPlaceLocalityMl || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.DeathPlaceStreetEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.DeathPlaceStreetMl || "CR_NOT_RECORDED" },
        { title: "CR_DESCRIPTION", value: response?.GeneralRemarks || "CR_NOT_RECORDED" },
      ],
    };
    const deathPlaceOUTSIDEJURISDICTIONDetails = {
      title: "CR_DEATH_PLACE_DETAILS",
      asSectionHeader: true,
      values: [
        //  { title: "CR_PLACE_OF_DEATH", value: response?.InformationDeath?.DeathPlace ? response?.InformationDeath?.DeathPlace : "CR_NOT_RECORDED" },
        { title: "CR_PUBLIC_PLACE_TYPE", value: response?.publicPlaceTypeEn + " / " + response?.publicPlaceTypeMl || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_WARD", value: response?.wardNameEn + " / " + response?.wardNameMl || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.localityNameEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.localityNameMl || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.streetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.streetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_DESCRIPTION", value: response?.publicPlaceDecpEn || "CR_NOT_RECORDED" },
      ],
    };

    const AddressBirthDetailsPresentInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.presentaddressCountryNameEn +
              " / " +
              (response?.AddressBirthDetails?.presentaddressCountryNameMl != null
                ? response?.AddressBirthDetails?.presentaddressCountryNameMl
                : "") || "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_STATE",
          value:
            response?.AddressBirthDetails.presentaddressStateNameEn + " / " + response?.AddressBirthDetails.presentaddressStateNameMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaDistrictEn + " / " + response?.AddressBirthDetails.presentInsideKeralaDistrictMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_TALUK",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaTalukEn + " / " + response?.AddressBirthDetails.presentInsideKeralaTalukMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_VILLAGE",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaVillageEn + " / " + response?.AddressBirthDetails.presentInsideKeralaVillageMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaLBNameEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaLBNameMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_WARD",
          value: response?.AddressBirthDetails?.presentWardNoEn + " / " + response?.AddressBirthDetails?.presentWardNoMl || "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.presentInsideKeralaPostOfficeEn + " / " + response?.AddressBirthDetails?.presentInsideKeralaPostOfficeMl ||
            "CR_NOT_RECORDED",
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaStreetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameMl || "CR_NOT_RECORDED" },
        //Permanent Address
        {
          title: "CS_COMMON_COUNTRY",
          value:
            response?.AddressBirthDetails.permanentAddrCountryNameEn +
              " / " +
              (response?.AddressBirthDetails?.permanentAddrCountryNameMl != null ? response?.AddressBirthDetails?.permanentAddrCountryNameMl : "") ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_STATE",
          value:
            response?.AddressBirthDetails.permtaddressStateNameEn + " / " + response?.AddressBirthDetails.permtaddressStateNameMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_DISTRICT",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrDistrictEn + " / " + response?.AddressBirthDetails.permntInKeralaAdrDistrictMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_TALUK",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrTalukEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrTalukMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_VILLAGE",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrVillageEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrVillageMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_LB_NAME",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrLBName + " / " + response?.AddressBirthDetails?.permntInKeralaAdrLBNameMl ||
            "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_WARD",
          value: response?.AddressBirthDetails?.prmttWardNoEn + " / " + response?.AddressBirthDetails?.prmttWardNoMl || "CR_NOT_RECORDED",
        },
        {
          title: "CS_COMMON_POST_OFFICE",
          value:
            response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeEn + " / " + response?.AddressBirthDetails?.permntInKeralaAdrPostOfficeMl ||
            "CR_NOT_RECORDED",
        },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails.permntInKeralaAdrPincode || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl || "CR_NOT_RECORDED" },
      ],
    };
    const AddressBirthDetailsPresentOutsideKeralaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "CR_NOT_RECORDED" },
        {
          title: "CS_COMMON_STATE",
          value:
            response?.AddressBirthDetails?.presentaddressStateNameEn + "/" + response?.AddressBirthDetails?.presentaddressStateNameMl ||
            "CR_NOT_RECORDED",
        },

        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.presentOutsideKeralaDistrict || "CR_NOT_RECORDED" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.presentOutsideKeralaTaluk || "CR_NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaVillage || "CR_NOT_RECORDED" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.presentOutsideKeralaPincode || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.presentOutsideKeralaLocalityNameEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl || "CR_NOT_RECORDED" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.permanentAddrCountryNameEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_STATE", value: response?.AddressBirthDetails?.permtaddressStateNameEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_DISTRICT", value: response?.AddressBirthDetails?.permntOutsideKeralaDistrict || "CR_NOT_RECORDED" },
        { title: "CR_TALUK_TEHSIL", value: response?.AddressBirthDetails?.permntOutsideKeralaTaluk || "CR_NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaVillage || "CR_NOT_RECORDED" },
        { title: "CR_CITY_VILLAGE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_POST_OFFICE", value: response?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn || "CR_NOT_RECORDED" },
        { title: "CS_COMMON_PIN_CODE", value: response?.AddressBirthDetails?.permntOutsideKeralaPincode || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_EN", value: response?.AddressBirthDetails.permntOutsideKeralaLocalityNameEn || "CR_NOT_RECORDED" },
        { title: "CR_LOCALITY_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl || NA },
        { title: "CR_STREET_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STREET_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_EN", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn || "CR_NOT_RECORDED" },
        { title: "CR_HOUSE_NAME_ML", value: response?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl || "CR_NOT_RECORDED" },
      ],
    };
    // } else if (response?.AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA") {

    const AddressBirthDetailsPresentOutsideIndiaInfo = {
      title: "CR_ADDRESS_DETAILS",
      values: [
        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.permanentOutSideCountryNameEn || "CR_NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceEn || "CR_NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaProvinceMl || "CR_NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsVillage || "CR_NOT_RECORDED" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown || "CR_NOT_RECORDED" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.presentOutSideIndiaPostCode || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.presentOutSideIndiaAdressEn || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressEnB || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.presentOutSideIndiaAdressMlB || "CR_NOT_RECORDED" },

        { title: "CS_COMMON_COUNTRY", value: response?.AddressBirthDetails.presentaddressCountry || "CR_NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceEn || "CR_NOT_RECORDED" },
        { title: "CR_STATE_REGION_PROVINCE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaprovinceMl || "CR_NOT_RECORDED" },
        { title: "CR_TOWN_VILLAGE_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaVillage || "CR_NOT_RECORDED" },
        { title: "CR_CITY_TOWN_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaCityTown || "CR_NOT_RECORDED" },
        { title: "CR_ZIP_CODE", value: response?.AddressBirthDetails?.permanentOutsideIndiaPostCode || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_EN", value: response?.AddressBirthDetails.permntOutsideIndiaLineoneEn || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_ONE_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLineoneMl || NA },
        { title: "CR_ADDRES_LINE_TWO_EN", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn || "CR_NOT_RECORDED" },
        { title: "CR_ADDRES_LINE_TWO_ML", value: response?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl || "CR_NOT_RECORDED" },
      ],
    };

    // const AddressBirthDetails = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [

    const FamilyInformationDeath = {
      title: "CR_FAMILY_DETAILS",
      values: [
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInformationDeath?.SpouseNameEn
            ? response?.FamilyInformationDeath?.SpouseNameEn
            : "CR_NOT_RECORDED" + " / " + response?.FamilyInformationDeath?.SpouseNameML
            ? response?.FamilyInformationDeath?.SpouseNameML
            : "CR_NOT_RECORDED",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.SpouseAadhaar || "CR_NOT_RECORDED" },
        { title: "CR_SPOUSE_AGE", value: response?.FamilyInformationDeath?.spouseAge || "NA" },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.FamilyInformationDeath?.FatherNameEn + " / " + response?.FamilyInformationDeath?.FatherNameMl || "CR_NOT_RECORDED",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.FatherAadharNo || "CR_NOT_RECORDED" },
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.FamilyInformationDeath?.MotherNameEn + " / " + response?.FamilyInformationDeath?.MotherNameMl || "CR_NOT_RECORDED",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.MotherAadharNo || "CR_NOT_RECORDED" },
        { title: "CR_FAMILY_MOBILE_NO", value: response?.FamilyInformationDeath?.FamilyMobileNo || "CR_NOT_RECORDED" },
        { title: "CR_EMAIL_ID", value: response?.FamilyInformationDeath?.FamilyEmailId || "CR_NOT_RECORDED" },
        // {
        //   title: "PDF_PLACE_OF_DEATH",
        //   value:
        //     response?.InformationDeath?.DeathPlaceHospitalNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
        //       "/" +
        //       response?.InformationDeath?.DeathPlaceInstitutionNameMl || "CR_NOT_RECORDED",
        // },
      ],
    };

    const statisticalInfo = {
      title: "CR_STATSTICAL_INFORMATION_HEADER",
      values: [
        {
          title: "CR_MEDICAL_ATTENTION_DEATH",
          value: response?.StatisticalInfo?.medicalAttentionTypeEn
            ? response?.StatisticalInfo?.medicalAttentionTypeEn
            : "CR_NOT_RECORDED" + "/" + response?.StatisticalInfo?.medicalAttentionTypeMl
            ? response?.StatisticalInfo?.medicalAttentionTypeMl
            : "രേഖപ്പെടുത്തിയിട്ടില്ല",
        },
        { title: "CR_AUTOPSY_PERFORM", value: response?.StatisticalInfo?.IsAutopsyPerformed || "CR_NOT_RECORDED" },
        {
          title: "CR_MANNER_OF_DEATH",
          value: response?.StatisticalInfo?.mannerOfDeathEn
            ? response?.StatisticalInfo?.mannerOfDeathEn
            : "CR_NOT_RECORDED" + "/" + response?.StatisticalInfo?.mannerOfDeathMl
            ? response?.StatisticalInfo?.mannerOfDeathMl
            : "CR_NOT_RECORDED",
        },
        { title: "CR_CAUSE_OF_DEATH", value: response?.StatisticalInfo?.DeathCauseSub || "CR_NOT_RECORDED" },
        { title: "CR_CAUSE_DEATH_MEDICALLY_CERTIFIED", value: response?.StatisticalInfo?.DeathMedicallyCertified || "CR_NOT_RECORDED" },
        {
          title: "CR_ACTUAL_CAUSE_OF_DEATH_MAIN",
          value:
            (response?.StatisticalInfo?.DeathCauseMain || "CR_NOT_RECORDED") +
            " / " +
            (response?.StatisticalInfo?.deathCauseMainMl || "CR_NOT_RECORDED"),
        },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseMainCustom || "CR_NOT_RECORDED" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseMainInterval || "CR_NOT_RECORDED" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseMainTimeUnit || "CR_NOT_RECORDED" },
        {
          title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_A",
          value: response?.StatisticalInfo?.deathCauseSubEn + "/" + response?.statisticalInfo?.deathCauseSubMl || "CR_NOT_RECORDED",
        },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom || "CR_NOT_RECORDED" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval || "CR_NOT_RECORDED" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit || "CR_NOT_RECORDED" },
        {
          title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_B",
          value: response?.StatisticalInfo?.deathCauseSub2En + "/" + response?.statisticalInfo?.deathCauseSub2Ml || "CR_NOT_RECORDED",
        },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom2 || "CR_NOT_RECORDED" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval2 || "CR_NOT_RECORDED" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit2 || "CR_NOT_RECORDED" },
        { title: "CR_DEATH_CAUASE_OTHER", value: response?.StatisticalInfo?.DeathCauseSub2 || "CR_NOT_RECORDED" },
        { title: "CR_HABITUALLY_SMOKE", value: response?.StatisticalInfo?.SmokingType || "CR_NOT_RECORDED" },
        { title: "CR_HABITUALLY_CHEW_TOBACCO", value: response?.StatisticalInfo?.TobaccoType || "CR_NOT_RECORDED" },
        { title: "CR_HABITUALLY_DRINK_ALCOHOL", value: response?.StatisticalInfo?.AlcoholType || "CR_NOT_RECORDED" },

        //{ title: "CR_STATSTICAL_DEATH_OCCUPATION", value: response?.statisticalInfo?.occupation || "CR_NOT_RECORDED" },
      ],
    };
    const InitiatorDetails = {
      title: "CR_INITIATOR_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "CR_RELATION", value: response?.Initiator?.InitiatorRelation || "CR_NOT_RECORDED" },
        { title: "PDF_INITIATOR_NAME", value: response?.Initiator?.InitiatorName || "CR_NOT_RECORDED" },
        { title: "PDF_INITIATOR_AADHAR", value: response?.Initiator?.InitiatorAadhaar || "CR_NOT_RECORDED" },
        { title: "PDF_INITIATOR_MOBILE_NO", value: response?.Initiator?.InitiatorMobile || "CR_NOT_RECORDED" },
        { title: "PDF_INITIATOR_DESIGNATION", value: response?.Initiator?.initiatorDesi || "CR_NOT_RECORDED" },
        { title: "PDF_INITIATOR_ADDRESS", value: response?.Initiator?.InitiatorAddress || "CR_NOT_RECORDED" },
      ],
    };
    const InformarHospitalInstitution = {
      title: "CR_INFORMANT_DETAILS",
      // asSectionHeader: true,
      values: [
        { title: "PDF_BIRTH_INFORMANT_NAME", value: response?.InformantDetails?.infomantFirstNameEn || "CR_NOT_RECORDED" },
        { title: "PDF_INFORMER_AADHAR", value: response?.InformantDetails?.infomantAadhar || "CR_NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_MOBILE", value: response?.InformantDetails?.infomantMobile || "CR_NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_DESI", value: response?.InformantDetails?.informerDesi || "CR_NOT_RECORDED" },
        { title: "PDF_BIRTH_INFORMANT_ADDRESS", value: response?.InformantDetails?.informerAddress || "CR_NOT_RECORDED" },
      ],
    };
    response && employeeResponse.push(Deathdetails);
    response && employeeResponse.push(InformationDeath);
    if (response?.InformationDeath?.DeathPlace === "HOSPITAL") {
      response && employeeResponse.push(deathPlaceHospDetails);
    } else if (response?.InformationDeath?.DeathPlace === "INSTITUTION") {
      response && employeeResponse.push(deathPlaceINSTITUTIONDetails);
    } else if (response?.InformationDeath?.DeathPlace === "HOME") {
      response && employeeResponse.push(deathPlaceHOMEDetails);
    } else if (response?.InformationDeath?.DeathPlace === "VEHICLE") {
      response && employeeResponse.push(deathPlaceVEHICLEDetails);
    } else if (response?.InformationDeath?.DeathPlace === "PUBLIC_PLACES") {
      response && employeeResponse.push(deathPlacePUBLICPLACESDetails);
    }

    // response && employeeResponse.push(parentInfo);
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
