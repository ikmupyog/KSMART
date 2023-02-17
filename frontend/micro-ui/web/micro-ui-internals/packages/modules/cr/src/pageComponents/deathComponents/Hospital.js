import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
const Hospital = ({ config, onSelect, userType, formData, DeathPlaceType, selectDeathPlaceType, HospitalNameMl, selectHospitalNameMl, }) => {
  const { t } = useTranslation();
  let validation = {};
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  // const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.HospitalDetails?.DeathPlaceType);
  // const [HospitalNameMl, selectHospitalNameMl] = useState(formData?.HospitalDetails?.HospitalNameMl);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [isInitialRender, setIsInitialRender] = useState(true);
  let cmbhospital = [];
  let cmbhospitalMl = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });

  useEffect(() => {
    if (isInitialRender) {
      if (DeathPlaceType) {
        cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.DeathPlaceType === DeathPlaceType.DeathPlaceType);
        selectHospitalNameMl(cmbhospitalMl[0]);
        setIsInitialRender(false);
      }
    }
  }, [cmbhospitalMl, isInitialRender]);


  useEffect(() => {}, []);
  const onSkip = () => onSelect();
  function setselectDeathPlaceType(value) {
    selectDeathPlaceType(value);
    setIsInitialRender(true);
  }
  function setselectHospitalNameMl(value) {
    selectHospitalNameMl(value);
  }
  const goNext = () => {
    // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null );
    // sessionStorage.setItem("HospitalNameMl", HospitalNameMl.DeathPlaceType);
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
        <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_HOSPITAL_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={true}
                option={cmbhospital}
                selected={DeathPlaceType}
                select={setselectDeathPlaceType}
                placeholder={`${t("CR_HOSPITAL_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_HOSPITAL_ML")}`}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalNamelocal"
                isMandatory={false}
                option={cmbhospital}
                selected={HospitalNameMl}
                select={setselectHospitalNameMl}
                placeholder={`${t("CR_HOSPITAL_ML")}`}
                disable={true}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default Hospital;
