import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import OcrFlow from "./OcrFlow";
// import StillBirthChildDetails from "../../../pageComponents/stillBirthComponents/StillBirthChildDetails";
import BornOutsideChildDetails from "../../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import { newConfig as newConfigCR } from "../../../config/config";

const OcrFlowApp = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isEditBornOutsideBirth, setIsEditBornOutsideBirth] = useState(Digit.Hooks.useSessionStorage("CR_BORNOUTSIDEBIRTH_EDIT_FLAG", {})[0]);
  const [params, setParams, clearParams] = isEditBornOutsideBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_BORNOUTSIDEBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_BORNOUTSIDBIRTH_REG", {});

  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;

  newConfig = newConfigCR;
  const stillbirthConfig = newConfig.find((item) => item.head === "BornOutsideIndia Routing");
  config = config.concat(stillbirthConfig.body.filter((a) => !a.hideInCitizen));
  config.indexRoute = "born-outside-child-details";

  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);

    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/check`);
    }
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_BORNOUTSIDEBIRTH");
  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const BornOutsideBirthCheckPage = Digit?.ComponentRegistryService?.getComponent("BornOutsideBirthCheckPage");
  const BornOutsideBirthAcknowledgement = Digit?.ComponentRegistryService?.getComponent("BornOutsideBirthAcknowledgement");
  return (

    <React.Fragment>
      <Switch>
        {config.map((routeObj, index) => {
          const { component, texts, inputs, key, isSkipEnabled } = routeObj;
          const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
          return (
            <Route path={`${match.path}/${routeObj.route}`} key={index}>
              <Component
                config={{ texts, inputs, key, isSkipEnabled }}
                onSelect={handleSelect}
                onSkip={handleSkip}
                t={t}
                formData={params}
                onAdd={handleMultiple}
                userType="employee"
              />
            </Route>

          );
        })}
        <Route path={`${match.path}/check`}>
          <BornOutsideBirthCheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <BornOutsideBirthAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default ScrFlowApp;