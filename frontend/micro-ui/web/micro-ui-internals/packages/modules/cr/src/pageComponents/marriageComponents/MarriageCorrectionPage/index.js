import React, { useState, useEffect } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import MarriageCorrectionEditPage from "./MarriageCorrectionEditPage";

const MarriageCorrectionPage = () => {
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const history = useHistory();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [cmbPlace, setCmbPlace] = useState([]);
  const [cmbWardNoFinal, setCmbWardNoFinal] = useState([]);
  const [cmbPlaceName, setCmbPlaceName] = useState([]);
  const [marriageCorrectionDocs, setMarriageCorrectionDocs] = useState([]);
  let location = useLocation();
  let place = [];
  let marriagePlace = [];
  let cmbWardNo = [];
  let correctionDocs = [];
  let navigationData = location?.state?.marriageCorrectionData;

  const mutation = Digit.Hooks.cr.useCivilRegMDMS(stateId);
  const correctionDocsMutation = Digit.Hooks.cr.useCivilRegMDMS(stateId);
  const wardMutation = Digit.Hooks.cr.useCivilRegMDMS(tenantId);
  const placeNameMutation = Digit.Hooks.cr.useCivilRegMDMS(tenantId);

  const onMarriageWardSuccess = (data) => {
    data &&
      data["egov-location"] &&
      data["egov-location"].TenantBoundary.map((ob) => {
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      });
    cmbWardNo.map((wardmst) => {
      wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
      wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
      cmbWardNoFinal.push(wardmst);
    });
    setCmbWardNoFinal(cmbWardNoFinal);
  };

  const onMarriagePlacesSuccess = (data) => {
    data &&
      data["birth-death-service"] &&
      data["birth-death-service"].MarriagePlaceType &&
      data["birth-death-service"].MarriagePlaceType?.map((ob) => {
        place.push(ob);
      });
    setCmbPlace(place);
  };

  const onMarriagePlaceNameSuccess = (data) => {
    data &&
    data["egov-location"] &&
    data["egov-location"].MarriagePlace &&
    data["egov-location"].MarriagePlace?.map((ob) => {
      marriagePlace.push(ob);
    });
    setCmbPlaceName(marriagePlace);
  }

  const createProperty = async ({marriageCorrectionFormsObj, navigationData}) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/marriage-correction-summary`,
      state: { navData: navigationData, marriageCorrectionData: marriageCorrectionFormsObj }
    });
  };

  const onMarriageCorrectionSuccess = (data) => {
    data &&
      data["birth-death-service"] &&
      data["birth-death-service"].CorrectionMarriageDocuments &&
      data["birth-death-service"].CorrectionMarriageDocuments?.map((ob) => {
        correctionDocs.push(ob);
      });
      setMarriageCorrectionDocs(correctionDocs);
  };

  useEffect(() => {
    mutation.mutate({ moduleCode: "birth-death-service", type: "MarriagePlaceType" }, { onSuccess: onMarriagePlacesSuccess });
    correctionDocsMutation.mutate({ moduleCode: "birth-death-service", type: "CorrectionMarriageDocuments" }, { onSuccess: onMarriageCorrectionSuccess });
    wardMutation.mutate({ moduleCode: "egov-location", type: "TenantBoundary" }, { onSuccess: onMarriageWardSuccess });
    placeNameMutation.mutate({ moduleCode: "egov-location", type: "MarriagePlace" }, { onSuccess: onMarriagePlaceNameSuccess });
  }, []);

  if (marriageCorrectionDocs?.length > 0) {
    return (
      <MarriageCorrectionEditPage
        cmbPlace={cmbPlace}
        cmbWardNoFinal={cmbWardNoFinal}
        cmbWardNo={cmbWardNo}
        cmbPlaceName={cmbPlaceName}
        marriageCorrectionDocuments={marriageCorrectionDocs}
        navigationData={navigationData}
        onSubmitAcknowledgement={createProperty}
      />
    );
  } else {
    return <Loader />;
  }
};
export default MarriageCorrectionPage;
