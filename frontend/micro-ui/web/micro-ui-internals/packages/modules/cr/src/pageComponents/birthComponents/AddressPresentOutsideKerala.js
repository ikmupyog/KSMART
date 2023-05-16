import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

const AddressPresentOutsideKerala = ({ config, onSelect, userType, formData, presentOutsideKeralaDistrict, setoutsideKeralaDistrict,
  presentOutsideKeralaTaluk, setoutsideKeralaTaluk, presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn,
  presentOutsideKeralaVillage, setoutsideKeralaVillage, presentOutsideKeralaPincode, setoutsideKeralaPincode,
  presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn, presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl,
  presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn, presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl,
  presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn, presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl,
  presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn, presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl,
  value, setValue,
  isPrsentAddress, setIsPrsentAddress, permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict,
  permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk, permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn,
  permntOutsideKeralaVillage, setpermntOutsideKeralaVillage, permntOutsideKeralaPincode, setpermntOutsideKeralaPincode,
  permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn, permntOutsideKeralaHouseNameMl,
  setpermntOutsideKeralaHouseNameMl, permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn, permntOutsideKeralaLocalityNameMl,
  setpermntOutsideKeralaLocalityNameMl, permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn,
  permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl, permntOutsideKeralaPostOfficeEn,
  setpermntoutsideKeralaPostOfficeEn, permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl,
  isEditBirth = false, isEditDeath = false, isEditStillBirth = false, isEditAdoption, isEditBirthNAC = false
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
  // const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  // const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);

  // const [isInitialRenderDistrict, setInitialRenderDistrict] = useState(sessionStorage.getItem("presentOutsideKeralaFlag"));
  const [cmbFilterDistrict, setCmbFilterDistrict] = useState();

  const cmbUrbanRural = [
    { name: "Town",namelocal:"ടൌണ്‍", code: "TOWN" },
    { name: "Village",namelocal:"വില്ലേജ്", code: "VILLAGE" },
  ];
  // let cmbTaluk = [];
  // let cmbVillage = [];
  let cmbDistrict = [];
  // let cmbPostOffice = [];
  let districtid = null;
  // let cmbFilterDistrict = [];
  let cmbLB = [];
  // Taluk &&
  //   Taluk["common-masters"] &&
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
  //   PostOffice["common-masters"] &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });
  useEffect(() => {
    setCmbFilterDistrict(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value));
    sessionStorage.setItem("presentOutsideKeralaFlag", false);
    // }
  }, [value])

  useEffect(() => {
    if (isInitialRender) {
      if (cmbDistrict.length > 0) {
        // currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setinsideKeralaLBName(currentLB[0]);
        //console.log(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value));
        setCmbFilterDistrict(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value));
        // setoutsideKeralaDistrict(cmbFilterDistrict);
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukvalue(cmbFilterTaluk);
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagevalue(cmbFilterVillage);
        setIsInitialRender(false);
      }
    }
  }, [cmbFilterDistrict, isInitialRender]);

  if (isEditBirth) {
    if (formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (presentOutsideKeralaDistrict === undefined || presentOutsideKeralaDistrict === "")) {
        setoutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict)[0]);
      }
    }
    // if (formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk != null) {
    //   if (cmbTaluk.length > 0 && (presentOutsideKeralaTaluk === undefined || presentOutsideKeralaTaluk === "")) {
    //     setoutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk)[0]);
    //   }
    // }
    if (formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutsideKeralaVillage === undefined || presentOutsideKeralaVillage === "")) {
        setoutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.ChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditAdoption !== false) {
    if (formData?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (presentOutsideKeralaDistrict === undefined || presentOutsideKeralaDistrict === "")) {
        setoutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AdoptionAddressBasePage?.presentOutsideKeralaDistrict)[0]);
      }
    }
    // if (formData?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk != null) {
    //   if (cmbTaluk.length > 0 && (presentOutsideKeralaTaluk === undefined || presentOutsideKeralaTaluk === "")) {
    //     setoutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AdoptionAddressBasePage?.presentOutsideKeralaTaluk)[0]);
    //   }
    // }
    if (formData?.AdoptionAddressBasePage?.presentOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutsideKeralaVillage === undefined || presentOutsideKeralaVillage === "")) {
        setoutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AdoptionAddressBasePage?.presentOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditDeath) {
    if (formData?.AddressBirthDetails?.presentOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (presentOutsideKeralaDistrict === undefined || presentOutsideKeralaDistrict === "")) {
        setoutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.AddressBirthDetails?.presentOutsideKeralaDistrict)[0]);
      }
    }
    // if (formData?.AddressBirthDetails?.presentOutsideKeralaTaluk != null) {
    //   if (cmbTaluk.length > 0 && (presentOutsideKeralaTaluk === undefined || presentOutsideKeralaTaluk === "")) {
    //     setoutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.AddressBirthDetails?.presentOutsideKeralaTaluk)[0]);
    //   }
    // }
    if (formData?.AddressBirthDetails?.presentOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutsideKeralaVillage === undefined || presentOutsideKeralaVillage === "")) {
        setoutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.AddressBirthDetails?.presentOutsideKeralaVillage)[0]);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict != null) {
      if (cmbDistrict.length > 0 && (presentOutsideKeralaDistrict === undefined || presentOutsideKeralaDistrict === "")) {
        setoutsideKeralaDistrict(cmbDistrict.filter(cmbDistrict => cmbDistrict.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaDistrict)[0]);
      }
    }
    // if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk != null) {
    //   if (cmbTaluk.length > 0 && (presentOutsideKeralaTaluk === undefined || presentOutsideKeralaTaluk === "")) {
    //     setoutsideKeralaTaluk(cmbTaluk.filter(cmbTaluk => cmbTaluk.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaTaluk)[0]);
    //   }
    // }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage != null) {
      if (cmbUrbanRural.length > 0 && (presentOutsideKeralaVillage === undefined || presentOutsideKeralaVillage === "")) {
        setoutsideKeralaVillage(cmbUrbanRural.filter(cmbUrbanRural => cmbUrbanRural.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.presentOutsideKeralaVillage)[0]);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectoutsideKeralaDistrict(value) {
    //console.log(value.code);
    setoutsideKeralaDistrict(value);
    districtid = value.districtid;
    setCmbFilterDistrict(null);
    if (isPrsentAddress) {
      setpermntOutsideKeralaDistrict(value);
    }
    // else {
    //   setpermntOutsideKeralaDistrict('');
    // }
    setIsInitialRender(true);
  }

  function setSelectoutsideKeralaVillage(value) {
    setoutsideKeralaVillage(value);
    if (isPrsentAddress) {
      setpermntOutsideKeralaVillage(value);
    }
    // else {
    //   setpermntOutsideKeralaVillage('');
    // }
  }
  function setSelectoutsideKeralaTaluk(e) {
    // setoutsideKeralaTaluk(value);
    // if (isPrsentAddress) {
    //   setpermntOutsideKeralaTaluk(value);
    // } else {
    //   setpermntOutsideKeralaTaluk('');
    // }
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setoutsideKeralaTaluk(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaTaluk(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaTaluk('');
      // }
    }
  }
  // function setSelectoutsideKeralaPostOffice(value) {
  //   setoutsideKeralaPostOffice(value);
  // }
  function setSelectoutsideKeralaPincode(e) {
    setoutsideKeralaPincode(e.target.value.length <= 6 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 6));
    if (isPrsentAddress) {
      setpermntOutsideKeralaPincode(e.target.value.trim().length <= 6 ? e.target.value.trim().replace(/[^0-9]/ig, '') : (e.target.value.trim().replace(/[^0-9]/ig, '')).substring(0, 6));
    }
    // else {
    //   setpermntOutsideKeralaPincode('');
    // }
  }
  function setSelectoutsideKeralaPostOfficeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setoutsideKeralaPostOfficeEn(e.target.value.trim().length <= 50 ? e.target.value.trim() : (e.target.value.trim()).substring(0, 50));
      if (isPrsentAddress) {
        setpermntoutsideKeralaPostOfficeEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntoutsideKeralaPostOfficeEn('');
      // }
    }
  }
  function setSelectoutsideKeralaPostOfficeMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaPostOfficeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
      if (isPrsentAddress) {
        setpermntoutsideKeralaPostOfficeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
      }
      // else {
      //   setpermntoutsideKeralaPostOfficeMl('');
      // }
    }
  }
  function setSelectoutsideKeralaHouseNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
      setoutsideKeralaHouseNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaHouseNameEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaHouseNameEn('');
      // }
    }
  }
  function setSelectoutsideKeralaHouseNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C0-9 \-]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setoutsideKeralaHouseNameMl('');
    }
    else {
      setoutsideKeralaHouseNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaHouseNameMl(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaHouseNameMl('');
      // }
    }
  }
  function setSelectoutsideKeralaLocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setoutsideKeralaLocalityNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaLocalityNameEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaLocalityNameEn('');
      // }
    }
  }
  function setSelectoutsideKeralaLocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setoutsideKeralaLocalityNameMl('');
    }
    else {
      setoutsideKeralaLocalityNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaLocalityNameMl(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaLocalityNameMl('');
      // }
    }
  }
  function setSelectoutsideKeralaStreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setoutsideKeralaStreetNameEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaStreetNameEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaStreetNameEn('');
      // }
    }
  }
  function setSelectoutsideKeralaStreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setoutsideKeralaStreetNameMl('');
    }
    else {
      setoutsideKeralaStreetNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaStreetNameMl(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaStreetNameMl('');
      // }
    }
  }
  function setSelectoutsideKeralaCityVilgeEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setoutsideKeralaCityVilgeEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      if (isPrsentAddress) {
        setpermntOutsideKeralaCityVilgeEn(e.target.value.trim().length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
      }
      // else {
      //   setpermntOutsideKeralaCityVilgeEn('');
      // }
    }
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
  const goNext = () => {

  };

  if (isDistrictLoading) {
    return <Loader></Loader>;
  }
  else {
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} > */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : "namelocal"}
              option={sortDropdownNames(cmbFilterDistrict ? cmbFilterDistrict : [],"name",t)}
              selected={presentOutsideKeralaDistrict}
              select={setSelectoutsideKeralaDistrict}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
              disable={isDisableEdit}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TALUK_TEHSIL")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaTaluk"
              value={presentOutsideKeralaTaluk}
              onChange={setSelectoutsideKeralaTaluk}
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
              disable={isDisableEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
            {/* <Dropdown
              t={t}
              optionKey="name"
              option={cmbTaluk}
              selected={presentOutsideKeralaTaluk}
              select={setSelectoutsideKeralaTaluk}
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
            /> */}
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TOWN_VILLAGE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey={locale === "en_IN" ? "name" : "namelocal"}
              option={sortDropdownNames(cmbUrbanRural ? cmbUrbanRural : [],"code",t)}
              selected={presentOutsideKeralaVillage}
              select={setSelectoutsideKeralaVillage}
              disable={isDisableEdit}
              placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_CITY_VILLAGE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaCityVilgeEn"
              value={presentOutsideKeralaCityVilgeEn}
              onChange={setSelectoutsideKeralaCityVilgeEn}
              placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
              disable={isDisableEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_PIN_CODE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPincode"
              value={presentOutsideKeralaPincode}
              onChange={setSelectoutsideKeralaPincode}
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
          {/* <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                option={cmbPostOffice}
                selected={presentOutsideKeralaPostOffice}
                select={setSelectoutsideKeralaPostOffice}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div> */}
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPostOfficeEn"
              value={presentOutsideKeralaPostOfficeEn}
              onChange={setSelectoutsideKeralaPostOfficeEn}
              disable={isDisableEdit}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
          {/* <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPostOfficeMl"
              value={presentOutsideKeralaPostOfficeMl}
              onChange={setSelectoutsideKeralaPostOfficeMl}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaLocalityNameEn"
              value={presentOutsideKeralaLocalityNameEn}
              onChange={setSelectoutsideKeralaLocalityNameEn}
              disable={isDisableEdit}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaLocalityNameMl"
              value={presentOutsideKeralaLocalityNameMl}
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectoutsideKeralaLocalityNameMl}
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
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaStreetNameEn"
              value={presentOutsideKeralaStreetNameEn}
              onChange={setSelectoutsideKeralaStreetNameEn}
              disable={isDisableEdit}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaStreetNameMl"
              value={presentOutsideKeralaStreetNameMl}
              onKeyPress={setCheckMalayalamInputField}
              onChange={setSelectoutsideKeralaStreetNameMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {

                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaHouseNameEn"
              value={presentOutsideKeralaHouseNameEn}
              onChange={setSelectoutsideKeralaHouseNameEn}
              disable={isDisableEdit}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaHouseNameMl"
              value={presentOutsideKeralaHouseNameMl}
              onKeyPress={setCheckMalayalamInputFieldWithSplChar}
              onChange={setSelectoutsideKeralaHouseNameMl}
              disable={isDisableEdit}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \/-]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
  }
};
export default AddressPresentOutsideKerala;