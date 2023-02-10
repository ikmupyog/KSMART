import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPermanentOutsideIndia = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [PermntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.PermntOutsideIndiaCountry
      ? formData?.AddressPermanentOutsideIndiaDetails?.PermntOutsideIndiaCountry
      : null
  );
  const [PermntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.PermntOutsideIndiaprovinceEn
      ? formData?.AddressPermanentOutsideIndiaDetails?.PermntOutsideIndiaprovinceEn
      : null
  );
  const [adrsPermntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaVillage
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaVillage
      : null
  );
  const [adrsPermntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaCityTown
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaCityTown
      : null
  );
  const [postCode, setpostCode] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.postCode ? formData?.AddressPermanentOutsideIndiaDetails?.postCode : null
  );

  const [adrsPermntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLinetwoEn
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLinetwoEn
      : null
  );
  const [adrsPermntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLinetwoMl
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLinetwoMl
      : null
  );

  const [adrsPermntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLineoneEn
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLineoneEn
      : null
  );
  const [adrsPermntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(
    formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLineoneMl
      ? formData?.AddressPermanentOutsideIndiaDetails?.adrsPermntOutsideIndiaLineoneMl
      : null
  );

  // const [CommencementDate, setCommencementDate] = useState();
  let cmbVillage = [];
  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
  ];
  let naturetypecmbvalue = null;
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const onSkip = () => onSelect();

  function setSelectadrsPermntOutsideIndiaVillage(value) {
    setadrsPermntOutsideIndiaVillage(value);
    console.log("Village" + cmbVillage);
  }

  function setSelectadrsPermntOutsideIndiaCityTown(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setadrsPermntOutsideIndiaCityTown(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectadrsPermntOutsideIndiaLinetwoEn(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setadrsPermntOutsideIndiaLinetwoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
  }
  function setSelectadrsPermntOutsideIndiaLinetwoMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setadrsPermntOutsideIndiaLinetwoMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  }

  function setSelectadrsPermntOutsideIndiaLineoneEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setadrsPermntOutsideIndiaLineoneEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectadrsPermntOutsideIndiaLineoneMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setadrsPermntOutsideIndiaLineoneMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectPermntOutsideIndiaprovinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setPermntOutsideIndiaprovinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectPermntOutsideIndiaCountry(value) {
    setPermntOutsideIndiaCountry(value);
    console.log("Country" + cmbCountry);
  }
  function setSelectpostCode(e) {
    setpostCode(e.target.value);
  }
  function setSelectpostCode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setpostCode(e.target.value);
        return false;
      } else {
        setpostCode(e.target.value);
      }
    } else {
      setpostCode(e.target.value);
    }
  }

  const goNext = () => {
    sessionStorage.setItem("PermntOutsideIndiaCountry", PermntOutsideIndiaCountry ? PermntOutsideIndiaCountry.code : null);
    sessionStorage.setItem("PermntOutsideIndiaprovinceEn", PermntOutsideIndiaprovinceEn ? PermntOutsideIndiaprovinceEn : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaVillage", adrsPermntOutsideIndiaVillage ? adrsPermntOutsideIndiaVillage.code : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaCityTown", adrsPermntOutsideIndiaCityTown ? adrsPermntOutsideIndiaCityTown : null);
    sessionStorage.setItem("postCode", postCode ? postCode : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaLinetwoEn", adrsPermntOutsideIndiaLinetwoEn ? adrsPermntOutsideIndiaLinetwoEn : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaLinetwoMl", adrsPermntOutsideIndiaLinetwoMl ? adrsPermntOutsideIndiaLinetwoMl : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaLineoneEn", adrsPermntOutsideIndiaLineoneEn ? adrsPermntOutsideIndiaLineoneEn : null);
    sessionStorage.setItem("adrsPermntOutsideIndiaLineoneMl", adrsPermntOutsideIndiaLineoneMl ? adrsPermntOutsideIndiaLineoneMl : null);

    onSelect(config.key, {
      PermntOutsideIndiaCountry,
      PermntOutsideIndiaprovinceEn,
      adrsPermntOutsideIndiaVillage,
      adrsPermntOutsideIndiaCityTown,
      postCode,
      adrsPermntOutsideIndiaLinetwoEn,
      adrsPermntOutsideIndiaLinetwoMl,
      adrsPermntOutsideIndiaLineoneEn,
      adrsPermntOutsideIndiaLineoneMl,
    });
  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PermntOutsideIndiaCountry}>
        {/* <header className="card-header" style={{ fontSize: "35px" }}>
          {t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}
        </header> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_COUNTRY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbCountry}
                selected={PermntOutsideIndiaCountry}
                select={setSelectPermntOutsideIndiaCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaprovinceEn"
                value={PermntOutsideIndiaprovinceEn}
                onChange={setSelectPermntOutsideIndiaprovinceEn}
                disable={isEdit}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CR_TOWN_VILLAGE_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="i18nKey"
                isMandatory={true}
                option={cmbUrbanRural}
                selected={adrsPermntOutsideIndiaVillage}
                select={setSelectadrsPermntOutsideIndiaVillage}
                disabled={isEdit}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_CITY_TOWN_EN")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsPermntOutsideIndiaCityTown"
                value={adrsPermntOutsideIndiaCityTown}
                onChange={setSelectadrsPermntOutsideIndiaCityTown}
                disable={isEdit}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="postCode"
                value={postCode}
                onChange={setSelectpostCode}
                disable={isEdit}
                placeholder={`${t("CR_ZIP_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.0-9`' ]*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_ZIP_CODE"),
                })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsPermntOutsideIndiaLineoneEn"
                value={adrsPermntOutsideIndiaLineoneEn}
                onChange={setSelectadrsPermntOutsideIndiaLineoneEn}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsPermntOutsideIndiaLinetwoEn"
                value={adrsPermntOutsideIndiaLinetwoEn}
                onChange={setSelectadrsPermntOutsideIndiaLinetwoEn}
                disable={isEdit}
                placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsPermntOutsideIndiaLineoneMl"
                value={adrsPermntOutsideIndiaLineoneMl}
                onChange={setSelectadrsPermntOutsideIndiaLineoneMl}
                placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_ONE_ML"),
                })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_ML")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsPermntOutsideIndiaLinetwoMl"
                value={adrsPermntOutsideIndiaLinetwoMl}
                onChange={setSelectadrsPermntOutsideIndiaLinetwoMl}
                disable={isEdit}
                placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_TWO_ML"),
                })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12"></div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentOutsideIndia;
