import React, { useState, useEffect } from "react";
import { useLocation,  useHistory, useRouteMatch } from "react-router-dom";
import { Loader } from "@egovernments/digit-ui-react-components";
import DeathCorrectionEditPage from "./DeathCorrectionEditPage";

function DeathCorrectionPage() {
  const stateId = Digit.ULBService.getStateId();
  const match = useRouteMatch();
  let location = useLocation();
  const history = useHistory();
  let navigationData = location?.state?.correctionData;

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "DeathCorrectionDocuments"
  );

  const { data: place = {}, isLoading: isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Sex, isLoading: isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");

  const createProperty = async (navData) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/death-correction-acknowledgement`,
      state: {navData}
    });
  };


  let cmbPlace = [];
  let sex = [];
  let DeathCorrectionDocuments = [];
  
  DeathCorrectionDocuments = correctionsData["birth-death-service"]?.DeathCorrectionDocuments;

  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
    });
 
    Sex &&
    Sex.map((genderDetails) => {
      sex.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });

  if ((isLoad || isGenderLoad || isLoading)) {
    return <Loader />;
  }
  if (
    sex?.length > 0 &&
    cmbPlace?.length > 0 &&
    DeathCorrectionDocuments?.length > 0 
  ) {
    return (
      <DeathCorrectionEditPage
        sex={sex}
        cmbPlace={cmbPlace}
        DeathCorrectionDocuments={DeathCorrectionDocuments}
        navigationData={navigationData}
        onSubmitAcknowledgement={createProperty}
        />
        );
      } else {
        return null;
      }
    };
export default DeathCorrectionPage;
