import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/SBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import StillBirthPlaceHospital from "../../pageComponents/stillBirthComponents/StillBirthPlaceHospital";
import StillBirthPlaceInstitution from "../../pageComponents/stillBirthComponents/StillBirthPlaceInstitution";
import StillBirthPlaceHome from "../../pageComponents/stillBirthComponents/StillBirthPlaceHome";
import StillBirthPlaceVehicle from "../../pageComponents/stillBirthComponents/StillBirthPlaceVehicle";
import StillBirthPlacePublicPlace from "../../pageComponents/stillBirthComponents/StillBirthPlacePublicPlace";

const StillBirthChildDetails = ({ config, onSelect, userType, formData, isEditStillBirth }) => {
  // console.log(JSON.stringify(formData));  
  console.log(formData);
  console.log(isEditStillBirth);
  const [isEditStillBirthPageComponents, setIsEditStillBirthPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const [workFlowCode, setWorkFlowCode] = useState();

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const { t } = useTranslation();


 
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "AttentionOfDelivery"
  );
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "DeliveryMethod"
  );
  const { data: FoetalDeathList = {}, isFoetalDeathListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "FoetalDeath"
  );
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowBirth"
  );
  // console.log(FoetalDeathList);
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
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];
  let cmbFoetalDeath = [];
  let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  let workFlowData = [];
  let Difference_In_DaysRounded = "";
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
      workFlowData.push(ob);
      // console.log(workFlowData);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  PlaeceMaster &&
    PlaeceMaster["birth-death-service"] &&
    PlaeceMaster["birth-death-service"].PlaceMaster &&
    PlaeceMaster["birth-death-service"].PlaceMaster.map((ob) => {
      cmbPlaceMaster.push(ob);
    });

  AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"] &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
      cmbAttDeliverySub.push(ob);
    });
  DeliveryMethodList &&
    DeliveryMethodList["birth-death-service"] &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
      cmbDeliveryMethod.push(ob);
    });
  FoetalDeathList &&
    FoetalDeathList["birth-death-service"] &&
    FoetalDeathList["birth-death-service"].FoetalDeath &&
    FoetalDeathList["birth-death-service"].FoetalDeath.map((ob) => {
      cmbFoetalDeath.push(ob);
    });
 const [childDOB, setChildDOB] = useState(isEditStillBirth && isEditStillBirthPageComponents === false && (formData?.StillBirthChildDetails?.IsEditChangeScreen === false || formData?.StillBirthChildDetails?.IsEditChangeScreen === undefined) ? convertEpochToDate(formData?.StillBirthChildDetails?.childDOB) : formData?.StillBirthChildDetails?.childDOB); //formData?.ChildDetails?.childDOB
 const [gender, selectGender] = useState(formData?.StillBirthChildDetails?.gender?.code ? formData?.StillBirthChildDetails?.gender : formData?.StillBirthChildDetails?.gender ?
  (menu.filter(menu => menu.code === formData?.StillBirthChildDetails?.gender)[0]) : "");
 // const [childDOB, setChildDOB] = useState(formData?.StillBirthChildDetails?.childDOB ? formData?.StillBirthChildDetails?.childDOB : "");
 // const [gender, selectGender] = useState(formData?.StillBirthChildDetails?.gender);
  const [childAadharNo, setChildAadharNo] = useState(
    formData?.StillBirthChildDetails?.childAadharNo ? formData?.StillBirthChildDetails?.childAadharNo : ""
  );
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [birthDateTime, setbirthDateTime] = useState(
    formData?.StillBirthChildDetails?.birthDateTime ? formData?.StillBirthChildDetails?.birthDateTime : ""
  );
  // const [isChildName, setIsChildName] = useState(
  //   formData?.StillBirthChildDetails?.isChildName ? formData?.StillBirthChildDetails?.isChildName : false
  // );
  const [birthPlace, selectBirthPlace] = useState(formData?.StillBirthChildDetails?.birthPlace?.code ? formData?.StillBirthChildDetails?.birthPlace : formData?.StillBirthChildDetails?.birthPlace ?
    (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.StillBirthChildDetails?.birthPlace)[0]) : "");
  //const [birthPlace, selectBirthPlace] = useState(formData?.StillBirthChildDetails?.birthPlace ? formData?.StillBirthChildDetails?.birthPlace : null);
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(formData?.StillBirthChildDetails?.hospitalName?.code ? formData?.StillBirthChildDetails?.hospitalName : formData?.StillBirthChildDetails?.hospitalName ? "" : "");
  const [hospitalNameMl, selectHospitalNameMl] = useState(formData?.StillBirthChildDetails?.hospitalNameMl?.code ? formData?.StillBirthChildDetails?.hospitalNameMl : formData?.StillBirthChildDetails?.hospitalNameMl ? "" : "");
  // const [hospitalName, selectHospitalName] = useState(
  //   formData?.StillBirthChildDetails?.hospitalName ? formData?.StillBirthChildDetails?.hospitalName : null
  // );
  // const [hospitalNameMl, selectHospitalNameMl] = useState(
  //   formData?.StillBirthChildDetails?.hospitalNameMl ? formData?.StillBirthChildDetails?.hospitalNameMl : null
  // );
  const [institution, setInstitution] = useState(formData?.StillBirthChildDetails?.institution?.code ? formData?.StillBirthChildDetails?.institution : formData?.StillBirthChildDetails?.institutionTypeCode ? "" : "");
  const [institutionId, setInstitutionId] = useState(formData?.StillBirthChildDetails?.institutionId?.code ? formData?.StillBirthChildDetails?.institutionId : formData?.StillBirthChildDetails?.institutionNameCode ? "" : "");
  const [institutionIdMl, setInstitutionIdMl] = useState(formData?.StillBirthChildDetails?.institutionIdMl?.code ? formData?.StillBirthChildDetails?.institutionIdMl : formData?.StillBirthChildDetails?.institutionNameCode ? "" : "");

  // const [institution, setInstitution] = useState(
  //   formData?.StillBirthChildDetails?.institution ? formData?.StillBirthChildDetails?.institution : null
  // );
  // const [institutionIdMl, setInstitutionIdMl] = useState(
  //   formData?.StillBirthChildDetails?.institutionIdMl ? formData?.StillBirthChildDetails?.institutionIdMl : null
  // );
  // const [institutionId, setInstitutionId] = useState(
  //   formData?.StillBirthChildDetails?.institutionId ? formData?.StillBirthChildDetails?.institutionId : null
  // );

  const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.StillBirthChildDetails?.adrsPostOffice?.code ? formData?.StillBirthChildDetails?.adrsPostOffice : formData?.StillBirthChildDetails?.adrsPostOffice ? "" : "");
  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.ChildDetails?.adrsPostOffice ? formData?.ChildDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.StillBirthChildDetails?.adrsPincode ? formData?.StillBirthChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.StillBirthChildDetails?.adrsHouseNameEn ? formData?.StillBirthChildDetails?.adrsHouseNameEn : "");
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.StillBirthChildDetails?.adrsHouseNameMl ? formData?.StillBirthChildDetails?.adrsHouseNameMl : "");
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.StillBirthChildDetails?.adrsLocalityNameEn ? formData?.StillBirthChildDetails?.adrsLocalityNameEn : "");
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.StillBirthChildDetails?.adrsLocalityNameMl ? formData?.StillBirthChildDetails?.adrsLocalityNameMl : "");
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.StillBirthChildDetails?.adrsStreetNameEn ? formData?.StillBirthChildDetails?.adrsStreetNameEn : "");
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.StillBirthChildDetails?.adrsStreetNameMl ? formData?.StillBirthChildDetails?.adrsStreetNameMl : "");
  const [wardNo, setWardNo] = useState(formData.StillBirthChildDetails?.wardNo?.code ? formData.StillBirthChildDetails?.wardNo : formData?.StillBirthChildDetails?.wardNo ? "" : "");


  const [vehicleType, setvehicleType] = useState(formData?.StillBirthChildDetails?.vehicleType?.code ? formData?.StillBirthChildDetails?.vehicleType : formData?.StillBirthChildDetails?.vehicleType ? "" : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.StillBirthChildDetails?.vehicleRegistrationNo ? formData?.StillBirthChildDetails?.vehicleRegistrationNo : "");
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.StillBirthChildDetails?.vehicleFromEn ? formData?.StillBirthChildDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.StillBirthChildDetails?.vehicleToEn ? formData?.StillBirthChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.StillBirthChildDetails?.vehicleFromMl ? formData?.StillBirthChildDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.StillBirthChildDetails?.vehicleHaltPlace ? formData?.StillBirthChildDetails?.vehicleHaltPlace : "");
 
  const [vehicleToMl, setvehicleToMl] = useState(formData?.StillBirthChildDetails?.vehicleToMl ? formData?.StillBirthChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.StillBirthChildDetails?.vehicleDesDetailsEn ? formData?.StillBirthChildDetails?.vehicleDesDetailsEn : "");
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.StillBirthChildDetails?.setadmittedHospitalEn?.code ? formData?.StillBirthChildDetails?.setadmittedHospitalEn : formData?.StillBirthChildDetails?.setadmittedHospitalEn ? "" : "");
 
  // const [vehicleType, setvehicleType] = useState(formData?.StillBirthChildDetails?.vehicleType ? formData?.StillBirthChildDetails?.vehicleType : "");
  // const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(
  //   formData?.StillBirthChildDetails?.vehicleRegistrationNo ? formData?.StillBirthChildDetails?.vehicleRegistrationNo : ""
  // );
  // const [vehicleFromEn, setvehicleFromEn] = useState(
  //   formData?.StillBirthChildDetails?.vehicleFromEn ? formData?.StillBirthChildDetails?.vehicleFromEn : ""
  // );
  // const [vehicleToEn, setvehicleToEn] = useState(formData?.StillBirthChildDetails?.vehicleToEn ? formData?.StillBirthChildDetails?.vehicleToEn : "");
  // const [vehicleFromMl, setvehicleFromMl] = useState(
  //   formData?.StillBirthChildDetails?.vehicleFromMl ? formData?.StillBirthChildDetails?.vehicleFromMl : ""
  // );
  // const [vehicleHaltPlace, setvehicleHaltPlace] = useState(
  //   formData?.StillBirthChildDetails?.vehicleHaltPlace ? formData?.StillBirthChildDetails?.vehicleHaltPlace : ""
  // );
  // const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(
  //   formData?.StillBirthChildDetails?.vehicleHaltPlaceMl ? formData?.StillBirthChildDetails?.vehicleHaltPlaceMl : ""
  // );
  // const [vehicleToMl, setvehicleToMl] = useState(formData?.StillBirthChildDetails?.vehicleToMl ? formData?.StillBirthChildDetails?.vehicleToMl : "");
  // const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(
  //   formData?.StillBirthChildDetails?.vehicleDesDetailsEn ? formData?.StillBirthChildDetails?.vehicleDesDetailsEn : ""
  // );
  // const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(
  //   formData?.StillBirthChildDetails?.setadmittedHospitalEn ? formData?.StillBirthChildDetails?.setadmittedHospitalEn : ""
  // );

  const [publicPlaceType, setpublicPlaceType] = useState(formData?.StillBirthChildDetails?.publicPlaceType?.code ? formData?.StillBirthChildDetails?.publicPlaceType : formData?.StillBirthChildDetails?.publicPlaceType ? "" : "");
  const [localityNameEn, setlocalityNameEn] = useState(formData?.StillBirthChildDetails?.localityNameEn ? formData?.StillBirthChildDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.StillBirthChildDetails?.localityNameMl ? formData?.StillBirthChildDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.StillBirthChildDetails?.streetNameEn ? formData?.StillBirthChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.StillBirthChildDetails?.streetNameMl ? formData?.StillBirthChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(formData?.StillBirthChildDetails?.publicPlaceDecpEn ? formData?.StillBirthChildDetails?.publicPlaceDecpEn : "");


  // const [publicPlaceType, setpublicPlaceType] = useState(
  //   formData?.StillBirthChildDetails?.publicPlaceType ? formData?.StillBirthChildDetails?.publicPlaceType : ""
  // );
  // const [localityNameEn, setlocalityNameEn] = useState(
  //   formData?.StillBirthChildDetails?.localityNameEn ? formData?.StillBirthChildDetails?.localityNameEn : ""
  // );
  // const [localityNameMl, setlocalityNameMl] = useState(
  //   formData?.StillBirthChildDetails?.localityNameMl ? formData?.StillBirthChildDetails?.localityNameMl : ""
  // );
  // const [streetNameEn, setstreetNameEn] = useState(
  //   formData?.StillBirthChildDetails?.streetNameEn ? formData?.StillBirthChildDetails?.streetNameEn : ""
  // );
  // const [streetNameMl, setstreetNameMl] = useState(
  //   formData?.StillBirthChildDetails?.streetNameMl ? formData?.StillBirthChildDetails?.streetNameMl : ""
  // );
  // const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(
  //   formData?.StillBirthChildDetails?.publicPlaceDecpEn ? formData?.StillBirthChildDetails?.publicPlaceDecpEn : ""
  // );
  const [pregnancyDuration, setPregnancyDuration] = useState(formData?.StillBirthChildDetails?.pregnancyDuration ? formData?.StillBirthChildDetails?.pregnancyDuration : "");
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(formData?.StillBirthChildDetails?.medicalAttensionSub?.code ? formData?.StillBirthChildDetails?.medicalAttensionSub : formData?.StillBirthChildDetails?.medicalAttensionSub ?
    (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.StillBirthChildDetails?.medicalAttensionSub)[0]) : "");
  
    const [causeFoetalDeath, setcauseFoetalDeath] = useState(
      formData?.StillBirthChildDetails?.causeFoetalDeath ? formData?.StillBirthChildDetails?.causeFoetalDeath : "" );
        // const [pregnancyDuration, setPregnancyDuration] = useState(
  //   formData?.StillBirthChildDetails?.pregnancyDuration ? formData?.StillBirthChildDetails?.pregnancyDuration : null
  // );
  // const [medicalAttensionSub, setMedicalAttensionSub] = useState(
  //   formData?.StillBirthChildDetails?.medicalAttensionSub ? formData?.StillBirthChildDetails?.medicalAttensionSub : null
  // );
  const [deliveryMethods, setDeliveryMethod] = useState(
    formData?.StillBirthChildDetails?.deliveryMethods ? formData?.StillBirthChildDetails?.deliveryMethods : ""
  );
  //const [birthWeight, setBirthWeight] = useState(formData?.StillBirthChildDetails?.birthWeight ? formData?.StillBirthChildDetails?.birthWeight : "");
 
  const [toast, setToast] = useState(false);
  //const [AadharError, setAadharError] = useState(formData?.StillBirthChildDetails?.childAadharNo ? false : false);
   const [ChildAadharHIde, setChildAadharHIde] = useState(formData?.StillBirthChildDetails?.childAadharNo ? true : false);
  const [DOBError, setDOBError] = useState(formData?.StillBirthChildDetails?.childDOB ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.StillBirthChildDetails?.hospitalName ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.StillBirthChildDetails?.institution ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.StillBirthChildDetails?.institutionId ? false : false);
  const [WardError, setAdsWardError] = useState(formData?.BirthPlaceHomeDetails?.wardNo ? false : false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameEn ? false : false
  );
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameMl ? false : false
  );
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.StillBirthChildDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.StillBirthChildDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.StillBirthChildDetails?.vehicleHaltPlace ? false : false);
  const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.StillBirthChildDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.StillBirthChildDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.StillBirthChildDetails?.vehicleDesDetailsEn ? false : false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.StillBirthChildDetails?.publicPlaceType ? false : false);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.StillBirthChildDetails?.localityNameEn ? false : false);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.StillBirthChildDetails?.localityNameMl ? false : false);
  const [DeliveryMethodSubError, setDeliveryMethodSubError] = useState(formData?.StillBirthChildDetails?.DeliveryMethodSub ? false : false);
  const [causeFoetalDeathError, setcauseFoetalDeathError] = useState(formData?.StillBirthChildDetails?.causeFoetalDeath ? false : false);

  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.StillBirthChildDetails?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.StillBirthChildDetails?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.StillBirthChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(
    formData?.StillBirthChildDetails?.pregnancyDuration ? false : false
  );

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  React.useEffect(() => {
    if (isInitialRenderPlace) {
      if (birthPlace) {
        setIsInitialRenderPlace(false);
        placeOfBirth = birthPlace.code;
        setValue(placeOfBirth);

        if (placeOfBirth === "HOSPITAL") {
          <StillBirthPlaceHospital hospitalName={hospitalName} hospitalNameMl={hospitalNameMl} />;
        }
        if (placeOfBirth === "INSTITUTION") {
          setIsInitialRenderInstitutionList(true);
          <StillBirthPlaceInstitution
            institution={institution}
            institutionIdMl={institutionIdMl}
            institutionId={institutionId}
            InstitutionFilterList={InstitutionFilterList}
            isInitialRenderInstitutionList={isInitialRenderInstitutionList}
          />;
        }
        if (placeOfBirth === "HOME") {
          <StillBirthPlaceHome
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
          <StillBirthPlaceVehicle
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
          <StillBirthPlacePublicPlace
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
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
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
  }



  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(
      e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 2)
    );
  }

  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }
  function setSelectcauseFoetalDeath(value) {
    setcauseFoetalDeath(value);
  }

  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
      console.log(value);
      let hour = value;
      let period = hour > 12 ? "PM" : "AM";
      console.log(period);
      setbirthDateTime(value);
    }
  };

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.BirtPlace === value.code &&
        workFlowData.startdateperiod <= Difference_In_DaysRounded &&
        workFlowData.enddateperiod >= Difference_In_DaysRounded
    );
    // console.log(currentWorgFlow[0].WorkflowCode);
    // workFlowCode=currentWorgFlow[0].WorkflowCode;
    setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
  }
  let validFlag = true;
  const goNext = () => {
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

    if (causeFoetalDeath == null || causeFoetalDeath == "" || causeFoetalDeath == undefined) {
      validFlag = false;
      setcauseFoetalDeathError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setcauseFoetalDeathError(false);
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
      sessionStorage.setItem("setadmittedHospitalEn", setadmittedHospitalEn ? setadmittedHospitalEn.code : null);
      sessionStorage.setItem("vehicleDesDetailsEn", vehicleDesDetailsEn ? vehicleDesDetailsEn : null);
      sessionStorage.setItem("publicPlaceType", publicPlaceType ? publicPlaceType.code : null);
      sessionStorage.setItem("localityNameEn", localityNameEn ? localityNameEn : null);
      sessionStorage.setItem("localityNameMl", localityNameMl ? localityNameMl : null);
      sessionStorage.setItem("streetNameEn", streetNameEn ? streetNameEn : null);
      sessionStorage.setItem("streetNameMl", streetNameMl ? streetNameMl : null);
      sessionStorage.setItem("publicPlaceDecpEn", publicPlaceDecpEn ? publicPlaceDecpEn : null);
      sessionStorage.setItem("causeFoetalDeath", causeFoetalDeath ? causeFoetalDeath.code : null);
      sessionStorage.setItem("pregnancyDuration", pregnancyDuration ? pregnancyDuration.code : null);
      sessionStorage.setItem("medicalAttensionSub", medicalAttensionSub ? medicalAttensionSub.code : null);
      sessionStorage.setItem("deliveryMethods", deliveryMethods ? deliveryMethods.code : null);
      let IsEditChangeScreen = (isEditStillBirth ? isEditStillBirth : false);
      onSelect(config.key, {
        stateId,
        tenantId,
        childDOB,
        birthDateTime,
        gender,
        workFlowCode,

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
        adrsHouseNameEn,
        adrsHouseNameMl,
        adrsLocalityNameEn,
        adrsLocalityNameMl,
        adrsStreetNameEn,
        adrsStreetNameMl,
        adrsPostOffice,
        adrsPincode,
        vehicleType,
        vehicleHaltPlace,
        vehicleRegistrationNo,
        vehicleFromEn,
        vehicleToEn,
        vehicleFromMl,
        vehicleToMl,
        setadmittedHospitalEn,
        vehicleDesDetailsEn,
        publicPlaceType,
        localityNameEn,
        localityNameMl,
        streetNameEn,
        streetNameMl,
        publicPlaceDecpEn,
        causeFoetalDeath,
        pregnancyDuration,
        medicalAttensionSub,
        deliveryMethods,
        IsEditChangeScreen,
      });
    }
  };
  if (isEditStillBirth && isEditStillBirthPageComponents === false && (formData?.StillBirthChildDetails?.IsEditChangeScreen === false || formData?.StillBirthChildDetails?.IsEditChangeScreen === undefined)) {

    if (formData?.StillBirthChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter(menu => menu.code === formData?.StillBirthChildDetails?.gender)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.StillBirthChildDetails?.birthPlace)[0]);
        setValue(formData?.StillBirthChildDetails?.birthPlace);
      }
    }
    if (formData?.StillBirthChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.StillBirthChildDetails?.medicalAttensionSub)[0]);
      }
    }
    if (formData?.ChildDetails?.pregnancyDuration != null) {
      console.log("pregnancyDuration" + pregnancyDuration);
      if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
        setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.ChildDetails?.pregnancyDuration)[0]);
      }
    }
    if (formData?.ChildDetails?.deliveryMethods != null) {
      if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
        // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.ChildDetails?.deliveryMethods)[0]);
        setDeliveryMethod(cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.StillBirthChildDetails?.deliveryMethods)[0]);
      }
    }
  }

  // if (isEditBirth) {
  if (formData?.StillBirthChildDetails?.gender != null) {
    if (menu.length > 0 && (gender === undefined || gender === "")) {
      selectGender(menu.filter((menu) => menu.code === formData?.StillBirthChildDetails?.gender)[0]);
      setisInitialRenderFormData(true);
    }
  }
  if (formData?.StillBirthChildDetails?.birthPlace != null) {
    if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
      selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.StillBirthChildDetails?.birthPlace)[0]);
      setValue(formData?.StillBirthChildDetails?.birthPlace);
      setisInitialRenderFormData(true);
    }
  }
  if (formData?.StillBirthChildDetails?.medicalAttensionSub != null) {
    if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
      setMedicalAttensionSub(
        cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.StillBirthChildDetails?.medicalAttensionSub)[0]
      );
      setisInitialRenderFormData(true);
    }
  }

  if (formData?.StillBirthChildDetails?.deliveryMethods != null) {
    if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
      // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.StillBirthChildDetails?.deliveryMethods)[0]);
      setDeliveryMethod(
        cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.StillBirthChildDetails?.deliveryMethods)[0]
      );
      setisInitialRenderFormData(true);
    }
  }
  // }

  if (
    isWorkFlowDetailsLoading ||
    isLoading ||
    isAttentionOfDeliveryLoading ||
    isDeliveryMethodListLoading ||
    isFoetalDeathListLoading ||
    isPlaceMasterLoading
  ) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !childDOB ||
            !gender ||
            !birthPlace ||
            (value === "HOSPITAL" ? !hospitalName || !hospitalNameMl : false) ||
            (value === "INSTITUTION" ? !institution || !institutionId || !institutionIdMl : false) ||
            (value === "HOME" ? (!wardNo || !adrsPostOffice || adrsPincode === "" || adrsLocalityNameEn === ""
            || adrsHouseNameEn === "" || adrsLocalityNameMl === "" || adrsHouseNameMl === "") : false)||
            (value === "PUBLIC_PLACES" ? !publicPlaceType || !wardNo || localityNameEn === "" || localityNameMl === "" : false) ||
            (value === "VEHICLE"
              ? !vehicleType ||
                vehicleRegistrationNo === "" ||
                vehicleHaltPlace === "" ||
                !setadmittedHospitalEn ||
                !wardNo ||
                vehicleDesDetailsEn === ""
              : false) ||
            !medicalAttensionSub ||
            !deliveryMethods ||
            causeFoetalDeath == null ||
            pregnancyDuration === ""
          }
        >
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
                <CustomTimePicker name="birthDateTime" onChange={(val) => handleTimeChange(val, setbirthDateTime)} value={birthDateTime} disable={isDisableEdit}/>
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_GENDER")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
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
                  {t("CR_PLACE_OF_BIRTH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={false}
                  option={cmbPlaceMaster}
                  selected={birthPlace}
                  select={setselectBirthPlace}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_BIRTH_PLACE")}`}
                />
              </div>
            </div>
          </div>
          {value === "HOSPITAL" && (
            <div>
              <StillBirthPlaceHospital
                selectHospitalName={selectHospitalName}
                hospitalName={hospitalName}
                hospitalNameMl={hospitalNameMl}
                selectHospitalNameMl={selectHospitalNameMl}
                formData={formData}
                isEditStillBirth={isEditStillBirth}
              />
            </div>
          )}
          {value === "INSTITUTION" && (
            <div>
              <StillBirthPlaceInstitution
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
                isEditStillBirth={isEditStillBirth}
              />
            </div>
          )}
          {value === "HOME" && (
            <div>
              <StillBirthPlaceHome
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
                isEditStillBirth={isEditStillBirth}
              />
            </div>
          )}
          {value === "VEHICLE" && (
            <div>
              <StillBirthPlaceVehicle
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
                isEditStillBirth={isEditStillBirth}
              />
            </div>
          )}
          {value === "PUBLIC_PLACES" && (
            <div>
              <StillBirthPlacePublicPlace
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
                isEditStillBirth={isEditStillBirth}
              />
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
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbAttDeliverySub}
                  selected={medicalAttensionSub}
                  select={setSelectMedicalAttensionSub}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                />
              </div>

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
                  disable={isDisableEdit}
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
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDeliveryMethod}
                  selected={deliveryMethods}
                  select={setSelectDeliveryMethod}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_DELIVERY_METHOD")}`}
                />
              </div>

              <div className="col-md-3">
                <CardLabel>
                  {t("CR_CAUSE_FOETAL_DEATH")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbFoetalDeath}
                  selected={causeFoetalDeath}
                  select={setSelectcauseFoetalDeath}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_CAUSE_FOETAL_DEATH")}`}
                />
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                DOBError ||
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
                MedicalAttensionSubStError ||
                DeliveryMethodStError ||
                causeFoetalDeathError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError
              }
              label={
                DOBError ||
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
                MedicalAttensionSubStError ||
                DeliveryMethodStError ||
                causeFoetalDeathError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError
                  ? HospitalError
                    ? t(`BIRTH_ERROR_HOSPITAL_CHOOSE`)
                    : InstitutionError
                    ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`)
                    : InstitutionNameError
                    ? t(`BIRTH_ERROR_INSTITUTION_NAME_CHOOSE`)
                    : WardError
                    ? t(`BIRTH_ERROR_WARD_CHOOSE`)
                    : AdsHomePincodeError
                    ? t(`BIRTH_ERROR_PINCODE_CHOOSE`)
                    : AdsHomePostOfficeError
                    ? t(`BIRTH_ERROR_POSTOFFICE_CHOOSE`)
                    : AdsHomeLocalityNameEnError
                    ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                    : AdsHomeLocalityNameMlError
                    ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                    : AdsHomeHouseNameEnError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_EN_CHOOSE`)
                    : AdsHomeHouseNameMlError
                    ? t(`BIRTH_ERROR_HOUSE_NAME_ML_CHOOSE`)
                    : vehiTypeError
                    ? t(`BIRTH_ERROR_VEHICLE_TYPE_CHOOSE`)
                    : vehicleRegiNoError
                    ? t(`BIRTH_ERROR_VEHICLE_REGI_NO_CHOOSE`)
                    : vehicleHaltPlaceError
                    ? t(`BIRTH_ERROR_VEHICLE_HALT_PLACE_CHOOSE`)
                    : admittedHospitalEnError
                    ? t(`BIRTH_ERROR_ADMITTED_HOSPITAL_CHOOSE`)
                    : vehiDesDetailsEnError
                    ? t(`BIRTH_ERROR_DESCRIPTION_BOX_CHOOSE`)
                    : placeTypepEnError
                    ? t(`BIRTH_ERROR_PUBLIC_PLACE_TYPE_CHOOSE`)
                    : localNameEnError
                    ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                    : localNameMlError
                    ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                    : causeFoetalDeathError
                    ? t(`CAUSE_FOETAL_DEATH_ERROR`)
                    : MedicalAttensionSubStError
                    ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                    : PregnancyDurationStError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                    : PregnancyDurationInvalidError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)
                    : DeliveryMethodStError
                    ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default StillBirthChildDetails;