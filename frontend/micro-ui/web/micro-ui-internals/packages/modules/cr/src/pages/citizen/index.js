import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch,useLocation,useHistory } from "react-router-dom";
import ChildDetails from "../../pageComponents/birthComponents/ChildDetails";
import StillBirthChildDetails from "../../pageComponents/stillBirthComponents/StillBirthChildDetails";
import BornOutsideChildDetails from "../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import InformationDeath from "../../pageComponents/deathComponents/InformationDeath";
import BirthCertificateSearch from "./BirthCertificate";
import DeathCertificate from "./Certificate/DeathCertificate";
import DeathCertificateSearch from "./Certificate";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../config/config";
import CrCitizenFlowApp from "./BirthRegistration";
// import CreateBirthCertificate from "./Create";
// import CreateDeathCertificate from "./DeathReg"; 

const App = () => {
  const { path, url, ...match } = useRouteMatch();
  let isSuccessScreen = window.location.href.includes("acknowledgement");
  // let isCommonPTPropertyScreen = window.location.href.includes("/tl/tradelicence/new-application/property-details");

  const CreateBirthRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateBirthRegistration');
  const CreateStillBirthRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateStillBirthRegistration');
  const CreateBornOutsideRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateBornOutsideRegistration');
  const CreateDeathRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateDeathRegistration');
  const CreateMarriageRegistration = Digit?.ComponentRegistryService?.getComponent('CRCreateMarriageRegistration');
  const MyCRApplications = Digit?.ComponentRegistryService?.getComponent('MyCRApplications');

  // const getBackPageNumber = () => {
  //   let goBacktoFromProperty = -1;
  //   if (
  //     sessionStorage.getItem("VisitedCommonPTSearch") === "true" &&
  //     (sessionStorage.getItem("VisitedAccessoriesDetails") === "true" || sessionStorage.getItem("VisitedisAccessories") === "true") &&
  //     isCommonPTPropertyScreen
  //   ) {
  //     goBacktoFromProperty = -4;
  //     sessionStorage.removeItem("VisitedCommonPTSearch");
  //     return goBacktoFromProperty;
  //   }
  //   return goBacktoFromProperty;
  // };


  return (
    <span className={"cr-citizen"}>
      <Switch>
      <AppContainer>
        <PrivateRoute path={`${path}/cr-birth-creation`} component={CreateBirthRegistration} />
        <PrivateRoute path={`${path}/cr-stillbirth-creation`} component={CreateStillBirthRegistration} />
        <PrivateRoute path={`${path}/cr-outsideindiabirth-creation`} component={CreateBornOutsideRegistration} />
        <PrivateRoute path={`${path}/cr-death-creation`} component={CreateDeathRegistration} />
        <PrivateRoute path={`${path}/cr-marriage-creation`} component={CreateMarriageRegistration} />
        <PrivateRoute path={`${path}/cr/my-application`} component={MyCRApplications} />
        <PrivateRoute path={`${path}/cr/my-bills`} component={() => <MyCRApplications view="bills" />} />
        <PrivateRoute path={`${path}/create-death-certificate`} component={() => <DeathCertificateSearch parentUrl={path}/>} /> 
        <PrivateRoute parentRoute={path} path={`${path}/create-birth-certificate`} component={() => <BirthCertificateSearch parentUrl={path} />} /> 
       </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
