import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformationDeath = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const [setTitle, setSelectedTitle] = useState(formData?.InformationDeath?.setTitle);
  const [setTitleB, setSelectedTitleB] = useState(formData?.InformationDeath?.setTitle);
  const [setCountry, setSelectedCountry] = useState(formData?.InformationDeath?.setCountry);
  const [setReligion, setSelectedReligion] = useState(formData?.InformationDeath?.setReligion);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TimeOfDeath, setTimeOfDeath] = useState(formData?.InformationDeath?.TimeOfDeath);
  const [Minute, setSelectedMinute] = useState(formData?.InformationDeath?.Minute);
  const [Seconds, setSelectedSeconds] = useState(formData?.InformationDeath?.Seconds);
  // const [Gender, selectGender] = useState(formData?.DeathDetails?.Gender);
  const [FirstName, setFirstName] = useState(formData?.InformationDeath?.FirstName);
  const [MiddleName, setMiddleName] = useState(formData?.InformationDeath?.MiddleName);
  const [LastName, setLastName] = useState(formData?.InformationDeath?.LastName);
  const [MLFirstName, setMLFirstName] = useState(formData?.InformationDeath?.MLFirstName);
  const [MlMiddleName, setMlMiddleName] = useState(formData?.InformationDeath?.MlMiddleName);
  const [MlLastName, setMlLastName] = useState(formData?.InformationDeath?.MlLastName);
  const [Ageofbirth, setAgeofbirth] = useState(formData?.InformationDeath?.Ageofbirth);
  const [AdharNo, setAdharNo] = useState(formData?.InformationDeath?.AdharNo);
  const [PassportNo, setPassportNo] = useState(formData?.InformationDeath?.PassportNo);
  const [CommencementDate, setCommencementDate] = useState(formData?.InformationDeath?.CommencementDate);
  const [DeathDate, setDeathDate] = useState(formData?.InformationDeath?.DeathDate);
  const [FromDate, setFromDate] = useState(formData?.InformationDeath?.FromDate);
  const [ToDate, setToDate] = useState(formData?.InformationDeath?.ToDate);
  const [DeathTimeFrom, setDeathTimeFrom] = useState(data?.InformationDeath?.DeathTimeFrom);
  const [DeathTimeTo, setDeathTimeTo] = useState(null);

  let naturetypecmbvalue = null;
  let cmbPlace = [];
  place &&
    place["TradeLicense"] &&
    place["TradeLicense"].PlaceOfActivity.map((ob) => {
      cmbPlace.push(ob);
    });
  let cmbNation = [];
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });
  let cmbTitle = [];
  title &&
    title["common-masters"] &&
    title["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });
  //   let cmbreligion = [];
  //   console.log(religion);
  // //   religion &&
  // //     religion["common-masters"] &&
  // //     religion["common-masters"].religion.map((ob) => {
  // //       cmbreligion.push(ob);
  // //     });
  function selectReligion(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedReligion(value);
  }
  function selectTitle(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTitle(value);
  }
  function selectTitleB(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedTitleB(value);
  }
  function selectCountry(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedCountry(value);
  }
  // function setselectGender(value) {
  //   selectGender(value);
  // }
  // function selectReligion(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedReligion(value);
  // }
  function setSelectMinute(e) {
    setSelectedMinute(e.target.value);
  }
  function setSelectSeconds(e) {
    setSelectedSeconds(e.target.value);
  }
  function setSelectMlLastName(e) {
    setMlLastName(e.target.value);
  }
  function setSelectMlMiddleName(e) {
    setMlMiddleName(e.target.value);
  }
  function setSelectMLFirstName(e) {
    setMLFirstName(e.target.value);
  }
  function setSelectFirstName(e) {
    setFirstName(e.target.value);
  }
  function setSelectMiddleName(e) {
    setMiddleName(e.target.value);
  }
  function setSelectLastName(e) {
    setLastName(e.target.value);
  }
  function setSelectAgeofbirth(e) {
    setAgeofbirth(e.target.value);
  }
  function setSelectAdharNo(e) {
    setAdharNo(e.target.value);
  }
  function setSelectPassportNo(e) {
    setPassportNo(e.target.value);
  }
  function setSelectTimeOfDeath(e) {
    setTimeOfDeath(e.target.value);
  }

  function selectCommencementDate(value) {
    setCommencementDate(value);
  }
  function selectDeathDate(value) {
    setDeathDate(value);
  }
  function selectFromDate(value) {
    setFromDate(value);
  }
  function selectToDate(value) {
    setToDate(value);
  }
  function setSelectDeathTimeFrom(value) {
    setDeathTimeFrom(value);
  }
  function setSelectDeathTimeTo(value) {
    setDeathTimeFrom(value);
  }
  

  const onSkip = () => onSelect();
  const goNext = () => {
    sessionStorage.setItem("DeathDate", DeathDate);
    sessionStorage.setItem("FirstName", FirstName);
    sessionStorage.setItem("MiddleName", MiddleName);
    sessionStorage.setItem("LastName", LastName);
    sessionStorage.setItem("MLFirstName", MLFirstName);
    sessionStorage.setItem("Ageofbirth", Ageofbirth);
    sessionStorage.setItem("AdharNo", AdharNo);
    sessionStorage.setItem("PassportNo", PassportNo);
    sessionStorage.setItem("FromDate", FromDate);
    sessionStorage.setItem("ToDate", ToDate);
    sessionStorage.setItem("setTitle", setTitle.code);
    sessionStorage.setItem("setTitleB", setTitleB.code);
    sessionStorage.setItem("setCountry", setCountry.code);
    sessionStorage.setItem("setCountry", setReligion.code);
    sessionStorage.setItem("TimeOfDeath", TimeOfDeath);
    sessionStorage.setItem("Minute", Minute);
    sessionStorage.setItem("Seconds", Seconds);
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      setPlaceofActivity,
      DeathDate,
      FirstName,
      MiddleName,
      LastName,
      MLFirstName,
      Ageofbirth,
      AdharNo,
      PassportNo,
      FromDate,
      ToDate,
      setTitle,
      setTitleB,
      setCountry,
      setReligion,
      TimeOfDeath,
      Minute,
      Seconds,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        {/* //    isDisabled={!CommencementDate} */}
        <header className="tittle">Information Deceased</header>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* <CheckBox label={t("Exact Date of death not available")} onChange={setDateOfDeathNotAvailable} value={isDateOfDeathNotAvailable} checked={isDateOfDeathNotAvailable} /> */}
            <CheckBox label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")} />
          </div>
          <div className="col-md-6">
            {/* <CheckBox label={t("Unclaimed dead body")} onChange={setUnclamedDeadBody} value={isUnclamedDeadBody} checked={isUnclamedDeadBody} /> */}
            <CheckBox label={t("CR_UNCLAIMED_DEAD_BODY")} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_DATE_OF_DEATH")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={DeathDate} name="DeathDate" onChange={selectDeathDate} />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TimeOfDeath"
              value={TimeOfDeath}
              onChange={setSelectTimeOfDeath}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("m")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Minute"
              value={Minute}
              onChange={setSelectMinute}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-2">
            <CardLabel>{t("s")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Seconds"
              value={Seconds}
              onChange={setSelectSeconds}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CardLabel>{t("CR_FROM_DATE")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={FromDate} name="FromDate" onChange={selectFromDate} />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="DeathTimeFrom"
              value={DeathTimeFrom}
              onChange={setDeathTimeFrom}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>          
         
          <div className="col-md-3">
            <CardLabel>{t("CR_TO_DATE")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={ToDate} name="ToDate" onChange={selectToDate} />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_TO_TIME")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="DeathTimeTo"
              value={DeathTimeTo}
              onChange={setSelectDeathTimeTo}
              disable={isEdit}
              {...(validation = { pattern: "DeathTimeFrom^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <CardLabel>{`${t("CR_TITLE_EN")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitle} select={selectTitle} disabled={isEdit} />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="FirstName"
              value={FirstName}
              onChange={setSelectFirstName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MiddleName"
              value={MiddleName}
              onChange={setSelectMiddleName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LastName"
              value={LastName}
              onChange={setSelectLastName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CardLabel>{`${t("CR_TITLE_ML")}`}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitleB} select={selectTitleB} disabled={isEdit} />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MLFirstName"
              value={MLFirstName}
              onChange={setSelectMLFirstName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MlMiddleName"
              value={MlMiddleName}
              onChange={setSelectMlMiddleName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MlLastName"
              value={MlLastName}
              onChange={setSelectMlLastName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>{t("CR_GENDER")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitleB} select={selectTitleB} disabled={isEdit} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_DATE_OF_BIRTH_DECEASED")}`}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate} />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_AGE_OF_BIRTH_DECEASED")}`}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Ageofbirth"
              value={Ageofbirth}
              onChange={setSelectAgeofbirth}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AADHAR_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="AdharNo"
              value={AdharNo}
              onChange={setSelectAdharNo}
              disable={isEdit}
              {...(validation = { pattern: "^[0-9-.`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PASSPORT_DETAILS_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CardLabel>{t("CR_PASSPORT")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="PassportNo"
              value={PassportNo}
              onChange={setSelectPassportNo}
              disable={isEdit}
              {...(validation = { pattern: "^[0-9-.`' ]*$", isRequired: true, type: "number", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_NATIONALITY")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbNation} selected={setCountry} select={selectCountry} disabled={isEdit} />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbTitle}
              selected={setReligion}
              select={selectReligion}
              disabled={isEdit}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};  
export default InformationDeath;
