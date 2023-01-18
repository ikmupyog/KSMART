import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, TextArea, CheckBox,BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
// import PlaceOfDeathHome from "./PlaceOfDeathHome";
import InformantAddress from "../birthComponents/InformantAddress";

const ApplicantDetails = ({ config, onSelect, userType, formData }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  // const { data: title = {}, istitleLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Title");
  // const { data: Village = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  // const { data: Taluk = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  // const { data: District = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  // const { data: localbodies, isLoading } = Digit.Hooks.useTenants();
  // const [lbs, setLbs] = useState(0);
  // const [isInitialRender, setIsInitialRender] = useState(true);
  const [ApplicantNameEn, setApplicantNameEn] = useState(formData?.ApplicantDetails?.ApplicantNameEn);
  const [ApplicantNameMl, setApplicantNameMl] = useState(formData?.ApplicantDetails?.ApplicantNameMl);
  // const [setTitle, setSelectedTitle] = useState(formData?.ApplicantDetails?.setTitle);
  // const [setVillage, setSelectedVillage] = useState(formData?.ApplicantDetails?.setVillage);
  // const [setTaluk, setSelectedTaluk] = useState(formData?.ApplicantDetails?.setTaluk);
  // const [PresentDistrict, setSelectedPresentDistrict] = useState(formData?.AddressDetails?.PresentDistrict);
  // const [StateName, setSelectedStateName] = useState(formData?.AddressDetails?.StateName);
  // const [BuildingNo, setBuildingNo] = useState(formData?.ApplicantDetails?.BuildingNo);
  // const [HouseNo, setHouseNo] = useState(formData?.ApplicantDetails?.HouseNo);
  // const [HouseNameEn, setHouseNameEn] = useState(formData?.ApplicantDetails?.HouseNameEn);
  // const [HouseNameMl, setHouseNameMl] = useState(formData?.ApplicantDetails?.HouseNameMl);
  // const [StreetNameMl, setStreetNameMl] = useState(formData?.ApplicantDetails?.StreetNameMl);
  // const [StreetNameEn, setStreetNameEn] = useState(formData?.ApplicantDetailss?.StreetNameEn);
  // const [Locality, setLocality] = useState(formData?.ApplicantDetails?.Locality);
  // const [LocalityMl, setLocalityMl] = useState(formData?.ApplicantDetails?.LocalityMl);
  // const [MainPlaceEn, setMainPlaceEn] = useState(formData?.ApplicantDetails?.MainPlaceEn);
  // const [MainPlaceMl, setMainPlaceMl] = useState(formData?.ApplicantDetails?.MainPlaceMl);
  // const [ViaEn, setViaEn] = useState(formData?.ApplicantDetails?.ViaEn);
  // const [ViaMl, setViaMl] = useState(formData?.ApplicantDetails?.ViaMl);
  // const [PinCode, setPinCode] = useState(formData?.ApplicantDetails?.PinCode);
  // const [setPostOffice, setSelectedPostOffice] = useState(formData?.ApplicantDetails?.setPostOffice);
  // const [PresentLBName, setSelectedPresentLBName] = useState(formData?.ApplicantDetails?.PresentLBName);
  const [AadhaarNo, setAadhaarNo] = useState(formData?.ApplicantDetails?.AadhaarNo);
  const [InformentMobileNo, setInformentMobileNo] = useState(formData?.ApplicantDetails?.InformentMobileNo);
  const [InformentEmail, setInformentEmail] = useState(formData?.ApplicantDetails?.InformentEmail);
  // const [InformentOfAge, setInformentOfAge] = useState(formData?.ApplicantDetails?.InformentOfAge);

 // Informent Address from Birth Page
  const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.ApplicantDetails?.InformantAdrsCountry);
  const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.ApplicantDetails?.InformantAdrsStateName);
  const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.ApplicantDetails?.InformantAdrsDistrict);
  const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.ApplicantDetails?.InformantAdrsLBTypeName);
  const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.ApplicantDetails?.InformantAdrsLBName);
  const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.ApplicantDetails?.InformantAdrsTaluk);
  const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.ApplicantDetails?.InformantAdrsPostOffice);
  const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.ApplicantDetails?.InformantAdrsPincode);
  const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsHouseNameEn);
  // const [InformantAdrsBuldingNo, setInformantAdrsBuldingNo] = useState(formData?.ApplicantDetails?.InformantAdrsBuldingNo);
  const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.ApplicantDetails?.InformantAdrsResNo);
  const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.ApplicantDetails?.InformantAdrsDoorNo);
  const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.ApplicantDetails?.InformantAdrsMainPlaceEn);
  const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsLocalityNameEn);
  const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.ApplicantDetails?.InformantAdrsStreetNameEn);
  const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.ApplicantDetails?.InformantAdrsVillage);
  

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
  //   setStateName(value);
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
  function setSelectApplicantNameEn(e) {
    setApplicantNameEn(e.target.value);
  }
  function setSelectApplicantNameMl(e) {
    setApplicantNameMl(e.target.value);
  }
  function setSelectAadhaarNo(e) {
    setAadhaarNo(e.target.value);
  }
  function setSelectInformentMobileNo(e) {
    setInformentMobileNo(e.target.value);
  }
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
  //   setSelectPresentDistrict(value);
  // }
  // function selectPostOffice(value) {
  //   setSelectedPostOffice(value);
  // }
  // function selectPresentLbName(value) {
  //   setSelectedPresentLbName(value);
  // }
  // function selectStateName(value) {
  //   setSelectedStateName(value);
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
    // sessionStorage.setItem("setStateName", setStateName ? setStateName.code : null);
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
    sessionStorage.setItem("ApplicantNameEn", ApplicantNameEn ? ApplicantNameEn : null );
    sessionStorage.setItem("ApplicantNameMl", ApplicantNameMl ? ApplicantNameMl : null);
    // sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    sessionStorage.setItem("AadhaarNo", AadhaarNo ? AadhaarNo : null);
    sessionStorage.setItem("InformentMobileNo", InformentMobileNo ? InformentMobileNo :null);
    sessionStorage.setItem("InformentEmail", InformentEmail ? InformentEmail : null);
    // sessionStorage.setItem("InformentOfAge", InformentOfAge);
    
 // Address from Birth
    sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
    sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
    sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
    // sessionStorage.setItem("InformantAdrsBuldingNo", InformantAdrsBuldingNo);
    sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
    sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
    sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
    sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
    sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
    sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
    sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
    sessionStorage.setItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
    sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
    sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
    sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
    sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPostOffice : null);

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
      ApplicantNameEn,
      ApplicantNameMl,
      // setTitle,
      AadhaarNo,
      InformentMobileNo,
      InformentEmail,
      // InformentOfAge,


      InformantAdrsCountry,
      InformantAdrsStateName,
      InformantAdrsLBTypeName,
      InformantAdrsMainPlaceEn,
      InformantAdrsStreetNameEn,
      InformantAdrsVillage,
      InformantAdrsLBName,
      InformantAdrsDistrict,
      InformantAdrsTaluk,
      InformantAdrsPostOffice,
      InformantAdrsPincode,
      InformantAdrsResNo,
      InformantAdrsDoorNo,
      InformantAdrsHouseNameEn,
      InformantAdrsLocalityNameEn,
      // InfntWardNo,

    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
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
          <div className="col-md-4">
            <CardLabel>
              {t("CR_APPLICANT_NAME_EN")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameEn"
              value={ApplicantNameEn}
              onChange={setSelectApplicantNameEn}
              disable={isEdit}
              placeholder={`${t("CR_APPLICANT_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>
              {t("CR_APPLICANT_NAME_ML")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type={"text"}
              optionKey="i18nKey"
              name="ApplicantNameMl"
              value={ApplicantNameMl}
              onChange={setSelectApplicantNameMl}
              disable={isEdit}
              placeholder={`${t("CR_APPLICANT_NAME_ML")}`}
              {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
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
        <div>
          <div>
          <InformantAddress
              InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsCountry={setInformantAdrsCountry}
              InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsStateName={setInformantAdrsStateName}
              InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsDistrict={setInformantAdrsDistrict}
              InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName}
              InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsLBName={setInformantAdrsLBName}
              InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsTaluk={setInformantAdrsTaluk}
              InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice}
              InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsPincode={setInformantAdrsPincode}
              InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn}
              // InformantAdrsBuldingNo={InformantAdrsBuldingNo} setInformantAdrsBuldingNo={setInformantAdrsBuldingNo}
              InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsResNo={setInformantAdrsResNo}
              InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo}
              InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn}
              InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn}
              InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn}
              InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsVillage={setInformantAdrsVillage}
              // InfntWardNo={InfntWardNo} setInfntWardNo={setInfntWardNo}
            />
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
                  select={setSelectedStateName}
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
              option={cmbVillage}
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
export default ApplicantDetails;
