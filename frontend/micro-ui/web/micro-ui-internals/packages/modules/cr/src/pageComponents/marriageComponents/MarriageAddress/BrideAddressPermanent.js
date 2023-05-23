import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../../utils";

const BrideAddressPermanent = ({
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
  isEditMarriage = false,
  isBridePresentAddressSameAsGroomPresentAddress,
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
  const [isDisableEdit, setisDisableEdit] = useState(false);

  let cmbLB = [];
  let cmbCountry = [];
  let cmbState = [];

  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  let currentLB = [];
  let cmbFilterCountry = [];
  let cmbFilterState = [];

  console.log({ countryValuePermanent, valuePermanent, isPrsentAddress });

  useEffect(() => {
    if (isPrsentAddress) {
      console.log("1")
      if (cmbLB.length > 0 && cmbCountry.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        if (cmbCountry.length > 0 && currentLB.length > 0) {
          cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
          setpermtaddressCountry(cmbFilterCountry[0]);
          //setCountryValue(cmbFilterCountry[0].countrycode);
          setCountryValuePermanent(cmbFilterCountry[0].countrycode);
        }
        if (cmbState.length > 0 && currentLB.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
          setpermtaddressStateName(cmbFilterState[0]);
          //setValue(cmbFilterState[0].statecode);
          setValuePermanent(cmbFilterState[0].statecode);
        }
      }
    } else if (
      isPrsentAddress === false &&
      countryValuePermanent === "IND" &&
      valuePermanent === "kl" &&
      (formData?.BrideAddressDetails?.permtaddressStateName === null ||
        formData?.BrideAddressDetails?.permtaddressStateName === "" ||
        formData?.BrideAddressDetails?.permtaddressStateName === undefined)
    ) {
      console.log("2")
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        if (cmbCountry.length > 0 && currentLB.length > 0) {
          cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
          setpermtaddressCountry(cmbFilterCountry[0]);
          setCountryValuePermanent(cmbFilterCountry[0].countrycode);
        }
        if (cmbState.length > 0 && currentLB.length > 0) {
          console.log({cmbState, currentLB})
          cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
          // console.log("test",cmbFilterState);
          setpermtaddressStateName(cmbFilterState[0]);
          // console.log(cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode)[0].code);
          setValuePermanent(cmbFilterState[0]?.code);
        }
      }
    } else if (
      isPrsentAddress === false &&
      countryValuePermanent === "IND" &&
      valuePermanent === "kl" &&
      formData?.BrideAddressDetails?.permtaddressStateName != null
    ) {
      console.log("3")
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        if (cmbCountry.length > 0 && currentLB.length > 0) {
          cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
          setpermtaddressCountry(cmbFilterCountry[0]);
          setCountryValuePermanent(cmbFilterCountry[0].countrycode);
        }
        if (cmbState.length > 0 && currentLB.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
          // console.log("test",cmbFilterState);
          setpermtaddressStateName(cmbFilterState[0]);
          // console.log(cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode)[0].code);
          setValuePermanent(cmbFilterState[0]?.code);
        }
      }
    }
  }, [isPrsentAddress, isBridePresentAddressSameAsGroomPresentAddress, localbodies, cmbLB.length, cmbCountry.length]);

  if (isEditMarriage) {
    if (formData?.BrideAddressDetails?.permtaddressCountry != null) {
      if (cmbCountry.length > 0 && (permtaddressCountry === undefined || permtaddressCountry === "")) {
        cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.BrideAddressDetails?.permtaddressCountry);
        if (cmbFilterCountry.length > 0) {
          setpermtaddressCountry(cmbFilterCountry[0]);
          setCountryValuePermanent(cmbFilterCountry[0].countrycode);
        }
      }
    }
    if (formData?.BrideAddressDetails?.permtaddressStateName != null) {
      if (cmbState.length > 0 && (permtaddressStateName === undefined || permtaddressStateName === "")) {
        setpermtaddressStateName(cmbState.filter((cmbState) => cmbState.code === formData?.BrideAddressDetails?.permtaddressStateName)[0]);
        setValuePermanent(formData?.BrideAddressDetails?.permtaddressStateName);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectaddressCountry(value) {
    setpermtaddressCountry(value);
    // setCountryValue(value.countrycode);
    setCountryValuePermanent(value.countrycode);
  }
  function setSelectaddressStateName(value) {
    setpermtaddressStateName(value);
    setValuePermanent(value.code);
  }

  const goNext = () => {};
  if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} > */}

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
                option={sortDropdownNames(cmbCountry ? cmbCountry : [], "name", t)}
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
                  option={sortDropdownNames(cmbState ? cmbState : [], "name", t)}
                  selected={permtaddressStateName}
                  select={setSelectaddressStateName}
                  disable={isDisableEdit}
                />
              </div>
            )}
          </div>
        </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default BrideAddressPermanent;
