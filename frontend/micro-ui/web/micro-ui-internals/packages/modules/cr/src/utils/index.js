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

    ChildDetails: [
      {
        childDOB: Date.parse(data?.ChildDetails?.childDOB),
        birthDateTime: parseInt(data?.ChildDetails?.birthDateTime),
        gender: data?.ChildDetails?.gender ? data?.ChildDetails?.gender.code : null,
        childAadharNo: data?.ChildDetails?.childAadharNo,
        isChildName: data?.ChildDetails?.isChildName ? data?.ChildDetails?.isChildName : false,
        tenantid: data?.ChildDetails?.tenantId,
        childFirstNameEn: data?.ChildDetails?.childFirstNameEn,
        childFirstNameMl: data?.ChildDetails?.childFirstNameMl,
        childMiddleNameEn: data?.ChildDetails?.childMiddleNameEn,
        childMiddleNameMl: data?.ChildDetails?.childMiddleNameMl,
        childLastNameEn: data?.ChildDetails?.childLastNameEn,
        childLastNameMl: data?.ChildDetails?.childLastNameMl,
        hospitalCode: data?.ChildDetails?.hospitalName ? data?.ChildDetails?.hospitalName.code : null,
        birthPlace: data?.ChildDetails?.birthPlace ? data?.ChildDetails?.birthPlace.code : null,
        hospitalName: data?.ChildDetails?.hospitalName ? data?.ChildDetails?.hospitalName.hospitalName : null,
        hospitalNameMl: data?.ChildDetails?.hospitalName ? data?.ChildDetails?.hospitalName.hospitalNamelocal : null,
        institutionTypeCode: data?.ChildDetails?.institution ? data?.ChildDetails?.institution.code : null,
        institution: data?.ChildDetails?.institution ? data?.ChildDetails?.institution.name : null,
        institutionNameCode: data?.ChildDetails?.institutionId ? data?.ChildDetails?.institutionId.code : null,
        institutionId: data?.ChildDetails?.institutionId ? data?.ChildDetails?.institutionId.institutionName : null,
        institutionIdMl: data?.ChildDetails?.institutionIdMl ? data?.ChildDetails?.institutionIdMl.institutionNamelocal : null,
        wardNo: data?.ChildDetails?.wardNo ? data?.ChildDetails?.wardNo.code : null,
        wardNameEn: data?.ChildDetails?.wardNameEn ? data?.ChildDetails?.wardNameEn : null,
        wardNameMl: data?.ChildDetails?.wardNameMl ? data?.ChildDetails?.wardNameMl : null,
        wardNumber: data?.ChildDetails?.wardNumber ? data?.ChildDetails?.wardNumber : null,
        adrsHouseNameEn: data?.ChildDetails?.adrsHouseNameEn,
        adrsHouseNameMl: data?.ChildDetails?.adrsHouseNameMl,
        adrsLocalityNameEn: data?.ChildDetails?.adrsLocalityNameEn,
        adrsLocalityNameMl: data?.ChildDetails?.adrsLocalityNameMl,
        adrsStreetNameEn: data?.ChildDetails?.adrsStreetNameEn,
        adrsStreetNameMl: data?.ChildDetails?.adrsStreetNameMl,
        adrsPostOffice: data?.ChildDetails?.adrsPostOffice ? data?.ChildDetails?.adrsPostOffice.code : null,
        adrsPincode: data?.ChildDetails?.adrsPincode ? data?.ChildDetails?.adrsPincode.code : null,
        vehicleType: data?.ChildDetails?.vehicleType ? data?.ChildDetails?.vehicleType.code : null,
        vehicleHaltPlace: data?.ChildDetails?.vehicleHaltPlace,
        vehicleHaltPlaceMl: data?.ChildDetails?.vehicleHaltPlaceMl,
        vehicleRegistrationNo: data?.ChildDetails?.vehicleRegistrationNo,
        vehicleFromEn: data?.ChildDetails?.vehicleFromEn,
        vehicleToEn: data?.ChildDetails?.vehicleToEn,
        vehicleFromMl: data?.ChildDetails?.vehicleFromMl,
        vehicleToMl: data?.ChildDetails?.vehicleToMl,
        setadmittedHospitalEn: data?.ChildDetails?.setadmittedHospitalEn ? data?.ChildDetails?.setadmittedHospitalEn.code : null,
        vehicleDesDetailsEn: data?.ChildDetails?.vehicleDesDetailsEn ? data?.ChildDetails?.vehicleDesDetailsEn.code : null,
        publicPlaceType: data?.ChildDetails?.publicPlaceType ? data?.ChildDetails?.publicPlaceType.code : null,
        localityNameEn: data?.ChildDetails?.localityNameEn,
        localityNameMl: data?.ChildDetails?.localityNameMl,
        streetNameEn: data?.ChildDetails?.streetNameEn,
        streetNameMl: data?.ChildDetails?.streetNameMl,
        publicPlaceDecpEn: data?.ChildDetails?.publicPlaceDecpEn,
        birthWeight: data?.ChildDetails?.birthWeight,
        pregnancyDuration: data?.ChildDetails?.pregnancyDuration ? data?.ChildDetails?.pregnancyDuration : null,
        medicalAttensionSub: data?.ChildDetails?.medicalAttensionSub ? data?.ChildDetails?.medicalAttensionSub.code : null,
        deliveryMethods: data?.ChildDetails?.deliveryMethods ? data?.ChildDetails?.deliveryMethods.code : null,
        action:"INITIATE",
        applicationtype: "CRBRNR",
        businessservice: "birth-services",
        workflowcode: data?.ChildDetails?.workFlowCode,
        ParentsDetails: {
          motherFirstNameEn: data?.ParentsDetails?.motherFirstNameEn,
          motherFirstNameMl: data?.ParentsDetails?.motherFirstNameMl,
          motherAadhar: data?.ParentsDetails?.motherAadhar,
          motherMarriageAge: data?.ParentsDetails?.motherMarriageAge,
          motherMarriageBirth: data?.ParentsDetails?.motherMarriageBirth,
          motherMaritalStatus:data?.ParentsDetails?.motherMaritalStatus ? data?.ParentsDetails?.motherMaritalStatus.code : null,
          motherEducation: data?.ParentsDetails?.motherEducation ? data?.ParentsDetails?.motherEducation.code : null,
          motherProfession: data?.ParentsDetails?.motherProfession ? data?.ParentsDetails?.motherProfession.code : null,
          motherNationality: data?.ParentsDetails?.motherNationality ? data?.ParentsDetails?.motherNationality.code : null,
          orderofChildren: data?.ParentsDetails?.orderofChildren,
          fatherAadhar: data?.ParentsDetails?.fatherAadhar,
          ismotherInfo: data?.ParentsDetails?.isMotherInfo,
          isfatherInfo: data?.ParentsDetails?.isFatherInfo,
          fatherFirstNameEn: data?.ParentsDetails?.fatherFirstNameEn,
          fatherFirstNameMl: data?.ParentsDetails?.fatherFirstNameMl,
          fatherNationality: data?.ParentsDetails?.fatherNationality ? data?.ParentsDetails?.fatherNationality.code : null,
          fatherEducation: data?.ParentsDetails?.fatherEducation ? data?.ParentsDetails?.fatherEducation.code : null,
          fatherProfession: data?.ParentsDetails?.fatherProfession ? data?.ParentsDetails?.fatherProfession.code : null,
          Religion: data?.ParentsDetails?.Religion ? data?.ParentsDetails?.Religion.code : null,
          fatherMobile: data?.ParentsDetails?.fatherMobile,
          fatherEmail: data?.ParentsDetails?.fatherEmail,
        },
        AddressBirthDetails: {
          presentaddressCountry: data?.AddressBirthDetails?.presentaddressCountry ? data?.AddressBirthDetails?.presentaddressCountry.code : null,
          presentaddressStateName: data?.AddressBirthDetails?.presentaddressStateName ? data?.AddressBirthDetails?.presentaddressStateName.code : null,
          presentInsideKeralaLBName: data?.AddressBirthDetails?.presentInsideKeralaLBName ? data?.AddressBirthDetails?.presentInsideKeralaLBName.code : null,
          presentInsideKeralaDistrict: data?.AddressBirthDetails?.presentInsideKeralaDistrict ? data?.AddressBirthDetails?.presentInsideKeralaDistrict.code : null,
          presentInsideKeralaTaluk: data?.AddressBirthDetails?.presentInsideKeralaTaluk ? data?.AddressBirthDetails?.presentInsideKeralaTaluk.code : null,
          presentInsideKeralaVillage: data?.AddressBirthDetails?.presentInsideKeralaVillage ? data?.AddressBirthDetails?.presentInsideKeralaVillage.code : null,
          presentInsideKeralaLocalityNameEn: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.AddressBirthDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.AddressBirthDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.AddressBirthDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.AddressBirthDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPincode: data?.AddressBirthDetails?.presentInsideKeralaPincode ? data?.AddressBirthDetails?.presentInsideKeralaPincode.code : null,
          presentInsideKeralaPostOffice: data?.AddressBirthDetails?.presentInsideKeralaPostOffice ? data?.AddressBirthDetails?.presentInsideKeralaPostOffice.code : null,
          presentWardNo: data?.AddressBirthDetails?.presentWardNo ? data?.AddressBirthDetails?.presentWardNo.code : null,
          presentOutsideKeralaDistrict: data?.AddressBirthDetails?.presentOutsideKeralaDistrict ? data?.AddressBirthDetails?.presentOutsideKeralaDistrict.code : null,
          presentOutsideKeralaTaluk: data?.AddressBirthDetails?.presentOutsideKeralaTaluk ? data?.AddressBirthDetails?.presentOutsideKeralaTaluk.code : null,
          presentOutsideKeralaVillage: data?.AddressBirthDetails?.presentOutsideKeralaVillage ? data?.AddressBirthDetails?.presentOutsideKeralaVillage.code : null,
          presentOutsideKeralaCityVilgeEn: data?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.AddressBirthDetails?.presentOutsideKeralaPincode ? data?.AddressBirthDetails?.presentOutsideKeralaPincode.code : null,
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
          presentOutSideIndiaadrsVillage: data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage ? data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage.code : null,
          presentOutSideIndiaadrsCityTown: data?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown,
          isPrsentAddress: data?.AddressBirthDetails?.isPrsentAddress,
          permtaddressCountry: data?.AddressBirthDetails?.permtaddressCountry ? data?.AddressBirthDetails?.permtaddressCountry.code : null,
          permtaddressStateName: data?.AddressBirthDetails?.permtaddressStateName ? data?.AddressBirthDetails?.permtaddressStateName.code : null,
          permntInKeralaAdrLBName: data?.AddressBirthDetails?.permntInKeralaAdrLBName ? data?.AddressBirthDetails?.permntInKeralaAdrLBName.code : null,
          permntInKeralaAdrDistrict: data?.AddressBirthDetails?.permntInKeralaAdrDistrict ? data?.AddressBirthDetails?.permntInKeralaAdrDistrict.code : null,
          permntInKeralaAdrTaluk: data?.AddressBirthDetails?.permntInKeralaAdrTaluk ? data?.AddressBirthDetails?.permntInKeralaAdrTaluk.code : null,
          permntInKeralaAdrVillage: data?.AddressBirthDetails?.permntInKeralaAdrVillage ? data?.AddressBirthDetails?.permntInKeralaAdrVillage.code : null,
          permntInKeralaAdrLocalityNameEn: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrStreetNameEn: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn,
          permntInKeralaAdrHouseNameEn: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.AddressBirthDetails?.permntInKeralaAdrPincode ? data?.AddressBirthDetails?.permntInKeralaAdrPincode.code : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk.code : null,
          permntOutsideKeralaVillage: data?.AddressBirthDetails?.permntOutsideKeralaVillage ? data?.AddressBirthDetails?.permntOutsideKeralaVillage.code : null,
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
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
        },
        InformarHosInstDetails: {
          infomantFirstNameEn: data?.InformarHosInstDetails?.infomantFirstNameEn,
          infomantAadhar: data?.InformarHosInstDetails?.infomantAadhar,
          infomantMobile: data?.InformarHosInstDetails?.infomantMobile,
          informerAddress: data?.InformarHosInstDetails?.informerAddress,
          informerDesi: data?.InformarHosInstDetails?.informerDesi,
          isDeclarationInfo: data?.InformarHosInstDetails?.isDeclarationInfo,
        },
        InitiatorinfoDetails: {
          relation: data?.InitiatorinfoDetails?.relation,
          initiatorNameEn: data?.InitiatorinfoDetails?.initiatorNameEn,
          initiatorAadhar: data?.InitiatorinfoDetails?.initiatorAadhar,
          initiatorMobile: data?.InitiatorinfoDetails?.initiatorMobile,
          initiatorDesi: data?.InitiatorinfoDetails?.initiatorDesi,
          initiatorAddress: data?.InitiatorinfoDetails?.initiatorAddress,
          isInitiatorDeclaration: data?.InitiatorinfoDetails?.isInitiatorDeclaration,
          isCaretaker: data?.InitiatorinfoDetails?.isCaretaker,
        },
      },
    ],
  };

  return formdata;
};

