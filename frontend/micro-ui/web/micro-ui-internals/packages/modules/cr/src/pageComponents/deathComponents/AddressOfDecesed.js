import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, NewRadioButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import AdressInside from "./AdressInside";
import OutSideIndia from "./OutSideIndia";
import Timeline from "../../components/CRTimeline";


const AddressOfDecesed = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });

  const onSkip = () => onSelect();

  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }
  const goNext = () => {
    console.log("test");
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);   
    //  sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);

    onSelect(config.key, {});
  };

  const [inside, setInside] = useState(true);
  const [outside, setOutside] = useState(false);
  const insideHandler = () => {
    setInside(true);
    setOutside(false);
  };
  const outsideHandler = () => {
    setInside(false);
    setOutside(true);
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="maindeath">
          <div className="radios">
            <div className="inside">
              <button onClick={insideHandler}>
                <NewRadioButton />
              </button>
              <p>Inside Local Body</p>
            </div>
            <div className="inside">
            <button onClick={insideHandler}>
              <NewRadioButton />
              </button>
              <p>Inside Kerala</p>
            </div>
            <div className="inside">
            <button onClick={insideHandler}>
              <NewRadioButton />
             </button>
              <p>Inside India</p>
            </div>
            <div className="inside">
              <button onClick={outsideHandler}>
                <NewRadioButton />
              </button>
              <p>Outside India</p>
            </div>
          </div>
          <div>
            {inside && <AdressInside />}
            {outside && <OutSideIndia />}
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressOfDecesed;
