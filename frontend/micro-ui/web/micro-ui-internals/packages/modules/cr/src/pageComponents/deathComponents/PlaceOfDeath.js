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

    onSelect(config.key, { setPlaceofDeath,SignedOfficerName, HospitalName, setDesignation, HospitalAadhaar, HospitalMobile });




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
                   <PlaceOfDeathInstitution />
                  </div>)
          }
          {value === "HOME" && (
                    <div>
                   <PlaceOfDeathHome />                 
                  <InformentAddress />
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