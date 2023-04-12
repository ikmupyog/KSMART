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
  EditButton,
  PopUp,
  UploadFile,
  EditIcon,
} from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../../components/CustomTimePicker";
import FormFieldContainer from "../../../components/FormFieldContainer";
import BirthInclusionModal from "../../../components/BirthInclusionModal";
import { BIRTH_INCLUSION_FIELD_NAMES } from "../../../config/constants";
import { initializeBirthInclusionObject } from "../../../business-objects/globalObject";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { convertEpochToDate } from "../../../utils";
import moment from "moment";
import { formatApiParams } from "../../../utils/birthInclusionParams";
let birthInclusionFormData = {};
const BirthInclusionEditPage = ({ cmbNation, sex, cmbPlace, BirthCorrectionDocuments, navigationData }) => {
  let formData = {};
  let validation = {};
  let birthInclusionFormData = {};
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showModal, setShowModal] = useState(false);
  const [birthInclusionFormsObj, setbirthInclusionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  // const [isDisabled,setDisabled] = useState(false);
  // const [uploadStatus, setUploadStatus] = useState({
  //   hospitalCorrectionLetter: false,
  // });
  const [value, setValue] = useState(0);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  // let location = useLocation();
  // let navigationData = location?.state?.inclusionData;

  useEffect(async () => {
    birthInclusionFormData = await initializeBirthInclusionObject(BirthCorrectionDocuments, navigationData, sex, cmbPlace);
    await setbirthInclusionFormsObj(birthInclusionFormData);
    console.log("birthInclusionFormData==", birthInclusionFormData, sex);
  }, [navigationData, BirthCorrectionDocuments]);

  console.log("navigationData", navigationData);

  const setBirthInclusionFilterQuery = (fieldId) => {
    console.log("birthInclusionFormData--------", birthInclusionFormsObj, fieldId);
    let selectedBirthInclusionData = birthInclusionFormsObj[fieldId];
    console.log("birthInclusionData", selectedBirthInclusionData);
    setSelectedInclusionItem(selectedBirthInclusionData);
    setShowModal(true);
  };

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-9">{children}</div>;
  };

  const ButtonContainer = ({ children }) => {
    return <div className="col-md-3">{children}</div>;
  };

  const onUploadDocSubmit = async (fileData, error) => {
    console.log("upload response==", fileData);
    if (fileData && fileData?.length > 0) {
      const selectedDocIds = fileData.map((item) => item.documentId);
      setSelectedDocs(selectedDocIds);
    }

    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_DOB } = tempObj;
    tempObj = { ...tempObj, CHILD_DOB: { ...CHILD_DOB, Documents: fileData, isFocused: true, isDisabled: false } };

    setbirthInclusionFormsObj(tempObj);
    setShowModal(false);
  };

  // const { register, control, handleSubmit, reset, getValues, watch, setFocus, errors } = useForm({
  //   reValidateMode: "onSubmit",
  //   mode: "all",
  //   defaultValues: {
  //     childDob: "22/03/1993",
  //     DeceasedAadharNumber: "",
  //     limit: 10,
  //     sortBy: "DateOfDeath",
  //     sortOrder: "DESC",
  //   },
  // });

  const mutation = Digit.Hooks.cr.useBirthCorrectionAction(tenantId);

  const _hideModal = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const onDobChange = (value) => {
    console.log("value==", value);
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_DOB } = tempObj;
    tempObj = { ...tempObj, CHILD_DOB: { ...CHILD_DOB, curValue: value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onSubmitBirthInclusion = () => {
    const formattedResp = formatApiParams(birthInclusionFormsObj, navigationData);
    console.log("formattedResp", formattedResp);
    mutation.mutate(formattedResp);
  };

  const formatDob = (date) => {
    return date;
  };

  const onGenderChange = (genderDetails) => {
    console.log("genderDetails", genderDetails);
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_SEX } = tempObj;
    tempObj = { ...tempObj, CHILD_SEX: { ...CHILD_SEX, curValue: genderDetails } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onAdharChange = (e) => {
    console.log("adhar change==", e.target.value);
    let tempObj = { ...birthInclusionFormsObj };
    let { CHILD_AADHAAR } = tempObj;
    tempObj = { ...tempObj, CHILD_AADHAAR: { ...CHILD_AADHAAR, curValue: e.target.value } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChangeMotherDetails = () => {
    let tempObj = { ...birthInclusionFormsObj };
    let { MOTHER_DETAILS } = tempObj;
    let { curValue } = MOTHER_DETAILS;
    tempObj = { ...tempObj, MOTHER_DETAILS: { ...MOTHER_DETAILS, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChangeFatherDetails = () => {
    let tempObj = { ...birthInclusionFormsObj };
    let { FATHER_DETAILS } = tempObj;
    let { curValue } = FATHER_DETAILS;
    tempObj = { ...tempObj, FATHER_DETAILS: { ...FATHER_DETAILS, curValue: { ...curValue, [fieldType]: e.target.value } } };
    setbirthInclusionFormsObj(tempObj);
  };

  const onChildNameChange = (e,fieldType) => {
    e.preventDefault();
    console.log("e.target==", e.target);
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

  if (Object.keys(birthInclusionFormsObj)?.length > 0) {
    console.log("birthInclusionFormData??.curValue", birthInclusionFormsObj?.CHILD_DOB);
    return (
      <React.Fragment>
        <FormStep>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                </CardLabel>
                <DatePicker
                  // {...register('childDOB')}
                  // datePickerRef ={register}
                  // name="dateofbirth"
                  disabled={birthInclusionFormsObj?.CHILD_DOB?.isDisabled}
                  autofocus={birthInclusionFormsObj?.CHILD_DOB?.isFocused}
                  date={birthInclusionFormsObj?.CHILD_DOB?.curValue}
                  max={convertEpochToDate(new Date())}
                  min={convertEpochToDate("1900-01-01")}
                  onChange={onDobChange}
                  formattingFn={formatDob}
                  // disable={true}
                  // inputFormat="DD/MM/YYYY"
                  // inputRef={register}
                  // date={birthInclusionFormsObj.CHILD_DOB?.curValue && moment(birthInclusionFormsObj.CHILD_DOB?.curValue).format("DD-MM-YYYY")}
                  // onChange={props.onChange}
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.CHILD_DOB?.isDisabled && (
                  <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_DOB"])}>
                    <EditIcon />
                  </span>
                )}
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("DC_GENDER")}
                </CardLabel>
                <Dropdown
                  selected={birthInclusionFormsObj?.CHILD_SEX?.curValue}
                  select={onGenderChange}
                  // onBlur={props.onBlur}
                  // disable={birthInclusionFormsObj?.CHILD_SEX?.isDisabled}
                  option={sex}
                  optionKey="code"
                  t={t}
                  placeholder={`${t("DC_GENDER")}`}
                  {...(validation = { isRequired: false, title: t("DC_INVALID_GENDER") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.CHILD_SEX?.isDisabled && (
                  <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_SEX"])}>
                    <EditIcon selected={true} label={"Edit"} />
                  </span>
                )}
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>
                  {t("CR_AADHAR")}
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  // type="number"
                  // inputRef={register}
                  max="12"
                  optionKey="i18nKey"
                  name="AadharNumber"
                  defaultValue={birthInclusionFormsObj?.CHILD_AADHAAR?.curValue}
                  onBlur={onAdharChange}
                  placeholder={`${t("CR_AADHAR")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.CHILD_AADHAAR?.isDisabled && (
                  <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_AADHAAR"])}>
                    <EditIcon selected={true} label={"Edit"} />
                  </span>
                )}
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_EN")}`}
                </CardLabel>
                <TextInput
                  t={t}
                  // key={"password"}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="firstNameEn"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.firstNameEn}
                  // disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  oninput={(e) => onChildNameChange(e, "firstNameEn")}
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="middleNameEn"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.middleNameEn}
                  // disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  onChange={(e) => onChildNameChange(e, "middleNameEn")}
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
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="lastNameEn"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.lastNameEn}
                  disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  onChange={(e) => onChildNameChange(e, "lastNameEn")}
                  // value={DeceasedFirstNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.CHILD_NAME?.isDisabled && (
                  <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_NAME"])}>
                    <EditIcon selected={true} label={"Edit"} />
                  </span>
                )}
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
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="firstNameMl"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.firstNameMl}
                  disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  onChange={(e) => onChildNameChange(e, "firstNameMl")}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FIRST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="middleNameMl"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.middleNameMl}
                  disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  onChange={(e) => onChildNameChange(e, "middleNameMl")}
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
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="lastNameMl"
                  defaultValue={birthInclusionFormsObj?.CHILD_NAME?.curValue?.lastNameMl}
                  disabled={birthInclusionFormsObj?.CHILD_NAME?.isDisabled}
                  autoFocus={birthInclusionFormsObj?.CHILD_NAME?.isFocused}
                  onChange={(e) => onChildNameChange(e, "lastNameMl")}
                  // value={DeceasedFirstNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer></ButtonContainer>
            </div>
          </FormFieldContainer>

          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_PLACE_OF_BIRTH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlace}
                  // selected={DeathPlace}
                  // select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_BIRTH")}`}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                <EditIcon selected={true} label={"Edit"} />
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          {value === "HOSPITAL" && (
            <div>
              <Hospital
                formData={formData}
                isEditDeath={isEditDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                HospitalNameMl={HospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
              />
            </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <Institution
                formData={formData}
                isEditDeath={isEditDeath}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceType={DeathPlaceType}
                DeathPlaceInstId={DeathPlaceInstId}
                setSelectedDeathPlaceInstId={setSelectedDeathPlaceInstId}
                InstitutionIdMl={InstitutionIdMl}
                setInstitutionIdMl={setInstitutionIdMl}
                InstitutionFilterList={InstitutionFilterList}
                setInstitutionFilterList={setInstitutionFilterList}
                isInitialRenderInstitutionList={isInitialRenderInstitutionList}
                setIsInitialRenderInstitutionList={setIsInitialRenderInstitutionList}
              />
            </div>
          )}
          {value === "HOME" && (
            <div>
              <DeathPlaceHome
                formData={formData}
                isEditDeath={isEditDeath}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
                setDeathPlaceHomepostofficeId={setDeathPlaceHomepostofficeId}
                DeathPlaceHomepincode={DeathPlaceHomepincode}
                setDeathPlaceHomepincode={setDeathPlaceHomepincode}
                DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
                setDeathPlaceHomehoueNameEn={setDeathPlaceHomehoueNameEn}
                DeathPlaceHomeHoueNameMl={DeathPlaceHomeHoueNameMl}
                setDeathPlaceHomehoueNameMl={setDeathPlaceHomehoueNameMl}
                DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
                setDeathPlaceHomelocalityEn={setDeathPlaceHomelocalityEn}
                DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
                setDeathPlaceHomelocalityMl={setDeathPlaceHomelocalityMl}
                DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
                setDeathPlaceHomestreetNameEn={setDeathPlaceHomestreetNameEn}
                DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
                setDeathPlaceHomestreetNameMl={setDeathPlaceHomestreetNameMl}
                PostOfficevalues={PostOfficevalues}
                setPostOfficevalues={setPostOfficevalues}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <DeathPlaceVehicle
                formData={formData}
                isEditDeath={isEditDeath}
                DeathPlaceType={DeathPlaceType}
                selectDeathPlaceType={selectDeathPlaceType}
                VehicleNumber={VehicleNumber}
                setVehicleNumber={setVehicleNumber}
                VehicleFromplaceEn={VehicleFromplaceEn}
                setVehicleFromplaceEn={setVehicleFromplaceEn}
                VehicleToPlaceEn={VehicleToPlaceEn}
                setVehicleToPlaceEn={setVehicleToPlaceEn}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
                VehicleFirstHaltEn={VehicleFirstHaltEn}
                setVehicleFirstHaltEn={setVehicleFirstHaltEn}
                VehicleFirstHaltMl={VehicleFirstHaltMl}
                setVehicleFirstHaltMl={setVehicleFirstHaltMl}
                VehicleHospitalEn={VehicleHospitalEn}
                setSelectedVehicleHospitalEn={setSelectedVehicleHospitalEn}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                VehicleFromplaceMl={VehicleFromplaceMl}
                setVehicleFromplaceMl={setVehicleFromplaceMl}
                VehicleToPlaceMl={VehicleToPlaceMl}
                setVehicleToPlaceMl={setVehicleToPlaceMl}
              />
            </div>
          )}
          {value === "PUBLIC_PLACES" && (
            <div>
              <DeathPublicPlace
                formData={formData}
                isEditDeath={isEditDeath}
                DeathPlaceType={DeathPlaceType}
                selectDeathPlaceType={selectDeathPlaceType}
                DeathPlaceLocalityEn={DeathPlaceLocalityEn}
                setDeathPlaceLocalityEn={setDeathPlaceLocalityEn}
                DeathPlaceLocalityMl={DeathPlaceLocalityMl}
                setDeathPlaceLocalityMl={setDeathPlaceLocalityMl}
                DeathPlaceStreetEn={DeathPlaceStreetEn}
                setDeathPlaceStreetEn={setDeathPlaceStreetEn}
                DeathPlaceStreetMl={DeathPlaceStreetMl}
                setDeathPlaceStreetMl={setDeathPlaceStreetMl}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
              />
            </div>
          )}
          {value === "OUTSIDE_JURISDICTION" && (
            <div>
              <DeathOutsideJurisdiction
                formData={formData}
                isEditDeath={isEditDeath}
                DeathPlaceCountry={DeathPlaceCountry}
                setSelectDeathPlaceCountry={setSelectDeathPlaceCountry}
                DeathPlaceState={DeathPlaceState}
                SelectDeathPlaceState={SelectDeathPlaceState}
                DeathPlaceDistrict={DeathPlaceDistrict}
                SelectDeathPlaceDistrict={SelectDeathPlaceDistrict}
                DeathPlaceCity={DeathPlaceCity}
                SelectDeathPlaceCity={SelectDeathPlaceCity}
                DeathPlaceRemarksEn={DeathPlaceRemarksEn}
                SelectDeathPlaceRemarksEn={SelectDeathPlaceRemarksEn}
                DeathPlaceRemarksMl={DeathPlaceRemarksMl}
                SelectDeathPlaceRemarksMl={SelectDeathPlaceRemarksMl}
                PlaceOfBurialMl={PlaceOfBurialMl}
                SelectPlaceOfBurialMl={SelectPlaceOfBurialMl}
                PlaceOfBurialEn={PlaceOfBurialEn}
                SelectPlaceOfBurialEn={SelectPlaceOfBurialEn}
                GeneralRemarks={GeneralRemarks}
                setGeneralRemarks={setGeneralRemarks}
                DeathPlaceWardId={DeathPlaceWardId}
                setDeathPlaceWardId={setDeathPlaceWardId}
              />
            </div>
          )}
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_MOTHER_NAME_EN")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="MotherNameEn"
                  defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherNameEn}
                  onBlur={(e) => onChangeMotherDetails(e, "motherNameEn")}
                  placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MOTHER_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="MotherNameMl"
                  defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherNameMl}
                  onBlur={(e) => onChangeMotherDetails(e, "motherNameMl")}
                  // value={DeceasedFirstNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_MOTHER_AADHAR")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  // type="number"
                  // inputRef={register}
                  max="12"
                  optionKey="i18nKey"
                  name="motherAadharNumber"
                  defaultValue={birthInclusionFormsObj?.MOTHER_DETAILS?.curValue?.motherAdhar}
                  onBlur={(e) => onChangeMotherDetails(e, "motherAdhar")}
                  // onChange={setSelectDeceasedAadharNumber}
                  placeholder={`${t("CR_AADHAR")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.MOTHER_DETAILS?.isDisabled && (<span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["MOTHER_DETAILS"])}>
                  <EditIcon selected={true} label={"Edit"} />
                </span>)}
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
                  type={"text"}
                  // optionKey="i18nKey"
                  name="FatherNameEn"
                  defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherNameEn}
                  onBlur={(e) => onChangeFatherDetails(e, "fatherNameEn")}
                  placeholder={`${t("CR_FATHER_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_FATHER_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="FatherNameMl"
                  defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherNameMl}
                  onBlur={(e) => onChangeFatherDetails(e, "fatherNameMl")}
                  // value={DeceasedFirstNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FATHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_FATHER_AADHAR")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  // type="number"
                  // inputRef={register}
                  max="12"
                  optionKey="i18nKey"
                  name="AadharNumber"
                  defaultValue={birthInclusionFormsObj?.FATHER_DETAILS?.curValue?.fatherAdhar}
                  onBlur={(e) => onChangeFatherDetails(e, "fatherAdhar")}
                  // value={DeceasedAadharNumber}
                  // onChange={setSelectDeceasedAadharNumber}
                  placeholder={`${t("CR_FATHER_AADHAR")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.FATHER_DETAILS?.isDisabled && (
                  <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["FATHER_DETAILS"])}>
                    <EditIcon />
                  </span>
                )}
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  name="HouseNameEn"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameEn}
                  onChange={(e) => onPresentAddressChange(e, "houseNameEn")}
                  placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="LocalityEn"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityEn}
                  onChange={(e) => onPresentAddressChange(e, "localityEn")}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  // isMandatory={false}
                  type={"text"}
                  // optionKey="i18nKey"
                  name="Street"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetEn}
                  onChange={(e) => onPresentAddressChange(e, "streetEn")}
                  placeholder={`${t("CR_STREET_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <ButtonContainer>
                {birthInclusionFormsObj?.PRESENT_ADDRESS?.isDisabled && <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["PRESENT_ADDRESS"])}>
                  <EditIcon />
                </span>}
              </ButtonContainer>
            </div>
          </FormFieldContainer>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-6">
                <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  name="HouseNameMl"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.houseNameMl}
                  onChange={(e) => onPresentAddressChange(e, "houseNameMl")}
                  placeholder={`${t("CR_HOUSE_NO_AND_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  name="LocalityMl"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.localityMl}
                  onChange={(e) => onPresentAddressChange(e, "localityMl")}
                  placeholder={`${t("CR_LOCALITY_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_STREET_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  name="StreetMl"
                  defaultValue={birthInclusionFormsObj?.PRESENT_ADDRESS?.curValue?.streetMl}
                  onChange={(e) => onPresentAddressChange(e, "streetMl")}
                  placeholder={`${t("CR_STREET_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
          </FormFieldContainer>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}></div>
          <FormFieldContainer>
            <FieldComponentContainer></FieldComponentContainer>
            <ButtonContainer>
              <div style={{ marginTop: "2.8rem" }}>
                <span onClick={onSubmitBirthInclusion}>
                  <EditButton selected={true} label={"Submit"} />
                </span>
              </div>
            </ButtonContainer>
          </FormFieldContainer>
          {/* </form> */}
          <BirthInclusionModal
            showModal={showModal}
            selectedDocs={selectedDocs}
            selectedConfig={selectedInclusionItem}
            onSubmit={onUploadDocSubmit}
            hideModal={_hideModal}
          />
        </FormStep>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
};
export default BirthInclusionEditPage;
