import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../../utils";

const BrideAddressPresent = ({
  config,
  onSelect,
  userType,
  formData,
  presentaddressCountry,
  setaddressCountry,
  presentaddressStateName,
  setaddressStateName,
  value,
  setValue,
  countryvalue,
  setCountryValue,
  permtaddressCountry,
  setpermtaddressCountry,
  permtaddressStateName,
  setpermtaddressStateName,
  isPrsentAddress,
  setIsPrsentAddress,
  Villagevalues,
  setLbsVillagevalue,
  isEditMarriage = false,
  presentOutsideKeralaDistrict,
  setoutsideKeralaDistrict,
  isBridePresentAddressSameAsGroomPresentAddress,
}) => {
  console.log(formData);
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
  // const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const [isDisableEdit, setisDisableEdit] = useState(false);

  let cmbLB = [];
  let cmbCountry = [];
  let cmbState = [];
  let cmbVillage = [];
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
  // Village &&
  //     Village["common-masters"] && Village["common-masters"].Village &&
  //     Village["common-masters"].Village.map((ob) => {
  //         cmbVillage.push(ob);
  //     });
  let currentLB = [];
  let cmbFilterCountry = [];
  let cmbFilterState = [];
  let cmbFilterVillage = [];

  if (isEditMarriage) {
    if (formData?.BrideAddressDetails?.presentaddressCountry != null) {
      if (cmbCountry.length > 0 && (presentaddressCountry === undefined || presentaddressCountry === "")) {
        cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.BrideAddressDetails?.presentaddressCountry);
        if (cmbFilterCountry.length > 0) {
          setaddressCountry(cmbFilterCountry[0]);
          setCountryValue(cmbFilterCountry[0]?.countrycode);
        }
      }
    }
    if (formData?.BrideAddressDetails?.presentaddressStateName != null) {
      if (cmbState.length > 0 && (presentaddressStateName === undefined || presentaddressStateName === "")) {
        setaddressStateName(cmbState.filter((cmbState) => cmbState.code === formData?.BrideAddressDetails?.presentaddressStateName)[0]);
        setValue(formData?.BrideAddressDetails?.presentaddressStateName);
      }
    }
  }
  const onSkip = () => onSelect();

  function setSelectaddressCountry(value) {
    setaddressCountry(value);
    setCountryValue(value.countrycode);
    if (isPrsentAddress) {
      setpermtaddressCountry(value);
    }
  }
  function setSelectaddressStateName(value) {
    setaddressStateName(value);
    setValue(value.code);
    // if (value.code != "kl") {
    //     setoutsideKeralaDistrict(null);
    //     sessionStorage.setItem("presentOutsideKeralaFlag", true);
    //     sessionStorage.setItem("presentOutsideKeralaStateCode", value.code);
    // } else {
    //     sessionStorage.setItem("presentOutsideKeralaFlag", false);
    //     sessionStorage.removeItem("presentOutsideKeralaStateCode");
    // }
    if (isPrsentAddress) {
      setpermtaddressStateName(value);
    }
  }

  console.log({countryvalue, value, isEditMarriage, formData})

  useEffect(() => {
    if (
      countryvalue === "IND" &&
      value === "kl" &&
      isEditMarriage === false &&
      (formData?.BrideAddressDetails?.presentaddressStateName === null ||
        formData?.BrideAddressDetails?.presentaddressStateName === "" ||
        formData?.BrideAddressDetails?.presentaddressStateName === undefined)
    ) {
      console.log({lb: cmbLB, country: cmbCountry})
      if (cmbLB.length > 0 && cmbCountry.length > 0) {
        console.log({tenantId})
        currentLB = cmbLB?.filter((cmbLB) => cmbLB?.code === tenantId);
        // setAdrsLBName(currentLB[0]);
        console.log({currentLB});
        if (cmbCountry.length > 0 && currentLB.length > 0) {
          console.log("Hi Country")
          cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === currentLB[0].city.countrycode);
          setaddressCountry(cmbFilterCountry[0]);
          if (isPrsentAddress) {
            setpermtaddressCountry(cmbFilterCountry[0]);
          }
          setCountryValue(cmbFilterCountry[0]?.countrycode);
        }
        if (cmbState.length > 0 && currentLB.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.code === currentLB[0].city.statecode);
          setaddressStateName(cmbFilterState[0]);
          if (isPrsentAddress) {
            setpermtaddressStateName(cmbFilterState[0]);
          }
          setValue(cmbFilterState[0]?.code);
        }
        // if (cmbVillage.length > 0 && currentLB.length > 0) {
        //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        //     setLbsVillagevalue(cmbFilterVillage);
        // }
      }
    } else if (
      countryvalue === "IND" &&
      value === "kl" &&
      isEditMarriage === false &&
      formData?.BrideAddressDetails?.presentaddressStateName != "" &&
      formData?.BrideAddressDetails?.presentaddressStateName != null &&
      formData?.BrideAddressDetails?.presentaddressStateName != undefined
    ) {
      console.log("Else If");
      if (cmbLB?.length > 0) {
        currentLB = cmbLB?.filter((cmbLB) => cmbLB?.code === tenantId);
        //console.log(currentLB);
        // setAdrsLBName(currentLB[0]);
        if (cmbCountry.length > 0) {
          cmbFilterCountry = cmbCountry.filter((cmbCountry) => cmbCountry.code === formData?.BrideAddressDetails?.presentaddressCountry.code);
          setaddressCountry(cmbFilterCountry[0]);
          if (isPrsentAddress) {
            setpermtaddressCountry(cmbFilterCountry[0]);
          }
          setCountryValue(cmbFilterCountry[0]?.countrycode);
        }
        if (cmbState.length > 0) {
          cmbFilterState = cmbState.filter((cmbState) => cmbState.code === formData?.BrideAddressDetails?.presentaddressStateName.code);
          setaddressStateName(cmbFilterState[0]);
          if (isPrsentAddress) {
            setpermtaddressStateName(cmbFilterState[0]);
          }
          setValue(cmbFilterState[0]?.code);
        }
        // if (cmbVillage.length > 0 && currentLB.length > 0) {
        //     cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        //     setLbsVillagevalue(cmbFilterVillage);
        // }
      }
    } 
  }, [cmbLB.length, cmbCountry.length, isBridePresentAddressSameAsGroomPresentAddress]);

  const goNext = () => {};
  if (isCountryLoading || isStateLoading || islocalbodiesLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentaddressCountry}> */}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
              </h1>
            </div>
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
                option={sortDropdownNames(cmbCountry ? cmbCountry : [], "code", t)}
                selected={presentaddressCountry}
                select={setSelectaddressCountry}
                disable={isDisableEdit}
              />
            </div>
            {countryvalue === "IND" && (
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CS_COMMON_STATE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={sortDropdownNames(cmbState ? cmbState : [], "code", t)}
                  selected={presentaddressStateName}
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
export default BrideAddressPresent;
