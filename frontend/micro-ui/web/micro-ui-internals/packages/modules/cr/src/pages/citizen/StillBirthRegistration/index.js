import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import StillBirthChildDetails from "../../../pageComponents/stillBirthComponents/StillBirthChildDetails";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";

const CreateStillBirthRegistration = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  //console.log(sessionStorage.getItem("CR_BIRTH_EDIT_FLAG"));
  // const [isEditBirth, setIsEditBirth] = useState(Object.keys(Digit.Hooks.useSessionStorage("CR_BIRTH_EDIT_FLAG", {})[0]).length > 0 ? true : false);
  const [isEditStillBirth, setIsEditStillBirth] = useState(sessionStorage.getItem("CR_STILLBIRTH_EDIT_FLAG")? true : false);
  const [params, setParams, clearParams] = isEditStillBirth ? Digit.Hooks.useSessionStorage("CR_EDIT_STILLBIRTH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_STILLBIRTH_REG", {});
  // console.log("params"+JSON.stringify(params));
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;

  // newConfig = newConfigCR;
  // newConfig?.forEach((obj) => {
  //   config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  // });
  // config.indexRoute = "child-details";
  newConfig = newConfigCR;
  const stillbirthConfig = newConfig.find((item)=> item.head === "StillBirth Routing");
  config = config.concat(stillbirthConfig.body.filter((a) => !a.hideInCitizen));
  config.indexRoute = "stillbirth-child-details";
  
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
    // console.log(data);
    // console.log(data?.ChildDetails[0].applicationNumber);
    if(isEditStillBirth === false){
      clearParams();
    }    
    // sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_STILLBIRTH_REG");

  };
  const handleSkip = () => { };
  const handleMultiple = () => { };
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("StillBirthCheckPage");
  const StillBirthAcknowledgement = Digit?.ComponentRegistryService?.getComponent("StillBirthAcknowledgement");
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
          <StillBirthAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default CreateStillBirthRegistration;