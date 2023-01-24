import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const FamilyInformationBirth = ({ config, onSelect, userType, formData }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Spouse = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "SpouseType");
  // const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  // const [setTitle, setSelectedTitle] = useState(formData?.FamilyInformationDeath?.setTitle);
  // const [setTitleB, setSelectedTitleB] = useState(formData?.FamilyInformationDeath?.setTitleB);
  const [setmaleDependent, setSelectedmaleDependent] = useState(formData?.FamilyInformationDeath?.setmaleDependent ? formData?.FamilyInformationDeath?.setmaleDependent : null);
  const [FatherOrHusbandNameEN, setFatherOrHusbandNameEN] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandNameEN ? formData?.FamilyInformationDeath?.FatherOrHusbandNameEN :"");
  const [FatherOrHusbandNameMl, setFatherOrHusbandNameMl] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandNameMl ? formData?.FamilyInformationDeath?.FatherOrHusbandNameMl :"");
  const [FatherEmail, setFatherEmail] = useState(formData?.FamilyInformationDeath?.FatherEmail ? formData?.FamilyInformationDeath?.FatherEmail : "");
  const [FatherOrHusbandAdharNo, setFatherOrHusbandAdharNo] = useState(formData?.FamilyInformationDeath?.FatherOrHusbandAdharNo ? formData?.FamilyInformationDeath?.FatherOrHusbandAdharNo : "");
  const [FatherMobile, setFatherMobile] = useState(formData?.FamilyInformationDeath?.FatherMobile ? formData?.FamilyInformationDeath?.FatherMobile :"" );
  
  const [SpouseNameEN, setSpouseNameEN] = useState(formData?.FamilyInformationDeath?.SpouseNameEN ? formData?.FamilyInformationDeath?.SpouseNameEN : "");
  const [SpouseNameMl, setSpouseNameMl] = useState(formData?.FamilyInformationDeath?.SpouseNameMl ? formData?.FamilyInformationDeath?.SpouseNameMl : "");
  const [SpouseEmail, setSpouseEmail] = useState(formData?.FamilyInformationDeath?.SpouseEmail ? formData?.FamilyInformationDeath?.SpouseEmail : "");
  const [SpouseAdharNo, setSpouseAdharNo] = useState(formData?.FamilyInformationDeath?.SpouseAdharNo ? formData?.FamilyInformationDeath?.SpouseAdharNo : "");
  const [SpouseMobile, setSpouseMobile] = useState(formData?.FamilyInformationDeath?.SpouseMobile ? formData?.FamilyInformationDeath?.SpouseMobile :"" );
 
  const [MotherNameEn, setMotherNameEn] = useState(formData?.FamilyInformationDeath?.MotherNameEn ? formData?.FamilyInformationDeath?.MotherNameEn : "");
  const [MotherNameMl, setMotherNameMl] = useState(formData?.FamilyInformationDeath?.MotherNameMl ? formData?.FamilyInformationDeath?.MotherNameMl : "");
  const [MotherAdharNo, setMotherAdharNo] = useState(formData?.FamilyInformationDeath?.MotherAdharNo ? formData?.FamilyInformationDeath?.MotherAdharNo : "");
  const [MotherEmail, setMotherEmail] = useState(formData?.FamilyInformationDeath?.MotherEmail ? formData?.FamilyInformationDeath?.MotherEmail : ""); 
  const [MotherMobile, setMotherMobile] = useState(formData?.FamilyInformationDeath?.MotherMobile ? formData?.FamilyInformationDeath?.MotherMobile : "");
  
  // const [checked, setChecked] = useState(true);
  const [isChecked, setIsChecked] = useState(formData?.FamilyInformationDeath?.isChecked ? formData?.FamilyInformationDeath?.isChecked : 0);
  const [isCheckedMother, setIsCheckedMother] = useState(formData?.FamilyInformationDeath?.isCheckedMother ? formData?.FamilyInformationDeath?.isCheckedMother : 0);
  const [isSpouseChecked, setisSpouseChecked] = useState(formData?.FamilyInformationDeath?.isSpouseChecked ? formData?.FamilyInformationDeath?.isSpouseChecked : 0);
  
  
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  // let cmbTitle = [];
  // title &&
  //   title["common-masters"] &&
  //   title["common-masters"].Title.map((ob) => {
  //     cmbTitle.push(ob);
  //   });

  let cmbspouse = [];
  Spouse &&
  Spouse["birth-death-service"] &&
  Spouse["birth-death-service"].SpouseType.map((ob) => {
    cmbspouse.push(ob);
    });

  const onSkip = () => onSelect();

  // function selectTitle(value) {
  //   setSelectedTitle(value);
  // }

  function selectmaleDependent(value) {
    setSelectedmaleDependent(value);
  }
  // function selectTitleB(value) {
  //   setSelectedTitleB(value);
  // }
  function setSelectFatherOrHusbandNameEN(e) {
    setFatherOrHusbandNameEN(e.target.value);
  }
  function setSelectFatherOrHusbandNameMl(e) {
    setFatherOrHusbandNameMl(e.target.value);
  }
  function setSelectFatherOrHusbandAdharNo(e) {
    setFatherOrHusbandAdharNo(e.target.value);
  }
  function setSelectFatherEmail(e) {
    setFatherEmail(e.target.value);
  }
  function setSelectFatherMobile(e) {
    setFatherMobile(e.target.value);
  }
  function setSelectSpouseNameEN(e) {
    setSpouseNameEN(e.target.value);
  }
  function setSelectSpouseNameMl(e) {
    setSpouseNameMl(e.target.value);
  }
  function setSelectSpouseAdharNo(e) {
    setSpouseAdharNo(e.target.value);
  }
  function setSelectSpouseEmail(e) {
    setSpouseEmail(e.target.value);
  }
  function setSelectSpouseMobile(e) {
    setSpouseMobile(e.target.value);
  }
  function setSelectMotherNameEn(e) {
    setMotherNameEn(e.target.value);
  }
  function setSelectMotherNameMl(e) {
    setMotherNameMl(e.target.value);
  }   
  function setSelectMotherAdharNo(e) {
    setMotherAdharNo(e.target.value);
  }  
  function setSelectMotherEmail(e) {
    setMotherEmail(e.target.value);
  }  
  function setSelectMotherMobile(e) {
    setMotherMobile(e.target.value);
  }
  const goNext = () => {
    // sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    // sessionStorage.setItem("setTitleB", setTitleB ? setTitleB.code : null);
    sessionStorage.setItem("setmaleDependent", setmaleDependent ? setmaleDependent.code : null);
    sessionStorage.setItem("SpouseNameEN", SpouseNameEN ? SpouseNameEN : null);
    sessionStorage.setItem("SpouseNameMl", SpouseNameMl ? SpouseNameMl : null);
    sessionStorage.setItem("SpouseAdharNo", SpouseAdharNo ? SpouseAdharNo : null);
    sessionStorage.setItem("SpouseEmail", SpouseEmail ? SpouseEmail : null);
    sessionStorage.setItem("SpouseMobile", SpouseMobile ? SpouseMobile : null);

    sessionStorage.setItem("FatherOrHusbandNameEN", FatherOrHusbandNameEN ? FatherOrHusbandNameEN : null);
    sessionStorage.setItem("FatherOrHusbandNameMl", FatherOrHusbandNameMl ? FatherOrHusbandNameMl : null);
    sessionStorage.setItem("FatherOrHusbandAdharNo", FatherOrHusbandAdharNo ? FatherOrHusbandAdharNo : null);
    sessionStorage.setItem("FatherEmail", FatherEmail ? FatherEmail : null);
    sessionStorage.setItem("FatherMobile", FatherMobile ? FatherMobile : null);

    sessionStorage.setItem("MotherNameEn", MotherNameEn ? MotherNameEn : null);
    sessionStorage.setItem("MotherNameMl", MotherNameMl ? MotherNameMl : null);    
    sessionStorage.setItem("MotherAdharNo", MotherAdharNo ? MotherAdharNo : null);
    sessionStorage.setItem("MotherEmail", MotherEmail ? MotherEmail : null);    
    sessionStorage.setItem("MotherMobile", MotherMobile ? MotherMobile : null);

    sessionStorage.setItem("isChecked", isChecked  );
    sessionStorage.setItem("isCheckedMother", isCheckedMother);
    sessionStorage.setItem("isSpouseChecked", isSpouseChecked );
    


    onSelect(config.key, {
      // isChecked,
      // isCheckedMother,
      // setTitle,
      setmaleDependent,
      SpouseNameEN,
      SpouseNameMl,
      SpouseEmail,
      SpouseAdharNo,
      SpouseMobile,

      FatherOrHusbandNameEN,
      FatherOrHusbandNameMl,
      FatherEmail,
      FatherOrHusbandAdharNo,
      FatherMobile,

      MotherNameEn,
      MotherAdharNo,      
      MotherEmail,      
      MotherNameMl,      
      MotherMobile,

      isChecked,
      isCheckedMother,
      isSpouseChecked,

    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        
      <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_SPOUSE_UNAVAILABLE")} onChange={() => setisSpouseChecked(!isSpouseChecked)} value={isSpouseChecked} checked={isSpouseChecked } />
            </div>
          </div>
        </div>
        {isSpouseChecked ? null : (
        
        // <div style={{ pointerEvents: isSpouseChecked ? "none" : "all", opacity: isSpouseChecked ? 0.5 : 1 }}>
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_SPOUSE")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbspouse}
                    selected={setmaleDependent}
                    select={selectmaleDependent}
                    disabled={isEdit}
                    placeholder={`${t("CR_SPOUSE")}`}
                  />
                </div>
              </div>
            </div>
            <div></div>
            <div className="row">
              <div className="col-md-12">
                {/* <div className="col-md-4">
                  <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbTitle}
                    selected={setTitle}
                    select={selectTitle}
                    disabled={isEdit}
                    placeholder={`${t("CR_TITLE_NAME_EN")}`}
                  />
                </div> */}
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameEN"
                    value={SpouseNameEN}
                    onChange={setSelectSpouseNameEN}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseNameMl"
                    value={SpouseNameMl}
                    onChange={setSelectSpouseNameMl}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text",title: t("CR_INVALID_NAME_ML"),
                    })}                   
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseAdharNo"
                    value={SpouseAdharNo}
                    onChange={setSelectSpouseAdharNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="email"
                    optionKey="i18nKey"
                    name="SpouseEmail"
                    value={SpouseEmail}
                    onChange={setSelectSpouseEmail}
                    disable={isEdit}
                    placeholder={`${t("CR_EMAIL")}`}
                    {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="SpouseMobile"
                    value={SpouseMobile}
                    onChange={setSelectSpouseMobile}
                    disable={isEdit}
                    placeholder={`${t("CR_MOBILE_NO")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
            )}
        
        
        
        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbTitle}
                selected={setTitle}
                select={selectTitle}
                disabled={isEdit}
                placeholder={`${t("CR_TITLE_NAME_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="FatherOrHusbandNameEN"
                value={FatherOrHusbandNameEN}
                onChange={setSelectFatherOrHusbandNameEN}
                disable={isEdit}
                placeholder={`${t("CR_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_NAME_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="FatherOrHusbandNameMl"
                value={FatherOrHusbandNameMl}
                onChange={setSelectFatherOrHusbandNameMl}
                disable={isEdit}
                placeholder={`${t("CR_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_NAME_ML"),
                })}
              />
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_MOTHER_UNAVAILABLE")} onChange={() => setIsCheckedMother(!isCheckedMother)} value={isCheckedMother} checked={isCheckedMother }/>
            </div>
          </div>
        </div>
        {isCheckedMother ? null : (
        <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>
            </h1>
          </div>
        </div>
       
          <div className="row">
            {/* <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbTitle}
                  selected={setTitleB}
                  select={selectTitleB}
                  disabled={isEdit}
                  placeholder={`${t("CR_TITLE_NAME_EN")}`}
                />
              </div>
            </div> */}
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_NAME_EN")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="MotherNameEn"
                value={MotherNameEn}
                onChange={setSelectMotherNameEn}
                disable={isEdit}
                placeholder={`${t("CR_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_NAME_ML")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="MotherNameMl"
                value={MotherNameMl}
                onChange={setSelectMotherNameMl}
                disable={isEdit}
                placeholder={`${t("CR_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_NAME_ML"),
                })}
                
              />
            </div>
          </div>                 
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MotherAdharNo"
                    value={MotherAdharNo}
                    onChange={setSelectMotherAdharNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
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
                    {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
                  />
                </div>
              </div>
            </div>
            </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_FATHER_UNAVAILABLE")} onChange={() => setIsChecked(!isChecked)}  value={isChecked} checked={isChecked } />
            </div>
          </div>
        </div>
        {isChecked ? null : (
        // <div style={{ pointerEvents: isChecked ? "none" : "all", opacity: isChecked ? 0.5 : 1 }}>
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MALE_DEPENDENT")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbmaleDependent}
                    selected={setmaleDependent}
                    select={selectmaleDependent}
                    disabled={isEdit}
                    placeholder={`${t("CR_MALE_DEPENDENT")}`}
                  />
                </div>
              </div>
            </div> */}
            <div></div>
            <div className="row">
              <div className="col-md-12">
                {/* <div className="col-md-4">
                  <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    option={cmbTitle}
                    selected={setTitle}
                    select={selectTitle}
                    disabled={isEdit}
                    placeholder={`${t("CR_TITLE_NAME_EN")}`}
                  />
                </div> */}
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherOrHusbandNameEN"
                    value={FatherOrHusbandNameEN}
                    onChange={setSelectFatherOrHusbandNameEN}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_NAME_EN") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherOrHusbandNameMl"
                    value={FatherOrHusbandNameMl}
                    onChange={setSelectFatherOrHusbandNameMl}
                    disable={isEdit}
                    placeholder={`${t("CR_NAME_ML")}`}
                    {...(validation = {pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text",title: t("CR_INVALID_NAME_ML"),
                  })}     
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherOrHusbandAdharNo"
                    value={FatherOrHusbandAdharNo}
                    onChange={setSelectFatherOrHusbandAdharNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type="email"
                    optionKey="i18nKey"
                    name="FatherEmail"
                    value={FatherEmail}
                    onChange={setSelectFatherEmail}
                    disable={isEdit}
                    placeholder={`${t("CR_EMAIL")}`}
                    {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="FatherMobile"
                    value={FatherMobile}
                    onChange={setSelectFatherMobile}
                    disable={isEdit}
                    placeholder={`${t("CR_MOBILE_NO")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
       
        ) }
      </FormStep>
    </React.Fragment>
  );
};
export default FamilyInformationBirth;
