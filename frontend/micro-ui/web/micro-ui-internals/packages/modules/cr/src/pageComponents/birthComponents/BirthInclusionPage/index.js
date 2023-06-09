import React, { useEffect, useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import { useLocation, useHistory } from "react-router-dom";

import BirthInclusionEditPage from "./BirthInclusionEditPage";
import BirthInclusionDetails from "./BirthInclusionDetails";

const BirthInclusionPage = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const stateId = Digit.ULBService.getStateId();

  let location = useLocation();
  let navigationData = location?.state?.inclusionData;

  const [isBirthInclusionEdit, setIsBirthInclusionEdit] =useState(false)

  const navigateAcknowledgement = ({birthInclusionFormsObj,navigationData}) =>{
    history.push({
      pathname: `/digit-ui/citizen/cr/birth-inclusion-summary`,
      state: { navData: navigationData, birthInclusionData: birthInclusionFormsObj }
    });
  }
  

  const { data: correctionsData = {}, isSuccess, isError, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "BirthCorrectionDocuments"
  );
  const { data: place = {}, isLoading: isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PlaceMasterDeath");
  const { data: Sex, isLoading: isGenderLoad } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  // const { data: Nation = {}, isLoading: isNationLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");

  let cmbPlace = [];
  let sex = [];
  // let cmbNation = [];
  let BirthCorrectionDocuments = [];

  BirthCorrectionDocuments = correctionsData["birth-death-service"]?.BirthCorrectionDocuments;

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

  // Nation &&
  //   Nation["common-masters"] &&
  //   Nation["common-masters"].Country &&
  //   Nation["common-masters"].Country.map((ob) => {
  //     cmbNation.push(ob);
  //   });
  // console.log("loader index",sex?.length > 0 , cmbPlace?.length > 0 , BirthCorrectionDocuments?.length > 0);

  if (isLoad || isGenderLoad || isLoading) {
    return <Loader />;
  }
  if ( sex?.length > 0 && cmbPlace?.length > 0 && BirthCorrectionDocuments?.length > 0) {
    return (
      <BirthInclusionEditPage
        // cmbNation={cmbNation}
        sex={sex}
        cmbPlace={cmbPlace}
        BirthCorrectionDocuments={BirthCorrectionDocuments}
        navigationData={navigationData}
        navigateAcknowledgement={navigateAcknowledgement}
        fetchData={true}
        // birthInclusionFormData={birthInclusionFormData}
      />
    );
  } else {
    return null;
  }
};
export default BirthInclusionPage;
