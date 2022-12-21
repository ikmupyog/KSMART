import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import HospitalDetails from "../../pageComponents/birthComponents/HospitalDetails";
import PublicPlace from "../../pageComponents/birthComponents/PublicPlace";

const BirthPlace = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [BirthPlace, selectBirthPlace] = useState(formData?.BirthPlace?.BirthPlace);
  const [BirthPlaceDescription, setBirthPlaceDeccription] = useState(formData?.BirthPlace?.BirthPlaceDescription);
  const [value, setValue] = useState();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let menu = [];
  Menu &&
    Menu["birth-death-service"] &&
    Menu["birth-death-service"].PlaceMaster.map((ob) => {
      menu.push(ob);
    });
  console.log(menu);
  const onSkip = () => onSelect();

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
  }
  function setSelectBirthPlaceDeccription(e) {
    setBirthPlaceDeccription(e.target.value);
  }
  const goNext = () => {
    sessionStorage.setItem("BirthPlace", BirthPlace.code);
    // sessionStorage.setItem("BirthPlaceDescription", BirthPlaceDescription);
    onSelect(config.key, { BirthPlace, BirthPlaceDescription });
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton >{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthPlace }>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE")}`}</span> </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-6" >
              <CardLabel>{t("CR_BIRTH_PLACE")}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="code" isMandatory={false} option={menu} selected={BirthPlace} select={setselectBirthPlace} disabled={isEdit} placeholder={`${t("CR_BIRTH_PLACE")}`} />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6 " >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthPlaceDescription" value={BirthPlaceDescription} onChange={setSelectBirthPlaceDeccription} disable={isEdit} placeholder={`${t("CR_DESCRIPTION")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })} />
          </div>
        </div> */}
        {/* {value === "HOSPITAL" && (
                    <div>
                   <HospitalDetails />
          </div>)
          }
          {value === "HOME" && (
                    <div>
                   <PublicPlace />
          </div>)
          } */}
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlace;