import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const PlaceOfDeathOther = ({
  config,
  onSelect,
  userType,
  formData,
  setDeathOtherward,
  setSelectedDeathOtherward,
  setDeathOtherPlace,
  setSelectedDeathOtherPlace,
  PlaceOfDeathOtherDetailsEn,
  setPlaceOfDeathOtherDetailsEn,
  PlaceOfDeathOtherDetailsMl,
  setPlaceOfDeathOtherDetailsMl,
}) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherDeathPlace");
  const [value, setValue] = useState();

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [setDeathOtherward, setSelectedDeathOtherward] = useState(formData?.PlaceOfDeathOther?.setDeathOtherward);
  // const [setDeathOtherPlace, setSelectedDeathOtherPlace] = useState(formData?.PlaceOfDeathOther?.setDeathOtherPlace);
  // const [PlaceOfDeathOtherDetailsEn, setPlaceOfDeathOtherDetailsEn] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsEn);
  // const [PlaceOfDeathOtherDetailsMl, setPlaceOfDeathOtherDetailsMl] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsMl);

  let naturetypecmbvalue = null;

  let cmbOtherplace = [];
  otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherDeathPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });

  const onSkip = () => onSelect();

  // function selectPlaceofactivity(value) {
  //   setSelectedPlaceofActivity(value);
  // }

  // function selectDeathOtherPlace(value) {
  //   setSelectedDeathOtherPlace(value);
  // }
  function selectDeathOtherward(value) {
    setSelectedDeathOtherward(value);
  }
  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }
  function setSelectPlaceOfDeathOtherDetailsEn(e) {
    setPlaceOfDeathOtherDetailsEn(e.target.value);
  }
  function setSelectPlaceOfDeathOtherDetailsMl(e) {
    setPlaceOfDeathOtherDetailsMl(e.target.value);
  }
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }

  const goNext = () => {
    // sessionStorage.setItem("setDeathOtherPlace", setDeathOtherPlace ? setDeathOtherPlace.code : null);
    // sessionStorage.setItem("setDeathOtherward", setDeathOtherward ? setDeathOtherward.code : null);
    // sessionStorage.setItem("PlaceOfDeathOtherDetailsEn", PlaceOfDeathOtherDetailsEn ? PlaceOfDeathOtherDetailsEn : null);
    // sessionStorage.setItem("PlaceOfDeathOtherDetailsMl", PlaceOfDeathOtherDetailsMl?PlaceOfDeathOtherDetailsMl: null);

    onSelect(config.key, {
      // setDeathOtherPlace,
      // setDeathOtherward,
      // PlaceOfDeathOtherDetailsEn,
      // PlaceOfDeathOtherDetailsMl,
    });
  };
  function selectDeathOtherPlace(value) {
    setSelectedDeathOtherPlace(value);
    setValue(value.code);
  }
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
     <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!setDeathOtherPlace}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH_OTHER")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_OTHER_PLACE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbOtherplace}
                selected={setDeathOtherPlace}
                select={selectDeathOtherPlace}
                disabled={isEdit}
                placeholder={`${t("CR_OTHER_PLACE")}`}
              />
            </div>
            <div className="col-md-6">
              {value === "OTHER_DEATH_PLACE_OUTSIDE_JURISDICTION" ? (
                <CardLabel>{`${t("CS_COMMON_BURIAL_WARD")}`}</CardLabel>
              ) : (
                <CardLabel>{`${t("CS_COMMON_WARD")}`}</CardLabel>
              )}

              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbOtherplace}
                selected={setDeathOtherward}
                select={selectDeathOtherward}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_OTHER_DETAILLS_EN")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfDeathOtherDetailsEn"
                value={PlaceOfDeathOtherDetailsEn}
                onChange={setSelectPlaceOfDeathOtherDetailsEn}
                disable={isEdit}
                placeholder={`${t("CR_OTHER_DETAILLS_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{`${t("CR_OTHER_DETAILS_ML")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PlaceOfDeathOtherDetailsMl"
                value={PlaceOfDeathOtherDetailsMl}
                onChange={setSelectPlaceOfDeathOtherDetailsMl}
                disable={isEdit}
                placeholder={`${t("CR_OTHER_DETAILS_ML")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.`' ]*$",
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_OTHER_DETAILS_ML"),
                })}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeathOther;
