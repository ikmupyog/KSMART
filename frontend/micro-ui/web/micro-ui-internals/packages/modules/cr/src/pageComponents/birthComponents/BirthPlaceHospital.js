import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { sortDropdownNames } from "../../utils";

const BirthPlaceHospital = ({ config, onSelect, userType, formData, selectHospitalName, hospitalName, hospitalNameMl,
  selectHospitalNameMl, isEditBirth, hospitalCode, isDisableEditRole, setisDisableEditRole
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isDisableEdit, setisDisableEdit] = useState(false);

  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
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

  if (isEditBirth) {
    if (formData?.ChildDetails?.hospitalCode != null) {
      if (cmbhospital.length > 0 && (hospitalName === undefined || hospitalName === "")) {
        selectHospitalName(cmbhospital.filter(cmbhospital => cmbhospital.code === formData?.ChildDetails?.hospitalCode)[0]);
        cmbhospitalMl = cmbhospital.filter(cmbhospital => cmbhospital.code === formData?.ChildDetails?.hospitalCode)[0];
        selectHospitalNameMl(cmbhospitalMl);
      }
    }
  }
  useEffect(() => {
    if (isInitialRender) {

      if (formData?.ChildDetails?.hospitalCode != null && formData?.ChildDetails?.hospitalCode != "" && formData?.ChildDetails?.hospitalCode != undefined) {
        if (cmbhospital.length > 0) {
          cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.code === formData?.ChildDetails?.hospitalCode);
          selectHospitalName(cmbhospitalMl[0]);
          selectHospitalNameMl(cmbhospitalMl[0]);
          setIsInitialRender(false);
        }
      } else if (formData?.ChildDetails?.hospitalName != null && formData?.ChildDetails?.hospitalName != "" && formData?.ChildDetails?.hospitalName != undefined) {
        if (cmbhospital.length > 0) {
          cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.code === formData?.ChildDetails?.hospitalName.code);
          selectHospitalName(cmbhospitalMl[0]);
          selectHospitalNameMl(cmbhospitalMl[0]);
          setIsInitialRender(false);
        }
      } else if (hospitalCode != null) {
        if (cmbhospital.length > 0) {
          cmbhospitalMl = cmbhospital.filter((cmbhospital) => cmbhospital.code === hospitalCode);
          selectHospitalName(cmbhospital.filter((cmbhospital) => cmbhospital.code === hospitalCode)[0]);
          selectHospitalNameMl(cmbhospital.filter((cmbhospital) => cmbhospital.code === hospitalCode)[0]);
          setIsInitialRender(false);
        }
      }
    }

  }, [cmbhospital, isInitialRender])
  const onSkip = () => onSelect();

  function setselectHospitalName(value) {
    selectHospitalName(value);
    selectHospitalNameMl(value);
    // setIsInitialRender(true);
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
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!hospitalName}> */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span className="headingline">{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_HOSPITAL_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={true}
                option={sortDropdownNames(cmbhospital ? cmbhospital : [], "hospitalName", t)}
                selected={hospitalName}
                select={setselectHospitalName}
                disable={isDisableEditRole}
                placeholder={`${t("CR_HOSPITAL_EN")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_HOSPITAL_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalNamelocal"
                isMandatory={true}
                option={sortDropdownNames(cmbhospital ? cmbhospital : [], "hospitalNamelocal", t)}
                selected={hospitalNameMl}
                select={setselectHospitalNameMl}
                placeholder={`${t("CR_HOSPITAL_ML")}`}
                disable={true}
              />
            </div>
          </div>
        </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default BirthPlaceHospital;