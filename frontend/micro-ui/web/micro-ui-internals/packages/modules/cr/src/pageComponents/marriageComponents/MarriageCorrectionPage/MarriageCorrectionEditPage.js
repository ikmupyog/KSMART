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
  EditIcon,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import FormFieldContainer from "../../../components/FormFieldContainer";
import HouseMarriageRegistration from "../HouseMarriageRegistration";
import BirthInclusionModal from "../../../components/BirthInclusionModal";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import { initializeMarriageCorrectionObject } from "../../../business-objects/globalObject";
import { useForm } from "react-hook-form";
import MarriageAddressPage from "../MarriageAddressPage";
import MarriagePublicPlace from "../MarriagePublicPlace";

const types = ["HUSBAND DETAILS", "WIFE DETAILS"];

const MarriageCorrectionEditPage = ({ navigationData, cmbPlace, cmbWardNoFinal, cmbPlaceName, cmbWardNo, BirthCorrectionDocuments }) => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  const [showModal, setShowModal] = useState(false);
  // const [marriagePlaceName, setMarriagePlaceName] = useState();
  let marriageCorrectionFormData = [];
const cmbPlaceNameReligious = cmbPlaceName?.filter((placeId) => placeId.placeTpe === "RELIGIOUS_INSTITUTION");
console.log({ cmbPlaceNameReligious });
const cmbPlaceNameMandapam = cmbPlaceName?.filter((placeId) => placeId.placeTpe === "MANDAPAM_HALL_AND_OTHER");
  const [value, setValue1] = useState(0);
  const [active, setActive] = useState(types[0]);
  const [marriageCorrectionFormsObj, setMarriageCorrectionFormsObj] = useState(false);
  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode
      ? formData?.MarriageDetails?.marriageWardCode
      : marriageCorrectionFormsObj?.marriageWardCode
      ? cmbWardNoFinal.filter((cmbWardNoFinal) => cmbWardNoFinal.code === marriageCorrectionFormsObj?.marriageWardCode[0])
      : ""
  );
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
    const birthInclusionData = BirthCorrectionDocuments;
    setSelectedCorrectionItem(birthInclusionData);
    setShowModal(true);
  };

  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = (props) => {
    return <div className="col-md-9">{props.children}</div>;
  };

  const ButtonContainer = (props) => {
    return (
      <div className="col-md-3" style={{ cursor: "pointer", background: "rgba(244, 119, 56, 0.12)", borderRadius: "9999px", height: "3rem", width: "3rem" }}>
        {props.children}
      </div>
    );
  };

  const onSubmit = (data) => console.log(data);

  const { register, handleSubmit, reset, setValue, getValues, watch, errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  const onDOMChange = (value) => {
    console.log("value==", value);
    let tempObj = { ...marriageCorrectionFormsObj };
    let { MARRIAGE_DOM } = tempObj;
    tempObj = { ...tempObj, MARRIAGE_DOM: { ...MARRIAGE_DOM, curValue: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") } };
    setMarriageCorrectionFormsObj(tempObj);
  };

    useEffect(async()=>{
      marriageCorrectionFormData = await initializeMarriageCorrectionObject(BirthCorrectionDocuments,navigationData,cmbWardNo,cmbPlace,cmbPlaceName);
      await setMarriageCorrectionFormsObj(marriageCorrectionFormData);
   },[navigationData,BirthCorrectionDocuments])

   useEffect(() => {
  if(marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue){
    console.log("curvalue===", marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue);
    setMarriagePlace(marriageCorrectionFormsObj?.MARRIAGE_PLACE_TYPE?.curValue)
  }
   }, [marriageCorrectionFormsObj]);

  const setMarriageCorrecvtionFilterQuery = (fieldId) => {
    let selectedMarriageCorrectionData = birthInclusionFormsObj[fieldId];
    setSelectedCorrectionItem(selectedMarriageCorrectionData);
    setShowModal(true);
  };

  function setSelectmarriageWardCode(value) {
    // setTenantWard(value.code);
    setmarriageWardCode(value);
  }

  function setMarriagePlaceName(place) {
    console.log({place});
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

  console.log("marriageCorrectionFormsObj ===", marriageCorrectionFormsObj);

  // if(Object.keys(marriageCorrectionFormsObj)?.length > 0){

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  disabled={marriageCorrectionFormsObj.MARRIAGE_DOM?.isDisabled}
                  autofocus={marriageCorrectionFormsObj.MARRIAGE_DOM?.isFocused}
                  date={marriageCorrectionFormsObj?.MARRIAGE_DOM?.curValue}
                  // max={convertEpochToDate(new Date())}
                  //min={convertEpochToDate("1900-01-01")}
                  onChange={onDOMChange}
                  // disable={isDisableEdit}
                  //  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <div className="row">
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
                  selected={cmbWardNoFinal.find((ward)=>(`${ward.label.toLowerCase()}-${ward.boundaryNum}`) == marriageCorrectionFormsObj?.MARRIAGE_PLACE_WARD?.curValue?.trim())}
                  disabled={marriageCorrectionFormsObj.CHILD_WARD?.isDisabled}
                  autofocus={marriageCorrectionFormsObj.CHILD_WARD?.isFocused}
                  select={setSelectmarriageWardCode}
                  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
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
                  select={setMarriagePlace}
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
                    selected={marriageWardCode}
                    select={setSelectmarriageWardCode}
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
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
            </div>
          </FormFieldContainer>
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
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.firstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.middleNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="husbandLastNameEn"
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.lastNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.firstNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.middleNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.GROOM_NAME_EN?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_NAME_EN?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_NAME_EN?.curValue?.lastNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
                  </div>
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
                        disabled={marriageCorrectionFormsObj.GROOM_DOB?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_DOB?.isFocused}
                        date={marriageCorrectionFormsObj?.GROOM_DOB?.curValue}
                        // onChange={selectDeathDate}
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
                        disabled={marriageCorrectionFormsObj.GROOM_AGE?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.GROOM_AGE?.isFocused}
                        value={marriageCorrectionFormsObj?.GROOM_AGE?.curValue}
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_AGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        name="groomMotherNameEn"
                        value={marriageCorrectionFormsObj?.GROOM_MOTHER_NAME_EN?.curValue?.groomMotherNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="groomMotherNameMl"
                        value={marriageCorrectionFormsObj?.GROOM_MOTHER_NAME_EN?.curValue?.groomMotherNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        name="groomFatherNameEn"
                        value={marriageCorrectionFormsObj?.GROOM_FATHER_NAME_EN?.curValue?.groomFatherNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="groomFatherNameMl"
                        value={marriageCorrectionFormsObj?.GROOM_FATHER_NAME_EN?.curValue?.groomFatherNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        name="groomGuardianNameEn"
                        value={marriageCorrectionFormsObj?.GROOM_GUARDIAN_NAME_EN?.curValue?.groomGuardianNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="groomGuardianNameMl"
                        value={marriageCorrectionFormsObj?.GROOM_GUARDIAN_NAME_EN?.curValue?.groomGuardianNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                <MarriageAddressPage formData={navigationData} />
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.firstNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.middleNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_NAME?.curValue?.lastNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
                  </div>
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
                        disabled={marriageCorrectionFormsObj.BRIDE_DOB?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_DOB?.isFocused}
                        date={marriageCorrectionFormsObj?.BRIDE_DOB?.curValue}
                        // onChange={selectDeathDate}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_AGE?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_AGE?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_AGE?.curValue}
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_AGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        disabled={marriageCorrectionFormsObj.BRIDE_MOTHER_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_MOTHER_NAME?.curValue?.brideMotherNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_MOTHER_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_MOTHER_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_MOTHER_NAME?.curValue?.brideMotherNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        disabled={marriageCorrectionFormsObj.BRIDE_FATHER_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_FATHER_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_FATHER_NAME?.curValue?.brideFatherNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_FATHER_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_FATHER_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_FATHER_NAME?.curValue?.brideFatherNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                        disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_GUARDIAN_NAME?.curValue?.brideGuardianNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        disabled={marriageCorrectionFormsObj.BRIDE_GUARDIAN_NAME?.isDisabled}
                        autofocus={marriageCorrectionFormsObj.BRIDE_GUARDIAN_NAME?.isFocused}
                        value={marriageCorrectionFormsObj?.BRIDE_GUARDIAN_NAME?.curValue?.brideGuardianNameMl}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                  <ButtonContainer>
                <span onClick={() => setBirthInclusionFilterQuery(MARRIAGE_INCLUSION_FIELD_NAMES.CHILD_DOB)}>
                  <EditIcon style={{ marginTop: "0.8rem" }} selected={true} label={"Edit"} />
                </span>
              </ButtonContainer>
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
                <MarriageAddressPage formData={navigationData} />
              </div>
            )}
          </FormFieldContainer>
        </form>
        <BirthInclusionModal 
        showModal={showModal} 
        selectedConfig={selectedCorrectionItem} 
        hideModal={_hideModal} />
      </FormStep>
    </React.Fragment>
  );
  //  } else{
  //    return (<Loader/>)
  //  }
};

export default MarriageCorrectionEditPage;
