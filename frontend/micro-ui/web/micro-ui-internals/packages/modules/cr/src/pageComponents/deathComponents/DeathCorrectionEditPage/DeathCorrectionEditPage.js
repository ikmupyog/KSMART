import React, { useState, useEffect } from "react";
import {
  CardLabel,
  EditButton,
  PopUp,
  UploadFile,
  TextInput,
  DatePicker,
  Dropdown,
  FormStep,
  LinkButton,
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
import { initializedDeathCorrectionObject } from "../../../config/globalObject";
import { useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

function DeathCorrectionEditPage({ formData, isEditDeath ,cmbNation, menu, cmbPlace , BirthCorrectionDocuments,navigationData}) {
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


  let location = useLocation();

  let validation = {};

  const _hideModal = () => {
    setShowModal(false);
  };

  const FieldComponentContainer = ({ children }) => {
    return <div className="col-md-9">{children}</div>;
  };
  
  const UploadfilesConfig = [
    {
      key: "dob",
      files: [
        {
          name: "approvedPhotoId",
          title: "Any Other Govt Approved Photo Id Of The Applicant",
          isuploaded: uploadStatus.approvedPhotoId,
        },
      ],
    },
    {
      key: "ownAdhar",
    },
    {
      key: "name",
    },
  ];
 


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
    deathCorrectionFormData = await initializedDeathCorrectionObject(BirthCorrectionDocuments,navigationData);
    await setDeathCorrectionFormsObj(deathCorrectionFormData);
   console.log("deathCorrectionFormData==",deathCorrectionFormData);
 },[navigationData,BirthCorrectionDocuments])

 console.log("navigationData",navigationData);

  const setDeathCorrectionFilterQuery = (fieldId) => {
    console.log("deathCorrectionFormData--------",deathCorrectionFormsObj,fieldId);
    let selectedDeathCorrectionData = deathCorrectionFormsObj[fieldId];
    console.log("birthInclusionData",selectedDeathCorrectionData);
    setSelectedCorrectionItem(selectedDeathCorrectionData);
    setShowModal(true);
  };

  const ButtonContainer = ({children}) => {
    return <div className="col-md-3">{children}</div>;
  };

 
const onUploadDocSubmit = async (fileData) => {
    console.log("upload response==", fileData);
    let tempObj = {...deathCorrectionFormsObj};
    let {CHILD_DOB} = tempObj;
    tempObj={...tempObj,CHILD_DOB:{...CHILD_DOB,isFocused : true,isDisabled : false}};
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
    // if (formData?.ChildDetails?.medicalAttensionSub != null) {
    //   if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
    //     setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    // if (formData?.ChildDetails?.deliveryMethods != null) {
    //   if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
    //     // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
    //     setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
    //   }
    // }
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
    // console.log("gender" + value);
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

  // useEffect(() => {
  //   console.log("DeathPlace==", DeathPlace);
  // }, [DeathPlace]);

  if(Object.keys(deathCorrectionFormsObj)?.length > 0){
    console.log("deathCorrectionFormData??.curValue",deathCorrectionFormsObj?.DECEASED_FIRST_NAME);

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
                  // value={navigationData.InformantDetails.InformantAadharNo}
                  // onChange={setSelectDeceasedAadharNumber}
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
                  value={deathCorrectionFormsObj?.DECEASED_FIRST_NAME?.curValue} 
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
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedMiddleNameEn"
                  value={deathCorrectionFormData?.DECEASED_MIDDLE_NAME?.curValue} 
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
                  // value={navigationData.InformationDeath.DeceasedLastNameEn}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_EN")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            {/* <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div> */}
              <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["CHILD_NAME"])}>
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
                  // value={navigationData.InformationDeath.DeceasedMiddleNameMl}
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
                  // value={navigationData.InformationDeath.DeceasedLastNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
{/* 
            <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div> */}
            
        <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["MOTHER_DETAILS"])}>
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
                  datePickerRef={register}
                  name="DateOfDeath"
                  disabled={deathCorrectionFormsObj.CHILD_DOB?.isDisabled}
                  autofocus={deathCorrectionFormsObj.CHILD_DOB?.isFocused}
                  date={deathCorrectionFormsObj?.CHILD_DOB?.curValue} 
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
              <div className="col-md-4">
                <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
                <Dropdown
                  t={t}
                  dropdownRef={register()}
                  optionKey="name"
                  name="selectDeathPlace"
                  isMandatory={false}
                  option={cmbPlace}

                  // selected={DeathPlace}
                  // select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
                {/* <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="selectDeathPlace"
                  // value={navigationData.InformationDeath.DeathPlace}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                /> */}
              </div>

              <div className="col-md-4">
                <CardLabel>{t("CR_GENDER")}</CardLabel>
                {/* <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={navigationData.InformationDeath.DeceasedGender}
                  select={selectDeceasedGender}
                  placeholder={`${t("CR_GENDER")}`}
                  // {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                /> */}
                <TextInput
                  t={t}
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="selectDeceasedGender"
                  // value={navigationData.InformationDeath.DeceasedGender}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            {/* <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div> */}
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
                  // value={navigationData.FamilyInformationDeath.MotherNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            {/* <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"}  style={{}} />}
                style={{ width: "100px", display: "inline"}}
                onClick={() => {
                  setShowModal(true);
                }}                        
              />
            </div> */}
              {/* <div style={{ marginTop: "2.8rem" }}>
          <ButtonContainer>
          <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["MOTHER_DETAILS"])}>
            <EditButton
              selected={true}
              label={"Edit"}
            />
            </span>
          </ButtonContainer>
        </div> */
        <div style={{ marginTop: "2.8rem" }}>
        <ButtonContainer>
        <span  onClick={()=> setDeathCorrectionFilterQuery(DEATH_CORRECTION_FIELD_NAMES["FATHER_DETAILS"])}>
          <EditIcon
            selected={true}
            label={"Edit"}
          />
          </span>
        </ButtonContainer>
      </div>}
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
                  // value={navigationData.FamilyInformationDeath.FatherNameEn}
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
                  // value={navigationData.FamilyInformationDeath.FatherNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_FATHER_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>

            <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
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
                  // value={navigationData.FamilyInformationDeath.SpouseNameEn}
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
                  // value={navigationData.FamilyInformationDeath.SpouseNameML}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_SPOUSE_TYPE_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
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
                  // value={navigationData.AddressBirthDetails.PermanentAddrHoueNameEn}
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
                  // value={navigationData.AddressBirthDetails.PermanentAddrLocalityEn}
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
                  // value={navigationData.AddressBirthDetails.PermanentAddrStreetNameEn}
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
                  inputRef={register({})}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="DeceasedHouseNameMl"
                  // value={navigationData.AddressBirthDetails.PermanentAddrHoueNameMl}
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
                  // value={navigationData.AddressBirthDetails.PermanentAddrLocalityMl}
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
                  // value={navigationData.AddressBirthDetails.PermanentAddrStreetNameMl}
                  // onChange={setSelectDeceasedFirstNameEn}
                  placeholder={`${t("CR_STREET_MAL")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
            </FieldComponentContainer>
            <div style={{ marginTop: "2.8rem" }}>
              <LinkButton
                label={<EditIcon selected={true} label={"Edit"} />}
                style={{ width: "100px", display: "inline" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
          </FormFieldContainer>
          {/* {showModal && (
      <PopUp>
        <div className="popup-module">
          <h1>populated modal</h1>
          <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              message={`${t(`TL_ACTION_FILEUPLOADED`)}`}
              // error={error}
            />
          <EditButton
          selected={true}
          label={"Cancel"}
          onClick={() => {
            setShowModal(false);
          }}
        />
        </div>
      </PopUp>
    )} */}
        </form>
        <DeathCorrectionModal showModal={showModal} selectedConfig={selectedCorrectionItem}  onSubmit={onUploadDocSubmit} hideModal={_hideModal}/>
      </FormStep>
    </React.Fragment>
  );
    } else{
      return (<Loader/>)
    }
  };
 
export default DeathCorrectionEditPage;
