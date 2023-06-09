import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { sortDropdownNames } from "../../utils";
const Institution = ({
  config,
  onSelect,
  userType,
  formData,
  institution,
  selectinstitution,
  DeathPlaceInstId,
  setSelectedDeathPlaceInstId,
  InstitutionIdMl,
  setInstitutionIdMl,
  InstitutionFilterList,
  setInstitutionFilterList,
  isInitialRenderInstitutionList,
  setIsInitialRenderInstitutionList,
  isEditDeath  = false
}) => { 
  const [isDisableEdit, setisDisableEdit] = useState(isEditDeath ? isEditDeath : false);
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const { t } = useTranslation();
  let validation = {};

  const { data: institutionType = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "InstitutionTypePlaceOfEvent"
  );
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "institution");
  const [tenantboundary, setTenantboundary] = useState(false);
  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("CR_INSTITUTION_LIST");
    setTenantboundary(false);
  }
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const [institution, selectinstitution] = useState(formData?.Institution?.institution);
  // const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(formData?.Institution?.DeathPlaceInstId);
  // const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.Institution?.DeathPlaceInstId);

  let cmbinstitutionType = [];
  institutionType &&
    institutionType["birth-death-service"] &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbinstitutionType.push(ob);
    });
  let cmbInstitutionList = [];
  institutionidList &&
    institutionidList["egov-location"] &&
    institutionidList["egov-location"].institutionList &&
    institutionidList["egov-location"].institutionList.map((ob) => {
      cmbInstitutionList.push(ob);
    });
  if (isEditDeath) {
    if (formData?.InformationDeath?.institutionTypeCode != null) {
      if (cmbinstitutionType.length > 0 && (institution === undefined || institution === "")) {
        selectinstitution(
          cmbinstitutionType.filter((cmbinstitutionType) => cmbinstitutionType.code === formData?.InformationDeath?.institutionTypeCode)[0]
        );
      }
    }
    if (formData?.InformationDeath?.institutionNameCode != null) {
      if (cmbInstitutionList.length > 0 && (DeathPlaceInstId === undefined || DeathPlaceInstId === "")) {
        setSelectedDeathPlaceInstId(
          cmbInstitutionList.filter((cmbInstitutionList) => cmbInstitutionList.code === formData?.InformationDeath?.institutionNameCode)[0]
        );
        setInstitutionIdMl(
          cmbInstitutionList.filter((cmbInstitutionList) => cmbInstitutionList.code === formData?.InformationDeath?.institutionNameCode)[0]
        );
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
  }, [InstitutionFilterList, isInitialRenderInstitutionList]);

  const onSkip = () => onSelect();

  function setselectinstitution(value) {
    selectinstitution(value);
    setSelectedDeathPlaceInstId(null);
    setInstitutionIdMl(null);
    setIsInitialRenderInstitutionList(true);
  }
  function selectDeathPlaceInstId(value) {
    setSelectedDeathPlaceInstId(value);
    setInstitutionIdMl(value);
  }
  function setselectInstitutionIdMl(value) {
    setInstitutionIdMl(value);
  }

  // useEffect(() => {

  //   if (isInitialRender) {
  //     if (institutionType === "INSTITUTION") {
  //     if (formData?.InformationDeath?.DeathPlaceInstId){
  //       selectDeathPlaceInstId(DeathPlaceInstId);
  //       setIsInitialRender(false);
  //     }else {
  //       cmbInstitutionIdMl = cmbInstitutionId.filter((cmbInstitutionId) => cmbInstitutionId.name === DeathPlaceInstId.name);
  //       setInstitutionIdMl(cmbInstitutionIdMl[0]);
  //       setIsInitialRender(false);
  //     }
  //   }
  // }
  // }, [cmbInstitutionIdMl, isInitialRender])

  const goNext = () => {
    onSelect(config.key, {
      // institution,
      // DeathPlaceInstId,
    });
  };
  if (isinstitutionLoad || isinstitutionidLoad) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!institution}>   */}
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INSTITUTION_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}              
                option={sortDropdownNames(cmbinstitutionType ? cmbinstitutionType : [],"name",t)}
                selected={institution}
                select={setselectinstitution}
                disable={isDisableEdit}
                placeholder={`${t("CR_INSTITUTION_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INSTITUTION_NAME_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="institutionName"
                isMandatory={true}
                option={InstitutionFilterList}
                selected={DeathPlaceInstId}
                select={selectDeathPlaceInstId}
                disable={isDisableEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_ML")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="institutionNamelocal"
                isMandatory={true}
                option={InstitutionFilterList}
                selected={InstitutionIdMl}
                select={setselectInstitutionIdMl}
                placeholder={`${t("CR_INSTITUTION_NAME_ML")}`}
                disable={true}
              />
            </div>
          </div>
        </div>
        {/* </FormStep> */}
      </div>
    </React.Fragment>
  );
};
export default Institution;
