import React, { useState, useEffect } from "react";
import {
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  UploadFile,
  PopUp,
  CardText,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import BirthPlaceHospital from "../../pageComponents/birthComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../../pageComponents/birthComponents/BirthPlaceInstitution";
import BirthPlaceHome from "../../pageComponents/birthComponents/BirthPlaceHome";
import BirthPlaceVehicle from "../../pageComponents/birthComponents/BirthPlaceVehicle";
import BirthPlacePublicPlace from "../../pageComponents/birthComponents/BirthPlacePublicPlace";
import FormStep from "../../../../../react-components/src/molecules/FormStep";
import { sortDropdownNames } from "../../utils";
import moment from "react";
import _ from "lodash";

const ChildDetails = ({ config, onSelect, userType, formData, isEditBirth = false }) => {
  // console.log(JSON.stringify(formData));
  // console.log(formData);
  // console.log(isEditBirth,"isEditBirth");
  sessionStorage.removeItem("applicationNumber");
  const [isEditBirthPageComponents, setIsEditBirthPageComponents] = useState(false);
  const [workFlowCode, setWorkFlowCode] = useState(formData?.ChildDetails?.workFlowCode);
  const [isPayment, setIsPayment] = useState(formData?.ChildDetails?.isPayment);
  const [Amount, setAmount] = useState(formData?.ChildDetails?.Amount);
  const [NACFile, setNACFile] = useState(formData?.ChildDetails?.uploadedFile ? formData?.ChildDetails?.uploadedFile : null);
  const [uploadedFile, setUploadedFile] = useState(formData?.ChildDetails?.uploadedFile ? formData?.ChildDetails?.uploadedFile : null);
  const [popUpState, setpopUpState] = useState(false);
  const [popUpStateNac, setpopUpStateNac] = useState(false);
  const [UploadNACHIde, setUploadNACHIde] = useState(formData?.ChildDetails?.UploadNACHIde ? true : false);

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  // console.log(locale);
  let validation = {};
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowBirth"
  );
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
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [userRole, setuserRole] = useState(formData?.ChildDetails?.userRole);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [DifferenceInDaysRounded, setDifferenceInDaysRounded] = useState();
  const [isDisableEdit, setisDisableEdit] = useState(false);
  const [isDisableEditRole, setisDisableEditRole] = useState(false);
  const [hospitalCode, sethospitalCode] = useState(formData?.ChildDetails?.hospitalCode);
  const [docPreview, setDocPreview] = useState(formData?.ChildDetails?.docPreview ? formData?.ChildDetails?.docPreview : null);
  // console.log(Digit.UserService.getUser().info);
  const { roles: userRoles, uuid: uuid } = Digit.UserService.getUser().info;
  const roletemp = Array.isArray(userRoles) && userRoles.filter((doc) => doc.code.includes("HOSPITAL_OPERATOR"));
  // const [isDisableEdit, setisDisableEdit] = useState((userRole === "HOSPITAL_OPERATOR") && isEditBirth ? false : false);

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
  // let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";
  let wardNameEn = "";
  let wardNameMl = "";
  let wardNumber = "";
  // let DifferenceInDaysRounded = "";
  // let workFlowCode = "BIRTHHOSP21";
  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
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
  // const cmbPregWeek = [
  //   { i18nKey: "20", code: "20" },
  //   { i18nKey: "21", code: "21" },
  //   { i18nKey: "22", code: "22" },
  //   { i18nKey: "22", code: "22" },
  //   { i18nKey: "23", code: "23" },
  //   { i18nKey: "25", code: "25" },
  //   { i18nKey: "26", code: "26" },
  //   { i18nKey: "27", code: "27" },
  //   { i18nKey: "28", code: "28" },
  //   { i18nKey: "29", code: "29" },
  //   { i18nKey: "30", code: "30" },
  //   { i18nKey: "31", code: "31" },
  //   { i18nKey: "32", code: "32" },
  //   { i18nKey: "33", code: "33" },
  //   { i18nKey: "34", code: "34" },
  //   { i18nKey: "35", code: "35" },
  //   { i18nKey: "36", code: "36" },
  //   { i18nKey: "37", code: "37" },
  //   { i18nKey: "38", code: "38" },
  //   { i18nKey: "39", code: "39" },
  //   { i18nKey: "40", code: "40" },
  //   { i18nKey: "41", code: "41" },
  //   { i18nKey: "42", code: "42" },
  // ];
  const [childDOB, setChildDOB] = useState(isEditBirth ? convertEpochToDate(formData?.ChildDetails?.childDOB) : formData?.ChildDetails?.childDOB); //formData?.ChildDetails?.childDOB
  const [gender, selectGender] = useState(
    formData?.ChildDetails?.gender?.code
      ? formData?.ChildDetails?.gender
      : formData?.ChildDetails?.gender
        ? menu.filter((menu) => menu.code === formData?.ChildDetails?.gender)[0]
        : ""
  );
  const [childAadharNo, setChildAadharNo] = useState(formData?.ChildDetails?.childAadharNo ? formData?.ChildDetails?.childAadharNo : "");
  const [proceedNoRDO, setproceedNoRDO] = useState(formData?.ChildDetails?.proceedNoRDO ? formData?.ChildDetails?.proceedNoRDO : "");
  const [regNoNAC, setregNoNAC] = useState(formData?.ChildDetails?.regNoNAC ? formData?.ChildDetails?.regNoNAC : "");
  const [childFirstNameEn, setChildFirstNameEn] = useState(formData?.ChildDetails?.childFirstNameEn ? formData?.ChildDetails?.childFirstNameEn : "");
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.ChildDetails?.childMiddleNameEn ? formData?.ChildDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(formData?.ChildDetails?.childLastNameEn ? formData?.ChildDetails?.childLastNameEn : "");
  const [childFirstNameMl, setChildFirstNameMl] = useState(formData?.ChildDetails?.childFirstNameMl ? formData?.ChildDetails?.childFirstNameMl : "");
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.ChildDetails?.childMiddleNameMl ? formData?.ChildDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(formData?.ChildDetails?.childLastNameMl ? formData?.ChildDetails?.childLastNameMl : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderuploadDoc, setisInitialRenderuploadDoc] = useState(true);
  const [isInitialRenderRoles, setInitialRenderRoles] = useState(true);
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);
  const [isInitialRenderFormData, setisInitialRenderFormData] = useState(false);
  const [birthDateTime, setbirthDateTime] = useState(
    isEditBirth === false && formData?.ChildDetails?.birthDateTime ? formData?.ChildDetails?.birthDateTime : ""
  );
  const [checkbirthDateTime, setCheckbirthDateTime] = useState({
    hh: formData?.ChildDetails?.checkbirthDateTime?.hh ? formData?.ChildDetails?.checkbirthDateTime.hh : null,
    mm: formData?.ChildDetails?.checkbirthDateTime?.mm ? formData?.ChildDetails?.checkbirthDateTime.mm : null,
    amPm: formData?.ChildDetails?.checkbirthDateTime?.amPm ? formData?.ChildDetails?.checkbirthDateTime.amPm : null,
  });
  //formData?.ChildDetails?.birthDateTime ? formData?.ChildDetails?.birthDateTime :
  const [displaytime, setDisplaytime] = useState(formData?.ChildDetails?.displaytime ? formData?.ChildDetails?.displaytime : null);
  const [displayAmPm, setDisplayAmPm] = useState(formData?.ChildDetails?.displayAmPm ? formData?.ChildDetails?.displayAmPm : null);

  const [isChildName, setIsChildName] = useState(formData?.ChildDetails?.isChildName ? formData?.ChildDetails?.isChildName : false);
  const [birthPlace, selectBirthPlace] = useState(
    formData?.ChildDetails?.birthPlace?.code
      ? formData?.ChildDetails?.birthPlace
      : formData?.ChildDetails?.birthPlace
        ? cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]
        : ""
  );
  const [value, setValue] = useState();
  const [hospitalName, selectHospitalName] = useState(
    formData?.ChildDetails?.hospitalName?.code ? formData?.ChildDetails?.hospitalName : formData?.ChildDetails?.hospitalName ? "" : ""
  );
  const [hospitalNameMl, selectHospitalNameMl] = useState(
    formData?.ChildDetails?.hospitalNameMl?.code ? formData?.ChildDetails?.hospitalNameMl : formData?.ChildDetails?.hospitalNameMl ? "" : ""
  );

  const [institution, setInstitution] = useState(
    formData?.ChildDetails?.institution?.code ? formData?.ChildDetails?.institution : formData?.ChildDetails?.institutionTypeCode ? "" : ""
  );
  const [institutionId, setInstitutionId] = useState(
    formData?.ChildDetails?.institutionId?.code ? formData?.ChildDetails?.institutionId : formData?.ChildDetails?.institutionNameCode ? "" : ""
  );
  const [institutionIdMl, setInstitutionIdMl] = useState(
    formData?.ChildDetails?.institutionIdMl?.code ? formData?.ChildDetails?.institutionIdMl : formData?.ChildDetails?.institutionNameCode ? "" : ""
  );

  const [adrsPostOffice, setAdrsPostOffice] = useState(
    formData?.ChildDetails?.adrsPostOffice?.code ? formData?.ChildDetails?.adrsPostOffice : formData?.ChildDetails?.adrsPostOffice ? "" : ""
  );
  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.ChildDetails?.adrsPostOffice ? formData?.ChildDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.ChildDetails?.adrsPincode ? formData?.ChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.ChildDetails?.adrsHouseNameEn ? formData?.ChildDetails?.adrsHouseNameEn : "");
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.ChildDetails?.adrsHouseNameMl ? formData?.ChildDetails?.adrsHouseNameMl : "");
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(
    formData?.ChildDetails?.adrsLocalityNameEn ? formData?.ChildDetails?.adrsLocalityNameEn : ""
  );
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(
    formData?.ChildDetails?.adrsLocalityNameMl ? formData?.ChildDetails?.adrsLocalityNameMl : ""
  );
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.ChildDetails?.adrsStreetNameEn ? formData?.ChildDetails?.adrsStreetNameEn : "");
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.ChildDetails?.adrsStreetNameMl ? formData?.ChildDetails?.adrsStreetNameMl : "");
  const [wardNo, setWardNo] = useState(
    formData.ChildDetails?.wardNo?.code ? formData.ChildDetails?.wardNo : formData?.ChildDetails?.wardNo ? "" : ""
  );

  const [vehicleType, setvehicleType] = useState(
    formData?.ChildDetails?.vehicleType?.code ? formData?.ChildDetails?.vehicleType : formData?.ChildDetails?.vehicleType ? "" : ""
  );
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(
    formData?.ChildDetails?.vehicleRegistrationNo ? formData?.ChildDetails?.vehicleRegistrationNo : ""
  );
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.ChildDetails?.vehicleFromEn ? formData?.ChildDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.ChildDetails?.vehicleToEn ? formData?.ChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.ChildDetails?.vehicleFromMl ? formData?.ChildDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.ChildDetails?.vehicleHaltPlace ? formData?.ChildDetails?.vehicleHaltPlace : "");
  //const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.ChildDetails?.vehicleHaltPlaceMl ? formData?.ChildDetails?.vehicleHaltPlaceMl : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.ChildDetails?.vehicleToMl ? formData?.ChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(
    formData?.ChildDetails?.vehicleDesDetailsEn ? formData?.ChildDetails?.vehicleDesDetailsEn : ""
  );
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(
    formData?.ChildDetails?.setadmittedHospitalEn?.code
      ? formData?.ChildDetails?.setadmittedHospitalEn
      : formData?.ChildDetails?.setadmittedHospitalEn
        ? ""
        : ""
  );

  const [publicPlaceType, setpublicPlaceType] = useState(
    formData?.ChildDetails?.publicPlaceType?.code ? formData?.ChildDetails?.publicPlaceType : formData?.ChildDetails?.publicPlaceType ? "" : ""
  );
  const [localityNameEn, setlocalityNameEn] = useState(formData?.ChildDetails?.localityNameEn ? formData?.ChildDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.ChildDetails?.localityNameMl ? formData?.ChildDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.ChildDetails?.streetNameEn ? formData?.ChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.ChildDetails?.streetNameMl ? formData?.ChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(
    formData?.ChildDetails?.publicPlaceDecpEn ? formData?.ChildDetails?.publicPlaceDecpEn : ""
  );

  // const [pregnancyDuration, setPregnancyDuration] = useState(isEditBirth ? (cmbPregWeek.filter(cmbPregWeek => cmbPregWeek.code === formData?.ChildDetails?.pregnancyDuration)[0]) : formData?.ChildDetails?.pregnancyDuration);

  const [pregnancyDuration, setPregnancyDuration] = useState(
    formData?.ChildDetails?.pregnancyDuration ? formData?.ChildDetails?.pregnancyDuration : ""
  );
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(
    formData?.ChildDetails?.medicalAttensionSub?.code
      ? formData?.ChildDetails?.medicalAttensionSub
      : formData?.ChildDetails?.medicalAttensionSub
        ? cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]
        : ""
  );
  // const [medicalAttensionSub, setMedicalAttensionSub] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbAttDeliverySub.filter(cmbAttDeliverySub => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]) : formData?.ChildDetails?.medicalAttensionSub);
  const [deliveryMethods, setDeliveryMethod] = useState(
    formData?.ChildDetails?.deliveryMethods?.code
      ? formData?.ChildDetails?.deliveryMethods
      : formData?.ChildDetails?.deliveryMethods
        ? cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]
        : ""
  );
  //  const [deliveryMethods, setDeliveryMethod] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined) ? (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]) : formData?.ChildDetails?.deliveryMethods);
  const [birthWeight, setBirthWeight] = useState(formData?.ChildDetails?.birthWeight ? formData?.ChildDetails?.birthWeight : null);
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.ChildDetails?.DifferenceInTime);

  const [fileSizeError, setFileSizeError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(false);
  const [DateTimeError, setDateTimeError] = useState(false);
  const [DateTimeHourError, setDateTimeHourError] = useState(false);
  const [DateTimeMinuteError, setDateTimeMinuteError] = useState(false);
  const [DateTimeAMPMError, setDateTimeAMPMError] = useState(false);
  const [ChildAadharHIde, setChildAadharHIde] = useState(formData?.ChildDetails?.childAadharNo ? true : false);
  const [DOBError, setDOBError] = useState(false);
  const [HospitalError, setHospitalError] = useState(false);
  const [InstitutionError, setInstitutionError] = useState(false);
  const [InstitutionNameError, setInstitutionNameError] = useState(false);
  const [WardError, setAdsWardError] = useState(false);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(false);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(false);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(false);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(false);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(false);
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(false);
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(false);
  const [vehiTypeError, setvehiTypeError] = useState(false);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(false);
  // const [vehiHaltPlaceMlError, setvehiHaltPlaceMlError] = useState(formData?.ChildDetails?.vehicleHaltPlaceMl ? false : false);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(false);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(false);
  const [placeTypepEnError, setplaceTypepEnError] = useState(false);
  const [localNameEnError, setlocalNameEnError] = useState(false);
  const [localNameMlError, setlocalNameMlError] = useState(false);
  const [BirthWeightError, setBirthWeightError] = useState(false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(false);
  const [ChildFirstNameEnError, setChildFirstNameEnError] = useState(false);
  const [ChildMiddleNameEnError, setChildMiddleNameEnError] = useState(false);
  const [ChildLastNameEnError, setChildLastNameEnError] = useState(false);
  const [ChildFirstNameMlError, setChildFirstNameMlError] = useState(false);
  const [ChildMiddleNameMlError, setChildMiddleNameMlError] = useState(false);
  const [ChildLastNameMlError, setChildLastNameMlError] = useState(false);
  const [AdsHomeStreetNameEnError, setAdsHomeStreetNameEnError] = useState(false);
  const [AdsHomeStreetNameMlError, setAdsHomeStreetNameMlError] = useState(false);

  const [isNACLoading, setIsNACLoading] = useState(false);

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  useEffect(() => {
    if (isInitialRender) {
      if (formData?.ChildDetails?.isChildName != null) {
        setIsInitialRender(false);
        setIsChildName(formData?.ChildDetails?.isChildName);
      }
    }
  }, [isInitialRender]);

  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    return newThumbnails;
  };
  // console.log(userRoles);
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
  // const operatorward = [];
  // const appward = [];
  // operatorwardtemp?.map((ob) => {
  //   console.log(ob);
  //   operatorward.push(...ob.jurisdictionChilds);

  // });

  const getHospitalCode = () => {
    if (userRoles[0].code === "HOSPITAL_OPERATOR") {
      const operatorHospDet = userData?.Employees[0]?.jurisdictions?.filter((doc) => doc?.roleCode?.includes("HOSPITAL_OPERATOR"));
      const operatorHosward = [];
      operatorHospDet?.map((ob) => {
        operatorHosward.push(...ob.jurisdictionChilds);
      });
      if (operatorHosward.length > 0) {
        // console.log("operatorHosward", operatorHosward[0].wardCode);
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
        // console.log("operatorHosward", appHosward[0].wardCode);
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
          <BirthPlaceHospital
            hospitalName={hospitalName}
            hospitalNameMl={hospitalNameMl}
            hospitalCode={hospitalCode}
            isDisableEditRole={isDisableEditRole}
            setisDisableEditRole={setisDisableEditRole}
            userRoles={userRoles}
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

  useEffect(() => {
    (async () => {
      if (NACFile) {
        if (NACFile.size >= 2000000) {
          setFileSizeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
            setFileSizeError(false);
          }, 3000);
        } else if (NACFile.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          try {
            const response = await Digit.UploadServices.Filestorage("citizen-profile", NACFile, tenantId);
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setDocPreview(fileDetails);
            } else {
              setFileUploadError(true);
              setToast(true);
              setTimeout(() => {
                setToast(false);
                setFileUploadError(false);
              }, 3000);
            }
          } catch (err) { }
        } else {
          setFileTypeError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
            setFileTypeError(false);
          }, 3000);
        }
      }
    })();
  }, [NACFile]);

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

  useEffect(() => {
    if (birthPlace && DifferenceInTime != null) {
      // console.log("DifferenceInTime", DifferenceInTime);
      let currentWorgFlow = workFlowData.filter(
        (workFlowData) =>
          workFlowData.BirtPlace === birthPlace.code &&
          workFlowData.startdateperiod <= DifferenceInTime &&
          workFlowData.enddateperiod >= DifferenceInTime
      );
      if (currentWorgFlow.length > 0) {
        // console.log("currentWorgFlowTime", currentWorgFlow[0].WorkflowCode);
        setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
        setIsPayment(currentWorgFlow[0].payment);
        setAmount(currentWorgFlow[0].amount);
      }
    }
  }, [DifferenceInTime]);

  function setselectChildDOB(value) {
    setDifferenceInTime(null);
    setChildDOB(value);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    // console.log(today,"today");
    // console.log("todayepoch",Date.parse(today));
    const birthDate = new Date(value);
    birthDate.setHours(0, 0, 0, 0);
    // console.log(birthDate,"birthDate");
    // console.log("birthDateepoch",Date.parse(birthDate));
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
      if (Difference_In_Days >= 365) {
        setChildAadharHIde(true);
      } else {
        setChildAadharHIde(false);
        setChildAadharNo("");
      }
      if (Difference_In_Days > 365) {
        // setUploadNACHIde(true);
        setpopUpState(true);
      } else {
        // setUploadNACHIde(false);
        setpopUpState(false);
        setUploadNACHIde(false);
        setproceedNoRDO("");
        setregNoNAC("");
        setUploadedFile("");
      }
    }
  }

  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
    // setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern) && e.code === "Space") {
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
        if (
          timeParts[0] === "01" ||
          timeParts[0] === "02" ||
          timeParts[0] === "03" ||
          timeParts[0] === "04" ||
          timeParts[0] === "05" ||
          timeParts[0] === "06" ||
          timeParts[0] === "07" ||
          timeParts[0] === "08" ||
          timeParts[0] === "09" ||
          timeParts[0] === "10" ||
          timeParts[0] === "11"
        ) {
          let displaytimeTemp = timeParts[0] + ":" + timeParts[1];
          setDisplaytime(displaytimeTemp);
          let displayAmPmTemp = "AM";
          setDisplayAmPm(displayAmPmTemp);
        } else if (timeParts[0] === "00") {
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
      // let time = value;
      // let timeParts = time.split(":");
      // console.log((+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000));
      // const milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s ) * 1000);
      // // Usage
      // const milliSecTime = milliseconds(24, 36,0);
      // const time = value;
      // // "34:26";
      // const timeParts = time.split(":");
      // const convrtmilliSecTime = milliseconds(timeParts[0], timeParts[1],0);
      // console.log(convrtmilliSecTime);
    }
  };
  function setChildName(e) {
    if (e.target.checked === true) {
      setIsChildName(e.target.checked);
      setChildFirstNameEn("");
      setChildMiddleNameEn("");
      setChildLastNameEn("");
      setChildFirstNameMl("");
      setChildMiddleNameMl("");
      setChildLastNameMl("");
    } else {
      setIsChildName(e.target.checked);
    }
  }
  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
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
  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(
      (workFlowData) =>
        workFlowData.BirtPlace === value.code && workFlowData.startdateperiod <= DifferenceInTime && workFlowData.enddateperiod >= DifferenceInTime
    );
    // console.log(currentWorgFlow);
    if (currentWorgFlow.length > 0) {
      // console.log("currentWorgFlowPlace", currentWorgFlow[0].WorkflowCode);
      setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      setIsPayment(currentWorgFlow[0].payment);
      setAmount(currentWorgFlow[0].amount);
    }
    clearBirthPalce(value);
  }
  function setSelectBirthWeight(e) {
    if (e.target.value.trim().length >= 0) {
      // if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setBirthWeight(e.target.value.length <= 4 ? e.target.value.replace(/[^0-9.]/gi, "") : e.target.value.replace(/[^0-9.]/gi, "").substring(0, 4));
    }
    // if (e.target.value.length === 5) {
    //   return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setBirthWeight(e.target.value);
    //   // if(e.target.value <= 0 || e.target.value > 10 ){
    //   //   setBirthWeightError(true);
    //   //   setToast(true);
    //   //   setTimeout(() => {
    //   //   setToast(false);
    //   // }, 3000);
    //   // } else {
    //   //   setBirthWeightError(false);
    //   //   setBirthWeight(e.target.value);
    //   // }

    // }
  }
  function setSelectproceedNoRDO(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9/ ]*$") != null) {
      setproceedNoRDO(e.target.value.trim().length <= 20 ? e.target.value : e.target.value.substring(0, 20));
    }
  }
  function setSelectregNoNAC(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z-0-9 ]*$") != null) {
      setregNoNAC(e.target.value.trim().length <= 20 ? e.target.value : e.target.value.substring(0, 20));
    }
  }
  function selectfile(e) {
    setNACFile(e.target.files[0]);
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
          let currentMints = todayDate.getMinutes();
          currenthours = currenthours < 10 ? "0" + currenthours : currenthours;
          currentMints = currentMints < 10 ? "0" + currentMints : currentMints;
          let currentDatetime = "";
          currentDatetime = currenthours + ":" + currentMints;
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
    if (childAadharNo.trim() == null || childAadharNo.trim() == "" || childAadharNo.trim() == undefined) {
      setChildAadharNo("");
    } else if (childAadharNo != null && childAadharNo != "") {
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
        sethospitalCode(hospitalName.code);
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
          setAdsHomeStreetNameEnError(false);
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
          setAdsHomeStreetNameMlError(false);
        }
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
        setlocalNameEnError(true);
        setlocalityNameEn("");
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setlocalNameEnError(false);
      }
      if (localityNameMl === null || localityNameMl.trim() == "" || localityNameMl.trim() == undefined) {
        validFlag = false;
        setlocalNameMlError(true);
        setlocalityNameMl("");
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
      if (BirthWeightCheck != ".") {
        if (BirthWeightCheck < 0.25 || BirthWeightCheck > 9) {
          validFlag = false;
          setBirthWeightError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setBirthWeightError(false);
        }
      } else {
        validFlag = false;
        setBirthWeightError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    } else {
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
    if (!isChildName) {
      if (childFirstNameEn.trim() == null || childFirstNameEn.trim() == "" || childFirstNameEn.trim() == undefined) {
        validFlag = false;
        setChildFirstNameEn("");
        setChildFirstNameEnError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setChildFirstNameEnError(false);
      }
      if (childMiddleNameEn.trim() == null || childMiddleNameEn.trim() == "" || childMiddleNameEn.trim() == undefined) {
        setChildMiddleNameEn("");
      } else {
        if (childMiddleNameMl.trim() == null || childMiddleNameMl.trim() == "" || childMiddleNameMl.trim() == undefined) {
          validFlag = false;
          setChildMiddleNameMl("");
          setChildMiddleNameMlError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setChildMiddleNameMlError(false);
        }
      }
      if (childLastNameEn.trim() == null || childLastNameEn.trim() == "" || childLastNameEn.trim() == undefined) {
        setChildLastNameEn("");
      } else {
        if (childLastNameMl.trim() == null || childLastNameMl.trim() == "" || childLastNameMl.trim() == undefined) {
          validFlag = false;
          setChildLastNameMl("");
          setChildLastNameMlError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setChildLastNameMlError(false);
        }
      }
      if (childFirstNameMl.trim() === null || childFirstNameMl.trim() === "" || childFirstNameMl.trim() === undefined) {
        validFlag = false;
        setChildFirstNameMl("");
        setChildFirstNameMlError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setChildFirstNameMlError(false);
      }
      if (childMiddleNameMl.trim() == null || childMiddleNameMl.trim() == "" || childMiddleNameMl.trim() == undefined) {
        setChildMiddleNameMl("");
        setChildMiddleNameEnError(false);
      } else {
        if (childMiddleNameEn.trim() == null || childMiddleNameEn.trim() == "" || childMiddleNameEn.trim() == undefined) {
          validFlag = false;
          setChildMiddleNameEn("");
          setChildMiddleNameEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setChildMiddleNameEnError(false);
        }
      }
      if (childLastNameMl.trim() == null || childLastNameMl.trim() == "" || childLastNameMl.trim() == undefined) {
        setChildLastNameMl("");
        setChildLastNameEnError(false);
      } else {
        if (childLastNameEn.trim() == null || childLastNameEn.trim() == "" || childLastNameEn.trim() == undefined) {
          validFlag = false;
          setChildLastNameEn("");
          setChildLastNameEnError(true);
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        } else {
          setChildLastNameEnError(false);
        }
      }
    }
    if (validFlag == true) {
      let IsEditChangeScreen = isEditBirth ? isEditBirth : false;
      let isWorkflow = isEditBirth ? false : true;
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
        childAadharNo,
        isChildName,
        childFirstNameEn: childFirstNameEn.trim(),
        childMiddleNameEn: childMiddleNameEn.trim(),
        childLastNameEn: childLastNameEn.trim(),
        childFirstNameMl: childFirstNameMl.trim(),
        childMiddleNameMl: childMiddleNameMl.trim(),
        childLastNameMl: childLastNameMl.trim(),
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
        vehicleRegistrationNo: vehicleRegistrationNo.toUpperCase().trim(),
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
        IsEditChangeScreen,
        uuid,
        DifferenceInTime,
        isWorkflow,
        isPayment,
        Amount,
        NACFile,
        uploadedFile,
        UploadNACHIde,
        proceedNoRDO: proceedNoRDO.toUpperCase().trim(),
        regNoNAC: regNoNAC.toUpperCase().trim(),
        docPreview,
      });
    }
  };
  //&& isEditBirthPageComponents === false && (formData?.ChildDetails?.IsEditChangeScreen === false || formData?.ChildDetails?.IsEditChangeScreen === undefined)
  if (isEditBirth) {
    // console.log(formData?.ChildDetails?.birthDateTime);
    if (formData?.ChildDetails?.birthDateTime != null && formData?.ChildDetails?.birthDateTime != "") {
      if (birthDateTime === undefined || birthDateTime === "" || birthDateTime === null) {
        //console.log(formData?.ChildDetails?.birthDateTime);
        //let time = formData?.ChildDetails?.birthDateTime;
        setbirthDateTime(formData?.ChildDetails?.birthDateTime);
        //let timeParts = time.split(":");
      }
    }
    if (formData?.ChildDetails?.gender != null) {
      if (menu.length > 0 && (gender === undefined || gender === "")) {
        selectGender(menu.filter((menu) => menu.code === formData?.ChildDetails?.gender)[0]);
      }
    }
    if (formData?.ChildDetails?.birthPlace != null) {
      if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
        selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]);
        setValue(formData?.ChildDetails?.birthPlace);
      }
    }
    if (formData?.ChildDetails?.medicalAttensionSub != null) {
      if (cmbAttDeliverySub.length > 0 && (medicalAttensionSub === undefined || medicalAttensionSub === "")) {
        setMedicalAttensionSub(
          cmbAttDeliverySub.filter((cmbAttDeliverySub) => cmbAttDeliverySub.code === formData?.ChildDetails?.medicalAttensionSub)[0]
        );
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
        setDeliveryMethod(cmbDeliveryMethod.filter((cmbDeliveryMethod) => cmbDeliveryMethod.code === formData?.ChildDetails?.deliveryMethods)[0]);
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
              : false) ||
            !medicalAttensionSub ||
            !deliveryMethods ||
            birthWeight == null ||
            pregnancyDuration === "" ||
            (UploadNACHIde === true ? NACFile == null || proceedNoRDO === "" || regNoNAC === "" : false)
          }
        >
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span className="headingline">{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
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
                    onKeyPress={setCheckSpecialChar}
                    placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
              )}
            </div>
          </div>
          {UploadNACHIde === true && (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="headingh1">
                      <span className="headingline">{`${t("CR_NAC_CERTIFICATE_UPLOAD")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_RDO_PROCEED_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="proceedNoRDO"
                      value={proceedNoRDO}
                      onChange={setSelectproceedNoRDO}
                      disable={isDisableEdit}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      style={{ textTransform: "uppercase" }}
                      placeholder={`${t("CR_RDO_PROCEED_NO")}`}
                      {...(validation = { pattern: "^[a-zA-Z-0-9/ ]*$", isRequired: true, type: "text", title: t("CR_RDO_PROCEED_NO") })}
                    />
                  </div>
                  <div className="col-md-3">
                    <CardLabel>
                      {`${t("CR_NAC_REG_NO")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="regNoNAC"
                      value={regNoNAC}
                      onChange={setSelectregNoNAC}
                      disable={isDisableEdit}
                      style={{ textTransform: "uppercase" }}
                      //  onChange={(e,v) => this.updateTextField(e,v)}
                      // disable={isChildName}
                      placeholder={`${t("CR_NAC_REG_NO")}`}
                      {...(validation = { pattern: "^[a-zA-Z- 0-9]*$", isRequired: true, type: "text", title: t("CR_NAC_REG_NO") })}
                    />
                  </div>
                  {isNACLoading ? (
                    <Loader></Loader>
                  ) : (
                    <React.Fragment>
                      <div className="col-md-4">
                        <CardLabel>
                          {`${t("CR_PROCE_CERTIFICATE_UPLOAD")}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectfile}
                          onDelete={() => {
                            setUploadedFile(null);
                          }}
                          message={uploadedFile ? `1 ${t(`CR_ACTION_FILEUPLOADED`)}` : t(`CR_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      {docPreview && (
                        <div className="col-md-2">
                          {_.head(docPreview)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(docPreview)?.pdfUrl}
                                alt="Other Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(docPreview)?.small} alt="Other Certificate Image" />
                          )}
                          <a target="_blank" href={_.head(docPreview)?.type === "pdf" ? _.head(docPreview)?.pdfUrl : _.head(docPreview)?.large}>
                            Preview
                          </a>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span className="headingline">{`${t("CR_PLACE_OF_BIRTH")}`}</span>{" "}
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
                  isMandatory={false}
                  option={sortDropdownNames(cmbPlaceMaster ? cmbPlaceMaster : [], "name", t)}
                  selected={birthPlace}
                  disable={isDisableEditRole}
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
                hospitalCode={hospitalCode}
                isDisableEditRole={isDisableEditRole}
                setisDisableEditRole={setisDisableEditRole}
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
                  <span className="headingline">{`${t("CR_CHILD_INFO")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>

          {isChildName === false && (
            <div>
              {/* <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span className="headingline">{`${t("CR_NAME_OF_CHILD")}`}</span>{" "}
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
                      onKeyPress={setCheckMalayalamInputField}
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
                      onKeyPress={setCheckMalayalamInputField}
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
                      onKeyPress={setCheckMalayalamInputField}
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
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <CheckBox
                  style={{ Colour: "#be3cb7 !important" }}
                  label={t("CR_WANT_TO_ENTER_CHILD_NAME")}
                  onChange={setChildName}
                  value={isChildName}
                  checked={isChildName}
                />
              </div>
            </div>
          </div>
          {/* <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span className="headingline">{`${t("OTHER_DETAILS")}`}</span> </h1>
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
                  <span className="headingline">{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                  isMandatory={false}
                  option={sortDropdownNames(cmbAttDeliverySub ? cmbAttDeliverySub : [], "name", t)}
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
              <div className="col-md-2">
                <CardLabel>
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
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
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_WEIGHT") })}
                />
              </div>
            </div>
          </div>
          {popUpState && (
            <PopUp>
              <div className="popup-module" style={{ borderRadius: "8px" }}>
                <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RDO_PROCED_QUESTION")}`}</CardText>
                    </div>
                  </div>
                  <div className="row" style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                    <button
                      type="button"
                      style={{ backgroundColor: "orange", padding: "4px 16px", color: "white", borderRadius: "8px" }}
                      onClick={() => {
                        setUploadNACHIde(true);
                        setpopUpState(false);
                        setpopUpStateNac(false);
                      }}
                    >{`${t("COMMON_YES")}`}</button>
                    <button
                      type="button"
                      style={{ border: "1px solid grey", padding: "4px 16px", borderRadius: "8px" }}
                      onClick={() => {
                        setpopUpState(false);
                        setpopUpStateNac(true);
                      }}
                    >{`${t("COMMON_NO")}`}</button>
                  </div>
                </div>
              </div>
            </PopUp>
          )}
          {popUpStateNac && (
            <PopUp>
              <div className="popup-module" style={{ borderRadius: "8px" }}>
                <div style={{ margin: "20px", padding: "20px", border: "1px solid grey", borderRadius: "8px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAC_REQUEST_MSG")}`}</CardText>
                    </div>
                  </div>
                  <div className="row" style={{ display: "flex", justifyContent: "flex-end", columnGap: "8px" }}>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "orange",
                        padding: "4px 16px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        setUploadNACHIde(false);
                        setpopUpStateNac(false);
                        window.location.assign(`${window.location.origin}/digit-ui/citizen/cr/cr-birth-nac/nac-download-details`);
                      }}
                    >
                      {`${t("COMMON_OK")}`}
                    </button>
                  </div>
                </div>
              </div>
            </PopUp>
          )}
          {toast && (
            <Toast
              error={
                AadharError ||
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
                MedicalAttensionSubStError ||
                DeliveryMethodStError ||
                BirthWeightError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError ||
                ChildFirstNameEnError ||
                ChildMiddleNameEnError ||
                ChildLastNameEnError ||
                ChildFirstNameMlError ||
                ChildMiddleNameMlError ||
                ChildLastNameMlError ||
                AdsHomeStreetNameEnError ||
                AdsHomeStreetNameMlError ||
                fileSizeError ||
                fileTypeError ||
                fileUploadError
              }
              label={
                AadharError ||
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
                  MedicalAttensionSubStError ||
                  DeliveryMethodStError ||
                  BirthWeightError ||
                  PregnancyDurationStError ||
                  PregnancyDurationInvalidError ||
                  ChildFirstNameEnError ||
                  ChildMiddleNameEnError ||
                  ChildLastNameEnError ||
                  ChildFirstNameMlError ||
                  ChildMiddleNameMlError ||
                  ChildLastNameMlError ||
                  AdsHomeStreetNameEnError ||
                  AdsHomeStreetNameMlError ||
                  fileSizeError ||
                  fileTypeError ||
                  fileUploadError
                  ? AadharError
                    ? t(`CS_COMMON_INVALID_AADHAR_NO`)
                    : DateTimeError
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
                                                                            : ChildFirstNameEnError
                                                                              ? t(`BIRTH_ERROR_CHILD_FIRST_NAME_EN`)
                                                                              : ChildMiddleNameEnError
                                                                                ? t(`BIRTH_ERROR_CHILD_MIDDLE_NAME_EN`)
                                                                                : ChildLastNameEnError
                                                                                  ? t(`BIRTH_ERROR_CHILD_LAST_NAME_EN`)
                                                                                  : ChildFirstNameMlError
                                                                                    ? t(`BIRTH_ERROR_CHILD_FIRST_NAME_ML`)
                                                                                    : ChildMiddleNameMlError
                                                                                      ? t(`BIRTH_ERROR_CHILD_MIDDLE_NAME_ML`)
                                                                                      : ChildLastNameMlError
                                                                                        ? t(`BIRTH_ERROR_CHILD_LAST_NAME_ML`)
                                                                                        : AdsHomeStreetNameEnError
                                                                                          ? t(`BIRTH_ERROR_HOME_STREET_NAME_EN`)
                                                                                          : AdsHomeStreetNameMlError
                                                                                            ? t(`BIRTH_ERROR_HOME_STREET_NAME_ML`)
                                                                                            : fileSizeError
                                                                                              ? t("FILE_SIZE_VALIDATION_MESSAGE")
                                                                                              : fileTypeError
                                                                                                ? t("FILE_TYPE_VALIDATION_MESSAGE")
                                                                                                : fileUploadError
                                                                                                  ? t("FILE_UPLOAD_VALIDATION_MESSAGE")
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
