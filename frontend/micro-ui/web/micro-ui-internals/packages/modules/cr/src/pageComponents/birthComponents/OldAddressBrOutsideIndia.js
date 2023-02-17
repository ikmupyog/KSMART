import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressBrOutsideIndia = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const [outsideCountry, setoutsideCountry] = useState(
    formData?.AddressBrOutsideIndiaDetails?.outsideCountry ? formData?.AddressBrOutsideIndiaDetails?.outsideCountry : null
  );
  const [provinceEn, setprovinceEn] = useState(
    formData?.AddressBrOutsideIndiaDetails?.provinceEn ? formData?.AddressBrOutsideIndiaDetails?.provinceEn : null
  );
  const [adrsVillage, setadrsVillage] = useState(
    formData?.AddressBrOutsideIndiaDetails?.adrsVillage ? formData?.AddressBrOutsideIndiaDetails?.adrsVillage : null
  );
  const [adrsCityTown, setadrsCityTown] = useState(
    formData?.AddressBrOutsideIndiaDetails?.adrsCityTown ? formData?.AddressBrOutsideIndiaDetails?.adrsCityTown : null
  );
  const [postCode, setpostCode] = useState(
    formData?.AddressBrOutsideIndiaDetails?.postCode ? formData?.AddressBrOutsideIndiaDetails?.postCode : null
  );

  const [addressLinetwoEn, setaddressLinetwoEn] = useState(
    formData?.AddressBrOutsideIndiaDetails?.addressLinetwoEn ? formData?.AddressBrOutsideIndiaDetails?.addressLinetwoEn : null
  );
  const [addressLinetwoMl, setaddressLinetwoMl] = useState(
    formData?.AddressBrOutsideIndiaDetails?.addressLinetwoMl ? formData?.AddressBrOutsideIndiaDetails?.addressLinetwoMl : null
  );

  const [addressLineoneEn, setaddressLineoneEn] = useState(
    formData?.AddressBrOutsideIndiaDetails?.addressLineoneEn ? formData?.AddressBrOutsideIndiaDetails?.addressLineoneEn : null
  );
  const [addressLineoneMl, setaddressLineoneMl] = useState(
    formData?.AddressBrOutsideIndiaDetails?.addressLineoneMl ? formData?.AddressBrOutsideIndiaDetails?.addressLineoneMl : null
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

  function setSelectadrsVillage(value) {
    setadrsVillage(value);
    console.log("Village" + cmbVillage);
  }

  function setSelectadrsCityTown(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setadrsCityTown(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectaddressLinetwoEn(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setaddressLinetwoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
  }
  function setSelectaddressLinetwoMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setaddressLinetwoMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  }

  function setSelectaddressLineoneEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setaddressLineoneEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectaddressLineoneMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setaddressLineoneMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectprovinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setprovinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectoutsideCountry(value) {
    setoutsideCountry(value);
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
    sessionStorage.setItem("outsideCountry", outsideCountry ? outsideCountry.code : null);
    sessionStorage.setItem("provinceEn", provinceEn ? provinceEn : null);
    sessionStorage.setItem("adrsVillage", adrsVillage ? adrsVillage.code : null);
    sessionStorage.setItem("adrsCityTown", adrsCityTown ? adrsCityTown : null);
    sessionStorage.setItem("postCode", postCode ? postCode : null);
    sessionStorage.setItem("addressLinetwoEn", addressLinetwoEn ? addressLinetwoEn : null);
    sessionStorage.setItem("addressLinetwoMl", addressLinetwoMl ? addressLinetwoMl : null);
    sessionStorage.setItem("addressLineoneEn", addressLineoneEn ? addressLineoneEn : null);
    sessionStorage.setItem("addressLineoneMl", addressLineoneMl ? addressLineoneMl : null);

    onSelect(config.key, {
      outsideCountry,
      provinceEn,
      adrsVillage,
      adrsCityTown,
      postCode,
      addressLinetwoEn,
      addressLinetwoMl,
      addressLineoneEn,
      addressLineoneMl,
    });
  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!outsideCountry}>
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
                selected={outsideCountry}
                select={setSelectoutsideCountry}
                disabled={isEdit}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="provinceEn"
                value={provinceEn}
                onChange={setSelectprovinceEn}
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
                selected={adrsVillage}
                select={setSelectadrsVillage}
                disabled={isEdit}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="adrsCityTown"
                value={adrsCityTown}
                onChange={setSelectadrsCityTown}
                disable={isEdit}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")} <span className="mandatorycss">*</span></CardLabel>
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
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="addressLineoneEn"
                value={addressLineoneEn}
                onChange={setSelectaddressLineoneEn}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="addressLinetwoEn"
                value={addressLinetwoEn}
                onChange={setSelectaddressLinetwoEn}
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
              <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")}<span className="mandatorycss">*</span></CardLabel> 
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="addressLineoneMl"
                value={addressLineoneMl}
                onChange={setSelectaddressLineoneMl}
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
                name="addressLinetwoMl"
                value={addressLinetwoMl}
                onChange={setSelectaddressLinetwoMl}
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
export default AddressBrOutsideIndia;
