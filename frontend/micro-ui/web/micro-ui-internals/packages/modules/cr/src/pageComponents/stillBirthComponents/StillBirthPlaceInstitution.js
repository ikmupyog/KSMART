import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const StillBirthPlaceInstitution = ({ config, onSelect, userType, formData,
  institution, setInstitution, institutionIdMl, setInstitutionIdMl, institutionId, setInstitutionId,
  InstitutionFilterList, setInstitutionFilterList, isInitialRenderInstitutionList, setIsInitialRenderInstitutionList,
  isEditBirth = false
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: institutionType = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionTypePlaceOfEvent");
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "institution");
  // const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(true);
  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("CR_INSTITUTION_LIST");
    setTenantboundary(false);
  }
  // const [Institution, setInstitution] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionId, setInstitutionId] = useState(formData?.BirthPlaceInstitutionDetails?.InstitutionId);
  let cmbInstitution = [];
  let cmbInstitutionList = [];
  institutionType &&
    institutionType["birth-death-service"] && institutionType["birth-death-service"].InstitutionTypePlaceOfEvent &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbInstitution.push(ob);
    });
  institutionidList &&
    institutionidList["egov-location"] && institutionidList["egov-location"].institutionList &&
    institutionidList["egov-location"].institutionList.map((ob) => {
      cmbInstitutionList.push(ob);
    });
  useEffect(() => {
    if (isInitialRenderInstitutionList) {
      if (institution) {
        setInstitutionFilterList(cmbInstitutionList.filter((cmbInstitutionList) => cmbInstitutionList.placeofEventCodeNew === institution.code));
        setIsInitialRenderInstitutionList(false);
      }
    }
  }, [InstitutionFilterList, isInitialRenderInstitutionList])

  const onSkip = () => onSelect();

  function setselectInstitution(value) {
    setInstitution(value);
    setInstitutionId(null);
    setInstitutionIdMl(null);
    setIsInitialRenderInstitutionList(true);
  }
  function setselectInstitutionId(value) {
    setInstitutionId(value);
    setInstitutionIdMl(value);
  }
  function setselectInstitutionIdMl(value) {
    setInstitutionIdMl(value);
  }
  const goNext = () => {
  };
  if (isinstitutionLoad || isinstitutionidLoad) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!institution}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                option={cmbInstitution}
                selected={institution}
                select={setselectInstitution}
                placeholder={`${t("CR_INSTITUTION_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="institutionName"
                option={InstitutionFilterList}
                selected={institutionId}
                select={setselectInstitutionId}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_ML")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="institutionNamelocal"
                option={InstitutionFilterList}
                selected={institutionIdMl}
                select={setselectInstitutionIdMl}
                placeholder={`${t("CR_INSTITUTION_NAME_ML")}`}
                disable={true}
              />
            </div>
          </div>
        </FormStep>
      </React.Fragment>
    );
};
export default StillBirthPlaceInstitution;