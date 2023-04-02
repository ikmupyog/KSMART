import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CrFlow from "./CrFlow";
import ChildDetails from "../../../pageComponents/birthComponents/ChildDetails";
import { newConfig as newConfigCR } from "../../../config/config";

const CrFlowApp = ({ parentUrl }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();

  return (

    <React.Fragment>
      <CrFlow path={path} />
    </React.Fragment>
  );
};

export default CrFlowApp;