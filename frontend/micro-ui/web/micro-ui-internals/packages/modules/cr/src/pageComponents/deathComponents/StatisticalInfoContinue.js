import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, NewRadioButton,  } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfoContonue = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const [setMedicalAttentionDeath, setSelectedMedicalAttentionDeath] = useState(formData?.StatisticalInfoContinue?.setMedicalAttentionDeath);
  const [setDeathMedicallyCertified, setSelectedDeathMedicallyCertified] = useState(formData?.StatisticalInfoContinue?.setDeathMedicallyCertified);
  const [setCauseOfDeathMain, setSelectedCauseOfDeathMain] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathMain);
  const [setCauseOfDeathSub, setSelectedCauseOfDeathSub] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeathSub);
  const [setFemaleDeathPregnant, setSelectedFemaleDeathPregnant] = useState(formData?.StatisticalInfoContinue?.setFemaleDeathPregnant);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CauseOfDeath, setCauseOfDeath] = useState(formData?.StatisticalInfoContinue?.setCauseOfDeath);

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
  function selectMedicalAttentionDeath(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedMedicalAttentionDeath(value);
  }
  function selectDeathMedicallyCertified(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDeathMedicallyCertified(value);
  }
  function selectCauseOfDeathMain(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedCauseOfDeathMain(value);
  }
  function selectCauseOfDeathSub(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedCauseOfDeathSub(value);
  }
  function selectFemaleDeathPregnant(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedFemaleDeathPregnant(value);
  } 
  function setSelectCauseOfDeath(e) {
    setCauseOfDeath(e.target.value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("MedicalAttentionDeath", setMedicalAttentionDeath.code);
    sessionStorage.setItem("DeathMedicallyCertified", setDeathMedicallyCertified.code);
    sessionStorage.setItem("CauseOfDeathMain", setCauseOfDeathMain.code);
    sessionStorage.setItem("CauseOfDeathSub", setCauseOfDeathSub.code);
    sessionStorage.setItem("CauseOfDeath", setCauseOfDeath);
    sessionStorage.setItem("FemaleDeathPregnant", setFemaleDeathPregnant.code);    
    sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    
    CauseOfDeath
    onSelect(config.key, {
      setMedicalAttentionDeath,
      setDeathMedicallyCertified,
      setCauseOfDeathMain,
      setCauseOfDeathSub,
      setCauseOfDeath,
      setFemaleDeathPregnant,

      setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="tittle">Statistical Information(Continue)</header>
    
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("CR_MEDICAL_ATTENTION_DEATH")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setMedicalAttentionDeath}
                select={selectMedicalAttentionDeath}
                disabled={isEdit}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setDeathMedicallyCertified}
                select={selectDeathMedicallyCertified}
                disabled={isEdit}
            />           
        </div>
      </div>
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN_PART")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setCauseOfDeathMain}
                select={selectCauseOfDeathMain}
                disabled={isEdit}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_PART")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setCauseOfDeathSub}
                select={selectCauseOfDeathSub}
                disabled={isEdit}
            />           
        </div>
      </div>        
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("CR_ACTUAL_CAUSE_OF_DEATH_OTHER_ML")}</CardLabel>  
           <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="CauseOfDeath"
                value={CauseOfDeath}
                onChange={setSelectCauseOfDeath}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("CR_FEMALE_DEATH_PREGNANT")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setFemaleDeathPregnant}
                select={selectFemaleDeathPregnant}
                disabled={isEdit}
            />           
        </div>
      </div>
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("CR_HABITUALLY_SMOKE")}</CardLabel>  
              <button onClick={""}>
              <NewRadioButton />
              </button> Yes  
              <button onClick={""}>
              <NewRadioButton />
              </button>  No    
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("CR_HABITUALLY_CHEW_TOBACCO")}</CardLabel>  
           <button onClick={""}>
              <NewRadioButton />
              </button> Yes  
              <button onClick={""}>
              <NewRadioButton />
              </button> No            
        </div>
      </div>
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("CR_HABITUALLY_CHEW_ARECANUT_PAN_MASALA")}</CardLabel>  
              <button onClick={""}>
              <NewRadioButton />
              </button> Yes  
              <button onClick={""}>
              <NewRadioButton />
              </button> No       
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("CR_HABITUALLY_DRINK_ALCOHOL")}</CardLabel>  
           <button onClick={""}>
              <NewRadioButton />
              </button> Yes
              <button onClick={""}>
              <NewRadioButton />
              </button> No           
        </div>
      </div>

      
      
      
      </FormStep>
    </React.Fragment>
  );
};
export default StatisticalInfoContonue;