import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const AddressPresentOutsideIndia = ({
  config,
  onSelect,
  userType,
  formData,
  presentOutSideIndiaAdressEn,
  setAdressEn,
  presentOutSideIndiaAdressMl,
  setAdressMl,
  presentOutSideIndiaAdressEnB,
  setAdressEnB,
  presentOutSideIndiaAdressMlB,
  setAdressMlB,
  presentOutSideIndiaProvinceEn,
  setProvinceEn,
  presentOutSideIndiaadrsVillage,
  setadrsVillage,
  presentOutSideIndiaadrsCityTown,
  setadrsCityTown,
  presentOutSideIndiaPostCode,
  setPostCode,
  presentOutSideCountry,
  setOutSideCountry,
  countryvalue,
  setCountryValue,
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
  // const [presentOutSideIndiaadrsVillage, setadrsVillage] = useState(
  //   formData?.AddressBrOutsideIndiaDetails?.presentOutSideIndiaadrsVillage ? formData?.AddressBrOutsideIndiaDetails?.presentOutSideIndiaadrsVillage : null
  // );
  // const [presentOutSideIndiaadrsCityTown, setadrsCityTown] = useState(
  //   formData?.AddressBrOutsideIndiaDetails?.presentOutSideIndiaadrsCityTown ? formData?.AddressBrOutsideIndiaDetails?.presentOutSideIndiaadrsCityTown : null
  // );
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

  function setSelectAdressEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAdressEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectAdressEnB(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressEnB(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
  }

  function setSelectAdressMlB(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressMlB(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
  }
  function setSelectAdressMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setAdressMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
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
  function setSelectProvinceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectProvinceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setProvinceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
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
    // sessionStorage.setItem("presentOutSideIndiaadrsVillage", presentOutSideIndiaadrsVillage ? presentOutSideIndiaadrsVillage.code : null);
    // sessionStorage.setItem("presentOutSideIndiaadrsCityTown", presentOutSideIndiaadrsCityTown ? presentOutSideIndiaadrsCityTown : null);
    // onSelect(config.key, { presentOutSideIndiaadrsVillage,presentOutSideIndiaadrsCityTown, presentOutSideIndiaAdressEn, presentOutSideIndiaAdressEnB, presentOutSideIndiaAdressMlB, presentOutSideIndiaAdressMlB, presentOutSideIndiaProvinceEn,  presentOutSideCountry, });
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
            <div className="col-md-6">
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
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
                selected={presentOutSideIndiaadrsVillage}
                select={setSelectadrsVillage}
                placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CR_CITY_TOWN_EN")} <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaadrsCityTown"
                value={presentOutSideIndiaadrsCityTown}
                onChange={setSelectadrsCityTown}
                placeholder={`${t("CR_CITY_TOWN_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>{t("CR_ZIP_CODE")}</CardLabel>
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
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_ONE_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressEn"
                value={presentOutSideIndiaAdressEn}
                onChange={setSelectAdressEn}
                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
              />
            </div>

            <div className="col-md-6">
              <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressEnB"
                value={presentOutSideIndiaAdressEnB}
                onChange={setSelectAdressEnB}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressMl"
                value={presentOutSideIndiaAdressMl}
                onChange={setSelectAdressMl}
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
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="presentOutSideIndiaAdressMlB"
                value={presentOutSideIndiaAdressMlB}
                onChange={setSelectAdressMlB}
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
export default AddressPresentOutsideIndia;
