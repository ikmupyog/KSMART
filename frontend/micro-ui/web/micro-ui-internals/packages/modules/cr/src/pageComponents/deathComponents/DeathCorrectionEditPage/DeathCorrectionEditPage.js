import React, { useState, useEffect } from "react";
import {
  CardLabel,
  TextInput,
  DatePicker,
  Dropdown,
  FormStep,
  LinkButton,
  EditButton,
  BackButton,
  EditIcon,
  Loader,
} from "@egovernments/digit-ui-react-components";
import FormFieldContainer from "../../../components/FormFieldContainer";
import { useTranslation } from "react-i18next";
import Hospital from "../Hospital";
import Institution from "../Institution";
import DeathPlaceHome from "../DeathPlaceHome";
import DeathPlaceVehicle from "../DeathPlaceVehicle";
import DeathPublicPlace from "../DeathPublicPlace";
import DeathOutsideJurisdiction from "../DeathOutsideJurisdiction ";
import DeathCorrectionModal from "../../../components/DeathCorrectionModal";
import { DEATH_CORRECTION_FIELD_NAMES } from "../../../config/constants";
import { initializedDeathCorrectionObject } from "../../../business-objects/globalObject";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { convertEpochToDate  } from "../../../utils";
import { useForm } from "react-hook-form";
import { formatApiParams } from "../../../utils/birthInclusionParams";

