import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch,useLocation,useHistory,Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb,Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";

const CreateDeathNACRegistration = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();  
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_CREATE_DEATH_REG", {});

  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  config.indexRoute = "nac-death-download-details";
  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled : enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
   
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/nac-death-summary`);
    }
    nextPage = `${match.path}/${nextStep}`;
    console.log("nextPage",nextPage);
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if(key === "isSkip" && data === true)
    {
      console.log("handle skip==",skipStep, index, isAddMultiple, key);
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else
    {
      console.log("handle skip== else",skipStep, index, isAddMultiple, key);
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };
  
  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_DEATH_REG");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const DeathNACCheckPage = Digit?.ComponentRegistryService?.getComponent("CRCreateDeathNACRegistration");
  const DeathNACAcknowledgement = Digit?.ComponentRegistryService?.getComponent("DeathNACAcknowledgement");
  console.log("config==",config);
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
       <Route path={`${match.path}/nac-death-summary`}>
        <DeathNACCheckPage onSubmit={createProperty} value={params} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <DeathNACAcknowledgement data={params} onSuccess={onSuccess} />
      </Route>
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CreateDeathNACRegistration;
