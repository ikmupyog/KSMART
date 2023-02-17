import React, { useState ,useEffect  } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const BirthVehicle = ({ config, onSelect, userType, formData ,VehicleRegistrationNo, setVehicleRegistrationNo,VehicleFromEn, setVehicleFromEn,
  VehicleToEn, setVehicleToEn,VehicleFromMl, setVehicleFromMl,VehicleHaltPlace, setVehicleHaltPlace,VehicleToMl, setVehicleToMl,VehicleOtherDetailsEn, setVehicleOtherDetailsEn,
  VehicleOtherDetailsMl, setVehicleOtherDetailsMl,setAdmittedHospitalEn, setSelectedAdmittedHospitalEn,setAdmittedHospitalMl, setSelectedAdmittedHospitalMl}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);
  // const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [TradeName, setTradeName] = useState(null);

  // const [DriverName, setDriverName] = useState(formData?.BirthVehicleDetails?.DriverName);
  // const [DriverNameMl, setDriverNameMl] = useState(formData?.BirthVehicleDetails?.DriverNameMl);
  // const [DriverMobileNo, setDriverMobileNo] = useState(formData?.BirthVehicleDetails?.DriverMobileNo);
  // const [DriverAge, setDriverAge] = useState(formData?.BirthVehicleDetails?.DriverAge);
  // const [DriverAadhar, setDriverAadhar] = useState(formData?.BirthVehicleDetails?.DriverAadhar);
  // const [VehicleType, setVehicleType] = useState(formData?.BirthVehicleDetails?.VehicleType);
  // const [DriverLicenceNo, setDriverLicenceNo] = useState(formData?.BirthVehicleDetails?.DriverLicenceNo);

  // For Place of Birth Vehicle

  // const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.BirthVehicleDetails?.VehicleRegistrationNo);  
  // const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthVehicleDetails?.setVehicleFromEn);
  // const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthVehicleDetails?.setSelectVehicleToEn);
  
   // const [VehicleFromMl, setVehicleFromMl] = useState(formData?.BirthVehicleDetails?.VehicleFromMl);
  // const [VehicleHaltPlace, setSelectVehicleHaltPlace] = useState(formData?.BirthVehicleDetails?.VehicleHaltPlace);
  // const [VehicleToMl, setVehicleToMl] = useState(formData?.BirthVehicleDetails?.VehicleToMl);
  // const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.BirthVehicleDetails?.VehicleOtherDetailsEn);  
  // const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.BirthVehicleDetails?.VehicleOtherDetailsMl); 
  // const [setDeathVehicleWard, setSelectedDeathVehicleWard] = useState(formData?.BirthVehicleDetails?.setDeathVehicleWard);
  // const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.BirthVehicleDetails?.setAdmittedHospitalEn);
  // const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.BirthVehicleDetails?.setAdmittedHospitalMl);
    
  let naturetypecmbvalue = null;
    let cmbhospital = [];
  hospitalData &&
  hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
    useEffect(() => {
          if (isInitialRender) {
        if(setAdmittedHospitalEn){
          setIsInitialRender(false);
          let cmbRegistrarNames = cmbhospital.filter((cmbhospital) => cmbhospital.code === setAdmittedHospitalEn.code);   
          let cmbDesignations = cmbhospital.filter((cmbhospital) => cmbhospital.code === setAdmittedHospitalEn.code);     
          // console.log(cmbRegistrarNames[0].registar);                
          setFilteredOfficerName(cmbRegistrarNames[0].registar);
          setFilteredDesignation(cmbDesignations[0].registar);
          // setSignedOfficerAadharNo(cmbDesignations[0].registar.registrationAadhaar);
          // setSelectSignedOfficerMobileNo(cmbDesignations[0].registar.registrationMobile);
        }
      }
    }, [OfficerNames,Designations,isInitialRender]);
  const onSkip = () => onSelect();
 

  //   let cmbhospital = [];
  //   hospital &&
  //     hospital["birth-death-service"] &&
  //     hospital["birth-death-service"].hospitalList.map((ob) => {
  //       cmbhospital.push(ob);
  //     });

    
  // const onSkip = () => onSelect();

 

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
    if (e.target.value.length ===10) {
      return false;
    } else {  
    setVehicleRegistrationNo(e.target.value);
  }
}
  // function setSelectDriverLicenceNo(e) {
  //   setDriverLicenceNo(e.target.value);
  // }

  function setSelectMotherFirstNameEn(e) {  

}


  
  function setSelectVehicleFromEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleFromEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}

  
  function setSelectVehicleToEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleToEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
}
  function setSelectVehicleFromMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleFromMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }
  function setSelectVehicleHaltPlace(e) {
    if (e.target.value.length ===51) {
      return false;
    } else {  
    setVehicleHaltPlace(e.target.value);
}
}

  function setSelectVehicleToMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleToMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  }
  }
  function setSelectVehicleOtherDetailsEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleOtherDetailsEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
  }

  function setSelectVehicleOtherDetailsMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
    setVehicleOtherDetailsMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
    }
  }
  // function selectDeathVehicleWard(value) {
  //   setSelectedDeathVehicleWard(value);
  // }
  function selectAdmittedHospitalEn(value) {
    setSelectedAdmittedHospitalEn(value);
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
    // sessionStorage.setItem("DriverLicenceNo", DriverLicenceNo); 
    // sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard.code);


    // sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo);       
    // sessionStorage.setItem("VehicleFromEn", VehicleFromEn);  
    // sessionStorage.setItem("VehicleToEn", VehicleToEn);
    // sessionStorage.setItem("VehicleFromMl", VehicleFromMl);  
       sessionStorage.setItem("VehicleHaltPlace", VehicleHaltPlace);
    
    // sessionStorage.setItem("VehicleToMl", VehicleToMl);
    // sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn.code);
    // sessionStorage.setItem("setAdmittedHospitalMl", setAdmittedHospitalMl.code);    
    // sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn); 
    // sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn); 
    
    
    
    
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      // setPlaceofActivity,
      // DriverName,
      // DriverNameMl,
      // DriverMobileNo,
      // DriverAadhar,
      // VehicleType,
      VehicleHaltPlace     
      // DriverLicenceNo,
      // setDeathVehicleWard,

      // VehicleRegistrationNo,
      // VehicleFromEn,
      // VehicleToEn,
      // VehicleFromMl,
      // VehicleToMl,
  
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
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_VEHICLE")}`}
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
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
            />
        </div>
        {/* <div className="col-md-6" > 
        <CardLabel>{`${t("CR_DRIVER_LICENCE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
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
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LICENCE_NO") })}
            />
        </div> */}
       </div> 
    </div> 

    <div className="row">    
       <div className="col-md-12" >            
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
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
            />
        </div>
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}</CardLabel>
        <TextInput       
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleHaltPlace"
                value={VehicleHaltPlace}
                onChange={setSelectVehicleHaltPlace}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT") })}
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
        <div className="col-md-3" > 
        <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_ML")}`}</CardLabel>
        <Dropdown
                t={t}
                optionKey="hospitalName"
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
export default BirthVehicle;