import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, DatePicker, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const BirthFatherInformation = ({ config, onSelect, userType, formData }) => {
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
  const [MotherFirstNameEn, setMotherFirstNameEn] = useState(formData?.BirthFatherInfoDetails?.MotherFirstNameEn);
  const [MotherMiddleNameEn, setMotherMiddleNameEn] = useState(formData?.BirthFatherInfoDetails?.MotherMiddleNameEn);
  const [MotherLastNameEn, setMotherLastNameEn] = useState(formData?.BirthFatherInfoDetails?.MotherLastNameEn);
//   const [MotherFirstNameMl, setMotherFirstNameMl] = useState(formData?.BirthFatherInfoDetails?.MotherFirstNameMl);
//   const [MotherMiddleNameMl, setMotherMiddleNameMl] = useState(formData?.BirthFatherInfoDetails?.MotherMiddleNameMl);
//   const [MotherLastNameMl, setMotherLastNameMl] = useState(formData?.BirthFatherInfoDetails?.MotherLotherPlaceNameastNameMl);
  const [MotherAadhar, setMotherAadhar] = useState(formData?.BirthFatherInfoDetails?.MotherAadhar);
  const [MotherPassportNo, setMotherPassportNo] = useState(formData?.BirthFatherInfoDetails?.MotherPassportNo);
  const [MotherEmail, setMotherEmail] = useState(formData?.BirthFatherInfoDetails?.MotherEmail);
  const [MotherMobile, setMotherMobile] = useState(formData?.BirthFatherInfoDetails?.MotherMobile);
  const [MotherEducation, setMotherEducation] = useState(formData?.BirthFatherInfoDetails?.MotherEducation);
  // const [MotherEducationSubject, setMotherEducationSubject] = useState(formData?.BirthFatherInfoDetails?.MotherEducationSubject);
  const [MotherProfession, setMotherProfession] = useState(formData?.BirthFatherInfoDetails?.MotherProfession);
  const [LBTypeName, setLBTypeName] = useState(formData?.BirthFatherInfoDetails?.LBTypeName);
  const [StateName, setStateName] = useState(formData?.BirthFatherInfoDetails?.StateName);
  const [MotherDistrict, setMotherDistrict] = useState(formData?.BirthFatherInfoDetails?.MotherDistrict);   
  const [MotherNationality, setMotherNationality] = useState(formData?.BirthFatherInfoDetails?.MotherNationality);  
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

  function setSelectMotherFirstNameEn(e) {
    setMotherFirstNameEn(e.target.value);
  }
  function setSelectMotherMiddleNameEn(e) {
    setMotherMiddleNameEn(e.target.value);
  }
  function setSelectMotherLastNameEn(e) {
    setMotherLastNameEn(e.target.value);
  }
//   function setSelectMotherFirstNameMl(e) {
//     setMotherFirstNameMl(e.target.value);
//   }
//   function setSelectMotherMiddleNameMl(e) {
//     setMotherMiddleNameMl(e.target.value);
//   }
//   function setSelectMotherLastNameMl(e) {
//     setMotherLastNameMl(e.target.value);
//   }
  function setSelectMotherAadhar(e) {
    setMotherAadhar(e.target.value);
  }
  function setSelectMotherEmail(e) {
    setMotherEmail(e.target.value);
  }
  function setSelectMotherMobile(e) {
    setMotherMobile(e.target.value);
  }
  function setSelectMotherPassportNo(e) {
    setMotherPassportNo(e.target.value);
  }
  function setSelectMotherEducation(value) {
    setMotherEducation(value);
  }
  // function setSelectMotherEducationSubject(value) {
  //   setMotherEducationSubject(value);
  // }
  function setSelectMotherProfession(value) {
    setMotherProfession(value);
  }
  function setSelectMotherNationality(value) {
    setMotherNationality(value);
  }  
  
  
 
  const goNext = () => {
    sessionStorage.setItem("MotherFirstNameEn", MotherFirstNameEn);
    sessionStorage.setItem("MotherMiddleNameEn", MotherMiddleNameEn);
    sessionStorage.setItem("MotherLastNameEn", MotherLastNameEn);
    // sessionStorage.setItem("MotherFirstNameMl", MotherFirstNameMl);
    // sessionStorage.setItem("MotherMiddleNameMl", MotherMiddleNameMl);
    // sessionStorage.setItem("MotherLastNameMl", MotherLastNameMl);
    sessionStorage.setItem("MotherAadhar", MotherAadhar);
    sessionStorage.setItem("MotherPassportNo", MotherPassportNo);
    sessionStorage.setItem("MotherEmail", MotherEmail);
    sessionStorage.setItem("MotherMobile", MotherMobile);
    sessionStorage.setItem("MotherEducation", MotherEducation.code);
    // sessionStorage.setItem("MotherEducationSubject", MotherEducationSubject.code);
    sessionStorage.setItem("MotherProfession", MotherProfession.code);
    sessionStorage.setItem("MotherNationality", MotherNationality.code);    
    onSelect(config.key, {
      MotherFirstNameEn,
      MotherMiddleNameEn,
      MotherLastNameEn,
    //   MotherFirstNameMl,
    //   MotherMiddleNameMl,
    //   MotherLastNameMl,
      MotherAadhar,
      MotherPassportNo,
      MotherEmail,
      MotherMobile,
      MotherEducation,
      // MotherEducationSubject,
      MotherProfession,
      MotherNationality,     
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!MotherFirstNameEn}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_FATHER_INFORMATION")}`}</span>{" "}
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
                name="MotherFirstNameEn"
                value={MotherFirstNameEn}
                onChange={setSelectMotherFirstNameEn}
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
                name="MotherMiddleNameEn"
                value={MotherMiddleNameEn}
                onChange={setSelectMotherMiddleNameEn}
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
                name="MotherLastNameEn"
                value={MotherLastNameEn}
                onChange={setSelectMotherLastNameEn}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
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
                name="MotherFirstNameMl"
                value={MotherFirstNameMl}
                onChange={setSelectMotherFirstNameMl}
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
                name="MotherMiddleNameMl"
                value={MotherMiddleNameMl}
                onChange={setSelectMotherMiddleNameMl}
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
                name="MotherLastNameMl"
                value={MotherLastNameMl}
                onChange={setSelectMotherLastNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_ML")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
              />
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="MotherAadhar"
                value={MotherAadhar}
                onChange={setSelectMotherAadhar}
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
                name="MotherPassportNo"
                value={MotherPassportNo}
                onChange={setSelectMotherPassportNo}
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
                name="MotherEmail"
                value={MotherEmail}
                onChange={setSelectMotherEmail}
                disable={isEdit}
                placeholder={`${t("CR_EMAIL")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="MotherMobile"
                value={MotherMobile}
                onChange={setSelectMotherMobile}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_EDUCATION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbQualification}
                selected={MotherEducation}
                select={setSelectMotherEducation}
                disabled={isEdit}
                placeholder={`${t("CR_EDUCATION")}`}
              />
            </div>
            {/* <div className="col-md-4">
              <CardLabel>
                {`${t("CR_EDUCATION_SUBJECT")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbQualificationSub}
                selected={MotherEducationSubject}
                select={setSelectMotherEducationSubject}
                disabled={isEdit}
                placeholder={`${t("CR_EDUCATION_SUBJECT")}`}
              />
            </div> */}
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
                selected={MotherProfession}
                select={setSelectMotherProfession}
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
                selected={MotherNationality}
                select={setSelectMotherNationality}
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
export default BirthFatherInformation;
