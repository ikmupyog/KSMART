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
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
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
  // console.log(JSON.stringify(formData));
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
  const { data: WorkFlowDetails = {}, isWorkFlowDetailsLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "WorkFlowBirth");
  const { data: PlaeceMaster = {}, isPlaceMasterLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "PlaceMaster");
  const [isDisableEdit, setisDisableEdit] = useState(isEditBirth ? isEditBirth : false);

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
  let hospitalCode = "";
  let institutionTypeCode = "";
  let institutionNameCode = "";

  WorkFlowDetails &&
    WorkFlowDetails["birth-death-service"] && WorkFlowDetails["birth-death-service"].WorkFlowBirth &&
    WorkFlowDetails["birth-death-service"].WorkFlowBirth.map((ob) => {
      workFlowData.push(ob);
      // console.log(workFlowData);
    });
  let cmbCountry = [];
  Country &&
    Country["common-masters"] &&
    Country["common-masters"].Country.map((ob) => {
      cmbCountry.push(ob);
    });
  let menu = [];
  // let workFlowCode = "BIRTHHOSP21";
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
    PlaeceMaster &&
    PlaeceMaster["birth-death-service"] && PlaeceMaster["birth-death-service"].PlaceMaster &&
    PlaeceMaster["birth-death-service"].PlaceMaster.map((ob) => {
 cmbPlaceMaster.push(ob);
});
    const [workFlowCode, setWorkFlowCode] = useState(); 

  const [childDOB, setChildDOB] = useState(formData?.NACChildDetails?.childDOB ? formData?.NACChildDetails?.childDOB : "");
  const [gender, selectGender] = useState(formData?.NACChildDetails?.gender);

  
  const [childAadharNo, setChildAadharNo] = useState(
    formData?.NACChildDetails?.childAadharNo ? formData?.NACChildDetails?.childAadharNo : ""
  );
  const [childFirstNameEn, setChildFirstNameEn] = useState(
    formData?.NACChildDetails?.childFirstNameEn ? formData?.NACChildDetails?.childFirstNameEn : ""
  );
  const [childMiddleNameEn, setChildMiddleNameEn] = useState(
    formData?.NACChildDetails?.childMiddleNameEn ? formData?.NACChildDetails?.childMiddleNameEn : ""
  );
  const [childLastNameEn, setChildLastNameEn] = useState(
    formData?.NACChildDetails?.childLastNameEn ? formData?.NACChildDetails?.childLastNameEn : ""
  );
  const [childFirstNameMl, setChildFirstNameMl] = useState(
    formData?.NACChildDetails?.childFirstNameMl ? formData?.NACChildDetails?.childFirstNameMl : ""
  );
  const [childMiddleNameMl, setChildMiddleNameMl] = useState(
    formData?.NACChildDetails?.childMiddleNameMl ? formData?.NACChildDetails?.childMiddleNameMl : ""
  );
  const [childLastNameMl, setChildLastNameMl] = useState(
    formData?.NACNACChildDetails?.childLastNameMl ? formData?.NACNACChildDetails?.childLastNameMl : ""
  );
  const [birthDateTime, setbirthDateTime] = useState(
    formData?.NACNACChildDetails?.birthDateTime ? formData?.NACNACChildDetails?.birthDateTime : ""
  );
  const [placeofBirth, setplaceofBirth] = useState(
    formData?.NACNACChildDetails?.placeofBirth ? formData?.NACNACChildDetails?.placeofBirth : null
  );
  const [hospitalName, selectHospitalName] = useState(formData?.ChildDetails?.hospitalName?.code ? formData?.ChildDetails?.hospitalName : formData?.ChildDetails?.hospitalName ? "" : "");
  const [hospitalNameMl, selectHospitalNameMl] = useState(formData?.ChildDetails?.hospitalNameMl?.code ? formData?.ChildDetails?.hospitalNameMl : formData?.ChildDetails?.hospitalNameMl ? "" : "");
  const [birthPlace, selectBirthPlace] = useState(formData?.ChildDetails?.birthPlace?.code ? formData?.ChildDetails?.birthPlace : formData?.ChildDetails?.birthPlace ?
    (cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]) : "");
  const [institution, setInstitution] = useState(formData?.ChildDetails?.institution?.code ? formData?.ChildDetails?.institution : formData?.ChildDetails?.institutionTypeCode ? "" : "");
  const [institutionId, setInstitutionId] = useState(formData?.ChildDetails?.institutionId?.code ? formData?.ChildDetails?.institutionId : formData?.ChildDetails?.institutionNameCode ? "" : "");
  const [institutionIdMl, setInstitutionIdMl] = useState(formData?.ChildDetails?.institutionIdMl?.code ? formData?.ChildDetails?.institutionIdMl : formData?.ChildDetails?.institutionNameCode ? "" : "");
  const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.ChildDetails?.adrsPostOffice?.code ? formData?.ChildDetails?.adrsPostOffice : formData?.ChildDetails?.adrsPostOffice ? "" : "");
  // const [adrsPostOffice, setAdrsPostOffice] = useState(formData?.NACChildDetails?.adrsPostOffice ? formData?.NACChildDetails?.adrsPostOffice : null);
  const [adrsPincode, setAdrsPincode] = useState(formData?.ChildDetails?.adrsPincode ? formData?.ChildDetails?.adrsPincode : null);
  const [adrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.ChildDetails?.adrsHouseNameEn ? formData?.ChildDetails?.adrsHouseNameEn : "");
  const [adrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.ChildDetails?.adrsHouseNameMl ? formData?.ChildDetails?.adrsHouseNameMl : "");
  const [adrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.ChildDetails?.adrsLocalityNameEn ? formData?.ChildDetails?.adrsLocalityNameEn : "");
  const [adrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.ChildDetails?.adrsLocalityNameMl ? formData?.ChildDetails?.adrsLocalityNameMl : "");
  const [adrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.ChildDetails?.adrsStreetNameEn ? formData?.ChildDetails?.adrsStreetNameEn : "");
  const [adrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.ChildDetails?.adrsStreetNameMl ? formData?.ChildDetails?.adrsStreetNameMl : "");
  const [wardNo, setWardNo] = useState(formData.ChildDetails?.wardNo?.code ? formData.ChildDetails?.wardNo : formData?.ChildDetails?.wardNo ? "" : "");
  const [isInitialRenderPlace, setIsInitialRenderPlace] = useState(true);

  const [vehicleType, setvehicleType] = useState(formData?.ChildDetails?.vehicleType?.code ? formData?.ChildDetails?.vehicleType : formData?.ChildDetails?.vehicleType ? "" : "");
  const [vehicleRegistrationNo, setvehicleRegistrationNo] = useState(formData?.ChildDetails?.vehicleRegistrationNo ? formData?.ChildDetails?.vehicleRegistrationNo : "");
  const [vehicleFromEn, setvehicleFromEn] = useState(formData?.ChildDetails?.vehicleFromEn ? formData?.ChildDetails?.vehicleFromEn : "");
  const [vehicleToEn, setvehicleToEn] = useState(formData?.ChildDetails?.vehicleToEn ? formData?.ChildDetails?.vehicleToEn : "");
  const [vehicleFromMl, setvehicleFromMl] = useState(formData?.ChildDetails?.vehicleFromMl ? formData?.ChildDetails?.vehicleFromMl : "");
  const [vehicleHaltPlace, setvehicleHaltPlace] = useState(formData?.ChildDetails?.vehicleHaltPlace ? formData?.ChildDetails?.vehicleHaltPlace : "");
  //const [vehicleHaltPlaceMl, setvehicleHaltPlaceMl] = useState(formData?.ChildDetails?.vehicleHaltPlaceMl ? formData?.ChildDetails?.vehicleHaltPlaceMl : "");
  const [vehicleToMl, setvehicleToMl] = useState(formData?.ChildDetails?.vehicleToMl ? formData?.ChildDetails?.vehicleToMl : "");
  const [vehicleDesDetailsEn, setvehicleDesDetailsEn] = useState(formData?.ChildDetails?.vehicleDesDetailsEn ? formData?.ChildDetails?.vehicleDesDetailsEn : "");
  const [setadmittedHospitalEn, setSelectedadmittedHospitalEn] = useState(formData?.ChildDetails?.setadmittedHospitalEn?.code ? formData?.ChildDetails?.setadmittedHospitalEn : formData?.ChildDetails?.setadmittedHospitalEn ? "" : "");
  const [value, setValue] = useState();

  const [publicPlaceType, setpublicPlaceType] = useState(formData?.ChildDetails?.publicPlaceType?.code ? formData?.ChildDetails?.publicPlaceType : formData?.ChildDetails?.publicPlaceType ? "" : "");
  const [localityNameEn, setlocalityNameEn] = useState(formData?.ChildDetails?.localityNameEn ? formData?.ChildDetails?.localityNameEn : "");
  const [localityNameMl, setlocalityNameMl] = useState(formData?.ChildDetails?.localityNameMl ? formData?.ChildDetails?.localityNameMl : "");
  const [streetNameEn, setstreetNameEn] = useState(formData?.ChildDetails?.streetNameEn ? formData?.ChildDetails?.streetNameEn : "");
  const [streetNameMl, setstreetNameMl] = useState(formData?.ChildDetails?.streetNameMl ? formData?.ChildDetails?.streetNameMl : "");
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(formData?.ChildDetails?.publicPlaceDecpEn ? formData?.NACChildDetails?.publicPlaceDecpEn : "");

  const [orderofBirth, setorderofBirth] = useState(
    formData?.NACNACChildDetails?.orderofBirth ? formData?.NACNACChildDetails?.orderofBirth : null
  );
  const [toast, setToast] = useState(false);
  const [AadharError, setAadharError] = useState(formData?.NACNACChildDetails?.childAadharNo ? false : false);
  const [DOBError, setDOBError] = useState(formData?.NACNACChildDetails?.childDOB ? false : false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
console.log(cmbPlaceMaster,"cmbPlaceMaster");

  const [placeofBirthError, setplaceofBirthError] = useState(false);

  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  function setselectGender(value) {
    selectGender(value);
  }

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
  
      function setselectChildDOB(value) {
        setChildDOB(value);
        const today = new Date();
        const birthDate = new Date(value);
      }

  
  function setSelectChildFirstNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildFirstNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildMiddleNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setChildLastNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    // setChildLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/ig, ''));

  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  function setSelectChildFirstNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildFirstNameMl('');
    }
    else {
      setChildFirstNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildMiddleNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildMiddleNameMl('');
    }
    else {
      setChildMiddleNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildLastNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setChildLastNameMl('');
    }
    else {
      setChildLastNameMl(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectChildAadharNo(e) {
    if (e.target.value.trim().length >= 0) {
      setChildAadharNo(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  // function setSelectChildAadharNo(e) {
  //   // setContactno(e.target.value.length<=10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
  //   if (e.target.value.length != 0) {
  //     if (e.target.value.length > 12) {
  //       // setChildAadharNo(e.target.value);
  //       setAadharError(true);
  //       return false;
  //     } else if (e.target.value.length < 12) {
  //       setAadharError(true);
  //       setChildAadharNo(e.target.value);
  //       return false;
  //     } else {
  //       setAadharError(false);
  //       setChildAadharNo(e.target.value);
  //       return true;
  //     }
  //   } else {
  //     setAadharError(false);
  //     setChildAadharNo(e.target.value);
  //     return true;
  //   }
  // }
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

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
    let currentWorgFlow = workFlowData.filter(workFlowData => workFlowData.BirtPlace === value.code && (workFlowData.startdateperiod <= Difference_In_DaysRounded && workFlowData.enddateperiod >= Difference_In_DaysRounded));
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
      sessionStorage.setItem("placeofBirth",  placeofBirth ? placeofBirth : null);
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
      let IsEditChangeScreen = (isEditBirth ? isEditBirth : false);

      onSelect(config.key, {
        stateId,
        tenantId,
        workFlowCode,
        childDOB,
        birthDateTime,
        gender,
        childAadharNo,
        birthPlace, hospitalCode, hospitalName, hospitalNameMl,
        institutionTypeCode, institution, institutionNameCode, institutionId, institutionIdMl,
        wardNo, wardNameEn, wardNameMl, wardNumber, adrsHouseNameEn, adrsHouseNameMl, adrsLocalityNameEn, adrsLocalityNameMl, adrsStreetNameEn, adrsStreetNameMl, adrsPostOffice, adrsPincode,
        vehicleType, vehicleHaltPlace, vehicleRegistrationNo, vehicleFromEn, vehicleToEn, vehicleFromMl,
        vehicleToMl, setadmittedHospitalEn, vehicleDesDetailsEn,
        publicPlaceType, localityNameEn, localityNameMl, streetNameEn, streetNameMl, publicPlaceDecpEn,
        childFirstNameEn, childMiddleNameEn, childLastNameEn, childFirstNameMl, childMiddleNameMl, childLastNameMl,
      });
    }
  };
  if (formData?.ChildDetails?.birthPlace != null) {
    if (cmbPlaceMaster.length > 0 && (birthPlace === undefined || birthPlace === "")) {
      selectBirthPlace(cmbPlaceMaster.filter(cmbPlaceMaster => cmbPlaceMaster.code === formData?.ChildDetails?.birthPlace)[0]);
      setValue(formData?.ChildDetails?.birthPlace);
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
  
  if (isWorkFlowDetailsLoading || isLoading || isCountryLoading ){
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2}/> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={false}>
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
                <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}
                </CardLabel>
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
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
              </div>


              
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" onChange={(val) => handleTimeChange(val, setbirthDateTime)} value={birthDateTime} />
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
                  placeholder={`${t("CR_GENDER")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>Order of Birth</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="orderofBirth"
                  value={orderofBirth}
                  disable={isEdit}
                  onChange={setorderofBirth}            
                  placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                  inputProps={{
                    maxLength: 12,
                  }}
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
          {/* {toast && (
            <Toast
              error={DOBError || AadharError || ProvinceEnError ||  cityTownError }
              label={
                DOBError || AadharError || ProvinceEnError ||  cityTownError
                  ? DOBError
                    ? t(`BIRTH_ERROR_DOB_CHOOSE`)
                    : AadharError
                    ? t(`BIRTH_ERROR_OUTSIDE_STATE_PROV_EN_ERROR`)
                    : cityTownError
                    ? t(`BIRTH_ERROR_OUTSIDE_BIRTH_PLACE_EN_ERROR`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )} */}
          {""}
         
        </FormStep>
      </React.Fragment>
    );
  }
};
export default BirthNACDetails;
