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

export const convertToMarriageRegistration = (data = {}) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const formData = {
    MarriageDetails: [
      {
        id: null,
        marriageDOM: data?.MarriageDetails?.marriageDOM ? Date.parse(data?.MarriageDetails?.marriageDOM) : null,
        marriageDOR: Date.parse(today),
        marriageDistrictid: data?.MarriageDetails?.marriageDistrictid ? data?.MarriageDetails?.marriageDistrictid?.code : null,
        marriageTalukID: data?.MarriageDetails?.marriageTalukID ? data?.MarriageDetails?.marriageTalukID?.code : null,
        marriageVillageName: data?.MarriageDetails?.marriageVillageName ? data?.MarriageDetails?.marriageVillageName?.code : null,
        marriageVillageId: "1",
        marriageLBtype: data?.MarriageDetails?.marriageLBtype ? data?.MarriageDetails?.marriageLBtype?.code : null,
        marriageTenantid: data?.MarriageDetails?.marriageTenantid ? data?.MarriageDetails?.marriageTenantid?.code : null,
        marriageWardCode: data?.MarriageDetails?.marriageWardCode ? data?.MarriageDetails?.marriageWardCode?.code : null,
        marriagePlacetype: data?.MarriageDetails?.marriagePlacetype ? data?.MarriageDetails?.marriagePlacetype?.code : null,
        placeid: data?.MarriageDetails?.placeidEn ? data?.MarriageDetails?.placeidEn?.code : null,
        marriagePlacenameEn: data?.MarriageDetails?.marriagePlacenameEn ? data?.MarriageDetails?.marriagePlacenameEn : null,
        marriagePlacenameMl: data?.MarriageDetails?.marriagePlacenameMl ? data?.MarriageDetails?.marriagePlacenameMl : null,
        marriageLocalityEn: data?.MarriageDetails?.marriageLocalityEn ? data?.MarriageDetails?.marriageLocalityEn : null,
        marriageLocalityMl: data?.MarriageDetails?.marriageLocalityMl ? data?.MarriageDetails?.marriageLocalityMl : null,
        marriageStreetEn: data?.MarriageDetails?.marriageStreetEn ? data?.MarriageDetails?.marriageStreetEn : null,
        marriageStreetMl: data?.MarriageDetails?.marriageStreetMl ? data?.MarriageDetails?.marriageStreetMl : null,
        marriageLandmark: data?.MarriageDetails?.marriageLandmark ? data?.MarriageDetails?.marriageLandmark : null,
        marriagePublicOrPrivateNamePlaceEn: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn
          ? data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn
          : null,
        marriagePublicOrPrivateNamePlaceMl: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceMl
          ? data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceMl
          : null,
        marriageHouseNoAndNameEn: data?.MarriageDetails?.marriageHouseNoAndNameEn ? data?.MarriageDetails?.marriageHouseNoAndNameEn : null,
        marriageHouseNoAndNameMl: data?.MarriageDetails?.marriageHouseNoAndNameMl ? data?.MarriageDetails?.marriageHouseNoAndNameMl : null,
        marriageType: data?.MarriageDetails?.marriageType ? data?.MarriageDetails?.marriageType?.code : null,
        applicationType: "new",
        businessService: "CR",
        workflowCode: data?.MarriageDetails?.workFlowCode ? data?.MarriageDetails?.workFlowCode : "",
        isWorkflow: true,
        action: "INITIATE",
        registration_date: null,
        registrationNumber: null,
        status: "INITIATED",
        moduleCode: "CRMRNR",
        GroomDetails: {
          groomResidentShip: data?.GroomDetails?.groomResidentShip ? data?.GroomDetails?.groomResidentShip : null,
          groomAadharNo: data?.GroomDetails?.groomAadharNo ? data?.GroomDetails?.groomAadharNo : null,
          groomPassportNo: data?.GroomDetails?.groomPassportNo ? data?.GroomDetails?.groomPassportNo : null,
          groomSocialSecurityNo: data?.GroomDetails?.groomSocialSecurityNo ? data?.GroomDetails?.groomSocialSecurityNo : null,
          groomFirstnameEn: data?.GroomDetails?.groomFirstnameEn ? data?.GroomDetails?.groomFirstnameEn : null,
          groomFirstnameMl: data?.GroomDetails?.groomFirstnameMl ? data?.GroomDetails?.groomFirstnameMl : null,
          groomMiddlenameEn: data?.GroomDetails?.groomMiddlenameEn ? data?.GroomDetails?.groomMiddlenameEn : null,
          groomMiddlenameMl: data?.GroomDetails?.groomMiddlenameMl ? data?.GroomDetails?.groomMiddlenameMl : null,
          groomLastnameEn: data?.GroomDetails?.groomLastnameEn ? data?.GroomDetails?.groomLastnameEn : null,
          groomLastnameMl: data?.GroomDetails?.groomLastnameMl ? data?.GroomDetails?.groomLastnameMl : null,
          groomMobile: data?.GroomDetails?.groomMobile ? data?.GroomDetails?.groomMobile : null,
          groomEmailid: data?.GroomDetails?.groomEmailid ? data?.GroomDetails?.groomEmailid : null,
          groomGender: data?.GroomDetails?.groomGender ? data?.GroomDetails?.groomGender?.code : null,
          groomDOB: data?.GroomDetails?.groomDOB ? Date.parse(data?.GroomDetails?.groomDOB) : null,
          groomAge: data?.GroomDetails?.groomAge ? data?.GroomDetails?.groomAge : null,
          groomParentGuardian: data?.GroomDetails?.groomParentGuardian ? data?.GroomDetails?.groomParentGuardian : null,
          groomFathernameEn: data?.GroomDetails?.groomFathernameEn ? data?.GroomDetails?.groomFathernameEn : null,
          groomFathernameMl: data?.GroomDetails?.groomFathernameMl ? data?.GroomDetails?.groomFathernameMl : null,
          groomMothernameEn: data?.GroomDetails?.groomMothernameEn ? data?.GroomDetails?.groomMothernameEn : null,
          groomMothernameMl: data?.GroomDetails?.groomMothernameMl ? data?.GroomDetails?.groomMothernameMl : null,
          groomFatherAadharNo: data?.GroomDetails?.groomFatherAadharNo ? data?.GroomDetails?.groomFatherAadharNo : null,
          groomMotherAadharNo: data?.GroomDetails?.groomMotherAadharNo ? data?.GroomDetails?.groomMotherAadharNo : null,
          groomGuardiannameEn: data?.GroomDetails?.groomGuardiannameEn ? data?.GroomDetails?.groomGuardiannameEn : null,
          groomGuardiannameMl: data?.GroomDetails?.groomGuardiannameMl ? data?.GroomDetails?.groomGuardiannameMl : null,
          groomGuardianAadharNo: data?.GroomDetails?.groomGuardianAadharNo ? data?.GroomDetails?.groomGuardianAadharNo : null,
          groomMaritalstatusID: data?.GroomDetails?.groomMaritalstatusID ? data?.GroomDetails?.groomMaritalstatusID?.code : null,
          groomIsSpouseLiving: data?.GroomDetails?.groomIsSpouseLiving ? data?.GroomDetails?.groomIsSpouseLiving?.code : null,
          groomNoOfSpouse: data?.GroomDetails?.groomNoOfSpouse ? data?.GroomDetails?.groomNoOfSpouse : null,
        },
        BrideDetails: {
          brideResidentShip: data?.BrideDetails?.brideResidentShip ? data?.BrideDetails?.brideResidentShip : null,
          brideAadharNo: data?.BrideDetails?.brideAadharNo ? data?.BrideDetails?.brideAadharNo : null,
          bridePassportNo: data?.BrideDetails?.bridePassportNo ? data?.BrideDetails?.bridePassportNo : null,
          brideSocialSecurityNo: data?.BrideDetails?.brideSocialSecurityNo ? data?.BrideDetails?.brideSocialSecurityNo : null,
          brideFirstnameEn: data?.BrideDetails?.brideFirstnameEn ? data?.BrideDetails?.brideFirstnameEn : null,
          brideFirstnameMl: data?.BrideDetails?.brideFirstnameMl ? data?.BrideDetails?.brideFirstnameMl : null,
          brideMiddlenameEn: data?.BrideDetails?.brideMiddlenameEn ? data?.BrideDetails?.brideMiddlenameEn : null,
          brideMiddlenameMl: data?.BrideDetails?.brideMiddlenameMl ? data?.BrideDetails?.brideMiddlenameMl : null,
          brideLastnameEn: data?.BrideDetails?.brideLastnameEn ? data?.BrideDetails?.brideLastnameEn : null,
          brideLastnameMl: data?.BrideDetails?.brideLastnameMl ? data?.BrideDetails?.brideLastnameMl : null,
          brideMobile: data?.BrideDetails?.brideMobile ? data?.BrideDetails?.brideMobile : null,
          brideEmailid: data?.BrideDetails?.brideEmailid ? data?.BrideDetails?.brideEmailid : null,
          brideGender: data?.BrideDetails?.brideGender ? data?.BrideDetails?.brideGender?.code : null,
          brideDOB: data?.BrideDetails?.brideDOB ? Date.parse(data?.BrideDetails?.brideDOB) : null,
          brideAge: data?.BrideDetails?.brideAge ? data?.BrideDetails?.brideAge : null,
          brideParentGuardian: data?.BrideDetails?.brideParentGuardian ? data?.BrideDetails?.brideParentGuardian : null,
          brideFathernameEn: data?.BrideDetails?.brideFathernameEn ? data?.BrideDetails?.brideFathernameEn : null,
          brideFathernameMl: data?.BrideDetails?.brideFathernameMl ? data?.BrideDetails?.brideFathernameMl : null,
          brideMothernameEn: data?.BrideDetails?.brideMothernameEn ? data?.BrideDetails?.brideMothernameEn : null,
          brideMothernameMl: data?.BrideDetails?.brideMothernameMl ? data?.BrideDetails?.brideMothernameMl : null,
          brideFatherAadharNo: data?.BrideDetails?.brideFatherAadharNo ? data?.BrideDetails?.brideFatherAadharNo : null,
          brideMotherAadharNo: data?.BrideDetails?.brideMotherAadharNo ? data?.BrideDetails?.brideMotherAadharNo : null,
          brideGuardiannameEn: data?.BrideDetails?.brideGuardiannameEn ? data?.BrideDetails?.brideGuardiannameEn : null,
          brideGuardiannameMl: data?.BrideDetails?.brideGuardiannameMl ? data?.BrideDetails?.brideGuardiannameMl : null,
          brideGuardianAadharNo: data?.BrideDetails?.brideGuardianAadharNo ? data?.BrideDetails?.brideGuardianAadharNo : null,
          brideMaritalstatusID: data?.BrideDetails?.brideMaritalstatusID ? data?.BrideDetails?.brideMaritalstatusID?.code : null,
          brideIsSpouseLiving: data?.BrideDetails?.brideIsSpouseLiving ? data?.BrideDetails?.brideIsSpouseLiving?.code : null,
          brideNoOfSpouse: data?.BrideDetails?.brideNoOfSpouse ? data?.BrideDetails?.brideNoOfSpouse : null,
        },
        WitnessDetails: {
          witness1AadharNo: data?.WitnessDetails?.witness1AadharNo ? data?.WitnessDetails?.witness1AadharNo : null,
          witness1NameEn: data?.WitnessDetails?.witness1NameEn ? data?.WitnessDetails?.witness1NameEn : null,
          witness1NameMl: data?.WitnessDetails?.witness1NameMl ? data?.WitnessDetails?.witness1NameMl : null,
          witness1Age: data?.WitnessDetails?.witness1Age ? data?.WitnessDetails?.witness1Age : null,
          witness1AddresSEn: data?.WitnessDetails?.witness1AddresSEn ? data?.WitnessDetails?.witness1AddresSEn : null,
          // witness1AddressMl: data?.WitnessDetails?.witness1AddressMl ? data?.WitnessDetails?.witness1AddressMl : null,
          witness1Mobile: data?.WitnessDetails?.witness1Mobile ? data?.WitnessDetails?.witness1Mobile : null,
          witness1Esigned: data?.WitnessDetails?.witness1Esigned ? data?.WitnessDetails?.witness1Esigned : false,
          witness2AadharNo: data?.WitnessDetails?.witness2AadharNo ? data?.WitnessDetails?.witness2AadharNo : null,
          witness2NameEn: data?.WitnessDetails?.witness2NameEn ? data?.WitnessDetails?.witness2NameEn : null,
          // witness2NameMl: data?.WitnessDetails?.witness2NameMl ? data?.WitnessDetails?.witness2NameMl : null,
          witness2Age: data?.WitnessDetails?.witness2Age ? data?.WitnessDetails?.witness2Age : null,
          witness2AddresSEn: data?.WitnessDetails?.witness2AddresSEn ? data?.WitnessDetails?.witness2AddresSEn : null,
          // witness2AddressMl: data?.WitnessDetails?.witness2AddressMl ? data?.WitnessDetails?.witness2AddressMl : null,
          witness2Mobile: data?.WitnessDetails?.witness2Mobile ? data?.WitnessDetails?.witness2Mobile : null,
          witness2Esigned: data?.WitnessDetails?.witness2Esigned ? data?.WitnessDetails?.witness2Esigned : false,
          groomFileStoreId: data?.WitnessDetails?.groomFilestoreId ? data?.WitnessDetails?.groomFilestoreId[0] : null,
          brideFileStoreId: data?.WitnessDetails?.brideFilestoreId ? data?.WitnessDetails?.brideFilestoreId[0] : null,
          groomUrl: data?.WitnessDetails?.groomURL ? data?.WitnessDetails?.groomURL : null,
          brideUrl: data?.WitnessDetails?.brideURL ? data?.WitnessDetails?.brideURL : null,
          isBackward: data?.WitnessDetails?.isBackward && data?.WitnessDetails?.isBackward,
        },
        BrideAddressDetails: {
          presentaddressCountry: data?.BrideAddressDetails?.presentaddressCountry ? data?.BrideAddressDetails?.presentaddressCountry?.code : null,
          presentaddressStateName: data?.BrideAddressDetails?.presentaddressStateName
            ? data?.BrideAddressDetails?.presentaddressStateName?.code
            : null,
          presentInsideKeralaLBName: data?.BrideAddressDetails?.presentInsideKeralaLBName
            ? data?.BrideAddressDetails?.presentInsideKeralaLBName?.code
            : null,
          presentInsideKeralaDistrict: data?.BrideAddressDetails?.presentInsideKeralaDistrict
            ? data?.BrideAddressDetails?.presentInsideKeralaDistrict?.code
            : null,
          presentInsideKeralaTaluk: data?.BrideAddressDetails?.presentInsideKeralaTaluk
            ? data?.BrideAddressDetails?.presentInsideKeralaTaluk?.code
            : null,
          presentInsideKeralaVillage: data?.BrideAddressDetails?.presentInsideKeralaVillage
            ? data?.BrideAddressDetails?.presentInsideKeralaVillage?.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
            : null,
          presentInsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
            : null,
          presentInsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
            : null,
          presentInsideKeralaLocalityNameMl: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
            : null,
          presentInsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
            : null,
          presentInsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
            : null,
          presentInsideKeralaPostOffice: data?.BrideAddressDetails?.presentInsideKeralaPostOffice
            ? data?.BrideAddressDetails?.presentInsideKeralaPostOffice?.code
            : null,
          presentInsideKeralaPincode: data?.BrideAddressDetails?.presentInsideKeralaPincode
            ? data?.BrideAddressDetails?.presentInsideKeralaPincode
            : null,
          presentWardNo: data?.BrideAddressDetails?.presentWardNo ? data?.BrideAddressDetails?.presentWardNo?.code : null,
          presentOutsideKeralaDistrict: data?.BrideAddressDetails?.presentOutsideKeralaDistrict
            ? data?.BrideAddressDetails?.presentOutsideKeralaDistrict?.code
            : null,
          presentOutsideKeralaTaluk: data?.BrideAddressDetails?.presentOutsideKeralaTaluk
            ? data?.BrideAddressDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.BrideAddressDetails?.presentOutsideKeralaVillage
            ? data?.BrideAddressDetails?.presentOutsideKeralaVillage?.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            : null,
          presentOutsideKeralaPincode: data?.BrideAddressDetails?.presentOutsideKeralaPincode
            ? data?.BrideAddressDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            : null,
          presentOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
            : null,
          presentOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
            : null,
          presentOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
            : null,
          presentOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
            : null,
          presentOutsideKeralaLocalityNameMl: data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
            : null,
          presentOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
            : null,
          presentOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
            : null,
          presentOutSideIndiaAdressEn: data?.BrideAddressDetails?.presentOutSideIndiaAdressEn
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressEn
            : null,
          presentOutSideIndiaAdressMl: data?.BrideAddressDetails?.presentOutSideIndiaAdressMl
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressMl
            : null,
          presentOutSideIndiaAdressEnB: data?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
            : null,
          presentOutSideIndiaAdressMlB: data?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
            : null,
          presentOutSideIndiaProvinceEn: data?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
            ? data?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
            : null,
          presentOutSideIndiaProvinceMl: data?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
            ? data?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
            : null,
          // presentOutSideCountry: data?.BrideAddressDetails?.presentOutSideCountry ? data?.BrideAddressDetails?.presentOutSideCountry?.code : null,
          presentOutSideIndiaadrsVillage: data?.BrideAddressDetails?.presentOutSideIndiaadrsVillage
            ? data?.BrideAddressDetails?.presentOutSideIndiaadrsVillage?.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            ? data?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            : null,
          presentOutSideIndiaPostCode: data?.BrideAddressDetails?.presentOutSideIndiaPostCode
            ? data?.BrideAddressDetails?.presentOutSideIndiaPostCode
            : null,
          isPermanentAddress: data?.BrideAddressDetails?.isPrsentAddress ? data?.BrideAddressDetails?.isPrsentAddress : null,
          permtaddressCountry: data?.BrideAddressDetails?.permtaddressCountry ? data?.BrideAddressDetails?.permtaddressCountry?.code : null,
          permtaddressStateName: data?.BrideAddressDetails?.permtaddressStateName ? data?.BrideAddressDetails?.permtaddressStateName?.code : null,
          permntInKeralaAdrLBName: data?.BrideAddressDetails?.permntInKeralaAdrLBName
            ? data?.BrideAddressDetails?.permntInKeralaAdrLBName?.code
            : null,
          permntInKeralaAdrDistrict: data?.BrideAddressDetails?.permntInKeralaAdrDistrict
            ? data?.BrideAddressDetails?.permntInKeralaAdrDistrict?.code
            : null,
          permntInKeralaAdrTaluk: data?.BrideAddressDetails?.permntInKeralaAdrTaluk ? data?.BrideAddressDetails?.permntInKeralaAdrTaluk?.code : null,
          permntInKeralaAdrVillage: data?.BrideAddressDetails?.permntInKeralaAdrVillage
            ? data?.BrideAddressDetails?.permntInKeralaAdrVillage?.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn
            : null,
          permntInKeralaAdrStreetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
            : null,
          permntInKeralaAdrHouseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
            : null,
          permntInKeralaAdrLocalityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
            : null,
          permntInKeralaAdrStreetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
            : null,
          permntInKeralaAdrHouseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
            : null,
          permntInKeralaAdrPincode: data?.BrideAddressDetails?.permntInKeralaAdrPincode ? data?.BrideAddressDetails?.permntInKeralaAdrPincode : null,
          permntInKeralaAdrPostOffice: data?.BrideAddressDetails?.permntInKeralaAdrPostOffice?.code,
          permntInKeralaWardNo: data?.BrideAddressDetails?.permntInKeralaWardNo ? data?.BrideAddressDetails?.permntInKeralaWardNo?.code : null,
          permntOutsideKeralaDistrict: data?.BrideAddressDetails?.permntOutsideKeralaDistrict
            ? data?.BrideAddressDetails?.permntOutsideKeralaDistrict?.code
            : null,
          permntOutsideKeralaTaluk: data?.BrideAddressDetails?.permntOutsideKeralaTaluk ? data?.BrideAddressDetails?.permntOutsideKeralaTaluk : null,
          permntOutsideKeralaVillage: data?.BrideAddressDetails?.permntOutsideKeralaVillage
            ? data?.BrideAddressDetails?.permntOutsideKeralaVillage?.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
            : null,
          permntOutsideKeralaPincode: data?.BrideAddressDetails?.permntOutsideKeralaPincode
            ? data?.BrideAddressDetails?.permntOutsideKeralaPincode
            : null,
          permntOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
            : null,
          permntOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
            : null,
          permntOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
            : null,
          permntOutsideKeralaLocalityNameMl: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
            : null,
          permntOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
            : null,
          permntOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
            : null,
          permntOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            : null,
          permntOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
            : null,
          permntOutsideIndiaLineoneEn: data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
            : null,
          permntOutsideIndiaLineoneMl: data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
            : null,
          permntOutsideIndiaLinetwoEn: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
            : null,
          permntOutsideIndiaLinetwoMl: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
            : null,
          permntOutsideIndiaprovinceEn: data?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
            : null,
          permntOutsideIndiaprovinceMl: data?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
            : null,
          permntOutsideIndiaVillage: data?.BrideAddressDetails?.permntOutsideIndiaVillage
            ? data?.BrideAddressDetails?.permntOutsideIndiaVillage?.code
            : null,
          permntOutsideIndiaCityTown: data?.BrideAddressDetails?.permntOutsideIndiaCityTown
            ? data?.BrideAddressDetails?.permntOutsideIndiaCityTown
            : null,
          permanentOutsideIndiaPostCode: data?.BrideAddressDetails?.permanentOutsideIndiaPostCode
            ? data?.BrideAddressDetails?.permanentOutsideIndiaPostCode
            : null,
        },
        GroomAddressDetails: {
          presentaddressCountry: data?.GroomAddressDetails?.presentaddressCountry ? data?.GroomAddressDetails?.presentaddressCountry?.code : null,
          presentaddressStateName: data?.GroomAddressDetails?.presentaddressStateName
            ? data?.GroomAddressDetails?.presentaddressStateName?.code
            : null,
          presentInsideKeralaLBName: data?.GroomAddressDetails?.presentInsideKeralaLBName
            ? data?.GroomAddressDetails?.presentInsideKeralaLBName?.code
            : null,
          presentInsideKeralaDistrict: data?.GroomAddressDetails?.presentInsideKeralaDistrict
            ? data?.GroomAddressDetails?.presentInsideKeralaDistrict?.code
            : null,
          presentInsideKeralaTaluk: data?.GroomAddressDetails?.presentInsideKeralaTaluk
            ? data?.GroomAddressDetails?.presentInsideKeralaTaluk?.code
            : null,
          presentInsideKeralaVillage: data?.GroomAddressDetails?.presentInsideKeralaVillage
            ? data?.GroomAddressDetails?.presentInsideKeralaVillage?.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
            : null,
          presentInsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
            : null,
          presentInsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
            : null,
          presentInsideKeralaLocalityNameMl: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
            : null,
          presentInsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
            : null,
          presentInsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
            : null,
          presentInsideKeralaPostOffice: data?.GroomAddressDetails?.presentInsideKeralaPostOffice
            ? data?.GroomAddressDetails?.presentInsideKeralaPostOffice?.code
            : null,
          presentInsideKeralaPincode: data?.GroomAddressDetails?.presentInsideKeralaPincode
            ? data?.GroomAddressDetails?.presentInsideKeralaPincode
            : null,
          presentWardNo: data?.GroomAddressDetails?.presentWardNo ? data?.GroomAddressDetails?.presentWardNo?.code : null,
          presentOutsideKeralaDistrict: data?.GroomAddressDetails?.presentOutsideKeralaDistrict
            ? data?.GroomAddressDetails?.presentOutsideKeralaDistrict?.code
            : null,
          presentOutsideKeralaTaluk: data?.GroomAddressDetails?.presentOutsideKeralaTaluk
            ? data?.GroomAddressDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.GroomAddressDetails?.presentOutsideKeralaVillage
            ? data?.GroomAddressDetails?.presentOutsideKeralaVillage?.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
            : null,
          presentOutsideKeralaPincode: data?.GroomAddressDetails?.presentOutsideKeralaPincode
            ? data?.GroomAddressDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
            : null,
          presentOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
            : null,
          presentOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
            : null,
          presentOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
            : null,
          presentOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
            : null,
          presentOutsideKeralaLocalityNameMl: data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
            : null,
          presentOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
            : null,
          presentOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
            : null,
          presentOutSideIndiaAdressEn: data?.GroomAddressDetails?.presentOutSideIndiaAdressEn
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressEn
            : null,
          presentOutSideIndiaAdressMl: data?.GroomAddressDetails?.presentOutSideIndiaAdressMl
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressMl
            : null,
          presentOutSideIndiaAdressEnB: data?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
            : null,
          presentOutSideIndiaAdressMlB: data?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
            : null,
          presentOutSideIndiaProvinceEn: data?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
            ? data?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
            : null,
          presentOutSideIndiaProvinceMl: data?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
            ? data?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
            : null,
          // presentOutSideCountry: data?.GroomAddressDetails?.presentOutSideCountry ? data?.GroomAddressDetails?.presentOutSideCountry?.code : null,
          presentOutSideIndiaadrsVillage: data?.GroomAddressDetails?.presentOutSideIndiaadrsVillage
            ? data?.GroomAddressDetails?.presentOutSideIndiaadrsVillage?.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            ? data?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            : null,
          presentOutSideIndiaPostCode: data?.GroomAddressDetails?.presentOutSideIndiaPostCode
            ? data?.GroomAddressDetails?.presentOutSideIndiaPostCode
            : null,
          isPermanentAddress: data?.GroomAddressDetails?.isPrsentAddress ? data?.GroomAddressDetails?.isPrsentAddress : null,
          permtaddressCountry: data?.GroomAddressDetails?.permtaddressCountry ? data?.GroomAddressDetails?.permtaddressCountry?.code : null,
          permtaddressStateName: data?.GroomAddressDetails?.permtaddressStateName ? data?.GroomAddressDetails?.permtaddressStateName?.code : null,
          permntInKeralaAdrLBName: data?.GroomAddressDetails?.permntInKeralaAdrLBName
            ? data?.GroomAddressDetails?.permntInKeralaAdrLBName?.code
            : null,
          permntInKeralaAdrDistrict: data?.GroomAddressDetails?.permntInKeralaAdrDistrict
            ? data?.GroomAddressDetails?.permntInKeralaAdrDistrict?.code
            : null,
          permntInKeralaAdrTaluk: data?.GroomAddressDetails?.permntInKeralaAdrTaluk ? data?.GroomAddressDetails?.permntInKeralaAdrTaluk?.code : null,
          permntInKeralaAdrVillage: data?.GroomAddressDetails?.permntInKeralaAdrVillage
            ? data?.GroomAddressDetails?.permntInKeralaAdrVillage?.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
            : null,
          permntInKeralaAdrStreetNameEn: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn
            : null,
          permntInKeralaAdrHouseNameEn: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
            : null,
          permntInKeralaAdrLocalityNameMl: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
            : null,
          permntInKeralaAdrStreetNameMl: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
            : null,
          permntInKeralaAdrHouseNameMl: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
            : null,
          permntInKeralaAdrPincode: data?.GroomAddressDetails?.permntInKeralaAdrPincode ? data?.GroomAddressDetails?.permntInKeralaAdrPincode : null,
          permntInKeralaAdrPostOffice: data?.GroomAddressDetails?.permntInKeralaAdrPostOffice
            ? data?.GroomAddressDetails?.permntInKeralaAdrPostOffice?.code
            : null,
          permntInKeralaWardNo: data?.GroomAddressDetails?.permntInKeralaWardNo ? data?.GroomAddressDetails?.permntInKeralaWardNo?.code : null,
          permntOutsideKeralaDistrict: data?.GroomAddressDetails?.permntOutsideKeralaDistrict
            ? data?.GroomAddressDetails?.permntOutsideKeralaDistrict?.code
            : null,
          permntOutsideKeralaTaluk: data?.GroomAddressDetails?.permntOutsideKeralaTaluk ? data?.GroomAddressDetails?.permntOutsideKeralaTaluk : null,
          permntOutsideKeralaVillage: data?.GroomAddressDetails?.permntOutsideKeralaVillage
            ? data?.GroomAddressDetails?.permntOutsideKeralaVillage?.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
            : null,
          permntOutsideKeralaPincode: data?.GroomAddressDetails?.permntOutsideKeralaPincode
            ? data?.GroomAddressDetails?.permntOutsideKeralaPincode
            : null,
          permntOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
            : null,
          permntOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
            : null,
          permntOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
            : null,
          permntOutsideKeralaLocalityNameMl: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
            : null,
          permntOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
            : null,
          permntOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
            : null,
          permntOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            : null,
          permntOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
            : null,
          permntOutsideIndiaLineoneEn: data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
            : null,
          permntOutsideIndiaLineoneMl: data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
            : null,
          permntOutsideIndiaLinetwoEn: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
            : null,
          permntOutsideIndiaLinetwoMl: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
            : null,
          permntOutsideIndiaprovinceEn: data?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
            : null,
          permntOutsideIndiaprovinceMl: data?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
            : null,
          permntOutsideIndiaVillage: data?.GroomAddressDetails?.permntOutsideIndiaVillage
            ? data?.GroomAddressDetails?.permntOutsideIndiaVillage?.code
            : null,
          permntOutsideIndiaCityTown: data?.GroomAddressDetails?.permntOutsideIndiaCityTown
            ? data?.GroomAddressDetails?.permntOutsideIndiaCityTown
            : null,
          permanentOutsideIndiaPostCode: data?.GroomAddressDetails?.permanentOutsideIndiaPostCode
            ? data?.GroomAddressDetails?.permanentOutsideIndiaPostCode
            : null,
        },
        MarriageDocuments: data?.MarriageDocuments?.DocumentDetails,
      },
    ],
  };
  return formData;
};

