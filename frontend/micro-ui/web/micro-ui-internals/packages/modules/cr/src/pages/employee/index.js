import React, { useState, useEffect } from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Inbox from "./Inbox";
// import NewApplication from "./NewApplication";
import Search from "./Search";
// import Response from "../Response";
import BirthCorrectionApplicationDetails from "./BirthCorrection";
import DeathCorrectionApplicationDetails from "./DeathCorrections";
import MarriageCorrectionApplicationDetails from "./MarriageCorrection";
import ApplicationDetails from "./ApplicationDetails";
import ApplicationAdoptionDetails from "./ApplicationAdoptionDetails";
import ApplicationAbandonedDeathDetails from "./ApplicationAbandonedDeathDetails";
import ApplicationDeathDetails from "./ApplicationDeathDetails";
import ApplicationDeathNACDetails from "./ApplicationDeathNACDetails";
import ApplicationStillBirthDetails from "./ApplicationStillBirthDetails";
import ApplicationNACBirthDetails from "./ApplicationNACBirthDetails";
import ApplicationBornOutsideIndiaDetails from "./ApplicationBornOutsideIndiaDetails";
import ApplicationAbandonedBirthDetails from "./ApplicationAbandonedBirthDetails";
import ApplicationMarriageDetails from "./ApplicationMarriageDetails";

