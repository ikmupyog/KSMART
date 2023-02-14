import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPermanentOutsideIndia = ({ config, onSelect, userType, formData, PermntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn,
  PermntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl, PermntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn, PermntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl,
  PermntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn, PermntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage,
  PermntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown, PermanentOutsideIndiaPostCode, setPermantpostCode, PermntOutsideIndiaCountry,
  setPermntOutsideIndiaCountry, countryvalue, setCountryValue,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [PermntOutsideIndiaLineoneEn, setadrsPermntOutsideIndiaLineoneEn] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaLineoneEn);
  // const [PermntOutsideIndiaLineoneMl, setadrsPermntOutsideIndiaLineoneMl] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaLineoneMl);
  // const [PermntOutsideIndiaLinetwoEn, setadrsPermntOutsideIndiaLinetwoEn] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaLinetwoEn);
  // const [PermntOutsideIndiaLinetwoMl, setadrsPermntOutsideIndiaLinetwoMl] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaLinetwoMl);
  // const [PermntOutsideIndiaprovinceEn, setPermntOutsideIndiaprovinceEn] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaprovinceEn);
  // const [PermntOutsideIndiaVillage, setadrsPermntOutsideIndiaVillage] = useState(formData?.AddressBrOutsideIndiaDetails?.PermntOutsideIndiaVillage ? formData?.AddressBrOutsideIndiaDetails?.PermntOutsideIndiaVillage : null);
  // const [PermntOutsideIndiaCityTown, setadrsPermntOutsideIndiaCityTown] = useState(formData?.AddressBrOutsideIndiaDetails?.PermntOutsideIndiaCityTown ? formData?.AddressBrOutsideIndiaDetails?.PermntOutsideIndiaCityTown : null);
  // const [PermanentOutsideIndiaPostCode, setPermantpostCode] = useState(formData?.AddressOutsideIndiaDetails?.PermanentOutsideIndiaPostCode);
  // const [PermntOutsideIndiaCountry, setPermntOutsideIndiaCountry] = useState(formData?.AddressOutsideIndiaDetails?.PermntOutsideIndiaCountry);


  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let cmbVillage = [];
  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
  ];
  const onSkip = () => onSelect();

  function setSelectadrsPermntOutsideIndiaVillage(value) {
    setadrsPermntOutsideIndiaVillage(value);
  }

  function setSelectadrsPermntOutsideIndiaCityTown(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setadrsPermntOutsideIndiaCityTown(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }

  function setSelectadrsPermntOutsideIndiaLineoneEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setadrsPermntOutsideIndiaLineoneEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
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
  function setSelectadrsPermntOutsideIndiaLineoneMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setadrsPermntOutsideIndiaLineoneMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  }
  function setSelectLocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setLocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
  }
  function setSelectLocalityMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setLocalityMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  }
  function setSelectResNoEn(e) {
    if (e.target.value.length === 20) {
      return false;
    } else {
      setResNoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectResNoMl(e) {
    if (e.target.value.length === 20) {
      return false;
    } else {
      setResNoMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectPermntOutsideIndiaprovinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setPermntOutsideIndiaprovinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectProvinceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectPermntOutsideIndiaCountry(value) {
    setPermntOutsideIndiaCountry(value);
  }
  // function setSelectPostCode(e) {
  //   setPermantpostCode(e.target.value);
  // }
  function setSelectPostCode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setPermantpostCode(e.target.value);
        return false;
      } else {
        setPermantpostCode(e.target.value);
      }
    } else {
      setPermantpostCode(e.target.value);
    }
  }
  const goNext = () => {
    // sessionStorage.setItem("PermntOutsideIndiaLineoneEn", PermntOutsideIndiaLineoneEn ? PermntOutsideIndiaLineoneEn  : null);
    // sessionStorage.setItem("PermntOutsideIndiaLineoneMl", PermntOutsideIndiaLineoneMl  ? PermntOutsideIndiaLineoneMl  : null);
    // sessionStorage.setItem("PermntOutsideIndiaLinetwoEn", PermntOutsideIndiaLinetwoEn  ? PermntOutsideIndiaLinetwoEn  : null);
    // sessionStorage.setItem("PermntOutsideIndiaLinetwoMl", PermntOutsideIndiaLinetwoMl  ? PermntOutsideIndiaLinetwoMl  : null) ;
    // sessionStorage.setItem("PermntOutsideIndiaprovinceEn", PermntOutsideIndiaprovinceEn  ? PermntOutsideIndiaprovinceEn  : null);
    // sessionStorage.setItem("PermntOutsideIndiaVillage", PermntOutsideIndiaVillage ? PermntOutsideIndiaVillage.code : null);
    // sessionStorage.setItem("PermntOutsideIndiaCityTown", PermntOutsideIndiaCityTown ? PermntOutsideIndiaCityTown : null);
    // sessionStorage.setItem("PermanentOutsideIndiaPostCode", PermanentOutsideIndiaPostCode  ? PermanentOutsideIndiaPostCode  : null);
    // sessionStorage.setItem("PermntOutsideIndiaCountry", PermntOutsideIndiaCountry ? PermntOutsideIndiaCountry.code : null);

    // onSelect(config.key, { PermntOutsideIndiaLineoneEn,PermntOutsideIndiaLineoneMl, PermntOutsideIndiaLinetwoEn,PermntOutsideIndiaLinetwoMl,
    //   PermntOutsideIndiaprovinceEn,PermntOutsideIndiaVillage,PermntOutsideIndiaCityTown,PermanentOutsideIndiaPostCode,PermntOutsideIndiaCountry});
  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
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
                option={cmbCountry}
                selected={PermntOutsideIndiaCountry}
                select={setSelectPermntOutsideIndiaCountry}
                placeholder={`${t("CS_COMMON_COUNTRY")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaprovinceEn"
                value={PermntOutsideIndiaprovinceEn}
                onChange={setSelectPermntOutsideIndiaprovinceEn}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
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
                option={cmbUrbanRural}
                selected={PermntOutsideIndiaVillage}
                select={setSelectadrsPermntOutsideIndiaVillage}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaCityTown"
                value={PermntOutsideIndiaCityTown}
                onChange={setSelectadrsPermntOutsideIndiaCityTown}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermanentOutsideIndiaPostCode"
                value={PermanentOutsideIndiaPostCode}
                onChange={setSelectPostCode}
                placeholder={`${t("CR_ZIP_CODE")}`}
                {...(validation = {
                  pattern: "^[a-zA-Z-.0-9`' ]*$",
                  isRequired: false,
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
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaLineoneEn"
                value={PermntOutsideIndiaLineoneEn}
                onChange={setSelectadrsPermntOutsideIndiaLineoneEn}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaLinetwoEn"
                value={PermntOutsideIndiaLinetwoEn}
                onChange={setSelectadrsPermntOutsideIndiaLinetwoEn}
                placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_ML")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaLineoneMl"
                value={PermntOutsideIndiaLineoneMl}
                onChange={setSelectadrsPermntOutsideIndiaLineoneMl}
                placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_ONE_ML"),
                })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_ML")}</CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="PermntOutsideIndiaLinetwoMl"
                value={PermntOutsideIndiaLinetwoMl}
                onChange={setSelectadrsPermntOutsideIndiaLinetwoMl}
                placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_ADDRES_LINE_TWO_ML"),
                })}
              />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentOutsideIndia;
