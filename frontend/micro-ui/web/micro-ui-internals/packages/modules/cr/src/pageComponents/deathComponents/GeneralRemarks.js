import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, NewRadioButton, TextArea } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../components/DRTimeline";

const GeneralRemarks = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [TradeName, setTradeName] = useState(null);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.GeneralRemarks?.GeneralRemarks);
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });

  const onSkip = () => onSelect();
  function setSelectGeneralRemarks(e) {
    setGeneralRemarks(e.target.value);
  }

  const goNext = () => {
    console.log("test");
    sessionStorage.setItem("GeneralRemarks", GeneralRemarks);
    onSelect(config.key, { GeneralRemarks });
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GENERAL_REMARKS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_GENERAL_REMARKS")}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="GeneralRemarks"
                value={GeneralRemarks}
                onChange={setSelectGeneralRemarks}
                placeholder={`${t("CR_GENERAL_REMARKS")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
              {/* <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="GeneralRemarks" value={GeneralRemarks} onChange={setSelectGeneralRemarks} placeholder={`${t("CR_GENERAL_REMARKSNO")}`} disable={isEdit}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_GENERAL_REMARKS") })} /> */}
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default GeneralRemarks;