export const convertToStillBirthRegistration = (data = {}) => {
  const formdata = {

    StillBirthChildDetails: [
      {
        childDOB: Date.parse(data?.StillBirthChildDetails?.childDOB),
        birthDateTime: parseInt(data?.StillBirthChildDetails?.birthDateTime),
        gender: data?.StillBirthChildDetails?.gender ? data?.StillBirthChildDetails?.gender.code : null,        
        tenantid: data?.StillBirthChildDetails?.tenantId,        
        hospitalCode: data?.StillBirthChildDetails?.hospitalName ? data?.StillBirthChildDetails?.hospitalName.code : null,
        birthPlace: data?.StillBirthChildDetails?.birthPlace ? data?.StillBirthChildDetails?.birthPlace.code : null,
        hospitalName: data?.StillBirthChildDetails?.hospitalName ? data?.StillBirthChildDetails?.hospitalName.hospitalName : null,
        hospitalNameMl: data?.StillBirthChildDetails?.hospitalName ? data?.StillBirthChildDetails?.hospitalName.hospitalNamelocal : null,
        institutionTypeCode: data?.StillBirthChildDetails?.institutionTypeCode ? data?.StillBirthChildDetails?.institutionTypeCode.code : null,
        institution: data?.StillBirthChildDetails?.institution ? data?.StillBirthChildDetails?.institution.name : null,
        institutionNameCode: data?.StillBirthChildDetails?.institutionNameCode ? data?.StillBirthChildDetails?.institutionNameCode.code : null,
        institutionId: data?.StillBirthChildDetails?.institutionId ? data?.StillBirthChildDetails?.institutionId.institutionName : null,
        institutionIdMl: data?.StillBirthChildDetails?.institutionIdMl ? data?.StillBirthChildDetails?.institutionIdMl.institutionNamelocal : null,
        wardNo: data?.StillBirthChildDetails?.wardNo ? data?.StillBirthChildDetails?.wardNo.code : null,
        wardNameEn: data?.StillBirthChildDetails?.wardNameEn ? data?.StillBirthChildDetails?.wardNameEn : null,
        wardNameMl: data?.StillBirthChildDetails?.wardNameMl ? data?.StillBirthChildDetails?.wardNameMl : null,
        wardNumber: data?.StillBirthChildDetails?.wardNumber ? data?.StillBirthChildDetails?.wardNumber : null,
        adrsHouseNameEn: data?.StillBirthChildDetails?.adrsHouseNameEn,
        adrsHouseNameMl: data?.StillBirthChildDetails?.adrsHouseNameMl,
        adrsLocalityNameEn: data?.StillBirthChildDetails?.adrsLocalityNameEn,
        adrsLocalityNameMl: data?.StillBirthChildDetails?.adrsLocalityNameMl,
        adrsStreetNameEn: data?.StillBirthChildDetails?.adrsStreetNameEn,
        adrsStreetNameMl: data?.StillBirthChildDetails?.adrsStreetNameMl,
        adrsPostOffice: data?.StillBirthChildDetails?.adrsPostOffice ? data?.StillBirthChildDetails?.adrsPostOffice.code : null,
        adrsPincode: data?.StillBirthChildDetails?.adrsPincode ? data?.StillBirthChildDetails?.adrsPincode.code : null,
        vehicleType: data?.StillBirthChildDetails?.vehicleType ? data?.StillBirthChildDetails?.vehicleType.code : null,
        vehicleHaltPlace: data?.StillBirthChildDetails?.vehicleHaltPlace,
        vehicleHaltPlaceMl: data?.StillBirthChildDetails?.vehicleHaltPlaceMl,
        vehicleRegistrationNo: data?.StillBirthChildDetails?.vehicleRegistrationNo,
        vehicleFromEn: data?.StillBirthChildDetails?.vehicleFromEn,
        vehicleToEn: data?.StillBirthChildDetails?.vehicleToEn,
        vehicleFromMl: data?.StillBirthChildDetails?.vehicleFromMl,
        vehicleToMl: data?.StillBirthChildDetails?.vehicleToMl,
        setadmittedHospitalEn: data?.StillBirthChildDetails?.setadmittedHospitalEn ? data?.StillBirthChildDetails?.setadmittedHospitalEn.code : null,
        vehicleDesDetailsEn: data?.StillBirthChildDetails?.vehicleDesDetailsEn ? data?.StillBirthChildDetails?.vehicleDesDetailsEn.code : null,
        publicPlaceType: data?.StillBirthChildDetails?.publicPlaceType ? data?.StillBirthChildDetails?.publicPlaceType.code : null,
        localityNameEn: data?.StillBirthChildDetails?.localityNameEn,
        localityNameMl: data?.StillBirthChildDetails?.localityNameMl,
        streetNameEn: data?.StillBirthChildDetails?.streetNameEn,
        streetNameMl: data?.StillBirthChildDetails?.streetNameMl,
        publicPlaceDecpEn: data?.StillBirthChildDetails?.publicPlaceDecpEn,
        causeFoetalDeath: data?.StillBirthChildDetails?.causeFoetalDeath,
        pregnancyDuration: data?.StillBirthChildDetails?.pregnancyDuration ? data?.StillBirthChildDetails?.pregnancyDuration : null,
        medicalAttensionSub: data?.StillBirthChildDetails?.medicalAttensionSub ? data?.StillBirthChildDetails?.medicalAttensionSub.code : null,
        deliveryMethods: data?.StillBirthChildDetails?.deliveryMethods ? data?.StillBirthChildDetails?.deliveryMethods.code : null,
        action:"INITIATE",
        applicationtype: "CRBRNR",
        businessservice: "birth-services",
        workflowcode: data?.StillBirthChildDetails?.workFlowCode,
        StillBirthParentsDetails: {
          motherFirstNameEn: data?.StillBirthParentsDetails?.motherFirstNameEn,
          motherFirstNameMl: data?.StillBirthParentsDetails?.motherFirstNameMl,
          motherAadhar: data?.StillBirthParentsDetails?.motherAadhar,          
          motherMarriageBirth: data?.StillBirthParentsDetails?.motherMarriageBirth,
          motherEducation: data?.StillBirthParentsDetails?.motherEducation ? data?.StillBirthParentsDetails?.motherEducation.code : null,
          motherProfession: data?.StillBirthParentsDetails?.motherProfession ? data?.StillBirthParentsDetails?.motherProfession.code : null,
          motherNationality: data?.StillBirthParentsDetails?.motherNationality ? data?.StillBirthParentsDetails?.motherNationality.code : null,
          orderofChildren: data?.StillBirthParentsDetails?.orderofChildren,
          fatherAadhar: data?.StillBirthParentsDetails?.fatherAadhar,
          ismotherInfo: data?.StillBirthParentsDetails?.isMotherInfo,
          isfatherInfo: data?.StillBirthParentsDetails?.isFatherInfo,
          fatherFirstNameEn: data?.StillBirthParentsDetails?.fatherFirstNameEn,
          fatherFirstNameMl: data?.StillBirthParentsDetails?.fatherFirstNameMl,
          fatherNationality: data?.StillBirthParentsDetails?.fatherNationality ? data?.StillBirthParentsDetails?.fatherNationality.code : null,
          fatherEducation: data?.StillBirthParentsDetails?.fatherEducation ? data?.StillBirthParentsDetails?.fatherEducation.code : null,
          fatherProfession: data?.StillBirthParentsDetails?.fatherProfession ? data?.StillBirthParentsDetails?.fatherProfession.code : null,
          Religion: data?.StillBirthParentsDetails?.Religion ? data?.StillBirthParentsDetails?.Religion.code : null,
          fatherMobile: data?.StillBirthParentsDetails?.fatherMobile,
          fatherEmail: data?.StillBirthParentsDetails?.fatherEmail,
        },
        AddressBirthDetails: {
          presentaddressCountry: data?.AddressBirthDetails?.presentaddressCountry ? data?.AddressBirthDetails?.presentaddressCountry.code : null,
          presentaddressStateName: data?.AddressBirthDetails?.presentaddressStateName ? data?.AddressBirthDetails?.presentaddressStateName.code : null,
          presentInsideKeralaLBName: data?.AddressBirthDetails?.presentInsideKeralaLBName ? data?.AddressBirthDetails?.presentInsideKeralaLBName.code : null,
          presentInsideKeralaDistrict: data?.AddressBirthDetails?.presentInsideKeralaDistrict ? data?.AddressBirthDetails?.presentInsideKeralaDistrict.code : null,
          presentInsideKeralaTaluk: data?.AddressBirthDetails?.presentInsideKeralaTaluk ? data?.AddressBirthDetails?.presentInsideKeralaTaluk.code : null,
          presentInsideKeralaVillage: data?.AddressBirthDetails?.presentInsideKeralaVillage ? data?.AddressBirthDetails?.presentInsideKeralaVillage.code : null,
          presentInsideKeralaLocalityNameEn: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.AddressBirthDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.AddressBirthDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.AddressBirthDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.AddressBirthDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPincode: data?.AddressBirthDetails?.presentInsideKeralaPincode ? data?.AddressBirthDetails?.presentInsideKeralaPincode.code : null,
          presentInsideKeralaPostOffice: data?.AddressBirthDetails?.presentInsideKeralaPostOffice ? data?.AddressBirthDetails?.presentInsideKeralaPostOffice.code : null,
          presentWardNo: data?.AddressBirthDetails?.presentWardNo ? data?.AddressBirthDetails?.presentWardNo.code : null,
          presentOutsideKeralaDistrict: data?.AddressBirthDetails?.presentOutsideKeralaDistrict ? data?.AddressBirthDetails?.presentOutsideKeralaDistrict.code : null,
          presentOutsideKeralaTaluk: data?.AddressBirthDetails?.presentOutsideKeralaTaluk ? data?.AddressBirthDetails?.presentOutsideKeralaTaluk.code : null,
          presentOutsideKeralaVillage: data?.AddressBirthDetails?.presentOutsideKeralaVillage ? data?.AddressBirthDetails?.presentOutsideKeralaVillage.code : null,
          presentOutsideKeralaCityVilgeEn: data?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.AddressBirthDetails?.presentOutsideKeralaPincode ? data?.AddressBirthDetails?.presentOutsideKeralaPincode.code : null,
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
          presentOutSideIndiaadrsVillage: data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage ? data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage.code : null,
          presentOutSideIndiaadrsCityTown: data?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown,
          isPrsentAddress: data?.AddressBirthDetails?.isPrsentAddress,
          permtaddressCountry: data?.AddressBirthDetails?.permtaddressCountry ? data?.AddressBirthDetails?.permtaddressCountry.code : null,
          permtaddressStateName: data?.AddressBirthDetails?.permtaddressStateName ? data?.AddressBirthDetails?.permtaddressStateName.code : null,
          permntInKeralaAdrLBName: data?.AddressBirthDetails?.permntInKeralaAdrLBName ? data?.AddressBirthDetails?.permntInKeralaAdrLBName.code : null,
          permntInKeralaAdrDistrict: data?.AddressBirthDetails?.permntInKeralaAdrDistrict ? data?.AddressBirthDetails?.permntInKeralaAdrDistrict.code : null,
          permntInKeralaAdrTaluk: data?.AddressBirthDetails?.permntInKeralaAdrTaluk ? data?.AddressBirthDetails?.permntInKeralaAdrTaluk.code : null,
          permntInKeralaAdrVillage: data?.AddressBirthDetails?.permntInKeralaAdrVillage ? data?.AddressBirthDetails?.permntInKeralaAdrVillage.code : null,
          permntInKeralaAdrLocalityNameEn: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrStreetNameEn: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn,
          permntInKeralaAdrHouseNameEn: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.AddressBirthDetails?.permntInKeralaAdrPincode ? data?.AddressBirthDetails?.permntInKeralaAdrPincode.code : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk.code : null,
          permntOutsideKeralaVillage: data?.AddressBirthDetails?.permntOutsideKeralaVillage ? data?.AddressBirthDetails?.permntOutsideKeralaVillage.code : null,
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
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
        },
        StillBirthInformarHosInstDetails: {
          infomantFirstNameEn: data?.StillBirthInformarHosInstDetails?.infomantFirstNameEn,
          infomantAadhar: data?.StillBirthInformarHosInstDetails?.infomantAadhar,
          infomantMobile: data?.StillBirthInformarHosInstDetails?.infomantMobile,
          informerAddress: data?.StillBirthInformarHosInstDetails?.informerAddress,
          informerDesi: data?.StillBirthInformarHosInstDetails?.informerDesi,
          isDeclarationInfo: data?.StillBirthInformarHosInstDetails?.isDeclarationInfo,
        },
        StillBirthInitiatorDetails: {
          relation: data?.StillBirthInitiatorDetails?.relation,
          initiatorNameEn: data?.StillBirthInitiatorDetails?.initiatorNameEn,
          initiatorAadhar: data?.StillBirthInitiatorDetails?.initiatorAadhar,
          initiatorMobile: data?.StillBirthInitiatorDetails?.initiatorMobile,
          initiatorDesi: data?.StillBirthInitiatorDetails?.initiatorDesi,
          initiatorAddress: data?.StillBirthInitiatorDetails?.initiatorAddress,
          isInitiatorDeclaration: data?.StillBirthInitiatorDetails?.isInitiatorDeclaration,
          isCaretaker: data?.StillBirthInitiatorDetails?.isCaretaker,
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
  // let tenantId = "";
  // tenantId = empTenantId["code"];
  const formdata = {
    deathCertificateDtls: [
      {
        InformationDeath: {
          Id: null,
          RegistrationUnit: null,
          TenantId: data?.InformationDeath?.tenantId,
          DateOfDeath: Date.parse(data?.InformationDeath?.DateOfDeath),
          TimeOfDeath: parseInt(data?.InformationDeath?.TimeOfDeath),
          TimeOfDeathUnit: "AM",
          DeathPlace: data?.InformationDeath?.DeathPlace.code,
          DeathPlaceType: data?.InformationDeath?.DeathPlaceType ? data?.InformationDeath?.DeathPlaceType.code : null,
          DeathPlaceInstId: data?.InformationDeath?.DeathPlaceInstId ? data?.InformationDeath?.DeathPlaceInstId.code : null,
          VehicleNumber: data?.InformationDeath?.VehicleNumber,
          VehicleFromplaceEn: data?.InformationDeath?.VehicleFromplaceEn,
          VehicleFromplaceMl: data?.InformationDeath?.VehicleFromplaceMl,
          VehicleToPlaceEn: data?.InformationDeath?.VehicleToPlaceEn,
          VehicleToPlaceMl: data?.InformationDeath?.VehicleToPlaceMl,
          VehicleFirstHalt: data?.InformationDeath?.VehicleFirstHalt,
          VehicleFirstHaltMl: data?.InformationDeath?.VehicleFirstHaltMl,
          VehicleHospitalEn: data?.InformationDeath?.VehicleHospitalEn ? data?.InformationDeath?.VehicleHospitalEn.code : null,
          DeathPlaceCountry: data?.InformationDeath?.DeathPlaceCountry ? data?.InformationDeath?.DeathPlaceCountry.code : null,
          DeathPlaceState: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState.code : null,
          DeathPlaceDistrict: data?.InformationDeath?.DeathPlaceState ? data?.InformationDeath?.DeathPlaceState.code : null,
          DeathPlaceCity: data?.InformationDeath?.DeathPlaceCity,
          DeathPlaceRemarksEn: data?.InformationDeath?.DeathPlaceRemarksEn,
          DeathPlaceRemarksMl: data?.InformationDeath?.DeathPlaceRemarksMl,
          DeathPlaceWardId: data?.InformationDeath?.DeathPlaceWardId ? data?.InformationDeath?.DeathPlaceWardId.code : null,
          PlaceOfBurialEn: data?.InformationDeath?.PlaceOfBurialEn,
          PlaceOfBurialMl: data?.InformationDeath?.PlaceOfBurialMl,
          DeathPlaceLocalityEn: data?.InformationDeath?.DeathPlaceLocalityEn,
          DeathPlaceLocalityMl: data?.InformationDeath?.DeathPlaceLocalityMl,
          DeathPlaceStreetEn: data?.InformationDeath?.DeathPlaceStreetEn,
          DeathPlaceStreetMl: data?.InformationDeath?.DeathPlaceStreetMl,
          GeneralRemarks: data?.InformationDeath?.GeneralRemarks,
          // DeathPlaceHomeId: "id",
          // DeathDtlId: null,
          // DeathPlaceHomeAddrTypeId: "D",
          // DeathPlaceHomeCountryId: "country_id",
          // DeathPlaceHomeStateId: "state_id",
          // DeathPlaceHomeDistrictId: "district_id",
          // DeathPlaceHomeTalukId: "taluk_id",
          // DeathPlaceHomeVillageId: "village_id",
          // DeathPlaceHomeLbType: "lbType",
          DeathPlaceHomeWardId: data?.InformationDeath?.DeathPlaceHomeWardId ? data?.InformationDeath?.DeathPlaceHomeWardId : null,
          DeathPlaceHomePostofficeId: data?.InformationDeath?.DeathPlaceHomePostofficeId
            ? data?.InformationDeath.DeathPlaceHomePostofficeId.code
            : null,
          DeathPlaceHomePincode: data?.InformationDeath?.DeathPlaceHomePincode ? data?.InformationDeath.DeathPlaceHomePincode.code : null,
          DeathPlaceHomeLocalityEn: data?.InformationDeath?.DeathPlaceHomeLocalityEn ? data?.InformationDeath.DeathPlaceHomeLocalityEn : null,
          DeathPlaceHomeLocalityMl: data?.InformationDeath?.DeathPlaceHomeLocalityMl ? data?.InformationDeath.DeathPlaceHomeLocalityMl : null,
          DeathPlaceHomeStreetNameEn: data?.InformationDeath?.DeathPlaceHomeStreetNameEn ? data?.InformationDeath.DeathPlaceHomeStreetNameEn : null,
          DeathPlaceHomeStreetNameMl: data?.InformationDeath?.DeathPlaceHomeStreetNameMl ? data?.InformationDeath.DeathPlaceHomeStreetNameMl : null,
          DeathPlaceHomeHoueNameEn: data?.InformationDeath?.DeathPlaceHomeHoueNameEn ? data?.InformationDeath.DeathPlaceHomeHoueNameEn : null,
          DeathPlaceHomeHoueNameMl: data?.InformationDeath?.DeathPlaceHomeHoueNameMl ? data?.InformationDeath.DeathPlaceHomeHoueNameMl : null,
          ////////
          DeceasedAadharNotAvailable: data?.InformationDeath?.DeceasedAadharNotAvailable,
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
          presentaddressStateName: data?.AddressBirthDetails?.presentaddressStateName ? data?.AddressBirthDetails?.presentaddressStateName.code : null,
          presentInsideKeralaLBName: data?.AddressBirthDetails?.presentInsideKeralaLBName ? data?.AddressBirthDetails?.presentInsideKeralaLBName.code : null,
          presentInsideKeralaDistrict: data?.AddressBirthDetails?.presentInsideKeralaDistrict ? data?.AddressBirthDetails?.presentInsideKeralaDistrict.code : null,
          presentInsideKeralaTaluk: data?.AddressBirthDetails?.presentInsideKeralaTaluk ? data?.AddressBirthDetails?.presentInsideKeralaTaluk.code : null,
          presentInsideKeralaVillage: data?.AddressBirthDetails?.presentInsideKeralaVillage ? data?.AddressBirthDetails?.presentInsideKeralaVillage.code : null,
          presentInsideKeralaLocalityNameEn: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameEn,
          presentInsideKeralaStreetNameEn: data?.AddressBirthDetails?.presentInsideKeralaStreetNameEn,
          presentInsideKeralaHouseNameEn: data?.AddressBirthDetails?.presentInsideKeralaHouseNameEn,
          presentInsideKeralaLocalityNameMl: data?.AddressBirthDetails?.presentInsideKeralaLocalityNameMl,
          presentInsideKeralaStreetNameMl: data?.AddressBirthDetails?.presentInsideKeralaStreetNameMl,
          presentInsideKeralaHouseNameMl: data?.AddressBirthDetails?.presentInsideKeralaHouseNameMl,
          presentInsideKeralaPincode: data?.AddressBirthDetails?.presentInsideKeralaPincode ? data?.AddressBirthDetails?.presentInsideKeralaPincode.code : null,
          presentInsideKeralaPostOffice: data?.AddressBirthDetails?.presentInsideKeralaPostOffice ? data?.AddressBirthDetails?.presentInsideKeralaPostOffice.code : null,
          presentWardNo: data?.AddressBirthDetails?.presentWardNo ? data?.AddressBirthDetails?.presentWardNo.code : null,
          presentOutsideKeralaDistrict: data?.AddressBirthDetails?.presentOutsideKeralaDistrict ? data?.AddressBirthDetails?.presentOutsideKeralaDistrict.code : null,
          presentOutsideKeralaTaluk: data?.AddressBirthDetails?.presentOutsideKeralaTaluk ? data?.AddressBirthDetails?.presentOutsideKeralaTaluk.code : null,
          presentOutsideKeralaVillage: data?.AddressBirthDetails?.presentOutsideKeralaVillage ? data?.AddressBirthDetails?.presentOutsideKeralaVillage.code : null,
          presentOutsideKeralaCityVilgeEn: data?.AddressBirthDetails?.presentOutsideKeralaCityVilgeEn,
          presentOutsideKeralaPincode: data?.AddressBirthDetails?.presentOutsideKeralaPincode ? data?.AddressBirthDetails?.presentOutsideKeralaPincode.code : null,
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
          presentOutSideIndiaadrsVillage: data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage ? data?.AddressBirthDetails?.presentOutSideIndiaadrsVillage.code : null,
          presentOutSideIndiaadrsCityTown: data?.AddressBirthDetails?.presentOutSideIndiaadrsCityTown,
          isPrsentAddress: data?.AddressBirthDetails?.isPrsentAddress,
          permtaddressCountry: data?.AddressBirthDetails?.permtaddressCountry ? data?.AddressBirthDetails?.permtaddressCountry.code : null,
          permtaddressStateName: data?.AddressBirthDetails?.permtaddressStateName ? data?.AddressBirthDetails?.permtaddressStateName.code : null,
          permntInKeralaAdrLBName: data?.AddressBirthDetails?.permntInKeralaAdrLBName ? data?.AddressBirthDetails?.permntInKeralaAdrLBName.code : null,
          permntInKeralaAdrDistrict: data?.AddressBirthDetails?.permntInKeralaAdrDistrict ? data?.AddressBirthDetails?.permntInKeralaAdrDistrict.code : null,
          permntInKeralaAdrTaluk: data?.AddressBirthDetails?.permntInKeralaAdrTaluk ? data?.AddressBirthDetails?.permntInKeralaAdrTaluk.code : null,
          permntInKeralaAdrVillage: data?.AddressBirthDetails?.permntInKeralaAdrVillage ? data?.AddressBirthDetails?.permntInKeralaAdrVillage.code : null,
          permntInKeralaAdrLocalityNameEn: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn,
          permntInKeralaAdrStreetNameEn: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn,
          permntInKeralaAdrHouseNameEn: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn,
          permntInKeralaAdrLocalityNameMl: data?.AddressBirthDetails?.permntInKeralaAdrLocalityNameMl,
          permntInKeralaAdrStreetNameMl: data?.AddressBirthDetails?.permntInKeralaAdrStreetNameMl,
          permntInKeralaAdrHouseNameMl: data?.AddressBirthDetails?.permntInKeralaAdrHouseNameMl,
          permntInKeralaAdrPincode: data?.AddressBirthDetails?.permntInKeralaAdrPincode ? data?.AddressBirthDetails?.permntInKeralaAdrPincode.code : null,
          permntInKeralaAdrPostOffice: data?.AddressBirthDetails?.permntInKeralaAdrPostOffice ? data?.AddressBirthDetails?.permntInKeralaAdrPostOffice.code : null,
          permntInKeralaWardNo: data?.AddressBirthDetails?.permntInKeralaWardNo ? data?.AddressBirthDetails?.permntInKeralaWardNo.code : null,
          permntOutsideKeralaDistrict: data?.AddressBirthDetails?.permntOutsideKeralaDistrict ? data?.AddressBirthDetails?.permntOutsideKeralaDistrict.code : null,
          permntOutsideKeralaTaluk: data?.AddressBirthDetails?.permntOutsideKeralaTaluk ? data?.AddressBirthDetails?.permntOutsideKeralaTaluk.code : null,
          permntOutsideKeralaVillage: data?.AddressBirthDetails?.permntOutsideKeralaVillage ? data?.AddressBirthDetails?.permntOutsideKeralaVillage.code : null,
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
          permntOutsideIndiaVillage: data?.AddressBirthDetails?.permntOutsideIndiaVillage ? data?.AddressBirthDetails?.permntOutsideIndiaVillage.code : null,
          permntOutsideIndiaCityTown: data?.AddressBirthDetails?.permntOutsideIndiaCityTown,
          permanentOutsideIndiaPostCode: data?.AddressBirthDetails?.permanentOutsideIndiaPostCode,
        },
        FamilyInformationDeath: {
          SpouseUnavailable: data?.FamilyInformationDeath?.SpouseUnavailable,
          SpouseType: data?.FamilyInformationDeath?.SpouseType ? data?.FamilyInformationDeath?.SpouseType.code : null,
          SpouseNameEn: data?.FamilyInformationDeath?.SpouseNameEN ? data?.FamilyInformationDeath?.SpouseNameEN : null,
          SpouseNameML: data?.FamilyInformationDeath?.SpouseNameMl ? data?.FamilyInformationDeath?.SpouseNameMl : null,
          FatherUnavailable: data?.FamilyInformationDeath?.SpouseUnavailable,
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
          InformantAadharSubmitted: null,
          InformantAadharNo: data?.Informer?.InformantAadharNo,
          InformantNameEn: data?.Informer?.InformantNameEn,
          DeathSignedOfficerDesignation: data?.Informer?.DeathSignedOfficerDesignation,
          InformantMobileNo: parseInt(data?.Informer?.InformantMobileNo),
          InformantAddress: data?.InformantDetails?.InformantAddress ? data?.InformantDetails?.InformantAddress : null,
          IsDeclarationInformant: data?.InformantDetails?.IsDeclarationInformant ? data?.InformantDetails?.IsDeclarationInformant : false,
          InformantDocumentId: null,
          InformantDocumentDeathDtlId: null,
          InformantDocumentTenantId: data?.InformationDeath?.tenantId,
          InformantDocumentAckNo: null,
          InformantDocumentType: null,
          InformantDocumentUserType: null,
          InformantDocumentFileStoreId: null,
        },
        Initiator: {
          InitiatorRelation: data?.Initiator?.InitiatorRelation,
          InitiatorAadhaar: data?.Initiator?.InitiatorAadhaar,
          InitiatorName: data?.Initiator?.InitiatorName,
          InitiatorMobile: parseInt(data?.Initiator?.InitiatorMobile),
          InitiatorAddress: data?.Initiator?.InitiatorAddress,  
          InitiatorDocumentId: null,         
          InitiatorDocumentTenantId: data?.InformationDeath?.tenantId,
          InitiatorDocumentAckNo: null,
          InitiatorDocumentType: null,
          InitiatorDocumentUserType: null,
          InitiatorDocumentFileStoreId: null,
        },
        AuditDetails: {
          createdBy: null,
          lastModifiedBy: null,
          createdTime: null,
          lastModifiedTime: null,
        },
        applicationType: "new",
        applicationStatus: "Workflow_appl_status",
        businessService: "death-services",
        action: "INITIATE",
        assignee: [],
        workflowcode: data?.InformationDeath?.workFlowCode,
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
