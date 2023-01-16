import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton,Loader } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const MultipleBirth = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    let validation = {};
    const { data: Menu,isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const [ChildDOB, setChildDOB] = useState(formData?.ChildDetails?.ChildDOB);
    const [Gender, selectGender] = useState(formData?.ChildDetails?.Gender);
    const [aliveChildrenNo, setaliveChildrenNo] = useState(formData?.ChildDetails?.aliveChildrenNo);
    const [ChildFirstNameEn, setChildFirstNameEn] = useState(formData?.ChildDetails?.ChildFirstNameEn);
    const [ChildMiddleNameEn, setChildMiddleNameEn] = useState(formData?.ChildDetails?.ChildMiddleNameEn);
    const [ChildLastNameEn, setChildLastNameEn] = useState(formData?.ChildDetails?.ChildLastNameEn);
    const [BirthWeight, setBirthWeight] = useState(formData?.MultipleBirthDetails?.BirthWeight);
    const [BirthHeight, setBirthHeight] = useState(formData?.MultipleBirthDetails?.BirthHeight);

    // const [ChildFirstNameMl, setChildFirstNameMl] = useState(formData?.ChildDetails?.ChildFirstNameMl);
    // const [ChildMiddleNameMl, setChildMiddleNameMl] = useState(formData?.ChildDetails?.ChildMiddleNameMl);
    // const [ChildLastNameMl, setChildLastNameMl] = useState(formData?.ChildDetails?.ChildLastNameMl);

    const [tripStartTime, setTripStartTime] = useState(formData?.ChildDetails?.tripStartTime);
    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  
    let menu = [];
    Menu &&
      Menu.map((genderDetails) => {
        menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
      });
  
    const onSkip = () => onSelect();

    function setSelectaliveChildrenNo(e) {
        setaliveChildrenNo(e.target.value);
      }
    function setselectGender(value) {
      selectGender(value);
    }   
    function setselectChildDOB(value) {
      setChildDOB(value);
    }
    function setSelectChildFirstNameEn(e) {
      setChildFirstNameEn(e.target.value);
    }
    function setSelectChildMiddleNameEn(e) {
      setChildMiddleNameEn(e.target.value);
    }
    function setSelectChildLastNameEn(e) {
      setChildLastNameEn(e.target.value);
    }
    function setSelectBirthWeight(e) {
        setBirthWeight(e.target.value);
    }
    function setSelectBirthHeight(e) {
        setBirthHeight(e.target.value);
    }
    // function setSelectChildFirstNameMl(e) {
    //   setChildFirstNameMl(e.target.value);
    // }
    // function setSelectChildMiddleNameMl(e) {
    //   setChildMiddleNameMl(e.target.value);
    // }
    // function setSelectChildLastNameMl(e) {
    //   setChildLastNameMl(e.target.value);
    // }
   

    const handleTimeChange = (value, cb) => {
      if (typeof value === 'string') {
        cb(value);
        setTripStartTime(value);
      }
    }
    const goNext = () => {
      sessionStorage.setItem("ChildDOB", ChildDOB);
      sessionStorage.setItem("tripStartTime", tripStartTime);
      sessionStorage.setItem("Gender",Gender?Gender.code:null);
      sessionStorage.setItem("aliveChildrenNo", aliveChildrenNo);
      sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn);
      sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn);
      sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn);      
    //   sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl);
    //   sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl);
    //   sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl);
    sessionStorage.setItem("BirthWeight", BirthWeight);
    sessionStorage.setItem("BirthHeight", BirthHeight);
      
      onSelect(config.key, { aliveChildrenNo, ChildDOB, tripStartTime, Gender, ChildFirstNameEn, ChildMiddleNameEn, ChildLastNameEn, BirthWeight, BirthHeight});
    }
    if (isLoading ){
      return <Loader></Loader>;
    }
    return (
      <React.Fragment>
        {window.location.href.includes("/citizen") ? <Timeline /> : null}
        {window.location.href.includes("/employee") ? <Timeline /> : null}
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ChildDOB || !Gender}>
  
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MULTIPLE_BIRTH")}`}</span> </h1>
            </div>
          </div>
          <div className="row">
          <div className="col-md-4"> <CardLabel>{`${t("CR_ALIVE_CHILDRENS")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="aliveChildrenNo" value={aliveChildrenNo} onChange={setSelectaliveChildrenNo} disable={isEdit} placeholder={`${t("CR_ALIVE_CHILDRENS")}`} {...(validation = { pattern: "^([0-9]){1}$", isRequired: false, type: "text", title: t("CR_INVALID_ALIVE_CHILDRENS") })} />
            </div>
            <div className="col-md-2" ><CardLabel>{t("CR_DATE_OF_BIRTH_TIME")}<span className="mandatorycss">*</span></CardLabel>
              <DatePicker date={ChildDOB} name="ChildDOB" onChange={setselectChildDOB} placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`} />
  
            </div>
            <div className="col-md-2"  ><CardLabel>{t("Time of Birth")}</CardLabel>
              <CustomTimePicker name="tripStartTime" onChange={val => handleTimeChange(val, setTripStartTime)} value={tripStartTime} />
            </div>
            <div className="col-md-4" > <CardLabel>{`${t("CR_GENDER")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown t={t} optionKey="code" isMandatory={true} option={menu} selected={Gender} select={setselectGender} disabled={isEdit} placeholder={`${t("CR_GENDER")}`} {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })} />
            </div>
           
          </div>
          
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAME_OF_CHILD")}`}</span> </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" > <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameEn" value={ChildFirstNameEn} onChange={setSelectChildFirstNameEn} disable={isEdit} placeholder={`${t("CR_FIRST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_FIRST_NAME_EN") })} />
            </div>
            <div className="col-md-4" > <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameEn" value={ChildMiddleNameEn} onChange={setSelectChildMiddleNameEn} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_EN") })} />
            </div>
            <div className="col-md-4" > <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildLastNameEn" value={ChildLastNameEn} onChange={setSelectChildLastNameEn} disable={isEdit} placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_EN") })} />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-4" > <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameMl" value={ChildFirstNameMl} onChange={setSelectChildFirstNameMl} disable={isEdit} placeholder={`${t("CR_FIRST_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_FIRST_NAME_ML") })} />
            </div>
            <div className="col-md-4" > <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameMl" value={ChildMiddleNameMl} onChange={setSelectChildMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_MIDDLE_NAME_ML") })} />
            </div>
            <div className="col-md-4" > <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildLastNameMl" value={ChildLastNameMl} onChange={setSelectChildLastNameMl} disable={isEdit} placeholder={`${t("CR_LAST_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_LAST_NAME_ML") })} />
            </div>
          </div> */}
          {/* <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_STATISTICAL_INFORMATION")}`}</span> </h1>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-md-12" >
                        <div className="col-md-6" ><CardLabel>{t("CR_BIRTH_WEIGHT")}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthWeight" value={BirthWeight} onChange={setSelectBirthWeight} disable={isEdit} {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_WEIGHT") })} />
                        </div>
                        <div className="col-md-6" >
                            <CardLabel>{t("CR_BIRTH_HEIGHT")}<span className="mandatorycss">*</span></CardLabel>
                            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BirthHeight" value={BirthHeight} onChange={setSelectBirthHeight} disable={isEdit} {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_BIRTH_HEIGHT") })} />
                        </div>
                       
                        
                    </div>
                </div>
         
        </FormStep>
      </React.Fragment>
    );
  
  
  };
export default MultipleBirth;
