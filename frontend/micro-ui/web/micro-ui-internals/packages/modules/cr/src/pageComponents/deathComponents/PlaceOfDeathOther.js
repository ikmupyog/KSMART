import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathOther = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");

  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [TradeName, setTradeName] = useState(null); 
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [setDeathOtherward, setSelectedDeathOtherward] = useState(formData?.PlaceOfDeathOther?.setDeathOtherward);
  const [setDeathOtherPlace, setSelectedDeathOtherPlace] = useState(formData?.PlaceOfDeathOther?.setDeathOtherPlace);
  const [ PlaceOfDeathOtherDetailsEn, setPlaceOfDeathOtherDetailsEn] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsEn);
  const [ PlaceOfDeathOtherDetailsMl, setPlaceOfDeathOtherDetailsMl] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsMl);
 
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
    let cmbOtherplace = [];
    otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }
  
  function selectDeathOtherPlace(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDeathOtherPlace(value);
  }
  function selectDeathOtherward(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDeathOtherward(value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function setSelectPlaceOfDeathOtherDetailsEn(e) {
    setPlaceOfDeathOtherDetailsEn(e.target.value);
  }
  function setSelectPlaceOfDeathOtherDetailsMl(e) {
    setPlaceOfDeathOtherDetailsMl(e.target.value);
  }  
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    sessionStorage.setItem("setDeathOtherPlace", setDeathOtherPlace.code);
    sessionStorage.setItem("setDeathOtherward", setDeathOtherward.code);
    sessionStorage.setItem("PlaceOfDeathOtherDetailsEn", PlaceOfDeathOtherDetailsEn);
    sessionStorage.setItem("PlaceOfDeathOtherDetailsMl", PlaceOfDeathOtherDetailsMl);
      
    onSelect(config.key, {
       setDeathOtherPlace,
       setDeathOtherward,
       PlaceOfDeathOtherDetailsEn,
       PlaceOfDeathOtherDetailsMl,
       setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <header className="tittle">Place Of Death Other </header>
    <div className="row">
      <div className="col-md-12" >
          <h1 className="headingh1" >
            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_OTHER")}`}
            </span> 
          </h1>
      </div>
    </div>
    <div className="row">
         <div className="col-md-6" >
            <CardLabel>{`${t("CR_OTHER_PLACE")}`}</CardLabel>
            <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbOtherplace}
                selected={setDeathOtherPlace}
                select={selectDeathOtherPlace}
                disabled={isEdit}
            />
        </div>
         <div className="col-md-6" >
            <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setDeathOtherward}
                select={selectDeathOtherward}
                disabled={isEdit}
            />
        </div> 
    </div>  
    <div className="row">
         <div className="col-md-6" >
          <CardLabel>{`${t("CR_OTHER_DETAILLS_EN")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="PlaceOfDeathOtherDetailsEn"
            value={PlaceOfDeathOtherDetailsEn}
            onChange={setSelectPlaceOfDeathOtherDetailsEn}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
         <div className="col-md-6" >
         <CardLabel>{`${t("CR_OTHER_DETAILS_ML")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="PlaceOfDeathOtherDetailsMl"
            value={PlaceOfDeathOtherDetailsMl}
            onChange={setSelectPlaceOfDeathOtherDetailsMl}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div> 
    </div>    
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathOther;