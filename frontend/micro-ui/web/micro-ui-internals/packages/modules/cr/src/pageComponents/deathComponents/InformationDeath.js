import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Toast,
  InputCard,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import Hospital from "./Hospital";
import Institution from "./Institution";

const InformationDeath = ({ config, onSelect, userType, formData }) => {


  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType"); 
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const { data: documentType = {}, isdocmentLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "IdProof");
  const { data: AgeUnitvalue = {}, isAgeUnitLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AgeUnit");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade"); 
  const { data: OccupationMain = {}, isOccupationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Occupation");
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMaster");

  const [DateOfDeath, setDateOfDeath] = useState(formData?.InformationDeath?.DateOfDeath ? formData?.InformationDeath?.DateOfDeath : "");
  const [TimeOfDeath, setTimeOfDeath] = useState(formData?.InformationDeath?.TimeOfDeath ? formData?.InformationDeath?.TimeOfDeath : "");
  const [DeceasedAadharNotAvailable, setDeceasedAadharNotAvailable] = useState(formData?.InformationDeath?.DeceasedAadharNotAvailable ? formData?.InformationDeath?.DeceasedAadharNotAvailable : 0);
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : "");
  const [DeceasedIdproofType, setSelectedDeceasedIdproofType] = useState(formData?.InformationDeath?.DeceasedIdproofType ? formData?.InformationDeath?.DeceasedIdproofType : null);
  const [DeceasedIdproofNo, setDeceasedIdproofNo] = useState(formData?.InformationDeath?.DeceasedIdproofNo ? formData?.InformationDeath?.DeceasedIdproofNo : "");
  const [DeceasedFirstNameEn, setDeceasedFirstNameEn] = useState(formData?.InformationDeath?.DeceasedFirstNameEn ? formData?.InformationDeath?.DeceasedFirstNameEn : "");
  const [DeceasedMiddleNameEn, setDeceasedMiddleNameEn] = useState(formData?.InformationDeath?.DeceasedMiddleNameEn ? formData?.InformationDeath?.DeceasedMiddleNameEn : "");
  const [DeceasedLastNameEn, setDeceasedLastNameEn] = useState(formData?.InformationDeath?.DeceasedLastNameEn ? formData?.InformationDeath?.DeceasedLastNameEn : "");
  const [DeceasedFirstNameMl, setDeceasedFirstNameMl] = useState(formData?.InformationDeath?.DeceasedFirstNameMl ? formData?.InformationDeath?.DeceasedFirstNameMl : "");
  const [DeceasedMiddleNameMl, setDeceasedMiddleNameMl] = useState(formData?.InformationDeath?.DeceasedMiddleNameMl ? formData?.InformationDeath?.DeceasedMiddleNameMl : "");
  const [DeceasedLastNameMl, setDeceasedLastNameMl] = useState(formData?.InformationDeath?.DeceasedLastNameMl ? formData?.InformationDeath?.DeceasedLastNameMl : "");
  const [Age, setAge] = useState(formData?.InformationDeath?.Age ? formData?.InformationDeath?.Age : 0);
  const [DeceasedGender, setselectedDeceasedGender] = useState(formData?.InformationDeath?.DeceasedGender);
  const [Nationality, setSelectedNationality] = useState(formData?.InformationDeath?.Nationality);
  const [Religion, setSelectedReligion] = useState(formData?.InformationDeath?.Religion);  
  const [CommencementDate, setCommencementDate] = useState(formData?.InformationDeath?.CommencementDate ? formData?.InformationDeath?.CommencementDate : "");
  // const [checked, setChecked] = useState(formData?.InformationDeath?.checked ? formData?.InformationDeath?.checked : false);
  const [AgeUnit , setSelectedAgeUnit] = useState(formData?.InformationDeath?.AgeUnit ? formData?.InformationDeath?.AgeUnit : null);
  const [Occupation, setSelectedOccupation] = useState(formData?.InformationDeath?.Occupation);
  const [DeathPlace, setselectDeathPlace] = useState(formData?.InformationDeath?.DeathPlace);
//Hospital
  const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.InformationDeath?.DeathPlaceType);
