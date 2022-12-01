import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, Dropdown,FormInputGroup } from "@egovernments/digit-ui-react-components";
import { first } from "lodash";
import React, { useState, useEffect } from "react";
import Timeline from "../components/DFMTimeline";

const DFMApplicationDetails = ({ t, config, onSelect, value, userType, formData }) => {
    const titleOptions =[
        {label:"title", value:"title"},
        {label:"title1", value:"title1"},
        {label:"title2", value:"title2"},
    ]
    const categoryOptions =[
        {label:"category1", value:"category1"},
        {label:"category2", value:"category2"},
        {label:"category3", value:"category3"},
    ]
    const tenendIdOptions =[
        {label:"TID1", value:"TID1"},
        {label:"TID2", value:"TID2"},
        {label:"TID3", value:"TID3"},
    ]
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
        // isDisabled={!TradeName}
      >
        <div>
          {/* <div className="app-details-container">
            <CardLabel>{`${t("First Name")}`}</CardLabel>
            <TextInput
              style={mystyle}
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="FirstName"
              value={applicationData.firstName}
              onChange={(e) => handleChange(e.target.value, "firstName")}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="app-details-container">
            <CardLabel>{`${t("Last Name")}`}</CardLabel>
            <TextInput
              style={mystyle}
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LastName"
              value={applicationData.lastName}
              onChange={(e) => handleChange(e.target.value, "lastName")}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="app-details-container">
            <CardLabel>{`${t("Aadhar No")}`}</CardLabel>
            <TextInput
              style={mystyle}
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AadharNo"
              value={applicationData.aadharNo}
              onChange={(e) => handleChange(e.target.value, "aadharNo")}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div> */}
          {/* <div className="app-details-container">
            <CardLabel>{`${t("Title")}`}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={config.isMandatory}
                option={titleOptions}
                selected={applicationData.title}
                select={(e) => handleChange(e, "title")}
                disabled={isEdit}
            />
             <Dropdown
            option={titleOptions}
            selected={titleOptions.find((sel) => sel.value === applicationData?.title?.value)}
            optionKey={"label"}
            select={(e) => handleChange(e, "title")}
            freeze={true}
            placeholder={placeholder}
            customSelector={
              <label className="cp">
                {prop?.t(`TENANT_TENANTS_${stringReplaceAll(Digit.SessionStorage.get("Employee.tenantId"), ".", "_")?.toUpperCase()}`)}
              </label>
            }
          />
          </div> */}

          {/* <div className="app-details-container">
            <CardLabel>{`${t("Email")}`}</CardLabel>
            <TextInput
              style={mystyle}
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Email"
              value={applicationData.email}
              onChange={(e) => handleChange(e.target.value, "email")}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div> */}
        </div>

        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.firstName} name="firstName" label="First Name"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.lastName} name="lastName" label="Last Name"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInputNumber" handleChange={handleChange}   t={t} value={applicationData.aadharNo} name="aadharNo" label="Aadhar No"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={applicationData.title} name="title" label="title"
            selectOptions={titleOptions} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.email} name="email" label="Email"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="TextInputNumber" handleChange={handleChange}   t={t} value={applicationData.mobileNo} name="mobileNo" label="Mobile No"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="DatePicker" handleChange={handleChange}   t={t} value={applicationData.dob} name="dob" label="DOB"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.fatherFirstName} name="fatherFirstName" label="father First Name"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.fatherLastName} name="fatherLastName" label="father Last Name"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.motherFirstName} name="motherFirstName" label="mother First Name"
            mystyle={mystyle} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.motherLastName} name="motherLastName" label="mother Last Name"
            mystyle={mystyle} 
        />
             <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={applicationData.category} name="category" label="Category"
            selectOptions={categoryOptions} 
        />
         <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={applicationData.bankAccountNo} name="bankAccountNo" label="Bank Account No"
            mystyle={mystyle} 
        />
             <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={applicationData.tenantID} name="tenantID" label="Tenant ID"
            selectOptions={tenendIdOptions} 
        />

      </FormStep>
      {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("TL_LICENSE_ISSUE_YEAR_INFO_MSG") + FY} />}
    </React.Fragment>
  );
};

export default DFMApplicationDetails;
