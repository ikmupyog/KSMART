import React, { useState } from "react";
import { FormStep,CardLabel, TextInput,Dropdown,BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthVehicle = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/")||window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue =null;
  let cmbPlace = [];
  place &&
  place["TradeLicense"] &&
  place["TradeLicense"].PlaceOfActivity.map((ob) => {
        cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofactivity(value) {
    naturetypecmbvalue=value.code.substring(0, 4);
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
  }
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline /> : null}
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!CommencementDate}>
    
    <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}</span> </h1>
                    </div>
                </div>
    <div className="row">
        <div className="col-md-4" >
            <CardLabel>{t("CR_DRIVER_NAME")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DRIVER_NAME") })}
            />
           
        </div>
        <div className="col-md-4" >
        <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
            />
        </div>
        <div className="col-md-4 " >
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
        </div>
    </div>
         
    <div className="row">    
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TYPE") })}
            />
        </div>
         
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
            />
        </div>
    </div> 

    <div className="row">    
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_TO")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
    </div>     
  
    <div className="row">    
        <div className="col-md-6" > 
        <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
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
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="TradeName"
                value={TradeName}
                onChange={setSelectTradeName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADMITTED_HOSPITAL") })}
            />
        </div>
    </div>

    </FormStep>
    </React.Fragment>
  );
};
export default BirthVehicle;
