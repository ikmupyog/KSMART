import React, { useState } from "react";
import { FormStep, CardLabel, TextInput,TextArea, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const AdoptionStatisticalInformation = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: ReligionList = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");   

    const [Religion, setReligion] = useState(formData?.AdoptionStatisticalInfoDetails?.Religion);    
    // const [BirthPlaceDescription, setBirthPlaceDescription] = useState(formData?.AdoptionStatisticalInfoDetails?.BirthPlaceDescription);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade"); 
    let cmbReligion = [];    
    console.log(ReligionList);
    ReligionList &&
    ReligionList["common-masters"] &&
    ReligionList["common-masters"].Religion.map((ob) => {
        cmbReligion.push(ob);
    });
  
    const onSkip = () => onSelect();

    
    function setSelectReligion(value) {
        setReligion(value);
    }   
    // function setSelectBirthPlaceDescription(e) {
    //     setBirthPlaceDescription(e.target.value);
    //   }
    const goNext = () => {
      
        sessionStorage.setItem("Religion", Religion.code);      
        // sessionStorage.setItem("BirthPlaceDescription", BirthPlaceDescription);
        onSelect(config.key, {  Religion });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!Religion}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_MOTHER_STATISTICAL_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >                 
                       
                        <div className="col-md-6" >
                            <CardLabel>{`${t("CS_COMMON_RELIGION")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={false} option={cmbReligion} selected={Religion} select={setSelectReligion} disabled={isEdit} />
                        </div>
                        {/* <div className="col-md-6 " >
            <CardLabel>{`${t("CR_DESCRIPTION")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthPlaceDescription" value={BirthPlaceDescription} onChange={setSelectBirthPlaceDescription} disable={isEdit} placeholder={`${t("CR_DESCRIPTION")}`} {...(validation = { pattern:  "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_DESCRIPTION") })} />
          </div> */}
                    </div>
                </div>
             
              
        
            </FormStep>
        </React.Fragment>
    );
};
export default  AdoptionStatisticalInformation;
