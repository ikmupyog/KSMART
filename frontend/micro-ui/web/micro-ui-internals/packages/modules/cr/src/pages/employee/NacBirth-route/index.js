import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";
import { convertToNACRegistration } from "../../../utils";

const CreateNACBirth = ({ data, parentUrl, isEditBirth }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const [isEditBirthNAC, setIsEditBirthNAC] = useState(sessionStorage.getItem("CR_BIRTH_NAC_EDIT_FLAG") ? true : false);
  const [params, setParams, clearParams] = isEditBirthNAC
    ? Digit.Hooks.useSessionStorage("CR_EDIT_NAC_BIRTH", {})
    : Digit.Hooks.useSessionStorage("CR_CREATE_NAC_BIRTH_REG", {});

  const stateId = Digit.ULBService.getStateId();
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  const newNacBirthConfig = newConfig.find((item) => item.head === "Birth-NAC Routing");

  config = config.concat(newNacBirthConfig.body.filter((a) => !a.hideInCitizen));

  config.indexRoute = "nac-download-details";
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
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_NAC_BIRTH_REG");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("BirthNACCheckPage");
  const BirthNACAcknowledgement = Digit?.ComponentRegistryService?.getComponent("BirthNACAcknowledgement");
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
        <Route path={`${match.path}/check`}>
          <CheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <BirthNACAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CreateNACBirth;
