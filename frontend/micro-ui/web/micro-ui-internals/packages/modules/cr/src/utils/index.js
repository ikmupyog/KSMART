import get from "lodash/get";
import set from "lodash/set";

/*   method to check not null  if not returns false*/
export const checkForNotNull = (value = "") => {
  return value && value != null && value != undefined && value != "" ? true : false;
};

export const convertDotValues = (value = "") => {
  return (
    (checkForNotNull(value) && ((value.replaceAll && value.replaceAll(".", "_")) || (value.replace && stringReplaceAll(value, ".", "_")))) || "NA"
  );
};

export const sortDropdownNames = (options, optionkey, locilizationkey) => {
  return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
};

export const convertToLocale = (value = "", key = "") => {
  let convertedValue = convertDotValues(value);
  if (convertedValue == "NA") {
    return "PT_NA";
  }
  return `${key}_${convertedValue}`;
};

export const getPropertyTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPTYPE");
};

export const getPropertyUsageTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPUSGTYPE");
};

export const getPropertySubUsageTypeLocale = (value = "") => {
  return convertToLocale(value, "COMMON_PROPSUBUSGTYPE");
};
export const getPropertyOccupancyTypeLocale = (value = "") => {
  return convertToLocale(value, "PROPERTYTAX_OCCUPANCYTYPE");
};

export const getMohallaLocale = (value = "", tenantId = "") => {
  let convertedValue = convertDotValues(tenantId);
  if (convertedValue == "NA" || !checkForNotNull(value)) {
    return "PT_NA";
  }
  convertedValue = convertedValue.toUpperCase();
  return convertToLocale(value, `${convertedValue}_REVENUE`);
};

export const getCityLocale = (value = "") => {
  let convertedValue = convertDotValues(value);
  if (convertedValue == "NA" || !checkForNotNull(value)) {
    return "PT_NA";
  }
  convertedValue = convertedValue.toUpperCase();
  return convertToLocale(convertedValue, `TENANT_TENANTS`);
};

export const getPropertyOwnerTypeLocale = (value = "") => {
  return convertToLocale(value, "PROPERTYTAX_OWNERTYPE");
};

export const getFixedFilename = (filename = "", size = 5) => {
  if (filename.length <= size) {
    return filename;
  }
  return `${filename.substr(0, size)}...`;
};

export const shouldHideBackButton = (config = []) => {
  return config.filter((key) => window.location.href.includes(key.screenPath)).length > 0 ? true : false;
};

/*   style to keep the body height fixed across screens */
export const cardBodyStyle = {
  maxHeight: "calc(100vh - 20em)",
  overflowY: "auto",
};

export const propertyCardBodyStyle = {
  maxHeight: "calc(100vh - 10em)",
  overflowY: "auto",
};

export const getTransaltedLocality = (data) => {
  let localityVariable = data?.tenantId?.replaceAll(".", "_") || stringReplaceAll(data?.tenantId, ".", "_");
  return localityVariable.toUpperCase() + "_REVENUE_" + data?.locality?.code;
};

export const setAddressDetails = (data) => {
  let { address } = data;

  let propAddress = {
    ...address,
    pincode: address?.pincode,
    landmark: address?.landmark,
    city: address?.city?.name,
    doorNo: address?.doorNo,
    street: address?.street,
    locality: {
      code: address?.locality?.code || "NA",
      area: address?.locality?.name,
    },
  };

  data.address = propAddress;
  return data;
};

export const getownerarray = (data) => {
  const ownersData = data?.owners?.owners;
  const res = ownersData?.map((ob) => ({
    mobileNumber: ob.mobilenumber,
    name: ob.name,
    fatherOrHusbandName: ob?.fatherOrHusbandName,
    relationship: ob?.relationship?.code,
    dob: null,
    gender: ob?.gender?.code,
    permanentAddress: data?.owners?.permanentAddress,
    emailId: ob?.emailId,
  }));
  return res;
};

export const gettradeownerarray = (data) => {
  let tradeownerarray = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  data.tradeLicenseDetail.owners.map((oldowner) => {
    data?.owners?.owners.map((newowner) => {
      if (oldowner.id === newowner.id) {
        if (
          oldowner.name !== newowner.name ||
          oldowner.gender !== newowner?.gender?.code ||
          oldowner.mobileNumber !== newowner.mobilenumber ||
          oldowner.permanentAddress !== data?.owners?.permanentAddress ||
          oldowner.relationship !== newowner.relationship?.code ||
          oldowner.fatherOrHusbandName !== newowner.fatherOrHusbandName
        ) {
          if (oldowner.name !== newowner.name) {
            oldowner.name = newowner.name;
          }
          if (oldowner.gender !== newowner.gender?.code) {
            oldowner.gender = newowner.gender?.code;
          }
          if (oldowner.mobileNumber !== newowner.mobilenumber) {
            oldowner.mobileNumber = newowner.mobilenumber;
          }
          if (oldowner.permanentAddress !== data?.owners?.permanentAddress) {
            oldowner.permanentAddress = data?.owners?.permanentAddress;
          }
          if (oldowner.relationship !== newowner.relationship?.code) {
            oldowner.relationship = newowner.relationship?.code;
          }
          if (oldowner.fatherOrHusbandName !== newowner.fatherOrHusbandName) {
            oldowner.fatherOrHusbandName = newowner.fatherOrHusbandName;
          }
          let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
          if (!found) tradeownerarray.push(oldowner);
        } else {
          let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
          if (!found) tradeownerarray.push(oldowner);
        }
      }
    });
  });
  !isEditRenew &&
    !window.location.href.includes("edit-application") &&
    data.tradeLicenseDetail.owners.map((oldowner) => {
      let found = tradeownerarray.length > 0 ? tradeownerarray.some((el) => el.id === oldowner.id) : false;
      if (!found) tradeownerarray.push({ ...oldowner, active: false });
    });
  data?.owners?.owners.map((ob) => {
    if (!ob.id) {
      tradeownerarray.push({
        mobileNumber: ob.mobilenumber,
        name: ob.name,
        fatherOrHusbandName: "",
        relationship: "",
        dob: null,
        gender: ob?.gender?.code || null,
        permanentAddress: data?.owners?.permanentAddress,
        ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && { uuid: data?.tradeLicenseDetail?.owners?.[0]?.uuid }),
      });
    }
  });
  return tradeownerarray;
};

export const gettradeunits = (data) => {
  let tradeunits = [];
  data?.TradeDetails?.units.map((ob) => {
    tradeunits.push({ tradeType: ob.tradesubtype.code, uom: ob.unit, uomValue: ob.uom });
  });
  return tradeunits;
};

export const gettradeupdateunits = (data) => {
  let TLunits = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  data.tradeLicenseDetail.tradeUnits.map((oldunit) => {
    data.TradeDetails.units.map((newunit) => {
      if (oldunit.id === newunit.id) {
        if (oldunit.tradeType !== newunit.tradesubtype.code) {
          oldunit.tradeType = newunit.tradesubtype.code;
          TLunits.push(oldunit);
        } else {
          let found = TLunits.length > 0 ? TLunits.some((el) => el.id === oldunit.id) : false;
          if (!found) TLunits.push(oldunit);
        }
      } else {
        if (!isEditRenew) {
          let found = TLunits.length > 0 ? TLunits.some((el) => el.id === oldunit.id) : false;
          if (!found) TLunits.push({ ...oldunit, active: false });
        }
      }
    });
  });
  data.TradeDetails.units.map((ob) => {
    if (!ob.id) {
      TLunits.push({ tradeType: ob.tradesubtype.code, uom: ob.unit, uomValue: ob.uom });
    }
  });
  return TLunits;
};

