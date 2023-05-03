import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";
import InformationDeathAband from "../../../pageComponents/deathAbandoned/InformationDeathAband";


const AbandonedDeathCrFlowApp = ({ parentUrl,  props, }) => {

  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isEditDeath, setIsEditDeath] = useState(sessionStorage.getItem("CR_DEATH_EDIT_FLAG")? true : false);
  const [isEditAbandonedDeath, setIsEditAbandonedDeath] = useState(sessionStorage.getItem("CR_DEATH_AbandonedEDIT_FLAG")? true : false);
 
  const [params, setParams, clearParams] = isEditDeath ? Digit.Hooks.useSessionStorage("CR_DEATH_EDIT", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_DEATH", {});
  const [params1, setParams1, clearParams1] = isEditAbandonedDeath ? Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDDEATH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDDEATH", {});

 
  const stateId = Digit.ULBService.getStateId();
  
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
const abandonedDeathConfig = newConfig?.find((obj) => obj.head === "Abandoned-Death Routing");

config = config.concat(abandonedDeathConfig.body.filter((a) => !a. hideInEmployee));

  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a. hideInEmployee));
  });

  config.indexRouteA = "abandoned-death-information";

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
    setParams1({ ...params1, ...{ [key]: { ...params1[key], ...data } } });

    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_DEATH");
  };

  const onSuccessAbandoned = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_ABANDONEDDEATH");
  };
  
  const handleSkip = () => {};
  const handleMultiple = () => {};
 
  const AbandonedDeathCheckPage = Digit?.ComponentRegistryService?.getComponent("AbandonedDeathCheckPage");
  const AbandonedDeathAcknowledgement =Digit?.ComponentRegistryService?.getComponent("AbandonedDeathAcknowledgement");
 
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
                isEditDeath={isEditDeath}
              />
            </Route>
          );
        })}

     
  <Route path={`${match.path}/check`}>
          <AbandonedDeathCheckPage onSubmit={createProperty} value={params1} />
        </Route>
       
          <Route path={`${match.path}/acknowledgement`}>
          <AbandonedDeathAcknowledgement data={params1} onSuccess={onSuccessAbandoned} />
        </Route>
      
        <PrivateRoute parentRoute={path} path={`${path}/${config.indexRouteA}`} component={() => <InformationDeathAband parentUrl={path}  />} />
      </Switch>
    </React.Fragment>
  );
};

export default AbandonedDeathCrFlowApp;
