import React, { useState} from "react";
import { FormStep, CardLabel, TextInput, Dropdown, CheckBox, TextArea, NewRadioButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const StatisticalInfo = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const [checked, setChecked] = useState(false);  
  const { t } = useTranslation();
  let validation = {};
  const { data: Occupation = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Occupation");
  const { data: Country = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District"); 
  // const { data: LBType, isLoading } = Digit.Hooks.useTenants();
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const [setReligion, setSelectedReligion] = useState(formData?.StatisticalInfo?.setReligion);
  const [setPlaceType, setSelectedPlaceType] = useState(formData?.StatisticalInfo?.setPlaceType);
  const [setOccupationMain, setSelectedOccupationMain] = useState(formData?.StatisticalInfo?.setOccupationMain);
  const [setStateName, setSelectedStateName] = useState(formData?.StatisticalInfo?.setStateName);
  const [setCountry, setSelectedCountry] = useState(formData?.StatisticalInfo?.setCountry);
  const [setDistrict, setSelectedDistrict] = useState(formData?.StatisticalInfo?.setDistrict);
  const [setLBType, setSelectedLBType] = useState(formData?.StatisticalInfo?.setLBType);  
  const [setLBName, setSelectedLBName] = useState(formData?.StatisticalInfo?.setLBName);  
  const [LocalityMl, setLocalityMl] = useState(formData?.StatisticalInfo?.LocalityMl);  
  const [CityMl, setCityMl] = useState(formData?.StatisticalInfo?.CityMl);    
  const [OccupationOthers, setOccupationOthers] = useState(formData?.StatisticalInfo?.OccupationOthers);
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
  LBType  &&
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
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_TOWN_VILLAGE_DECEASED")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("CR_TOWN_VILLAGE_DECEASED-DETAILS")}</CardLabel>
            <button onClick={""}>
              <NewRadioButton />
            </button>{" "}
            Inside Local Body
            <button onClick={""}>
              <NewRadioButton />
            </button>{" "}
            Inside Kerala
            <button onClick={""}>
              <NewRadioButton />
            </button>{" "}
            Inside India
            <button onClick={""}>
              <NewRadioButton />
            </button>{" "}
            Outside India
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"> 
          <div className="col-md-6" >
                <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}                  
                  option={cmbState}
                  selected={setStateName}
                  select={setSelectedStateName}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_STATE")}`}
                />
              </div>
              <div className="col-md-6">
              <CardLabel>
                {t("CS_COMMON_DISTRICT")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbDistrict}
                selected={setDistrict}
                select={setSelectedDistrict}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_DISTRICT")}`}
              />
            </div>
            </div>
        </div>

        <div className="row">
        <div className="col-md-12">    
          <div className="col-md-4">        
          <CardLabel>{`${t("CR_PLACE_TYPE_URBAN_PLACE_TYPE_RURAL")}`}</CardLabel>
                 <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbUrbanRural}
                  selected={setPlaceType}
                  select={setSelectedPlaceType} placeholder={`${t("CR_PLACE_TYPE_URBAN_PLACE_TYPE_RURAL")}`}
                  disabled={isEdit}
                  />
          </div>
          <div className="col-md-4" >
         <CardLabel>{`${t("CS_COMMON_LB_TYPE")}`}</CardLabel>
                <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbLBType}
                selected={setLBType}
                select={setSelectedLBType}
                disabled={isEdit}
              />
          </div> 
          <div className="col-md-4" >
            <CardLabel>
              {t("CS_COMMON_LB_NAME")}<span className="mandatorycss">*</span></CardLabel>
               <Dropdown 
               t={t} 
               optionKey="name" 
               isMandatory={false} 
               option={cmbLBType} 
               selected={setLBName} 
               select={setSelectedLBName} 
               disabled={isEdit} 
               placeholder={`${t("CS_COMMON_LB_NAME")}`} />
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("CR_LOCALITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityMl"
              value={LocalityMl}
              onChange={SelectLocalityMl}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CR_CITY_ML")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="CityMl"
              value={CityMl}
              onChange={SelectCityMl}
              disable={isEdit}
              placeholder={`${t("CR_CITY_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_ML") })}
            />
          </div>
          <div className="col-md-4" >
                <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbCountry}
                  selected={setCountry}
                  select={setSelectedCountry}
                  disabled={isEdit}
                />
              </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OCCUPATION_DECEASED")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <CheckBox label={t("CR_OCCUPATION_DECEASED_NO")} onChange={() => setChecked((checked) => !checked)} value={checked} />
          </div>
        </div>
        <div className="row">
        {checked ? null :( 
          <div>
            <div className="col-md-6">
           <CardLabel>{t("CR_OCCUPATION_MAIN_LEVEL")}</CardLabel>
            <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbOccupationMain}
                selected={setOccupationMain}
                select={selectOccupationMain}
                disabled={isEdit}
                placeholder={`${t("CR_OCCUPATION_MAIN_LEVEL")}`}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_OCCUPATION_OTHER_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="OccupationOthers"
              value={OccupationOthers}
              onChange={SelectOccupationOthers}
              disable={isEdit}
              placeholder={`${t("CR_OCCUPATION_OTHER_ML")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OCCUPATION_OTHER_ML") })}
            />
          </div>
          </div>
           )}
         
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default StatisticalInfo;
