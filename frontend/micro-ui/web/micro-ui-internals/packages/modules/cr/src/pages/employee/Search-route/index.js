import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchFlow from "./SearchFlow";

const FileFlowApp = ({ parentUrl }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const Search = Digit?.ComponentRegistryService?.getComponent('CRSearch');
  const ApplicationDetails = Digit?.ComponentRegistryService?.getComponent('CRApplicationDetails');
  const SearchCorrection = Digit?.ComponentRegistryService?.getComponent('CRSearchdeathcorrection');
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${path}`} exact>
          {/* <FileFlow path={path} /> */}
          <SearchFlow path={path} />
        </Route>
        <PrivateRoute path={`${path}/search/:variant`} component={(props) => <Search {...props} parentRoute={path} />} />
        <PrivateRoute path={`${path}/search-correction/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} />

        <PrivateRoute path={`${path}/application-details/:id`} component={() => <ApplicationDetails parentRoute={path} />} />

    
      </Switch>
    </React.Fragment>
  );
};

export default FileFlowApp;
