import React, { useState ,useEffect  } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton,Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const BirthPlaceVehicle = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
 
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);
  
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [toast, setToast] = useState(false);
  const [vehicleType, setvehicleType] = useState(formData?.BirthPlaceVehicleDetails?.vehicleType ? formData?.BirthPlaceVehicleDetails?.vehicleType : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.BirthPlaceVehicleDetails?.vehicleRegistrationNo ? formData?.BirthPlaceVehicleDetails?.vehicleRegistrationNo : "");  
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.BirthPlaceVehicleDetails?.setvehicleFromEn ? formData?.BirthPlaceVehicleDetails?.setvehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.BirthPlaceVehicleDetails?.vehicleToEn ? formData?.BirthPlaceVehicleDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleFromMl ? formData?.BirthPlaceVehicleDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlace ? formData?.BirthPlaceVehicleDetails?.vehicleHaltPlace : "");
  const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlaceMl ? formData?.BirthPlaceVehicleDetails?.vehicleHaltPlaceMl : "");

  const [vehicleToMl, setvehicleToMl] = useState(formData?.BirthPlaceVehicleDetails?.vehicleToMl ? formData?.BirthPlaceVehicleDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.BirthPlaceVehicleDetails?.vehicleDesDetailsEn ? formData?.BirthPlaceVehicleDetails?.vehicleDesDetailsEn : "");  
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.BirthPlaceVehicleDetails?.setadmittedHospitalEn ? formData?.BirthPlaceVehicleDetails?.setadmittedHospitalEn : "");
  
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.BirthPlaceVehicleDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.BirthPlaceVehicleDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlace ? false : false);
  const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.BirthPlaceVehicleDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.BirthPlaceVehicleDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.BirthPlaceVehicleDetails?.vehicleDesDetailsEn ? false : false);
    
  let naturetypecmbvalue = null;
    let cmbhospital = [];
  hospitalData &&
  hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
    useEffect(() => {
          if (isInitialRender) {
        if(setadmittedHospitalEn){
          setIsInitialRender(false);
          let cmbRegistrarNames = cmbhospital.filter((cmbhospital) => cmbhospital.code === setadmittedHospitalEn.code);   
          let cmbDesignations = cmbhospital.filter((cmbhospital) => cmbhospital.code === setadmittedHospitalEn.code);     
          // console.log(cmbRegistrarNames[0].registar);                
          setFilteredOfficerName(cmbRegistrarNames[0].registar);
          setFilteredDesignation(cmbDesignations[0].registar);
          // setSignedOfficerAadharNo(cmbDesignations[0].registar.registrationAadhaar);
          // setSelectSignedOfficerMobileNo(cmbDesignations[0].registar.registrationMobile);
        }
      }
    }, [OfficerNames,Designations,isInitialRender]);


  const onSkip = () => onSelect(); 

  
  function setSelectVehicleType(e) {
    setvehicleType(e.target.value);
  }
  function setSelectVehicleRegistrationNo(e) {
    if (e.target.value.length ===10) {
      return false;
    } else {  
    setvehicleRegistrationNo(e.target.value);
  }
}     
  function setSelectVehicleFromEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setvehicleFromEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}

  
  function setSelectVehicleToEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setvehicleToEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}
  function setSelectVehicleFromMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setvehicleFromMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }
  function setSelectVehicleHaltPlace(e) {
    if (e.target.value.length ===51) {
      return false;
    } else {  
    setvehicleHaltPlace(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
}
}
function setSelectVehicleHaltPlaceMl(e) {
  if (e.target.value.length ===51) {
    return false;
  } else {  
  setvehicleHaltPlaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
}
}

  function setSelectVehicleToMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setvehicleToMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }
  function setSelectVehicleOtherDetailsEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setvehicleDesDetailsEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
  }
 
  function selectadmittedHospitalEn(value) {
    setSelectedadmittedHospitalEn(value);
  }
 
 
  let validFlag = true;
  const goNext = () => {    
    if (vehicleType == null || vehicleType == "" || vehicleType == undefined) {
      validFlag = false;
      setvehiTypeError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvehiTypeError(false);
    }
    if (vehicleRegistrationNo == null || vehicleRegistrationNo == "" || vehicleRegistrationNo == undefined) {
      validFlag = false;
      setvehicleRegiNoError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvehicleRegiNoError(false);
    }
    
    if (vehicleHaltPlace == null || vehicleHaltPlace == "" || vehicleHaltPlace == undefined) {
      validFlag = false;
      setvehicleHaltPlaceError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvehicleHaltPlaceError(false);
    }
    if (vehicleHaltPlaceMl == null || vehicleHaltPlaceMl == "" || vehicleHaltPlaceMl == undefined) {
      validFlag = false;
      setvehiHaltPlaceMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvehiHaltPlaceMlError(false);
    }
    if (vehicleDesDetailsEn == null || vehicleDesDetailsEn == "" || vehicleDesDetailsEn == undefined) {
      validFlag = false;
      setvehiDesDetailsEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setvehiDesDetailsEnError(false);
    }
    
    if (setadmittedHospitalEn == null || setadmittedHospitalEn == "" || setadmittedHospitalEn == undefined) {
      validFlag = false;
      setadmittedHospitalEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setadmittedHospitalEnError(false);
    }
    if (validFlag == true) {
    sessionStorage.setItem("vehicleType", vehicleType ? vehicleType : null);
    sessionStorage.setItem("vehicleRegistrationNo", vehicleRegistrationNo ? vehicleRegistrationNo : null);       
    sessionStorage.setItem("vehicleFromEn", vehicleFromEn ? vehicleFromEn : null);  
    sessionStorage.setItem("vehicleToEn", vehicleToEn ? vehicleToEn : null);
    sessionStorage.setItem("vehicleFromMl", vehicleFromMl ? vehicleFromMl : null);  
    sessionStorage.setItem("vehicleToMl", vehicleToMl ? vehicleToMl : null);
    sessionStorage.setItem("vehicleHaltPlace", vehicleHaltPlace ? vehicleHaltPlace : null);
    sessionStorage.setItem("vehicleHaltPlaceMl", vehicleHaltPlaceMl ? vehicleHaltPlaceMl : null);     
    sessionStorage.setItem("setadmittedHospitalEn", setadmittedHospitalEn ? setadmittedHospitalEn.code : null);      
    sessionStorage.setItem("vehicleDesDetailsEn", vehicleDesDetailsEn ? vehicleDesDetailsEn : null);    
    
   
    onSelect(config.key, {
     
      vehicleType,
      vehicleHaltPlace  , 
      vehicleHaltPlaceMl,    
      
      vehicleRegistrationNo,
      vehicleFromEn,
      vehicleToEn,
      vehicleFromMl,
      vehicleToMl,  
      setadmittedHospitalEn,
     
      vehicleDesDetailsEn,
    });
  }
};
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
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
       <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleType"
                value={vehicleType}
                onChange={setSelectVehicleType}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TYPE")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TYPE") })}
            />
        </div>
       <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_REGISTRATION_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleRegistrationNo"
                value={vehicleRegistrationNo}
                onChange={setSelectVehicleRegistrationNo}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_REGISTRATION_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleFromEn"
                value={vehicleFromEn}
                onChange={setSelectVehicleFromEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleFromMl"
                value={vehicleFromMl}
                onChange={setSelectVehicleFromMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        
        
       
       </div> 
    </div> 

    <div className="row">    
       <div className="col-md-12" >    
       <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleToEn"
                value={vehicleToEn}
                onChange={setSelectVehicleToEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}</CardLabel>
            <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleToMl"
                value={vehicleToMl}
                onChange={setSelectVehicleToMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_ML")}`}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}<span className="mandatorycss">*</span></CardLabel>
        <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleHaltPlace"
                value={vehicleHaltPlace}
                onChange={setSelectVehicleHaltPlace}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_EN") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}<span className="mandatorycss">*</span></CardLabel>
        <TextInput       
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleHaltPlaceMl"
                value={vehicleHaltPlaceMl}
                onChange={setSelectVehicleHaltPlaceMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}
                {...(validation = {  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_ML") })}
            />
        </div>
        </div> 
    </div> 

    <div className="row">    
       <div className="col-md-12" >            
        
       
        <div className="col-md-4" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_EN")}`}<span className="mandatorycss">*</span></CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={true}
                option={cmbhospital}
                selected={setadmittedHospitalEn}
                select={selectadmittedHospitalEn}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_EN")}`}
            />
        </div>
        <div className="col-md-6" >
          <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea       
            t={t}
            isMandatory={true}
            type={"text"}
            optionKey="i18nKey"
            name="vehicleDesDetailsEn"
            value={vehicleDesDetailsEn}
            onChange={setSelectVehicleOtherDetailsEn}
            disable={isEdit}
            placeholder={`${t("CR_DESCRIPTION")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
        </div>
       
    </div> 
    </div> 
    
    {toast && (
          <Toast
            error={
              vehiTypeError ||
              vehicleRegiNoError ||             
              vehicleHaltPlaceError ||
              vehiHaltPlaceMlError ||
              admittedHospitalEnError || vehiDesDetailsEnError
             
              
              
            }
            label={
              vehiTypeError ||
              vehicleRegiNoError ||             
              vehicleHaltPlaceError ||
              vehiHaltPlaceMlError ||
              admittedHospitalEnError || vehiDesDetailsEnError
             
            
                ?
                  vehiTypeError
                  ? t(`BIRTH_ERROR_VEHICLE_TYPE_CHOOSE`)
                  : vehicleRegiNoError
                  ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                  
                  : vehicleHaltPlaceError
                  ? t(`BIRTH_ERROR_VEHICLE_HALT_PLACE_CHOOSE`)
                  : vehiHaltPlaceMlError
                  ? t(`BIRTH_ERROR_VEHICLE_HALT_PLACE_ML_CHOOSE`)
                  : admittedHospitalEnError
                  ? t(`BIRTH_ERROR_ADMITTED_HOSPITAL_CHOOSE`)
                  : vehiDesDetailsEnError
                  ? t(`BIRTH_ERROR_DESCRIPTION_BOX_CHOOSE`)
                  
                  :  
                    setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
  
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceVehicle;