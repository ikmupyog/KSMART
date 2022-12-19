import React, { useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BackButton,
  PrivateRoute,
  BreadCrumb,
  CommonDashboard,
  FormInputGroup,
  SubmitBar,
  CardLabel,
  CardLabelError,
  Dropdown,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SubType = ({ path, handleNext }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_SUB_TYPES", {});
  const [subtypeData, setSubtypeData] = useState({
    subtype: [],
    functionality: [],
  });
  const [showError, setShowError] = useState(false);
  //   console.log(state);
  let modules = state.common.modules;
  let stateInfo = state.common.stateInfo;
  //   console.log(path, modules);
  let subtypeOptions = [
    { name: "type1", value: "type1" },
    { name: "type2", value: "type2" },
  ];
  let functionalityOptions = [
    { label: "function1", value: "function1" },
    { label: "function2", value: "function2" },
  ];
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
  };
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
      handleNext();
    } else {
      setShowError(true);
    }
  };
  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    return code === "DFM" ? (
      <React.Fragment>
        {/* <div className="moduleLinkHomePage">
          <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
          <BackButton className="moduleLinkHomePageBackButton" />
          <h1>{t("Sub Type" .toUpperCase())}</h1>
        </div> */}
        <div className="moduleLinkHomePageModuleLinks">
          <div className="fileText">
            <h3>Choose file type</h3>
          </div>
          <div className="FileFlowWrapper">
            <CardLabel>{`${t("DFM_SUB_TYPE")}`}</CardLabel>
            <Dropdown
              // t={t}
              optionKey="name"
              // isMandatory={config.isMandatory}
              option={subtypeOptions}
              selected={subtypeData.subtype}
              placeholder={`${t("DFM_SUB_TYPE")}`}
              select={(e) => handleChange(e, "subtype")}
            />
            <CardLabel>{`${t("DFM_FUNCTIONALITY")}`}</CardLabel>
            <Dropdown
              // t={t}
              optionKey="name"
              // isMandatory={config.isMandatory}
              option={subtypeOptions}
              selected={subtypeData.functionality}
              placeholder={`${t("DFM_FUNCTIONALITY")}`}
              select={(e) => handleChange(e, "functionality")}
            />
            {/* <FormInputGroup
              type="Dropdown"
              handleChange={handleChange}
              t={t}
              value={subtypeData.subtype}
              name="functionality"
              label={`${t("DFM_FUNCTIONALITY")}`}
              selectOptions={functionalityOptions}
              hidePlaceholder={true}
            /> */}
            {showError ? <CardLabelError>{t("DFM_SELECT_FIELDS")}</CardLabelError> : null}
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
