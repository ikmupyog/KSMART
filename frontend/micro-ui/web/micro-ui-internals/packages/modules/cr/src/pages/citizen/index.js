import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import ChildDetails from "../../pageComponents/birthComponents/ChildDetails";
import StillBirthChildDetails from "../../pageComponents/stillBirthComponents/StillBirthChildDetails";
import BornOutsideChildDetails from "../../pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import InformationDeath from "../../pageComponents/deathComponents/InformationDeath";
import BirthCertificateSearch from "./BirthCertificate";
import BirthNacCertificateSearch from "./BirthNacCertificate";

import DeathCertificate from "./Certificate/DeathCertificate";
import DeathCertificateSearch from "./Certificate";
import { useTranslation } from "react-i18next";
import { newConfig as newConfigCR } from "../../config/config";
import CrCitizenFlowApp from "./BirthRegistration";
// import CreateBirthCertificate from "./Create";
// import CreateDeathCertificate from "./DeathReg";
import AbandonedChildDetails from "../../pageComponents/abandonedBirthComponents/AbandonedChildDetails";
import DeathCorrectionSummary from "../../pageComponents/deathComponents/DeathCorrectionEditPage/DeathCorrectionSummary";
import DeathNacCertificateSearch from "./DeathNacCertificate";
import ApplicationMarriageDetails from "../employee/ApplicationMarriageDetails";
import ApplicationDeathNACDetails from "../employee/ApplicationDeathNACDetails";
import EmployeeApplicationDeathDetails from "../employee/ApplicationDeathDetails";
import EmployeeApplicationBirthDetails from "../employee/ApplicationDetails";
const App = () => {
  const { path, url, ...match } = useRouteMatch();
  const [editFlag, setFlag] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_FLAG", false);
  let isSuccessScreen = window.location.href.includes("acknowledgement");
  // let isCommonPTPropertyScreen = window.location.href.includes("/tl/tradelicence/new-application/property-details");
  const ApplicationDetails = Digit.ComponentRegistryService.getComponent("CRCitizenApplicationDetails");
  const ApplicationDeathDetails = Digit.ComponentRegistryService.getComponent("CRDeathApplicationDetails");

  const CreateBirthRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateBirthRegistration");
  const CreateBirthNACRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateBirthNACRegistration");
  const CRCreateDeathNACRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateDeathNACRegistration");
  const CreateAdoption = Digit?.ComponentRegistryService?.getComponent("CRCreateAdoptions");
  const CreateStillBirthRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateStillBirthRegistration");
  const CreateAbandonedBirth = Digit?.ComponentRegistryService?.getComponent("CRCreateAbandonedBirth");
  const CreateBornOutsideRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateBornOutsideRegistration");
  const CreateDeathRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateDeathRegistration");
  const CreateMarriageRegistration = Digit?.ComponentRegistryService?.getComponent("CRCreateMarriageRegistration");
  const MyCRApplications = Digit?.ComponentRegistryService?.getComponent("MyCRApplications");
  const MyCRDeathApplications = Digit?.ComponentRegistryService?.getComponent("MyCRDeathApplications");
  const CRBirthInclusions = Digit?.ComponentRegistryService?.getComponent("CRBirthInclusions");
  const CRDeathInclusions = Digit?.ComponentRegistryService?.getComponent("CRDeathInclusions");
  const CRDeathCorrectionEditPage = Digit?.ComponentRegistryService?.getComponent("CRDeathCorrectionEditPage");

  const CRMarriageCorrection = Digit?.ComponentRegistryService?.getComponent("CRMarriageCorrection");
  // const MarriageInclusionEditPage = Digit?.ComponentRegistryService?.getComponent('MarriageInclusionEditPage');

  const MarriageCorrectionSummary = Digit?.ComponentRegistryService?.getComponent("MarriageCorrectionSummary");
  const CRMarriageCorrectionLoadPage = Digit?.ComponentRegistryService?.getComponent('CRMarriageCorrectionLoadPage');
  const SearchApplicationMarriage = Digit?.ComponentRegistryService?.getComponent('SearchApplicationMarriage');
  const DownloadMarriageCertificate = Digit?.ComponentRegistryService?.getComponent('DownloadMarriageCertificate');
  const CRBirthInclusionPage = Digit?.ComponentRegistryService?.getComponent('CRBirthInclusionPage');
  const CRBirthInclusionDetailsPage = Digit?.ComponentRegistryService?.getComponent('CRBirthInclusionDetailPage');
  const DeathCorrectionAcknowledgement = Digit?.ComponentRegistryService?.getComponent('DeathCorrectionAcknowledgement');
  const DeathCorrectionSummary = Digit?.ComponentRegistryService?.getComponent('DeathCorrectionSummary');
  const BirthInclusionAcknowledgement = Digit?.ComponentRegistryService?.getComponent('BirthInclusionAcknowledgement');
  const BirthInclusionSummary = Digit?.ComponentRegistryService?.getComponent('BirthInclusionSummary');
  const MarriageCorrectionAcknowledgement = Digit?.ComponentRegistryService?.getComponent("MarriageCorrectionAcknowledgement");


  React.useEffect(() => {
    setFlag(false);
  }, []);
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
          <PrivateRoute path={`${path}/marriage-correction-summary`} component={MarriageCorrectionSummary} />
          <PrivateRoute path={`${path}/birth-inclusion-summary`} component={BirthInclusionSummary} />
          <PrivateRoute path={`${path}/death-correction-summary`} component={DeathCorrectionSummary} />
          <PrivateRoute path={`${path}/marriage-correction-acknowledgement`} component={MarriageCorrectionAcknowledgement} />
          <PrivateRoute path={`${path}/cr-birth-creation`} component={CreateBirthRegistration} />
          <PrivateRoute path={`${path}/cr-name-inclusion`} component={CRBirthInclusions} />
          <PrivateRoute parentRoute={path} path={`${path}/birth-inclusion-edit`} component={CRBirthInclusionPage} />
          <PrivateRoute parentRoute={path} path={`${path}/birth-inclusion-details`} component={CRBirthInclusionDetailsPage} />
          <PrivateRoute parentRoute={path} path={`${path}/marriage-correction-edit`} component={CRMarriageCorrectionLoadPage} />
          <PrivateRoute path={`${path}/birth-inclusion-acknowledgement`} component={BirthInclusionAcknowledgement} />
          <PrivateRoute path={`${path}/death-correction-acknowledgement`} component={DeathCorrectionAcknowledgement} />
          <PrivateRoute path={`${path}/cr-birth-nac`} component={CreateBirthNACRegistration} />
          <PrivateRoute path={`${path}/cr-death-nac`} component={CRCreateDeathNACRegistration} />
          <PrivateRoute path={`${path}/cr-adoption`} component={CreateAdoption} />
          <PrivateRoute path={`${path}/cr-stillbirth-creation`} component={CreateStillBirthRegistration} />
          <PrivateRoute path={`${path}/cr-outsideindiabirth-creation`} component={CreateBornOutsideRegistration} />
          <PrivateRoute path={`${path}/cr-abandonedbirth-creation`} component={CreateAbandonedBirth} />
          <PrivateRoute path={`${path}/cr-death-creation`} component={CreateDeathRegistration} />
          <PrivateRoute path={`${path}/cr-marriage-creation`} component={CreateMarriageRegistration} />
          <PrivateRoute path={`${path}/cr/my-application`} component={MyCRApplications} />
          <PrivateRoute path={`${path}/cr/death/my-application`} component={MyCRDeathApplications} />
          <PrivateRoute path={`${path}/cr/marriage/my-application`} component={SearchApplicationMarriage} />
          <PrivateRoute path={`${path}/cr/marriage/download-certificate`} component={DownloadMarriageCertificate} />
          <PrivateRoute path={`${path}/cr/my-bills`} component={() => <MyCRApplications view="bills" />} />
          <PrivateRoute path={`${path}/cr/application/:id/:tenantId`} component={ApplicationDetails} />
          <PrivateRoute path={`${path}/cr/death/application/:id/:tenantId`} component={ApplicationDeathDetails} />
          <PrivateRoute path={`${path}/cr-death-inclusion`} component={CRDeathInclusions} />
          <PrivateRoute path={`${path}/cr-marriage-correction`} component={CRMarriageCorrection} />
          <PrivateRoute path={`${path}/create-death-certificate`} component={() => <DeathCertificateSearch parentUrl={path} />} />
          <PrivateRoute parentRoute={path} path={`${path}/create-birth-certificate`} component={() => <BirthCertificateSearch parentUrl={path} />} />
          <PrivateRoute parentRoute={path} path={`${path}/nac-birth-certificate`} component={() => <BirthNacCertificateSearch parentUrl={path} />} />
          <PrivateRoute parentRoute={path} path={`${path}/death-correction-edit`} component={CRDeathCorrectionEditPage} />
          <PrivateRoute parentRoute={path} path={`${path}/nac-death-certificate`} component={() => <DeathNacCertificateSearch parentUrl={path} />} />
          <PrivateRoute path={`${path}/my-application-marriage/:id`} component={() => <ApplicationMarriageDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/my-application-death-nac/:id`} component={() => <ApplicationDeathNACDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/my-application-death/:id`} component={() => <EmployeeApplicationDeathDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/my-application-birth/:id`} component={() => <EmployeeApplicationBirthDetails parentRoute={path} />} />
        </AppContainer>
      </Switch>
    </span>
  );
};

export default App;
