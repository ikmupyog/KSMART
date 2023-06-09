import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  EditButton,
  PopUp,
  UploadFile,
  SubmitBar,
  EditIcon,
  StatusTable,
  RefreshIcon,
  Accordion,
  FormBackButton,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import FormFieldContainer from "../../../components/FormFieldContainer";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import { initializeMarriageCorrectionObject } from "../../../business-objects/globalObject";
import { useForm } from "react-hook-form";
import { convertEpochToDate } from "../../../utils";
// import MarriageAddressPage from "../MarriageAddressPage";
// import MarriageCorrectionModal from "../../../components/MarriageCorrectionModal";
import { formatApiParams } from "../../../utils/marriageCorrectionParams";
import MarriageCorrectionDocUpload from "../../../components/MarriageCorrectionDocUpload";
import CorrectionAddressDetails from "../../../components/CorrectionAddressDetails";

const MarriageCorrectionEditPage = ({
  navigationData,
  cmbPlace,
  cmbWardNoFinal,
  cmbPlaceName,
  onSubmitAcknowledgement,
  marriageCorrectionDocuments,
}) => {
  const { t } = useTranslation();
  const types = [t("CR_HUSBAND_DETAILS"), t("CR_WIFE_DETAILS")];
  let formData = {};
  let validation = {};
  const [showModal, setShowModal] = useState(true);
  // const [marriagePlaceName, setMarriagePlaceName] = useState();
  let marriageCorrectionFormData = [];
  const cmbPlaceNameReligious = cmbPlaceName?.filter((placeId) => placeId.placeTpe === "RELIGIOUS_INSTITUTION");
  const cmbPlaceNameMandapam = cmbPlaceName?.filter((placeId) => placeId.placeTpe === "MANDAPAM_HALL_AND_OTHER");
  const [value, setValue1] = useState(0);
  const [active, setActive] = useState(types[0]);
  const [marriageCorrectionFormsObj, setMarriageCorrectionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState("");
  // const [marriageWardCode, setmarriageWardCode] = useState(
  //   formData?.MarriageDetails?.marriageWardCode
  //     ? formData?.MarriageDetails?.marriageWardCode
  //     : marriageCorrectionFormsObj?.marriageWardCode
  //     ? cmbWardNoFinal.filter((cmbWardNoFinal) => cmbWardNoFinal.code === marriageCorrectionFormsObj?.marriageWardCode[0])
  //     : ""
  // );

  const [selectedCorrectionItem, setSelectedCorrectionItem] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState([]);
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [marriagePlace, setMarriagePlace] = useState(
    formData?.InformationDeath?.marriagePlace?.code
      ? formData?.InformationDeath?.marriagePlace
      : formData?.InformationDeath?.marriagePlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.marriagePlace)[0]
      : ""
  );

  const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
    formData?.MarriageDetails?.marriagePlacenameEn ? formData?.MarriageDetails?.marriagePlacenameEn : ""
  );
  const [marriagePlacenameMl, setmarriagePlacenameMl] = useState(
    formData?.MarriageDetails?.marriagePlacenameMl ? formData?.MarriageDetails?.marriagePlacenameMl : ""
  );
  // const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
  //   formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  // );
  const [marriageLocalityEn, setmarriageLocalityEn] = useState(
    formData?.MarriageDetails?.marriageLocalityEn ? formData?.MarriageDetails?.marriageLocalityEn : ""
  );
  const [marriageLocalityMl, setmarriageLocalityMl] = useState(
    formData?.MarriageDetails?.marriageLocalityMl ? formData?.MarriageDetails?.marriageLocalityMl : ""
  );
  const [marriageStreetEn, setmarriageStreetEn] = useState(
    formData?.MarriageDetails?.marriageStreetEn ? formData?.MarriageDetails?.marriageStreetEn : ""
  );
  const [marriageStreetMl, setmarriageStreetMl] = useState(
    formData?.MarriageDetails?.marriageStreetMl ? formData?.MarriageDetails?.marriageStreetMl : ""
  );
  const [marriageLandmark, setmarriageLandmark] = useState(
    formData?.MarriageDetails?.marriageLandmark ? formData?.MarriageDetails?.marriageLandmark : ""
  );

  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_MARRIAGE_CORRECTION", {});
  const setMarriageCorrectionFilterQuery = (fieldId) => {
    let birthInclusionData = marriageCorrectionFormsObj[fieldId];
    setSelectedFieldType(fieldId);
    setSelectedCorrectionItem(birthInclusionData);
    setShowModal(true);
  };

  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = (props) => {
    return <div className="col-md-11">{props.children}</div>;
  };

  const ButtonContainer = (props) => {
    return (
      <div className="col-md-1" style={{ cursor: "pointer", background: "#00B9F2", borderRadius: "12px", height: "35px", width: "35px" }}>
        {props.children}
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
      return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px" };
    } else if (checkLocation) {
      return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px" };
    } else {
      return { marginRight: "20px" };
    }
  };

  const onDOMChange = (value) => {
    let tempObj = { ...marriageCorrectionFormsObj };
    let { DOM } = tempObj;
    tempObj = { ...tempObj, DOM: { ...DOM, curValue: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const formatDom = (date) => {
    return date;
  };

  // const onWardChange = (wardDetails) => {
  //   let tempObj = { ...marriageCorrectionFormsObj };
  //   let { PLACE_OF_MARRIAGE } = tempObj;
  //   tempObj = { ...tempObj, PLACE_OF_MARRIAGE: { ...PLACE_OF_MARRIAGE, curValue: wardDetails } };
  //   setMarriageCorrectionFormsObj(tempObj);
  // };

  // const onPlaceTypeChange = (placeTypeDetails) => {
  //   let tempObj = { ...marriageCorrectionFormsObj };
  //   let { MARRIAGE_PLACE_TYPE } = tempObj;
  //   tempObj = { ...tempObj, MARRIAGE_PLACE_TYPE: { ...MARRIAGE_PLACE_TYPE, curValue: placeTypeDetails } };
  //   setMarriageCorrectionFormsObj(tempObj);
  // };

  // const onPlaceNameChange = (placeNameDetails) => {
  //   let tempObj = { ...marriageCorrectionFormsObj };
  //   let { MARRIAGE_PLACE_NAME } = tempObj;
  //   tempObj = { ...tempObj, MARRIAGE_PLACE_NAME: { ...MARRIAGE_PLACE_NAME, curValue: placeNameDetails } };
  //   setMarriageCorrectionFormsObj(tempObj);
  // };

  const onGroomDOBChange = (value) => {
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_AGE } = tempObj;
    tempObj = {
      ...tempObj,
      GROOM_AGE: {
        ...GROOM_AGE,
        curValue: { dob: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"), age: value && moment().diff(moment(value), "years") },
      },
    };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideDOBChange = (value) => {
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_AGE } = tempObj;
    tempObj = {
      ...tempObj,
      BRIDE_AGE: {
        ...BRIDE_AGE,
        curValue: { dob: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY"), age: value && moment().diff(moment(value), "years") },
      },
    };
    setMarriageCorrectionFormsObj(tempObj);
  };
  const formatDob = (date) => {
    return date;
  };

  const onHusbandAdharChange = (e) => {
    let tempObj = { ...marriageCorrectionFormsObj };
    let { CHILD_AADHAAR } = tempObj;
    tempObj = { ...tempObj, CHILD_AADHAAR: { ...CHILD_AADHAAR, curValue: e.target.value, isFocused: false } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onWifeAdharChange = (e) => {
    let tempObj = { ...marriageCorrectionFormsObj };
    let { CHILD_AADHAAR } = tempObj;
    tempObj = { ...tempObj, CHILD_AADHAAR: { ...CHILD_AADHAAR, curValue: e.target.value, isFocused: false } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onGroomNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_NAME } = tempObj;
    let { curValue } = GROOM_NAME;
    tempObj = { ...tempObj, GROOM_NAME: { ...GROOM_NAME, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onGroomMotherNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_MOTHER } = tempObj;
    let { curValue } = GROOM_MOTHER;
    tempObj = { ...tempObj, GROOM_MOTHER: { ...GROOM_MOTHER, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onGroomFatherNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_FATHER } = tempObj;
    let { curValue } = GROOM_FATHER;
    tempObj = { ...tempObj, GROOM_FATHER: { ...GROOM_FATHER, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onGroomGuardianNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_GUARDIAN } = tempObj;
    let { curValue } = GROOM_GUARDIAN;
    tempObj = { ...tempObj, GROOM_GUARDIAN: { ...GROOM_GUARDIAN, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_NAME } = tempObj;
    let { curValue } = BRIDE_NAME;
    tempObj = { ...tempObj, BRIDE_NAME: { ...BRIDE_NAME, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideMotherNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_MOTHER } = tempObj;
    let { curValue } = BRIDE_MOTHER;
    tempObj = { ...tempObj, BRIDE_MOTHER: { ...BRIDE_MOTHER, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideFatherNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_FATHER } = tempObj;
    let { curValue } = BRIDE_FATHER;
    tempObj = { ...tempObj, BRIDE_FATHER: { ...BRIDE_FATHER, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideGuardianNameChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_GUARDIAN } = tempObj;
    let { curValue } = BRIDE_GUARDIAN;
    tempObj = { ...tempObj, BRIDE_GUARDIAN: { ...BRIDE_GUARDIAN, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onGroomAddressChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { GROOM_PERADD } = tempObj;
    let { curValue } = GROOM_PERADD;
    tempObj = { ...tempObj, GROOM_PERADD: { ...GROOM_PERADD, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setMarriageCorrectionFormsObj(tempObj);
  };

  const onBrideAddressChange = (e, fieldType) => {
    e.preventDefault();
    let tempObj = { ...marriageCorrectionFormsObj };
    let { BRIDE_PERADD } = tempObj;
    let { curValue } = BRIDE_PERADD;
    tempObj = { ...tempObj, BRIDE_PERADD: { ...BRIDE_PERADD, curValue: { ...curValue, [fieldType]: e.target.value }, isFocused: false } };
    setMarriageCorrectionFormsObj(tempObj);
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
      let tempObj = { ...marriageCorrectionFormsObj };
      let { curValue } = tempObj[columnName];
      tempObj = { ...tempObj, columnName: { ...columnName, curValue: { ...curValue, [fieldType]: "" }, isFocused: false } };
      setMarriageCorrectionFormsObj(tempObj);
    }
  }

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
      Object.keys(params).forEach((key, index) => (tempParams[key] = { ...params[key], isDisable: true, isFocused: false }));
      setMarriageCorrectionFormsObj({ ...tempParams });
    } else {
      marriageCorrectionFormData = await initializeMarriageCorrectionObject(marriageCorrectionDocuments, navigationData);
      await setMarriageCorrectionFormsObj(marriageCorrectionFormData);
    }
  }, [navigationData, marriageCorrectionDocuments]);

  useEffect(() => {
    if (marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue) {
      setMarriagePlace(marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue);
    }
  }, [marriageCorrectionFormsObj]);

  const onUploadDocSubmit = async ({ fileData, documentCondition }) => {
    // if (tempFieldType?.documentData?.Documents?.length === fileData?.length) {
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
    selectedDocs;
    let tempObj = { ...marriageCorrectionFormsObj };
    let tempFieldType = tempObj[selectedFieldType];
    tempObj = {
      ...tempObj,
      [selectedFieldType]: {
        ...tempFieldType,
        Documents: fileData,
        documentCondition,
        selectedDocType: selectedFieldType,
        isEditable: true,
        isFocused: true,
        isDisable: false,
      },
    };
    setMarriageCorrectionFormsObj(tempObj);
    setShowModal(false);
  };

  const onDocUploadSuccess = (data) => {
    onSubmitAcknowledgement(data);
  };
  const onSubmitMarriageCorrection = () => {
    const formattedResp = formatApiParams(marriageCorrectionFormsObj, navigationData);
    if (formattedResp?.CorrectionDetails?.[0]?.CorrectionField.length > 0) {
      setParams(marriageCorrectionFormsObj);
      onSubmitAcknowledgement({ marriageCorrectionFormsObj: formattedResp, navigationData });
    } else {
      alert(t("CR_EDIT_ATLEAST"));
    }
  };

  const setMarriageCorrecvtionFilterQuery = (fieldId) => {
    let selectedMarriageCorrectionData = birthInclusionFormsObj[fieldId];
    setSelectedCorrectionItem(selectedMarriageCorrectionData);
    setShowModal(true);
  };

  // function setSelectmarriageWardCode(value) {
  //   // setTenantWard(value.code);
  //   setmarriageWardCode(value);
  // }

  function setMarriagePlaceName(place) {
    if (place.code === "RELIGIOUS_INSTITUTION") {
      return cmbPlaceNameReligious;
    } else if (place.code === "MANDAPAM_HALL_AND_OTHER") {
      return cmbPlaceNameMandapam;
    } else if (place.type === "SUB_REGISTRAR_OFFICE") {
      return cmbSubRegistarOffice;
    }
  }

  const getTabStyle = (selectedType) => {
    if (active === selectedType) {
      return {
        margin: "1.5rem",
        padding: "1rem 1rem 1rem 1rem",
        cursor: "pointer",
        color: "#00377B",
        fontWeight: "bold",
        borderBottom: "2px solid black",
      };
    } else {
      return { margin: "1.5rem", padding: "1rem 1rem 1rem 1rem", color: "black", cursor: "pointer", fontWeight: "bold" };
    }
  };

  const checkLangRequired = (columnName, fieldName, lang = "Ml") => {
    const langKeys = ["En", "Ml"];
    const reverseLangkeys = lang === "Ml" ? langKeys : langKeys.reverse();
    let enKey = fieldName?.replace(lang, reverseLangkeys[0]);
    if (marriageCorrectionFormsObj?.[columnName]?.isEditable && marriageCorrectionFormsObj?.[columnName]?.curValue?.[enKey]?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log("marriageCorrectionFormsObj ===", marriageCorrectionFormsObj);

  if (Object.keys(marriageCorrectionFormsObj)?.length > 0) {
    // const config = { texts: { submitBarLabel: "Next" } };
    return (
      <React.Fragment>
        <div className="col-md-12">
          <div className="col-md-8" style={{ marginTop: "0.6rem", width: "100%" }}>
            {/* <FormStep config={config} onSelect={onSubmitMarriageCorrection}> */}
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_DATE_OF_MARRIAGE")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    {/* <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div> */}
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}

                    <FormFieldContainer>
                      <div className="col-md-11">
                        <div className="col-md-4">
                          <CardLabel style={{ width: "100%" }}>{t("CR_DATE_OF_MARRIAGE")}</CardLabel>
                          <DatePicker
                            name="marriageDOM"
                            disabled={marriageCorrectionFormsObj?.DOM?.isDisable}
                            autofocus={marriageCorrectionFormsObj?.DOM?.isFocused}
                            date={marriageCorrectionFormsObj?.DOM?.curValue}
                            max={convertEpochToDate(new Date())}
                            min={convertEpochToDate("1900-01-01")}
                            onChange={onDOMChange}
                            formattingFn={formatDom}
                            // disable={isDisableEdit}
                            //  inputFormat="DD-MM-YYYY"
                            placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
                            // {...(validation = { isRequired: true, title: t("CR_DATE_OF_MARRIAGE") })}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: "1.5rem" }}>
                        {marriageCorrectionFormsObj?.DOM?.isDisable && (
                          <div>
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.DOM)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                            {/* <ButtonContainer>
              <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.DOM)}>
                <RefreshIcon />
              </span>
            </ButtonContainer> */}
                          </div>
                        )}
                      </div>
                    </FormFieldContainer>
                  </StatusTable>
                }
              />
            </div>

            {/* <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("CS_COMMON_WARD")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="namecmb"
                  isMandatory={true}
                  placeholder={t("CS_COMMON_WARD")}
                  option={cmbWardNoFinal}
                  selected={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue}
                  disabled={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.isDisable}
                  autofocus={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.isFocused}
                  select={onWardChange}
                  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.PLACE_OF_MARRIAGE)}>
                  <EditIcon style={{ position: "absolute", top: "0.8rem"}} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            </div>
          </FormFieldContainer> */}
            {/* <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("CR_MARRIAGE_PLACE_TYPE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlace}
                  selected={marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue}
                  disabled={marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.isDisable}
                  select={onPlaceTypeChange}
                  placeholder={`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                />
              </div>
              {(marriagePlace.code === "RELIGIOUS_INSTITUTION" ||
                marriagePlace?.code === "MANDAPAM_HALL_AND_OTHER" ||
                marriagePlace?.code === "SUB_REGISTRAR_OFFICE") && (
                <div className="col-md-5">
                  <CardLabel>
                    {t("CS_NAME_OF_PLACE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={true}
                    placeholder={t("CS_NAME_OF_PLACE'")}
                    option={setMarriagePlaceName(marriagePlace)}
                    selected={marriageCorrectionFormsObj?.MARRIAGE_PLACE_NAME?.curValue}
                    disabled={marriageCorrectionFormsObj?.MARRIAGE_PLACE_NAME?.isDisable}
                    select={onPlaceNameChange}
                    {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                  />
                </div>
              )}
              {marriagePlace?.code === "HOUSE" && (
                <HouseMarriageRegistration
                  marriagePlacenameEn={marriagePlacenameEn}
                  setmarriagePlacenameEn={setmarriagePlacenameEn}
                  marriagePlacenameMl={marriagePlacenameMl}
                  setmarriagePlacenameMl={setmarriagePlacenameMl}
                  marriageLocalityEn={marriageLocalityEn}
                  setmarriageLocalityEn={setmarriageLocalityEn}
                  marriageLocalityMl={marriageLocalityMl}
                  setmarriageLocalityMl={setmarriageLocalityMl}
                  marriageStreetEn={marriageStreetEn}
                  setmarriageStreetEn={setmarriageStreetEn}
                  marriageStreetMl={marriageStreetMl}
                  setmarriageStreetMl={setmarriageStreetMl}
                  marriageLandmark={marriageLandmark}
                  setmarriageLandmark={setmarriageLandmark}
                />
              )}
              {(marriagePlace.code === "PUBLIC_PLACE" || marriagePlace.code === "PRIVATE_PLACE") && (
                <MarriagePublicPlace
                  marriagePlacenameEn={marriagePlacenameEn}
                  setmarriagePlacenameEn={setmarriagePlacenameEn}
                  marriagePlacenameMl={marriagePlacenameMl}
                  setmarriagePlacenameMl={setmarriagePlacenameMl}
                  marriageLocalityEn={marriageLocalityEn}
                  setmarriageLocalityEn={setmarriageLocalityEn}
                  marriageLocalityMl={marriageLocalityMl}
                  setmarriageLocalityMl={setmarriageLocalityMl}
                  marriageStreetEn={marriageStreetEn}
                  setmarriageStreetEn={setmarriageStreetEn}
                  marriageStreetMl={marriageStreetMl}
                  setmarriageStreetMl={setmarriageStreetMl}
                  marriageLandmark={marriageLandmark}
                  setmarriageLandmark={setmarriageLandmark}
                />
              )}
              {marriagePlace?.code === "OTHER" && <div></div>}
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
            <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ position: "absolute", top: "0.8rem"}} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            </div>
          </FormFieldContainer> */}
            {/* <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARTNER_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div> */}
            {/* <FormFieldContainer> */}
            {/* <div style={{ display: "flex" }}>
                {types.map((type, index) => (
                  <div style={getTabStyle(types[index])} key={type} active={active === type} onClick={() => setActive(type)}>
                    {type}
                  </div>
                ))}
              </div>
              <p /> */}
            {/* {active === types[0] ? ( */}
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_MARRIAGE_PLACE_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <div>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-6">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomHouseNameEn"
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.houseNameEn}
                              onBlur={(e) => onGroomAddressChange(e, "houseNameEn")}
                              placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "houseNameEn", "En"),
                                title: t("CR_INVALID_HOUSE_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-3">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomLocalityEn"
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.localityNameEn}
                              onBlur={(e) => onGroomAddressChange(e, "localityNameEn")}
                              placeholder={`${t("CR_LOCALITY_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "localityNameEn", "En"),
                                title: t("CR_INVALID_LOCALITY_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-3">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomStreetEn"
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.streetNameEn}
                              onBlur={(e) => onGroomAddressChange(e, "streetNameEn")}
                              placeholder={`${t("CR_STREET_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "streetNameEn", "En"),
                                title: t("CR_INVALID_STREET_NAME_EN"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["PLACE_OF_MARRIAGE"])}>
                                <EditIcon style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }} />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-6">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomHouseNameMl"
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.houseNameMl}
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "PLACE_OF_MARRIAGE", "houseNameMl")}
                              onBlur={(e) => onGroomAddressChange(e, "houseNameMl")}
                              placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "houseNameMl"),
                                title: t("CR_INVALID_HOUSE_NAME_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-3">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomLocalityMl"
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.localityNameMl}
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "PLACE_OF_MARRIAGE", "localityNameMl")}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              onBlur={(e) => onGroomAddressChange(e, "localityNameMl")}
                              placeholder={`${t("CR_LOCALITY_MAL")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "localityNameMl"),
                                title: t("CR_INVALID_LOCALITY_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-3">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_MAL")}`}</CardLabel>
                            <TextInput
                              t={t}
                              type={"text"}
                              name="groomStreetMl"
                              defaultValue={marriageCorrectionFormsObj?.PLACE_OF_MARRIAGE?.curValue.streetNameMl}
                              disabled={marriageCorrectionFormsObj.PLACE_OF_MARRIAGE?.isDisable}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "PLACE_OF_MARRIAGE", "streetNameMl")}
                              // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                              onBlur={(e) => onGroomAddressChange(e, "streetNameMl")}
                              placeholder={`${t("CR_STREET_MAL")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("PLACE_OF_MARRIAGE", "streetNameMl"),
                                title: t("CR_INVALID_STREET_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                      </FormFieldContainer>
                    </div>
                  </StatusTable>
                }
              />
            </div>
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_HUSBAND_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <div>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-5">
                            <CardLabel>{t("CR_AADHAR")}</CardLabel>
                            <TextInput
                              t={t}
                              disabled={marriageCorrectionFormsObj?.CHILD_AADHAAR?.isDisabled}
                              // autoFocus={birthInclusionFormsObj?.CHILD_AADHAAR?.isFocused}
                              max="12"
                              optionKey="i18nKey"
                              name="AadharNumber"
                              defaultValue={marriageCorrectionFormsObj?.CHILD_AADHAAR?.curValue}
                              onBlur={onHusbandAdharChange}
                              placeholder={`${t("CR_AADHAR")}`}
                              inputProps={{
                                maxLength: 12,
                              }}
                              // ValidationRequired = {true}
                              {...(validation = {
                                pattern: "^[0-9]{12}$",
                                type: "text",
                                isRequired: marriageCorrectionFormsObj?.CHILD_AADHAAR?.isEditable,
                                title: t("CS_COMMON_INVALID_AADHAR_NO"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        {marriageCorrectionFormsObj?.CHILD_AADHAAR?.isDisabled && (
                          <div style={{ marginTop: "2.2rem" }}>
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["CHILD_AADHAAR"])}>
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
                              // isMandatory={false}
                              type={"text"}
                              optionKey="i18nKey"
                              name="groomFirstnameEn"
                              disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.firstNameEn}
                              onBlur={(e) => onGroomNameChange(e, "firstNameEn")}
                              placeholder={`${t("CR_FIRST_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: marriageCorrectionFormsObj?.GROOM_NAME?.isEditable,
                                title: t("CR_INVALID_FIRST_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomMiddlenameEn"
                              disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.middleNameEn}
                              onBlur={(e) => onGroomNameChange(e, "middleNameEn")}
                              placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_NAME", "middleNameEn", "En"),
                                title: t("CR_INVALID_MIDDLE_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomLastnameEn"
                              disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.lastNameEn}
                              onBlur={(e) => onGroomNameChange(e, "lastNameEn")}
                              placeholder={`${t("CR_LAST_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_NAME", "lastNameEn", "En"),
                                title: t("CR_INVALID_LAST_NAME_EN"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.GROOM_NAME?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_NAME)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomFirstNameMl"
                              disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.firstNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_NAME", "firstNameMl")}
                              onBlur={(e) => onGroomNameChange(e, "firstNameMl")}
                              placeholder={`${t("CR_FIRST_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                isRequired: marriageCorrectionFormsObj?.GROOM_NAME?.isEditable,
                                type: "text",
                                title: t("CR_INVALID_FIRST_NAME_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="GroomMiddleNameMl"
                              disabled={marriageCorrectionFormsObj.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.middleNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_NAME", "middleNameMl")}
                              onBlur={(e) => onGroomNameChange(e, "middleNameMl")}
                              placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_NAME", "middleNameMl"),
                                title: t("CR_INVALID_MIDDLE_NAME_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomLastNameMl"
                              disabled={marriageCorrectionFormsObj.GROOM_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.lastNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_NAME", "lastNameMl")}
                              onBlur={(e) => onGroomNameChange(e, "lastNameMl")}
                              placeholder={`${t("CR_LAST_NAME_MAL")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_NAME", "lastNameMl"),
                                title: t("CR_INVALID_LAST_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <div className="col-md-11">
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{t("CR_DATE_OF_BIRTH_TIME")}</CardLabel>
                            <DatePicker
                              // date={DateOfDeath}
                              // max={convertEpochToDate(new Date())}
                              name="groomDOB"
                              disabled={marriageCorrectionFormsObj.GROOM_AGE?.isDisable}
                              autofocus={marriageCorrectionFormsObj.GROOM_AGE?.isFocused}
                              date={marriageCorrectionFormsObj?.GROOM_AGE?.curValue?.dob}
                              max={moment().subtract(21, "year").format("YYYY-MM-DD")}
                              onChange={onGroomDOBChange}
                              formattingFn={formatDob}
                              {...(validation = {
                                pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                                type: "text",
                                title: t("CR_INVALID_DATE"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_AGE")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="GroomAge"
                              disabled={marriageCorrectionFormsObj.GROOM_AGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_AGE?.isFocused}
                              value={marriageCorrectionFormsObj?.GROOM_AGE?.curValue?.age}
                              // value={DeceasedFirstNameEn}
                              onChange={onGroomDOBChange}
                              placeholder={`${t("CR_AGE")}`}
                              {...(validation = {
                                pattern: "^[0-9]{2}$",
                                type: "text",
                                isRequired: marriageCorrectionFormsObj.GROOM_AGE?.isEditable,
                              })}
                            />
                          </div>
                        </div>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.GROOM_AGE?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_AGE)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomMothernameEn"
                              disabled={marriageCorrectionFormsObj.GROOM_MOTHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_MOTHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_MOTHER?.curValue?.groomMotherNameEn}
                              onBlur={(e) => onGroomMotherNameChange(e, "groomMotherNameEn")}
                              placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_MOTHER", "groomMotherNameEn", "En"),
                                title: t("CR_MOTHER_NAME_EN_ERROR"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomMothernameMl"
                              disabled={marriageCorrectionFormsObj.GROOM_MOTHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_MOTHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_MOTHER?.curValue?.groomMotherNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_MOTHER", "groomMotherNameMl")}
                              onBlur={(e) => onGroomMotherNameChange(e, "groomMotherNameMl")}
                              placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                isRequired: checkLangRequired("GROOM_MOTHER", "groomMotherNameMl"),
                                type: "text",
                                title: t("CR_MOTHER_NAME_ML_ERROR"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel>{t("CR_MOTHER_AADHAR")}</CardLabel>
                            <TextInput
                              t={t}
                              max="12"
                              optionKey="i18nKey"
                              name="motherAadharNumber"
                              defaultValue={marriageCorrectionFormsObj?.GROOM_MOTHER?.curValue?.motherAdhar}
                              disabled={marriageCorrectionFormsObj?.GROOM_MOTHER?.isDisabled}
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

                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.GROOM_MOTHER?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_MOTHER)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomFathernameEn"
                              disabled={marriageCorrectionFormsObj.GROOM_FATHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_FATHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_FATHER?.curValue?.groomFatherNameEn}
                              onBlur={(e) => onGroomFatherNameChange(e, "groomFatherNameEn")}
                              placeholder={`${t("CR_FATHER_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_FATHER", "groomFatherNameEn", "En"),
                                title: t("CR_FATHER_NAME_EN_ERROR"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomFathernameMl"
                              disabled={marriageCorrectionFormsObj.GROOM_FATHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_FATHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_FATHER?.curValue?.groomFatherNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_FATHER", "groomFatherNameMl")}
                              onBlur={(e) => onGroomFatherNameChange(e, "groomFatherNameMl")}
                              placeholder={`${t("CR_FATHER_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_FATHER", "groomFatherNameMl"),
                                title: t("CR_FATHER_NAME_ML_ERROR"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel>{t("CR_FATHER_AADHAR")}</CardLabel>
                            <TextInput
                              t={t}
                              max="12"
                              optionKey="i18nKey"
                              name="AadharNumber"
                              defaultValue={marriageCorrectionFormsObj?.GROOM_FATHER?.curValue?.fatherAdhar}
                              disabled={marriageCorrectionFormsObj?.GROOM_FATHER?.isDisabled}
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

                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.GROOM_FATHER?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_FATHER)}>
                                <EditIcon style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }} />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_GUARDIAN_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomGuardiannameEn"
                              disabled={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_GUARDIAN?.curValue?.groomGuardianNameEn}
                              onBlur={(e) => onGroomGuardianNameChange(e, "groomGuardianNameEn")}
                              placeholder={`${t("CR_GUARDIAN_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_GUARDIAN", "groomGuardianNameEn", "En"),
                                title: t("CR_GUARDIAN_NAME_EN_ERROR"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_GUARDIAN_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="groomGuardiannameMl"
                              disabled={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.GROOM_GUARDIAN?.curValue?.groomGuardianNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "GROOM_GUARDIAN", "groomGuardianNameMl")}
                              onBlur={(e) => onGroomGuardianNameChange(e, "groomGuardianNameMl")}
                              placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("GROOM_GUARDIAN", "groomGuardianNameMl"),
                                title: t("CR_GUARDIAN_NAME_ML_ERROR"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.GROOM_GUARDIAN?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_GUARDIAN)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                    </div>
                  </StatusTable>
                }
              />
            </div>
            {/* <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <h1 className="headingh1">
                          <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
                        </h1>
                      </div>
                    </div>
                  </div> */}

            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_HUSBAND_PERMANENT_ADDRESS_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    {marriageCorrectionFormsObj.GROOM_PERADD?.addressType === "insideKerala" ||
                    marriageCorrectionFormsObj.GROOM_PERADD?.addressType === "outsideKerala" ? (
                      <div>
                        <FormFieldContainer>
                          <FieldComponentContainer>
                            <div className="col-md-6">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomHouseNameEn"
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameEn}
                                onBlur={(e) => onGroomAddressChange(e, "houseNameEn")}
                                placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                                {...(validation = {
                                  pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "houseNameEn", "En"),
                                  title: t("CR_INVALID_HOUSE_NAME_EN"),
                                })}
                              />
                            </div>
                            <div className="col-md-3">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomLocalityEn"
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameEn}
                                onBlur={(e) => onGroomAddressChange(e, "localityNameEn")}
                                placeholder={`${t("CR_LOCALITY_EN")}`}
                                {...(validation = {
                                  pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "localityNameEn", "En"),
                                  title: t("CR_INVALID_LOCALITY_EN"),
                                })}
                              />
                            </div>
                            <div className="col-md-3">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_EN")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomStreetEn"
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.streetNameEn}
                                onBlur={(e) => onGroomAddressChange(e, "streetNameEn")}
                                placeholder={`${t("CR_STREET_EN")}`}
                                {...(validation = {
                                  pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "streetNameEn", "En"),
                                  title: t("CR_INVALID_STREET_NAME_EN"),
                                })}
                              />
                            </div>
                          </FieldComponentContainer>
                          <div style={{ marginTop: "1.5rem" }}>
                            {marriageCorrectionFormsObj?.GROOM_PERADD?.isDisable && (
                              <ButtonContainer>
                                <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["GROOM_PERADD"])}>
                                  <EditIcon style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }} />
                                </span>
                              </ButtonContainer>
                            )}
                          </div>
                        </FormFieldContainer>
                        <FormFieldContainer>
                          <FieldComponentContainer>
                            <div className="col-md-6">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomHouseNameMl"
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameMl}
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={(e) => onChangeMalayalam(e, "GROOM_PERADD", "houseNameMl")}
                                onBlur={(e) => onGroomAddressChange(e, "houseNameMl")}
                                placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                                {...(validation = {
                                  pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "houseNameMl"),
                                  title: t("CR_INVALID_HOUSE_NAME_ML"),
                                })}
                              />
                            </div>
                            <div className="col-md-3">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomLocalityMl"
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameMl}
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={(e) => onChangeMalayalam(e, "GROOM_PERADD", "localityNameMl")}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                onBlur={(e) => onGroomAddressChange(e, "localityNameMl")}
                                placeholder={`${t("CR_LOCALITY_MAL")}`}
                                {...(validation = {
                                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "localityNameMl"),
                                  title: t("CR_INVALID_LOCALITY_ML"),
                                })}
                              />
                            </div>
                            <div className="col-md-3">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_STREET_MAL")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomStreetMl"
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.streetNameMl}
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={(e) => onChangeMalayalam(e, "GROOM_PERADD", "streetNameMl")}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                onBlur={(e) => onGroomAddressChange(e, "streetNameMl")}
                                placeholder={`${t("CR_STREET_MAL")}`}
                                {...(validation = {
                                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "streetNameMl"),
                                  title: t("CR_INVALID_STREET_NAME_ML"),
                                })}
                              />
                            </div>
                          </FieldComponentContainer>
                        </FormFieldContainer>
                      </div>
                    ) : (
                      <div>
                        <FormFieldContainer>
                          <FieldComponentContainer>
                            <div className="col-md-4">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomAddressLine1En"
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.addressLine1En}
                                onBlur={(e) => onGroomAddressChange(e, "addressLine1En")}
                                placeholder={`${t("CR_ADDRES_LINE_ONE_EN")}`}
                                {...(validation = {
                                  pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "addressLine1En", "En"),
                                  title: t("CR_ADDRES_LINE_ONE_EN"),
                                })}
                              />
                            </div>
                            <div className="col-md-4">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomAddressLine2En"
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.addressLine2En}
                                onBlur={(e) => onGroomAddressChange(e, "addressLine2En")}
                                placeholder={`${t("CR_ADDRES_LINE_TWO_EN")}`}
                                {...(validation = {
                                  pattern: "^[a-zA-Z-.`'0-9 ]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "addressLine2En", "En"),
                                  title: t("CR_ADDRES_LINE_TWO_EN"),
                                })}
                              />
                            </div>
                          </FieldComponentContainer>
                          <div style={{ marginTop: "1.5rem" }}>
                            {marriageCorrectionFormsObj?.GROOM_PERADD?.isDisable && (
                              <ButtonContainer>
                                <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["GROOM_PERADD"])}>
                                  <EditIcon style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }} />
                                </span>
                              </ButtonContainer>
                            )}
                          </div>
                        </FormFieldContainer>
                        <FormFieldContainer>
                          <FieldComponentContainer>
                            <div className="col-md-4">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomAddressLine1Ml"
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.addressLine1Ml}
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={(e) => onChangeMalayalam(e, "GROOM_PERADD", "addressLine1Ml")}
                                onBlur={(e) => onGroomAddressChange(e, "addressLine1Ml")}
                                placeholder={`${t("CR_ADDRES_LINE_ONE_ML")}`}
                                {...(validation = {
                                  pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "addressLine1Ml"),
                                  title: t("CR_ADDRES_LINE_ONE_ML"),
                                })}
                              />
                            </div>
                            <div className="col-md-4">
                              <CardLabel style={{ width: "100%" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`}</CardLabel>
                              <TextInput
                                t={t}
                                type={"text"}
                                name="groomAddressLine2Ml"
                                defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.addressLine2Ml}
                                disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                                // autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                                onKeyPress={setCheckMalayalamInputField}
                                onChange={(e) => onChangeMalayalam(e, "GROOM_PERADD", "addressLine2Ml")}
                                onBlur={(e) => onGroomAddressChange(e, "addressLine2Ml")}
                                placeholder={`${t("CR_ADDRES_LINE_TWO_ML")}`}
                                {...(validation = {
                                  pattern: "^[\u0D00-\u0D7F\u200D\u200C0-9 -]*$",
                                  type: "text",
                                  isRequired: checkLangRequired("GROOM_PERADD", "addressLine2Ml"),
                                  title: t("CR_ADDRES_LINE_TWO_ML"),
                                })}
                              />
                            </div>
                          </FieldComponentContainer>
                        </FormFieldContainer>
                      </div>
                    )}
                  </StatusTable>
                }
              />
            </div>

            {/* ) : ( */}
            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_WIFE_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <div>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-5">
                            <CardLabel>{t("CR_AADHAR")}</CardLabel>
                            <TextInput
                              t={t}
                              disabled={marriageCorrectionFormsObj?.CHILD_AADHAAR?.isDisabled}
                              // autoFocus={birthInclusionFormsObj?.CHILD_AADHAAR?.isFocused}
                              max="12"
                              optionKey="i18nKey"
                              name="AadharNumber"
                              defaultValue={marriageCorrectionFormsObj?.CHILD_AADHAAR?.curValue}
                              onBlur={onWifeAdharChange}
                              placeholder={`${t("CR_AADHAR")}`}
                              inputProps={{
                                maxLength: 12,
                              }}
                              // ValidationRequired = {true}
                              {...(validation = {
                                pattern: "^[0-9]{12}$",
                                type: "text",
                                isRequired: marriageCorrectionFormsObj?.CHILD_AADHAAR?.isEditable,
                                title: t("CS_COMMON_INVALID_AADHAR_NO"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        {marriageCorrectionFormsObj?.CHILD_AADHAAR?.isDisabled && (
                          <div style={{ marginTop: "2.2rem" }}>
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["CHILD_AADHAAR"])}>
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
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideFirstNameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameEn}
                              onBlur={(e) => onBrideNameChange(e, "firstNameEn")}
                              placeholder={`${t("CR_FIRST_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                isRequired: marriageCorrectionFormsObj.BRIDE_NAME?.isEditable,
                                type: "text",
                                title: t("CR_INVALID_FIRST_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideMiddleNameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameEn}
                              onBlur={(e) => onBrideNameChange(e, "middleNameEn")}
                              placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_NAME", "middleNameEn", "En"),
                                title: t("CR_INVALID_MIDDLE_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideLastNameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameEn}
                              onBlur={(e) => onBrideNameChange(e, "lastNameEn")}
                              placeholder={`${t("CR_LAST_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_NAME", "lastNameEn", "En"),
                                title: t("CR_INVALID_LAST_NAME_EN"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.BRIDE_NAME?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_NAME)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideFirstNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_NAME", "firstNameMl")}
                              onBlur={(e) => onBrideNameChange(e, "firstNameMl")}
                              placeholder={`${t("CR_FIRST_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                isRequired: marriageCorrectionFormsObj.BRIDE_NAME?.isEditable,
                                type: "text",
                                title: t("CR_INVALID_FIRST_NAME_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideMiddleNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_NAME", "middleNameMl")}
                              onBlur={(e) => onBrideNameChange(e, "middleNameMl")}
                              placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_NAME", "middleNameMl"),
                                title: t("CR_INVALID_MIDDLE_NAME_ML"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideLastNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_NAME", "lastNameMl")}
                              onBlur={(e) => onBrideNameChange(e, "lastNameMl")}
                              placeholder={`${t("CR_LAST_NAME_MAL")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_NAME", "lastNameMl"),
                                title: t("CR_INVALID_LAST_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <div className="col-md-11">
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{t("CR_DATE_OF_BIRTH_TIME")}</CardLabel>
                            <DatePicker
                              // date={DateOfDeath}
                              // max={convertEpochToDate(new Date())}
                              name="brideDOB"
                              disabled={marriageCorrectionFormsObj.BRIDE_AGE?.isDisable}
                              autofocus={marriageCorrectionFormsObj.BRIDE_AGE?.isFocused}
                              date={marriageCorrectionFormsObj?.BRIDE_AGE?.curValue?.dob}
                              max={moment().subtract(18, "year").format("YYYY-MM-DD")}
                              onChange={onBrideDOBChange}
                              formattingFn={formatDob}
                              {...(validation = {
                                pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                                type: "text",
                                title: t("CR_INVALID_DATE"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_AGE")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideAge"
                              disabled={marriageCorrectionFormsObj.BRIDE_AGE?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_AGE?.isFocused}
                              value={marriageCorrectionFormsObj?.BRIDE_AGE?.curValue?.age}
                              // value={DeceasedFirstNameEn}
                              onChange={onBrideDOBChange}
                              placeholder={`${t("CR_AGE")}`}
                              {...(validation = {
                                pattern: "^[0-9]{2}$",
                                type: "text",
                                isRequired: marriageCorrectionFormsObj.BRIDE_AGE?.isEditable,
                              })}
                            />
                          </div>
                        </div>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.BRIDE_AGE?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_AGE)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideMothernameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_MOTHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_MOTHER?.curValue?.brideMotherNameEn}
                              onBlur={(e) => onBrideMotherNameChange(e, "brideMotherNameEn")}
                              placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_MOTHER", "brideMotherNameEn", "En"),
                                title: t("CR_MOTHER_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideMotherNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_MOTHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_MOTHER?.curValue?.brideMotherNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_MOTHER", "brideMotherNameMl")}
                              onBlur={(e) => onBrideMotherNameChange(e, "brideMotherNameMl")}
                              placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_MOTHER", "brideMotherNameMl"),
                                title: t("CR_MOTHER_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.BRIDE_MOTHER?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_MOTHER)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideFatherNameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_FATHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_FATHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_FATHER?.curValue?.brideFatherNameEn}
                              onBlur={(e) => onBrideFatherNameChange(e, "brideFatherNameEn")}
                              placeholder={`${t("CR_FATHER_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_FATHER", "brideFatherNameEn", "En"),
                                title: t("CR_FATHER_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideFatherNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_FATHER?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_FATHER?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_FATHER?.curValue?.brideFatherNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_FATHER", "brideFatherNameMl")}
                              onBlur={(e) => onBrideFatherNameChange(e, "brideFatherNameMl")}
                              placeholder={`${t("CR_FATHER_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_FATHER", "brideFatherNameMl"),
                                title: t("CR_FATHER_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.BRIDE_FATHER?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_FATHER)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                      <FormFieldContainer>
                        <FieldComponentContainer>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_GUARDIAN_NAME_EN")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideGuardianNameEn"
                              disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.curValue?.brideGuardianNameEn}
                              onBlur={(e) => onBrideGuardianNameChange(e, "brideGuardianNameEn")}
                              placeholder={`${t("CR_GUARDIAN_NAME_EN")}`}
                              {...(validation = {
                                pattern: "^[a-zA-Z-.`' ]*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_GUARDIAN", "brideGuardianNameEn", "En"),
                                title: t("CR_GUARDIAN_NAME_EN"),
                              })}
                            />
                          </div>
                          <div className="col-md-4">
                            <CardLabel style={{ width: "100%" }}>{`${t("CR_GUARDIAN_NAME_ML")}`}</CardLabel>
                            <TextInput
                              t={t}
                              // isMandatory={false}
                              type={"text"}
                              // optionKey="i18nKey"
                              name="brideGuardianNameMl"
                              disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isDisable}
                              // autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isFocused}
                              defaultValue={marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.curValue?.brideGuardianNameMl}
                              onKeyPress={setCheckMalayalamInputField}
                              onChange={(e) => onChangeMalayalam(e, "BRIDE_GUARDIAN", "brideGuardianNameMl")}
                              onBlur={(e) => onBrideGuardianNameChange(e, "brideGuardianNameMl")}
                              placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                              {...(validation = {
                                pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                                type: "text",
                                isRequired: checkLangRequired("BRIDE_GUARDIAN", "brideGuardianNameMl"),
                                title: t("CR_GUARDIAN_NAME_ML"),
                              })}
                            />
                          </div>
                        </FieldComponentContainer>
                        <div style={{ marginTop: "1.5rem" }}>
                          {marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.isDisable && (
                            <ButtonContainer>
                              <span onClick={() => setMarriageCorrectionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_GUARDIAN)}>
                                <EditIcon
                                  style={{ position: "absolute", top: "0.6rem", right: "0.2rem", left: "0.5rem" }}
                                  selected={true}
                                  label={"Edit"}
                                />
                              </span>
                            </ButtonContainer>
                          )}
                        </div>
                      </FormFieldContainer>
                    </div>
                  </StatusTable>
                }
              />
            </div>
            {/* <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div> */}

            <div style={getMainDivStyles()}>
              <Accordion
                // expanded={index === 0 ? true : false}
                title={`${t("CR_WIFE_PERMANENT_ADDRESS_DETAILS")}`}
                style={{ margin: "10px" }}
                content={
                  <StatusTable style={getTableStyles()}>
                    <CorrectionAddressDetails
                      selectedConfig={selectedCorrectionItem}
                      marriageCorrectionFormsObj={marriageCorrectionFormsObj}
                      onBrideAddressChange={onBrideAddressChange}
                      setMarriageCorrectionFilterQuery={setMarriageCorrectionFilterQuery}
                      onChangeMalayalam={onChangeMalayalam}
                      checkLangRequired={checkLangRequired}
                    />
                  </StatusTable>
                }
              />
            </div>
            {/* )} */}
            {/* </FormFieldContainer> */}
            <div className="buttonContainerN" style={{ padding: "2rem" }}>
              <FormBackButton>{t("CS_COMMON_BACK")}</FormBackButton>
              <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmitMarriageCorrection} />
            </div>
            {/* <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmitMarriageCorrection} /> */}
            {/* <MarriageCorrectionModal
            showModal={showModal}
            selectedConfig={selectedCorrectionItem}
            onSubmit={onUploadDocSubmit}
            selectedDocs={selectedDocs}
            hideModal={_hideModal}
            selectedDocData={selectedDocData}
          /> */}
            {/* </FormStep> */}
          </div>
          <div
            className="col-md-4"
            style={{ backgroundColor: "#F5F5F5", borderRadius: "12px", marginTop: "0.5rem", height: "90vh", overflowY: "scroll" }}
          >
            {selectedCorrectionItem?.documentData?.[0] ? (
              <MarriageCorrectionDocUpload
                selectedConfig={selectedCorrectionItem}
                onSubmit={onUploadDocSubmit}
                selectedDocs={selectedDocs}
                hideModal={_hideModal}
                selectedDocData={selectedDocData}
              />
            ) : (
              <div style={{ width: "440px", height: "100vh" }}>
                <p style={{ marginTop: "10px", color: "#00377B", fontWeight: "700", fontSize: "20px" }}>Certificate Preview</p>
                <img
                  style={{ position: "absolute", right: "0px", left: "0px", top: "50px", borderRadius: "10px", height: "90vh" }}
                  src="https://source.unsplash.com/user/c_v_r/1600×900"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
};

export default MarriageCorrectionEditPage;
