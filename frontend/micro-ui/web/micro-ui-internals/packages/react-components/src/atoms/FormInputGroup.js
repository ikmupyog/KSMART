import React, { useState } from "react";
import {
  UploadFile,
  DatePicker,
  TextInput,
  CheckBox,
  CardLabel,
  LabelFieldPair,
  TextArea,
  CitizenInfoLabel,
  RadioButtons,
  PitDimension,
  Dropdown,
} from "@egovernments/digit-ui-react-components";

const FormInputGroup = ({ label, type, selectOptions, onChange, value, placeholder, fullWidth, mystyle, t, name, handleChange, isMandatory,valid }) => {
  // let validation = {};

  const inputTypeSelect = (type, selectOptions, onChange, value, placeholder, mystyle, t, name, handleChange, isMandatory,valid) => {
    console.log("enter", valid);
    let validation = {};
    
    switch (type) {
      case "TextInput":
        return (
          <TextInput
            style={mystyle}
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name={name}
            value={value}
            onChange={(e) => handleChange(e.target.value, name)}
            placeholder={name}
            // disable={isEdit}
            {...(validation = { pattern: name==="email"?"^(.+)@(.+)$":"^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t(`Invalid ${name}`) })}
          />
        );

      case "TextInputNumber":
        return (
          <TextInput
            style={mystyle}
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name={name}
            value={value} 
            onChange={(e) => handleChange(e.target.value, name)}
            // disable={isEdit}
            placeholder={name}
            {...(validation = { pattern:valid?valid:"^[0-9 ]*$", 
            // {...(validation = { pattern:"^[0-9 ]*$", 
            // {...(validation = { pattern: name ==="mobileNo"?"^(\+\d{1,3}[- ]?)?\d{10}$" : name ==="pincode" ? "^[1-9][0-9]{5}$" : "^[0-9 ]*$",
             isRequired: true, type: "text", title: t(`Invalid ${name}`)})}
          />
        );
      // return <TextInput onChange={onChange} value={value} placeholder={placeholder} />; 
      case "TextArea":
        return <TextArea onChange={onChange} value={value} placeholder={name} />;
      case "CheckBox":
        return <CheckBox />;
      case "DatePicker":
        return (
          <DatePicker
            date={value}
            name={name}
            onChange={(e) => handleChange(e, name)}
            // disabled={isEdit}
          />
        );
      // return <DatePicker onChange={onChange} value={value} placeholder={placeholder} />;
      case "Dropdown":
        return (
          <Dropdown
            option={selectOptions}
            selected={selectOptions.find((sel) => sel.value === value?.value)}
            optionKey={"label"}
            select={(e) => handleChange(e, name)}
            freeze={true}
            placeholder={name}
            // customSelector={
            //   <label className="cp">
            //     {prop?.t(`TENANT_TENANTS_${stringReplaceAll(Digit.SessionStorage.get("Employee.tenantId"), ".", "_")?.toUpperCase()}`)}
            //   </label>
            // }
          />
        );
      // return ß
      //   <Dropdown
      //     option={selectOptions}
      //     selected={selectOptions.find((sel) => sel.value === dropdownValue?.value)}
      //     optionKey={"label"}
      //     select={handleChange}
      //     freeze={true}
      //     placeholder={placeholder}

      //   />
      // );
      default:
        return <input type="" value="default" />;
    }
  };
  return (
    <React.Fragment>
      {" "}
      {/* <div className=""> */}
      {/* <div className="app-details-container"> */}
      <CardLabel>{label}*</CardLabel>
      {inputTypeSelect(type, selectOptions, onChange, value, placeholder, mystyle, t, name, handleChange, isMandatory,valid)}
      {/* <CardLabel>{`${t("Last Name")}`}</CardLabel> */}
      {/* <TextInput
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
            /> */}
      {/* </div> */}
      {/* <div className = { fullWidth ? "applicationWrapper":"applicationWrapper max-width" } >
        <div className="application-label">
          {" "}
          <label>{label}:</label>
        </div>
        <div>
          {" "}
          {inputTypeSelect(type,selectOptions, onChange, value, placeholder)}
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default FormInputGroup;
