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
  SubmitBar,
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

function DeathCorrectionEditPage({ sex, cmbPlace, DeathCorrectionDocuments, navigationData, onSubmitAcknowledgement, navigateAcknowledgement }) {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showModal, setShowModal] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [selectedCorrectionItem, setSelectedCorrectionItem] = useState([]);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_DEATH_CORRECTION", {});

  let deathCorrectionFormData = {};
  const [deathCorrectionFormsObj, setDeathCorrectionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState([]);

  let validation = {};
  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-9">{children}</div>;
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
    console.log("fetchData---flag==", params, Object.keys(params));
    if (Object.keys(params)?.length > 0) {
      let tempParams = {};
      Object.keys(params).forEach((key, index) => (tempParams[key] = { ...params[key], isDisabled: true, isEditable: false, isFocused: false }));
      setDeathCorrectionFormsObj({ ...tempParams });
      console.log("params[key]", tempParams);
      // setIsFetchData(false);
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
    console.log("tempObj==", fileData, selectedFieldType, tempObj);
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

  const { handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

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
    console.log("DECEASED_AADHAR==", e.target.value);
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

  const onDocUploadSuccess = (data) => {
    console.log("success==", data);
    onSubmitAcknowledgement(data);
  };

  const onSubmitDeathCorrection = () => {
    const formattedResp = formatApiParams(deathCorrectionFormsObj, navigationData);
    if (formattedResp?.CorrectionDetails?.[0]?.CorrectionField?.length > 0) {
      console.log("formattedResp", formattedResp);
      setParams(deathCorrectionFormsObj);
      navigateAcknowledgement({ deathCorrectionFormsObj: formattedResp, navigationData });
    } else {
      alert("Please edit atleast a field before submit");
    }
  };

  const config = { texts: { submitBarLabel: "Next" } };
  const onSubmit = (data) => console.log(data);

  if (Object.keys(deathCorrectionFormsObj)?.length > 0) {
    console.log("deathCorrectionFormsObj==", deathCorrectionFormsObj);
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {/* <FormStep
       t={t}
        > */}
        <FormStep onSelect={onSubmitDeathCorrection} config={config}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12 mystyle">
                <h1 className="headingh1 hstyle">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CORRECTION_NAME_DECEASED")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFieldContainer>
              <FieldComponentContainer>
                <div className="col-md-5">
                  <CardLabel>{t("CR_AADHAR")}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    name="AadharNumber"
                    max="12"
                    isMandatory={false}
                    disabled={deathCorrectionFormsObj?.DECEASED_AADHAR?.isDisabled}
                    autoFocus={deathCorrectionFormsObj?.DECEASED_AADHAR?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_AADHAR?.curValue}
                    onBlur={(e) => onAdharChange(e)}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.5rem" }}>
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
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "firstNameEn")}
                    placeholder={`${t("CR_FIRST_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.middleNameEn}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "middleNameEn")}
                    placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.lastNameEn}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "lastNameEn")}
                    placeholder={`${t("CR_LAST_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>

              <div style={{ marginTop: "2.8rem" }}>
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
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "firstNameMl")}
                    placeholder={`${t("CR_FIRST_NAME_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.middleNameMl}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "middleNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_NAME?.curValue.lastNameMl}
                    disabled={deathCorrectionFormsObj?.DECEASED_NAME?.isDisabled}
                    autoFocus={deathCorrectionFormsObj?.DECEASED_NAME?.isFocused}
                    onBlur={(e) => onNameChange(e, "lastNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_LAST_NAME_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
            </FormFieldContainer>
            <FormFieldContainer>
              <FieldComponentContainer>
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
                    {...(validation = { isRequired: true, title: t("CR_DATE_OF_DEATH") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
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
              <div style={{ marginTop: "2.8rem" }}>
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
                    autofocus={deathCorrectionFormsObj.DECEASED_MOTHER?.isFocused}
                    onBlur={(e) => onBlurMotherName(e, "mothersNameEn")}
                    placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_MOTHER?.curValue?.mothersNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_MOTHER?.isDisabled}
                    // autofocus={deathCorrectionFormsObj.DECEASED_MOTHER?.isFocused}
                    onBlur={(e) => onBlurMotherName(e, "mothersNameMl")}
                    placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
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
                    autofocus={deathCorrectionFormsObj.DECEASED_FATHER?.isFocused}
                    onBlur={(e) => onBlurFatherName(e, "fathersNameEn")}
                    placeholder={`${t("CR_FATHER_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_FATHER?.curValue.fathersNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_FATHER?.isDisabled}
                    autofocus={deathCorrectionFormsObj.DECEASED_FATHER?.isFocused}
                    onBlur={(e) => onBlurFatherName(e, "fathersNameMl")}
                    // onBlur={setSelectDeceasedFirstNameEn}
                    placeholder={`${t("CR_FATHER_NAME_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>

              <div style={{ marginTop: "2.5rem" }}>
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
                  <CardLabel>{`${t("CR_SPOUSE_TYPE_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_SPOUSE?.curValue.spouseNameEn}
                    disabled={deathCorrectionFormsObj.DECEASED_SPOUSE?.isDisabled}
                    autofocus={deathCorrectionFormsObj.DECEASED_SPOUSE?.isFocused}
                    onBlur={(e) => onBlurSpouseName(e, "spouseNameEn")}
                    placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("CR_SPOUSE_TYPE_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.DECEASED_SPOUSE?.curValue.spouseNameMl}
                    disabled={deathCorrectionFormsObj.DECEASED_SPOUSE?.isDisabled}
                    autofocus={deathCorrectionFormsObj.DECEASED_SPOUSE?.isFocused}
                    onBlur={(e) => onBlurSpouseName(e, "spouseNameMl")}
                    placeholder={`${t("CR_SPOUSE_TYPE_ML")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.5rem" }}>
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
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.houseNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "houseNameEn")}
                    placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    value={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.localityNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "localityNameEn")}
                    placeholder={`${t("CR_LOCALITY_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.streetNameEn}
                    onBlur={(e) => onPresentAddressChange(e, "streetNameEn")}
                    placeholder={`${t("CR_STREET_EN")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.5rem" }}>
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
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "houseNameMl")}
                    placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.localityNameMl}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "localityNameMl")}
                    placeholder={`${t("CR_LOCALITY_MAL")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    type={"text"}
                    defaultValue={deathCorrectionFormsObj?.PERMANENT_ADDRESS?.curValue.streetNameMl}
                    disabled={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isDisabled}
                    autofocus={deathCorrectionFormsObj.PERMANENT_ADDRESS?.isFocused}
                    onBlur={(e) => onPresentAddressChange(e, "streetNameMl")}
                    placeholder={`${t("CR_STREET_MAL")}`}
                    // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                  />
                </div>
              </FieldComponentContainer>
            </FormFieldContainer>
            {/* <div style={{ display: "flex", flexDirection: "column-reverse" }}></div>
            <FormFieldContainer>
              <FieldComponentContainer></FieldComponentContainer>
              <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmitDeathCorrection} />
            </FormFieldContainer> */}
          </form>
          <DeathCorrectionModal
            showModal={showModal}
            selectedConfig={selectedCorrectionItem}
            onSubmit={onUploadDocSubmit}
            hideModal={_hideModal}
            selectedDocs={selectedDocs}
            selectedDocData={selectedDocData}
          />
        </FormStep>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default DeathCorrectionEditPage;
