import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  Card,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/AdoptionTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import BirthPlaceHospital from "../../pageComponents/adoptionComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../../pageComponents/adoptionComponents/BirthPlaceInstitution";
import BirthPlaceHome from "../../pageComponents/adoptionComponents/BirthPlaceHome";
import BirthPlaceVehicle from "../../pageComponents/adoptionComponents/BirthPlaceVehicle";
import BirthPlacePublicPlace from "../../pageComponents/adoptionComponents/BirthPlacePublicPlace";
import AdoptionBirthReqSearch from "./AdoptionBirthReqSearch";
import BirthReqSearch from "./BirthReqSearch";
import { convertEpochToDateDMY } from "../../utils";

const AdoptionChildDetails = ({ config, onSelect, userType, formData, isEditAdoption, isEditFlag = false }) => {
  // console.log(JSON.stringify(formData));   isEditAdoption ? isEditAdoption :
  const [isEditBirthPageComponents, setIsEditBirthPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [workFlowCode, setWorkFlowCode] = useState();

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowAdoption"
  );
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: institutionType = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "InstitutionTypePlaceOfEvent"
  );
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  const { data: institutionidList = {}, isinstitutionidLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "institution");
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
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
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const { data: hospitalData = {}, isLoadings } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const [editFlag, setFlag] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_FLAG", false);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [SearchRegId, setSearchRegId] = useState();
  const [birthRegPopup, setBirthRegPopup] = useState(false);
  // console.log('M',formData,isEditAdoption);
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
  let workFlowData = [];
  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];
  let cmbhospital = [];
  let cmbhospitalMl = [];
  let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  let cmbWardNo = [];
  let cmbPostOffice = [];
  let Zonal = [];
  let cmbVehicle = [];
  let cmbInstitutionType = [];
  let cmbInstitutionList = [];
  let cmbOtherplace = [];
  let Difference_In_DaysRounded = "";
  // let workFlowCode = "BIRTHHOSP21";
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowAdoption &&
    WorkFlowDetails["birth-death-service"].WorkFlowAdoption.map((ob) => {
      workFlowData.push(ob);
      // console.log(workFlowData);
    });

  otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherBithPlace &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });

  institutionType &&
    institutionType["birth-death-service"] &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent &&
    institutionType["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbInstitutionType.push(ob);
    });
  institutionidList &&
    institutionidList["egov-location"] &&
    institutionidList["egov-location"].institutionList &&
    institutionidList["egov-location"].institutionList.map((ob) => {
      cmbInstitutionList.push(ob);
    });
  Vehicle &&
    Vehicle["birth-death-service"] &&
    Vehicle["birth-death-service"].VehicleType &&
    Vehicle["birth-death-service"].VehicleType.map((ob) => {
      cmbVehicle.push(ob);
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
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });

  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
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
  //formData?.AdoptionChildDetails?.gender?.code ? formData?.AdoptionChildDetails?.gender : formData?.AdoptionChildDetails?.gender ?
  // menu?.length>0&&(menu.filter(menu => menu.code === formData?.AdoptionChildDetails?.gender)[0]) : ""
  const [childDOB, setChildDOB] = useState(
    isEditAdoption &&
      isEditBirthPageComponents === false &&
      (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined)
      ? convertEpochToDate(formData?.AdoptionChildDetails?.childDOB)
      : convertEpochToDate(formData?.AdoptionChildDetails?.childDOB)
  ); //formData?.AdoptionChildDetails?.childDOB
  // const [gender, selectGender] = useState(isEditAdoption && isEditBirthPageComponents === false && (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined) ? (menu.filter(menu => menu.code === formData?.AdoptionChildDetails?.gender)[0]) : formData?.AdoptionChildDetails?.gender);
  const [gender, selectGender] = useState(
    formData?.AdoptionChildDetails?.gender?.code
      ? formData?.AdoptionChildDetails?.gender
      : formData?.AdoptionChildDetails?.gender
      ? menu.filter((menu) => menu.code === formData?.AdoptionChildDetails?.gender)[0]
      : ""
  );

  const [childAadharNo, setChildAadharNo] = useState(
    formData?.AdoptionChildDetails?.childAadharNo ? formData?.AdoptionChildDetails?.childAadharNo : ""
  );
  const [childFirstNameEn, setChildFirstNameEn] = useState(
    formData?.AdoptionChildDetails?.childFirstNameEn ? formData?.AdoptionChildDetails?.childFirstNameEn : ""
  );
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.AdoptionChildDetails?.childMiddleNameEn ? formData?.AdoptionChildDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(
    formData?.AdoptionChildDetails?.childLastNameEn ? formData?.AdoptionChildDetails?.childLastNameEn : ""
  );
  const [childFirstNameMl, setChildFirstNameMl] = useState(
    formData?.AdoptionChildDetails?.childFirstNameMl ? formData?.AdoptionChildDetails?.childFirstNameMl : ""
  );
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.AdoptionChildDetails?.childMiddleNameMl ? formData?.AdoptionChildDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(
    formData?.AdoptionChildDetails?.childLastNameMl ? formData?.AdoptionChildDetails?.childLastNameMl : ""
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);

  const [birthDateTime, setbirthDateTime] = useState("");
  const [isChildName, setIsChildName] = useState(formData?.AdoptionChildDetails?.isChildName ? formData?.AdoptionChildDetails?.isChildName : false);
  const [adoptionAgency, setIsAdoptionAgency] = useState(
    formData?.AdoptionChildDetails?.adopthasagency
      ? formData?.AdoptionChildDetails?.adopthasagency
      : formData?.AdoptionChildDetails?.adoptionAgency
      ? formData?.AdoptionChildDetails?.adoptionAgency
      : false
  );
  const [birthRegistered, setbirthRegistered] = useState(
    formData?.AdoptionChildDetails?.birthRegistered ? formData?.AdoptionChildDetails?.birthRegistered : false
  );
  // const [birthPlace, selectBirthPlace] = useState(isEditAdoption && isEditBirthPageComponents === false && (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined) ? (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.birthPlace)[0]) : formData?.AdoptionChildDetails?.birthPlace);
  const [birthPlace, selectBirthPlace] = useState(
    formData?.AdoptionChildDetails?.birthPlace?.code
      ? formData?.AdoptionChildDetails?.birthPlace
      : formData?.AdoptionChildDetails?.birthPlace
      ? cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.birthPlace)[0]
      : ""
  );
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(
    formData?.AdoptionChildDetails?.hospitalName?.code
      ? formData?.AdoptionChildDetails?.hospitalName
      : formData?.AdoptionChildDetails?.hospitalName
      ? ""
      : ""
  );
  const [hospitalNameMl, selectHospitalNameMl] = useState(
    formData?.AdoptionChildDetails?.hospitalNameMl?.code
      ? formData?.AdoptionChildDetails?.hospitalNameMl
      : formData?.AdoptionChildDetails?.hospitalNameMl
      ? ""
      : ""
  );

  const [institution, setInstitution] = useState(
    formData?.AdoptionChildDetails?.institution?.code
      ? formData?.AdoptionChildDetails?.institution
      : formData?.AdoptionChildDetails?.institutionTypeCode
      ? ""
      : ""
  );
  const [institutionId, setInstitutionId] = useState(
    formData?.AdoptionChildDetails?.institutionId?.code
      ? formData?.AdoptionChildDetails?.institutionId
      : formData?.AdoptionChildDetails?.institutionNameCode
      ? ""
      : ""
  );
  const [institutionIdMl, setInstitutionIdMl] = useState(
    formData?.AdoptionChildDetails?.institutionIdMl?.code
      ? formData?.AdoptionChildDetails?.institutionIdMl
      : formData?.AdoptionChildDetails?.institutionNameCode
      ? ""
      : ""
  );

  const [adrsPostOffice, setAdrsPostOffice] = useState(
    formData?.AdoptionChildDetails?.adrsPostOffice?.code
      ? formData?.AdoptionChildDetails?.adrsPostOffice
      : formData?.AdoptionChildDetails?.adrsPostOffice
      ? ""
      : ""
  );
  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.AdoptionChildDetails?.adrsPostOffice ? formData?.AdoptionChildDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.AdoptionChildDetails?.adrsPincode ? formData?.AdoptionChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(
    formData?.AdoptionChildDetails?.adrsHouseNameEn ? formData?.AdoptionChildDetails?.adrsHouseNameEn : ""
  );
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(
    formData?.AdoptionChildDetails?.adrsHouseNameMl ? formData?.AdoptionChildDetails?.adrsHouseNameMl : ""
  );
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(
    formData?.AdoptionChildDetails?.adrsLocalityNameEn ? formData?.AdoptionChildDetails?.adrsLocalityNameEn : ""
  );
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(
    formData?.AdoptionChildDetails?.adrsLocalityNameMl ? formData?.AdoptionChildDetails?.adrsLocalityNameMl : ""
  );
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(
    formData?.AdoptionChildDetails?.adrsStreetNameEn ? formData?.AdoptionChildDetails?.adrsStreetNameEn : ""
  );
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(
    formData?.AdoptionChildDetails?.adrsStreetNameMl ? formData?.AdoptionChildDetails?.adrsStreetNameMl : ""
  );
  const [wardNo, setWardNo] = useState(
    formData?.AdoptionChildDetails?.wardNo?.code ? formData.AdoptionChildDetails?.wardNo : formData?.AdoptionChildDetails?.wardNo ? "" : ""
  );

  const [vehicleType, setvehicleType] = useState(formData?.AdoptionChildDetails?.vehicleType ? formData?.AdoptionChildDetails?.vehicleType : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(
    formData?.AdoptionChildDetails?.vehicleRegistrationNo ? formData?.AdoptionChildDetails?.vehicleRegistrationNo : ""
  );
  const [vehicleFromEn, setvehicleFromEn] = useState(
    formData?.AdoptionChildDetails?.vehicleFromEn ? formData?.AdoptionChildDetails?.vehicleFromEn : ""
  );
  const [vehicleToEn, setvehicleToEn] = useState(formData?.AdoptionChildDetails?.vehicleToEn ? formData?.AdoptionChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(
    formData?.AdoptionChildDetails?.vehicleFromMl ? formData?.AdoptionChildDetails?.vehicleFromMl : ""
  );
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(
    formData?.AdoptionChildDetails?.vehicleHaltPlace ? formData?.AdoptionChildDetails?.vehicleHaltPlace : ""
  );
  //const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.AdoptionChildDetails?.vehicleHaltPlaceMl ? formData?.AdoptionChildDetails?.vehicleHaltPlaceMl : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.AdoptionChildDetails?.vehicleToMl ? formData?.AdoptionChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(
    formData?.AdoptionChildDetails?.vehicleDesDetailsEn ? formData?.AdoptionChildDetails?.vehicleDesDetailsEn : ""
  );
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(
    formData?.AdoptionChildDetails?.setadmittedHospitalEn ? formData?.AdoptionChildDetails?.setadmittedHospitalEn : ""
  );

  const [publicPlaceType, setpublicPlaceType] = useState(
    formData?.AdoptionChildDetails?.publicPlaceType?.code
      ? formData?.AdoptionChildDetails?.publicPlaceType
      : formData?.AdoptionChildDetails?.publicPlaceType
      ? ""
      : ""
  );
  const [localityNameEn, setlocalityNameEn] = useState(
    formData?.AdoptionChildDetails?.localityNameEn ? formData?.AdoptionChildDetails?.localityNameEn : ""
  );
  const [localityNameMl, setlocalityNameMl] = useState(
    formData?.AdoptionChildDetails?.localityNameMl ? formData?.AdoptionChildDetails?.localityNameMl : ""
  );
  const [streetNameEn, setstreetNameEn] = useState(formData?.AdoptionChildDetails?.streetNameEn ? formData?.AdoptionChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.AdoptionChildDetails?.streetNameMl ? formData?.AdoptionChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(
    formData?.AdoptionChildDetails?.publicPlaceDecpEn ? formData?.AdoptionChildDetails?.publicPlaceDecpEn : ""
  );

  // const [pregnancyDuration, setPregnancyDuration] = useState(isEditAdoption ? (cmbPregWeek.filter(cmbPregWeek => cmbPregWeek.code === formData?.AdoptionChildDetails?.pregnancyDuration)[0]) : formData?.AdoptionChildDetails?.pregnancyDuration);

  const [pregnancyDuration, setPregnancyDuration] = useState(
    formData?.AdoptionChildDetails?.pregnancyDuration ? formData?.AdoptionChildDetails?.pregnancyDuration : ""
  );
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(
    formData?.AdoptionChildDetails?.medicalAttensionSub?.code
      ? formData?.AdoptionChildDetails?.medicalAttensionSub
      : formData?.AdoptionChildDetails?.medicalAttensionSub
      ? cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.AdoptionChildDetails?.medicalAttensionSub)[0]
      : ""
  );
  // const [medicalAttensionSub, setMedicalAttensionSub] = useState(isEditAdoption && isEditBirthPageComponents === false && (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined) ? (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.AdoptionChildDetails?.medicalAttensionSub)[0]) : formData?.AdoptionChildDetails?.medicalAttensionSub);
  const [deliveryMethods, setDeliveryMethod] = useState(
    formData?.AdoptionChildDetails?.deliveryMethods?.code
      ? formData?.AdoptionChildDetails?.deliveryMethods
      : formData?.AdoptionChildDetails?.deliveryMethods
      ? cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.AdoptionChildDetails?.deliveryMethods)[0]
      : ""
  );
  //  const [deliveryMethods, setDeliveryMethod] = useState(isEditAdoption && isEditBirthPageComponents === false && (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined) ? (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.AdoptionChildDetails?.deliveryMethods)[0]) : formData?.AdoptionChildDetails?.deliveryMethods);
  const [birthWeight, setBirthWeight] = useState(formData?.AdoptionChildDetails?.birthWeight ? formData?.AdoptionChildDetails?.birthWeight : null);

  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.AdoptionChildDetails?.childAadharNo ? false : false);
  const [ChildAadharHIde, setChildAadharHIde] = useState(formData?.AdoptionChildDetails?.childAadharNo ? true : false);
  const [DOBError, setDOBError] = useState(formData?.AdoptionChildDetails?.childDOB ? false : false);
  const [HospitalError, setHospitalError] = useState(formData?.AdoptionChildDetails?.hospitalName ? false : false);
  const [InstitutionError, setInstitutionError] = useState(formData?.AdoptionChildDetails?.institution ? false : false);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.AdoptionChildDetails?.institutionId ? false : false);
  const [WardError, setAdsWardError] = useState(formData?.AdoptionChildDetails?.wardNo ? false : false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.AdoptionChildDetails?.AdrsHomePostOffice ? false : false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.AdoptionChildDetails?.AdrsHomePincode ? false : false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.AdoptionChildDetails?.AdrsHomeHouseNameEn ? false : false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.AdoptionChildDetails?.AdrsHomeHouseNameMl ? false : false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(
    formData?.AdoptionChildDetails?.AdrsHomeLocalityNameEn ? false : false
  );
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(
    formData?.AdoptionChildDetails?.AdrsHomeLocalityNameMl ? false : false
  );
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.AdoptionChildDetails?.VehicleRegistrationNo ? false : false);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.AdoptionChildDetails?.vehicleType ? false : false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.AdoptionChildDetails?.vehicleHaltPlace ? false : false);
  // const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.AdoptionChildDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.AdoptionChildDetails?.setadmittedHospitalEn ? false : false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.AdoptionChildDetails?.vehicleDesDetailsEn ? false : false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.AdoptionChildDetails?.publicPlaceType ? false : false);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.AdoptionChildDetails?.localityNameEn ? false : false);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.AdoptionChildDetails?.localityNameMl ? false : false);
  const [BirthWeightError, setBirthWeightError] = useState(formData?.AdoptionChildDetails?.DeliveryMethodSub ? false : false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.AdoptionChildDetails?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.AdoptionChildDetails?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.AdoptionChildDetails?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(
    formData?.AdoptionChildDetails?.pregnancyDuration ? false : false
  );
  const [AdoptionDecreErr, setAdoptionDecreErr] = useState(formData?.AdoptionChildDetails?.AdoptionDecreErr ? false : false);
  // const [isAdopted, setIsAdopted] = useState(formData?.AdoptionChildDetails?.isAdopted);
  // const [isMultipleBirth, setIsMultipleBirth] = useState(formData?.AdoptionChildDetails?.isMultipleBirth);
  // const [isBornOutSide, setIsBornOutSide] = useState(formData?.AdoptionChildDetails?.isBornOutSide);
  // const [ChildPassportNo, setChildPassportNo] = useState(formData?.AdoptionChildDetails?.ChildPassportNo);
  // const [ChildArrivalDate, setChildArrivalDate] = useState(formData?.AdoptionChildDetails?.ChildArrivalDate);

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
  const [AdoptionAgencyName, setAdoptionAgentName] = useState(
    formData?.AdoptionChildDetails?.adoptagencyname
      ? formData?.AdoptionChildDetails?.adoptagencyname
      : formData?.AdoptionChildDetails?.AdoptionAgencyName
      ? formData?.AdoptionChildDetails?.AdoptionAgencyName
      : ""
  );
  const [AdoptionAgencyAddress, setAdoptionAgencyAddress] = useState(
    formData?.AdoptionChildDetails?.adoptagencyaddress
      ? formData?.AdoptionChildDetails?.adoptagencyaddress
      : formData?.AdoptionChildDetails?.AdoptionAgencyAddress
      ? formData?.AdoptionChildDetails?.AdoptionAgencyAddress
      : ""
  );
  const [AdoptionContractPersonName, setAdoptionAgencyPersonName] = useState(
    formData?.AdoptionChildDetails?.adoptagencycontactperson
      ? formData?.AdoptionChildDetails?.adoptagencycontactperson
      : formData?.AdoptionChildDetails?.AdoptionContractPersonName
      ? formData?.AdoptionChildDetails?.AdoptionContractPersonName
      : ""
  );
  const [AdoptionContactNo, setAdoptionContactNo] = useState(
    formData?.AdoptionChildDetails?.adoptagencycontactpersonmobileno
      ? formData?.AdoptionChildDetails?.adoptagencycontactpersonmobileno
      : formData?.AdoptionChildDetails?.AdoptionContactNo
      ? formData?.AdoptionChildDetails?.AdoptionContactNo
      : ""
  );
  const [AdoptionDecreOrderNo, setAdoptionDecreOrderNo] = useState(
    formData?.AdoptionChildDetails?.adoptdecreeorderno
      ? formData?.AdoptionChildDetails?.adoptdecreeorderno
      : formData?.AdoptionChildDetails?.AdoptionDecreOrderNo
      ? formData?.AdoptionChildDetails?.AdoptionDecreOrderNo
      : ""
  );
  const [AdoptionDecreOrderDate, setAdoptionDecreOrderDate] = useState(
    formData?.AdoptionChildDetails?.adoptdateoforderdecree
      ? convertEpochToDate(formData?.AdoptionChildDetails?.adoptdateoforderdecree)
      : formData?.AdoptionChildDetails?.AdoptionDecreOrderDate
      ? convertEpochToDate(formData?.AdoptionChildDetails?.AdoptionDecreOrderDate)
      : ""
  );
  const [IssuingAuthority, setIssuingAuthority] = useState(
    formData?.AdoptionChildDetails?.adoptissuingauththority
      ? formData?.AdoptionChildDetails?.adoptissuingauththority
      : formData?.AdoptionChildDetails?.IssuingAuthority
      ? formData?.AdoptionChildDetails?.IssuingAuthority
      : ""
  );
  const [AdoptionDeedNo, setAdoptionDeedNo] = useState(
    formData?.AdoptionChildDetails?.adoptdeedorderno
      ? formData?.AdoptionChildDetails?.adoptdeedorderno
      : formData?.AdoptionChildDetails?.AdoptionDeedNo
      ? formData?.AdoptionChildDetails?.AdoptionDeedNo
      : ""
  );
  const [AdoptionDeedRegDate, setAdoptionDeedRegDate] = useState(
    formData?.AdoptionChildDetails?.adoptdateoforderdeed
      ? convertEpochToDate(formData?.AdoptionChildDetails?.adoptdateoforderdeed)
      : formData?.AdoptionChildDetails?.AdoptionDeedRegDate
      ? convertEpochToDate(formData?.AdoptionChildDetails?.AdoptionDeedRegDate)
      : ""
  );
  const [RegistrationAuthority, setRegistrationAuthority] = useState(
    formData?.AdoptionChildDetails?.adoptissuingauththority
      ? formData?.AdoptionChildDetails?.adoptissuingauththority
      : formData?.AdoptionChildDetails?.RegistrationAuthority
      ? formData?.AdoptionChildDetails?.RegistrationAuthority
      : ""
  );
  const [BirthRegNo, setBirthRegNo] = useState(formData?.AdoptionChildDetails?.BirthRegNo ? formData?.AdoptionChildDetails?.BirthRegNo : "");
  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender && isEditAdoption !== false) {
      formData?.AdoptionChildDetails?.gender !== ""
        ? selectGender(menu?.filter((menu) => menu.code === formData?.AdoptionChildDetails?.gender)[0])
        : "";
      formData?.AdoptionChildDetails?.birthPlace !== ""
        ? selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.birthPlace)[0])
        : "";
      formData?.AdoptionChildDetails?.birthPlace !== ""
        ? setValue(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.birthPlace)[0]?.code)
        : "";
      // formData?.AdoptionChildDetails.hospitalName !== ""?selectHospitalName((cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.hospitalName)[0]?.code)) :setValue("")
    }
  }, [menu?.length > 0 || cmbPlaceMaster?.length > 0]);

  // useState(()=>{
  //   if(isEditAdoption){
  //     formData.AdoptionDetails.pop()
  //   }

  // },[formData])
  useEffect(() => {
    if (SearchRegId) {
      SearchRegId?.childDOB ? setChildDOB(convertEpochToDate(SearchRegId?.childDOB)) : setChildDOB(null);
      SearchRegId?.gender ? selectGender(menu.filter((menu) => menu.code === SearchRegId?.gender)[0]) : selectGender("");
      SearchRegId?.childAadharNo ? setChildAadharNo(SearchRegId.childAadharNo) : setChildAadharNo(null);
      SearchRegId?.childFirstNameEn ? setChildFirstNameEn(SearchRegId.childFirstNameEn) : setChildFirstNameEn("");
      SearchRegId?.childMiddleNameEn ? setChildMiddleNameEn(SearchRegId.childMiddleNameEn) : setChildMiddleNameEn("");
      SearchRegId?.childLastNameEn ? setChildLastNameEn(SearchRegId.childLastNameEn) : setChildLastNameEn("");
      SearchRegId?.childFirstNameMl ? setChildFirstNameMl(SearchRegId.childFirstNameMl) : setChildFirstNameMl("");
      SearchRegId?.childMiddleNameMl ? setChildMiddleNameMl(SearchRegId.childMiddleNameMl) : setChildMiddleNameMl("");
      SearchRegId?.childLastNameMl ? setChildLastNameMl(SearchRegId.childLastNameMl) : setChildLastNameMl("");
      SearchRegId?.birthPlace
        ? selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === SearchRegId?.birthPlace)[0])
        : selectBirthPlace("");
      SearchRegId?.birthPlace ? setValue(SearchRegId?.birthPlace) : setValue("");
      // console.log(SearchRegId?.hospitalCode,cmbhospital,(cmbhospital.filter(cmbhospital => cmbhospital.code == SearchRegId?.hospitalCode )[0]));
      SearchRegId?.hospitalCode
        ? selectHospitalName(cmbhospital.filter((cmbhospital) => cmbhospital.code === SearchRegId?.hospitalCode)[0])
        : selectHospitalName("");
      SearchRegId?.hospitalCode
        ? selectHospitalNameMl(cmbhospital.filter((cmbhospital) => cmbhospital.code === SearchRegId?.hospitalCode)[0]?.hospitalNamelocal)
        : selectHospitalNameMl("");
      SearchRegId?.wardNo ? setWardNo(cmbWardNo.filter((cmbWardNo) => cmbWardNo.code === SearchRegId?.wardNo)[0]) : setWardNo([]);
      SearchRegId?.adrsPostOffice
        ? setAdrsPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.code === SearchRegId?.adrsPostOffice)[0])
        : "";
      SearchRegId?.adrsPostOffice
        ? setAdrsPincode(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.code === SearchRegId?.adrsPostOffice)[0]?.pincode)
        : "";
      SearchRegId?.adrsLocalityNameEn ? setAdrsLocalityNameEn(SearchRegId?.adrsLocalityNameEn) : setAdrsLocalityNameEn("");
      SearchRegId?.adrsLocalityNameMl ? setAdrsLocalityNameMl(SearchRegId?.adrsLocalityNameMl) : setAdrsLocalityNameMl("");
      SearchRegId?.adrsHouseNameEn ? setAdrsHouseNameEn(SearchRegId?.adrsHouseNameEn) : setAdrsHouseNameEn("");
      SearchRegId?.adrsHouseNameMl ? setAdrsHouseNameMl(SearchRegId?.adrsHouseNameMl) : setAdrsHouseNameMl("");
      SearchRegId?.streetNameEn ? setAdrsStreetNameEn(SearchRegId?.streetNameEn) : setAdrsStreetNameEn("");
      SearchRegId?.streetNameMl ? setAdrsStreetNameMl(SearchRegId?.streetNameMl) : setAdrsStreetNameMl();
      SearchRegId?.vehicleToEn ? setvehicleToEn(SearchRegId?.vehicleToEn) : setvehicleToEn("");
      SearchRegId?.vehicleType
        ? setvehicleType(cmbVehicle.filter((cmbVehicle) => cmbVehicle.code === SearchRegId?.vehicleType)[0])
        : setvehicleType("");
      SearchRegId?.vehicleRegistrationNo ? setvehicleRegistrationNo(SearchRegId?.vehicleRegistrationNo) : setvehicleRegistrationNo("");
      SearchRegId?.vehicleFromEn ? setvehicleFromEn(SearchRegId?.vehicleFromEn) : setvehicleFromEn("");
      SearchRegId?.vehicleFromMl ? setvehicleFromMl(SearchRegId?.vehicleFromMl) : setvehicleFromMl("");
      SearchRegId?.vehicleHaltPlace ? setvehicleHaltPlace(SearchRegId?.vehicleHaltPlace) : setvehicleHaltPlace("");
      SearchRegId?.vehicleToMl ? setvehicleToMl(SearchRegId?.vehicleToMl) : setvehicleToMl("");
      SearchRegId?.vehicleDesDetailsEn ? setvehicleDesDetailsEn(SearchRegId?.vehicleDesDetailsEn) : setvehicleDesDetailsEn("");
      SearchRegId?.setadmittedHospitalEn
        ? setSelectedadmittedHospitalEn(cmbhospital.filter((cmbhospital) => cmbhospital.code === SearchRegId?.setadmittedHospitalEn)[0])
        : "";
      SearchRegId?.institutionTypeCode
        ? setInstitution(cmbInstitutionType.filter((cmbInstitutionType) => cmbInstitutionType.code === SearchRegId?.institutionTypeCode)[0])
        : setInstitution("");
      SearchRegId?.institutionId
        ? setInstitutionId(
            cmbInstitutionList.filter((cmbInstitutionList) => cmbInstitutionList.institutionName === SearchRegId?.institutionNameCode)[0]
          )
        : setInstitutionId("");
      SearchRegId?.institutionIdMl
        ? setInstitutionIdMl(
            cmbInstitutionList.filter((cmbInstitutionList) => cmbInstitutionList.institutionName === SearchRegId?.institutionNameCode)[0]
          )
        : setInstitutionIdMl("");
      SearchRegId?.publicPlaceType
        ? setpublicPlaceType(cmbOtherplace.filter((cmbOtherplace) => cmbOtherplace.code === SearchRegId?.publicPlaceType)[0])
        : setpublicPlaceType("");
      SearchRegId?.localityNameEn ? setlocalityNameEn(SearchRegId?.localityNameEn) : setlocalityNameEn("");
      SearchRegId?.localityNameMl ? setlocalityNameMl(SearchRegId?.localityNameMl) : setlocalityNameMl("");
      SearchRegId?.streetNameEn ? setstreetNameEn(SearchRegId?.streetNameEn) : setstreetNameEn("");
      SearchRegId?.streetNameMl ? setstreetNameMl(SearchRegId?.streetNameMl) : setstreetNameMl("");
      SearchRegId?.vehicleDesDetailsEn ? setpublicPlaceDecpEn(SearchRegId?.vehicleDesDetailsEn) : setpublicPlaceDecpEn("");
    }
  }, [SearchRegId]);

  React.useEffect(() => {
    if (isInitialRenderPlace) {
      if (birthPlace) {
        setIsInitialRenderPlace(false);
        placeOfBirth = birthPlace.code;
        setValue(placeOfBirth);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(placeOfBirth)));
        if (placeOfBirth === "HOSPITAL") {
          <BirthPlaceHospital hospitalName={hospitalName} hospitalNameMl={hospitalNameMl} />;
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
    if (e.target.value.trim().length >= 0) {
      setChildAadharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }

  function setselectChildDOB(value) {
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      setDOBError(false);
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      // console.log(Difference_In_DaysRounded);
      if (Difference_In_DaysRounded >= 365) {
        setChildAadharHIde(true);
      } else {
        setChildAadharHIde(false);
        setChildAadharNo(null);
      }
    }
    // else {
    //   setChildDOB(null);
    //   // setDOBError(true);
    //   // setToast(true);
    //   // setTimeout(() => {
    //   //   setToast(false);
    //   // }, 3000);
    // }

    // const today = new Date();
    // const birthDate = new Date(value);
    // let diffdate = birthDate.setMonth(birthDate.getMonth() - 6)
    // console.log(diffdate);
    // let age_in_ms = today - birthDate;
    // let age_in_years = age_in_ms / (1000 * 60 * 60 * 24 * 365);
    // setMotherAgeMarriage(Math.floor(age_in_years));
  }
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z]*$") != null) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z]*$") != null) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z]*$") != null) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setSelectChildFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildFirstNameMl("");
    } else {
      setChildFirstNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildMiddleNameMl("");
    } else {
      setChildMiddleNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setChildLastNameMl("");
    } else {
      setChildLastNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(
      e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 2)
    );
  }
  const setSelectAgencyName = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setAdoptionAgentName(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setSelectAgencyAddress = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ]*$") != null) {
      setAdoptionAgencyAddress(e.target.value.length <= 200 ? e.target.value : e.target.value.substring(0, 200));
    }
  };
  const setSelectContactPersonName = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setAdoptionAgencyPersonName(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setSelectAgencyContactNo = (e) => {
    if (e.target.value.trim().length != 0) {
      setAdoptionContactNo(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    } else {
      setAdoptionContactNo(e.target.value);
    }
  };
  const setSelectSetBirthRegNo = (e) => {
    setBirthRegNo(e.target.value);
  };

  const setSelectDeeOrderNo = (e) => {
    setAdoptionDecreOrderNo(e.target.value);
    if (AdoptionDeedNo === "") {
      setAdoptionDeedRegDate("");
      setRegistrationAuthority("");
    }
  };
  const setSelectDeeOrderDate = (value) => {
    setAdoptionDecreOrderDate(value);
  };
  const setSelectIssuingAuthority = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setIssuingAuthority(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setSelectDeedNo = (e) => {
    setAdoptionDeedNo(e.target.value);
    if (AdoptionDecreOrderNo === "") {
      setIssuingAuthority("");
      setAdoptionDecreOrderDate("");
    }
  };
  const setSelectDeedRegDate = (value) => {
    setAdoptionDeedRegDate(value);
  };
  const setSelectRegistrationAuthority = (e) => {
    setRegistrationAuthority(e.target.value);
  };

  // function setSelectPregnancyDuration(value) {
  //   setRegistrationAuthority(value);
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
      let hour = value;
      let period = hour > 12 ? "PM" : "AM";
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
  function setAgencyDetails(e) {
    if (e.target.checked === true) {
      setIsAdoptionAgency(e.target.checked);
    } else {
      setIsAdoptionAgency(e.target.checked);
      setAdoptionAgentName("");
      setAdoptionAgencyAddress("");
      setAdoptionAgencyPersonName("");
      setAdoptionContactNo("");
    }
  }
  function setBirthRegDetails(e) {
    if (e.target.checked === true) {
      setbirthRegistered(e.target.checked);
      setBirthRegPopup(!birthRegPopup);
    } else {
      setbirthRegistered(e.target.checked);
      setBirthRegNo("");
      setChildDOB(null);
      selectGender("");
      setChildAadharNo(null);
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
    if (childAadharNo != null) {
      let adharLength = childAadharNo;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setAadharError(false);
      }
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
    // if (birthWeight != null || birthWeight != "" || birthWeight != undefined) {
    //   let BirthWeightCheck = birthWeight;
    //   if (BirthWeightCheck < 0.25 || BirthWeightCheck > 10) {
    //     validFlag = false;
    //     setBirthWeightError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setBirthWeightError(false);
    //   }
    // }
    // else {
    //   setBirthWeightError(true);
    //   validFlag = false;
    //   setBirthWeightError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // }
    // if (medicalAttensionSub == null || medicalAttensionSub == "" || medicalAttensionSub == undefined) {
    //   validFlag = false;
    //   setMedicalAttensionSubStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setMedicalAttensionSubStError(false);
    // }
    // if (pregnancyDuration == null || pregnancyDuration == "" || pregnancyDuration == undefined) {
    //   validFlag = false;
    //   setPregnancyDurationStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   if (pregnancyDuration < 20 || pregnancyDuration > 44) {
    //     validFlag = false;
    //     setPregnancyDurationInvalidError(true);
    //     setToast(true);
    //     setTimeout(() => {
    //       setToast(false);
    //     }, 2000);
    //   } else {
    //     setPregnancyDurationStError(false);
    //     setPregnancyDurationInvalidError(false);
    //   }
    // }
    // if (deliveryMethods == null || deliveryMethods == "" || deliveryMethods == undefined) {
    //   validFlag = false;
    //   setDeliveryMethodStError(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    // } else {
    //   setDeliveryMethodStError(false);
    // }
    if (AdoptionDecreOrderNo == "" && AdoptionDeedNo == "") {
      validFlag = false;
      setAdoptionDecreErr(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setAdoptionDecreErr(false);
    }
    if (validFlag == true) {
      // sessionStorage.setItem("stateId", stateId ? stateId : null);
      // sessionStorage.setItem("tenantId", tenantId ? tenantId : null);
      // sessionStorage.setItem("workFlowCode", workFlowCode);
      // sessionStorage.setItem("childDOB", childDOB ? childDOB : null);
      // sessionStorage.setItem("birthDateTime", birthDateTime ? birthDateTime : null);
      // sessionStorage.setItem("gender", gender ? gender.code : null);
      // sessionStorage.setItem("childAadharNo", childAadharNo ? childAadharNo : null);
      // sessionStorage.setItem("childFirstNameEn", childFirstNameEn ? childFirstNameEn : null);
      // sessionStorage.setItem("childMiddleNameEn", childMiddleNameEn ? childMiddleNameEn : null);
      // sessionStorage.setItem("childLastNameEn", childLastNameEn ? childLastNameEn : null);
      // sessionStorage.setItem("childFirstNameMl", childFirstNameMl ? childFirstNameMl : null);
      // sessionStorage.setItem("childMiddleNameMl", childMiddleNameMl ? childMiddleNameMl : null);
      // sessionStorage.setItem("childLastNameMl", childLastNameMl ? childLastNameMl : null);
      // sessionStorage.setItem("isChildName", isChildName);
      // sessionStorage.setItem("adoptionAgency", adoptionAgency);
      // sessionStorage.setItem("birthRegistered", birthRegistered);
      // sessionStorage.setItem("SearchRegId", SearchRegId);
      // sessionStorage.setItem("AdoptionAgencyName", AdoptionAgencyName);
      // sessionStorage.setItem("AdoptionAgencyAddress", AdoptionAgencyAddress);
      // sessionStorage.setItem("AdoptionContractPersonName", AdoptionContractPersonName);
      // sessionStorage.setItem("AdoptionContactNo", AdoptionContactNo);
      // sessionStorage.setItem("AdoptionDecreOrderDate", AdoptionDecreOrderDate);
      // sessionStorage.setItem("AdoptionDecreOrderNo", AdoptionDecreOrderNo);
      // sessionStorage.setItem("IssuingAuthority", IssuingAuthority);
      // sessionStorage.setItem("AdoptionDeedNo", AdoptionDeedNo);
      // sessionStorage.setItem("AdoptionDeedRegDate", AdoptionDeedRegDate);
      // sessionStorage.setItem("RegistrationAuthority", RegistrationAuthority);
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
      let IsEditChangeScreen = isEditAdoption ? isEditAdoption : false;
      let isWorkflow = isEditAdoption ? false : true;
      onSelect(config.key, {
        stateId,
        tenantId,
        workFlowCode,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        isChildName,
        SearchRegId,
        birthRegistered,
        adoptionAgency,
        AdoptionAgencyName,
        AdoptionAgencyAddress,
        AdoptionContractPersonName,
        AdoptionContactNo,
        AdoptionDecreOrderDate,
        AdoptionDecreOrderNo,
        IssuingAuthority,
        AdoptionDeedNo,
        AdoptionDeedRegDate,
        RegistrationAuthority,
        childFirstNameEn,
        childMiddleNameEn,
        childLastNameEn,
        childFirstNameMl,
        childMiddleNameMl,
        childLastNameMl,
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
        birthWeight,
        pregnancyDuration,
        medicalAttensionSub,
        deliveryMethods,
        IsEditChangeScreen,
        isWorkflow,
      });
    }
  };
  if (
    isEditAdoption &&
    isEditBirthPageComponents === false &&
    (formData?.AdoptionChildDetails?.IsEditChangeScreen === false || formData?.AdoptionChildDetails?.IsEditChangeScreen === undefined)
  ) {
    if (formData?.AdoptionChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter((menu) => menu.code === formData?.AdoptionChildDetails?.gender)[0]);
      }
    }
    if (formData?.AdoptionChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.AdoptionChildDetails?.birthPlace)[0]);
        setValue(formData?.AdoptionChildDetails?.birthPlace);
      }
    }
    if (formData?.AdoptionChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(
          cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.AdoptionChildDetails?.medicalAttensionSub)[0]
        );
      }
    }
    // if (formData?.AdoptionChildDetails?.pregnancyDuration != null) {
    //   console.log("pregnancyDuration" + pregnancyDuration);
    //   if (cmbPregWeek.length > 0 && (pregnancyDuration === undefined || pregnancyDuration === "")) {
    //     setPregnancyDuration(cmbPregWeek.filter(cmbPregWeek => parseInt(cmbPregWeek.code) === formData?.AdoptionChildDetails?.pregnancyDuration)[0]);
    //   }
    // }
    if (formData?.AdoptionChildDetails?.deliveryMethods != null) {
      if (cmbDeliveryMethod.length > 0 && (deliveryMethods === undefined || deliveryMethods === "")) {
        // console.log(cmbDeliveryMethod.filter(cmbDeliveryMethod => parseInt(cmbDeliveryMethod.code) === formData?.AdoptionChildDetails?.deliveryMethods)[0]);
        setDeliveryMethod(
          cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.AdoptionChildDetails?.deliveryMethods)[0]
        );
      }
    }
  }

  if (isWorkFlowDetailsLoading || isLoading || isAttentionOfDeliveryLoading || isDeliveryMethodListLoading || isPlaceMasterLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
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
              : false)
            // || !medicalAttensionSub || !deliveryMethods || birthWeight == null || pregnancyDuration === ""
          }
        >
          {!editFlag && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CheckBox label={t("CR_BIRTH_REGISTERED")} onChange={setBirthRegDetails} value={birthRegistered} checked={birthRegistered} />
                </div>
              </div>
            </div>
          )}

          {!editFlag && birthRegPopup && birthRegistered == true && (
            <React.Fragment>
              {/* {isEditFlag?(
              <AdoptionBirthReqSearch BirthRegNo={BirthRegNo} setSelectSetBirthRegNo={setSelectSetBirthRegNo} setSearchRegId={setSearchRegId}/>
            ):
            ( */}
              <BirthReqSearch
                BirthRegNo={BirthRegNo}
                closePopup={() => {
                  setBirthRegPopup(false), setbirthRegistered(false);
                }}
                setBirthRegPopup={setBirthRegPopup}
                setSelectSetBirthRegNo={setSelectSetBirthRegNo}
                setSearchRegId={setSearchRegId}
              />

              {/* {birthRegistered == true && SearchRegId && (
               <div className="row">
               <div className="col-md-12">
                 <div className="col-md-3">
                   <CardLabel>
                     {`${t("CR_SEARCH_BIRTH_REG_ID")}`}
                   </CardLabel>
                   <TextInput
                     t={t}
                     isMandatory={false}
                     type={"text"}
                     optionKey="i18nKey"
                     name="CR_SEARCH_BIRTH_REG_ID"
                     value={SearchRegId?.applicationNumber}
                     // onKeyPress={setCheckMalayalamInputField}
                    //  onChange={setSelectDeeOrderNo}
                     disable={true}
                     placeholder={`${t("CR_SEARCH_BIRTH_REG_ID")}`}
                     {...(validation = {
                       // pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                       isRequired: false,
                       type: "text",
                       title: t(""),
                     })}
                   />
                 </div>
                 <div className="col-md-3">
                   <CardLabel>{`${t("CR_SEARCH_DOB")}`}
                   {AdoptionDeedNo ==="" &&  <span className="mandatorycss">*</span>}
                   </CardLabel>
                   <TextInput
                     t={t}
                     isMandatory={false}
                     type={"text"}
                     optionKey="i18nKey"
                     name="CR_SEARCH_DOB"
                     value={convertEpochToDateDMY(SearchRegId?.childDOB)}
                     // onKeyPress={setCheckMalayalamInputField}
                     onChange={setSelectIssuingAuthority}
                     disable={true}
                     placeholder={`${t("CR_SEARCH_DOB")}`}
                     {...(validation = {
                       // pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                       isRequired:false,
                       type: "text",
                       title: t(""),
                     })}
                   />
                 </div>
                 <div className="col-md-3">
                   <CardLabel>{`${t("CR_SEARCH_PLACE")}`}
                   {AdoptionDeedNo ==="" &&  <span className="mandatorycss">*</span>}
                   </CardLabel>
                   <TextInput
                     t={t}
                     isMandatory={false}
                     type={"text"}
                     optionKey="i18nKey"
                     name="CR_SEARCH_PLACE"
                     value={SearchRegId?.birthPlace}
                     // onKeyPress={setCheckMalayalamInputField}
                    //  onChange={setSelectIssuingAuthority}
                     disable={true}
                     placeholder={`${t("CR_SEARCH_PLACE")}`}
                     {...(validation = {
                      
                       isRequired:  false,
                       type: "text",
                       title: t(""),
                     })}
                   />
                 </div>
                 <div className="col-md-3">
                   <CardLabel>{`${t("CR_SEARCH_GENDER")}`}
                   {AdoptionDeedNo ==="" &&  <span className="mandatorycss">*</span>}
                   </CardLabel>
                   <TextInput
                     t={t}
                     isMandatory={false}
                     type={"text"}
                     optionKey="i18nKey"
                     name="CR_SEARCH_GENDER"
                     value={SearchRegId?.gender}
                     // onKeyPress={setCheckMalayalamInputField}
                    //  onChange={setSelectIssuingAuthority}
                     disable={true}
                     placeholder={`${t("CR_SEARCH_GENDER")}`}
                     {...(validation = {
                      
                       isRequired:  false,
                       type: "text",
                       title: t(""),
                     })}
                   />
                 </div>
               </div>
             </div>
          )
           }  */}
              {BirthRegNo && SearchRegId == "" && (
                <div style={{ marginTop: "24px", marginTop: "24px", marginLeft: "24px", flex: 1 }}>
                  <Card style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>{t("CR_INVALID_BIRTH_REG_ID")}</Card>
                </div>
              )}
            </React.Fragment>
          )}
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
              <div className="col-md-4">
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
                  {...(validation = { isRequired: false, pattern: "^[0-9]{12}$", type: "test", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
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
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                   <CheckBox label={t("CR_WANT_TO_ENTER_CHILD_NAME")} onChange={setChildName}
                  value={isChildName} checked={isChildName} />
              </div>
            </div>
          </div> */}
          {isChildName === false && (
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
                      {`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
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
                      placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_EN")}`}
                      {...(validation = {
                        pattern: "^[a-zA-Z-.`' ]*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_EN"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_EN ")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameEn"
                      value={childMiddleNameEn}
                      onChange={setSelectChildMiddleNameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_MIDCR_ADOPTIVE_MIDDLE_NAME_EN LE_NAME_EN")}`}
                      {...(validation = {
                        pattern: "^[a-zA-Z-.`' ]*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_EN"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameEn"
                      value={childLastNameEn}
                      onChange={setSelectChildLastNameEn}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ADOPTIVE_LAST_NAME_EN")}`}
                      {...(validation = {
                        pattern: "^[a-zA-Z-.`' ]*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_LAST_NAME_EN"),
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardLabel>
                      {`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childFirstNameMl"
                      value={childFirstNameMl}
                      onKeyPress={setCheckMalayalamInputField}
                      onChange={setSelectChildFirstNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ADOPTIVE_FIRST_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: true,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_FIRST_NAME_ML"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childMiddleNameMl"
                      value={childMiddleNameMl}
                      onKeyPress={setCheckMalayalamInputField}
                      onChange={setSelectChildMiddleNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ADOPTIVE_MIDDLE_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_MIDDLE_NAME_ML"),
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <CardLabel>{`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}</CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="childLastNameMl"
                      value={childLastNameMl}
                      onKeyPress={setCheckMalayalamInputField}
                      onChange={setSelectChildLastNameMl}
                      disable={isDisableEdit}
                      placeholder={`${t("CR_ADOPTIVE_LAST_NAME_ML")}`}
                      {...(validation = {
                        pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                        isRequired: false,
                        type: "text",
                        title: t("CR_INVALID_ADOPTIVE_LAST_NAME_ML"),
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox label={t("CR_WANT_TO_ENTER_CHILD_NAME")} onChange={setChildName} value={isChildName} checked={isChildName} />
              </div>
            </div>
          </div>

          {AdoptionDeedNo === "" && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_DECREE")}`}
                    {AdoptionDeedNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptdecreeorderno"
                    value={AdoptionDecreOrderNo}
                    // onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectDeeOrderNo}
                    disable={isDisableEdit || AdoptionDeedNo !== "" || RegistrationAuthority !== "" || AdoptionDeedRegDate !== ""}
                    placeholder={`${t("CR_ADOPTION_DECREE")}`}
                    {...(validation = {
                      // pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: AdoptionDeedNo === "" ? true : false,
                      pattern: "^[0-9`' ]*$",
                      type: "number",
                      title: t("CR_INVALID_ADOPTION_DECREE"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_DECREE_ORDER_DATE")}`}
                    {AdoptionDeedNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <DatePicker
                    date={AdoptionDecreOrderDate}
                    name="adoptdateoforderdecree"
                    max={convertEpochToDate(new Date())}
                    min={convertEpochToDate(new Date(childDOB))}
                    onChange={setSelectDeeOrderDate}
                    disabled={isDisableEdit || AdoptionDeedNo !== "" || RegistrationAuthority !== "" || AdoptionDeedRegDate !== ""}
                    //  inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_ADOPTION_DECREE_ORDER_DATE")}`}
                    {...(validation = { isRequired: AdoptionDeedNo === "" ? true : false, title: t("CR_INVALID_ADOPTION_DECREE_ORDER_DATE") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ISSUING_AUTHORITY")}`}
                    {AdoptionDeedNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptissuingauththority"
                    value={IssuingAuthority}
                    // onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectIssuingAuthority}
                    disable={isDisableEdit || AdoptionDeedNo !== "" || RegistrationAuthority !== "" || AdoptionDeedRegDate !== ""}
                    placeholder={`${t("CR_ISSUING_AUTHORITY")}`}
                    {...(validation = {
                      // pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                      isRequired: AdoptionDeedNo === "" ? true : false,
                      type: "text",
                      title: t("CR_INVALID_ISSUING_AUTHORITY"),
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {AdoptionDecreOrderNo === "" && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_ADOPTION_DEED_NO")}`}
                    {AdoptionDecreOrderNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptdeedorderno"
                    value={AdoptionDeedNo}
                    // onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectDeedNo}
                    disable={isDisableEdit || AdoptionDecreOrderNo !== "" || IssuingAuthority !== "" || AdoptionDecreOrderDate !== ""}
                    placeholder={`${t("CR_ADOPTION_DEED_NO")}`}
                    {...(validation = {
                      pattern: "^[0-9`' ]*$",
                      isRequired: AdoptionDecreOrderNo == "" ? true : false,
                      type: "number",
                      title: t("CR_INVALID_ADOPTION_DEED_NO"),
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_DEED_REG_DATE")}`}
                    {AdoptionDecreOrderNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <DatePicker
                    date={AdoptionDeedRegDate}
                    name="adoptdateoforderdeed"
                    max={convertEpochToDate(new Date())}
                    min={convertEpochToDate(new Date(childDOB))}
                    onChange={setSelectDeedRegDate}
                    disabled={isDisableEdit || AdoptionDecreOrderNo !== "" || IssuingAuthority !== "" || AdoptionDecreOrderDate !== ""}
                    //  inputFormat="DD-MM-YYYY"
                    placeholder={`${t("CR_DEED_REG_DATE")}`}
                    {...(validation = { isRequired: AdoptionDecreOrderNo == "" ? true : false, title: t("CR_INVALID_DEED_REG_DATE") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("CR_REG_AUTHORITY")}`}
                    {AdoptionDecreOrderNo === "" && <span className="mandatorycss">*</span>}
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptissuingauththority"
                    value={RegistrationAuthority}
                    // onKeyPress={setCheckMalayalamInputField}
                    onChange={setSelectRegistrationAuthority}
                    disable={isDisableEdit || AdoptionDecreOrderNo !== "" || IssuingAuthority !== "" || AdoptionDecreOrderDate !== ""}
                    placeholder={`${t("CR_REG_AUTHORITY")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: AdoptionDecreOrderNo == "" ? true : false,
                      type: "text",
                      title: t("CR_INVALID_REG_AUTHORITY"),
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* {ChildAadharHIde === true && (
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
                </div>)} */}
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
                  optionKey="name"
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
                isEditAdoption={isEditAdoption}
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
                isEditAdoption={isEditAdoption}
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
                isEditAdoption={isEditAdoption}
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
                isEditAdoption={isEditAdoption}
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
                isEditAdoption={isEditAdoption}
              />
            </div>
          )}

          {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("OTHER_DETAILS")}`}</span> </h1>
          </div>
        </div> */}
          {/* <div className="row">         
          <div className="col-md-6" >
          
            <CheckBox label={t("CR_MULTIPLE_BIRTH")} onChange={setMultipleBirth} value={isMultipleBirth} checked={isMultipleBirth} />
          </div>
        </div> */}
          {/* <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div> */}
          {/* <div className="row">
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
            \
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
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CheckBox label={t("CR_ENTER_ADOPTION_AGENCY_DETAILS")} onChange={setAgencyDetails} value={adoptionAgency} checked={adoptionAgency} />
              </div>
            </div>
          </div>
          {adoptionAgency == true && (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_ADOPTION_AGENT_NAME")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptagencyname"
                    value={AdoptionAgencyName}
                    onChange={setSelectAgencyName}
                    placeholder={`${t("CR_ADOPTION_AGENT_NAME")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_ADOPTION_AGENT_NAME"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_ADOPTION_AGENT_ADDRESS")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="adoptagencyaddress"
                    value={AdoptionAgencyAddress}
                    onChange={setSelectAgencyAddress}
                    placeholder={`${t("CR_ADOPTION_AGENT_ADDRESS")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: true,
                      type: "text",
                      title: t("CR_INVALID_ADOPTION_AGENT_ADDRESS"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {`${t("CR_ADOPTION_CONTACT_PERSON")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"decimal"}
                    optionKey="i18nKey"
                    name="adoptagencycontactperson"
                    value={AdoptionContractPersonName}
                    onChange={setSelectContactPersonName}
                    placeholder={`${t("CR_ADOPTION_CONTACT_PERSON")}`}
                    {...(validation = {
                      pattern: "^[a-zA-Z-.`' ]*$",
                      isRequired: true,
                      type: "decimal",
                      title: t("CR_INVALID_ADOPTION_CONTACT_PERSON_NAME"),
                    })}
                  />
                </div>
                <div className="col-md-3">
                  <CardLabel>
                    {t("CR_ADOPTION_CONTACT_NO")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"decimal"}
                    optionKey="i18nKey"
                    name="adoptagencycontactpersonmobileno"
                    value={AdoptionContactNo}
                    onChange={setSelectAgencyContactNo}
                    placeholder={`${t("CR_ADOPTION_CONTACT_NO")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", isRequired: true, type: "number", title: t("CR_INVALID_ADOPTION_CONTACT_NO") })}
                  />
                </div>
              </div>
            </div>
          )}
          {toast && (
            <Toast
              error={
                AadharError ||
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
                BirthWeightError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError ||
                AdoptionDecreErr
              }
              label={
                AadharError ||
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
                BirthWeightError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError ||
                AdoptionDecreErr
                  ? AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
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
                    : BirthWeightError
                    ? t(`BIRTH_WEIGHT_ERROR`)
                    : MedicalAttensionSubStError
                    ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                    : PregnancyDurationStError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                    : PregnancyDurationInvalidError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)
                    : DeliveryMethodStError
                    ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)
                    : AdoptionDecreErr
                    ? t(`choose any one of decree or deed `)
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
export default AdoptionChildDetails;
