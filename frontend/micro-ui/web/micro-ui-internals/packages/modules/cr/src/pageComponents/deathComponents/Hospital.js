import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton ,CheckBox} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";
const Hospital = ({config,  onSelect,  userType,  formData, DeathPlaceType, selectDeathPlaceType,
}) => {

  const { t } = useTranslation();
  let validation = {};
  const { data: hospitalData = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
 // const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.HospitalDetails?.DeathPlaceType);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  
  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });    
  useEffect(() => {  }, []);
  const onSkip = () => onSelect();
  function setselectDeathPlaceType(value) {    
    selectDeathPlaceType(value);    
  }
   
  const goNext = () => {    
    // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null );   
  };
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
        <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
        

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_HOSPITAL")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={true}
                option={cmbhospital}
                selected={DeathPlaceType}
                select={setselectDeathPlaceType}
                placeholder={`${t("CR_HOSPITAL")}`}
              />
            </div> 
          </div>
        </div>
       
      </FormStep>
    </React.Fragment>
  );
};
export default Hospital;
