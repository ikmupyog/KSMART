import { BackButton } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundaries";
import { AppHome } from "../../components/Home";
import TopBarSideBar from "../../components/TopBarSideBar";
import CitizenHome from "./Home";
import LanguageSelection from "./Home/LanguageSelection";
import LocationSelection from "./Home/LocationSelection";
import Login from "./Login";
import UserProfile from "./Home/UserProfile";
import Dashboard from "./Dashboard";
// import PDF from "../../assets/";

const getTenants = (codes, tenants) => {
  return tenants.filter((tenant) => codes.map((item) => item.code).includes(tenant.code));
};

const Home = ({
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  DSO,
  stateCode,
  modules,
  appTenants,
  sourceUrl,
  pathname,
}) => {
  const location = useLocation()
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  const pdfUrl = "https://pg-egov-assets.s3.ap-south-1.amazonaws.com/Upyog+Code+and+Copyright+License_v1.pdf"

  const appRoutes = modules.map(({ code, tenants }, index) => {
    const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
    return (
      <Route key={index} path={`${path}/${code.toLowerCase()}`}>
        <Module stateCode={stateCode} moduleCode={code} userType="citizen" tenants={getTenants(tenants, appTenants)} />
      </Route>
    );
  });

  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage,...others }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    let crBirth = "cr-birth"
    let Module_br = "Birth Certificate"
    let Module_dr = "Death Certificate"
    let crDeath = "cr-death"
    // console.log(code);
    return (
      <React.Fragment>
        {code === "CR" && location?.state?.module === crBirth ? (
          <Route key={index} path={`${path}/${crBirth.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
                <h1>{t(Module_br.toUpperCase())}</h1>
            </div>
            <div className="moduleLinkHomePageModuleLinks">
              <Links key={index} module={location?.state?.module} matchPath={`/digit-ui/citizen/${code.toLowerCase()}`} userType={"citizen"} />
            </div>
          </Route>
        ) :
         code === "CR" && location?.state?.module === crDeath ? (
          <Route key={index} path={`${path}/${crDeath.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
                <h1>{t(Module_dr.toUpperCase())}</h1>
            </div>
            <div className="moduleLinkHomePageModuleLinks">
              <Links key={index} module={location?.state?.module} matchPath={`/digit-ui/citizen/${code.toLowerCase()}`} userType={"citizen"} />
            </div>
          </Route>
        ) :
         (
          <Route key={index} path={`${path}/${code.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
              <h1>{t("MODULE_" + code.toUpperCase())}</h1>
            </div>
            <div className="moduleLinkHomePageModuleLinks">
              <Links key={index} module={location?.state?.module} matchPath={`/digit-ui/citizen/${code.toLowerCase()}`} userType={"citizen"} />
            </div>
          </Route>
        )}

      </React.Fragment>
    );
  });

  return (
    <div className={classname}>
      <TopBarSideBar
        t={t}
        stateInfo={stateInfo}
        userDetails={userDetails}
        CITIZEN={CITIZEN}
        cityDetails={cityDetails}
        mobileView={mobileView}
        handleUserDropdownSelection={handleUserDropdownSelection}
        logoUrl={logoUrl}
        showSidebar={true}
      />

      <div className={`main center-container mb-25`}>
        <Switch>
          <Route exact path={path}>
            <CitizenHome />
          </Route>

          <Route exact path={`${path}/select-language`}>
            <LanguageSelection />
          </Route>

          <Route exact path={`${path}/select-location`}>
            <LocationSelection />
          </Route>

          <Route path={`${path}/all-services`}>
            <AppHome userType="citizen" modules={modules} />
          </Route>

          <Route path={`${path}/login`}>
            <Login stateCode={stateCode} />
          </Route>

          <Route path={`${path}/register`}>
            <Login stateCode={stateCode} isUserRegistered={false} />
          </Route>

          <Route path={`${path}/user/profile`}>
            <UserProfile stateCode={stateCode} userType={"citizen"} cityDetails={cityDetails} />
          </Route>

          <ErrorBoundary>
            {appRoutes}
            {ModuleLevelLinkHomePages}
          </ErrorBoundary>
        </Switch>
      </div>
      {/* <div style={{ width: '100%', bottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', color:"#22394d" }}>
          <img style={{ cursor: "pointer", display: "inline-flex", height: '1.4em' }} alt={"Powered by DIGIT"} src={`${sourceUrl}/digit-footer.png`} onError={"this.src='./../digit-footer.png'"} onClick={() => {
            window.open('https://www.digit.org/', '_blank').focus();
          }}></img>
          <span style={{ margin: "0 10px" }}>|</span>
          <span style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400"}} onClick={() => { window.open('https://niua.in/', '_blank').focus();}} >Copyright © 2022 National Institute of Urban Affairs</span>
          <span style={{ margin: "0 10px" }}>|</span>
          <a style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400"}} href={pdfUrl} target='_blank'>UPYOG License</a>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
