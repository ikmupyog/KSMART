import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { sortDropdownNames } from "../../utils";

const AddressPermanentInsideKerala = ({ config, onSelect, userType, formData,
  permntInKeralaAdrDistrict, setpermntInKeralaAdrDistrict,
  permntInKeralaAdrLBName, setpermntInKeralaAdrLBName,
  permntInKeralaAdrTaluk, setpermntInKeralaAdrTaluk, permntInKeralaAdrVillage, setpermntInKeralaAdrVillage,
  permntInKeralaAdrPostOffice, setpermntInKeralaAdrPostOffice, permntInKeralaAdrPincode, setpermntInKeralaAdrPincode,
  permntInKeralaAdrHouseNameEn, setpermntInKeralaAdrHouseNameEn, Districtvalues, setDistrictvalue,
  permntInKeralaAdrHouseNameMl, setpermntInKeralaAdrHouseNameMl, permntInKeralaAdrLocalityNameEn, setpermntInKeralaAdrLocalityNameEn,
  permntInKeralaAdrLocalityNameMl, setpermntInKeralaAdrLocalityNameMl, permntInKeralaAdrStreetNameEn, setpermntInKeralaAdrStreetNameEn,
  permntInKeralaAdrStreetNameMl, setpermntInKeralaAdrStreetNameMl, lbs, setLbs, Talukvalues, setLbsTalukvalue, Villagevalues, setLbsVillagevalue, permntInKeralaWardNo,
  setpermntInKeralaWardNo, PostOfficevalues, setPostOfficevalues, isEditBirth = false, isEditDeath = false, isEditAdoption, isEditBirthNAC = false,
  isEditStillBirth = false, countryValuePermanent, setCountryValuePermanent, valuePermanent, setValuePermanent,
  permlbs, setPermLbs, DistrictPermvalues, setDistrictPermvalue, TalukPermvalues, setLbsTalukPermvalue, VillagePermvalues, setLbsVillagePermvalue,
  PostOfficePermvalues, setPostOfficePermvalues, isPrsentAddress, setIsPrsentAddress, TalukPermDropDownvalues, setLbTalukPermDropDownvalues,
  VillagePermDropDownvalues, setLbsVillagePermDropDownvalues, PostOfficePermDropDownvalues, setPostOfficePermDropDownvalues
  // isInitialRender, setIsInitialRender
  // isInitialRender, setIsInitialRender isEditBirth ? isEditBirth : isEditDeath ? false :

}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  let edittedTenantId = "";
  if (isEditBirth) {
    edittedTenantId = formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName;
  } else if (isEditDeath) {
    edittedTenantId = formData?.AddressBirthDetails?.permntInKeralaAdrLBName;
  } else if (isEditStillBirth) {
    edittedTenantId = formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName;
  } else if (isEditAdoption) {
    edittedTenantId = formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName;
  }
  const [popermfilter, setPoPermfilter] = useState(false);
  const [tenantWard, setTenantWard] = useState(edittedTenantId ? edittedTenantId : tenantId);
  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("CR_PERMANANT_ADDR_WARD");
    setTenantboundary(false);
  }

  // const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  // const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PermanantTaluk");
  // const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PermanantVillage");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  // const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "PermanantWard");
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
  let cmbLB = [];
  // let cmbTaluk = [];
  // let cmbVillage = [];
  let cmbDistrict = [];
  //let cmbPostOffice = [];
  let districtid = null;
  // let cmbLBType = [];
  let cmbFilterDistrict = [];
  let cmbFilterTaluk = [];
  let cmbFilterVillage = [];
  //let cmbFilterPostOffice = [];

  localbodies &&
    localbodies["tenant"] && localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  // Taluk &&
  //   Taluk["common-masters"] && Taluk["common-masters"].Taluk &&
  //   Taluk["common-masters"].Taluk.map((ob) => {
  //     cmbTaluk.push(ob);
  //   });
  // Village &&
  //   Village["common-masters"] && Village["common-masters"].Village &&
  //   Village["common-masters"].Village.map((ob) => {
  //     cmbVillage.push(ob);
  //   });
  District &&
    District["common-masters"] && District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  // PostOffice &&
  //   PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });
  // LBType &&
  //   LBType["common-masters"] && LBType["common-masters"].LBType &&
  //   LBType["common-masters"].LBType.map((ob) => {
  //     cmbLBType.push(ob);
  //   });
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
  const sortWardList = cmbWardNoFinal.sort((a, b) => a.wardno - b.wardno);
  useEffect(() => {

    if (isInitialRender && isPrsentAddress && countryValuePermanent === "IND" && valuePermanent === "kl"
      && (formData?.AddressBirthDetails?.presentInsideKeralaLBName === null || formData?.AddressBirthDetails?.presentInsideKeralaLBName === "" || formData?.AddressBirthDetails?.presentInsideKeralaLBName === undefined)) {
      loadPermanantInsideKeralainitialData();
    }
    else if (isInitialRender && isPrsentAddress === false && countryValuePermanent === "IND" && valuePermanent === "kl"
      && (formData?.AddressBirthDetails?.permntInKeralaAdrLBName === null || formData?.AddressBirthDetails?.permntInKeralaAdrLBName === "" || formData?.AddressBirthDetails?.permntInKeralaAdrLBName === undefined)) {
      loadPermanantInsideKeralaWithoutData();
    }
    else if (isInitialRender && isPrsentAddress === false && countryValuePermanent === "IND" && valuePermanent === "kl"
      && formData?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      loadPermanantInsideKeralaWithData();
    }
  }, [District, localbodies, DistrictPermvalues, TalukPermvalues, VillagePermvalues, PostOfficePermvalues, permlbs, isInitialRender]);

  function loadPermanantInsideKeralainitialData() {
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
      if (currentLB.length > 0) {
        setpermntInKeralaAdrLBName(currentLB[0]);
      }
      if (currentLB.length > 0 && cmbDistrict.length > 0) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
      }
      // if (currentLB.length > 0 && cmbTaluk.length > 0) {
      //   cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
      //   setLbsTalukPermvalue(cmbFilterTaluk);
      // }
      // if (currentLB.length > 0 && cmbVillage.length > 0) {
      //   cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
      //   setLbsVillagePermvalue(cmbFilterVillage);
      // }
      // if (currentLB.length > 0 && cmbPostOffice.length > 0) {
      //   cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
      //   setPostOfficePermvalues(cmbFilterPostOffice);
      // }
      if (currentLB.length > 0) {
        setLbsTalukPermvalue(currentLB[0].talukList);
        setLbTalukPermDropDownvalues(currentLB[0].talukList);
        setLbsVillagePermvalue(currentLB[0].villageList);
        setLbsVillagePermDropDownvalues(currentLB[0].villageList);
        setCmbFilterPostOffice(currentLB[0].poList);
        setPostOfficePermvalues(currentLB[0].poList);
        setPostOfficePermDropDownvalues(currentLB[0].poList);
      }
      if (cmbLB.length > 0 && cmbDistrict.length > 0) {
        setIsInitialRender(false);
      }
    }
  }
  function loadPermanantInsideKeralaWithoutData() {
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
      if (currentLB.length > 0) {
        setpermntInKeralaAdrLBName(currentLB[0]);
        setPermLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === currentLB[0].city.districtid));
      }
      if (currentLB.length > 0 && cmbDistrict.length > 0) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
      }
      // if (currentLB.length > 0 && cmbTaluk.length > 0) {
      //   cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
      //   setLbsTalukPermvalue(cmbFilterTaluk);
      // }
      // if (currentLB.length > 0 && cmbVillage.length > 0) {
      //   cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
      //   setLbsVillagePermvalue(cmbFilterVillage);
      // }
      // if (currentLB.length > 0 && cmbPostOffice.length > 0) {
      //   cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
      //   setPostOfficePermvalues(cmbFilterPostOffice);
      // }
      if (currentLB.length > 0) {
        setLbsTalukPermvalue(currentLB[0].talukList);
        setLbTalukPermDropDownvalues(currentLB[0].talukList);
        setLbsVillagePermvalue(currentLB[0].villageList);
        setLbsVillagePermDropDownvalues(currentLB[0].villageList);
        setCmbFilterPostOffice(currentLB[0].poList);
        setPostOfficePermvalues(currentLB[0].poList);
        setPostOfficePermDropDownvalues(currentLB[0].poList);
      }
      if (cmbLB.length > 0 && cmbDistrict.length > 0) {
        setIsInitialRender(false);
      }
    }
  }
  function loadPermanantInsideKeralaWithData() {
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.AddressBirthDetails?.permntInKeralaAdrLBName.code);
      if (currentLB.length > 0) {
        setPermLbs(cmbLB.filter((cmbLB) => cmbLB.city.districtid === currentLB[0].city.districtid));
        setpermntInKeralaAdrLBName(currentLB[0]);
      }
      if (currentLB.length > 0 && cmbDistrict.length > 0) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === currentLB[0].city.statecode);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbFilterDistrict.filter((cmbFilterDistrict) => cmbFilterDistrict.code === currentLB[0].city.distCodeStr)[0]);
      }
      // if (currentLB.length > 0 && cmbTaluk.length > 0) {
      //   cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
      //   setLbsTalukPermvalue(cmbFilterTaluk);
      // }
      // if (currentLB.length > 0 && cmbVillage.length > 0) {
      //   cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
      //   setLbsVillagePermvalue(cmbFilterVillage);
      // }
      // if (currentLB.length > 0 && cmbPostOffice.length > 0) {
      //   cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid);
      //   setPostOfficePermvalues(cmbFilterPostOffice);
      // }
      if (currentLB.length > 0) {
        setLbsTalukPermvalue(currentLB[0].talukList);
        setLbTalukPermDropDownvalues(currentLB[0].talukList);
        setLbsVillagePermvalue(currentLB[0].villageList);
        setLbsVillagePermDropDownvalues(currentLB[0].villageList);
        setCmbFilterPostOffice(currentLB[0].poList);
        setPostOfficePermvalues(currentLB[0].poList);
        setPostOfficePermDropDownvalues(currentLB[0].poList);
      }
      if (cmbLB.length > 0 && cmbDistrict.length > 0) {
        setIsInitialRender(false);
      }
    }
  }
  if (isEditBirth) {
    // currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict);
    currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName);
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setPermLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict));
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukPermvalue(cmbFilterTaluk);
        // setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
        cmbFilterTaluk = currentLB[0].talukList;
        setLbsTalukPermvalue(currentLB[0].talukList);
        setpermntInKeralaAdrTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagePermvalue(cmbFilterVillage);
        // setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
        cmbFilterVillage = currentLB[0].villageList;
        setLbsVillagePermvalue(currentLB[0].villageList);
        setpermntInKeralaAdrVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaWardNo != null && cmbWardNo.length > 0) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        // setTenantWard(formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName);
        // setTenantboundary(true);
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        // setPostOfficePermvalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // setpermntInKeralaAdrPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        // setpermntInKeralaAdrPincode(pin.pincode);
        setPostOfficePermvalues(currentLB[0].poList);
        setpermntInKeralaAdrPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = currentLB[0].poList.filter(poList => poList.code === formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditDeath) {
    // currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AddressBirthDetails?.permntInKeralaAdrDistrict);
    currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.AddressBirthDetails?.permntInKeralaAdrLBName);
    if (formData?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setPermLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AddressBirthDetails?.permntInKeralaAdrDistrict));
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukPermvalue(cmbFilterTaluk);
        // setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
        cmbFilterTaluk = currentLB[0].talukList;
        setLbsTalukPermvalue(currentLB[0].talukList);
        setpermntInKeralaAdrTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagePermvalue(cmbFilterVillage);
        // setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
        cmbFilterVillage = currentLB[0].villageList;
        setLbsVillagePermvalue(currentLB[0].villageList);
        setpermntInKeralaAdrVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaWardNo != null && cmbWardNo.length > 0) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        // setTenantWard(formData?.ChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName);
        // setTenantboundary(true);
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        // setPostOfficePermvalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // setpermntInKeralaAdrPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        // setpermntInKeralaAdrPincode(pin.pincode);
        setPostOfficePermvalues(currentLB[0].poList);
        setpermntInKeralaAdrPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = currentLB[0].poList.filter(poList => poList.code === formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditStillBirth) {
    // currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict);
    currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName);
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrDistrict));
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukPermvalue(cmbFilterTaluk);
        // setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
        cmbFilterTaluk = currentLB[0].talukList;
        setLbsTalukPermvalue(currentLB[0].talukList);
        setpermntInKeralaAdrTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagePermvalue(cmbFilterVillage);
        // setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
        cmbFilterVillage = currentLB[0].villageList;
        setLbsVillagePermvalue(currentLB[0].villageList);
        setpermntInKeralaAdrVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaWardNo != null && cmbWardNo.length > 0) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        // setTenantWard(formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrLBName);
        // setTenantboundary(true);
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        // setPostOfficePermvalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // setpermntInKeralaAdrPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        // setpermntInKeralaAdrPincode(pin.pincode);
        setPostOfficePermvalues(currentLB[0].poList);
        setpermntInKeralaAdrPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0]);
        let pin = currentLB[0].poList.filter(poList => poList.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  } else if (isEditAdoption !== false) {
    // currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict);
    currentLB = cmbLB.filter((cmbLB) => cmbLB.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName);
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict != null) {
      if (cmbDistrict.length > 0 && (permntInKeralaAdrDistrict === undefined || permntInKeralaAdrDistrict === "")) {
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === valuePermanent);
        setDistrictPermvalue(cmbFilterDistrict);
        setpermntInKeralaAdrDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName != null) {
      if (cmbLB.length > 0 && (permntInKeralaAdrLBName === undefined || permntInKeralaAdrLBName === "")) {
        setLbs(cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === formData?.AdoptionAddressBasePage?.permntInKeralaAdrDistrict));
        setpermntInKeralaAdrLBName(cmbLB.filter(cmbLB => cmbLB.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrLBName)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrTaluk === undefined || permntInKeralaAdrTaluk === "")) {
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukPermvalue(cmbFilterTaluk);
        // setpermntInKeralaAdrTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk)[0]);
        cmbFilterTaluk = currentLB[0].talukList;
        setLbsTalukPermvalue(currentLB[0].talukList);
        setpermntInKeralaAdrTaluk(cmbFilterTaluk.filter(cmbFilterTaluk => cmbFilterTaluk.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrTaluk)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrVillage === undefined || permntInKeralaAdrVillage === "")) {
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagePermvalue(cmbFilterVillage);
        // setpermntInKeralaAdrVillage(cmbVillage.filter(cmbVillage => cmbVillage.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage)[0]);
        cmbFilterVillage = currentLB[0].villageList;
        setLbsVillagePermvalue(currentLB[0].villageList);
        setpermntInKeralaAdrVillage(cmbFilterVillage.filter(cmbFilterVillage => cmbFilterVillage.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrVillage)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaWardNo != null && cmbWardNo.length > 0) {
      if (cmbWardNo.length > 0 && (permntInKeralaWardNo === undefined || permntInKeralaWardNo === "")) {
        setpermntInKeralaWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.AdoptionAddressBasePage?.permntInKeralaWardNo)[0]);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice != null) {
      if (currentLB.length > 0 && (permntInKeralaAdrPostOffice === undefined || permntInKeralaAdrPostOffice === "")) {
        // setPostOfficePermvalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
        // setpermntInKeralaAdrPostOffice(cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0]);
        // let pin = cmbPostOffice.filter(cmbPostOffice => cmbPostOffice.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0];
        // setpermntInKeralaAdrPincode(pin.pincode);
        setPostOfficePermvalues(currentLB[0].poList);
        setpermntInKeralaAdrPostOffice(currentLB[0].poList.filter(poList => poList.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0]);
        let pin = currentLB[0].poList.filter(poList => poList.code === formData?.AdoptionAddressBasePage?.permntInKeralaAdrPostOffice)[0];
        setpermntInKeralaAdrPincode(pin.pincode);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectpermntInKeralaAdrDistrict(value) {

    setpermntInKeralaAdrDistrict(value);
    setpermntInKeralaAdrTaluk(null);
    setLbsTalukPermvalue(null);
    setpermntInKeralaAdrVillage(null);
    setLbsVillagePermvalue(null);
    setPostOfficePermvalues(null);
    setpermntInKeralaAdrLBName(null);
    setPermLbs(null);
    districtid = value.districtid;
    setTenantboundary(true);
    if (cmbLB.length > 0) {
      currentLB = cmbLB.filter((cmbLB) => cmbLB.city.distCodeStr === value.code);
      setPermLbs(currentLB);
      setpermntInKeralaAdrLBName(currentLB);
      // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === districtid);
      // setLbsTalukPermvalue(cmbFilterTaluk);
      // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === districtid);
      // setLbsVillagePermvalue(cmbFilterVillage);
      // cmbFilterPostOffice = cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === districtid);
      // setPostOfficePermvalues(cmbFilterPostOffice);
      // setIsInitialRender(false);
    }
  }
  function setSelectpermntInKeralaAdrLBTypeName(value) {
    setinsideKeralaLBTypeName(value);
  }
  function setSelectpermntInKeralaAdrLBName(value) {
    setTenantWard(value.code);
    setpermntInKeralaAdrTaluk(null);
    setpermntInKeralaAdrVillage(null);
    setpermntInKeralaAdrPostOffice(null);
    setpermntInKeralaAdrPincode(null);
    setpermntInKeralaWardNo(null);
    setTenantboundary(true);
    setpermntInKeralaAdrLBName(value);
    if (value != null) {
      setLbsTalukPermvalue(value.talukList);
      setLbTalukPermDropDownvalues(value.talukList);
      setLbsVillagePermvalue(value.villageList);
      setLbsVillagePermDropDownvalues(value.villageList);
      setPostOfficePermvalues(value.poList);
    }
  }
  function setSelectpermntInKeralaAdrTaluk(value) {
    setpermntInKeralaAdrVillage(null);
    if (value != null) {
      setpermntInKeralaAdrTaluk(value);
      setLbsVillagePermvalue(VillagePermDropDownvalues.filter((VillagePermDropDownvalues) => VillagePermDropDownvalues.talukCode === value.code));
    }
  }
  function setSelectpermntInKeralaAdrVillage(value) {
    setpermntInKeralaAdrVillage(value);
    if (value != null) {
      setpermntInKeralaAdrVillage(value);
      setpermntInKeralaAdrTaluk(TalukPermDropDownvalues.filter((TalukPermDropDownvalues) => TalukPermDropDownvalues.code === value.talukCode)[0]);
    }
  }
  function setSelectpermntInKeralaAdrPostOffice(value) {
    setpermntInKeralaAdrPostOffice(value);
    setpermntInKeralaAdrPincode(value.pincode);
  }
  function setSelectpermntInKeralaAdrPincode(e) {

    if (e.target.value.length === 6) {
      setPostOfficePermvalues(PostOfficePermvalues.filter((postoffice) =>
        parseInt(postoffice.pincode) === parseInt(e.target.value)));
      setPoPermfilter(true);
    } else {
      setPostOfficePermvalues(cmbFilterPostOffice);
      setPoPermfilter(false);
    }
    setpermntInKeralaAdrPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
    setpermntInKeralaAdrPostOffice(PostOfficePermvalues.filter((postoffice) => parseInt(postoffice.pincode) === parseInt(e.target.value))[0]);
  }
  function setSelectpermntInKeralaAdrHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
      setpermntInKeralaAdrHouseNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectpermntInKeralaAdrHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrHouseNameMl('');
    }
    else {
      setpermntInKeralaAdrHouseNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntInKeralaAdrLocalityNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }

  function setSelectpermntInKeralaAdrLocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrLocalityNameMl('');
    }
    else {
      setpermntInKeralaAdrLocalityNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setpermntInKeralaAdrStreetNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }

  function setSelectpermntInKeralaAdrStreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setpermntInKeralaAdrStreetNameMl('');
    }
    else {
      setpermntInKeralaAdrStreetNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
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
  function setCheckMalayalamInputFieldWithSplChar(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]/;
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
  // || isPostOfficeLoading|| isTalukLoading || isVillageLoading
  if (islocalbodiesLoading  || isDistrictLoading  || isWardLoaded) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} > */}

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(DistrictPermvalues ? DistrictPermvalues : [], "name", t)}
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
              {t("CS_COMMON_LB_NAME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(permlbs ? permlbs : [], "name", t)}
              selected={permntInKeralaAdrLBName}
              select={setSelectpermntInKeralaAdrLBName}
              placeholder={`${t("CS_COMMON_LB_NAME")}`}
              disable={isDisableEdit}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_TALUK")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(TalukPermvalues ? TalukPermvalues : [], "name", t)}
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
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(VillagePermvalues ? VillagePermvalues : [], "name", t)}
              selected={permntInKeralaAdrVillage}
              select={setSelectpermntInKeralaAdrVillage}
              placeholder={`${t("CS_COMMON_VILLAGE")}`}
              disable={isDisableEdit}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
            <CardLabel>
              {`${t("CS_COMMON_WARD")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="namecmb"
              option={sortWardList}
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
              optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
              option={sortDropdownNames(PostOfficePermvalues ? PostOfficePermvalues : [], "name", t)}
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
                pattern: "^[0-9]*$",
                isRequired: true,
                type: "text",
                maxLength: 6,
                minLength: 6,
                title: t("CS_COMMON_INVALID_PIN_CODE"),
              })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
              {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
              onKeyPress={setCheckMalayalamInputFieldWithSplChar}
              onChange={setSelectpermntInKeralaAdrHouseNameMl}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              disable={isDisableEdit}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>
      </div>

      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default AddressPermanentInsideKerala;