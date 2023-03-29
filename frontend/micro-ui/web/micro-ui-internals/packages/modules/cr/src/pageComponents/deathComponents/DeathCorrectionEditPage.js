import React, { useState, useEffect } from 'react'
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
  EditIcon,
} from "@egovernments/digit-ui-react-components";
import FormFieldContainer from "../../components/FormFieldContainer";
import { useTranslation } from "react-i18next";
import Hospital from "./Hospital";
import Institution from "./Institution";
import DeathPlaceHome from "./DeathPlaceHome";
import DeathPlaceVehicle from "./DeathPlaceVehicle";
import DeathPublicPlace from "./DeathPublicPlace";
import DeathOutsideJurisdiction from "./DeathOutsideJurisdiction ";
import CustomTimePicker from "../../components/CustomTimePicker";
import DeathCorrectionModal from "../../components/DeathCorrectionModal";

function DeathCorrectionEditPage({formData, isEditDeath}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const [uploadStatus,setUploadStatus] = useState({
    approvedPhotoId: false
  });
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [value, setValue] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderDeathPlace, setIsInitialRenderDeathPlace] = useState(true);

  let validation = {};
  
  const FieldComponentContainer = (props) =>{
    return(
      <div className="col-md-9">
        {props.children}
      </div>
    )
  };
  const onSkip = () => onSelect();
  const ButtonContainer = (props) =>{
    return(
      <div className="col-md-3">
        {props.children}
      </div>
    )
  }
  
    const UploadfilesConfig= [
      {
        key: "dob",
        files:[
           { 
           name:"approvedPhotoId",
           title: "Any Other Govt Approved Photo Id Of The Applicant",
           isuploaded: uploadStatus.approvedPhotoId
          }
        ]
      },
      {
        key: "ownAdhar"
      },
      {
        key: "name"
      }
    ];
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
      formData?.  InformationDeathails?.HospitalNameMl?.code
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

    useEffect(() => {
      if (isInitialRender) {
        if (Nationality == null || Nationality == "") {
          if (stateId === "kl" && cmbNation.length > 0) {
            cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
            setSelectedNationality(cmbfilterNation[0]);
          }
        }
        if (DeathPlaceCountry == null || DeathPlaceCountry == "") {
          if (stateId === "kl" && cmbNation.length > 0) {
            cmbfilterNationI = cmbNation.filter((cmbNation) => cmbNation.name.includes("India"));
            setSelectDeathPlaceCountry(cmbfilterNationI[0]);
          }
        }
        if (DeathPlaceState == null || DeathPlaceState == "") {
          if (stateId === "kl" && cmbState.length > 0) {
            cmbFilterState = cmbState.filter((cmbState) => cmbState.name != "Kerala");
            SelectDeathPlaceState(cmbFilterState);
          }
        }
      }
    }, [Nation, isInitialRender]);

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