export const convertToEditMarriageRegistration = (data = {}) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const formData = {
    MarriageDetails: [
      {
        id: null,
        marriageDOM: data?.MarriageDetails?.marriageDOM ? Date.parse(data?.MarriageDetails?.marriageDOM) : null,
        marriageDOR: Date.parse(today),
        marriageDistrictid: data?.MarriageDetails?.marriageDistrictid ? data?.MarriageDetails?.marriageDistrictid?.code : null,
        marriageTalukID: data?.MarriageDetails?.marriageTalukID ? data?.MarriageDetails?.marriageTalukID?.code : null,
        marriageVillageName: data?.MarriageDetails?.marriageVillageName ? data?.MarriageDetails?.marriageVillageName?.code : null,
        marriageVillageId: "1",
        marriageLBtype: data?.MarriageDetails?.marriageLBtype ? data?.MarriageDetails?.marriageLBtype?.code : null,
        marriageTenantid: data?.MarriageDetails?.marriageTenantid ? data?.MarriageDetails?.marriageTenantid?.code : null,
        marriageWardCode: data?.MarriageDetails?.marriageWardCode ? data?.MarriageDetails?.marriageWardCode?.code : null,
        marriagePlacetype: data?.MarriageDetails?.marriagePlacetype ? data?.MarriageDetails?.marriagePlacetype?.code : null,
        placeid: data?.MarriageDetails?.placeidEn ? data?.MarriageDetails?.placeidEn?.code : null,
        marriagePlacenameEn: data?.MarriageDetails?.marriagePlacenameEn ? data?.MarriageDetails?.marriagePlacenameEn : null,
        marriagePlacenameMl: data?.MarriageDetails?.marriagePlacenameMl ? data?.MarriageDetails?.marriagePlacenameMl : null,
        marriageLocalityEn: data?.MarriageDetails?.marriageLocalityEn ? data?.MarriageDetails?.marriageLocalityEn : null,
        marriageLocalityMl: data?.MarriageDetails?.marriageLocalityMl ? data?.MarriageDetails?.marriageLocalityMl : null,
        marriageStreetEn: data?.MarriageDetails?.marriageStreetEn ? data?.MarriageDetails?.marriageStreetEn : null,
        marriageStreetMl: data?.MarriageDetails?.marriageStreetMl ? data?.MarriageDetails?.marriageStreetMl : null,
        marriageLandmark: data?.MarriageDetails?.marriageLandmark ? data?.MarriageDetails?.marriageLandmark : null,
        marriagePublicOrPrivateNamePlaceEn: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn
          ? data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceEn
          : null,
        marriagePublicOrPrivateNamePlaceMl: data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceMl
          ? data?.MarriageDetails?.marriagePublicOrPrivateNamePlaceMl
          : null,
        marriageHouseNoAndNameEn: data?.MarriageDetails?.marriageHouseNoAndNameEn ? data?.MarriageDetails?.marriageHouseNoAndNameEn : null,
        marriageHouseNoAndNameMl: data?.MarriageDetails?.marriageHouseNoAndNameMl ? data?.MarriageDetails?.marriageHouseNoAndNameMl : null,
        marriageType: data?.MarriageDetails?.marriageType ? data?.MarriageDetails?.marriageType?.code : null,
        applicationType: "new",
        businessService: "CR",
        workflowCode: data?.MarriageDetails?.workFlowCode ? data?.MarriageDetails?.workFlowCode : "",
        isWorkflow: true,
        action: "PAY",
        registration_date: null,
        registrationNumber: null,
        status: "INITIATED",
        moduleCode: "CRMRNR",
        GroomDetails: {
          groomResidentShip: data?.GroomDetails?.groomResidentShip ? data?.GroomDetails?.groomResidentShip : null,
          groomAadharNo: data?.GroomDetails?.groomAadharNo ? data?.GroomDetails?.groomAadharNo : null,
          groomPassportNo: data?.GroomDetails?.groomPassportNo ? data?.GroomDetails?.groomPassportNo : null,
          groomSocialSecurityNo: data?.GroomDetails?.groomSocialSecurityNo ? data?.GroomDetails?.groomSocialSecurityNo : null,
          groomFirstnameEn: data?.GroomDetails?.groomFirstnameEn ? data?.GroomDetails?.groomFirstnameEn : null,
          groomFirstnameMl: data?.GroomDetails?.groomFirstnameMl ? data?.GroomDetails?.groomFirstnameMl : null,
          groomMiddlenameEn: data?.GroomDetails?.groomMiddlenameEn ? data?.GroomDetails?.groomMiddlenameEn : null,
          groomMiddlenameMl: data?.GroomDetails?.groomMiddlenameMl ? data?.GroomDetails?.groomMiddlenameMl : null,
          groomLastnameEn: data?.GroomDetails?.groomLastnameEn ? data?.GroomDetails?.groomLastnameEn : null,
          groomLastnameMl: data?.GroomDetails?.groomLastnameMl ? data?.GroomDetails?.groomLastnameMl : null,
          groomMobile: data?.GroomDetails?.groomMobile ? data?.GroomDetails?.groomMobile : null,
          groomEmailid: data?.GroomDetails?.groomEmailid ? data?.GroomDetails?.groomEmailid : null,
          groomGender: data?.GroomDetails?.groomGender ? data?.GroomDetails?.groomGender?.code : null,
          groomDOB: data?.GroomDetails?.groomDOB ? Date.parse(data?.GroomDetails?.groomDOB) : null,
          groomAge: data?.GroomDetails?.groomAge ? data?.GroomDetails?.groomAge : null,
          groomParentGuardian: data?.GroomDetails?.groomParentGuardian ? data?.GroomDetails?.groomParentGuardian : null,
          groomFathernameEn: data?.GroomDetails?.groomFathernameEn ? data?.GroomDetails?.groomFathernameEn : null,
          groomFathernameMl: data?.GroomDetails?.groomFathernameMl ? data?.GroomDetails?.groomFathernameMl : null,
          groomMothernameEn: data?.GroomDetails?.groomMothernameEn ? data?.GroomDetails?.groomMothernameEn : null,
          groomMothernameMl: data?.GroomDetails?.groomMothernameMl ? data?.GroomDetails?.groomMothernameMl : null,
          groomFatherAadharNo: data?.GroomDetails?.groomFatherAadharNo ? data?.GroomDetails?.groomFatherAadharNo : null,
          groomMotherAadharNo: data?.GroomDetails?.groomMotherAadharNo ? data?.GroomDetails?.groomMotherAadharNo : null,
          groomGuardiannameEn: data?.GroomDetails?.groomGuardiannameEn ? data?.GroomDetails?.groomGuardiannameEn : null,
          groomGuardiannameMl: data?.GroomDetails?.groomGuardiannameMl ? data?.GroomDetails?.groomGuardiannameMl : null,
          groomGuardianAadharNo: data?.GroomDetails?.groomGuardianAadharNo ? data?.GroomDetails?.groomGuardianAadharNo : null,
          groomMaritalstatusID: data?.GroomDetails?.groomMaritalstatusID ? data?.GroomDetails?.groomMaritalstatusID?.code : null,
          groomIsSpouseLiving: data?.GroomDetails?.groomIsSpouseLiving ? data?.GroomDetails?.groomIsSpouseLiving?.code : null,
          groomNoOfSpouse: data?.GroomDetails?.groomNoOfSpouse ? data?.GroomDetails?.groomNoOfSpouse : null,
        },
        BrideDetails: {
          brideResidentShip: data?.BrideDetails?.brideResidentShip ? data?.BrideDetails?.brideResidentShip : null,
          brideAadharNo: data?.BrideDetails?.brideAadharNo ? data?.BrideDetails?.brideAadharNo : null,
          bridePassportNo: data?.BrideDetails?.bridePassportNo ? data?.BrideDetails?.bridePassportNo : null,
          brideSocialSecurityNo: data?.BrideDetails?.brideSocialSecurityNo ? data?.BrideDetails?.brideSocialSecurityNo : null,
          brideFirstnameEn: data?.BrideDetails?.brideFirstnameEn ? data?.BrideDetails?.brideFirstnameEn : null,
          brideFirstnameMl: data?.BrideDetails?.brideFirstnameMl ? data?.BrideDetails?.brideFirstnameMl : null,
          brideMiddlenameEn: data?.BrideDetails?.brideMiddlenameEn ? data?.BrideDetails?.brideMiddlenameEn : null,
          brideMiddlenameMl: data?.BrideDetails?.brideMiddlenameMl ? data?.BrideDetails?.brideMiddlenameMl : null,
          brideLastnameEn: data?.BrideDetails?.brideLastnameEn ? data?.BrideDetails?.brideLastnameEn : null,
          brideLastnameMl: data?.BrideDetails?.brideLastnameMl ? data?.BrideDetails?.brideLastnameMl : null,
          brideMobile: data?.BrideDetails?.brideMobile ? data?.BrideDetails?.brideMobile : null,
          brideEmailid: data?.BrideDetails?.brideEmailid ? data?.BrideDetails?.brideEmailid : null,
          brideGender: data?.BrideDetails?.brideGender ? data?.BrideDetails?.brideGender?.code : null,
          brideDOB: data?.BrideDetails?.brideDOB ? Date.parse(data?.BrideDetails?.brideDOB) : null,
          brideAge: data?.BrideDetails?.brideAge ? data?.BrideDetails?.brideAge : null,
          brideParentGuardian: data?.BrideDetails?.brideParentGuardian ? data?.BrideDetails?.brideParentGuardian : null,
          brideFathernameEn: data?.BrideDetails?.brideFathernameEn ? data?.BrideDetails?.brideFathernameEn : null,
          brideFathernameMl: data?.BrideDetails?.brideFathernameMl ? data?.BrideDetails?.brideFathernameMl : null,
          brideMothernameEn: data?.BrideDetails?.brideMothernameEn ? data?.BrideDetails?.brideMothernameEn : null,
          brideMothernameMl: data?.BrideDetails?.brideMothernameMl ? data?.BrideDetails?.brideMothernameMl : null,
          brideFatherAadharNo: data?.BrideDetails?.brideFatherAadharNo ? data?.BrideDetails?.brideFatherAadharNo : null,
          brideMotherAadharNo: data?.BrideDetails?.brideMotherAadharNo ? data?.BrideDetails?.brideMotherAadharNo : null,
          brideGuardiannameEn: data?.BrideDetails?.brideGuardiannameEn ? data?.BrideDetails?.brideGuardiannameEn : null,
          brideGuardiannameMl: data?.BrideDetails?.brideGuardiannameMl ? data?.BrideDetails?.brideGuardiannameMl : null,
          brideGuardianAadharNo: data?.BrideDetails?.brideGuardianAadharNo ? data?.BrideDetails?.brideGuardianAadharNo : null,
          brideMaritalstatusID: data?.BrideDetails?.brideMaritalstatusID ? data?.BrideDetails?.brideMaritalstatusID?.code : null,
          brideIsSpouseLiving: data?.BrideDetails?.brideIsSpouseLiving ? data?.BrideDetails?.brideIsSpouseLiving?.code : null,
          brideNoOfSpouse: data?.BrideDetails?.brideNoOfSpouse ? data?.BrideDetails?.brideNoOfSpouse : null,
        },
        WitnessDetails: {
          witness1AadharNo: data?.WitnessDetails?.witness1AadharNo ? data?.WitnessDetails?.witness1AadharNo : null,
          witness1NameEn: data?.WitnessDetails?.witness1NameEn ? data?.WitnessDetails?.witness1NameEn : null,
          witness1NameMl: data?.WitnessDetails?.witness1NameMl ? data?.WitnessDetails?.witness1NameMl : null,
          witness1Age: data?.WitnessDetails?.witness1Age ? data?.WitnessDetails?.witness1Age : null,
          witness1AddresSEn: data?.WitnessDetails?.witness1AddresSEn ? data?.WitnessDetails?.witness1AddresSEn : null,
          // witness1AddressMl: data?.WitnessDetails?.witness1AddressMl ? data?.WitnessDetails?.witness1AddressMl : null,
          witness1Mobile: data?.WitnessDetails?.witness1Mobile ? data?.WitnessDetails?.witness1Mobile : null,
          witness1Esigned: data?.WitnessDetails?.witness1Esigned ? data?.WitnessDetails?.witness1Esigned : false,
          witness2AadharNo: data?.WitnessDetails?.witness2AadharNo ? data?.WitnessDetails?.witness2AadharNo : null,
          witness2NameEn: data?.WitnessDetails?.witness2NameEn ? data?.WitnessDetails?.witness2NameEn : null,
          // witness2NameMl: data?.WitnessDetails?.witness2NameMl ? data?.WitnessDetails?.witness2NameMl : null,
          witness2Age: data?.WitnessDetails?.witness2Age ? data?.WitnessDetails?.witness2Age : null,
          witness2AddresSEn: data?.WitnessDetails?.witness2AddresSEn ? data?.WitnessDetails?.witness2AddresSEn : null,
          // witness2AddressMl: data?.WitnessDetails?.witness2AddressMl ? data?.WitnessDetails?.witness2AddressMl : null,
          witness2Mobile: data?.WitnessDetails?.witness2Mobile ? data?.WitnessDetails?.witness2Mobile : null,
          witness2Esigned: data?.WitnessDetails?.witness2Esigned ? data?.WitnessDetails?.witness2Esigned : false,
          groomFileStoreId: data?.WitnessDetails?.groomFilestoreId ? data?.WitnessDetails?.groomFilestoreId[0] : null,
          brideFileStoreId: data?.WitnessDetails?.brideFilestoreId ? data?.WitnessDetails?.brideFilestoreId[0] : null,
          groomUrl: data?.WitnessDetails?.groomURL ? data?.WitnessDetails?.groomURL : null,
          brideUrl: data?.WitnessDetails?.brideURL ? data?.WitnessDetails?.brideURL : null,
          isBackward: data?.WitnessDetails?.isBackward && data?.WitnessDetails?.isBackward,
        },
        BrideAddressDetails: {
          presentaddressCountry: data?.BrideAddressDetails?.presentaddressCountry ? data?.BrideAddressDetails?.presentaddressCountry?.code : null,
          presentaddressStateName: data?.BrideAddressDetails?.presentaddressStateName
            ? data?.BrideAddressDetails?.presentaddressStateName?.code
            : null,
          presentInsideKeralaLBName: data?.BrideAddressDetails?.presentInsideKeralaLBName
            ? data?.BrideAddressDetails?.presentInsideKeralaLBName?.code
            : null,
          presentInsideKeralaDistrict: data?.BrideAddressDetails?.presentInsideKeralaDistrict
            ? data?.BrideAddressDetails?.presentInsideKeralaDistrict?.code
            : null,
          presentInsideKeralaTaluk: data?.BrideAddressDetails?.presentInsideKeralaTaluk
            ? data?.BrideAddressDetails?.presentInsideKeralaTaluk?.code
            : null,
          presentInsideKeralaVillage: data?.BrideAddressDetails?.presentInsideKeralaVillage
            ? data?.BrideAddressDetails?.presentInsideKeralaVillage?.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaLocalityNameEn
            : null,
          presentInsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaStreetNameEn
            : null,
          presentInsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.presentInsideKeralaHouseNameEn
            : null,
          presentInsideKeralaLocalityNameMl: data?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaLocalityNameMl
            : null,
          presentInsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaStreetNameMl
            : null,
          presentInsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.presentInsideKeralaHouseNameMl
            : null,
          presentInsideKeralaPostOffice: data?.BrideAddressDetails?.presentInsideKeralaPostOffice
            ? data?.BrideAddressDetails?.presentInsideKeralaPostOffice?.code
            : null,
          presentInsideKeralaPincode: data?.BrideAddressDetails?.presentInsideKeralaPincode
            ? data?.BrideAddressDetails?.presentInsideKeralaPincode
            : null,
          presentWardNo: data?.BrideAddressDetails?.presentWardNo ? data?.BrideAddressDetails?.presentWardNo?.code : null,
          presentOutsideKeralaDistrict: data?.BrideAddressDetails?.presentOutsideKeralaDistrict
            ? data?.BrideAddressDetails?.presentOutsideKeralaDistrict?.code
            : null,
          presentOutsideKeralaTaluk: data?.BrideAddressDetails?.presentOutsideKeralaTaluk
            ? data?.BrideAddressDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.BrideAddressDetails?.presentOutsideKeralaVillage
            ? data?.BrideAddressDetails?.presentOutsideKeralaVillage?.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaCityVilgeEn
            : null,
          presentOutsideKeralaPincode: data?.BrideAddressDetails?.presentOutsideKeralaPincode
            ? data?.BrideAddressDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeEn
            : null,
          presentOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaPostOfficeMl
            : null,
          presentOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameEn
            : null,
          presentOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaStreetNameEn
            : null,
          presentOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.presentOutsideKeralaHouseNameEn
            : null,
          presentOutsideKeralaLocalityNameMl: data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaLocalityNameMl
            : null,
          presentOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaStreetNameMl
            : null,
          presentOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.presentOutsideKeralaHouseNameMl
            : null,
          presentOutSideIndiaAdressEn: data?.BrideAddressDetails?.presentOutSideIndiaAdressEn
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressEn
            : null,
          presentOutSideIndiaAdressMl: data?.BrideAddressDetails?.presentOutSideIndiaAdressMl
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressMl
            : null,
          presentOutSideIndiaAdressEnB: data?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressEnB
            : null,
          presentOutSideIndiaAdressMlB: data?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
            ? data?.BrideAddressDetails?.presentOutSideIndiaAdressMlB
            : null,
          presentOutSideIndiaProvinceEn: data?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
            ? data?.BrideAddressDetails?.presentOutSideIndiaProvinceEn
            : null,
          presentOutSideIndiaProvinceMl: data?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
            ? data?.BrideAddressDetails?.presentOutSideIndiaProvinceMl
            : null,
          // presentOutSideCountry: data?.BrideAddressDetails?.presentOutSideCountry ? data?.BrideAddressDetails?.presentOutSideCountry?.code : null,
          presentOutSideIndiaadrsVillage: data?.BrideAddressDetails?.presentOutSideIndiaadrsVillage
            ? data?.BrideAddressDetails?.presentOutSideIndiaadrsVillage?.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            ? data?.BrideAddressDetails?.presentOutSideIndiaadrsCityTown
            : null,
          presentOutSideIndiaPostCode: data?.BrideAddressDetails?.presentOutSideIndiaPostCode
            ? data?.BrideAddressDetails?.presentOutSideIndiaPostCode
            : null,
          isPermanentAddress: data?.BrideAddressDetails?.isPrsentAddress ? data?.BrideAddressDetails?.isPrsentAddress : null,
          permtaddressCountry: data?.BrideAddressDetails?.permtaddressCountry ? data?.BrideAddressDetails?.permtaddressCountry?.code : null,
          permtaddressStateName: data?.BrideAddressDetails?.permtaddressStateName ? data?.BrideAddressDetails?.permtaddressStateName?.code : null,
          permntInKeralaAdrLBName: data?.BrideAddressDetails?.permntInKeralaAdrLBName
            ? data?.BrideAddressDetails?.permntInKeralaAdrLBName?.code
            : null,
          permntInKeralaAdrDistrict: data?.BrideAddressDetails?.permntInKeralaAdrDistrict
            ? data?.BrideAddressDetails?.permntInKeralaAdrDistrict?.code
            : null,
          permntInKeralaAdrTaluk: data?.BrideAddressDetails?.permntInKeralaAdrTaluk ? data?.BrideAddressDetails?.permntInKeralaAdrTaluk?.code : null,
          permntInKeralaAdrVillage: data?.BrideAddressDetails?.permntInKeralaAdrVillage
            ? data?.BrideAddressDetails?.permntInKeralaAdrVillage?.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameEn
            : null,
          permntInKeralaAdrStreetNameEn: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrStreetNameEn
            : null,
          permntInKeralaAdrHouseNameEn: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
            ? data?.BrideAddressDetails?.permntInKeralaAdrHouseNameEn
            : null,
          permntInKeralaAdrLocalityNameMl: data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrLocalityNameMl
            : null,
          permntInKeralaAdrStreetNameMl: data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrStreetNameMl
            : null,
          permntInKeralaAdrHouseNameMl: data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
            ? data?.BrideAddressDetails?.permntInKeralaAdrHouseNameMl
            : null,
          permntInKeralaAdrPincode: data?.BrideAddressDetails?.permntInKeralaAdrPincode ? data?.BrideAddressDetails?.permntInKeralaAdrPincode : null,
          permntInKeralaAdrPostOffice: data?.BrideAddressDetails?.permntInKeralaAdrPostOffice?.code,
          permntInKeralaWardNo: data?.BrideAddressDetails?.permntInKeralaWardNo ? data?.BrideAddressDetails?.permntInKeralaWardNo?.code : null,
          permntOutsideKeralaDistrict: data?.BrideAddressDetails?.permntOutsideKeralaDistrict
            ? data?.BrideAddressDetails?.permntOutsideKeralaDistrict?.code
            : null,
          permntOutsideKeralaTaluk: data?.BrideAddressDetails?.permntOutsideKeralaTaluk ? data?.BrideAddressDetails?.permntOutsideKeralaTaluk : null,
          permntOutsideKeralaVillage: data?.BrideAddressDetails?.permntOutsideKeralaVillage
            ? data?.BrideAddressDetails?.permntOutsideKeralaVillage?.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaCityVilgeEn
            : null,
          permntOutsideKeralaPincode: data?.BrideAddressDetails?.permntOutsideKeralaPincode
            ? data?.BrideAddressDetails?.permntOutsideKeralaPincode
            : null,
          permntOutsideKeralaLocalityNameEn: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameEn
            : null,
          permntOutsideKeralaStreetNameEn: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaStreetNameEn
            : null,
          permntOutsideKeralaHouseNameEn: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaHouseNameEn
            : null,
          permntOutsideKeralaLocalityNameMl: data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaLocalityNameMl
            : null,
          permntOutsideKeralaStreetNameMl: data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaStreetNameMl
            : null,
          permntOutsideKeralaHouseNameMl: data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaHouseNameMl
            : null,
          permntOutsideKeralaPostOfficeEn: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeEn
            : null,
          permntOutsideKeralaPostOfficeMl: data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
            ? data?.BrideAddressDetails?.permntOutsideKeralaPostOfficeMl
            : null,
          permntOutsideIndiaLineoneEn: data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaLineoneEn
            : null,
          permntOutsideIndiaLineoneMl: data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaLineoneMl
            : null,
          permntOutsideIndiaLinetwoEn: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaLinetwoEn
            : null,
          permntOutsideIndiaLinetwoMl: data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaLinetwoMl
            : null,
          permntOutsideIndiaprovinceEn: data?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
            ? data?.BrideAddressDetails?.permntOutsideIndiaprovinceEn
            : null,
          permntOutsideIndiaprovinceMl: data?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
            ? data?.BrideAddressDetails?.permntOutsideIndiaprovinceMl
            : null,
          permntOutsideIndiaVillage: data?.BrideAddressDetails?.permntOutsideIndiaVillage
            ? data?.BrideAddressDetails?.permntOutsideIndiaVillage?.code
            : null,
          permntOutsideIndiaCityTown: data?.BrideAddressDetails?.permntOutsideIndiaCityTown
            ? data?.BrideAddressDetails?.permntOutsideIndiaCityTown
            : null,
          permanentOutsideIndiaPostCode: data?.BrideAddressDetails?.permanentOutsideIndiaPostCode
            ? data?.BrideAddressDetails?.permanentOutsideIndiaPostCode
            : null,
        },
        GroomAddressDetails: {
          presentaddressCountry: data?.GroomAddressDetails?.presentaddressCountry ? data?.GroomAddressDetails?.presentaddressCountry?.code : null,
          presentaddressStateName: data?.GroomAddressDetails?.presentaddressStateName
            ? data?.GroomAddressDetails?.presentaddressStateName?.code
            : null,
          presentInsideKeralaLBName: data?.GroomAddressDetails?.presentInsideKeralaLBName
            ? data?.GroomAddressDetails?.presentInsideKeralaLBName?.code
            : null,
          presentInsideKeralaDistrict: data?.GroomAddressDetails?.presentInsideKeralaDistrict
            ? data?.GroomAddressDetails?.presentInsideKeralaDistrict?.code
            : null,
          presentInsideKeralaTaluk: data?.GroomAddressDetails?.presentInsideKeralaTaluk
            ? data?.GroomAddressDetails?.presentInsideKeralaTaluk?.code
            : null,
          presentInsideKeralaVillage: data?.GroomAddressDetails?.presentInsideKeralaVillage
            ? data?.GroomAddressDetails?.presentInsideKeralaVillage?.code
            : null,
          presentInsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaLocalityNameEn
            : null,
          presentInsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaStreetNameEn
            : null,
          presentInsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.presentInsideKeralaHouseNameEn
            : null,
          presentInsideKeralaLocalityNameMl: data?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaLocalityNameMl
            : null,
          presentInsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaStreetNameMl
            : null,
          presentInsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.presentInsideKeralaHouseNameMl
            : null,
          presentInsideKeralaPostOffice: data?.GroomAddressDetails?.presentInsideKeralaPostOffice
            ? data?.GroomAddressDetails?.presentInsideKeralaPostOffice?.code
            : null,
          presentInsideKeralaPincode: data?.GroomAddressDetails?.presentInsideKeralaPincode
            ? data?.GroomAddressDetails?.presentInsideKeralaPincode
            : null,
          presentWardNo: data?.GroomAddressDetails?.presentWardNo ? data?.GroomAddressDetails?.presentWardNo?.code : null,
          presentOutsideKeralaDistrict: data?.GroomAddressDetails?.presentOutsideKeralaDistrict
            ? data?.GroomAddressDetails?.presentOutsideKeralaDistrict?.code
            : null,
          presentOutsideKeralaTaluk: data?.GroomAddressDetails?.presentOutsideKeralaTaluk
            ? data?.GroomAddressDetails?.presentOutsideKeralaTaluk
            : null,
          presentOutsideKeralaVillage: data?.GroomAddressDetails?.presentOutsideKeralaVillage
            ? data?.GroomAddressDetails?.presentOutsideKeralaVillage?.code
            : null,
          presentOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaCityVilgeEn
            : null,
          presentOutsideKeralaPincode: data?.GroomAddressDetails?.presentOutsideKeralaPincode
            ? data?.GroomAddressDetails?.presentOutsideKeralaPincode
            : null,
          presentOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeEn
            : null,
          presentOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaPostOfficeMl
            : null,
          presentOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameEn
            : null,
          presentOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaStreetNameEn
            : null,
          presentOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.presentOutsideKeralaHouseNameEn
            : null,
          presentOutsideKeralaLocalityNameMl: data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaLocalityNameMl
            : null,
          presentOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaStreetNameMl
            : null,
          presentOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.presentOutsideKeralaHouseNameMl
            : null,
          presentOutSideIndiaAdressEn: data?.GroomAddressDetails?.presentOutSideIndiaAdressEn
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressEn
            : null,
          presentOutSideIndiaAdressMl: data?.GroomAddressDetails?.presentOutSideIndiaAdressMl
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressMl
            : null,
          presentOutSideIndiaAdressEnB: data?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressEnB
            : null,
          presentOutSideIndiaAdressMlB: data?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
            ? data?.GroomAddressDetails?.presentOutSideIndiaAdressMlB
            : null,
          presentOutSideIndiaProvinceEn: data?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
            ? data?.GroomAddressDetails?.presentOutSideIndiaProvinceEn
            : null,
          presentOutSideIndiaProvinceMl: data?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
            ? data?.GroomAddressDetails?.presentOutSideIndiaProvinceMl
            : null,
          // presentOutSideCountry: data?.GroomAddressDetails?.presentOutSideCountry ? data?.GroomAddressDetails?.presentOutSideCountry?.code : null,
          presentOutSideIndiaadrsVillage: data?.GroomAddressDetails?.presentOutSideIndiaadrsVillage
            ? data?.GroomAddressDetails?.presentOutSideIndiaadrsVillage?.code
            : null,
          presentOutSideIndiaadrsCityTown: data?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            ? data?.GroomAddressDetails?.presentOutSideIndiaadrsCityTown
            : null,
          presentOutSideIndiaPostCode: data?.GroomAddressDetails?.presentOutSideIndiaPostCode
            ? data?.GroomAddressDetails?.presentOutSideIndiaPostCode
            : null,
          isPermanentAddress: data?.GroomAddressDetails?.isPrsentAddress ? data?.GroomAddressDetails?.isPrsentAddress : null,
          permtaddressCountry: data?.GroomAddressDetails?.permtaddressCountry ? data?.GroomAddressDetails?.permtaddressCountry?.code : null,
          permtaddressStateName: data?.GroomAddressDetails?.permtaddressStateName ? data?.GroomAddressDetails?.permtaddressStateName?.code : null,
          permntInKeralaAdrLBName: data?.GroomAddressDetails?.permntInKeralaAdrLBName
            ? data?.GroomAddressDetails?.permntInKeralaAdrLBName?.code
            : null,
          permntInKeralaAdrDistrict: data?.GroomAddressDetails?.permntInKeralaAdrDistrict
            ? data?.GroomAddressDetails?.permntInKeralaAdrDistrict?.code
            : null,
          permntInKeralaAdrTaluk: data?.GroomAddressDetails?.permntInKeralaAdrTaluk ? data?.GroomAddressDetails?.permntInKeralaAdrTaluk?.code : null,
          permntInKeralaAdrVillage: data?.GroomAddressDetails?.permntInKeralaAdrVillage
            ? data?.GroomAddressDetails?.permntInKeralaAdrVillage?.code
            : null,
          permntInKeralaAdrLocalityNameEn: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameEn
            : null,
          permntInKeralaAdrStreetNameEn: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrStreetNameEn
            : null,
          permntInKeralaAdrHouseNameEn: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
            ? data?.GroomAddressDetails?.permntInKeralaAdrHouseNameEn
            : null,
          permntInKeralaAdrLocalityNameMl: data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrLocalityNameMl
            : null,
          permntInKeralaAdrStreetNameMl: data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrStreetNameMl
            : null,
          permntInKeralaAdrHouseNameMl: data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
            ? data?.GroomAddressDetails?.permntInKeralaAdrHouseNameMl
            : null,
          permntInKeralaAdrPincode: data?.GroomAddressDetails?.permntInKeralaAdrPincode ? data?.GroomAddressDetails?.permntInKeralaAdrPincode : null,
          permntInKeralaAdrPostOffice: data?.GroomAddressDetails?.permntInKeralaAdrPostOffice
            ? data?.GroomAddressDetails?.permntInKeralaAdrPostOffice?.code
            : null,
          permntInKeralaWardNo: data?.GroomAddressDetails?.permntInKeralaWardNo ? data?.GroomAddressDetails?.permntInKeralaWardNo?.code : null,
          permntOutsideKeralaDistrict: data?.GroomAddressDetails?.permntOutsideKeralaDistrict
            ? data?.GroomAddressDetails?.permntOutsideKeralaDistrict?.code
            : null,
          permntOutsideKeralaTaluk: data?.GroomAddressDetails?.permntOutsideKeralaTaluk ? data?.GroomAddressDetails?.permntOutsideKeralaTaluk : null,
          permntOutsideKeralaVillage: data?.GroomAddressDetails?.permntOutsideKeralaVillage
            ? data?.GroomAddressDetails?.permntOutsideKeralaVillage?.code
            : null,
          permntOutsideKeralaCityVilgeEn: data?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaCityVilgeEn
            : null,
          permntOutsideKeralaPincode: data?.GroomAddressDetails?.permntOutsideKeralaPincode
            ? data?.GroomAddressDetails?.permntOutsideKeralaPincode
            : null,
          permntOutsideKeralaLocalityNameEn: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameEn
            : null,
          permntOutsideKeralaStreetNameEn: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaStreetNameEn
            : null,
          permntOutsideKeralaHouseNameEn: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaHouseNameEn
            : null,
          permntOutsideKeralaLocalityNameMl: data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaLocalityNameMl
            : null,
          permntOutsideKeralaStreetNameMl: data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaStreetNameMl
            : null,
          permntOutsideKeralaHouseNameMl: data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaHouseNameMl
            : null,
          permntOutsideKeralaPostOfficeEn: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            ? data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeEn
            : null,
          permntOutsideKeralaPostOfficeMl: data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
            ? data?.GroomAddressDetails?.permntOutsideKeralaPostOfficeMl
            : null,
          permntOutsideIndiaLineoneEn: data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaLineoneEn
            : null,
          permntOutsideIndiaLineoneMl: data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaLineoneMl
            : null,
          permntOutsideIndiaLinetwoEn: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaLinetwoEn
            : null,
          permntOutsideIndiaLinetwoMl: data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaLinetwoMl
            : null,
          permntOutsideIndiaprovinceEn: data?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
            ? data?.GroomAddressDetails?.permntOutsideIndiaprovinceEn
            : null,
          permntOutsideIndiaprovinceMl: data?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
            ? data?.GroomAddressDetails?.permntOutsideIndiaprovinceMl
            : null,
          permntOutsideIndiaVillage: data?.GroomAddressDetails?.permntOutsideIndiaVillage
            ? data?.GroomAddressDetails?.permntOutsideIndiaVillage?.code
            : null,
          permntOutsideIndiaCityTown: data?.GroomAddressDetails?.permntOutsideIndiaCityTown
            ? data?.GroomAddressDetails?.permntOutsideIndiaCityTown
            : null,
          permanentOutsideIndiaPostCode: data?.GroomAddressDetails?.permanentOutsideIndiaPostCode
            ? data?.GroomAddressDetails?.permanentOutsideIndiaPostCode
            : null,
        },
        MarriageDocuments: data?.MarriageDocuments?.DocumentDetails,
      },
    ],
  };
  return formData;
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
// export const convertToEditTrade = (data, fy = []) => {
//   const currrentFYending = fy?.filter((item) => item?.code === data?.financialYear)?.[0]?.endingDate;
//   const nextFinancialYearForRenewal = fy?.filter((item) => item?.startingDate === currrentFYending)?.[0]?.code;
//   let isDirectrenewal = stringToBoolean(sessionStorage.getItem("isDirectRenewal"));
//   let formdata = {
//     Licenses: [
//       {
//         id: data?.id,
//         tenantId: data?.address?.city?.code,
//         businessService: data?.businessService,
//         licenseType: data?.licenseType,
//         applicationType: "RENEWAL",
//         workflowCode: isDirectrenewal ? "DIRECTRENEWAL" : "EDITRENEWAL",
//         licenseNumber: data?.licenseNumber,
//         applicationNumber: data?.applicationNumber,
//         tradeName: data?.tradeName,
//         applicationDate: data?.applicationDate,
//         commencementDate: data?.commencementDate,
//         issuedDate: data?.issuedDate,
//         financialYear: nextFinancialYearForRenewal || "2020-21",
//         validFrom: data?.validFrom,
//         validTo: data?.validTo,
//         action: "INITIATE",
//         wfDocuments: data?.wfDocuments,
//         status: data?.status,
//         tradeLicenseDetail: {
//           address: data.tradeLicenseDetail.address,
//           applicationDocuments: data.tradeLicenseDetail.applicationDocuments,
//           accessories: isDirectrenewal ? data.tradeLicenseDetail.accessories : gettradeupdateaccessories(data),
//           owners: isDirectrenewal ? data.tradeLicenseDetail.owners : gettradeownerarray(data),
//           structureType: isDirectrenewal
//             ? data.tradeLicenseDetail.structureType
//             : data?.TradeDetails?.VehicleType
//             ? data?.TradeDetails?.VehicleType.code
//             : data?.TradeDetails?.BuildingType.code,
//           subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
//             ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
//             : data?.ownershipCategory?.code,
//           tradeUnits: gettradeupdateunits(data),
//           additionalDetail: data.tradeLicenseDetail.additionalDetail,
//           auditDetails: data.tradeLicenseDetail.auditDetails,
//           channel: data.tradeLicenseDetail.channel,
//           id: data.tradeLicenseDetail.id,
//           ...(data?.ownershipCategory?.code.includes("INSTITUTIONAL") && {
//             institution: {
//               designation: data?.owners?.owners?.[0]?.designation,
//               ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
//               mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
//               instituionName: data?.owners?.owners?.[0]?.institutionName,
//               name: data?.owners?.owners?.[0]?.name,
//             },
//           }),
//         },
//         calculation: null,
//         auditDetails: data?.auditDetails,
//         accountId: data?.accountId,
//       },
//     ],
//   };
//   return formdata;
// };

