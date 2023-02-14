import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresentOutsideIndia = ({ config, onSelect, userType, formData,
  AdressEn, setAdressEn, AdressMl, setAdressMl, AdressEnB, setAdressEnB, AdressMlB, setAdressMlB, LocalityEn, setLocalityEn,
  LocalityMl, setLocalityMl, ProvinceEn, setProvinceEn, ProvinceMl, setProvinceMl, PostCode, setPostCode, OutSideCountry,
  setOutSideCountry, ResNoEn, setResNoEn, ResNoMl, setResNoMl, HouseNameEn, setHouseNameEn, HouseNameMl, setHouseNameMl,
  countryvalue, setCountryValue
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [AdressEn, setAdressEn] = useState(formData?.AddressOutsideIndiaDetails?.AdressEn);
  // const [AdressMl, setAdressMl] = useState(formData?.AddressOutsideIndiaDetails?.AdressMl);
  // const [AdressEnB, setAdressEnB] = useState(formData?.AddressOutsideIndiaDetails?.AdressEnB);
  // const [AdressMlB, setAdressMlB] = useState(formData?.AddressOutsideIndiaDetails?.AdressMlB);
  // const [LocalityEn, setLocalityEn] = useState(formData?.AddressOutsideIndiaDetails?.LocalityEn);
  // const [LocalityMl, setLocalityMl] = useState(formData?.AddressOutsideIndiaDetails?.LocalityMl);
  // const [ProvinceEn, setProvinceEn] = useState(formData?.AddressOutsideIndiaDetails?.ProvinceEn);
  // const [ProvinceMl, setProvinceMl] = useState(formData?.AddressOutsideIndiaDetails?.ProvinceMl);
  // const [PostCode, setPostCode] = useState(formData?.AddressOutsideIndiaDetails?.PostCode);
  // const [OutSideCountry, setOutSideCountry] = useState(formData?.AddressOutsideIndiaDetails?.OutSideCountry);
  // const [ResNoEn, setResNoEn] = useState(formData?.AddressOutsideIndiaDetails?.ResNoEn);
  // const [ResNoMl, setResNoMl] = useState(formData?.AddressOutsideIndiaDetails?.ResNoMl);
  // const [HouseNameEn, setHouseNameEn] = useState(formData?.AddressOutsideIndiaDetails?.HouseNameEn);
  // const [HouseNameMl, setHouseNameMl] = useState(formData?.AddressOutsideIndiaDetails?.HouseNameMl);
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const onSkip = () => onSelect();

  function setSelectAdressEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdressEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectAdressEnB(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressEnB(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
  }

  function setSelectAdressMlB(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressMlB(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
  }
  function setSelectAdressMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
  }
  function setSelectLocalityEn(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setLocalityEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
  }
  function setSelectLocalityMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setLocalityMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
  }
  function setSelectResNoEn(e) {
    if (e.target.value.length === 20) {
      return false;
    } else {
      setResNoEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectResNoMl(e) {
    if (e.target.value.length === 20) {
      return false;
    } else {
      setResNoMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setHouseNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectProvinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
    }
  }
  function setSelectProvinceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ''));
    }
  }
  function setSelectOutSideCountry(value) {
    setOutSideCountry(value);
    console.log("Country" + cmbCountry);
  }
  function setSelectPostCode(e) {
    setPostCode(e.target.value);
  }
  function setSelectPostCode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 10) {
        return false;
      } else if (e.target.value.length < 10) {
        setPostCode(e.target.value);
        return false;
      } else {
        setPostCode(e.target.value);
      }
    } else {
      setPostCode(e.target.value);
    }

  }
  const goNext = () => {
    // sessionStorage.setItem("AdressEn", AdressEn ? AdressEn  : null);
    // sessionStorage.setItem("AdressMl", AdressMl  ? AdressMl  : null);
    // sessionStorage.setItem("AdressEnB", AdressEnB  ? AdressEnB  : null);
    // sessionStorage.setItem("AdressMlB", AdressMlB  ? AdressMlB  : null) ;
    // sessionStorage.setItem("LocalityEn", LocalityEn  ? LocalityEn  : null);
    // sessionStorage.setItem("LocalityMl", LocalityMl  ? LocalityMl  : null);
    // sessionStorage.setItem("ProvinceEn", ProvinceEn  ? ProvinceEn  : null);
    // sessionStorage.setItem("ProvinceMl", ProvinceMl  ? ProvinceMl  : null);
    // sessionStorage.setItem("PostCode", PostCode  ? PostCode  : null);
    // sessionStorage.setItem("OutSideCountry", OutSideCountry ? OutSideCountry.code : null);
    // sessionStorage.setItem("ResNoEn", ResNoEn  ? ResNoEn  : null);
    // sessionStorage.setItem("ResNoMl", ResNoMl  ? ResNoMl  : null);
    // sessionStorage.setItem("HouseNameEn", HouseNameEn  ? HouseNameEn  : null);
    // sessionStorage.setItem("HouseNameMl", HouseNameMl  ? HouseNameMl  : null);


    // onSelect(config.key, { AdressEn, AdressMl, AdressEnB, AdressMlB, LocalityEn, LocalityMl, ProvinceEn, ProvinceMl, OutSideCountry, });
  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!AdressEn}>
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
                selected={OutSideCountry}
                select={setSelectOutSideCountry}
              />
            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STATE_REGION_PROVINCE_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ProvinceEn"
                value={ProvinceEn}
                onChange={setSelectProvinceEn}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_STATE_REGION_PROVINCE_ML")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ProvinceMl"
                value={ProvinceMl}
                onChange={setSelectProvinceMl}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STATE_REGION_PROVINCE_ML"),
                })}
              />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_CITY_TOWN_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressEn"
                value={AdressEn}
                onChange={setSelectAdressEn}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_CITY_TOWN_ML")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressMl"
                value={AdressMl}
                onChange={setSelectAdressMl}
                placeholder={`${t("CR_CITY_TOWN_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_TOWN_ML") })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressEnB"
                value={AdressEnB}
                onChange={setSelectAdressEnB}
                placeholder={`${t("CR_MAIN_PLACE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_MAIN_PLACE_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdressMlB"
                value={AdressMlB}
                onChange={setSelectAdressMlB}
                placeholder={`${t("CR_MAIN_PLACE_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="LocalityEn"
                value={LocalityEn}
                onChange={setSelectLocalityEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="LocalityMl"
                value={LocalityMl}
                onChange={setSelectLocalityMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ResNoEn"
                value={ResNoEn}
                onChange={setSelectResNoEn}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_RES_ASSOCIATION_NO_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ResNoMl"
                value={ResNoMl}
                onChange={setSelectResNoMl}
                placeholder={`${t("CR_RES_ASSOCIATION_NO_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_RES_ASSOCIATION_NO_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_EN")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="HouseNameEn"
                value={HouseNameEn}
                onChange={setSelectHouseNameEn}
                placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NAME_ML")}

              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="HouseNameMl"
                value={HouseNameMl}
                onChange={setSelectHouseNameMl}
                placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
              />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_ZIP_CODE")}

            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="PostCode"
              value={PostCode}
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
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPresentOutsideIndia;
