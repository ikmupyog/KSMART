import React, { useState, useEffect, useCallback } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  SubmitBar,
  EditButton,
  PopUp,
  Toast,
  UploadFile,
  EditIcon,
  FormBackButton,
  Accordion,
  StatusTable,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import FormFieldContainer from "../../../components/FormFieldContainer";
import BirthInclusionModal from "../../../components/BirthInclusionModal";
import { BIRTH_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import { initializeBirthInclusionObject } from "../../../business-objects/globalObject";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { convertEpochToDate } from "../../../utils";
import moment from "moment";
import { formatApiParams } from "../../../utils/birthInclusionParams";
import BirthCorrectionDocUpload from "../../../components/BirthCorrectionDocUpload";

const BirthInclusionEditPage = ({ cmbNation, sex, cmbPlace, BirthCorrectionDocuments, navigationData, navigateAcknowledgement }) => {
  // let formData = {};
  let validation = {};
  let birthInclusionFormData = {};
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [toast, setToast] = useState({ show: false, message: "" });
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_BIRTH_INCLUSION", {});

  const [showModal, setShowModal] = useState(true);
  const [birthInclusionFormsObj, setbirthInclusionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState([]);
  const [selectedDob, setSelectedDob] = useState("");

  // const [value, setValue] = useState(0);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  // const [selectedBirthData, setSelectedBirthData] = useState({});
  const [selectedFieldType, setSelectedFieldType] = useState("");
  // const history = useHistory();
  const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedInclusionItem?.documentData?.[0]?.CorrectionField];

  const resetBirthInclusionData = () => {
    setParams({});
  };

  useEffect(() => {
    window.addEventListener("popstate", resetBirthInclusionData);
    return () => {
      window.removeEventListener("popstate", resetBirthInclusionData);
    };
  }, []);

  console.log(selectedInclusionItem, "items....");

  useEffect(async () => {
    if (Object.keys(params)?.length > 0) {
      let tempParams = {};
      Object.keys(params).forEach((key, index) => (tempParams[key] = { ...params[key], isDisabled: true, isFocused: false }));
      setbirthInclusionFormsObj({ ...tempParams });
    } else {
      birthInclusionFormData = await initializeBirthInclusionObject(BirthCorrectionDocuments, navigationData, sex, cmbPlace);
      await setbirthInclusionFormsObj(birthInclusionFormData);
    }
  }, [navigationData, BirthCorrectionDocuments]);

  const setBirthInclusionFilterQuery = (fieldId) => {
    let selectedBirthInclusionData = birthInclusionFormsObj[fieldId];
    setSelectedFieldType(fieldId);
    setSelectedInclusionItem(selectedBirthInclusionData);
    setShowModal(true);
  };

  console.log(fieldName, "fieldname........");

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-11">{children}</div>;
  };

  const ButtonContainer = ({ children }) => {
    return (
      <div
        className="col-md-1"
        style={{ cursor: "pointer", background: "rgba(244, 119, 56, 0.12)", borderRadius: "9999px", height: "3rem", width: "3rem" }}
      >
        {children}
      </div>
    );
  };

  const checkLocation =
    window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
  const isNocLocation = window.location.href.includes("employee/noc");
  const isBPALocation = window.location.href.includes("employee/obps");

  const getTableStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { position: "relative", marginTop: "19px" };
    } else if (checkLocation) {
      return { position: "relative", marginTop: "19px" };
    } else {
      return {};
    }
  };

  const getMainDivStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px"};
    } else if (checkLocation) {
      return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px"};
    } else {
      return {marginRight:"20px"};
    }
  };

  const onUploadDocSubmit = ({ fileData, documentCondition }) => {
    let tempObj = { ...birthInclusionFormsObj };
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
        Documents: fileData,
        documentCondition,
        selectedDocType: selectedFieldType,
        isEditable: true,
        isFocused: true,
        isDisabled: false,
      },
    };

    setbirthInclusionFormsObj(tempObj);
    setShowModal(false);
  };

  const mutation = Digit.Hooks.cr.useBirthCorrectionAction(tenantId);

  const _hideModal = () => {
    setShowModal(false);
  };

  const onDobChange = (value) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_DOB } = tempObj;
    tempObj = { ...tempObj, CHILD_DOB: { ...CHILD_DOB, curValue: value, isFocused: false } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onSubmitBirthInclusion = () => {
    if (!birthInclusionFormsObj?.CHILD_SEX?.curValue && birthInclusionFormsObj?.CHILD_SEX?.isEditable) {
      setToast({ show: true, message: t("CR_INVALID_GENDER") });
      return false;
    }
    setToast({ show: false, message: "" });
    const formattedResp = formatApiParams(birthInclusionFormsObj, navigationData);
    if (formattedResp?.CorrectionDetails?.[0]?.CorrectionField?.length > 0) {
      setParams(birthInclusionFormsObj);
      // mutation.mutate(formattedResp,{ onSuccess: onDocUploadSuccess });
      navigateAcknowledgement({ birthInclusionFormsObj: formattedResp, navigationData });
    } else {
      alert(t("CR_EDIT_ATLEAST"));
    }
  };

  const formatDob = (date) => {
    // return moment(date).format("DD/MM/YYYY");
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    // return date;
  };

  const onGenderChange = (genderDetails) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_SEX } = tempObj;
    tempObj = { ...tempObj, CHILD_SEX: { ...CHILD_SEX, curValue: genderDetails } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onAdharChange = (e) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_AADHAAR } = tempObj;
    tempObj = { ...tempObj, CHILD_AADHAAR: { ...CHILD_AADHAAR, curValue: e.target.value, isFocused: false } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChangeMotherDetails = (e, fieldType) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { MOTHER_DETAILS } = tempObj;
    let { curValue } = MOTHER_DETAILS;
    tempObj = { ...tempObj, MOTHER_DETAILS: { ...MOTHER_DETAILS, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChangeFatherDetails = (e, fieldType) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { FATHER_DETAILS } = tempObj;
    let { curValue } = FATHER_DETAILS;
    tempObj = { ...tempObj, FATHER_DETAILS: { ...FATHER_DETAILS, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChildNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_NAME } = tempObj;
    let { curValue } = CHILD_NAME;
    tempObj = { ...tempObj, CHILD_NAME: { ...CHILD_NAME, curValue: { ...curValue, [fieldType]: e.target.value } } };
    // birthInclusionFormsObj.CHILD_NAME = { ...CHILD_NAME, curValue: { ...curValue, [fieldType]: e.target.value } } ;
    setbirthInclusionFormsObj(tempObj);
  };

  const onPresentAddressChange = (e, fieldType) => {
    let tempObj = { ...birthInclusionFormsObj };
    let { PRESENT_ADDRESS } = tempObj;
    let { curValue } = PRESENT_ADDRESS;
    tempObj = { ...tempObj, PRESENT_ADDRESS: { ...PRESENT_ADDRESS, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setbirthInclusionFormsObj(tempObj);
  };

  const checkLangRequired = (columnName, fieldName, lang = "Ml") => {
    const langKeys = ["En", "Ml"];
    const reverseLangkeys = lang === "Ml" ? langKeys : langKeys.reverse();
    let enKey = fieldName?.replace(lang, reverseLangkeys[0]);
    if (birthInclusionFormsObj?.[columnName]?.isEditable && birthInclusionFormsObj?.[columnName]?.curValue?.[enKey]?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern) && e.code === "Space") {
      e.preventDefault();
    }
  }

  function onChangeMalayalam(e, columnName, fieldType) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      let tempObj = { ...birthInclusionFormsObj };
      let { curValue } = tempObj[columnName];
      tempObj = { ...tempObj, columnName: { ...columnName, curValue: { ...curValue, [fieldType]: "" } } };
      setbirthInclusionFormsObj(tempObj);
    }
  }

  if (Object.keys(birthInclusionFormsObj)?.length > 0) {
    const config = { texts: { submitBarLabel: "Next" } };
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="col-md-8" style={{ marginTop: "0.6rem", width: "100%" }}>
            {/* <FormStep onSelect={onSubmitBirthInclusion} config={config}> */}
            {/* <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div> */}
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_APPLICANT_&_CHILD_BASIC_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-5">
                          <CardLabel style={{ width: "100%" }}>{t("CR_AADHAR")}</CardLabel>
                          <TextInput
                            t={t}
                            disabled={birthInclusionFormsObj?.CHILD_AADHAAR?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.CHILD_AADHAAR?.isFocused}
                            max="12"
                            optionKey="i18nKey"
                            name="AadharNumber"
                            defaultValue={birthInclusionFormsObj?.CHILD_AADHAAR?.curValue}
                            onBlur={onAdharChange}
                            placeholder={`${t("CR_AADHAR")}`}
                            inputProps={{
                              maxLength: 12,
                            }}
                            // ValidationRequired = {true}
                            {...(validation = {
                              pattern: "^[0-9]{12}$",
                              type: "text",
                              isRequired: birthInclusionFormsObj?.CHILD_AADHAAR?.isEditable,
                              title: t("CS_COMMON_INVALID_AADHAR_NO"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                      {birthInclusionFormsObj?.CHILD_AADHAAR?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_AADHAAR"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="firstNameEn"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.firstNameEn}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            z
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onBlur={(e) => onChildNameChange(e, "firstNameEn")}
                            placeholder={`${t("CR_FIRST_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`' ]*$",
                              type: "text",
                              isRequired: birthInclusionFormsObj?.CHILD_NAME?.isEditable,
                              title: t("CR_INVALID_FIRST_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="middleNameEn"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.middleNameEn}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onBlur={(e) => onChildNameChange(e, "middleNameEn")}
                            placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("CHILD_NAME", "middleNameEn", "En"),
                              title: t("CR_INVALID_MIDDLE_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="lastNameEn"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.lastNameEn}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onBlur={(e) => onChildNameChange(e, "lastNameEn")}
                            placeholder={`${t("CR_LAST_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("CHILD_NAME", "lastNameEn", "En"),
                              title: t("CR_INVALID_LAST_NAME_EN"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>

                      {birthInclusionFormsObj?.CHILD_NAME?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_NAME"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="firstNameMl"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.firstNameMl}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "CHILD_NAME", "firstNameMl")}
                            onBlur={(e) => onChildNameChange(e, "firstNameMl")}
                            placeholder={`${t("CR_FIRST_NAME_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                              type: "text",
                              isRequired: birthInclusionFormsObj?.CHILD_NAME?.isEditable,
                              title: t("CR_INVALID_FIRST_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="middleNameMl"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.middleNameMl}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "CHILD_NAME", "middleNameMl")}
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onBlur={(e) => onChildNameChange(e, "middleNameMl")}
                            placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                              type: "text",
                              isRequired: checkLangRequired("CHILD_NAME", "middleNameMl"),
                              title: t("CR_INVALID_MIDDLE_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="lastNameMl"
                            defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.lastNameMl}
                            disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "CHILD_NAME", "lastNameMl")}
                            // autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                            onBlur={(e) => onChildNameChange(e, "lastNameMl")}
                            placeholder={`${t("CR_LAST_NAME_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                              type: "text",
                              isRequired: checkLangRequired("CHILD_NAME", "lastNameMl"),
                              title: t("CR_INVALID_LAST_NAME_ML"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                      <div style={{ marginTop: "1.5rem" }}></div>
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <div className="col-md-11">
                        <div className="col-md-5">
                          <CardLabel style={{ width: "100%" }}>{t("CR_DATE_OF_BIRTH_TIME")}</CardLabel>
                          <DatePicker
                            disabled={birthInclusionFormsObj?.CHILD_DOB?.isDisabled}
                            autofocus={birthInclusionFormsObj?.CHILD_DOB?.isFocused}
                            date={birthInclusionFormsObj?.CHILD_DOB?.curValue}
                            max={convertEpochToDate(new Date())}
                            min={convertEpochToDate("1900-01-01")}
                            onChange={onDobChange}
                            formattingFn={formatDob}
                            inputFormat="DD/MM/YYYY"
                            placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                            {...(validation = {
                              ValidationRequired: true,
                              isRequired: birthInclusionFormsObj?.CHILD_DOB?.isEditable,
                              title: t("CR_DATE_OF_BIRTH_TIME"),
                            })}
                          />
                        </div>
                      </div>
                      {birthInclusionFormsObj?.CHILD_DOB?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_DOB"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-5">
                          <CardLabel style={{ width: "100%" }}>{t("CR_GENDER")}</CardLabel>
                          <Dropdown
                            selected={birthInclusionFormsObj?.CHILD_SEX?.curValue}
                            select={onGenderChange}
                            // onBlur={props.onBlur}
                            disable={birthInclusionFormsObj?.CHILD_SEX?.isDisabled}
                            option={sex}
                            optionKey="code"
                            t={t}
                            placeholder={`${t("CR_GENDER")}`}
                            {...(validation = { title: t("DC_INVALID_GENDER"), isRequired: birthInclusionFormsObj?.CHILD_SEX?.isEditable })}
                          />
                        </div>
                      </FieldComponentContainer>
                      {birthInclusionFormsObj?.CHILD_SEX?.isDisabled && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_SEX"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                  </StatusTable>
                }
              />
            </div>
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_BIRTH_PLACE_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-6">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="HouseNameEn"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "houseNameEn")}
                            placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "houseNameEn", "En"),
                              title: t("CR_INVALID_HOUSE_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="LocalityEn"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "localityEn")}
                            placeholder={`${t("CR_LOCALITY_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "localityEn", "En"),
                              title: t("CR_INVALID_LOCALITY_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="Street"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "streetEn")}
                            placeholder={`${t("CR_STREET_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "streetEn", "En"),
                              title: t("CR_INVALID_STREET_NAME_EN"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                      {birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["PRESENT_ADDRESS"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-6">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="HouseNameMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "houseNameMl")}
                            onBlur={(e) => onPresentAddressChange(e, "houseNameMl")}
                            placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "houseNameMl"),
                              title: t("CR_INVALID_HOUSE_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="LocalityMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "localityMl")}
                            onBlur={(e) => onPresentAddressChange(e, "localityMl")}
                            placeholder={`${t("CR_LOCALITY_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "localityMl"),
                              title: t("CR_INVALID_LOCALITY_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="StreetMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "streetMl")}
                            onBlur={(e) => onPresentAddressChange(e, "streetMl")}
                            placeholder={`${t("CR_STREET_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "streetMl"),
                              title: t("CR_INVALID_STREET_NAME_ML"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                    </FormFieldContainer>
                  </StatusTable>
                }
              />
            </div>
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_PARENT'S_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="MotherNameEn"
                            defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherNameEn}
                            onBlur={(e) => onChangeMotherDetails(e, "motherNameEn")}
                            disabled={birthInclusionFormsObj?.MOTHER_DETAILS?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.MOTHER_DETAILS?.isFocused}
                            placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("MOTHER_DETAILS", "motherNameEn", "En"),
                              title: t("CR_INVALID_MOTHER_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="MotherNameMl"
                            defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherNameMl}
                            disabled={birthInclusionFormsObj?.MOTHER_DETAILS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "MOTHER_DETAILS", "motherNameMl")}
                            // autoFocus={birthInclusionFormsObj?.MOTHER_DETAILS?.isFocused}
                            onBlur={(e) => onChangeMotherDetails(e, "motherNameMl")}
                            placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                              type: "text",
                              isRequired: checkLangRequired("MOTHER_DETAILS", "motherNameMl"),
                              title: t("CR_INVALID_MOTHER_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{t("CR_MOTHER_AADHAR")}</CardLabel>
                          <TextInput
                            t={t}
                            max="12"
                            optionKey="i18nKey"
                            name="motherAadharNumber"
                            defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherAdhar}
                            disabled={birthInclusionFormsObj?.MOTHER_DETAILS?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.MOTHER_DETAILS?.isFocused}
                            onBlur={(e) => onChangeMotherDetails(e, "motherAdhar")}
                            placeholder={`${t("CR_AADHAR")}`}
                            {...(validation = {
                              pattern: "^[0-9]{12}$",
                              type: "text",
                              title: t("CS_COMMON_INVALID_AADHAR_NO"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>

                      {birthInclusionFormsObj?.MOTHER_DETAILS?.isDisabled && (
                        <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["MOTHER_DETAILS"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="FatherNameEn"
                            defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherNameEn}
                            disabled={birthInclusionFormsObj?.FATHER_DETAILS?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.FATHER_DETAILS?.isFocused}
                            onBlur={(e) => onChangeFatherDetails(e, "fatherNameEn")}
                            placeholder={`${t("CR_FATHER_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("FATHER_DETAILS", "fatherNameEn", "En"),
                              title: t("CR_INVALID_FATHER_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="FatherNameMl"
                            defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherNameMl}
                            disabled={birthInclusionFormsObj?.FATHER_DETAILS?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.FATHER_DETAILS?.isFocused}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "FATHER_DETAILS", "fatherNameMl")}
                            onBlur={(e) => onChangeFatherDetails(e, "fatherNameMl")}
                            // onChange={setSelectDeceasedFirstNameEn}
                            placeholder={`${t("CR_FATHER_NAME_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                              type: "text",
                              isRequired: checkLangRequired("FATHER_DETAILS", "fatherNameMl"),
                              title: t("CR_INVALID_FATHER_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{t("CR_FATHER_AADHAR")}</CardLabel>
                          <TextInput
                            t={t}
                            max="12"
                            optionKey="i18nKey"
                            name="AadharNumber"
                            defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherAdhar}
                            disabled={birthInclusionFormsObj?.FATHER_DETAILS?.isDisabled}
                            // autoFocus={birthInclusionFormsObj?.FATHER_DETAILS?.isFocused}
                            onBlur={(e) => onChangeFatherDetails(e, "fatherAdhar")}
                            // value={DeceasedAadharNumber}
                            // onChange={setSelectDeceasedAadharNumber}
                            placeholder={`${t("CR_FATHER_AADHAR")}`}
                            {...(validation = {
                              pattern: "^[0-9]{12}$",
                              type: "text",
                              title: t("CS_COMMON_INVALID_AADHAR_NO"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>

                      {birthInclusionFormsObj?.FATHER_DETAILS?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["FATHER_DETAILS"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                  </StatusTable>
                }
              />
            </div>
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_PERMANENT_ADDRESS_OF_PARENT'S")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-6">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="HouseNameEn"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "houseNameEn")}
                            placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "houseNameEn", "En"),
                              title: t("CR_INVALID_HOUSE_NAME_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="LocalityEn"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "localityEn")}
                            placeholder={`${t("CR_LOCALITY_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "localityEn", "En"),
                              title: t("CR_INVALID_LOCALITY_EN"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_EN")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="Street"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetEn}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onBlur={(e) => onPresentAddressChange(e, "streetEn")}
                            placeholder={`${t("CR_STREET_EN")}`}
                            {...(validation = {
                              pattern: "^[a-zA-Z-.`'0-9 ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "streetEn", "En"),
                              title: t("CR_INVALID_STREET_NAME_EN"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                      {birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled && (
                       <div style={{ marginTop: "1.5rem" }}>
                          <ButtonContainer>
                            <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["PRESENT_ADDRESS"])}>
                              <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                            </span>
                          </ButtonContainer>
                        </div>
                      )}
                    </FormFieldContainer>
                    <FormFieldContainer>
                      <FieldComponentContainer>
                        <div className="col-md-6">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="HouseNameMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "houseNameMl")}
                            onBlur={(e) => onPresentAddressChange(e, "houseNameMl")}
                            placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "houseNameMl"),
                              title: t("CR_INVALID_HOUSE_NAME_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="LocalityMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "localityMl")}
                            onBlur={(e) => onPresentAddressChange(e, "localityMl")}
                            placeholder={`${t("CR_LOCALITY_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "localityMl"),
                              title: t("CR_INVALID_LOCALITY_ML"),
                            })}
                          />
                        </div>
                        <div className="col-md-3">
                          <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_ML")}`}</CardLabel>
                          <TextInput
                            t={t}
                            type={"text"}
                            name="StreetMl"
                            defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetMl}
                            disabled={birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled}
                            onKeyPress={setCheckMalayalamInputField}
                            onChange={(e) => onChangeMalayalam(e, "PRESENT_ADDRESS", "streetMl")}
                            onBlur={(e) => onPresentAddressChange(e, "streetMl")}
                            placeholder={`${t("CR_STREET_ML")}`}
                            {...(validation = {
                              pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                              type: "text",
                              isRequired: checkLangRequired("PRESENT_ADDRESS", "streetMl"),
                              title: t("CR_INVALID_STREET_NAME_ML"),
                            })}
                          />
                        </div>
                      </FieldComponentContainer>
                    </FormFieldContainer>
                  </StatusTable>
                }
              />
            </div>
            <div className="buttonContainerN" style={{ padding: "2rem" }}>
              <FormBackButton>{t("CS_COMMON_BACK")}</FormBackButton>
              <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmitBirthInclusion} />
            </div>
            {/* {showModal && (
            <BirthInclusionModal
              showModal={showModal}
              selectedDocs={selectedDocs}
              selectedConfig={selectedInclusionItem}
              selectedBirthData={navigationData}
              onSubmit={onUploadDocSubmit}
              hideModal={_hideModal}
              selectedDocData={selectedDocData}
            />
          )} */}
            {/* </FormStep> */}
          </div>
          {/* <BirthCorrectionDocUpload
               selectedConfig={selectedInclusionItem}
                /> */}

          <div
            className="col-md-4"
            style={{ backgroundColor: "#EDF2FA", borderRadius: "12px", marginTop: "0.5rem", height: "90vh", overflowY: "scroll" }}
          >
            {selectedInclusionItem?.documentData?.[0] ? (
              <BirthCorrectionDocUpload
                showModal={showModal}
                selectedConfig={selectedInclusionItem}
                onSubmit={onUploadDocSubmit}
                selectedDocs={selectedDocs}
                hideModal={_hideModal}
                selectedDocData={selectedDocData}
              />
            ) : (
              <div style={{ width: "440px", height: "100vh" }}>
                <p style={{ marginTop: "10px",color: "#00377B", fontWeight: "700", fontSize: "20px" }}>Certificate Preview</p>
                <img style={{ position: "absolute", right: "0px", left: "0px", top: "50px", borderRadius: "10px", height: "90vh" }} src="https://source.unsplash.com/user/c_v_r/1600×900" alt="" />
              </div>
            )}
          </div>
        </div>
        {toast.show && <Toast error={toast.show} label={toast.message} onClose={() => setToast(false)} />}
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
};
export default BirthInclusionEditPage;
