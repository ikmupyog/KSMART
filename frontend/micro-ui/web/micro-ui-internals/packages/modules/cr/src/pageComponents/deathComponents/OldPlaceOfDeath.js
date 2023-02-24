import React, { useState, useEffect  } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import PlaceOfDeathHospital from "../../pageComponents/deathComponents/PlaceOfDeathHospital";
import PlaceOfDeathInstitution from "../../pageComponents/deathComponents/PlaceOfDeathInstitution";
import PlaceOfDeathHome from "../../pageComponents/deathComponents/PlaceOfDeathHome";
import PlaceOfDeathVehicle from "../../pageComponents/deathComponents/PlaceOfDeathVehicle";
import PlaceOfDeathOther from "../../pageComponents/deathComponents/PlaceOfDeathOther";
import InformentAddress from "../../pageComponents/deathComponents/InformentAddress";
import Address from "../../pageComponents/deathComponents/Address";

// import InformantAddress from "../birthComponents/InformantAddress";
// import PlaceOfDeathOther from "../../pageComponents/deathComponents/PlaceOfDeathOther";

const PlaceOfDeath = ({ config, onSelect, userType, formData }) => {
  // console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
  const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
 
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMaster");
  // const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  // const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "death-services", "PlaceMaster");
  const [PlaceOfDeath, selectPlaceOfDeath] = useState(formData?.PlaceOfDeath?.PlaceOfDeath);
  const [value, setValue] = useState();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // Death Place Hospital
  const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.PlaceOfDeath?.SignedOfficerName ? formData?.PlaceOfDeath?.SignedOfficerName : null);
  const [HospitalName, selectHospitalName] = useState(formData?.PlaceOfDeath?.HospitalName ? formData?.PlaceOfDeath?.HospitalName : null);
  const [setDesignation, setSelectedDesignation] = useState(formData?.PlaceOfDeath?.setDesignation ? formData?.PlaceOfDeath?.setDesignation : null);
  const [HospitalAadhaar, setHospitalAadhaar] = useState(formData?.PlaceOfDeath?.HospitalAadhaar ?. formData?.PlaceOfDeath?.HospitalAadhaar );
  const [HospitalMobile, setHospitalMobile] = useState(formData?.PlaceOfDeath?.HospitalMobile ?. formData?.PlaceOfDeath?.HospitalMobile );
  const [OfficerName, setOfficerName] = useState(formData?.PlaceOfDeath?.OfficerName ? formData?.PlaceOfDeath?.OfficerName : "");
  const [OfficerDesignation, setOfficerDesignation] = useState(formData?.PlaceOfDeath?.OfficerDesignation ? formData?.PlaceOfDeath?.OfficerDesignation : "");
  const [SignedOfficerOtherStatus, setSignedOfficerOtherStatus] = useState(formData?.PlaceOfDeath?.SignedOfficerOtherStatus ? formData?.PlaceOfDeath?.SignedOfficerOtherStatus : "");

  //DeathPlace Home
  const [AdrsCountry, setAdrsCountry] = useState(formData?.PlaceOfDeath?.AdrsCountry ? formData?.PlaceOfDeath?.AdrsCountry : null);
  const [AdrsStateName, setAdrsStateName] = useState(formData?.PlaceOfDeath?.AdrsStateName ? formData?.PlaceOfDeath?.AdrsStateName : null);
  const [AdrsDistrict, setAdrsDistrict] = useState(formData?.PlaceOfDeath?.AdrsDistrict ? formData?.PlaceOfDeath?.AdrsDistrict : null);
  const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.PlaceOfDeath?.AdrsLBTypeName ? formData?.PlaceOfDeath?.AdrsLBTypeName : null);
  const [AdrsLBName, setAdrsLBName] = useState(formData?.PlaceOfDeath?.AdrsLBName ? formData?.PlaceOfDeath?.AdrsLBName : null);
  const [AdrsTaluk, setAdrsTaluk] = useState(formData?.PlaceOfDeath?.AdrsTaluk ? formData?.PlaceOfDeath?.AdrsTaluk : null);
  const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.PlaceOfDeath?.AdrsPostOffice ? formData?.PlaceOfDeath?.AdrsPostOffice : null);
  const [AdrsPincode, setAdrsPincode] = useState(formData?.PlaceOfDeath?.AdrsPincode ?. formData?.PlaceOfDeath?.AdrsPincode );
  const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.PlaceOfDeath?.AdrsHouseNameEn ? formData?.PlaceOfDeath?.AdrsHouseNameEn : "");
  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.PlaceOfDeath?.AdrsHouseNameMl ? formData?.PlaceOfDeath?.AdrsHouseNameMl : "");
  // const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.PlaceOfDeath?.AdrsBuldingNo);
  const [AdrsResNo, setAdrsResNo] = useState(formData?.PlaceOfDeath?.AdrsResNo ? formData?.PlaceOfDeath?.AdrsResNo : "" );
  const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.PlaceOfDeath?.AdrsDoorNo ? formData?.PlaceOfDeath?.AdrsDoorNo : "");
  const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.PlaceOfDeath?.AdrsMainPlaceEn ? formData?.PlaceOfDeath?.AdrsMainPlaceEn : "");
  const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.PlaceOfDeath?.AdrsMainPlaceMl ? formData?.PlaceOfDeath?.AdrsMainPlaceMl : "");
  const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.PlaceOfDeath?.AdrsLocalityNameEn ? formData?.PlaceOfDeath?.AdrsLocalityNameEn : "");
  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.PlaceOfDeath?.AdrsLocalityNameMl ? formData?.PlaceOfDeath?.AdrsLocalityNameMl : "");
  // const [AdrsCityEn, setAdrsCityEn] = useState(formData?.PlaceOfDeath?.AdrsCityNameEn);
  // const [AdrsCityMl, setAdrsCityMl] = useState(formData?.PlaceOfDeath?.AdrsCityMl);
  const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.PlaceOfDeath?.AdrsStreetNameEn ? formData?.PlaceOfDeath?.AdrsStreetNameEn : "");
  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.PlaceOfDeath?.AdrsStreetNameMl ? formData?.PlaceOfDeath?.AdrsStreetNameMl : "");
  const [AdrsVillage, setAdrsVillage] = useState(formData?.PlaceOfDeath?.AdrsVillage ? formData?.PlaceOfDeath?.AdrsVillage :"" );
  //Place Of Death Institution
  const [setInstitution, setSelectedInstitution] = useState(formData?.PlaceOfDeath?.setInstitution ? formData?.PlaceOfDeath?.setInstitution : "");
  const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.PlaceOfDeath?.setInstitutionId ? formData?.PlaceOfDeath?.setInstitutionId : "");
      // const [SiginedOfficer, setSiginedOfficer] = useState(formData?.PlaceOfDeath?.SiginedOfficer ? formData?.PlaceOfDeath?.SiginedOfficer : "");
      // const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.PlaceOfDeath?.SiginedOfficerDesignation ? formData?.PlaceOfDeath?.SiginedOfficerDesignation : "");
  const [SiginedOfficer, setSelectedSiginedOfficer] = useState(formData?.PlaceOfDeath?.SiginedOfficer ? formData?.PlaceOfDeath?.SiginedOfficer : null); 
  const [SiginedOfficerDesignation, setSelectedSiginedOfficerDesignation] = useState(formData?.PlaceOfDeath?.SiginedOfficerDesignation ? formData?.PlaceOfDeath?.SiginedOfficerDesignation : null); 
    
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.PlaceOfDeath?.InstitutionMobilNo ?. formData?.PlaceOfDeath?.InstitutionMobilNo );
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.PlaceOfDeath?.InstitutionAadhaar ?. formData?.PlaceOfDeath?.InstitutionAadhaar);
  //informent details for Home and Vehicle
  const [InformentNameEn, setInformentNameEn] = useState(formData?.PlaceOfDeath?.InformentNameEn ? formData?.PlaceOfDeath?.InformentNameEn : "");
  const [InformentNameMl, setInformentNameMl] = useState(formData?.PlaceOfDeath?.InformentNameMl ? formData?.PlaceOfDeath?.InformentNameMl : "");
  // const [setTitle, setSelectedTitle] = useState(formData?.PlaceOfDeath?.setTitle);
  const [AadhaarNo, setAadhaarNo] = useState(formData?.PlaceOfDeath?.AadhaarNo ?. formData?.PlaceOfDeath?.AadhaarNo);
  // const [setDeclaration, setSelectedDeclaration] = useState(formData?.PlaceOfDeath?.setDeclaration ? formData?.PlaceOfDeath?.setDeclaration : null);
  const [InformentMobileNo, setInformentMobileNo] = useState(formData?.PlaceOfDeath?.InformentMobileNo ?. formData?.PlaceOfDeath?.InformentMobileNo);
  const [InformentEmail, setInformentEmail] = useState(formData?.PlaceOfDeath?.InformentEmail ? formData?.PlaceOfDeath?.InformentEmail :"" );
  const [isNoAadhaar, setIsNoAadhaar] = useState(formData?.PlaceOfDeath?.isNoAadhaar ? formData?.PlaceOfDeath?.isNoAadhaar : false);
  //Place of Death Vehicle
  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.PlaceOfDeath?.VehicleRegistrationNo ? formData?.PlaceOfDeath?.VehicleRegistrationNo : "");
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.PlaceOfDeath?.VehicleFromEn ? formData?.PlaceOfDeath?.VehicleFromEn : "");
  const [VehicleToEn, setVehicleToEn] = useState(formData?.PlaceOfDeath?.VehicleToEn ? formData?.PlaceOfDeath?.VehicleToEn : "");
  const [DriverLicenceNo, setDriverLicenceNo] = useState(formData?.PlaceOfDeath?.DriverLicenceNo ? formData?.PlaceOfDeath?.DriverLicenceNo :"");
  // const [setVehicleHaltPlace, setSelectedVehicleHaltPlace] = useState(formData?.PlaceOfDeath?.VehicleHaltPlace ? formData?.PlaceOfDeath?.VehicleHaltPlace : null);
  const [PlaceOfHalt, setPlaceOfHalt] = useState(formData?.PlaceOfDeath?.PlaceOfHalt ? formData?.PlaceOfDeath?.PlaceOfHalt : "");
  const [VehicleFromMl, setVehicleFromMl] = useState(formData?.PlaceOfDeath?.VehicleFromMl); 
  const [VehicleToMl, setVehicleToMl] = useState(formData?.PlaceOfDeath?.VehicleToMl);
  const [VehicleOtherDetailsEn, setVehicleOtherDetailsEn] = useState(formData?.PlaceOfDeath?.VehicleOtherDetailsEn);
  const [VehicleOtherDetailsMl, setVehicleOtherDetailsMl] = useState(formData?.PlaceOfDeath?.VehicleOtherDetailsMl);
  const [setAdmittedHospitalEn, setSelectedAdmittedHospitalEn] = useState(formData?.PlaceOfDeath?.setAdmittedHospitalEn);
  const [setAdmittedHospitalMl, setSelectedAdmittedHospitalMl] = useState(formData?.PlaceOfDeath?.setAdmittedHospitalMl);
  const [setVehicletype, setSelectedVehicletype] = useState(formData?.PlaceOfDeath?.setVehicletype);
  // Informent Address from Birth Page for Home and Vehicle
  const [InformantAdrsCountry, setInformantAdrsCountry] = useState(formData?.PlaceOfDeath?.InformantAdrsCountry ? formData?.PlaceOfDeath?.InformantAdrsCountry : null);
  const [InformantAdrsStateName, setInformantAdrsStateName] = useState(formData?.PlaceOfDeath?.InformantAdrsStateName ? formData?.PlaceOfDeath?.InformantAdrsStateName : null);
  const [InformantAdrsDistrict, setInformantAdrsDistrict] = useState(formData?.PlaceOfDeath?.InformantAdrsDistrict ? formData?.PlaceOfDeath?.InformantAdrsDistrict :null);
  const [InformantAdrsLBTypeName, setInformantAdrsLBTypeName] = useState(formData?.PlaceOfDeath?.InformantAdrsLBTypeName ? formData?.PlaceOfDeath?.InformantAdrsLBTypeName : null);
  const [InformantAdrsLBName, setInformantAdrsLBName] = useState(formData?.PlaceOfDeath?.InformantAdrsLBName ? formData?.PlaceOfDeath?.InformantAdrsLBName : null);
  const [InformantAdrsTaluk, setInformantAdrsTaluk] = useState(formData?.PlaceOfDeath?.InformantAdrsTaluk ? formData?.PlaceOfDeath?.InformantAdrsTaluk :null);
  const [InformantAdrsPostOffice, setInformantAdrsPostOffice] = useState(formData?.PlaceOfDeath?.InformantAdrsPostOffice ? formData?.PlaceOfDeath?.InformantAdrsPostOffice : null);
  const [InformantAdrsPincode, setInformantAdrsPincode] = useState(formData?.PlaceOfDeath?.InformantAdrsPincode ? formData?.PlaceOfDeath?.InformantAdrsPincode: 0 );
  const [InformantAdrsHouseNameEn, setInformantAdrsHouseNameEn] = useState(formData?.PlaceOfDeath?.InformantAdrsHouseNameEn ? formData?.PlaceOfDeath?.InformantAdrsHouseNameEn : "");
  const [InformantAdrsResNo, setInformantAdrsResNo] = useState(formData?.PlaceOfDeath?.InformantAdrsResNo ? formData?.PlaceOfDeath?.InformantAdrsResNo : "");
  const [InformantAdrsDoorNo, setInformantAdrsDoorNo] = useState(formData?.PlaceOfDeath?.InformantAdrsDoorNo ? formData?.PlaceOfDeath?.InformantAdrsDoorNo : "");
  const [InformantAdrsMainPlaceEn, setInformantAdrsMainPlaceEn] = useState(formData?.PlaceOfDeath?.InformantAdrsMainPlaceEn ? formData?.PlaceOfDeath?.InformantAdrsMainPlaceEn : "");
  const [InformantAdrsLocalityNameEn, setInformantAdrsLocalityNameEn] = useState(formData?.PlaceOfDeath?.InformantAdrsLocalityNameEn ? formData?.PlaceOfDeath?.InformantAdrsLocalityNameEn : "");
  const [InformantAdrsStreetNameEn, setInformantAdrsStreetNameEn] = useState(formData?.PlaceOfDeath?.InformantAdrsStreetNameEn ? formData?.PlaceOfDeath?.InformantAdrsStreetNameEn : "");
  const [InformantAdrsVillage, setInformantAdrsVillage] = useState(formData?.PlaceOfDeath?.InformantAdrsVillage ? formData?.PlaceOfDeath?.InformantAdrsVillage : null);
  
  // const [InfntWardNo, setInfntWardNo] = useState(formData.PlaceOfDeath?.InfntWardNo);
  const [selectedValues, setSelectedValues] = useState(formData ?. PlaceOfDeath?.selectedValues ? formData ?. PlaceOfDeath?.selectedValues : true);
