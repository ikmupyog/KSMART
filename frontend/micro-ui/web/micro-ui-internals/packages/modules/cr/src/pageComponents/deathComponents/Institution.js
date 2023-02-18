import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,BackButton} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const Institution = ({ config, onSelect, userType, formData, DeathPlaceType, selectDeathPlaceType, DeathPlaceInstId, setSelectedDeathPlaceInstId,InstitutionIdMl, setInstitutionIdMl
 }) => {
  // console.log("stateId");

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  
  // tenantId = 'kl.cochin';
  const { t } = useTranslation();
  let validation = {};
  const { data: institutionType = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionTypePlaceOfEvent");
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "institution");
  
  // const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.Institution?.DeathPlaceType);
  // const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(formData?.Institution?.DeathPlaceInstId); 
  // const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.Institution?.DeathPlaceInstId);
 
  let naturetypecmbvalue = null;
  let cmbinstitutionType = [];
  institutionType &&
  institutionType["birth-death-service"] &&
  institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
    cmbinstitutionType.push(ob);
  });
  let cmbInstitutionId = [];
  institutionidList &&
  institutionidList["egov-location"] &&
  institutionidList["egov-location"].institutionList.map((ob) => {
    cmbInstitutionId.push(ob);
  });
  
   console.log(institutionidList);
  // let cmbInstitution = [];
  // institution &&
  //   institution["birth-death-service"] &&
  //   institution["birth-death-service"].InstitutionType.map((ob) => {
  //     cmbInstitution.push(ob);
  //   });
    
    

  const onSkip = () => onSelect();

  function setselectDeathPlaceType(value) {
    selectDeathPlaceType(value);
    setIsInitialRender(true);
  }
  function selectDeathPlaceInstId(value) {
    setSelectedDeathPlaceInstId(value);
    setIsInitialRender(true);
  } 
  function setselectInstitutionIdMl(value) {
    setInstitutionIdMl(value);
  }
  const goNext = () => {
    // sessionStorage.setItem("DeathPlaceType", DeathPlaceType.code);
    // sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId.code);
           
    
    onSelect(config.key, { 
      // DeathPlaceType,
      // DeathPlaceInstId,
        
    });
  };
  if ( isinstitutionidLoad) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!DeathPlaceType}>  
      <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>
            </h1>
          </div>
        </div>   
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
            <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbinstitutionType}
              selected={DeathPlaceType}
              select={setselectDeathPlaceType}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_TYPE")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_INSTITUTION_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="institutionName"
              isMandatory={true}
              option={cmbInstitutionId}
              selected={DeathPlaceInstId}
              select={selectDeathPlaceInstId}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
            />
          </div> 
          <div className="col-md-4">
            <CardLabel>{`${t("CR_INSTITUTION_NAME_ML")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="institutionNamelocal"
              isMandatory={true}
              option={cmbInstitutionId}
              selected={InstitutionIdMl}
              select={setselectInstitutionIdMl}
              placeholder={`${t("CR_INSTITUTION_NAME_ML")}`}
              disable={true}
            />
          </div>
        </div>
        </div>
        
        
      </FormStep>
    </React.Fragment>
  );
};
export default Institution;
