import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathVehicle = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [DriverName, setDriverName] = useState(formData?.PlaceOfDeathVehicle?.DriverName);
  const [DriverNameMl, setDriverNameMl] = useState(formData?.PlaceOfDeathVehicle?.DriverNameMl);
  const [DriverMobileNo, setDriverMobileNo] = useState(formData?.PlaceOfDeathVehicle?.DriverMobileNo);
  const [DriverAge, setDriverAge] = useState(formData?.PlaceOfDeathVehicle?.DriverAge);
  const [DriverAadhar, setDriverAadhar] = useState(formData?.PlaceOfDeathVehicle?.DriverAadhar);
  const [VehicleType, setVehicleType] = useState(formData?.PlaceOfDeathVehicle?.VehicleType);
  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.PlaceOfDeathVehicle?.VehicleRegistrationNo);
  const [VehicleFrom, setVehicleFrom] = useState(formData?.PlaceOfDeathVehicle?.VehicleFrom);
  const [VehicleTo, setVehicleTo] = useState(formData?.PlaceOfDeathVehicle?.VehicleTo);
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsEn);  
  const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsMl); 
  const [setDeathVehicleWard, setSelectedDeathVehicleWard] = useState(formData?.PlaceOfDeathVehicle?.setDeathVehicleWard);
  const [setAdmittedHospital, setSelectedAdmittedHospital] = useState(formData?.PlaceOfDeathVehicle?.setAdmittedHospital);
  
    
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
  function selectDeathVehicleWard(value) {
    setSelectedDeathVehicleWard(value);
  }
  function selectAdmittedHospital(value) {
    setSelectedAdmittedHospital(value);
  }
  
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    
    sessionStorage.setItem("DriverName", DriverName);
    sessionStorage.setItem("DriverNameMl", DriverNameMl);
    sessionStorage.setItem("DriverMobileNo", DriverMobileNo);
    sessionStorage.setItem("DriverAge", DriverAge);
    sessionStorage.setItem("DriverAadhar", DriverAadhar);
    sessionStorage.setItem("VehicleType", VehicleType);
    sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo);
    sessionStorage.setItem("VehicleFrom", VehicleFrom);  
    sessionStorage.setItem("VehicleTo", VehicleTo);
    sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard.code);
    sessionStorage.setItem("setAdmittedHospital", setAdmittedHospital.code);
    sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn); 
    sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn); 
    
    
    
    
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      setPlaceofActivity,
      DriverName,
      DriverNameMl,
      DriverMobileNo,
      DriverAadhar,
      VehicleType,
      VehicleRegistrationNo,
      VehicleFrom,
      VehicleTo,
      setDeathVehicleWard,
      setAdmittedHospital,
      VehicleOtherDetailsEn,
      VehicleOtherDetailsMl,
     });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_VECHICLE")}`}
                </span> 
            </h1>
        </div>
    </div>
    <div className="row">
    <div className="col-md-12" >
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={TextTrackCue}
                type={"text"}
                optionKey="i18nKey"
                name="DriverName"
                value={DriverName}
                onChange={setSelectDriverName}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
           
        </div>
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={TextTrackCue}
                type={"text"}
                optionKey="i18nKey"
                name="DriverNameMl"
                value={DriverNameMl}
                onChange={setSelectDriverNameMl}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_NAME_ML")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
           
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12" >
        <div className="col-md-3" >
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
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
        </div>
        <div className="col-md-3" >
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
                placeholder={`${t("CR_AGE")}`}
                {...(validation = {pattern: "^([0-9]){3}$", isRequired: false,type: "text",title: t("CS_COMMON_INVALID_AGE"),  })}
            />
        </div>
        <div className="col-md-3 " >
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
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false ,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
        </div>
        <div className="col-md-3" > 
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
                placeholder={`${t("CR_VEHICLE_TYPE")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TYPE") })}
            />
        </div>
    </div>
    </div>
         
    <div className="row">    
       <div className="col-md-12" >         
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleRegistrationNo"
                value={VehicleRegistrationNo}
                onChange={setSelectVehicleRegistrationNo}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_REGISTRATION_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
            />
        </div>
   
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFrom"
                value={VehicleFrom}
                onChange={setSelectVehicleFrom}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_VEHICLE_TO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleTo"
                value={VehicleTo}
                onChange={setSelectVehicleTo}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
    </div> 
    </div>    
  
    <div className="row">  
    <div className="col-md-12" > 
        <div className="col-md-3" > 
        <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setDeathVehicleWard}
                select={selectDeathVehicleWard}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setAdmittedHospital}
                select={selectAdmittedHospital}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL")}`}
            />
        </div>
   
        <div className="col-md-3" >
          <CardLabel>{`${t("CR_OTHER_DETAILS_EN")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsEn"
            value={VehicleOtherDetailsEn}
            onChange={setSelectVehicleOtherDetailsEn}
            disable={isEdit}
            placeholder={`${t("CR_OTHER_DETAILS_EN")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
            />
        </div>
        <div className="col-md-3" >
         <CardLabel>{`${t("CR_OTHER_DETAILS_ML")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="VehicleOtherDetailsMl"
            value={VehicleOtherDetailsMl}
            onChange={setSelectVehicleOtherDetailsMl}
            disable={isEdit}
            placeholder={`${t("CR_OTHER_DETAILS_ML")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OTHER_DETAILS_ML") })}
            />
        </div> 
    </div>   
    </div> 

      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathVehicle;