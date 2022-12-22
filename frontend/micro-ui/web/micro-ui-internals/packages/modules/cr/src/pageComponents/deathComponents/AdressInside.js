  import React, { useState, useEffect } from "react";
  import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox } from "@egovernments/digit-ui-react-components";
  // import Timeline from "../../components/CRTimeline";
  import { useTranslation } from "react-i18next";
  
  const AddressInside = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: PostOffice = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "mtaluk");
    const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [lbs, setLbs] = useState(0);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [PresentBuldingNo, setPresentBuldingNo] = useState(formData?.AddressDetails?.PresentBuldingNo);
    const [PresentHouseNo, setPresentHouseNo] = useState(formData?.AddressDetails?.PresentHouseNo);
    const [PresentLocalityNameEn, setPresentLocalityNameEn] = useState(formData?.AddressDetails?.PresentLocalityNameEn);
    const [PresentLocalityNameMl, setPresentLocalityNameMl] = useState(formData?.AddressDetails?.PresentLocalityNameMl);
    const [PresentCityNameEn, setPresentCityNameEn] = useState(formData?.AddressDetails?.PresentCityNameEn);
    const [PresentCityNameMl, setPresentCityNameMl] = useState(formData?.AddressDetails?.PresentCityNameMl);
    const [PresentVillage, setPresentVillage] = useState(formData?.AddressDetails?.PresentVillage);
    const [PresentLBName, setPresentLBName] = useState(formData?.AddressDetails?.PresentLBName);
    const [PresentDistrict, setPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict);
    const [PresentTaluk, setPresentTaluk] = useState(formData?.AddressDetails?.PresentTaluk);
    const [PresentPostOffice, setPresentPostOffice] = useState(formData?.AddressDetails?.PresentPostOffice);
    const [PresentPincode, setPresentPincode] = useState(formData?.AddressDetails?.PresentPincode);
    const [isPrsentAddress, setIsPrsentAddress] = useState(formData?.AddressDetails?.isPrsentAddress);
    const [PermanentBuldingNo, setPermanentBuldingNo] = useState(formData?.AddressDetails?.PermanentBuldingNo);
    const [PermanentHouseNo, setPermanentHouseNo] = useState(formData?.AddressDetails?.PermanentHouseNo);
    const [PermanentLocalityNameEn, setPermanentLocalityNameEn] = useState(formData?.AddressDetails?.PermanentLocalityNameEn);
    const [PermanentLocalityNameMl, setPermanentLocalityNameMl] = useState(formData?.AddressDetails?.PermanentLocalityNameMl);
    const [PermanentCityNameEn, setPermanentCityNameEn] = useState(formData?.AddressDetails?.PermanentCityNameEn);
    const [PermanentCityNameMl, setPermanentCityNameMl] = useState(formData?.AddressDetails?.PermanentCityNameMl);
    const [PermanentVillage, setPermanentVillage] = useState(formData?.AddressDetails?.PermanentVillage);
    const [PermanentLBName, setPermanentLBName] = useState(formData?.AddressDetails?.PermanentLBName);
    const [PermanentDistrict, setPermanentDistrict] = useState(formData?.AddressDetails?.PermanentDistrict);
    const [PermanentTaluk, setPermanentTaluk] = useState(formData?.AddressDetails?.PermanentTaluk);
    const [PermanentPostOffice, setPermanentPostOffice] = useState(formData?.AddressDetails?.PermanentPostOffice);
    const [PermanentPincode, setPermanentPincode] = useState(formData?.AddressDetails?.PermanentPincode);
    let cmbPlace = [];
    let cmbTaluk = [];
    let cmbVillage = [];
    let cmbDistrict = [];
    let cmbPostOffice = [];
    let districtid = null;
    console.log("Taluk" + Taluk);
    Taluk &&
      Taluk["common-masters"] &&
      Taluk["common-masters"].mtaluk.map((ob) => {
        cmbTaluk.push(ob);
      });
    Village &&
      Village["common-masters"] &&
      Village["common-masters"].Village.map((ob) => {
        cmbVillage.push(ob);
      });
    PostOffice &&
      District["common-masters"] &&
      District["common-masters"].District.map((ob) => {
        cmbDistrict.push(ob);
      });
    PostOffice &&
      PostOffice["common-masters"] &&
      PostOffice["common-masters"].PostOffice.map((ob) => {
        cmbPostOffice.push(ob);
      });
  
    const onSkip = () => onSelect();
  
    function setSelectPresentBuldingNo(e) {
      setPresentBuldingNo(e.target.value);
      if (isPrsentAddress) {
        setPermanentBuldingNo(PresentBuldingNo);
      }
    }
    function setSelectPresentHouseNo(e) {
      setPresentHouseNo(e.target.value);
      if (isPrsentAddress) {
        setPermanentHouseNo(PresentHouseNo);
      }
    }
    function setSelectPresentLocalityNameEn(e) {
      setPresentLocalityNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameEn(PresentLocalityNameEn);
      }
    }
    function setSelectPresentLocalityNameMl(e) {
      setPresentLocalityNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentLocalityNameMl(PresentLocalityNameMl);
      }
    }
    function setSelectPresentCityNameEn(e) {
      setPresentCityNameEn(e.target.value);
      if (isPrsentAddress) {
        setPermanentCityNameEn(PresentCityNameEn);
      }
    }
    function setSelectPresentCityNameMl(e) {
      setPresentCityNameMl(e.target.value);
      if (isPrsentAddress) {
        setPermanentCityNameMl(PresentCityNameMl);
      }
    }
    function setSelectPresentVillage(value) {
      setPresentVillage(value);
      console.log("Village" + cmbVillage);
      if (isPrsentAddress) {
        setPermanentVillage(PresentVillage);
      }
    }
    function setSelectPresentLBName(value) {
      setPresentLBName(value);
      if (isPrsentAddress) {
        setPermanentLBName(PresentLBName);
      }
    }
    function setSelectPresentTaluk(value) {
      setPresentTaluk(value);
      console.log("Taluk" + cmbTaluk);
      if (isPrsentAddress) {
        setPermanentTaluk(PresentTaluk);
      }
    }
    function setSelectPresentDistrict(value) {
      setIsInitialRender(true);
      setPresentDistrict(value);
      setPresentLBName(null);
      setLbs(null);
      districtid = value.districtid
      if (isPrsentAddress) {
        setPermanentDistrict(PresentDistrict);
      }
    }
    function setSelectPresentPostOffice(value) {
      setPresentPostOffice(value);
      if (isPrsentAddress) {
        setPermanentPostOffice(PresentPostOffice);
      }
    }
    function setSelectPresentPincode(e) {
      setPresentPincode(e.target.value);
      if (isPrsentAddress) {
        setPermanentPincode(PresentPincode);
      }
    }
    //Permanent Address Function
    function setSelectPermanentBuldingNo(e) {
      setPermanentBuldingNo(e.target.value);
    }
    function setSelectPermanentHouseNo(e) {
      setPermanentHouseNo(e.target.value);
    }
    function setSelectPermanentLocalityNameEn(e) {
      setPermanentLocalityNameEn(e.target.value);
    }
    function setSelectPermanentLocalityNameMl(e) {
      setPermanentLocalityNameMl(e.target.value);
    }
    function setSelectPermanentCityNameEn(e) {
      setPermanentCityNameEn(e.target.value);
    }
    function setSelectPermanentCityNameMl(e) {
      setPermanentCityNameMl(e.target.value);
    }
    function setSelectPermanentVillage(value) {
      setPermanentVillage(value);
    }
    function setSelectPermanentLBName(value) {
      setPermanentLBName(value);
    }
    function setSelectPermanentTaluk(value) {
      setPermanentTaluk(value);
    }
    function setSelectPermanentDistrict(value) {
      setPermanentDistrict(value);
      districtid = value.districtid
    }
    function setSelectPermanentPostOffice(value) {
      setPermanentPostOffice(value);
    }
    function setSelectPermanentPincode(e) {
      setPermanentPincode(e.target.value);
    }
    function setSameAsPresent(e) {
      setIsPrsentAddress(e.target.checked);
      if (e.target.checked == true) {
        setPermanentBuldingNo(PresentBuldingNo);
        setPermanentHouseNo(PresentHouseNo);
        setPermanentLocalityNameEn(PresentLocalityNameEn);
        setPermanentLocalityNameMl(PresentLocalityNameMl);
        setPermanentCityNameEn(PresentCityNameEn);
        setPermanentCityNameMl(PresentCityNameMl);
        setPermanentVillage(PresentVillage);
        setPermanentLBName(PresentLBName);
        setPermanentDistrict(PresentDistrict);
        setPermanentTaluk(PresentTaluk);
        setPermanentPostOffice(PresentPostOffice);
        setPermanentPincode(PresentPincode);
      } else {
        setPermanentBuldingNo('');
        setPermanentHouseNo('');
        setPermanentLocalityNameEn('');
        setPermanentLocalityNameMl('');
        setPermanentCityNameEn('');
        setPermanentCityNameMl('');
        setPermanentVillage('');
        setPermanentLBName('');
        setPermanentDistrict('');
        setPermanentTaluk('');
        setPermanentPostOffice('');
        setPermanentPincode('');
      }
    }
    useEffect(() => {
      if (isInitialRender) {
        console.log("PresentDistrict" + districtid);
        console.log(localbodies);
        if (PresentDistrict) {
          setIsInitialRender(false);
          setLbs(localbodies.filter((localbodies) => localbodies.city.districtid === PresentDistrict.districtid));
        }
      }
    }, [lbs, isInitialRender]);
    const goNext = () => {
      sessionStorage.setItem("PresentBuldingNo", PresentBuldingNo);
      sessionStorage.setItem("PresentHouseNo", PresentHouseNo);
      sessionStorage.setItem("PresentLocalityNameEn", PresentLocalityNameEn);
      sessionStorage.setItem("PresentLocalityNameMl", PresentLocalityNameMl);
      sessionStorage.setItem("PresentCityNameEn", PresentCityNameEn);
      sessionStorage.setItem("PresentCityNameMl", PresentCityNameMl);
      sessionStorage.setItem("PresentVillage", PresentVillage.code);
      sessionStorage.setItem("PresentLBName", null);
      sessionStorage.setItem("PresentDistrict", PresentDistrict.code);
      sessionStorage.setItem("PresentTaluk", PresentTaluk.code);
      sessionStorage.setItem("PresentPostOffice", PresentPostOffice.code);
      sessionStorage.setItem("PresentPincode", PresentPincode.code);
      sessionStorage.setItem("PermanentBuldingNo", PermanentBuldingNo);
      sessionStorage.setItem("PermanentHouseNo", PermanentHouseNo);
      sessionStorage.setItem("PermanentLocalityNameEn", PermanentLocalityNameEn);
      sessionStorage.setItem("PermanentLocalityNameMl", PermanentLocalityNameMl);
      sessionStorage.setItem("PermanentCityNameEn", PermanentCityNameEn);
      sessionStorage.setItem("PermanentCityNameMl", PermanentCityNameMl);
      sessionStorage.setItem("PermanentVillage", PermanentVillage.code);
      sessionStorage.setItem("PermanentLBName", null);
      sessionStorage.setItem("PermanentDistrict", PermanentDistrict.code);
      sessionStorage.setItem("PermanentTaluk", PermanentTaluk.code);
      sessionStorage.setItem("PermanentPostOffice", PermanentPostOffice.code);
      sessionStorage.setItem("PermanentPincode", PermanentPincode.code);
      onSelect(config.key, {
        PresentBuldingNo, PresentHouseNo, PresentLocalityNameEn,
        PresentLocalityNameMl, PresentCityNameEn, PresentCityNameMl, PresentVillage, PresentLBName, PresentDistrict, PresentTaluk, PresentPostOffice, PresentPincode,
        PermanentBuldingNo, PermanentHouseNo, PermanentLocalityNameEn, PermanentLocalityNameMl, PermanentCityNameEn, PermanentCityNameMl, PermanentVillage, PermanentLBName,
        PermanentDistrict, PermanentTaluk, PermanentPostOffice, PermanentPincode
      });
    }
    return (
      <React.Fragment>
        {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null} */}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          !PresentHouseNo ||
          !PresentLocalityNameEn ||
          !PresentLocalityNameMl ||
          !PresentDistrict ||
          !PresentVillage ||
          !PresentTaluk ||
          !PresentPostOffice ||
          !PresentPincode ||
          !PermanentHouseNo ||
          !PermanentLocalityNameEn ||
          !PermanentLocalityNameMl ||
          !PermanentDistrict ||
          !PermanentVillage ||
          !PermanentTaluk ||
          !PermanentPostOffice ||
          !PermanentPincode
        }
      >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentBuldingNo"
                value={PresentBuldingNo}
                onChange={setSelectPresentBuldingNo}
                placeholder={`${t("CR_BUILDING_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_HOUSE_NO")}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentHouseNo"
                value={PresentHouseNo}
                onChange={setSelectPresentHouseNo}
                placeholder={`${t("CR_HOUSE_NO")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameEn"
                value={PresentLocalityNameEn}
                onChange={setSelectPresentLocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
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
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="PresentLocalityNameMl"
                value={PresentLocalityNameMl}
                onChange={setSelectPresentLocalityNameMl}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_CITY_EN")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentCityNameEn"
                value={PresentCityNameEn}
                onChange={setSelectPresentCityNameEn}
                placeholder={`${t("CR_CITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_CITY_ML")}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentCityNameMl"
                value={PresentCityNameMl}
                onChange={setSelectPresentCityNameMl}
                placeholder={`${t("CR_CITY_ML")}`}
                disable={isEdit}
                {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CITY_ML") })}
              />
            </div>
          </div>
        </div>
        {/* <div className="row">
            <div className="col-md-12" >
              <div className="col-md-6" >
                <CardLabel>{`${t("CS_COMMON_STATE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbState}
                  selected={StateName}
                  select={setSelectStateName}
                  disabled={isEdit}
                />
              </div>
              <div className="col-md-6" >
                <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbCountry}
                  selected={MotherCountry}
                  select={setSelectMotherCountry}
                  disabled={isEdit}
                />
              </div>
            </div>
          </div> */}
        <div className="row">
          <div className="col-md-12">
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
                optionKey="name"
                isMandatory={true}
                option={lbs}
                selected={PresentLBName}
                select={setSelectPresentLBName}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_LB_NAME")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_VILLAGE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbVillage}
                selected={PresentVillage}
                select={setSelectPresentVillage}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_VILLAGE")}`}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_TALUK")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbTaluk}
                selected={PresentTaluk}
                select={setSelectPresentTaluk}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_TALUK")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_POST_OFFICE")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbPostOffice}
                selected={PresentPostOffice}
                select={setSelectPresentPostOffice}
                disabled={isEdit}
                placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {t("CS_COMMON_PIN_CODE")}
                {/* <span className="mandatorycss">*</span> */}
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="PresentPincode"
                value={PresentPincode}
                onChange={setSelectPresentPincode}
                disable={isEdit}
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
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                <CheckBox
                  label={t("CR_PERMANANT_ADDRESS_SAME_AS_PRESENT_ADDRESS")}
                  onChange={setSameAsPresent}
                  value={isPrsentAddress}
                  checked={isPrsentAddress}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{t("CR_BUILDING_NO")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentBuldingNo"
                  value={PermanentBuldingNo}
                  onChange={setSelectPermanentBuldingNo}
                  disable={isEdit}
                  placeholder={`${t("CR_BUILDING_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_BUILDING_NO") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_HOUSE_NO")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentHouseNo"
                  value={PermanentHouseNo}
                  onChange={setSelectPermanentHouseNo}
                  disable={isEdit}
                  placeholder={`${t("CR_HOUSE_NO")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_HOUSE_NO") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_LOCALITY_EN")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={true}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameEn"
                  value={PermanentLocalityNameEn}
                  onChange={setSelectPermanentLocalityNameEn}
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
                  isMandatory={true}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentLocalityNameMl"
                  value={PermanentLocalityNameMl}
                  onChange={setSelectPermanentLocalityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_CITY_EN")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentCityNameEn"
                  value={PermanentCityNameEn}
                  onChange={setSelectPermanentCityNameEn}
                  disable={isEdit}
                  placeholder={`${t("CR_CITY_EN")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CITY_EN") })}
                />
              </div>
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_CITY_ML")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentCityNameMl"
                  value={PermanentCityNameMl}
                  onChange={setSelectPermanentCityNameMl}
                  disable={isEdit}
                  placeholder={`${t("CR_CITY_ML")}`}
                  {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_CITY_ML") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
                  selected={PermanentDistrict}
                  select={setSelectPermanentDistrict}
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
                  optionKey="name"
                  isMandatory={true}
                  option={lbs}
                  selected={PermanentLBName}
                  select={setSelectPermanentLBName}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_LB_NAME")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_VILLAGE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbVillage}
                  selected={PermanentVillage}
                  select={setSelectPermanentVillage}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_VILLAGE")}`}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_TALUK")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbTaluk}
                  selected={PermanentTaluk}
                  select={setSelectPermanentTaluk}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_TALUK")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_POST_OFFICE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbPostOffice}
                  selected={PermanentPostOffice}
                  select={setSelectPermanentPostOffice}
                  disabled={isEdit}
                  placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CS_COMMON_PIN_CODE")}
                  {/* <span className="mandatorycss">*</span> */}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="PermanentPincode"
                  value={PermanentPincode}
                  onChange={setSelectPermanentPincode}
                  disable={isEdit}
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
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default AddressInside;
