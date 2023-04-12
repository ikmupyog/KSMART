// import React, { useState, useEffect } from "react";
// import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { newConfig as newConfigCR } from "../../../config/config";
// import { useQueryClient } from "react-query";

// const CreateAbandonedDeathEmp = ({ parentUrl }) => {
//   const { t } = useTranslation();
//   const { path } = useRouteMatch();
//   const match = useRouteMatch();  
//   const { pathname } = useLocation();
//   const history = useHistory();
//   const queryClient = useQueryClient();
//   const [isEditAbandonedDeath, setIsEditAbandonedDeath] = useState(sessionStorage.getItem("CR_DEATH_AbandonedEDIT_FLAG")? true : false);
//   const [params1, setParams1, clearParams1] = isEditAbandonedDeath ? Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDDEATH_REG", {}) : Digit.Hooks.useSessionStorage("CR_CREATE_ABANDONEDDEATH", {});

//   const stateId = Digit.ULBService.getStateId();
//   let config = [];
//   let { data: newConfig, isLoading } = true;

// //   newConfig = newConfigCR;
// //   const deathConfig = newConfig.find((item)=> item.head === "Death Routing");
// //   config = config.concat(deathConfig.body.filter((a) => !a.hideInCitizen));
// //   config.indexRoute = "information-death";

// const abandonedDeathConfig = newConfig?.find((obj) => obj.head === "Abandoned-Death Routing");

// config = config.concat(abandonedDeathConfig.body.filter((a) => !a. hideInEmployee));

//   newConfig?.forEach((obj) => {
//     config = config.concat(obj.body.filter((a) => !a. hideInEmployee));
//   });
//   config.indexRouteA = "abandoned-information-death";

//   const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
//     let currentPath = pathname.split("/").pop(),
//       nextPage;
//     let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
//     let { isCreateEnabled : enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    
//     let redirectWithHistory = history.push;
//     if (skipStep) {
//       redirectWithHistory = history.replace;
//     }
//     if (isAddMultiple) {
//       nextStep = key;
//     }
//     if (nextStep === null) {
//       return redirectWithHistory(`${match.path}/check`);
//     }
//     nextPage = `${match.path}/${nextStep}`;
//     redirectWithHistory(nextPage);
//   };

//   function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
//     setParams1({ ...params1, ...{ [key]: { ...params1[key], ...data } } });
//     if(key === "isSkip" && data === true)
//     {
//       goNext(skipStep, index, isAddMultiple, key, true);
//     }
//     else
//     {
//       goNext(skipStep, index, isAddMultiple, key);
//     }
//   }
//   const createProperty = async () => {
//     history.push(`${match.path}/acknowledgement`);
//   };
  
//   const onSuccess = () => {
//     sessionStorage.removeItem("CurrentFinancialYear");
//     queryClient.invalidateQueries("CR_CREATE_ABANDONEDDEATH");
//   };
//   const handleSkip = () => {};
//   const handleMultiple = () => {};
//   const AbandonedDeathCheckPage = Digit?.ComponentRegistryService?.getComponent("AbandonedDeathCheckPage");
//   const AbandonedDeathAcknowledgement =Digit?.ComponentRegistryService?.getComponent("AbandonedDeathAcknowledgement");
//   return (
    
//     <React.Fragment>
//       <Switch>
//        {config.map((routeObj, index) => {
//         const { component, texts, inputs, key, isSkipEnabled } = routeObj;
//         const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
//         return (
//           <Route path={`${match.path}/${routeObj.route}`} key={index}>
//             <Component
//               config={{ texts, inputs, key, isSkipEnabled }}
//               onSelect={handleSelect}
//               onSkip={handleSkip}
//               t={t}
//               formData={params1}
//               onAdd={handleMultiple}
//               userType="employee"
//             />
//            </Route>  
          
//         );
//       })}
//        <Route path={`${match.path}/check`}>
//        <AbandonedDeathCheckPage onSubmit={createProperty} value={params1} />
//       </Route>
//       <Route path={`${match.path}/acknowledgement`}>
//       <AbandonedDeathAcknowledgement data={params1} onSuccess={onSuccessAbandoned} />
//       </Route>
//       </Switch>
//     </React.Fragment>
//   );
// };

// export default CreateAbandonedDeathEmp;