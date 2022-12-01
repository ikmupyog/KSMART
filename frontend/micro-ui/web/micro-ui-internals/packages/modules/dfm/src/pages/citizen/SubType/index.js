import React,{useState} from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton, PrivateRoute, BreadCrumb, CommonDashboard ,FormInputGroup,SubmitBar} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CreateTradeLicence from '../Create'

const SubType = ({ path ,handleNext}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_SUB_TYPES", {});
  const [subtypeData,setSubtypeData] = useState({
    subtype:[],
    functionality:[],
  })
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
    handleNext()
  }
  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    return code === "DFM" ? (
      <React.Fragment>
        <div className="moduleLinkHomePage">
          <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
          <BackButton className="moduleLinkHomePageBackButton" />
          <h1>{t("Sub Type" .toUpperCase())}</h1>
          {/* <h1>{t("MODULE_" + code.toUpperCase())}</h1> */}
        </div>
        <div className="moduleLinkHomePageModuleLinks">
       <div className="FileFlowWrapper">
       <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="subtype" label="Sub Type"
            selectOptions={subtypeOptions} 
        />
       <FormInputGroup 
            type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="functionality" label="Functionality"
            selectOptions={functionalityOptions} 
        />
        <SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmit} />
       </div>
        </div>
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
