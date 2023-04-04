import React, { useState, useEffect, useCallback } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  EditButton,
  PopUp,
  UploadFile,
  EditIcon,
} from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../../components/CustomTimePicker";
import FormFieldContainer from "../../../components/FormFieldContainer";
import BirthInclusionModal from "../../../components/BirthInclusionModal";
import { initializeBirthInclusionObject } from "../../../config/globalObject";
import { useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { getFormattedBirthInclusionData } from "../../../config/utils";
import moment from "moment";
import BirthInclusionEditPage from "./BirthInclusionEditPage";

const BirthInclusionPage = () => {
  const { t } = useTranslation();
  let formData = {};
  let validation = {};
  let birthInclusionFormData = {};
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    hospitalCorrectionLetter: false,
  });
  const [value, setValue1] = useState(0);
  const [selectedInclusionItem, setSelectedInclusionItem] = useState([]);
  let location = useLocation();
  let navigationData = location?.state?.inclusionData;
  console.log("locartion dayta==", location);
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
  let cmbState = [];
  let cmbfilterNation = [];
  let cmbfilterNationI = [];

  BirthCorrectionDocuments = correctionsData["birth-death-service"]?.BirthCorrectionDocuments;

  console.log(navigationData);

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

//   useEffect(async () => {
//     if (BirthCorrectionDocuments?.length > 0) {
//       birthInclusionFormData = await initializeBirthInclusionObject(BirthCorrectionDocuments, navigationData);
//     }
//     console.log("birthInclusionFormData==", birthInclusionFormData);
//   }, [navigationData, BirthCorrectionDocuments]);

  if ((isLoad || isGenderLoad || isNationLoad || isLoading)) {
    return <Loader />;
  }
  if (
    cmbNation?.length > 0 &&
    menu?.length > 0 &&
    cmbPlace?.length > 0 &&
    BirthCorrectionDocuments?.length > 0 
    // birthInclusionFormData?.length > 0
  ) {
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
  }
};
export default BirthInclusionPage;
