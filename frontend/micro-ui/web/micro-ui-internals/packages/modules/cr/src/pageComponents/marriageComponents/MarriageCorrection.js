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
import CustomTimePicker from "../../components/CustomTimePicker";
import FormFieldContainer from "../../components/FormFieldContainer";
import BirthInclusionModal from "../../components/BirthInclusionModal";
import { BIRTH_INCLUSION } from "../../config/constants";
import { getBirthInclusionObject } from "../../config/globalObject";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { getFormattedBirthInclusionData } from "../../config/utils";

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
  let navigationData = location?.state?.inclusionData;

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

  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      // console.log(ob);
      // if(ob?.boundary){
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
      return { padding: "20px", border: "0", opacity: "0.6", cursor: "pointer", color: "blue", fontWeight: "bold"};
    } else {
      return { padding: "20px", border: "0", opacity: "0.6", cursor: "pointer", fontWeight: "bold" };
    }
  };

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
                  name="MarriageDOM"
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
              {types.map((type,index) => (
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFirstNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMiddleNameEn"
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
                        name="DeceasedLastNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFirstNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMiddleNameMl"
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
                        name="DeceasedLastNameMl"
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
                        name="DateOfBirth"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMotherNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMotherNameMl"
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
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedHouseNameEn"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="DeceasedLocalityEn"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="DeceasedStreet"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_STREET_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedHouseNameMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedLocalityMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LOCALITY_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedStreetMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_STREET_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      {" "}
                      <EditButton
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
                    <div className="col-md-3">
                      <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedCountry"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_COUNTRY")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_BIRTH_PERM_STATE_LABEL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedState"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_BIRTH_PERM_STATE_LABEL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{`${t("CR_BIRTH_PERM_DISTRICT_LABEL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedDISTRICT"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_BIRTH_PERM_DISTRICT_LABEL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{t("CS_COMMON_VILLAGE")}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedTown"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_VILLAGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{t("CS_COMMON_LB_NAME")}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedLocalBody"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_LB_NAME")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
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
                      <CardLabel>
                        {`${t("CR_FIRST_NAME_EN")}`} <span className="mandatorycss">*</span>
                      </CardLabel>
                      <TextInput
                        t={t}
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMiddleNameEn"
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
                        name="DeceasedLastNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFirstNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMiddleNameMl"
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
                        name="DeceasedLastNameMl"
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
                        name="DateOfBirth"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMotherNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedMotherNameMl"
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
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameEn"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedFatherNameMl"
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
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedHouseNameEn"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="DeceasedLocalityEn"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
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
                        name="DeceasedStreet"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_STREET_EN")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
                <FormFieldContainer>
                  <FieldComponentContainer>
                    <div className="col-md-6">
                      <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedHouseNameMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedLocalityMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_LOCALITY_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedStreetMl"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_STREET_MAL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                  <div style={{ marginTop: "2.8rem" }}>
                    <ButtonContainer>
                      {" "}
                      <EditButton
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
                    <div className="col-md-3">
                      <CardLabel>{`${t("CS_COMMON_COUNTRY")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedCountry"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_COUNTRY")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_BIRTH_PERM_STATE_LABEL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedState"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_BIRTH_PERM_STATE_LABEL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{`${t("CR_BIRTH_PERM_DISTRICT_LABEL")}`}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedDISTRICT"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CR_BIRTH_PERM_DISTRICT_LABEL")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{t("CS_COMMON_VILLAGE")}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedTown"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_VILLAGE")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                    <div className="col-md-2">
                      <CardLabel>{t("CS_COMMON_LB_NAME")}</CardLabel>
                      <TextInput
                        t={t}
                        // isMandatory={false}
                        type={"text"}
                        // optionKey="i18nKey"
                        name="DeceasedLocalBody"
                        // value={DeceasedFirstNameEn}
                        // onChange={setSelectDeceasedFirstNameEn}
                        placeholder={`${t("CS_COMMON_LB_NAME")}`}
                        // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                      />
                    </div>
                  </FieldComponentContainer>
                </FormFieldContainer>
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
