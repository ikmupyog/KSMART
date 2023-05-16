import React, { useState,useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Toast } from "@egovernments/digit-ui-react-components";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig as newConfigTL } from "../../../config/config";
// import CheckPage from "./CheckPage";
// import TLAcknowledgement from "./TLAcknowledgement";

const CancelTradeLicence = ({ parentRoute, isRenewal }) => {
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("TL_CANCELATION_TRADE", {}); //: Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});
  const stateId = Digit.ULBService.getStateId();
  const [errorMessage, setErrorMessage] = useState( Digit.SessionStorage.get("TL_CORRECTION_VALIDATE_MSG"));
  let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});

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
    if (isPTCreateSkip && nextStep === "acknowledge-create-property") {
      nextStep = "map";
    }
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);


  };

  

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }

  const handleSkip = () => { };
  const handleMultiple = () => { };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    sessionStorage.removeItem("TL_CANCELLATION_TRADE");
    queryClient.invalidateQueries("TL_CREATE_TRADE");
  };

  newConfig = newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  newConfig = newConfigTL;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });

  config.indexRoute = "license-cancellation-root";
  const TLAcknowledgement = Digit?.ComponentRegistryService?.getComponent("TLCancellationAcknowledgement");
 
    return (
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
        {/* {toast && (
          <Toast
            error={toast}
            label={errorMessage}
            onClose={() => setToast(false)}
          />
        )}{""} */}
            </Route>
          );
        })}
        
        <Route path={`${match.path}/acknowledgement`}> 
          <TLAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route> 
      </Switch>
    );
};

export default CancelTradeLicence;
