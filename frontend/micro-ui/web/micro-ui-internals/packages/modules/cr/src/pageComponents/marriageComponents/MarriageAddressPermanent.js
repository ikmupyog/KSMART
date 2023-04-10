import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const MarriageAddressPermanent = ({
  config,
  onSelect,
  userType,
  formData,
  permtaddressCountry,
  setpermtaddressCountry,
  permtaddressStateName,
  setpermtaddressStateName,
  value,
  setValue,
  countryvalue,
  setCountryValue,
  isPrsentAddress,
  setIsPrsentAddress,
  countryValuePermanent,
  setCountryValuePermanent,
  valuePermanent,
  setValuePermanent,
  isEditBirth = false,
  isEditDeath = false,
  isEditStillBirth = false,
  isEditAdoption,
  // isInitialRender, setIsInitialRender
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : isEditDeath ? false : isEditStillBirth ? isEditStillBirth : false);

  let cmbLB = [];
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
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  let currentLB = [];
  let cmbFilterCountry = [];
  let cmbFilterState = [];
  useEffect(() => {
    if (isInitialRender && isPrsentAddress) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0]?.city?.countrycode);
        setpermtaddressCountry(cmbFilterCountry[0]);
        setCountryValue(cmbFilterCountry[0]?.countrycode);
        setCountryValuePermanent(cmbFilterCountry[0]?.countrycode);
        cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0]?.city?.statecode);
        setpermtaddressStateName(cmbFilterState[0]);
        setValue(cmbFilterState[0]?.statecode);
        setValuePermanent(cmbFilterState[0]?.statecode);
        setIsInitialRender(false);
      }
    } else {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry?.code === currentLB[0]?.city?.countrycode);
        setpermtaddressCountry(cmbFilterCountry[0]);
        setCountryValuePermanent(cmbFilterCountry[0]?.countrycode);
        cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0]?.city?.statecode);
        setpermtaddressStateName(cmbFilterState[0]);
        setValuePermanent(cmbFilterState[0]?.statecode);
        setIsInitialRender(false);
      }
    }
  }, [Country, State, localbodies, isInitialRender]);
  if (isEditBirth) {
    if (formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry != null) {
      if (cmbCountry.length > 0 && (permtaddressCountry === undefined || permtaddressCountry === "")) {
        setpermtaddressCountry(
          cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry)[0]
        );
        setCountryValuePermanent(value.formData?.ChildDetails?.AddressBirthDetails?.permtaddressCountry);
      }
    }
    if (formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName != null) {
      if (cmbState.length > 0 && (permtaddressStateName === undefined || permtaddressStateName === "")) {
        setpermtaddressStateName(
          cmbState.filter((cmbState) => cmbState.code === formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName)[0]
        );
        setValuePermanent(value.formData?.ChildDetails?.AddressBirthDetails?.permtaddressStateName);
      }
    }
  } else if (isEditAdoption !== false) {
    if (formData?.AdoptionAddressBasePage?.permtaddressCountry != null) {
      if (cmbCountry.length > 0 && (permtaddressCountry === undefined || permtaddressCountry === "")) {
        setpermtaddressCountry(cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.AdoptionAddressBasePage?.permtaddressCountry)[0]);
        setCountryValuePermanent(value.formData?.AdoptionAddressBasePage?.permtaddressCountry);
      }
    }
    if (formData?.AdoptionAddressBasePage?.permtaddressStateName != null) {
      if (cmbState.length > 0 && (permtaddressStateName === undefined || permtaddressStateName === "")) {
        setpermtaddressStateName(cmbState.filter((cmbState) => cmbState.code === formData?.AdoptionAddressBasePage?.permtaddressStateName)[0]);
        setValuePermanent(value.formData?.AdoptionAddressBasePage?.permtaddressStateName);
      }
    }
  } else if (isEditDeath) {
    if (formData?.AddressBirthDetails?.permtaddressCountry != null) {
      if (cmbCountry.length > 0 && (permtaddressCountry === undefined || permtaddressCountry === "")) {
        setpermtaddressCountry(cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.AddressBirthDetails?.permtaddressCountry)[0]);
        setCountryValuePermanent(value.formData?.AddressBirthDetails?.permtaddressCountry);
      }
    }
    if (formData?.AddressBirthDetails?.permtaddressStateName != null) {
      if (cmbState.length > 0 && (permtaddressStateName === undefined || permtaddressStateName === "")) {
        setpermtaddressStateName(cmbState.filter((cmbState) => cmbState.code === formData?.AddressBirthDetails?.permtaddressStateName)[0]);
        setValuePermanent(value.formData?.AddressBirthDetails?.permtaddressStateName);
      }
    }
  } else if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry != null) {
      if (cmbCountry.length > 0 && (permtaddressCountry === undefined || permtaddressCountry === "")) {
        setpermtaddressCountry(
          cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry)[0]
        );
        setCountryValuePermanent(value.formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressCountry);
      }
    }
    if (formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName != null) {
      if (cmbState.length > 0 && (permtaddressStateName === undefined || permtaddressStateName === "")) {
        setpermtaddressStateName(
          cmbState.filter((cmbState) => cmbState.code === formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName)[0]
        );
        setValuePermanent(value.formData?.StillBirthChildDetails?.AddressBirthDetails?.permtaddressStateName);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectaddressCountry(value) {
    setpermtaddressCountry(value);
    // setCountryValue(value.countrycode);
    setCountryValuePermanent(value?.countrycode);
  }
  function setSelectaddressStateName(value) {
    setpermtaddressStateName(value);
    // setValue(value.statecode);
    setValuePermanent(value.statecode);
  }

  const goNext = () => {};
  if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="row">
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
                selected={permtaddressCountry}
                select={setSelectaddressCountry}
                disable={isDisableEdit}
              />
            </div>
            {countryValuePermanent === "IND" && (
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
                  selected={permtaddressStateName}
                  select={setSelectaddressStateName}
                  disable={isDisableEdit}
                />
              </div>
            )}
          </div>
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageAddressPermanent;