export const getaccessories = (data) => {
  let tradeaccessories = [];
  data?.TradeDetails?.accessories.map((ob) => {
    tradeaccessories.push({ uom: ob.unit, accessoryCategory: ob.accessory.code, uomValue: ob.uom ? ob.uom : null, count: ob.accessorycount });
  });
  return tradeaccessories;
};

export const gettradeupdateaccessories = (data) => {
  let TLaccessories = [];
  const isEditRenew = window.location.href.includes("renew-trade");
  if (data?.TradeDetails?.isAccessories?.i18nKey.includes("NO")) {
    data?.tradeLicenseDetail?.accessories &&
      data.tradeLicenseDetail.accessories.map((oldunit) => {
        TLaccessories.push({ ...oldunit, active: false });
      });
  } else {
    data?.tradeLicenseDetail?.accessories &&
      data.tradeLicenseDetail.accessories.map((oldunit) => {
        data.TradeDetails.accessories.map((newunit) => {
          if (oldunit.id === newunit.id) {
            if (oldunit.accessoryCategory !== newunit.accessory.code) {
              oldunit.accessoryCategory = newunit.accessory.code;
              TLaccessories.push(oldunit);
            } else {
              let found = TLaccessories.length > 0 ? TLaccessories.some((el) => el.id === oldunit.id) : false;
              if (!found) TLaccessories.push(oldunit);
            }
          } else {
            if (!isEditRenew) {
              let found = TLaccessories.length > 0 ? TLaccessories.some((el) => el.id === oldunit.id) : false;
              if (!found) TLaccessories.push({ ...oldunit, active: false });
            }
          }
        });
      });
    data.TradeDetails.accessories.map((ob) => {
      if (!ob.id) {
        TLaccessories.push({ uom: ob.unit, accessoryCategory: ob.accessory.code, uomValue: ob.uom ? ob.uom : null, count: ob.accessorycount });
      }
    });
  }
  return TLaccessories;
};

