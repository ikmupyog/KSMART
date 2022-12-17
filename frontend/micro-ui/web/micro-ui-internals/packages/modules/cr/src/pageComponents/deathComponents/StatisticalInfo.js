import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, NewRadioButton,  } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfo = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [TradeName, setTradeName] = useState(null);
  const [setReligion, setSelectedReligion] = useState(formData?.StatisticalInfo?.setReligion);
  const [setOccupationMain, setSelectedOccupationMain] = useState(formData?.StatisticalInfo?.setOccupationMain);  
  const [OccupationOthers, setOccupationOthers] = useState(formData?.StatisticalInfo?.OccupationOthers);
  const [CommencementDate, setCommencementDate] = useState();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    setSelectedPlaceofActivity(value);
  }
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectOccupationMain(value) {
    setSelectedOccupationMain(value);
  }  
  function setSelectOccupationOthers(e) {
    setoccupationOthers(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    sessionStorage.setItem("Religion", setReligion.code);
    sessionStorage.setItem("OccupationMain", setOccupationMain.code);  
    sessionStorage.setItem("OccupationOthers", OccupationOthers);  
     
    onSelect(config.key, { 
    setReligion,
    setOccupationMain,
    OccupationOthers });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="tittle">Statistical Information </header>
        
      <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_TOWN_VILLAGE_DECEASED")}`}
                </span> 
            </h1>
        </div>
        </div> 
        <div className="row">    
        <div className="col-md-12" > 
           <CardLabel>{t("CR_TOWN_VILLAGE_DECEASED-DETAILS")}</CardLabel>             
              <button onClick={""}>
              <NewRadioButton />
              </button> Inside Local Body 
              <button onClick={""}>
              <NewRadioButton />
              </button> Inside Kerala
              <button onClick={""}>
              <NewRadioButton />
              </button> Inside India
               <button onClick={""}>                
              <NewRadioButton />
              </button>  Outside India
              
        </div>
      </div>
      <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CS_COMMON_RELIGION")}`}
                </span> 
            </h1>
        </div>
        </div>
      <div className="row">
      <div className="col-md-12" >
            <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setReligion}
                select={selectReligion}
                disabled={isEdit}
            />
        </div>       
      </div> 

      <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OCCUPATION_DECEASED")}`}
                </span> 
            </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12" >
            <CardLabel>{t("CR_OCCUPATION_DECEASED_NO")}</CardLabel>
            </div>       
      </div> 
      <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_OCCUPATION_MAIN_LEVEL")}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setOccupationMain}
                select={selectOccupationMain}
                disabled={isEdit}
            />
        </div>   
        <div className="col-md-6" >
            <CardLabel>{t("CR_OCCUPATION_OTHER_ML")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="OccupationOthers"
                value={OccupationOthers}
                onChange={setOccupationOthers}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>  
      </div> 
      
      </FormStep>
    </React.Fragment>
  );
};
export default StatisticalInfo;