function DeathCorrectionEditPage({ formData, isEditDeath ,cmbNation, menu, cmbPlace , DeathCorrectionDocuments ,navigationData}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const [uploadStatus, setUploadStatus] = useState({
    approvedPhotoId: false,
  });
  const [selectedCorrectionItem, setSelectedCorrectionItem] = useState([]);
  
  let deathCorrectionFormData = {};
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [value, setValue1] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);
  const [isInitialMdmsServiceCompleted, setIsInitialMdmsServiceCompleted] = useState(false);
  const [deathCorrectionFormsObj, setDeathCorrectionFormsObj] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  let validation = {};
  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-9">{children}</div>;
  };
 
  const { data: Menu, isLoading: genderLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType")

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
    : "");

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
console.log("menu---", menu);
  // Home
  const [DeathPlaceHomePostofficeId, setDeathPlaceHomepostofficeId] = useState(
    formData?.InformationDeath?.DeathPlaceHomePostofficeId ? formData?.InformationDeath?.DeathPlaceHomePostofficeId : null
  );
  const [DeathPlaceHomepincode, setDeathPlaceHomepincode] = useState(
    formData?.InformationDeath?.DeathPlaceHomepincode ? formData?.InformationDeath?.DeathPlaceHomepincode : null
  );

  const [DeathPlaceHomeHoueNameEn, setDeathPlaceHomehoueNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeHoueNameEn ? formData?.InformationDeath?.DeathPlaceHomeHoueNameEn : null
  );
  const [DeathPlaceHomeLocalityEn, setDeathPlaceHomelocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityEn ? formData?.InformationDeath?.DeathPlaceHomeLocalityEn : null
  );
  const [DeathPlaceHomeLocalityMl, setDeathPlaceHomelocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeLocalityMl ? formData?.InformationDeath?.DeathPlaceHomeLocalityMl : null
  );
  const [DeathPlaceHomeStreetNameEn, setDeathPlaceHomestreetNameEn] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameEn ? formData?.InformationDeath?.DeathPlaceHomeStreetNameEn : null
  );
  const [DeathPlaceHomeStreetNameMl, setDeathPlaceHomestreetNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeStreetNameMl ? formData?.InformationDeath?.DeathPlaceHomeStreetNameMl : null
  );
  const [DeathPlaceHomeHoueNameMl, setDeathPlaceHomehoueNameMl] = useState(
    formData?.InformationDeath?.DeathPlaceHomeHoueNameMl ? formData?.InformationDeath?.DeathPlaceHomeHoueNameMl : null
  );
  //Vehicle home OutsideJurisdiction{DeathPlaceWardId} Publicplace OutsideJurisdiction {GeneralRemarks} Publicplace {DeathPlaceWardId}
  //
  const [VehicleNumber, setVehicleNumber] = useState(formData?.InformationDeath?.VehicleNumber);
  const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.InformationDeath?.VehicleFromplaceEn);
  const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.InformationDeath?.VehicleToPlaceEn);
  const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.InformationDeath?.VehicleFromplaceMl);
  const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.InformationDeath?.VehicleToPlaceMl);
  const [GeneralRemarks, setGeneralRemarks] = useState(formData?.InformationDeath?.GeneralRemarks);
  const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.InformationDeath?.VehicleFirstHaltEn);
  const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.InformationDeath?.VehicleFirstHaltMl);
  const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.InformationDeath?.VehicleHospitalEn);
  const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData?.InformationDeath?.DeathPlaceWardId);
  //Public Place

  const [DeathPlaceLocalityEn, setDeathPlaceLocalityEn] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityEn ? formData?.InformationDeath?.DeathPlaceLocalityEn : ""
  );
  const [DeathPlaceLocalityMl, setDeathPlaceLocalityMl] = useState(
    formData?.InformationDeath?.DeathPlaceLocalityMl ? formData?.InformationDeath?.DeathPlaceLocalityMl : ""
  );
  const [DeathPlaceStreetEn, setDeathPlaceStreetEn] = useState(
    formData?.InformationDeath?.DeathPlaceStreetEn ? formData?.InformationDeath?.DeathPlaceStreetEn : ""
  );
  const [DeathPlaceStreetMl, setDeathPlaceStreetMl] = useState(
    formData?.InformationDeath?.DeathPlaceStreetMl ? formData?.InformationDeath?.DeathPlaceStreetMl : ""
  );
  //DeathOutsideJurisdiction
  const [DeathPlaceCountry, setSelectDeathPlaceCountry] = useState(formData?.InformationDeath?.DeathPlaceCountry);
  const [DeathPlaceState, SelectDeathPlaceState] = useState(formData?.InformationDeath?.DeathPlaceState);
  const [DeathPlaceDistrict, SelectDeathPlaceDistrict] = useState(formData?.InformationDeath?.DeathPlaceDistrict);
  const [DeathPlaceCity, SelectDeathPlaceCity] = useState(formData?.InformationDeath?.DeathPlaceCity);
  const [DeathPlaceRemarksEn, SelectDeathPlaceRemarksEn] = useState(formData?.InformationDeath?.DeathPlaceRemarksEn);
  const [DeathPlaceRemarksMl, SelectDeathPlaceRemarksMl] = useState(formData?.InformationDeath?.DeathPlaceRemarksMl);
  const [PlaceOfBurialEn, SelectPlaceOfBurialEn] = useState(formData?.InformationDeath?.PlaceOfBurialEn);
  const [PlaceOfBurialMl, SelectPlaceOfBurialMl] = useState(formData?.InformationDeath?.PlaceOfBurialMl);

  const [AadharError, setAadharError] = useState(formData?.InformationDeath?.DeceasedAadharNumber ? false : false);


  
  useEffect(async()=>{
    deathCorrectionFormData = await initializedDeathCorrectionObject(DeathCorrectionDocuments,navigationData);
    await setDeathCorrectionFormsObj(deathCorrectionFormData);

 },[navigationData,DeathCorrectionDocuments])


  const setDeathCorrectionFilterQuery = (fieldId) => {
    
    let selectedDeathCorrectionData = deathCorrectionFormsObj[fieldId];

    setSelectedCorrectionItem(selectedDeathCorrectionData);
    setShowModal(true);
  };

  const ButtonContainer = ({children}) => {
    return <div className="col-md-3">{children}</div>;
  };

 
    const onUploadDocSubmit = async (fileData, error) => {
      console.log("upload response==", fileData);
      if (fileData && fileData?.length > 0) {
        const selectedDocIds = fileData.map((item) => item.documentId);
        setSelectedDocs(selectedDocIds);
      }
      selectedDocs;
      let tempObj = { ...deathCorrectionFormsObj };
      let { CHILD_DOB } = tempObj;
      tempObj = { ...tempObj, CHILD_DOB: { ...CHILD_DOB, Documents: fileData, isFocused: true, isDisabled: false } };
  
      setDeathCorrectionFormsObj(tempObj);
      setShowModal(false);
    };
  

  if (
    isEditDeath &&
    isEditDeathPageComponents === false &&
    (formData?.InformationDeath?.IsEditChangeScreen === false || formData?.InformationDeath?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.InformationDeath?.DeceasedGender != null) {
      if (menu.length > 0 && (DeceasedGender === undefined || DeceasedGender === "")) {
        setselectedDeceasedGender(menu.filter((menu) => menu.code === formData?.InformationDeath?.DeceasedGender)[0]);
      }
    }
    if (formData?.InformationDeath?.DeathPlace != null) {
      if (cmbPlace.length > 0 && (DeathPlace === undefined || DeathPlace === "")) {
        setselectDeathPlace(cmbPlace.filter((cmbPlace) => cmbPlace.code === formData?.InformationDeath?.DeathPlace)[0]);
        setValue(formData?.InformationDeath?.DeathPlace);
      }
    }
  }
  function setSelectDeceasedAadharNumber(e) {
    if (e.target.value.trim().length >= 0) {
      setDeceasedAadharNumber(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function selectNationality(value) {
    setSelectedNationality(value);
  }
  function selectDeceasedGender(value) {
    setselectedDeceasedGender(value);
  }
  function selectDeathPlace(value) {
    setselectDeathPlace(value);
    setValue(value.code);

    let currentWorkFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.DeathPlace === value.code &&
        workFlowData.startdateperiod <= Difference_In_DaysRounded &&
        workFlowData.enddateperiod >= Difference_In_DaysRounded
    );
    workFlowCode = currentWorkFlow[0].WorkflowCode;
    if (value.code === "HOSPITAL") {
      //Institution
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      // setIsInitialRenderInstitutionList
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //Vehicle
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setGeneralRemarks(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    } else if (value.code === "INSTITUTION") {
      //Hospital
      selectHospitalNameMl(null);
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //Vehicle
      selectDeathPlaceType(null);
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setGeneralRemarks(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    } else if (value.code === "VEHICLE") {
      //Hospital
      // selectDeathPlaceType(null);
      selectHospitalNameMl(null);
      //Institution
      selectDeathPlaceType(null);
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setDeathPlaceWardId(null);
      setPostOfficevalues(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      setGeneralRemarks(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
    }
    if (value.code === "PUBLIC_PLACES") {
      //Hospital
      selectDeathPlaceType(null);
      selectHospitalNameMl(null);
      //Institution
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      // setIsInitialRenderInstitutionList
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setPostOfficevalues(null);
      //Vehicle
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      setDeathPlaceWardId(null);
      //DeathOutsideJurisdiction
      setSelectDeathPlaceCountry(null);
      SelectDeathPlaceState(null);
      SelectDeathPlaceDistrict(null);
      SelectDeathPlaceCity(null);
      SelectDeathPlaceRemarksEn(null);
      SelectDeathPlaceRemarksMl(null);
      SelectPlaceOfBurialEn(null);
      SelectPlaceOfBurialMl(null);
      setGeneralRemarks(null);
    }
    if (value.code === "OUTSIDE_JURISDICTION") {
      //Hospital
      // selectDeathPlaceType(null);
      selectHospitalNameMl(null);
      //Institution
      setSelectedDeathPlaceInstId(null);
      setInstitutionIdMl(null);
      setInstitutionFilterList(null);
      // setIsInitialRenderInstitutionList
      //Home
      setDeathPlaceHomepostofficeId(null);
      setDeathPlaceHomepincode(null);
      setDeathPlaceHomehoueNameEn(null);
      setDeathPlaceHomehoueNameMl(null);
      setDeathPlaceHomelocalityEn(null);
      setDeathPlaceHomelocalityMl(null);
      setDeathPlaceHomestreetNameEn(null);
      setDeathPlaceHomestreetNameMl(null);
      setPostOfficevalues(null);
      //Vehicle
      setVehicleNumber(null);
      setVehicleFromplaceEn(null);
      setVehicleToPlaceEn(null);
      setVehicleFirstHaltEn(null);
      setVehicleFirstHaltMl(null);
      setSelectedVehicleHospitalEn(null);
      setVehicleFromplaceMl(null);
      setVehicleToPlaceMl(null);
      //PublicPlace
      setDeathPlaceLocalityEn(null);
      setDeathPlaceLocalityMl(null);
      setDeathPlaceStreetEn(null);
      setDeathPlaceStreetMl(null);
      setGeneralRemarks(null);
      setDeathPlaceWardId(null);
    }
  }
  React.useEffect(() => {
    if (isInitialRenderDeathPlace) {
      if (DeathPlace) {
        setIsInitialRender(false);
        naturetype = DeathPlace.code;
        setValue(naturetype);
        if (naturetype === "HOSPITAL") {
          <Hospital DeathPlaceType={DeathPlaceType} HospitalNameMl={HospitalNameMl} />;
        }
        if (naturetype === "INSTITUTION") {
          <Institution
            DeathPlaceType={DeathPlaceType}
            DeathPlaceInstId={DeathPlaceInstId}
            InstitutionIdMl={InstitutionIdMl}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (naturetype === "HOME") {
          <DeathPlaceHome
            DeathPlaceWardId={DeathPlaceWardId}
            DeathPlaceType={DeathPlaceType}
            DeathPlaceHomePostofficeId={DeathPlaceHomePostofficeId}
            DeathPlaceHomepincode={DeathPlaceHomepincode}
            DeathPlaceHomeHoueNameEn={DeathPlaceHomeHoueNameEn}
            DeathPlaceHomeHoueNameMl={DeathPlaceHomeHoueNameMl}
            DeathPlaceHomeLocalityEn={DeathPlaceHomeLocalityEn}
            DeathPlaceHomeLocalityMl={DeathPlaceHomeLocalityMl}
            DeathPlaceHomeStreetNameEn={DeathPlaceHomeStreetNameEn}
            DeathPlaceHomeStreetNameMl={DeathPlaceHomeStreetNameMl}
            PostOfficevalues={PostOfficevalues}
          />;
        }
        if (naturetype === "VEHICLE") {
          <DeathPlaceVehicle
            DeathPlaceType={DeathPlaceType}
            VehicleNumber={VehicleNumber}
            VehicleFromplaceEn={VehicleFromplaceEn}
            VehicleToPlaceEn={VehicleToPlaceEn}
            GeneralRemarks={GeneralRemarks}
            VehicleFirstHaltEn={VehicleFirstHaltEn}
            VehicleFirstHaltMl={VehicleFirstHaltMl}
            VehicleHospitalEn={VehicleHospitalEn}
            DeathPlaceWardId={DeathPlaceWardId}
            VehicleFromplaceMl={VehicleFromplaceMl}
            VehicleToPlaceMl={VehicleToPlaceMl}
          />;
        }
        if (naturetype === "PUBLIC_PLACES") {
          <DeathPublicPlace
            DeathPlaceType={DeathPlaceType}
            DeathPlaceLocalityEn={DeathPlaceLocalityEn}
            DeathPlaceLocalityMl={DeathPlaceLocalityMl}
            DeathPlaceStreetEn={DeathPlaceStreetEn}
            DeathPlaceStreetMl={DeathPlaceStreetMl}
            DeathPlaceWardId={DeathPlaceWardId}
            GeneralRemarks={GeneralRemarks}
          />;
        }
        if (naturetype === "OUTSIDE_JURISDICTION") {
          <DeathOutsideJurisdiction
            DeathPlaceCountry={DeathPlaceCountry}
            DeathPlaceState={DeathPlaceState}
            DeathPlaceDistrict={DeathPlaceDistrict}
            DeathPlaceCity={DeathPlaceCity}
            DeathPlaceRemarksEn={DeathPlaceRemarksEn}
            DeathPlaceRemarksMl={DeathPlaceRemarksMl}
            PlaceOfBurialMl={PlaceOfBurialMl}
            PlaceOfBurialEn={PlaceOfBurialEn}
            GeneralRemarks={GeneralRemarks}
            DeathPlaceWardId={DeathPlaceWardId}
          />;
        }
      }
    }
  }, [isInitialRenderDeathPlace]);

  const onSubmit = (data) => console.log(data);

  const { register, handleSubmit, control, reset, setValue, getValues, watch, errors } = useForm({
    reValidateMode: "onSubmit",
    mode: "all",
  });

  useEffect(()=>{
    if(cmbPlace?.length > 0){
      console.log("cmbplace==",cmbPlace);
      setIsInitialMdmsServiceCompleted(true);
    }
  },[cmbPlace])

  const getDeathPlace = () => {
    const selectedDeathPlace = cmbPlace.find((item) => item.code === navigationData?.InformationDeath?.DeathPlace);
    console.log("selectedDeathPlace", selectedDeathPlace, navigationData?.InformationDeath?.DeathPlace, cmbPlace);
    return selectedDeathPlace;
  };
  console.log(cmbPlace);

  const onDodChange = (value) => {
    console.log("value==",value);
    let tempObj = {...deathCorrectionFormsObj };
    let { CHILD_DOB } = tempObj;
    tempObj = { ...tempObj, CHILD_DOB: { ...CHILD_DOB,curValue: value && moment(value,"YYYY-MM-DD").format("DD/MM/YYYY")} };
    setDeathCorrectionFormsObj(tempObj);
  };


  const onSubmitDeathCorrection = () => {
    const formattedResp = formatApiParams(deathCorrectionFormsObj);
    console.log("formattedResp", formattedResp);
  };

  if(Object.keys(deathCorrectionFormsObj)?.length > 0){
    console.log("deathCorrectionFormData??.curValue",deathCorrectionFormsObj?.PLACE_OF_DEATH?.curValue);

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep
       t={t}
        >
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12 mystyle">
              <h1 className="headingh1 hstyle">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CORRECTION_NAME_DECEASED")}`}</span>{" "}
              </h1>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldContainer>
            <FieldComponentContainer>
              <div className="col-md-5">
                <CardLabel>{t("CR_AADHAR")}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  optionKey="i18nKey"
                  name="DeceasedAadharNumber"
                  value={deathCorrectionFormData?.DECEASED_AADHAR?.curValue} 
                  placeholder={`${t("CR_AADHAR")}`}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
            <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["CHILD_DOB"])}>
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
                <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameEn"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_EN?.curValue.firstName} 
                  placeholder={`${t("CR_FIRST_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameEn"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_EN?.curValue.middleName} 
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
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameEn"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_EN?.curValue.lastName} 
                  // value={navigationData.InformationDeath.DeceasedLastNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_NAME_EN"])}>
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
                <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFirstNameMl"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_ML?.curValue.firstName} 
                  // value={navigationData.InformationDeath.DeceasedFirstNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FIRST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameMl"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_ML?.curValue.middleName} 
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
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLastNameMl"
                  value={deathCorrectionFormsObj?.DECEASED_NAME_ML?.curValue.lastName} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>           
        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["DECEASED_NAME_ML"])}>
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
                <CardLabel>{t("CR_DATE_OF_DEATH")}</CardLabel>
                <DatePicker
                  // {...register('DateOfDeath')}
                  // datePickerRef={register}
                  name="dateOfDeath"
                  disabled={deathCorrectionFormsObj.CHILD_DOB?.isDisabled}
                  autofocus={deathCorrectionFormsObj.CHILD_DOB?.isFocused}
                  date={deathCorrectionFormsObj?.CHILD_DOB?.curValue}
                  max={convertEpochToDate(new Date())}
                  min={convertEpochToDate("1900-01-01")} 
                  onChange={onDodChange}
                  // max={convertEpochToDate(new Date())}
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
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["CHILD_DOB"])}>
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
                <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
                <Dropdown
                  t={t}
                  // dropdownRef={register()}
                  optionKey="name"
                  name="DeathPlace"
                  isMandatory={false}
                  option={cmbPlace}
                  disabled={deathCorrectionFormsObj.PLACE_OF_DEATH?.isDisabled}
                  autofocus={deathCorrectionFormsObj.PLACE_OF_DEATH?.isFocused}
                  // select={deathCorrectionFormsObj?.PLACE_OF_DEATH?.curValue} 
                  selected={cmbPlace.find((item) => item.code === deathCorrectionFormsObj?.PLACE_OF_DEATH?.curValue)}
                  // select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["PLACE_OF_DEATH"])}>
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
                <CardLabel>{t("CR_GENDER")}</CardLabel>
                <Dropdown
                  t={t}
                   // inputRef={register({})}
                  isMandatory={false}
                  optionKey="code"
                  name="DeceasedGender"
                  option={menu}
                  disabled={deathCorrectionFormsObj.GENDER?.isDisabled}
                  autofocus={deathCorrectionFormsObj.GENDER?.isFocused}
                  select={deathCorrectionFormsObj?.GENDER?.curValue}  
                  selected={menu.find((item) => item.code === deathCorrectionFormsObj?.GENDER?.curValue)}
                  // value={navigationData.InformationDeath.DeceasedGender}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_GENDER")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["GENDER"])}>
            <EditIcon
              selected={true}
              label={"Edit"}
            />
            </span> 
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
                <CardLabel>{`${t("CR_MOTHER_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMotherNameEn"
                  // value={navigationData.FamilyInformationDeath.MotherNameEn}
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
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMotherNameMl"
                  value={deathCorrectionFormsObj?.MOTHERS_NAME?.curValue.mothersNameEn} 
                  // value={navigationData.FamilyInformationDeath.MotherNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
        <div style={{ marginTop: "2.8rem" }}>
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["MOTHERS_NAME"])}>
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
                <CardLabel>{`${t("CR_FATHER_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFatherNameEn"
                  value={deathCorrectionFormsObj?.FATHERS_NAME?.curValue.mothersNameMl} 
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
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedFatherNameMl"
                  value={deathCorrectionFormsObj?.FATHERS_NAME?.curValue.fathersNameMl} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FATHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["FATHERS_NAME"])}>
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
                <CardLabel>{`${t("CR_SPOUSE_TYPE_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedSpouseEn"
                  value={deathCorrectionFormsObj?.SPOUSE_NAME?.curValue.spouseNameEn} 
                 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_SPOUSE_TYPE_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("CR_SPOUSE_TYPE_MAL")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedSpouseMl"
                  value={deathCorrectionFormsObj?.SPOUSE_NAME?.curValue.spouseNameMl} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_SPOUSE_TYPE_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["SPOUSE_NAME"])}>
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
              <div className="col-md-6">
                <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedHouseNameEn"
                  disabled={deathCorrectionFormsObj.ADDRESS_EN?.isDisabled}
                  autofocus={deathCorrectionFormsObj.ADDRESS_EN?.isFocused}
                  value={deathCorrectionFormsObj?.ADDRESS_EN?.curValue.houseNameEn} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_HOUSE_NO_AND_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLocalityEn"
                  disabled={deathCorrectionFormsObj.ADDRESS_EN?.isDisabled}
                  autofocus={deathCorrectionFormsObj.ADDRESS_EN?.isFocused}
                  value={deathCorrectionFormsObj?.ADDRESS_EN?.curValue.localityNameEn} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LOCALITY_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_STREET_EN")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedStreet"
                  disabled={deathCorrectionFormsObj.ADDRESS_EN?.isDisabled}
                  autofocus={deathCorrectionFormsObj.ADDRESS_EN?.isFocused}
                  value={deathCorrectionFormsObj?.ADDRESS_EN?.curValue.streetNameEn} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_STREET_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              </FieldComponentContainer>
              <div style={{ marginTop: "2.8rem" }}>
             
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["ADDRESS_EN"])}>
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
              <div className="col-md-6">
                <CardLabel>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedHouseNameMl"
                  value={deathCorrectionFormsObj?.ADDRESS_ML?.curValue.houseNameMl} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_LOCALITY_MAL")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedLocalityMl"
                  value={deathCorrectionFormsObj?.ADDRESS_ML?.curValue.localityNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LOCALITY_MAL")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_STREET_MAL")}`}</CardLabel>
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedStreetMl"
                  value={deathCorrectionFormsObj?.ADDRESS_ML?.curValue.streetNameMl} 
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_STREET_MAL")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["ADDRESS_ML"])}>
          <EditIcon
            selected={true}
            label={"Edit"}
          />
          </span>
        </ButtonContainer>
      </div>
          </FormFieldContainer>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}></div>
            <FormFieldContainer>
              <FieldComponentContainer></FieldComponentContainer>
              <ButtonContainer>
                <div style={{ marginTop: "2.8rem" }}>
                  <span onClick={onSubmitDeathCorrection}>
                    <EditButton selected={true} label={"Submit"} />
                  </span>
                </div>
              </ButtonContainer>
            </FormFieldContainer>
        </form>
        <DeathCorrectionModal 
        showModal={showModal} 
        selectedConfig={selectedCorrectionItem}  
        onSubmit={onUploadDocSubmit} 
        hideModal={_hideModal}
        selectedDocs={selectedDocs}
        />
      </FormStep>
    </React.Fragment>
  );
    } else{
      return (<Loader/>)
    }
  };
 
export default DeathCorrectionEditPage;
