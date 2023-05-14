import React, { useState, useEffect} from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar,TextArea  } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRABTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import AbandonedBirthPlaceHospital from "../../pageComponents/abandonedBirthComponents/AbandonedBirthPlaceHospital";
import AbandonedBirthPlaceInstitution from "../../pageComponents/abandonedBirthComponents/AbandonedBirthPlaceInstitution";
import AbandonedBirthPlaceHome from "../../pageComponents/abandonedBirthComponents/AbandonedBirthPlaceHome";
import AbandonedBirthPlaceVehicle from "../../pageComponents/abandonedBirthComponents/AbandonedBirthPlaceVehicle";
import AbandonedBirthPlacePublicPlace from "../../pageComponents/abandonedBirthComponents/AbandonedBirthPlacePublicPlace";
const AbandonedChildDetails = ({ config, onSelect, userType, formData,isEditAbandonedBirth  = false  }) => {
  sessionStorage.removeItem("applicationNumber");
  const [isEditAbandonedBirthPageComponents , setisEditAbandonedBirthPageComponents] = useState(false);
  // const [isDisableEdit, setisDisableEdit] = useState(isEditAbandonedBirth ? isEditAbandonedBirth : false);

  // const [workFlowCode, setWorkFlowCode] = useState();

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  // const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowBirth");
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "AttentionOfDelivery");
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "DeliveryMethod");
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  // const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowBirth");

  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(false);
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
  // let workFlowCode = "21BIRTHHOME";
  
  // WorkFlowDetails &&
  //   WorkFlowDetails["birth-death-service"] && WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
  //   WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
  //     workFlowData.push(ob);
  //     // console.log(workFlowData);
  //   });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  PlaeceMaster &&
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
  // const [childDOB, setChildDOB] = useState(isEditAbandonedBirth && isEditAbandonedBirthPageComponents === false && (formData?.AbandonedChildDetails?.IsEditChangeScreen === false || formData?.AbandonedChildDetails?.IsEditChangeScreen === undefined) ? convertEpochToDate(formData?.AbandonedChildDetails?.childDOB) : formData?.AbandonedChildDetails?.childDOB); //formData?.AbandonedChildDetails?.childDOB
  const [childDOB, setChildDOB] = useState(formData?.AbandonedChildDetails?.childDOB ? formData?.AbandonedChildDetails?.childDOB : formData?.AbandonedChildDetails?.childDOB ? "" : "");
  const [gender, selectGender] = useState(formData?.AbandonedChildDetails?.gender?.code ? formData?.AbandonedChildDetails?.gender : formData?.AbandonedChildDetails?.gender ?
    (menu.filter(menu => menu.code === formData?.AbandonedChildDetails?.gender)[0]) : "");

  // const [childAadharNo, setChildAadharNo] = useState(formData?.AbandonedChildDetails?.childAadharNo ? formData?.AbandonedChildDetails?.childAadharNo : null);
  // const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  // const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);
  const [birthDateTime, setbirthDateTime] = useState(""); //formData?.AbandonedChildDetails?.birthDateTime ? formData?.AbandonedChildDetails?.birthDateTime :
  const [birthPlace, selectBirthPlace] = useState(formData?.AbandonedChildDetails?.birthPlace?.code ? formData?.AbandonedChildDetails?.birthPlace : formData?.AbandonedChildDetails?.birthPlace ?
    (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.AbandonedChildDetails?.birthPlace)[0]) : "");
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(formData?.AbandonedChildDetails?.hospitalName?.code ? formData?.AbandonedChildDetails?.hospitalName : formData?.AbandonedChildDetails?.hospitalName ? "" : "");
  const [hospitalNameMl, selectHospitalNameMl] = useState(formData?.AbandonedChildDetails?.hospitalNameMl?.code ? formData?.AbandonedChildDetails?.hospitalNameMl : formData?.AbandonedChildDetails?.hospitalNameMl ? "" : "");

  const [institution, setInstitution] = useState(formData?.AbandonedChildDetails?.institution?.code ? formData?.AbandonedChildDetails?.institution : formData?.AbandonedChildDetails?.institutionTypeCode ? "" : "");
  const [institutionId, setInstitutionId] = useState(formData?.AbandonedChildDetails?.institutionId?.code ? formData?.AbandonedChildDetails?.institutionId : formData?.AbandonedChildDetails?.institutionNameCode ? "" : "");
  const [institutionIdMl, setInstitutionIdMl] = useState(formData?.AbandonedChildDetails?.institutionIdMl?.code ? formData?.AbandonedChildDetails?.institutionIdMl : formData?.AbandonedChildDetails?.institutionNameCode ? "" : "");


  const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.AbandonedChildDetails?.adrsPostOffice?.code ? formData?.AbandonedChildDetails?.adrsPostOffice : formData?.AbandonedChildDetails?.adrsPostOffice ? "" : "");
  const [adrsPincode, setAdrsPincode] = useState(formData?.AbandonedChildDetails?.adrsPincode ? formData?.AbandonedChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.AbandonedChildDetails?.adrsHouseNameEn ? formData?.AbandonedChildDetails?.adrsHouseNameEn : "");
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.AbandonedChildDetails?.adrsHouseNameMl ? formData?.AbandonedChildDetails?.adrsHouseNameMl : "");
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.AbandonedChildDetails?.adrsLocalityNameEn ? formData?.AbandonedChildDetails?.adrsLocalityNameEn : "");
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.AbandonedChildDetails?.adrsLocalityNameMl ? formData?.AbandonedChildDetails?.adrsLocalityNameMl : "");
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.AbandonedChildDetails?.adrsStreetNameEn ? formData?.AbandonedChildDetails?.adrsStreetNameEn : "");
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.AbandonedChildDetails?.adrsStreetNameMl ? formData?.AbandonedChildDetails?.adrsStreetNameMl : "");
  const [wardNo, setWardNo] = useState(formData.AbandonedChildDetails?.wardNo?.code ? formData.AbandonedChildDetails?.wardNo : formData?.AbandonedChildDetails?.wardNo ? "" : "");

  const [vehicleType, setvehicleType] = useState(formData?.AbandonedChildDetails?.vehicleType?.code ? formData?.AbandonedChildDetails?.vehicleType : formData?.AbandonedChildDetails?.vehicleType ? "" : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.AbandonedChildDetails?.vehicleRegistrationNo ? formData?.AbandonedChildDetails?.vehicleRegistrationNo : "");
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.AbandonedChildDetails?.vehicleFromEn ? formData?.AbandonedChildDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.AbandonedChildDetails?.vehicleToEn ? formData?.AbandonedChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.AbandonedChildDetails?.vehicleFromMl ? formData?.AbandonedChildDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.AbandonedChildDetails?.vehicleHaltPlace ? formData?.AbandonedChildDetails?.vehicleHaltPlace : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.AbandonedChildDetails?.vehicleToMl ? formData?.AbandonedChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.AbandonedChildDetails?.vehicleDesDetailsEn ? formData?.AbandonedChildDetails?.vehicleDesDetailsEn : "");
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.AbandonedChildDetails?.setadmittedHospitalEn?.code ? formData?.AbandonedChildDetails?.setadmittedHospitalEn : formData?.AbandonedChildDetails?.setadmittedHospitalEn ? "" : "");

  const [publicPlaceType, setpublicPlaceType] = useState(formData?.AbandonedChildDetails?.publicPlaceType?.code ? formData?.AbandonedChildDetails?.publicPlaceType : formData?.AbandonedChildDetails?.publicPlaceType ? "" : "");
  const [localityNameEn, setlocalityNameEn] = useState(formData?.AbandonedChildDetails?.localityNameEn ? formData?.AbandonedChildDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.AbandonedChildDetails?.localityNameMl ? formData?.AbandonedChildDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.AbandonedChildDetails?.streetNameEn ? formData?.AbandonedChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.AbandonedChildDetails?.streetNameMl ? formData?.AbandonedChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(formData?.AbandonedChildDetails?.publicPlaceDecpEn ? formData?.AbandonedChildDetails?.publicPlaceDecpEn : "");

  const [isMotherInfo, setIsMotherInfo] = useState(formData?.AbandonedChildDetails?.isMotherInfo ? formData?.AbandonedChildDetails?.isMotherInfo  : false);
  const [motherAadhar, setMotherAadhar] = useState(formData?.AbandonedChildDetails?.motherAadhar ? formData?.AbandonedChildDetails?.motherAadhar : null);
  const [motherFirstNameEn, setMotherFirstNameEn] = useState(formData?.AbandonedChildDetails?.motherFirstNameEn ? formData?.AbandonedChildDetails?.motherFirstNameEn : "");
  const [motherFirstNameMl, setMotherFirstNameMl] = useState(formData?.AbandonedChildDetails?.motherFirstNameMl ? formData?.AbandonedChildDetails?.motherFirstNameMl : "");
  const [addressOfMother, setmotherAddress] = useState(formData?.AbandonedChildDetails?.addressOfMother ? formData?.AbandonedChildDetails?.addressOfMother: "");

  const [pregnancyDuration, setPregnancyDuration] = useState(formData?.AbandonedChildDetails?.pregnancyDuration ? formData?.AbandonedChildDetails?.pregnancyDuration : null);
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(formData?.AbandonedChildDetails?.medicalAttensionSub?.code ? formData?.AbandonedChildDetails?.medicalAttensionSub : formData?.AbandonedChildDetails?.medicalAttensionSub ?
    (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.AbandonedChildDetails?.medicalAttensionSub)[0]) : "");
  const [deliveryMethods, setDeliveryMethod] = useState(formData?.AbandonedChildDetails?.deliveryMethods?.code ? formData?.AbandonedChildDetails?.deliveryMethods : formData?.AbandonedChildDetails?.deliveryMethods ?
    (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.AbandonedChildDetails?.deliveryMethods)[0]) : "");
  const [birthWeight, setBirthWeight] = useState(formData?.AbandonedChildDetails?.birthWeight ? formData?.AbandonedChildDetails?.birthWeight : null);
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.ChildDetails?.DifferenceInTime);
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();
  const [checkbirthDateTime, setCheckbirthDateTime] = useState({ hh: null, mm: null, amPm: null });

  const [toast, setToast] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.AbandonedChildDetails?.childDOB ? false : false);
  const [DateTimeError, setDateTimeError] = useState(false);
  const [HospitalError, setHospitalError] = useState(formData?.AbandonedChildDetails?.hospitalName ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.AbandonedChildDetails?.institution ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.AbandonedChildDetails?.institutionId ? false : false);
  const [WardError, setAdsWardError] = useState(formData?.AbandonedChildDetails?.wardNo ? false : false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.AbandonedChildDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.AbandonedChildDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.AbandonedChildDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.AbandonedChildDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(formData?.AbandonedChildDetails?.AdrsHomeLocalityNameEn ? false : false);
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(formData?.AbandonedChildDeAbandonedChildDetailstails?.AdrsHomeLocalityNameMl ? false : false);
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.AbandonedChildDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.AbandonedChildDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.AbandonedChildDetails?.vehicleHaltPlace ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.AbandonedChildDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.AbandonedChildDetails?.vehicleDesDetailsEn ? false : false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.AbandonedChildDetails?.publicPlaceType ? false : false);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.AbandonedChildDetails?.localityNameEn ? false : false);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.AbandonedChildDetails?.localityNameMl ? false : false);
  const [DateTimeHourError, setDateTimeHourError] = useState(false);
  const [DateTimeMinuteError, setDateTimeMinuteError] = useState(false);
  const [DateTimeAMPMError, setDateTimeAMPMError] = useState(false);
  const [access, setAccess] = React.useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  // const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(formData?.ChildDetails?.pregnancyDuration ? false : false);

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.ParentsDetails?.ismotherInfo != null) {
        setIsInitialRender(false);
        setIsMotherInfo(formData?.AbandonedChildDetails?.ismotherInfo);
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
          <AbandonedBirthPlaceHospital
            hospitalName={hospitalName}
            hospitalNameMl={hospitalNameMl}
          />;
        }
        if (placeOfBirth === "INSTITUTION") {
          setIsInitialRenderInstitutionList(true);
          <AbandonedBirthPlaceInstitution
            institution={institution}
            institutionIdMl={institutionIdMl}
            institutionId={institutionId}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (placeOfBirth === "HOME") {
          <AbandonedBirthPlaceHome
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
          <AbandonedBirthPlaceVehicle
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
          <AbandonedBirthPlacePublicPlace
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
  function setselectChildDOB(value) {
    setDifferenceInTime(null);
    setChildDOB(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birthDate = new Date(value);
    birthDate.setHours(0, 0, 0, 0);
    if (birthDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      // setDifferenceInTime(today.getTime() - birthDate.getTime());
      if (Difference_In_Time != null) {
        setDifferenceInTime(Difference_In_Time);
      }
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      // Difference_In_DaysRounded = (Math.floor(Difference_In_Days));
      // if (birthPlace) {
      //   let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === birthPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
      //   console.log("currentWorgFlowDOB" + currentWorgFlow);
      //   if (currentWorgFlow.length > 0) {
      //        // console.log(currentWorgFlow[0].WorkflowCode);
      //     setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      //   }
      // }      

    }    
  } 
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  } 
  function setMotherInfo(e) {
    if (e.target.checked == true) {
      setIsMotherInfo(e.target.checked);
      setMotherFirstNameEn("");
      setMotherFirstNameMl("");
      setMotherAadhar(null);   
    } else {
      setIsMotherInfo(e.target.checked);
    }
  }
  function setSelectMotherFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setMotherFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMotherFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setMotherFirstNameMl('');
    }
    else {
      setMotherFirstNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectMotherAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setMotherAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }

  function setSelectmotherAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z-0-9, ]*$") != null)) {
      setmotherAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }
  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 2));
  }
  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }
  useEffect(() => {
    // console.log("time while onchange", birthDateTime);
  }, [birthDateTime])
  
  const handleTimeChange = (value, cb) => {
    if (value?.target?.name === "hour12") {
      setCheckbirthDateTime({ ...checkbirthDateTime, hh: value?.target?.value ? value?.target?.value : null })
    } else if (value?.target?.name === "minute") {
      setCheckbirthDateTime({ ...checkbirthDateTime, mm: value?.target?.value ? value?.target?.value : null })
    } else if (value?.target?.name === "amPm") {
      setCheckbirthDateTime({ ...checkbirthDateTime, amPm: value?.target?.value ? value?.target?.value : null })
    }
    if (typeof value === "string") {
      cb(value);
      setbirthDateTime(value);
      // console.log(value);
      let time = value;
      let timeParts = time.split(":");
      // let hour = value;
      // let period = hour > 12 ? "PM" : "AM";
      // console.log(period);
      // setbirthDateTime(value);
    }
  };

  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  
    // let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === value.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
    // if (currentWorgFlow.length > 0) {
    //   setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
    // }
    function clearBirthPalce(value) {
      if (value.code === "HOSPITAL") {
        setInstitution("");
        setInstitutionId("");
        setInstitutionIdMl("");
        setAdrsPostOffice("");
        setAdrsPincode(null);
        setAdrsHouseNameEn("");
        setAdrsHouseNameMl("");
        setAdrsLocalityNameEn("");
        setAdrsLocalityNameMl("");
        setAdrsStreetNameEn("");
        setAdrsStreetNameMl("");
        setWardNo("");
        setvehicleType("");
        setvehicleRegistrationNo("");
        setvehicleFromEn("");
        setvehicleToEn("");
        setvehicleFromMl("");
        setvehicleHaltPlace("");
        setvehicleToMl("");
        setvehicleDesDetailsEn("");
        setSelectedadmittedHospitalEn("");
        setpublicPlaceType("");
        setlocalityNameEn("");
        setlocalityNameMl("");
        setstreetNameEn("");
        setstreetNameMl("");
        setpublicPlaceDecpEn("");
      } else if (value.code === "INSTITUTION") {
        selectHospitalName("");
        selectHospitalNameMl("");
        setAdrsPostOffice("");
        setAdrsPincode(null);
        setAdrsHouseNameEn("");
        setAdrsHouseNameMl("");
        setAdrsLocalityNameEn("");
        setAdrsLocalityNameMl("");
        setAdrsStreetNameEn("");
        setAdrsStreetNameMl("");
        setWardNo("");
        setvehicleType("");
        setvehicleRegistrationNo("");
        setvehicleFromEn("");
        setvehicleToEn("");
        setvehicleFromMl("");
        setvehicleHaltPlace("");
        setvehicleToMl("");
        setvehicleDesDetailsEn("");
        setSelectedadmittedHospitalEn("");
        setpublicPlaceType("");
        setlocalityNameEn("");
        setlocalityNameMl("");
        setstreetNameEn("");
        setstreetNameMl("");
        setpublicPlaceDecpEn("");
      } else if (value.code === "HOME") {
        selectHospitalName("");
        selectHospitalNameMl("");
        setInstitution("");
        setInstitutionId("");
        setInstitutionIdMl("");
        setvehicleType("");
        setvehicleRegistrationNo("");
        setvehicleFromEn("");
        setvehicleToEn("");
        setvehicleFromMl("");
        setvehicleHaltPlace("");
        setvehicleToMl("");
        setvehicleDesDetailsEn("");
        setSelectedadmittedHospitalEn("");
        setpublicPlaceType("");
        setlocalityNameEn("");
        setlocalityNameMl("");
        setstreetNameEn("");
        setstreetNameMl("");
        setpublicPlaceDecpEn("");
      } else if (value.code === "VEHICLE") {
        selectHospitalName("");
        selectHospitalNameMl("");
        setInstitution("");
        setInstitutionId("");
        setInstitutionIdMl("");
        setAdrsPostOffice("");
        setAdrsPincode(null);
        setAdrsHouseNameEn("");
        setAdrsHouseNameMl("");
        setAdrsLocalityNameEn("");
        setAdrsLocalityNameMl("");
        setAdrsStreetNameEn("");
        setAdrsStreetNameMl("");
        setpublicPlaceType("");
        setlocalityNameEn("");
        setlocalityNameMl("");
        setstreetNameEn("");
        setstreetNameMl("");
        setpublicPlaceDecpEn("");
      } else if (value.code === "PUBLIC_PLACES") {
        selectHospitalName("");
        selectHospitalNameMl("");
        setInstitution("");
        setInstitutionId("");
        setInstitutionIdMl("");
        setAdrsPostOffice("");
        setAdrsPincode(null);
        setAdrsHouseNameEn("");
        setAdrsHouseNameMl("");
        setAdrsLocalityNameEn("");
        setAdrsLocalityNameMl("");
        setAdrsStreetNameEn("");
        setAdrsStreetNameMl("");
        setvehicleType("");
        setvehicleRegistrationNo("");
        setvehicleFromEn("");
        setvehicleToEn("");
        setvehicleFromMl("");
        setvehicleHaltPlace("");
        setvehicleToMl("");
        setvehicleDesDetailsEn("");
        setSelectedadmittedHospitalEn("");
      }
  }
  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    clearBirthPalce(value);
  }
  function setSelectBirthWeight(e) {
    // if (e.target.value.length === 5) {
    //   return false;  
    // } else {
    //   setBirthWeight(e.target.value);   
    // }

    if (e.target.value != null || e.target.value != "") {
      if (e.target.value <= 6) {
        setBirthWeight(e.target.value);
      }
    }

  }
  let validFlag = true;
  const goNext = () => {
    if (checkbirthDateTime.hh === null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(true);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      setbirthDateTime("");
      setDateTimeHourError(false);
      setDateTimeMinuteError(true);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh === null && checkbirthDateTime.mm === null && checkbirthDateTime.amPm != null) {
      validFlag = false;
      //setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh === null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm === null) {
      validFlag = false;
      //setbirthDateTime("");
      setDateTimeHourError(true);
      setDateTimeMinuteError(false);
      setDateTimeAMPMError(false);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else if (checkbirthDateTime.hh != null && checkbirthDateTime.mm != null && checkbirthDateTime.amPm != null) {
      setDateTimeAMPMError(false);
      setDateTimeMinuteError(false);
      setDateTimeHourError(false);
      if (childDOB != null) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const childDateofBirth = new Date(childDOB);
        childDateofBirth.setHours(0, 0, 0, 0);
        if (childDateofBirth.getTime() < today.getTime()) {
          setDateTimeError(false);
        } else if (childDateofBirth.getTime() === today.getTime()) {
          let todayDate = new Date();
          let currenthours = todayDate.getHours();
          let currentMints = todayDate.getHours();
          currenthours = currenthours < 10 ? "0" + currenthours : currenthours;
          currentMints = currentMints < 10 ? "0" + currentMints : currentMints;
          let currentDatetime = currenthours + ':' + currentMints;
          if (birthDateTime > currentDatetime) {
            validFlag = false;
            setbirthDateTime("");
            setCheckbirthDateTime({ hh: "", mm: "", amPm: "" });
            setDateTimeError(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
          } else {
            setDateTimeError(false);
            // alert("Right Time");
          }
        }
      }

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
    if (pregnancyDuration != null) {      
      if (pregnancyDuration < 20 || pregnancyDuration > 44) {
        validFlag = false;
        setPregnancyDurationInvalidError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {       
        setPregnancyDurationInvalidError(false);
      }
    } else {
      setPregnancyDurationInvalidError(false);     
    }

    if (validFlag == true) {
      // sessionStorage.setItem("stateId", stateId ? stateId : null);
      // sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      // // sessionStorage.setItem("workFlowCode", workFlowCode);
      // sessionStorage.setItem("childDOB", childDOB ? childDOB : null);
      // sessionStorage.setItem("birthDateTime", birthDateTime ? birthDateTime : null);
      // sessionStorage.setItem("gender", gender ? gender.code : null);
      // sessionStorage.setItem("childAadharNo", childAadharNo ? childAadharNo : null);      
      // sessionStorage.setItem("birthPlace", birthPlace.code);
      // sessionStorage.setItem("hospitalCode", hospitalName ? hospitalName.code : null);
      // sessionStorage.setItem("hospitalName", hospitalName ? hospitalName.hospitalName : null);
      // sessionStorage.setItem("hospitalNameMl", hospitalName ? hospitalNameMl.hospitalNamelocal : null);
      // sessionStorage.setItem("institutionTypeCode", institution ? institution.code : null);
      // sessionStorage.setItem("institution", institution ? institution.name : null);
      // sessionStorage.setItem("institutionNameCode", institutionId ? institutionId.code : null);
      // sessionStorage.setItem("institutionId", institutionId ? institutionId.institutionName : null);
      // sessionStorage.setItem("institutionIdMl", institutionIdMl ? institutionIdMl.institutionNamelocal : null);
      // sessionStorage.setItem("adrsHouseNameEn", adrsHouseNameEn ? adrsHouseNameEn : null);
      // sessionStorage.setItem("adrsHouseNameMl", adrsHouseNameMl ? adrsHouseNameMl : null);
      // sessionStorage.setItem("adrsLocalityNameEn", adrsLocalityNameEn ? adrsLocalityNameEn : null);
      // sessionStorage.setItem("adrsLocalityNameMl", adrsLocalityNameMl ? adrsLocalityNameMl : null);
      // sessionStorage.setItem("adrsStreetNameEn", adrsStreetNameEn ? adrsStreetNameEn : null);
      // sessionStorage.setItem("adrsStreetNameMl", adrsStreetNameMl ? adrsStreetNameMl : null);
      // sessionStorage.setItem("adrsPostOffice", adrsPostOffice ? adrsPostOffice.code : null);
      // sessionStorage.setItem("adrsPincode", adrsPincode ? adrsPincode.code : null);
      // sessionStorage.setItem("wardNo", wardNo ? wardNo.code : null);
      // sessionStorage.setItem("wardNameEn", wardNo ? wardNo.name : null);
      // sessionStorage.setItem("wardNameMl", wardNo ? wardNo.localname : null);
      // sessionStorage.setItem("wardNumber", wardNo ? wardNo.wardno : null);
      // sessionStorage.setItem("vehicleType", vehicleType ? vehicleType : null);
      // sessionStorage.setItem("vehicleRegistrationNo", vehicleRegistrationNo ? vehicleRegistrationNo : null);
      // sessionStorage.setItem("vehicleFromEn", vehicleFromEn ? vehicleFromEn : null);
      // sessionStorage.setItem("vehicleToEn", vehicleToEn ? vehicleToEn : null);
      // sessionStorage.setItem("vehicleFromMl", vehicleFromMl ? vehicleFromMl : null);
      // sessionStorage.setItem("vehicleToMl", vehicleToMl ? vehicleToMl : null);
      // sessionStorage.setItem("vehicleHaltPlace", vehicleHaltPlace ? vehicleHaltPlace : null);
      // // sessionStorage.setItem("vehicleHaltPlaceMl", vehicleHaltPlaceMl ? vehicleHaltPlaceMl : null);
      // sessionStorage.setItem("setadmittedHospitalEn", setadmittedHospitalEn ? setadmittedHospitalEn.code : null);
      // sessionStorage.setItem("vehicleDesDetailsEn", vehicleDesDetailsEn ? vehicleDesDetailsEn : null);
      // sessionStorage.setItem("publicPlaceType", publicPlaceType ? publicPlaceType.code : null);
      // sessionStorage.setItem("localityNameEn", localityNameEn ? localityNameEn : null);
      // sessionStorage.setItem("localityNameMl", localityNameMl ? localityNameMl : null);
      // sessionStorage.setItem("streetNameEn", streetNameEn ? streetNameEn : null);
      // sessionStorage.setItem("streetNameMl", streetNameMl ? streetNameMl : null);
      // sessionStorage.setItem("publicPlaceDecpEn", publicPlaceDecpEn ? publicPlaceDecpEn : null);
      // sessionStorage.setItem("birthWeight", birthWeight ? birthWeight : null);
      // sessionStorage.setItem("pregnancyDuration", pregnancyDuration ? pregnancyDuration.code : null);
      // sessionStorage.setItem("medicalAttensionSub", medicalAttensionSub ? medicalAttensionSub.code : null);
      // sessionStorage.setItem("deliveryMethods", deliveryMethods ? deliveryMethods.code : null);
      // sessionStorage.setItem("motherFirstNameEn", motherFirstNameEn ? motherFirstNameEn : null);
      // sessionStorage.setItem("motherFirstNameMl", motherFirstNameMl ? motherFirstNameMl : null);
      // sessionStorage.setItem("motherAadhar", motherAadhar ? motherAadhar : null);
      // sessionStorage.setItem("addressOfMother", addressOfMother ? addressOfMother : null);
      
      let IsEditChangeScreen = (isEditAbandonedBirth ? isEditAbandonedBirth : false);

      onSelect(config.key, {
         stateId,
         tenantId, 
         childDOB, 
         birthDateTime, 
         gender,       
        birthPlace, 
        hospitalCode, 
        hospitalName, 
        hospitalNameMl,
        institutionTypeCode, 
        institution, 
        institutionNameCode, 
        institutionId, 
        institutionIdMl,
        wardNo, 
        wardNameEn, 
        wardNameMl, 
        wardNumber, 
        adrsHouseNameEn: adrsHouseNameEn.trim(),
        adrsHouseNameMl: adrsHouseNameMl.trim(),
        adrsLocalityNameEn: adrsLocalityNameEn.trim(), 
        adrsLocalityNameMl: adrsLocalityNameMl.trim(),
        adrsStreetNameEn: adrsStreetNameEn.trim(), 
        adrsStreetNameMl: adrsStreetNameMl.trim(),
        adrsPostOffice, 
        adrsPincode,
        vehicleType, 
        vehicleHaltPlace: vehicleHaltPlace.trim(),
        vehicleRegistrationNo: vehicleRegistrationNo.trim(),
        vehicleFromEn: vehicleFromEn.trim(),
         vehicleToEn: vehicleToEn.trim(), 
         vehicleFromMl: vehicleFromMl.trim(),
        vehicleToMl: vehicleToMl.trim(), 
        setadmittedHospitalEn, 
        vehicleDesDetailsEn: vehicleDesDetailsEn.trim(),
        publicPlaceType, 
        localityNameEn: localityNameEn.trim(), 
        localityNameMl: localityNameMl.trim(), 
        streetNameEn: streetNameEn.trim(), 
        streetNameMl: streetNameMl.trim(),
        publicPlaceDecpEn: publicPlaceDecpEn.trim(),
        birthWeight, 
        pregnancyDuration, 
        medicalAttensionSub, 
        deliveryMethods,
        // motherFirstNameEn: motherFirstNameEn.trim(),
        // motherFirstNameMl: motherFirstNameMl.trim(),
        // motherAadhar: motherAadhar.trim(),
        // addressOfMother: addressOfMother.trim(),
        motherFirstNameEn,
        motherFirstNameMl,
        motherAadhar,
        addressOfMother,
        isMotherInfo,
        DifferenceInTime,
        IsEditChangeScreen
      });
    }
  };
  if (isEditAbandonedBirth && isEditAbandonedBirthPageComponents  === false && (formData?.AbandonedChildDetails?.IsEditChangeScreen === false || formData?.AbandonedChildDetails?.IsEditChangeScreen === undefined)) {

    if (formData?.AbandonedChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter(menu => menu.code === formData?.AbandonedChildDetails?.gender)[0]);
      }
    }
    if (formData?.AbandonedChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.AbandonedChildDetails?.birthPlace)[0]);
        setValue(formData?.AbandonedChildDetails?.birthPlace);
      }
    }
    if (formData?.AbandonedChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.AbandonedChildDetails?.medicalAttensionSub)[0]);
      }
    }
    // if (formData?.AbandonedChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.AbandonedChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    if (formData?.AbandonedChildDetails?.deliveryMethods != null) {
      if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
        setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.AbandonedChildDetails?.deliveryMethods)[0]);
      }
    } 
  }
    
  if (
    // isWorkFlowDetailsLoading || 
     isLoading || isAttentionOfDeliveryLoading || isDeliveryMethodListLoading || isPlaceMasterLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!childDOB || !gender || !birthPlace
          || (value === "HOSPITAL" ? (!hospitalName || !hospitalNameMl) : false)
          || (value === "INSTITUTION" ? (!institution || !institutionId || !institutionIdMl) : false)
          || (value === "HOME" ? (!wardNo || !adrsPostOffice || adrsPincode === "" || adrsLocalityNameEn === ""
            || adrsHouseNameEn === "" || adrsLocalityNameMl === "" || adrsHouseNameMl === "") : false)
          || (value === "PUBLIC_PLACES" ? (!publicPlaceType || !wardNo || localityNameEn === "" || localityNameMl === "") : false)
          || (value === "VEHICLE" ? (!vehicleType || vehicleRegistrationNo === "" || vehicleHaltPlace === ""
            || !setadmittedHospitalEn || !wardNo || vehicleDesDetailsEn === "") : false) }>
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
                  //min={convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  disable={isDisableEdit}
                  // disable={isEdit}
                  //  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}

                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" onChange={val => handleTimeChange(val, setbirthDateTime)}
                  value={birthDateTime}
                  disable={isDisableEdit}
                  // disable={isEdit}
                />
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
                  //  disable={isEdit}
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div> 
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
                  optionKey="name"
                  isMandatory={false}
                  option={cmbPlaceMaster}
                  selected={birthPlace}
                  disable={isDisableEdit}
                //  disable={isEdit}
                  select={setselectBirthPlace}
                  placeholder={`${t("CR_BIRTH_PLACE")}`}
                />
              </div>
            </div>
          </div>
          {value === "HOSPITAL" && (
            <div>
              <AbandonedBirthPlaceHospital
                selectHospitalName={selectHospitalName}
                hospitalName={hospitalName}
                hospitalNameMl={hospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
                disable={isDisableEdit}
                // disable={isEdit}
                isEditAbandonedBirth={isEditAbandonedBirth}
              />
            </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <AbandonedBirthPlaceInstitution
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
                isEditAbandonedBirth={isEditAbandonedBirth}
              />
            </div>
          )}
          {value === "HOME" && (
            <div>
              <AbandonedBirthPlaceHome
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
                isEditAbandonedBirth={isEditAbandonedBirth}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <AbandonedBirthPlaceVehicle
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
                isEditAbandonedBirth={isEditAbandonedBirth}
              />
            </div>
          )}
          {value === "PUBLIC_PLACES" && (
            <div>
              <AbandonedBirthPlacePublicPlace
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
                isEditAbandonedBirth={isEditAbandonedBirth}
              />
            </div>
          )}   

        <div className="row">
        <div className="col-md-12">
            <div className="col-md-12">             
              <CheckBox label={t("CR_MOTHER_INFORMATION_MISSING")} onChange={setMotherInfo} value={isMotherInfo} checked={isMotherInfo} />
            </div>
            </div>
          </div>
          {isMotherInfo === false && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="motherAadhar"
                      value={motherAadhar}
                      onChange={setSelectMotherAadhar}
                      disable={isDisableEdit}
                      // disable={isEdit}
                      placeholder={`${t("CS_COMMON_AADHAAR")}`}
                      {...(validation = { pattern: "^[0-9]{12}$", type: "test", isRequired: false, title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                    />
                  </div>

                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_MOTHER_NAME_EN")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="motherFirstNameEn"
                      value={motherFirstNameEn}
                      onChange={setSelectMotherFirstNameEn}
                      disable={isDisableEdit}
                      //  disable={isEdit}
                       placeholder={`${t("CR_MOTHER_NAME_EN")}`}
                      {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_NAME_EN") })}
                    />
                  </div>

                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_MOTHER_NAME_ML")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="motherFirstNameMl"
                      value={motherFirstNameMl}
                      onKeyPress={setCheckMalayalamInputField}
                      onChange={setSelectMotherFirstNameMl}
                      disable={isDisableEdit}
                      //  disable={isEdit}
                       placeholder={`${t("CR_MOTHER_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_MOTHER_NAME_ML"),
                      })}
                    />
                  </div>
                  <div className="col-md-3">
              <CardLabel>{`${t("CR_MOTHER_ADDRESS")}`}   <span className="mandatorycss">*</span></CardLabel>
              <TextArea
                t={t}
                type={"text"}
                isMandatory={false}
                optionKey="i18nKey"
                name="addressOfMother"
                value={addressOfMother}
                onChange={setSelectmotherAddress}
                disable={isDisableEdit}
                // disable={isEdit}
                      placeholder={`${t("CR_MOTHER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_MOTHER_ADDRESS") })}
              />
            </div>
                </div>
              </div> 
            </div>
          )}

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
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} </CardLabel>
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
                <CardLabel>{`${t("CR_PREGNANCY_DURATION")}`} </CardLabel>
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
                    isRequired: false,
                    type: "text",
                    title: t("CR_INVALID_PREGNANCY_DURATION"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_DELIVERY_METHOD")}`}</CardLabel>
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
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"decimal"}
                  optionKey="i18nKey"
                  name="birthWeight"
                  value={birthWeight}
                  onChange={setSelectBirthWeight}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BIRTH_WEIGHT")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: false, type: "decimal", title: t("CR_INVALID_BIRTH_WEIGHT") })}
                />
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                DOBError|| DateTimeError || DateTimeHourError || DateTimeMinuteError || DateTimeAMPMError || HospitalError || InstitutionError || InstitutionNameError ||
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
                placeTypepEnError || localNameEnError || localNameMlError ||PregnancyDurationInvalidError

                // ||
                // MedicalAttensionSubStError || DeliveryMethodStError || BirthWeightError
                //  

              }
              label={
                  DOBError || 
                   DateTimeError || 
                   DateTimeHourError || 
                   DateTimeMinuteError || 
                   DateTimeAMPMError ||
                  HospitalError || 
                  InstitutionError || 
                  InstitutionNameError ||
                  WardError ||
                  AdsHomePincodeError ||
                  AdsHomePostOfficeError ||
                  AdsHomeLocalityNameEnError ||
                  AdsHomeLocalityNameMlError ||
                  AdsHomeHouseNameEnError || 
                  AdsHomeHouseNameMlError ||
                  vehiTypeError ||
                  vehicleRegiNoError ||
                  vehicleHaltPlaceError ||
                  admittedHospitalEnError || 
                  vehiDesDetailsEnError ||
                  placeTypepEnError || 
                  localNameEnError || 
                  localNameMlError ||                 
                  PregnancyDurationInvalidError
               
                  ?
                  HospitalError ? t(`BIRTH_ERROR_HOSPITAL_CHOOSE`)
                  : DateTimeError
                      ? t(`CS_COMMON_DATE_TIME_ERROR`)
                      : DateTimeHourError
                        ? t(`CS_COMMON_DATE_HOUR_ERROR`)
                        : DateTimeMinuteError
                          ? t(`CS_COMMON_DATE_MINUTE_ERROR`)
                          : DateTimeAMPMError
                            ? t(`CS_COMMON_DATE_AMPM_ERROR`)      
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
                                                        //  : PregnancyDurationStError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                                                          : PregnancyDurationInvalidError ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)


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
export default AbandonedChildDetails;