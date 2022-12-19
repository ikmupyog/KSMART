import React,{useState} from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton, PrivateRoute, BreadCrumb, CommonDashboard ,FormInputGroup,SubmitBar,CardLabel,Dropdown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CreateTradeLicence from '../Create'

const SubType = ({ path ,handleNext,formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const { data: Qualification = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
  const { data: QualificationSub = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
  const { data: Profession = {}, } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_SUB_TYPES", {});
  const [FatherProfession, setFatherProfession] = useState(formData?.FatherInfoDetails?.FatherProfession);
    const [FatherEducation, setFatherEducation] = useState(formData?.FatherInfoDetails?.FatherEducation);
    const [FatherEducationSubject, setFatherEducationSubject] = useState(formData?.FatherInfoDetails?.FatherEducationSubject);
  const [subtypeData,setSubtypeData] = useState({
    subtype:[],
    functionality:[],
  })
  const [showError,setShowError] = useState(false)
//   console.log(state);
  let modules = state.common.modules;
  let stateInfo = state.common.stateInfo;
//   console.log(path, modules);
  let subtypeOptions=[
    {label:"type1", value:"type1"},
    {label:"type2", value:"type2"},
  ]
  let functionalityOptions=[
    {label:"function1", value:"function1"},
    {label:"function2", value:"function2"},
  ]
  const handleChange =(text, type)=>{
    let tempdata = { ...subtypeData };
    if (type === "subtype") {
      tempdata.subtype = text;
      setSubtypeData(tempdata);
    }
    if (type === "functionality") {
      tempdata.functionality = text;
      setSubtypeData(tempdata);
    }
  }
  const cardMenuData = [
    {
      title: "Finance",
      subTitle: "Inbox",
    },

    {
      title: "Create",
      subTitle: "Inbox",
      link: `${path}/sub-type`,
      // link: `${path}/create`,
      // link: `${path}/form-ui`,
    },
    {
      title: "BPA",
      subTitle: "Inbox",
    },
    {
      title: "PGR",
      subTitle: "Inbox",
    },
    {
      title: "Pension",
      subTitle: "Inbox",
    },
    {
      title: "License-1",
      subTitle: "Inbox",
    },
    {
      title: " License-2",
      subTitle: "Inbox",
    },
  ];
  const onSubmit=()=>{
    // console.log('sub');
    if(subtypeData.subtype?.value && subtypeData.functionality?.value){
      handleNext()
    }else{
      setShowError(true)
    }
   
  }
        sessionStorage.setItem("FatherEducation", FatherEducation.code);
        sessionStorage.setItem("FatherEducationSubject", FatherEducationSubject.code);
        sessionStorage.setItem("FatherProfession", FatherProfession.code);
        onSelect(config.key, {
            FatherFirstNameEn, FatherMiddleNameEn, FatherLastNameEn,
            FatherFirstNameMl, FatherMiddleNameMl, FatherLastNameMl, FatherAadhar, FatherEmail, FatherMobile, FatherEducation, FatherEducationSubject, FatherProfession
        });
  let cmbQualification = [];
  Qualification &&
      Qualification["birth-death-service"] &&
      Qualification["birth-death-service"].Qualification.map((ob) => {
          cmbQualification.push(ob);
      });
  let cmbQualificationSub = [];
  QualificationSub &&
      QualificationSub["birth-death-service"] &&
      QualificationSub["birth-death-service"].QualificationSub.map((ob) => {
          cmbQualificationSub.push(ob);
      });
  let cmbProfession = [];
  Profession &&
      Profession["birth-death-service"] &&
      Profession["birth-death-service"].Profession.map((ob) => {
          cmbProfession.push(ob);
      });
  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    function setSelectFatherEducation(value) {
      setFatherEducation(value);
  }
  function setSelectFatherEducationSubject(value) {
      setFatherEducationSubject(value);
  }
  function setSelectFatherProfession(value) {
      setFatherProfession(value);
  }
    return code === "DFM" ? (
      <React.Fragment>
         <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!FatherFirstNameEn}>
        <div className="moduleLinkHomePage">
          <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
          <BackButton className="moduleLinkHomePageBackButton" />
          <h1>{t("Sub Type" .toUpperCase())}</h1>
          {/* <h1>{t("MODULE_" + code.toUpperCase())}</h1> */}
        </div>
        <div className="moduleLinkHomePageModuleLinks">
       <div className="FileFlowWrapper">

       {/* <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="subtype" label="Sub Type"
            selectOptions={subtypeOptions} 
        />
       <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="functionality" label="Functionality"
            selectOptions={functionalityOptions} 
        />
         {showError ? <CardLabelError>{t("Please Select SubType")}</CardLabelError> : null}
        <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmit} /> */}
        
                        <div><CardLabel>{`${t("Major Function")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={FatherEducation} select={setSelectFatherEducation}  />
                        </div>
                        <div ><CardLabel>{`${t("Sub Function")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualificationSub} selected={FatherEducationSubject} select={setSelectFatherEducationSubject} />
                        </div>
                        <div ><CardLabel>{`${t("Function")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={FatherProfession} select={setSelectFatherProfession}  />
                        </div>
                        <div ><CardLabel>{`${t("Minor Function")}`}<span className="mandatorycss">*</span></CardLabel>
                            <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={FatherProfession} select={setSelectFatherProfession}  />
                        </div>
                      <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmit} /> 
                    </div>
                </div>
                </FormStep>
      </React.Fragment>
    ) : (
      ""
    );
  });
  return (
    <React.Fragment>
      {ModuleLevelLinkHomePages}
      {/* <CommonDashboard title="Choose Submenu" data={cardMenuData} path={path}/> */}
     
      {/* <Switch>
      
        // <PrivateRoute parentRoute={path} path={`${path}/create`} component={() => <CreateTradeLicence parentUrl={path} />} />
      </Switch> */}
    </React.Fragment>
  );
};

export default SubType;
