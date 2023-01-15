import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea, Toast,Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import HospitalDetails from "../../pageComponents/birthComponents/HospitalDetails";
import InstitutionDetails from "../../pageComponents/birthComponents/InstitutionDetails";
import BirthVehicle from "../../pageComponents/birthComponents/BirthVehicle";
import PublicPlace from "../../pageComponents/birthComponents/PublicPlace";
import OtherCountry from "../../pageComponents/birthComponents/OtherCountry";
import InstitutionAddress from "../../pageComponents/birthComponents/InstitutionAddress";
import PlaceofBirthHome from "../../pageComponents/birthComponents/PlaceofBirthHome";
import InformantDetails from "./InformantDetails";
import InformantAddress from "./InformantAddress";

// import VehicleInformtAddress from "./VehicleInformtAddress";

const BirthPlace = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu = {},isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "death-services", "PlaceMaster");
  const [toast, setToast] = useState(false);
  const [HospitalError, setHospitalError] = useState(true);
  const [signedOfficerError, setSignedOfficerError] = useState(true);
  const [signedOfficerDesgError, setSignedOfficerDesgError] = useState(true);
  const [mobileError, setMobileError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [BirthPlace, selectBirthPlace] = useState(formData?.BirthPlace?.BirthPlace);
  // const [BirthPlaceDescription, setBirthPlaceDeccription] = useState(formData?.BirthPlace?.BirthPlaceDescription);
  const [HospitalName, selectHospitalName] = useState(formData?.BirthPlace?.HospitalName);
  const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.BirthPlace?.SignedOfficerName);
  const [SignedOfficerDesignation, selectSignedOfficerDesignation] = useState(formData?.BirthPlace?.SignedOfficerDesignation);
  const [SignedOfficerAadharNo, setSignedOfficerAadharNo] = useState(formData?.BirthPlace?.SignedOfficerAadharNo ? formData?.BirthPlace?.SignedOfficerAadharNo : "");
  const [SignedOfficerMobileNo, setSignedOfficerMobileNo] = useState( formData?.BirthPlace?.SignedOfficerMobileNo ? formData?.BirthPlace?.SignedOfficerMobileNo : "");
  const [OfficerNames, setFilteredOfficerName] = useState(0);
  const [Designations, setFilteredDesignation] = useState(0);

  const [setInstitution, setSelectedInstitution] = useState(formData?.BirthPlace?.setInstitution);
  const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.BirthPlace?.setInstitutionId);
  const [SiginedOfficer, setSiginedOfficer] = useState(formData?.BirthPlace?.SiginedOfficer);
  const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.BirthPlace?.SiginedOfficerDesignation);
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.BirthPlace?.InstitutionMobilNo);
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.BirthPlace?.InstitutionAadhaar);

  // const [DriverName, setDriverName] = useState(formData?.BirthPlace?.DriverName);
  // const [DriverMobileNo, setDriverMobileNo] = useState(formData?.BirthPlace?.DriverMobileNo);
  // const [DriverAadhar, setDriverAadhar] = useState(formData?.BirthPlace?.DriverAadhar);
  // const [VehicleType, setVehicleType] = useState(formData?.BirthPlace?.VehicleType);
  // const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.BirthPlace?.VehicleRegistrationNo);
  // const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthPlace?.setVehicleFromEn);
  // const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthPlace?.setSelectVehicleToEn);
  // const [VehiclePlaceFirstHalt, setVehiclePlaceFirstHalt] = useState(formData?.BirthPlace?.VehiclePlaceFirstHalt);

  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.BirthPlace?.VehicleRegistrationNo);
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthPlace?.setVehicleFromEn);
  const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthPlace?.setSelectVehicleToEn);
  const [VehicleHaltPlace, setVehicleHaltPlace] = useState(formData?.BirthPlace?.VehicleHaltPlace);
  const [VehicleFromMl, setVehicleFromMl] = useState(formData?.BirthPlace?.VehicleFromMl);
  const [VehicleToMl, setVehicleToMl] = useState(formData?.BirthPlace?.VehicleToMl);
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.BirthPlace?.VehicleOtherDetailsEn);
  const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.BirthPlace?.VehicleOtherDetailsMl);
  const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.BirthPlace?.setAdmittedHospitalEn);
  const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.BirthPlace?.setAdmittedHospitalMl);

  // const [WardNo, setWardNo] = useState(formData.BirthPlace?.wardno);

  const [setPublicPlaceType, setSelectedPublicPlaceType] = useState(formData?.BirthPlace?.setPublicPlaceType);
  const [AdrsInfontName, setAdrsInfontName] = useState(formData?.BirthPlace?.AdrsInfontName);
  const [AdrsPublicPlace, setAdrsPublicPlace] = useState(formData?.BirthPlace?.AdrsPublicPlace);
  const [PublicPlaceDesption, setPublicPlaceDesption] = useState(formData?.BirthPlace?.PublicPlaceDesption);

  const [lbs, setLbs] = useState(0);
  const [AdrsCountry, setAdrsCountry] = useState(formData?.BirthPlace?.AdrsCountry);
  const [AdrsStateName, setAdrsStateName] = useState(formData?.BirthPlace?.AdrsStateName);
  const [AdrsDistrict, setAdrsDistrict] = useState(formData?.BirthPlace?.AdrsDistrict);
  const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.BirthPlace?.AdrsLBTypeName);
  const [AdrsLBName, setAdrsLBName] = useState(formData?.BirthPlace?.AdrsLBName);
  const [AdrsTaluk, setAdrsTaluk] = useState(formData?.BirthPlace?.AdrsTaluk);
  const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.BirthPlace?.AdrsPostOffice);
  const [AdrsPincode, setAdrsPincode] = useState(formData?.BirthPlace?.AdrsPincode);
  const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.BirthPlace?.AdrsHouseNameEn);
  // const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.BirthPlace?.AdrsBuldingNo);
  const [AdrsResNoEn, setAdrsResNoEn] = useState(formData?.BirthPlace?.AdrsResNoEn);
  const [AdrsInfomntName, setAdrsInfomntName] = useState(formData?.BirthPlace?.AdrsInfomntName);
  const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.BirthPlace?.AdrsDoorNo);
  const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.BirthPlace?.AdrsMainPlaceEn);
  const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.BirthPlace?.AdrsLocalityNameEn);
  const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.BirthPlace?.AdrsStreetNameEn);
  const [AdrsVillage, setAdrsVillage] = useState(formData?.BirthPlace?.AdrsVillage);
  const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.BirthPlace?.AdrsMainPlaceMl);
  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.BirthPlace?.AdrsLocalityNameMl);
  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.BirthPlace?.AdrsStreetNameMl);
  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.BirthPlace?.AdrsHouseNameMl);
  const [AdrsResNoMl, setAdrsResNoMl] = useState(formData?.BirthPlace?.AdrsResNoMl);


  const [InfomantFirstNameEn, setInfomantFirstNameEn] = useState(formData?.BirthPlace?.InfomantFirstNameEn);
  const [InfomantAadhar, setInfomantAadhar] = useState(formData?.BirthPlace?.InfomantAadhar);
  const [InfomantEmail, setInfomantEmail] = useState(formData?.BirthPlace?.InfomantEmail);
  const [InfomantMobile, setInfomantMobile] = useState(formData?.BirthPlace?.InfomantMobile);

  const [lbss, setsLbs] = useState(0);
  const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.BirthPlace?.InformantAdrsCountry);
  const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.BirthPlace?.InformantAdrsStateName);
  const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.BirthPlace?.InformantAdrsDistrict);
  const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.BirthPlace?.InformantAdrsLBTypeName);
  const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.BirthPlace?.InformantAdrsLBName);
  const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.BirthPlace?.InformantAdrsTaluk);
  const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.BirthPlace?.InformantAdrsPostOffice);
  const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.BirthPlace?.InformantAdrsPincode);
  const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.BirthPlace?.InformantAdrsHouseNameEn);
  // const [InformantAdrsBuldingNo, setInformantAdrsBuldingNo] = useState(formData?.BirthPlace?.InformantAdrsBuldingNo);
  const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.BirthPlace?.InformantAdrsResNo);
  const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.BirthPlace?.InformantAdrsDoorNo);
  const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.BirthPlace?.InformantAdrsMainPlaceEn);
  const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.BirthPlace?.InformantAdrsLocalityNameEn);
  const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.BirthPlace?.InformantAdrsStreetNameEn);
  const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.BirthPlace?.InformantAdrsVillage);
  // const [InfntWardNo, setInfntWardNo] = useState(formData.BirthPlace?.InfntWardNo);


  // const [lbsss, setssLbs] = useState(0);
  // const [VehicleInfmntAdrsCountry, setVehicleInfmntAdrsCountry] = useState(formData?.BirthPlace?.VehicleInfmntAdrsCountry);
  // const [VehicleInfmntAdrsStateName, setVehicleInfmntAdrsStateName] = useState(formData?.BirthPlace?.VehicleInfmntAdrsStateName);
  // const [VehicleInfmntAdrsDistrict, setVehicleInfmntAdrsDistrict] = useState(formData?.BirthPlace?.VehicleInfmntAdrsDistrict);
  // const [VehicleInfmntAdrsLBTypeName, setVehicleInfmntAdrsLBTypeName] = useState(formData?.BirthPlace?.VehicleInfmntAdrsLBTypeName);
  // const [VehicleInfmntAdrsLBName, setVehicleInfmntAdrsLBName] = useState(formData?.BirthPlace?.VehicleInfmntAdrsLBName);
  // const [VehicleInfmntAdrsTaluk, setVehicleInfmntAdrsTaluk] = useState(formData?.BirthPlace?.VehicleInfmntAdrsTaluk);
  // const [VehicleInfmntAdrsPostOffice, setVehicleInfmntAdrsPostOffice] = useState(formData?.BirthPlace?.VehicleInfmntAdrsPostOffice);
  // const [VehicleInfmntAdrsPincode, setVehicleInfmntAdrsPincode] = useState(formData?.BirthPlace?.VehicleInfmntAdrsPincode);
  // const [VehicleInfmntAdrsHouseNameEn, setVehicleInfmntAdrsHouseNameEn] = useState(formData?.BirthPlace?.VehicleInfmntAdrsHouseNameEn);  
  // // const [VehicleInfmntAdrsBuldingNo, setVehicleInfmntAdrsBuldingNo] = useState(formData?.BirthPlace?.VehicleInfmntAdrsBuldingNo);
  // const [VehicleInfmntAdrsResNo, setVehicleInfmntAdrsResNo] = useState(formData?.BirthPlace?.VehicleInfmntAdrsResNo);  
  // const [VehicleInfmntAdrsDoorNo, setVehicleInfmntAdrsDoorNo] = useState(formData?.BirthPlace?.VehicleInfmntAdrsDoorNo);
  // const [VehicleInfmntAdrsMainPlaceEn, setVehicleInfmntAdrsMainPlaceEn] = useState(formData?.BirthPlace?.VehicleInfmntAdrsMainPlaceEn); 
  // const [VehicleInfmntAdrsLocalityNameEn, setVehicleInfmntAdrsLocalityNameEn] = useState(formData?.BirthPlace?.VehicleInfmntAdrsLocalityNameEn);  
  // const [VehicleInfmntAdrsStreetNameEn, setVehicleInfmntAdrsStreetNameEn] = useState(formData?.BirthPlace?.VehicleInfmntAdrsStreetNameEn); 
  // const [VehicleInfmntAdrsVillage, setVehicleInfmntAdrsVillage] = useState(formData?.BirthPlace?.VehicleInfmntAdrsVillage);
  // // const [InfntWardNo, setInfntWardNo] = useState(formData.BirthPlace?.InfntWardNo);


  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  let menu = [];
  let naturetype = null;
  Menu &&
    Menu["death-services"] &&
    Menu["death-services"].PlaceMaster.map((ob) => {
      menu.push(ob);
    });
  const onSkip = () => onSelect();

  function setselectBirthPlace(value) {
    selectBirthPlace(value);
    setValue(value.code);
  }
  // function setSelectBirthPlaceDeccription(e) {
  //   setBirthPlaceDeccription(e.target.value);
  // }
  
  React.useEffect(() => {
    if (isInitialRender) {
      if (BirthPlace) {
        setIsInitialRender(false);
        naturetype = BirthPlace.code;
        setValue(naturetype);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "HOSPITAL") {
          <HospitalDetails
            HospitalName={HospitalName}
            SignedOfficerName={SignedOfficerName}
            SignedOfficerDesignation={SignedOfficerDesignation}
            SignedOfficerAadharNo={SignedOfficerAadharNo}
            SignedOfficerMobileNo={SignedOfficerMobileNo}
          />
        }
        if (naturetype === "INSTITUTION") {
          <InstitutionDetails
            setInstitution={setInstitution}
            setInstitutionId={setInstitutionId}
            SiginedOfficer={SiginedOfficer}
            SiginedOfficerDesignation={SiginedOfficerDesignation}
            InstitutionMobilNo={InstitutionMobilNo}
            InstitutionAadhaar={InstitutionAadhaar}
          />
        }
        if (naturetype === "VEHICLE") {
          <BirthVehicle
            VehicleRegistrationNo={VehicleRegistrationNo}
            VehicleFromEn={VehicleFromEn}
            VehicleToEn={VehicleToEn}
            VehicleFromMl={VehicleFromMl}
            VehicleHaltPlace={VehicleHaltPlace}
            VehicleToMl={VehicleToMl}
            VehicleOtherDetailsEn={VehicleOtherDetailsEn}
            VehicleOtherDetailsMl={VehicleOtherDetailsMl}
            setAdmittedHospitalEn={setAdmittedHospitalEn}
            setAdmittedHospitalMl={setAdmittedHospitalMl}
          />
        }
        // if (naturetype === "VEHICLE") {
        //   <VehicleInformtAddress
        //   VehicleInfmntAdrsCountry={VehicleInfmntAdrsCountry}
        //   VehicleInfmntAdrsStateName={VehicleInfmntAdrsStateName}
        //   VehicleInfmntAdrsDistrict={VehicleInfmntAdrsDistrict}
        //   VehicleInfmntAdrsLBTypeName={VehicleInfmntAdrsLBTypeName}
        //   VehicleInfmntAdrsLBName={VehicleInfmntAdrsLBName}
        //   VehicleInfmntAdrsTaluk={VehicleInfmntAdrsTaluk}
        //   VehicleInfmntAdrsPostOffice={VehicleInfmntAdrsPostOffice}
        //   VehicleInfmntAdrsPincode={VehicleInfmntAdrsPincode}
        //   VehicleInfmntAdrsHouseNameEn={VehicleInfmntAdrsHouseNameEn}
        //   // VehicleInfmntAdrsBuldingNo={VehicleInfmntAdrsBuldingNo}
        //   VehicleInfmntAdrsResNo={VehicleInfmntAdrsResNo}             
        //   VehicleInfmntAdrsDoorNo={VehicleInfmntAdrsDoorNo}
        //   VehicleInfmntAdrsMainPlaceEn={VehicleInfmntAdrsMainPlaceEn}
        //   VehicleInfmntAdrsLocalityNameEn={VehicleInfmntAdrsLocalityNameEn}
        //   VehicleInfmntAdrsStreetNameEn={VehicleInfmntAdrsStreetNameEn}
        //   VehicleInfmntAdrsVillage={VehicleInfmntAdrsVillage} 
        //   />
        // }

        if (naturetype === "PUBLIC_PLACES") {
          <PublicPlace
            setPublicPlaceType={setPublicPlaceType}
            AdrsInfontName={AdrsInfontName}
            AdrsPublicPlace={AdrsPublicPlace}
            PublicPlaceDesption={PublicPlaceDesption}
          />
        }

        if (naturetype === "HOME") {
          <PlaceofBirthHome
            AdrsCountry={AdrsCountry}
            AdrsStateName={AdrsStateName}
            AdrsDistrict={AdrsDistrict}
            AdrsLBTypeName={AdrsLBTypeName}
            AdrsLBName={AdrsLBName}
            AdrsTaluk={AdrsTaluk}
            AdrsPostOffice={AdrsPostOffice}
            AdrsPincode={AdrsPincode}
            AdrsHouseNameEn={AdrsHouseNameEn}
            // AdrsBuldingNo={AdrsBuldingNo}
            AdrsResNoEn={AdrsResNoEn}
            AdrsResNoMl={AdrsResNoMl}
            AdrsInfomntName={AdrsInfomntName}
            AdrsDoorNo={AdrsDoorNo}
            AdrsMainPlaceEn={AdrsMainPlaceEn}
            AdrsLocalityNameEn={AdrsLocalityNameEn}
            AdrsStreetNameEn={AdrsStreetNameEn}
            AdrsVillage={AdrsVillage}
            AdrsMainPlaceMl={AdrsMainPlaceMl}
            AdrsLocalityNameMl={AdrsLocalityNameMl}
            AdrsStreetNameMl={AdrsStreetNameMl}
            AdrsHouseNameMl={AdrsHouseNameMl}
          />

        }
        if (naturetype === "HOME  || VEHICLE") {
          <InformantDetails
            InfomantFirstNameEn={InfomantFirstNameEn}
            InfomantAadhar={InfomantAadhar}
            InfomantEmail={InfomantEmail}
            InfomantMobile={InfomantMobile}
          />

        }

        if (naturetype === "HOME || VEHICLE") {
          <InformantAddress
            InformantAdrsCountry={InformantAdrsCountry}
            InformantAdrsStateName={InformantAdrsStateName}
            InformantAdrsDistrict={InformantAdrsDistrict}
            InformantAdrsLBTypeName={InformantAdrsLBTypeName}
            InformantAdrsLBName={InformantAdrsLBName}
            InformantAdrsTaluk={InformantAdrsTaluk}
            InformantAdrsPostOffice={InformantAdrsPostOffice}
            InformantAdrsPincode={InformantAdrsPincode}
            InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
            // InformantAdrsBuldingNo={InformantAdrsBuldingNo}
            InformantAdrsResNo={InformantAdrsResNo}
            InformantAdrsDoorNo={InformantAdrsDoorNo}
            InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
            InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
            InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
            InformantAdrsVillage={InformantAdrsVillage}
          />

        }

      }
    }
  }, [isInitialRender]);

  let validFlag = true;  
  const goNext = () => {
    console.log(HospitalError);
    if (BirthPlace.code === "HOSPITAL") {
      // console.log(naturetype);
      if (HospitalName == null) {
        // 'BIRTH_ERROR_HOSPITAL_CHOOSE';
        setHospitalError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setHospitalError(false);
      }

      if (SignedOfficerName == null) {
        setSignedOfficerError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setSignedOfficerError(false);
      }
      if (SiginedOfficerDesignation == null) {
        setSignedOfficerDesgError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setSignedOfficerDesgError(false);
      }
      if (SignedOfficerMobileNo == null) {
        setMobileError(true);
        validFlag = false;
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setMobileError(false);
      }
    }
    if (validFlag === true) {
      sessionStorage.setItem("BirthPlace", BirthPlace.code);
      sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.hospitalName : null);
      sessionStorage.setItem("SignedOfficerName", SignedOfficerName ? SignedOfficerName.hospitalName : null);
      sessionStorage.setItem("SignedOfficerDesignation", SignedOfficerDesignation ? SignedOfficerDesignation.hospitalName : null);
      sessionStorage.setItem("SignedOfficerAadharNo", SignedOfficerAadharNo ? SignedOfficerAadharNo.SignedOfficerAadharNo : null);
      sessionStorage.setItem("SignedOfficerMobileNo", SignedOfficerMobileNo ? SignedOfficerMobileNo.SignedOfficerMobileNo : null);
      //sessionStorage.setItem("BirthPlaceDescription", BirthPlaceDescription);


      sessionStorage.setItem("setInstitution", setInstitution ? setInstitution.setInstitution : null);
      sessionStorage.setItem("setInstitutionId", setInstitutionId ? setInstitutionId.setInstitutionId : null);
      sessionStorage.setItem("setSiginedOfficer", SiginedOfficer ? SiginedOfficer.SiginedOfficer : null);
      sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation ? SiginedOfficerDesignation.SiginedOfficerDesignation : null);
      sessionStorage.setItem("setInstitutionMobilNo", InstitutionMobilNo ? InstitutionMobilNo.InstitutionMobilNo : null);
      sessionStorage.setItem("setInstitutionAadhaar", InstitutionAadhaar ? InstitutionAadhaar.InstitutionAadhaar : null);

      sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null);
      sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn : null);
      sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
      sessionStorage.setItem("VehicleFromMl", VehicleFromMl ? VehicleFromMl : null);
      sessionStorage.setItem("VehicleHaltPlace", VehicleHaltPlace ? VehicleHaltPlace : null);
      sessionStorage.setItem("VehicleToMl", VehicleToMl ? VehicleToMl : null);
      // sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard ? setDeathVehicleWard.code : null);
      sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn ? setAdmittedHospitalEn.hospitalName : null);
      sessionStorage.setItem("setAdmittedHospitalMl", setAdmittedHospitalMl ? setAdmittedHospitalMl.hospitalName : null);
      sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null);
      sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null);
      // sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.hospitalName : null);


      // sessionStorage.setItem("DriverName", DriverName ? DriverName : null);
      // sessionStorage.setItem("DriverMobileNo", DriverMobileNo ? DriverMobileNo : null);
      // sessionStorage.setItem("DriverAadhar", DriverAadhar ? DriverAadhar : null);
      // sessionStorage.setItem("VehicleType", VehicleType ? VehicleType : null);
      // sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null);
      // sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn : null);
      // sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
      // sessionStorage.setItem("VehiclePlaceFirstHalt", VehiclePlaceFirstHalt ? VehiclePlaceFirstHalt : null);


      sessionStorage.setItem("setPublicPlaceType", setPublicPlaceType ? setPublicPlaceType.code : null);
      sessionStorage.setItem("AdrsInfontName", AdrsInfontName ? AdrsInfontName : null);
      sessionStorage.setItem("AdrsPublicPlace", AdrsPublicPlace ? AdrsPublicPlace : null);
      sessionStorage.setItem("PublicPlaceDesption", PublicPlaceDesption ? PublicPlaceDesption : null);


      sessionStorage.setItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
      sessionStorage.setItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
      sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
      // sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo ? AdrsBuldingNo : null);
      sessionStorage.setItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
      sessionStorage.setItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
      sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
      sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
      sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
      sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
      sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
      sessionStorage.setItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
      sessionStorage.setItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
      sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
      sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
      sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
      sessionStorage.setItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
      sessionStorage.setItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
      sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
      sessionStorage.setItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
      sessionStorage.setItem("AdrsInfomntName", AdrsInfomntName ? AdrsInfomntName : null);
      sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

      sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);
      sessionStorage.setItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null);
      sessionStorage.setItem("InfomantEmail", InfomantEmail ? InfomantEmail : null);
      sessionStorage.setItem("InfomantMobile", InfomantMobile ? InfomantMobile : null);


      sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
      sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
      sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
      // sessionStorage.setItem("InformantAdrsBuldingNo", InformantAdrsBuldingNo ? InformantAdrsBuldingNo : null);
      sessionStorage.setItem("InformantAdrsResNo", InformantAdrsResNo ? InformantAdrsResNo : null);
      sessionStorage.setItem("InformantAdrsDoorNo", InformantAdrsDoorNo ? InformantAdrsDoorNo : null);
      sessionStorage.setItem("InformantAdrsHouseNameEn", InformantAdrsHouseNameEn ? InformantAdrsHouseNameEn : null);
      sessionStorage.setItem("InformantAdrsMainPlaceEn", InformantAdrsMainPlaceEn ? InformantAdrsMainPlaceEn : null);
      sessionStorage.setItem("InformantAdrsLocalityNameEn", InformantAdrsLocalityNameEn ? InformantAdrsLocalityNameEn : null);
      sessionStorage.setItem("InformantAdrsStreetNameEn", InformantAdrsStreetNameEn ? InformantAdrsStreetNameEn : null);
      sessionStorage.setItem("InformantAdrsVillage", InformantAdrsVillage ? InformantAdrsVillage.code : null);
      sessionStorage.setItem("InformantAdrsLBName", InformantAdrsLBName ? InformantAdrsLBName.code : null);
      sessionStorage.setItem("InformantAdrsDistrict", InformantAdrsDistrict ? InformantAdrsDistrict.code : null);
      sessionStorage.setItem("InformantAdrsTaluk", InformantAdrsTaluk ? InformantAdrsTaluk.code : null);
      sessionStorage.setItem("InformantAdrsPostOffice", InformantAdrsPostOffice ? InformantAdrsPostOffice.code : null);
      sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPincode.code : null);
      // sessionStorage.setItem(" InfntWardNo",  InfntWardNo ? InfntWardNo :null);

      // sessionStorage.setItem("VehicleInfmntAdrsCountry", VehicleInfmntAdrsCountry ? VehicleInfmntAdrsCountry.code : null );
      // sessionStorage.setItem("VehicleInfmntAdrsStateName", VehicleInfmntAdrsStateName ? VehicleInfmntAdrsStateName.code: null);
      // sessionStorage.setItem("VehicleInfmntAdrsLBTypeName", VehicleInfmntAdrsLBTypeName ? VehicleInfmntAdrsLBTypeName.code : null);
      // // sessionStorage.setItem("VehicleInfmntAdrsBuldingNo", VehicleInfmntAdrsBuldingNo ? VehicleInfmntAdrsBuldingNo : null);
      // sessionStorage.setItem("VehicleInfmntAdrsResNo", VehicleInfmntAdrsResNo ? VehicleInfmntAdrsResNo : null);
      // sessionStorage.setItem("VehicleInfmntAdrsDoorNo", VehicleInfmntAdrsDoorNo ? VehicleInfmntAdrsDoorNo :null );
      // sessionStorage.setItem("VehicleInfmntAdrsHouseNameEn", VehicleInfmntAdrsHouseNameEn ? VehicleInfmntAdrsHouseNameEn : null);   
      // sessionStorage.setItem("VehicleInfmntAdrsMainPlaceEn", VehicleInfmntAdrsMainPlaceEn ? VehicleInfmntAdrsMainPlaceEn : null);    
      // sessionStorage.setItem("VehicleInfmntAdrsLocalityNameEn", VehicleInfmntAdrsLocalityNameEn ? VehicleInfmntAdrsLocalityNameEn : null);    
      // sessionStorage.setItem("VehicleInfmntAdrsStreetNameEn", VehicleInfmntAdrsStreetNameEn ? VehicleInfmntAdrsStreetNameEn : null );   
      // sessionStorage.setItem("VehicleInfmntAdrsVillage", VehicleInfmntAdrsVillage ? VehicleInfmntAdrsVillage.code : null);
      // sessionStorage.setItem("VehicleInfmntAdrsLBName", VehicleInfmntAdrsLBName ? VehicleInfmntAdrsLBName.code : null);
      // sessionStorage.setItem("VehicleInfmntAdrsDistrict", VehicleInfmntAdrsDistrict ? VehicleInfmntAdrsDistrict.code : null);
      // sessionStorage.setItem("VehicleInfmntAdrsTaluk", VehicleInfmntAdrsTaluk ? VehicleInfmntAdrsTaluk.code : null);
      // sessionStorage.setItem("VehicleInfmntAdrsPostOffice", VehicleInfmntAdrsPostOffice ? VehicleInfmntAdrsPostOffice.code :null);
      // sessionStorage.setItem("VehicleInfmntAdrsPincode", VehicleInfmntAdrsPincode ? VehicleInfmntAdrsPincode.code :null);   
      // // sessionStorage.setItem(" InfntWardNo",  InfntWardNo ? InfntWardNo :null);



      onSelect(config.key, {
        BirthPlace, HospitalName, SignedOfficerName, SignedOfficerDesignation, SignedOfficerAadharNo, SignedOfficerMobileNo,
        setInstitution, setInstitutionId, SiginedOfficer, SiginedOfficerDesignation, InstitutionMobilNo, InstitutionAadhaar, setPublicPlaceType,
        AdrsInfontName, AdrsPublicPlace, PublicPlaceDesption, AdrsCountry, AdrsStateName, AdrsLBTypeName, AdrsResNoEn, AdrsDoorNo, AdrsHouseNameEn,
        AdrsMainPlaceEn, AdrsLocalityNameEn, AdrsStreetNameEn, AdrsVillage, AdrsLBName, AdrsDistrict, AdrsTaluk, AdrsPostOffice, AdrsPincode, AdrsInfomntName, AdrsMainPlaceMl,
        AdrsLocalityNameMl, AdrsStreetNameMl, AdrsResNoMl, InfomantFirstNameEn, InfomantAadhar, InfomantEmail, InfomantMobile, InformantAdrsCountry, InformantAdrsStateName, InformantAdrsLBTypeName,
        InformantAdrsResNo, InformantAdrsDoorNo, InformantAdrsHouseNameEn, InformantAdrsMainPlaceEn, InformantAdrsLocalityNameEn, InformantAdrsStreetNameEn,
        InformantAdrsVillage, InformantAdrsLBName, InformantAdrsDistrict, InformantAdrsTaluk, InformantAdrsPostOffice, InformantAdrsPincode, VehicleRegistrationNo,
        VehicleFromEn, VehicleToEn, VehicleFromMl, VehicleToMl, VehicleHaltPlace, setAdmittedHospitalEn, setAdmittedHospitalMl, VehicleOtherDetailsEn,
        VehicleOtherDetailsMl,
      });
    }
  }
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton >{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BirthPlace}>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BIRTH_PLACE")}`}</span> </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" >
            <div className="col-md-6" >
              <CardLabel>{t("CR_BIRTH_PLACE")}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="code" isMandatory={false} option={menu} selected={BirthPlace} select={setselectBirthPlace} disabled={isEdit} placeholder={`${t("CR_BIRTH_PLACE")}`} />
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6 " >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthPlaceDescription" value={BirthPlaceDescription} onChange={setSelectBirthPlaceDeccription} disable={isEdit} placeholder={`${t("CR_DESCRIPTION")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })} />
          </div>
        </div> */}
        {value === "HOSPITAL" && (
          <div>
            <HospitalDetails
              selectHospitalName={selectHospitalName} HospitalName={HospitalName} 
              selectSignedOfficerName={selectSignedOfficerName} SignedOfficerName={SignedOfficerName} 
              selectSignedOfficerDesignation={selectSignedOfficerDesignation} SignedOfficerDesignation={SignedOfficerDesignation} 
              setSignedOfficerAadharNo={setSignedOfficerAadharNo} SignedOfficerAadharNo={SignedOfficerAadharNo}
              setSignedOfficerMobileNo={setSignedOfficerMobileNo} SignedOfficerMobileNo={SignedOfficerMobileNo}


            />
          </div>)
        }
        {value === "INSTITUTION" && (
          <div>
            <InstitutionDetails
              setSelectedInstitution={setSelectedInstitution} setInstitution={setInstitution}
              setSelectedInstitutionId={setSelectedInstitutionId} setInstitutionId={setInstitutionId}
              setSiginedOfficer={setSiginedOfficer} SiginedOfficer={SiginedOfficer}
              setSiginedOfficerDesignation={setSiginedOfficerDesignation} SiginedOfficerDesignation={SiginedOfficerDesignation}
              setInstitutionMobilNo={setInstitutionMobilNo} InstitutionMobilNo={InstitutionMobilNo}
              setInstitutionAadhaar={setInstitutionAadhaar} InstitutionAadhaar={InstitutionAadhaar}

            />
          </div>
        )
        }
        {value === "VEHICLE" && (
          <div>
            <BirthVehicle
              VehicleRegistrationNo={VehicleRegistrationNo} setVehicleRegistrationNo={setVehicleRegistrationNo}
              VehicleFromEn={VehicleFromEn} setVehicleToEn={setVehicleToEn}
              VehicleToEn={VehicleToEn} setVehicleFromEn={setVehicleFromEn}
              VehicleFromMl={VehicleFromMl} setVehicleFromMl={setVehicleFromMl}
              VehicleToMl={VehicleToMl} setVehicleToMl={setVehicleToMl}
              VehicleHaltPlace={VehicleHaltPlace} setVehicleHaltPlace={setVehicleHaltPlace}
              VehicleOtherDetailsEn={VehicleOtherDetailsEn} setVehicleOtherDetailsEn={setVehicleOtherDetailsEn}
              VehicleOtherDetailsMl={VehicleOtherDetailsMl} setVehicleOtherDetailsMl={setVehicleOtherDetailsMl}
              setAdmittedHospitalEn={setAdmittedHospitalEn} setSelectedAdmittedHospitalEn={setSelectedAdmittedHospitalEn}
              setAdmittedHospitalMl={setAdmittedHospitalMl} setSelectedAdmittedHospitalMl={setSelectedAdmittedHospitalMl}
            />
            <InformantDetails
              setInfomantFirstNameEn={setInfomantFirstNameEn} InfomantFirstNameEn={InfomantFirstNameEn}
              setInfomantAadhar={setInfomantAadhar} InfomantAadhar={InfomantAadhar}
              setInfomantEmail={setInfomantEmail} InfomantEmail={InfomantEmail}
              setInfomantMobile={setInfomantMobile} InfomantMobile={InfomantMobile}
            />

            <InformantAddress
              setInformantAdrsCountry={setInformantAdrsCountry} InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsStateName={setInformantAdrsStateName} InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsDistrict={setInformantAdrsDistrict} InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName} InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBName={setInformantAdrsLBName} InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsTaluk={setInformantAdrsTaluk} InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice} InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPincode={setInformantAdrsPincode} InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn} InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              // setInformantAdrsBuldingNo={setInformantAdrsBuldingNo} InformantAdrsBuldingNo={InformantAdrsBuldingNo}
              setInformantAdrsResNo={setInformantAdrsResNo} InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo} InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn} InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn} InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn} InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsVillage={setInformantAdrsVillage} InformantAdrsVillage={InformantAdrsVillage}
            // setInfntWardNo={setInfntWardNo} InfntWardNo={InfntWardNo}
            />
          </div>
        )
        }
        {value === "PUBLIC_PLACES" && (
          <div>
            <PublicPlace
              setSelectedPublicPlaceType={setSelectedPublicPlaceType} setPublicPlaceType={setPublicPlaceType}
              setAdrsInfontName={setAdrsInfontName} AdrsInfontName={AdrsInfontName}
              setAdrsPublicPlace={setAdrsPublicPlace} AdrsPublicPlace={AdrsPublicPlace}
              setPublicPlaceDesption={setPublicPlaceDesption} PublicPlaceDesption={PublicPlaceDesption}
            />
          </div>
        )
        }
        {value === "HOME" && (
          <div>
            <PlaceofBirthHome
              setAdrsCountry={setAdrsCountry} AdrsCountry={AdrsCountry}
              setAdrsStateName={setAdrsStateName} AdrsStateName={AdrsStateName}
              setAdrsDistrict={setAdrsDistrict} AdrsDistrict={AdrsDistrict}
              setAdrsLBTypeName={setAdrsLBTypeName} AdrsLBTypeName={AdrsLBTypeName}
              setAdrsLBName={setAdrsLBName} AdrsLBName={AdrsLBName}
              setAdrsTaluk={setAdrsTaluk} AdrsTaluk={AdrsTaluk}
              setAdrsPostOffice={setAdrsPostOffice} AdrsPostOffice={AdrsPostOffice}
              setAdrsPincode={setAdrsPincode} AdrsPincode={AdrsPincode}
              setAdrsHouseNameEn={setAdrsHouseNameEn} AdrsHouseNameEn={AdrsHouseNameEn}
              // setAdrsBuldingNo={setAdrsBuldingNo} AdrsBuldingNo={AdrsBuldingNo}
              setAdrsResNoEn={setAdrsResNoEn} AdrsResNoEn={AdrsResNoEn}
              setAdrsResNoMl={setAdrsResNoMl} AdrsResNoMl={AdrsResNoMl}
              setAdrsInfomntName={setAdrsInfomntName} AdrsInfomntName={AdrsInfomntName}
              setAdrsDoorNo={setAdrsDoorNo} AdrsDoorNo={AdrsDoorNo}
              setAdrsMainPlaceEn={setAdrsMainPlaceEn} AdrsMainPlaceEn={AdrsMainPlaceEn}
              setAdrsLocalityNameEn={setAdrsLocalityNameEn} AdrsLocalityNameEn={AdrsLocalityNameEn}
              setAdrsStreetNameEn={setAdrsStreetNameEn} AdrsStreetNameEn={AdrsStreetNameEn}
              setAdrsVillage={setAdrsVillage} AdrsVillage={AdrsVillage}
              setAdrsMainPlaceMl={setAdrsMainPlaceMl} AdrsMainPlaceMl={AdrsMainPlaceMl}
              setAdrsLocalityNameMl={setAdrsLocalityNameMl} AdrsLocalityNameMl={AdrsLocalityNameMl}
              setAdrsStreetNameMl={setAdrsStreetNameMl} AdrsStreetNameMl={AdrsStreetNameMl}
              setAdrsHouseNameMl={setAdrsHouseNameMl} AdrsHouseNameMl={AdrsHouseNameMl}
            />
            <InformantDetails
              setInfomantFirstNameEn={setInfomantFirstNameEn} InfomantFirstNameEn={InfomantFirstNameEn}
              setInfomantAadhar={setInfomantAadhar} InfomantAadhar={InfomantAadhar}
              setInfomantEmail={setInfomantEmail} InfomantEmail={InfomantEmail}
              setInfomantMobile={setInfomantMobile} InfomantMobile={InfomantMobile}
            />
            <InformantAddress
              setInformantAdrsCountry={setInformantAdrsCountry} InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsStateName={setInformantAdrsStateName} InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsDistrict={setInformantAdrsDistrict} InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName} InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBName={setInformantAdrsLBName} InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsTaluk={setInformantAdrsTaluk} InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice} InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPincode={setInformantAdrsPincode} InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn} InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              // setInformantAdrsBuldingNo={setInformantAdrsBuldingNo} InformantAdrsBuldingNo={InformantAdrsBuldingNo}
              setInformantAdrsResNo={setInformantAdrsResNo} InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo} InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn} InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn} InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn} InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsVillage={setInformantAdrsVillage} InformantAdrsVillage={InformantAdrsVillage}
            // setInfntWardNo={setInfntWardNo} InfntWardNo={InfntWardNo}
            />

          </div>
        )
        }

        {/* {value === "HOME" && (
          <div>
            <PlaceofBirthHome />
          </div>)
        } */}
        {/* {value === "VEHICLE" && (
          <div>
            <BirthVehicle />
          </div>)
        } */}
        {/* {value === "PUBLIC_PLACES" && (
          <div>
            <PublicPlace />
          </div>)
        } */}
        {toast && (
          <Toast
            error={HospitalError || signedOfficerError || signedOfficerDesgError || mobileError }
            // !commentError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`)
            label={
              // (!HospitalError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`) : t(`BIRTH_ERROR_HOSPITAL_CHOOSE`)) ||
              // (!signedOfficerError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`) : t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`))

              (HospitalError || signedOfficerError || signedOfficerDesgError || mobileError ? 
                (HospitalError ? t(`BIRTH_ERROR_HOSPITAL_CHOOSE`) : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`)
                  : setToast(false)
                ) : setToast(false)
              )
            }

            onClose={() => setToast(false)}
          />)
        }{""}

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlace;