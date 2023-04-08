import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
const Hospital = ({
  config,
  onSelect,
  userType,
  formData,
  DeathPlaceType,
  selectDeathPlaceType,
  HospitalNameMl,
  selectHospitalNameMl,
  isEditDeath,
}) => {
  const { t } = useTranslation();  
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tenantboundary, setTenantboundary] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);
  if (tenantboundary) {
    queryClient.removeQueries("CR_HOSPITALMASTER");
    setTenantboundary(false);
  }
  let cmbhospital = [];
  let cmbhospitalMl = [];
  hospitalData &&
    hospitalData["egov-location"] && hospitalData["egov-location"].hospitalList &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  if (isEditDeath) {
    if (formData?.InformationDeath?.DeathPlaceType != null) {
      if (cmbhospital.length > 0 && (DeathPlaceType === undefined || DeathPlaceType === "")) {
        selectDeathPlaceType(cmbhospital.filter((cmbhospital) => cmbhospital.code === formData?.InformationDeath?.DeathPlaceType)[0]);
        cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.code === formData?.InformationDeath?.DeathPlaceType)[0];
        selectHospitalNameMl(cmbhospitalMl);
      }
    }
  }
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.InformationDeath?.DeathPlaceType) {
        selectHospitalNameMl(HospitalNameMl);
        setIsInitialRender(false);
      } else {
        cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.hospitalName === DeathPlaceType.hospitalName);
        selectHospitalNameMl(cmbhospitalMl[0]);
        setIsInitialRender(false);
      }
    }
  }, [cmbhospitalMl, isInitialRender]);

  const onSkip = () => onSelect();
  function setselectDeathPlaceType(value) {
    selectDeathPlaceType(value);
    setIsInitialRender(true);
  }
  function setselectHospitalNameMl(value) {
    selectHospitalNameMl(value);
  }
  const goNext = () => {  
  };
  if (isLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
      
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!DeathPlaceType}> */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
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
              <div className="col-md-6">
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
          </div>

        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default Hospital;
