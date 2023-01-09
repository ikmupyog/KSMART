import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFlow from "./SearchFlow";

const SearchRoute = ({ parentUrl }) => {
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
          <SearchFlow path={path} />
        </Route>
        <PrivateRoute path={`${path}/birthsearch/:variant`} component={(props) => <Search {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/deathsearch/:variant`} component={(props) => <Search {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />
        <PrivateRoute path={`${path}/application-deathdetails/:id`} component={() => <ApplicationDeathDetails parentRoute={path} />} /> 

      </Switch>
    </React.Fragment>
  );
};

export default SearchRoute;
