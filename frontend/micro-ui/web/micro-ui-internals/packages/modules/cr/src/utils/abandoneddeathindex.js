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


// let document =[];
//       let doc= {"documentType": "" ,
//           "fileStoreId":"",
//           "documentName":"", 
//           "size":"",
//           "type" :"" };

//       let doc1= {"documentType": "" ,
//           "fileStoreId":"",
//           "documentName":"", 
//           "size":"",
//           "type" :"" }; 

// document.push(doc);
// document.push(doc1);
// console.log(document);
// // }

export const convertToAbandonedDeathRegistration = (data = {}) => {
  // let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const empTenantId = Digit.ULBService.getCurrentUlb();
  // let tenantId = "";
  // tenantId = empTenantId["code"];
  const formdata = {
    deathAbandonedDtls: [
      {
        InformationDeathAbandoned: {
          Id: null,
          RegistrationUnit: null,
          TenantId: data?.InformationDeathAband?.tenantId,
          DeathDateUnavailable: data?.InformationDeathAband?.DeathDateUnavailable,
          DateOfDeath: Date.parse(data?.InformationDeathAband?.DateOfDeath),
          TimeOfDeath: parseInt(data?.InformationDeathAband?.TimeOfDeath),
          TimeOfDeathUnit: "AM",
          DateOfDeath1: Date.parse(data?.InformationDeathAband?.DateOfDeath1),
          DeathPlace: data?.InformationDeathAband?.DeathPlace.code,
          DeathPlaceType: data?.InformationDeathAband?.DeathPlaceType ? data?.InformationDeathAband?.DeathPlaceType.code : null,
          DeathPlaceInstId: data?.InformationDeathAband?.DeathPlaceInstId ? data?.InformationDeathAband?.DeathPlaceInstId.code : null,
          VehicleNumber: data?.InformationDeathAband?.VehicleNumber,
          VehicleFromplaceEn: data?.InformationDeathAband?.VehicleFromplaceEn,
          VehicleFromplaceMl: data?.InformationDeathAband?.VehicleFromplaceMl,
          VehicleToPlaceEn: data?.InformationDeathAband?.VehicleToPlaceEn,
          VehicleToPlaceMl: data?.InformationDeathAband?.VehicleToPlaceMl,
          VehicleFirstHalt: data?.InformationDeathAband?.VehicleFirstHalt,
          VehicleFirstHaltMl: data?.InformationDeathAband?.VehicleFirstHaltMl,
          VehicleHospitalEn: data?.InformationDeathAband?.VehicleHospitalEn ? data?.InformationDeathAband?.VehicleHospitalEn.code : null,
          DeathPlaceCountry: data?.InformationDeathAband?.DeathPlaceCountry ? data?.InformationDeathAband?.DeathPlaceCountry.code : null,
          DeathPlaceState: data?.InformationDeathAband?.DeathPlaceState ? data?.InformationDeathAband?.DeathPlaceState.code : null,
          DeathPlaceDistrict: data?.InformationDeathAband?.DeathPlaceState ? data?.InformationDeathAband?.DeathPlaceState.code : null,
          DeathPlaceCity: data?.InformationDeathAband?.DeathPlaceCity,
          DeathPlaceRemarksEn: data?.InformationDeathAband?.DeathPlaceRemarksEn,
          DeathPlaceRemarksMl: data?.InformationDeathAband?.DeathPlaceRemarksMl,
          DeathPlaceWardId: data?.InformationDeathAband?.DeathPlaceWardId ? data?.InformationDeathAband?.DeathPlaceWardId.code : null,
          PlaceOfBurialEn: data?.InformationDeathAband?.PlaceOfBurialEn,
          PlaceOfBurialMl: data?.InformationDeathAband?.PlaceOfBurialMl,
          DeathPlaceLocalityEn: data?.InformationDeathAband?.DeathPlaceLocalityEn,
          DeathPlaceLocalityMl: data?.InformationDeathAband?.DeathPlaceLocalityMl,
          DeathPlaceStreetEn: data?.InformationDeathAband?.DeathPlaceStreetEn,
          DeathPlaceStreetMl: data?.InformationDeathAband?.DeathPlaceStreetMl,
          GeneralRemarks: data?.InformationDeathAband?.GeneralRemarks,
          DeathPlaceHomeWardId: data?.InformationDeathAband?.DeathPlaceHomeWardId ? data?.InformationDeathAband?.DeathPlaceHomeWardId.code : null,
          DeathPlaceHomePostofficeId: data?.InformationDeathAband?.DeathPlaceHomePostofficeId
            ? data?.InformationDeathAband.DeathPlaceHomePostofficeId.code
            : null,
          DeathPlaceHomePincode: data?.InformationDeathAband?.DeathPlaceHomePincode ? data?.InformationDeathAband?.DeathPlaceHomePincode.code : null,
          DeathPlaceHomeLocalityEn: data?.InformationDeathAband?.DeathPlaceHomeLocalityEn ? data?.InformationDeathAband?.DeathPlaceHomeLocalityEn : null,
          DeathPlaceHomeLocalityMl: data?.InformationDeathAband?.DeathPlaceHomeLocalityMl ? data?.InformationDeathAband?.DeathPlaceHomeLocalityMl : null,
          DeathPlaceHomeStreetNameEn: data?.InformationDeathAband?.DeathPlaceHomeStreetNameEn ? data?.InformationDeathAband?.DeathPlaceHomeStreetNameEn : null,
          DeathPlaceHomeStreetNameMl: data?.InformationDeathAband?.DeathPlaceHomeStreetNameMl ? data?.InformationDeathAband?.DeathPlaceHomeStreetNameMl : null,
          DeathPlaceHomeHoueNameEn: data?.InformationDeathAband?.DeathPlaceHomeHoueNameEn ? data?.InformationDeathAband?.DeathPlaceHomeHoueNameEn : null,
          DeathPlaceHomeHoueNameMl: data?.InformationDeathAband?.DeathPlaceHomeHoueNameMl ? data?.InformationDeathAband?.DeathPlaceHomeHoueNameMl : null,
          DeceasedAadharNotAvailable: data?.InformationDeathAband?.DeceasedAadharNotAvailable ? data?.InformationDeathAband?.DeceasedAadharNotAvailable : false,
          DeceasedAadharNumber: data?.InformationDeathAband?.DeceasedAadharNumber,
          DeceasedIdproofType: data?.InformationDeathAband?.DeceasedIdproofType ? data?.InformationDeathAband.DeceasedIdproofType.code : null,
          DeceasedIdproofNo: data?.InformationDeathAband?.DeceasedIdproofNo,
          DeceasedFirstNameEn: data?.InformationDeathAband?.DeceasedFirstNameEn,
          DeceasedMiddleNameEn: data?.InformationDeathAband?.DeceasedMiddleNameEn,
          DeceasedLastNameEn: data?.InformationDeathAband?.DeceasedLastNameEn,
          DeceasedFirstNameMl: data?.InformationDeathAband?.DeceasedFirstNameMl,
          DeceasedMiddleNameMl: data?.InformationDeathAband?.DeceasedMiddleNameMl,
          DeceasedLastNameMl: data?.InformationDeathAband?.DeceasedLastNameMl,
          Age: parseInt(data?.InformationDeathAband?.Age),
          AgeUnit: data?.InformationDeathAband?.AgeUnit.code,
          DeceasedGender: data?.InformationDeathAband?.DeceasedGender?.code,
          Nationality: data?.InformationDeathAband?.Nationality.code,
          Religion: data?.InformationDeathAband?.Religion.code,
          Occupation: data?.InformationDeathAband?.Occupation ? data?.InformationDeathAband?.Occupation.code : null,
          funcionUID: "CRDRAB",
          registrationNo: null,
          BurialDistrict: data?.InformationDeathAband?.BurialDistrict ? data?.InformationDeathAband?.BurialDistrict.code : null,
          BurialLBType: data?.InformationDeathAband?.BurialLBType ? data?.InformationDeathAband?.BurialLBType.code : null,
          BurialLBName: data?.InformationDeathAband?.BurialLBName ? data?.InformationDeathAband?.BurialLBName.code : null,
          BurialLBWard: data?.InformationDeathAband?.BurialLBWard ? data?.InformationDeathAband?.BurialLBWard.code : null,
          PlaceOfBurialEn: data?.InformationDeathAband?.PlaceOfBurialEn ? data?.InformationDeathAband?.PlaceOfBurialEn.code : null,
          PlaceOfBurialMl: data?.InformationDeathAband?.PlaceOfBurialMl ? data?.InformationDeathAband?.PlaceOfBurialMl.code : null,
          BurialDescription: data?.InformationDeathAband?.BurialDescription ? data?.InformationDeathAband?.BurialDescription.code : null,
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
            ? data?.AddressBirthDetails?.presentInsideKeralaPincode.code
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
            ? data?.AddressBirthDetails?.presentOutsideKeralaPincode.code
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
            ? data?.AddressBirthDetails?.permntInKeralaAdrPincode.code
            : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice
            ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code
            : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict
            ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code
            : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk
            ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk.code
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
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage
            ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code
            : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
          PresentAddrTypeId: "P",
          PermanentAddrTypeId: "R",
        },
        FamilyInfoDeathAbandoned: {
          SpouseUnavailable: data?.FamilyAbandonedDeath?.SpouseUnavailable,
          SpouseType: data?.FamilyAbandonedDeath?.SpouseType ? data?.FamilyAbandonedDeath?.SpouseType.code : null,
          SpouseNameEn: data?.FamilyAbandonedDeath?.SpouseNameEN ? data?.FamilyAbandonedDeath?.SpouseNameEN : null,
          SpouseNameML: data?.FamilyAbandonedDeath?.SpouseNameMl ? data?.FamilyAbandonedDeath?.SpouseNameMl : null,
          FatherUnavailable: data?.FamilyAbandonedDeath?.FatherUnavailable,
          FatherNameEn: data?.FamilyAbandonedDeath?.FatherNameEn,
          FatherNameMl: data?.FamilyAbandonedDeath?.FatherNameMl,
          MotherUnavailable: data?.FamilyAbandonedDeath?.MotherUnavailable,
          MotherNameEn: data?.FamilyAbandonedDeath?.MotherNameEn,
          MotherNameMl: data?.FamilyAbandonedDeath?.MotherNameMl,
          FamilyMobileNo: parseInt(data?.FamilyAbandonedDeath?.FamilyMobileNo),
          FamilyEmailId: data?.FamilyAbandonedDeath?.FamilyEmailId,
          SpouseAadhaar: data?.FamilyAbandonedDeath?.SpouseAadhaar ? data?.FamilyAbandonedDeath?.SpouseAadhaar : null,
          FatherAadharNo: data?.FamilyAbandonedDeath?.FatherAadharNo ? data?.FamilyAbandonedDeath?.FatherAadharNo : null,
          MotherAadharNo: data?.FamilyAbandonedDeath?.MotherAadharNo ? data?.FamilyAbandonedDeath?.MotherAadharNo : null,
        },
        StatisticalInfoDeathAbandoned: {
          StatisticalId: null,
          TenantId: data?.InformationDeath?.tenantId,
          MedicalAttentionType: data?.StatisticalInfoAbandoned?.MedicalAttentionType ? data?.StatisticalInfoAbandoned?.MedicalAttentionType.code : null,
          IsAutopsyPerformed: data?.StatisticalInfoAbandoned?.IsAutopsyPerformed,
          IsAutopsyCompleted: data?.StatisticalInfoAbandoned?.IsAutopsyCompleted,
          MannerOfDeath: data?.StatisticalInfoAbandoned?.MannerOfDeath ? data?.StatisticalInfoAbandoned?.MannerOfDeath.code : null,
          DeathMedicallyCertified: data?.StatisticalInfoAbandoned?.DeathMedicallyCertified ? data?.StatisticalInfoAbandoned?.DeathMedicallyCertified.code : null,
          DeathCauseMain: data?.StatisticalInfoAbandoned?.DeathCauseMain ? data?.StatisticalInfoAbandoned?.DeathCauseMain.code : null,
          DeathCauseMainCustom: data?.StatisticalInfoAbandoned?.DeathCauseMainCustom,
          DeathCauseMainInterval: data?.StatisticalInfoAbandoned?.DeathCauseMainInterval,
          DeathCauseMainTimeUnit: data?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit ? data?.StatisticalInfoAbandoned?.DeathCauseMainTimeUnit.code : null,
          DeathCauseSub: data?.StatisticalInfoAbandoned?.DeathCauseSub ? data?.StatisticalInfoAbandoned?.DeathCauseSub.code : null,
          DeathCauseSubCustom: data?.StatisticalInfoAbandoned?.DeathCauseSubCustom,
          DeathCauseSubInterval: data?.StatisticalInfoAbandoned?.DeathCauseSubInterval,
          DeathCauseSubTimeUnit: data?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit ? data?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit.code : null,
          DeathCauseSub2: data?.StatisticalInfoAbandoned?.DeathCauseSub2 ? data?.StatisticalInfoAbandoned?.DeathCauseSub2.code : null,
          DeathCauseSubCustom2: data?.StatisticalInfoAbandoned?.DeathCauseSubCustom2,
          DeathCauseSubInterval2: data?.StatisticalInfoAbandoned?.DeathCauseSubInterval2,
          DeathCauseSubTimeUnit2: data?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2 ? data?.StatisticalInfoAbandoned?.DeathCauseSubTimeUnit2.code : null,
          DeathCauseOther: data?.StatisticalInfoAbandoned?.DeathCauseOther ? data?.StatisticalInfoAbandoned?.DeathCauseOther.code : null,
          IsdeceasedPregnant: data?.StatisticalInfoAbandoned?.IsdeceasedPregnant ? data?.StatisticalInfoAbandoned?.IsdeceasedPregnant.code : null,
          IsDelivery: data?.StatisticalInfoAbandoned?.IsDelivery ? data?.StatisticalInfoAbandoned?.IsDelivery.code : null,
          DeathDuringDelivery: data?.StatisticalInfoAbandoned?.DeathDuringDelivery,
          SmokingType: data?.StatisticalInfoAbandoned?.SmokingType,
          TobaccoType: data?.StatisticalInfoAbandoned?.TobaccoType,
          AlcoholType: data?.StatisticalInfoAbandoned?.AlcoholType,
        },
        InformantDetailsDeathAbandoned: {
          // InformantAadharSubmitted: null,
          // InformantAadharNo: data?.InitiatorAbandoned?.InformantAadharNo,
          // InformantName: data?.InitiatorAbandoned?.InformantNameEn,
          // DeathSignedOfficerDesignation: data?.InitiatorAbandoned?.DeathSignedOfficerDesignation,
          // InformantMobileNo: parseInt(data?.InitiatorAbandoned?.InformantMobileNo),
          // InformantAddress: data?.InitiatorAbandoned?.InformantAddress ? data?.InitiatorAbandoned?.InformantAddress : null,
          // IsDeclarationInformant: data?.InitiatorAbandoned?.IsDeclarationInformant,
          // InformantDocumentId: null,
          // InformantDocumentDeathDtlId: null,
          // InformantDocumentTenantId: data?.InitiatorAbandoned?.tenantId,
          // InformantDocumentAckNo: null,
          // InformantDocumentType: null,
          // InformantDocumentUserType: null,
          // InformantDocumentFileStoreId: null,
          InformantOfficeAuthority: data?.InitiatorAbandoned?.InformantOfficeAuthority,
          InformantDesignation: data?.InitiatorAbandoned?.DeathSignedOfficerDesignation,                
          InformantName: data?.InitiatorAbandoned?.InformantName,              
          InformantPENNo: data?.InitiatorAbandoned?.InformantPENNo,
          InformantOfficeAddress: data?.InitiatorAbandoned?.InformantOfficeAddress,               
          InformantAadhaarNo: data?.InitiatorAbandoned?.InformantAadharNo,
          InformantMobileNo: parseInt(data?.InitiatorAbandoned?.InformantMobileNo),              
          InformantAddress: data?.InitiatorAbandoned?.InformantAddress
        },
        DeathAbandonedDocuments: [
          {
              DocumentType: "Letter form the Informer/Notifier Official",
              filestoreId: data?.InitiatorAbandoned?.file
          },
          {
              DocumentType: "Copy of the FIR",
              filestoreId: data?.InitiatorAbandoned?.file1
          },
          {
              DocumentType: "Inquest Report",
              filestoreId: data?.InitiatorAbandoned?.file2
          },
          {
              DocumentType: "Post-Mortem Report",
              filestoreId: data?.InitiatorAbandoned?.file3
          },
          {
              DocumentType: "Medical Certificate of Cause of Death",
              filestoreId: data?.InitiatorAbandoned?.file4
          },
          {
              DocumentType: "Court Order",
              filestoreId: data?.InitiatorAbandoned?.file5
          }
      ],
        // Initiator: {
        //   IsDeclarationInitiator: data?.Initiator?.IsDeclarationInitiator,
        //   InitiatorRelation: data?.Initiator?.InitiatorRelation,
        //   InitiatorAadhaar: data?.Initiator?.InitiatorAadhaar,
        //   InitiatorName: data?.Initiator?.InitiatorName,
        //   InitiatorMobile: parseInt(data?.Initiator?.InitiatorMobile),
        //   InitiatorAddress: data?.Initiator?.InitiatorAddress,
        //   InitiatorDocumentId: null,
        //   InitiatorDocumentTenantId: data?.InformationDeath?.tenantId,
        //   InitiatorDocumentAckNo: null,
        //   InitiatorDocumentType: null,
        //   InitiatorDocumentUserType: null,
        //   InitiatorDocumentFileStoreId: null,
        // },
        AuditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        applicationType: "new",
        // applicationStatus: "Workflow_appl_status",
        businessService: "CR",
        action: "INITIATE",
        assignee: [],
        workflowcode: "DEATHABANDONED"
      },
    ],
  };
  return formdata;
};

