import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, FormInputGroup,Dropdown } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMAddressDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const postOfficeOptions = [
    { label: "postOffice1", value: "postOffice1" },
    { label: "postOffice2", value: "postOffice2" },
    { label: "postOffice3", value: "postOffice3" },
  ];
  const wardOptions = [
    { label: "ward1", value: "ward1" },
    { label: "ward2", value: "ward2" },
    { label: "ward3", value: "ward3" },
  ];
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
  const { data:  PostOffice  = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  let mdmsFinancialYear = fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter((y) => y.module === "TL") : [];
  let FY = mdmsFinancialYear && mdmsFinancialYear.length > 0 && mdmsFinancialYear.sort((x, y) => y.endingDate - x.endingDate)[0]?.code;
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }

  console.log("add", PostOffice);
  let cmbPostOffice=[]
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
  const mystyle = {
    marginBottom: "24px",
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
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}

      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!addressData.postOffice?.name || !addressData.wardNo?.name}>
        {/* return ( */}
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_ADDRESS_DETAILS_TEXT")}*`}</span>
                </h1>
              </div>
            </div>

            <div className="row">
              {!isLoading ? (
                <div className="col-md-4">
                  {/* <FormInputGroup
                    type="TextInputNumber"
                    handleChange={handleChange}
                    t={t}
                    value={addressData.houseNo}
                    name="houseNo"
                    label={`${t("DFM_HOUSE_NUMBER")}`}
                    mystyle={mystyle}
                    placeholder={`${t("House No")}*`}
                  /> */}
                  <CardLabel>{`${t("DFM_HOUSE_NUMBER")}*`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="houseNo"
                    value={addressData.houseNo}
                    onChange={(e) => handleChange(e.target.value, "houseNo")}
                    placeholder={`${t("DFM_HOUSE_NUMBER")}`}
                    {...(validation = { pattern: "^[0-9 ]*$",
                     isRequired: true, type: "text", title: t("DFM_INVALID_HOUSE_NUMBER") })}
                  />
                </div>
              ) : (
                <Loader />
              )}
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.houseName}
                  name="houseName"
                  label={`${t("DFM_HOUSE_NAME")}`}
                  mystyle={mystyle}
                /> */}
                <CardLabel>{`${t("DFM_HOUSE_NAME")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="houseName"
                  value={addressData.houseName}
                  onChange={(e) => handleChange(e.target.value, "houseName")}
                  placeholder={`${t("DFM_HOUSE_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_HOUSE_NAME") })}
                />
              </div>
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.street}
                  name="street"
                  label={`${t("DFM_STREET")}`}
                  mystyle={mystyle}
                /> */}
                <CardLabel>{`${t("DFM_STREET")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="street"
                  value={addressData.street}
                  onChange={(e) => handleChange(e.target.value, "street")}
                  placeholder={`${t("DFM_STREET")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DFM_STREET") })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="Dropdown"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.postOffice}
                  name="postOffice"
                  label={`${t("DFM_POST_OFFICE")}`}
                  selectOptions={postOfficeOptions}
                /> */}
                <CardLabel>{`${t("DFM_POST_OFFICE")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbPostOffice}
                  selected={addressData.postOffice}
                  placeholder={`${t("DFM_POST_OFFICE")}`}
                  select={(e) => handleChange(e, "postOffice")}
                />
              </div>
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInputNumber"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.pincode}
                  name="pincode"
                  label={`${t("DFM_PINCODE")}`}
                  mystyle={mystyle}
                  valid="^\d{6}$"
                /> */}
                <CardLabel>{`${t("DFM_PINCODE")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="pincode"
                  value={addressData.pincode}
                  onChange={(e) => handleChange(e.target.value, "pincode")}
                  placeholder={`${t("DFM_PINCODE")}`}
                  {...(validation = { pattern:"^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_PINCODE") })}
                />
              </div>
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInputNumber"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.resAssociationNo}
                  name="resAssociationNo"
                  label={`${t("DFM_RESASSOCIATION_NUMBER")}`}
                  mystyle={mystyle}
                /> */}
                <CardLabel>{`${t("DFM_RESASSOCIATION_NUMBER")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="resAssociationNo"
                  value={addressData.resAssociationNo}
                  onChange={(e) => handleChange(e.target.value, "resAssociationNo")}
                  placeholder={`${t("DFM_RESASSOCIATION_NUMBER")}`}
                  {...(validation = {
                    pattern: "^[0-9 ]*$",
                    isRequired: true,
                    type: "text",
                    title: t("DFM_INVALID_RESASSOCIATION_NUMBER"),
                  })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.localPlace}
                  name="localPlace"
                  label={`${t("DFM_LOCAL_PLACE")}`}
                  mystyle={mystyle}
                /> */}
                <CardLabel>{`${t("DFM_LOCAL_PLACE")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="localPlace"
                  value={addressData.localPlace}
                  onChange={(e) => handleChange(e.target.value, "localPlace")}
                  placeholder={`${t("DFM_LOCAL_PLACE")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_LOCAL_PLACE") })}
                />
              </div>
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="TextInput"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.mainPlace}
                  name="mainPlace"
                  label={`${t("DFM_MAIN_PLACE")}`}
                  mystyle={mystyle}
                /> */}
                <CardLabel>{`${t("DFM_MAIN_PLACE")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="mainPlace"
                  value={addressData.mainPlace}
                  onChange={(e) => handleChange(e.target.value, "mainPlace")}
                  placeholder={`${t("DFM_MAIN_PLACE")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MAIN_PLACE") })}
                />
              </div>
              <div className="col-md-4">
                {/* <FormInputGroup
                  type="Dropdown"
                  handleChange={handleChange}
                  t={t}
                  value={addressData.wardNo}
                  name="wardNo"
                  label={`${t("DFM_WARD_NO")}`}
                  selectOptions={wardOptions}
                  placeholder={`${t("Ward No")}*`}
                /> */}
                <CardLabel>{`${t("DFM_WARD_NO")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbPostOffice}
                  selected={addressData.wardNo}
                  placeholder={`${t("DFM_WARD_NO")}`}
                  select={(e) => handleChange(e, "wardNo")}
                />
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

export default DFMAddressDetails;