// Institution
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(formData?.InformationDeath?.DeathPlaceInstId); 
 
  const [DOBError, setDOBError] = useState(formData?.ChildDetails?.ChildDOB ? false : false);
  const [toast, setToast] = useState(false);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  let naturetypecmbvalue = null;
  const maxDate = new Date();
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
 
  let cmbReligion = [];
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  let cmbDocumentType = [];
  documentType &&
    documentType["common-masters"] &&
    documentType["common-masters"].IdProof.map((ob) => {
      cmbDocumentType.push(ob);
    });
  let cmbAgeUnit = [];
  AgeUnitvalue &&
  AgeUnitvalue["birth-death-service"] &&
  AgeUnitvalue["birth-death-service"].AgeUnit.map((ob) => {
      cmbAgeUnit.push(ob);
    });
  let cmbOccupationMain = [];
  OccupationMain &&
  OccupationMain["common-masters"] &&
  OccupationMain["common-masters"]?.Occupation?.map((ob) => {
      cmbOccupationMain.push(ob);
    });
  let cmbPlace = [];
  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMaster.map((ob) => {
      cmbPlace.push(ob);
    });
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectDeceasedGender(value) {
    // console.log("gender" + value);
    setselectedDeceasedGender(value);
  }
  function setSelectDeceasedLastNameMl(e) {
    setDeceasedLastNameMl(e.target.value);
  }
  function setSelectDeceasedMiddleNameMl(e) {
    setDeceasedMiddleNameMl(e.target.value);
  }
  function setSelectDeceasedFirstNameMl(e) {
    setDeceasedFirstNameMl(e.target.value);
  }
  function setSelectDeceasedFirstNameEn(e) {
    setDeceasedFirstNameEn(e.target.value);
  }
  function setSelectDeceasedMiddleNameEn(e) {
    setDeceasedMiddleNameEn(e.target.value);
  }
  function setSelectDeceasedLastNameEn(e) {
    setDeceasedLastNameEn(e.target.value);
  }
  function setSelectAge(e) {
    setAge(e.target.value);
  }
  function setSelectDeceasedAadharNumber(e) {
    setDeceasedAadharNumber(e.target.value);
  }
  function setSelectDeceasedIdproofNo(e) {
    // console.log("Test" + e);
    setDeceasedIdproofNo(e.target.value);
  }
  function selectOccupation(value) {
    setSelectedOccupation(value);
  }
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);
  }
  function selectDateOfDeath(value) {
    setDateOfDeath(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {      
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setDateOfDeath(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }  
  function selectAgeUnit(value) {
    setSelectedAgeUnit(value);
  }
  function selectDeceasedIdproofType(value) {
    setSelectedDeceasedIdproofType(value);
  }  
 
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  }; 

  function setCheckedAdhar(e) {
    if (e.target.checked === true) {
      setDeceasedAadharNotAvailable(e.target.checked);
    } else {
      setDeceasedAadharNotAvailable(e.target.checked);
      setSelectedDeceasedIdproofType("");
      setDeceasedIdproofNo("");
    }
  }

  const onSkip = () => onSelect();
  let cmbfilterNation = [];
  let cmbfilterReligion = [];
  let cmbfilterAgeUnit = [];
  let naturetype = null;
  // let isInitialRender =[];
  useEffect(() => {
    if (Nationality == null || Nationality == "") {
      if (stateId === "kl" && cmbNation.length > 0) {
        cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
        setSelectedNationality(cmbfilterNation[0]);
      }
    }
    if (Religion == null || Religion == "") {
      if (stateId === "kl" && cmbReligion.length > 0) {
        cmbfilterReligion = cmbReligion.filter((cmbReligion) => cmbReligion.name.includes("No Religion"));
        setSelectedReligion(cmbfilterReligion[0]);
      }
    }
    if (AgeUnit == null || AgeUnit == "") {
      if (stateId === "kl" && cmbAgeUnit.length > 0) {
        cmbfilterAgeUnit = cmbAgeUnit.filter((cmbAgeUnit) => cmbAgeUnit.name.includes("Years"));
        setSelectedAgeUnit(cmbfilterAgeUnit[0]);
      }
    }
    
    // if (isInitialRender) {
    //   if (formData?.InformationDeath?.ischeckedAdhar  != null) {
    //     setIsInitialRender(false);
    //     setisCheckedAdhar(formData?.InformationDeath?.ischeckedAdhar );
    //   }
    // }
    if (isInitialRender) {
      
      if (DeathPlace) {
        setIsInitialRender(false);
        naturetype = DeathPlace.code;
        setValue(naturetype);
        if (naturetype === "HOSPITAL") {
          <Hospital         
          DeathPlaceType={DeathPlaceType}           
          />;
        }
        if (naturetype === "INSTITUTION") {
          <Hospital         
          DeathPlaceType={DeathPlaceType} 
          DeathPlaceInstId={DeathPlaceInstId}          
          />;
        }
      }}
    });
      const goNext = () => {
      sessionStorage.setItem("DateOfDeath", DateOfDeath ? DateOfDeath : null);
      sessionStorage.setItem("TimeOfDeath", TimeOfDeath ? TimeOfDeath : null);
      sessionStorage.setItem("DeceasedFirstNameEn", DeceasedFirstNameEn ? DeceasedFirstNameEn : null);
      sessionStorage.setItem("DeceasedMiddleNameEn", DeceasedMiddleNameEn ? DeceasedMiddleNameEn : null);
      sessionStorage.setItem("DeceasedLastNameEn", DeceasedLastNameEn ? DeceasedLastNameEn : null);
      sessionStorage.setItem("DeceasedFirstNameMl", DeceasedFirstNameMl ? DeceasedFirstNameMl : null);
      sessionStorage.setItem("DeceasedMiddleNameMl", DeceasedMiddleNameMl ? DeceasedMiddleNameMl : null);
      sessionStorage.setItem("DeceasedLastNameMl", DeceasedLastNameMl ? DeceasedLastNameMl : null);
      sessionStorage.setItem("Age", Age ? Age : null);
      sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);
      sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);   
      sessionStorage.setItem("Nationality", Nationality ? Nationality.code : null);
      sessionStorage.setItem("Religion", Religion ? Religion.code : null);   
      sessionStorage.setItem("DeceasedGender", DeceasedGender ? DeceasedGender.code : null);
      sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
      sessionStorage.setItem("AgeUnit", AgeUnit ? AgeUnit.code : null);  
      // sessionStorage.setItem("checked", checked ? checked : false);    
      sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
      sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
      sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);
      
      sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
      sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ?DeathPlaceInstId.code : null);
    // if (validFlag === true) {
      
    if (DeathPlace.code === "HOSPITAL") {
       
      //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
        sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.removeItem("DeathPlaceInstId");

      }    
      if (DeathPlace.code === "INSTITUTION") {
       
        //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ?DeathPlaceInstId.code : null);
          
        }    
     
    onSelect(config.key, {      
      DateOfDeath,
      TimeOfDeath,
      DeceasedFirstNameEn,
      DeceasedMiddleNameEn,
      DeceasedLastNameEn,
      DeceasedFirstNameMl,
      DeceasedMiddleNameMl,
      DeceasedLastNameMl,
      Age,
      DeceasedAadharNotAvailable,   
      DeceasedAadharNumber,        
      DeceasedIdproofType,
      DeceasedIdproofNo,      
      CommencementDate,
      DeceasedGender,      
      Nationality,
      Religion,      
      AgeUnit, 
      Occupation,    
      // checked,

      DeathPlace,
      DeathPlaceType, 
      
      DeathPlaceInstId,
    });
  
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee")  ? <Timeline currentStep={1} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!DateOfDeath ||!TimeOfDeath  || !DeceasedGender ||!DeceasedFirstNameEn||!DeceasedFirstNameMl||!Age}>
        {/* //    isDisabled={!CommencementDate} */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>        
        <div>
             <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>
                    {t("CR_DATE_OF_DEATH")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>               
                  <DatePicker
                    date={DateOfDeath}
                    name="DateOfDeath"
                    inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_DATE_OF_DEATH")}`}
                    onChange={selectDateOfDeath}
                    {...(validation = {pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",isRequired: true, type: "text",title: t("CR_INVALID_DATE"),
                    })}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                  <CustomTimePicker name="TimeOfDeath" onChange={(val) => handleTimeChange(val, setTimeOfDeath)} value={TimeOfDeath} />
                </div>
              </div>
            </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={DeathPlace}
                select={selectDeathPlace}
                disabled={isEdit}
                placeholder={`${t("CR_PLACE_OF_DEATH")}`}
              />
            </div>
          </div>
        </div>
        {value === "HOSPITAL" && (
          <div>
            <Hospital           
            selectDeathPlaceType={selectDeathPlaceType}
            DeathPlaceType={DeathPlaceType}                       
            />
          </div>
        )}
        {value === "INSTITUTION" && (
          <div>
            <Institution           
            selectDeathPlaceType={selectDeathPlaceType}
            DeathPlaceType={DeathPlaceType}   
            DeathPlaceInstId= {DeathPlaceInstId} 
            setSelectedDeathPlaceInstId  = {setSelectedDeathPlaceInstId}

            />
          </div>
        )}
        
        
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_ADHAR_NOT_AVAILABLE")} onChange={setCheckedAdhar} value={DeceasedAadharNotAvailable} checked={DeceasedAadharNotAvailable} />
            </div>
          </div>
        </div>
        {DeceasedAadharNotAvailable === true && (
          // {checkedAdhar ? (
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_ID_DETAILS_OF_DECEASED")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDocumentType}
                  selected={DeceasedIdproofType}
                  select={selectDeceasedIdproofType}
                  disabled={isEdit}
                  placeholder={`${t("CR_ID_DETAILS_OF_DECEASED")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>{t("CR_ID_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedIdproofNo"
                  value={DeceasedIdproofNo}
                  onChange={setSelectDeceasedIdproofNo}
                  disable={isEdit}
                  placeholder={`${t("CR_ID_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_ID") })}
                />
              </div>
            </div>
          </div>
        )}
        {DeceasedAadharNotAvailable === false && (
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_AADHAR_OF_DECEASED")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type="number"
                  max="12"
                  optionKey="i18nKey"
                  name="DeceasedAadharNumber"
                  value={DeceasedAadharNumber}
                  onChange={setSelectDeceasedAadharNumber}
                  disable={isEdit}
                  placeholder={`${t("CR_AADHAR_OF_DECEASED")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </div>
          </div>
        )}    
       

        <div className="row">
          <div className="col-md-12">
           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedFirstNameEn"
                value={DeceasedFirstNameEn}
                onChange={setSelectDeceasedFirstNameEn}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedMiddleNameEn"
                value={DeceasedMiddleNameEn}
                onChange={setSelectDeceasedMiddleNameEn}
                disable={isEdit}
                placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedLastNameEn"
                value={DeceasedLastNameEn}
                onChange={setSelectDeceasedLastNameEn}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">           
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_FIRST_NAME_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedFirstNameMl"
                value={DeceasedFirstNameMl}
                onChange={setSelectDeceasedFirstNameMl}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_FIRST_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedMiddleNameMl"
                value={DeceasedMiddleNameMl}
                onChange={setSelectDeceasedMiddleNameMl}
                disable={isEdit}
                placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_MIDDLE_NAME_ML"),
                })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="DeceasedLastNameMl"
                value={DeceasedLastNameMl}
                onChange={setSelectDeceasedLastNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LAST_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_LAST_NAME_ML"),
                })}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
          <div className="col-md-2">
              <CardLabel>
                {`${t("CR_AGE_OF_BIRTH")}`}
                <span className="mandatorycss">*</span>{" "}
              </CardLabel>
              <input
                className="employee-card-input"
                name="Age"
                type="number"
                onChange={setSelectAge}
                value={Age}
                placeholder={`${t("CR_AGE_OF_BIRTH")}`}
                {...(validation = { pattern: "^([0-9]){0-3}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
              />              
            </div>
            <div className="col-md-2">
              <CardLabel>
                {`${t("CR_AGE_UNIT")}`}
                <span className="mandatorycss">*</span>{" "}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbAgeUnit}
                selected={AgeUnit}
                select={selectAgeUnit}
                disabled={isEdit}
                placeholder={`${t("CR_AGE_UNIT")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={menu}
                selected={DeceasedGender}
                select={selectDeceasedGender}
                disabled={isEdit}
                placeholder={`${t("CR_GENDER")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_GENDER") })}
              />
            </div>
            <div className="col-md-2">
              <CardLabel>{t("CR_NATIONALITY")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="nationalityname"
                isMandatory={false}
                option={cmbNation}
                selected={Nationality}
                select={selectNationality}
                disabled={isEdit}
                placeholder={`${t("CR_NATIONALITY")}`}
              />
            </div>
            <div className="col-md-2">
              <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbReligion}
                selected={Religion}
                select={selectReligion}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_RELIGION")}`}
              />
            </div>           
          </div>
        </div>  
        {/* <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_OCCUPATION_DECEASED_NO")} onChange={() => setChecked((checked) => !checked)} value={checked} />
          </div>
        </div> */}
        <div className="row">
          {/* {checked ? null : ( */}
          <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_OCCUPATION_MAIN_LEVEL")}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbOccupationMain}
                  selected={Occupation}
                  select={selectOccupation}
                  disabled={isEdit}
                  placeholder={`${t("CR_OCCUPATION_MAIN_LEVEL")}`}
                />
              </div>              
            </div>
          {/* )} */}
        </div>   
     
        {toast && (
          <Toast
            error={
              DOBError
              // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
            }
            label={
              DOBError
                ? //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                  // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError
                  DOBError
                  ? t(`CS_COMMON_INVALID_DATE`)
                  : DOBError
                  ? t(`CS_COMMON_INVALID_DATE`)
                  : // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                    setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
