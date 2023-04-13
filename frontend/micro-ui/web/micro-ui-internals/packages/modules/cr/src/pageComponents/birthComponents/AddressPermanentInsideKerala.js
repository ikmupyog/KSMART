import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const AddressPermanentInsideKerala = ({ config, onSelect, userType, formData,
  permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict,
  permntInKeralaAdrLBName, setpermntInKeralaAdrLBName,
  permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk, permntInKeralaAdrVillage, setpermntInKeralaAdrVillage,
  permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice, permntInKeralaAdrPincode, setpermntInKeralaAdrPincode,
  permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn, Districtvalues, setDistrictvalue,
  permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl, permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn,
  permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl, permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn,
  permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue, permntInKeralaWardNo,
  setpermntInKeralaWardNo, PostOfficevalues, setPostOfficevalues, isEditBirth = false, isEditDeath = false, isEditAdoption,
  isEditStillBirth = false, countryValuePermanent, setCountryValuePermanent, valuePermanent, setValuePermanent
  // isInitialRender, setIsInitialRender
  // isInitialRender, setIsInitialRender isEditBirth ? isEditBirth : isEditDeath ? false :

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [tenantWard, setTenantWard] = useState(tenantId);
  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : isEditDeath ? false : isEditStillBirth ? isEditStillBirth : false);

  let cmbLB = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbLBType = [];
  let cmbFilterDistrict = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
  let cmbFilterPostOffice = [];

  localbodies &&
    localbodies["tenant"] && localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] && Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] && Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  District &&
    District["common-masters"] && District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  PostOffice &&
    PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
  LBType &&
    LBType["common-masters"] && LBType["common-masters"].LBType &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let currentLB = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      // console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
  //console.log(Zonal);
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });
  useEffect(() => {

    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        setpermntInKeralaAdrLBName(currentLB[0]);
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
        console.log(cmbFilterDistrict);

        setDistrictvalue(cmbFilterDistrict);
        //console.log(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
        // setinsideKeralaDistrict(null);
        setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);

        // cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.code === currentLB[0].city.distCodeStr);
        // setpermntInKeralaAdrDistrict(cmbFilterDistrict[0]);
        cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        setLbsTalukvalue(cmbFilterTaluk);
        cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        setLbsVillagevalue(cmbFilterVillage);
        cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
        setPostOfficevalues(cmbFilterPostOffice);
        setIsInitialRender(false);
      }
    }
  }, [District, LBType, localbodies, Districtvalues, Talukvalues, Villagevalues, PostOfficevalues, lbs, isInitialRender]);

  if (isEditBirth) {
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (cmbTaluk.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (cmbVillage.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaWardNo != null) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (cmbFilterPostOffice.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        setpermntInKeralaAdrPostOffice(cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditDeath) {
    if (formData?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (cmbTaluk.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (cmbVillage.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaWardNo != null) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (cmbFilterPostOffice.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        setpermntInKeralaAdrPostOffice(cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (cmbTaluk.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (cmbVillage.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaWardNo != null) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (cmbFilterPostOffice.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        setpermntInKeralaAdrPostOffice(cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditAdoption !== false) {
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk != null) {
      if (cmbTaluk.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage != null) {
      if (cmbVillage.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaWardNo != null) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AdoptionAddressBasePage?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice != null) {
      if (cmbFilterPostOffice.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        setpermntInKeralaAdrPostOffice(cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0]);
        let pin = cmbFilterPostOffice.filter(cmbFilterPostOffice => cmbFilterPostOffice.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectpermntInKeralaAdrDistrict(value) {

    setpermntInKeralaAdrDistrict(value);
    setpermntInKeralaAdrTaluk(null);
    setpermntInKeralaAdrVillage(null);
    setpermntInKeralaAdrLBName(null);
    setLbs(null);
    districtid = value.districtid;
    setTenantboundary(true);
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
      setLbs(currentLB);
      setpermntInKeralaAdrLBName(currentLB);
      cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
      setLbsTalukvalue(cmbFilterTaluk);
      cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
      setLbsVillagevalue(cmbFilterVillage);
      cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid);
      setPostOfficevalues(cmbFilterPostOffice);
      setIsInitialRender(false);
    }
  }
  function setSelectpermntInKeralaAdrLBTypeName(value) {
    setinsideKeralaLBTypeName(value);
  }
  function setSelectpermntInKeralaAdrLBName(value) {
    setTenantWard(value.code);
    setpermntInKeralaWardNo(null);
    setTenantboundary(true);
    setpermntInKeralaAdrLBName(value);
  }
  function setSelectpermntInKeralaAdrVillage(value) {
    setpermntInKeralaAdrVillage(value);
  }
  function setSelectpermntInKeralaAdrTaluk(value) {
    setpermntInKeralaAdrTaluk(value);
  }

  function setSelectpermntInKeralaAdrPostOffice(value) {
    setpermntInKeralaAdrPostOffice(value);
    setpermntInKeralaAdrPincode(value.pincode);
  }
  function setSelectpermntInKeralaAdrPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setpermntInKeralaAdrPincode(e.target.value);
        return false;
      } else {
        setpermntInKeralaAdrPincode(e.target.value);
        return true;
      }
    }
  }
  function setSelectpermntInKeralaAdrHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9 ]*$") != null)) {
      setpermntInKeralaAdrHouseNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectpermntInKeralaAdrHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrHouseNameMl('');
    }
    else {
      setpermntInKeralaAdrHouseNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntInKeralaAdrLocalityNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrLocalityNameMl('');
    }
    else {
      setpermntInKeralaAdrLocalityNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntInKeralaAdrStreetNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrStreetNameMl('');
    }
    else {
      setpermntInKeralaAdrStreetNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectWard(value) {
    setpermntInKeralaWardNo(value);
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  // useEffect(() => {
  //     if (isInitialRender) {
  //         console.log("presentInsideKeralaDistrict" + districtid);
  //         console.log(localbodies);
  //         if (presentInsideKeralaDistrict) {
  //             setIsInitialRender(false);
  //             setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === presentInsideKeralaDistrict.districtid));
  //         }
  //     }
  // }, [lbs, isInitialRender]);
  const goNext = () => {

  };

  if (islocalbodiesLoading || isPostOfficeLoading || isDistrictLoading || isTalukLoading || isVillageLoading || isWardLoaded) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} > */}

      <div className="row">
        <div className="col-md-3">
          <CardLabel>
            {t("CS_COMMON_DISTRICT")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={Districtvalues}
            selected={permntInKeralaAdrDistrict}
            select={setSelectpermntInKeralaAdrDistrict}
            placeholder={`${t("CS_COMMON_DISTRICT")}`}
            disable={isDisableEdit}
          />
        </div>

        {/* <div className="col-md-6" >
                    <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
                    <Dropdown
                    t={t}
                    optionKey="name"
                    option={cmbLBType}
                    selected={permntInKeralaAdrLBTypeName}
                    select={setSelectpermntInKeralaAdrLBTypeName}
                    
                    />
                    </div> */}
        <div className="col-md-3">
          <CardLabel>
            {t("CS_COMMON_TALUK")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={Talukvalues}
            selected={permntInKeralaAdrTaluk}
            select={setSelectpermntInKeralaAdrTaluk}
            placeholder={`${t("CS_COMMON_TALUK")}`}
            disable={isDisableEdit}
          />
        </div>
        <div className="col-md-3">
          <CardLabel>
            {t("CS_COMMON_VILLAGE")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={Villagevalues}
            selected={permntInKeralaAdrVillage}
            select={setSelectpermntInKeralaAdrVillage}
            placeholder={`${t("CS_COMMON_VILLAGE")}`}
            disable={isDisableEdit}
          />
        </div>
        <div className="col-md-3">
          <CardLabel>
            {t("CS_COMMON_LB_NAME")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={lbs}
            selected={permntInKeralaAdrLBName}
            select={setSelectpermntInKeralaAdrLBName}
            placeholder={`${t("CS_COMMON_LB_NAME")}`}
            disable={isDisableEdit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <CardLabel>
            {`${t("CS_COMMON_WARD")}`}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="namecmb"
            option={cmbWardNoFinal}
            selected={permntInKeralaWardNo}
            select={setSelectWard}
            placeholder={`${t("CS_COMMON_WARD")}`}
            disable={isDisableEdit}
            {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>
            {t("CS_COMMON_POST_OFFICE")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <Dropdown
            t={t}
            optionKey="name"
            option={PostOfficevalues}
            selected={permntInKeralaAdrPostOffice}
            select={setSelectpermntInKeralaAdrPostOffice}
            placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
            disable={isDisableEdit}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>
            {t("CS_COMMON_PIN_CODE")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrPincode"
            value={permntInKeralaAdrPincode}
            onChange={setSelectpermntInKeralaAdrPincode}
            disable={isDisableEdit}
            placeholder={`${t("CS_COMMON_PIN_CODE")}`}
            {...(validation = {
              pattern: "^[a-zA-Z-.`' ]*$",
              isRequired: true,
              type: "number",
              maxLength: 6,
              minLength: 6,
              title: t("CS_COMMON_INVALID_PIN_CODE"),
            })}
          />
        </div>

      </div>
      <div className="row">
        <div className="col-md-4">
          <CardLabel>
            {t("CR_LOCALITY_EN")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrLocalityNameEn"
            value={permntInKeralaAdrLocalityNameEn}
            onChange={setSelectpermntInKeralaAdrLocalityNameEn}
            placeholder={`${t("CR_LOCALITY_EN")}`}
            disable={isDisableEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrStreetNameEn"
            value={permntInKeralaAdrStreetNameEn}
            onChange={setSelectpermntInKeralaAdrStreetNameEn}
            placeholder={`${t("CR_STREET_NAME_EN")}`}
            disable={isDisableEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>
            {t("CR_HOUSE_NAME_EN")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrHouseNameEn"
            value={permntInKeralaAdrHouseNameEn}
            onChange={setSelectpermntInKeralaAdrHouseNameEn}
            placeholder={`${t("CR_HOUSE_NAME_EN")}`}
            disable={isDisableEdit}
            {...(validation = { pattern: "^[a-zA-Z-0-9 ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <CardLabel>
            {t("CR_LOCALITY_ML")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrLocalityNameMl"
            value={permntInKeralaAdrLocalityNameMl}
            onKeyPress={setCheckMalayalamInputField}
            onChange={setSelectpermntInKeralaAdrLocalityNameMl}
            disable={isDisableEdit}
            placeholder={`${t("CR_LOCALITY_ML")}`}
            {...(validation = {
              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
              isRequired: true,
              type: "text",
              title: t("CR_INVALID_LOCALITY_ML"),
            })}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrStreetNameMl"
            value={permntInKeralaAdrStreetNameMl}
            onKeyPress={setCheckMalayalamInputField}
            onChange={setSelectpermntInKeralaAdrStreetNameMl}
            placeholder={`${t("CR_STREET_NAME_ML")}`}
            disable={isDisableEdit}
            {...(validation = {
              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
              isRequired: false,
              type: "text",
              title: t("CR_INVALID_STREET_NAME_ML"),
            })}
          />
        </div>
        <div className="col-md-4">
          <CardLabel>
            {t("CR_HOUSE_NAME_ML")}
            <span className="mandatorycss">*</span>
          </CardLabel>
          <TextInput
            t={t}
            type={"text"}
            optionKey="i18nKey"
            name="permntInKeralaAdrHouseNameMl"
            value={permntInKeralaAdrHouseNameMl}
            onKeyPress={setCheckMalayalamInputField}
            onChange={setSelectpermntInKeralaAdrHouseNameMl}
            placeholder={`${t("CR_HOUSE_NAME_ML")}`}
            disable={isDisableEdit}
            {...(validation = {
              pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \-]*$",
              isRequired: true,
              type: "text",
              title: t("CR_INVALID_HOUSE_NAME_ML"),
            })}
          />
        </div>
      </div>

      <div className="row">

      </div>
      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default AddressPermanentInsideKerala;