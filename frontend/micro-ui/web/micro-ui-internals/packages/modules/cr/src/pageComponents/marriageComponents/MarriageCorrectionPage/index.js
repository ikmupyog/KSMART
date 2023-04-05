import React, { useState, useEffect } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MarriageCorrectionEditPage from "./MarriageCorrectionEditPage";

const MarriageCorrectionPage = () => {
  const { t } = useTranslation();
  let birthInclusionFormData = {};
  const stateId = Digit.ULBService.getStateId();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [cmbPlace, setCmbPlace] = useState([]);
  const [cmbWardNoFinal, setCmbWardNoFinal] = useState([]);
  const [birthCorrectionDocs, setBirthCorrectionDocs] = useState([]);
  let location = useLocation();
  let place = [];
  let cmbWardNo = [];
  let correctionDocs = [];
  let navigationData = location?.state?.marriageCorrectionData;

  const mutation = Digit.Hooks.cr.useCivilRegMDMS(stateId);
  const correctionDocsMutation = Digit.Hooks.cr.useCivilRegMDMS(stateId);
  const wardMutation = Digit.Hooks.cr.useCivilRegMDMS(tenantId);

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
    setCmbWardNoFinal(cmbWardNo);
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

  const onBirthCorrectionSuccess = (data) => {
    data &&
      data["birth-death-service"] &&
      data["birth-death-service"].BirthCorrectionDocuments &&
      data["birth-death-service"].BirthCorrectionDocuments?.map((ob) => {
        correctionDocs.push(ob);
      });
    setBirthCorrectionDocs(correctionDocs);
  };

  useEffect(() => {
    mutation.mutate({ moduleCode: "birth-death-service", type: "MarriagePlaceType" }, { onSuccess: onMarriagePlacesSuccess });
    correctionDocsMutation.mutate({ moduleCode: "birth-death-service", type: "BirthCorrectionDocuments" }, { onSuccess: onBirthCorrectionSuccess });
    wardMutation.mutate({ moduleCode: "egov-location", type: "TenantBoundary" }, { onSuccess: onMarriageWardSuccess });
  }, []);

  if (cmbWardNoFinal?.length > 0 && cmbPlace?.length > 0 && birthCorrectionDocs?.length > 0) {
    return (
      <MarriageCorrectionEditPage
        cmbPlace={cmbPlace}
        cmbWardNoFinal={cmbWardNoFinal}
        BirthCorrectionDocuments={birthCorrectionDocs}
        navigationData={navigationData}
        // birthInclusionFormData={birthInclusionFormData}
      />
    );
  } else {
    return <Loader />;
  }
};
export default MarriageCorrectionPage;
