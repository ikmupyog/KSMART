import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathHospital = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "hospitalList");
  const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.HospitalDetails?.SignedOfficerName);
  const [HospitalName, selectHospitalName] = useState(formData?.HospitalDetails?.HospitalName);
  const [setDesignation, setSelectedDesignation] = useState(formData?.HospitalDetails?.setDesignation);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [HospitalAadhaar, setHospitalAadhaar] = useState(formData?.HospitalDetails?.HospitalAadhaar);
  const [HospitalMobile, setHospitalMobile] = useState(formData?.HospitalDetails?.HospitalMobile);

  // const [TradeName, setTradeName] = useState(null);
  // const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbhospital = [];
  hospital &&
    hospital["birth-death-service"] &&
    hospital["birth-death-service"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });

  const onSkip = () => onSelect();

  function setselectHospitalName(value) {
    selectHospitalName(value);
  }
  function setselectSignedOfficerName(value) {
    selectSignedOfficerName(value);
  }
  function selectDesignation(value) {
    setSelectedDesignation(value);
  }

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function setSelectHospitalAadhaar(e) {
    setHospitalAadhaar(e.target.value);
  }
  function setSelectHospitalMobile(e) {
    setHospitalMobile(e.target.value);
  }

  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("SignedOfficerName", SignedOfficerName);
    sessionStorage.setItem("HospitalName", HospitalName);
    sessionStorage.setItem("setDesignation", setDesignation.code);
    sessionStorage.setItem("HospitalAadhaar", HospitalAadhaar);
    sessionStorage.setItem("HospitalMobile", HospitalMobile);

    onSelect(config.key, { SignedOfficerName, HospitalName, setDesignation, HospitalAadhaar, HospitalMobile });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_HOSPITAL")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CardLabel>{`${t("CR_HOSPITAL")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
              selected={HospitalName}
              select={setselectHospitalName}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{`${t("CR_SIGNED_OFFICER")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
              selected={SignedOfficerName}
              select={setselectSignedOfficerName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_SIGNED_OFFICER_DESIGNATION")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbPlace}
              selected={setDesignation}
              select={selectDesignation}
              disabled={isEdit}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="HospitalAadhaar"
              value={HospitalAadhaar}
              onChange={setSelectHospitalAadhaar}
              disable={isEdit}
              {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} 
             
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_MOBILE_NO")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="HospitalMobile"
              value={HospitalMobile}
              onChange={setSelectHospitalMobile}
              disable={isEdit}
              {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false,title: t("CR_INVALID_MOBILE_NO") })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathHospital;
