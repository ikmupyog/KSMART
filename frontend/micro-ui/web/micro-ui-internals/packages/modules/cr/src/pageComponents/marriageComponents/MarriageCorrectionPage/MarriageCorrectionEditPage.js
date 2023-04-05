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
import { initializeMarriageCorrectionObject } from "../../../config/globalObject";
import { useForm } from "react-hook-form";
import MarriageAddressPage from "../MarriageAddressPage";

const types = ["HUSBAND DETAILS", "WIFE DETAILS"];

const MarriageCorrectionEditPage = ({ navigationData,cmbPlace,cmbWardNoFinal,BirthCorrectionDocuments}) => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  const [showModal, setShowModal] = useState(false);
  let marriageCorrectionFormData = [];
  const [value, setValue1] = useState(0);
  const [active, setActive] = useState(types[0]);
  const [marriageCorrectionFormsObj, setMarriageCorrectionFormsObj] = useState(false);
  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
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

  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = (props) => {
    return <div className="col-md-9">{props.children}</div>;
  };

  const ButtonContainer = (props) => {
    return <div className="col-md-3">{props.children}</div>;
  };

  const onSubmit = (data) => console.log(data);

  const { register, handleSubmit, reset, setValue, getValues, watch, errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  useEffect(async()=>{
    marriageCorrectionFormData = await initializeMarriageCorrectionObject(BirthCorrectionDocuments,navigationData);
    await setMarriageCorrectionFormsObj(marriageCorrectionFormData);
 },[navigationData,BirthCorrectionDocuments])


 const setMarriageCorrecvtionFilterQuery = (fieldId) => {
   let selectedMarriageCorrectionData = marriageCorrectionFormObj[fieldId];
   setSelectedCorrectionItem(selectedMarriageCorrectionData);
   setShowModal(true);
 };
 

  function setSelectmarriageWardCode(value) {
    // setTenantWard(value.code);
    setmarriageWardCode(value);
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
  
if(Object.keys(marriageCorrectionFormsObj)?.length > 0){

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
                  disabled={marriageCorrectionFormsObj.CHILD_DOB?.isDisabled}
                  autofocus={marriageCorrectionFormsObj.CHILD_DOB?.isFocused}
                  date={marriageCorrectionFormsObj?.CHILD_DOB?.curValue}
                  // max={convertEpochToDate(new Date())}
                  //min={convertEpochToDate("1900-01-01")}
                  // onChange={setselectChildDOB}
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
                  <EditIcon selected={true} label={"Edit"} />
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
                  selected={marriageWardCode}
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
                  <EditIcon selected={true} label={"Edit"} />
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
                  selected={marriagePlace}
                  select={setMarriagePlace}
                  placeholder={`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                />
              </div>
              {marriagePlace.code === "RELIGIOUS_INSTITUTION" && (
                <div className="col-md-5">
                  <CardLabel>
                    {t("CS_NAME_OF_PLACE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="namecmb"
                    isMandatory={true}
                    placeholder={t("CS_NAME_OF_PLACE'")}
                    option={cmbWardNoFinal}
                    selected={marriageWardCode}
                    select={setSelectmarriageWardCode}
                    {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                  />
                </div>
              )}
              {marriagePlace?.code === "MANDAPAM_HALL_AND_OTHER" && (
                <div className="col-md-5">
                  <CardLabel>
                    {t("CS_NAME_OF_PLACE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="namecmb"
                    isMandatory={true}
                    placeholder={t("CS_NAME_OF_PLACE'")}
                    option={cmbWardNoFinal}
                    selected={marriageWardCode}
                    select={setSelectmarriageWardCode}
                    {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                  />
                </div>
              )}
              {marriagePlace?.code === "SUB_REGISTRAR_OFFICE" && (
                <div className="col-md-5">
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
                </div>
              )}
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                <EditIcon
                  selected={true}
                  label={"Edit"}
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
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
                        value={marriageCorrectionFormsObj?.CHILD_NAME?.curValue}
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
                        name="husbandMiddleNameEn"
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        name="husbandMiddleNameMl"
                        // value={DeceasedFirstNameEn}
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
                        name="husbandLastNameMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        name="groomDateOfBirth"
                        // onChange={selectDeathDate}
                        // {...(validation = {
                        //   pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        //   isRequired: true,
                        //   type: "text",
                        //   title: t("CR_INVALID_DATE"),
                        // })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LAST_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>

                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        name="brideDateOfBirth"
                        // onChange={selectDeathDate}
                        // {...(validation = {
                        //   pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
                        //   isRequired: true,
                        //   type: "text",
                        //   title: t("CR_INVALID_DATE"),
                        // })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        name="brideMotherNameEn"
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_FATHER_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
                        name="brideGuardianNameMl"
                        // value={DeceasedFirstNameEn}
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
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_GUARDIAN_NAME_ML")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      <EditIcon
                        selected={true}
                        label={"Edit"}
                        onClick={() => {
                          setShowModal(true);
                        }}
                      />
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
        <BirthInclusionModal showModal={showModal} selectedConfig={selectedCorrectionItem} hideModal={_hideModal} />
      </FormStep>
    </React.Fragment>
);
 } else{
   return (<Loader/>)
 }
 };
 
export default MarriageCorrectionEditPage;
