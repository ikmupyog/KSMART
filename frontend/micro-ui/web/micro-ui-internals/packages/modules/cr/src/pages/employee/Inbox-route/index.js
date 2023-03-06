import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import InboxFlow from "./inboxFlow";
import BirthInbox from './birthInbox'
import DeathInbox from './deathInbox'

const InboxRoute = ({ parentUrl }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  // const isApplicationDetailsPage = location?.pathname?.includes("cr/application-details");
  const breadCrumbUrls = sessionStorage.getItem("breadCrumbUrl") || "";

  // const crumbs = [
    
  //   {
  //     path: "/digit-ui/employee/cr/application-details",
  //     content: t("TL_DETAILS_HEADER_LABEL"),
  //     show: isApplicationDetailsPage ||
  //     breadCrumbUrls.includes("home/search/Details") 
  //   },
  // ];

  const Search = Digit?.ComponentRegistryService?.getComponent('CRSearch');
  const ApplicationDetails = Digit?.ComponentRegistryService?.getComponent('CRApplicationDetails');
  const ApplicationDeathDetails = Digit?.ComponentRegistryService?.getComponent('CRApplicationDeathDetails');
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${path}`} exact>
          {/* <FileFlow path={path} /> */}
          <InboxFlow path={path} />
        </Route>
      <PrivateRoute path={`${path}/birthinbox`} component={(props) => <BirthInbox {...props} parentRoute={path} />} />
      <PrivateRoute path={`${path}/deathinbox`} component={(props) => <DeathInbox {...props} parentRoute={path} />} />


      </Switch>
    </React.Fragment>
  );
};

export default InboxRoute;
