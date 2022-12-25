import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, Dropdown,FormInputGroup, DatePicker } from "@egovernments/digit-ui-react-components";
import { first } from "lodash";
import React, { useState, useEffect } from "react";
import Timeline from "../components/DFMTimeline";

const DFMApplicationDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const onSkip = () => onSelect();

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: TitleList = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "Title");
  const { data: PostOffice = {}, isLoading } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  const { data: Category = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "ApplicantCategory");
  const [Title, selectTitle] = useState(formData?.ApplicantDetails?.Title);
  const [FirstName, setFirstNameEn] = useState(formData?.ApplicantDetails?.FirstName);
  const [LastName,setLastName] = useState(formData?.ApplicantDetails?.LastName);
  const [AadharNo, setAadharNo] = useState(formData?.ApplicantDetails?.AadharNo);
  const [Email,setEmail] = useState(formData?.ApplicantDetails?.Email);
  const [MobileNo, setMobileNo] = useState(formData?.ApplicantDetails?.MobileNo);
  const [DateofBirth, setDateofBirth] = useState(formData?.ApplicantDetails?.DateofBirth);
  const [FatherFirstName, setFatherFirstName] = useState(formData?.ApplicantDetails?.FatherFirstName);
  const [FatherLastName, setFatherLastName] = useState(formData?.ApplicantDetails?.FatherLastName);
  const [MotherFirstName, setMotherFirstName] = useState(formData?.ApplicantDetails?.MotherFirstName);
  const [MotherLastName, setMotherLastName] = useState(formData?.ApplicantDetails?.MotherLastName);
  const [CategoryList, setCategoryList] = useState(formData?.ApplicantDetails?.CategoryList);
  const [AccountNo, setAccountNo] = useState(formData?.ApplicantDetails?.AccountNo);

  let cmbTitle = [];
  TitleList &&
    TitleList["common-masters"] &&
    TitleList["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });
  let cmbPostOffice = [];
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
    let cmbCategory = [];
    Category &&
    Category["FileManagement"] &&
    Category["FileManagement"].ApplicantCategory.map((ob) => {
      cmbCategory.push(ob);
    });
  

  const goNext = () => {
    sessionStorage.setItem("Title", Title?Title.code:null);
    sessionStorage.setItem("FirstName", FirstName);
    sessionStorage.setItem("LastName", LastName);
    sessionStorage.setItem("AadharNo", AadharNo);
    sessionStorage.setItem("Email", Email);
    sessionStorage.setItem("MobileNo", MobileNo);
    sessionStorage.setItem("DateofBirth", DateofBirth);
    sessionStorage.setItem("FatherFirstName", FatherFirstName);
    sessionStorage.setItem("FatherLastName", FatherLastName);
    sessionStorage.setItem("MotherFirstName", MotherFirstName);
    sessionStorage.setItem("MotherLastName", MotherLastName);
    sessionStorage.setItem("CategoryList", CategoryList?CategoryList.code:null);
    sessionStorage.setItem("AccountNo", AccountNo);
    onSelect(config.key, { Title, FirstName, LastName, AadharNo, Email, MobileNo, DateofBirth,
      FatherFirstName, FatherLastName, MotherFirstName, MotherLastName, CategoryList, AccountNo
    });
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  let patternValid = "^d{12}$";

  function setselectTitle(value) {
    selectTitle(value);
  }
  function setSelectFirstNameEn(e) {
    setFirstNameEn(e.target.value);
  }
  function setSelectLastName(e) {
    setLastName(e.target.value);
  }
  function setSelectAadharNo(e) {
    setAadharNo(e.target.value);
  }
  function setSelectEmail(e) {
    setEmail(e.target.value);
  }
  function setSelectMobileNo(e) {
    setMobileNo(e.target.value);
  }
  function setSelectDateofBirth(value) {
    setDateofBirth(value);
  }
  function setSelectFatherFirstName(e) {
    setFatherFirstName(e.target.value);
  }
  function setSelectFatherLastName(e) {
    setFatherLastName(e.target.value);
  }
  function setSelectMotherFirstName(e) {
    setMotherFirstName(e.target.value);
  }
  function setSelectMotherLastName(e) {
    setMotherLastName(e.target.value);
  }
  function setselectCategoryList(value) {
    setCategoryList(value);
  }
  function setSelectAccountNo(e) {
    setAccountNo(e.target.value);
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline /> : null}

      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!Title} >
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "grid" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_APPLICATION_DETAILS_TEXT")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
            <div className="col-md-4">
                <CardLabel>{`${t("DFM_TITLE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbTitle}
                  selected={Title}
                  placeholder={`${t("DFM_TITLE")}`}
                  select={setselectTitle}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_FIRST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="FirstName"
                  value={FirstName}
                  onChange={setSelectFirstNameEn}
                  placeholder={`${t("DFM_FIRST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_FIRST_NAME") })}
                />
              </div>

              <div className="col-md-4">
                <CardLabel>{`${t("DFM_LAST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput t={t}  isMandatory={false} type={"text"} optionKey="i18nKey" name="LastName" placeholder={`${t("DFM_LAST_NAME")}`}
                  value={LastName}
                  onChange={setSelectLastName}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LAST_NAME") })}
                />
              </div>
            </div>
            <div className="row">
            <div className="col-md-4">
                <CardLabel>{`${t("DFM_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="AadharNo"
                  value={AadharNo}
                  onChange={setSelectAadharNo}
                  placeholder={`${t("DFM_AADHAR_NO")}`}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("DFM_INVALID_AADHAR_NO") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_EMAIL")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"email"}
                  optionKey="i18nKey"
                  name="Email"
                  value={Email}
                  onChange={setSelectEmail}
                  placeholder={`${t("DFM_EMAIL")}`}
                  {...(validation = { pattern: "^(.+)@(.+)$", isRequired: true, type: "email", title: t("DFM_INVALID_EMAIL") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="MobileNo"
                  value={MobileNo}
                  onChange={setSelectMobileNo}
                  placeholder={`${t("DFM_MOBILE_NO")}`}
                  {...(validation = { pattern: "^(+d{1,3}[- ]?)?d{10}$", isRequired: true, type: "text", title: t("DFM_INVALID_MOBILE_NO") })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_DOB")}`}<span className="mandatorycss">*</span></CardLabel>
                <DatePicker
                  date={DateofBirth}
                  name="DateofBirth"
                  onChange={setSelectDateofBirth}
                  // disabled={isEdit}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_FATHER_FIRST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="FatherFirstName"
                  value={FatherFirstName}
                  onChange={setSelectFatherFirstName}
                  placeholder={`${t("DFM_FATHER_FIRST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_FATHER_FIRST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_FATHER_LAST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="FatherLastName"
                  value={FatherLastName}
                  onChange={setSelectFatherLastName}
                  placeholder={`${t("DFM_FATHER_LAST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_FATHER_LAST_NAME") })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MOTHER_FIRST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="MotherFirstName"
                  value={MotherFirstName}
                  placeholder={`${t("DFM_MOTHER_FIRST_NAME")}`}
                  onChange={setSelectMotherFirstName}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MOTHER_FIRST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MOTHER_LAST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="MotherLastName"
                  value={MotherLastName}
                  onChange={setSelectMotherLastName}
                  placeholder={`${t("DFM_MOTHER_LAST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MOTHER_LAST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_CATRGORY")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbCategory}
                  selected={CategoryList}
                  select={setselectCategoryList}
                  placeholder={`${t("DFM_CATRGORY")}`}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <CardLabel>{`${t("DFM_BANK_ACCOUNT_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="AccountNo"
                  value={AccountNo}
                  onChange={setSelectAccountNo}
                  placeholder={`${t("DFM_BANK_ACCOUNT_NO")}`}
                  {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_ACCOUNT_NO") })}
                />
              </div>
            </div>
          </div>
          {/* ); */}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default DFMApplicationDetails;
