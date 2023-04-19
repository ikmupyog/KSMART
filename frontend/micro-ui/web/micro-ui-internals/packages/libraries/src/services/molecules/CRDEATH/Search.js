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
    const Deathdetails = {
      title: "CR_DEATH_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const InformationDeath = {
      title: "CR_DEATH_INFORMATION",
      asSectionHeader: true,
      values: [
        // {
        //   title: "PDF_DECEASED_NAME",
        //   value:
        //     response?.InformationDeath?.DeceasedFirstNameEn
        //     // +

        //     //   response?.InformationDeath?.DeceasedMiddleNameEn +

        //     //   response?.InformationDeath?.DeceasedLastNameEn +
        //     //   " / " +
        //     //   response?.InformationDeath?.DeceasedFirstNameMl +
        //     //   " " +
        //     //   response?.InformationDeath?.DeceasedMiddleNameMl +
        //     //   " " +
        //     //   response?.InformationDeath?.DeceasedLastNameMl || "NA",
        // },

        // { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || "NA" },
        // {
        //   title: "PDF_CR_DEATH_OF_DATE",
        //   value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "NA",
        // },
        // {
        //   title: "CR_ADDRESS",
        //   value:
        //   response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn + "," +
        //     response?.AddressBirthDetails?.presentInsideKeralaStreetNameEn + "," +
        //       response?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn
        //        || "NA",
        // },
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.InformationDeath?.DeathACKNo || "NA" },
        {
          title: "PDF_CR_DEATH_OF_DATE",
          value: response?.InformationDeath?.DateOfDeath ? convertEpochToDate(response?.InformationDeath?.DateOfDeath) : "NA",
        },

        {
          title: "PDF_CR_PLACE_OF_DEATH",
          value:
            response?.InformationDeath?.DeathPlaceHospitalNameEn +
              "/" +
              response?.InformationDeath?.DeathPlaceHospitalNameMl?.response?.InformationDeath?.DeathPlaceInstitutionNameEn +
              "/" +
              response?.InformationDeath?.DeathPlaceInstitutionNameMl || "NA",
        },

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
        { title: "CR_AADHAR", value: response?.InformationDeath?.DeceasedAadharNumber || "NA" },
        { title: "CR_AGE", value: response?.InformationDeath?.Age + response?.InformationDeath?.AgeUnit || "NA" },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.InformationDeath?.DeceasedGender || "NA" },

        { title: "CR_NATIONALITY", value: response?.InformationDeath?.Nationality || "NA" },

        { title: "CS_COMMON_RELIGION", value: response?.InformationDeath?.Religion || "NA" },
        { title: "CR_PROFESSIONAL", value: response?.InformationDeath?.Occupation || "NA" },

        // }),
      ],
    };

    const AddressBirthDetails = {
      title: "CR_ADDRESS_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_PRESENT_ADDRESS",
          value:
            response?.AddressBirthDetails.presentInsideKeralaHouseNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaStreetNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaPostOffice.name +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaPincode +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaDistrict +
            " , " +
            response?.AddressBirthDetails.presentaddressStateName +
            " , " +
            response?.AddressBirthDetails.presentaddressCountry,
        },
        {
          value:
            response?.AddressBirthDetails.presentInsideKeralaHouseNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaStreetNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaPostOffice +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaPincode +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaDistrict +
              " , " +
              response?.AddressBirthDetails.presentaddressStateName +
              " , " +
              response?.AddressBirthDetails.presentaddressCountry || "CR_NOT_RECORDED",
        },
        { title: "CR_PROFESSIONAL", value: response?.AddressBirthDetails?.presentInsideKeralaHouseNameEn || "NA" },
      ],
    };
    // const AddressBirthDetails = {
    //   title: "CR_ADDRESS_INFORMATION_HEADER",
    //   values: [

    //     { title: "PDF_BIRTH_PRESENT_ADDRESS",  value: response?.AddressBirthDetails.presentInsideKeralaHouseNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameEn  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice.name + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode
    //     + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict.name     + " , " +  response?.AddressBirthDetails.presentaddressStateName.name + " , " +    response?.AddressBirthDetails.presentaddressCountry.name },

    //     {  value:response?.AddressBirthDetails.presentInsideKeralaHouseNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaStreetNameMl  + " , " + response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl + " , " + response?.AddressBirthDetails.presentInsideKeralaPostOffice.namelocal + " , " + response?.AddressBirthDetails.presentInsideKeralaPincode   + " , " +  response?.AddressBirthDetails.presentInsideKeralaDistrict.namelocal     + " , " +  response?.AddressBirthDetails.presentaddressStateName.namelocal  + " , " +    response?.AddressBirthDetails.presentaddressCountry.namelocal   || "CR_NOT_RECORDED"},

    //       { title: "PDF_BIRTH_PERMANENT_ADDRESS",  value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn + " , " + response?.AddressBirthDetails.permntInKeralaAdrPostOffice.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
    //       + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.name     + " , " +  response?.AddressBirthDetails.permtaddressStateName.name + " , " +    response?.AddressBirthDetails.permtaddressCountry.name },

    //       {value: response?.AddressBirthDetails.permntInKeralaAdrHouseNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrStreetNameMl  + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl + " , " + response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl.name + " , " + response?.AddressBirthDetails.permntInKeralaAdrPincode
    //   + " , " +  response?.AddressBirthDetails.permntInKeralaAdrDistrict.namelocal     + " , " +  response?.AddressBirthDetails.permtaddressStateName.namelocal + " , " +    response?.AddressBirthDetails.permtaddressCountry.namelocal },
    //   ]
    //   }
    const FamilyInformationDeath = {
      title: "CR_FAMILY_DETAILS",
      values: [
        {
          title: "PDF_CR_NAME_WIFE_HUSBAND",
          value: response?.FamilyInformationDeath?.SpouseNameEn + " / " + response?.FamilyInformationDeath?.SpouseNameML || "NA ",
        },
        { title: "CR_AADHAR", value: response?.FamilyInformationDeath?.SpouseAadhaar || "NA" },
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
        {
          title: "PDF_PLACE_OF_DEATH",
          value: response?.InformationDeath?.DeathPlaceHospitalNameEn + "/" + response?.InformationDeath?.DeathPlaceHospitalNameMl || "NA",
        },
      ],
    };

    const statisticalInfo = {
      title: "CR_DEATH_STATSTICAL_INFORMATION_HEADER",
      values: [
        
        { title: "CR_AUTOPSY_PERFORM", value: response?.StatisticalInfo?.IsAutopsyPerformed || "NA" },
        { title: "CR_MANNER_OF_DEATH", value: response?.StatisticalInfo?.MannerOfDeath || "NA" },
        { title: "CR_CAUSE_OF_DEATH", value: response?.StatisticalInfo?.DeathCauseSub || "NA" },
        { title: "CR_CAUSE_DEATH_MEDICALLY_CERTIFIED", value: response?.StatisticalInfo?.DeathMedicallyCertified || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_MAIN", value: response?.StatisticalInfo?.DeathCauseMain || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseMainCustom || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseMainInterval || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseMainTimeUnit || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_A", value: response?.StatisticalInfo?.DeathCauseSub || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB_B", value: response?.StatisticalInfo?.DeathCauseSub2 || "NA" },
        { title: "CR_ACTUAL_CAUSE_OF_DEATH_SUB", value: response?.StatisticalInfo?.DeathCauseSubCustom2 || "NA" },
        { title: "CR_APROXIMATE", value: response?.StatisticalInfo?.DeathCauseSubInterval2 || "NA" },
        { title: "CR_TIME_UNIT", value: response?.StatisticalInfo?.DeathCauseSubTimeUnit2 || "NA" },
        { title: "CR_DEATH_CAUASE_OTHER", value: response?.StatisticalInfo?.DeathCauseSub2 || "NA" },
        { title: "CR_HABITUALLY_SMOKE", value: response?.StatisticalInfo?.SmokingType || "NA" },
        { title: "CR_HABITUALLY_CHEW_TOBACCO", value: response?.StatisticalInfo?.TobaccoType || "NA" },
        { title: "CR_HABITUALLY_DRINK_ALCOHOL", value: response?.StatisticalInfo?.AlcoholType || "NA" },


        { title: "CR_STATSTICAL_DEATH_OCCUPATION", value: response?.statisticalInfo?.occupation || "NA" },

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
    const permanentAddress = {
      title: "CR_DEATH_PERMANENT_ADDRESS_INFORMATION_HEADER",
      values: [
        { title: "CR_DEATH_PERM_HOUSE_NO_LABEL", value: response?.addressInfo?.permanentAddress.houseNo || "NA" },
        { title: "CR_DEATH_PERM_HOUSE_NAME_LABEL", value: response?.addressInfo?.permanentAddress.houeNameEn || "NA" },
        { title: "CR_DEATH_PERM_HOUSE_LOCALITY_LABEL", value: response?.addressInfo?.permanentAddress.localityEn || "NA" },
        { title: "CR_DEATH_PERM_HOUSE_CITY_LABEL", value: response?.addressInfo?.permanentAddress.cityEn || "NA" },
      ],
    };

    response && employeeResponse.push(Deathdetails);
    response && employeeResponse.push(InformationDeath);
    response && employeeResponse.push(AddressBirthDetails);
    response && employeeResponse.push(FamilyInformationDeath);
    // response && employeeResponse.push(statisticalInfo);

    // response && employeeResponse.push(DeathPlaceHome);
    //  response && employeeResponse.push(FamilyInformationDeath);
    response && employeeResponse.push(statisticalInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
