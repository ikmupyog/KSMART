import { BackButton,CardBasedOptions,ComplaintIcon ,OBPSIcon,DropIcon} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
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
import { useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();
  // queryClient.removeQueries("CR_CREATE_BIRTH_REG");  
  sessionStorage.removeItem("Digit.CR_CREATE_BIRTH_REG");
  sessionStorage.removeItem("Digit.CR_BIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_BIRTH_REG");
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
    let crDeath = "cr-death"
    let crMarriage ="cr-marriage"
    let matchPath=`/digit-ui/citizen/${code.toLowerCase()}`
    // console.log(code);
    const history = useHistory();
    
    const birthProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
          name: t("CR_BIRTH_CODE"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: '/digit-ui/citizen/cr-birth-home',
            state: { module: "cr-birth" }
          }),
        },

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };
    const marriageProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
          name: t("CR_MARRIAGE_CODE"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: '/digit-ui/citizen/cr-marriage-home',
            state: { module: "cr-marriage" }
          }),
        },

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };
    const birthSectionAProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
          name: t("CR_BIRTH_NEW_REGISTRATION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-birth-creation`,
            state: { module: "cr-birth" }
          }),
        },
        {
          name: t("CR_STILL_BIRTH_REG"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-stillbirth-creation`,
            state: { module: "cr-birth" }
          }),
        },
        {
          name:t("CR_OUTSIDEINDIA_BIRTH_REGISTRATION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-outsideindiabirth-creation`,
            state: { module: "cr-birth" }
          }),
        },
        {
          name: t("CR_ADOPTION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname:`${matchPath}/cr-adoption`,
            state: { module: "cr-birth" }
          }),
        },
        

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };
    const birthSectionBProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
    
        {
          name:t("CR_NAME_INCLUSION_CORRECTION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-name-inclusion`,
            state: { module: "cr-birth" }
          }),
        },
        {
          name: t("CR_COMMON_CERT_DOWNLOAD"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname:`${matchPath}/create-birth-certificate`,
            state: { module: "cr-birth" }
          }),
        },
        {
          name:  t("TL_MY_APPLICATIONS_HEADER"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr/my-application`,
            state: { module: "cr-birth" }
          }),
        },    
        

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };
    const DearhRegProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
          name: t("CR_DEATH_NEW_REGISTRATION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-death-creation`,
            state: { module: "cr-death" }
          }),
        },
       
        {
          name: t("CR_DEATH_CORRECTIONS"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-death-inclusion`,
            state: { module: "cr-death" }
          }),
          
        },
        
       
        {
          name: t("CR_COMMON_ABANDONED_DEATH"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr/`,
            state: { module: "cr-death" }
          }),
        }, 
      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };
    const DeathcertProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        
           {
          name: t("CR_COMMON_CERT_DOWNLOAD"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/create-death-certificate`,
            state: { module: "cr-death" }
          }),
        }, 
        {
          name: t("TL_MY_APPLICATIONS_HEADER"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr/death/my-application`,
            state: { module: "cr-death" }
          }),
        },       

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "200%" },
    };
    const MarriageRegProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
          name: t("CR_MARRIAGE_NEW_REGISTRATION"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-marriage-creation`,
            state: { module: "cr-marriage" }
          }),
        },
        {
          name: t("CR_MARRIAGE_CORRECTIONS"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-marriage-inclusion`,
            state: { module: "cr-marriage" }
          }),
        },
      ],
        styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
      };
      const mrgcertProps = {
        header: t(""),
        sideOption: {
          name: t(""),
          onClick: () => history.push("/digit-ui/citizen/all-services"),
        },
        options: [
          
             {
            name: t("CR_COMMON_CERT_DOWNLOAD"),
            Icon: <OBPSIcon />,
            onClick: () => history.push({
              pathname: `${matchPath}/create-death-certificate`,
              state: { module: "cr-death" }
            }),
          }, 
        {
          name: t("TL_MY_APPLICATIONS_HEADER"),
          Icon: <OBPSIcon />,
          onClick: () => history.push({
            pathname: `${matchPath}/cr-marriage-creation`,
            state: { module: "cr-marriage" }
          }),
        },

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };

    const deathProps = {
      header: t(""),
      sideOption: {
        name: t(""),
        onClick: () => history.push("/digit-ui/citizen/all-services"),
      },
      options: [
        {
        name: t("CR_DEATH_CODE"),
        Icon: <OBPSIcon />,
        onClick: () => history.push({
          pathname: '/digit-ui/citizen/cr-death-home',
          state: { module: "cr-death" }
        }),

      },

      ],
      styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
    };

    return (
      <React.Fragment>
       
        {code === "CR" && location?.state?.module === crBirth ? (
          <Route key={index} path={`${path}/${crBirth.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
                <h1>{t("CR_BIRTH_REGISTRATION".toUpperCase())}</h1>
            </div>
             <div className="ServicesSection" style={{display:"flex",marginTop:"20px"}}>
                <CardBasedOptions {...birthSectionAProps} />
                <CardBasedOptions {...birthSectionBProps} />
            </div>
          </Route>
        ) :
         code === "CR" && location?.state?.module === crDeath ? (
          <Route key={index} path={`${path}/${crDeath.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
                <h1>{t("CR_DEATH_REGISTRATION".toUpperCase())}</h1>
            </div>
            <div className="ServicesSection" style={{display:"flex",marginTop:"20px"}}>
                <CardBasedOptions {...DearhRegProps} />
                <CardBasedOptions {...DeathcertProps} />
            </div>
          </Route>
        ) :  code === "CR" && location?.state?.module === crMarriage ? (
          <Route key={index} path={`${path}/${crMarriage.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
                <h1>{t('CR_MODULE_MARRIAGE'.toUpperCase())}</h1>
            </div>
            <div className="ServicesSection" style={{display:"flex",marginTop:"20px"}}>
                <CardBasedOptions {...MarriageRegProps} />
                <CardBasedOptions {...mrgcertProps} />
                
            </div>
          </Route>
        ) :
        code === "CR"?
        (
          <Route key={index} path={`${path}/${code.toLowerCase()}-home`}>
            <div className="moduleLinkHomePage">
              <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
              <BackButton className="moduleLinkHomePageBackButton" />
              <h1>{t("MODULE_" + code.toUpperCase())}</h1>
            </div>
            <div className="moduleLinkHomePageModuleLinks">
            <div className="ServicesSection" style={{display:"flex"}}>
                <CardBasedOptions {...birthProps} />
                <CardBasedOptions {...deathProps} />
                <CardBasedOptions {...marriageProps} />
         </div>
            </div>
          </Route>
        )
        :
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
