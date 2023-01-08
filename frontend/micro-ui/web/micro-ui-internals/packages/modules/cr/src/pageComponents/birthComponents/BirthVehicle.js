import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthVehicle = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  console.log(hospital);
  const [HospitalName, selectHospitalName] = useState(formData?.BirthVehicleDetails?.HospitalName);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [TradeName, setTradeName] = useState(null);
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  console.log(boundaryList);
  // const [WardNo, setWardNo] = useState(formData.BirthVehicleDetails?.wardno);
  const [DriverName, setDriverName] = useState(formData?.BirthVehicleDetails?.DriverName);
  const [DriverMobileNo, setDriverMobileNo] = useState(formData?.BirthVehicleDetails?.DriverMobileNo);
  const [DriverAadhar, setDriverAadhar] = useState(formData?.BirthVehicleDetails?.DriverAadhar);
  const [VehicleType, setVehicleType] = useState(formData?.BirthVehicleDetails?.VehicleType);
  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.BirthVehicleDetails?.VehicleRegistrationNo);  
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthVehicleDetails?.setVehicleFromEn);
  const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthVehicleDetails?.setSelectVehicleToEn);  
  const [VehiclePlaceFirstHalt, setVehiclePlaceFirstHalt] = useState(formData?.BirthVehicleDetails?.VehiclePlaceFirstHalt); 


  let cmbhospital = [];
  hospital &&
    hospital["birth-death-service"] &&
    hospital["birth-death-service"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });

      // let Zonal = [];
      // let cmbWardNo = [];
      // let cmbWardNoFinal = [];
      // boundaryList &&
      //   boundaryList["egov-location"] &&
      //   boundaryList["egov-location"].TenantBoundary.map((ob) => {
      //     //  console.log(ob);
      //     // if(ob?.boundary){
      //     Zonal.push(...ob.boundary.children);
      //     ob.boundary.children.map((obward) => {
      //       cmbWardNo.push(...obward.children);
      //     });
      //     // }
     
      //   });
      // //console.log(Zonal);
      // cmbWardNo.map((wardmst) => {
      //   wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
      //   wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
      //   cmbWardNoFinal.push(wardmst);
      // });
  const onSkip = () => onSelect(); 


  function setSelectDriverName(e) {
    setDriverName(e.target.value);
  }

  function setSelectDriverMobileNo(e) {
    setDriverMobileNo(e.target.value);
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
  function setSelectVehiclePlaceFirstHalt(e) {
    setVehiclePlaceFirstHalt(e.target.value);
  }
  
  function setSelectVehicleFromEn(e) {
    setVehicleFromEn(e.target.value);
  }
  function setSelectVehicleToEn(e) {
    setVehicleToEn(e.target.value);
  } 
 
  // function setSelectWard(value) {
  //   setWardNo(value);
  // }
  function setselectHospitalName(value) {
    selectHospitalName(value);
  }  

  const goNext = () => {    
    sessionStorage.setItem("DriverName", DriverName);    
    sessionStorage.setItem("DriverMobileNo", DriverMobileNo);   
    sessionStorage.setItem("DriverAadhar", DriverAadhar);
    sessionStorage.setItem("VehicleType", VehicleType);
    sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo);      
    sessionStorage.setItem("VehicleFromEn", VehicleFromEn);  
    sessionStorage.setItem("VehicleToEn", VehicleToEn);  
    // sessionStorage.setItem("Ward", Ward.code);
    sessionStorage.setItem("HospitalName", HospitalName.hospitalName);  
    sessionStorage.setItem("VehiclePlaceFirstHalt", VehiclePlaceFirstHalt);     
    
    onSelect(config.key, {     
      DriverName,    
      DriverMobileNo,
      DriverAadhar,
      VehicleType,
      VehicleRegistrationNo,     
      VehicleFromEn,
      VehicleToEn,
      // ward,     
      HospitalName,
      VehiclePlaceFirstHalt,
      
     });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={2}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}
                </span> 
            </h1>
        </div>
    </div>

    <div className="row">
    <div className="col-md-12" >
        <div className="col-md-4" >
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
        <div className="col-md-4" >
        <CardLabel>{t("CR_MOBILE_NO")}<span className="mandatorycss">*</span></CardLabel>
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
        
        <div className="col-md-4 " >
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
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
        </div>
        </div>

    <div className="row">    
       <div className="col-md-12" >         
      
       <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
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
        <div className="col-md-6" > 
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
       
       </div> 
    </div> 

    <div className="row">    
       <div className="col-md-12" >         
        <div className="col-md-4" > 
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
        <div className="col-md-4" > 
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
                placeholder={`${t("CR_VEHICLE_TO-EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehiclePlaceFirstHalt"
                value={VehiclePlaceFirstHalt}
                onChange={setSelectVehiclePlaceFirstHalt}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT") })}
            />
        </div>
    </div> 
    </div> 
   
    
  
    <div className="row">  
    <div className="col-md-12" > 
    {/* <div className="col-md-6" ><CardLabel>{`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown t={t} optionKey="namecmb" isMandatory={config.isMandatory} option={cmbWardNoFinal} selected={WardNo} select={setSelectWard}  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })} />
                </div>
         */}
                <div className="col-md-6">
            <CardLabel>
              {`${t("CR_HOSPITAL")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
              selected={HospitalName}
              select={setselectHospitalName}
              placeholder={`${t("CR_HOSPITAL")}`}
            />
          </div> 
        </div>   
    </div>  
    
      </FormStep>
    </React.Fragment>
  );
};
export default BirthVehicle;