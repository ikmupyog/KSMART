import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeath = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [setPlaceofDeath, setSelectedPlaceofDeath] = useState(formData?.TradeDetails?.setPlaceofDeath);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["birth-death-service"] &&
    place["birth-death-service"].PlaceMaster.map((ob) => {
      cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  function selectPlaceofDeath(value) {
    setSelectedPlaceofDeath(value);
  }

  function setSelectTradeName(e) {
    setTradeName(e.target.value);
  }
  function selectCommencementDate(value) {
    setCommencementDate(value);
  }

  const goNext = () => {
    sessionStorage.setItem("setPlaceofDeath", setPlaceofDeath?setPlaceofDeath.code:null);
    onSelect(config.key, { setPlaceofDeath });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >     
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}
                </span> 
            </h1>
        </div>
        </div>    
 
    <div className="row">
    <div className="col-md-12" >
        <div className="col-md-6" >
            <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofDeath}
                select={selectPlaceofDeath}
                disabled={isEdit}
                placeholder={`${t("CR_PLACE_OF_DEATH")}`}
            />
        </div> 
        </div>      
    </div> 
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeath;