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
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
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
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
        <header className="tittle">Statistical Information(Contonue)</header>
    
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("Type of medical attention received before death ")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofActivity}
                select={selectPlaceofactivity}
                disabled={isEdit}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("Was the cause of death medically certified ?")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofActivity}
                select={selectPlaceofactivity}
                disabled={isEdit}
            />           
        </div>
      </div>
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("Name of Illness / Actual cause of death (Main part) ")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofActivity}
                select={selectPlaceofactivity}
                disabled={isEdit}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("Name of Illness / Actual cause of death (Sub part)")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofActivity}
                select={selectPlaceofactivity}
                disabled={isEdit}
            />           
        </div>
      </div>

      
      
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("Name of Illness / Actual cause of death (Other) (Malayalam) ")}</CardLabel>  
           <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />           
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("In case this is a female death, did the death occur While pregnant, at the time of delivery or within 6 weeks after the end of pregnancy")}</CardLabel>  
           <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofActivity}
                select={selectPlaceofactivity}
                disabled={isEdit}
            />           
        </div>
      </div>
      <div className="row">    
        <div className="col-md-6" > 
           <CardLabel>{t("If used to habitually smoke for how many Years ?")}</CardLabel>  
              <button onClick={""}>
              <NewRadioButton />
              </button> Yes  
              <button onClick={""}>
              <NewRadioButton />
              </button>  No    
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("If used to habitually chew tobacco in any form for how many years ?")}</CardLabel>  
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
           <CardLabel>{t("If used to habitually chew arecanut in any form (including pan masala)-for how many years ?")}</CardLabel>  
              <button onClick={""}>
              <NewRadioButton />
              </button> Yes  
              <button onClick={""}>
              <NewRadioButton />
              </button> No       
        </div>
        <div className="col-md-6" > 
           <CardLabel>{t("If used to habitually drink alcohol for how many years ?")}</CardLabel>  
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
