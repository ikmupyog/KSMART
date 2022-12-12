import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformationDeath = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  // const { data: religion = {}, isReligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");

  // const [setReligion, setSelectedReligion] = useState(formData?.TradeDetails?.setReligion);
  const [setCountry, setSelectedCountry] = useState(formData?.TradeDetails?.setCountry);
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.DeathDetails?.setPlaceofActivity);
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
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
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  // let cmbreligion = [];
  // religion &&
  //   religion["common-masters"] &&
  //   religion["common-masters"].religion.map((ob) => {
  //     cmbreligion.push(ob);
  //   });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
  }

  // function selectReligion(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedReligion(value);
  // }

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
        {/* <header className="tittle">Information Deceased </header> */}
        <div className="row">
            <div className="col-md-12" >
                <h1 className="headingh1" >
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}
                    </span> 
                </h1>
            </div>
        </div>
      
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_DATE_OF_DEATH")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate}  />
        </div>
        <div className="col-md-2" >
            <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
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
        <div className="col-md-2" >
            <CardLabel>{t("m")}</CardLabel>
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
        <div className="col-md-2" >
            <CardLabel>{t("s")}</CardLabel>
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
      </div>
      <div className="row">
        <div className="col-md-3" >
            <CardLabel>{t("CR_FROM_DATE")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate}  />
        </div>
        <div className="col-md-1" >
            <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
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
        <div className="col-md-1" >
            <CardLabel>{t("m")}</CardLabel>
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
        <div className="col-md-1" >
            <CardLabel>{t("s")}</CardLabel>
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
        <div className="col-md-3" >
            <CardLabel>{t("CR_TO_DATE")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate}  />
        </div>
        <div className="col-md-1" >
            <CardLabel>{t("CR_TO_TIME")}</CardLabel>
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
        <div className="col-md-1" >
            <CardLabel>{t("m")}</CardLabel>
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
        <div className="col-md-1" >
            <CardLabel>{t("s")}</CardLabel>
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
      </div>
    
    <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_DECEASED")}`}
                </span> 
            </h1>
        </div>
    </div>

    <div className="row"> 
        <div className="col-md-3" > 
            <CardLabel>{`${t("CR_TITLE_EN")}`}</CardLabel>
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
        <div className="col-md-3" > 
            <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
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
        <div className="col-md-3" >
            <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
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
        <div className="col-md-3" >
            <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
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
    </div>
    <div className="row">  
        <div className="col-md-3" > 
            <CardLabel>{`${t("CR_TITLE_ML")}`}</CardLabel>
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
        <div className="col-md-3" > 
            <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
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
        <div className="col-md-3" >
            <CardLabel>{`${t("CR_MIDDLE_NAME_ML)")}`}</CardLabel>
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
        <div className="col-md-3">
            <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
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
    </div>     
    <div className="row">    
        <div className="col-md-4" > 
           <CardLabel>{t("CR_GENDER")}</CardLabel>
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
        <div className="col-md-4" >
            <CardLabel>{`${t("CR_DATE_OF_BIRTH_DECEASED")}`}</CardLabel>
             {/* date={CommencementDate} */}
            <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate}  />
        </div>
        <div className="col-md-4">
            <CardLabel>{`${t("CR_AGE_OF_BIRTH_DECEASED")}`}</CardLabel>
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
    </div>     
   
    <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADHAR_OF_DECEASED")}`}
                </span> 
            </h1>
        </div>
    </div>
    
    <div className="row">    
        <div className="col-md-12" > 
           <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
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
    </div>    
    <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PASSPORT_DETAILS")}`}
                </span> 
            </h1>
        </div>
    </div>
 
    <div className="row">    
        <div className="col-md-4" > 
           <CardLabel>{t("CR_PASSPORT")}</CardLabel>
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
        <div className="col-md-4" > 
           <CardLabel>{t("CR_NATIONALITY")}</CardLabel>
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
        <div className="col-md-4" > 
           <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
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
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
