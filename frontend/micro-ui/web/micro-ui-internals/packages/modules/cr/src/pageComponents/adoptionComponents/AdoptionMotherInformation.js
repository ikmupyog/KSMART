import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AdoptionMotherInformation = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Qualification = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
  const { data: QualificationSub = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
  const { data: Profession = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "state");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "taluk");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const [AdoptionMotherFirstNameEn, setAdoptionMotherFirstNameEn] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherFirstNameEn);
  const [AdoptionMotherMiddleNameEn, setAdoptionMotherMiddleNameEn] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherMiddleNameEn);
  const [AdoptionMotherLastNameEn, setAdoptionMotherLastNameEn] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherLastNameEn);
  const [AdoptionMotherFirstNameMl, setAdoptionMotherFirstNameMl] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherFirstNameMl);
  const [AdoptionMotherMiddleNameMl, setAdoptionMotherMiddleNameMl] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherMiddleNameMl);
  const [AdoptionMotherLastNameMl, setAdoptionMotherLastNameMl] = useState(formData?.AdoptionMotherInfoDetails?.MotherLotherPlaceNameastNameMl);
  const [AdoptionMotherAadhar, setAdoptionMotherAadhar] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherAadhar);
  const [AdoptionMotherPassportNo, setAdoptionMotherPassportNo] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherPassportNo);
  const [AdoptionMotherEmail, setAdoptionMotherEmail] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherEmail);
  const [AdoptionMotherMobile, setAdoptionMotherMobile] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherMobile);
  const [AdoptionMotherEducation, setAdoptionMotherEducation] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherEducation);
  const [AdoptionMotherEducationSubject, setAdoptionMotherEducationSubject] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherEducationSubject);
  const [AdoptionMotherProfession, setAdoptionMotherProfession] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherProfession);
  const [LBTypeName, setLBTypeName] = useState(formData?.AdoptionMotherInfoDetails?.LBTypeName);
  const [StateName, setStateName] = useState(formData?.AdoptionMotherInfoDetails?.StateName);
  const [MotherDistrict, setMotherDistrict] = useState(formData?.AdoptionMotherInfoDetails?.MotherDistrict);   
  const [AdoptionMotherNationality, setAdoptionMotherNationality] = useState(formData?.AdoptionMotherInfoDetails?.AdoptionMotherNationality);  
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const cmbUrbanRural = [
    { i18nKey: "Urban", code: "URBAN" },
    { i18nKey: "Rural", code: "RURAL" },
  ];
  const cmbMaritalStatus = [
    { i18nKey: "Single", code: "SINGLE" },
    { i18nKey: "Married", code: "MARRIED" },
  ];
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbQualification = [];
  Qualification &&
    Qualification["birth-death-service"] &&
    Qualification["birth-death-service"].Qualification.map((ob) => {
      cmbQualification.push(ob);
    });
  let cmbQualificationSub = [];
  QualificationSub &&
    QualificationSub["birth-death-service"] &&
    QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
      cmbQualificationSub.push(ob);
    });
  let cmbProfession = [];
  Profession &&
    Profession["birth-death-service"] &&
    Profession["birth-death-service"].Profession.map((ob) => {
      cmbProfession.push(ob);
    });
  
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
 
  const onSkip = () => onSelect();

  function setSelectAdoptionMotherFirstNameEn(e) {
    setAdoptionMotherFirstNameEn(e.target.value);
  }
  function setSelectAdoptionMotherMiddleNameEn(e) {
    setAdoptionMotherMiddleNameEn(e.target.value);
  }
  function setSelectAdoptionMotherLastNameEn(e) {
    setAdoptionMotherLastNameEn(e.target.value);
  }
  function setSelectAdoptionMotherFirstNameMl(e) {
    setAdoptionMotherFirstNameMl(e.target.value);
  }
  function setSelectAdoptionMotherMiddleNameMl(e) {
    setAdoptionMotherMiddleNameMl(e.target.value);
  }
  function setSelectAdoptionMotherLastNameMl(e) {
    setAdoptionMotherLastNameMl(e.target.value);
  }
  function setSelectAdoptionMotherAadhar(e) {
    setAdoptionMotherAadhar(e.target.value);
  }
  function setSelectAdoptionMotherEmail(e) {
    setAdoptionMotherEmail(e.target.value);
  }
  function setSelectAdoptionMotherMobile(e) {
    setAdoptionMotherMobile(e.target.value);
  }
  function setSelectAdoptionMotherPassportNo(e) {
    setAdoptionMotherPassportNo(e.target.value);
  }
  function setSelectAdoptionMotherEducation(value) {
    setAdoptionMotherEducation(value);
  }
  function setSelectAdoptionMotherEducationSubject(value) {
    setAdoptionMotherEducationSubject(value);
  }
  function setSelectAdoptionMotherProfession(value) {
    setAdoptionMotherProfession(value);
  }
  function setSelectAdoptionMotherNationality(value) {
    setAdoptionMotherNationality(value);
  }  
  
  
  function setSelectMotherCountry(value) {
    setMotherCountry(value);
  }
  const goNext = () => {
    sessionStorage.setItem("AdoptionMotherFirstNameEn", AdoptionMotherFirstNameEn);
    sessionStorage.setItem("AdoptionMotherMiddleNameEn", AdoptionMotherMiddleNameEn);
    sessionStorage.setItem("AdoptionMotherLastNameEn", AdoptionMotherLastNameEn);
    sessionStorage.setItem("AdoptionMotherFirstNameMl", AdoptionMotherFirstNameMl);
    sessionStorage.setItem("AdoptionMotherMiddleNameMl", AdoptionMotherMiddleNameMl);
    sessionStorage.setItem("AdoptionMotherLastNameMl", AdoptionMotherLastNameMl);
    sessionStorage.setItem("AdoptionMotherAadhar", AdoptionMotherAadhar);
    sessionStorage.setItem("AdoptionMotherPassportNo", AdoptionMotherPassportNo);
    sessionStorage.setItem("AdoptionMotherEmail", AdoptionMotherEmail);
    sessionStorage.setItem("AdoptionMotherMobile", AdoptionMotherMobile);
    sessionStorage.setItem("AdoptionMotherEducation", AdoptionMotherEducation.code);
    sessionStorage.setItem("AdoptionMotherEducationSubject", AdoptionMotherEducationSubject.code);
    sessionStorage.setItem("AdoptionMotherProfession", AdoptionMotherProfession.code);
    sessionStorage.setItem("AdoptionMotherNationality", AdoptionMotherNationality.code);    
    onSelect(config.key, {
      AdoptionMotherFirstNameEn,
      AdoptionMotherMiddleNameEn,
      AdoptionMotherLastNameEn,
      AdoptionMotherFirstNameMl,
      AdoptionMotherMiddleNameMl,
      AdoptionMotherLastNameMl,
      AdoptionMotherAadhar,
      AdoptionMotherPassportNo,
      AdoptionMotherEmail,
      AdoptionMotherMobile,
      AdoptionMotherEducation,
      AdoptionMotherEducationSubject,
      AdoptionMotherProfession,
      AdoptionMotherNationality,     
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdoptionMotherFirstNameEn}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_MOTHER_INFORMATION")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FIRST_NAME_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherFirstNameEn"
                value={AdoptionMotherFirstNameEn}
                onChange={setSelectAdoptionMotherFirstNameEn}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherMiddleNameEn"
                value={AdoptionMotherMiddleNameEn}
                onChange={setSelectAdoptionMotherMiddleNameEn}
                disable={isEdit}
                placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_LAST_NAME_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherLastNameEn"
                value={AdoptionMotherLastNameEn}
                onChange={setSelectAdoptionMotherLastNameEn}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FIRST_NAME_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherFirstNameMl"
                value={AdoptionMotherFirstNameMl}
                onChange={setSelectAdoptionMotherFirstNameMl}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_ML")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherMiddleNameMl"
                value={AdoptionMotherMiddleNameMl}
                onChange={setSelectAdoptionMotherMiddleNameMl}
                disable={isEdit}
                placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_LAST_NAME_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherLastNameMl"
                value={AdoptionMotherLastNameMl}
                onChange={setSelectAdoptionMotherLastNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_ML")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherAadhar"
                value={AdoptionMotherAadhar}
                onChange={setSelectAdoptionMotherAadhar}
                disable={isEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_PASSPORT_NO")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherPassportNo"
                value={AdoptionMotherPassportNo}
                onChange={setSelectAdoptionMotherPassportNo}
                disable={isEdit}
                placeholder={`${t("CR_PASSPORT_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, title: t("CR_INVALID_PASSPORT_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type="email"
                optionKey="i18nKey"
                name="AdoptionMotherEmail"
                value={AdoptionMotherEmail}
                onChange={setSelectAdoptionMotherEmail}
                disable={isEdit}
                placeholder={`${t("CR_EMAIL")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdoptionMotherMobile"
                value={AdoptionMotherMobile}
                onChange={setSelectAdoptionMotherMobile}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EDUCATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbQualification}
                selected={AdoptionMotherEducation}
                select={setSelectAdoptionMotherEducation}
                disabled={isEdit}
                placeholder={`${t("CR_EDUCATION")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EDUCATION_SUBJECT")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbQualificationSub}
                selected={AdoptionMotherEducationSubject}
                select={setSelectAdoptionMotherEducationSubject}
                disabled={isEdit}
                placeholder={`${t("CR_EDUCATION_SUBJECT")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_PROFESSIONAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbProfession}
                selected={AdoptionMotherProfession}
                select={setSelectAdoptionMotherProfession}
                disabled={isEdit}
                placeholder={`${t("CR_PROFESSIONAL")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_NATIONALITY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="nationalityname"
                isMandatory={false}
                option={cmbNation}
                selected={AdoptionMotherNationality}
                select={setSelectAdoptionMotherNationality}
                disabled={isEdit}
                placeholder={`${t("CR_NATIONALITY")}`}
              />
            </div>
            
          </div>
        </div>
        
        
      </FormStep>
    </React.Fragment>
  );
};
export default AdoptionMotherInformation;
