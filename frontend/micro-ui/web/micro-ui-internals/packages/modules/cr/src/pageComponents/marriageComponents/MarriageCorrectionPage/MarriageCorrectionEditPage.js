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
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import FormFieldContainer from "../../../components/FormFieldContainer";
import HouseMarriageRegistration from "../HouseMarriageRegistration";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import { initializeMarriageCorrectionObject } from "../../../business-objects/globalObject";
import { useForm } from "react-hook-form";
import { convertEpochToDate } from "../../../utils";
// import MarriageAddressPage from "../MarriageAddressPage";
import MarriagePublicPlace from "../MarriagePublicPlace";
import MarriageCorrectionModal from "../../../components/MarriageCorrectionModal";
import { formatApiParams } from "../../../utils/marriageCorrectionParams";

const types = ["HUSBAND DETAILS", "WIFE DETAILS"];

const MarriageCorrectionEditPage = ({
  navigationData,
  cmbPlace,
  cmbWardNoFinal,
  cmbPlaceName,
  onSubmitAcknowledgement,
  BirthCorrectionDocuments,
}) => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  const [showModal, setShowModal] = useState(false);
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
  const setBirthInclusionFilterQuery = (fieldId) => {
    let birthInclusionData = marriageCorrectionFormsObj[fieldId];
    setSelectedFieldType(fieldId);
    setSelectedCorrectionItem(birthInclusionData);
    console.log("birthInclusionData ===", birthInclusionData, fieldId);
    setShowModal(true);
  };

  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = (props) => {
    return <div className="col-md-10">{props.children}</div>;
  };

  const ButtonContainer = (props) => {
    return (
      <div
        className="col-md-2"
        style={{ cursor: "pointer", background: "rgba(244, 119, 56, 0.12)", borderRadius: "9999px", height: "3rem", width: "3rem" }}
      >
        {props.children}
      </div>
    );
  };

  const mutation = Digit.Hooks.cr.useMarriageCorrectionAction(tenantId);

  const onSubmit = (data) => console.log(data);

  const { register, handleSubmit, reset, setValue, getValues, watch, errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

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

  useEffect(async () => {
    marriageCorrectionFormData = await initializeMarriageCorrectionObject(
      BirthCorrectionDocuments,
      navigationData,
      cmbWardNoFinal,
      cmbPlace,
      cmbPlaceName
    );
    await setMarriageCorrectionFormsObj(marriageCorrectionFormData);
  }, [navigationData, BirthCorrectionDocuments]);

  useEffect(() => {
    if (marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue) {
      setMarriagePlace(marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue);
    }
  }, [marriageCorrectionFormsObj]);

  const onUploadDocSubmit = async ({ fileData, documentCondition }) => {
    if (fileData && fileData?.length > 0) {
      const selectedDocIds = fileData.map((item) => item.documentId);
      setSelectedDocs(selectedDocIds);
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


  const onDocUploadSuccess = (data) =>{
    onSubmitAcknowledgement(data);
  }
  const onSubmitMarriageCorrection = (data) => {
    const formattedResp = formatApiParams(marriageCorrectionFormsObj, navigationData);
    mutation.mutate(formattedResp,{ onSuccess: onDocUploadSuccess });
   
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
        margin: "2rem",
        padding: "1rem 1rem 1rem 1rem",
        cursor: "pointer",
        color: "rgb(244, 119, 56)",
        fontWeight: "bold",
        borderBottom: "2px solid black",
      };
    } else {
      return { margin: "2rem", padding: "1rem 1rem 1rem 1rem", color: "black", cursor: "pointer", fontWeight: "bold" };
    }
  };

  if (Object.keys(marriageCorrectionFormsObj)?.length > 0) {
    return (
      <React.Fragment>
        <FormStep>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("CR_DATE_OF_MARRIAGE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  // date={childDOB}
                  // datePickerRef={register}
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
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
            {marriageCorrectionFormsObj?.DOM?.isDisable && (
              <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.DOM)}>
                  <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            )}
            </div>
          </FormFieldContainer>
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
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARTNER_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <FormFieldContainer>
            <div style={{ display: "flex" }}>
              {types.map((type, index) => (
                <div style={getTabStyle(types[index])} key={type} active={active === type} onClick={() => setActive(type)}>
                  {type}
                </div>
              ))}
            </div>
            <p />
            {active === types[0] ? (
              <div>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        optionKey="i18nKey"
                        name="groomFirstnameEn"
                        disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.firstNameEn}
                        onBlur={(e) => onGroomNameChange(e, "firstNameEn")}
                        placeholder={`${t("CR_FIRST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomMiddlenameEn"
                        disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.middleNameEn}
                        onBlur={(e) => onGroomNameChange(e, "middleNameEn")}
                        placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomLastnameEn"
                        disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.lastNameEn}
                        onBlur={(e) => onGroomNameChange(e, "lastNameEn")}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.GROOM_NAME?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_NAME)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FIRST_NAME_ML")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomFirstNameMl"
                        disabled={marriageCorrectionFormsObj?.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj?.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.firstNameMl}
                        onBlur={(e) => onGroomNameChange(e, "firstNameMl")}
                        placeholder={`${t("CR_FIRST_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MIDDLE_NAME_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="GroomMiddleNameMl"
                        disabled={marriageCorrectionFormsObj.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.middleNameMl}
                        onBlur={(e) => onGroomNameChange(e, "middleNameMl")}
                        placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomLastNameMl"
                        disabled={marriageCorrectionFormsObj.GROOM_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_NAME?.curValue?.lastNameMl}
                        onBlur={(e) => onGroomNameChange(e, "lastNameMl")}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {t("CR_DATE_OF_BIRTH")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <DatePicker
                        // date={DateOfDeath}
                        datePickerRef={register}
                        // max={convertEpochToDate(new Date())}
                        name="groomDOB"
                        disabled={marriageCorrectionFormsObj.GROOM_AGE?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_AGE?.isFocused}
                        date={marriageCorrectionFormsObj?.GROOM_AGE?.curValue?.dob}
                        max={convertEpochToDate(new Date())}
                        onChange={onGroomDOBChange}
                        formattingFn={formatDob}
                        // {...(validation = {
                        //   pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        //   isRequired: true,
                        //   type: "text",
                        //   title: t("CR_INVALID_DATE"),
                        // })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_AGE")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="GroomAge"
                        disabled={marriageCorrectionFormsObj.GROOM_AGE?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_AGE?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_AGE?.curValue?.age}
                        // value={DeceasedFirstNameEn}
                        onChange={onGroomDOBChange}
                        placeholder={`${t("CR_AGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.GROOM_AGE?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_AGE)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_MOTHER_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomMothernameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_MOTHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_MOTHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_MOTHER?.curValue?.groomMotherNameEn}
                        onBlur={(e) => onGroomMotherNameChange(e, "groomMotherNameEn")}
                        placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomMothernameMl"
                        disabled={marriageCorrectionFormsObj.GROOM_MOTHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_MOTHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_MOTHER?.curValue?.groomMotherNameMl}
                        onBlur={(e) => onGroomMotherNameChange(e, "groomMotherNameMl")}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.GROOM_MOTHER?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_MOTHER)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FATHER_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        inputRef={register({})}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomFathernameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_FATHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_FATHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_FATHER?.curValue?.groomFatherNameEn}
                        onBlur={(e) => onGroomFatherNameChange(e, "groomFatherNameEn")}
                        placeholder={`${t("CR_FATHER_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomFathernameMl"
                        disabled={marriageCorrectionFormsObj.GROOM_FATHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_FATHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_FATHER?.curValue?.groomFatherNameMl}
                        onBlur={(e) => onGroomFatherNameChange(e, "groomFatherNameMl")}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.GROOM_FATHER?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_FATHER)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_GUARDIAN_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomGuardiannameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_GUARDIAN?.curValue?.groomGuardianNameEn}
                        onBlur={(e) => onGroomGuardianNameChange(e, "groomGuardianNameEn")}
                        placeholder={`${t("CR_GUARDIAN_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_GUARDIAN_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="groomGuardiannameMl"
                        disabled={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_GUARDIAN?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_GUARDIAN?.curValue?.groomGuardianNameMl}
                        onBlur={(e) => onGroomGuardianNameChange(e, "groomGuardianNameMl")}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.GROOM_GUARDIAN?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.GROOM_GUARDIAN)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
               {((marriageCorrectionFormsObj.GROOM_PERADD?.addressType === "insideKerala")||
               (marriageCorrectionFormsObj.GROOM_PERADD?.addressType === "outsideKerala")) ? (
                <div>
                 <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedHouseNameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameEn}
                        onBlur={(e) => onGroomAddressChange(e, "houseNameEn")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityEn"
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameEn}
                        onBlur={(e) => onGroomAddressChange(e, "localityNameEn")}
                        placeholder={`${t("CR_LOCALITY_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedStreetEn"
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.streetNameEn}
                        onBlur={(e) => onGroomAddressChange(e, "streetNameEn")}
                        placeholder={`${t("CR_STREET_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.5rem" }}>
                    {marriageCorrectionFormsObj?.GROOM_PERADD?.isDisable && (
                      <ButtonContainer>
                        <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["GROOM_PERADD"])}>
                          <EditIcon style={{ position: "absolute", top: "0.8rem" }}/>
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
                        name="DeceasedHouseNameMl"
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameMl}
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        onBlur={(e) => onGroomAddressChange(e, "houseNameMl")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityMl"
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameMl}
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        onBlur={(e) => onGroomAddressChange(e, "localityNameMl")}
                        placeholder={`${t("CR_LOCALITY_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedStreetMl"
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.streetNameMl}
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        onBlur={(e) => onGroomAddressChange(e, "streetNameMl")}
                        placeholder={`${t("CR_STREET_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                </div>)
                :(
                  <div>
                  <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADDRESS_LINE_1_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedHouseNameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameEn}
                        onBlur={(e) => onGroomAddressChange(e, "houseNameEn")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADDRESS_LINE_2_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityEn"
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameEn}
                        onBlur={(e) => onGroomAddressChange(e, "localityNameEn")}
                        placeholder={`${t("CR_LOCALITY_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.5rem" }}>
                    {marriageCorrectionFormsObj?.GROOM_PERADD?.isDisable && (
                      <ButtonContainer>
                        <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["GROOM_PERADD"])}>
                          <EditIcon style={{ position: "absolute", top: "0.8rem" }}/>
                        </span>
                      </ButtonContainer>
                    )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADDRESS_LINE_1_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedHouseNameMl"
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.houseNameMl}
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        onBlur={(e) => onGroomAddressChange(e, "houseNameMl")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_ADDRESS_LINE_2_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityMl"
                        defaultValue={marriageCorrectionFormsObj?.GROOM_PERADD?.curValue.localityNameMl}
                        disabled={marriageCorrectionFormsObj.GROOM_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.GROOM_PERADD?.isFocused}
                        onBlur={(e) => onGroomAddressChange(e, "localityNameMl")}
                        placeholder={`${t("CR_LOCALITY_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                </div>
                )}
                <div style={{ display: "flex", flexDirection: "column-reverse" }}></div>
                <FormFieldContainer>
                  <FieldComponentContainer></FieldComponentContainer>
                </FormFieldContainer>
              </div>
            ) : (
              <div>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideFirstNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameEn}
                        onBlur={(e) => onBrideNameChange(e, "firstNameEn")}
                        placeholder={`${t("CR_FIRST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideMiddleNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameEn}
                        onBlur={(e) => onBrideNameChange(e, "middleNameEn")}
                        placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideLastNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameEn}
                        onBlur={(e) => onBrideNameChange(e, "lastNameEn")}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.BRIDE_NAME?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_NAME)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FIRST_NAME_ML")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideFirstNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameMl}
                        onBlur={(e) => onBrideNameChange(e, "firstNameMl")}
                        placeholder={`${t("CR_FIRST_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MIDDLE_NAME_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideMiddleNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameMl}
                        onBlur={(e) => onBrideNameChange(e, "middleNameMl")}
                        placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideLastNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameMl}
                        onBlur={(e) => onBrideNameChange(e, "lastNameMl")}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {t("CR_DATE_OF_BIRTH")}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <DatePicker
                        // date={DateOfDeath}
                        // max={convertEpochToDate(new Date())}
                        datePickerRef={register}
                        name="brideDOB"
                        disabled={marriageCorrectionFormsObj.BRIDE_AGE?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_AGE?.isFocused}
                        date={marriageCorrectionFormsObj?.BRIDE_AGE?.curValue?.dob}
                        max={convertEpochToDate(new Date())}
                        onChange={onBrideDOBChange}
                        formattingFn={formatDob}
                        // {...(validation = {
                        //   pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        //   isRequired: true,
                        //   type: "text",
                        //   title: t("CR_INVALID_DATE"),
                        // })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_AGE")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideAge"
                        disabled={marriageCorrectionFormsObj.BRIDE_AGE?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_AGE?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_AGE?.curValue?.age}
                        // value={DeceasedFirstNameEn}
                        onChange={onBrideDOBChange}
                        placeholder={`${t("CR_AGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.BRIDE_AGE?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_AGE)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_MOTHER_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideMothernameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_MOTHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_MOTHER?.curValue?.brideMotherNameEn}
                        onBlur={(e) => onBrideMotherNameChange(e, "brideMotherNameEn")}
                        placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideMotherNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_MOTHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_MOTHER?.curValue?.brideMotherNameMl}
                        onBlur={(e) => onBrideMotherNameChange(e, "brideMotherNameMl")}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.BRIDE_MOTHER?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_MOTHER)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>
                        {`${t("CR_FATHER_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideFatherNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_FATHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_FATHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_FATHER?.curValue?.brideFatherNameEn}
                        onBlur={(e) => onBrideFatherNameChange(e, "brideFatherNameEn")}
                        placeholder={`${t("CR_FATHER_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideFatherNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_FATHER?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_FATHER?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_FATHER?.curValue?.brideFatherNameMl}
                        onBlur={(e) => onBrideFatherNameChange(e, "brideFatherNameMl")}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  {marriageCorrectionFormsObj?.BRIDE_FATHER?.isDisable && (
                    <ButtonContainer>
                      <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_FATHER)}>
                        <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                      </span>
                    </ButtonContainer>
                  )}
                  </div>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_GUARDIAN_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideGuardianNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.curValue?.brideGuardianNameEn}
                        onBlur={(e) => onBrideGuardianNameChange(e, "brideGuardianNameEn")}
                        placeholder={`${t("CR_GUARDIAN_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>{`${t("CR_GUARDIAN_NAME_ML")}`}</CardLabel>
                      <TextInput
                        t={t}
                        inputRef={register({})}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="brideGuardianNameMl"
                        disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.curValue?.brideGuardianNameMl}
                        onBlur={(e) => onBrideGuardianNameChange(e, "brideGuardianNameMl")}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    {marriageCorrectionFormsObj?.BRIDE_GUARDIAN?.isDisable && (
                      <ButtonContainer>
                        <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.BRIDE_GUARDIAN)}>
                          <EditIcon style={{ position: "absolute", top: "0.8rem" }} selected={true} label={"Edit"} />
                        </span>
                      </ButtonContainer>
                    )}
                  </div>
                </FormFieldContainer>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedHouseNameEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.houseNameEn}
                        onBlur={(e) => onBrideAddressChange(e, "houseNameEn")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.localityNameEn}
                        onBlur={(e) => onBrideAddressChange(e, "localityNameEn")}
                        placeholder={`${t("CR_LOCALITY_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedStreetEn"
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.streetNameEn}
                        onBlur={(e) => onBrideAddressChange(e, "streetNameEn")}
                        placeholder={`${t("CR_STREET_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.5rem" }}>
                    {marriageCorrectionFormsObj?.BRIDE_PERADD?.isDisable && (
                      <ButtonContainer>
                        <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES["BRIDE_PERADD"])}>
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
                        name="DeceasedHouseNameMl"
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.houseNameMl}
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        onBlur={(e) => onBrideAddressChange(e, "houseNameMl")}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedLocalityMl"
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.localityNameMl}
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        onBlur={(e) => onBrideAddressChange(e, "localityNameMl")}
                        placeholder={`${t("CR_LOCALITY_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        type={"text"}
                        name="DeceasedStreetMl"
                        defaultValue={marriageCorrectionFormsObj?.BRIDE_PERADD?.curValue?.streetNameMl}
                        disabled={marriageCorrectionFormsObj.BRIDE_PERADD?.isDisable}
                        autofocus={marriageCorrectionFormsObj.BRIDE_PERADD?.isFocused}
                        onBlur={(e) => onBrideAddressChange(e, "streetNameMl")}
                        placeholder={`${t("CR_STREET_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
              </div>
            )}
          </FormFieldContainer>
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmitMarriageCorrection} />
          <MarriageCorrectionModal
            showModal={showModal}
            selectedConfig={selectedCorrectionItem}
            onSubmit={onUploadDocSubmit}
            selectedDocs={selectedDocs}
            hideModal={_hideModal}
          />
        </FormStep>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
};

export default MarriageCorrectionEditPage;
