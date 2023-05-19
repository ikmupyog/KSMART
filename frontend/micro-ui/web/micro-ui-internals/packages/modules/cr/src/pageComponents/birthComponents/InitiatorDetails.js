import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, TextArea, Toast, LanguageIcon } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Timeline from "../../components/CRTimeline";
import { sortDropdownNames } from "../../utils";

const InitiatorDetails = ({ config, onSelect, userType, formData, isEditBirth = false }) => {
  //console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  let cmbInitiator =[];
  let cmbRelation =[];
  let cmbCareTakerDesign =[];
  let cmbIpopList =[];

  // const cmbInitiator = [
  //   { i18nKey: "Father", code: "FATHER" },
  //   { i18nKey: "Mother", code: "MOTHER" },
  //   { i18nKey: "Grandparent’s", code: "GRAND_PARENTS" },
  //   { i18nKey: "Self", code: "SELF" },
  //   { i18nKey: "Siblings", code: "SIBLINGS" },
  //   { i18nKey: "Guardian", code: "GUARDIAN" },
  //   { i18nKey: "Institutional Care Taker", code: "INST_CARE_TAKER" },
  // ];
  // const cmbRelation = [
  //   { i18nKey: "Grand Parent", code: "GRAND_PARENT" },
  //   { i18nKey: "Uncle", code: "UNCLE" },
  //   { i18nKey: "Aunt", code: "AUNT" },
  //   { i18nKey: "Other Relatives", code: "OTHER_RELATIVES" },
  //   { i18nKey: "Non–Related", code: "NON_RELATED" },
  // ];
  // const cmbCareTakerDesign = [
  //   { i18nKey: "Manager", code: "MANAGER" },
  //   { i18nKey: "Secretary", code: "SECRETARY" },
  //   { i18nKey: "Administrator", code: "ADMINISTRATOR" },
  //   { i18nKey: "Executive Officer", code: "EXECUTIVE_OFFICER" },
  //   { i18nKey: "Warden", code: "WARDEN" },
  // ];
  // const cmbIpopList = [
  //   { i18nKey: "IP", code: "IP" },
  //   { i18nKey: "OP", code: "OP" },
  // ];
  // console.log(Digit.UserService.getUser().info);  
  const { name: name, mobileNumber: mobileNumber, roles: userRoles, uuid: uuid, } = Digit.UserService.getUser().info;
  const { data: InitiatorDetails = {}, isInitiatorDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Initiator");
  const { data: RelationDetails = {}, isRelationDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Relation");
  const { data: CareTakerDesigDetails = {}, isCareTakerDesigDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "CareTakerDesignation");
  const { data: IPOPListDetails = {}, isIPOPListDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "IPOPList");
  
  InitiatorDetails &&
  InitiatorDetails["birth-death-service"] && InitiatorDetails["birth-death-service"].Initiator &&
  InitiatorDetails["birth-death-service"].Initiator.map((ob) => {
    cmbInitiator.push(ob);
    });
    RelationDetails &&
    RelationDetails["birth-death-service"] && RelationDetails["birth-death-service"].Relation &&
    RelationDetails["birth-death-service"].Relation.map((ob) => {
      cmbRelation.push(ob);
    });
    CareTakerDesigDetails &&
    CareTakerDesigDetails["birth-death-service"] && CareTakerDesigDetails["birth-death-service"].CareTakerDesignation &&
    CareTakerDesigDetails["birth-death-service"].CareTakerDesignation.map((ob) => {
      cmbCareTakerDesign.push(ob);
    });
    IPOPListDetails &&
    IPOPListDetails["birth-death-service"] && IPOPListDetails["birth-death-service"].IPOPList &&
    IPOPListDetails["birth-death-service"].IPOPList.map((ob) => {
      cmbIpopList.push(ob);
    });
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [isGuardian, setIsGuardian] = useState(formData?.InitiatorinfoDetails?.isGuardian ? formData?.InitiatorinfoDetails?.isGuardian : formData?.ChildDetails?.InitiatorinfoDetails?.isGuardian ? formData?.ChildDetails?.InitiatorinfoDetails?.isGuardian : false);
  const [isCaretaker, setIsCaretaker] = useState(formData?.InitiatorinfoDetails?.isCaretaker ? formData?.InitiatorinfoDetails?.isCaretaker : formData?.ChildDetails?.InitiatorinfoDetails?.isCaretaker ? formData?.ChildDetails?.InitiatorinfoDetails?.isCaretaker : false);
  const [initiator, setInitiator] = useState(formData?.InitiatorinfoDetails?.initiator?.code ? formData?.InitiatorinfoDetails?.initiator : formData?.ChildDetails?.InitiatorinfoDetails?.initiator ? cmbRelation.filter(cmbRelation => cmbRelation.code === formData?.ChildDetails?.InitiatorinfoDetails?.initiator)[0] : null);
  const [relation, setrelation] = useState(formData?.InitiatorinfoDetails?.relation?.code ? formData?.InitiatorinfoDetails?.relation : formData?.ChildDetails?.InitiatorinfoDetails?.relation ? cmbRelation.filter(cmbRelation => cmbRelation.code === formData?.ChildDetails?.InitiatorinfoDetails?.relation)[0] : null);
  const [initiatorInstitutionName, setinitiatorInstitutionName] = useState(formData?.InitiatorinfoDetails?.initiatorInstitutionName ? formData?.InitiatorinfoDetails?.initiatorInstitutionName : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorInstitutionName ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorInstitutionName : name);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? formData?.InitiatorinfoDetails?.initiatorNameEn : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn : name);
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? formData?.InitiatorinfoDetails?.initiatorAadhar : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? formData?.InitiatorinfoDetails?.initiatorMobile : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile : mobileNumber);
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.InitiatorinfoDetails?.initiatorDesi?.code ? formData?.InitiatorinfoDetails?.initiatorDesi : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi : null);
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.InitiatorinfoDetails?.initiatorAddress ? formData?.InitiatorinfoDetails?.initiatorAddress : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress : "");

  const [ipopList, setipopList] = useState(formData?.InitiatorinfoDetails?.ipopList?.code ? formData?.InitiatorinfoDetails?.ipopList : formData?.ChildDetails?.InitiatorinfoDetails?.ipopList ? cmbRelation.filter(cmbRelation => cmbRelation.code === formData?.ChildDetails?.InitiatorinfoDetails?.ipopList)[0] : "");
  const [ipopNumber, setipopNumber] = useState(formData?.InitiatorinfoDetails?.ipopNumber ? formData?.InitiatorinfoDetails?.ipopNumber : formData?.ChildDetails?.InitiatorinfoDetails?.ipopNumber ? formData?.ChildDetails?.InitiatorinfoDetails?.ipopNumber : "");
  const [obstetricsNumber, setobstetricsNumber] = useState(formData?.InitiatorinfoDetails?.obstetricsNumber ? formData?.InitiatorinfoDetails?.obstetricsNumber : formData?.ChildDetails?.InitiatorinfoDetails?.obstetricsNumber ? formData?.ChildDetails?.InitiatorinfoDetails?.obstetricsNumber : "");
  const [isHospitalUser, setIsHospitalUser] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);
  const [InitiatorError, setInitiatorError] = useState(false);
  const [relationnError, setrelationnError] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(false);
  const [ipopListError, setipopListError] = useState(false);
  const [ipopNumberError, setipopNumberError] = useState(false);
  const [obstetricsNumberError, setobstetricsNumberError] = useState(false);
  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
      }
      if (formData?.InitiatorinfoDetails?.isCaretaker != null) {
        setIsInitialRender(false);
        setIsCaretaker(formData?.InitiatorinfoDetails?.isCaretaker);
      }
      if (formData?.AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && formData?.AddressBirthDetails?.permtaddressStateName?.code === "kl") {
        let permAddress = formData?.AddressBirthDetails?.permntInKeralaAdrHouseNameEn + " , " + formData?.AddressBirthDetails?.permntInKeralaAdrLocalityNameEn + " , " +
          formData?.AddressBirthDetails?.permntInKeralaAdrStreetNameEn + " , " + formData?.AddressBirthDetails?.permntInKeralaAdrPostOffice.name + " , " +
          formData?.AddressBirthDetails?.permntInKeralaAdrPincode + " , " + formData?.AddressBirthDetails?.permntInKeralaAdrDistrict.name + " , " +
          formData?.AddressBirthDetails?.permtaddressStateName.name + " , " + formData?.AddressBirthDetails?.permtaddressCountry.name;
        setinitiatorAddress(permAddress);
        setIsInitialRender(false);
      } else if (formData?.AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && formData?.AddressBirthDetails?.permtaddressStateName?.code != "kl") {
        let permAddress = formData?.AddressBirthDetails?.permntOutsideKeralaHouseNameEn + " , " + formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn + " , " +
          formData?.AddressBirthDetails?.permntOutsideKeralaStreetNameEn + " , " + formData?.AddressBirthDetails?.permntOutsideKeralaCityVilgeEn + " , " +
          formData?.AddressBirthDetails?.permntOutsideKeralaLocalityNameEn + " , " + formData?.AddressBirthDetails?.permntOutsideKeralaPostOfficeEn + " , " +
          formData?.AddressBirthDetails?.permntOutsideKeralaPincode + " , " + formData?.AddressBirthDetails?.permntOutsideKeralaDistrict.name + " , " +
          formData?.AddressBirthDetails?.permtaddressStateName.name + " , " + formData?.AddressBirthDetails?.permtaddressCountry.name;
        setinitiatorAddress(permAddress);
        setIsInitialRender(false);
      } else if (formData?.AddressBirthDetails?.permtaddressCountry?.code != "COUNTRY_INDIA") {
        let permAddress = formData?.AddressBirthDetails?.permntOutsideIndiaLineoneEn + " , " + formData?.AddressBirthDetails?.permntOutsideIndiaLinetwoEn + " , " +
          formData?.AddressBirthDetails?.permntOutsideIndiaCityTown + " , " + formData?.AddressBirthDetails?.permntOutsideIndiaprovinceEn + " , " +
          formData?.AddressBirthDetails?.permanentOutsideIndiaPostCode + " , " + formData?.AddressBirthDetails?.permtaddressCountry.name;
        setinitiatorAddress(permAddress);
        setIsInitialRender(false);
      }
    }
  }, [isInitialRender]);

  useEffect(() => {
    if (userRoles.length > 0) {
      if (userRoles[0].code === "HOSPITAL_OPERATOR" || userRoles[0].code === "HOSPITAL_APPROVER") {
        setIsHospitalUser(true);
      } else {
        setIsHospitalUser(false);
      }
    }
  }, [userRoles]);

  function setSelectInitiator(value) {
    setInitiator(value);
    if (value.code === "GUARDIAN") {
      setIsGuardian(true);
      setIsCaretaker(false);
      setinitiatorDesi(null);
      setinitiatorInstitutionName("");
    } else if (value.code === "INST_CARE_TAKER") {
      setIsGuardian(false);
      setIsCaretaker(true);
      setrelation(null);
    } else {
      setIsGuardian(false);
      setIsCaretaker(false);
      setinitiatorDesi(null);
      setrelation(null);
      setinitiatorInstitutionName("");
    }
  }
  function setSelectrelation(value) {
    setrelation(value);
  }
  function setSelectinitiatorInstitutionName(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorInstitutionName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(value) {
    setinitiatorDesi(value);
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z,-0-9, ]*$") != null)) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }
  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }
  function setSelectipopNumber(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
      setipopNumber(e.target.value.trim().length <= 15 ? e.target.value : (e.target.value).substring(0, 15));
    }
  }
  function setSelectipop(value) {
    setipopList(value);
  }
  function setSelectobstetricsNumber(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null)) {
      setobstetricsNumber(e.target.value.trim().length <= 15 ? e.target.value : (e.target.value).substring(0, 15));
    }
  }
  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }

  function setCaretaker(e) {
    if (e.target.checked == true) {
      setIsCaretaker(e.target.checked);
      setinitiatorDesi("");
    } else {
      setIsCaretaker(e.target.checked);
    }
  }

  let validFlag = true;
  const goNext = () => {
    if (initiator == null || initiator == "" || initiator == undefined) {
      validFlag = false;
      setInitiatorError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiatorError(false);
    }
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }
    if (isCaretaker === true) {

      if (initiatorDesi == null || initiatorDesi == "" || initiatorDesi == undefined) {
        validFlag = false;
        setinitiatorDesiError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorDesiError(false);
      }
    }
    if (isGuardian === true) {
      if (relation == null || relation == "" || relation == undefined) {
        validFlag = false;
        setrelationnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setrelationnError(false);
      }
    }
    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (isHospitalUser) {
      if (ipopList === null) {
        validFlag = false;
        setipopListError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setipopListError(false);
      }
      if (ipopNumber === null || ipopNumber === "" || ipopNumber === undefined) {
        validFlag = false;
        setipopNumberError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setipopNumberError(false);
      }
      if (ipopNumber === null || ipopNumber === "" || ipopNumber === undefined) {
        validFlag = false;
        setipopNumberError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setipopNumberError(false);
      }
      if (obstetricsNumber === null || obstetricsNumber === "" || obstetricsNumber === undefined) {
        validFlag = false;
        setobstetricsNumberError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setobstetricsNumberError(false);
      }
    }
    if (validFlag == true) {

      onSelect(config.key, {
        initiator,
        relation,
        initiatorInstitutionName: initiatorInstitutionName.trim(),
        initiatorNameEn: initiatorNameEn.trim(),
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress: initiatorAddress.trim(),
        isInitiatorDeclaration,
        isCaretaker,
        isGuardian,
        ipopList,
        ipopNumber: (ipopNumber.toUpperCase()).trim(),
        obstetricsNumber: (obstetricsNumber.toUpperCase()).trim()
      });
    }
  };
  return (
    <React.Fragment>
      {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}

      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}
        isDisabled={!initiator || !initiatorAadhar || !initiatorNameEn || !initiatorMobile || initiatorAddress === ""
          || (isGuardian === true ? (!relation) : false)
          || (isCaretaker === true ? (initiatorDesi === "" || initiatorAddress === "") : false)
          || (isHospitalUser === true ? (!ipopList || ipopNumber === "" || obstetricsNumber === "") : false)
        }>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>{`${t("CR_INITIATOR")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                isMandatory={false}
                option={sortDropdownNames(cmbInitiator ? cmbInitiator : [], "code", t)}
                selected={initiator}
                select={setSelectInitiator}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR")}`}
              />
            </div>
            {isGuardian === true && (
              <div className="col-md-3">
                <CardLabel>{`${t("CR_RELATION")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbRelation ? cmbRelation : [], "code", t)}
                  selected={relation}
                  select={setSelectrelation}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_RELATION")}`}
                />
              </div>
            )}
            {isCaretaker === true && (
              <div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    optionKey="i18nKey"
                    name="initiatorInstitutionName"
                    value={initiatorInstitutionName}
                    onChange={setSelectinitiatorInstitutionName}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_INSTITUTION_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INSTITUTION_NAME") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown
                    t={t}
                    optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                    isMandatory={false}
                    option={sortDropdownNames(cmbCareTakerDesign ? cmbCareTakerDesign : [], "code", t)}
                    selected={initiatorDesi}
                    select={setSelectinitiatorDesi}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_INSTITUTION_NAME_DESIGNATION")}`}
                  />
                </div>
              </div>
            )}
            <div className="col-md-3">
              <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_INITIATOR_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
                disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              {isCaretaker === true && (
                <CardLabel>{`${t("CR_CARE_TAKER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
              )}
              {isCaretaker === false && (
                <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
              )}
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z,-0-9, ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        {isHospitalUser && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_ADMISION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_HOSP_ADMISSION_DETAILS")}`}<span className="mandatorycss">*</span></CardLabel>
                  <Dropdown
                    t={t}
                    optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                    isMandatory={false}
                    option={sortDropdownNames(cmbIpopList ? cmbIpopList : [], "code", t)}
                    selected={ipopList}
                    select={setSelectipop}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_IP_OP")}`}
                  />
                </div>
                <div className="col-md-2">
                  <CardLabel>.
                    {/* {`${t("CR_IP_OP_NO")}`}<span className="mandatorycss">*</span> */}
                    </CardLabel>
                  <TextInput
                    t={t}
                    type={"number"}
                    optionKey="i18nKey"
                    name="ipopNumber"
                    value={ipopNumber}
                    onChange={setSelectipopNumber}
                    style={{ textTransform: "uppercase" }}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_IP_OP_NO")}`}
                    {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_IP_OP_NO") })}
                  />
                </div>
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_HOSPITAL_RECORD_DELIVERY")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                    t={t}
                    type={"number"}
                    optionKey="i18nKey"
                    name="obstetricsNumber"
                    value={obstetricsNumber}
                    style={{ textTransform: "uppercase" }}
                    onChange={setSelectobstetricsNumber}
                    disable={isDisableEdit}
                    placeholder={`${t("CR_GYNC_REG_NO")}`}
                    {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_GYNC_REG_NO") })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {toast && (
          <Toast
            error={InitiatorError || relationnError || infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
              || ipopListError || ipopNumberError || obstetricsNumberError
            }
            label={ InitiatorError || relationnError || 
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
                || ipopListError || ipopNumberError || obstetricsNumberError
                ? InitiatorError
                ? t(`BIRTH_ERROR_INITIATOR_CHOOSE`)
                : relationnError
                ? t(`BIRTH_ERROR_RELATION_CHOOSE`)
                : infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : initiatorMobileError
                      ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                      : initiatorDesiError
                        ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                        : ipopListError
                          ? t(`BIRTH_ERROR_HOSP_IPLIST_CHOOSE`)
                          : ipopNumberError
                            ? t(`BIRTH_ERROR_HOSP_IPNO_CHOOSE`)
                            : obstetricsNumberError
                              ? t(`BIRTH_ERROR_HOSP_GYN_REG_CHOOSE`)
                              : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment >
  );
};
export default InitiatorDetails;