//FinancialYear
// export const convertToResubmitTrade = (data) => {
//   let formdata = {
//     Licenses: [
//       {
//         id: data?.id,
//         tenantId: data?.address?.city?.code,
//         businessService: data?.businessService,
//         licenseType: data?.licenseType,
//         applicationType: data.applicationType,
//         workflowCode: data.workflowCode,
//         licenseNumber: data?.licenseNumber,
//         applicationNumber: data?.applicationNumber,
//         tradeName: data?.tradeName,
//         applicationDate: data?.applicationDate,
//         commencementDate: data?.commencementDate,
//         issuedDate: data?.issuedDate,
//         financialYear: data?.financialYear,
//         validFrom: data?.validFrom,
//         validTo: data?.validTo,
//         action: "FORWARD",
//         wfDocuments: data?.wfDocuments,
//         status: data?.status,
//         tradeLicenseDetail: {
//           address: data.tradeLicenseDetail.address,
//           applicationDocuments: getEditTradeDocumentUpdate(data),
//           accessories: gettradeupdateaccessories(data),
//           owners: gettradeownerarray(data),
//           structureType: data?.TradeDetails?.VehicleType ? data?.TradeDetails?.VehicleType.code : data?.TradeDetails?.BuildingType.code,
//           subOwnerShipCategory: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
//             ? data?.owners?.owners?.[0]?.subOwnerShipCategory.code
//             : data?.ownershipCategory?.code,
//           tradeUnits: gettradeupdateunits(data),
//           additionalDetail: data.tradeLicenseDetail.additionalDetail,
//           auditDetails: data.tradeLicenseDetail.auditDetails,
//           channel: data.tradeLicenseDetail.channel,
//           id: data.tradeLicenseDetail.id,
//           institution: data?.ownershipCategory?.code.includes("INSTITUTIONAL")
//             ? {
//                 designation: data?.owners?.owners?.[0]?.designation,
//                 ContactNo: data?.owners?.owners?.[0]?.altContactNumber,
//                 mobileNumber: data?.owners?.owners?.[0]?.mobilenumber,
//                 instituionName: data?.owners?.owners?.[0]?.institutionName,
//                 name: data?.owners?.owners?.[0]?.name,
//               }
//             : null,
//         },
//         calculation: null,
//         auditDetails: data?.auditDetails,
//         accountId: data?.accountId,
//       },
//     ],
//   };
//   return formdata;
// };

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
