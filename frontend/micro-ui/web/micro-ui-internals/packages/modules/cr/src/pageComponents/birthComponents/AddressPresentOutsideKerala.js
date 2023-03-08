import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Loader, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
// import { sleep } from "react-query/types/core/utils";

const AddressPresentOutsideKerala = ({ config, onSelect, userType, formData, presentOutsideKeralaDistrict, setoutsideKeralaDistrict,
  presentOutsideKeralaTaluk, setoutsideKeralaTaluk, presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn,
  presentOutsideKeralaVillage, setoutsideKeralaVillage, presentOutsideKeralaPincode, setoutsideKeralaPincode,
  presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn, presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl,
  presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn, presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl,
  presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn, presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl,
  presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn, presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl,
  value, setValue,
  isPrsentAddress, setIsPrsentAddress, permntOutsideKeralaDistrict, setpermntOutsideKeralaDistrict,
  permntOutsideKeralaTaluk, setpermntOutsideKeralaTaluk, permntOutsideKeralaCityVilgeEn, setpermntOutsideKeralaCityVilgeEn,
  permntOutsideKeralaVillage, setpermntOutsideKeralaVillage, permntOutsideKeralaPincode, setpermntOutsideKeralaPincode,
  permntOutsideKeralaHouseNameEn, setpermntOutsideKeralaHouseNameEn, permntOutsideKeralaHouseNameMl,
  setpermntOutsideKeralaHouseNameMl, permntOutsideKeralaLocalityNameEn, setpermntOutsideKeralaLocalityNameEn, permntOutsideKeralaLocalityNameMl,
  setpermntOutsideKeralaLocalityNameMl, permntOutsideKeralaStreetNameEn, setpermntOutsideKeralaStreetNameEn,
  permntOutsideKeralaStreetNameMl, setpermntOutsideKeralaStreetNameMl, permntOutsideKeralaPostOfficeEn,
  setpermntoutsideKeralaPostOfficeEn, permntOutsideKeralaPostOfficeMl, setpermntoutsideKeralaPostOfficeMl
}) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const [toast, setToast] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // const [presentOutsideKeralaDistrict, setoutsideKeralaDistrict] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaDistrict ? formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaDistrict : null);
  // const [presentOutsideKeralaTaluk, setoutsideKeralaTaluk] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaTaluk ? formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaTaluk : null);
  // const [presentOutsideKeralaCityVilgeEn, setoutsideKeralaCityVilgeEn] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaCityVilgeEn ? formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaCityVilgeEn : null);
  // const [presentOutsideKeralaVillage, setoutsideKeralaVillage] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaVillage ? formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaVillage : null);
  // // const [presentOutsideKeralaPostOffice, setoutsideKeralaPostOffice] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaPostOffice);
  // const [presentOutsideKeralaPincode, setoutsideKeralaPincode] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaPincode);
  // const [presentOutsideKeralaHouseNameEn, setoutsideKeralaHouseNameEn] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaHouseNameEn);
  // const [presentOutsideKeralaHouseNameMl, setoutsideKeralaHouseNameMl] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaHouseNameMl);
  // const [presentOutsideKeralaLocalityNameEn, setoutsideKeralaLocalityNameEn] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaLocalityNameEn);
  // const [presentOutsideKeralaLocalityNameMl, setoutsideKeralaLocalityNameMl] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaLocalityNameMl);
  // const [presentOutsideKeralaStreetNameEn, setoutsideKeralaStreetNameEn] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaStreetNameEn);
  // const [presentOutsideKeralaStreetNameMl, setoutsideKeralaStreetNameMl] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaStreetNameMl);
  // const [presentOutsideKeralaPostOfficeEn, setoutsideKeralaPostOfficeEn] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaPostOfficeEn);
  // const [presentOutsideKeralaPostOfficeMl, setoutsideKeralaPostOfficeMl] = useState(formData?.AddressOutsideKeralaDetails?.presentOutsideKeralaPostOfficeMl);

  const cmbUrbanRural = [
    { i18nKey: "Town", code: "TOWN" },
    { i18nKey: "Village", code: "VILLAGE" },
  ];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbDistrict = [];
  let cmbPostOffice = [];
  let districtid = null;
  let cmbFilterDistrict = [];
  let cmbLB = [];
  console.log(value);
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  District &&
    District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  // PostOffice &&
  //   PostOffice["common-masters"] &&
  //   PostOffice["common-masters"].PostOffice.map((ob) => {
  //     cmbPostOffice.push(ob);
  //   });

  useEffect(() => {

    if (isInitialRender) {
      if (cmbDistrict.length > 0) {
        console.log(cmbDistrict);
        // currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        // setinsideKeralaLBName(currentLB[0]);
        cmbFilterDistrict = cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === "pb");
        console.log(cmbFilterDistrict);
        // setoutsideKeralaDistrict(cmbFilterDistrict);
        // cmbFilterTaluk = cmbTaluk.filter((cmbTaluk) => cmbTaluk.distId === currentLB[0].city.districtid);
        // setLbsTalukvalue(cmbFilterTaluk);
        // cmbFilterVillage = cmbVillage.filter((cmbVillage) => cmbVillage.distId === currentLB[0].city.districtid);
        // setLbsVillagevalue(cmbFilterVillage);
        setIsInitialRender(false);
      }
    }
  }, [cmbFilterDistrict, isInitialRender]);

  const onSkip = () => onSelect();

  function setSelectoutsideKeralaDistrict(value) {
    setoutsideKeralaDistrict(value);
    districtid = value.districtid;
    if (isPrsentAddress) {
      setpermntOutsideKeralaDistrict(value);
    } else {
      setpermntOutsideKeralaDistrict('');
    }
  }

  function setSelectoutsideKeralaVillage(value) {
    setoutsideKeralaVillage(value);
    if (isPrsentAddress) {
      setpermntOutsideKeralaVillage(value);
    } else {
      setpermntOutsideKeralaVillage('');
    }
  }
  function setSelectoutsideKeralaTaluk(value) {
    setoutsideKeralaTaluk(value);
    if (isPrsentAddress) {
      setpermntOutsideKeralaTaluk(value);
    } else {
      setpermntOutsideKeralaTaluk('');
    }
  }
  // function setSelectoutsideKeralaPostOffice(value) {
  //   setoutsideKeralaPostOffice(value);
  // }
  function setSelectoutsideKeralaPincode(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 6) {
        return false;
      } else if (e.target.value.length < 6) {
        setoutsideKeralaPincode(e.target.value);
        return false;
      } else {
        setoutsideKeralaPincode(e.target.value);
        if (isPrsentAddress) {
          setpermntOutsideKeralaPincode(e.target.value);
        } else {
          setpermntOutsideKeralaPincode('');
        }
        return true;
      }
    }
  }
  function setSelectoutsideKeralaPostOfficeEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaPostOfficeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntoutsideKeralaPostOfficeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
      } else {
        setpermntoutsideKeralaPostOfficeEn('');
      }
    }
  }
  function setSelectoutsideKeralaPostOfficeMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaPostOfficeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
      if (isPrsentAddress) {
        setpermntoutsideKeralaPostOfficeMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
      } else {
        setpermntoutsideKeralaPostOfficeMl('');
      }
    }
  }
  function setSelectoutsideKeralaHouseNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaHouseNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaHouseNameEn('');
      }
    }
  }
  function setSelectoutsideKeralaHouseNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaHouseNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaHouseNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaHouseNameMl('');
      }
    }
  }
  function setSelectoutsideKeralaLocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaLocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaLocalityNameEn('');
      }
    }
  }
  function setSelectoutsideKeralaLocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaLocalityNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaLocalityNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaLocalityNameMl('');
      }
    }
  }
  function setSelectoutsideKeralaStreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaStreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaStreetNameEn('');
      }
    }
  }
  function setSelectoutsideKeralaStreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaStreetNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaStreetNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaStreetNameMl('');
      }
    }
  }
  function setSelectoutsideKeralaCityVilgeEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setoutsideKeralaCityVilgeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      if (isPrsentAddress) {
        setpermntOutsideKeralaCityVilgeEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi, ""));
      } else {
        setpermntOutsideKeralaCityVilgeEn('');
      }
    }
  }

  const goNext = () => {
    
  };

  if (isDistrictLoading || isTalukLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbDistrict}
              selected={presentOutsideKeralaDistrict}
              select={setSelectoutsideKeralaDistrict}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TALUK_TEHSIL")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbTaluk}
              selected={presentOutsideKeralaTaluk}
              select={setSelectoutsideKeralaTaluk}
              placeholder={`${t("CR_TALUK_TEHSIL")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_TOWN_VILLAGE_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="i18nKey"
              option={cmbUrbanRural}
              selected={presentOutsideKeralaVillage}
              select={setSelectoutsideKeralaVillage}
              placeholder={`${t("CR_TOWN_VILLAGE_EN")}`}
            />
          </div>
          <div className="col-md-3">
            <CardLabel>
              {t("CR_CITY_VILLAGE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaCityVilgeEn"
              value={presentOutsideKeralaCityVilgeEn}
              onChange={setSelectoutsideKeralaCityVilgeEn}
              placeholder={`${t("CR_CITY_VILLAGE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_PIN_CODE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPincode"
              value={presentOutsideKeralaPincode}
              onChange={setSelectoutsideKeralaPincode}
              placeholder={`${t("CS_COMMON_PIN_CODE")}`}
              {...(validation = {
                pattern: "^[a-zA-Z-.`' ]*$",
                isRequired: true,
                type: "number",
                maxLength: 6,
                minLength: 6,
                title: t("CS_COMMON_INVALID_PIN_CODE"),
              })}
            />
          </div>
          {/* <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                option={cmbPostOffice}
                selected={presentOutsideKeralaPostOffice}
                select={setSelectoutsideKeralaPostOffice}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div> */}
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPostOfficeEn"
              value={presentOutsideKeralaPostOfficeEn}
              onChange={setSelectoutsideKeralaPostOfficeEn}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div>
          {/* <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaPostOfficeMl"
              value={presentOutsideKeralaPostOfficeMl}
              onChange={setSelectoutsideKeralaPostOfficeMl}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_CITY_VILLAGE_NAME_EN") })}
            />
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaLocalityNameEn"
              value={presentOutsideKeralaLocalityNameEn}
              onChange={setSelectoutsideKeralaLocalityNameEn}
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaLocalityNameMl"
              value={presentOutsideKeralaLocalityNameMl}
              onChange={setSelectoutsideKeralaLocalityNameMl}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_LOCALITY_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_EN")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaStreetNameEn"
              value={presentOutsideKeralaStreetNameEn}
              onChange={setSelectoutsideKeralaStreetNameEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_STREET_NAME_ML")}</CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaStreetNameMl"
              value={presentOutsideKeralaStreetNameMl}
              onChange={setSelectoutsideKeralaStreetNameMl}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: false,
                type: "text",
                title: t("CR_INVALID_STREET_NAME_ML"),
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaHouseNameEn"
              value={presentOutsideKeralaHouseNameEn}
              onChange={setSelectoutsideKeralaHouseNameEn}
              placeholder={`${t("CR_HOUSE_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_HOUSE_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              type={"text"}
              optionKey="i18nKey"
              name="presentOutsideKeralaHouseNameMl"
              value={presentOutsideKeralaHouseNameMl}
              onChange={setSelectoutsideKeralaHouseNameMl}
              placeholder={`${t("CR_HOUSE_NAME_ML")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_HOUSE_NAME_ML"),
              })}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressPresentOutsideKerala;