// Place of Death Other
const [setDeathOtherward, setSelectedDeathOtherward] = useState(formData?.PlaceOfDeathOther?.setDeathOtherward);
const [setDeathOtherPlace, setSelectedDeathOtherPlace] = useState(formData?.PlaceOfDeathOther?.setDeathOtherPlace);
const [PlaceOfDeathOtherDetailsEn, setPlaceOfDeathOtherDetailsEn] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsEn);
const [PlaceOfDeathOtherDetailsMl, setPlaceOfDeathOtherDetailsMl] = useState(formData?.PlaceOfDeathOther?.PlaceOfDeathOtherDetailsMl);
 
// const [value, setValue] = useState();
 
  const [isInitialRenderLB, setIsInitialRenderLB] = useState(true);
  // const [LBCombo, setLBCombo] = useState(null);
  const [LBDistrictCombo, setLBDistrictCombo] = useState(null);
  const [value1, setValue1] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  let naturetype = null;
  let cmbPlace = [];
  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMaster.map((ob) => {
      cmbPlace.push(ob);
    });
   
    let cmbLB = [];
    let cmbDistrict = [];
    let cmbCountry = [];
    let cmbState = [];
    let cmbLBType = [];
    let cmbTaluk = [];
    let cmbVillage = [];
    
    localbodies &&
      localbodies["tenant"] &&
      localbodies["tenant"].tenants.map((ob) => {
        cmbLB.push(ob);
      });
    District &&
      District["common-masters"] &&
      District["common-masters"].District.map((ob) => {
        cmbDistrict.push(ob);
      });
    Country &&
      Country["common-masters"] &&
      Country["common-masters"].Country.map((ob) => {
        cmbCountry.push(ob);
      });
    State &&
      State["common-masters"] &&
      State["common-masters"].State.map((ob) => {
        cmbState.push(ob);
      });
    LBType &&
      LBType["common-masters"] &&
      LBType["common-masters"].LBType.map((ob) => {
        cmbLBType.push(ob);
      });
    Taluk &&
      Taluk["common-masters"] &&
      Taluk["common-masters"].Taluk.map((ob) => {
        cmbTaluk.push(ob);
      });
    Village &&
      Village["common-masters"] &&
      Village["common-masters"].Village.map((ob) => {
        cmbVillage.push(ob);
      });
  // console.log(cmbPlace);
  

  const onSkip = () => onSelect();

  function selectPlaceofDeath(value) {
    selectPlaceOfDeath(value);
    setValue(value.code);
  }

  React.useEffect(() => {
    if (isInitialRender) {
      if (PlaceOfDeath) {
        setIsInitialRender(false);
        naturetype = PlaceOfDeath.code;
        setValue(naturetype);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "HOSPITAL") {
          <PlaceOfDeathHospital
            HospitalName={HospitalName}
            SignedOfficerName={SignedOfficerName}
            setDesignation={setDesignation}
            HospitalAadhaar={HospitalAadhaar}
            HospitalMobile={HospitalMobile}
            OfficerName={OfficerName}
            OfficerDesignation={OfficerDesignation}
            SignedOfficerOtherStatus={SignedOfficerOtherStatus}
          />;
        }
        if (naturetype === "HOME") {
          <PlaceOfDeathHome
            AdrsCountry={AdrsCountry}
            AdrsStateName={AdrsStateName}
            AdrsDistrict={AdrsDistrict}
            AdrsLBTypeName={AdrsLBTypeName}
            AdrsLBName={AdrsLBName}
            AdrsTaluk={AdrsTaluk}
            AdrsPostOffice={AdrsPostOffice}
            AdrsPincode={AdrsPincode}
            AdrsHouseNameEn={AdrsHouseNameEn}
            AdrsHouseNameMl={AdrsHouseNameMl}
            // AdrsBuldingNo={AdrsBuldingNo}
            AdrsResNo={AdrsResNo}
            AdrsDoorNo={AdrsDoorNo}
            AdrsMainPlaceEn={AdrsMainPlaceEn}
            AdrsMainPlaceMl={AdrsMainPlaceMl}
            AdrsLocalityNameEn={AdrsLocalityNameEn}
            AdrsLocalityNameMl={AdrsLocalityNameMl}
            // AdrsCityEn={AdrsCityEn}
            // AdrsCityMl={AdrsCityMl}
            AdrsStreetNameEn={AdrsStreetNameEn}
            AdrsStreetNameMl={AdrsStreetNameMl}
            AdrsVillage={AdrsVillage}
          />;
        }
        if (naturetype === "HOME || VEHICLE") {
          <InformentAddress
            InformentNameEn={InformentNameEn}
            InformentNameMl={InformentNameMl}
            // setTitle={setTitle}
            AadhaarNo={AadhaarNo}
            // setDeclaration={setDeclaration}
            InformentMobileNo={InformentMobileNo}
            AdrsVillage={AdrsVillage}
          />;
        }
        if (naturetype === "HOME || VEHICLE") {
          <Address
            InformantAdrsCountry={InformantAdrsCountry}
            InformantAdrsDistrict={InformantAdrsDistrict}
            InformantAdrsLBTypeName={InformantAdrsLBTypeName}
            InformantAdrsLBName={InformantAdrsLBName}
            InformantAdrsTaluk={InformantAdrsTaluk}
            InformantAdrsPostOffice={InformantAdrsPostOffice}
            InformantAdrsPincode={InformantAdrsPincode}
            InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
            InformantAdrsResNo={InformantAdrsResNo}
            // InformantAdrsBuldingNo={InformantAdrsBuldingNo}
            InformantAdrsDoorNo={InformantAdrsDoorNo}
            InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
            InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
            InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
            InformantAdrsVillage={InformantAdrsVillage}
            // InfntWardNo = {InfntWardNo}
          />;
        }
        if (naturetype === "INSTITUTION") {
          <PlaceOfDeathInstitution
            setInstitution={setInstitution}
            setInstitutionId={setInstitutionId}
            SiginedOfficer={SiginedOfficer}
            SiginedOfficerDesignation={SiginedOfficerDesignation}
            InstitutionAadhaar={InstitutionAadhaar}           
            InstitutionMobilNo={InstitutionMobilNo}
            InformentEmail={InformentEmail}
          />;
        }
        if (naturetype === "VEHICLE") {
          <PlaceOfDeathVehicle
            VehicleRegistrationNo={VehicleRegistrationNo}
            VehicleFromEn={VehicleFromEn}
            VehicleToEn={VehicleToEn}
            DriverLicenceNo= {DriverLicenceNo}
            VehicleFromMl={VehicleFromMl}
            // setVehicleHaltPlace={setVehicleHaltPlace}
            PlaceOfHalt ={PlaceOfHalt}
            VehicleToMl={VehicleToMl}
            VehicleOtherDetailsEn={VehicleOtherDetailsEn}
            VehicleOtherDetailsMl={VehicleOtherDetailsMl}
            setAdmittedHospitalEn={setAdmittedHospitalEn}
            setAdmittedHospitalMl={setAdmittedHospitalMl}
            setVehicletype={setVehicletype}
          />;
        }
        if (naturetype === "PUBLIC_PLACES") {
          <PlaceOfDeathOther
          
            setDeathOtherPlace={setDeathOtherPlace}
            PlaceOfDeathOtherDetailsEn={PlaceOfDeathOtherDetailsEn}
            PlaceOfDeathOtherDetailsMl={PlaceOfDeathOtherDetailsMl}
            setDeathOtherward={setDeathOtherward}
            
          />;
        }
      }
    }
  }, [isInitialRender]);
  const goNext = () => {
    // sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.hospitalName : null);

    sessionStorage.setItem("SignedOfficerName", SignedOfficerName ? SignedOfficerName.code : null);
    sessionStorage.setItem("HospitalName", HospitalName ? HospitalName.code : null);
    sessionStorage.setItem("setDesignation", setDesignation ? setDesignation.code : null);
    sessionStorage.setItem("HospitalAadhaar", HospitalAadhaar ? HospitalAadhaar : 0);
    sessionStorage.setItem("HospitalMobile", HospitalMobile ? HospitalMobile : 0);
    sessionStorage.setItem("OfficerName", OfficerName ? OfficerName : null);
    sessionStorage.setItem("OfficerDesignation", OfficerDesignation ? OfficerDesignation : null);
    sessionStorage.setItem("SignedOfficerOtherStatus", SignedOfficerOtherStatus ? SignedOfficerOtherStatus : null);
    //Place of Death Home
    sessionStorage.setItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
    sessionStorage.setItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
    sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
    // sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo ? AdrsBuldingNo : null);
    sessionStorage.setItem("AdrsResNo", AdrsResNo ? AdrsResNo : null);
    sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
    sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
    sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);
    sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
    sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);
    sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
    sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl : null);
    // sessionStorage.setItem("AdrsCityEn", AdrsCityEn ? AdrsCityEn : null);
    // sessionStorage.setItem("AdrsCityMl", AdrsCityMl ? AdrsCityMl : null);
    sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
    sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl : null);
    sessionStorage.setItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
    sessionStorage.setItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
    sessionStorage.setItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
    sessionStorage.setItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
    sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
    sessionStorage.setItem("AdrsPincode", AdrsPincode ? AdrsPincode : null);
    //Place Of DeathInstitution
    sessionStorage.setItem("setInstitution", setInstitution ? setInstitution.code : null);
    sessionStorage.setItem("setInstitutionId", setInstitutionId ? setInstitutionId.code : null);
    sessionStorage.setItem("SiginedOfficer", SiginedOfficer.code);
    sessionStorage.setItem("SiginedOfficerDesignation", SiginedOfficerDesignation.code);
    // sessionStorage.setItem("setSiginedOfficer", SiginedOfficer ? SiginedOfficer : null);
    // sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation ? SiginedOfficerDesignation : null);
    sessionStorage.setItem("InstitutionMobilNo", InstitutionMobilNo ? InstitutionMobilNo: 0);
    sessionStorage.setItem("InstitutionAadhaar", InstitutionAadhaar ? InstitutionAadhaar: 0);
    
    //InformentAddress
    sessionStorage.setItem("InformentNameEn", InformentNameEn ? InformentNameEn : null);
    sessionStorage.setItem("InformentNameMl", InformentNameMl ? InformentNameMl : null);
    // sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    sessionStorage.setItem("isNoAadhaar", isNoAadhaar ? isNoAadhaar : null);
    
    sessionStorage.setItem("AadhaarNo", AadhaarNo ? AadhaarNo : null);
    // sessionStorage.setItem("setDeclaration", setDeclaration ? setDeclaration.code : null);
    sessionStorage.setItem("InformentMobileNo", InformentMobileNo ? InformentMobileNo : null);
    sessionStorage.setItem("InformentEmail", InformentEmail ? InformentEmail : null);
    //PlaceOfDeathVehicle
    sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null);
    sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn : null);
    sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
    sessionStorage.setItem("DriverLicenceNo", DriverLicenceNo ? DriverLicenceNo : null);    
    sessionStorage.setItem("PlaceOfHalt", PlaceOfHalt ? PlaceOfHalt : null);    
    sessionStorage.setItem("VehicleFromMl", VehicleFromMl ? VehicleFromMl : null);
    sessionStorage.setItem("setVehicletype", setVehicletype ? setVehicletype.code : null);
    // sessionStorage.setItem("setVehicleHaltPlace", setVehicleHaltPlace ? setVehicleHaltPlace.code : null);
    sessionStorage.setItem("VehicleToMl", VehicleToMl ? VehicleToMl : null);
    // sessionStorage.setItem("setDeathVehicleWard", setDeathVehicleWard ? setDeathVehicleWard.code : null);
    sessionStorage.setItem("setAdmittedHospitalEn", setAdmittedHospitalEn ? setAdmittedHospitalEn.code : null);
    sessionStorage.setItem("setAdmittedHospitalMl", setAdmittedHospitalMl ? setAdmittedHospitalMl.code : null);
    sessionStorage.setItem("VehicleOtherDetailsEn", VehicleOtherDetailsEn ? VehicleOtherDetailsEn : null);
    sessionStorage.setItem("VehicleOtherDetailsMl", VehicleOtherDetailsMl ? VehicleOtherDetailsMl : null);
    // sessionStorage.setItem("VehicleType", VehicleType ? VehicleType : null);

    // Address from Birth
    sessionStorage.setItem("InformantAdrsCountry", InformantAdrsCountry ? InformantAdrsCountry.code : null);
    sessionStorage.setItem("InformantAdrsStateName", InformantAdrsStateName ? InformantAdrsStateName.code : null);
    sessionStorage.setItem("InformantAdrsLBTypeName", InformantAdrsLBTypeName ? InformantAdrsLBTypeName.code : null);
    // sessionStorage.setItem("InformantAdrsBuldingNo", InformantAdrsBuldingNo);
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
    sessionStorage.setItem("InformantAdrsPincode", InformantAdrsPincode ? InformantAdrsPostOffice : null);
    // sessionStorage.setItem("InformantAdrsInfontName", InformantAdrsInfontName);
    // sessionStorage.setItem(" InfntWardNo",  InfntWardNo);

    sessionStorage.setItem("setDeathOtherPlace", setDeathOtherPlace ? setDeathOtherPlace.code : null);
    sessionStorage.setItem("setDeathOtherward", setDeathOtherward ? setDeathOtherward.code : null);
    sessionStorage.setItem("PlaceOfDeathOtherDetailsEn", PlaceOfDeathOtherDetailsEn ? PlaceOfDeathOtherDetailsEn : null);
    sessionStorage.setItem("PlaceOfDeathOtherDetailsMl", PlaceOfDeathOtherDetailsMl?PlaceOfDeathOtherDetailsMl: null);

    onSelect(config.key, {
      PlaceOfDeath,
      SignedOfficerName,
      HospitalName,
      setDesignation,
      HospitalAadhaar,
      HospitalMobile,
      OfficerName,
      OfficerDesignation,
      SignedOfficerOtherStatus,
      AdrsDoorNo,
      AdrsHouseNameEn,
      AdrsHouseNameMl,
      AdrsLocalityNameEn,
      AdrsLocalityNameMl,
      AdrsCountry,
      AdrsStateName,
      AdrsLBTypeName,
      AdrsMainPlaceEn,
      AdrsMainPlaceMl,
      AdrsStreetNameEn,
      AdrsStreetNameMl,
      AdrsVillage,
      AdrsLBName,
      AdrsDistrict,
      AdrsTaluk,
      AdrsPostOffice,
      AdrsPincode,
      AdrsResNo,
      setInstitution,
      setInstitutionId,
      SiginedOfficer,
      SiginedOfficerDesignation,
      InstitutionMobilNo,      
      InstitutionAadhaar,
      InformentNameEn,
      InformentNameMl,
      // setTitle,
      isNoAadhaar,
      AadhaarNo,
      // setDeclaration,
      InformentMobileNo,
      InformentEmail,
      VehicleRegistrationNo,
      VehicleFromEn,
      VehicleToEn,
      DriverLicenceNo,
      PlaceOfHalt,
      VehicleFromMl,
      VehicleToMl,
      // setVehicleHaltPlace,
      setAdmittedHospitalEn,
      setAdmittedHospitalMl,
      VehicleOtherDetailsEn,
      VehicleOtherDetailsMl,
      setVehicletype,
      // InformantAdrsBuldingNo,
      InformantAdrsDoorNo,
      InformantAdrsHouseNameEn,
      InformantAdrsLocalityNameEn,
      // InformantAdrsInfontName,
      InformantAdrsCountry,
      InformantAdrsStateName,
      InformantAdrsLBTypeName,
      InformantAdrsMainPlaceEn,
      InformantAdrsStreetNameEn,
      InformantAdrsVillage,
      InformantAdrsLBName,
      InformantAdrsDistrict,
      InformantAdrsTaluk,
      InformantAdrsPostOffice,
      InformantAdrsPincode,
      InformantAdrsResNo,
      // InfntWardNo,
      setDeathOtherPlace,
      setDeathOtherward,
      PlaceOfDeathOtherDetailsEn,
      PlaceOfDeathOtherDetailsMl,
    });
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee")  ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}</span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
              <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={PlaceOfDeath}
                select={selectPlaceofDeath}
                disabled={isEdit}
                placeholder={`${t("CR_PLACE_OF_DEATH")}`}
              />
            </div>
          </div>
        </div>

        {value === "HOSPITAL" && (
          <div>
            <PlaceOfDeathHospital
              selectHospitalName={selectHospitalName}
              HospitalName={HospitalName}
              selectSignedOfficerName={selectSignedOfficerName}
              SignedOfficerName={SignedOfficerName}
              setSelectedDesignation={setSelectedDesignation}
              setDesignation={setDesignation}
              setHospitalAadhaar={setHospitalAadhaar}
              HospitalAadhaar={HospitalAadhaar}
              setHospitalMobile={setHospitalMobile}
              HospitalMobile={HospitalMobile}
              setOfficerName={setOfficerName}
              OfficerName={OfficerName}
              setOfficerDesignation={setOfficerDesignation}
              OfficerDesignation={OfficerDesignation}
              setSignedOfficerOtherStatus={setSignedOfficerOtherStatus}
              SignedOfficerOtherStatus={SignedOfficerOtherStatus}
            />
          </div>
        )}
        {value === "INSTITUTION" && (
          <div>
            <PlaceOfDeathInstitution
              setInstitution={setInstitution}
              setSelectedInstitution={setSelectedInstitution}
              setInstitutionId={setInstitutionId}
              setSelectedInstitutionId={setSelectedInstitutionId}
              SiginedOfficer={SiginedOfficer}
              setSelectedSiginedOfficer={setSelectedSiginedOfficer}
              SiginedOfficerDesignation={SiginedOfficerDesignation}
              setSelectedSiginedOfficerDesignation={setSelectedSiginedOfficerDesignation}
              InstitutionMobilNo={InstitutionMobilNo}
              setInstitutionMobilNo={setInstitutionMobilNo}
              InstitutionAadhaar={InstitutionAadhaar}
              setInstitutionAadhaar={setInstitutionAadhaar}
            />
          </div>
        )}
        {value === "HOME" && (
          <div>
            <PlaceOfDeathHome
              AdrsCountry={AdrsCountry}
              setAdrsCountry={setAdrsCountry}
              AdrsStateName={AdrsStateName}
              setAdrsStateName={setAdrsStateName}
              AdrsDistrict={AdrsDistrict}
              setAdrsDistrict={setAdrsDistrict}
              AdrsLBTypeName={AdrsLBTypeName}
              setAdrsLBTypeName={setAdrsLBTypeName}
              AdrsLBName={AdrsLBName}
              setAdrsLBName={setAdrsLBName}
              AdrsTaluk={AdrsTaluk}
              setAdrsTaluk={setAdrsTaluk}
              AdrsPostOffice={AdrsPostOffice}
              setAdrsPostOffice={setAdrsPostOffice}
              AdrsPincode={AdrsPincode}
              setAdrsPincode={setAdrsPincode}
              AdrsHouseNameEn={AdrsHouseNameEn}
              setAdrsHouseNameEn={setAdrsHouseNameEn}
              AdrsHouseNameMl={AdrsHouseNameMl}
              setAdrsHouseNameMl={setAdrsHouseNameMl}
              // AdrsBuldingNo={AdrsBuldingNo} setAdrsBuldingNo={setAdrsBuldingNo}
              AdrsResNo={AdrsResNo}
              setAdrsResNo={setAdrsResNo}
              AdrsDoorNo={AdrsDoorNo}
              setAdrsDoorNo={setAdrsDoorNo}
              AdrsMainPlaceEn={AdrsMainPlaceEn}
              setAdrsMainPlaceEn={setAdrsMainPlaceEn}
              AdrsMainPlaceMl={AdrsMainPlaceMl}
              setAdrsMainPlaceMl={setAdrsMainPlaceMl}
              AdrsLocalityNameEn={AdrsLocalityNameEn}
              setAdrsLocalityNameEn={setAdrsLocalityNameEn}
              AdrsLocalityNameml={AdrsLocalityNameMl}
              setAdrsLocalityNameMl={setAdrsLocalityNameMl}
              // AdrsCityEn={AdrsCityEn} setAdrsCityEn={setAdrsCityEn}
              // AdrsCityMl={AdrsCityMl} setAdrsCityMl={setAdrsCityMl}
              AdrsStreetNameEn={AdrsStreetNameEn}
              setAdrsStreetNameEn={setAdrsStreetNameEn}
              AdrsStreetNameMl={AdrsStreetNameMl}
              setAdrsStreetNameMl={setAdrsStreetNameMl}
              AdrsVillage={AdrsVillage}
              setAdrsVillage={setAdrsVillage}
            />

            <InformentAddress
              InformentNameEn={InformentNameEn}
              setInformentNameEn={setInformentNameEn}
              InformentNameMl={InformentNameMl}
              setInformentNameMl={setInformentNameMl}
              // setTitle={setTitle}
              // setSelectedTitle={setSelectedTitle}
              AadhaarNo={AadhaarNo}
              setAadhaarNo={setAadhaarNo}
              // setDeclaration={setDeclaration}
              // setSelectedDeclaration={setSelectedDeclaration}
              InformentMobileNo={InformentMobileNo}
              setInformentMobileNo={setInformentMobileNo}
              InformentEmail={InformentEmail}
              setInformentEmail={setInformentEmail}
              isNoAadhaar={isNoAadhaar}
              setIsNoAadhaar={setIsNoAadhaar}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
            <Address
              InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsCountry={setInformantAdrsCountry}
              InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsStateName={setInformantAdrsStateName}
              InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsDistrict={setInformantAdrsDistrict}
              InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName}
              InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsLBName={setInformantAdrsLBName}
              InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsTaluk={setInformantAdrsTaluk}
              InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice}
              InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsPincode={setInformantAdrsPincode}
              InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn}
              // InformantAdrsBuldingNo={InformantAdrsBuldingNo} setInformantAdrsBuldingNo={setInformantAdrsBuldingNo}
              InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsResNo={setInformantAdrsResNo}
              InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo}
              InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn}
              InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn}
              InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn}
              InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsVillage={setInformantAdrsVillage}
              // InfntWardNo={InfntWardNo} setInfntWardNo={setInfntWardNo}
            />
            {/* <PlaceOfDeathHome /> */}
          </div>
        )}
        {value === "VEHICLE" && (
          <div>
            <PlaceOfDeathVehicle
              VehicleRegistrationNo={VehicleRegistrationNo}
              setVehicleRegistrationNo={setVehicleRegistrationNo}
              VehicleFromEn={VehicleFromEn}
              setVehicleToEn={setVehicleToEn}
              VehicleToEn={VehicleToEn}
              PlaceOfHalt = {PlaceOfHalt}
              setPlaceOfHalt={setPlaceOfHalt}
              setVehicleFromEn={setVehicleFromEn}
              VehicleFromMl={VehicleFromMl}
              setVehicleFromMl={setVehicleFromMl}
              VehicleToMl={VehicleToMl}
              setVehicleToMl={setVehicleToMl}
              setDriverLicenceNo = {setDriverLicenceNo}
              DriverLicenceNo = {DriverLicenceNo}
              // setVehicleHaltPlace={setVehicleHaltPlace}
              // setSelectedVehicleHaltPlace={setSelectedVehicleHaltPlace}
              VehicleOtherDetailsEn={VehicleOtherDetailsEn}
              setVehicleOtherDetailsEn={setVehicleOtherDetailsEn}
              setVehicletype={setVehicletype}
              setSelectedVehicletype={setSelectedVehicletype}
              VehicleOtherDetailsMl={VehicleOtherDetailsMl}
              setVehicleOtherDetailsMl={setVehicleOtherDetailsMl}
              setAdmittedHospitalEn={setAdmittedHospitalEn}
              setSelectedAdmittedHospitalEn={setSelectedAdmittedHospitalEn}
              setAdmittedHospitalMl={setAdmittedHospitalMl}
              setSelectedAdmittedHospitalMl={setSelectedAdmittedHospitalMl}
            />
            <InformentAddress
              InformentNameEn={InformentNameEn}
              setInformentNameEn={setInformentNameEn}
              InformentNameMl={InformentNameMl}
              setInformentNameMl={setInformentNameMl}
              // setTitle={setTitle}
              // setSelectedTitle={setSelectedTitle}
              AadhaarNo={AadhaarNo}
              setAadhaarNo={setAadhaarNo}
              // setDeclaration={setDeclaration}
              // setSelectedDeclaration={setSelectedDeclaration}
              InformentMobileNo={InformentMobileNo}
              setInformentMobileNo={setInformentMobileNo}
              InformentEmail={InformentEmail}
              setInformentEmail={setInformentEmail}
              isNoAadhaar={isNoAadhaar}
              setIsNoAadhaar={setIsNoAadhaar}
            />
            <Address
              InformantAdrsCountry={InformantAdrsCountry}
              setInformantAdrsCountry={setInformantAdrsCountry}
              InformantAdrsStateName={InformantAdrsStateName}
              setInformantAdrsStateName={setInformantAdrsStateName}
              InformantAdrsDistrict={InformantAdrsDistrict}
              setInformantAdrsDistrict={setInformantAdrsDistrict}
              InformantAdrsLBTypeName={InformantAdrsLBTypeName}
              setInformantAdrsLBTypeName={setInformantAdrsLBTypeName}
              InformantAdrsLBName={InformantAdrsLBName}
              setInformantAdrsLBName={setInformantAdrsLBName}
              InformantAdrsTaluk={InformantAdrsTaluk}
              setInformantAdrsTaluk={setInformantAdrsTaluk}
              InformantAdrsPostOffice={InformantAdrsPostOffice}
              setInformantAdrsPostOffice={setInformantAdrsPostOffice}
              InformantAdrsPincode={InformantAdrsPincode}
              setInformantAdrsPincode={setInformantAdrsPincode}
              InformantAdrsHouseNameEn={InformantAdrsHouseNameEn}
              setInformantAdrsHouseNameEn={setInformantAdrsHouseNameEn}
              // InformantAdrsBuldingNo={InformantAdrsBuldingNo} setInformantAdrsBuldingNo={setInformantAdrsBuldingNo}
              InformantAdrsResNo={InformantAdrsResNo}
              setInformantAdrsResNo={setInformantAdrsResNo}
              InformantAdrsDoorNo={InformantAdrsDoorNo}
              setInformantAdrsDoorNo={setInformantAdrsDoorNo}
              InformantAdrsMainPlaceEn={InformantAdrsMainPlaceEn}
              setInformantAdrsMainPlaceEn={setInformantAdrsMainPlaceEn}
              InformantAdrsLocalityNameEn={InformantAdrsLocalityNameEn}
              setInformantAdrsLocalityNameEn={setInformantAdrsLocalityNameEn}
              InformantAdrsStreetNameEn={InformantAdrsStreetNameEn}
              setInformantAdrsStreetNameEn={setInformantAdrsStreetNameEn}
              InformantAdrsVillage={InformantAdrsVillage}
              setInformantAdrsVillage={setInformantAdrsVillage}
              // InfntWardNo={InfntWardNo} setInfntWardNo={setInfntWardNo}
            />
            {/* <PlaceOfDeathHome /> */}
          </div>
        )}
        {value === "PUBLIC_PLACES" && (
          <div>
            <PlaceOfDeathOther 
           
            setDeathOtherward={setDeathOtherward} setSelectedDeathOtherward={setSelectedDeathOtherward}
            setDeathOtherPlace={setDeathOtherPlace} setSelectedDeathOtherPlace={setSelectedDeathOtherPlace}
            PlaceOfDeathOtherDetailsEn={PlaceOfDeathOtherDetailsEn} setPlaceOfDeathOtherDetailsEn={setPlaceOfDeathOtherDetailsEn}
            PlaceOfDeathOtherDetailsMl={PlaceOfDeathOtherDetailsMl} setPlaceOfDeathOtherDetailsMl={setPlaceOfDeathOtherDetailsMl} 
           />
          </div>
        )}
        {/* {value === "OTHERS_COUNTRY" && (
                    <div>
                   <OtherCountry />
                    </div>)
          } */}
      </FormStep>
    </React.Fragment>
  );
};
export default PlaceOfDeath;
