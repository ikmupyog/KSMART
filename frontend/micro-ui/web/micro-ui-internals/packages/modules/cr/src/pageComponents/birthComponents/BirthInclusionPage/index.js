import React, { useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import { useLocation } from "react-router-dom";

import BirthInclusionEditPage from "./BirthInclusionEditPage";

const BirthInclusionPage = () => {
  const { t } = useTranslation();

  const stateId = Digit.ULBService.getStateId();

  let location = useLocation();
  let navigationData = location?.state?.inclusionData;

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "BirthCorrectionDocuments"
  );
  const { data: place = {}, isLoading: isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Menu, isLoading: isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  const { data: Nation = {}, isLoading: isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbPlace = [];
  let menu = [];
  let cmbNation = [];
  let BirthCorrectionDocuments = [];

  BirthCorrectionDocuments = correctionsData["birth-death-service"]?.BirthCorrectionDocuments;

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

  if (isLoad || isGenderLoad || isNationLoad || isLoading) {
    return <Loader />;
  }
  if (cmbNation?.length > 0 && menu?.length > 0 && cmbPlace?.length > 0 && BirthCorrectionDocuments?.length > 0) {
    return (
      <BirthInclusionEditPage
        cmbNation={cmbNation}
        menu={menu}
        cmbPlace={cmbPlace}
        BirthCorrectionDocuments={BirthCorrectionDocuments}
        navigationData={navigationData}
        // birthInclusionFormData={birthInclusionFormData}
      />
    );
  } else {
    return null;
  }
};
export default BirthInclusionPage;
