import React, { useState, useEffect } from "react";
import { CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar } from "@egovernments/digit-ui-react-components";
import moment from "moment";
import Timeline from "../../components/NACTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
import FormStep from "../../../../../react-components/src/molecules/FormStep";
import BirthPlaceHospital from "../../pageComponents/birthComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../../pageComponents/birthComponents/BirthPlaceInstitution";
import BirthPlaceHome from "../../pageComponents/birthComponents/BirthPlaceHome";
import BirthPlaceVehicle from "../../pageComponents/birthComponents/BirthPlaceVehicle";
import BirthPlacePublicPlace from "../../pageComponents/birthComponents/BirthPlacePublicPlace";

const BirthNACDetails = ({ config, onSelect, userType, formData, isEditBirth }) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "WorkFlowBirth"
  );
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);
  const [InstitutionFilterList, setInstitutionFilterList] = useState(null);
  const [isInitialRenderInstitutionList, setIsInitialRenderInstitutionList] = useState(false);
  const [PostOfficevalues, setPostOfficevalues] = useState(null);

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
  let placeOfBirth = null;
  let cmbPlaceMaster = [];
  let workFlowData = [];
  let wardNameEn = "";
  let wardNameMl = "";
  let hospitalCode = "";
  let wardNumber = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";

  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
      workFlowData.push(ob);
    });
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let menu = [];
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
  const [workFlowCode, setWorkFlowCode] = useState();

  const [childDOB, setChildDOB] = useState(formData?.BirthNACDetails?.childDOB ? formData?.BirthNACDetails?.childDOB : "");
  const [gender, selectGender] = useState(formData?.BirthNACDetails?.gender ? formData?.BirthNACDetails?.gender : "");

  const [childAadharNo, setChildAadharNo] = useState(formData?.BirthNACDetails?.childAadharNo ? formData?.BirthNACDetails?.childAadharNo : "");
  const [childFirstNameEn, setChildFirstNameEn] = useState(
    formData?.BirthNACDetails?.childFirstNameEn ? formData?.BirthNACDetails?.childFirstNameEn : ""
  );
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.BirthNACDetails?.childMiddleNameEn ? formData?.BirthNACDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(
    formData?.BirthNACDetails?.childLastNameEn ? formData?.BirthNACDetails?.childLastNameEn : ""
  );
  const [childFirstNameMl, setChildFirstNameMl] = useState(
    formData?.BirthNACDetails?.childFirstNameMl ? formData?.BirthNACDetails?.childFirstNameMl : ""
  );
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.BirthNACDetails?.childMiddleNameMl ? formData?.BirthNACDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(
    formData?.BirthNACDetails?.childLastNameMl ? formData?.BirthNACDetails?.childLastNameMl : ""
  );
  const [birthDateTime, setbirthDateTime] = useState(formData?.BirthNACDetails?.birthDateTime ? formData?.BirthNACDetails?.birthDateTime : "");
  const [hospitalName, selectHospitalName] = useState(
    formData?.BirthNACDetails?.hospitalName?.code ? formData?.BirthNACDetails?.hospitalName : formData?.BirthNACDetails?.hospitalName ? "" : ""
  );
  const [hospitalNameMl, selectHospitalNameMl] = useState(
    formData?.BirthNACDetails?.hospitalNameMl?.code ? formData?.BirthNACDetails?.hospitalNameMl : formData?.BirthNACDetails?.hospitalNameMl ? "" : ""
  );
  const [birthPlace, selectBirthPlace] = useState(
    formData?.BirthNACDetails?.birthPlace?.code
      ? formData?.BirthNACDetails?.birthPlace
      : formData?.BirthNACDetails?.birthPlace
      ? cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.BirthNACDetails?.birthPlace)[0]
      : ""
  );
  const [institution, setInstitution] = useState(
    formData?.BirthNACDetails?.institution?.code ? formData?.BirthNACDetails?.institution : formData?.BirthNACDetails?.institutionTypeCode ? "" : ""
  );
  const [institutionId, setInstitutionId] = useState(
    formData?.BirthNACDetails?.institutionId?.code
      ? formData?.BirthNACDetails?.institutionId
      : formData?.BirthNACDetails?.institutionNameCode
      ? ""
      : ""
  );
  const [institutionIdMl, setInstitutionIdMl] = useState(
    formData?.BirthNACDetails?.institutionIdMl?.code
      ? formData?.BirthNACDetails?.institutionIdMl
      : formData?.BirthNACDetails?.institutionNameCode
      ? ""
      : ""
  );
  const [adrsPostOffice, setAdrsPostOffice] = useState(
    formData?.BirthNACDetails?.adrsPostOffice?.code ? formData?.BirthNACDetails?.adrsPostOffice : formData?.BirthNACDetails?.adrsPostOffice ? "" : ""
  );
  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?. BirthNACDetails?.adrsPostOffice ? formData?. BirthNACDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.BirthNACDetails?.adrsPincode ? formData?.BirthNACDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(
    formData?.BirthNACDetails?.adrsHouseNameEn ? formData?.BirthNACDetails?.adrsHouseNameEn : ""
  );
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(
    formData?.BirthNACDetails?.adrsHouseNameMl ? formData?.BirthNACDetails?.adrsHouseNameMl : ""
  );
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(
    formData?.BirthNACDetails?.adrsLocalityNameEn ? formData?.BirthNACDetails?.adrsLocalityNameEn : ""
  );
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(
    formData?.BirthNACDetails?.adrsLocalityNameMl ? formData?.BirthNACDetails?.adrsLocalityNameMl : ""
  );
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(
    formData?.BirthNACDetails?.adrsStreetNameEn ? formData?.BirthNACDetails?.adrsStreetNameEn : ""
  );
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(
    formData?.BirthNACDetails?.adrsStreetNameMl ? formData?.BirthNACDetails?.adrsStreetNameMl : ""
  );
  const [wardNo, setWardNo] = useState(
    formData.BirthNACDetails?.wardNo?.code ? formData.BirthNACDetails?.wardNo : formData?.BirthNACDetails?.wardNo ? "" : ""
  );
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);

  const [vehicleType, setvehicleType] = useState(
    formData?.BirthNACDetails?.vehicleType?.code ? formData?.BirthNACDetails?.vehicleType : formData?.BirthNACDetails?.vehicleType ? "" : ""
  );
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(
    formData?.BirthNACDetails?.vehicleRegistrationNo ? formData?.BirthNACDetails?.vehicleRegistrationNo : ""
  );
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.BirthNACDetails?.vehicleFromEn ? formData?.BirthNACDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.BirthNACDetails?.vehicleToEn ? formData?.BirthNACDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.BirthNACDetails?.vehicleFromMl ? formData?.BirthNACDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(
    formData?.BirthNACDetails?.vehicleHaltPlace ? formData?.BirthNACDetails?.vehicleHaltPlace : ""
  );
  //const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?. BirthNACDetails?.vehicleHaltPlaceMl ? formData?. BirthNACDetails?.vehicleHaltPlaceMl : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.BirthNACDetails?.vehicleToMl ? formData?.BirthNACDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(
    formData?.BirthNACDetails?.vehicleDesDetailsEn ? formData?.BirthNACDetails?.vehicleDesDetailsEn : ""
  );
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(
    formData?.BirthNACDetails?.setadmittedHospitalEn?.code
      ? formData?.BirthNACDetails?.setadmittedHospitalEn
      : formData?.BirthNACDetails?.setadmittedHospitalEn
      ? ""
      : ""
  );
  const [value, setValue] = useState();
  const [DifferenceInTime, setDifferenceInTime] = useState(formData?.BirthNACDetails?.DifferenceInTime);

  const [publicPlaceType, setpublicPlaceType] = useState(
    formData?.BirthNACDetails?.publicPlaceType?.code
      ? formData?.BirthNACDetails?.publicPlaceType
      : formData?.BirthNACDetails?.publicPlaceType
      ? ""
      : ""
  );
  const [localityNameEn, setlocalityNameEn] = useState(formData?.BirthNACDetails?.localityNameEn ? formData?.BirthNACDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.BirthNACDetails?.localityNameMl ? formData?.BirthNACDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.BirthNACDetails?.streetNameEn ? formData?.BirthNACDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.BirthNACDetails?.streetNameMl ? formData?.BirthNACDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(
    formData?.BirthNACDetails?.publicPlaceDecpEn ? formData?.BirthNACDetails?.publicPlaceDecpEn : ""
  );

  const [nacorderofChildren, setorderOfBirth] = useState(
    formData?.BirthNACDetails?.nacorderofChildren ? formData?.BirthNACDetails?.nacorderofChildren : null
  );
  const [toast, setToast] = useState(false);
  const [DateTimeError, setDateTimeError] = useState(false);
  const [DateTimeHourError, setDateTimeHourError] = useState(false);
  const [DateTimeMinuteError, setDateTimeMinuteError] = useState(false);
  const [DateTimeAMPMError, setDateTimeAMPMError] = useState(false);
  const [DOBError, setDOBError] = useState(formData?.BirthNACDetails?.childDOB ? false : true);
  const [HospitalError, setHospitalError] = useState(formData?.BirthNACDetails?.hospitalName ? false : true);
  const [InstitutionError, setInstitutionError] = useState(formData?.BirthNACDetails?.institution ? false : true);
  const [InstitutionNameError, setInstitutionNameError] = useState(formData?.BirthNACDetails?.institutionId ? false : true);
  const [WardError, setAdsWardError] = useState(formData?.BirthPlaceHomeDetails?.wardNo ? false : true);
  const [AdsHomePostOfficeError, setAdsHomePostOfficeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePostOffice ? false : true);
  const [AdsHomePincodeError, setAdsHomePincodeError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomePincode ? false : true);
  const [AdsHomeHouseNameEnError, setAdsHomeHouseNameEnError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameEn ? false : true);
  const [AdsHomeHouseNameMlError, setAdsHomeHouseNameMlError] = useState(formData?.BirthPlaceHomeDetails?.AdrsHomeHouseNameMl ? false : true);
  const [AdsHomeLocalityNameEnError, setAdsHomeLocalityNameEnError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameEn ? false : true
  );
  const [AdsHomeLocalityNameMlError, setAdsHomeLocalityNameMlError] = useState(
    formData?.BirthPlaceHomeDetails?.AdrsHomeLocalityNameMl ? false : true
  );
  const [vehicleRegiNoError, setvehicleRegiNoError] = useState(formData?.BirthNACDetails?.VehicleRegistrationNo ? false : true);
  const [vehiTypeError, setvehiTypeError] = useState(formData?.BirthNACDetails?.vehicleType ? false : true);
  const [vehicleHaltPlaceError, setvehicleHaltPlaceError] = useState(formData?.BirthNACDetails?.vehicleHaltPlace ? false : true);
  const [admittedHospitalEnError, setadmittedHospitalEnError] = useState(formData?.BirthNACDetails?.setadmittedHospitalEn ? false : true);
  const [vehiDesDetailsEnError, setvehiDesDetailsEnError] = useState(formData?.BirthNACDetails?.vehicleDesDetailsEn ? false : true);
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.BirthNACDetails?.publicPlaceType ? false : true);
  const [localNameEnError, setlocalNameEnError] = useState(formData?.BirthNACDetails?.localityNameEn ? false : true);
  const [localNameMlError, setlocalNameMlError] = useState(formData?.BirthNACDetails?.localityNameMl ? false : true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [checkbirthDateTime, setCheckbirthDateTime] = useState({ hh: null, mm: null, amPm: null });

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  function setselectGender(value) {
    selectGender(value);
  }
  useEffect(() => {
    //console.log("time while onchange", birthDateTime);
  }, [birthDateTime]);

  const handleTimeChange = (value, cb) => {
    if (value?.target?.name === "hour12") {
      setCheckbirthDateTime({ ...setCheckbirthDateTime, hh: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "minute") {
      setCheckbirthDateTime({ ...checkbirthDateTime, mm: value?.target?.value ? value?.target?.value : null });
    } else if (value?.target?.name === "amPm") {
      setCheckbirthDateTime({ ...checkbirthDateTime, amPm: value?.target?.value ? value?.target?.value : null });
    }
    if (typeof value === "string") {
      cb(value);
      // let hour = value;
      // let period = hour > 12 ? "PM" : "AM";
      // console.log(period);
      setbirthDateTime(value);
    }
  };

  function setselectChildDOB(value) {
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
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
  function setSelectOrderOfBirth(e) {
    if (e.target.value != null || e.target.value != "") {
      if (e.target.value <= 15) {
        setorderOfBirth(e.target.value);
      }
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
  function setSelectChildAadharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setChildAadharNo(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }

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
    if (currentWorgFlow.length > 0) {
      setWorkFlowCode(currentWorgFlow[0].WorkflowCode);
      //setIsPayment(currentWorgFlow[0].payment);
      //setAmount(currentWorgFlow[0].amount);
    }
    clearBirthPalce(value);
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
      if (hospitalName == null || hospitalNameMl === null) {
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        //hospitalCode = hospitalName.code;
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
      if (adrsLocalityNameEn === null || adrsLocalityNameEn.trim() === "" || adrsLocalityNameEn.trim() === undefined) {
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
      if (localityNameEn == null || localityNameEn.trim() == "" || localityNameEn.trim() == undefined) {
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

    if (validFlag == true) {
      let IsEditChangeScreen = isEditBirth ? isEditBirth : false;

      onSelect(config.key, {
        stateId,
        tenantId,
        workFlowCode,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        nacorderofChildren,
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
        vehicleDesDetailsEn,
        publicPlaceType,
        localityNameEn: localityNameEn.trim(),
        localityNameMl: localityNameMl.trim(),
        streetNameEn: streetNameEn.trim(),
        streetNameMl: streetNameMl.trim(),
        publicPlaceDecpEn: publicPlaceDecpEn.trim(),
        childFirstNameEn: childFirstNameEn.trim(),
        childMiddleNameEn: childMiddleNameEn.trim(),
        childLastNameEn: childLastNameEn.trim(),
        childFirstNameMl: childFirstNameMl.trim(),
        childMiddleNameMl: childMiddleNameMl.trim(),
        childLastNameMl: childLastNameMl.trim(),
        IsEditChangeScreen,
      });
    }
  };
  if (formData?.BirthNACDetails?.birthPlace != null) {
    if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
      selectBirthPlace(cmbPlaceMaster.filter((cmbPlaceMaster) => cmbPlaceMaster.code === formData?.BirthNACDetails?.birthPlace)[0]);
      setValue(formData?.BirthNACDetails?.birthPlace);
    }
  }
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
    } else {
      return null;
    }
  };

  if (isWorkFlowDetailsLoading || isLoading || isCountryLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={
            !childFirstNameEn ||
            !childFirstNameMl ||
            !childDOB ||
            !gender ||
            !birthPlace ||
            !nacorderofChildren ||
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
          }
        >
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAC")}`}</span>{" "}
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
                  disable={isEdit}
                  onChange={setSelectChildAadharNo}
                  placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
                  {...(validation = { pattern: "^[0-9]{12}$", type: "test", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
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
                  disable={isEdit}
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
                  disable={isEdit}
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
                  disable={isEdit}
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
                  disable={isEdit}
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
                  disable={isEdit}
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
                  disable={isEdit}
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
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={moment().subtract(1, "year").format("YYYY-MM-DD")}
                  onChange={setselectChildDOB}
                  inputFormat="DD-MM-YYYY"
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
              <div className="col-md-2">
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
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("ORDER_OF_BIRTH")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="nacorderofChildren"
                  value={nacorderofChildren}
                  disable={isEdit}
                  onChange={setSelectOrderOfBirth}
                  placeholder={`${t("ORDER_OF_BIRTH")}`}
                  {...(validation = {
                    pattern: "^[0-9`' ]*$",
                    isRequired: true,
                    type: "text",
                  })}
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
            <div className="col-md-12"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
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
          {toast && (
            <Toast
              error={
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
                localNameMlError
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
                localNameMlError
                  ? DateTimeError
                    ? t(`CS_COMMON_DATE_TIME_ERROR`)
                    : DateTimeHourError
                    ? t(`CS_COMMON_DATE_HOUR_ERROR`)
                    : DateTimeMinuteError
                    ? t(`CS_COMMON_DATE_MINUTE_ERROR`)
                    : DateTimeAMPMError
                    ? t(`CS_COMMON_DATE_AMPM_ERROR`)
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
export default BirthNACDetails;
