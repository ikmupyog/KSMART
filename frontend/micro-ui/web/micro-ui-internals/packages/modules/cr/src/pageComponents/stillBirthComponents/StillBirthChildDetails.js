import React, { useState, useEffect } from "react";
import { CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/SBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import StillBirthPlaceHospital from "../../pageComponents/stillBirthComponents/StillBirthPlaceHospital";
import StillBirthPlaceInstitution from "../../pageComponents/stillBirthComponents/StillBirthPlaceInstitution";
import StillBirthPlaceHome from "../../pageComponents/stillBirthComponents/StillBirthPlaceHome";
import StillBirthPlaceVehicle from "../../pageComponents/stillBirthComponents/StillBirthPlaceVehicle";
import StillBirthPlacePublicPlace from "../../pageComponents/stillBirthComponents/StillBirthPlacePublicPlace";
import FormStep from "../../../../../react-components/src/molecules/FormStep";
import { sortDropdownNames } from "../../utils";
import moment from "react";
import _ from "lodash";

const StillBirthChildDetails = ({ config, onSelect, userType, formData, isEditStillBirth = false }) => {
  sessionStorage.removeItem("applicationNumber");
  // console.log(JSON.stringify(formData));
   console.log(formData);
  // console.log(isEditStillBirth);


  const [isEditStillBirthPageComponents, setisEditStillBirthPageComponents] = useState(false);
  const [workFlowCode, setWorkFlowCode] = useState(formData?.StillBirthChildDetails?.workFlowCode);
  const [isPayment, setIsPayment] = useState(formData?.StillBirthChildDetails?.isPayment);
  const [Amount, setAmount] = useState(formData?.StillBirthChildDetails?.Amount);
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowStillBirth");
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "AttentionOfDelivery"
  );
  console.log(WorkFlowDetails,"WorkFlowDetails");
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
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [isDisableEditRole, setisDisableEditRole] = useState(false);
  const [hospitalCode, sethospitalCode] = useState(formData?.StillBirthChildDetails?.hospitalCode);
  const [userRole, setuserRole] = useState(formData?.StillBirthChildDetails?.userRole);
  const { roles: userRoles, uuid: uuid } = Digit.UserService.getUser().info;
  const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("HOSPITAL_OPERATOR"));
  // const { uuid: uuid } = Digit.UserService.getUser().info;
  // console.log(Digit.UserService.getUser().info);
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
      console.log("dateFromApi", dateFromApi);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      console.log("year", year);
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
  let workFlowData = [];
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];
  //  let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  let cmbFoetalDeath = [];
  // let DifferenceInDaysRounded = "";
  // let workFlowCode = "STILLBIRTHHOSP";
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] && WorkFlowDetails["birth-death-service"].WorkFlowStillBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowStillBirth.map((ob) => {
      workFlowData.push(ob);
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

  const [childDOB, setChildDOB] = useState(
    isEditStillBirth ? convertEpochToDate(formData?.StillBirthChildDetails?.childDOB) : formData?.StillBirthChildDetails?.childDOB
  );

  //formData?.StillBirthChildDetails?.childDOB
  // const [gender, selectGender] = useState(isEditStillBirth && isEditStillBirthPageComponents === false && (formData?.StillBirthChildDetails?.IsEditChangeScreen === false || formData?.StillBirthChildDetails?.IsEditChangeScreen === undefined) ? (menu.filter(menu => menu.code === formData?.StillBirthChildDetails?.gender)[0]) : formData?.StillBirthChildDetails?.gender);
  const [gender, selectGender] = useState(
    formData?.StillBirthChildDetails?.gender?.code
      ? formData?.StillBirthChildDetails?.gender
      : formData?.StillBirthChildDetails?.gender
      ? menu.filter((menu) => menu.code === formData?.StillBirthChildDetails?.gender)[0]
      : ""
  );
  const [isInitialRenderRoles, setInitialRenderRoles] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);
  //const [birthDateTime, setbirthDateTime] = useState(""); //formData?.StillBirthChildDetails?.birthDateTime ? formData?.StillBirthChildDetails?.birthDateTime :
  // const [birthDateTime, setbirthDateTime] = useState(formData?.StillBirthChildDetails?.birthDateTime ? formData?.StillBirthChildDetails?.birthDateTime : "");

  const [birthDateTime, setbirthDateTime] = useState(
    isEditStillBirth === false && formData?.StillBirthChildDetails?.birthDateTime ? formData?.StillBirthChildDetails?.birthDateTime : ""
  );
  //const [checkbirthDateTime, setCheckbirthDateTime] = useState({ hh: null, mm: null, amPm: null });
  
  const [checkbirthDateTime, setCheckbirthDateTime] = useState({ hh: formData?.StillBirthChildDetails?.checkbirthDateTime?.hh ? formData?.StillBirthChildDetails?.checkbirthDateTime.hh : null, mm: formData?.StillBirthChildDetails?.checkbirthDateTime?.mm ? formData?.StillBirthChildDetails?.checkbirthDateTime.mm : null, amPm: formData?.StillBirthChildDetails?.checkbirthDateTime?.amPm ? formData?.StillBirthChildDetails?.checkbirthDateTime.amPm : null });
  const [displaytime, setDisplaytime] = useState(formData?.StillBirthChildDetails?.displaytime ? formData?.StillBirthChildDetails?.displaytime : null);
  const [displayAmPm, setDisplayAmPm] = useState(formData?.StillBirthChildDetails?.displayAmPm ? formData?.StillBirthChildDetails?.displayAmPm : null);
  const [birthPlace, selectBirthPlace] = useState(
    formData?.StillBirthChildDetails?.birthPlace?.code
      ? formData?.StillBirthChildDetails?.birthPlace
      : formData?.StillBirthChildDetails?.birthPlace
      ? cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.StillBirthChildDetails?.birthPlace)[0]
      : ""
  );
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(
    formData?.StillBirthChildDetails?.hospitalName?.code
      ? formData?.StillBirthChildDetails?.hospitalName
      : formData?.StillBirthChildDetails?.hospitalName
      ? ""
      : ""
  );
  const [hospitalNameMl, selectHospitalNameMl] = useState(
    formData?.StillBirthChildDetails?.hospitalNameMl?.code
      ? formData?.StillBirthChildDetails?.hospitalNameMl
      : formData?.StillBirthChildDetails?.hospitalNameMl
      ? ""
      : ""
  );

  const [institution, setInstitution] = useState(
    formData?.StillBirthChildDetails?.institution?.code
      ? formData?.StillBirthChildDetails?.institution
      : formData?.StillBirthChildDetails?.institutionTypeCode
      ? ""
      : ""
  );
  const [institutionId, setInstitutionId] = useState(
    formData?.StillBirthChildDetails?.institutionId?.code
      ? formData?.StillBirthChildDetails?.institutionId
      : formData?.StillBirthChildDetails?.institutionNameCode
      ? ""
      : ""
  );
  const [institutionIdMl, setInstitutionIdMl] = useState(
    formData?.StillBirthChildDetails?.institutionIdMl?.code
      ? formData?.StillBirthChildDetails?.institutionIdMl
      : formData?.StillBirthChildDetails?.institutionNameCode
      ? ""
      : ""
  );

  const [adrsPostOffice, setAdrsPostOffice] = useState(
    formData?.StillBirthChildDetails?.adrsPostOffice?.code
      ? formData?.StillBirthChildDetails?.adrsPostOffice
      : formData?.StillBirthChildDetails?.adrsPostOffice
      ? ""
      : ""
  );

  const [adrsPincode, setAdrsPincode] = useState(
    formData?.StillBirthChildDetails?.adrsPincode ? formData?.StillBirthChildDetails?.adrsPincode : null
  );
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(
    formData?.StillBirthChildDetails?.adrsHouseNameEn ? formData?.StillBirthChildDetails?.adrsHouseNameEn : ""
  );
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(
    formData?.StillBirthChildDetails?.adrsHouseNameMl ? formData?.StillBirthChildDetails?.adrsHouseNameMl : ""
  );
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(
    formData?.StillBirthChildDetails?.adrsLocalityNameEn ? formData?.StillBirthChildDetails?.adrsLocalityNameEn : ""
  );
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(
    formData?.StillBirthChildDetails?.adrsLocalityNameMl ? formData?.StillBirthChildDetails?.adrsLocalityNameMl : ""
  );
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(
    formData?.StillBirthChildDetails?.adrsStreetNameEn ? formData?.StillBirthChildDetails?.adrsStreetNameEn : ""
  );
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(
    formData?.StillBirthChildDetails?.adrsStreetNameMl ? formData?.StillBirthChildDetails?.adrsStreetNameMl : ""
  );
  const [wardNo, setWardNo] = useState(
    formData.StillBirthChildDetails?.wardNo?.code ? formData.StillBirthChildDetails?.wardNo : formData?.StillBirthChildDetails?.wardNo ? "" : ""
  );

  const [vehicleType, setvehicleType] = useState(
    formData?.StillBirthChildDetails?.vehicleType?.code
      ? formData?.StillBirthChildDetails?.vehicleType
      : formData?.StillBirthChildDetails?.vehicleType
      ? ""
      : ""
  );
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(
    formData?.StillBirthChildDetails?.vehicleRegistrationNo ? formData?.StillBirthChildDetails?.vehicleRegistrationNo : ""
  );
  const [vehicleFromEn, setvehicleFromEn] = useState(
    formData?.StillBirthChildDetails?.vehicleFromEn ? formData?.StillBirthChildDetails?.vehicleFromEn : ""
  );
  const [vehicleToEn, setvehicleToEn] = useState(formData?.StillBirthChildDetails?.vehicleToEn ? formData?.StillBirthChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(
    formData?.StillBirthChildDetails?.vehicleFromMl ? formData?.StillBirthChildDetails?.vehicleFromMl : ""
  );
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(
    formData?.StillBirthChildDetails?.vehicleHaltPlace ? formData?.StillBirthChildDetails?.vehicleHaltPlace : ""
  );

  const [vehicleToMl, setvehicleToMl] = useState(formData?.StillBirthChildDetails?.vehicleToMl ? formData?.StillBirthChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(
    formData?.StillBirthChildDetails?.vehicleDesDetailsEn ? formData?.StillBirthChildDetails?.vehicleDesDetailsEn : ""
  );
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(
    formData?.StillBirthChildDetails?.setadmittedHospitalEn?.code
      ? formData?.StillBirthChildDetails?.setadmittedHospitalEn
      : formData?.StillBirthChildDetails?.setadmittedHospitalEn
      ? ""
      : ""
  );

  const [publicPlaceType, setpublicPlaceType] = useState(
    formData?.StillBirthChildDetails?.publicPlaceType?.code
      ? formData?.StillBirthChildDetails?.publicPlaceType
      : formData?.StillBirthChildDetails?.publicPlaceType
      ? ""
      : ""
  );
  const [localityNameEn, setlocalityNameEn] = useState(
    formData?.StillBirthChildDetails?.localityNameEn ? formData?.StillBirthChildDetails?.localityNameEn : ""
  );
  const [localityNameMl, setlocalityNameMl] = useState(
    formData?.StillBirthChildDetails?.localityNameMl ? formData?.StillBirthChildDetails?.localityNameMl : ""
  );
  const [streetNameEn, setstreetNameEn] = useState(
    formData?.StillBirthChildDetails?.streetNameEn ? formData?.StillBirthChildDetails?.streetNameEn : ""
  );
  const [streetNameMl, setstreetNameMl] = useState(
    formData?.StillBirthChildDetails?.streetNameMl ? formData?.StillBirthChildDetails?.streetNameMl : ""
  );
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(
    formData?.StillBirthChildDetails?.publicPlaceDecpEn ? formData?.StillBirthChildDetails?.publicPlaceDecpEn : ""
  );

  const [pregnancyDuration, setPregnancyDuration] = useState(
    formData?.StillBirthChildDetails?.pregnancyDuration ? formData?.StillBirthChildDetails?.pregnancyDuration : ""
  );
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(
    formData?.StillBirthChildDetails?.medicalAttensionSub?.code
      ? formData?.StillBirthChildDetails?.medicalAttensionSub
      : formData?.StillBirthChildDetails?.medicalAttensionSub
      ? cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.StillBirthChildDetails?.medicalAttensionSub)[0]
      : ""
  );

  const [deliveryMethods, setDeliveryMethod] = useState(
    formData?.StillBirthChildDetails?.deliveryMethods?.code
      ? formData?.StillBirthChildDetails?.deliveryMethods
      : formData?.StillBirthChildDetails?.deliveryMethods
      ? cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.StillBirthChildDetails?.deliveryMethods)[0]
      : ""
  );
  const [causeFoetalDeath, setcauseFoetalDeath] = useState(
    formData?.StillBirthChildDetails?.causeFoetalDeath?.code
      ? formData?.StillBirthChildDetails?.causeFoetalDeath
      : formData?.StillBirthChildDetails?.causeFoetalDeath
      ? cmbFoetalDeath.filter((cmbFoetalDeath) => cmbFoetalDeath.code === formData?.StillBirthChildDetails?.causeFoetalDeath)[0]
      : ""
  );
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.StillBirthChildDetails?.DifferenceInTime);

  const [toast, setToast] = useState(false);
  const [DateTimeError, setDateTimeError] = useState(false);
  const [DateTimeHourError, setDateTimeHourError] = useState(false);
  const [DateTimeMinuteError, setDateTimeMinuteError] = useState(false);
  const [DateTimeAMPMError, setDateTimeAMPMError] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.StillBirthChildDetails?.childDOB ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.StillBirthChildDetails?.hospitalName ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.StillBirthChildDetails?.institution ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.StillBirthChildDetails?.institutionId ? false : false);
  const [WardError, setAdsWardError] = useState(formData?.StillBirthChildDetails?.wardNo ? false : false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.StillBirthChildDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.StillBirthChildDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.StillBirthChildDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.StillBirthChildDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(
    formData?.StillBirthChildDetails?.AdrsHomeLocalityNameEn ? false : false
  );
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(
    formData?.StillBirthChildDetails?.AdrsHomeLocalityNameMl ? false : false
  );
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.StillBirthChildDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.StillBirthChildDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.StillBirthChildDetails?.vehicleHaltPlace ? false : false);
  // const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.StillBirthChildDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.StillBirthChildDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.StillBirthChildDetails?.vehicleDesDetailsEn ? false : false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.StillBirthChildDetails?.publicPlaceType ? false : false);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.StillBirthChildDetails?.localityNameEn ? false : false);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.StillBirthChildDetails?.localityNameMl ? false : false);

  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.StillBirthChildDetails?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.StillBirthChildDetails?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.StillBirthChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(
    formData?.StillBirthChildDetails?.pregnancyDuration ? false : false
  );
  const [causeFoetalDeathError, setcauseFoetalDeathError] = useState(formData?.StillBirthChildDetails?.causeFoetalDeath ? false : false);
  const [AdsHomeStreetNameEnError, setAdsHomeStreetNameEnError] = useState(false);
  const [AdsHomeStreetNameMlError, setAdsHomeStreetNameMlError] = useState(false);

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  const roleall = [];
  roleall.push(...roletemp);
  const rolecombine = [];
  roleall?.map?.((e) => {
    rolecombine.push(e.code);
  });

  const { data: userData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: rolecombine?.map?.((e) => ({ code: e })),
      isActive: true,
      uuids: uuid,
      rolecodes: rolecombine?.map?.((e) => e).join(","),
    }
    // { enabled: !action?.isTerminateState }
  );

  const getHospitalCode = () => {
    if (userRoles[0].code === "HOSPITAL_OPERATOR") {
      const operatorHospDet = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("HOSPITAL_OPERATOR"));
      const operatorHosward = [];
      operatorHospDet?.map((ob) => {
        operatorHosward.push(...ob.jurisdictionChilds);
      });
      if (operatorHosward.length > 0) {
        console.log("operatorHosward", operatorHosward[0].wardCode);
        setWardNo(operatorHosward[0].wardCode);
      }
      const tempArray = operatorHospDet?.map((ob) => {
        return ob.hospitalCode;
      });
      return tempArray?.[0];
    } else if (userRoles[0].code === "HOSPITAL_APPROVER") {
      const approverHospDet = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("HOSPITAL_APPROVER"));
      const appHosward = [];
      approverHospDet?.map((ob) => {
        appHosward.push(...ob.jurisdictionChilds);
      });
      if (appHosward.length > 0) {
        console.log("operatorHosward", appHosward[0].wardCode);
        setWardNo(appHosward[0].wardCode);
      }
      const tempArray = approverHospDet?.map((ob) => {
        return ob.hospitalCode;
      });
      return tempArray?.[0];
    }
  };
  useEffect(() => {
    if (isInitialRenderRoles) {
      if (userRoles.length > 0) {
        if (userRoles[0].code === "HOSPITAL_OPERATOR") {
          if (cmbPlaceMaster.length > 0) {
            const operatorHospCode = getHospitalCode();
            if (operatorHospCode != null) {
              sethospitalCode(operatorHospCode);
            }
            selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === "HOSPITAL")[0]);
            setValue(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === "HOSPITAL")[0].code);
            setisDisableEditRole(true);
            setInitialRenderRoles(false);
          }
        } else if (userRoles[0].code === "HOSPITAL_APPROVER") {
          if (cmbPlaceMaster.length > 0) {
            const approverHospCode = getHospitalCode();
            if (approverHospCode != null) {
              sethospitalCode(approverHospCode);
            }
            selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === "HOSPITAL")[0]);
            setValue(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === "HOSPITAL")[0].code);
            setisDisableEditRole(true);
            setInitialRenderRoles(false);
          }
        }
      }
    }
  }, [cmbPlaceMaster, isInitialRenderRoles]);

  React.useEffect(() => {
    if (isInitialRenderPlace) {
      if (birthPlace) {
        setIsInitialRenderPlace(false);
        placeOfBirth = birthPlace.code;
        setValue(placeOfBirth);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(placeOfBirth)));
        if (placeOfBirth === "HOSPITAL") {
          <StillBirthPlaceHospital
            hospitalName={hospitalName}
            hospitalNameMl={hospitalNameMl}
            isDisableEditRole={isDisableEditRole}
            setisDisableEditRole={setisDisableEditRole}
            userRoles={userRoles}
          />;
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
  // useEffect(() => {
  //   if (birthPlace) {
  //     if (birthPlace.code === "HOSPITAL") {
  //       setWorkFlowCode("STILLBIRTHHOSP");
  //       console.log(workFlowCode);
  //     } else {
  //       setWorkFlowCode("STILLBIRTHHOME");
  //     }
  //   }
  // }, [birthPlace]);
  useEffect(() => {
    if (birthPlace && DifferenceInTime != null) {
      let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === birthPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
      if (currentWorgFlow.length > 0) {
        setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
        setIsPayment(currentWorgFlow[0].payment);
        setAmount(currentWorgFlow[0].amount);
      }
    }
  }, [DifferenceInTime])

  // function setselectChildDOB(value) {
  //   setChildDOB(value);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   const birthDate = new Date(value);
  //   birthDate.setHours(0, 0, 0, 0);

  //   if (birthDate.getTime() <= today.getTime()) {
  //     setDOBError(false);
  //     // To calculate the time difference of two dates
  //     let Difference_In_Time = today.getTime() - birthDate.getTime();
  //     // console.log("Difference_In_Time" + Difference_In_Time);
  //     setDifferenceInTime(today.getTime() - birthDate.getTime());
  //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //     // console.log("Difference_In_Days" + Math.floor(Difference_In_Days));
  //     setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
  //     // if (birthPlace) {
  //     //   let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === birthPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
  //     //   console.log("currentWorgFlowDOB" + currentWorgFlow);
  //     //   if (currentWorgFlow.length > 0) {
  //     //     // console.log(currentWorgFlow[0].WorkflowCode);
  //     //     setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
  //     //   }
  //     // }
  //   }
  // }

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
      // console.log("Difference_In_Days" + Math.floor(Difference_In_Days));
      setDifferenceInDaysRounded(Math.floor(Difference_In_Days * 24 * 60 * 60 * 1000));
      // if (birthPlace && DifferenceInTime != null) {
      //   let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === birthPlace.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
      //   if (currentWorgFlow.length > 0) {
      //     setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      //     setIsPayment(currentWorgFlow[0].payment);
      //     setAmount(currentWorgFlow[0].amount);
      //   }
      // }
      // if (Difference_In_Days >= 365) {
      //   setChildAadharHIde(true);
      // } else {
      //   setChildAadharHIde(false);
      //   setChildAadharNo("");
      // }
      // if (Difference_In_Days > 365) {
      //   // setUploadNACHIde(true);
      //   setpopUpState(true);
      // } else {
      //   // setUploadNACHIde(false);
      //   setpopUpState(false);
      //   setUploadNACHIde(false);
      //   setproceedNoRDO("");
      //   setregNoNAC("");
      //   setUploadedFile("");

      // }
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

  // const handleTimeChange = (value, cb) => {
  //   if (typeof value === "string") {
  //     cb(value);
  //     console.log(value);
  //     let hour = value;
  //     let period = hour > 12 ? "PM" : "AM";
  //     console.log(period);
  //     setbirthDateTime(value);
  //   }
  // };

  useEffect(() => {
    //console.log("time while onchange", birthDateTime);
  }, [birthDateTime]);

  const handleTimeChange = (value, cb) => {
    //console.log("valuee--", value, value?.target?.value, value?.target?.name);
    if (value?.target?.name === "hour12") {
      setCheckbirthDateTime({ ...checkbirthDateTime, hh: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "minute") {
      setCheckbirthDateTime({ ...checkbirthDateTime, mm: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "amPm") {
      setCheckbirthDateTime({ ...checkbirthDateTime, amPm: value?.target?.value ? value?.target?.value : null });
    }
    if (typeof value === "string") {
      cb(value);
      setbirthDateTime(value);
      let time = value;
      let timeParts = time.split(":");

      if (timeParts.length > 0) {
        if (timeParts[0] === "01" || timeParts[0] === "02" || timeParts[0] === "03" || timeParts[0] === "04" ||
          timeParts[0] === "05" || timeParts[0] === "06" || timeParts[0] === "07" || timeParts[0] === "08" ||
          timeParts[0] === "09" || timeParts[0] === "10" || timeParts[0] === "11") {
          let displaytimeTemp = timeParts[0] + ":" + timeParts[1];
          setDisplaytime(displaytimeTemp);
          let displayAmPmTemp = "AM";
          setDisplayAmPm(displayAmPmTemp);
        }
        else if (timeParts[0] === "00") {
          let displaytimeTemp = "12" + ":" + timeParts[1];
          setDisplaytime(displaytimeTemp);
          let displayAmPmTemp = "AM";
          setDisplayAmPm(displayAmPmTemp);
        } else if (timeParts[0] >= "13") {
          if (timeParts[0] === "13") {
            let displaytimeTemp = "01" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "14") {
            let displaytimeTemp = "02" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "15") {
            let displaytimeTemp = "03" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "16") {
            let displaytimeTemp = "04" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "17") {
            let displaytimeTemp = "05" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "18") {
            let displaytimeTemp = "06" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "19") {
            let displaytimeTemp = "07" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "20") {
            let displaytimeTemp = "08" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            displayAmPm = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "21") {
            let displaytimeTemp = "09" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "22") {
            let displaytimeTemp = "10" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "23") {
            let displaytimeTemp = "11" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          } else if (timeParts[0] === "24") {
            let displaytimeTemp = "12" + ":" + timeParts[1];
            setDisplaytime(displaytimeTemp);
            let displayAmPmTemp = "PM";
            setDisplayAmPm(displayAmPmTemp);
          }
        }
      }
    }
  };

  // const handleTimeChange = (value, cb) => {
  //   if (typeof value === "string") {
  //     cb(value);
  //     console.log(value);
  //     // let hour = value;
  //     // let period = hour > 12 ? "PM" : "AM";
  //     // console.log(period);
  //     setbirthDateTime(value);
  //   }
  // };
  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  function setSelectcauseFoetalDeath(value) {
    setcauseFoetalDeath(value);
  }
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
  // function setselectBirthPlace(value) {
  //   selectBirthPlace(value);
  //   setValue(value.code);
  //   //console.log(value);
  //   if (value.code === "HOSPITAL") {
  //     setWorkFlowCode("STILLBIRTHHOSP");
  //     console.log(workFlowCode);
  //     console.log(value);
  //   } else {
  //     setWorkFlowCode("STILLBIRTHHOME");
  //   }
  //   clearBirthPalce(value);
  // }

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === value.code && (workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime));
    // console.log(currentWorgFlow);
    if (currentWorgFlow.length > 0) {
      // console.log(currentWorgFlow[0].WorkflowCode);
      setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      setIsPayment(currentWorgFlow[0].payment);
      setAmount(currentWorgFlow[0].amount);
    }
    clearBirthPalce(value);

  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern) && e.code === "Space") {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
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
          let currentDatetime = currenthours + ":" + currentMints;
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
     // console.log(birthPlace.code, "code");
   //   let wrkflowcode = "STILLBIRTHHOSP";
     // console.log(wrkflowcode, "wrkflowcode");
     // setWorkFlowCode(wrkflowcode);
      if (hospitalName == null || hospitalNameMl === null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        sethospitalCode(hospitalName.code);
        setHospitalError(false);
      }
    } else if (birthPlace.code === "INSTITUTION") {
     // setWorkFlowCode("STILLBIRTHHOME");
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
      //setWorkFlowCode("STILLBIRTHHOME");
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

      if (adrsLocalityNameEn === null || adrsLocalityNameEn.trim() == "" || adrsLocalityNameEn.trim() == undefined) {
        validFlag = false;
        setAdrsLocalityNameEn("");
        setAdsHomeLocalityNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeLocalityNameEnError(false);
      }
      if (adrsLocalityNameMl === null || adrsLocalityNameMl.trim() == "" || adrsLocalityNameMl.trim() == undefined) {
        validFlag = false;
        setAdrsLocalityNameMl("");
        setAdsHomeLocalityNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeLocalityNameMlError(false);
      }
      if (adrsHouseNameEn === null || adrsHouseNameEn.trim() == "" || adrsHouseNameEn.trim() == undefined) {
        validFlag = false;
        setAdrsHouseNameEn("");
        setAdsHomeHouseNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeHouseNameEnError(false);
      }
      if (adrsHouseNameMl === null || adrsHouseNameMl.trim() == "" || adrsHouseNameMl.trim() == undefined) {
        validFlag = false;
        setAdrsHouseNameMl("");
        setAdsHomeHouseNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAdsHomeHouseNameMlError(false);
      }
      if (adrsStreetNameEn === null || adrsStreetNameEn.trim() === "" || adrsStreetNameEn.trim() === undefined) {
        setAdrsStreetNameEn("");
      } else {
        if (adrsStreetNameEn != null && (adrsStreetNameMl === null || adrsStreetNameMl.trim() === "" || adrsStreetNameMl.trim() === undefined)) {
          validFlag = false;
          setAdrsStreetNameMl("");
          setAdsHomeStreetNameMlError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setAdsHomeStreetNameMlError(false);
        }
      }
      if (adrsStreetNameMl === null || adrsStreetNameMl.trim() === "" || adrsStreetNameMl.trim() === undefined) {
        setAdrsStreetNameMl("");
      } else {
        if (adrsStreetNameMl != null && (adrsStreetNameEn === null || adrsStreetNameEn.trim() === "" || adrsStreetNameEn.trim() === undefined)) {
          validFlag = false;
          setAdrsStreetNameEn("");
          setAdsHomeStreetNameEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setAdsHomeStreetNameEnError(false);
        }
      }
    } else if (birthPlace.code === "VEHICLE") {
      //setWorkFlowCode("STILLBIRTHHOME");
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
      if (vehicleRegistrationNo === null || vehicleRegistrationNo.trim() == "" || vehicleRegistrationNo.trim() == undefined) {
        validFlag = false;
        setvehicleRegiNoError(true);
        setvehicleRegistrationNo("");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehicleRegiNoError(false);
      }
      if (vehicleHaltPlace === null || vehicleHaltPlace.trim() == "" || vehicleHaltPlace.trim() == undefined) {
        validFlag = false;
        setvehicleHaltPlaceError(true);
        setvehicleHaltPlace("");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setvehicleHaltPlaceError(false);
      }
      if (vehicleDesDetailsEn === null || vehicleDesDetailsEn.trim() == "" || vehicleDesDetailsEn.trim() == undefined) {
        validFlag = false;
        setvehiDesDetailsEnError(true);
        setvehicleDesDetailsEn("");
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
    //  setWorkFlowCode("STILLBIRTHHOME");
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

      if (localityNameEn === null || localityNameEn.trim() == "" || localityNameEn.trim() == undefined) {
        validFlag = false;
        setAdrsLocalityNameMl("");
        setlocalNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setlocalNameEnError(false);
      }

      if (localityNameMl === null || localityNameMl.trim() == "" || localityNameMl.trim() == undefined) {
        validFlag = false;
        setAdrsLocalityNameMl("");
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
      if (pregnancyDuration < 20 || pregnancyDuration > 53) {
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

    if (validFlag == true) {
      let IsEditChangeScreen = isEditStillBirth ? isEditStillBirth : false;
      let isWorkflow = isEditStillBirth ? false : true;
      onSelect(config.key, {
        stateId,
        tenantId,
        workFlowCode,
        childDOB,
        birthDateTime,
         checkbirthDateTime,
        displaytime, 
        displayAmPm,
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
        pregnancyDuration,
        medicalAttensionSub,
        deliveryMethods,
        causeFoetalDeath,
        IsEditChangeScreen,
        uuid,
        DifferenceInTime,
        isPayment,
        Amount,
       isWorkflow,
      });
    }
  };
  if (
    isEditStillBirth &&
    isEditStillBirthPageComponents === false &&
    (formData?.StillBirthChildDetails?.IsEditChangeScreen === false || formData?.StillBirthChildDetails?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.StillBirthChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter((menu) => menu.code === formData?.StillBirthChildDetails?.gender)[0]);
      }
    }
    if (formData?.StillBirthChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.StillBirthChildDetails?.birthPlace)[0]);
        setValue(formData?.StillBirthChildDetails?.birthPlace);
      }
    }
    if (formData?.StillBirthChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(
          cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.StillBirthChildDetails?.medicalAttensionSub)[0]
        );
      }
    }
    // if (formData?.StillBirthChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.StillBirthChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    if (formData?.StillBirthChildDetails?.deliveryMethods != null) {
      if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
        // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.StillBirthChildDetails?.deliveryMethods)[0]);
        setDeliveryMethod(
          cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.StillBirthChildDetails?.deliveryMethods)[0]
        );
      }
    }

    // }
    if (formData?.StillBirthChildDetails?.causeFoetalDeath != null) {
      if (cmbFoetalDeath.length > 0 && (causeFoetalDeath === undefined || causeFoetalDeath === "")) {
        // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.StillBirthChildDetails?.deliveryMethods)[0]);
        setcauseFoetalDeath(cmbFoetalDeath.filter((cmbFoetalDeath) => cmbFoetalDeath.code === formData?.StillBirthChildDetails?.causeFoetalDeath)[0]);
      }
    }
  }

  if (isWorkFlowDetailsLoading || isLoading || isAttentionOfDeliveryLoading || isDeliveryMethodListLoading || isPlaceMasterLoading || isFoetalDeathListLoading) {
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
            (value === "HOME"
              ? !wardNo ||
                !adrsPostOffice ||
                adrsPincode === "" ||
                adrsLocalityNameEn === "" ||
                adrsHouseNameEn === "" ||
                adrsLocalityNameMl === "" ||
                adrsHouseNameMl === ""
              : false) ||
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
            !causeFoetalDeath ||
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
                  //min={convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  disable={isDisableEdit}
                  //  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker
                  name="birthDateTime"
                  onChange={(val) => handleTimeChange(val, setbirthDateTime)}
                  value={birthDateTime}
                  disable={isDisableEdit}
                />
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
                  option={sortDropdownNames(menu ? menu : [], "code", t)}
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
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  // optionKey="name"
                  isMandatory={false}
                  option={sortDropdownNames(cmbPlaceMaster ? cmbPlaceMaster : [], "name", t)}
                  selected={birthPlace}
                  disable={isDisableEditRole}
                  // disable={isDisableEdit}
                  select={setselectBirthPlace}
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
                hospitalCode={hospitalCode}
                isDisableEditRole={isDisableEditRole}
                setisDisableEditRole={setisDisableEditRole}
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
                  // optionKey="name"
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbAttDeliverySub ? cmbAttDeliverySub : [], "name", t)}
                  selected={medicalAttensionSub}
                  select={setSelectMedicalAttensionSub}
                  placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                />
              </div>

              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_PREGNANCY_DURATION")}`} <span className="mandatorycss">*</span>
                </CardLabel>
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
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  // optionKey="name"
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbDeliveryMethod ? cmbDeliveryMethod : [], "name", t)}
                  selected={deliveryMethods}
                  select={setSelectDeliveryMethod}
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
                  option={sortDropdownNames(cmbFoetalDeath ? cmbFoetalDeath : [], "name", t)}
                  selected={causeFoetalDeath}
                  select={setSelectcauseFoetalDeath}
                  //  disable={isDisableEdit}
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
                PregnancyDurationInvalidError ||
                DateTimeError ||
                DateTimeHourError ||
                DateTimeMinuteError ||
                DateTimeAMPMError
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
                PregnancyDurationInvalidError ||
                DateTimeError ||
                DateTimeHourError ||
                DateTimeMinuteError ||
                DateTimeAMPMError
                  ? DateTimeError
                    ? t(`CS_COMMON_DATE_TIME_ERROR`)
                    : DateTimeHourError
                    ? t(`CS_COMMON_DATE_HOUR_ERROR`)
                    : DateTimeMinuteError
                    ? t(`CS_COMMON_DATE_MINUTE_ERROR`)
                    : DateTimeAMPMError
                    ? t(`CS_COMMON_DATE_AMPM_ERROR`)
                    : DOBError
                    ? t(`BIRTH_DOB_VALIDATION_MSG`)
                    : HospitalError
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
          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default StillBirthChildDetails;
