import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import BornOutsideChildDetails from "../../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
//import BornOutsideChildDetails from "../../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";

const CreateBornOutsideRegistration =({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_CREATE_BORN_OUTSIDE_REG", {});

  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
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
      return redirectWithHistory(`${match.path}/born-outside-check`);
    }
    console.log("next page==",`${match.path}/${nextStep}`);
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    console.log("navigation key",key);
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
    queryClient.invalidateQueries("CR_CREATE_BORN_OUTSIDE_REG");
  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("BornOutsideCheckPage");
  const BornOutsideAcknowledgement = Digit?.ComponentRegistryService?.getComponent("BornOutsideAcknowledgement");
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
                userType="citizen"
              />
            </Route>

          );
        })}
        <Route path={`${match.path}/born-outside-check`}>
          <CheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <BornOutsideAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CreateBornOutsideRegistration;