export const convertToBirthRegistration = (data = {}) => {
  const formdata = {
    BirthDetails: [
      {
        dateofreport: null, //Not needed
        dateofbirth: Date.parse(data?.ChildDetails?.ChildDOB),
        timeofbirth: 1515,
        // Long.parse(data?.ChildDetails?.tripStartTime),
        am_pm: "am",
        birthdtlid: null, //Not needed
        firstname_en: data?.ChildDetails?.ChildFirstNameEn,
        firstname_ml: data?.ChildDetails?.ChildFirstNameMl,
        middlename_en: data?.ChildDetails?.ChildMiddleNameEn,
        middlename_ml: data?.ChildDetails?.ChildMiddleNameMl,
        lastname_en: data?.ChildDetails?.ChildLastNameEn,
        lastname_ml: data?.ChildDetails?.ChildLastNameMl,
        tenantid: "kl.cochin",
        gender: data?.ChildDetails?.Gender.code,
        remarks_en: null, //Stastical Info Description
        remarks_ml: null, //Not needed
        applicationtype: "NEW",
        businessservice: "birth-services",
        aadharno: data?.ChildDetails?.ChildAadharNo,
        esign_user_code: "esign_user_code",
        esign_user_desig_code: "esign_user_desig_code",
        fm_fileno: "",
        file_date: 21092022,
        applicationno: "APP1",
        registrationno: "",
        registration_date: "",
        workflowcode: "NewBirth",
        action: "INITIATE",
        businessService: 89,
        comment: "Test",
        assignee: [],
        counter: 0,
        birthPlace: {
          birthdtlid: "birthdtlid",
          placeofbirthid: data?.BirthPlace?.BirthPlace.code,
          hospitalid: data?.HospitalDetails?.HospitalName.code,
          vehicletypeid: "vehicletypeid",
          vehicle_registration_no: "vehicle_registration_no",
          vehicle_from_en: "vehicle_from_en",
          vehicle_to_en: "vehicle_to_en",
          vehicle_from_ml: "vehicle_from_ml",
          vehicle_to_ml: "vehicle_to_ml",
          vehicle_other_en: "vehicle_other_en",
          vehicle_other_ml: "vehicle_other_ml",
          vehicle_admit_hospital_en: "vehicle_admit_hospital_en",
          vehicle_admit_hospital_ml: "vehicle_admit_hospital_ml",
          public_place_id: "public_place_id",
          ho_householder_en: "ho_householder_en",
          ho_householder_ml: "ho_householder_ml",
          ho_buildingno: "ho_buildingno",
          ho_res_asso_no: "ho_res_asso_no",
          ho_houseno: "ho_houseno",
          ho_housename_en: "ho_housename_en",
          ho_housename_ml: "ho_housename_ml",
          ho_locality_en: "ho_locality_en",
          ho_locality_ml: "ho_locality_ml",
          ho_villageid: "ho_villageid",
          ho_talukid: "ho_talukid",
          ho_districtid: "ho_districtid",
          ho_city_en: "ho_city_en",
          ho_city_ml: "ho_city_ml",
          ho_stateid: "ho_stateid",
          ho_poid: "ho_poid",
          ho_pinno: "ho_pinno",
          ho_countryid: "ho_countryid",
          ward_id: "ward_id",
          oth_details_en: "oth_details_en",
          oth_details_ml: "oth_details_ml",
          institution_type_id: "institution_type_id",
          institution_id: "institution_id",
          auth_officer_id: data?.HospitalDetails?.SignedOfficerDesignation.code,
          auth_officer_desig_id: data?.HospitalDetails?.SignedOfficerDesignation.code,
          oth_auth_officer_name: data?.HospitalDetails?.SignedOfficerName.hospitalName,
          oth_auth_officer_desig: data?.HospitalDetails?.SignedOfficerDesignation.hospitalName,
          informantsname_en: null,
          informantsname_ml: null,
          informantsaddress_en: null,
          informantsaddress_ml: null,
          informants_mobileno: data?.HospitalDetails?.SignedOfficerMobileNo,
          informants_aadhaar_no: data?.HospitalDetails?.SignedOfficerAadharNo,
        },
        birthFather: {
          firstname_en: data?.FatherInfoDetails?.FatherFirstNameEn,
          firstname_ml: data?.FatherInfoDetails?.FatherFirstNameMl,
          middlename_en: data?.FatherInfoDetails?.FatherMiddleNameEn,
          middlename_ml: data?.FatherInfoDetails?.FatherMiddleNameMl,
          lastname_en: data?.FatherInfoDetails?.FatherLastNameEn,
          lastname_ml: data?.FatherInfoDetails?.FatherLastNameMl,
          aadharno: data?.FatherInfoDetails?.FatherAadhar,
          emailid: data?.FatherInfoDetails?.FatherEmail,
          mobileno: data?.FatherInfoDetails?.FatherMobile,
        },
        birthMother: {
          firstname_en: data?.MotherInfoDetails?.MotherFirstNameEn,
          firstname_ml: data?.MotherInfoDetails?.MotherFirstNameMl,
          middlename_en: data?.MotherInfoDetails?.MotherMiddleNameEn,
          middlename_ml: data?.MotherInfoDetails?.MotherMiddleNameMl,
          lastname_en: data?.MotherInfoDetails?.MotherFirstNameMl,
          lastname_ml: data?.MotherInfoDetails?.MotherLastNameMl,
          aadharno: data?.MotherInfoDetails?.MotherAadhar,
          emailid: data?.MotherInfoDetails?.MotherEmail,
          mobileno: data?.MotherInfoDetails?.MotherMobile,
        },
        birthPermanent: {
          buildingno: data?.AddressDetails?.PermanentBuldingNo,
          houseno: data?.AddressDetails?.PermanentHouseNo,
          res_asso_no: null,
          housename_en: null,
          housename_ml: null,
          locality_en: data?.AddressDetails?.PermanentLocalityNameEn,
          locality_ml: data?.AddressDetails?.PermanentLocalityNameMl,
          city_en: data?.AddressDetails?.PermanentCityNameEn,
          city_ml: data?.AddressDetails?.PermanentCityNameMl,
          villageid: data?.AddressDetails?.PermanentVillage ? data?.AddressDetails?.PermanentVillage.code : null,
          tenantid: "kl.cochin",
          talukid: data?.AddressDetails?.PermanentTaluk ? data?.AddressDetails?.PermanentTaluk.code : null,
          districtid: data?.AddressDetails?.PermanentDistrict ? data?.AddressDetails?.PermanentDistrict.code : null,
          stateid: null,
          poid: data?.AddressDetails?.PermanentPostOffice ? data?.AddressDetails?.PermanentPostOffice.code : null,
          pinno: data?.AddressDetails?.PermanentPincode,
          countryid: null,
          birthdtlid: "birthdtlid",
          same_as_permanent: 1,
        },
        birthPresent: {
          buildingno: data?.AddressDetails?.PresentBuldingNo,
          houseno: data?.AddressDetails?.PresentHouseNo,
          res_asso_no: null,
          housename_en: null,
          housename_ml: null,
          ot_address1_en: "ot_address1_en",
          ot_address1_ml: "ot_address1_ml",
          ot_address2_en: "ot_address2_en",
          ot_address2_ml: "ot_address2_ml",
          locality_en: data?.AddressDetails?.PresentLocalityNameEn,
          locality_ml: data?.AddressDetails?.PresentLocalityNameMl,
          city_en: data?.AddressDetails?.PresentCityNameEn,
          city_ml: data?.AddressDetails?.PresentCityNameMl,
          villageid: data?.AddressDetails?.PresentVillage ? data?.AddressDetails?.PresentVillage.code : null,
          tenantid: "kl.cochin",
          talukid: data?.AddressDetails?.PresentTaluk ? data?.AddressDetails?.PresentTaluk.code : null,
          districtid: data?.AddressDetails?.PresentDistrict ? data?.AddressDetails?.PresentDistrict.code : null,
          stateid: null,
          poid: data?.AddressDetails?.PresentPostOffice ? data?.AddressDetails?.PresentPostOffice.code : null,
          pinno: data?.Address?.PresentPincode,
          countryid: null,
          birthdtlid: "birthdtlid",
        },
        birthStatistical: {
          weight_of_child: 3.5,
          // data?.StatisticalInfoDetails?.BirthWeight,
          height_of_child: 2.5,
          // data?.StatisticalInfoDetails?.BirthHeight,
          duration_of_pregnancy_in_week: data?.StatisticalInfoDetails?.PregnancyDuration
            ? data?.StatisticalInfoDetails?.PregnancyDuration.code
            : null,
          nature_of_medical_attention: data?.StatisticalInfoDetails?.MedicalAttension ? data?.StatisticalInfoDetails?.MedicalAttension.code : null,
          delivery_method: data?.StatisticalInfoDetails?.DeliveryMethod ? data?.StatisticalInfoDetails?.DeliveryMethod.code : null,
          deliverytypeothers_en: null,
          deliverytypeothers_ml: null,
          religionid: data?.StatisticalInfoDetails?.Religion.code,
          father_nationalityid: null,
          father_educationid: data?.FatherInfoDetails?.FatherEducation ? data?.FatherInfoDetails?.FatherEducation.code : null,
          father_education_subid: data?.FatherInfoDetails?.FatherEducationSubject ? data?.FatherInfoDetails?.FatherEducationSubject.code : null,
          father_proffessionid: data?.FatherInfoDetails?.FatherProfession ? data?.FatherInfoDetails?.FatherProfession.code : null,
          mother_educationid: data?.MotherInformation?.MotherEducation ? data?.MotherInformation?.MotherEducation.code : null,
          mother_education_subid: data?.MotherInformation?.MotherEducationSubject ? data?.MotherInformation?.MotherEducationSubject.code : null,
          mother_proffessionid: data?.MotherInformation?.MotherProfession ? data?.MotherInformation?.MotherProfession.code : null,
          mother_nationalityid: data?.MotherInformation?.MotherNationality ? data?.MotherInformation?.MotherNationality.code : null,
          mother_dateofmarriage: "20072011",
          mother_dateofbirth: "20031990",
          mother_age_marriage: null,
          mother_age_delivery: data?.MotherInformation?.MotherAgeDeleivery,
          mother_no_of_birth_given: data?.MotherInformation?.MotherNoOfBirths,
          mother_no_of_children_alive: null,
          mother_maritalstatusid: null,
          mother_res_lbid: data?.MotherInformation?.MotherLBName ? data?.MotherInformation?.MotherLBName.id : null,
          mother_res_lb_code: data?.MotherInformation?.MotherLBName ? data?.MotherInformation?.MotherLBName.code : null,
          mother_res_place_type_id: data?.MotherInformation?.MotherPlaceType ? data?.MotherInformation?.MotherPlaceType.code : null,
          mother_res_lb_type_id: data?.MotherInformation?.LBTypeName ? data?.MotherInformation?.LBTypeName.code : null,
          mother_res_district_id: data?.MotherInformation?.MotherDistrict ? data?.MotherInformation?.MotherDistrict.code : null,
          mother_res_state_id: data?.MotherInformation?.StateName ? data?.MotherInformation?.StateName.code : null,
          mother_res_country_id: data?.MotherInformation?.MotherCountry ? data?.MotherInformation?.MotherCountry.code : null,
          mother_resdnce_addr_type: null,
          mother_resdnce_tenentid: null,
          mother_resdnce_placetype: null,
          mother_resdnce_place_en: null,
          mother_resdnce_place_ml: null,
          mother_resdnce_lbtype: null,
          mother_resdnce_districtid: null,
          mother_resdnce_stateid: null,
          mother_resdnce_countryid: null,
          birthdtlid: "birthdtlid",
        },
      },
    ],
  };

  return formdata;
};

