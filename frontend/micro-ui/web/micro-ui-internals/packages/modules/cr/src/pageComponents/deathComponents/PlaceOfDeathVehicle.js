import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathVehicle = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [DriverName, setDriverName] = useState(null);
  const [DriverNameMl, setDriverNameMl] = useState(null);
  const [DriverMobileNo, setDriverMobileNo] = useState(null);
  const [DriverAge, setDriverAge] = useState(null);
  const [DriverAadhar, setDriverAadhar] = useState(null);
  const [VehicleType, setVehicleType] = useState(null);
  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(null);
  const [VehicleFrom, setVehicleFrom] = useState(null);
  const [VehicleTo, setVehicleTo] = useState(null);
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(null);  
  const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(null);  
    
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
  function setSelectDriverName(e) {
    setDriverName(e.target.value);
  }
  function setSelectDriverNameMl(e) {
    setDriverNameMl(e.target.value);
  }
  function setSelectDriverMobileNo(e) {
    setDriverMobileNo(e.target.value);
  }
  function setSelectDriverAge(e) {
    setDriverAge(e.target.value);
  }
  function setSelectDriverAadhar(e) {
    setDriverAadhar(e.target.value);
  }
  function setSelectVehicleType(e) {
    setVehicleType(e.target.value);
  }
  function setSelectVehicleRegistrationNo(e) {
    setVehicleRegistrationNo(e.target.value);
  }
  function setSelectVehicleFrom(e) {
    setVehicleFrom(e.target.value);
  }
  function setSelectVehicleTo(e) {
    setVehicleTo(e.target.value);
  }
  function setSelectVehicleOtherDetailsEn(e) {
    setVehicleOtherDetailsEn(e.target.value);
  }
  function setSelectVehicleOtherDetailsMl(e) {
    setVehicleOtherDetailsMl(e.target.value);
  }

  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <header className="tittle">Place Of Death Vechicle </header>
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_VECHICLE")}`}
                </span> 
            </h1>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_EN")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverName"
                value={DriverName}
                onChange={setSelectDriverName}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
           
        </div>
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_ML")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverNameMl"
                value={DriverNameMl}
                onChange={setSelectDriverNameMl}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
           
        </div>
        </div>
        <div className="row">
        <div className="col-md-4" >
        <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverMobileNo"
                value={DriverMobileNo}
                onChange={setSelectDriverMobileNo}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
        <div className="col-md-4" >
        <CardLabel>{t("CR_AGE")}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverAge"
                value={DriverAge}
                onChange={setSelectDriverAge}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
        <div className="col-md-4 " >
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverAadhar"
                value={DriverAadhar}
                onChange={setSelectDriverAadhar}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
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
                name="VehicleType"
                value={VehicleType}
                onChange={setSelectVehicleType}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
         
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleRegistrationNo"
                value={VehicleRegistrationNo}
                onChange={setSelectVehicleRegistrationNo}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
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
                name="VehicleFrom"
                value={VehicleFrom}
                onChange={setSelectVehicleFrom}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
        <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_TO")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleTo"
                value={VehicleTo}
                onChange={setSelectVehicleTo}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
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
          <CardLabel>{`${t("CR_OTHER_DETAILLS_EN")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsEn"
            value={VehicleOtherDetailsEn}
            onChange={setSelectVehicleOtherDetailsEn}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div>
         <div className="col-md-6" >
         <CardLabel>{`${t("CR_OTHER_DETAILLS_ML")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsMl"
            value={VehicleOtherDetailsMl}
            onChange={setSelectVehicleOtherDetailsMl}
            disable={isEdit}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
        </div> 
    </div>    

      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathVehicle;