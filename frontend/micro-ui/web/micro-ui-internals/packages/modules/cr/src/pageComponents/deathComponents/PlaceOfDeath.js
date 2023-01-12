import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
import PlaceOfDeathHospital from "../../pageComponents/deathComponents/PlaceOfDeathHospital";
import PlaceOfDeathInstitution from "../../pageComponents/deathComponents/PlaceOfDeathInstitution";
import PlaceOfDeathHome from "../../pageComponents/deathComponents/PlaceOfDeathHome";
import PlaceOfDeathVehicle from "../../pageComponents/deathComponents/PlaceOfDeathVehicle";
import PlaceOfDeathOther from "../../pageComponents/deathComponents/PlaceOfDeathOther";
import InformentAddress from "../../pageComponents/deathComponents/InformentAddress";

const PlaceOfDeath = ({ config, onSelect, userType, formData }) => {
  console.log(formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "death-services", "PlaceMaster");
  const [setPlaceofDeath, setSelectedPlaceofDeath] = useState(formData?.PlaceOfDeath?.setPlaceofDeath);
  const [value, setValue] = useState();
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    // Death Place Hospital
  const [SignedOfficerName, selectSignedOfficerName] = useState(formData?.PlaceOfDeath?.SignedOfficerName);
  const [HospitalName, selectHospitalName] = useState(formData?.PlaceOfDeath?.HospitalName);
  const [setDesignation, setSelectedDesignation] = useState(formData?.PlaceOfDeath?.setDesignation);
  const [HospitalAadhaar, setHospitalAadhaar] = useState(formData?.PlaceOfDeath?.HospitalAadhaar);
  const [HospitalMobile, setHospitalMobile] = useState(formData?.PlaceOfDeath?.HospitalMobile);
  //DeathPlace Home
  const [AdrsCountry, setAdrsCountry] = useState(formData?.PlaceOfDeath?.AdrsCountry);
  const [AdrsStateName, setAdrsStateName] = useState(formData?.PlaceOfDeath?.AdrsStateName);
  const [AdrsDistrict, setAdrsDistrict] = useState(formData?.PlaceOfDeath?.AdrsDistrict);
  const [AdrsLBTypeName, setAdrsLBTypeName] = useState(formData?.PlaceOfDeath?.AdrsLBTypeName);
  const [AdrsLBName, setAdrsLBName] = useState(formData?.PlaceOfDeath?.AdrsLBName);
  const [AdrsTaluk, setAdrsTaluk] = useState(formData?.PlaceOfDeath?.AdrsTaluk);
  const [AdrsPostOffice, setAdrsPostOffice] = useState(formData?.PlaceOfDeath?.AdrsPostOffice);
  const [AdrsPincode, setAdrsPincode] = useState(formData?.PlaceOfDeath?.AdrsPincode);
  const [AdrsHouseNameEn, setAdrsHouseNameEn] = useState(formData?.PlaceOfDeath?.AdrsHouseNameEn);
  const [AdrsHouseNameMl, setAdrsHouseNameMl] = useState(formData?.PlaceOfDeath?.AdrsHouseNameMl);
  const [AdrsBuldingNo, setAdrsBuldingNo] = useState(formData?.PlaceOfDeath?.AdrsBuldingNo);
  const [AdrsResNo, setAdrsResNo] = useState(formData?.PlaceOfDeath?.AdrsResNo);  
  const [AdrsDoorNo, setAdrsDoorNo] = useState(formData?.PlaceOfDeath?.AdrsDoorNo);
  const [AdrsMainPlaceEn, setAdrsMainPlaceEn] = useState(formData?.PlaceOfDeath?.AdrsMainPlaceEn);
  const [AdrsMainPlaceMl, setAdrsMainPlaceMl] = useState(formData?.PlaceOfDeath?.AdrsMainPlaceMl);
  const [AdrsLocalityNameEn, setAdrsLocalityNameEn] = useState(formData?.PlaceOfDeath?.AdrsLocalityNameEn);
  const [AdrsLocalityNameMl, setAdrsLocalityNameMl] = useState(formData?.PlaceOfDeath?.AdrsLocalityNameMl);
  const [AdrsCityEn, setAdrsCityEn] = useState(formData?.PlaceOfDeath?.AdrsCityNameEn);
  const [AdrsCityMl, setAdrsCityMl] = useState(formData?.PlaceOfDeath?.AdrsCityMl);   
  const [AdrsStreetNameEn, setAdrsStreetNameEn] = useState(formData?.PlaceOfDeath?.AdrsStreetNameEn);
  const [AdrsStreetNameMl, setAdrsStreetNameMl] = useState(formData?.PlaceOfDeath?.AdrsStreetNameMl);
  const [AdrsVillage, setAdrsVillage] = useState(formData?.PlaceOfDeath?.AdrsVillage);
//Place Of Death Institution
  const [setInstitution, setSelectedInstitution] = useState(formData?.PlaceOfDeath?.setInstitution);
  const [setInstitutionId, setSelectedInstitutionId] = useState(formData?.PlaceOfDeath?.setInstitutionId);    
  const [SiginedOfficer, setSiginedOfficer] = useState(formData?.PlaceOfDeath?.SiginedOfficer);
  const [SiginedOfficerDesignation, setSiginedOfficerDesignation] = useState(formData?.PlaceOfDeath?.SiginedOfficerDesignation);
  const [InstitutionMobilNo, setInstitutionMobilNo] = useState(formData?.PlaceOfDeath?.InstitutionMobilNo);
  const [InstitutionAadhaar, setInstitutionAadhaar] = useState(formData?.PlaceOfDeath?.InstitutionAadhaar);
//informent details for Home and Vehicle
const [InformentNameEn, setInformentNameEn] = useState(formData?.PlaceOfDeath?.InformentNameEn);
const [InformentNameMl, setInformentNameMl] = useState(formData?.PlaceOfDeath?.InformentNameMl);
const [setTitle, setSelectedTitle] = useState(formData?.PlaceOfDeath?.setTitle); 
const [AadhaarNo, setAadhaarNo] = useState(formData?.PlaceOfDeath?.AadhaarNo);
const [setDeclaration, setSelectedDeclaration] = useState(formData?.PlaceOfDeath?.setDeclaration);
const [InformentMobileNo, setInformentMobileNo] = useState(formData?.PlaceOfDeath?.InformentMobileNo); 
const [InformentEmail, setInformentEmail] = useState(formData?.PlaceOfDeath?.InformentEmail);
const [isNoAadhaar, setIsNoAadhaar] = useState(formData?.PlaceOfDeath?.isNoAadhaar);


  const [value1, setValue1] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  let naturetype = null;
   let cmbPlace = [];
  place &&
    place["death-services"] &&
    place["death-services"].PlaceMaster.map((ob) => {
      cmbPlace.push(ob);
    });
    console.log(cmbPlace);

  const onSkip = () => onSelect();

  function selectPlaceofDeath(value) {
    setSelectedPlaceofDeath(value);
    setValue(value.code);
  }
  
  React.useEffect(() => {
    if (isInitialRender) {
      if (cmbPlace) {
        setIsInitialRender(false);
        naturetype = cmbPlace.code;
        setValue(naturetype);
        // setActivity(cmbStructure.filter((cmbStructure) => cmbStructure.maincode.includes(naturetype)));
        if (naturetype === "HOSPITAL") {
          <HospitalDetails   
          HospitalName={HospitalName} 
          SignedOfficerName={SignedOfficerName}
          setDesignation={setDesignation}
          HospitalAadhaar={HospitalAadhaar}
          HospitalMobile={HospitalMobile}
          />
        }   
        if (naturetype === "HOME") {
          
          <PlaceOfDeathHome 
          AdrsCountry={AdrsCountry}
          AdrsStateName={AdrsStateName}
          AdrsDistrict={AdrsDistrict}
          AdrsLBTypeName ={AdrsLBTypeName}
          AdrsLBName ={AdrsLBTypeName}
          AdrsTaluk ={AdrsTaluk}
          AdrsPostOffice ={AdrsPostOffice}
          AdrsPincode ={AdrsPincode}
          AdrsHouseNameEn ={AdrsHouseNameEn}
          AdrsHouseNameMl ={AdrsHouseNameMl}
          AdrsBuldingNo ={AdrsBuldingNo}
          AdrsResNo ={AdrsResNo}
          AdrsDoorNo ={AdrsDoorNo}
          AdrsMainPlaceEn ={AdrsMainPlaceEn}
          AdrsMainPlaceMl ={AdrsMainPlaceMl}
          AdrsLocalityNameEn ={AdrsLocalityNameEn}
          AdrsLocalityNameMl ={AdrsLocalityNameMl}
          AdrsCityEn ={AdrsCityEn}
          AdrsCityMl ={AdrsCityMl}
          AdrsStreetNameEn ={AdrsStreetNameEn}
          AdrsStreetNameMl ={AdrsStreetNameMl}
          AdrsVillage ={AdrsVillage}
          />
        }
        if (naturetype === "HOME") {
          
          <InformentAddress
          InformentNameEn ={InformentNameEn}
          InformentNameMl ={InformentNameMl}
          setTitle ={setTitle}
          AadhaarNo ={AadhaarNo}
          setDeclaration ={setDeclaration}
          InformentMobileNo ={InformentMobileNo}
          AdrsVillage ={AdrsVillage}          

          />
        }  
        if (naturetype === "INSTITUTION") {
          <PlaceOfDeathInstitution  
          setInstitution={setInstitution} 
          setInstitutionId={setInstitutionId}
          SiginedOfficer={SiginedOfficer} 
          AadhaarNo={AadhaarNo}
          SiginedOfficerDesignation={SiginedOfficerDesignation}
          InstitutionMobilNo={InstitutionMobilNo}
          InformentEmail={InformentEmail}
          />
        }         
       
      }
    }
  }, [isInitialRender]);
  const goNext = () => {
    sessionStorage.setItem("setPlaceofDeath", setPlaceofDeath?setPlaceofDeath.code:null);
    sessionStorage.setItem("SignedOfficerName", SignedOfficerName);
    sessionStorage.setItem("HospitalName", HospitalName);
    sessionStorage.setItem("setDesignation", setDesignation.code);
    sessionStorage.setItem("HospitalAadhaar", HospitalAadhaar);
    sessionStorage.setItem("HospitalMobile", HospitalMobile);
    //Place of Death Home
    sessionStorage.setItem("AdrsCountry", AdrsCountry.code);
    sessionStorage.setItem("AdrsStateName", AdrsStateName.code);
    sessionStorage.setItem("AdrsLBTypeName", AdrsLBTypeName.code);
    sessionStorage.setItem("AdrsBuldingNo", AdrsBuldingNo);
    sessionStorage.setItem("AdrsResNo", AdrsResNo);
    sessionStorage.setItem("AdrsDoorNo", AdrsDoorNo);
    sessionStorage.setItem("AdrsHouseNameEn", AdrsHouseNameEn);
    sessionStorage.setItem("AdrsHouseNameMl", AdrsHouseNameMl);
    sessionStorage.setItem("AdrsMainPlaceEn", AdrsMainPlaceEn);
    sessionStorage.setItem("AdrsMainPlaceMl", AdrsMainPlaceMl);
    sessionStorage.setItem("AdrsLocalityNameEn", AdrsLocalityNameEn);
    sessionStorage.setItem("AdrsLocalityNameMl", AdrsLocalityNameMl);
    sessionStorage.setItem("AdrsCityEn", AdrsCityEn);
    sessionStorage.setItem("AdrsCityMl", AdrsCityMl);
    sessionStorage.setItem("AdrsStreetNameEn", AdrsStreetNameEn);
    sessionStorage.setItem("AdrsStreetNameMl", AdrsStreetNameMl);
    sessionStorage.setItem("AdrsVillage", AdrsVillage.code);
    sessionStorage.setItem("AdrsLBName", null);
    sessionStorage.setItem("AdrsDistrict", AdrsDistrict.code);
    sessionStorage.setItem("AdrsTaluk", AdrsTaluk.code);
    sessionStorage.setItem("AdrsPostOffice", AdrsPostOffice.code);
    sessionStorage.setItem("AdrsPincode", AdrsPincode.code);
    //Place Of DeathInstitution
    sessionStorage.setItem("setInstitution", setInstitution.code);
    sessionStorage.setItem("setInstitutionId", setInstitutionId.code);
    sessionStorage.setItem("setSiginedOfficer", SiginedOfficer);
    sessionStorage.setItem("setSiginedOfficerDesignation", SiginedOfficerDesignation);
    sessionStorage.setItem("setInstitutionMobilNo", InstitutionMobilNo);
    sessionStorage.setItem("setInstitutionAadhaar", InstitutionAadhaar);
    //InformentAddress
    sessionStorage.setItem("InformentNameEn", InformentNameEn);
    sessionStorage.setItem("InformentNameMl", InformentNameMl);
    sessionStorage.setItem("setTitle", setTitle ? setTitle.code : null);
    sessionStorage.setItem("isNoAadhaar", isNoAadhaar);
    sessionStorage.setItem("AadhaarNo", AadhaarNo);
    sessionStorage.setItem("setDeclaration", setDeclaration ? setDeclaration.code : null);
    sessionStorage.setItem("InformentMobileNo", InformentMobileNo);
    sessionStorage.setItem("InformentEmail", InformentEmail);

    onSelect(config.key, { setPlaceofDeath,SignedOfficerName, HospitalName, setDesignation, HospitalAadhaar, HospitalMobile, AdrsBuldingNo,
      AdrsDoorNo,AdrsHouseNameEn,AdrsHouseNameMl,AdrsLocalityNameEn, AdrsLocalityNameMl, AdrsCityEn,AdrsCityMl, AdrsCountry, AdrsStateName,
      AdrsLBTypeName, AdrsMainPlaceEn,AdrsMainPlaceMl,AdrsStreetNameEn,AdrsStreetNameMl,AdrsVillage,AdrsLBName,AdrsDistrict,AdrsTaluk,
      AdrsPostOffice,AdrsPincode, AdrsResNo,setInstitution,setInstitutionId,SiginedOfficer,SiginedOfficerDesignation,InstitutionMobilNo,
      InstitutionAadhaar,InformentNameEn,InformentNameMl,setTitle,isNoAadhaar,AadhaarNo,setDeclaration,InformentMobileNo,InformentEmail, });




  };
  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}  >     
        <div className="row">
        <div className="col-md-12" >
            <h1 className="headingh1" >
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_DEATH")}`}
                </span> 
            </h1>
        </div>
        </div>    
 
    <div className="row">
    <div className="col-md-12" >
        <div className="col-md-6" >
            <CardLabel>{t("CR_PLACE_OF_DEATH")}</CardLabel>
            <Dropdown
                t={t}
                optionKey="code"
                isMandatory={false}
                option={cmbPlace}
                selected={setPlaceofDeath}
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
                    
                       selectHospitalName={selectHospitalName} HospitalName={HospitalName}
                       selectSignedOfficerName={selectSignedOfficerName} SignedOfficerName={SignedOfficerName}
                       setSelectedDesignation={setSelectedDesignation}  setDesignation={setDesignation}
                       setHospitalAadhaar={setHospitalAadhaar} HospitalAadhaar={setHospitalAadhaar}
                       setHospitalMobile={setHospitalMobile} HospitalMobile={HospitalMobile} />
                   </div>)
          }
          {value === "INSTITUTION" && (
                    <div>
                   <PlaceOfDeathInstitution
                   setInstitution={setInstitution} setSelectedInstitution={setSelectedInstitution}
                   setInstitutionId={setInstitutionId} setSelectedInstitutionId={setSelectedInstitutionId}
                   SiginedOfficer={SiginedOfficer} setSiginedOfficer= {setSiginedOfficer}
                   SiginedOfficerDesignation={SiginedOfficerDesignation} setSiginedOfficerDesignation={setSiginedOfficerDesignation}
                   InstitutionMobilNo={InstitutionMobilNo} setInstitutionMobilNo={setInstitutionMobilNo}
                   InstitutionAadhaar={InstitutionAadhaar} setInstitutionAadhaar={setInstitutionAadhaar}
                   /> 
                  </div>)
          }
          {value === "HOME" && (
                    <div>
                   <PlaceOfDeathHome
                   
                   AdrsCountry={AdrsCountry} setAdrsCountry={setAdrsCountry}
                   AdrsStateName={AdrsStateName} setAdrsStateName={setAdrsStateName} 
                   AdrsDistrict={AdrsDistrict} setAdrsDistrict={setAdrsDistrict}
                   AdrsLBTypeName ={AdrsLBTypeName} setAdrsLBTypeName ={setAdrsLBTypeName}
                   AdrsLBName ={AdrsLBTypeName} setAdrsLBName ={setAdrsLBName}
                   AdrsTaluk ={AdrsTaluk} setAdrsTaluk ={setAdrsTaluk}
                   AdrsPostOffice ={AdrsPostOffice}  setAdrsPostOffice ={setAdrsPostOffice}
                   AdrsPincode ={AdrsPincode} setAdrsPincode ={setAdrsPincode}
                   AdrsHouseNameEn ={AdrsHouseNameEn} setAdrsHouseNameEn ={setAdrsHouseNameEn}
                   AdrsHouseNameMl ={AdrsHouseNameMl} setAdrsHouseNameMl ={setAdrsHouseNameMl}
                   AdrsBuldingNo ={AdrsBuldingNo} setAdrsBuldingNo ={setAdrsBuldingNo}
                   AdrsResNo ={AdrsResNo}  setAdrsResNo ={setAdrsResNo}
                   AdrsDoorNo ={AdrsDoorNo} setAdrsDoorNo ={setAdrsDoorNo}
                   AdrsMainPlaceEn ={AdrsMainPlaceEn} setAdrsMainPlaceEn ={setAdrsMainPlaceEn}
                   AdrsMainPlaceMl ={AdrsMainPlaceMl} setAdrsMainPlaceMl ={setAdrsMainPlaceMl}
                   AdrsLocalityNameEn ={AdrsLocalityNameEn} setAdrsLocalityNameEn ={setAdrsLocalityNameEn}
                   AdrsLocalityNameml ={AdrsLocalityNameMl} setAdrsLocalityNameMl ={setAdrsLocalityNameMl}
                   AdrsCityEn ={AdrsCityEn} setAdrsCityEn ={setAdrsCityEn}
                   AdrsCityMl ={AdrsCityMl} setAdrsCityMl ={setAdrsCityMl}
                   AdrsStreetNameEn ={AdrsStreetNameEn} setAdrsStreetNameEn ={setAdrsStreetNameEn}
                   AdrsStreetNameMl ={AdrsStreetNameMl} setAdrsStreetNameMl ={setAdrsStreetNameMl}
                   AdrsVillage ={AdrsVillage}   setAdrsVillage ={setAdrsVillage}      />                  
                  <InformentAddress
                  InformentNameEn ={InformentNameEn} setInformentNameEn ={setInformentNameEn}
                  InformentNameMl ={InformentNameMl} setInformentNameMl ={setInformentNameMl}
                  setTitle ={setTitle}   setSelectedTitle ={setSelectedTitle} 
                  AadhaarNo ={AadhaarNo} setAadhaarNo ={setAadhaarNo}
                  setDeclaration ={setDeclaration} setSelectedDeclaration ={setSelectedDeclaration}
                  InformentMobileNo ={InformentMobileNo}   setInformentMobileNo ={setInformentMobileNo} 
                  InformentEmail ={InformentEmail} setInformentEmail ={setInformentEmail}
                  isNoAadhaar ={isNoAadhaar} setIsNoAadhaar ={setIsNoAadhaar}                  
                  />
                  {/* <PlaceOfDeathHome /> */}
                  
                 </div>               
                    
                  )
          }
          {value === "VEHICLE" && (
                    <div>
                   <PlaceOfDeathVehicle />
                   <InformentAddress />
                    {/* <PlaceOfDeathHome /> */}
                  </div>)
          }
          {value === "PUBLIC_PLACES" && (
                    <div>
                   <PlaceOfDeathOther />
                    </div>)
          }
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