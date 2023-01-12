import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const InformantDetails = ({ config, onSelect, userType, formData,InfomantFirstNameEn, setInfomantFirstNameEn,InfomantAadhar, setInfomantAadhar,InfomantEmail, setInfomantEmail,
    InfomantMobile, setInfomantMobile
 }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    // const [InfomantFirstNameEn, setInfomantFirstNameEn] = useState(formData?.InfomantInfoDetails?.InfomantFirstNameEn);
    // const [InfomantAadhar, setInfomantAadhar] = useState(formData?.InfomantInfoDetails?.InfomantAadhar);
    // const [InfomantEmail, setInfomantEmail] = useState(formData?.InfomantInfoDetails?.InfomantEmail);
    // const [InfomantMobile, setInfomantMobile] = useState(formData?.InfomantInfoDetails?.InfomantMobile);
  
    const onSkip = () => onSelect();

    function setSelectInfomantFirstNameEn(e) {
        setInfomantFirstNameEn(e.target.value);
    }

    function setSelectInfomantAadhar(e) {
        setInfomantAadhar(e.target.value);
    }
   
    function setSelectInfomantEmail(e) {
        setInfomantEmail(e.target.value);
    }
    function setSelectInfomantMobile(e) {
        setInfomantMobile(e.target.value);
    }
  
    const goNext = () => {
        // sessionStorage.setItem("InfomantFirstNameEn", InfomantFirstNameEn);          
        // sessionStorage.setItem("InfomantAadhar", InfomantAadhar);       
        // sessionStorage.setItem("InfomantEmail", InfomantEmail);
        // sessionStorage.setItem("InfomantMobile", InfomantMobile);   
     
      
        // onSelect(config.key, {
        //     InfomantFirstNameEn,  InfomantAadhar,  InfomantEmail, InfomantMobile        });
    }
    return (
        <React.Fragment>
            {/* {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton> */}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!InfomantFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_Infomant_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-3" ><CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InfomantFirstNameEn"
                                value={InfomantFirstNameEn} onChange={setSelectInfomantFirstNameEn} disable={isEdit}  placeholder={`${t("CR_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InfomantAadhar" value={InfomantAadhar} onChange={setSelectInfomantAadhar} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { pattern: "^([0-9]){12}$", isRequired: false, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_EMAIL")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="InfomantEmail" value={InfomantEmail} onChange={setSelectInfomantEmail} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { isRequired: false, title: t("CR_INVALID_EMAIL") })} />
                        </div>
                        <div className="col-md-3" ><CardLabel>{`${t("CR_MOBILE_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InfomantMobile" value={InfomantMobile} onChange={setSelectInfomantMobile} disable={isEdit} placeholder={`${t("CR_EMAIL")}`} {...(validation = { pattern: "^[0-9]{10}$", type: "text", isRequired: true, title: t("CR_INVALID_MOBILE_NO") })} />
                        </div>
                    </div>
                </div>
                

               

                
            </FormStep>
        </React.Fragment>
    );
};
export default InformantDetails;