export const convertToEditAbandonedDeathRegistration = (data = {}) => {
  // let Financialyear = sessionStorage.getItem("CurrentFinancialYear");
  const empTenantId = Digit.ULBService.getCurrentUlb();
  // let tenantId = "";
  // tenantId = empTenantId["code"];
  const formdata = {
    deathAbandonedDtls: [
      {
        InformationDeathAbandoned: {
          Id: null,
          RegistrationUnit: null,
          TenantId: data?.InformationDeathAband?.tenantId,
          DeathDateUnavailable: data?.InformationDeathAband?.DeathDateUnavailable,
          DateOfDeath: Date.parse(data?.InformationDeathAband?.DateOfDeath),
          TimeOfDeath: parseInt(data?.InformationDeathAband?.TimeOfDeath),
          TimeOfDeathUnit: "AM",
          DateOfDeath1: Date.parse(data?.InformationDeathAband?.DateOfDeath1),
          DeathPlace: data?.InformationDeathAband?.DeathPlace.code,
          DeathPlaceType: data?.InformationDeathAband?.DeathPlaceType ? data?.InformationDeathAband?.DeathPlaceType.code : null,
          DeathPlaceInstId: data?.InformationDeathAband?.DeathPlaceInstId ? data?.InformationDeathAband?.DeathPlaceInstId.code : null,
          VehicleNumber: data?.InformationDeathAband?.VehicleNumber,
          VehicleFromplaceEn: data?.InformationDeathAband?.VehicleFromplaceEn,
          VehicleFromplaceMl: data?.InformationDeathAband?.VehicleFromplaceMl,
          VehicleToPlaceEn: data?.InformationDeathAband?.VehicleToPlaceEn,
          VehicleToPlaceMl: data?.InformationDeathAband?.VehicleToPlaceMl,
          VehicleFirstHalt: data?.InformationDeathAband?.VehicleFirstHalt,
          VehicleFirstHaltMl: data?.InformationDeathAband?.VehicleFirstHaltMl,
          VehicleHospitalEn: data?.InformationDeathAband?.VehicleHospitalEn ? data?.InformationDeathAband?.VehicleHospitalEn.code : null,
          DeathPlaceCountry: data?.InformationDeathAband?.DeathPlaceCountry ? data?.InformationDeathAband?.DeathPlaceCountry.code : null,
          DeathPlaceState: data?.InformationDeathAband?.DeathPlaceState ? data?.InformationDeathAband?.DeathPlaceState.code : null,
          DeathPlaceDistrict: data?.InformationDeathAband?.DeathPlaceState ? data?.InformationDeathAband?.DeathPlaceState.code : null,
          DeathPlaceCity: data?.InformationDeathAband?.DeathPlaceCity,
          DeathPlaceRemarksEn: data?.InformationDeathAband?.DeathPlaceRemarksEn,
          DeathPlaceRemarksMl: data?.InformationDeathAband?.DeathPlaceRemarksMl,
          DeathPlaceWardId: data?.InformationDeathAband?.DeathPlaceWardId ? data?.InformationDeathAband?.DeathPlaceWardId.code : null,
          PlaceOfBurialEn: data?.InformationDeathAband?.PlaceOfBurialEn,
          PlaceOfBurialMl: data?.InformationDeathAband?.PlaceOfBurialMl,
          DeathPlaceLocalityEn: data?.InformationDeathAband?.DeathPlaceLocalityEn,
          DeathPlaceLocalityMl: data?.InformationDeathAband?.DeathPlaceLocalityMl,
          DeathPlaceStreetEn: data?.InformationDeathAband?.DeathPlaceStreetEn,
          DeathPlaceStreetMl: data?.InformationDeathAband?.DeathPlaceStreetMl,
          GeneralRemarks: data?.InformationDeathAband?.GeneralRemarks,
          DeathPlaceHomeWardId: data?.InformationDeathAband?.DeathPlaceHomeWardId ? data?.InformationDeathAband?.DeathPlaceHomeWardId.code : null,
          DeathPlaceHomePostofficeId: data?.InformationDeathAband?.DeathPlaceHomePostofficeId
            ? data?.InformationDeathAband.DeathPlaceHomePostofficeId.code
            : null,
          DeathPlaceHomePincode: data?.InformationDeathAband?.DeathPlaceHomePincode ? data?.InformationDeathAband?.DeathPlaceHomePincode.code : null,
          DeathPlaceHomeLocalityEn: data?.InformationDeathAband?.DeathPlaceHomeLocalityEn ? data?.InformationDeathAband?.DeathPlaceHomeLocalityEn : null,
          DeathPlaceHomeLocalityMl: data?.InformationDeathAband?.DeathPlaceHomeLocalityMl ? data?.InformationDeathAband?.DeathPlaceHomeLocalityMl : null,
          DeathPlaceHomeStreetNameEn: data?.InformationDeathAband?.DeathPlaceHomeStreetNameEn ? data?.InformationDeathAband?.DeathPlaceHomeStreetNameEn : null,
          DeathPlaceHomeStreetNameMl: data?.InformationDeathAband?.DeathPlaceHomeStreetNameMl ? data?.InformationDeathAband?.DeathPlaceHomeStreetNameMl : null,
          DeathPlaceHomeHoueNameEn: data?.InformationDeathAband?.DeathPlaceHomeHoueNameEn ? data?.InformationDeathAband?.DeathPlaceHomeHoueNameEn : null,
          DeathPlaceHomeHoueNameMl: data?.InformationDeathAband?.DeathPlaceHomeHoueNameMl ? data?.InformationDeathAband?.DeathPlaceHomeHoueNameMl : null,
          DeceasedAadharNotAvailable: data?.InformationDeathAband?.DeceasedAadharNotAvailable ? data?.InformationDeathAband?.DeceasedAadharNotAvailable : false,
          DeceasedAadharNumber: data?.InformationDeathAband?.DeceasedAadharNumber,
          DeceasedIdproofType: data?.InformationDeathAband?.DeceasedIdproofType ? data?.InformationDeathAband.DeceasedIdproofType.code : null,
          DeceasedIdproofNo: data?.InformationDeathAband?.DeceasedIdproofNo,
          DeceasedFirstNameEn: data?.InformationDeathAband?.DeceasedFirstNameEn,
          DeceasedMiddleNameEn: data?.InformationDeathAband?.DeceasedMiddleNameEn,
          DeceasedLastNameEn: data?.InformationDeathAband?.DeceasedLastNameEn,
          DeceasedFirstNameMl: data?.InformationDeathAband?.DeceasedFirstNameMl,
          DeceasedMiddleNameMl: data?.InformationDeathAband?.DeceasedMiddleNameMl,
          DeceasedLastNameMl: data?.InformationDeathAband?.DeceasedLastNameMl,
          Age: parseInt(data?.InformationDeathAband?.Age),
          AgeUnit: data?.InformationDeathAband?.AgeUnit.code,
          DeceasedGender: data?.InformationDeathAband?.DeceasedGender?.code,
          Nationality: data?.InformationDeathAband?.Nationality.code,
          Religion: data?.InformationDeathAband?.Religion.code,
          Occupation: data?.InformationDeathAband?.Occupation ? data?.InformationDeathAband?.Occupation.code : null,
          funcionUID: "CRDRAB",
          registrationNo: null,
          DeathACKNo:data?.InformationDeathAband?.DeathACKNo,
          BurialDistrict: data?.InformationDeathAband?.BurialDistrict ? data?.InformationDeathAband?.BurialDistrict.code : null,
          BurialLBType: data?.InformationDeathAband?.BurialLBType ? data?.InformationDeathAband?.BurialLBType.code : null,
          BurialLBName: data?.InformationDeathAband?.BurialLBName ? data?.InformationDeathAband?.BurialLBName.code : null,
          BurialLBWard: data?.InformationDeathAband?.BurialLBWard ? data?.InformationDeathAband?.BurialLBWard.code : null,
          PlaceOfBurialEn: data?.InformationDeathAband?.PlaceOfBurialEn ? data?.InformationDeathAband?.PlaceOfBurialEn.code : null,
          PlaceOfBurialMl: data?.InformationDeathAband?.PlaceOfBurialMl ? data?.InformationDeathAband?.PlaceOfBurialMl.code : null,
          BurialDescription: data?.InformationDeathAband?.BurialDescription ? data?.InformationDeathAband?.BurialDescription.code : null,
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
            ? data?.AddressBirthDetails?.presentInsideKeralaPincode.code
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
            ? data?.AddressBirthDetails?.presentOutsideKeralaPincode.code
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
            ? data?.AddressBirthDetails?.permntInKeralaAdrPincode.code
            : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice
            ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code
            : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict
            ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code
            : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk
            ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk.code
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
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage
            ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code
            : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
          PresentAddrTypeId: "P",
          PermanentAddrTypeId: "R",
        },
        FamilyInfoDeathAbandoned: {
          SpouseUnavailable: data?.FamilyInfoDeathAbandoned?.SpouseUnavailable,
          SpouseType: data?.FamilyInfoDeathAbandoned?.SpouseType ? data?.FamilyInfoDeathAbandoned?.SpouseType?.code: null,
          SpouseNameEn: data?.FamilyInfoDeathAbandoned?.SpouseNameEN ? data?.FamilyInfoDeathAbandoned?.SpouseNameEN : null,
          SpouseNameML: data?.FamilyInfoDeathAbandoned?.SpouseNameMl ? data?.FamilyInfoDeathAbandoned?.SpouseNameMl : null,
          FatherUnavailable: data?.FamilyInfoDeathAbandoned?.FatherUnavailable,
          FatherNameEn: data?.FamilyInfoDeathAbandoned?.FatherNameEn,
          FatherNameMl: data?.FamilyInfoDeathAbandoned?.FatherNameMl,
          MotherUnavailable: data?.FamilyInfoDeathAbandoned?.MotherUnavailable,
          MotherNameEn: data?.FamilyInfoDeathAbandoned?.MotherNameEn,
          MotherNameMl: data?.FamilyInfoDeathAbandoned?.MotherNameMl,
          FamilyMobileNo: parseInt(data?.FamilyInfoDeathAbandoned?.FamilyMobileNo),
          FamilyEmailId: data?.FamilyInfoDeathAbandoned?.FamilyEmailId,
          SpouseAadhaar: data?.FamilyInfoDeathAbandoned?.SpouseAadhaar ? data?.FamilyInfoDeathAbandoned?.SpouseAadhaar : null,
          FatherAadharNo: data?.FamilyInfoDeathAbandoned?.FatherAadharNo ? data?.FamilyInfoDeathAbandoned?.FatherAadharNo : null,
          MotherAadharNo: data?.FamilyInfoDeathAbandoned?.MotherAadharNo ? data?.FamilyInfoDeathAbandoned?.MotherAadharNo : null,
        },
        StatisticalInfoDeathAbandoned: {
          StatisticalId: null,
          TenantId: data?.InformationDeath?.tenantId,
          MedicalAttentionType: data?.StatisticalInfoDeathAbandoned?.MedicalAttentionType ? data?.StatisticalInfoDeathAbandoned?.MedicalAttentionType.code : null,
          IsAutopsyPerformed: data?.StatisticalInfoDeathAbandoned?.IsAutopsyPerformed,
          IsAutopsyCompleted: data?.StatisticalInfoDeathAbandoned?.IsAutopsyCompleted,
          MannerOfDeath: data?.StatisticalInfoDeathAbandoned?.MannerOfDeath ? data?.StatisticalInfoDeathAbandoned?.MannerOfDeath.code : null,
          DeathMedicallyCertified: data?.StatisticalInfoDeathAbandoned?.DeathMedicallyCertified ? data?.StatisticalInfoDeathAbandoned?.DeathMedicallyCertified.code : null,
          DeathCauseMain: data?.StatisticalInfoDeathAbandoned?.DeathCauseMain ? data?.StatisticalInfoDeathAbandoned?.DeathCauseMain.code : null,
          DeathCauseMainCustom: data?.StatisticalInfoDeathAbandoned?.DeathCauseMainCustom,
          DeathCauseMainInterval: data?.StatisticalInfoDeathAbandoned?.DeathCauseMainInterval,
          DeathCauseMainTimeUnit: data?.StatisticalInfoDeathAbandoned?.DeathCauseMainTimeUnit ? data?.StatisticalInfoDeathAbandoned?.DeathCauseMainTimeUnit.code : null,
          DeathCauseSub: data?.StatisticalInfoDeathAbandoned?.DeathCauseSub ? data?.StatisticalInfoDeathAbandoned?.DeathCauseSub.code : null,
          DeathCauseSubCustom: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubCustom,
          DeathCauseSubInterval: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubInterval,
          DeathCauseSubTimeUnit: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubTimeUnit ? data?.StatisticalInfoDeathAbandoned?.DeathCauseSubTimeUnit.code : null,
          DeathCauseSub2: data?.StatisticalInfoDeathAbandoned?.DeathCauseSub2 ? data?.StatisticalInfoDeathAbandoned?.DeathCauseSub2.code : null,
          DeathCauseSubCustom2: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubCustom2,
          DeathCauseSubInterval2: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubInterval2,
          DeathCauseSubTimeUnit2: data?.StatisticalInfoDeathAbandoned?.DeathCauseSubTimeUnit2 ? data?.StatisticalInfoDeathAbandoned?.DeathCauseSubTimeUnit2.code : null,
          DeathCauseOther: data?.StatisticalInfoDeathAbandoned?.DeathCauseOther ? data?.StatisticalInfoDeathAbandoned?.DeathCauseOther.code : null,
          IsdeceasedPregnant: data?.StatisticalInfoDeathAbandoned?.IsdeceasedPregnant ? data?.StatisticalInfoDeathAbandoned?.IsdeceasedPregnant.code : null,
          IsDelivery: data?.StatisticalInfoDeathAbandoned?.IsDelivery ? data?.StatisticalInfoDeathAbandoned?.IsDelivery.code : null,
          DeathDuringDelivery: data?.StatisticalInfoDeathAbandoned?.DeathDuringDelivery,
          SmokingType: data?.StatisticalInfoDeathAbandoned?.SmokingType,
          TobaccoType: data?.StatisticalInfoDeathAbandoned?.TobaccoType,
          AlcoholType: data?.StatisticalInfoDeathAbandoned?.AlcoholType,
        },
        InformantDetailsDeathAbandoned: {
          InformantOfficeAuthority: data?.InformantDetailsDeathAbandoned?.InformantOfficeAuthority,
          InformantDesignation: data?.InformantDetailsDeathAbandoned?.InformantDesignation,                
          InformantName: data?.InformantDetailsDeathAbandoned?.InformantName,              
          InformantPENNo: data?.InformantDetailsDeathAbandoned?.InformantPENNo,
          InformantOfficeAddress: data?.InformantDetailsDeathAbandoned?.InformantOfficeAddress,               
          InformantAadhaarNo: data?.InformantDetailsDeathAbandoned?.InformantAadharNo,
          InformantMobileNo: parseInt(data?.InformantDetailsDeathAbandoned?.InformantMobileNo),              
          InformantAddress: data?.InformantDetailsDeathAbandoned?.InformantAddress
        },
        AuditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        applicationType: "new",
        // applicationStatus: "Workflow_appl_status",
        businessService: "CR",
        action: "INITIATE",
        assignee: [],
        workflowcode: "DEATHABANDONED"
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
