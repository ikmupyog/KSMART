import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, TextArea } from "@egovernments/digit-ui-react-components";
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

const BirthPlace = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: Menu = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "death-services", "PlaceMaster");
  const [BirthPlace, selectBirthPlace] = useState(formData?.BirthPlace?.BirthPlace);
  // const [BirthPlaceDescription, setBirthPlaceDeccription] = useState(formData?.BirthPlace?.BirthPlaceDescription);
  const [HospitalName, selectHospitalName] = useState(formData?.BirthPlace?.HospitalName);
  const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.BirthPlace?.SignedOfficerName);
  const [SignedOfficerDesignation, selectSignedOfficerDesignation] = useState(formData?.BirthPlace?.SignedOfficerDesignation);
  const [SignedOfficerAadharNo, setSignedOfficerAadharNo] = useState(formData?.BirthPlace?.SignedOfficerAadharNo);
  const [SignedOfficerMobileNo, setSignedOfficerMobileNo] = useState(formData?.BirthPlace?.SignedOfficerMobileNo);

  const [setInstitution, setSelectedInstitution] = useState(formData?.BirthPlace?.setInstitution);
  const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.BirthPlace?.setInstitutionId);
  const [SiginedOfficer, setSiginedOfficer] = useState(formData?.BirthPlace?.SiginedOfficer);
  const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.BirthPlace?.SiginedOfficerDesignation);
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.BirthPlace?.InstitutionMobilNo);
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.BirthPlace?.InstitutionAadhaar);

  const [DriverName, setDriverName] = useState(formData?.BirthPlace?.DriverName);
  const [DriverMobileNo, setDriverMobileNo] = useState(formData?.BirthPlace?.DriverMobileNo);
  const [DriverAadhar, setDriverAadhar] = useState(formData?.BirthPlace?.DriverAadhar);
  const [VehicleType, setVehicleType] = useState(formData?.BirthPlace?.VehicleType);
  const [VehicleRegistrationNo, setVehicleRegistrationNo] = useState(formData?.BirthPlace?.VehicleRegistrationNo);
  const [VehicleFromEn, setVehicleFromEn] = useState(formData?.BirthPlace?.setVehicleFromEn);
  const [VehicleToEn, setVehicleToEn] = useState(formData?.BirthPlace?.setSelectVehicleToEn);
  const [VehiclePlaceFirstHalt, setVehiclePlaceFirstHalt] = useState(formData?.BirthPlace?.VehiclePlaceFirstHalt);
  const [WardNo, setWardNo] = useState(formData.BirthPlace?.wardno);

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
  const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.BirthPlace?.AdrsBuldingNo);
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
            DriverName={DriverName}
            DriverMobileNo={DriverMobileNo}
            DriverAadhar={DriverAadhar}
            VehicleType={VehicleType}
            VehicleRegistrationNo={VehicleRegistrationNo}
            VehicleFromEn={VehicleFromEn}
            VehicleToEn={VehicleToEn}
            VehiclePlaceFirstHalt={VehiclePlaceFirstHalt}
          />
        }
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
            AdrsBuldingNo={AdrsBuldingNo}
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
            AdrsStreetNameMl ={AdrsStreetNameMl}
            AdrsHouseNameMl ={AdrsHouseNameMl}
          />
          
        }
        if (naturetype === "HOME") {
          <InformantDetails

          InfomantFirstNameEn={InfomantFirstNameEn}
          InfomantAadhar={InfomantAadhar}
          InfomantEmail={InfomantEmail}
          InfomantMobile={InfomantMobile}
            
          />
          
        }

      }
    }
  }, [isInitialRender]);
  const goNext = () => {
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


    sessionStorage.setItem("DriverName", DriverName ? DriverName : null);
    sessionStorage.setItem("DriverMobileNo", DriverMobileNo ? DriverMobileNo : null);
    sessionStorage.setItem("DriverAadhar", DriverAadhar ? DriverAadhar : null);
    sessionStorage.setItem("VehicleType", VehicleType ? VehicleType : null);
    sessionStorage.setItem("VehicleRegistrationNo", VehicleRegistrationNo ? VehicleRegistrationNo : null);
    sessionStorage.setItem("VehicleFromEn", VehicleFromEn ? VehicleFromEn : null);
    sessionStorage.setItem("VehicleToEn", VehicleToEn ? VehicleToEn : null);
    sessionStorage.setItem("VehiclePlaceFirstHalt", VehiclePlaceFirstHalt ? VehiclePlaceFirstHalt : null);


    sessionStorage.setItem("setPublicPlaceType", setPublicPlaceType ? setPublicPlaceType.code : null);
    sessionStorage.setItem("AdrsInfontName", AdrsInfontName ? AdrsInfontName : null);
    sessionStorage.setItem("AdrsPublicPlace", AdrsPublicPlace ? AdrsPublicPlace : null);
    sessionStorage.setItem("PublicPlaceDesption", PublicPlaceDesption ? PublicPlaceDesption : null);


    sessionStorage.setItem("AdrsCountry", AdrsCountry ? AdrsCountry.code : null);
    sessionStorage.setItem("AdrsStateName", AdrsStateName ? AdrsStateName.code : null);
    sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName ? AdrsLBTypeName.code : null);
    sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo ? AdrsBuldingNo : null);
    sessionStorage.setItem("AdrsResNoEn", AdrsResNoEn ? AdrsResNoEn : null);
    sessionStorage.setItem("AdrsResNoMl", AdrsResNoMl ? AdrsResNoMl : null);
    sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo ? AdrsDoorNo : null);
    sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn ? AdrsHouseNameEn : null);
    sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn ? AdrsMainPlaceEn : null);
    sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn ? AdrsLocalityNameEn : null);
    sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn ? AdrsStreetNameEn : null);
    sessionStorage.setItem("AdrsVillage", AdrsVillage ? AdrsVillage.code : null);
    sessionStorage.setItem("AdrsLBName", AdrsLBName ? AdrsLBName.code : null);
    sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl ? AdrsLocalityNameMl :null);
    sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl ? AdrsStreetNameMl :null);
    sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl ? AdrsHouseNameMl : null);   
    sessionStorage.setItem("AdrsDistrict", AdrsDistrict ? AdrsDistrict.code : null);
    sessionStorage.setItem("AdrsTaluk", AdrsTaluk ? AdrsTaluk.code : null);
    sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice ? AdrsPostOffice.code : null);
    sessionStorage.setItem("AdrsPincode", AdrsPincode ? AdrsPincode.code : null);
    sessionStorage.setItem("AdrsInfomntName", AdrsInfomntName ? AdrsInfomntName : null);
    sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl ? AdrsMainPlaceMl : null);

    sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn ? InfomantFirstNameEn : null);          
    sessionStorage.setItem("InfomantAadhar", InfomantAadhar ? InfomantAadhar : null );       
    sessionStorage.setItem("InfomantEmail", InfomantEmail ? InfomantEmail : null );
    sessionStorage.setItem("InfomantMobile", InfomantMobile ? InfomantMobile : null );  

    onSelect(config.key, {
      BirthPlace, HospitalName, SignedOfficerName, SignedOfficerDesignation, SignedOfficerAadharNo, SignedOfficerMobileNo,
      setInstitution, setInstitutionId, SiginedOfficer, SiginedOfficerDesignation, InstitutionMobilNo, InstitutionAadhaar,
      DriverName, DriverMobileNo, DriverAadhar, VehicleType, VehicleRegistrationNo, VehicleFromEn, VehicleToEn, VehiclePlaceFirstHalt, setPublicPlaceType,
      AdrsInfontName, AdrsPublicPlace, PublicPlaceDesption, AdrsCountry, AdrsStateName, AdrsLBTypeName, AdrsBuldingNo, AdrsResNoEn, AdrsDoorNo, AdrsHouseNameEn,
      AdrsMainPlaceEn, AdrsLocalityNameEn, AdrsStreetNameEn, AdrsVillage, AdrsLBName, AdrsDistrict, AdrsTaluk, AdrsPostOffice, AdrsPincode, AdrsInfomntName, AdrsMainPlaceMl,
      AdrsLocalityNameMl,AdrsStreetNameMl, AdrsResNoMl,InfomantFirstNameEn, InfomantAadhar,InfomantEmail,InfomantMobile,
    });
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
              setDriverName={setDriverName} DriverName={DriverName}
              setDriverMobileNo={setDriverMobileNo} DriverMobileNo={DriverMobileNo}
              setDriverAadhar={setDriverAadhar} DriverAadhar={DriverAadhar}
              setVehicleType={setVehicleType} VehicleType={VehicleType}
              setVehicleRegistrationNo={setVehicleRegistrationNo} VehicleRegistrationNo={VehicleRegistrationNo}
              setVehicleFromEn={setVehicleFromEn} VehicleFromEn={VehicleFromEn}
              setVehicleToEn={setVehicleToEn} VehicleToEn={VehicleToEn}
              setVehiclePlaceFirstHalt={setVehiclePlaceFirstHalt} VehiclePlaceFirstHalt={VehiclePlaceFirstHalt}

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
              setAdrsBuldingNo={setAdrsBuldingNo} AdrsBuldingNo={AdrsBuldingNo}
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

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlace;