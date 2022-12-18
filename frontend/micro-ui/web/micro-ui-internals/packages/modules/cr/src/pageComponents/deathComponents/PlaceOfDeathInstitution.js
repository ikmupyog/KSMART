import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathInstitution = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const { data: institutionid = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Institution");

  const [setInstitution, setSelectedInstitution] = useState(formData?.PlaceOfDeathInstitution?.setInstitution);
  const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.PlaceOfDeathInstitution?.setInstitutionId);
  
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [SiginedOfficer, setSiginedOfficer] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficer);
  const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.PlaceOfDeathInstitution?.SiginedOfficerDesignation);
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.PlaceOfDeathInstitution?.InstitutionMobilNo);
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.PlaceOfDeathInstitution?.InstitutionAadhaar);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
    ///institution-type
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
  
  function selectPlaceofactivity(value) {
    setSelectedPlaceofActivity(value);
  }
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function setSelectSiginedOfficer(e) {
    setSiginedOfficer(e.target.value);
  }
  function  setSelectSiginedOfficerDesignation(e) {
    setSiginedOfficerDesignation(e.target.value);
  }
  function  setSelectInstitutionMobilNo(e) {
    setInstitutionMobilNo(e.target.value);
  }
  function  setSelectInstitutionAadhaar(e) {
    setInstitutionAadhaar(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    sessionStorage.setItem("setInstitution", setInstitution.code);
    sessionStorage.setItem("setInstitutionId", setInstitutionId.code);
    sessionStorage.setItem("setSiginedOfficer", SiginedOfficer);
    sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation);
    sessionStorage.setItem("setInstitutionMobilNo", InstitutionMobilNo);
    sessionStorage.setItem("setInstitutionAadhaar", InstitutionAadhaar);
    
    
    SiginedOfficer
    
    onSelect(config.key, { 
      setInstitution,
      setInstitutionId,
      SiginedOfficer,
      SiginedOfficerDesignation,
      InstitutionMobilNo,
      InstitutionAadhaar,
      setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <header className="tittle">Place Of Death Institution </header>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_INSTITUTION")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbInstitution}
              selected={setInstitution}
              select={selectInstitution}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{`${t("CR_INSTITUTION_ID")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbInstitutionId}
              selected={setInstitutionId}
              select={selectInstitutionId}
              disabled={isEdit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{`${t("CR_SIGNED_OFFICER")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="SiginedOfficer"
              value={SiginedOfficer}
              onChange={setSelectSiginedOfficer}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="SiginedOfficerDesignation"
              value={SiginedOfficerDesignation}
              onChange={setSelectSiginedOfficerDesignation}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
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
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathInstitution;