export const convertToTrade = (data = {}) => {
  let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const formdata = {
    Licenses: [
      {
        action: "INITIATE",
        applicationType: "NEW",
        commencementDate: Date.parse(data?.TradeDetails?.CommencementDate),
        financialYear: Financialyear ? Financialyear : "2021-22",
        licenseType: "PERMANENT",
        tenantId: data?.address?.city?.code,
        tradeLicenseDetail: {
          channel: "CITIZEN",
          address: {
            city: !data?.cpt ? data?.address?.city?.code : data?.cpt?.details?.address?.city?.code,
            locality: {
              code: !data?.cpt ? data?.address?.locality?.code : data?.cpt?.details?.address?.locality?.code,
            },
            tenantId: data?.tenantId,
            pincode: !data?.cpt ? data?.address?.pincode : data?.cpt?.details?.address?.pincode,
            doorNo: !data?.cpt ? data?.address?.doorNo : data?.cpt?.details?.address?.doorNo,
            street: !data?.cpt ? data?.address?.street : data?.cpt?.details?.address?.street,
            landmark: !data?.cpt ? data?.address?.landmark : data?.cpt?.details?.address?.landmark,
          },
          applicationDocuments: null,
          accessories: data?.TradeDetails?.accessories ? getaccessories(data) : null,
          owners: getownerarray(data),
          ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && {
            institution: {
              designation: data?.owners?.owners?.[0]?.designation,
              ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
              mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
              instituionName: data?.owners?.owners?.[0]?.institutionName,
              name: data?.owners?.owners?.[0]?.name,
            },
          }),
          // ...data?.owners.owners?.[0]?.designation && data?.owners.owners?.[0]?.designation !== "" ? { institution: {
          //   designation: data?.owners.owners?.[0]?.designation
          // }} : {},
          structureType:
            data?.TradeDetails?.StructureType?.code !== "IMMOVABLE" ? data?.TradeDetails?.VehicleType?.code : data?.TradeDetails?.BuildingType?.code,
          subOwnerShipCategory: data?.owners.owners?.[0]?.subOwnerShipCategory?.code
            ? data?.owners.owners?.[0]?.subOwnerShipCategory?.code
            : data?.ownershipCategory?.code,
          tradeUnits: gettradeunits(data),
          additionalDetail: {
            propertyId: !data?.cpt ? "" : data?.cpt?.details?.propertyId,
          },
        },
        tradeName: data?.TradeDetails?.TradeName,
        wfDocuments: [],
        applicationDocuments: [],
        workflowCode: "NewTL",
      },
    ],
  };
  return formdata;
};
/////////////////////////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const convertToDeathRegistration = (data = {}) => {
  // let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const empTenantId = Digit.ULBService.getCurrentUlb();
  let tenantId = "";
  tenantId = empTenantId["code"];
  const formdata = {
    deathCertificateDtls: [
      {
        id: null,
        registrationUnit: null,
        tenantId: tenantId,
        deathDateUnavailable: data?.InformationDeath?.selectedValues,
        dateOfDeath: Date.parse(data?.InformationDeath?.DeathDate), //.Date.parse(data?.InformationDeath?.FromDate),
        timeOfDeath: data?.InformationDeath?.DeathTime, //.data?.InformationDeath?.DeathTimeFrom,
        timeOfDeathUnit: "am",
        dateOfDeath1: Date.parse(data?.InformationDeath?.ToDate),
        timeOfDeath1: data?.InformationDeath?.DeathTimeTo,
        timeOfDeathUnit1: "am", 
        deceasedIdentified: 1,
        deceasedTitle: data?.InformationDeath?.setTitle?.data?.InformationDeath?.setTitle.code,
        deceasedFirstNameEn: data?.InformationDeath?.FirstName,
        deceasedFirstNameMl: data?.InformationDeath?.MLFirstName,
        deceasedMiddleNameEn: data?.InformationDeath?.MiddleName,
        deceasedMiddleNameMl: data?.InformationDeath?.MlMiddleName,
        deceasedLastNameEn: data?.InformationDeath?.LastName,
        deceasedLastNameMl: data?.InformationDeath?.MlLastName,
        deceasedAadharSubmitted: 1,
        deceasedAadharNumber: data?.InformationDeath?.AdharNo,
        deceasedGender: data?.InformationDeath?.setGender?.data?.InformationDeath?.setGender.code,
        age: data?.InformationDeath?.Ageofbirth,
        ageUnit: data?.InformationDeath?.setAgeUnit?.data?.InformationDeath?.setAgeUnit.code,
        dateOfBirth: Date.parse(data?.InformationDeath?.DateOfBirth),
        deathPlace: data?.PlaceOfDeath?.PlaceOfDeath ? data?.PlaceOfDeath?.PlaceOfDeath.code : null,
        deathPlaceType: data?.PlaceOfDeath?.setInstitution?data ?.PlaceOfDeath?.setInstitution.code : null,
        deathPlaceInstId: data?.PlaceOfDeath?.setInstitutionId?data ?. PlaceOfDeath?.setInstitutionId.code : null,
        deathPlaceOfficerName: data?.PlaceOfDeath?.SiginedOfficer,
        deathPlaceOtherMl: data?.PlaceOfDeath?.PlaceOfDeathOtherDetailsMl, //data.PlaceOfDeathVehicle?.VehicleOtherDetailsMl
        deathPlaceOtherEn: data?.PlaceOfDeath?.PlaceOfDeathOtherDetailsEn, //data.PlaceOfDeathVehicle?.VehicleOtherDetailsEn
        informantTitle: data?.PlaceOfDeath?.setTitle ? data?.InformentAddress?.setTitle.code : null,
        informantNameEn: data?.PlaceOfDeath?.InformentNameEn,
        informantnameMl: data?.PlaceOfDeath?.InformentNameMl,
        informantAadharSubmitted: data?.PlaceOfDeath?.selectedValues ? data?.PlaceOfDeath?.selectedValues : true,
        informantAadharNo: data?.PlaceOfDeath?.AadhaarNo,
        informantMobileNo: data?.InformentAddress?.InformentMobileNo,
        generalRemarks: data?.GeneralRemarks?.GeneralRemarks,
        applicationStatus: null,
        submittedOn: null,
        placeBurial: null,
        placeBurialInstitutionType: null,
        placeBurialInstitutionName: null,
        registrationNo: null,
        ipNo: null,
        opNo: null,
        residenceLBType: null,
        maleDependentType: data?.FamilyInformationDeath?.setmaleDependent ? data?.FamilyInformationDeath?.setmaleDependent.code : null,
        maleDependentTitle: null,
        maleDependentNameEn: data?.FamilyInformationDeath?.FatherOrHusbandNameEN,
        maleDependentNameMl: data?.FamilyInformationDeath?.FatherOrHusbandNameMl,
        maleDependentAadharNo: data?.FamilyInformationDeath?.FatherOrHusbandAdharNo,
        maleDependentMobileNo: data?.FamilyInformationDeath?.FatherMobile,
        maleDependentMailId: data?.FamilyInformationDeath?.FatherEmail,
        // femaleDependentType: null,
        femaleDependentTitle: data?.FamilyInformationDeath?.setTitleB,
        femaleDependentNameEn: data?.FamilyInformationDeath?.MotherNameEn,
        femaleDependentNameMl: data?.FamilyInformationDeath?.MotherNameMl,
        femaleDependentAadharNo: data?.FamilyInformationDeath?.MotherAdharNo,
        femaleDependentMobileNo: data?.FamilyInformationDeath?.MotherMobile,
        femaleDependentMailId: data?.FamilyInformationDeath?.MotherEmail,
        isvehicle: null,
        vehicleHospitalMl: data?.PlaceOfDeathVehicle?.setAdmittedHospital.code,
        vehicleHospitalEn: data?.PlaceOfDeathVehicle?.setAdmittedHospital.code,
        vehicleFromplaceMl: data?.PlaceOfDeathVehicle?.VehicleFromMl,
        vehicleFromplaceEn: data?.PlaceOfDeathVehicle?.setVehicleFromEn,
        vehicleToPlaceMl: data?.PlaceOfDeathVehicle?.VehicleToMl,
        vehicleToPlaceEn: data?.PlaceOfDeathVehicle?.setSelectVehicleToEn,
        vehicleNumber: data?.PlaceOfDeathVehicle?.VehicleRegistrationNo,
        vehicleDriverLicenceNo: data?.PlaceOfDeathVehicle?.DriverLicenceNo,
        vehicle_first_halt: null,
        informantAge: null,
        deathPlaceWardId: data?.PlaceOfDeathVehicle?.setDeathVehicleWard.code,
        deathSignedOfficerDesignation: data?.HospitalDetails?.setDesignation.code, //data?.PlaceOfDeathInstitution?.SiginedOfficerDesignation
        deathSignedOfficerMob: data?.HospitalDetails?.HospitalMobile, //data?.PlaceOfDeathInstitution?.InstitutionMobilNo,
        deathSignedOfficerAadhaar: data?.HospitalDetails?.HospitalAadhaar, //data?.PlaceOfDeathInstitution?.InstitutionAadhaar,
        deceasedIdproofType: data?.InformationDeath?.setIdCombo?.data?.InformationDeath?.setIdCombo.code,
        deceasedIdproofNo: data?.InformationDeath?.IdNoNo,
        applicationType: "new",
        burial_state: null,
        burialDistrict: null,
        burialLBType: null,
        burialLBName: null,
        burialState: null,
        applicationNumber: null,
        fileNumber: null,
        ackNo: null,
        //deseasedPassportNo: data?.InformationDeath?.PassportNo,

        statisticalInfo: {
          id: null,
          deathDtlId: null,
          tenantId: tenantId,
          residenceLocalBody: null,
          residencePlaceType: null,
          residenceDistrict: null,
          residenceState: null,
          religion: data?.InformationDeath?.setReligion?.data?.InformationDeath?.setReligion.code,
          religionOther: null,
          occupationSub: null,
          occupationMinor: null,
          educationMain: null,
          educationSub: null,
          occupation: data?.StatisticalInfo?.setOccupationMain?.data?.StatisticalInfo?.setOccupationMain.code,
          occupationOther: data?.StatisticalInfo?.OccupationOthers,
          medicalAttentionType: data?.StatisticalInfoContinue?.setMedicalAttentionDeath?.data?.StatisticalInfoContinue?.setMedicalAttentionDeath.code,
          deathMedicallyCertified:
            data?.StatisticalInfoContinue?.setDeathMedicallyCertified?.data?.StatisticalInfoContinue?.setDeathMedicallyCertified.code,
          deathCauseMain: data?.StatisticalInfoContinue?.setCauseOfDeathMain?.data?.StatisticalInfoContinue?.setCauseOfDeathMain.code,
          deathCauseSub: data?.StatisticalInfoContinue?.setCauseOfDeathSub?.data?.StatisticalInfoContinue?.setCauseOfDeathSub.code,
          deathCauseOther: data?.StatisticalInfoContinue?.CauseOfDeath,
          deathDuringDelivery: data?.StatisticalInfoContinue?.isPregnent?.data?.StatisticalInfoContinue?.isPregnent.code,
          smokingNumYears: null,
          tobaccoNumYears: null,
          arecanutNumYears: null,
          alcoholNumYears: null,
          nationality: data?.InformationDeath?.setNationality,
        },
        auditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        addressInfo: {
          presentAddress: {
            id: null,
            deathDtlId: null,
            tenantId: tenantId,
            addrTypeId: null,
            houseNo: data?.AddressOfDecesed?.PresentBuldingNo,
            residenceAsscno: data?.AddressOfDecesed?.PresentResNo,
            streetNameEn: data?.AddressOfDecesed?.PresentStreetNameEn,
            streetNameMl: data?.AddressOfDecesed?.PresentStreetNameMl,
            localityEn: data?.AddressOfDecesed?.PresentLocalityNameEn,
            localityMl: data?.AddressOfDecesed?.PresentLocalityNameMl,
            cityEn: data?.AddressOfDecesed?.PresentCityNameEn,
            cityMl: data?.AddressOfDecesed?.PresentCityNameMl,
            // wardId: data?.AddressDetails?.PresentWard?.data?.AddressDetails?.PresentWard.code,
            talukId: data?.AddressOfDecesed?.PresentTaluk?.data?.AddressOfDecesed?.PresentTaluk.code,
            villageId: data?.AddressOfDecesed?.PresentVillage?.data?.AddressOfDecesed?.PresentVillage.code,
            postofficeId: data?.AddressOfDecesed?.PresentPostOffice?.data?.AddressOfDecesed?.PresentPostOffice.code,
            pincode: data?.AddressOfDecesed?.PresentPincode,
            districtId: data?.AddressOfDecesed?.PresentDistrict?.data?.AddressOfDecesed?.PresentDistrict.code,
            stateId: data?.AddressOfDecesed?.PresentStateName?.data?.AddressOfDecesed?.PresentStateName.code,
            countryId: data?.AddressOfDecesed?.PresentMotherCountry?.data?.AddressOfDecesed?.PresentMotherCountry.code,
            talukNameEn: data?.AddressOfDecesed?.PresentTaluk?.data?.AddressOfDecesed?.PresentTaluk.name,
            talukNameMl: data?.AddressOfDecesed?.PresentTaluk?.data?.AddressOfDecesed?.PresentTaluk.namelocal,
            villageNameEn: data?.AddressOfDecesed?.PresentVillage?.data?.AddressOfDecesed?.PresentVillage.name,
            villageNameMl: data?.AddressOfDecesed?.PresentVillage?.data?.AddressOfDecesed?.PresentVillage.namelocal,
            postofficeNameEn: data?.AddressOfDecesed?.PresentPostOffice?.data?.AddressOfDecesed?.PresentPostOffice?.PresentPostOffice.name,
            postofficeNameMl: data?.AddressOfDecesed?.PresentPostOffice?.data?.AddressOfDecesed?.PresentPostOffice?.PresentPostOffice.namelocal,
          },
          permanentAddress: {
            id: null,
            deathDtlId: null,
            tenantId: tenantId,
            addrTypeId: null,
            houseNo: data?.AddressOfDecesed?.PresentDistrict,
            residenceAsscno: data?.AddressOfDecesed?.PermanentBuldingNo,
            streetNameEn: data?.AddressOfDecesed?.PermanentStreetNameEn,
            streetNameMl: data?.AddressOfDecesed?.PermanentStreetNameMl,
            localityEn: data?.AddressOfDecesed?.PermanentLocalityNameEn,
            localityMl: data?.AddressOfDecesed?.PermanentLocalityNameMl,
            cityEn: data?.AddressOfDecesed?.PermanentCityNameEn,
            cityMl: data?.AddressOfDecesed?.PermanentCityNameMl,
            // wardId: data?.AddressDetails?.PermanentWard?.data?.AddressDetails?.PermanentWard.code,
            talukId: data?.AddressOfDecesed?.PermanentTaluk?.data?.AddressOfDecesed?.PermanentTaluk.code,
            villageId: data?.AddressOfDecesed?.PermanentVillage?.data?.AddressOfDecesed?.PermanentVillage.code,
            postofficeId: data?.AddressOfDecesed?.PermanentPostOffice?.data?.AddressOfDecesed?.PermanentPostOffice.code,
            pincode: data?.AddressOfDecesed?.PermanentPincode,
            districtId: data?.AddressOfDecesed?.PermanentDistrict?.data?.AddressOfDecesed?.PermanentDistrict.code,
            stateId: data?.AddressOfDecesed?.PermanentStateName ? data?.AddressOfDecesed?.PermanentStateName.code : null,
            countryId: data?.AddressOfDecesed?.PermanentCountry ? data?.AddressOfDecesed?.PermanentCountry.code : null,
            talukNameEn: data?.AddressOfDecesed?.PermanentTaluk?.data?.AddressOfDecesed?.PermanentTaluk.name,
            talukNameMl: data?.AddressOfDecesed?.PermanentTaluk?.data?.AddressOfDecesed?.PermanentTaluk.namelocal,
            villageNameEn: data?.AddressOfDecesed?.PermanentVillage?.data?.AddressOfDecesed?.PermanentVillage.name,
            villageNameMl: data?.AddressOfDecesed?.PermanentVillage?.data?.AddressOfDecesed?.PermanentVillage.namelocal,
            postofficeNameEn: data?.AddressOfDecesed?.PermanentPostOffice?.data?.AddressOfDecesed?.PermanentPostOffice.name,
            postofficeNameMl: data?.AddressOfDecesed?.PermanentPostOffice?.data?.AddressOfDecesed?.PermanentPostOffice.namelocal,
          },
          informantAddress: {
            id: null,
            deathDtlId: null,
            tenantId: tenantId,
            addrTypeId: null,
            houseNo: data?.InformentAddress?.HouseNo,
            residenceAsscno: null,
            streetNameEn: null,
            streetNameMl: null,
            localityEn: data?.InformentAddress?.Locality,
            localityMl: data?.InformentAddress?.LocalityMl,
            cityEn: data?.InformentAddress?.CityEn,
            cityMl: data?.InformentAddress?.CityMl,
            wardId: null,
            talukId: data?.InformentAddress?.setTaluk?.data?.InformentAddress?.setTaluk.code,
            villageId: data?.InformentAddress?.setVillage.code?.data?.InformentAddress?.setVillage.code,
            postofficeId: data?.InformentAddress?.setPostOffice.code?.data?.InformentAddress?.setPostOffice.code,
            pincode: data?.InformentAddress?.PinCode,
            districtId: null,
            //data?.InformentAddress?.setDistrict.code?.data?.InformentAddress?.setDistrict.code,
            stateId: null,
            countryId: null,
            talukNameEn: data?.InformentAddress?.setTaluk.name,
            talukNameMl: data?.InformentAddress?.setTaluk.namelocal,
            villageNameEn: data?.InformentAddress?.setVillage.code?.data?.InformentAddress?.setVillage.name,
            villageNameMl: data?.InformentAddress?.setVillage.code?.data?.InformentAddress?.setVillage.localname,
            postofficeNameEn: data?.InformentAddress?.setPostOffice.code?.data?.InformentAddress?.setPostOffice.name,
            postofficeNameMl: data?.InformentAddress?.setPostOffice.code?.data?.InformentAddress?.setPostOffice.localname,
          },
          deathplaceAddress: {
            id: null,
            deathDtlId: null,
            tenantId: tenantId,
            addrTypeId: null,
            houseNo: data?.PlaceOfDeathHome?.AdrsBuldingNo,
            residenceAsscno: data?.PlaceOfDeathHome?.AdrsResNo,
            streetNameEn: data?.PlaceOfDeathHome?.AdrsStreetNameEn,
            streetNameMl: data?.PlaceOfDeathHome?.AdrsStreetNameMl,
            localityEn: data?.PlaceOfDeathHome?.AdrsLocalityNameEn,
            localityMl: data?.PlaceOfDeathHome?.AdrsLocalityNameMl,
            cityEn: data?.PlaceOfDeathHome?.AdrsCityNameEn,
            cityMl: data?.PlaceOfDeathHome?.AdrsCityNameMl,
            // wardId: data?.PlaceOfDeathHome?.setWard?.data?.PlaceOfDeathHome?.setWard.code,
            talukId: data?.PlaceOfDeathHome?.AdrsTaluk.code,
            villageId: data?.PlaceOfDeathHome?.AdrsVillage.code,
            postofficeId: data?.PlaceOfDeathHome?.AdrsPostOffice.code,
            pincode: data?.PlaceOfDeathHome?.AdrsPincode,
            districtId: data?.PlaceOfDeathHome?.AdrsDistrict.code,
            stateId: data?.PlaceOfDeathHome?.AdrsStateName,
            countryId: data?.PlaceOfDeathHome?.AdrsCountry,
            talukNameEn: data?.PlaceOfDeathHome?.AdrsTaluk.name,
            talukNameMl: data?.PlaceOfDeathHome?.AdrsTaluk.localname,
            villageNameEn: data?.PlaceOfDeathHome?.AdrsVillage.name,
            villageNameMl: data?.PlaceOfDeathHome?.AdrsVillage.localname,
            postofficeNameEn: data?.PlaceOfDeathHome?.AdrsPostOffice.name,
            postofficeNameMl: data?.PlaceOfDeathHome?.AdrsPostOffice.localname,
          },
          applicantAddress: {
            id: null,
            deathDtlId: null,
            tenantId: tenantId,
            addrTypeId: null,
            houseNo: null,
            residenceAsscno: null,
            streetNameEn: null,
            streetNameMl: null,
            localityEn: null,
            localityMl: null,
            cityEn: null,
            cityMl: null,
            wardId: null,
            talukId: null,
            villageId: null,
            postofficeId: null,
            pincode: null,
            districtId: null,
            stateId: null,
            countryId: null,
            talukNameEn: null,
            talukNameMl: null,
            villageNameEn: null,
            villageNameMl: null,
            postofficeNameEn: null,
            postofficeNameMl: null,
            locationType: null,
            houeNameMl: null,
            houeNameEn: null,
          },
        },
        applicantDetails: {
          id: null,
          tenantId: tenantId,
          applicantName: null,
          applicantAadhar: null,
          applicantMobileNo: null,
          applicantEmailId: null,
          applicantRelation: null,
        },
      },
    ],
  };
  return formdata;
};

