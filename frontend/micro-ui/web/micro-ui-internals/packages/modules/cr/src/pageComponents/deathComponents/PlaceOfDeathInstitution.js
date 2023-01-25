import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,BackButton} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathInstitution = ({ config, onSelect, userType, formData,setInstitution,setSelectedInstitution,setInstitutionId,setSelectedInstitutionId,
  InstitutionMobilNo,setInstitutionMobilNo,  InstitutionAadhaar,setInstitutionAadhaar,SiginedOfficer, setSelectedSiginedOfficer,SiginedOfficerDesignation, setSelectedSiginedOfficerDesignation}) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
 
  const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const { data: institutionid = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Institution");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [setInstitution, setSelectedInstitution] = useState(formData?.PlaceOfDeathInstitution?.setInstitution);
  // const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.PlaceOfDeathInstitution?.setInstitutionId); 
    //  const [SiginedOfficer, setSelectedSiginedOfficer] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficer); 
    //  const [SiginedOfficerDesignation, setSelectedSiginedOfficerDesignation] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficerDesignation); 
   
  // const [SiginedOfficer, setSiginedOfficer] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficer);
  // const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficerDesignation);
  // const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.PlaceOfDeathInstitution?.InstitutionMobilNo);
  // const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.PlaceOfDeathInstitution?.InstitutionAadhaar);
 
  let naturetypecmbvalue = null;
  let cmbInstitution = [];
  institution &&
    institution["birth-death-service"] &&
    institution["birth-death-service"].InstitutionType.map((ob) => {
      cmbInstitution.push(ob);
    });
    
    let cmbInstitutionId = [];
    institutionid &&
    institutionid["birth-death-service"] &&
    institutionid["birth-death-service"].Institution.map((ob) => {
      cmbInstitutionId.push(ob);
    });

  const onSkip = () => onSelect();

  function selectInstitution(value) {
    setSelectedInstitution(value);
  }
  function selectInstitutionId(value) {
    setSelectedInstitutionId(value);
  } 
  function setSelectSiginedOfficer(value) {
    setSelectedSiginedOfficer(value);
  } 
  function setSelectSiginedOfficerDesignation(value) {
    setSelectedSiginedOfficerDesignation(value);
  }   
  
  
  // function setSelectSiginedOfficer(e) {
  //   setSiginedOfficer(e.target.value);
  // }
  // function  setSelectSiginedOfficerDesignation(e) {
  //   setSiginedOfficerDesignation(e.target.value);
  // }
  function  setSelectInstitutionMobilNo(e) {
    setInstitutionMobilNo(e.target.value);
  }
  function  setSelectInstitutionAadhaar(e) {
    setInstitutionAadhaar(e.target.value);
  }
 
  const goNext = () => {
    // sessionStorage.setItem("setInstitution", setInstitution.code);
    // sessionStorage.setItem("setInstitutionId", setInstitutionId.code);
            // sessionStorage.setItem("SiginedOfficer", SiginedOfficer.code);
            // sessionStorage.setItem("SiginedOfficerDesignation", SiginedOfficerDesignation.code);
    
    // sessionStorage.setItem("setSiginedOfficer", SiginedOfficer);
    // sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation);
    // sessionStorage.setItem("setInstitutionMobilNo", InstitutionMobilNo);
    // sessionStorage.setItem("setInstitutionAadhaar", InstitutionAadhaar);    
    // onSelect(config.key, { 
    //   setInstitution,
    //   setInstitutionId,
    // SiginedOfficer,
    // SiginedOfficerDesignation
    //   SiginedOfficer,
    //   SiginedOfficerDesignation,
    //   InstitutionMobilNo,
    //   InstitutionAadhaar,     
    // });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!SiginedOfficer}>     
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_INSTITUTION")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbInstitution}
              selected={setInstitution}
              select={selectInstitution}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_TYPE")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbInstitutionId}
              selected={setInstitutionId}
              select={selectInstitutionId}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_NAME")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_SIGNED_OFFICER")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbInstitutionId}
              selected={SiginedOfficer}
              select={setSelectSiginedOfficer}
              disabled={isEdit}
              placeholder={`${t("CR_SIGNED_OFFICER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_NAME") })}
              />  
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              optionKey="name"
              isMandatory={false}
              option={cmbInstitutionId}
              selected={SiginedOfficerDesignation}
              select={setSelectSiginedOfficerDesignation}
              disabled={isEdit}
              placeholder={`${t("CR_SIGNED_OFFICER")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_DESIG") })}
              />
          </div>
        </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          
          
          <div className="col-md-4">
            <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InstitutionMobilNo"
              value={InstitutionMobilNo}
              onChange={setSelectInstitutionMobilNo}
              disable={isEdit}
              placeholder={`${t("CR_MOBILE_NO")}`}
              {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InstitutionAadhaar"
              value={InstitutionAadhaar}
              onChange={setSelectInstitutionAadhaar}
              disable={isEdit}
              placeholder={`${t("CS_COMMON_AADHAAR")}`}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false ,title: t("CS_COMMON_INVALID_AADHAR_NO") })}
            />
          </div>
        </div>
        </div>
        
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathInstitution;
