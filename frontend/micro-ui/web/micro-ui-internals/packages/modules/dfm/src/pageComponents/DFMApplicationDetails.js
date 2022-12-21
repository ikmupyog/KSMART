import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, Dropdown,FormInputGroup, DatePicker } from "@egovernments/digit-ui-react-components";
import { first } from "lodash";
import React, { useState, useEffect } from "react";
import Timeline from "../components/DFMTimeline";

const DFMApplicationDetails = ({ t, config, onSelect, value, userType, formData }) => {
  const categoryOptions = [
    { label: "category1", value: "category1" },
    { label: "category2", value: "category2" },
    { label: "category3", value: "category3" },
  ];
  const tenendIdOptions = [
    { label: "TID1", value: "TID1" },
    { label: "TID2", value: "TID2" },
    { label: "TID3", value: "TID3" },
  ];
  // console.log("form", formData, config);
  let validation = {};
  const onSkip = () => onSelect();

  const [applicationData, setApplicationData] = useState(
    formData?.FileManagement?.applicationData
      ? formData.FileManagement.applicationData
      :
     {
        firstName: "",
        lastName: "",
        AadharNo: "",
        title: "",
        email: "",
        mobileNo: "",
        dob: "",
        fatherFirstName: "",
        fatherLastName: "",
        motherFirstName: "",
        motherFirstName: "",
        category: "",
        bankAccountNo: "",
        tenantID: '',
      }
  );
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const { data: TitleList = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "Title");
  // const { data: PostOffice = {} } = Digit.Hooks.dfm.useDFMMDMS(stateId, "common-masters", "PostOffice");
  const { data: PostOffice = {}, isLoading } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  const { data: Category = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "ApplicantCategory");

  // console.log("log", TitleList, Category, PostOffice);
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

  console.log("c", cmbTitle);
  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }
  const mystyle = {
    marginBottom: "24px",
  };

  const handleChange = (text, type) => {
    // console.log(text, type);
    let tempdata = { ...applicationData };
    if (type === "firstName") {
      tempdata.firstName = text;
      setApplicationData(tempdata);
    }
    else if (type === "lastName") {
      tempdata.lastName = text;
      setApplicationData(tempdata);
    }
    else if (type === "aadharNo") {
      tempdata.aadharNo = text;
      setApplicationData(tempdata);
    }
    else if (type === "title") {
      tempdata.title = text;
      setApplicationData(tempdata);
    }
    else if (type === "email") {
      tempdata.email = text;
      setApplicationData(tempdata);
    }
    else if (type === "mobileNo") {
      tempdata.mobileNo = text;
      setApplicationData(tempdata);
    }
    else if (type === "dob") {
      tempdata.dob = text;
      setApplicationData(tempdata);
    }
    else if (type === "fatherFirstName") {
      tempdata.fatherFirstName = text;
      setApplicationData(tempdata);
    }
    else if (type === "fatherLastName") {
      tempdata.fatherLastName = text;
      setApplicationData(tempdata);
    }
    else if (type === "motherFirstName") {
      tempdata.motherFirstName = text;
      setApplicationData(tempdata);
    }
    else if (type === "motherLastName") {
      tempdata.motherLastName = text;
      setApplicationData(tempdata);
    }
    else if (type === "category") {
      tempdata.category = text;
      setApplicationData(tempdata);
    }
    else if (type === "bankAccountNo") {
      tempdata.bankAccountNo = text;
      setApplicationData(tempdata);
    }
    else if (type === "tenantID") {
      tempdata.tenantID = text;
      setApplicationData(tempdata);
    }
  };

  const goNext = () => {
    // sessionStorage.setItem("CurrentFinancialYear", FY);
    onSelect(config.key, { applicationData });
    // console.log("d", applicationData);
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  // console.log("log", applicationData);
  let patternValid = "^d{12}$";
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline /> : null}

      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        isDisabled={!applicationData.title?.name || !applicationData.category?.name || !applicationData.dob}
      >
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
                <CardLabel>{`${t("DFM_FIRST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="firstName"
                  value={applicationData.firstName}
                  onChange={(e) => handleChange(e.target.value, "firstName")}
                  placeholder={`${t("DFM_FIRST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_FIRST_NAME") })}
                />
              </div>

              <div className="col-md-4">
                <CardLabel>{`${t("DFM_LAST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="lastName"
                  placeholder={`${t("DFM_LAST_NAME")}`}
                  value={applicationData.lastName}
                  onChange={(e) => handleChange(e.target.value, "lastName")}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LAST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_AADHAR_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="aadharNo"
                  value={applicationData.aadharNo}
                  onChange={(e) => handleChange(e.target.value, "aadharNo")}
                  placeholder={`${t("DFM_AADHAR_NO")}`}
                  {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_AADHAR_NO") })}
                />
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
                  selected={applicationData.title}
                  placeholder={`${t("DFM_TITLE")}`}
                  select={(e) => handleChange(e, "title")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_EMAIL")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="email"
                  value={applicationData.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  placeholder={`${t("DFM_EMAIL")}`}
                  {...(validation = { pattern: "^(.+)@(.+)$", isRequired: true, type: "text", title: t("DFM_INVALID_EMAIL") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="mobileNo"
                  value={applicationData.mobileNo}
                  onChange={(e) => handleChange(e.target.value, "mobileNo")}
                  placeholder={`${t("DFM_MOBILE_NO")}`}
                  {...(validation = { pattern: "^(+d{1,3}[- ]?)?d{10}$", isRequired: true, type: "text", title: t("DFM_INVALID_MOBILE_NO") })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_DOB")}`}<span className="mandatorycss">*</span></CardLabel>
                <DatePicker
                  date={applicationData.dob}
                  name="dob"
                  onChange={(e) => handleChange(e, "dob")}
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
                  name="fatherFirstName"
                  value={applicationData.fatherFirstName}
                  onChange={(e) => handleChange(e.target.value, "fatherFirstName")}
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
                  name="fatherLastName"
                  value={applicationData.fatherLastName}
                  onChange={(e) => handleChange(e.target.value, "fatherLastName")}
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
                  name="motherFirstName"
                  value={applicationData.motherFirstName}
                  placeholder={`${t("DFM_MOTHER_FIRST_NAME")}`}
                  onChange={(e) => handleChange(e.target.value, "motherFirstName")}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MOTHER_FIRST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MOTHER_LAST_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="motherLastName"
                  value={applicationData.motherLastName}
                  onChange={(e) => handleChange(e.target.value, "motherLastName")}
                  placeholder={`${t("DFM_MOTHER_LAST_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MOTHER_LAST_NAME") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_CATRGORY")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbCategory}
                  selected={applicationData.category}
                  select={(e) => handleChange(e, "category")}
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
                  name="bankAccountNo"
                  value={applicationData.bankAccountNo}
                  onChange={(e) => handleChange(e.target.value, "bankAccountNo")}
                  placeholder={`${t("DFM_BANK_ACCOUNT_NO")}`}
                  {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_ACCOUNT_NO") })}
                />
              </div>
              {/* <div className="col-md-6">
                <CardLabel>{`${t("DFM_TENANT_ID")}*`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbPostOffice}
                  selected={applicationData.tenantID}
                  select={(e) => handleChange(e, "tenantID")}
                  placeholder={`${t("DFM_TENANT_ID")}`}
                />
              </div> */}
            </div>
          </div>
          {/* ); */}
        </div>
      </FormStep>
      {/* {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("TL_LICENSE_ISSUE_YEAR_INFO_MSG") + FY} />} */}
    </React.Fragment>
  );
};

export default DFMApplicationDetails;
