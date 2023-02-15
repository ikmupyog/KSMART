import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthPlaceInstitution = ({ config, onSelect, userType, formData,
  institution, setInstitution, institutionIdMl, setInstitutionIdMl, institutionId, setInstitutionId
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: institutionList = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionTypePlaceOfEvent");
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "institution");
  const [isInitialRender, setIsInitialRender] = useState(true);
console.log(institutionidList);
  // const [Institution, setInstitution] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.BirthPlaceInstitutionDetails?.Institution);
  // const [InstitutionId, setInstitutionId] = useState(formData?.BirthPlaceInstitutionDetails?.InstitutionId);
  let cmbInstitution = [];
  institutionList &&
    institutionList["birth-death-service"] &&
    institutionList["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbInstitution.push(ob);
    });
  ///institution-id
  let cmbInstitutionId = [];
  let cmbInstitutionIdML = [];
  let cmbFilterInstitutionList = [];

  institutionidList &&
    institutionidList["egov-location"] &&
    institutionidList["egov-location"].institutionList.map((ob) => {
      cmbInstitutionId.push(ob);
    });
    console.log(cmbInstitutionId);
  useEffect(() => {

    if (isInitialRender) {
      if (institution) {
        console.log(institution);
        // if (cmbInstitutionId.length > 0) {
          console.log(cmbInstitutionId);
          cmbFilterInstitutionList = cmbInstitutionId.filter((cmbInstitutionId) => cmbInstitutionId.placeofEventCodeNew === institution.code);
        // }
      }
      if (institutionId) {
        cmbInstitutionIdML = cmbFilterInstitutionList.filter((cmbFilterInstitutionList) => cmbFilterInstitutionList.institutionName === institutionId.institutionName);
        setInstitutionIdMl(cmbInstitutionIdML[0]);
        setIsInitialRender(false);
      }
    }
  }, [cmbFilterInstitutionList, cmbInstitutionIdML, isInitialRender])

  const onSkip = () => onSelect();

  function setselectInstitution(value) {
    setInstitution(value);
    setIsInitialRender(true);
  }
  function setselectInstitutionId(value) {
    setInstitutionId(value);
    setIsInitialRender(true);
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
              option={cmbFilterInstitutionList}
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
              option={cmbFilterInstitutionList}
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
export default BirthPlaceInstitution;