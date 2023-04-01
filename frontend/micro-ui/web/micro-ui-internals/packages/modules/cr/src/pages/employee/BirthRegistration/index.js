import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";

const CreateBirthEmp = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  console.log(sessionStorage.getItem("CR_BIRTH_EDIT_FLAG"));
  const [isEditBirth, setIsEditBirth] = useState(sessionStorage.getItem("CR_BIRTH_EDIT_FLAG")? true : false);  
  const [params, setParams, clearParams] = isEditBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_BIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_BIRTH_REG", {});
  console.log("isEditBirth" + isEditBirth);
  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  const birthConfig = newConfig.find((item)=> item.head === "Birth Routing");

  config = config.concat(birthConfig.body.filter((a) => !a.hideInCitizen));

  config.indexRoute = "child-details";
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
    queryClient.invalidateQueries("CR_CREATE_BIRTH_REG");
  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("BirthCheckPage");
  const BirthAcknowledgement = Digit?.ComponentRegistryService?.getComponent("BirthAcknowledgement");
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
                isEditBirth={isEditBirth}
              />
            </Route>

          );
        })}
        <Route path={`${match.path}/check`}>
          <CheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <BirthAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>

      </Switch>
    </React.Fragment>
  );
};

export default CreateBirthEmp;