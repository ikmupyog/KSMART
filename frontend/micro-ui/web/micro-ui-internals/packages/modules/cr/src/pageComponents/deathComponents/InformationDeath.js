import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

// const [inside, setInside] = useState(true);
// const [outside, setOutside] = useState(false);
// const insideHandler = () => {
//   setInside(true);
//   setOutside(false);
// };
// const outsideHandler = () => {
//   setInside(false);
//   setOutside(true);
// };
const InformationDeath = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const [Gender, selectGender] = useState(formData?.InformationDeath?.Gender);
  const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");

  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  const { data: religion = {}, isreligionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const [setTitle, setSelectedTitle] = useState(formData?.InformationDeath?.setTitle);
  const [setTitleB, setSelectedTitleB] = useState(formData?.InformationDeath?.setTitleB);
  const [setCountry, setSelectedCountry] = useState(formData?.InformationDeath?.setCountry);
  const [setReligion, setSelectedReligion] = useState(formData?.InformationDeath?.setReligion);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
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
  const [DeathTimeFrom, setDeathTimeFrom] = useState(formData?.InformationDeath?.DeathTimeFrom);
  const [DeathTimeTo, setDeathTimeTo] = useState(formData?.InformationDeath?.DeathTimeTo);
  const [tripStartTime, setTripStartTime] = useState(formData?.InformationDeath?.tripStartTime);
  const [checked, setChecked] = useState(false);
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });

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
  let cmbTitle = [];
  title &&
    title["common-masters"] &&
    title["common-masters"].Title.map((ob) => {
      cmbTitle.push(ob);
    });
  let cmbReligion = [];
  religion &&
    religion["common-masters"] &&
    religion["common-masters"].Religion.map((ob) => {
      cmbReligion.push(ob);
    });
  function selectReligion(value) {
    setSelectedReligion(value);
  }
  function selectTitle(value) {
    setSelectedTitle(value);
  }
  function selectTitleB(value) {
    setSelectedTitleB(value);
  }
  function selectCountry(value) {
    setSelectedCountry(value);
  }
  function setselectGender(value) {
    selectGender(value);
  }
  function selectReligion(value) {
    setSelectedReligion(value);
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

  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const handleFromTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  const handleToTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };

  const onSkip = () => onSelect();
  const goNext = () => {
    sessionStorage.setItem("DeathDate", DeathDate);
    sessionStorage.setItem("tripStartTime", tripStartTime);
    sessionStorage.setItem("FirstName", FirstName);
    sessionStorage.setItem("MiddleName", MiddleName);
    sessionStorage.setItem("LastName", LastName);
    sessionStorage.setItem("MLFirstName", MLFirstName);
    sessionStorage.setItem("Ageofbirth", Ageofbirth);
    sessionStorage.setItem("AdharNo", AdharNo);
    sessionStorage.setItem("PassportNo", PassportNo);
    sessionStorage.setItem("FromDate", FromDate);
    sessionStorage.setItem("ToDate", ToDate);
    sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    sessionStorage.setItem("setTitleB", setTitleB ? setTitleB.code : null);
    sessionStorage.setItem("setCountry", setCountry ? setCountry.code : null);
    sessionStorage.setItem("setCountry", setReligion ? setReligion.code : null);
    sessionStorage.setItem("DeathTimeTo", DeathTimeTo);
    sessionStorage.setItem("DeathTimeFrom", DeathTimeFrom);
    sessionStorage.setItem("Gender", Gender ? Gender.code : null);

    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    onSelect(config.key, {
      DeathDate,
      tripStartTime,
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
      DeathTimeFrom,
      DeathTimeTo,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        {/* //    isDisabled={!CommencementDate} */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CheckBox label={t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")} onChange={() => setChecked((checked) => !checked)} value={checked} />
            </div>
            <div className="col-md-6">
              <CheckBox label={t("CR_UNCLAIMED_DEAD_BODY")} />
            </div>
          </div>
        </div>
        <div>
          {/* {outside && ( */}

          {/* )} */}
        </div>

        <div>
          {/* {inside && ( */}
          {checked ? (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>{t("CR_FROM_DATE")}<span className="mandatorycss">*</span></CardLabel>
                  <DatePicker date={FromDate} name="FromDate" onChange={selectFromDate}/>
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CR_FROM_TIME")}</CardLabel>
                  <CustomTimePicker name="DeathTimeFrom" onChange={(val) => handleFromTimeChange(val, setDeathTimeFrom)} value={DeathTimeFrom} />
                </div>

                <div className="col-md-3">
                  <CardLabel>{t("CR_TO_DATE")}<span className="mandatorycss">*</span></CardLabel>
                  <DatePicker date={ToDate} name="ToDate" onChange={selectToDate} />
                </div>
                <div className="col-md-3">
                  <CardLabel>{t("CR_TO_TIME")}</CardLabel>
                  <CustomTimePicker name="DeathTimeTo" onChange={(val) => handleToTimeChange(val, setDeathTimeTo)} value={DeathTimeTo} />
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_DATE_OF_DEATH")}<span className="mandatorycss">*</span></CardLabel>
                  {/* date={CommencementDate} */}
                  <DatePicker date={DeathDate} name="DeathDate" onChange={selectDeathDate} />
                </div>
                <div className="col-md-2">
                  <CardLabel>{t("CR_TIME_OF_DEATH")}</CardLabel>
                  <CustomTimePicker name="tripStartTime" onChange={(val) => handleTimeChange(val, setTripStartTime)} value={tripStartTime} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
              <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbTitle} selected={setTitle} select={selectTitle} disabled={isEdit} placeholder={`${t("CR_TITLE_NAME_EN")}`} />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="FirstName"
                value={FirstName}
                onChange={setSelectFirstName}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
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
                placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
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
                placeholder={`${t("CR_LAST_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$",isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>{`${t("CR_TITLE_NAME_ML")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="namelocal"
                isMandatory={false}
                option={cmbTitle}
                selected={setTitleB}
                select={selectTitleB}
                disabled={isEdit}
                placeholder={`${t("CR_GENDERCR_TITLE_NAME_ML")}`}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="MLFirstName"
                value={MLFirstName}
                onChange={setSelectMLFirstName}
                disable={isEdit}
                placeholder={`${t("CR_FIRST_NAME_ML")}`}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
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
                placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })}
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
                placeholder={`${t("CR_LAST_NAME_ML")}`}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{t("CR_GENDER")} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={true}
                option={menu}
                selected={Gender}
                select={setselectGender}
                disabled={isEdit}
                placeholder={`${t("CR_GENDER")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_GENDER") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{`${t("CR_DATE_OF_BIRTH_DECEASED")}`}</CardLabel>
              {/* date={CommencementDate} */}
              <DatePicker date={CommencementDate} name="CommencementDate" onChange={selectCommencementDate} placeholder={`${t("CR_DATE_OF_BIRTH_DECEASED")}`} />
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
                placeholder={`${t("CR_AGE_OF_BIRTH_DECEASED")}`}
                {...(validation = { pattern: "^([0-9]){2}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AADHAR_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_AADHAR_OF_DECEASED")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdharNo"
                value={AdharNo}
                onChange={setSelectAdharNo}
                disable={isEdit}
                placeholder={`${t("CR_AADHAR_OF_DECEASED")}`}
                {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_PASSPORT_DETAILS_OF_DECEASED")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PassportNo"
                value={PassportNo}
                onChange={setSelectPassportNo}
                disable={isEdit}
                placeholder={`${t("CR_PASSPORT_DETAILS_OF_DECEASED")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "Text", title: t("CR_INVALID_PASSPORT_NO") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PASSPORT_DETAILS_OF_DECEASED")}`}</span>
            </h1>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_NATIONALITY")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbNation}
                selected={setCountry}
                select={selectCountry}
                disabled={isEdit}
                placeholder={`${t("CR_NATIONALITY")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CS_COMMON_RELIGION")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbReligion}
                selected={setReligion}
                select={selectReligion}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_RELIGION")}`}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default InformationDeath;
