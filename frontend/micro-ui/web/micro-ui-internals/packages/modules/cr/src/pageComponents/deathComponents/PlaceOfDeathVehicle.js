import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";


const PlaceOfDeathVehicle = ({ config, onSelect, userType, formData,VehicleRegistrationNo, setVehicleRegistrationNo,DriverLicenceNo, setDriverLicenceNo,
  VehicleFromEn, setVehicleFromEn,VehicleToEn, setVehicleToEn,VehicleFromMl, setVehicleFromMl,VehicleToMl, setVehicleToMl,VehicleOtherDetailsEn, setVehicleOtherDetailsEn,
  VehicleOtherDetailsMl, setVehicleOtherDetailsMl,PlaceOfHalt, setPlaceOfHalt,setAdmittedHospitalEn, setSelectedAdmittedHospitalEn,setAdmittedHospitalMl, setSelectedAdmittedHospitalMl}) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [TradeName, setTradeName] = useState(null);
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
  
  // const [DriverName, setDriverName] = useState(formData?.PlaceOfDeathVehicle?.DriverName);
  // const [DriverNameMl, setDriverNameMl] = useState(formData?.PlaceOfDeathVehicle?.DriverNameMl);
  // const [DriverMobileNo, setDriverMobileNo] = useState(formData?.PlaceOfDeathVehicle?.DriverMobileNo);
  // const [DriverAge, setDriverAge] = useState(formData?.PlaceOfDeathVehicle?.DriverAge);
  // const [DriverAadhar, setDriverAadhar] = useState(formData?.PlaceOfDeathVehicle?.DriverAadhar);
  // const [VehicleType, setVehicleType] = useState(formData?.PlaceOfDeathVehicle?.VehicleType);
  // const [setDeathVehicleWard, setSelectedDeathVehicleWard] = useState(formData?.PlaceOfDeathVehicle?.setDeathVehicleWard);
  
  // To Place of Death page
  // const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.PlaceOfDeathVehicle?.VehicleRegistrationNo);
  // const [DriverLicenceNo, setDriverLicenceNo] = useState(formData?.PlaceOfDeathVehicle?.DriverLicenceNo);
  const [VehicleTypeOther, setVehicleTypeOther] = useState(formData?.PlaceOfDeathVehicle?.VehicleTypeOther);
  const [setVehicleType, setSelectedVehicleType] = useState(formData?.PlaceOfDeathVehicle?.setVehicleType);
  // const [VehicleFromEn, setVehicleFromEn] = useState(formData?.PlaceOfDeathVehicle?.VehicleFromEn);
  // const [VehicleToEn, setVehicleToEn] = useState(formData?.PlaceOfDeathVehicle?.VehicleToEn);
  // const [VehicleFromMl, setVehicleFromMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleFromMl);
  // const [VehicleToMl, setVehicleToMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleToMl);
  // const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsEn);  
  // const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.PlaceOfDeathVehicle?.VehicleOtherDetailsMl); 
  // const [PlaceOfHalt, setPlaceOfHalt] = useState(formData?.PlaceOfDeathVehicle?.setSelectPlaceOfHalt);  
  // const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.PlaceOfDeathVehicle?.setAdmittedHospitalEn);
  // const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.PlaceOfDeathVehicle?.setAdmittedHospitalMl);
   
  // const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });

    let cmbhospital = [];
    hospital &&
      hospital["egov-location"] &&
      hospital["egov-location"].hospitalList.map((ob) => {
        cmbhospital.push(ob);
      });
      let cmbLBType = [];
      LBType &&
      LBType["common-masters"] &&
      LBType["common-masters"].LBType.map((ob) => {
        cmbLBType.push(ob);
      });
      let cmbVehicle = [];
      Vehicle &&
      Vehicle["birth-death-service"] &&
      Vehicle["birth-death-service"].VehicleType.map((ob) => {
        cmbVehicle.push(ob);
        });
      
  const onSkip = () => onSelect();

  // function selectPlaceofactivity(value) {
  //   setSelectedPlaceofActivity(value);
  // }

  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }


  // function setSelectDriverName(e) {
  //   setDriverName(e.target.value);
  // }
  // function setSelectDriverNameMl(e) {
  //   setDriverNameMl(e.target.value);
  // }
  // function setSelectDriverMobileNo(e) {
  //   setDriverMobileNo(e.target.value);
  // }
  // function setSelectDriverAge(e) {
  //   setDriverAge(e.target.value);
  // }
  // function setSelectDriverAadhar(e) {
  //   setDriverAadhar(e.target.value);
  // }
  // function setSelectVehicleType(e) {
  //   setVehicleType(e.target.value);
  // }
  function setSelectVehicleRegistrationNo(e) {
    setVehicleRegistrationNo(e.target.value);
  }
  function setSelectDriverLicenceNo (e) {
    setDriverLicenceNo(e.target.value);
  }
  function setSelectVehicleTypeOther (e) {
    setVehicleTypeOther(e.target.value);
  } 
  
  function setSelectVehicleFromEn(e) {
    setVehicleFromEn(e.target.value);
  }
  function setSelectVehicleToEn(e) {
    setVehicleToEn(e.target.value);
  }
  function setSelectPlaceOfHalt(e) {
    setPlaceOfHalt(e.target.value);
  }
  
  function setSelectVehicleFromMl(e) {
    setVehicleFromMl(e.target.value);
  }
  function setSelectVehicleToMl(e) {
    setVehicleToMl(e.target.value);
  }
  function setSelectVehicleOtherDetailsEn(e) {
    setVehicleOtherDetailsEn(e.target.value);
  }
  function setSelectVehicleOtherDetailsMl(e) {
    setVehicleOtherDetailsMl(e.target.value);
  }
  // function selectDeathVehicleWard(value) {
  //   setSelectedDeathVehicleWard(value);
  // }
  function selectAdmittedHospitalEn(value) {
    setSelectedAdmittedHospitalEn(value);
  }
  function selectVehicleType(value) {
    setSelectedVehicleType(value);    
  }
  
  function selectAdmittedHospitalMl(value) {
    setSelectedAdmittedHospitalMl(value);
  }
  
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }

  const goNext = () => {
    
    // sessionStorage.setItem("DriverName", DriverName);
    // sessionStorage.setItem("DriverNameMl", DriverNameMl);
    // sessionStorage.setItem("DriverMobileNo", DriverMobileNo);
    // sessionStorage.setItem("DriverAge", DriverAge);
    // sessionStorage.setItem("DriverAadhar", DriverAadhar);
    // sessionStorage.setItem("VehicleType", VehicleType);
    // sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard.code);


      // To Place of Death page

    // sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo);
    // sessionStorage.setItem("DriverLicenceNo", DriverLicenceNo);   
    sessionStorage.setItem("VehicleTypeOther", VehicleTypeOther);
    sessionStorage.setItem("setVehicleType", setVehicleType.code);
    
    // sessionStorage.setItem("VehicleFromEn", VehicleFromEn);  
    // sessionStorage.setItem("VehicleToEn", VehicleToEn);
    // sessionStorage.setItem("VehicleFromMl", VehicleFromMl);  
    // sessionStorage.setItem("VehicleToMl", VehicleToMl);
    // sessionStorage.setItem("PlaceOfHalt", PlaceOfHalt);  
    // sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn.code);
    // sessionStorage.setItem("setAdmittedHospitalMl", setAdmittedHospitalMl.code);    
    // sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn); 
    // sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn);   
    
    
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      setPlaceofActivity,
      // DriverName,
      // DriverNameMl,
      // DriverMobileNo,
      // DriverAadhar,
      // VehicleType,
      // setDeathVehicleWard,
      
         // To Place of Death page
         
      // VehicleRegistrationNo,
      // DriverLicenceNo,
      VehicleTypeOther,
      setVehicleType,
      // VehicleFromEn,
      // VehicleToEn,
      // VehicleFromMl,
      // VehicleToMl,
      // PlaceOfHalt,     
      // setAdmittedHospitalEn,
      // setAdmittedHospitalMl,
      // VehicleOtherDetailsEn,
      // VehicleOtherDetailsMl,
     });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
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
       <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
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
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_DRIVER_LICENCE_NO")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DriverLicenceNo"
                value={DriverLicenceNo}
                onChange={setSelectDriverLicenceNo}
                disable={isEdit}
                placeholder={`${t("CR_DRIVER_LICENCE_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LICENCE_NO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbVehicle}
                selected={setVehicleType}
                select={selectVehicleType}
                disabled={isEdit}
                placeholder={`${t("CR_VEHICLE_TYPE")}`}
            />
        </div>
       
    <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_OTHER")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleTypeOther"
                value={VehicleTypeOther}
                onChange={setSelectVehicleTypeOther}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_OTHER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TYPE") })}
            />
        </div>
       
       </div> 
    </div> 
      <div className="row">    
       <div className="col-md-12" >         
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromEn"
                value={VehicleFromEn}
                onChange={setSelectVehicleFromEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToEn"
                value={VehicleToEn}
                onChange={setSelectVehicleToEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromMl"
                value={VehicleFromMl}
                onChange={setSelectVehicleFromMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
                />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToMl"
                value={VehicleToMl}
                onChange={setSelectVehicleToMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
    </div> 
    </div> 
    {/* <div className="row">
    <div className="col-md-12" >
        <div className="col-md-6" >
            <CardLabel>{t("CR_DRIVER_NAME_EN")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
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
                isMandatory={false}
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
    </div> */}      
       
  
    <div className="row">  
    <div className="col-md-12" > 
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}</CardLabel>
        <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfHalt"
                value={PlaceOfHalt}
                onChange={setSelectPlaceOfHalt}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT") })}
            />
        {/* <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbLBType}
                selected={setDeathVehicleWard}
                select={selectDeathVehicleWard}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
            /> */}
        </div>
        
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_EN")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={false}
                option={cmbhospital}
                selected={setAdmittedHospitalEn}
                select={selectAdmittedHospitalEn}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_EN")}`}
            />
        </div>
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_ML")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalNamelocal"
                isMandatory={false}
                option={cmbhospital}
                selected={setAdmittedHospitalMl}
                select={selectAdmittedHospitalMl}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_ML")}`}
            />
        </div>
        </div>   
    </div>  
     <div className="row">  
     <div className="col-md-12" > 
        <div className="col-md-6" >
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
        <div className="col-md-6" >
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