import {
  CardLabel,
  CitizenInfoLabel,
  FormStep,
  Loader,
  TextInput,
  Dropdown,
  FormInputGroup,
  TextArea,
} from "@egovernments/digit-ui-react-components";
import { first } from "lodash";
import React, { useState, useEffect } from "react";
import Timeline from "../components/DFMTimeline";

const DFMApplicationDetails = ({ t, config, onSelect, value, userType, formData }) => {
  const titleOptions = [
    { label: "title", value: "title" },
    { label: "title1", value: "title1" },
    { label: "title2", value: "title2" },
  ];
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
  const [TradeName, setTradeName] = useState(formData.TradeDetails?.TradeName);

  const [applicationData, setApplicationData] = useState(
    formData?.FileManagement?.applicationData
      ? formData.FileManagement.applicationData
      : {
          firstName: "",
          lastName: "",
          AadharNo: "",
          title: [],
          email: "",
          mobileNo: "",
          dob: "",
          fatherFirstName: "",
          fatherLastName: "",
          motherFirstName: "",
          motherFirstName: "",
          category: [],
          bankAccountNo: "",
          tenantID: [],
        }
  );
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");

  let mdmsFinancialYear = fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter((y) => y.module === "TL") : [];
  let FY = mdmsFinancialYear && mdmsFinancialYear.length > 0 && mdmsFinancialYear.sort((x, y) => y.endingDate - x.endingDate)[0]?.code;
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  const mystyle = {
    marginBottom: "24px",
  };

  const handleChange = (text, type) => {
    let tempdata = { ...applicationData };
    if (type === "firstName") {
      tempdata.firstName = text;
      setApplicationData(tempdata);
    }
    if (type === "lastName") {
      tempdata.lastName = text;
      setApplicationData(tempdata);
    }
    if (type === "aadharNo") {
      tempdata.aadharNo = text;
      setApplicationData(tempdata);
    }
    if (type === "title") {
      tempdata.title = text;
      setApplicationData(tempdata);
    }
    if (type === "email") {
      tempdata.email = text;
      setApplicationData(tempdata);
    }
    if (type === "mobileNo") {
      tempdata.mobileNo = text;
      setApplicationData(tempdata);
    }
    if (type === "dob") {
      tempdata.dob = text;
      setApplicationData(tempdata);
    }
    if (type === "fatherFirstName") {
      tempdata.fatherFirstName = text;
      setApplicationData(tempdata);
    }
    if (type === "fatherLastName") {
      tempdata.fatherLastName = text;
      setApplicationData(tempdata);
    }
    if (type === "motherFirstName") {
      tempdata.motherFirstName = text;
      setApplicationData(tempdata);
    }
    if (type === "motherLastName") {
      tempdata.motherLastName = text;
      setApplicationData(tempdata);
    }
    if (type === "category") {
      tempdata.category = text;
      setApplicationData(tempdata);
    }
    if (type === "bankAccountNo") {
      tempdata.bankAccountNo = text;
      setApplicationData(tempdata);
    }
    if (type === "tenantID") {
      tempdata.tenantID = text;
      setApplicationData(tempdata);
    }
  };

  const goNext = () => {
    sessionStorage.setItem("CurrentFinancialYear", FY);
    onSelect(config.key, { applicationData });
    // console.log("d", applicationData);
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  // console.log("log", applicationData);
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}

      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        isDisabled={!applicationData.title?.value || !applicationData.category?.value || !applicationData.tenantID?.value || !applicationData.dob}
      >
        {/* return ( */}
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "grid" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("SELECT TYPE OF APPLICATION DETAILS")}*`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              {!isLoading ? (
                <div className="col-md-4">
                  {/* <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}*`}</CardLabel>
                        <Dropdown t={t}  optionKey="i18nKey" name={`TradeCategory`} placeholder={`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}*`} /> */}
                  <FormInputGroup
                    type="TextInput"
                    handleChange={handleChange}
                    optionKey="i18nKey"
                    isMandatory={config.isMandatory}
                    t={t}
                    value={applicationData.firstName}
                    name="firstName"
                    label="First Name"
                    mystyle={mystyle}
                  />
                </div>
              ) : (
                <Loader />
              )}
              <div className="col-md-4">
                {/* <CardLabel>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}*`}</CardLabel>
                        <Dropdown t={t} optionKey="i18nKey" isMandatory={config.isMandatory}  placeholder={`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}*`} /> */}
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.lastName}
                  name="lastName"
                  label="Last Name"
                  mystyle={mystyle}
                />
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInputNumber"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.aadharNo}
                  name="aadharNo"
                  label="Aadhar No"
                  mystyle={mystyle}
                  valid="^\d{12}$"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <FormInputGroup
                  type="Dropdown"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.title}
                  name="title"
                  label="Title"
                  selectOptions={titleOptions}
                />
                {/* <CardLabel>{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}</CardLabel>
                        <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType"  placeholder={`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`} /> */}
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.email}
                  name="email"
                  label="Email"
                  mystyle={mystyle}
                />
                {/* <CardLabel>{`${t("TL_BUSINESS_ACTIVITY_LABEL")}`}</CardLabel> 
                        <TextArea t={t} type={"text"}  optionKey="i18nKey" placeHolder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} name="BusinessActivity" {...(validation = { isRequired: true, type: "text", title: t("TL_WRONG_UOM_VALUE_ERROR"),})} placeholder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} /> */}
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInputNumber"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.mobileNo}
                  name="mobileNo"
                  label="Mobile No"
                  mystyle={mystyle}
                  valid="^(\+\d{1,3}[- ]?)?\d{10}$"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <FormInputGroup
                  type="DatePicker"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.dob}
                  name="dob"
                  label="DOB"
                  mystyle={mystyle}
                />

                {/* <CardLabel>{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}</CardLabel>
                        <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType"  placeholder={`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`} /> */}
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.fatherFirstName}
                  name="fatherFirstName"
                  label="Father First Name"
                  mystyle={mystyle}
                />
                {/* <CardLabel>{`${t("TL_BUSINESS_ACTIVITY_LABEL")}`}</CardLabel> 
                        <TextArea t={t} type={"text"}  optionKey="i18nKey" placeHolder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} name="BusinessActivity" {...(validation = { isRequired: true, type: "text", title: t("TL_WRONG_UOM_VALUE_ERROR"),})} placeholder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} /> */}
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.fatherLastName}
                  name="fatherLastName"
                  label="Father Last Name"
                  mystyle={mystyle}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.motherFirstName}
                  name="motherFirstName"
                  label="Mother First Name"
                  mystyle={mystyle}
                />

                {/* <CardLabel>{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}</CardLabel>
                        <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType"  placeholder={`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`} /> */}
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.motherLastName}
                  name="motherLastName"
                  label="Mother Last Name"
                  mystyle={mystyle}
                />
              </div>
              <div className="col-md-4">
                <FormInputGroup
                  type="Dropdown"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.category}
                  name="category"
                  label="Category"
                  selectOptions={categoryOptions}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormInputGroup
                  type="TextInputNumber"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.bankAccountNo}
                  name="bankAccountNo"
                  label="Bank Account No"
                  mystyle={mystyle}
                />
                {/* <CardLabel>{`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`}</CardLabel>
                        <TextInput t={t} type={"text"} isMandatory={config.isMandatory} optionKey="i18nKey" name="CustomType"  placeholder={`${t("TL_CUSTOM_DETAILED_TYPE_LABEL")}`} /> */}
              </div>
              <div className="col-md-6">
                <FormInputGroup
                  type="Dropdown"
                  handleChange={handleChange}
                  t={t}
                  value={applicationData.tenantID}
                  name="tenantID"
                  label="Tenant ID"
                  selectOptions={tenendIdOptions}
                />
                {/* <CardLabel>{`${t("TL_BUSINESS_ACTIVITY_LABEL")}`}</CardLabel> 
                        <TextArea t={t} type={"text"}  optionKey="i18nKey" placeHolder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} name="BusinessActivity" {...(validation = { isRequired: true, type: "text", title: t("TL_WRONG_UOM_VALUE_ERROR"),})} placeholder={`${t("TL_BUSINESS_ACTIVITY_LABEL")}`} /> */}
              </div>
            </div>
          </div>
          {/* ); */}
        </div>
      </FormStep>
      {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("TL_LICENSE_ISSUE_YEAR_INFO_MSG") + FY} />}
    </React.Fragment>
  );
};

export default DFMApplicationDetails;
