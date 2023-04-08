import React from "react";
import { useRouteMatch } from "react-router-dom";
//import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import CrFlow from "./CrFlow";

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