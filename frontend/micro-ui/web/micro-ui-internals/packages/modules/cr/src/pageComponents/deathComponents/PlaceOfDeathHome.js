import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathHome = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  const [lbs, setLbs] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [setVillage, setSelectedVillage] = useState(formData?.PlaceOfDeathHome?.setVillage);
  const [setLbName, setSelectedLbName] = useState(formData?.PlaceOfDeathHome?.setVillage);
  const [setPostOffice, setSelectedPostOffice] = useState(formData?.PlaceOfDeathHome?.setPostOffice);
  const [PinCode, setSelectedPinCode] = useState(formData?.PlaceOfDeathHome?.HouseNo);
  const [setTaluk, setSelectedTaluk] = useState(formData?.PlaceOfDeathHome?.setTaluk);
  const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict);
  const [BuildingNo, setSelectedBuildingNo] = useState(formData?.PlaceOfDeathHome?.BuildingNo);
  const [HouseNo, setSelectedHouseNo] = useState(formData?.PlaceOfDeathHome?.HouseNo);
  const [Locality, setLocality] = useState(formData?.PlaceOfDeathHome?.Locality);
  const [LocalityML, setLocalityML] = useState(formData?.PlaceOfDeathHome?.LocalityML);
  const [CityEn, setCityEn] = useState(formData?.PlaceOfDeathHome?.CityEn);
  const [CityMl, setCityMl] = useState(formData?.PlaceOfDeathHome?.CityMl);
  const [setWard, setSelectedWard] = useState(formData?.PlaceOfDeathHome?.setWard);
  const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName);

  

  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  let cmbVillage = [];
  let cmbTaluk = [];
  let cmbDistrict = [];
  let districtid = null;
  let cmbPostOffice = [];

  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  const onSkip = () => onSelect();
  function setSelectPresentDistrict(value) {
    setIsInitialRender(true);
    setPresentDistrict(value);
    setPresentLBName(null);
    setLbs(null);
    districtid = value.districtid
   
  }

  PostOffice &&
      PostOffice["common-masters"] &&
      PostOffice["common-masters"].PostOffice.map((ob) => {
        cmbPostOffice.push(ob);
      });

  function setSelectPresentLBName(value) {
    setPresentLBName(value);

  }
  function setSelectBuildingNo(e) {
    setSelectedBuildingNo(e.target.value);
  }
  function setSelectHouseNo(e) {
    setSelectedHouseNo(e.target.value);
  }
  function setSelectPinCode(e) {
    setSelectedPinCode(e.target.value);
  }
  function setSelectLocality(e) {
    setLocality(e.target.value);
  }
  function setSelectLocalityML(e) {
    setLocalityML(e.target.value);
  }
  function setSelectCityEn(e) {
    setCityEn(e.target.value);
  }
  function setSelectCityMl(e) {
    setCityMl(e.target.value);
  }
  function selectVillage(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedVillage(value);
  }
  function selectPostOffice(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPostOffice(value);
  }

  function selectLbName(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedLbName(value);
  }
  function selectTaluk(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTaluk(value);
  }
  // function selectDistrict(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedPlaceofActivity(value);
  // }
  // function selectDistrict(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedDistrict(value);
  // }
  function selectWard(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedWard(value);
  }
  
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
  function selectPlaceofactivity(value) {
    setSelectedPlaceofActivity(value);
  }
  useEffect(() => {
    if (isInitialRender) {
      console.log("PresentDistrict" + districtid);
      console.log(localbodies);
      if (PresentDistrict) {
        setIsInitialRender(false);
        setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
      }
    }
  }, [lbs, isInitialRender]);
  const goNext = () => {
    sessionStorage.setItem("setVillage", setVillage?setVillage.code:null);
    sessionStorage.setItem("PresentLBName", null);
    sessionStorage.setItem("setPostOffice", setPostOffice?setPostOffice.code:null);
    sessionStorage.setItem("PinCode", PinCode);
    sessionStorage.setItem("setTaluk", setTaluk?setTaluk.code:null);
    sessionStorage.setItem("PresentDistrict", PresentDistrict?PresentDistrict.code:null);
    sessionStorage.setItem("BuildingNo", BuildingNo);
    sessionStorage.setItem("HouseNo", HouseNo);
    sessionStorage.setItem("Locality", Locality);
    sessionStorage.setItem("LocalityML", LocalityML);
    sessionStorage.setItem("CityEn", CityEn);
    sessionStorage.setItem("CityMl", CityMl);
    sessionStorage.setItem("setWard", setWard?setWard.code:null);
    

    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      setVillage,
      PresentLBName,
      setPostOffice,
      PinCode,
      setTaluk,
      PresentDistrict,
      BuildingNo,
      HouseNo,
      Locality,
      LocalityML,
      CityEn,
      CityMl,
      setWard,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_HOME")}`}</span>
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
              placeholder={`${t("CR_BUILDING_NO")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
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
              placeholder={`${t("CR_HOUSE_NO")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("CR_LOCALITY_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Locality"
              value={Locality}
              onChange={setSelectLocality}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityML"
              value={LocalityML}
              onChange={setSelectLocalityML}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}            
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CS_COMMON_WARD")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbTaluk}
              selected={setWard}
              select={selectWard}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_WARD")}`}
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
              placeholder={`${t("CR_CITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })}
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
              placeholder={`${t("CR_CITY_ML")}`}
              {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CITY_ML") })}
            />
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
        <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_DISTRICT")} <span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbDistrict}
              selected={PresentDistrict}
              select={setSelectPresentDistrict}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
            />
          </div>          
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown  t={t}
                optionKey="name"
                isMandatory={true}
                option={lbs}
                selected={PresentLBName}
                select={setSelectPresentLBName}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_LB_NAME")}`} />
          </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_TALUK")}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbTaluk} selected={setTaluk} select={selectTaluk} disabled={isEdit}  placeholder={`${t("CS_COMMON_TALUK")}`}/>
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_VILLAGE")}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbVillage} selected={setVillage} select={selectVillage} disabled={isEdit}  placeholder={`${t("CS_COMMON_VILLAGE")}`}/>
          </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_POST_OFFICE")}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbPostOffice}
              selected={setPostOffice}
              select={selectPostOffice}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
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
              placeholder={`${t("CS_COMMON_PIN_CODE")}`}
              {...(validation = {pattern: "^([0-9]){6}$", isRequired: false,type: "text",title: t("CS_COMMON_INVALID_PIN_CODE"),})}
            />
          </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathHome;