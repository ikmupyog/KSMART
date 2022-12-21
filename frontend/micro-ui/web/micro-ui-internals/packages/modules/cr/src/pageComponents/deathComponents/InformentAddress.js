import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea,CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const InformentAddress = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "mtaluk");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const [setVillage, setSelectedVillage] = useState(formData?.InformentAddress?.setVillage);
  const [setTaluk, setSelectedTaluk] = useState(formData?.InformentAddress?.setTaluk);
  const [setDistrict, setSelectedDistrict] = useState(formData?.InformentAddress?.setDistrict);
  const [BuildingNo, setBuildingNo] = useState(formData?.InformentAddress?.BuildingNo);
  const [HouseNo, setHouseNo] = useState(formData?.InformentAddress?.HouseNo);
  const [Locality, setLocality] = useState(formData?.InformentAddress?.Locality);
  const [LocalityMl, setLocalityMl] = useState(formData?.InformentAddress?.LocalityMl);
  const [CityEn, setCityEn] = useState(formData?.InformentAddress?.CityEn);
  const [CityMl, setCityMl] = useState(formData?.InformentAddress?.CityMl);
  const [PinCode, setPinCode] = useState(formData?.InformentAddress?.PinCode);
  const [setPostOffice, setSelectedPostOffice] = useState(formData?.InformentAddress?.setPostOffice);
  const [setLbName, setSelectedLbName] = useState(formData?.InformentAddress?.setLbName);
  const [InformentNameEn, setInformentNameEn] = useState(formData?.InformentAddress?.InformentNameEn);
  const [InformentNameMl, setInformentNameMl] = useState(formData?.InformentAddress?.InformentNameMl);
  const [setTitle, setSelectedTitle] = useState(formData?.InformentAddress?.setTitle);
  const [isNoAadhaar, setIsNoAadhaar] = useState(formData?.InformentAddress?.isNoAadhaar);
  const [AadhaarNo, setAadhaarNo] = useState(formData?.InformentAddress?.AadhaarNo);
  const [setDeclaration, setSelectedDeclaration] = useState(formData?.InformentAddress?.setDeclaration);
  const [InformentMobileNo, setInformentMobileNo] = useState(formData?.InformentAddress?.InformentMobileNo);
  const [InformentOfAge, setInformentOfAge] = useState(formData?.InformentAddress?.InformentOfAge);
  
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbVillage = [];
  let cmbTaluk = [];
  let cmbDistrict = [];
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].mtaluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
    
  let cmbTitle = [];
  title &&
    title["common-masters"] &&
    title["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });

  const onSkip = () => onSelect();
  function setSelectBuildingNo(e) {
    setBuildingNo(e.target.value);
  }
  function setSelectHouseNo(e) {
    setHouseNo(e.target.value);
  }
  function setSelectLocality(e) {
    setLocality(e.target.value);
  }
  function setSelectLocalityMl(e) {
    setLocalityMl(e.target.value);
  }
  function setSelectCityEn(e) {
    setCityEn(e.target.value);
  }
  function setSelectCityMl(e) {
    setCityMl(e.target.value);
  }
  function setSelectPinCode(e) {
    setPinCode(e.target.value);
  }
  function setSelectInformentNameEn(e) {
    setInformentNameEn(e.target.value);
  }
  function setSelectInformentNameMl(e) {
    setInformentNameMl(e.target.value);
  }
  function setSelectAadhaarNo(e) {
    setAadhaarNo(e.target.value);
  }
  function setSelectInformentMobileNo(e) {
    setInformentMobileNo(e.target.value);
  }
  function setSelectInformentOfAge(e) {
    setInformentOfAge(e.target.value);
  }
    
  function selectTitle(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTitle(value);
  }

  function selectVillage(value) {
    setSelectedVillage(value);
  }
  function selectTaluk(value) {
    setSelectedTaluk(value);
  }
  function selectDistrict(value) {
    setSelectedDistrict(value);
  }
  function selectPostOffice(value) {
    setSelectedPostOffice(value);
  }
  function selectLbName(value) {
    setSelectedLbName(value);
  }
  function selectDeclaration(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDeclaration(value);
  }
  
  function setNoAadhaar(e) {
    if (e.target.checked == true) {
      setIsNoAadhaar(true);
    } else {
      setIsNoAadhaar(false);
    }
  }

  const goNext = () => {
    sessionStorage.setItem("setVillage", setVillage?setVillage.code:null);
    sessionStorage.setItem("setTaluk", setTaluk?setTaluk.code:null);
    sessionStorage.setItem("setDistrict", setDistrict?setDistrict.code:null);
    sessionStorage.setItem("BuildingNo", BuildingNo);
    sessionStorage.setItem("HouseNo", HouseNo);
    sessionStorage.setItem("Locality", Locality);
    sessionStorage.setItem("LocalityMl", LocalityMl);
    sessionStorage.setItem("CityEn", CityEn);
    sessionStorage.setItem("CityMl", CityMl);
    sessionStorage.setItem("PinCode", PinCode);
    sessionStorage.setItem("setPostOffice", setPostOffice?setPostOffice.code:null);
    sessionStorage.setItem("setLbName", setLbName?setLbName.code:null);
    sessionStorage.setItem("InformentNameEn", InformentNameEn);
    sessionStorage.setItem("InformentNameMl", InformentNameMl);
    sessionStorage.setItem("setTitle", setTitle?setTitle.code:null);
    sessionStorage.setItem("isNoAadhaar", isNoAadhaar);
    sessionStorage.setItem("AadhaarNo", AadhaarNo);
    sessionStorage.setItem("setDeclaration", setDeclaration?setDeclaration.code:null);
    sessionStorage.setItem("InformentMobileNo", InformentMobileNo);  
    sessionStorage.setItem("InformentOfAge", InformentOfAge); 
    

    onSelect(config.key, {
      setVillage,
      setTaluk,
      setDistrict,
      BuildingNo,
      HouseNo,
      Locality,
      LocalityMl,
      CityEn,
      CityMl,
      PinCode,
      setPostOffice,
      setLbName,
      InformentNameEn,
      InformentNameMl,
      setTitle,
      isNoAadhaar,
      AadhaarNo,
      setDeclaration,
      InformentMobileNo,
      InformentOfAge,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
        <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
            <Dropdown t={t} 
            optionKey="name" 
            isMandatory={false} 
            option={cmbTitle} 
            selected={setTitle} 
            select={selectTitle} 
            disabled={isEdit} />
            
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_INFORMENT_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentNameEn"
              value={InformentNameEn}
              onChange={setSelectInformentNameEn}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_INFORMENT_NAME_Ml")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentNameMl"
              value={InformentNameMl}
              onChange={setSelectInformentNameMl}
              disable={isEdit}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
          </div>
        </div>
        
        <div className="row">
            <div className="col-md-12">
              <CheckBox label={t("No Aadhaar Number")} 
              onChange={setNoAadhaar} 
              value={isNoAadhaar} 
              checked={isNoAadhaar} />
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
            <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AadhaarNo"
              value={AadhaarNo}
              onChange={setSelectAadhaarNo}
              disable={isEdit}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false ,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
        
          <div className="col-md-3">
            <CardLabel>{`${t("CR_DECLARATION")}`}</CardLabel>
            <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbPlace} selected={setLbName} select={selectLbName} disabled={isEdit} />

            {/* <Dropdown t={t} 
            optionKey="name" 
            isMandatory={false} 
            option={cmbDeclaration} 
            selected={setDeclaration} 
            select={selectDeclaration} 
            disabled={isEdit} 
            />             */}
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentMobileNo"
              value={InformentMobileNo}
              onChange={setSelectInformentMobileNo}
              disable={isEdit}
              {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_AGE")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentOfAge"
              value={InformentOfAge}
              onChange={setSelectInformentOfAge}
              disable={isEdit}
              {...(validation = {pattern: "^([0-9]){3}$", isRequired: true,type: "text", title: t("CS_COMMON_INVALID_AGE"),  })}
            />
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="BuildingNo"
              value={BuildingNo}
              onChange={setSelectBuildingNo}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HOUSE_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="HouseNo"
              value={HouseNo}
              onChange={setSelectHouseNo}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Locality"
              value={Locality}
              onChange={setSelectLocality}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_LOCALITY_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityMl"
              value={LocalityMl}
              onChange={setSelectLocalityMl}
              disable={isEdit}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_CITY_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="CityEn"
              value={CityEn}
              onChange={setSelectCityEn}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_CITY_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="CityMl"
              value={CityMl}
              onChange={setSelectCityMl}
              disable={isEdit}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CITY_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_VILLAGE")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbVillage} selected={setVillage} select={selectVillage} disabled={isEdit} />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_LB_NAME")}</CardLabel>
            <Dropdown t={t} optionKey="code" isMandatory={false} option={cmbPlace} selected={setLbName} select={selectLbName} disabled={isEdit} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_TALUK")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTaluk} selected={setTaluk} select={selectTaluk} disabled={isEdit} />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_DISTRICT")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbDistrict}
              selected={setDistrict}
              select={selectDistrict}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_POST_OFFICE")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setPostOffice}
              select={selectPostOffice}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_PIN_CODE")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="PinCode"
              value={PinCode}
              onChange={setSelectPinCode}
              disable={isEdit}
              {...(validation = {pattern: "^([0-9]){6}$", isRequired: true,type: "text", title: t("CS_COMMON_INVALID_PIN_CODE"), })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformentAddress;
