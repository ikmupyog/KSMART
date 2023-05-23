import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { sortDropdownNames } from "../../utils";

const StillBirthPlaceInstitution = ({ config, onSelect, userType, formData,
  institution, setInstitution, institutionIdMl, setInstitutionIdMl, institutionId, setInstitutionId,
  InstitutionFilterList, setInstitutionFilterList, isInitialRenderInstitutionList, setIsInitialRenderInstitutionList,
  isEditStillBirth = false
}) => {
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
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
  let cmbInstitutionType = [];
  let cmbInstitutionList = [];
  institutionType &&
    institutionType["birth-death-service"] && institutionType["birth-death-service"].InstitutionTypePlaceOfEvent &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbInstitutionType.push(ob);
    });
  institutionidList &&
    institutionidList["egov-location"] && institutionidList["egov-location"].institutionList &&
    institutionidList["egov-location"].institutionList.map((ob) => {
      cmbInstitutionList.push(ob);
    });
  if (isEditStillBirth) {
    if (formData?.StillBirthChildDetails?.institutionTypeCode != null) {
      if (cmbInstitutionType.length > 0 && (institution === undefined || institution === "")) {
        setInstitution(cmbInstitutionType.filter(cmbInstitutionType => cmbInstitutionType.code === formData?.StillBirthChildDetails?.institutionTypeCode)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.institutionNameCode != null) {      
      if (cmbInstitutionList.length > 0 && (institutionId === undefined || institutionId === "")) {
        setInstitutionId(cmbInstitutionList.filter(cmbInstitutionList => cmbInstitutionList.code === formData?.StillBirthChildDetails?.institutionNameCode)[0]);
        setInstitutionIdMl(cmbInstitutionList.filter(cmbInstitutionList => cmbInstitutionList.code === formData?.StillBirthChildDetails?.institutionNameCode)[0]);
      }
    }
  }
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
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!institution}> */}
        
        <div className="col-md-12">
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
                // optionKey="name"
                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                option={sortDropdownNames(cmbInstitutionType ? cmbInstitutionType : [],"name",t)}
                selected={institution}
                select={setselectInstitution}
                disable={isDisableEdit}
                placeholder={`${t("CR_INSTITUTION_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>              
              <Dropdown
                t={t}
                optionKey="institutionName"
                option={sortDropdownNames(InstitutionFilterList ? InstitutionFilterList : [],"institutionName",t)}
                selected={institutionId}
                select={setselectInstitutionId}
                disable={isDisableEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel> 
              <Dropdown
                t={t}
                optionKey="institutionNamelocal"
                option={sortDropdownNames(InstitutionFilterList ? InstitutionFilterList : [],"institutionNamelocal",t)}
                selected={institutionIdMl}
                select={setselectInstitutionIdMl}
                placeholder={`${t("CR_INSTITUTION_NAME_ML")}`}
                disable={true}
              />
            </div>
          </div>
          </div>
        
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default StillBirthPlaceInstitution;