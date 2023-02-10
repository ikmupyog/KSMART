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

  const [adrsCityTown, setadrsCityTown] = useState(formData?.AddressBrOutsideIndiaDetails?.adrsCityTown);
  const [adrsCityTownMl, setadrsCityTownMl] = useState(formData?.AddressBrOutsideIndiaDetails?.adrsCityTownMl);
  // const [adrsCityTownB, setadrsCityTownB] = useState(formData?.AddressBrOutsideIndiaDetails?.adrsCityTownB);
  // const [adrsCityTownMlB, setadrsCityTownMlB] = useState(formData?.AddressBrOutsideIndiaDetails?.adrsCityTownMlB);
  const [addressLinetwoEn, setaddressLinetwoEn] = useState(formData?.AddressBrOutsideIndiaDetails?.addressLinetwoEn);
  const [addressLinetwoMl, setaddressLinetwoMl] = useState(formData?.AddressBrOutsideIndiaDetails?.addressLinetwoMl);
  const [provinceEn, setprovinceEn] = useState(formData?.AddressBrOutsideIndiaDetails?.provinceEn);
  const [provinceMl, setprovinceMl] = useState(formData?.AddressBrOutsideIndiaDetails?.provinceMl);
  const [postCode, setpostCode] = useState(formData?.AddressBrOutsideIndiaDetails?.postCode);
  const [outsideCountry, setoutsideCountry] = useState(formData?.AddressBrOutsideIndiaDetails?.outsideCountry);
  const [ResNoEn, setResNoEn] = useState(formData?.AddressBrOutsideIndiaDetails?.ResNoEn);
  const [ResNoMl, setResNoMl] = useState(formData?.AddressBrOutsideIndiaDetails?.ResNoMl);
  const [addressLineoneEn, setaddressLineoneEn] = useState(formData?.AddressBrOutsideIndiaDetails?.addressLineoneEn);
  const [addressLineoneMl, setaddressLineoneMl] = useState(formData?.AddressBrOutsideIndiaDetails?.addressLineoneMl);
  const [isCitytownvillage, setIsCitytownvillage] = useState(
    formData?.CitytownvillageDetails?.isCitytownvillage ? formData?.CitytownvillageDetails?.isCitytownvillage : false
  );

  // const [CommencementDate, setCommencementDate] = useState();
  let naturetypecmbvalue = null;
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  const onSkip = () => onSelect();

  function setSelectadrsCityTown(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setadrsCityTown(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  // function setSelectadrsCityTownB(e) {
  //   if (e.target.value.length===51){
  //     return false;
  //   }
  //   setadrsCityTownB(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  // }

  // function setSelectadrsCityTownMlB(e) {
  //   if (e.target.value.length===51){
  //     return false;
  //   }
  //   setadrsCityTownMlB(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig,''));
  // }
  function setSelectadrsCityTownMl(e) {
    if (e.target.value.length === 51) {
      return false;
    }
    setadrsCityTownMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
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
  function setSelectprovinceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setprovinceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
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
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }
  function setCitytownvillage(e) {
    if (e.target.checked == true) {
      // setIsCitytownvillage(e.target.checked);
      // setFatherAadhar("");
      // setFatherFirstNameEn("");
      // setFatherMiddleNameEn("");
      // setFatherLastNameEn("");
      // setFatherFirstNameMl("");
      // setFatherMiddleNameMl("");
      // setFatherLastNameMl("");
      // setFatherNationality(null);
      // setFatherPassportNo("");
      // setFatherMobile("");
      // setFatherEmail("");
      // setFatherEducation(null);
      // setFatherProfession(null);
    } else {
      // setIsCitytownvillage(e.target.checked);
    }
  }

  const goNext = () => {
    sessionStorage.setItem("adrsCityTown", adrsCityTown ? adrsCityTown : null);
    // sessionStorage.setItem("adrsCityTownMl", adrsCityTownMl  ? adrsCityTownMl  : null);
    // sessionStorage.setItem("adrsCityTownB", adrsCityTownB  ? adrsCityTownB  : null);
    // sessionStorage.setItem("adrsCityTownMlB", adrsCityTownMlB  ? adrsCityTownMlB  : null) ;
    sessionStorage.setItem("addressLinetwoEn", addressLinetwoEn ? addressLinetwoEn : null);
    sessionStorage.setItem("addressLinetwoMl", addressLinetwoMl ? addressLinetwoMl : null);
    sessionStorage.setItem("provinceEn", provinceEn ? provinceEn : null);
    // sessionStorage.setItem("provinceMl", provinceMl  ? provinceMl  : null);
    sessionStorage.setItem("postCode", postCode ? postCode : null);
    sessionStorage.setItem("outsideCountry", outsideCountry ? outsideCountry.code : null);
    sessionStorage.setItem("ResNoEn", ResNoEn ? ResNoEn : null);
    sessionStorage.setItem("ResNoMl", ResNoMl ? ResNoMl : null);
    sessionStorage.setItem("addressLineoneEn", addressLineoneEn ? addressLineoneEn : null);
    sessionStorage.setItem("addressLineoneMl", addressLineoneMl ? addressLineoneMl : null);
    sessionStorage.setItem("isCitytownvillage", isCitytownvillage ? isCitytownvillage : null);

    onSelect(config.key, {
      adrsCityTown,
      outsideCountry,
      provinceEn,
      postCode,
      isCitytownvillage,
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
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!adrsCityTown}>
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
              <CardLabel>{t("CR_STATE_REGION_PROVINCE_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="provinceEn"
                value={provinceEn}
                onChange={setSelectprovinceEn}
                disable={isEdit}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STATE_REGION_PROVINCE_EN") })}
              />
            </div>
            {/* <div className="col-md-6">
              <CardLabel>
                {t("CR_STATE_REGION_PROVINCE_ML")}
              
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="provinceMl"
                value={provinceMl}
                onChange={setSelectprovinceMl}
                disable={isEdit}
                placeholder={`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STATE_REGION_PROVINCE_ML"),
                })}
              />
            </div> */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CheckBox label={t("CR_CITY_TOWN_VILLAGE")} onChange={setCitytownvillage} value={isCitytownvillage} checked={isCitytownvillage} />
          </div>
        </div>
        {isCitytownvillage === false && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel>{t("CR_CITY_TOWN_EN")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adrsCityTown"
                    value={adrsCityTown}
                    onChange={setSelectadrsCityTown}
                    disable={isEdit}
                    placeholder={`${t("CR_CITY_TOWN_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_TOWN_EN") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_ZIP_CODE")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="postCode"
                    value={postCode}
                    onChange={setSelectpostCode}
                    disable={isEdit}
                    placeholder={`${t("CR_ZIP_CODE")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.0-9`' ]*$",
                      isRequired: false,
                      type: "text",
                      title: t("CR_INVALID_ZIP_CODE"),
                    })}
                  />
                </div>
                {/* <div className="col-md-6">
            <CardLabel>
              {t("CR_CITY_TOWN_ML")}
             
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="adrsCityTownMl"
              value={adrsCityTownMl}
              onChange={setSelectadrsCityTownMl}
              disable={isEdit}
              placeholder={`${t("CR_CITY_TOWN_ML")}`}
              {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_TOWN_ML") })}
            />
          </div> */}
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
                    name="addressLineoneEn"
                    value={addressLineoneEn}
                    onChange={setSelectaddressLineoneEn}
                    placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                    disable={isEdit}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_ONE_EN") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{t("CR_ADDRES_LINE_TWO_EN")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="addressLinetwoEn"
                    value={addressLinetwoEn}
                    onChange={setSelectaddressLinetwoEn}
                    disable={isEdit}
                    placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADDRES_LINE_TWO_EN") })}
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
                    name="addressLineoneMl"
                    value={addressLineoneMl}
                    onChange={setSelectaddressLineoneMl}
                    placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                    disable={isEdit}
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
                    name="addressLinetwoMl"
                    value={addressLinetwoMl}
                    onChange={setSelectaddressLinetwoMl}
                    disable={isEdit}
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

            <div className="row">
              <div className="col-md-12"></div>
            </div>
          </div>
        )}
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPermanentOutsideIndia;