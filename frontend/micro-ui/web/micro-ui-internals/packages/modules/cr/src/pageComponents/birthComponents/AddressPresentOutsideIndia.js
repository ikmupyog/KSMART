import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresentOutsideIndia = ({ config, onSelect, userType, formData,
  presentOutSideIndiaAdressEn, setAdressEn, presentOutSideIndiaAdressMl, setAdressMl, presentOutSideIndiaAdressEnB, setAdressEnB, presentOutSideIndiaAdressMlB, setAdressMlB, presentOutSideIndiaLocalityEn, setLocalityEn,
  presentOutSideIndiaLocalityMl, setLocalityMl, presentOutSideIndiaProvinceEn, setProvinceEn, presentOutSideIndiaProvinceMl, setProvinceMl, presentOutSideIndiaPostCode, setPostCode, presentOutSideCountry,
  setOutSideCountry, presentOutSideIndiaResNoEn, setResNoEn, presentOutSideIndiaResNoMl, setResNoMl, presentOutSideIndiaHouseNameEn, setHouseNameEn, presentOutSideIndiaHouseNameMl, setHouseNameMl,
  countryvalue, setCountryValue
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  // const [presentOutSideIndiaAdressEn, setAdressEn] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaAdressEn);
  // const [presentOutSideIndiaAdressMl, setAdressMl] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaAdressMl);
  // const [presentOutSideIndiaAdressEnB, setAdressEnB] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaAdressEnB);
  // const [presentOutSideIndiaAdressMlB, setAdressMlB] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaAdressMlB);
  // const [presentOutSideIndiaLocalityEn, setLocalityEn] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaLocalityEn);
  // const [presentOutSideIndiaLocalityMl, setLocalityMl] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaLocalityMl);
  // const [presentOutSideIndiaProvinceEn, setProvinceEn] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaProvinceEn);
  // const [presentOutSideIndiaProvinceMl, setProvinceMl] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaProvinceMl);
  // const [presentOutSideIndiaPostCode, setPostCode] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaPostCode);
  // const [presentOutSideCountry, setOutSideCountry] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideCountry);
  // const [presentOutSideIndiaResNoEn, setResNoEn] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaResNoEn);
  // const [presentOutSideIndiaResNoMl, setResNoMl] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaResNoMl);
  // const [presentOutSideIndiaHouseNameEn, setHouseNameEn] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaHouseNameEn);
  // const [presentOutSideIndiaHouseNameMl, setHouseNameMl] = useState(formData?.AddressOutsideIndiaDetails?.presentOutSideIndiaHouseNameMl);
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
    // sessionStorage.setItem("presentOutSideIndiaAdressEn", presentOutSideIndiaAdressEn ? presentOutSideIndiaAdressEn  : null);
    // sessionStorage.setItem("presentOutSideIndiaAdressMl", presentOutSideIndiaAdressMl  ? presentOutSideIndiaAdressMl  : null);
    // sessionStorage.setItem("presentOutSideIndiaAdressEnB", presentOutSideIndiaAdressEnB  ? presentOutSideIndiaAdressEnB  : null);
    // sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB  ? presentOutSideIndiaAdressMlB  : null) ;
    // sessionStorage.setItem("presentOutSideIndiaAdressMlB", presentOutSideIndiaAdressMlB  ? presentOutSideIndiaAdressMlB  : null);
    // sessionStorage.setItem("presentOutSideIndiaLocalityMl", presentOutSideIndiaLocalityMl  ? presentOutSideIndiaLocalityMl  : null);
    // sessionStorage.setItem("presentOutSideIndiaProvinceEn", presentOutSideIndiaProvinceEn  ? presentOutSideIndiaProvinceEn  : null);
    // sessionStorage.setItem("presentOutSideIndiaProvinceMl", presentOutSideIndiaProvinceMl  ? presentOutSideIndiaProvinceMl  : null);
    // sessionStorage.setItem("presentOutSideIndiaPostCode", presentOutSideIndiaPostCode  ? presentOutSideIndiaPostCode  : null);
    // sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry ? presentOutSideCountry.code : null);
    // sessionStorage.setItem("presentOutSideCountry", presentOutSideCountry  ? presentOutSideCountry  : null);
    // sessionStorage.setItem("presentOutSideIndiaResNoMl", presentOutSideIndiaResNoMl  ? presentOutSideIndiaResNoMl  : null);
    // sessionStorage.setItem("presentOutSideIndiaHouseNameEn", presentOutSideIndiaHouseNameEn  ? presentOutSideIndiaHouseNameEn  : null);
    // sessionStorage.setItem("presentOutSideIndiaHouseNameMl", presentOutSideIndiaHouseNameMl  ? presentOutSideIndiaHouseNameMl  : null);


    // onSelect(config.key, { presentOutSideIndiaAdressEn, presentOutSideIndiaAdressMl, presentOutSideIndiaAdressEnB, presentOutSideIndiaAdressMlB, presentOutSideIndiaAdressMlB, presentOutSideIndiaLocalityMl, presentOutSideIndiaProvinceEn, presentOutSideIndiaProvinceMl, presentOutSideCountry, });
  
  };
  if (isCountryLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!presentOutSideIndiaAdressEn}>
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
                selected={presentOutSideCountry}
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
                name="presentOutSideIndiaProvinceEn"
                value={presentOutSideIndiaProvinceEn}
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
                name="presentOutSideIndiaProvinceMl"
                value={presentOutSideIndiaProvinceMl}
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
                name="presentOutSideIndiaAdressEn"
                value={presentOutSideIndiaAdressEn}
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
                name="presentOutSideIndiaAdressMl"
                value={presentOutSideIndiaAdressMl}
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
                name="presentOutSideIndiaAdressEnB"
                value={presentOutSideIndiaAdressEnB}
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
                name="presentOutSideIndiaAdressMlB"
                value={presentOutSideIndiaAdressMlB}
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
                name="presentOutSideIndiaLocalityEn"
                value={presentOutSideIndiaLocalityEn}
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
                name="presentOutSideIndiaLocalityMl"
                value={presentOutSideIndiaLocalityMl}
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
                name="presentOutSideIndiaResNoEn"
                value={presentOutSideIndiaResNoEn}
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
                name="presentOutSideIndiaResNoMl"
                value={presentOutSideIndiaResNoMl}
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
                name="presentOutSideIndiaHouseNameEn"
                value={presentOutSideIndiaHouseNameEn}
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
                name="presentOutSideIndiaHouseNameMl"
                value={presentOutSideIndiaHouseNameMl}
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
              name="presentOutSideIndiaPostCode"
              value={presentOutSideIndiaPostCode}
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
