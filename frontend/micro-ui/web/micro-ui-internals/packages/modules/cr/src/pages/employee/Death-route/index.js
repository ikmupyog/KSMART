import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import DeathCrFlow from "./DeathCrFlow";
import InformationDeath from "../../../pageComponents/deathComponents/InformationDeath";
// import DeathCorrection from "../DeathCorrection/index";
import ApplicationDetails from "../../../../../templates/ApplicationDetails";
import { newConfig as newConfigCR } from "../../../config/config";
// import Search from "../Search";
import SpecifyCorrection from "../SpecifyCorrection";
import InformationDeathAband from "../../../pageComponents/deathAbandoned/InformationDeathAband";
import AddressDeath from "../../../pageComponents/deathAbandoned/AddressDeath";
// const CrFlowApp = ({ parentUrl, isEditBirth}) => {

const DeathCrFlowApp = ({ parentUrl, props, }) => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  return (
    <Route path={`${path}`} exact>
      <DeathCrFlow path={path} />
    </Route>
  );
};

export default DeathCrFlowApp;
