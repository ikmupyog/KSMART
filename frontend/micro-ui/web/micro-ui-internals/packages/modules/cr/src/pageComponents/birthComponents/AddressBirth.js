import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressBirth = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");

  //  const [isInitialRender, setIsInitialRender] = useState(true);
  //  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [addressCountry, setaddressCountry] = useState(formData?.AddressBirthDetails?.addressCountry);
  const [addressStateName, setaddressStateName] = useState(formData?.AddressBirthDetails?.addressStateName);

  const [adrsCountryError, setadrsCountryError] = useState(formData?.AddressDetails?.adrsCountry ? false : false);
  const [adrsStateNameError, setadrsStateNameError] = useState(formData?.AddressDetails?.adrsStateName ? false : false);

  let cmbCountry = [];
  let cmbState = [];

  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });

  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });

  const onSkip = () => onSelect();

  function setSelectaddressCountry(value) {
    setaddressCountry(value);
    console.log("Country" + cmbCountry);
  }
  function setSelectaddressStateName(value) {
    setaddressStateName(value);
    console.log("StateName" + cmbState);
  }

  let cmbfilterCountry = [];
  let cmbfilterState = [];
  useEffect(() => {
    if (cmbCountry.length > 0) {
      cmbfilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.name.includes("India"));
      setaddressCountry(cmbfilterCountry[0]);
    }
    if (cmbState.length > 0) {
      cmbfilterState = cmbState.filter((cmbState) => cmbState.name.includes("Kerala"));
      setaddressStateName(cmbfilterState[0]);
    }
  });

  const goNext = () => {
    if (addressCountry == null) {
      validFlag = false;
      setadrsCountryError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setadrsCountryError(false);
    }
    if (addressStateName == null) {
      validFlag = false;
      setadrsStateNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setadrsStateNameError(false);
    }

    sessionStorage.setItem("addressCountry", addressCountry.code);
    sessionStorage.setItem("addressStateName", addressStateName.code);

    onSelect(config.key, {
      addressCountry,
      addressStateName,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!addressCountry}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbCountry}
                selected={addressCountry}
                select={setSelectaddressCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbState}
                selected={addressStateName}
                select={setSelectaddressStateName}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressBirth;
