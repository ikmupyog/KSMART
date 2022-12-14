import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const OutSideIndia = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [AdressEn, setAdressEn] = useState(null);
  const [AdressMl, setAdressMl] = useState(null);
  const [AdressEnB, setAdressEnB] = useState(null);
  const [AdressMlB, setAdressMlB] = useState(null);
  const [LocalityEn, setLocalityEn] = useState(null);
  const [LocalityMl, setLocalityMl] = useState(null);
  const [ProvinceEn, setProvinceEn] = useState(null);
  const [ProvinceMl, setProvinceMl] = useState(null);
  const [Country, setCountry] = useState(null);

  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }
  function setSelectAdressEn(e) {
    setAdressEn(e.target.value);
  }
  function setSelectAdressEnB(e) {
    setAdressEnB(e.target.value);
  }
  function setSelectAdressMlB(e) {
    setAdressMlB(e.target.value);
  }
  function setSelectAdressMl(e) {
    setAdressMl(e.target.value);
  }
  function setSelectLocalityEn(e) {
    setLocalityEn(e.target.value);
  }
  function setSelectLocalityMl(e) {
    setLocalityMl(e.target.value);
  }
  function setSelectProvinceEn(e) {
    setProvinceEn(e.target.value);
  }
  function setSelectProvinceMl(e) {
    setProvinceMl(e.target.value);
  }
  function setSelectCountry(e) {
    setCountry(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
    const goNext = () => {
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
    {window.location.href.includes("/employee") ? <Timeline /> : null}
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
    <header className="card-header" style={{fontSize:"35px"}}>CR_ADDRESS_TYPE_OUTSIDE_INDIA</header>
    <div className="row">    
        <div className="col-md-12 col-lg-12" > 
          <div className="col-md-4 " > 
              <hr className="aligncss"></hr>
          </div>
          <div className="col-md-4 " > 
          <h1 className="headingh1" >
              <span>CR_ADDRESS_TYPE_OUTSIDE_INDIA</span>
          </h1>
          </div>
          <div className="col-md-4" > 
              <hr className="aligncss"></hr>
          </div>
          
        </div>        
    </div>
    
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_ADDRESS_1_EN")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressEn"
                value={AdressEn}
                onChange={setSelectAdressEn}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />    
        </div> 
        <div className="col-md-6" >
            <CardLabel>{t("CR_ADDRESS_1_ML")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressMl"
                value={AdressMl}
                onChange={setSelectAdressMl}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>          
    </div>
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_ADDRESS_2_EN")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressEnB"
                value={AdressEnB}
                onChange={setSelectAdressEnB}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />    
        </div> 
        <div className="col-md-6" >
            <CardLabel>{t("CR_ADDRESS_2_ML")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressMlB"
                value={AdressMlB}
                onChange={setSelectAdressMlB}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>          
    </div>
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_LOCALITY_EN)")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="LocalityEn"
                value={LocalityEn}
                onChange={setSelectLocalityEn}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />    
        </div> 
        <div className="col-md-6" >
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
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>           
    </div>  
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ProvinceEn"
                value={ProvinceEn}
                onChange={setSelectProvinceEn}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />    
        </div> 
        <div className="col-md-6" >
            <CardLabel>{t("CR_STATE_REGION_PROVINCE_ML")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ProvinceMl"
                value={ProvinceMl}
                onChange={setSelectProvinceMl}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>           
    </div>  
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CS_COMMON_COUNTRY")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="Country"
                value={Country}
                onChange={setSelectCountry}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            /> 
        </div>                  
    </div>       
   
    </FormStep>
    </React.Fragment>
  );
};
export default OutSideIndia;
