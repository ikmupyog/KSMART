import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, CheckBox, TextArea, NewRadioButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import Address from "./Address"
import AddressOutsideIndia from "./AddressOutsideIndia";
const AddressOne = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  let validation = {};
  const { data: Occupation = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Occupation");
  const { data: Country = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // const { data: LBType, isLoading } = Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const [setReligion, setSelectedReligion] = useState(formData?.AddressOneDetails?.setReligion);
  const [setPlaceType, setSelectedPlaceType] = useState(formData?.AddressOneDetails?.setPlaceType);
  const [setOccupationMain, setSelectedOccupationMain] = useState(formData?.AddressOneDetails?.setOccupationMain);
  const [setStateName, setSelectedStateName] = useState(formData?.AddressOneDetails?.setStateName);
  const [setCountry, setSelectedCountry] = useState(formData?.AddressOneDetails?.setCountry);
  const [setDistrict, setSelectedDistrict] = useState(formData?.AddressOneDetails?.setDistrict);
  const [setLBType, setSelectedLBType] = useState(formData?.AddressOneDetails?.setLBType);
  const [setLBName, setSelectedLBName] = useState(formData?.AddressOneDetails?.setLBName);
  const [LocalityMl, setLocalityMl] = useState(formData?.AddressOneDetails?.LocalityMl);
  const [CityMl, setCityMl] = useState(formData?.AddressOneDetails?.CityMl);
  const [OccupationOthers, setOccupationOthers] = useState(formData?.AddressOneDetails?.OccupationOthers);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const cmbUrbanRural = [
    { i18nKey: "Urban", code: "URBAN" },
    { i18nKey: "Rural", code: "RURAL" },
  ];
  const onSkip = () => onSelect();
  // function selectReligion(value) {
  //   setSelectedReligion(value);
  // }
  function selectPlaceType(value) {
    setSelectedPlaceType(value);
  }
  function selectOccupationMain(value) {
    setSelectedOccupationMain(value);
  }

  function SelectOccupationOthers(e) {
    setOccupationOthers(e.target.value);
  }
  function SelectLocalityMl(e) {
    setLocalityMl(e.target.value);
  }
  function SelectCityMl(e) {
    setCityMl(e.target.value);
  }

  function SelectCountry(value) {
    setSelectedCountry(value);
  }
  function SelectStateName(value) {
    setSelectedStateName(value);
  }
  function SelectDistrict(value) {
    setSelectedDistrict(value);
  }
  function SelectLBType(value) {
    setSelectedLBType(value);
  }
  function SelectLBName(value) {
    setSelectedLBName(value);
  }

  let cmbOccupationMain = [];
  let cmbState = [];
  let cmbDistrict = [];
  let cmbLBType = [];
  let cmbCountry = [];

  Occupation &&
    Occupation["common-masters"] &&
    Occupation["common-masters"].Occupation.map((ob) => {
      cmbOccupationMain.push(ob);
    });
  State &&
    State["common-masters"] &&
    State["common-masters"].State.map((ob) => {
      cmbState.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  // useEffect(() => {
  //   if (isInitialRender) {
  //   console.log("District" + districtid);
  //   console.log(localbodies);
  //   setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === District.districtid));
  //   }
  //   }, [lbs, isInitialRender]);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity ? setPlaceofActivity.code : null);
    // sessionStorage.setItem("Religion", setReligion ? setReligion.code : null);
    sessionStorage.setItem("Country", setCountry ? setCountry.code : null);
    sessionStorage.setItem("StateName", setStateName ? setStateName.code : null);
    sessionStorage.setItem("District", setDistrict ? setDistrict.code : null);
    sessionStorage.setItem("LBType", setLBType ? setLBType.code : null);
    sessionStorage.setItem("LBName", setLBName ? setLBName.code : null);
    sessionStorage.setItem("OccupationMain", setOccupationMain ? setOccupationMain.code : null);
    sessionStorage.setItem("PlaceType", setPlaceType ? setPlaceType.code : null);
    sessionStorage.setItem("OccupationOthers", OccupationOthers);
    sessionStorage.setItem("CityMl", CityMl);
    sessionStorage.setItem("LocalityMl", LocalityMl);

    onSelect(config.key, {
      // setPlaceofActivity,
      // setReligion,
      setOccupationMain,
      OccupationOthers,
      setPlaceType,
      setCountry,
      setStateName,
      setDistrict,
      setLBType,
      setLBName,
      LocalityMl,
      CityMl,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">         
           
            <div className="radios">
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-1"
                  value="1"
                  checked={selectedValue === "1"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-1">CR_INSIDE_LOCAL_BODY</label>
              </div>
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-2"
                  value="2"
                  checked={selectedValue === "2"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-2">CR_INSIDE_KERALA</label>
              </div>
              <div className="radiobuttons">
                {" "}
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-3"
                  value="3"
                  checked={selectedValue === "3"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-3">CR_INSIDE_INDIA</label>
              </div>
              <div className="radiobuttons">
                <input
                  className="radio-margin"
                  type="radio"
                  name="radio-group"
                  id="radio-4"
                  value="4"
                  checked={selectedValue === "4"}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
                <label htmlFor="radio-4">CR_OUTSIDE_INDIA</label>
              </div>
            </div>
          </div>
        </div>

      

        <div className="row">
          {selectedValue === "1" && (
            <div id="div-1">
              <div className="col-md-12">
              <Address />
            </div>
            </div>
          )}
          {selectedValue === "2" && (
            <div id="div-2">
              <div className="col-md-12">
               
                  
                <Address />           
              
              </div>
            </div>
          )}


          {selectedValue === "3" && (
            <div id="div-3">
              <div className="col-md-12">
              <Address />                  
                 
                </div>              
             
              </div>           
          )}


          {selectedValue === "4" && (
            <div id="div-4">
              <div className="col-md-12">
              <AddressOutsideIndia />  
              </div>
            </div>
          )}
         
        </div>

      </FormStep>
    </React.Fragment>
  );
};
export default AddressOne;