export const getwfdocuments = (data) => {
  let wfdoc = [];
  let doc = data ? data.owners.documents : [];
  doc["OwnerPhotoProof"] &&
    wfdoc.push({
      fileName: doc["OwnerPhotoProof"].name,
      fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
      documentType: "OWNERPHOTO",
      tenantId: data?.tenantId,
    });
  doc["ProofOfIdentity"] &&
    wfdoc.push({
      fileName: doc["ProofOfIdentity"].name,
      fileStoreId: doc["ProofOfIdentity"].fileStoreId,
      documentType: "OWNERIDPROOF",
      tenantId: data?.tenantId,
    });
  doc["ProofOfOwnership"] &&
    wfdoc.push({
      fileName: doc["ProofOfOwnership"].name,
      fileStoreId: doc["ProofOfOwnership"].fileStoreId,
      documentType: "OWNERSHIPPROOF",
      tenantId: data?.tenantId,
    });
  return wfdoc;
};

export const getEditTradeDocumentUpdate = (data) => {
  let updateddocuments = [];
  let doc = data ? data.owners.documents : [];
  data?.tradeLicenseDetail?.applicationDocuments?.map((olddoc) => {
    if (
      (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId === data.owners.documents["OwnerPhotoProof"].fileStoreId) ||
      (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId == data.owners.documents["ProofOfOwnership"].fileStoreId) ||
      (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId === data.owners.documents["ProofOfIdentity"].fileStoreId)
    ) {
      updateddocuments.push(olddoc);
    } else {
      if (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId !== data.owners.documents["OwnerPhotoProof"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["OwnerPhotoProof"].name,
          fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
          documentType: "OWNERPHOTO",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId !== data.owners.documents["ProofOfOwnership"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfOwnership"].name,
          fileStoreId: doc["ProofOfOwnership"].fileStoreId,
          documentType: "OWNERSHIPPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId !== data.owners.documents["ProofOfIdentity"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfIdentity"].name,
          fileStoreId: doc["ProofOfIdentity"].fileStoreId,
          documentType: "OWNERIDPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
    }
  });
  return updateddocuments;
};

export const getEditRenewTradeDocumentUpdate = (data, datafromflow) => {
  let updateddocuments = [];
  let doc = datafromflow ? datafromflow.owners.documents : [];
  data.tradeLicenseDetail.applicationDocuments.map((olddoc) => {
    if (
      (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId === datafromflow.owners.documents["OwnerPhotoProof"].fileStoreId) ||
      (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId == datafromflow.owners.documents["ProofOfOwnership"].fileStoreId) ||
      (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId === datafromflow.owners.documents["ProofOfIdentity"].fileStoreId)
    ) {
      updateddocuments.push(olddoc);
    } else {
      if (olddoc.documentType === "OWNERPHOTO" && olddoc.fileStoreId !== datafromflow.owners.documents["OwnerPhotoProof"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["OwnerPhotoProof"].name,
          fileStoreId: doc["OwnerPhotoProof"].fileStoreId,
          documentType: "OWNERPHOTO",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERSHIPPROOF" && olddoc.fileStoreId !== datafromflow.owners.documents["ProofOfOwnership"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfOwnership"].name,
          fileStoreId: doc["ProofOfOwnership"].fileStoreId,
          documentType: "OWNERSHIPPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
      if (olddoc.documentType === "OWNERIDPROOF" && olddoc.fileStoreId !== datafromflow.owners.documents["ProofOfIdentity"].fileStoreId) {
        updateddocuments.push({
          fileName: doc["ProofOfIdentity"].name,
          fileStoreId: doc["ProofOfIdentity"].fileStoreId,
          documentType: "OWNERIDPROOF",
          tenantId: data?.tenantId,
        });
        updateddocuments.push({ ...olddoc, active: "false" });
      }
    }
  });
  return updateddocuments;
};

export const convertToUpdateTrade = (data = {}, datafromflow, tenantId) => {
  const isEdit = window.location.href.includes("renew-trade");
  let formdata1 = {
    Licenses: [],
  };
  formdata1.Licenses[0] = {
    ...data.Licenses[0],
  };
  formdata1.Licenses[0].action = "APPLY";
  formdata1.Licenses[0].wfDocuments = formdata1.Licenses[0].wfDocuments ? formdata1.Licenses[0].wfDocuments : getwfdocuments(datafromflow);
  formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments = !isEdit
    ? formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments
      ? formdata1.Licenses[0].tradeLicenseDetail.applicationDocuments
      : getwfdocuments(datafromflow)
    : getEditRenewTradeDocumentUpdate(data?.Licenses[0], datafromflow);
  return formdata1;
};

export const getvalidfromdate = (date, fy) => {
  let temp = parseInt(fy[0].id);
  let object;
  fy &&
    fy.map((ob) => {
      if (parseInt(ob.id) > temp) {
        object = ob;
        temp = parseInt(ob.id);
      }
    });
  return object;
};

export const getvalidTodate = (date, fy) => {
  let temp = parseInt(fy[0].id);
  let object;
  fy &&
    fy.map((ob) => {
      if (parseInt(ob.id) > temp) {
        object = ob;
        temp = parseInt(ob.id);
      }
    });
  return object;
};

export const stringToBoolean = (value) => {
  if (value) {
    switch (value.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(value);
    }
  } else {
    return Boolean(value);
  }
};

//FinancialYear
export const convertToEditTrade = (data, fy = []) => {
  const currrentFYending = fy?.filter((item) => item?.code === data?.financialYear)?.[0]?.endingDate;
  const nextFinancialYearForRenewal = fy?.filter((item) => item?.startingDate === currrentFYending)?.[0]?.code;
  let isDirectrenewal = stringToBoolean(sessionStorage.getItem("isDirectRenewal"));
  let formdata = {
    Licenses: [
      {
        id: data?.id,
        tenantId: data?.address?.city?.code,
        businessService: data?.businessService,
        licenseType: data?.licenseType,
        applicationType: "RENEWAL",
        workflowCode: isDirectrenewal ? "DIRECTRENEWAL" : "EDITRENEWAL",
        licenseNumber: data?.licenseNumber,
        applicationNumber: data?.applicationNumber,
        tradeName: data?.tradeName,
        applicationDate: data?.applicationDate,
        commencementDate: data?.commencementDate,
        issuedDate: data?.issuedDate,
        financialYear: nextFinancialYearForRenewal || "2020-21",
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        action: "INITIATE",
        wfDocuments: data?.wfDocuments,
        status: data?.status,
        tradeLicenseDetail: {
          address: data.tradeLicenseDetail.address,
          applicationDocuments: data.tradeLicenseDetail.applicationDocuments,
          accessories: isDirectrenewal ? data.tradeLicenseDetail.accessories : gettradeupdateaccessories(data),
          owners: isDirectrenewal ? data.tradeLicenseDetail.owners : gettradeownerarray(data),
          structureType: isDirectrenewal
            ? data.tradeLicenseDetail.structureType
            : data?.TradeDetails?.VehicleType
            ? data?.TradeDetails?.VehicleType.code
            : data?.TradeDetails?.BuildingType.code,
          subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
            : data?.ownershipCategory?.code,
          tradeUnits: gettradeupdateunits(data),
          additionalDetail: data.tradeLicenseDetail.additionalDetail,
          auditDetails: data.tradeLicenseDetail.auditDetails,
          channel: data.tradeLicenseDetail.channel,
          id: data.tradeLicenseDetail.id,
          ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && {
            institution: {
              designation: data?.owners?.owners?.[0]?.designation,
              ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
              mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
              instituionName: data?.owners?.owners?.[0]?.institutionName,
              name: data?.owners?.owners?.[0]?.name,
            },
          }),
        },
        calculation: null,
        auditDetails: data?.auditDetails,
        accountId: data?.accountId,
      },
    ],
  };
  return formdata;
};

//FinancialYear
export const convertToResubmitTrade = (data) => {
  let formdata = {
    Licenses: [
      {
        id: data?.id,
        tenantId: data?.address?.city?.code,
        businessService: data?.businessService,
        licenseType: data?.licenseType,
        applicationType: data.applicationType,
        workflowCode: data.workflowCode,
        licenseNumber: data?.licenseNumber,
        applicationNumber: data?.applicationNumber,
        tradeName: data?.tradeName,
        applicationDate: data?.applicationDate,
        commencementDate: data?.commencementDate,
        issuedDate: data?.issuedDate,
        financialYear: data?.financialYear,
        validFrom: data?.validFrom,
        validTo: data?.validTo,
        action: "FORWARD",
        wfDocuments: data?.wfDocuments,
        status: data?.status,
        tradeLicenseDetail: {
          address: data.tradeLicenseDetail.address,
          applicationDocuments: getEditTradeDocumentUpdate(data),
          accessories: gettradeupdateaccessories(data),
          owners: gettradeownerarray(data),
          structureType: data?.TradeDetails?.VehicleType ? data?.TradeDetails?.VehicleType.code : data?.TradeDetails?.BuildingType.code,
          subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
            : data?.ownershipCategory?.code,
          tradeUnits: gettradeupdateunits(data),
          additionalDetail: data.tradeLicenseDetail.additionalDetail,
          auditDetails: data.tradeLicenseDetail.auditDetails,
          channel: data.tradeLicenseDetail.channel,
          id: data.tradeLicenseDetail.id,
          institution: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
            ? {
                designation: data?.owners?.owners?.[0]?.designation,
                ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
                mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
                instituionName: data?.owners?.owners?.[0]?.institutionName,
                name: data?.owners?.owners?.[0]?.name,
              }
            : null,
        },
        calculation: null,
        auditDetails: data?.auditDetails,
        accountId: data?.accountId,
      },
    ],
  };
  return formdata;
};

/*   method to check value  if not returns NA*/

export const convertEpochToDateCitizen = (dateEpoch) => {
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

export const checkForNA = (value = "") => {
  return checkForNotNull(value) ? value : "PT_NA";
};

export const getCommencementDataFormat = (date) => {
  let newDate =
    new Date(date).getFullYear().toString() + "-" + (new Date(date).getMonth() + 1).toString() + "-" + new Date(date).getDate().toString();
  return newDate;
};

/*   method to check value  if not returns NA*/
export const isPropertyVacant = (value = "") => {
  return checkForNotNull(value) && value.includes("VACANT") ? true : false;
};

/*   method to check value equal to flat / part of building if not returns NA  */
export const isPropertyFlatorPartofBuilding = (value = "") => {
  return checkForNotNull(value) && value.includes("SHAREDPROPERTY") ? true : false;
};

export const isPropertyIndependent = (value = "") => {
  return checkForNotNull(value) && value.includes("INDEPENDENT") ? true : false;
};

export const isthere1Basement = (value = "") => {
  return checkForNotNull(value) && value.includes("ONE") ? true : false;
};

export const isthere2Basement = (value = "") => {
  return checkForNotNull(value) && value.includes("TWO") ? true : false;
};

export const isPropertyselfoccupied = (value = "") => {
  return checkForNotNull(value) && value.includes("SELFOCCUPIED") ? true : false;
};

export const isPropertyPartiallyrented = (value = "") => {
  return checkForNotNull(value) && value.includes("PARTIALLY") ? true : false;
};

export const ispropertyunoccupied = (value = "") => {
  return checkForNotNull(value) && value.includes("YES") ? true : false;
};
/*   method to get required format from fielstore url*/
export const pdfDownloadLink = (documents = {}, fileStoreId = "", format = "") => {
  /* Need to enhance this util to return required format*/

  let downloadLink = documents[fileStoreId] || "";
  let differentFormats = downloadLink?.split(",") || [];
  let fileURL = "";
  differentFormats.length > 0 &&
    differentFormats.map((link) => {
      if (!link.includes("large") && !link.includes("medium") && !link.includes("small")) {
        fileURL = link;
      }
    });
  return fileURL;
};

/*   method to get filename  from fielstore url*/
export const pdfDocumentName = (documentLink = "", index = 0) => {
  let documentName = decodeURIComponent(documentLink.split("?")[0].split("/").pop().slice(13)) || `Document - ${index + 1}`;
  return documentName;
};

/* methid to get date from epoch */
export const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${year}-${month}-${day}`; //`${day}/${month}/${year}`;
  } else {
    return null;
  }
};

export const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

export const checkIsAnArray = (obj = []) => {
  return obj && Array.isArray(obj) ? true : false;
};
export const checkArrayLength = (obj = [], length = 0) => {
  return checkIsAnArray(obj) && obj.length > length ? true : false;
};

export const getWorkflow = (data = {}) => {
  return {
    action: data?.isEditProperty ? "REOPEN" : "OPEN",
    businessService: `PT.${getCreationReason(data)}`,
    moduleName: "PT",
  };
};

export const getCreationReason = (data = {}) => {
  return data?.isUpdateProperty ? "UPDATE" : "CREATE";
};

export const getUniqueItemsFromArray = (data, identifier) => {
  const uniqueArray = [];
  const map = new Map();
  for (const item of data) {
    if (!map.has(item[identifier])) {
      map.set(item[identifier], true); // set any value to Map
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
};

export const commonTransform = (object, path) => {
  let data = get(object, path);
  let transformedData = {};
  data.map((a) => {
    const splitList = a.code.split(".");
    let ipath = "";
    for (let i = 0; i < splitList.length; i += 1) {
      if (i != splitList.length - 1) {
        if (!(splitList[i] in (ipath === "" ? transformedData : get(transformedData, ipath)))) {
          set(transformedData, ipath === "" ? splitList[i] : ipath + "." + splitList[i], i < splitList.length - 2 ? {} : []);
        }
      } else {
        get(transformedData, ipath).push(a);
      }
      ipath = splitList.slice(0, i + 1).join(".");
    }
  });
  set(object, path, transformedData);
  return object;
};

export const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
  //example input format : "2018-10-02"
  try {
    const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

export const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
        let [key, value] = param.split("=");
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
        return params;
      }, {})
    : {};
};

export const getPattern = (type) => {
  switch (type) {
    case "Name":
      return /^[^{0-9}^\$\"<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{1,50}$/i;
    case "MobileNo":
      return /^[6789][0-9]{9}$/i;
    case "Amount":
      return /^[0-9]{0,8}$/i;
    case "NonZeroAmount":
      return /^[1-9][0-9]{0,7}$/i;
    case "DecimalNumber":
      return /^\d{0,8}(\.\d{1,2})?$/i;
    //return /(([0-9]+)((\.\d{1,2})?))$/i;
    case "Email":
      return /^(?=^.{1,64}$)((([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/i;
    case "Address":
      return /^[^\$\"<>?\\\\~`!@$%^()+={}\[\]*:;“”‘’]{1,500}$/i;
    case "PAN":
      return /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/i;
    case "TradeName":
      return /^[-@.\/#&+\w\s]*$/;
    //return /^[^\$\"'<>?\\\\~`!@#$%^()+={}\[\]*,.:;“”‘’]{1,100}$/i;
    case "Date":
      return /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/i;
    case "UOMValue":
      return /^(0)*[1-9][0-9]{0,5}$/i;
    case "OperationalArea":
      return /^(0)*[1-9][0-9]{0,6}$/i;
    case "NoOfEmp":
      return /^(0)*[1-9][0-9]{0,6}$/i;
    case "GSTNo":
      return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/i;
    case "DoorHouseNo":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*:;“”‘’]{1,50}$/i;
    case "BuildingStreet":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,64}$/i;
    case "Pincode":
      return /^[1-9][0-9]{5}$/i;
    case "Landline":
      return /^[0-9]{11}$/i;
    case "PropertyID":
      return /^[a-zA-z0-9\s\\/\-]$/i;
    case "ElectricityConnNo":
      return /^.{1,15}$/i;
    case "DocumentNo":
      return /^[0-9]{1,15}$/i;
    case "eventName":
      return /^[^\$\"<>?\\\\~`!@#$%^()+={}\[\]*,.:;“”]{1,65}$/i;
    case "eventDescription":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,500}$/i;
    case "cancelChallan":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,100}$/i;
    case "FireNOCNo":
      return /^[a-zA-Z0-9-]*$/i;
    case "consumerNo":
      return /^[a-zA-Z0-9/-]*$/i;
    case "AadharNo":
      //return /^\d{4}\s\d{4}\s\d{4}$/;
      return /^([0-9]){12}$/;
    case "ChequeNo":
      return /^(?!0{6})[0-9]{6}$/;
    case "Comments":
      return /^[^\$\"'<>?\\\\~`!@$%^()+={}\[\]*.:;“”‘’]{1,50}$/i;
    case "OldLicenceNo":
      return /^[a-zA-Z0-9-/]{0,64}$/;
  }
};

export const checkForEmployee = (role) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser();
  const rolearray = userInfo?.info?.roles.filter((item) => {
    if (item.code == role && item.tenantId === tenantId) return true;
  });
  return rolearray?.length;
};

export const convertEpochToDateDMY = (dateEpoch) => {
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
    return "NA";
  }
  const dateFromApi = new Date(dateEpoch);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${day}/${month}/${year}`;
};