import DeathCrFlow from "./Death-route";
import SearchFlow from "./Search-route";
import SearchInbox from "./Inbox-route";
import AbandonedDeathCrFlowApp from "./AbandonedDeath";
const CRBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const isSearch = location?.pathname?.includes("search");
  const isInbox = location?.pathname?.includes("inbox");
  const isApplicationSearch = location?.pathname?.includes("birthsearch/application");
  const isApplicationMarriageSearch = location?.pathname?.includes("marriagesearch/application");
  const isApplicationDeathSearch = location?.pathname?.includes("deathsearch/application");
  const isDeathCorrectSearch = location?.pathname?.includes("search-correction/application");
  const isSpecifyCorrectSearch = location?.pathname?.includes("death-flow/specify-correction");
  const isLicenceSearch = location?.pathname?.includes("search/license");
  const isEditApplication = location?.pathname?.includes("edit-application-details");
  const isRenewalApplication = location?.pathname?.includes("renew-application-details");
  const isApplicationDetails = location?.pathname?.includes("cr/application-details");
  const isApplicationDeathDetails = location?.pathname?.includes("cr/application-deathdetails");
  const isApplicationAbandeonedDeathDetails = location?.pathname?.includes("cr/application-abandoneddeathdetails");
  const isApplicationBirthDetails = location?.pathname?.includes("cr/application-birthdetails");
  const isApplicationAdoptionDetails = location?.pathname?.includes("cr/application-Adoptiondetails");
  const isApplicationStillBirthDetails = location?.pathname?.includes("cr/application-stillbirth");
  const isApplicationNACBirthDetails = location?.pathname?.includes("cr/application-nacbirth");
  const isApplicationBornOutsideIndiaDetails = location?.pathname?.includes("cr/application-bornOutsideIndia");
  const isApplicationAbandonedBirthDetails = location?.pathname?.includes("cr/application-abandonedbirth");
  const isNewApplication = location?.pathname?.includes("tl/new-application");
  const isResponse = location?.pathname?.includes("tl/response");
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isSearchFlow = location?.pathname?.includes("search-flow");
  const isInboxFlow = location?.pathname?.includes("inbox-flow");
  const isBirthInboxFlow = location?.pathname?.includes("birthinbox");
  const isDeathInboxFlow = location?.pathname?.includes("deathinbox");
  const isCrFlow = location?.pathname?.includes("cr-flow");
  const isChildDetails = location?.pathname?.includes("/create-birth/child-details");
  const isAdoptionChildDetails = location?.pathname?.includes("/create-adoption/adoption-child-details");
  const isAdoptionParentDetails = location?.pathname?.includes("/create-adoption/adoption-parents-details");
  const isAdoptionAddressdDetails = location?.pathname?.includes("/create-adoption/adoption-address-birth");
  const isDeathFlow = location?.pathname?.includes("death-flow");
  const isDeathDetails = location?.pathname?.includes("information-death");
  const isAbandonedDeathDetails = location?.pathname?.includes("abandoned-death-information");
  const isAbandonedChildDetails = location?.pathname?.includes("abandoned-child-details");
  const isSearchRegistry = location?.pathname?.includes("search-registry");

  const [search, setSearch] = useState(false);

  const locationsForTLEmployee = window.location.href;
  const breadCrumbUrl = sessionStorage.getItem("breadCrumbUrl") || "";

  useEffect(() => {
    if (!search) {
      setSearch(isSearch);
    } else if (isInbox && search) {
      setSearch(false);
    }
  }, [location]);

  const breadCrumbUrls = sessionStorage.getItem("breadCrumbUrl") || "";

  const crumbs = [
    {
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true,
    },
    {
      path: "/digit-ui/employee/cr/search-flow",
      content: t("Search Application"),
      show: breadCrumbUrls.includes("search-flow") || isSearchFlow,
    },
    {
      path: "/digit-ui/employee/cr/inbox-flow",
      content: t("inbox-flow"),
      show: breadCrumbUrls.includes("inbox-flow") || isInboxFlow,
    },
    {
      path: "/digit-ui/employee/cr/inbox-flow/birthinbox",
      content: t("birthinbox"),
      show: breadCrumbUrls.includes("inbox-flow/birthinbox") || isBirthInboxFlow,
    },
    {
      path: "/digit-ui/employee/cr/inbox-flow/deathinbox",
      content: t("deathinbox"),
      show: breadCrumbUrls.includes("inbox-flow/deathinbox") || isDeathInboxFlow,
    },
    {
      path: "/digit-ui/employee/cr/cr-flow",
      content: t("Birth Registration"),
      show: breadCrumbUrls.includes("cr-flow") || isCrFlow,
    },
    {
      path: "digit-ui/employee/cr/create-birth/child-details",
      content: t("Child Details"),
      show: breadCrumbUrls.includes("create-birth/child-details") || isChildDetails,
    },
    {
      path: "digit-ui/employee/cr/create-adoption/adoption-child-details",
      content: t("Adoption Child Details"),
      show: breadCrumbUrls.includes("create-adoption/adoption-child-details") || isAdoptionChildDetails,
    },
    {
      path: "digit-ui/employee/cr/create-adoption/adoption-parents-details",
      content: t("Adoption Parent Details"),
      show: breadCrumbUrls.includes("create-adoption/adoption-parents-details") || isAdoptionParentDetails,
    },
    {
      path: "digit-ui/employee/cr/create-adoption/adoption-address-birth",
      content: t("Adoption Address Details"),
      show: breadCrumbUrls.includes("create-adoption/adoption-address-birth") || isAdoptionAddressdDetails,
    },
    {
      path: "/digit-ui/employee/abandoned-child-details",
      content: t("Abandoned Child Details"),
      show: breadCrumbUrls.includes("abandoned-child-details") || isAbandonedChildDetails,
    },
    {
      path: "/digit-ui/employee/cr/death-flow",
      content: t("Death Registration"),
      show: breadCrumbUrls.includes("death-flow") || isDeathFlow,
    },
    {
      path: "/digit-ui/employee/cr/death-flow/information-death",
      content: t("Death Information"),
      show: breadCrumbUrls.includes("death-flow/information-death") || isDeathDetails,
    },
    {
      path: "/digit-ui/employee/cr/death-flow/Abandoned-death/abandoned-death-information",
      content: t("Abandoned Death"),
      show:  breadCrumbUrls.includes("death-flow/Abandoned-death/abandoned-death-information")||isAbandonedDeathDetails,
    },
    {
      path: "/digit-ui/employee/cr/search-flow/birthsearch/application",
      content: t("Birth Applications"),
      show: isApplicationSearch || breadCrumbUrls.includes("home/search-flow/birthsearch"),
    },
    {
      path: "/digit-ui/employee/cr/search-flow/marriagesearch/application",
      content: t("Marriage Applications"),
      show: isApplicationMarriageSearch || breadCrumbUrls.includes("home/search-flow/marriagesearch"),
    },
    {
      path: "/digit-ui/employee/cr/deathsearch/application",
      content: t("Death Applications"),
      show: isApplicationDeathSearch || breadCrumbUrls.includes("home/search-flow/deathsearch"),
    },
    {
      path: sessionStorage.getItem("applicationno") ? `/digit-ui/employee/cr/application-details/${sessionStorage.getItem("applicationno")}` : "",
      content: t("Birth Application Details"),
      show: isApplicationDetails || breadCrumbUrls.includes("home/application-details"),
    },
    {
      path: sessionStorage.getItem("deathApplicationNo")
        ? `/digit-ui/employee/cr/application-deathdetails/${sessionStorage.getItem("deathApplicationNo")}`
        : "",
      content: t("Death Application Details"),
      show: isApplicationDeathDetails || breadCrumbUrls.includes("home/application-deathdetails"),
    },
    {
      path: sessionStorage.getItem("deathApplicationNo")
        ? `/digit-ui/employee/cr/application-abandoneddeathdetails/${sessionStorage.getItem("deathApplicationNo")}`
        : "",
      content: t("Death Application Details"),
      show: isApplicationAbandeonedDeathDetails || breadCrumbUrls.includes("home/application-abandoneddeathdetails"),
    },
    {
      path: sessionStorage.getItem("deathApplicationNo")
        ? `/digit-ui/employee/cr/application-birthdetails/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("BIRTH_APPLICATION_DETAILS"),
      show: isApplicationBirthDetails || breadCrumbUrls.includes("home/application-birthdetails"),
    },
    {
      path: sessionStorage.getItem("deathApplicationNo")
        ? `/digit-ui/employee/cr/application-Adoptiondetails/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("ADOPTION_APPLICATION_DETAILS"),
      show: isApplicationAdoptionDetails || breadCrumbUrls.includes("home/application-Adoptiondetails"),
    },
    {
      path: sessionStorage.getItem("applicationno")
        ? `/digit-ui/employee/cr/application-stillbirth/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("STILL_BIRTH_APPLICATION_DETAILS"),
      show: isApplicationStillBirthDetails || breadCrumbUrls.includes("home/application-stillbirth"),
    },
    {
      path: sessionStorage.getItem("applicationno")
        ? `/digit-ui/employee/cr/application-nacbirth/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("NAC Birth Application Details"),
      show: isApplicationNACBirthDetails || breadCrumbUrls.includes("home/application-nacbirth"),
    },
    {
      path: sessionStorage.getItem("applicationno")
        ? `/digit-ui/employee/cr/application-bornOutsideIndia/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("Born Outside India Application Details"),
      show: isApplicationBornOutsideIndiaDetails || breadCrumbUrls.includes("home/application-bornOutsideIndia"),
    },
    {
      path: sessionStorage.getItem("applicationno")
        ? `/digit-ui/employee/cr/application-abandonedbirth/${sessionStorage.getItem("birthApplicationNo")}`
        : "",
      content: t("ABANDONED_BIRTH_APPLICATION_DETAILS"),
      show: isApplicationAbandonedBirthDetails || breadCrumbUrls.includes("home/application-abandonedbirth"),
    },
    {
      path: "/digit-ui/employee/cr/death-flow/specify-correction",
      content: t("Specify Correction"),
      show: isSpecifyCorrectSearch || breadCrumbUrls.includes("home/specify-correction"),
    },
    {
      path: "/digit-ui/employee/cr/death-flow/specify-correction/search-correction/application",
      content: t("ES_COMMON_SEARCH_APPLICATION"),
      show: isDeathCorrectSearch || breadCrumbUrls.includes("home/specify-correction/search-correction/application"),
    },

    {
      path: "/digit-ui/employee/cr/search/death-correction",
      content: t("TL_SEARCH_TRADE_HEADER"),
      show: isLicenceSearch || breadCrumbUrls.includes("home/death-correction") || breadCrumbUrls.includes("inbox/death-correction"),
    },
  ];

  return <BreadCrumb style={isMobile ? { display: "flex" } : {}} spanStyle={{ maxWidth: "min-content" }} crumbs={crumbs} />;
};

const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;

  const locationCheck =
    window.location.href.includes("employee/cr/new-application") ||
    window.location.href.includes("employee/cr/response") ||
    window.location.href.includes("employee/cr/edit-application-details") ||
    window.location.href.includes("employee/cr/renew-application-details");

  const Search = Digit?.ComponentRegistryService?.getComponent("CRSearch");
  const SearchCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchdeathcorrection");
  const EditAdoption = Digit?.ComponentRegistryService?.getComponent("CRCreateAdoptions");
  const CreateBirthEmp = Digit?.ComponentRegistryService?.getComponent("CreateBirthEmp");
  const CrFlowApp = Digit?.ComponentRegistryService?.getComponent("CrFlowApp");
  const ScrFlowApp = Digit?.ComponentRegistryService?.getComponent("ScrFlowApp");
  const CreateAbandonedBirth = Digit?.ComponentRegistryService?.getComponent("CreateAbandonedBirth");
  const CreateBornOutsideEmp = Digit?.ComponentRegistryService?.getComponent("CreateBornOutsideEmp");
  const CreateNACBirth = Digit?.ComponentRegistryService?.getComponent("CreateNACBirth");
  const CreateAdoption = Digit?.ComponentRegistryService?.getComponent("CRCreateAdoptions");
  const CreateMarriageRegistrationEmp = Digit?.ComponentRegistryService?.getComponent("CreateMarriageRegistrationEmp");

  const CreateDeathEmp = Digit?.ComponentRegistryService?.getComponent("CreateDeathEmp");
  const Response = Digit?.ComponentRegistryService?.getComponent("CRResponse");

  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container" style={locationCheck ? { width: "100%", marginLeft: "0px" } : { marginLeft: "0px" }}>
          <div style={locationCheck ? { marginLeft: "15px" } : {}}>
            <CRBreadCrumb location={location} />
          </div>
          <PrivateRoute parentRoute={path} path={`${path}/search-flow`} component={() => <SearchFlow parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/inbox-flow`} component={() => <SearchInbox parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/cr-flow`} component={() => <CrFlowApp parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/death-flow`} component={() => <DeathCrFlow parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/death-flow/Abandoned-death`} component={() => <AbandonedDeathCrFlowApp parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/cr-abflow`} component={() => <CrAbFlow parentUrl={url} />} />
          <PrivateRoute parentRoute={path} path={`${path}/cr-adoptionflow`} component={() => <EditAdoption parentUrl={url} />} />
{/*  */}
          <PrivateRoute path={`${path}/create-birth`} component={CreateBirthEmp} />
          <PrivateRoute path={`${path}/create-stillbirth`} component={ScrFlowApp} />
          <PrivateRoute path={`${path}/create-abandonedbirth`} component={CreateAbandonedBirth} />
          <PrivateRoute path={`${path}/create-bornoutsidebirth`} component={CreateBornOutsideEmp} />
          <PrivateRoute path={`${path}/create-nacbirthsearch`} component={CreateNACBirth} />
          <PrivateRoute path={`${path}/create-adoption`} component={CreateAdoption} />
          <PrivateRoute path={`${path}/cr-marriage-creation`} component={CreateMarriageRegistrationEmp} />

          <PrivateRoute path={`${path}/create-death`} component={CreateDeathEmp} />
          <PrivateRoute path={`${path}/response`} component={(props) => <Response {...props} parentRoute={path} />} />

          <PrivateRoute path={`${path}/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/birth-correction-details/:id/:type`} component={() => <BirthCorrectionApplicationDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/death-correction-details/:id`} component={() => <DeathCorrectionApplicationDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/marriage-correction-details/:id/:type`} component={() => <MarriageCorrectionApplicationDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/application-stillbirth/:id`} component={() => <ApplicationStillBirthDetails parentRoute={path} />} />
          <PrivateRoute
            path={`${path}/application-bornOutsideIndia/:id`}
            component={() => <ApplicationBornOutsideIndiaDetails parentRoute={path} />}
          />
          <PrivateRoute path={`${path}/application-abandonedbirth/:id`} component={() => <ApplicationAbandonedBirthDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/application-Adoptiondetails/:id`} component={() => <ApplicationAdoptionDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/application-deathdetails/:id`} component={() => <ApplicationDeathDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/application-nacbirth/:id`} component={() => <ApplicationNACBirthDetails parentRoute={path} />} />
          <PrivateRoute path={`${path}/application-deathnacdetails/:id`} component={() => <ApplicationDeathNACDetails parentRoute={path} />} />
          <PrivateRoute
            path={`${path}/application-abandoneddeathdetails/:id`}
            component={() => <ApplicationAbandonedDeathDetails parentRoute={path} />}
          />
          <PrivateRoute path={`${path}/application-marriagedetails/:id`} component={() => <ApplicationMarriageDetails parentRoute={path} />} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
