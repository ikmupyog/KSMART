import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch,useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
// import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import FileFlow from "./FileFlow";
import TradeLisense from "./TradeLisense";
import SubType from "./Subtype";
import CreateApplication from "./Create";

const FileFlowApp = ({ parentUrl }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  console.log(parentUrl);
  const onNext = () => {
    // console.log('next',path);
    history.push(`${path}/create`);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${path}`} exact>
          <FileFlow path={path} />
        </Route>
        
        <PrivateRoute parentRoute={path} path={`${path}/trade-lisense`} component={() => <TradeLisense parentUrl={path} />} />
        <PrivateRoute parentRoute={path} path={`${path}/sub-type`} component={() => <SubType parentUrl={path} handleNext={onNext} />} />
        <React.Fragment>
        <BackButton>Back</BackButton>
        <PrivateRoute parentRoute={path} path={`${path}/create`} component={() => <CreateApplication parentUrl={path} />} />
        </React.Fragment>
       
      </Switch>
    </React.Fragment>
  );
};

export default FileFlowApp;
