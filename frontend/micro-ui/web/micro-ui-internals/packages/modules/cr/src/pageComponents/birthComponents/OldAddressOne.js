import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  BackButton,
  CheckBox,
  Toast,
  LabelFieldPair,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const Address = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");

  const [toast, setToast] = useState(false);
  const [PresentCountryError, setPresentCountryError] = useState(formData?.AddressDetails?.PresentCountry ? false : false);
  const [PresentStateNameError, setPresentStateNameError] = useState(formData?.AddressDetails?.PresentStateName ? false : false);

  const [PresentCountry, setPresentCountry] = useState(formData?.AddressDetails?.PresentCountry ? formData?.AddressDetails?.PresentCountry : null);
  const [PresentStateName, setPresentStateName] = useState(
    formData?.AddressDetails?.PresentStateName ? formData?.AddressDetails?.PresentStateName : null
  );

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

  let cmbfilterCountry = [];
  let cmbfilterState = [];

  useEffect(() => {
    if (cmbCountry.length > 0) {
      cmbfilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.name.includes("India"));
      setPresentCountry(cmbfilterCountry[0]);
    }
    if (cmbState.length > 0) {
      cmbfilterState = cmbState.filter((cmbState) => cmbState.name.includes("Kerala"));
      setPresentStateName(cmbfilterState[0]);
    }
  }, [Country, State]);

  const onSkip = () => onSelect();

  function setSelectPresentCountry(value) {
    setPresentCountry(value);
  }
  function setSelectPresentStateName(value) {
    setPresentStateName(value);
  }

  let validFlag = true;
  const goNext = () => {
    if (PresentCountry == null) {
      validFlag = false;
      setPresentCountryError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setPresentCountryError(false);
    }
    if (PresentStateName == null) {
      validFlag = false;
      setPresentStateNameError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setPresentStateNameError(false);
    }

    if (validFlag === true) {
      sessionStorage.setItem("PresentCountry", PresentCountry ? PresentCountry.code : null);
      sessionStorage.setItem("PresentStateName", PresentStateName ? PresentStateName.code : null);

      onSelect(config.key, {
        PresentCountry,
        PresentStateName,
      });
    }
  };

  if (isCountryLoading || isStateLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARANT_ADDRESS_TIME_OF_BIRTH")}`}</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbCountry} selected={PresentCountry} select={setSelectPresentCountry} />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_STATE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbState} selected={PresentStateName} select={setSelectPresentStateName} />
            </div>
          </div>
        </div>

        {toast && (
          <Toast
            error={PresentCountryError || PresentStateNameError}
            label={
              PresentCountryError || PresentStateNameError
                ? PresentCountryError
                  ? t(`BIRTH_ERROR_PRESENT_COUNTRY_CHOOSE`)
                  : PresentStateNameError
                  ? t(`BIRTH_ERROR_PRESENT_STATE_CHOOSE`)
                  : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment>
  );
};
export default Address;
