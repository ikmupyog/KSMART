import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import { isNull } from "lodash";


const Vehicle = ({ config, onSelect, userType, formData}) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const tenantId = Digit.ULBService.getCurrentTenantId();
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");

  

  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.Vehicle?.VehicleRegistrationNo);
  const [setVehicleType, setSelectedVehicleType] = useState(formData?.Vehicle?.setVehicleType);
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.Vehicle?.VehicleFromEn);
  const [VehicleToEn, setVehicleToEn] = useState(formData?.Vehicle?.VehicleToEn);
  const [VehicleFromMl, setVehicleFromMl] = useState(formData?.Vehicle?.VehicleFromMl);
  const [VehicleToMl, setVehicleToMl] = useState(formData?.Vehicle?.VehicleToMl);
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.Vehicle?.VehicleOtherDetailsEn);  
  const [PlaceOfHalt, setPlaceOfHalt] = useState(formData?.Vehicle?.setSelectPlaceOfHalt); 
  const [PlaceOfHaltML, setPlaceOfHaltML] = useState(formData?.Vehicle?.setSelectPlaceOfHaltML); 
  const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.Vehicle?.setAdmittedHospitalEn);
  const [DeathPlaceHomewardId, setDeathPlaceHomewardId] = useState(formData.Vehicle?.DeathPlaceHomewardId);
   
 
  let naturetypecmbvalue = null;
  

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
  //   wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
  //   wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
  //   cmbWardNoFinal.push(wardmst);
  // });
      
  const onSkip = () => onSelect();

  
  function setSelectVehicleRegistrationNo(e) {
    setVehicleRegistrationNo(e.target.value);
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
  function setSelectPlaceOfHaltML(e) {
    setPlaceOfHaltML(e.target.value);
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
  
//  function setSelectDeathPlaceHomewardId(value) {
//     setDeathPlaceHomewardId(value);
//   }
  function selectAdmittedHospitalEn(value) {
    setSelectedAdmittedHospitalEn(value);
  }
  function selectVehicleType(value) {
    setSelectedVehicleType(value);    
  }

  const goNext = () => {  
    
    sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null );   
    sessionStorage.setItem("setVehicleType", setVehicleType ? setVehicleType.code : null);    
    sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn :null);  
    sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
    sessionStorage.setItem("VehicleFromMl", VehicleFromMl ? VehicleFromMl : null);  
    sessionStorage.setItem("VehicleToMl", VehicleToMl ? VehicleToMl : null );
    sessionStorage.setItem("PlaceOfHalt", PlaceOfHalt ? PlaceOfHalt :null );  
    sessionStorage.setItem("PlaceOfHaltML", PlaceOfHaltML ? PlaceOfHaltML : null); 
    sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn? setAdmittedHospitalEn.code : null);       
    sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null ); 
    // sessionStorage.setItem("DeathPlaceHomewardId", DeathPlaceHomewardId ? DeathPlaceHomewardId.code  : null); 
      
    onSelect(config.key, {
   
         
      VehicleRegistrationNo,      
      setVehicleType,
      VehicleFromEn,
      VehicleToEn,
      VehicleFromMl,
      VehicleToMl,
      PlaceOfHalt, 
      PlaceOfHaltML,    
      setAdmittedHospitalEn,      
      VehicleOtherDetailsEn, 
      // DeathPlaceHomewardId    
     });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        
 
    <div className="row">    
       <div className="col-md-12" >  
       <div className="col-md-6" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
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
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}</CardLabel>
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
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}</CardLabel>
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
        <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}</CardLabel>
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
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
                />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}</CardLabel>
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
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
    </div> 
    </div>    
       
  
    <div className="row">  
    <div className="col-md-12" > 
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}<span className="mandatorycss">*</span></CardLabel>
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
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}<span className="mandatorycss">*</span></CardLabel>
        <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfHaltML"
                value={PlaceOfHaltML}
                onChange={setSelectPlaceOfHaltML}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_ML") })}
            />        
        </div>
        <div className="col-md-3" > 
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
        {/* <div className="col-md-3">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                isMandatory={config.isMandatory}
                option={cmbWardNoFinal}
                selected={DeathPlaceHomewardId}
                select={setSelectDeathPlaceHomewardId}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>         */}
        </div>   
    </div>  
     <div className="row">  
     <div className="col-md-12" > 
        <div className="col-md-6" >
          <CardLabel>{`${t("CR_OTHER_DETAILS_EN")}`}<span className="mandatorycss">*</span></CardLabel>
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
         
    </div>   
    </div> 

      </FormStep>
    </React.Fragment>
  );
};
export default Vehicle;