import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPermanent = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  //  const { data: boundaryList = {}, iswLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [lbs, setLbs] = useState(0);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [permtaddressCountry, setpermtaddressCountry] = useState(formData?.BirthAddresspermtDetails?.permtaddressCountry);
  const [permtaddressStateName, setpermtaddressStateName] = useState(formData?.BirthAddresspermtDetails?.permtaddressStateName);

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

  function setSelectpermtaddressCountry(value) {
    setpermtaddressCountry(value);
    console.log("Country" + cmbCountry);
  }
  function setSelectpermtaddressStateName(value) {
    setpermtaddressStateName(value);
    console.log("StateName" + cmbState);
  }

  const goNext = () => {
    sessionStorage.setItem("permtaddressCountry", permtaddressCountry.code);
    sessionStorage.setItem("permtaddressStateName", permtaddressStateName.code);

    onSelect(config.key, {
      permtaddressCountry,
      permtaddressStateName,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!permtaddressCountry}>
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
                selected={permtaddressCountry}
                select={setSelectpermtaddressCountry}
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
                selected={permtaddressStateName}
                select={setSelectpermtaddressStateName}
                disabled={isEdit}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanent;
