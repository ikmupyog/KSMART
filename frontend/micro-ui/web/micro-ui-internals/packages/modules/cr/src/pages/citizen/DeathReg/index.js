import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import DeathCrFlow from "./DeathCrFlow";
import InformationDeath from "../../../pageComponents/deathComponents/InformationDeath";
// import DeathCorrection from "../DeathCorrection/index";
import ApplicationDetails from "../../../../../templates/ApplicationDetails";
import { newConfig as newConfigCR } from "../../../config/config";
// import Search from "../Search";
// import SpecifyCorrection from "../SpecifyCorrection";

const DeathCrFlowApp = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_DEATH_CREATE_TRADE", {});
  // let params1 = sessionStorage.getItem('CR_DEATH_CORRECTIONS')


  // useEffect(()=>{
  //   let InformationDeath ={
  //     "setIdCombo": {
  //         "name": "GST Registration Number",
  //         "namelocal": "‍‍‍ജി എസ്സ് ടി രെജിസ്ട്രേഷന്‍ നമ്പര്‍",
  //         "id": 11,
  //         "code": "MIDPROOF_GST_REGISTRATION_NUMBER",
  //         "active": true,
  //         "type": "COMMON"
  //     },
  //     "DeathDate": "2023-01-01",
  //     "DeathTime": "10:11",
  //     "FirstName": "dash",
  //     "MiddleName": "",
  //     "LastName": "",
  //     "MLFirstName": "മലയാളം",
  //     "MlMiddleName": "",
  //     "MlLastName": "",
  //     "Ageofbirth": "fdf",
  //     "AdharNo": "",
  //     "IdNo": "",
  //     "FromDate": "",
  //     "ToDate": "",
  //     "CommencementDate": "",
  //     "Gender": {
  //         "i18nKey": "CR_COMMON_GENDER_MALE",
  //         "code": "MALE",
  //         "value": "MALE"
  //     },
  //     "DeathTimeFrom": "",
  //     "DeathTimeTo": "",
  //     "setAgeUnit": {
  //         "name": "Years",
  //         "namelocal": "വർഷം",
  //         "code": "AGE_UNIT_YEARS",
  //         "id": 1,
  //         "active": true,
  //         "type": "BND"
  //     },
  //     "InformationDeath": {
  //         "setIdCombo": {
  //             "name": "GST Registration Number",
  //             "namelocal": "‍‍‍ജി എസ്സ് ടി രെജിസ്ട്രേഷന്‍ നമ്പര്‍",
  //             "id": 11,
  //             "code": "MIDPROOF_GST_REGISTRATION_NUMBER",
  //             "active": true,
  //             "type": "COMMON"
  //         },
  //         "DeathDate": "2023-01-01",
  //         "DeathTime": "10:11",
  //         "FirstName": "dash",
  //         "MiddleName": "ds",
  //         "LastName": "dsd",
  //         "MLFirstName": "മലയാളം",
  //         "MlMiddleName": "മലയാളം",
  //         "MlLastName": "മലയാളം",
  //         "Ageofbirth": 0,
  //         "AdharNo": "123456789012",
  //         "IdNo": "2323",
  //         "FromDate": "2023-01-03",
  //         "ToDate": "2023-01-02",
  //         "CommencementDate": "2023-01-16",
  //         "Gender": {
  //             "i18nKey": "CR_COMMON_GENDER_MALE",
  //             "code": "MALE",
  //             "value": "MALE"
  //         },
  //         "DeathTimeFrom": "11:11",
  //         "DeathTimeTo": "02:22",
  //         "setAgeUnit": {
  //             "name": "Years",
  //             "namelocal": "വർഷം",
  //             "code": "AGE_UNIT_YEARS",
  //             "id": 1,
  //             "active": true,
  //             "type": "BND"
  //         },
  //         "setTitle": {
  //             "name": "Smt.",
  //             "namelocal": "ശ്രീമതി",
  //             "code": "TITLE_SMT.",
  //             "id": 4,
  //             "titlecode": "F",
  //             "active": true,
  //             "type": "COMMON"
  //         },
  //         "setTitleB": {
  //             "name": "Shri.",
  //             "namelocal": "ശ്രീ",
  //             "code": "TITLE_SHRI.",
  //             "id": 3,
  //             "titlecode": "M",
  //             "active": true,
  //             "type": "COMMON"
  //         },
  //         "setNationality": {
  //             "name": "India ",
  //             "namelocal": "ഇന്‍ഡ്യ",
  //             "countrycode": "IND",
  //             "code": "COUNTRY_INDIA",
  //             "id": 77,
  //             "active": true,
  //             "type": "COMMON",
  //             "nationalityname": "Indian",
  //             "nationalitynamelocal": null
  //         },
  //         "setReligion": {
  //             "name": "Christian",
  //             "namelocal": "ക്രിസ്ത്യൻ",
  //             "migrationId": 2,
  //             "id": 2,
  //             "code": "RELIGION_CHRISTIAN",
  //             "active": true,
  //             "type": "COMMON"
  //         }
  //     }
  // }
  // setParams({ ...params, ...{ ["InformationDeath"]: { ...params["InformationDeath"], ...InformationDeath } } });
  // },[])
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  config.indexRoute = "information-death";
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
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_BIRTH");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const DeathCheckPage = Digit?.ComponentRegistryService?.getComponent("DeathCheckPage");
  const DeathAcknowledgement = Digit?.ComponentRegistryService?.getComponent("DeathAcknowledgement");
  const SearchCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchdeathcorrection");
  const DeathCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchDeathCorrectionRoute");

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
          <DeathCheckPage onSubmit={createProperty} value={params} />
        </Route>
        <Route path={`${match.path}/acknowledgement`}>
          <DeathAcknowledgement data={params} onSuccess={onSuccess} />
        </Route>
        <Route path={`${path}`} exact>
             <InformationDeath parentUrl={path} />
        </Route>
        {/* <PrivateRoute parentRoute={path} path={`${path}/${config.indexRoute}`} component={() => <InformationDeath parentUrl={path} />} /> */}
        {/* <PrivateRoute  parentRoute={path} path={`${path}/$search-correction/application`} component={() => < parentUrl={path} />} /> */}
        {/* <PrivateRoute path={`${path}/search-correction/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/death-information`} component={(props) => <DeathCorrection {...props} parentRoute={path} />} /> */}

        {/* <PrivateRoute path={`${path}/search/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default DeathCrFlowApp;
