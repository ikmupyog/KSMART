import React, { useState, useEffect } from "react";
import {
  Loader,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MarriageCorrectionEditPage from "./MarriageCorrectionEditPage";


let BirthCorrectionDocuments = [];

const MarriageCorrectionPage = () => {
  const { t } = useTranslation();
  
let place = [];

  let birthInclusionFormData = {};
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [flag,setFlag] = useState(false);
  const [cmbPlace,setCmbPlace]  = useState([]);
  const [cmbWardNoFinal,setCmbWardNoFinal]  = useState([]);
  let location = useLocation();
  let navigationData = location?.state?.marriageCorrectionData;


  const mutation = Digit.Hooks.cr.useCivilRegMDMS(stateId);
 
const onSuccess = (data) =>{
  data &&
  data["birth-death-service"] &&
  data["birth-death-service"].MarriagePlaceType &&
  data["birth-death-service"].MarriagePlaceType?.map((ob) => {
    place.push(ob);
    });
    setCmbPlace( place);
}


 useEffect(()=>{
  mutation.mutate({moduleCode:"birth-death-service", type: "MarriagePlaceType"},{onSuccess});
 },[])
  
  if (
    
    cmbPlace?.length > 0
  ) {
    return (
      <MarriageCorrectionEditPage
        cmbPlace={cmbPlace}
        // cmbWardNoFinal={cmbWardNoFinal}
        BirthCorrectionDocuments={BirthCorrectionDocuments}
        navigationData={navigationData}
        // birthInclusionFormData={birthInclusionFormData}
      />
    );
  } else{
    return <Loader/>
  }
};
export default MarriageCorrectionPage;
