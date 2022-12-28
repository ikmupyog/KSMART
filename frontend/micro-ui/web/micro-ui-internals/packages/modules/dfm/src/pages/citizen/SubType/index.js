import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton, PrivateRoute, BreadCrumb, FormStep, FormInputGroup, SubmitBar, CardLabel, Dropdown } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CreateTradeLicence from '../Create'

const SubType = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const { data: MajorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MajorFunction");
  const { data: SubFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "SubFunction");
  const { data: Function = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "Function");
  const { data: MinorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MinorFunction");
  const [MajorFunctionDet, setMajorFunctionDet] = useState(formData?.FatherInfoDetails?.MajorFunctionDet);
  const [SubFunctionDet, setSubFunctionDet] = useState(formData?.FatherInfoDetails?.SubFunctionDet);
  const [FunctionDet, setFunctionDet] = useState(formData?.FatherInfoDetails?.FunctionDet);
  const [MinorFunctionDet, setMinorFunctionDet] = useState(formData?.FatherInfoDetails?.MinorFunctionDet);

  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_SUB_TYPES", {});
  const [subtypeData, setSubtypeData] = useState({
    subtype: [],
    functionality: [],
  })
  const [showError, setShowError] = useState(false)
  //   console.log(state);
  let modules = state.common.modules;
  let stateInfo = state.common.stateInfo;
  //   console.log(path, modules);
  let subtypeOptions = [
    { label: "type1", value: "type1" },
    { label: "type2", value: "type2" },
  ]
  let functionalityOptions = [
    { label: "function1", value: "function1" },
    { label: "function2", value: "function2" },
  ]
  const handleChange = (text, type) => {
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
  const onSubmit = () => {
    // console.log('sub');
    if (subtypeData.subtype?.value && subtypeData.functionality?.value) {
      handleNext()
    } else {
      setShowError(true)
    }

  }
  // sessionStorage.setItem("FatherEducation", FatherEducation.code);
  // sessionStorage.setItem("FatherEducationSubject", FatherEducationSubject.code);
  // sessionStorage.setItem("FatherProfession", FatherProfession.code);
  // onSelect(config.key, {
  //     FatherFirstNameEn, FatherMiddleNameEn, FatherLastNameEn,
  //     FatherFirstNameMl, FatherMiddleNameMl, FatherLastNameMl, FatherAadhar, FatherEmail, FatherMobile, FatherEducation, FatherEducationSubject, FatherProfession
  // });
  let cmbSubFunction = [];
  SubFunction &&
    SubFunction["FileManagement"] &&
    SubFunction["FileManagement"].SubFunction.map((ob) => {
      cmbSubFunction.push(ob);
    });
  let cmbMajorFunction = [];
  MajorFunction &&
    MajorFunction["FileManagement"] &&
    MajorFunction["FileManagement"].MajorFunction.map((ob) => {
      cmbMajorFunction.push(ob);
    });
  let cmbFunction = [];
  Function &&
    Function["FileManagement"] &&
    Function["FileManagement"].Function.map((ob) => {
      cmbFunction.push(ob);
    });
  let cmbMinorFunction = [];
  MinorFunction &&
    MinorFunction["FileManagement"] &&
    MinorFunction["FileManagement"].MinorFunction.map((ob) => {
      cmbMinorFunction.push(ob);
    });

  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    function setSelectMajorFunctionDet(value) {
      setMajorFunctionDet(value);
    }
    function setSelectSubFunctionDet(value) {
      setSubFunctionDet(value);
    }
    function setSelectFunctionDet(value) {
      setFunctionDet(value);
    }
    function setSelectMinorFunctionDet(value) {
      setMinorFunctionDet(value);
    }

    const goNext = () => {
      // if(subtypeData.subtype?.value && subtypeData.functionality?.value){
      handleNext();
      // }else{
      //   setShowError(true)
      // }
      // sessionStorage.setItem("CurrentFinancialYear", FY);
      // onSelect(config.key, { applicationData });
      // console.log("d", applicationData);
    };
    return code === "DFM" ? (
      <React.Fragment>
        <FormStep t={t} config={config} onSelect={goNext}  >
          <div className="moduleLinkHomePage">
            <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
            <BackButton className="moduleLinkHomePageBackButton" />
            <h1>{t("Sub Type".toUpperCase())}</h1>
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

              {/* <div><CardLabel>{`${t("Major Function")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbMajorFunction} selected={MajorFunctionDet} select={setSelectMajorFunctionDet} />
              </div>
              <div ><CardLabel>{`${t("Sub Function")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbSubFunction} selected={SubFunctionDet} select={setSelectSubFunctionDet} />
              </div> */}
              <div ><CardLabel>{`${t("Function")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbFunction} selected={FunctionDet} select={setSelectFunctionDet} />
              </div>
              <div ><CardLabel>{`${t("Minor Function")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbMinorFunction} selected={MinorFunctionDet} select={setSelectMinorFunctionDet} />
              </div>
              {/* <BackButton className="btnksmart"/> */}
              <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={goNext} />
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
