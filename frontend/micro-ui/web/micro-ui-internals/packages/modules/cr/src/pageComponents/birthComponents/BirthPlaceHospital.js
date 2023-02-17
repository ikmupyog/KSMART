import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthPlaceHospital = ({ config, onSelect, userType, formData, selectHospitalName, hospitalName, hospitalNameMl,
  selectHospitalNameMl,
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "hospital");
  // const [HospitalName, selectHospitalName] = useState(formData?.BirthPlaceHospitalDetails?.HospitalName);
  // const [HospitalNameMl, selectHospitalNameMl] = useState(formData?.BirthPlaceHospitalDetails?.HospitalNameMl);
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
      if (hospitalName) {
        cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.hospitalName === hospitalName.hospitalName);
        selectHospitalNameMl(cmbhospitalMl[0]);
        setIsInitialRender(false);
      }
    }
  }, [cmbhospitalMl, isInitialRender])
  const onSkip = () => onSelect();

  function setselectHospitalName(value) {
    selectHospitalName(value);
    setIsInitialRender(true);
  }
  function setselectHospitalNameMl(value) {
    selectHospitalNameMl(value);
  }


  const goNext = () => {
    // sessionStorage.setItem("HospitalName", HospitalName.hospitalName);
    // sessionStorage.setItem("HospitalNameMl", HospitalNameMl.hospitalName);

    // onSelect(config.key, { HospitalName, HospitalNameMl
    // });
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null} */}
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!hospitalName}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {`${t("CR_HOSPITAL_EN")}`}
              {/* <span className="mandatorycss">*</span> */}
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="hospitalName"
              isMandatory={false}
              option={cmbhospital}
              selected={hospitalName}
              select={setselectHospitalName}
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
              selected={hospitalNameMl}
              select={setselectHospitalNameMl}
              placeholder={`${t("CR_HOSPITAL_ML")}`}
              disable={true}
            />
          </div>
        </div>

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceHospital;