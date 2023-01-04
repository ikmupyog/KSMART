import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton , DatePicker} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const AdoptionDetails = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
    
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
    const [FatherFirstNameEn, setFatherFirstNameEn] = useState(formData?.AdoptionDetails?.FatherFirstNameEn);
    const [FatherMiddleNameEn, setFatherMiddleNameEn] = useState(formData?.AdoptionDetails?.FatherMiddleNameEn);
    const [FatherLastNameEn, setFatherLastNameEn] = useState(formData?.AdoptionDetails?.FatherLastNameEn);
    const [FatherFirstNameMl, setFatherFirstNameMl] = useState(formData?.AdoptionDetails?.FatherFirstNameMl);
    const [FatherMiddleNameMl, setFatherMiddleNameMl] = useState(formData?.AdoptionDetails?.FatherMiddleNameMl);
    const [FatherLastNameMl, setFatherLastNameMl] = useState(formData?.AdoptionDetails?.FatherLastNameMl);
    const [AdoptionDeedNo, setAdoptionDeedNo] = useState(formData?.AdoptionDetails?.AdoptionDeedNo);
    const [AdoptionIssuingAthority, setAdoptionIssuingAthority] = useState(formData?.AdoptionDetails?.AdoptionIssuingAthority);   
    const [AdoptionOrderDate, setAdoptionOrderDate] = useState(formData?.AdoptionDetails?.AdoptionOrderDate);
    const [ AdoptionAgencyName, setAdoptionAgencyName] = useState(formData?.AdoptionDetails?. AdoptionAgencyName);
    const [ AdoptionAgencyAddress , setAdoptionAgencyAddress ] = useState(formData?.AdoptionDetails?. AdoptionAgencyAddress );     
   
    
    const onSkip = () => onSelect();

    function setSelectFatherFirstNameEn(e) {
        setFatherFirstNameEn(e.target.value);
    }
    function setSelectFatherMiddleNameEn(e) {
        setFatherMiddleNameEn(e.target.value);
    }
    function setSelectFatherLastNameEn(e) {
        setFatherLastNameEn(e.target.value);
    }
    function setSelectFatherFirstNameMl(e) {
        setFatherFirstNameMl(e.target.value);
    }
    function setSelectFatherMiddleNameMl(e) {
        setFatherMiddleNameMl(e.target.value);
    }
    function setSelectFatherLastNameMl(e) {
        setFatherLastNameMl(e.target.value);
    }
    function setSelectAdoptionDeedNo(e) {
        setAdoptionDeedNo(e.target.value);
    }
    function setSelectAdoptionIssuingAthority(e) {
        setAdoptionIssuingAthority(e.target.value);
    }    
    function setselectAdoptionOrderDate(value) {
        setAdoptionOrderDate(value);
    }
    function setSelectAdoptionAgencyName(e) {
        setAdoptionAgencyName(e.target.value);
    }  
    function setSelectAdoptionAgencyAddress  (e) {
        setAdoptionAgencyAddress(e.target.value);
    }     
    
   
    const goNext = () => {
        sessionStorage.setItem("FatherFirstNameEn", FatherFirstNameEn);
        sessionStorage.setItem("FatherMiddleNameEn", FatherMiddleNameEn);
        sessionStorage.setItem("FatherLastNameEn", FatherLastNameEn);
        sessionStorage.setItem("FatherFirstNameMl", FatherFirstNameMl);
        sessionStorage.setItem("FatherMiddleNameMl", FatherMiddleNameMl);
        sessionStorage.setItem("FatherLastNameMl", FatherLastNameMl);
        sessionStorage.setItem("AdoptionDeedNo", AdoptionDeedNo);          
        sessionStorage.setItem("AdoptionIssuingAthority", AdoptionIssuingAthority);        
        sessionStorage.setItem("AdoptionOrderDate", AdoptionOrderDate);
        sessionStorage.setItem("AdoptionAgencyName", AdoptionAgencyName);
        sessionStorage.setItem("AdoptionAgencyAddress", AdoptionAgencyAddress);        
        
        onSelect(config.key, {
            FatherFirstNameEn, FatherMiddleNameEn, FatherLastNameEn,
            FatherFirstNameMl, FatherMiddleNameMl, FatherLastNameMl, AdoptionDeedNo,AdoptionIssuingAthority, AdoptionOrderDate, AdoptionAgencyName, AdoptionAgencyAddress 
        });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
            {window.location.href.includes("/employee") ? <Timeline currentStep={1} /> : null}
            <BackButton >{t("CS_COMMON_BACK")}</BackButton>
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!FatherFirstNameEn}>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_INFORMATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameEn"
                                value={FatherFirstNameEn} onChange={setSelectFatherFirstNameEn} disable={isEdit}  placeholder={`${t("CR_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMiddleNameEn" value={FatherMiddleNameEn} onChange={setSelectFatherMiddleNameEn} disable={isEdit}  placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_LAST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameEn" value={FatherLastNameEn} onChange={setSelectFatherLastNameEn} disable={isEdit}  placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-4" ><CardLabel>{`${t("CR_FIRST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherFirstNameMl" value={FatherFirstNameMl} onChange={setSelectFatherFirstNameMl} disable={isEdit} placeholder={`${t("CR_FIRST_NAME_ML")}`}  {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })} />
                        </div>
                        <div className="col-md-4" ><CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherMiddleNameMl" value={FatherMiddleNameMl} onChange={setSelectFatherMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })} />
                        </div>
                        <div className="col-md-4"><CardLabel>{`${t("CR_LAST_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherLastNameMl" value={FatherLastNameMl} onChange={setSelectFatherLastNameMl} disable={isEdit} placeholder={`${t("CR_LAST_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12" >
                        
                        <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTION_DEED_ORDER_NO")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionDeedNo" value={AdoptionDeedNo} onChange={setSelectAdoptionDeedNo} disable={isEdit} placeholder={`${t("CR_ADOPTION_DEED_ORDER_NO")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text",  })} />
                        </div>

                        <div className="col-md-4" ><CardLabel>{t("CR_ADOPTION_ORDER_DATE")}</CardLabel>
                        <DatePicker date={AdoptionOrderDate} name="AdoptionOrderDate" onChange={setselectAdoptionOrderDate} placeholder={`${t("CR_ADOPTION_ORDER_DATE")}`}  {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, type: "text",  })}/>
                    </div>

                    <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionIssuingAthority" value={AdoptionIssuingAthority} onChange={setSelectAdoptionIssuingAthority} disable={isEdit} placeholder={`${t("CR_ADOPTION_ISSUING_AUTHORITY")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text",  })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >

                        <div className="col-md-6" ><CardLabel>{`${t("CR_ADOPTION_AGENCY_NAME_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionAgencyName" value={AdoptionAgencyName} onChange={setSelectAdoptionAgencyName} disable={isEdit} placeholder={`${t("CR_ADOPTION_AGENCY_NAME_EN")}`} {...(validation =  { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text",  })}/>
                        </div>
                        <div className="col-md-6" ><CardLabel>{`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`}</CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptionAgencyAddress" value={AdoptionAgencyAddress} onChange={setSelectAdoptionAgencyAddress} disable={isEdit} placeholder={`${t("CR_ADOPTION_AGENCY_ADDRESS_EN")}`} {...(validation =  { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text",  })} />
                        </div>
                    </div>
                </div>

               
            </FormStep>
        </React.Fragment>
    );
};
export default  AdoptionDetails;
