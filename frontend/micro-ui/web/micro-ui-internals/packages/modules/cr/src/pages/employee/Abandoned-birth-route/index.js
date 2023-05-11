import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";
import AbandonedChildDetails from "../../../pageComponents/abandonedBirthComponents/AbandonedChildDetails";

const CreateAbandonedBirth = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  // const [params, setParams, clearParams] = isEditAbandonedBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_ABANDONEDBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDBIRTH_REG", {});
  const [isEditAbandonedBirth, setIsEditAbandonedBirth] = useState(sessionStorage.getItem("CR_ABANDONEDBIRTH_EDIT_FLAG")? true : false);
  // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDDEATH_REG", {});
  const [params, setParams, clearParams] = isEditAbandonedBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_ABANDONEDBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEBIRTH_REG", {});

  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;

  const abandonedbirthConfig = newConfig.find((item) => item.head === "AbandonedBirth Routing");
  config = config.concat(abandonedbirthConfig.body.filter((a) => !a.hideInCitizen));
  // newConfig?.forEach((obj) => {
  //   config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  // });

  config.indexRoute = "abandoned-child-details";
  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);

    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
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

  const onSuccess = (data) => {
    // console.log(isEditAbandonedBirth);
   
    if(isEditAbandonedBirth === false){
      clearParams();
    }  
    // sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_ABANDONEDBIRTH_REG");
  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const AbandonedBirthCheckPage = Digit?.ComponentRegistryService?.getComponent("AbandonedBirthCheckPage");
  const AbandonedBirthAcknowledgement = Digit?.ComponentRegistryService?.getComponent("AbandonedBirthAcknowledgement");
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
          <AbandonedBirthCheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <AbandonedBirthAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CreateAbandonedBirth;