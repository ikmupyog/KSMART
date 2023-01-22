import { AppContainer, BackButton, PrivateRoute } from "@egovernments/digit-ui-react-components";
import React from "react";
import { Route, Switch, useRouteMatch,useHistory } from "react-router-dom";
import SpecifyCorrection from "./SpecifyCorrection";


 const SpecifyCorrectionRoute = ({parentRoute}) => {
  const { path, url, ...match } = useRouteMatch();
  
  const history = useHistory();
  const onNext = () => {
    console.log('next',path);
    history.push(`${path}/search-correction/application`);
  };
const SearchCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchdeathcorrection"); 
const DeathCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchDeathCorrectionRoute");
return (
    <span className={"tl-citizen"}>
      <Switch>
        {/* <AppContainer> */}
        <Route path={`${path}`} exact>
          <SpecifyCorrection path={path} handleNext={onNext}/>
        </Route>
        <PrivateRoute path={`${path}/search-correction/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} />
         
        <PrivateRoute path={`${path}/death-information`} component={(props) => <DeathCorrection {...props} parentRoute={path} />} />
       
      
      </Switch>
    </span>
  );
};

export default SpecifyCorrectionRoute