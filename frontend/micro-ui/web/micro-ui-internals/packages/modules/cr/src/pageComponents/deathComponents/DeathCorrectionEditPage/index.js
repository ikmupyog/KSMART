import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "@egovernments/digit-ui-react-components";
import DeathCorrectionEditPage from "./DeathCorrectionEditPage";

function DeathCorrectionPage() {
  const stateId = Digit.ULBService.getStateId();
  let location = useLocation();
  let navigationData = location?.state?.correctionData;

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "DeathCorrectionDocuments"
  );

  const { data: place = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Menu, isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbPlace = [];
  let menu = [];
  let cmbNation = [];
  let DeathCorrectionDocuments = [];
  
  DeathCorrectionDocuments = correctionsData["birth-death-service"]?.DeathCorrectionDocuments;

  place &&
    place["common-masters"] &&
    place["common-masters"].PlaceMasterDeath &&
    place["common-masters"].PlaceMasterDeath.map((ob) => {
      cmbPlace.push(ob);
    });
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  Nation &&
    Nation["common-masters"] &&
    Nation["common-masters"].Country &&
    Nation["common-masters"].Country.map((ob) => {
      cmbNation.push(ob);
    });

  if ((isLoad || isGenderLoad || isNationLoad || isLoading)) {
    return <Loader />;
  }
  if (
    cmbNation?.length > 0 &&
    menu?.length > 0 &&
    cmbPlace?.length > 0 &&
    DeathCorrectionDocuments?.length > 0 
  ) {
    return (
      <DeathCorrectionEditPage
        cmbNation={cmbNation}
        menu={menu}
        cmbPlace={cmbPlace}
        DeathCorrectionDocuments={DeathCorrectionDocuments}
        navigationData={navigationData}
      />
    );
  }
};
export default DeathCorrectionPage;
