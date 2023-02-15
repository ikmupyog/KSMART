import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InstitutionDetails = ({ config, onSelect, userType, formData, setInstitution, setSelectedInstitution, setInstitutionId, setSelectedInstitutionId,
  SiginedOfficer, setSiginedOfficer, SiginedOfficerDesignation, setSiginedOfficerDesignation, InstitutionMobilNo, setInstitutionMobilNo, InstitutionAadhaar, setInstitutionAadhaar,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const { data: institutionid = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Institution");
  // const [setInstitution, setSelectedInstitution] = useState(formData?.InstitutionDetails?.setInstitution);
  // const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.InstitutionDetails?.setInstitutionId);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [SiginedOfficer, setSiginedOfficer] = useState(formData?.InstitutionDetails?.SiginedOfficer);
  // const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.InstitutionDetails?.SiginedOfficerDesignation);
  // const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.InstitutionDetails?.InstitutionMobilNo);
  // const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.InstitutionDetails?.InstitutionAadhaar);

  let naturetypecmbvalue = null;

  let cmbInstitution = [];
  institution &&
    institution["birth-death-service"] &&
    institution["birth-death-service"].InstitutionType.map((ob) => {
      cmbInstitution.push(ob);
    });
  ///institution-id
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


  function setSelectSiginedOfficer(e) {
    setSiginedOfficer(e.target.value);
  }
  function setSelectSiginedOfficerDesignation(e) {
    setSiginedOfficerDesignation(e.target.value);
  }
  function setSelectInstitutionMobilNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        // setInstitutionMobilNo(e.target.value);
        return false;
      } else {
        setInstitutionMobilNo(e.target.value);
      }
    } else {
      setInstitutionMobilNo(e.target.value);
    }
  }
  function setSelectInstitutionAadhaar(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        return false;
      } else if (e.target.value.length < 12) {
        setInstitutionAadhaar(e.target.value);
        return false;
      } else {
        setInstitutionAadhaar(e.target.value);
      }
    } else {
      setInstitutionAadhaar(e.target.value);
    }
  }
  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    console.log('clicked');
    // sessionStorage.setItem("setInstitution", setInstitution.code);
    // sessionStorage.setItem("setInstitutionId", setInstitutionId.code);
    // sessionStorage.setItem("setSiginedOfficer", SiginedOfficer);
    // sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation);
    // sessionStorage.setItem("setInstitutionMobilNo", InstitutionMobilNo);
    // sessionStorage.setItem("setInstitutionAadhaar", InstitutionAadhaar);  

    // onSelect(config.key, { 
    //   setInstitution, setInstitutionId, SiginedOfficer, SiginedOfficerDesignation, InstitutionMobilNo, InstitutionAadhaar,      
    // });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null} */}
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!SiginedOfficer}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbInstitutionId}
                selected={setInstitutionId}
                select={selectInstitutionId}
                disabled={isEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_SIGNED_OFFICER")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="SiginedOfficer"
                value={SiginedOfficer}
                onChange={setSelectSiginedOfficer}
                disable={isEdit}
                placeholder={`${t("CR_SIGNED_OFFICER")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_NAME") })}
              />
            </div>
 
            <div className="col-md-6">
              <CardLabel>{`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="SiginedOfficerDesignation"
                value={SiginedOfficerDesignation}
                onChange={setSelectSiginedOfficerDesignation}
                disable={isEdit}
                placeholder={`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_SIGNED_OFFICER_DESIG") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
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
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-6">
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
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>


      </FormStep>
    </React.Fragment>
  );
};
export default InstitutionDetails;
