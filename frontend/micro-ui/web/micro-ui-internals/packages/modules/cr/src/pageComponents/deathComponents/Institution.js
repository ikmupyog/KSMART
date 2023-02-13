import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,BackButton} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const Institution = ({ config, onSelect, userType, formData, DeathPlaceType, selectDeathPlaceType, DeathPlaceInstId, setSelectedDeathPlaceInstId
 }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: institutionType = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionTypePlaceOfEvent");
  const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.Institution?.DeathPlaceType);
  // const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(formData?.Institution?.DeathPlaceInstId); 
  
 
  let naturetypecmbvalue = null;
  let cmbinstitutionType = [];
  institutionType &&
  institutionType["birth-death-service"] &&
  institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
    cmbinstitutionType.push(ob);
  });
  let cmbInstitution = [];
  institution &&
    institution["birth-death-service"] &&
    institution["birth-death-service"].InstitutionType.map((ob) => {
      cmbInstitution.push(ob);
    });
    
    

  const onSkip = () => onSelect();

  function setselectDeathPlaceType(value) {
    selectDeathPlaceType(value);
  }
  function selectDeathPlaceInstId(value) {
    setSelectedDeathPlaceInstId(value);
  } 
 
  const goNext = () => {
    // sessionStorage.setItem("DeathPlaceType", DeathPlaceType.code);
    // sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId.code);
           
    
    onSelect(config.key, { 
      // DeathPlaceType,
      // DeathPlaceInstId,
        
    });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!DeathPlaceType}>     
        <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbInstitution}
              selected={DeathPlaceType}
              select={setselectDeathPlaceType}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_TYPE")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbinstitutionType}
              selected={DeathPlaceInstId}
              select={selectDeathPlaceInstId}
              disabled={isEdit}
              placeholder={`${t("CR_INSTITUTION_NAME")}`}
            />
          </div> 
        </div>
        </div>
        
        
      </FormStep>
    </React.Fragment>
  );
};
export default Institution;
