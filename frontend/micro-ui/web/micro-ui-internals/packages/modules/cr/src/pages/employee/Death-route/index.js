import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import DeathCrFlow from "./DeathCrFlow";
import InformationDeath from "../../../pageComponents/deathComponents/InformationDeath";
// import DeathCorrection from "../DeathCorrection/index";
import ApplicationDetails from "../../../../../templates/ApplicationDetails";
import { newConfig as newConfigCR } from "../../../config/config";
// import Search from "../Search";
import SpecifyCorrection from "../SpecifyCorrection";
import InformationDeathAband from "../../../pageComponents/deathAbandoned/InformationDeathAband";
import AddressDeath from "../../../pageComponents/deathAbandoned/AddressDeath";
// const CrFlowApp = ({ parentUrl, isEditBirth}) => {

const DeathCrFlowApp = ({ parentUrl,  props, }) => {
  // console.log(JSON.stringify(props));
  // console.log(window.location.href.includes("isEditDeath"));
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isEditDeath, setIsEditDeath] = useState(sessionStorage.getItem("CR_DEATH_EDIT_FLAG")? true : false);
  // console.log(sessionStorage.getItem("CR_DEATH_EDIT_FLAG"));
  const [params, setParams, clearParams] = isEditDeath ? Digit.Hooks.useSessionStorage("CR_DEATH_EDIT", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_DEATH", {});

  // console.log(isEditDeath);
  // let params1 = sessionStorage.getItem('CR_DEATH_CORRECTIONS')
  //death-emp-edit
  // console.log('para',params);
 
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
const abandonedDeathConfig = newConfig?.find((obj) => obj.head === "Abandoned-Death Routing");

config = config.concat(abandonedDeathConfig.body.filter((a) => !a. hideInEmployee));

  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a. hideInEmployee));
  });
  config.indexRoute = "information-death";
  config.indexRouteA = "abandoned-information-death";

  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    // if (typeof nextStep == "object" && nextStep != null) {
    //   if((params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && (nextStep[sessionStorage.getItem("isAccessories")] && nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")  )
    //   {
    //     nextStep = "property-details";
    //   }
    //   if (
    //     nextStep[sessionStorage.getItem("isAccessories")] &&
    //     (nextStep[sessionStorage.getItem("isAccessories")] === "accessories-details" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "map" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "owner-ship-details" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")
    //   ) {
    //     nextStep = `${nextStep[sessionStorage.getItem("isAccessories")]}`;
    //   } else if (
    //     nextStep[sessionStorage.getItem("StructureType")] &&
    //     (nextStep[sessionStorage.getItem("StructureType")] === "Building-type" ||
    //       nextStep[sessionStorage.getItem("StructureType")] === "vehicle-type")
    //   ) {
    //     nextStep = `${nextStep[sessionStorage.getItem("setPlaceofActivity")]}`;
    //     nextStep = `${nextStep[sessionStorage.getItem("StructureType")]}`;
    //   } else if (
    //     nextStep[sessionStorage.getItem("KnowProperty")] &&
    //     (nextStep[sessionStorage.getItem("KnowProperty")] === "search-property" ||
    //       nextStep[sessionStorage.getItem("KnowProperty")] === "create-property")
    //   ) {
    //       if(nextStep[sessionStorage.getItem("KnowProperty")] === "create-property" && !enableCreate)
    //       {
    //         nextStep = `map`;
    //       }
    //       else{
    //      nextStep = `${nextStep[sessionStorage.getItem("KnowProperty")]}`;
    //       }
    //   }
    // }
    // if( (params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && nextStep === "know-your-property" )
    // {
    //   nextStep = "property-details";
    // }
    // let redirectWithHistory = history.push;
    // if (skipStep) {
    //   redirectWithHistory = history.replace;
    // }
    // if (isAddMultiple) {
    //   nextStep = key;
    // }
    // if (nextStep === null) {
    //   return redirectWithHistory(`${match.path}/check`);
    // }
    // if(isPTCreateSkip && nextStep === "acknowledge-create-property")
    // {
    //   nextStep = "map";
    // }
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
    // console.log("next path",`${match.path}/${nextStep}`);
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    // console.log("reachedd");
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  // console.log("match.path" + match.path);
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_DEATH");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const DeathCheckPage = Digit?.ComponentRegistryService?.getComponent("DeathCheckPage");
  const AbandonedDeathCheckPage = Digit?.ComponentRegistryService?.getComponent("AbandonedDeathCheckPage");
  const AbandonedDeathAcknowledgement =Digit?.ComponentRegistryService?.getComponent("AbandonedDeathAcknowledgement");
  const DeathAcknowledgement = Digit?.ComponentRegistryService?.getComponent("DeathAcknowledgement");
  const SearchCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchdeathcorrection");
  const DeathCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchDeathCorrectionRoute");
  const InformationDeathEdit = Digit?.ComponentRegistryService?.getComponent("InformationDeath");
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
{config.indexRouteA?
  <Route path={`${match.path}/check`}>
          <AbandonedDeathCheckPage onSubmit={createProperty} value={params} />
        </Route>
        :
        <Route path={`${match.path}/check`}>
          <DeathCheckPage onSubmit={createProperty} value={params} />
        </Route>
}
        {/* <Route path={`${match.path}/check`}>
          <DeathCheckPage onSubmit={createProperty} value={params} />
        </Route> */}
        {
          config.indexRouteA?
          <Route path={`${match.path}/acknowledgement`}>
          <AbandonedDeathAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
          
          :
          <Route path={`${match.path}/acknowledgement`}>
          <DeathAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        }
        {/* <Route path={`${match.path}/acknowledgement`}>
          <DeathAcknowledgement data={params} onSuccess={onSuccess} />
        </Route> */}
        <Route path={`${path}`} exact>
          <DeathCrFlow path={path} data={params}/>
        </Route>
        <PrivateRoute parentRoute={path} path={`${path}/${config.indexRoute}`} component={() => <InformationDeath parentUrl={path}  />} />
        <PrivateRoute parentRoute={path} path={`${path}/${config.indexRouteA}`} component={() => <InformationDeathAband parentUrl={path}  />} />
        {/* <PrivateRoute parentRoute={path} path={`${path}/${config.indexRouteA}`} component={() => <AddressDeath parentUrl={path}  />} /> */}
        {/* <PrivateRoute  parentRoute={path} path={`${path}/$search-correction/application`} component={() => < parentUrl={path} />} /> */}
        <PrivateRoute path={`${path}/search-correction/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/death-information`} component={(props) => <DeathCorrection {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/specify-correction`} component={(props) => <SpecifyCorrection {...props} parentRoute={path} />} />
        {/* <PrivateRoute  path={`${path}/death-emp-edit`}  component={() => <InformationDeathEdit parentUrl={path} />} /> */}
        {/* <PrivateRoute path={`${path}/search/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default DeathCrFlowApp;
