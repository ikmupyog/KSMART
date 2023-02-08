import React, { useState } from "react";
import { FormStep, CardLabel, Dropdown,Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthPlaceInstitution = ({ config, onSelect, userType, formData,institution ,setInstitution,institutionIdMl,setInstitutionIdMl,
  institutionId,setInstitutionId
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: institutionList = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionType");
  // const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Institution");
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "institution");

  // const [Institution, setInstitution] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionId, setInstitutionId] = useState(formData?.BirthPlaceInstitutionDetails?.InstitutionId);
  let cmbInstitution = [];  
  institutionList &&
  institutionList["birth-death-service"] &&
  institutionList["birth-death-service"].InstitutionType.map((ob) => {
      cmbInstitution.push(ob);
    });
  ///institution-id
  let cmbInstitutionId = [];
  institutionidList &&
  institutionidList["egov-location"] &&
  institutionidList["egov-location"].institutionList.map((ob) => {
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
    // console.log('clicked');
    // sessionStorage.setItem("Institution", Institution.code);
    // sessionStorage.setItem("InstitutionId", InstitutionId.code);
   
    // onSelect(config.key, { 
    //   Institution, InstitutionId     
    // });
  };
  if (isinstitutionLoad || isinstitutionidLoad) {
    return <Loader></Loader>;
  }
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
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("CR_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
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
                isMandatory={true}
                option={cmbInstitutionId}
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
                isMandatory={true}
                option={cmbInstitutionId}
                selected={institutionIdMl}
                select={setselectInstitutionIdMl}
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