useEffect(() => {
  if (isInitialRender) {
    if (Nationality == null || Nationality == "") {
      if (stateId === "kl" && cmbNation.length > 0) {
        cmbfilterNation = cmbNation.filter((cmbNation) => cmbNation.nationalityname.includes("Indian"));
        setSelectedNationality(cmbfilterNation[0]);
      }
    }
 
    if (DeathPlaceCountry == null || DeathPlaceCountry == "") {
      if (stateId === "kl" && cmbNation.length > 0) {
        cmbfilterNationI = cmbNation.filter((cmbNation) => cmbNation.name.includes("India"));
        setSelectDeathPlaceCountry(cmbfilterNationI[0]);
      }
    }
    if (DeathPlaceState == null || DeathPlaceState == "") {
      if (stateId === "kl" && cmbState.length > 0) {
        cmbFilterState = cmbState.filter((cmbState) => cmbState.name != "Kerala");
        SelectDeathPlaceState(cmbFilterState);
      }
    }
  }
}, [Nation, isInitialRender]);


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
    const goNext = () => {
      if (Difference_In_DaysRounded <= 21) {
        if (DeathPlace.code == "HOSPITAL") {
          workFlowCode = "DEATHHOSP";
          console.log(workFlowCode);
        } else {
          workFlowCode = "21DEATHHHOME";
        }
      }
      if (DeceasedGender == null || DeceasedGender == "" || DeceasedGender == undefined) {
        validFlag = false;
        setsexError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setsexError(false);
      }
      // if (DeceasedAadharNumber != null || DeceasedAadharNumber != "" || DeceasedAadharNumber != undefined || DeceasedAadharNotAvailable === false) {
      //   let adharLength = DeceasedAadharNumber;
      //   if (adharLength.length < 12 || adharLength.length > 12 ) {
      //     validFlag = false;
      //     setAadharError(true);
      //     setToast(true);
      //     setTimeout(() => {
      //       setToast(false);
      //     }, 2000);
      //   } else {
      //     setAadharError(false);
      //   }
      // }
      if (Age == null || Age == "" || Age == undefined) {
        validFlag = false;
        setAgeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAgeError(false);
      }
      // if (DeathPlaceWardId == null || DeathPlaceWardId == "" || DeathPlaceWardId == undefined) {
      //   validFlag = false;
      //   setWardNameError(true);
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setWardNameError(false);
      // }
  
      if (DeathPlace.code == "HOSPITAL") {
        if (DeathPlaceType == null) {
          setHospitalError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          DeathPlaceTypecode = DeathPlaceType.code;
          setHospitalError(false);
        }
      } else if (DeathPlace.code === "INSTITUTION") {
        if (DeathPlaceType == null) {
          setInstitutionError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          DeathPlaceTypecode = DeathPlaceType.code;
          setInstitutionError(false);
          if (DeathPlaceInstId === null) {
            setInstitutionNameError(true);
            validFlag = false;
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            institutionNameCode = DeathPlaceInstId.code;
            setInstitutionNameError(false);
          }
        }
      }
  
      if (validFlag == true) {
        sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
        sessionStorage.setItem("DeathDateUnavailable", DeathDateUnavailable ? DeathDateUnavailable : false);
        sessionStorage.setItem("ToDate", ToDate ? ToDate : null);
        sessionStorage.setItem("FromDate", FromDate ? FromDate : null);
        sessionStorage.setItem("DeathTimeFrom", DeathTimeFrom ? DeathTimeFrom : null);
        sessionStorage.setItem("DeathTimeTo", DeathTimeTo ? DeathTimeTo : null);
  
        sessionStorage.setItem("DateOfDeath", DateOfDeath ? DateOfDeath : null);
        sessionStorage.setItem("TimeOfDeath", TimeOfDeath ? TimeOfDeath : null);
        sessionStorage.setItem("DeceasedFirstNameEn", DeceasedFirstNameEn ? DeceasedFirstNameEn : null);
        sessionStorage.setItem("DeceasedMiddleNameEn", DeceasedMiddleNameEn ? DeceasedMiddleNameEn : null);
        sessionStorage.setItem("DeceasedLastNameEn", DeceasedLastNameEn ? DeceasedLastNameEn : null);
        sessionStorage.setItem("DeceasedFirstNameMl", DeceasedFirstNameMl ? DeceasedFirstNameMl : null);
        sessionStorage.setItem("DeceasedMiddleNameMl", DeceasedMiddleNameMl ? DeceasedMiddleNameMl : null);
        sessionStorage.setItem("DeceasedLastNameMl", DeceasedLastNameMl ? DeceasedLastNameMl : null);
        sessionStorage.setItem("Age", Age ? Age : null);
        sessionStorage.setItem("Nationality", Nationality ? Nationality.code : null);
        sessionStorage.setItem("Religion", Religion ? Religion.code : null);
        sessionStorage.setItem("DeceasedGender", DeceasedGender ? DeceasedGender.code : null);
        sessionStorage.setItem("AgeUnit", AgeUnit ? AgeUnit.code : null);
        // sessionStorage.setItem("checked", checked ? checked : false);
        sessionStorage.setItem("DeceasedAadharNotAvailable ", DeceasedAadharNotAvailable ? DeceasedAadharNotAvailable : false);
        sessionStorage.setItem("Occupation", Occupation ? Occupation.code : null);
        sessionStorage.setItem("DeathPlace", DeathPlace ? DeathPlace.code : null);
  
        sessionStorage.setItem("workFlowCode", workFlowCode);
  
        sessionStorage.setItem("DeathPlaceTypecode", DeathPlaceType ? DeathPlaceType.code : null);
        sessionStorage.setItem("institutionNameCode", DeathPlaceInstId ? DeathPlaceInstId.code : null);
        sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
        // if (validFlag === true) {
        sessionStorage.setItem("DeceasedIdproofType", DeceasedIdproofType ? DeceasedIdproofType.code : null);
        sessionStorage.setItem("DeceasedIdproofNo", DeceasedIdproofNo ? DeceasedIdproofNo : null);
  
        sessionStorage.setItem("DeceasedAadharNumber", DeceasedAadharNumber ? DeceasedAadharNumber : null);
  
        if (DeathPlace.code === "HOSPITAL") {
          //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
          // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("HospitalNameMl", HospitalNameMl ? HospitalNameMl.code : null);
          sessionStorage.removeItem("DeathPlaceInstId");
        }
        if (DeathPlace.code === "INSTITUTION") {
          //  ?sessionStorage.setItem("DeathPlace", DeathPlace.code);
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("DeathPlaceInstId", DeathPlaceInstId ? DeathPlaceInstId.code : null);
          sessionStorage.setItem("InstitutionIdMl", InstitutionIdMl ? InstitutionIdMl.InstitutionIdMl : null);
        }
        if (DeathPlace.code === "HOME") {
          sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("DeathPlaceHomeHoueNameEn", DeathPlaceHomeHoueNameEn ? DeathPlaceHomeHoueNameEn : null);
          sessionStorage.setItem("DeathPlaceHomeHoueNameMl", DeathPlaceHomeHoueNameMl ? DeathPlaceHomeHoueNameMl : null);
          sessionStorage.setItem("DeathPlaceHomeLocalityEn", DeathPlaceHomeLocalityEn ? DeathPlaceHomeLocalityEn : null);
          sessionStorage.setItem("DeathPlaceHomeLocalityMl", DeathPlaceHomeLocalityMl ? DeathPlaceHomeLocalityMl : null);
          sessionStorage.setItem("DeathPlaceHomeStreetNameEn", DeathPlaceHomeStreetNameEn ? DeathPlaceHomeStreetNameEn : null);
          sessionStorage.setItem("DeathPlaceHomeStreetNameMl", DeathPlaceHomeStreetNameMl ? DeathPlaceHomeStreetNameMl : null);
          sessionStorage.setItem("DeathPlaceHomePostofficeId", DeathPlaceHomePostofficeId ? DeathPlaceHomePostofficeId.code : null);
          sessionStorage.setItem("DeathPlaceHomepincode", DeathPlaceHomepincode ? DeathPlaceHomepincode.code : null);
        }
        if (DeathPlace.code === "VEHICLE") {
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("VehicleNumber", VehicleNumber ? VehicleNumber : null);
          sessionStorage.setItem("VehicleFromplaceEn", VehicleFromplaceEn ? VehicleFromplaceEn : null);
          sessionStorage.setItem("VehicleToPlaceEn", VehicleToPlaceEn ? VehicleToPlaceEn : null);
          sessionStorage.setItem("VehicleFromplaceMl", VehicleFromplaceMl ? VehicleFromplaceMl : null);
          sessionStorage.setItem("VehicleToPlaceMl", VehicleToPlaceMl ? VehicleToPlaceMl : null);
          sessionStorage.setItem("VehicleFirstHaltEn", VehicleFirstHaltEn ? VehicleFirstHaltEn : null);
          sessionStorage.setItem("VehicleFirstHaltMl", VehicleFirstHaltMl ? VehicleFirstHaltMl : null);
          sessionStorage.setItem("VehicleHospitalEn", VehicleHospitalEn ? VehicleHospitalEn.code : null);
          sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
          sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
        }
        if (DeathPlace.code === "PUBLIC_PLACES") {
          sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
          sessionStorage.setItem("DeathPlaceLocalityEn", DeathPlaceLocalityEn ? DeathPlaceLocalityEn : null);
          sessionStorage.setItem("DeathPlaceLocalityMl", DeathPlaceLocalityMl ? DeathPlaceLocalityMl : null);
          sessionStorage.setItem("DeathPlaceStreetEn", DeathPlaceStreetEn ? DeathPlaceStreetEn : null);
          sessionStorage.setItem("DeathPlaceStreetMl", DeathPlaceStreetMl ? DeathPlaceStreetMl : null);
          sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
          sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId : null);
        }
        if (DeathPlace.code === "OUTSIDE_JURISDICTION") {
          sessionStorage.setItem("DeathPlaceCountry", DeathPlaceCountry ? DeathPlaceCountry.code : null);
          sessionStorage.setItem("DeathPlaceState", DeathPlaceState ? DeathPlaceState.code : null);
          sessionStorage.setItem("DeathPlaceDistrict", DeathPlaceDistrict ? DeathPlaceDistrict.code : null);
          sessionStorage.setItem("DeathPlaceCity", DeathPlaceCity ? DeathPlaceCity : null);
          sessionStorage.setItem("DeathPlaceRemarksEn", DeathPlaceRemarksEn ? DeathPlaceRemarksEn : null);
          sessionStorage.setItem("DeathPlaceRemarksMl", DeathPlaceRemarksMl ? DeathPlaceRemarksMl : null);
          sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code : null);
          sessionStorage.setItem("PlaceOfBurialEn", PlaceOfBurialEn ? PlaceOfBurialEn : null);
          sessionStorage.setItem("PlaceOfBurialMl", PlaceOfBurialMl ? PlaceOfBurialMl : null);
          sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
        }
        let IsEditChangeScreen = isEditDeath ? isEditDeath : false;
  
        onSelect(config.key, {
          IsEditChangeScreen,
          ToDate,
          DeathDateUnavailable,
          DeathTimeTo,
          FromDate,
          DeathTimeFrom,
          tenantId,
          DateOfDeath,
          TimeOfDeath,
          DeceasedFirstNameEn,
          DeceasedMiddleNameEn,
          DeceasedLastNameEn,
          DeceasedFirstNameMl,
          DeceasedMiddleNameMl,
          DeceasedLastNameMl,
          Age,
          DeceasedAadharNotAvailable,
          DeceasedAadharNumber,
          DeceasedIdproofType,
          DeceasedIdproofNo,
          CommencementDate,
          DeceasedGender,
          Nationality,
          Religion,
          AgeUnit,
          Occupation,
          // checked,
          DeathPlace,
          workFlowCode,
          DeathPlaceType,
          HospitalNameMl,
          DeathPlaceTypecode,
          DeathPlaceInstId,
          InstitutionIdMl,
          institutionNameCode,
          DeathPlaceHomeHoueNameEn,
          DeathPlaceHomeHoueNameMl,
          DeathPlaceHomeLocalityEn,
          DeathPlaceHomeLocalityMl,
          DeathPlaceHomeStreetNameEn,
          DeathPlaceHomeStreetNameMl,
          DeathPlaceHomePostofficeId,
          DeathPlaceHomepincode,
          DeathPlaceType,
          VehicleNumber,
          VehicleFromplaceEn,
          VehicleToPlaceEn,
          VehicleFromplaceMl,
          VehicleToPlaceMl,
          VehicleFirstHaltEn,
          VehicleFirstHaltMl,
          VehicleHospitalEn,
          GeneralRemarks,
          DeathPlaceWardId,
          DeathPlaceType,
          DeathPlaceLocalityEn,
          DeathPlaceLocalityMl,
          DeathPlaceStreetEn,
          DeathPlaceStreetMl,
          DeathPlaceCountry,
          DeathPlaceState,
          DeathPlaceDistrict,
          DeathPlaceCity,
          DeathPlaceRemarksEn,
          DeathPlaceRemarksMl,
          PlaceOfBurialMl,
          PlaceOfBurialEn,
        });
      }
    };
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
  
  return (
    <React.Fragment>
       <FormStep    t={t}  onSelect={goNext} onSkip={onSkip}>
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-12 mystyle">
          <h1 className="headingh1 hstyle">
            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CORRECTION_NAME_DECEASED")}`}</span>{" "}
          </h1>
        </div>
      </div>
    </div>
    <FormFieldContainer>
      <FieldComponentContainer>
        <div className="col-md-5">
          <CardLabel>
            {t("CR_AADHAR")}
          </CardLabel>
          <TextInput
                    t={t}
                    isMandatory={false}
                    type="number"
                    max="12"
                    optionKey="i18nKey"
                    name="DeceasedAadharNumber"
                    value={DeceasedAadharNumber}
                    onChange={setSelectDeceasedAadharNumber}
                    placeholder={`${t("CR_AADHAR")}`}
                    {...(validation = { pattern: "^[0-9]{12}$", type: "text", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
      </FieldComponentContainer>
      <div style={{ marginTop: "2.8rem" }}> 
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
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
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
    <FieldComponentContainer>
    <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FIRST_NAME_ML")}`}
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
                <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
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
                  placeholder={`${t("CR_LAST_NAME_ML")}`}
                  // {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                />
              </div>
        </FieldComponentContainer>

        <div style={{ marginTop: "2.8rem" }}> 
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
      <FieldComponentContainer>
        <div className="col-md-4">
          <CardLabel>
            {t("CR_DATE_OF_DEATH")}
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
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlace}
                  selected={DeathPlace}
                  select={selectDeathPlace}
                  placeholder={`${t("CR_PLACE_OF_DEATH")}`}
                />
              </div>
           
             <div className="col-md-4">
          <CardLabel>
                  {t("CR_GENDER")}
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={DeceasedGender}
                  select={selectDeceasedGender}
                  placeholder={`${t("CR_GENDER")}`}
                  // {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
                </div>
      </FieldComponentContainer>
      <div style={{ marginTop: "2.8rem" }}> 
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
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
                  {`${t("CR_MOTHER_NAME_EN")}`}
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
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
    <FieldComponentContainer>
    <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_FATHER_NAME_EN")}`}
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
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
    <FieldComponentContainer>
    <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_SPOUSE_TYPE_EN")}`}
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
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
    <FieldComponentContainer>
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_HOUSE_NO_AND_NAME_EN")}`}</CardLabel>
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
                <CardLabel>
                  {`${t("CR_STREET_EN")}`}</CardLabel>
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
                <CardLabel>
                  {`${t("CR_HOUSE_NO_AND_NAME_MAL")}`}</CardLabel>
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
                <CardLabel>
                  {`${t("CR_STREET_MAL")}`}</CardLabel>
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
         <LinkButton
              label={<EditIcon selected={true} label={"Edit"}  />}
              style={{ width: "100px", display: "inline" }}
              onClick={() => { setShowModal(true); }}
            />
         </div>
    </FormFieldContainer>
    <FormFieldContainer>
    <FieldComponentContainer>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CS_COMMON_COUNTRY")}`}</CardLabel>
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
                <CardLabel>
                  {`${t("CR_BIRTH_PERM_DISTRICT_LABEL")}`}</CardLabel>
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
                <CardLabel>
                  {t("CS_COMMON_VILLAGE")}
                </CardLabel>
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
                <CardLabel>
                  {t("CS_COMMON_LB_NAME")}
                </CardLabel>
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
    <DeathCorrectionModal showModal={showModal}  />
    </FormStep>
  </React.Fragment>
  );
};

export default DeathCorrectionEditPage