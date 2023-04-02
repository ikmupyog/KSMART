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
import { initializeBirthInclusionObject } from "../../../config/globalObject";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import moment from 'moment';
let birthInclusionFormData = {};
const BirthInclusionEditPage = ({cmbNation, menu, cmbPlace ,BirthCorrectionDocuments,navigationData}) => {
  
  let formData = {};
  let validation = {};
  let birthInclusionFormData = {};
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showModal, setShowModal] = useState(false);
  const [birthInclusionFormsObj, setbirthInclusionFormsObj] = useState(false);
  // const [isDisabled,setDisabled] = useState(false);
  // const [uploadStatus, setUploadStatus] = useState({
  //   hospitalCorrectionLetter: false,
  // });
  const [value, setValue] = useState(0);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  // let location = useLocation();
  // let navigationData = location?.state?.inclusionData;
  

  useEffect(async()=>{
     birthInclusionFormData = await initializeBirthInclusionObject(BirthCorrectionDocuments,navigationData);
     await setbirthInclusionFormsObj(birthInclusionFormData);
    console.log("birthInclusionFormData==",birthInclusionFormData);
  },[navigationData,BirthCorrectionDocuments])



console.log("navigationData",navigationData);

  const setBirthInclusionFilterQuery = (fieldId) => {
    console.log("birthInclusionFormData--------",birthInclusionFormData,fieldId);
    let selectedBirthInclusionData = birthInclusionFormData[fieldId];
    console.log("birthInclusionData",selectedBirthInclusionData);
    setSelectedInclusionItem(selectedBirthInclusionData);
    setShowModal(true);
  };

  const FieldComponentContainer = ({children}) => {
    return <div className="col-md-9">{children}</div>;
  };

  const ButtonContainer = ({children}) => {
    return <div className="col-md-3">{children}</div>;
  };

 

  const onUploadDocSubmit = async(fileData) =>{
    
   console.log("upload response==",fileData);
  }

  const { register,control, handleSubmit, reset, getValues, watch,setFocus , errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
    defaultValues: {
      childDob: "22/03/1993",
      DeceasedAadharNumber: "",
      limit: 10,
      sortBy: "DateOfDeath",
      sortOrder: "DESC",
    },
  });

  const _hideModal = () => {
    setShowModal(false);
  };

  const onSubmit = data =>{ console.log(data) };

if(Object.keys(birthInclusionFormsObj)?.length > 0){
  console.log("birthInclusionFormData??.curValue",birthInclusionFormData.CHILD_DOB);
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
                  // {...register('childDOB')}
                  datePickerRef ={register}
                  name="childDOB"
                  // disabled={isDisabled}
                  // date={moment().format('YYYY-MM-DD')}
                  // max={convertEpochToDate(new Date())}
                  //min={convertEpochToDate("1900-01-01")}
                  // onChange={setselectChildDOB}
                  // disable={true}
                  //  inputFormat="DD-MM-YYYY"
                  // inputRef={register}
                  date={birthInclusionFormData?.CHILD_DOB?.curValue} 
                  // onChange={props.onChange}
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
           {/* }
                name="MarriageDate"
                control={control}
            /> */}
             
          </div>
        </FieldComponentContainer>
        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
            <span  onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_DOB"])}>
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
              // type="number"
              inputRef={register}
              max="12"
              optionKey="i18nKey"
              name="AadharNumber"
              // value={DeceasedAadharNumber}
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
          <span  onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["CHILD_NAME"])}>
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
            />
          </ButtonContainer>
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
            <EditIcon
              selected={true}
              label={"Edit"}
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
              name="MotherNameEn"
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
              name="MotherNameMl"
              // value={DeceasedFirstNameEn}
              // onChange={setSelectDeceasedFirstNameEn}
              placeholder={`${t("CR_MOTHER_NAME_ML")}`}
              // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
            />
          </div>
        </FieldComponentContainer>

        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["MOTHER_DETAILS"])}>
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
              name="FatherNameMl"
              // value={DeceasedFirstNameEn}
              // onChange={setSelectDeceasedFirstNameEn}
              placeholder={`${t("CR_FATHER_NAME_ML")}`}
              // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
            />
          </div>
        </FieldComponentContainer>

        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["FATHER_DETAILS"])}>
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
          <span  onClick={()=> setBirthInclusionFilterQuery(BIRTH_INCLUSION_FIELD_NAMES["MOTHER_DETAILS"])}>
            <EditButton
              selected={true}
              label={"Edit"}
            />
            </span>
          </ButtonContainer>
        </div>
      </FormFieldContainer>
      </form>
      <BirthInclusionModal showModal={showModal} selectedConfig={selectedInclusionItem} onSubmit={onUploadDocSubmit} hideModal={_hideModal} />
      </FormStep>
    </React.Fragment>
  );
  } else{
    return (<Loader/>)
  }
};
export default BirthInclusionEditPage;
