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
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import FormFieldContainer from "../../components/FormFieldContainer";
import BirthInclusionModal from "../../components/BirthInclusionModal";
import { BIRTH_INCLUSION } from "../../config/constants";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFormattedBirthInclusionData } from "../../config/utils";
import MarriageAddressPage from "./MarriageAddressPage";

const types = ["HUSBAND DETAILS", "WIFE DETAILS"];

const MarriageInclusionEditPage = () => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  const stateId = Digit.ULBService.getStateId();
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    hospitalCorrectionLetter: false,
  });
  const [value, setValue1] = useState(0);
  const [active, setActive] = useState(types[0]);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  let location = useLocation();
  let navigationData = location?.state?.marriageCorrectionData;

  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
  );

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "BirthCorrectionDocuments"
  );
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "MarriagePlaceType");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  let cmbPlace = [];
  let menu = [];
  let cmbNation = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  let Zonal = [];
  let cmbState = [];
  let cmbfilterNation = [];
  let cmbfilterNationI = [];

  place &&
    place["birth-death-service"] &&
    place["birth-death-service"].MarriagePlaceType &&
    place["birth-death-service"].MarriagePlaceType.map((ob) => {
      cmbPlace.push(ob);
    });
  
    const cmbPlaceNameReligious = [
      { i18nKey: "Religious Institution 1", name: "RELIGIOUSINSTITUTION1", namelocal: "മത സ്ഥാപനം 1" },
      { i18nKey: "Religious Institution 2", name: "RELIGIOUSINSTITUTION2", namelocal: "മത സ്ഥാപനം 2" },
      { i18nKey: "Others", name: "OTHERS", namelocal: "മറ്റുള്ളവ" },
    ];

  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });

  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  const [DeathPlaceType, selectDeathPlaceType] = useState(
    formData?.InformationDeath?.DeathPlaceType?.code
      ? formData?.InformationDeath?.DeathPlaceType
      : formData?.InformationDeath?.DeathPlaceType
      ? ""
      : ""
  );
  const [HospitalNameMl, selectHospitalNameMl] = useState(
    formData?.InformationDeathails?.HospitalNameMl?.code
      ? formData?.InformationDeath?.HospitalNameMl
      : formData?.InformationDeath?.HospitalNameMl
      ? ""
      : ""
  );

  const [marriagePlace, setMarriagePlace] = useState(
    formData?.InformationDeath?.marriagePlace?.code
      ? formData?.InformationDeath?.marriagePlace
      : formData?.InformationDeath?.marriagePlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.marriagePlace)[0]
      : ""
  );

  const [DeceasedGender, setselectedDeceasedGender] = useState(
    formData?.InformationDeath?.DeceasedGender?.code
      ? formData?.InformationDeath?.DeceasedGender
      : formData?.InformationDeath?.DeceasedGender
      ? menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]
      : ""
  );
  const [DeceasedAadharNumber, setDeceasedAadharNumber] = useState(
    formData?.InformationDeath?.DeceasedAadharNumber ? formData?.InformationDeath?.DeceasedAadharNumber : ""
  );
  const [DeathPlaceInstId, setSelectedDeathPlaceInstId] = useState(
    formData?.InformationDeath?.DeathPlaceInstId ? formData?.InformationDeath?.DeathPlaceInstId : null
  );
  const [InstitutionIdMl, setInstitutionIdMl] = useState(formData?.InformationDeath?.DeathPlaceInstId);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [Nationality, setSelectedNationality] = useState(
    formData?.InformationDeath?.Nationality?.code
      ? formData?.InformationDeath?.Nationality
      : formData?.InformationDeath?.Nationality
      ? cmbNation.filter((cmbNation) => cmbNation.code === formData?.InformationDeath?.Nationality)[0]
      : ""
  );

  const setBirthInclusionFilterQuery = (fieldId) => {
    const birthInclusionData = correctionsData["birth-death-service"]?.BirthCorrectionDocuments;
    let selectedData = getFormattedBirthInclusionData(fieldId, navigationData, birthInclusionData);
    setSelectedInclusionItem(selectedData);
    setShowModal(true);
  };

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

  function setSelectmarriageWardCode(value) {
    // setTenantWard(value.code);
    setmarriageWardCode(value);
  }

  const getTabStyle = (selectedType) => {
    if (active === selectedType) {
      return { margin: "2rem", padding: "1rem 1rem 1rem 1rem", cursor: "pointer", color: "rgb(244, 119, 56)", fontWeight: "bold", borderBottom: "2px solid black" };
    } else {
      return { margin: "2rem", padding: "1rem 1rem 1rem 1rem", color: "black",  cursor: "pointer", fontWeight: "bold" };
    }
  };

  useEffect(() => {
    reset({
      groomFirstNameEn: navigationData?.GroomDetails?.groomFirstnameEn,
      groomFirstNameMl: navigationData?.GroomDetails?.groomFirstnameMl,
      husbandMiddleNameEn: navigationData?.GroomDetails?.groomMiddlenameEn,
      husbandLastNameEn: navigationData?.GroomDetails?.groomLastnameEn,
      husbandMiddleNameMl: navigationData?.GroomDetails?.groomMiddlenameMl,
      husbandLastNameMl: navigationData?.GroomDetails?.groomLastnameMl,
      groomMotherNameEn: navigationData?.GroomDetails?.groomMothernameEn,
      groomMotherNameMl: navigationData?.GroomDetails?.groomMothernameMl,
      groomFatherNameEn: navigationData?.GroomDetails?.groomFathernameEn,
      groomFatherNameMl: navigationData?.GroomDetails?.groomFathernameMl,
      groomGuardianNameEn: navigationData?.GroomDetails?.groomGuardiannameEn,
      groomGuardianNameMl: navigationData?.GroomDetails?.groomGuardiannameMl,
      marriageDOM: moment(navigationData?.marriageDOM).format("DD/MM/YYYY"),
      groomDateOfBirth: moment(navigationData?.GroomDetails?.groomDOB).format("DD/MM/YYYY"),
      brideFirstNameEn: navigationData?.BrideDetails?.brideFirstnameEn,
      brideFirstNameMl: navigationData?.BrideDetails?.brideFirstnameMl,
      brideMiddleNameEn: navigationData?.BrideDetails?.brideMiddlenameEn,
      brideLastNameEn: navigationData?.BrideDetails?.brideLastnameEn,
      brideMiddleNameMl: navigationData?.BrideDetails?.brideMiddlenameMl,
      brideLastNameMl: navigationData?.BrideDetails?.brideLastnameMl,
      brideMotherNameEn: navigationData?.BrideDetails?.brideMothernameEn,
      brideMotherNameMl: navigationData?.BrideDetails?.brideMothernameMl,
      brideFatherNameEn: navigationData?.BrideDetails?.brideFathernameEn,
      brideFatherNameMl: navigationData?.BrideDetails?.brideFathernameMl,
      brideGuardianNameEn: navigationData?.BrideDetails?.brideGuardiannameEn,
      brideGuardianNameMl: navigationData?.BrideDetails?.brideGuardiannameMl,
      brideDateOfBirth: moment(navigationData?.BrideDetails?.brideDOB).format("DD/MM/YYYY")
    });
    // }
  }, [navigationData]);

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
                  datePickerRef={register}
                  name="marriageDOM"
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
                <span onClick={() => setBirthInclusionFilterQuery(BIRTH_INCLUSION.childDob)}>
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
                  placeholder={t("CS_COMMON_WARD'")}
                  option={cmbWardNoFinal}
                  selected={marriageWardCode}
                  select={setSelectmarriageWardCode}
                  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                />
              </div>
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
                    option={cmbPlaceNameReligious.name}
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
                        // optionKey="i18nKey"
                        name="groomFirstNameEn"
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
                <MarriageAddressPage formData={navigationData}/>
              </div>
            )}
          </FormFieldContainer>
        </form>
        <BirthInclusionModal showModal={showModal} selectedConfig={selectedInclusionItem} hideModal={_hideModal} />
      </FormStep>
    </React.Fragment>
  );
};
export default MarriageInclusionEditPage;
