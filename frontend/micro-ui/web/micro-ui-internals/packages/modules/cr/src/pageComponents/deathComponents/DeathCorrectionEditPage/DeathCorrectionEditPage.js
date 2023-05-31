import React, { useState, useEffect } from "react";
import {
  CardLabel,
  TextInput,
  DatePicker,
  Dropdown,
  FormStep,
  BackButton,
  EditIcon,
  Loader,
  Toast,
  SubmitBar,
  FormBackButton,
} from "@egovernments/digit-ui-react-components";
import FormFieldContainer from "../../../components/FormFieldContainer";
import { useTranslation } from "react-i18next";
import DeathCorrectionModal from "../../../components/DeathCorrectionModal";
import { DEATH_CORRECTION_FIELD_NAMES } from "../../../config/constants";
import { initializedDeathCorrectionObject } from "../../../business-objects/globalObject";
import moment from "moment";
import { convertEpochToDate } from "../../../utils";
import { useForm } from "react-hook-form";
import { formatApiParams } from "../../../utils/deathCorrectionParams";
import DeathCorrectionDocUpload from "../../../components/DeathCorrectionDocUpload";

function DeathCorrectionEditPage({ sex, cmbPlace, DeathCorrectionDocuments, navigationData, onSubmitAcknowledgement, navigateAcknowledgement }) {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showModal, setShowModal] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [selectedCorrectionItem, setSelectedCorrectionItem] = useState([]);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_DEATH_CORRECTION", {});
  const [toast, setToast] = useState({ show: false, message: "" });

  let deathCorrectionFormData = {};
  const [deathCorrectionFormsObj, setDeathCorrectionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState([]);

  let validation = {};
  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-10">{children}</div>;
  };

  const mutation = Digit.Hooks.cr.useDeathCorrectionAction(tenantId);

  const formatDod = (date) => {
    return date;
  };
  const onBackButtonEvent = () => {
    setParams({});
  };

  useEffect(() => {
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  useEffect(async () => {
    if (Object.keys(params)?.length > 0) {
      let tempParams = {};
      Object.keys(params).forEach((key, index) => (tempParams[key] = { ...params[key], isDisabled: true, isFocused: false }));
      setDeathCorrectionFormsObj({ ...tempParams });
    } else {
      deathCorrectionFormData = await initializedDeathCorrectionObject(DeathCorrectionDocuments, navigationData, sex, cmbPlace);
      await setDeathCorrectionFormsObj(deathCorrectionFormData);
    }
  }, [navigationData, DeathCorrectionDocuments]);

  const setDeathCorrectionFilterQuery = (fieldId) => {
    let selectedDeathCorrectionData = deathCorrectionFormsObj[fieldId];
    setSelectedFieldType(fieldId);
    setSelectedCorrectionItem(selectedDeathCorrectionData);
    setShowModal(true);
  };

  const ButtonContainer = ({ children }) => {
    return (
      <div className="col-md-2" style={{ background: "rgba(244, 119, 56, 0.12)", borderRadius: "9999px", height: "3rem", width: "3rem" }}>
        {children}
      </div>
    );
  };

  const onUploadDocSubmit = async (fileData, error) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let tempFieldType = tempObj[selectedFieldType];

    if (fileData && fileData?.length > 0) {
      const selectedDocIds = fileData.map((item) => item.documentId);
      setSelectedDocs([...selectedDocs, ...selectedDocIds]);
      const filteredData = fileData.filter((item) => {
        if (!selectedDocs.includes(item.documentId)) {
          return item;
        }
      });
      setSelectedDocData([...selectedDocData, ...filteredData]);
    }

    tempObj = {
      ...tempObj,
      [selectedFieldType]: {
        ...tempFieldType,
        documentData: fileData,
        selectedDocType: selectedFieldType,
        isEditable: true,
        isFocused: true,
        isDisabled: false,
      },
    };

    setDeathCorrectionFormsObj(tempObj);
    setShowModal(false);
  };

  // const { handleSubmit } = useForm({
  //   reValidateMode: "onSubmit",
  //   mode: "all",
  // });

  const onDodChange = (value) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_DOB } = tempObj;
    tempObj = {
      ...tempObj,
      DECEASED_DOB: { ...DECEASED_DOB, curValue: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"), isFocused: false },
    };
    setDeathCorrectionFormsObj(tempObj);
  };
  const onAdharChange = (e) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_AADHAR } = tempObj;
    tempObj = { ...tempObj, DECEASED_AADHAR: { ...DECEASED_AADHAR, curValue: e.target.value, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };
  const onNameChange = (e, fieldType) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_NAME } = tempObj;
    let { curValue } = DECEASED_NAME;
    tempObj = { ...tempObj, DECEASED_NAME: { ...DECEASED_NAME, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };

  const onBlurMotherName = (e, fieldType) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_MOTHER } = tempObj;
    let { curValue } = DECEASED_MOTHER;
    tempObj = { ...tempObj, DECEASED_MOTHER: { ...DECEASED_MOTHER, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };
  const onBlurFatherName = (e, fieldType) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_FATHER } = tempObj;
    let { curValue } = DECEASED_FATHER;
    tempObj = { ...tempObj, DECEASED_FATHER: { ...DECEASED_FATHER, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };
  const onBlurSpouseName = (e, fieldType) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_SPOUSE } = tempObj;
    let { curValue } = DECEASED_SPOUSE;
    tempObj = { ...tempObj, DECEASED_SPOUSE: { ...DECEASED_SPOUSE, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };

  const onGenderChange = (genderDetails) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_SEX } = tempObj;
    tempObj = { ...tempObj, DECEASED_SEX: { ...DECEASED_SEX, curValue: genderDetails, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };
  const onPlaceChange = (placeDetails) => {
    setselectDeathPlace(placeDetails);
    let tempObj = { ...deathCorrectionFormsObj };
    let { DECEASED_PLACE_OF_DEATH } = tempObj;
    tempObj = { ...tempObj, DECEASED_PLACE_OF_DEATH: { ...DECEASED_PLACE_OF_DEATH, curValue: placeDetails, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };

  const onPresentAddressChange = (e, fieldType) => {
    let tempObj = { ...deathCorrectionFormsObj };
    let { PERMANENT_ADDRESS } = tempObj;
    let { curValue } = PERMANENT_ADDRESS;
    tempObj = { ...tempObj, PERMANENT_ADDRESS: { ...PERMANENT_ADDRESS, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setDeathCorrectionFormsObj(tempObj);
  };

  const checkLangRequired = (columnName, fieldName, lang ="Ml") => {
    const langKeys = ["En","Ml"];
    const reverseLangkeys = lang === "Ml" ? langKeys : langKeys.reverse();
    let enKey = fieldName?.replace(lang, reverseLangkeys[0]);
    if (deathCorrectionFormsObj?.[columnName]?.isEditable && deathCorrectionFormsObj?.[columnName]?.curValue?.[enKey]?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onDocUploadSuccess = (data) => {
    onSubmitAcknowledgement(data);
  };

  const onSubmitDeathCorrection = () => {
    if (!deathCorrectionFormsObj?.DECEASED_SEX?.curValue && deathCorrectionFormsObj.DECEASED_SEX?.isEditable) {    
      setToast({ show: true, message: t("CR_INVALID_GENDER") });
      return false;
    }
    setToast({ show: false, message: "" });
    const formattedResp = formatApiParams(deathCorrectionFormsObj, navigationData);
    if (formattedResp?.CorrectionDetails?.[0]?.CorrectionField?.length > 0) {
      setParams(deathCorrectionFormsObj);
      navigateAcknowledgement({ deathCorrectionFormsObj: formattedResp, navigationData });
    } else {
      alert(t("CR_EDIT_ATLEAST"));
    }
  };

  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }


  function onChangeMalayalam(e, columnName, fieldType) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      let tempObj = { ...deathCorrectionFormsObj };
      let { curValue } = tempObj[columnName];
      tempObj = { ...tempObj,  columnName: { ...columnName, curValue: { ...curValue, [fieldType]: "" }, isFocused: false } };
      setDeathCorrectionFormsObj(tempObj);
    }
  }

  const config = { texts: { submitBarLabel: "Next" } };
 

  
  if (Object.keys(deathCorrectionFormsObj)?.length > 0) {
    return (
      <React.Fragment>
           {/* <div style={{display:'flex',flexDirection:'row', width:'100%'}}>
        <div style={{width:"70%"}}>
        <FormStep onSelect={onSubmitDeathCorrection} config={config}> */}
          <div style={{display:'flex'}}>
        <div style={{marginTop: "0.6rem", width: "100%"}}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12 mystyle">
                <h1 className="headingh1 hstyle">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-5">
                  <CardLabel>{t("CR_AADHAR")}</CardLabel>
                  <TextInput
                    t={t}
                    name="AadharNumber"
                    max="12"
                    optionKey="i18nKey"
                    disabled={deathCorrectionFormsObj?.DECEASED_AADHAR?.isDisabled}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_AADHAR?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_AADHAR?.curValue}
                    onBlur={(e) => onAdharChange(e)}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: deathCorrectionFormsObj?.DECEASED_AADHAR?.isEditable, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_AADHAR?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_AADHAR"])}>
                      <EditIcon style={{ position: "absolute", top: "0.95rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.firstNameEn}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "firstNameEn")}
                    placeholder={`${t("CR_FIRST_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: deathCorrectionFormsObj?.DECEASED_NAME?.isEditable, title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.middleNameEn}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "middleNameEn")}
                    placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: checkLangRequired("DECEASED_NAME", "middleNameEn", "En"), title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.lastNameEn}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "lastNameEn")}
                    placeholder={`${t("CR_LAST_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: checkLangRequired("DECEASED_NAME", "lastNameEn", "En"), title: t("CR_INVALID_LAST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>

              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_NAME"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.firstNameMl}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    onBlur={(e) => onNameChange(e, "firstNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_NAME", "firstNameMl")}
                    placeholder={`${t("CR_FIRST_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_NAME", "firstNameMl"), title: t("CR_INVALID_FIRST_NAME_ML") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.middleNameMl}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "middleNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_NAME", "middleNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_NAME", "middleNameMl"), title:  t("CR_INVALID_MIDDLE_NAME_ML") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.lastNameMl}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "lastNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_NAME", "lastNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_LAST_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_NAME", "lastNameMl"), title: t("CR_INVALID_LAST_NAME_ML"), })}
                  />
                </div>
              </FieldComponentContainer>
            </FormFieldContainer>
            <FormFieldContainer>
              <div className="col-md-10">
              {/* <FieldComponentContainer> */}
                <div className="col-md-4">
                  <CardLabel>{t("CR_DATE_OF_DEATH")}</CardLabel>
                  <DatePicker
                    placeholder={`${t("CR_DATE_OF_DEATH")}`}
                    disabled={deathCorrectionFormsObj.DECEASED_DOB?.isDisabled}
                    autofocus={deathCorrectionFormsObj.DECEASED_DOB?.isFocused}
                    date={deathCorrectionFormsObj?.DECEASED_DOB?.curValue}
                    max={convertEpochToDate(new Date())}
                    min={convertEpochToDate("1900-01-01")}
                    onChange={onDodChange}
                    formattingFn={formatDod}
                  />
                </div>
                </div>
              {/* </FieldComponentContainer> */}
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_DOB?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_DOB"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4">
                  <CardLabel>{t("CR_GENDER")}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="code"
                    option={sex}
                    disable={deathCorrectionFormsObj.DECEASED_SEX?.isDisabled}
                    autofocus={deathCorrectionFormsObj.DECEASED_SEX?.isFocused}
                    selected={deathCorrectionFormsObj?.DECEASED_SEX?.curValue}
                    placeholder={`${t("CR_GENDER")}`}
                    select={onGenderChange}
                    {...(validation = { isRequired: false, title: t("DC_INVALID_GENDER") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_SEX?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_SEX"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOTHER_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_MOTHER?.curValue?.mothersNameEn}
                    disabled={deathCorrectionFormsObj.DECEASED_MOTHER?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_MOTHER?.isFocused}
                    onBlur={(e) => onBlurMotherName(e, "mothersNameEn")}
                    placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: checkLangRequired("DECEASED_MOTHER", "mothersNameEn", "En"), title: t("CR_INVALID_MOTHER_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_MOTHER?.curValue?.mothersNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_MOTHER?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autofocus={deathCorrectionFormsObj.DECEASED_MOTHER?.isFocused}
                    onBlur={(e) => onBlurMotherName(e, "mothersNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_MOTHER", "mothersNameMl")}
                    placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_MOTHER", "mothersNameMl"), title: t("CR_INVALID_MOTHER_NAME_ML") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_MOTHER?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_MOTHER"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_FATHER_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_FATHER?.curValue.fathersNameEn}
                    disabled={deathCorrectionFormsObj.DECEASED_FATHER?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_FATHER?.isFocused}
                    onBlur={(e) => onBlurFatherName(e, "fathersNameEn")}
                    placeholder={`${t("CR_FATHER_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: checkLangRequired("DECEASED_FATHER", "fathersNameEn", "En"), title: t("CR_INVALID_FATHER_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_FATHER?.curValue.fathersNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_FATHER?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_FATHER?.isFocused}
                    onKeyPress={setCheckMalayalamInputField}
                    onBlur={(e) => onBlurFatherName(e, "fathersNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_MOTHER", "mothersNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_FATHER_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_FATHER", "fathersNameMl"), title: t("CR_INVALID_FATHER_NAME_ML") })}
                  />
                </div>
              </FieldComponentContainer>

              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_FATHER?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_FATHER"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-4"> 
                  <CardLabel>{`${t("CR_SPOUSE_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_SPOUSE?.curValue.spouseNameEn}
                    disabled={deathCorrectionFormsObj.DECEASED_SPOUSE?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_SPOUSE?.isFocused}
                    onBlur={(e) => onBlurSpouseName(e, "spouseNameEn")}
                    placeholder={`${t("CR_SPOUSE_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", type: "text", isRequired: checkLangRequired("DECEASED_SPOUSE", "spouseNameEn", "En"), title: t("CR_INVALID_SPOUSE_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_SPOUSE_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_SPOUSE?.curValue.spouseNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_SPOUSE?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_SPOUSE?.isFocused}
                    onKeyPress={setCheckMalayalamInputField}
                    onBlur={(e) => onBlurSpouseName(e, "spouseNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "DECEASED_SPOUSE", "spouseNameMl")}
                    placeholder={`${t("CR_SPOUSE_NAME_ML")}`}
                    {...(validation = { pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$", type: "text", isRequired: checkLangRequired("DECEASED_SPOUSE", "spouseNameMl"), title: t("CR_INVALID_SPOUSE_NAME_ML") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.DECEASED_SPOUSE?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_SPOUSE"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.houseNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "houseNameEn")}
                    placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", type: "text", isRequired: checkLangRequired("PERMANENT_ADDRESS", "houseNameEn", "En"), title: t("CR_INVALID_HOUSE_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.localityNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "localityNameEn")}
                    placeholder={`${t("CR_LOCALITY_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", type: "text", isRequired: checkLangRequired("PERMANENT_ADDRESS", "localityNameEn", "En"), title: t("CR_INVALID_LOCALITY_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.streetNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "streetNameEn")}
                    placeholder={`${t("CR_STREET_EN")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.`'0-9 ]*$", type: "text", isRequired: checkLangRequired("PERMANENT_ADDRESS", "streetNameEn", "En"), title: t("CR_INVALID_STREET_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.2rem" }}>
                {deathCorrectionFormsObj?.PERMANENT_ADDRESS?.isDisabled && (
                  <ButtonContainer>
                    <span onClick={() => setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["PERMANENT_ADDRESS"])}>
                      <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                    </span>
                  </ButtonContainer>
                )}
              </div>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-6">
                  <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.houseNameMl}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "houseNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "PERMANENT_ADDRESS", "houseNameMl")}
                    placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 \-]*$",
                      type: "text",
                      isRequired: checkLangRequired("PERMANENT_ADDRESS", "houseNameMl"),
                      title: t("CR_INVALID_HOUSE_NAME_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.localityNameMl}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "localityNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "PERMANENT_ADDRESS", "localityNameMl")}
                    placeholder={`${t("CR_LOCALITY_MAL")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                      type: "text",
                      isRequired: checkLangRequired("PERMANENT_ADDRESS", "localityNameMl"),
                      title: t("CR_INVALID_LOCALITY_ML"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.streetNameMl}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    onKeyPress={setCheckMalayalamInputField}
                    // autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "streetNameMl")}
                    onChange={(e) => onChangeMalayalam(e, "PERMANENT_ADDRESS", "streetNameMl")}
                    placeholder={`${t("CR_STREET_MAL")}`}
                    {...(validation = {
                      pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                      type: "text",
                      isRequired: checkLangRequired("PERMANENT_ADDRESS", "streetNameMl"),
                      title: t("CR_INVALID_STREET_NAME_ML"),
                    })}
                  />
                </div>
              </FieldComponentContainer>
            </FormFieldContainer>
            <div className="buttonContainerN" style={{ padding: "2rem"}}>
        <FormBackButton>{t("CS_COMMON_BACK")}</FormBackButton>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmitMarriageCorrection} />
      </div>
          {/* <DeathCorrectionModal
            showModal={showModal}
            selectedConfig={selectedCorrectionItem}
            onSubmit={onUploadDocSubmit}
            hideModal={_hideModal}
            selectedDocs={selectedDocs}
            selectedDocData={selectedDocData}
          /> */}
        {/* </FormStep> */}
        </div>
          <DeathCorrectionDocUpload
            selectedConfig={selectedCorrectionItem}
            showModal={showModal}
            onSubmit={onUploadDocSubmit}
            hideModal={_hideModal}
            selectedDocs={selectedDocs}
            selectedDocData={selectedDocData} 
          />
        </div>
        {toast.show && <Toast error={toast.show} label={toast.message} onClose={() => setToast(false)} />}
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default DeathCorrectionEditPage;
