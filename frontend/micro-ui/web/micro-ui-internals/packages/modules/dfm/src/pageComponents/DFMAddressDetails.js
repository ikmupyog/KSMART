import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput,FormInputGroup } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMAddressDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const postOfficeOptions=[
    {label:"postOffice1", value:"postOffice1"},
    {label:"postOffice2", value:"postOffice2"},
    {label:"postOffice3", value:"postOffice3"},
  ]
  const wardOptions=[
    {label:"ward1", value:"ward1"},
    {label:"ward2", value:"ward2"},
    {label:"ward3", value:"ward3"},
  ]
  const onSkip = () => onSelect();
  const [TradeName, setTradeName] = useState(formData.TradeDetails?.TradeName);

  const [addressData, setAddressData] = useState(
    formData?.AddressDetails?.addressData
      ? formData.AddressDetails.addressData
      : {
          houseNo: "",
          houseName: "",
          street: "",
          postOffice: [],
          pincode: "",
          resAssociationNo: "",
          localPlace: "",
          mainPlace: "",
          wardNo: [],
        }
  );

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");

  let mdmsFinancialYear = fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "TL") : [];
  let FY = mdmsFinancialYear && mdmsFinancialYear.length > 0 && mdmsFinancialYear.sort((x, y) => y.endingDate - x.endingDate)[0]?.code;
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  const mystyle={
    marginBottom:"24px"
  };
  const handleChange = (text, type) => {
    let tempdata = { ...addressData };
    if (type === "houseNo") {
      tempdata.houseNo = text;
      setAddressData(tempdata);
    }
    if (type === "houseName") {
      tempdata.houseName = text;
      setAddressData(tempdata);
    }
    if (type === "street") {
      tempdata.street = text;
      setAddressData(tempdata);
    }
    if (type === "postOffice") {
      tempdata.postOffice = text;
      setAddressData(tempdata);
    }
    if (type === "pincode") {
      tempdata.pincode = text;
      setAddressData(tempdata);
    }
    if (type === "resAssociationNo") {
      tempdata.resAssociationNo = text;
      setAddressData(tempdata);
    }
    if (type === "localPlace") {
      tempdata.localPlace = text;
      setAddressData(tempdata);
    }
    if (type === "mainPlace") {
      tempdata.mainPlace = text;
      setAddressData(tempdata);
    }
    if (type === "wardNo") {
      tempdata.wardNo = text;
      setAddressData(tempdata);
    }
  };

  const goNext = () => {
    sessionStorage.setItem("CurrentFinancialYear", FY);
    onSelect(config.key, { addressData });
    // console.log("d", addressData);
  };
  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        // isDisabled={!TradeName}
      >
        {/* <CardLabel>{`${t("House No")}`}</CardLabel>
        <TextInput
        style={mystyle}
          t={t}
          isMandatory={false}
          type={"text"}
          optionKey="i18nKey"
          name="House No"
          value={TradeName}
          onChange={setSelectTradeName}
          disable={isEdit}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", postOffice1: t("TL_INVALID_TRADE_NAME") })}
        /> */}
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.houseNo} name="houseNo" label="House Number"
            mystyle={mystyle} 
        /> 
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.houseName} name="houseName" label="House Name"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.street} name="street" label="street"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={addressData.postOffice} name="postOffice" label="Post Office"
            selectOptions={postOfficeOptions} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.pincode} name="pincode" label="Pincode"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.resAssociationNo} name="resAssociationNo" label="ResAssociation Number"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.localPlace} name="localPlace" label="Local Place"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="TextInput" handleChange={handleChange}   t={t} value={addressData.mainPlace} name="mainPlace" label="Main Place"
            mystyle={mystyle} 
        />
        <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={addressData.wardNo} name="wardNo" label="Ward No"
            selectOptions={wardOptions} 
        />
        {/* <CardLabel>{`${t("Last Name")}`}</CardLabel>
        <TextInput
        style={mystyle}
          t={t}
          isMandatory={false}
          type={"text"}
          optionKey="i18nKey"
          name="LastName"
          value={TradeName}
          onChange={setSelectTradeName}
          disable={isEdit}
          {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
        /> */}
      </FormStep>
      {<CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("TL_LICENSE_ISSUE_YEAR_INFO_MSG") + FY} />}
    </React.Fragment>
  );
};

export default DFMAddressDetails;
