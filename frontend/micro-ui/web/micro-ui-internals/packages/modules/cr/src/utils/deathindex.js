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
export const convertToDeathRegistration = (data = {}) => {
  // let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const empTenantId = Digit.ULBService.getCurrentUlb();
  // let tenantId = "";
  // tenantId = empTenantId["code"];

  console.log(data);
  const formdata = {
    deathCertificateDtls: [
      {
        InformationDeath: {
          Id: null,
          RegistrationUnit: null,
          TenantId: data?.InformationDeath?.tenantId,
          DeathDateUnavailable: data?.InformationDeath?.DeathDateUnavailable,
          // DateOfDeath: Date.parse(data?.InformationDeath?.DateOfDeath),

          DateOfDeath: Date.parse(data?.InformationDeath?.DateOfDeath ? data?.InformationDeath?.DateOfDeath : data?.InformationDeath?.FromDate),
          TimeOfDeath: parseInt(data?.InformationDeath?.TimeOfDeath),
          TimeOfDeathUnit: "AM",
          DateOfDeath1: Date.parse(data?.InformationDeath?.ToDate),
          DeathPlace: data?.InformationDeath?.DeathPlace ? (data?.InformationDeath?.DeathPlace?.code?data?.InformationDeath?.DeathPlace?.code:data?.InformationDeath?.DeathPlace) : null,         
          hospitalNameEn: data?.InformationDeath?.hospitalNameEn ? data?.InformationDeath?.hospitalNameEn.code : null,
          hospitalNameMl: data?.InformationDeath?.hospitalName ? data?.InformationDeath?.hospitalName.hospitalNamelocal : null,
          institution: data?.InformationDeath?.institution ? data?.InformationDeath?.InstitutionIdMl.code : null,
          DeathPlaceInstId: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.DeathPlaceInstId.code : null,
          institution: data?.InformationDeath?.institution ? data?.InformationDeath?.InstitutionIdMl.code : null,
          DeathPlaceInstitutionNameEn: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.DeathPlaceInstId.institutionName : null,
          DeathPlaceInstitutionNameMl: data?.InformationDeath?.InstitutionIdMl ? data?.InformationDeath?.InstitutionIdMl.institutionNamelocal : null,                  
          vehicleType: data?.InformationDeath?.vehicleType ? data?.InformationDeath?.vehicleType.code : null,
          VehicleNumber: data?.InformationDeath?.VehicleNumber,
          VehicleFromplaceEn: data?.InformationDeath?.VehicleFromplaceEn,
          VehicleFromplaceMl: data?.InformationDeath?.VehicleFromplaceMl,
          VehicleToPlaceEn: data?.InformationDeath?.VehicleToPlaceEn,
          VehicleToPlaceMl: data?.InformationDeath?.VehicleToPlaceMl,
          VehicleFirstHaltEn: data?.InformationDeath?.VehicleFirstHaltEn,
          //VehicleFirstHaltMl: data?.InformationDeath?.VehicleFirstHaltMl,
          VehicleHospitalEn: data?.InformationDeath?.VehicleHospitalEn ? data?.InformationDeath?.VehicleHospitalEn.code : null,
          DeathPlaceCountry: data?.InformationDeath?.DeathPlaceCountry ? data?.InformationDeath?.DeathPlaceCountry.code : null,
          DeathPlaceState: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState.code : null,
          DeathPlaceDistrict: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState.code : null,
          DeathPlaceCity: data?.InformationDeath?.DeathPlaceCity? data?.InformationDeath?.DeathPlaceCity:null,
          DeathPlaceRemarksEn: data?.InformationDeath?.DeathPlaceRemarksEn?data?.InformationDeath?.DeathPlaceRemarksEn:null,
          DeathPlaceRemarksMl: data?.InformationDeath?.DeathPlaceRemarksMl?data?.InformationDeath?.DeathPlaceRemarksMl:null,
          DeathPlaceWardId: data?.InformationDeath?.DeathPlaceWardId ? data?.InformationDeath?.DeathPlaceWardId.code : null,
          publicPlaceType: data?.InformationDeath?.publicPlaceType ? data?.InformationDeath?.publicPlaceType.code : null,
          PlaceOfBurialEn: data?.InformationDeath?.PlaceOfBurialEn?data?.InformationDeath?.PlaceOfBurialEn:null,
          PlaceOfBurialMl: data?.InformationDeath?.PlaceOfBurialMl? data?.InformationDeath?.PlaceOfBurialMl:null,
          DeathPlaceLocalityEn: data?.InformationDeath?.DeathPlaceLocalityEn?data?.InformationDeath?.DeathPlaceLocalityEn:null,
          DeathPlaceLocalityMl: data?.InformationDeath?.DeathPlaceLocalityMl?data?.InformationDeath?.DeathPlaceLocalityMl:null,
          DeathPlaceStreetEn: data?.InformationDeath?.DeathPlaceStreetEn?data?.InformationDeath?.DeathPlaceStreetEn:null,
          DeathPlaceStreetMl: data?.InformationDeath?.DeathPlaceStreetMl?data?.InformationDeath?.DeathPlaceStreetMl:null,
          GeneralRemarks: data?.InformationDeath?.GeneralRemarks?data?.InformationDeath?.GeneralRemarks:null,
          DeathPlaceHomeWardId: data?.InformationDeath?.DeathPlaceHomeWardId ? data?.InformationDeath?.DeathPlaceHomeWardId.code : null,
          DeathPlaceHomePostofficeId: data?.InformationDeath?.DeathPlaceHomePostofficeId
            ? data?.InformationDeath.DeathPlaceHomePostofficeId.code
            : null,
          DeathPlaceHomePincode: data?.InformationDeath?.DeathPlaceHomePincode ? data?.InformationDeath?.DeathPlaceHomePincode : null,
          DeathPlaceHomeLocalityEn: data?.InformationDeath?.DeathPlaceHomeLocalityEn ? data?.InformationDeath?.DeathPlaceHomeLocalityEn : null,
          DeathPlaceHomeLocalityMl: data?.InformationDeath?.DeathPlaceHomeLocalityMl ? data?.InformationDeath?.DeathPlaceHomeLocalityMl : null,
          DeathPlaceHomeStreetNameEn: data?.InformationDeath?.DeathPlaceHomeStreetNameEn ? data?.InformationDeath?.DeathPlaceHomeStreetNameEn : null,
          DeathPlaceHomeStreetNameMl: data?.InformationDeath?.DeathPlaceHomeStreetNameMl ? data?.InformationDeath?.DeathPlaceHomeStreetNameMl : null,
          DeathPlaceHomeHoueNameEn: data?.InformationDeath?.DeathPlaceHomeHoueNameEn ? data?.InformationDeath?.DeathPlaceHomeHoueNameEn : null,
          DeathPlaceHomeHoueNameMl: data?.InformationDeath?.DeathPlaceHomehoueNameMl ? data?.InformationDeath?.DeathPlaceHomehoueNameMl : null,
          DeceasedAadharNotAvailable: data?.InformationDeath?.DeceasedAadharNotAvailable ? data?.InformationDeath?.DeceasedAadharNotAvailable : false,
          DeceasedAadharNumber: data?.InformationDeath?.DeceasedAadharNumber,
          DeceasedIdproofType: data?.InformationDeath?.DeceasedIdproofType ? data?.InformationDeath.DeceasedIdproofType.code : null,
          DeceasedIdproofNo: data?.InformationDeath?.DeceasedIdproofNo,
          DeceasedFirstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
          DeceasedMiddleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
          DeceasedLastNameEn: data?.InformationDeath?.DeceasedLastNameEn,
          DeceasedFirstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
          DeceasedMiddleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
          DeceasedLastNameMl: data?.InformationDeath?.DeceasedLastNameMl,
          Age: parseInt(data?.InformationDeath?.Age),
          AgeUnit: data?.InformationDeath?.AgeUnit.code,
          DeceasedGender: data?.InformationDeath?.DeceasedGender.code,
          Nationality: data?.InformationDeath?.Nationality.code,
          Religion: data?.InformationDeath?.Religion.code,
          Occupation: data?.InformationDeath?.Occupation ? data?.InformationDeath?.Occupation.code : null,
          funcionUID: "CRDRNR",
          registrationNo: null,
        },
        AddressBirthDetails: {
          presentaddressCountry: data?.AddressBirthDetails?.presentaddressCountry ? data?.AddressBirthDetails?.presentaddressCountry.code : null,
          presentaddressStateName: data?.AddressBirthDetails?.presentaddressStateName
            ? data?.AddressBirthDetails?.presentaddressStateName.code
            : null,
          presentInsideKeralaLBName: data?.AddressBirthDetails?.presentInsideKeralaLBName
            ? data?.AddressBirthDetails?.presentInsideKeralaLBName.code
            : null,
          presentInsideKeralaDistrict: data?.AddressBirthDetails?.presentInsideKeralaDistrict
            ? data?.AddressBirthDetails?.presentInsideKeralaDistrict.code
            : null,
          presentInsideKeralaTaluk: data?.AddressBirthDetails?.presentInsideKeralaTaluk
            ? data?.AddressBirthDetails?.presentInsideKeralaTaluk.code
            : null,
          presentInsideKeralaVillage: data?.AddressBirthDetails?.presentInsideKeralaVillage
            ? data?.AddressBirthDetails?.presentInsideKeralaVillage.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.AddressBirthDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.AddressBirthDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.AddressBirthDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.AddressBirthDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPincode: data?.AddressBirthDetails?.presentInsideKeralaPincode
            ? data?.AddressBirthDetails?.presentInsideKeralaPincode
            : null,
          presentInsideKeralaPostOffice: data?.AddressBirthDetails?.presentInsideKeralaPostOffice
            ? data?.AddressBirthDetails?.presentInsideKeralaPostOffice.code
            : null,
          presentWardNo: data?.AddressBirthDetails?.presentWardNo ? data?.AddressBirthDetails?.presentWardNo.code : null,
          presentOutsideKeralaDistrict: data?.AddressBirthDetails?.presentOutsideKeralaDistrict
            ? data?.AddressBirthDetails?.presentOutsideKeralaDistrict.code
            : null,
          presentOutsideKeralaTaluk: data?.AddressBirthDetails?.presentOutsideKeralaTaluk
            ? data?.AddressBirthDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.AddressBirthDetails?.presentOutsideKeralaVillage
            ? data?.AddressBirthDetails?.presentOutsideKeralaVillage.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.AddressBirthDetails?.presentOutsideKeralaPincode
            ? data?.AddressBirthDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn,
          presentOutsideKeralaPostOfficeMl: data?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl,
          presentOutsideKeralaLocalityNameEn: data?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn,
          presentOutsideKeralaStreetNameEn: data?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn,
          presentOutsideKeralaHouseNameEn: data?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn,
          presentOutsideKeralaLocalityNameMl: data?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl,
          presentOutsideKeralaStreetNameMl: data?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl,
          presentOutsideKeralaHouseNameMl: data?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl,
          presentOutSideIndiaAdressEn: data?.AddressBirthDetails?.presentOutSideIndiaAdressEn,
          presentOutSideIndiaAdressMl: data?.AddressBirthDetails?.presentOutSideIndiaAdressMl,
          presentOutSideIndiaAdressEnB: data?.AddressBirthDetails?.presentOutSideIndiaAdressEnB,
          presentOutSideIndiaAdressMlB: data?.AddressBirthDetails?.presentOutSideIndiaAdressMlB,
          presentOutSideIndiaProvinceEn: data?.AddressBirthDetails?.presentOutSideIndiaProvinceEn,
          presentOutSideIndiaProvinceMl: data?.AddressBirthDetails?.presentOutSideIndiaProvinceMl,          
          presentOutSideCountry: data?.AddressBirthDetails?.presentOutSideCountry ? data?.AddressBirthDetails?.presentOutSideCountry.code : null,
          presentOutSideIndiaadrsVillage: data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage
            ? data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown,
          isPrsentAddress: data?.AddressBirthDetails?.isPrsentAddress,
          permtaddressCountry: data?.AddressBirthDetails?.permtaddressCountry ? data?.AddressBirthDetails?.permtaddressCountry.code : null,
          permtaddressStateName: data?.AddressBirthDetails?.permtaddressStateName ? data?.AddressBirthDetails?.permtaddressStateName.code : null,
          permntInKeralaAdrLBName: data?.AddressBirthDetails?.permntInKeralaAdrLBName
            ? data?.AddressBirthDetails?.permntInKeralaAdrLBName.code
            : null,
          permntInKeralaAdrDistrict: data?.AddressBirthDetails?.permntInKeralaAdrDistrict
            ? data?.AddressBirthDetails?.permntInKeralaAdrDistrict.code
            : null,
          permntInKeralaAdrTaluk: data?.AddressBirthDetails?.permntInKeralaAdrTaluk ? data?.AddressBirthDetails?.permntInKeralaAdrTaluk.code : null,
          permntInKeralaAdrVillage: data?.AddressBirthDetails?.permntInKeralaAdrVillage
            ? data?.AddressBirthDetails?.permntInKeralaAdrVillage.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrStreetNameEn: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn,
          permntInKeralaAdrHouseNameEn: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.AddressBirthDetails?.permntInKeralaAdrPincode
            ? data?.AddressBirthDetails?.permntInKeralaAdrPincode
            : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice
            ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code
            : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict
            ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code
            : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk
            ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk
            : null,
          permntOutsideKeralaVillage: data?.AddressBirthDetails?.permntOutsideKeralaVillage
            ? data?.AddressBirthDetails?.permntOutsideKeralaVillage.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn,
          permntOutsideKeralaPincode: data?.AddressBirthDetails?.permntOutsideKeralaPincode,
          permntOutsideKeralaLocalityNameEn: data?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn,
          permntOutsideKeralaStreetNameEn: data?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn,
          permntOutsideKeralaHouseNameEn: data?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn,
          permntOutsideKeralaLocalityNameMl: data?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl,
          permntOutsideKeralaStreetNameMl: data?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl,
          permntOutsideKeralaHouseNameMl: data?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl,
          permntOutsideKeralaPostOfficeEn: data?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn,
          permntOutsideKeralaPostOfficeMl: data?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl,
          permntOutsideIndiaLineoneEn: data?.AddressBirthDetails?.permntOutsideIndiaLineoneEn,
          permntOutsideIndiaLineoneMl: data?.AddressBirthDetails?.permntOutsideIndiaLineoneMl,
          permntOutsideIndiaLinetwoEn: data?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn,
          permntOutsideIndiaLinetwoMl: data?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl,
          permntOutsideIndiaprovinceEn: data?.AddressBirthDetails?.permntOutsideIndiaprovinceEn,
          permntOutsideIndiaprovinceMl :data?.AddressBirthDetails?.permntOutsideIndiaprovinceMl,
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage
            ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code
            : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
          PresentAddrTypeId: "P",
          PermanentAddrTypeId: "R",
        },
        FamilyInformationDeath: {
          SpouseUnavailable: data?.FamilyInformationDeath?.SpouseUnavailable,
          SpouseType: data?.FamilyInformationDeath?.SpouseType ? data?.FamilyInformationDeath?.SpouseType.code : null,
          SpouseNameEn: data?.FamilyInformationDeath?.SpouseNameEn ? data?.FamilyInformationDeath?.SpouseNameEn : null,
          SpouseNameML: data?.FamilyInformationDeath?.SpouseNameML ? data?.FamilyInformationDeath?.SpouseNameML : null,
          spouseAge: data?.FamilyInformationDeath?.spouseAge,
          spouseAgeIfAlive: data?.FamilyInformationDeath?.spouseAgeIfAlive ? data?.FamilyInformationDeath?.spouseAgeIfAlive.code : null,
          FatherUnavailable: data?.FamilyInformationDeath?.FatherUnavailable,
          FatherNameEn: data?.FamilyInformationDeath?.FatherNameEn,
          FatherNameMl: data?.FamilyInformationDeath?.FatherNameMl,
          MotherUnavailable: data?.FamilyInformationDeath?.MotherUnavailable,
          MotherNameEn: data?.FamilyInformationDeath?.MotherNameEn,
          MotherNameMl: data?.FamilyInformationDeath?.MotherNameMl,
          FamilyMobileNo: parseInt(data?.FamilyInformationDeath?.FamilyMobileNo),
          FamilyEmailId: data?.FamilyInformationDeath?.FamilyEmailId,
          SpouseAadhaar: data?.FamilyInformationDeath?.SpouseAadhaar ? data?.FamilyInformationDeath?.SpouseAadhaar : null,
          FatherAadharNo: data?.FamilyInformationDeath?.FatherAadharNo ? data?.FamilyInformationDeath?.FatherAadharNo : null,
          MotherAadharNo: data?.FamilyInformationDeath?.MotherAadharNo ? data?.FamilyInformationDeath?.MotherAadharNo : null,
        },
        StatisticalInfo: {
          StatisticalId: null,
          TenantId: data?.InformationDeath?.tenantId,
          MedicalAttentionType: data?.StatisticalInfo?.MedicalAttentionType ? data?.StatisticalInfo?.MedicalAttentionType.code : null,
          IsAutopsyPerformed: data?.StatisticalInfo?.IsAutopsyPerformed,
          IsAutopsyCompleted: data?.StatisticalInfo?.IsAutopsyCompleted,
          MannerOfDeath: data?.StatisticalInfo?.MannerOfDeath ? data?.StatisticalInfo?.MannerOfDeath.code : null,
          DeathMedicallyCertified: data?.StatisticalInfo?.DeathMedicallyCertified ? data?.StatisticalInfo?.DeathMedicallyCertified.code : null,
          DeathCauseMain: data?.StatisticalInfo?.DeathCauseMain ? data?.StatisticalInfo?.DeathCauseMain.code : null,
          DeathCauseMainCustom: data?.StatisticalInfo?.DeathCauseMainCustom,
          DeathCauseMainInterval: data?.StatisticalInfo?.DeathCauseMainInterval,
          DeathCauseMainTimeUnit: data?.StatisticalInfo?.DeathCauseMainTimeUnit ? data?.StatisticalInfo?.DeathCauseMainTimeUnit.code : null,
          DeathCauseSub: data?.StatisticalInfo?.DeathCauseSub ? data?.StatisticalInfo?.DeathCauseSub.code : null,
          DeathCauseSubCustom: data?.StatisticalInfo?.DeathCauseSubCustom,
          DeathCauseSubInterval: data?.StatisticalInfo?.DeathCauseSubInterval,
          DeathCauseSubTimeUnit: data?.StatisticalInfo?.DeathCauseSubTimeUnit ? data?.StatisticalInfo?.DeathCauseSubTimeUnit.code : null,
          DeathCauseSub2: data?.StatisticalInfo?.DeathCauseSub2 ? data?.StatisticalInfo?.DeathCauseSub2.code : null,
          DeathCauseSubCustom2: data?.StatisticalInfo?.DeathCauseSubCustom2,
          DeathCauseSubInterval2: data?.StatisticalInfo?.DeathCauseSubInterval2,
          DeathCauseSubTimeUnit2: data?.StatisticalInfo?.DeathCauseSubTimeUnit2 ? data?.StatisticalInfo?.DeathCauseSubTimeUnit2.code : null,
          DeathCauseOther: data?.StatisticalInfo?.DeathCauseOther ? data?.StatisticalInfo?.DeathCauseOther.code : null,
          IsdeceasedPregnant: data?.StatisticalInfo?.IsdeceasedPregnant ? data?.StatisticalInfo?.IsdeceasedPregnant.code : null,
          IsDelivery: data?.StatisticalInfo?.IsDelivery ? data?.StatisticalInfo?.IsDelivery.code : null,
          DeathDuringDelivery: data?.StatisticalInfo?.DeathDuringDelivery,
          SmokingType: data?.StatisticalInfo?.SmokingType,
          TobaccoType: data?.StatisticalInfo?.TobaccoType,
          AlcoholType: data?.StatisticalInfo?.AlcoholType,
        },
        InformantDetails: {
          //InformantAadharSubmitted: null,
          InformantAadharNo: data?.InformantDetails?.InformantAadharNo,
          InformantNameEn: data?.InformantDetails?.InformantNameEn,
          DeathSignedOfficerDesignation: data?.InformantDetails?.DeathSignedOfficerDesignation,
          //InformantMobileNo: parseInt(data?.InformantDetails?.InformantMobileNo),
          InformantMobileNo: data?.InformantDetails?.InformantMobileNo,
          InformantAddress: data?.InformantDetails?.InformantAddress ? data?.InformantDetails?.InformantAddress : null,
          IsDeclarationInformant: data?.InformantDetails?.IsDeclarationInformant,        

        },
        Initiator: {
         
          InitiatorRelation: data?.Initiator?.InitiatorRelation ? data?.Initiator?.InitiatorRelation.code : null,         
          InitiatorAadhaar: data?.Initiator?.InitiatorAadhaar,
          InitiatorName: data?.Initiator?.InitiatorName,
          InitiatorMobile: parseInt(data?.Initiator?.InitiatorMobile),
          initiatorDesi: data?.Initiator?.initiatorDesi,
          InitiatorAddress: data?.Initiator?.InitiatorAddress,
          IsDeclarationInitiator: data?.Initiator?.IsDeclarationInitiator,
          isCaretaker: data?.Initiator?.isCaretaker,

         
        },
        DeathNACDocuments: [
          {
            DocumentType: "CR_PROCE_CERTIFICATE_UPLOAD",
            filestoreId: data?.InformationDeath?.uploadedFile ? data?.InformationDeath?.uploadedFile :null,            
            proceedNoRDO: data?.InformationDeath?.proceedNoRDO,
            regNoNAC: data?.InformationDeath?.regNoNAC,
          }
        ],
        Demands: [
          {
            tenantId: data?.InformationDeath?.tenantId,
            consumerCode: data?.InformationDeath?.DeathACKNo,
            consumerType: "FEE",
            businessService: "CR",
            taxPeriodFrom: "1554076800000",
            taxPeriodTo: "1901145600000",
            demandDetails: [
              {
                taxHeadMasterCode: "140130200",
                taxAmount: data?.InformationDeath?.workFlowAmount,
                collectionAmount: 0,
              },
            ],
            minimumAmountPayable: data?.InformationDeath?.workFlowAmount,
            additionalDetails: {
              HI: "Death Digital Payment",
            },
          },
        ],
        AuditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        applicationType: "new",
        businessService: "CR",
        action: "INITIATE",
        assignee: [],
        workflowcode: data?.InformationDeath?.workFlowCode,
        taxHeadMasterCode: "140130200",
        taxAmount: data?.InformationDeath?.workFlowAmount,
        isPayment: data?.InformationDeath?.isPayment,
        applicationStatus: data?.InformationDeath?.isPayment ? "PENDINGPAYMENT" : "INITIATED",
      },
      
    ],
  
  };
  return formdata;
};
export const convertToEditDeathRegistration = (data = {}) => {
  // let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const empTenantId = Digit.ULBService.getCurrentUlb();
  // let tenantId = "";
  // tenantId = empTenantId["code"];
  // console.log(data);
  // console.log(data?.InformationDeath?.workFlowCode);

  const formdata = {
    deathCertificateDtls: [
      {
        InformationDeath: {
          Id: null,
          RegistrationUnit: null,
          TenantId: data?.InformationDeath?.tenantId,
          DeathDateUnavailable: data?.InformationDeath?.DeathDateUnavailable,
          DateOfDeath: Date.parse(data?.InformationDeath?.DateOfDeath),
          TimeOfDeath: parseInt(data?.InformationDeath?.TimeOfDeath),
          TimeOfDeathUnit: "AM",
          DateOfDeath1: Date.parse(data?.InformationDeath?.DateOfDeath1),    
          tenantid: data?.InformationDeath?.tenantId,     
          DeathPlace: data?.InformationDeath?.DeathPlace ? data?.InformationDeath?.DeathPlace.code : null,
          DeathPlaceType: data?.InformationDeath?.DeathPlaceType ? data?.InformationDeath?.DeathPlaceType?.code : null,
          hospitalNameEn: data?.InformationDeath?.hospitalNameEn ? data?.InformationDeath?.hospitalNameEn.hospitalName : null,         
          hospitalNameMl: data?.InformationDeath?.hospitalName ? data?.InformationDeath?.hospitalName.hospitalNamelocal : null,         
         DeathPlaceTypecode: data?.InformationDeath?.DeathPlaceType ? data?.InformationDeath?.DeathPlaceType.code : null,
         institution: data?.InformationDeath?.institution ? data?.InformationDeath?.InstitutionIdMl.code : null,
         DeathPlaceInstId: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.DeathPlaceInstId?.code : null,
         InstitutionIdMl: data?.InformationDeath?.InstitutionIdMl ? data?.InformationDeath?.InstitutionIdMl.institutionNamelocal : null,
          DeathPlaceInstitutionNameEn: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.DeathPlaceInstId.institutionName : null,
          DeathPlaceInstitutionNameMl: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.InstitutionIdMl.institutionNamelocal : null,                            
          VehicleNumber: data?.InformationDeath?.VehicleNumber,
          VehicleFromplaceEn: data?.InformationDeath?.VehicleFromplaceEn,
          VehicleFromplaceMl: data?.InformationDeath?.VehicleFromplaceMl,
          VehicleToPlaceEn: data?.InformationDeath?.VehicleToPlaceEn,
          VehicleToPlaceMl: data?.InformationDeath?.VehicleToPlaceMl,
          VehicleFirstHalt: data?.InformationDeath?.VehicleFirstHalt,
          VehicleFirstHaltMl: data?.InformationDeath?.VehicleFirstHaltMl,
          VehicleHospitalEn: data?.InformationDeath?.VehicleHospitalEn ? data?.InformationDeath?.VehicleHospitalEn?.code : null,
          DeathPlaceCountry: data?.InformationDeath?.DeathPlaceCountry ? data?.InformationDeath?.DeathPlaceCountry?.code : null,
          DeathPlaceState: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState?.code : null,
          DeathPlaceDistrict: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState?.code : null,
          DeathPlaceCity: data?.InformationDeath?.DeathPlaceCity,
          DeathPlaceRemarksEn: data?.InformationDeath?.DeathPlaceRemarksEn,
          DeathPlaceRemarksMl: data?.InformationDeath?.DeathPlaceRemarksMl,
          DeathPlaceWardId: data?.InformationDeath?.DeathPlaceWardId ? data?.InformationDeath?.DeathPlaceWardId?.code : null,
          PlaceOfBurialEn: data?.InformationDeath?.PlaceOfBurialEn,
          PlaceOfBurialMl: data?.InformationDeath?.PlaceOfBurialMl,
          DeathPlaceLocalityEn: data?.InformationDeath?.DeathPlaceLocalityEn,
          DeathPlaceLocalityMl: data?.InformationDeath?.DeathPlaceLocalityMl,
          DeathPlaceStreetEn: data?.InformationDeath?.DeathPlaceStreetEn,
          DeathPlaceStreetMl: data?.InformationDeath?.DeathPlaceStreetMl,
          GeneralRemarks: data?.InformationDeath?.GeneralRemarks,
          DeathPlaceHomeWardId: data?.InformationDeath?.DeathPlaceHomeWardId ? data?.InformationDeath?.DeathPlaceHomeWardId?.code : null,
          DeathPlaceHomePostofficeId: data?.InformationDeath?.DeathPlaceHomePostofficeId
            ? data?.InformationDeath.DeathPlaceHomePostofficeId?.code
            : null,
          DeathPlaceHomePincode: data?.InformationDeath?.DeathPlaceHomePincode ? data?.InformationDeath?.DeathPlaceHomePincode?.code : null,
          DeathPlaceHomeLocalityEn: data?.InformationDeath?.DeathPlaceHomeLocalityEn ? data?.InformationDeath?.DeathPlaceHomeLocalityEn : null,
          DeathPlaceHomeLocalityMl: data?.InformationDeath?.DeathPlaceHomeLocalityMl ? data?.InformationDeath?.DeathPlaceHomeLocalityMl : null,
          DeathPlaceHomeStreetNameEn: data?.InformationDeath?.DeathPlaceHomeStreetNameEn ? data?.InformationDeath?.DeathPlaceHomeStreetNameEn : null,
          DeathPlaceHomeStreetNameMl: data?.InformationDeath?.DeathPlaceHomeStreetNameMl ? data?.InformationDeath?.DeathPlaceHomeStreetNameMl : null,
          DeathPlaceHomeHoueNameEn: data?.InformationDeath?.DeathPlaceHomeHoueNameEn ? data?.InformationDeath?.DeathPlaceHomeHoueNameEn : null,
          DeathPlaceHomeHoueNameMl: data?.InformationDeath?.DeathPlaceHomeHoueNameMl ? data?.InformationDeath?.DeathPlaceHomeHoueNameMl : null,
          DeceasedAadharNotAvailable: data?.InformationDeath?.DeceasedAadharNotAvailable ? data?.InformationDeath?.DeceasedAadharNotAvailable : false,
          DeceasedAadharNumber: data?.InformationDeath?.DeceasedAadharNumber,
          DeceasedIdproofType: data?.InformationDeath?.DeceasedIdproofType ? data?.InformationDeath.DeceasedIdproofType?.code : null,
          DeceasedIdproofNo: data?.InformationDeath?.DeceasedIdproofNo,
          DeceasedFirstNameEn: data?.InformationDeath?.DeceasedFirstNameEn,
          DeceasedMiddleNameEn: data?.InformationDeath?.DeceasedMiddleNameEn,
          DeceasedLastNameEn: data?.InformationDeath?.DeceasedLastNameEn,
          DeceasedFirstNameMl: data?.InformationDeath?.DeceasedFirstNameMl,
          DeceasedMiddleNameMl: data?.InformationDeath?.DeceasedMiddleNameMl,
          DeceasedLastNameMl: data?.InformationDeath?.DeceasedLastNameMl,
          Age: parseInt(data?.InformationDeath?.Age),
          AgeUnit: data?.InformationDeath?.AgeUnit?.code,
          DeceasedGender: data?.InformationDeath?.DeceasedGender?.code,
          Nationality: data?.InformationDeath?.Nationality?.code,
          Religion: data?.InformationDeath?.Religion?.code,
          Occupation: data?.InformationDeath?.Occupation ? data?.InformationDeath?.Occupation?.code : null,
          funcionUID: "CRDRNR",
          DeathACKNo: data?.InformationDeath?.DeathACKNo,
        },
        AddressBirthDetails: {
          presentaddressCountry: data?.InformationDeath?.AddressBirthDetails?.presentaddressCountry ? data?.InformationDeath?.AddressBirthDetails?.presentaddressCountry?.code : null,
          presentaddressStateName: data?.InformationDeath?.AddressBirthDetails?.presentaddressStateName
            ? data?.InformationDeath?.AddressBirthDetails?.presentaddressStateName?.code
            : null,
          presentInsideKeralaLBName: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaLBName
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaLBName?.code
            : null,
          presentInsideKeralaDistrict: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaDistrict
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaDistrict?.code
            : null,
          presentInsideKeralaTaluk: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaTaluk
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaTaluk?.code
            : null,
          presentInsideKeralaVillage: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaVillage
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaVillage?.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPincode: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaPincode
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaPincode
            : null,
          presentInsideKeralaPostOffice: data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaPostOffice
            ? data?.InformationDeath?.AddressBirthDetails?.presentInsideKeralaPostOffice?.code
            : null,
          presentWardNo: data?.InformationDeath?.AddressBirthDetails?.presentWardNo ? data?.InformationDeath?.AddressBirthDetails?.presentWardNo?.code : null,
          presentOutsideKeralaDistrict: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaDistrict
            ? data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaDistrict?.code
            : null,
          presentOutsideKeralaTaluk: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaTaluk
            ? data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaVillage
            ? data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaVillage?.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaPincode
            ? data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaPostOfficeEn,
          presentOutsideKeralaPostOfficeMl: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaPostOfficeMl,
          presentOutsideKeralaLocalityNameEn: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaLocalityNameEn,
          presentOutsideKeralaStreetNameEn: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaStreetNameEn,
          presentOutsideKeralaHouseNameEn: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaHouseNameEn,
          presentOutsideKeralaLocalityNameMl: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaLocalityNameMl,
          presentOutsideKeralaStreetNameMl: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaStreetNameMl,
          presentOutsideKeralaHouseNameMl: data?.InformationDeath?.AddressBirthDetails?.presentOutsideKeralaHouseNameMl,
          presentOutSideIndiaAdressEn: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaAdressEn,
          presentOutSideIndiaAdressMl: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaAdressMl,
          presentOutSideIndiaAdressEnB: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaAdressEnB,
          presentOutSideIndiaAdressMlB: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaAdressMlB,
          presentOutSideIndiaProvinceEn: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaProvinceEn,
          presentOutSideIndiaProvinceMl: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaProvinceMl,
          presentOutSideCountry: data?.InformationDeath?.AddressBirthDetails?.presentOutSideCountry ? data?.InformationDeath?.AddressBirthDetails?.presentOutSideCountry?.code : null,
          presentOutSideIndiaadrsVillage: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaadrsVillage
            ? data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaadrsVillage?.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.InformationDeath?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown,
          isPrsentAddress: data?.InformationDeath?.AddressBirthDetails?.isPrsentAddress,
          permtaddressCountry: data?.InformationDeath?.AddressBirthDetails?.permtaddressCountry ? data?.InformationDeath?.AddressBirthDetails?.permtaddressCountry?.code : null,
          permtaddressStateName: data?.InformationDeath?.AddressBirthDetails?.permtaddressStateName ? data?.InformationDeath?.AddressBirthDetails?.permtaddressStateName?.code : null,
          permntInKeralaAdrLBName: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrLBName
            ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrLBName?.code
            : null,
          permntInKeralaAdrDistrict: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrDistrict
            ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrDistrict?.code
            : null,
          permntInKeralaAdrTaluk: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrTaluk ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrTaluk?.code : null,
          permntInKeralaAdrVillage: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrVillage
            ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrVillage?.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrStreetNameEn: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn,
          permntInKeralaAdrHouseNameEn: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrPincode
            ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrPincode
            : null,
          permntInKeralaAdrPostOffice: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrPostOffice
            ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaAdrPostOffice?.code
            : null,
          permntInKeralaWardNo: data?.InformationDeath?.AddressBirthDetails?.permntInKeralaWardNo ? data?.InformationDeath?.AddressBirthDetails?.permntInKeralaWardNo?.code : null,
          permntOutsideKeralaDistrict: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaDistrict
            ? data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaDistrict?.code
            : null,
          permntOutsideKeralaTaluk: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaTaluk
            ? data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaTaluk
            : null,
          permntOutsideKeralaVillage: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaVillage
            ? data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaVillage?.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn,
          permntOutsideKeralaPincode: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaPincode,
          permntOutsideKeralaLocalityNameEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn,
          permntOutsideKeralaStreetNameEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn,
          permntOutsideKeralaHouseNameEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn,
          permntOutsideKeralaLocalityNameMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaLocalityNameMl,
          permntOutsideKeralaStreetNameMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaStreetNameMl,
          permntOutsideKeralaHouseNameMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaHouseNameMl,
          permntOutsideKeralaPostOfficeEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn,
          permntOutsideKeralaPostOfficeMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideKeralaPostOfficeMl,
          permntOutsideIndiaLineoneEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaLineoneEn,
          permntOutsideIndiaLineoneMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaLineoneMl,
          permntOutsideIndiaLinetwoEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn,
          permntOutsideIndiaLinetwoMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaLinetwoMl,
          permntOutsideIndiaprovinceEn: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaprovinceEn,
          permntOutsideIndiaprovinceMl: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaprovinceMl,
          permntOutsideIndiaVillage: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaVillage
            ? data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaVillage?.code
            : null,
          permntOutsideIndiaCityTown: data?.InformationDeath?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.InformationDeath?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
          PresentAddrTypeId: "P",
          PermanentAddrTypeId: "R",
        },
        FamilyInformationDeath: {
          SpouseUnavailable: data?.InformationDeath?.FamilyInformationDeath?.SpouseUnavailable,
          SpouseType: data?.InformationDeath?.FamilyInformationDeath?.SpouseType ? data?.InformationDeath?.FamilyInformationDeath?.SpouseType?.code : null,
          SpouseNameEn: data?.InformationDeath?.FamilyInformationDeath?.SpouseNameEN ? data?.InformationDeath?.FamilyInformationDeath?.SpouseNameEN : null,
          SpouseNameML: data?.InformationDeath?.FamilyInformationDeath?.SpouseNameMl ? data?.InformationDeath?.FamilyInformationDeath?.SpouseNameMl : null,
          spouseAge: data?.FamilyInformationDeath?.spouseAge ? data?.FamilyInformationDeath?.spouseAge : data?.InformationDeath?.FamilyInformationDeath?.spouseAge,
          spouseAgeIfAlive: data?.FamilyInformationDeath?.spouseAgeIfAlive ? data?.FamilyInformationDeath?.spouseAgeIfAlive.code :
          data?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive ? data?.InformationDeath?.FamilyInformationDeath?.spouseAgeIfAlive : null,          
          FatherUnavailable: data?.InformationDeath?.FamilyInformationDeath?.FatherUnavailable,
          FatherNameEn: data?.InformationDeath?.FamilyInformationDeath?.FatherNameEn,
          FatherNameMl: data?.InformationDeath?.FamilyInformationDeath?.FatherNameMl,
          MotherUnavailable: data?.InformationDeath?.FamilyInformationDeath?.MotherUnavailable,
          MotherNameEn: data?.InformationDeath?.FamilyInformationDeath?.MotherNameEn,
          MotherNameMl: data?.InformationDeath?.FamilyInformationDeath?.MotherNameMl,
          FamilyMobileNo: parseInt(data?.InformationDeath?.FamilyInformationDeath?.FamilyMobileNo),
          FamilyEmailId: data?.InformationDeath?.FamilyInformationDeath?.FamilyEmailId,
          SpouseAadhaar: data?.InformationDeath?.FamilyInformationDeath?.SpouseAadhaar ? data?.InformationDeath?.FamilyInformationDeath?.SpouseAadhaar : null,
          FatherAadharNo: data?.InformationDeath?.FamilyInformationDeath?.FatherAadharNo ? data?.InformationDeath?.FamilyInformationDeath?.FatherAadharNo : null,
          MotherAadharNo: data?.InformationDeath?.FamilyInformationDeath?.MotherAadharNo ? data?.InformationDeath?.FamilyInformationDeath?.MotherAadharNo : null,
        },
        StatisticalInfo: {
          StatisticalId: null,
          TenantId: data?.InformationDeath?.InformationDeath?.tenantId,
          MedicalAttentionType: data?.InformationDeath?.StatisticalInfo?.MedicalAttentionType ? data?.InformationDeath?.StatisticalInfo?.MedicalAttentionType?.code : null,
          IsAutopsyPerformed: data?.InformationDeath?.StatisticalInfo?.IsAutopsyPerformed,
          IsAutopsyCompleted: data?.InformationDeath?.StatisticalInfo?.IsAutopsyCompleted,
          MannerOfDeath: data?.InformationDeath?.StatisticalInfo?.MannerOfDeath ? data?.InformationDeath?.StatisticalInfo?.MannerOfDeath?.code : null,
          DeathMedicallyCertified: data?.InformationDeath?.StatisticalInfo?.DeathMedicallyCertified ? data?.InformationDeath?.StatisticalInfo?.DeathMedicallyCertified?.code : null,
          DeathCauseMain: data?.InformationDeath?.StatisticalInfo?.DeathCauseMain ? data?.InformationDeath?.StatisticalInfo?.DeathCauseMain?.code : null,
          DeathCauseMainCustom: data?.InformationDeath?.StatisticalInfo?.DeathCauseMainCustom,
          DeathCauseMainInterval: data?.InformationDeath?.StatisticalInfo?.DeathCauseMainInterval,
          DeathCauseMainTimeUnit: data?.InformationDeath?.StatisticalInfo?.DeathCauseMainTimeUnit ? data?.InformationDeath?.StatisticalInfo?.DeathCauseMainTimeUnit?.code : null,
          DeathCauseSub: data?.InformationDeath?.StatisticalInfo?.DeathCauseSub ? data?.InformationDeath?.StatisticalInfo?.DeathCauseSub?.code : null,
          DeathCauseSubCustom: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubCustom,
          DeathCauseSubInterval: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubInterval,
          DeathCauseSubTimeUnit: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubTimeUnit ? data?.InformationDeath?.StatisticalInfo?.DeathCauseSubTimeUnit?.code : null,
          DeathCauseSub2: data?.InformationDeath?.StatisticalInfo?.DeathCauseSub2 ? data?.InformationDeath?.StatisticalInfo?.DeathCauseSub2?.code : null,
          DeathCauseSubCustom2: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubCustom2,
          DeathCauseSubInterval2: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubInterval2,
          DeathCauseSubTimeUnit2: data?.InformationDeath?.StatisticalInfo?.DeathCauseSubTimeUnit2 ? data?.InformationDeath?.StatisticalInfo?.DeathCauseSubTimeUnit2?.code : null,
          DeathCauseOther: data?.InformationDeath?.StatisticalInfo?.DeathCauseOther ? data?.InformationDeath?.StatisticalInfo?.DeathCauseOther?.code : null,
          IsdeceasedPregnant: data?.InformationDeath?.StatisticalInfo?.IsdeceasedPregnant ? data?.InformationDeath?.StatisticalInfo?.IsdeceasedPregnant?.code : null,
          IsDelivery: data?.InformationDeath?.StatisticalInfo?.IsDelivery ? data?.InformationDeath?.StatisticalInfo?.IsDelivery?.code : null,
          DeathDuringDelivery: data?.InformationDeath?.StatisticalInfo?.DeathDuringDelivery,
          SmokingType: data?.InformationDeath?.StatisticalInfo?.SmokingType,
          TobaccoType: data?.InformationDeath?.StatisticalInfo?.TobaccoType,
          AlcoholType: data?.InformationDeath?.StatisticalInfo?.AlcoholType,
        },
        InformantDetails: {
         // InformantAadharSubmitted: null,
          InformantAadharNo: data?.InformationDeath ?.InformantDetails?.InformantAadharNo,
          InformantNameEn:data?.InformationDeath ?.InformantDetails?.InformantNameEn,
          DeathSignedOfficerDesignation: data?.InformationDeath ?.InformantDetails?.DeathSignedOfficerDesignation,
          InformantMobileNo:data?.InformationDeath ?.InformantDetails?.InformantMobileNo,         
          InformantAddress: data?.InformationDeath?.InformantDetails?.InformantAddress,
          IsDeclarationInformant: data?.InformationDeath ?.InformantDetails?.IsDeclarationInformant,
          // InformantDocumentId: null,
          // InformantDocumentDeathDtlId: null,
          // InformantDocumentTenantId: data?.InformationDeath?.tenantId,
          // InformantDocumentAckNo: null,
          // InformantDocumentType: null,
          // InformantDocumentUserType: null,
          // InformantDocumentFileStoreId: null,
        },
        Initiator: {
          IsDeclarationInitiator: data?.InformationDeath ?.Initiator?.IsDeclarationInitiator,
          InitiatorRelation:  data?.InformationDeath ?.Initiator?.InitiatorRelation,
          InitiatorAadhaar: data?.InformationDeath ?.Initiator?.InitiatorAadhaar,
          InitiatorName:  data?.InformationDeath ?.Initiator?.InitiatorName,
          InitiatorMobile:  data?.InformationDeath ?.Initiator?.InitiatorMobile,
          InitiatorAddress:data?.InformationDeath ?.Initiator?.InitiatorAddress,
          isCaretaker: data?.InformationDeath ?.Initiator?.isCaretaker,
          // InitiatorDocumentId: null,
          // InitiatorDocumentTenantId: data?.InformationDeath?.tenantId,
          // InitiatorDocumentAckNo: null,
          // InitiatorDocumentType: null,
          // InitiatorDocumentUserType: null,
          // InitiatorDocumentFileStoreId: null,

          
        },

        AuditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        applicationType: "new",
        businessService: "CR",
        action: "APPLY",
        applicationStatus: "",
        workflowcode: data?.InformationDeath?.workFlowCode,
        isWorkflow: data?.InformationDeath.isWorkflow,
        id: data?.InformationDeath?.id,
        assignee: [data?.InformationDeath?.uuid],
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
