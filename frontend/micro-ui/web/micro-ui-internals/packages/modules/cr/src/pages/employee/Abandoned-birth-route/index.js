import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch,useLocation,useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb,Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CrAbFlow from "./CrAbFlow";
import AbandonedChildDetails from "../../../pageComponents/abandonedBirthComponents/AbandonedChildDetails";
import { newConfig as newConfigCR } from "../../../config/config";

// import CrFlow from "./CrAbFlow";
// import ChildDetails from "../../../pageComponents/birthComponents/ChildDetails";

const CrAbFlowApp = ({ parentUrl}) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();  
  const { pathname } = useLocation();
  const history = useHistory();  
  const [isEditAbandonedBirth,setIsEditAbandonedBirth]=useState(Digit.Hooks.useSessionStorage("CR_ABANDONEDBIRTH_EDIT_FLAG", {})[0]);
  const [params, setParams, clearParams] = isEditAbandonedBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_ABANDONEDBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDBIRTH_REG", {});

  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  config.indexRoute = "abandoned-child-details";
  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled : enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
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
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if(key === "isSkip" && data === true)
    {
      goNext(skipStep, index, isAddMultiple, key, true);
    }
    else
    {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };
  
  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_ABANDONEDBIRTH");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("AbandonedBirthCheckPage");
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
              isEditAbandonedBirth={isEditAbandonedBirth}
            />
           </Route>  
          
        );
      })}
       <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} />
      </Route>
      <Route path={`${match.path}/acknowledgement`}>
        <AbandonedBirthAcknowledgement data={params} onSuccess={onSuccess} />
      </Route>
      <Route path={`${path}`} exact>
              <CrAbFlow  path={path}/>
             </Route>
             <PrivateRoute  parentRoute={path} path={`${path}/${config.indexRoute}`} component={() => <AbandonedChildDetails parentUrl={path}  />} />
         
      </Switch>
    </React.Fragment>
  );
};

export default CrAbFlowApp;