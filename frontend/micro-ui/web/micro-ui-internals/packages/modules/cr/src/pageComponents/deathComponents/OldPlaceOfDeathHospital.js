import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton ,CheckBox} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathHospital = ({
  config,  onSelect,  userType,  formData,  SignedOfficerName,  selectSignedOfficerName,  HospitalName,  selectHospitalName,  setDesignation,
  setSelectedDesignation,  HospitalAadhaar,  setHospitalAadhaar,  HospitalMobile,  setHospitalMobile,  OfficerName,  setOfficerName,
  OfficerDesignation,  setOfficerDesignation,SignedOfficerOtherStatus,setSignedOfficerOtherStatus,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const { t } = useTranslation();
  let validation = {};
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);
  // const [registrationMobile, setFilteredMobNo] = useState(0);

  // const [isChecked, setIsChecked] = useState(formData?.HospitalDetails?.isChecked ? formData?.HospitalDetails?.isChecked : false);
      // const [isDrDetails, setisDrDetails] = useState(formData?.HospitalDetails?.isDrDetails ? formData?.HospitalDetails?.isDrDetails : false);
  // const { data: hospital = {}, isLoading } = Digit.Hooks.cr.HospitalDetailsuseCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  // const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.HospitalDetails?.SignedOfficerName);
  // const [HospitalName, selectHospitalName] = useState(formData?.HospitalDetails?.HospitalName);
  // const [setDesignation, setSelectedDesignation] = useState(formData?.HospitalDetails?.setDesignation);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [HospitalAadhaar, setHospitalAadhaar] = useState(formData?.HospitalDetails?.HospitalAadhaar);
  // const [HospitalMobile, setHospitalMobile] = useState(formData?.HospitalDetails?.HospitalMobile);
  // const [OfficerName, setOfficerName] = useState(formData?.HospitalDetails?.OfficerName);
  // const [OfficerDesignation, setOfficerDesignation] = useState(formData?.HospitalDetails?.OfficerDesignation);
  // const [SignedOfficerOtherStatus, setSignedOfficerOtherStatus] = useState(formData?.HospitalDetails?.SignedOfficerOtherStatus ? formData?.HospitalDetails?.SignedOfficerOtherStatus : "");
  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
    let OtherRegistrar =[];
  useEffect(() => {
    if (isInitialRender) {
      if (HospitalName) {
        setIsInitialRender(false);
        // setFilteredOfficerName(null);
        // setFilteredDesignation(null);
        if (cmbhospital.length > 0) {
          // cmbDesignations =[];
          // cmbRegistrarNames =[];
          let cmbRegistrarNames = cmbhospital.filter((cmbhospital) => cmbhospital.code === HospitalName.code);         
          // console.log(cmbRegistrarNames);
          let cmbDesignations = cmbhospital.filter((cmbhospital) => cmbhospital.code === HospitalName.code);
          // console.log(cmbRegistrarNames[0].registar);      
          let OtherRegistrar=[];
          OtherRegistrar = cmbRegistrarNames[0].registar;
          let CheckIfExists = OtherRegistrar.filter((OtherRegistrar) => OtherRegistrar.hospitalRegistar === "Others");
          if(CheckIfExists.length>0){
            
          } else {
            OtherRegistrar.push({
              hospitalRegistar:'Others',
              registarDesig:'',
              registrationAadhaar:'',
              registrationMobile:'',
              registrationNo:''
            })           
          }   
          setFilteredOfficerName(OtherRegistrar);
          setFilteredDesignation(cmbDesignations[0].registar);
        
        }
      }     
    }
  }, [OfficerNames, Designations, isInitialRender]);

 


  const onSkip = () => onSelect();

  function setselectHospitalName(value) {
    setIsInitialRender(true);
    selectHospitalName(value);
    setFilteredOfficerName(null);
    setFilteredDesignation(null);
  }
  function setselectSignedOfficerName(value) {
    selectSignedOfficerName(value);
    setSignedOfficerOtherStatus(value.hospitalRegistar);

  }
  function selectDesignation(value) {
    setSelectedDesignation(value);
  }
  function setSelectHospitalAadhaar(e) {
    setHospitalAadhaar(e.target.value);
  }
  function setSelectHospitalMobile(e) {
    setHospitalMobile(e.target.value);
  }
  function setselectOfficerName(e) {
    setOfficerName(e.target.value);
  }
  function setSelectOfficerDesignation(e) {
    setOfficerDesignation(e.target.value);
  }
  // function setChildName(e) {
  //   if (e.target.checked === true) {
  //     setIsChildName(e.target.checked);

  //   } else {
  //     setIsChildName(e.target.checked);
  //     setChildFirstNameEn("");
  //     setChildMiddleNameEn("");
  //     setChildLastNameEn("");
  //     setChildFirstNameMl("");
  //     setChildMiddleNameMl("");
  //     setChildLastNameMl("");
  //   }
  // }



  // function setDrDetails(e) {
  //   if (e.target.checked === true) {
  //     setisDrDetails(e.target.checked);

  //   } else {
  //     setisDrDetails(e.target.checked);
  //     setOfficerName("");
  //     setOfficerDesignation("");      
  //   }
  // }
  
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }

  const goNext = () => {
    // sessionStorage.setItem("SignedOfficerName", SignedOfficerName ? SignedOfficerName.code : null);
    // sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.code : null );
    // sessionStorage.setItem("setDesignation", setDesignation ? setDesignation.code : null);
    // sessionStorage.setItem("HospitalAadhaar", HospitalAadhaar ? HospitalAadhaar : null );
    // sessionStorage.setItem("HospitalMobile", HospitalMobile ? HospitalMobile : null);
    // sessionStorage.setItem("OfficerName", OfficerName ? OfficerName : null);
    // sessionStorage.setItem("OfficerDesignation", OfficerDesignation ? OfficerDesignation : null);
    // onSelect(config.key, { SignedOfficerName, HospitalName, setDesignation, HospitalAadhaar, HospitalMobile });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
        <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!HospitalAadhaar}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_HOSPITAL")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_HOSPITAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={true}
                option={cmbhospital}
                selected={HospitalName}
                select={setselectHospitalName}
                placeholder={`${t("CR_HOSPITAL")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_SIGNED_OFFICER")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
            
              <Dropdown
                t={t}
                optionKey="hospitalRegistar"
                isMandatory={false}
                option={OfficerNames}
                selected={SignedOfficerName}
                select={setselectSignedOfficerName}
                placeholder={`${t("CR_SIGNED_OFFICER")}`}
              />
            </div>
            {SignedOfficerOtherStatus != "Others" && (
              <div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="registarDesig"
                isMandatory={false}
                option={Designations}
                selected={setDesignation}
                select={selectDesignation}
                disabled={isEdit}
                placeholder={`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}
              />
            </div>
            </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          {/* <CheckBox label={t("CR_DR_UNAVAILABLE")} onChange={setChildName} value={isChildName} checked={isChildName} /> */}
          {/* <CheckBox label={t("CR_DR_UNAVAILABLE")}   onChange={setDrDetails} value={isDrDetails} checked={isDrDetails} /> */}
          </div>
        </div>
       
        <div className="row">
  
          <div className="col-md-12">
          {/* {isDrDetails === true && (
            <div> */}
          {SignedOfficerOtherStatus === "Others" && ( 
            <div>
            <div className="col-md-3">

              <CardLabel>{`${t("CR_SIGNED_OFFICER")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="OfficerName"
                value={OfficerName}
                onChange={setselectOfficerName}
                disable={isEdit}
                placeholder={`${t("CR_SIGNED_OFFICER")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_NAME") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="OfficerDesignation"
                value={OfficerDesignation}
                onChange={setSelectOfficerDesignation}
                disable={isEdit}
                placeholder={`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_DESIG") })}
              />
            </div>
            </div>
            )} 
            {/* </div>
        )} */}
        
            <div className="col-md-3">
              <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="registrationMobile"
                name="HospitalMobile"
                value={HospitalMobile}
                onChange={setSelectHospitalMobile}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="HospitalAadhaar"
                value={HospitalAadhaar}
                onChange={setSelectHospitalAadhaar}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>           
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathHospital;
