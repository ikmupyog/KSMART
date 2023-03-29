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

const BirthInclusionEditPage = () => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  const stateId = Digit.ULBService.getStateId();
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    hospitalCorrectionLetter: false,
  });
  const [value, setValue1] = useState(0);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  let location = useLocation();
  let navigationData = location?.state?.inclusionData;

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "BirthCorrectionDocuments",
  );
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbPlace = [];
  let menu = [];
  let cmbNation = [];
  let cmbState = [];
  let cmbfilterNation = [];
  let cmbfilterNationI = [];

    place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
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

  const [DeathPlace, setselectDeathPlace] = useState(
    formData?.InformationDeath?.DeathPlace?.code
      ? formData?.InformationDeath?.DeathPlace
      : formData?.InformationDeath?.DeathPlace
      ? cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.ChildDetails?.DeathPlace)[0]
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
    let selectedData = getFormattedBirthInclusionData(fieldId,navigationData,birthInclusionData );
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

  const onSubmit = data => console.log(data);

  const { register, handleSubmit, reset, setValue, getValues, watch, errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });


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
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormFieldContainer>
        <FieldComponentContainer>
          <div className="col-md-5">
            <CardLabel>
              {t("CR_DATE_OF_BIRTH_TIME")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              // date={childDOB}
              name="childDOB"
              // max={convertEpochToDate(new Date())}
              //min={convertEpochToDate("1900-01-01")}
              // onChange={setselectChildDOB}
              // disable={isDisableEdit}
              //  inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
              {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
            />
          </div>
        </FieldComponentContainer>
        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
            <span onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION.childDob)}>
            <EditIcon
              selected={true}
              label={"Edit"}
            />
            </span>
          </ButtonContainer>
        </div>
      </FormFieldContainer>
      <FormFieldContainer>
        <FieldComponentContainer>
          <div className="col-md-5">
            <CardLabel>
              {t("CR_AADHAR")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              isMandatory={false}
              type="number"
              max="12"
              optionKey="i18nKey"
              name="DeceasedAadharNumber"
              value={DeceasedAadharNumber}
              // onChange={setSelectDeceasedAadharNumber}
              placeholder={`${t("CR_AADHAR")}`}
              {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
              {t("CR_DATE_OF_DEATH")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              // date={DateOfDeath}
              // max={convertEpochToDate(new Date())}
              name="DateOfDeath"
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
            <CardLabel>
              {t("CR_PLACE_OF_DEATH")}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              isMandatory={false}
              option={cmbPlace}
              selected={DeathPlace}
              // select={selectDeathPlace}
              placeholder={`${t("CR_PLACE_OF_DEATH")}`}
            />
          </div>

          <div className="col-md-4">
            <CardLabel>
              {t("CR_GENDER")} <span className="mandatorycss">*</span>{" "}
            </CardLabel>
            <Dropdown
              t={t}
              optionKey="code"
              isMandatory={true}
              option={menu}
              selected={DeceasedGender}
              // select={selectDeceasedGender}
              placeholder={`${t("CR_GENDER")}`}
              // {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
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
            <CardLabel>
              {`${t("CR_SPOUSE_TYPE_EN")}`} <span className="mandatorycss">*</span>
            </CardLabel>
            <TextInput
              t={t}
              // isMandatory={false}
              type={"text"}
              // optionKey="i18nKey"
              name="DeceasedSpouseEn"
              // value={DeceasedFirstNameEn}
              // onChange={setSelectDeceasedFirstNameEn}
              placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
              // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
            />
          </div>
          <div className="col-md-4">
            <CardLabel>{`${t("CR_SPOUSE_TYPE_MAL")}`}</CardLabel>
            <TextInput
              t={t}
              // isMandatory={false}
              type={"text"}
              // optionKey="i18nKey"
              name="DeceasedSpouseMl"
              // value={DeceasedFirstNameEn}
              // onChange={setSelectDeceasedFirstNameEn}
              placeholder={`${t("CR_SPOUSE_TYPE_ML")}`}
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
      </form>
      <BirthInclusionModal showModal={showModal} selectedConfig={selectedInclusionItem} hideModal={_hideModal} />
      </FormStep>
    </React.Fragment>
  );
};
export default BirthInclusionEditPage;
