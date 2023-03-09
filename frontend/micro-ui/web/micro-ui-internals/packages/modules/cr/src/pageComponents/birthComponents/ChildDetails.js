import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import BirthPlaceHospital from "../../pageComponents/birthComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../../pageComponents/birthComponents/BirthPlaceInstitution";
import BirthPlaceHome from "../../pageComponents/birthComponents/BirthPlaceHome";
import BirthPlaceVehicle from "../../pageComponents/birthComponents/BirthPlaceVehicle";
import BirthPlacePublicPlace from "../../pageComponents/birthComponents/BirthPlacePublicPlace";

const ChildDetails = ({ config, onSelect, userType, formData, isEditBirth }) => {
  // console.log(JSON.stringify(formData));  
  const [isEditBirthPageComponents, setIsEditBirthPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);
  const [workFlowCode, setWorkFlowCode] = useState();

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: WorkFlowDetails  = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowBirth");
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AttentionOfDelivery");
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeliveryMethod");
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);

  const convertEpochFormateToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}/${month}/${year}`;
    } else {
      return null;
    }
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  let menu = [];
  let placeOfBirth = null;
  let cmbPlaceMaster = [];
  let workFlowData = []
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];
  let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  let Difference_In_DaysRounded = "";
  // let workFlowCode = "BIRTHHOSP21";
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] && WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
      workFlowData.push(ob);
      // console.log(workFlowData);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  WorkFlowDetails &&
    PlaeceMaster["birth-death-service"] && PlaeceMaster["birth-death-service"].PlaceMaster &&
    PlaeceMaster["birth-death-service"].PlaceMaster.map((ob) => {
      cmbPlaceMaster.push(ob);
    });
  AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"] && AttentionOfDelivery["birth-death-service"].AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
      cmbAttDeliverySub.push(ob);
    });
  DeliveryMethodList &&
    DeliveryMethodList["birth-death-service"] && DeliveryMethodList["birth-death-service"].DeliveryMethod &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
      cmbDeliveryMethod.push(ob);
    });
  const cmbPregWeek = [
    { i18nKey: "20", code: "20" },
    { i18nKey: "21", code: "21" },
    { i18nKey: "22", code: "22" },
    { i18nKey: "22", code: "22" },
    { i18nKey: "23", code: "23" },
    { i18nKey: "25", code: "25" },
    { i18nKey: "26", code: "26" },
    { i18nKey: "27", code: "27" },
    { i18nKey: "28", code: "28" },
    { i18nKey: "29", code: "29" },
    { i18nKey: "30", code: "30" },
    { i18nKey: "31", code: "31" },
    { i18nKey: "32", code: "32" },
    { i18nKey: "33", code: "33" },
    { i18nKey: "34", code: "34" },
    { i18nKey: "35", code: "35" },
    { i18nKey: "36", code: "36" },
    { i18nKey: "37", code: "37" },
    { i18nKey: "38", code: "38" },
    { i18nKey: "39", code: "39" },
    { i18nKey: "40", code: "40" },
    { i18nKey: "41", code: "41" },
    { i18nKey: "42", code: "42" },
  ];
  const [childDOB, setChildDOB] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? convertEpochToDate(formData?.ChildDetails?.childDOB) : formData?.ChildDetails?.childDOB); //formData?.ChildDetails?.childDOB
  // const [gender, selectGender] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (menu.filter(menu => menu.code === formData?.ChildDetails?.gender)[0]) : formData?.ChildDetails?.gender);
  const [gender, selectGender] = useState(formData?.ChildDetails?.gender?.code ? formData?.ChildDetails?.gender : formData?.ChildDetails?.gender ?
    (menu.filter(menu => menu.code === formData?.ChildDetails?.gender)[0]) : "");

  const [childAadharNo, setChildAadharNo] = useState(formData?.ChildDetails?.childAadharNo ? formData?.ChildDetails?.childAadharNo : "");
  const [childFirstNameEn, setChildFirstNameEn] = useState(formData?.ChildDetails?.childFirstNameEn ? formData?.ChildDetails?.childFirstNameEn : "");
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(formData?.ChildDetails?.childMiddleNameEn ? formData?.ChildDetails?.childMiddleNameEn : "");
  const [childLastNameEn, setChildLastNameEn] = useState(formData?.ChildDetails?.childLastNameEn ? formData?.ChildDetails?.childLastNameEn : "");
  const [childFirstNameMl, setChildFirstNameMl] = useState(formData?.ChildDetails?.childFirstNameMl ? formData?.ChildDetails?.childFirstNameMl : "");
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(formData?.ChildDetails?.childMiddleNameMl ? formData?.ChildDetails?.childMiddleNameMl : "");
  const [childLastNameMl, setChildLastNameMl] = useState(formData?.ChildDetails?.childLastNameMl ? formData?.ChildDetails?.childLastNameMl : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);
  const [birthDateTime, setbirthDateTime] = useState(""); //formData?.ChildDetails?.birthDateTime ? formData?.ChildDetails?.birthDateTime :
  const [isChildName, setIsChildName] = useState(formData?.ChildDetails?.isChildName ? formData?.ChildDetails?.isChildName : false);
  // const [birthPlace, selectBirthPlace] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]) : formData?.ChildDetails?.birthPlace);
  const [birthPlace, selectBirthPlace] = useState(formData?.ChildDetails?.birthPlace?.code ? formData?.ChildDetails?.birthPlace : formData?.ChildDetails?.birthPlace ?
    (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]) : "");
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(formData?.ChildDetails?.hospitalName?.code ? formData?.ChildDetails?.hospitalName : formData?.ChildDetails?.hospitalName ? "" : "");
  const [hospitalNameMl, selectHospitalNameMl] = useState(formData?.ChildDetails?.hospitalNameMl?.code ? formData?.ChildDetails?.hospitalNameMl : formData?.ChildDetails?.hospitalNameMl ? "" : "");

  // const [hospitalName, selectHospitalName] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? "" : formData?.ChildDetails?.hospitalName); //formData?.ChildDetails?.hospitalName ? formData?.ChildDetails?.hospitalName : null
  // const [hospitalNameMl, selectHospitalNameMl] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? "" : formData?.ChildDetails?.hospitalNameMl);

  const [institution, setInstitution] = useState(formData?.ChildDetails?.institution ? formData?.ChildDetails?.institution : null);
  const [institutionIdMl, setInstitutionIdMl] = useState(formData?.ChildDetails?.institutionIdMl ? formData?.ChildDetails?.institutionIdMl : null);
  const [institutionId, setInstitutionId] = useState(formData?.ChildDetails?.institutionId ? formData?.ChildDetails?.institutionId : null);

  const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.ChildDetails?.adrsPostOffice ? formData?.ChildDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.ChildDetails?.adrsPincode ? formData?.ChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.ChildDetails?.adrsHouseNameEn ? formData?.ChildDetails?.adrsHouseNameEn : "");
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.ChildDetails?.adrsHouseNameMl ? formData?.ChildDetails?.adrsHouseNameMl : "");
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.ChildDetails?.adrsLocalityNameEn ? formData?.ChildDetails?.adrsLocalityNameEn : "");
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.ChildDetails?.adrsLocalityNameMl ? formData?.ChildDetails?.adrsLocalityNameMl : "");
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.ChildDetails?.adrsStreetNameEn ? formData?.ChildDetails?.adrsStreetNameEn : "");
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.ChildDetails?.adrsStreetNameMl ? formData?.ChildDetails?.adrsStreetNameMl : "");
  const [wardNo, setWardNo] = useState(formData.ChildDetails?.wardNo ? formData.ChildDetails?.wardNo : null);

  const [vehicleType, setvehicleType] = useState(formData?.ChildDetails?.vehicleType ? formData?.ChildDetails?.vehicleType : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.ChildDetails?.vehicleRegistrationNo ? formData?.ChildDetails?.vehicleRegistrationNo : "");
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.ChildDetails?.vehicleFromEn ? formData?.ChildDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.ChildDetails?.vehicleToEn ? formData?.ChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.ChildDetails?.vehicleFromMl ? formData?.ChildDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.ChildDetails?.vehicleHaltPlace ? formData?.ChildDetails?.vehicleHaltPlace : "");
  //const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.ChildDetails?.vehicleHaltPlaceMl ? formData?.ChildDetails?.vehicleHaltPlaceMl : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.ChildDetails?.vehicleToMl ? formData?.ChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.ChildDetails?.vehicleDesDetailsEn ? formData?.ChildDetails?.vehicleDesDetailsEn : "");
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.ChildDetails?.setadmittedHospitalEn ? formData?.ChildDetails?.setadmittedHospitalEn : "");

  const [publicPlaceType, setpublicPlaceType] = useState(formData?.ChildDetails?.publicPlaceType ? formData?.ChildDetails?.publicPlaceType : "");
  const [localityNameEn, setlocalityNameEn] = useState(formData?.ChildDetails?.localityNameEn ? formData?.ChildDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.ChildDetails?.localityNameMl ? formData?.ChildDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.ChildDetails?.streetNameEn ? formData?.ChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.ChildDetails?.streetNameMl ? formData?.ChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(formData?.ChildDetails?.publicPlaceDecpEn ? formData?.ChildDetails?.publicPlaceDecpEn : "");

  // const [pregnancyDuration, setPregnancyDuration] = useState(isEditBirth ? (cmbPregWeek.filter(cmbPregWeek => cmbPregWeek.code === formData?.ChildDetails?.pregnancyDuration)[0]) : formData?.ChildDetails?.pregnancyDuration);

  const [pregnancyDuration, setPregnancyDuration] = useState(formData?.ChildDetails?.pregnancyDuration ? formData?.ChildDetails?.pregnancyDuration : "");
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(formData?.ChildDetails?.medicalAttensionSub?.code ? formData?.ChildDetails?.medicalAttensionSub : formData?.ChildDetails?.medicalAttensionSub ?
    (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]) : "");
  // const [medicalAttensionSub, setMedicalAttensionSub] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]) : formData?.ChildDetails?.medicalAttensionSub);
  const [deliveryMethods, setDeliveryMethod] = useState(formData?.ChildDetails?.deliveryMethods?.code ? formData?.ChildDetails?.deliveryMethods : formData?.ChildDetails?.deliveryMethods ?
    (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]) : "");
  //  const [deliveryMethods, setDeliveryMethod] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]) : formData?.ChildDetails?.deliveryMethods);
  const [birthWeight, setBirthWeight] = useState(formData?.ChildDetails?.birthWeight ? formData?.ChildDetails?.birthWeight : null);

  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.ChildDetails?.childAadharNo ? false : false);
  const [ChildAadharHIde, setChildAadharHIde] = useState(formData?.ChildDetails?.childAadharNo ? true : false);
  const [DOBError, setDOBError] = useState(formData?.ChildDetails?.childDOB ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.ChildDetails?.hospitalName ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.ChildDetails?.institution ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.ChildDetails?.institutionId ? false : false);
  const [WardError, setAdsWardError] = useState(formData?.ChildDetails?.wardNo ? false : false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.ChildDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.ChildDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.ChildDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.ChildDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(formData?.ChildDetails?.AdrsHomeLocalityNameEn ? false : false);
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(formData?.ChildDetails?.AdrsHomeLocalityNameMl ? false : false);
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.ChildDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.ChildDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.ChildDetails?.vehicleHaltPlace ? false : false);
  // const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.ChildDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.ChildDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.ChildDetails?.vehicleDesDetailsEn ? false : false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.ChildDetails?.publicPlaceType ? false : false);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.ChildDetails?.localityNameEn ? false : false);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.ChildDetails?.localityNameMl ? false : false);
  const [BirthWeightError, setBirthWeightError] = useState(formData?.ChildDetails?.DeliveryMethodSub ? false : false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.ChildDetails?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.ChildDetails?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);
  // const [isAdopted, setIsAdopted] = useState(formData?.ChildDetails?.isAdopted);
  // const [isMultipleBirth, setIsMultipleBirth] = useState(formData?.ChildDetails?.isMultipleBirth);
  // const [isBornOutSide, setIsBornOutSide] = useState(formData?.ChildDetails?.isBornOutSide);
  // const [ChildPassportNo, setChildPassportNo] = useState(formData?.ChildDetails?.ChildPassportNo);
  // const [ChildArrivalDate, setChildArrivalDate] = useState(formData?.ChildDetails?.ChildArrivalDate);

  // const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // disable future dates
  // const maxDate = new Date();
  // let currentDate = new Date().toJSON().slice(0, 10);
  const [access, setAccess] = React.useState(true);

  // let cmbInstitutionId = [];
  // institutionidList &&
  //   institutionidList["egov-location"] &&
  //   institutionidList["egov-location"].institutionList.map((ob) => {
  //     cmbInstitutionId.push(ob);
  //   });
  //   console.log(cmbInstitutionId);

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.ChildDetails?.isChildName != null) {
        setIsInitialRender(false);
        setIsChildName(formData?.ChildDetails?.isChildName);
      }
    }
  }, [isInitialRender]);

  React.useEffect(() => {
    if (isInitialRenderPlace) {
      if (birthPlace) {
        setIsInitialRenderPlace(false);
        placeOfBirth = birthPlace.code;
        setValue(placeOfBirth);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(placeOfBirth)));
        if (placeOfBirth === "HOSPITAL") {
          <BirthPlaceHospital
            hospitalName={hospitalName}
            hospitalNameMl={hospitalNameMl}
          />;
        }
        if (placeOfBirth === "INSTITUTION") {
          setIsInitialRenderInstitutionList(true);
          <BirthPlaceInstitution
            institution={institution}
            institutionIdMl={institutionIdMl}
            institutionId={institutionId}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (placeOfBirth === "HOME") {
          <BirthPlaceHome
            adrsPincode={adrsPincode}
            adrsHouseNameEn={adrsHouseNameEn}
            adrsHouseNameMl={adrsHouseNameMl}
            adrsLocalityNameEn={adrsLocalityNameEn}
            adrsLocalityNameMl={adrsLocalityNameMl}
            adrsStreetNameEn={adrsStreetNameEn}
            adrsStreetNameMl={adrsStreetNameMl}
            wardNo={wardNo}
            adrsPostOffice={adrsPostOffice}
            PostOfficevalues={PostOfficevalues}
          />;
        }
        if (placeOfBirth === "VEHICLE") {
          <BirthPlaceVehicle
            vehicleType={vehicleType}
            vehicleRegistrationNo={vehicleRegistrationNo}
            vehicleFromEn={vehicleFromEn}
            vehicleToEn={vehicleToEn}
            vehicleFromMl={vehicleFromMl}
            vehicleHaltPlace={vehicleHaltPlace}
            // vehicleHaltPlaceMl={vehicleHaltPlaceMl}
            vehicleToMl={vehicleToMl}
            vehicleDesDetailsEn={vehicleDesDetailsEn}
            setadmittedHospitalEn={setadmittedHospitalEn}
            wardNo={wardNo}
          />;
        }

        if (placeOfBirth === "PUBLIC_PLACES") {
          <BirthPlacePublicPlace
            publicPlaceType={publicPlaceType}
            wardNo={wardNo}
            localityNameEn={localityNameEn}
            localityNameMl={localityNameMl}
            streetNameEn={streetNameEn}
            streetNameMl={streetNameMl}
            publicPlaceDecpEn={publicPlaceDecpEn}
          />;
        }

      }
    }
  }, [isInitialRenderPlace]);

  function setselectGender(value) {
    selectGender(value);
  }
  function setSelectChildAadharNo(e) {
    // setContactno(e.target.value.length<=10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setAadharError(true);
        return false;
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setChildAadharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setChildAadharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setChildAadharNo(e.target.value);
      return true;
    }
  }

  function setselectChildDOB(value) {
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {

      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = (Math.floor(Difference_In_Days));
      // console.log(Difference_In_DaysRounded);
      if (Difference_In_DaysRounded >= 365) {
        setChildAadharHIde(true);
      } else {
        setChildAadharHIde(false);
        setChildAadharNo("");
      }
    } else {
      setChildDOB(null);
      setDOBError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }

    // const today = new Date();
    // const birthDate = new Date(value);
    // let diffdate = birthDate.setMonth(birthDate.getMonth() - 6)
    // console.log(diffdate);
    // let age_in_ms = today - birthDate;
    // let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
    // setMotherAgeMarriage(Math.floor(age_in_years));
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildFirstNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildFirstNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildMiddleNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectChildLastNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setChildLastNameMl(e.target.value.replace(/^[a-zA-Z -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
    }
  }
  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  }
  // function setSelectPregnancyDuration(value) {
  //   setPregnancyDuration(value);
  // }
  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }
  // function setAdopted(e) {
  //   if (e.target.checked == true) {
  //     setIsAdopted(true);
  //   } else {
  //     setIsAdopted(false);
  //   }
  // }
  // function setMultipleBirth(e) {
  //   if (e.target.checked == true) {
  //     setIsMultipleBirth(true);
  //   } else {
  //     setIsMultipleBirth(false);
  //   }
  // }

  // function setBornOutSide(e) {
  //   console.log(e.target.checked);
  //   if (e.target.checked === true) {

  //     setIsBornOutSide(true);
  //     console.log(isBornOutSide);

  //   } else {
  //     setIsBornOutSide(false);
  //   }

  // }
  // function setSelectPassportNo(e) {
  //   setChildPassportNo(e.target.value);
  // }
  // function setSelectArrivalDate(e) {
  //   setChildArrivalDate(e.target.value);
  // }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      console.log(cb);
      console.log(value);
      let hour = value;
      let period = hour > 12 ? "PM" : "AM";
      console.log(period);
      setbirthDateTime(value);
    }
  };
  function setChildName(e) {
    if (e.target.checked === true) {
      setIsChildName(e.target.checked);

    } else {
      setIsChildName(e.target.checked);
      setChildFirstNameEn("");
      setChildMiddleNameEn("");
      setChildLastNameEn("");
      setChildFirstNameMl("");
      setChildMiddleNameMl("");
      setChildLastNameMl("");
    }
  }
  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === value.code && (workFlowData.startdateperiod <= Difference_In_DaysRounded && workFlowData.enddateperiod >= Difference_In_DaysRounded));
    // console.log(currentWorgFlow[0].WorkflowCode);
    // workFlowCode=currentWorgFlow[0].WorkflowCode;
    setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
    console.log("workFlowCode" + currentWorgFlow[0].WorkflowCode);
  }
  function setSelectBirthWeight(e) {
    if (e.target.value.length === 5) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBirthWeight(e.target.value);
      // if(e.target.value <= 0 || e.target.value > 10 ){
      //   setBirthWeightError(true);
      //   setToast(true);
      //   setTimeout(() => {
      //   setToast(false);
      // }, 3000);
      // } else {
      //   setBirthWeightError(false);
      //   setBirthWeight(e.target.value);        
      // }

    }
  }
  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAadharError(false);
    }
    if (birthPlace.code === "HOSPITAL") {
      if (hospitalName == null || hospitalNameMl === null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        hospitalCode = hospitalName.code;
        setHospitalError(false);
      }
    } else if (birthPlace.code === "INSTITUTION") {
      if (institution == null) {
        setInstitutionError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        institutionTypeCode = institution.code;
        setInstitutionError(false);
        if (institutionId == null || institutionIdMl == null) {
          setInstitutionNameError(true);
          validFlag = false;
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          institutionNameCode = institution.code;
          setInstitutionNameError(false);
        }
      }
    } else if (birthPlace.code === "HOME") {
      if (wardNo === null) {
        validFlag = false;
        setAdsWardError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        wardNameEn = wardNo.name;
        wardNameMl = wardNo.localname;
        wardNumber = wardNo.wardno;
        setAdsWardError(false);
      }
      if (adrsPostOffice === null) {
        validFlag = false;
        setAdsHomePostOfficeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomePostOfficeError(false);
      }
      if (adrsPincode === null || adrsPincode === "" || adrsPincode === undefined) {
        validFlag = false;
        setAdsHomePincodeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomePincodeError(false);
        if (adrsPincode != 0) {
          if (adrsPincode.length > 6) {
            validFlag = false;
            setAdsHomePincodeError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else if (adrsPincode.length < 6) {
            validFlag = false;
            setAdsHomePincodeError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setAdsHomePincodeError(false);
          }
        }
      }
      if (adrsLocalityNameEn === null || adrsLocalityNameEn === "" || adrsLocalityNameEn === undefined) {
        validFlag = false;
        setAdsHomeLocalityNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeLocalityNameEnError(false);
      }
      if (adrsLocalityNameMl == null || adrsLocalityNameMl == "" || adrsLocalityNameMl == undefined) {
        validFlag = false;
        setAdsHomeLocalityNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeLocalityNameMlError(false);
      }
      if (adrsHouseNameEn == null || adrsHouseNameEn == "" || adrsHouseNameEn == undefined) {
        validFlag = false;
        setAdsHomeHouseNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeHouseNameEnError(false);
      }
      if (adrsHouseNameMl == null || adrsHouseNameMl == "" || adrsHouseNameMl == undefined) {
        validFlag = false;
        setAdsHomeHouseNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeHouseNameMlError(false);
      }
    } else if (birthPlace.code === "VEHICLE") {
      if (wardNo === null) {
        validFlag = false;
        setAdsWardError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        wardNameEn = wardNo.name;
        wardNameMl = wardNo.localname;
        wardNumber = wardNo.wardno;
        setAdsWardError(false);
      }

      if (vehicleType == null || vehicleType == "" || vehicleType == undefined) {
        validFlag = false;
        setvehiTypeError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehiTypeError(false);
      }
      if (vehicleRegistrationNo == null || vehicleRegistrationNo == "" || vehicleRegistrationNo == undefined) {
        validFlag = false;
        setvehicleRegiNoError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehicleRegiNoError(false);
      }
      if (vehicleHaltPlace == null || vehicleHaltPlace == "" || vehicleHaltPlace == undefined) {
        validFlag = false;
        setvehicleHaltPlaceError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehicleHaltPlaceError(false);
      }
      // if (vehicleHaltPlaceMl == null || vehicleHaltPlaceMl == "" || vehicleHaltPlaceMl == undefined) {
      //   validFlag = false;
      //   setvehiHaltPlaceMlError(true);
      //   setToast(true);
      //   setTimeout(() => {
      //     setToast(false);
      //   }, 2000);
      // } else {
      //   setvehiHaltPlaceMlError(false);
      // }
      if (vehicleDesDetailsEn == null || vehicleDesDetailsEn == "" || vehicleDesDetailsEn == undefined) {
        validFlag = false;
        setvehiDesDetailsEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehiDesDetailsEnError(false);
      }
      if (setadmittedHospitalEn == null || setadmittedHospitalEn == "" || setadmittedHospitalEn == undefined) {
        validFlag = false;
        setadmittedHospitalEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setadmittedHospitalEnError(false);
      }
    } else if (birthPlace.code === "PUBLIC_PLACES") {
      if (wardNo === null) {
        validFlag = false;
        setAdsWardError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        wardNameEn = wardNo.name;
        wardNameMl = wardNo.localname;
        wardNumber = wardNo.wardno;
        setAdsWardError(false);
      }
      if (localityNameEn == null || localityNameEn == "" || localityNameEn == undefined) {
        validFlag = false;
        setlocalNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setlocalNameEnError(false);
      }
      if (localityNameMl == null || localityNameMl == "" || localityNameMl == undefined) {
        validFlag = false;
        setlocalNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setlocalNameMlError(false);
      }
      if (publicPlaceType == null || publicPlaceType == "" || publicPlaceType == undefined) {
        validFlag = false;
        setplaceTypepEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setplaceTypepEnError(false);
      }
    }
    if (birthWeight != null || birthWeight != "" || birthWeight != undefined) {
      let BirthWeightCheck = birthWeight;
      if (BirthWeightCheck < 0.25 || BirthWeightCheck > 10) {
        validFlag = false;
        setBirthWeightError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBirthWeightError(false);
      }
    }
    else {
      setBirthWeightError(true);
      validFlag = false;
      setBirthWeightError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (medicalAttensionSub == null || medicalAttensionSub == "" || medicalAttensionSub == undefined) {
      validFlag = false;
      setMedicalAttensionSubStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMedicalAttensionSubStError(false);
    }
    if (pregnancyDuration == null || pregnancyDuration == "" || pregnancyDuration == undefined) {
      validFlag = false;
      setPregnancyDurationStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      if (pregnancyDuration < 20 || pregnancyDuration > 44) {
        validFlag = false;
        setPregnancyDurationInvalidError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPregnancyDurationStError(false);
        setPregnancyDurationInvalidError(false);
      }
    }
    if (deliveryMethods == null || deliveryMethods == "" || deliveryMethods == undefined) {
      validFlag = false;
      setDeliveryMethodStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeliveryMethodStError(false);
    }
    if (validFlag == true) {
      sessionStorage.setItem("stateId", stateId ? stateId : null);
      sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      sessionStorage.setItem("workFlowCode", workFlowCode);
      sessionStorage.setItem("childDOB", childDOB ? childDOB : null);
      sessionStorage.setItem("birthDateTime", birthDateTime ? birthDateTime : null);
      sessionStorage.setItem("gender", gender ? gender.code : null);
      sessionStorage.setItem("childAadharNo", childAadharNo ? childAadharNo : null);
      sessionStorage.setItem("childFirstNameEn", childFirstNameEn ? childFirstNameEn : null);
      sessionStorage.setItem("childMiddleNameEn", childMiddleNameEn ? childMiddleNameEn : null);
      sessionStorage.setItem("childLastNameEn", childLastNameEn ? childLastNameEn : null);
      sessionStorage.setItem("childFirstNameMl", childFirstNameMl ? childFirstNameMl : null);
      sessionStorage.setItem("childMiddleNameMl", childMiddleNameMl ? childMiddleNameMl : null);
      sessionStorage.setItem("childLastNameMl", childLastNameMl ? childLastNameMl : null);
      sessionStorage.setItem("isChildName", isChildName);
      sessionStorage.setItem("birthPlace", birthPlace.code);
      sessionStorage.setItem("hospitalCode", hospitalName ? hospitalName.code : null);
      sessionStorage.setItem("hospitalName", hospitalName ? hospitalName.hospitalName : null);
      sessionStorage.setItem("hospitalNameMl", hospitalName ? hospitalNameMl.hospitalNamelocal : null);
      sessionStorage.setItem("institutionTypeCode", institution ? institution.code : null);
      sessionStorage.setItem("institution", institution ? institution.name : null);
      sessionStorage.setItem("institutionNameCode", institutionId ? institutionId.code : null);
      sessionStorage.setItem("institutionId", institutionId ? institutionId.institutionName : null);
      sessionStorage.setItem("institutionIdMl", institutionIdMl ? institutionIdMl.institutionNamelocal : null);
      sessionStorage.setItem("adrsHouseNameEn", adrsHouseNameEn ? adrsHouseNameEn : null);
      sessionStorage.setItem("adrsHouseNameMl", adrsHouseNameMl ? adrsHouseNameMl : null);
      sessionStorage.setItem("adrsLocalityNameEn", adrsLocalityNameEn ? adrsLocalityNameEn : null);
      sessionStorage.setItem("adrsLocalityNameMl", adrsLocalityNameMl ? adrsLocalityNameMl : null);
      sessionStorage.setItem("adrsStreetNameEn", adrsStreetNameEn ? adrsStreetNameEn : null);
      sessionStorage.setItem("adrsStreetNameMl", adrsStreetNameMl ? adrsStreetNameMl : null);
      sessionStorage.setItem("adrsPostOffice", adrsPostOffice ? adrsPostOffice.code : null);
      sessionStorage.setItem("adrsPincode", adrsPincode ? adrsPincode.code : null);
      sessionStorage.setItem("wardNo", wardNo ? wardNo.code : null);
      sessionStorage.setItem("wardNameEn", wardNo ? wardNo.name : null);
      sessionStorage.setItem("wardNameMl", wardNo ? wardNo.localname : null);
      sessionStorage.setItem("wardNumber", wardNo ? wardNo.wardno : null);
      sessionStorage.setItem("vehicleType", vehicleType ? vehicleType : null);
      sessionStorage.setItem("vehicleRegistrationNo", vehicleRegistrationNo ? vehicleRegistrationNo : null);
      sessionStorage.setItem("vehicleFromEn", vehicleFromEn ? vehicleFromEn : null);
      sessionStorage.setItem("vehicleToEn", vehicleToEn ? vehicleToEn : null);
      sessionStorage.setItem("vehicleFromMl", vehicleFromMl ? vehicleFromMl : null);
      sessionStorage.setItem("vehicleToMl", vehicleToMl ? vehicleToMl : null);
      sessionStorage.setItem("vehicleHaltPlace", vehicleHaltPlace ? vehicleHaltPlace : null);
      // sessionStorage.setItem("vehicleHaltPlaceMl", vehicleHaltPlaceMl ? vehicleHaltPlaceMl : null);
      sessionStorage.setItem("setadmittedHospitalEn", setadmittedHospitalEn ? setadmittedHospitalEn.code : null);
      sessionStorage.setItem("vehicleDesDetailsEn", vehicleDesDetailsEn ? vehicleDesDetailsEn : null);
      sessionStorage.setItem("publicPlaceType", publicPlaceType ? publicPlaceType.code : null);
      sessionStorage.setItem("localityNameEn", localityNameEn ? localityNameEn : null);
      sessionStorage.setItem("localityNameMl", localityNameMl ? localityNameMl : null);
      sessionStorage.setItem("streetNameEn", streetNameEn ? streetNameEn : null);
      sessionStorage.setItem("streetNameMl", streetNameMl ? streetNameMl : null);
      sessionStorage.setItem("publicPlaceDecpEn", publicPlaceDecpEn ? publicPlaceDecpEn : null);
      sessionStorage.setItem("birthWeight", birthWeight ? birthWeight : null);
      sessionStorage.setItem("pregnancyDuration", pregnancyDuration ? pregnancyDuration.code : null);
      sessionStorage.setItem("medicalAttensionSub", medicalAttensionSub ? medicalAttensionSub.code : null);
      sessionStorage.setItem("deliveryMethods", deliveryMethods ? deliveryMethods.code : null);
      let IsEditChangeScreen = (isEditBirth ? isEditBirth : false);
      onSelect(config.key, {
        stateId, tenantId, workFlowCode, childDOB, birthDateTime, gender, childAadharNo,
        isChildName, childFirstNameEn, childMiddleNameEn, childLastNameEn, childFirstNameMl, childMiddleNameMl, childLastNameMl,
        birthPlace, hospitalCode, hospitalName, hospitalNameMl,
        institutionTypeCode, institution, institutionNameCode, institutionId, institutionIdMl,
        wardNo, wardNameEn, wardNameMl, wardNumber, adrsHouseNameEn, adrsHouseNameMl, adrsLocalityNameEn, adrsLocalityNameMl, adrsStreetNameEn, adrsStreetNameMl, adrsPostOffice, adrsPincode,
        vehicleType, vehicleHaltPlace, vehicleRegistrationNo, vehicleFromEn, vehicleToEn, vehicleFromMl,
        vehicleToMl, setadmittedHospitalEn, vehicleDesDetailsEn,
        publicPlaceType, localityNameEn, localityNameMl, streetNameEn, streetNameMl, publicPlaceDecpEn,
        birthWeight, pregnancyDuration, medicalAttensionSub, deliveryMethods, IsEditChangeScreen
      });
    }
  };
  if (isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined)) {

    if (formData?.ChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter(menu => menu.code === formData?.ChildDetails?.gender)[0]);
      }
    }
    if (formData?.ChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]);
        setValue(formData?.ChildDetails?.birthPlace);
      }
    }
    if (formData?.ChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]);
      }
    }
    // if (formData?.ChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    if (formData?.ChildDetails?.deliveryMethods != null) {
      if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
        // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
        setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
      }
    }
  }

  if (isWorkFlowDetailsLoading || isLoading || isAttentionOfDeliveryLoading || isDeliveryMethodListLoading || isPlaceMasterLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!childDOB || !gender || !birthPlace
          || (value === "HOSPITAL" ? (!hospitalName || !hospitalNameMl) : false)
          || (value === "INSTITUTION" ? (!institution || !institutionId || !institutionIdMl) : false)
          || (value === "HOME" ? (!wardNo || !adrsPostOffice || adrsPincode === "" || adrsLocalityNameEn === ""
            || adrsHouseNameEn === "" || adrsLocalityNameMl === "" || adrsHouseNameMl === "") : false)
          || (value === "PUBLIC_PLACES" ? (!publicPlaceType || !wardNo || localityNameEn === "" || localityNameMl === "") : false)
          || (value === "VEHICLE" ? (!vehicleType || vehicleRegistrationNo === "" || vehicleHaltPlace === ""
            || !setadmittedHospitalEn || !wardNo || vehicleDesDetailsEn === "") : false)
          || !medicalAttensionSub || !deliveryMethods || birthWeight == null || pregnancyDuration === ""}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  disable={isDisableEdit}
                  //  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" onChange={(val) => handleTimeChange(val, setbirthDateTime)}
                  value={birthDateTime}
                  disable={isDisableEdit} />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_GENDER")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={menu}
                  selected={gender}
                  select={setselectGender}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
              {ChildAadharHIde === true && (
                <div className="col-md-3">
                  <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="childAadharNo"
                    value={childAadharNo}
                    disable={isDisableEdit}
                    onChange={setSelectChildAadharNo}
                    placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>)}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_BIRTH")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {t("CR_PLACE_OF_BIRTH")}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={false}
                  option={cmbPlaceMaster}
                  selected={birthPlace}
                  disable={isDisableEdit}
                  select={setselectBirthPlace}
                  placeholder={`${t("CR_BIRTH_PLACE")}`}
                />
              </div>
            </div>
          </div>
          {value === "HOSPITAL" && (
            <div>
              <BirthPlaceHospital
                selectHospitalName={selectHospitalName}
                hospitalName={hospitalName}
                hospitalNameMl={hospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
                formData={formData}
                isEditBirth={isEditBirth}
              />
            </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <BirthPlaceInstitution
                institution={institution}
                institutionIdMl={institutionIdMl}
                institutionId={institutionId}
                setInstitution={setInstitution}
                setInstitutionIdMl={setInstitutionIdMl}
                setInstitutionId={setInstitutionId}
                InstitutionFilterList={InstitutionFilterList}
                setInstitutionFilterList={setInstitutionFilterList}
                isInitialRenderInstitutionList={isInitialRenderInstitutionList}
                setIsInitialRenderInstitutionList={setIsInitialRenderInstitutionList}
                formData={formData}
                isEditBirth={isEditBirth}
              />
            </div>
          )}
          {value === "HOME" && (
            <div>
              <BirthPlaceHome
                adrsHouseNameEn={adrsHouseNameEn}
                adrsHouseNameMl={adrsHouseNameMl}
                setAdrsHouseNameEn={setAdrsHouseNameEn}
                setAdrsHouseNameMl={setAdrsHouseNameMl}
                adrsLocalityNameEn={adrsLocalityNameEn}
                adrsLocalityNameMl={adrsLocalityNameMl}
                setAdrsLocalityNameEn={setAdrsLocalityNameEn}
                setAdrsLocalityNameMl={setAdrsLocalityNameMl}
                adrsStreetNameEn={adrsStreetNameEn}
                adrsStreetNameMl={adrsStreetNameMl}
                setAdrsStreetNameEn={setAdrsStreetNameEn}
                setAdrsStreetNameMl={setAdrsStreetNameMl}
                wardNo={wardNo}
                setWardNo={setWardNo}
                adrsPostOffice={adrsPostOffice}
                setAdrsPostOffice={setAdrsPostOffice}
                adrsPincode={adrsPincode}
                setAdrsPincode={setAdrsPincode}
                PostOfficevalues={PostOfficevalues}
                setPostOfficevalues={setPostOfficevalues}
                formData={formData}
                isEditBirth={isEditBirth}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <BirthPlaceVehicle
                vehicleType={vehicleType}
                vehicleRegistrationNo={vehicleRegistrationNo}
                vehicleFromEn={vehicleFromEn}
                vehicleToEn={vehicleToEn}
                vehicleFromMl={vehicleFromMl}
                vehicleHaltPlace={vehicleHaltPlace}
                // vehicleHaltPlaceMl={vehicleHaltPlaceMl}
                vehicleToMl={vehicleToMl}
                vehicleDesDetailsEn={vehicleDesDetailsEn}
                setadmittedHospitalEn={setadmittedHospitalEn}
                setvehicleToEn={setvehicleToEn}
                setvehicleType={setvehicleType}
                setvehicleRegistrationNo={setvehicleRegistrationNo}
                setvehicleFromEn={setvehicleFromEn}
                setvehicleFromMl={setvehicleFromMl}
                setvehicleHaltPlace={setvehicleHaltPlace}
                // setvehicleHaltPlaceMl={setvehicleHaltPlaceMl}
                setvehicleToMl={setvehicleToMl}
                setvehicleDesDetailsEn={setvehicleDesDetailsEn}
                setSelectedadmittedHospitalEn={setSelectedadmittedHospitalEn}
                wardNo={wardNo}
                setWardNo={setWardNo}
                formData={formData}
                isEditBirth={isEditBirth}
              />
            </div>
          )}
          {value === "PUBLIC_PLACES" && (
            <div>
              <BirthPlacePublicPlace
                publicPlaceType={publicPlaceType}
                localityNameEn={localityNameEn}
                localityNameMl={localityNameMl}
                streetNameEn={streetNameEn}
                streetNameMl={streetNameMl}
                wardNo={wardNo}
                publicPlaceDecpEn={publicPlaceDecpEn}
                setpublicPlaceType={setpublicPlaceType}
                setlocalityNameEn={setlocalityNameEn}
                setlocalityNameMl={setlocalityNameMl}
                setstreetNameEn={setstreetNameEn}
                setstreetNameMl={setstreetNameMl}
                setpublicPlaceDecpEn={setpublicPlaceDecpEn}
                setWardNo={setWardNo}
                formData={formData}
                isEditBirth={isEditBirth}
              />
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox label={t("CR_WANT_TO_ENTER_CHILD_NAME")} onChange={setChildName}
                  value={isChildName} checked={isChildName} />
              </div>
            </div>
          </div>
          {isChildName === true && (
            <div>
              {/* <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_CHILD")}`}</span>{" "}
                </h1>
              </div>
            </div> */}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_FIRST_NAME_EN")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameEn"
                      value={childFirstNameEn}
                      onChange={setSelectChildFirstNameEn}
                      disable={isDisableEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_FIRST_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameEn"
                      value={childMiddleNameEn}
                      onChange={setSelectChildMiddleNameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MIDDLE_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameEn"
                      value={childLastNameEn}
                      onChange={setSelectChildLastNameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_LAST_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_FIRST_NAME_ML")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameMl"
                      value={childFirstNameMl}
                      onChange={setSelectChildFirstNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_FIRST_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_FIRST_NAME_ML"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameMl"
                      value={childMiddleNameMl}
                      onChange={setSelectChildMiddleNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MIDDLE_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_MIDDLE_NAME_ML"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameMl"
                      value={childLastNameMl}
                      onChange={setSelectChildLastNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_LAST_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_LAST_NAME_ML"),
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>)}
          {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("OTHER_DETAILS")}`}</span> </h1>
          </div>
        </div> */}
          {/* <div className="row">         
          <div className="col-md-6" >
          
            <CheckBox label={t("CR_MULTIPLE_BIRTH")} onChange={setMultipleBirth} value={isMultipleBirth} checked={isMultipleBirth} />
          </div>
        </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbAttDeliverySub}
                  selected={medicalAttensionSub}
                  select={setSelectMedicalAttensionSub}
                  placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                />
              </div>
              {/* <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_PREGNANCY_DURATION")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbPregWeek}
                  selected={pregnancyDuration}
                  select={setSelectPregnancyDuration}
                  placeholder={`${t("CR_PREGNANCY_DURATION")}`}
                />
              </div> */}
              <div className="col-md-3">
                <CardLabel>{`${t("CR_PREGNANCY_DURATION")}`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="pregnancyDuration"
                  value={pregnancyDuration}
                  onChange={setSelectPregnancyDuration}
                  placeholder={`${t("CR_PREGNANCY_DURATION")}`}
                  {...(validation = {
                    pattern: "^[0-9`' ]*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_PREGNANCY_DURATION"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDeliveryMethod}
                  selected={deliveryMethods}
                  select={setSelectDeliveryMethod}
                  placeholder={`${t("CR_DELIVERY_METHOD")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_BIRTH_WEIGHT")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"decimal"}
                  optionKey="i18nKey"
                  name="birthWeight"
                  value={birthWeight}
                  onChange={setSelectBirthWeight}
                  placeholder={`${t("CR_BIRTH_WEIGHT")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "decimal", title: t("CR_INVALID_BIRTH_WEIGHT") })}
                />
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                AadharError || DOBError || HospitalError || InstitutionError || InstitutionNameError ||
                WardError ||
                AdsHomePincodeError ||
                AdsHomePostOfficeError ||
                AdsHomeLocalityNameEnError ||
                AdsHomeLocalityNameMlError ||
                AdsHomeHouseNameEnError || AdsHomeHouseNameMlError ||
                vehiTypeError ||
                vehicleRegiNoError ||
                vehicleHaltPlaceError ||

                admittedHospitalEnError || vehiDesDetailsEnError ||
                placeTypepEnError || localNameEnError || localNameMlError ||
                MedicalAttensionSubStError || DeliveryMethodStError || BirthWeightError
                || PregnancyDurationStError || PregnancyDurationInvalidError


              }
              label={
                AadharError || DOBError || HospitalError || InstitutionError || InstitutionNameError ||
                  WardError ||
                  AdsHomePincodeError ||
                  AdsHomePostOfficeError ||
                  AdsHomeLocalityNameEnError ||
                  AdsHomeLocalityNameMlError ||
                  AdsHomeHouseNameEnError || AdsHomeHouseNameMlError ||
                  vehiTypeError ||
                  vehicleRegiNoError ||
                  vehicleHaltPlaceError ||

                  admittedHospitalEnError || vehiDesDetailsEnError ||
                  placeTypepEnError || localNameEnError || localNameMlError ||
                  MedicalAttensionSubStError || DeliveryMethodStError || BirthWeightError
                  || PregnancyDurationStError || PregnancyDurationInvalidError
                  ?
                  AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`) : DOBError ? t(`BIRTH_DOB_VALIDATION_MSG`)
                      : HospitalError ? t(`BIRTH_ERROR_HOSPITAL_CHOOSE`)
                        : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`)
                          : InstitutionNameError ? t(`BIRTH_ERROR_INSTITUTION_NAME_CHOOSE`)
                            : WardError ? t(`BIRTH_ERROR_WARD_CHOOSE`)
                              : AdsHomePincodeError ? t(`BIRTH_ERROR_PINCODE_CHOOSE`)
                                : AdsHomePostOfficeError ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`)
                                  : AdsHomeLocalityNameEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                                    : AdsHomeLocalityNameMlError ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                                      : AdsHomeHouseNameEnError ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                                        : AdsHomeHouseNameMlError ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                                          : vehiTypeError ? t(`BIRTH_ERROR_VEHICLE_TYPE_CHOOSE`)
                                            : vehicleRegiNoError ? t(`BIRTH_ERROR_VEHICLE_REGI_NO_CHOOSE`)
                                              : vehicleHaltPlaceError ? t(`BIRTH_ERROR_VEHICLE_HALT_PLACE_CHOOSE`)

                                                : admittedHospitalEnError ? t(`BIRTH_ERROR_ADMITTED_HOSPITAL_CHOOSE`)
                                                  : vehiDesDetailsEnError ? t(`BIRTH_ERROR_DESCRIPTION_BOX_CHOOSE`)
                                                    : placeTypepEnError ? t(`BIRTH_ERROR_PUBLIC_PLACE_TYPE_CHOOSE`)
                                                      : localNameEnError ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                                                        : localNameMlError ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                                                          : BirthWeightError ? t(`BIRTH_WEIGHT_ERROR`)
                                                            : MedicalAttensionSubStError ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                                                              : PregnancyDurationStError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                                                                : PregnancyDurationInvalidError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)
                                                                  : DeliveryMethodStError ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)


                                                                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default ChildDetails;