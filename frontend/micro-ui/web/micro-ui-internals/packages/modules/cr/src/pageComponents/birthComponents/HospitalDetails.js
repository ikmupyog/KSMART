import React, { useState,useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const HospitalDetails = ({ config, onSelect, userType, formData,HospitalName,selectHospitalName,selectSignedOfficerName,
  SignedOfficerName ,SignedOfficerDesignation, selectSignedOfficerDesignation ,SignedOfficerAadharNo, setSignedOfficerAadharNo,
  SignedOfficerMobileNo, setSignedOfficerMobileNo, mobileError,setMobileError,

}) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const { t } = useTranslation();
  let validation = {};
  // const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  // const [HospitalName, selectHospitalName] = useState(formData?.HospitalDetails?.HospitalName);
  // const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.HospitalDetails?.SignedOfficerName);
  // const [SignedOfficerDesignation, selectSignedOfficerDesignation] = useState(formData?.HospitalDetails?.SignedOfficerDesignation);
  // const [SignedOfficerAadharNo, setSignedOfficerAadharNo] = useState(formData?.HospitalDetails?.SignedOfficerAadharNo);
  // const [SignedOfficerMobileNo, setSignedOfficerMobileNo] = useState(formData?.HospitalDetails?.SignedOfficerMobileNo);
  // const isEdit = window.location.href.includes("/edit-application/")||window.location.href.includes("renew-trade");
  let cmbhospital = [];
  hospitalData &&
  hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
    useEffect(() => {
          if (isInitialRender) {
        if(HospitalName){
          setIsInitialRender(false);
          if(cmbhospital.length>0){
            let cmbRegistrarNames = cmbhospital.filter((cmbhospital) => cmbhospital.code === HospitalName.code);   
            let cmbDesignations = cmbhospital.filter((cmbhospital) => cmbhospital.code === HospitalName.code);     
            // console.log(cmbRegistrarNames[0].registar);                
            setFilteredOfficerName(cmbRegistrarNames[0].registar);
            setFilteredDesignation(cmbDesignations[0].registar);
            // setSignedOfficerAadharNo(cmbDesignations[0].registar.registrationAadhaar);
            // setSelectSignedOfficerMobileNo(cmbDesignations[0].registar.registrationMobile);
          }
         
        }
      }
    }, [OfficerNames,Designations,isInitialRender]);
  const onSkip = () => onSelect();

  function setselectHospitalName(value) {
    setIsInitialRender(true);
    selectHospitalName(value);    
    setFilteredOfficerName(null);
    setFilteredDesignation(null);
  }
  function setselectSignedOfficerName(value) {
    console.log(value);
    selectSignedOfficerName(value);
  }
  function setselectSignedOfficerDesignation(value) {
    selectSignedOfficerDesignation(value);
  }
  function setSelectSignedOfficerAadharNo(e) {
    setSignedOfficerAadharNo(e.target.value);
  }
  function setSelectSignedOfficerMobileNo(e) {
    setSignedOfficerMobileNo(e.target.value);
  }


  function setSelectSignedOfficerMobileNo(e) {
    if (e.target.value.length != 0) {
  
        if (e.target.value.length > 10) {
          setSignedOfficerMobileNo(true);
        } else if (e.target.value.length < 10) {
          setMobileError(true);
          setSignedOfficerMobileNo(e.target.value);
            return false;
        }
        else {
          setMobileError(false);
          setSignedOfficerMobileNo(e.target.value);
            return true;
        }
    } else {
      setMobileError(false);
      setSignedOfficerMobileNo(e.target.value);
        return true;
    }
  }
  function setSelectSignedOfficerAadharNo(e) {
    if (e.target.value.length != 0) {
  
        if (e.target.value.length > 12) {
            // setChildAadharNo(e.target.value);
            setSignedOfficerAdharNoError(true);
            // const limit = 12;
            // setFatherAadhar(e.target.value.slice(0, limit));
            // window.alert("Username shouldn't exceed 10 characters")
        } else if (e.target.value.length < 12) {
          setSignedOfficerAdharNoError(true);
          setSignedOfficerAadharNo(e.target.value);
            return false;
        }
        else {
          setSignedOfficerAdharNoError(false);
          setSignedOfficerAadharNo(e.target.value);
            return true;
        }
    } else {
      setSignedOfficerAdharNoError(false);
        setSignedOfficerAadharNo(e.target.value);
        return true;
    }
  
  }
  const goNext = () => {
    // console.log('clicked');
    // sessionStorage.setItem("HospitalName", HospitalName.hospitalName);
    // sessionStorage.setItem("SignedOfficerName", SignedOfficerName.hospitalName);
    // sessionStorage.setItem("SignedOfficerDesignation", SignedOfficerDesignation.hospitalName);
    // sessionStorage.setItem("SignedOfficerAadharNo", SignedOfficerAadharNo);
    // sessionStorage.setItem("SignedOfficerMobileNo", SignedOfficerMobileNo);
    // onSelect(config.key, { HospitalName, SignedOfficerName, SignedOfficerDesignation, SignedOfficerAadharNo, SignedOfficerMobileNo });
  };
  // if (isLoading ){
  //   return <Loader></Loader>;
  // }
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null} */}
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!HospitalName}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
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
              selected={SignedOfficerDesignation}
              select={setselectSignedOfficerDesignation}
              placeholder={`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {" "}
            <CardLabel>
              {`${t("CS_COMMON_AADHAAR")}`}             
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="SignedOfficerAadharNo"
              value={SignedOfficerAadharNo}
              onChange={setSelectSignedOfficerAadharNo}
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
          <div className="col-md-6">
            {" "}
            <CardLabel>
              {`${t("CR_MOBILE_NO")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="SignedOfficerMobileNo"
              value={SignedOfficerMobileNo}
              onChange={setSelectSignedOfficerMobileNo}
              placeholder={`${t("CR_MOBILE_NO")}`}
              {...(validation = { pattern: "^[0-9]{10}$", type: "number", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default HospitalDetails;
