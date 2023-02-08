import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthPlaceInstitution = ({ config, onSelect, userType, formData, 
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: institution = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  const { data: institutionid = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Institution");
  const [Institution, setInstitution] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  const [InstitutionId, setInstitutionId] = useState(formData?.BirthPlaceInstitutionDetails?.InstitutionId);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  
  let naturetypecmbvalue = null;

  let cmbInstitution = [];
  institution &&
    institution["birth-death-service"] &&
    institution["birth-death-service"].InstitutionType.map((ob) => {
      cmbInstitution.push(ob);
    });
  ///institution-id
  let cmbInstitutionId = [];
  institutionid &&
    institutionid["birth-death-service"] &&
    institutionid["birth-death-service"].Institution.map((ob) => {
      cmbInstitutionId.push(ob);
    });

  const onSkip = () => onSelect();

  function setselectInstitution(value) {
   setInstitution(value);
  }
  function setselectInstitutionId(value) {
    setInstitutionId(value);
  }
  function setselectInstitutionIdMl(value) {
    setInstitutionIdMl(value);
  }

 
  const goNext = () => {
    
    console.log('clicked');
    sessionStorage.setItem("Institution", Institution.code);
    sessionStorage.setItem("InstitutionId", InstitutionId.code);
   
    onSelect(config.key, { 
      Institution, InstitutionId     
    });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null} */}
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!Institution}>
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
                option={cmbInstitution}
                selected={Institution}
                select={setInstitution}
                disabled={isEdit}
                placeholder={`${t("CR_INSTITUTION_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbInstitutionId}
                selected={InstitutionId}
                select={setInstitutionId}
                disabled={isEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_NAME_ML")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbInstitutionId}
                selected={InstitutionIdMl}
                select={setInstitutionIdMl}
                disabled={isEdit}
                placeholder={`${t("CR_INSTITUTION_NAME_ML")}`}
              />
            </div>
          </div>
        </div>
        
       

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlaceInstitution;
