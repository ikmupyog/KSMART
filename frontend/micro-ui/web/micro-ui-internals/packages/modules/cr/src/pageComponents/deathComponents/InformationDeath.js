import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker } from "@egovernments/digit-ui-react-components";
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
  const [setTitle, setSelectedTitle] = useState(formData?.DeathDetails?.setTitle);
  const [setTitleB, setSelectedTitleB] = useState(formData?.DeathDetails?.setTitle);
  // const [setReligion, setSelectedReligion] = useState(formData?.TradeDetails?.setReligion);
  const [setCountry, setSelectedCountry] = useState(formData?.TradeDetails?.setCountry);
  const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.DeathDetails?.setPlaceofActivity);
  // const [Gender, selectGender] = useState(formData?.DeathDetails?.Gender);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [FirstName, setFirstName] = useState(null);
  const [MiddleName, setMiddleName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [MLFirstName, setMLFirstName] = useState(null);
  const [MlMiddleName, setMlMiddleName] = useState(null);
  const [MlLastName, setMlLastName] = useState(null);
  const [Ageofbirth, setAgeofbirth] = useState(null);
  const [AdharNo, setAdharNo] = useState(null);
  const [PassportNo, setPassportNo] = useState(null);

  const [CommencementDate, setCommencementDate] = useState();
  const [DeathDate, setDeathDate] = useState();
  const [FromDate, setFromDate] = useState();
  const [ToDate, setToDate] = useState();

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
  function selectPlaceofactivity(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedPlaceofActivity(value);
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
  function setselectGender(value) {
    selectGender(value);
  }
  // function selectReligion(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedReligion(value);
  // }
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
  function setSelectTradeName(e) {
    setTradeName(e.target.value);
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
  const onSkip = () => onSelect();
  const goNext = () => {
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, { setPlaceofActivity });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        {/* //    isDisabled={!CommencementDate} */}
        <header className="tittle">Information Deceased</header>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Date of Death")}`}</span>
            </h1>
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
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
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
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
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
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
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
          <div className="col-md-1">
            <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("m")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("s")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>{t("CR_TO_DATE")}</CardLabel>
            {/* date={CommencementDate} */}
            <DatePicker date={ToDate} name="ToDate" onChange={selectToDate} />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("CR_TO_TIME")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("m")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
          <div className="col-md-1">
            <CardLabel>{t("s")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="TradeName"
              value={TradeName}
              onChange={setSelectTradeName}
              disable={isEdit}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Name of Deceased")}`}</span>
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
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Aadhar of Deceased")}`}</span>
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
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Passport Details of Deceased")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <CardLabel>{t("CR_NANationalityTIONALITY")}</CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbNation} selected={setCountry} select={selectCountry} disabled={isEdit} />
          </div>
          <div className="col-md-4">
            <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbTitle}
              selected={setPlaceofActivity}
              select={selectPlaceofactivity}
              disabled={isEdit}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
