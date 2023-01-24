import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const InformentAddress = ({
  config,
  onSelect,
  userType,
  formData,
  InformentNameEn,
  setInformentNameEn,
  InformentNameMl,
  setInformentNameMl,
  AadhaarNo,
  setAadhaarNo,
  setSelectedDeclaration,
  InformentMobileNo,
  setInformentMobileNo,
  InformentEmail,
  setInformentEmail,
  isNoAadhaar,
  setIsNoAadhaar,
}) => {
  const stateId = Digit.ULBService.getStateId();
  const [value, setValue] = useState(0);
  const [isChecked, setIsChecked] = useState(formData?.InformentAddress?.isChecked ? formData?.InformentAddress?.isChecked : false);
  //   const handleCheckboxChange = (event) => {
  //     setChecked((checked) => !checked); // toggle the checked state
  //     let newSelectedValues = [...selectedValues];
  //     if (event.target.checked) {
  //         newSelectedValues.push(event.target.value);
  //     } else {
  //         newSelectedValues = newSelectedValues.filter(value => value !== event.target.value);
  //     }
  //     setSelectedValues(newSelectedValues);
  // }
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  // const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  // const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  // const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  // const [lbs, setLbs] = useState(0);
  // const [isInitialRender, setIsInitialRender] = useState(true);

  // const [setVillage, setSelectedVillage] = useState(formData?.InformentAddress?.setVillage);
  // const [setTaluk, setSelectedTaluk] = useState(formData?.InformentAddress?.setTaluk);
  // const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict);
  // const [StateName, setStateName] = useState(formData?.AddressDetails?.StateName);
  // const [BuildingNo, setBuildingNo] = useState(formData?.InformentAddress?.BuildingNo);
  // const [HouseNo, setHouseNo] = useState(formData?.InformentAddress?.HouseNo);
  // const [HouseNameEn, setHouseNameEn] = useState(formData?.InformentAddress?.HouseNameEn);
  // const [HouseNameMl, setHouseNameMl] = useState(formData?.InformentAddress?.HouseNameMl);
  // const [StreetNameMl, setStreetNameMl] = useState(formData?.InformentAddress?.StreetNameMl);
  // const [StreetNameEn, setStreetNameEn] = useState(formData?.InformentAddress?.StreetNameEn);
  // const [Locality, setLocality] = useState(formData?.InformentAddress?.Locality);
  // const [LocalityMl, setLocalityMl] = useState(formData?.InformentAddress?.LocalityMl);
  // const [MainPlaceEn, setMainPlaceEn] = useState(formData?.InformentAddress?.MainPlaceEn);
  // const [MainPlaceMl, setMainPlaceMl] = useState(formData?.InformentAddress?.MainPlaceMl);
  // const [ViaEn, setViaEn] = useState(formData?.InformentAddress?.ViaEn);
  // const [ViaMl, setViaMl] = useState(formData?.InformentAddress?.ViaMl);
  // const [PinCode, setPinCode] = useState(formData?.InformentAddress?.PinCode);
  // const [setPostOffice, setSelectedPostOffice] = useState(formData?.InformentAddress?.setPostOffice);
  // const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName);

  // const [InformentAge, setInformentAge] = useState(formData?.InformentAddress?.InformentAge);

  // Place of death Home and vehicle
  // const [InformentNameEn, setInformentNameEn] = useState(formData?.InformentAddress?.InformentNameEn);
  // const [InformentNameMl, setInformentNameMl] = useState(formData?.InformentAddress?.InformentNameMl);
  // const [setTitle, setSelectedTitle] = useState(formData?.InformentAddress?.setTitle);
  // const [AadhaarNo, setAadhaarNo] = useState(formData?.InformentAddress?.AadhaarNo);
  // const [setDeclaration, setSelectedDeclaration] = useState(formData?.InformentAddress?.setDeclaration);
  // const [InformentMobileNo, setInformentMobileNo] = useState(formData?.InformentAddress?.InformentMobileNo);
  // const [InformentEmail, setInformentEmail] = useState(formData?.InformentAddress?.InformentEmail);
  // const [isNoAadhaar, setIsNoAadhaar] = useState(formData?.InformentAddress?.isNoAadhaar);

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // let districtid = null;
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });
  // let cmbVillage = [];
  // let cmbTaluk = [];
  // let cmbDistrict = [];
  // Village &&
  //   Village["common-masters"] &&
  //   Village["common-masters"].Village.map((ob) => {
  //     cmbVillage.push(ob);
  //   });
  // Taluk &&
  //   Taluk["common-masters"] &&
  //   Taluk["common-masters"].Taluk.map((ob) => {
  //     cmbTaluk.push(ob);
  //   });
  // District &&
  //   District["common-masters"] &&
  //   District["common-masters"].District.map((ob) => {
  //     cmbDistrict.push(ob);
  //   });

  // let cmbTitle = [];
  // title &&
  //   title["common-masters"] &&
  //   title["common-masters"].Title.map((ob) => {
  //     cmbTitle.push(ob);
  //   });

  const onSkip = () => onSelect();

  // function setSelectPresentDistrict(value) {
  //   setIsInitialRender(true);
  //   setPresentDistrict(value);
  //   setPresentLBName(null);
  //   setLbs(null);
  //   districtid = value.districtid;
  // }
  // function setSelectStateName(value) {
  //   setSelectStateName(value);
  // }
  // function setSelectPresentLBName(value) {
  //   setPresentLBName(value);
  // }
  // function setSelectBuildingNo(e) {
  //   setBuildingNo(e.target.value);
  // }
  // function setSelectHouseNameEn(e) {
  //   setHouseNameEn(e.target.value);
  // }
  // function setSelectHouseNameMl(e) {
  //   setHouseNameMl(e.target.value);
  // }
  // function setSelectHouseNo(e) {
  //   setHouseNo(e.target.value);
  // }

  // function setSelectLocality(e) {
  //   setLocality(e.target.value);
  // }
  // function setSelectLocalityMl(e) {
  //   setLocalityMl(e.target.value);
  // }
  // function setSelectStreetNameMl(e) {
  //   setStreetNameMl(e.target.value);
  // }
  // function setSelectStreetNameEn(e) {
  //   setStreetNameEn(e.target.value);
  // }

  // function setSelectMainPlaceEn(e) {
  //   setMainPlaceEn(e.target.value);
  // }
  // function setSelectMainPlaceMl(e) {
  //   setMainPlaceMl(e.target.value);
  // }
  // function setSelectViaEn(e) {
  //   setViaEn(e.target.value);
  // }
  // function setSelectViaMl(e) {
  //   setViaMl(e.target.value);
  // }
  // function setSelectPinCode(e) {
  //   setPinCode(e.target.value);
  // }
  function setSelectInformentNameEn(e) {
    setInformentNameEn(e.target.value);
  }
  function setSelectInformentNameMl(e) {
    setInformentNameMl(e.target.value);
  }
  function setSelectAadhaarNo(e) {
    setAadhaarNo(e.target.value);
  }
  function setSelectInformentMobileNo(e) {
    setInformentMobileNo(e.target.value);
  }
  // function setSelectInformentAge(e) {
  //   setInformentAge(e.target.value);
  // }
  function setSelectInformentEmail(e) {
    setInformentEmail(e.target.value);
  }

  // function selectTitle(value) {
  //   naturetypecmbvalue = value.code.substring(0, 4);
  //   setSelectedTitle(value);
  // }

  // function selectVillage(value) {
  //   setSelectedVillage(value);
  // }
  // function selectTaluk(value) {
  //   setSelectedTaluk(value);
  // }
  // function selectDistrict(value) {
  //   setSelectedDistrict(value);
  // }
  // function selectPostOffice(value) {
  //   setSelectedPostOffice(value);
  // }
  // function selectLbName(value) {
  //   setSelectedLbName(value);
  // }
  // function selectStateName(value) {
  //   setSelectedStateName(value);
  // }
  function selectDeclaration(value) {
    naturetypecmbvalue = value.code.substring(0, 4);
    setSelectedDeclaration(value);
  }

  // function setNoAadhaar(e) {
  //   if (e.target.checked == true) {
  //     setIsNoAadhaar(true);
  //   } else {
  //     setIsNoAadhaar(false);
  //   }
  // }
  // useEffect(() => {
  //   if (isInitialRender) {
  //     console.log("PresentDistrict" + districtid);
  //     console.log(localbodies);
  //     if (PresentDistrict) {
  //       setIsInitialRender(false);
  //       setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
  //     }
  //   }
  // }, [lbs, isInitialRender]);
  const goNext = () => {
    // sessionStorage.setItem("StateName", StateName ? StateName.code : null);
    // sessionStorage.setItem("setVillage", setVillage ? setVillage.code : null);
    // sessionStorage.setItem("setTaluk", setTaluk ? setTaluk.code : null);
    // sessionStorage.setItem("PresentDistrict", PresentDistrict ? PresentDistrict.code : null);
    // sessionStorage.setItem("BuildingNo", BuildingNo);
    // sessionStorage.setItem("HouseNo", HouseNo);
    // sessionStorage.setItem("StreetNameEn", StreetNameEn);
    // sessionStorage.setItem("StreetNameMl", StreetNameMl);
    // sessionStorage.setItem("HouseNameEn", HouseNameEn);
    // sessionStorage.setItem("HouseNameMl", HouseNameMl);
    // sessionStorage.setItem("Locality", Locality);
    // sessionStorage.setItem("LocalityMl", LocalityMl);
    // sessionStorage.setItem("MainPlaceEn", MainPlaceEn);
    // sessionStorage.setItem("MainPlaceMl",MainPlaceMl);
    // sessionStorage.setItem("ViaMl",ViaMl);
    // sessionStorage.setItem("ViaEn",ViaEn);
    // sessionStorage.setItem("PinCode", PinCode);
    // sessionStorage.setItem("setPostOffice", setPostOffice ? setPostOffice.code : null);
    // sessionStorage.setItem("PresentLBName", null);
    // sessionStorage.setItem("InformentAge", InformentAge);

    // sessionStorage.setItem("InformentNameEn", InformentNameEn ? InformentNameEn:null);
    // sessionStorage.setItem("InformentNameMl", InformentNameMl ? InformentNameMl:null);
    // sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    // sessionStorage.setItem("isNoAadhaar", isNoAadhaar ? isNoAadhaar:null);
    // sessionStorage.setItem("AadhaarNo", AadhaarNo ? AadhaarNo : null);
    // sessionStorage.setItem("setDeclaration", setDeclaration ? setDeclaration.code : null);
    // sessionStorage.setItem("InformentMobileNo", InformentMobileNo ? InformentMobileNo :null );
    // sessionStorage.setItem("InformentEmail", InformentEmail ? InformentEmail :null);

    onSelect(config.key, {
      // setVillage,
      // setTaluk,
      // PresentDistrict,
      // BuildingNo,
      // HouseNo,
      // HouseNameEn,
      // HouseNameMl,
      // StreetNameEn,
      // StreetNameMl,
      // Locality,
      // LocalityMl,
      // MainPlaceMl,
      // MainPlaceEn,
      // ViaEn,
      // ViaMl,
      // PinCode,
      // setStateName,
      // setPostOffice,
      // PresentLBName,
      // InformentAge,
      // InformentNameEn,
      // InformentNameMl,
      // setTitle,
      // isNoAadhaar,
      // AadhaarNo,
      // setDeclaration,
      // InformentMobileNo,
      // InformentEmail,
    });
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null} */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-4">
            <CardLabel>{`${t("CR_TITLE_NAME_EN")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbTitle}
              selected={setTitle}
              select={selectTitle}
              disabled={isEdit}
              placeholder={`${t("CR_TITLE_NAME_EN")}`}
            />
          </div> */}
          <div className="col-md-6">
            <CardLabel>
              {t("CR_INFORMENT_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentNameEn"
              value={InformentNameEn}
              onChange={setSelectInformentNameEn}
              disable={isEdit}
              placeholder={`${t("CR_INFORMENT_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_INFORMENT_NAME_Ml")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentNameMl"
              value={InformentNameMl}
              onChange={setSelectInformentNameMl}
              disable={isEdit}
              placeholder={`${t("CR_INFORMENT_NAME_Ml")}`}
              {...(validation = {
                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                isRequired: true,
                type: "text",
                title: t("CR_INVALID_FIRST_NAME_ML"),
              })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <CheckBox
              label={t("CR_NO_AADHAAR")}
              defaultChecked={isChecked}
              defaultValue={value}
              onChange={() => {
                setIsChecked(!isChecked);
                setValue(value === 0 ? 1 : 0);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div style={{ pointerEvents: isChecked ? "none" : "all", opacity: isChecked ? 0.5 : 1 }}>
              {isChecked ? null : (
                <div className="col-md-3">
                  <CardLabel>{t("CS_COMMON_AADHAAR")}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="AadhaarNo"
                    value={AadhaarNo}
                    onChange={setSelectAadhaarNo}
                    disable={isEdit}
                    placeholder={`${t("CS_COMMON_AADHAAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              )}
            </div>
            {/* <div className="col-md-3">
            <CardLabel>{`${t("CR_DECLARATION")}`}</CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={false}
              option={cmbTitle}
              selected={setTitle}
              select={selectTitle}
              disabled={isEdit}
              placeholder={`${t("CR_DECLARATION")}`}
            />

            <Dropdown t={t} 
            optionKey="name" 
            isMandatory={false} 
            option={cmbDeclaration} 
            selected={setDeclaration} 
            select={selectDeclaration} 
            disabled={isEdit} 
            />            
          </div> */}
            <div className="col-md-3">
              <CardLabel>{t("CR_MOBILE_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="InformentMobileNo"
                value={InformentMobileNo}
                onChange={setSelectInformentMobileNo}
                disable={isEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: false, title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
            {/* <div className="col-md-3">
            <CardLabel>{t("CR_AGE")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="InformentAge"
              value={InformentAge}
              onChange={setSelectInformentAge}
              disable={isEdit}
              placeholder={`${t("CR_AGE")}`}
              {...(validation = { pattern: "^([0-9]){3}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AGE") })}
            />
          </div> */}
            <div className="col-md-3">
              <CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type="email"
                optionKey="i18nKey"
                name="InformentEmail"
                value={InformentEmail}
                onChange={setSelectInformentEmail}
                disable={isEdit}
                placeholder={`${t("CR_EMAIL")}`}
                {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })}
              />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDRESS")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_DOOR_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="BuildingNo"
              value={BuildingNo}
              onChange={setSelectBuildingNo}
              disable={isEdit}
              placeholder={`${t("CR_DOOR_NO")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DOOR_NO") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_HOUSE_NO")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="HouseNo"
              value={HouseNo}
              onChange={setSelectHouseNo}
              disable={isEdit}
              placeholder={`${t("CR_HOUSE_NO")}`}
              {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
            />
          </div>
        </div>
        <div className="row">
             <div className="col-md-6" >
                 <CardLabel>{`${t("CR_HOUSE_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="HouseNameEn"
                  value={HouseNameEn}
                  onChange={setSelectHouseNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_EN") })}
                  />
            </div>
            <div className="col-md-6" >
                  <CardLabel>{`${t("CR_HOUSE_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="HouseNameMl"
                  value={HouseNameMl}
                  onChange={setSelectHouseNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NAME_ML")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_HOUSE_NAME_ML") })}
                   />
            </div>
        </div>  
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_STREET_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="StreetNameEn"
              value={StreetNameEn}
              onChange={setSelectStreetNameEn}
              disable={isEdit}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CR_STREET_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="StreetNameMl"
              value={StreetNameMl}
              onChange={setSelectStreetNameMl}
              disable={isEdit}
              placeholder={`${t("CR_STREET_NAME_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_STREET_NAME_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CR_LOCALITY_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="Locality"
              value={Locality}
              onChange={setSelectLocality}
              disable={isEdit}
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
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="LocalityMl"
              value={LocalityMl}
              onChange={setSelectLocalityMl}
              disable={isEdit}
              placeholder={`${t("CR_LOCALITY_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>{t("CR_MAIN_PLACE_EN")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MainPlaceEn"
              value={MainPlaceEn}
              onChange={setSelectMainPlaceEn}
              disable={isEdit}
              placeholder={`${t("CR_MAIN_PLACE_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_EN") })}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CR_MAIN_PLACE_ML")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="MainPlaceMl"
              value={MainPlaceMl}
              onChange={setSelectMainPlaceMl}
              disable={isEdit}
              placeholder={`${t("CR_MAIN_PLACE_ML")}`}
              {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MAIN_PLACE_ML") })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ViaEn"
                value={ViaEn}
                onChange={setSelectViaEn}
                placeholder={`${t("CR_VIA_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VIA_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_VIA_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ViaMl"
                value={ViaMl}
                onChange={setSelectViaMl}
                placeholder={`${t("CR_VIA_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_VIA_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-4" >
                <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  // option={cmbState}
                  option={cmbDistrict}
                  selected={StateName}
                  select={setSelectStateName}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_DISTRICT")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbDistrict}
              selected={PresentDistrict}
              select={setSelectPresentDistrict}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_DISTRICT")}`}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CS_COMMON_LB_NAME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              CS_COMMON_LB_NAME
              isMandatory={true}
              option={lbs}
              selected={PresentLBName}
              select={setSelectPresentLBName}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_LB_NAME")}`}
            />
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <CardLabel>
              {t("CS_COMMON_VILLAGE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbVillage}
              selected={setVillage}
              select={selectVillage}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_VILLAGE")}`}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>
              {t("CS_COMMON_TALUK")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={true}
              option={cmbTaluk}
              selected={setTaluk}
              select={selectTaluk}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_TALUK")}`}
            />
          </div>
         
        </div>
        <div className="row">
          <div className="col-md-6">
            <CardLabel>
              {t("CS_COMMON_POST_OFFICE")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={true}
              option={cmbPlace}
              selected={setPostOffice}
              select={selectPostOffice}
              disabled={isEdit}
              placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
            />
          </div>
          <div className="col-md-6">
            <CardLabel>{t("CS_COMMON_PIN_CODE")}</CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="PinCode"
              value={PinCode}
              onChange={setSelectPinCode}
              disable={isEdit}
              placeholder={`${t("CS_COMMON_PIN_CODE")}`}
              {...(validation = { pattern: "^([0-9]){6}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_PIN_CODE") })}
            />
          </div>
        </div> */}
      </FormStep>
    </React.Fragment>
  );
};
export default InformentAddress;
