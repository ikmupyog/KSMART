import { CitizenHomeCard, CaseIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import AdoptionChildDetails from "../src/pageComponents/adoptionComponents/AdoptionChildDetails";
import AdoptionAddressBasePage from "../src/pageComponents/adoptionComponents/AdoptionAddressBasePage";
import AdoptionParentsDetails from "./pageComponents/adoptionComponents/AdoptionParentsDetails";
import AdoptionInitiatorDetails from "../src/pageComponents/adoptionComponents/AdoptionInitiatorDetails";

import ChildDetails from "../src/pageComponents/birthComponents/ChildDetails";
import AddressOne from "./pageComponents/birthComponents/OldAddressOne";
import AddressInsideIndia from "./pageComponents/birthComponents/OldAddressInsideIndia";
import AddressSameAsAbove from "../src/pageComponents/birthComponents/AddressSameAsAbove";
import AddressPermanent from "../src/pageComponents/birthComponents/AddressPermanent";
import MultipleBirth from "../src/pageComponents/birthComponents/MultipleBirth";
import CreateBirthRegistration from "./pages/citizen/BirthRegistration";
import CreateAdoptions from "./pages/citizen/Adoption";
import CreateStillBirthRegistration from "./pages/citizen/StillBirthRegistration";
import CreateBornOutsideRegistration from "./pages/citizen/BornOutsideReg"

import ParentsDetails from "../src/pageComponents/birthComponents/ParentsDetails";
import BirthPlaceHospital from "../src/pageComponents/birthComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../src/pageComponents/birthComponents/BirthPlaceInstitution";
import BirthPlaceHome from "../src/pageComponents/birthComponents/BirthPlaceHome";
import BirthPlaceVehicle from "../src/pageComponents/birthComponents/BirthPlaceVehicle";
import BirthPlacePublicPlace from "../src/pageComponents/birthComponents/BirthPlacePublicPlace";
import AddressBasePage from "../src/pageComponents/birthComponents/AddressBasePage";
import AddressPresent from "../src/pageComponents/birthComponents/AddressPresent";
import AddressPresentOutsideIndia from "../src/pageComponents/birthComponents/AddressPresentOutsideIndia";
import AddressPresentInsideKerala from "../src/pageComponents/birthComponents/AddressPresentInsideKerala";
import AddressPresentOutsideKerala from "../src/pageComponents/birthComponents/AddressPresentOutsideKerala";
import AddressPermanentOutsideKerala from "../src/pageComponents/birthComponents/AddressPermanentOutsideKerala";
import AddressPermanentInsideKerala from "../src/pageComponents/birthComponents/AddressPermanentInsideKerala";
import AddressPermanentOutsideIndia from "../src/pageComponents/birthComponents/AddressPermanentOutsideIndia";
import InformarHospitalInstitution from "../src/pageComponents/birthComponents/InformarHospitalInstitution";
import InitiatorDetails from "../src/pageComponents/birthComponents/InitiatorDetails";

import StillBirthChildDetails from "../src/pageComponents/stillBirthComponents/StillBirthChildDetails";
import StillBirthParentsDetails from "../src/pageComponents/stillBirthComponents/StillBirthParentsDetails";
import StillBirthPlaceVehicle from "../src/pageComponents/stillBirthComponents/StillBirthPlaceVehicle";
import StillBirthPlacePublicPlace from "../src/pageComponents/stillBirthComponents/StillBirthPlacePublicPlace";
import StillBirthPlaceInstitution from "../src/pageComponents/stillBirthComponents/StillBirthPlaceInstitution";
import StillBirthPlaceHospital from "../src/pageComponents/stillBirthComponents/StillBirthPlaceHospital";
import StillBirthPlaceHome from "../src/pageComponents/stillBirthComponents/StillBirthPlaceHome";
import StillBirthInitiatorDetails from "../src/pageComponents/stillBirthComponents/StillBirthInitiatorDetails";
import StillBirthInformarDetails from "./pageComponents/stillBirthComponents/StillBirthInformarDetails";
import StillBirthCheckPage from "./pages/citizen/StillBirthRegistration/StillBirthCheckPage";


import BornOutsideChildDetails from "../src/pageComponents/bornOutsideIndiaComponents/BornOutsideChildDetails";
import BornOutsideParentsDetails from "../src/pageComponents/bornOutsideIndiaComponents/BornOutsideParentsDetails";
import BornOutsideCheckPage from "./pages/citizen/BornOutsideReg/BornOutsideCheckPage";

// import SearchRegistry from "../src/pageComponents/adoptionComponents/SearchRegistry";
import AdoptionMotherInformation from "../src/pageComponents/adoptionComponents/AdoptionMotherInformation";
import AdoptiveParentsDetails from "../src/pageComponents/adoptionComponents/AdoptiveParentsDetails";
import AdoptionDetails from "../src/pageComponents/adoptionComponents/AdoptionDetails";
import BirthMotherInformation from "../src/pageComponents/adoptionComponents/BirthMotherInformation";
import BirthFatherInformation from "../src/pageComponents/adoptionComponents/BirthFatherInformation";
import BirthParentsAddress from "../src/pageComponents/adoptionComponents/BirthParentsAddress";
import AdoptionStatisticalInformation from "../src/pageComponents/adoptionComponents/AdoptionStatisticalInformation";
import AdoptionParentsAddress from "../src/pageComponents/adoptionComponents/AdoptionParentsAddress";

//@@@@@@DeathComponents@@@@@@@@@@@//
import InformationDeath from "../src/pageComponents/deathComponents/InformationDeath";
// import AddressOfDecesed from "./pageComponents/deathComponents/AddressOfDecesed";
// import OutSideIndia from "./pageComponents/deathComponents/OutSideIndia";
import FamilyInformationDeath from "./pageComponents/deathComponents/FamilyInformationDeath";
// import PlaceOfDeath from "./pageComponents/deathComponents/PlaceOfDeath";
// import PlaceOfDeathHome from "./pageComponents/deathComponents/PlaceOfDeathHome";
// import PlaceOfDeathHospital from "./pageComponents/deathComponents/PlaceOfDeathHospital";
// import PlaceOfDeathInstitution from "./pageComponents/deathComponents/PlaceOfDeathInstitution";
// import PlaceOfDeathOther from "./pageComponents/deathComponents/PlaceOfDeathOther";
// import PlaceOfDeathVehicle from "./pageComponents/deathComponents/PlaceOfDeathVehicle";
// import InformentAddress from "./pageComponents/deathComponents/InformentAddress";
import StatisticalInfo from "./pageComponents/deathComponents/StatisticalInfo";
import Hospital from "./pageComponents/deathComponents/Hospital";
import Institution from "./pageComponents/deathComponents/Institution";
import DeathPlaceHome from "./pageComponents/deathComponents/DeathPlaceHome";
import DeathPlaceVehicle from "./pageComponents/deathComponents/DeathPlaceVehicle";
import DeathPublicPlace from "./pageComponents/deathComponents/DeathPublicPlace";
import DeathOutsideJurisdiction from "./pageComponents/deathComponents/DeathOutsideJurisdiction ";
import Informer from "./pageComponents/deathComponents/Informer";
import Initiater from "./pageComponents/deathComponents/Initiater";
import MyCRApplications from "./pages/citizen/Applications/Application";
// import DeathCertificate from "./pageComponents/deathComponents/DeathCertificate";
// import GeneralRemarks from "./pageComponents/deathComponents/GeneralRemarks";
import CRSearch from "./pages/employee/Search";
import SearchCrApplication from "./components/SearchApplication";
import SearchRegistryDeath from "./components/SearchRegistryDeath";
import CRApplicationDetails from "./pages/employee/ApplicationDetails";
import CRApplicationDeathDetails from "./pages/employee/ApplicationDeathDetails";
// import ApplicantDetails from "./pageComponents/deathComponents/ApplicantDetails";
import SearchDeathApplication from "./components/SearchApplicationDeath";
import CRSearchdeathcorrection from "./pages/employee/SearchCorrection";
import CRSearchDeathCorrectionRoute from "./pages/employee/DeathCorrection/DeathCorrectionroute";
import CRDeathcorrection from "./pages/employee/DeathCorrection";
import CustomTimePicker from "./components/CustomTimePicker";
import AdoptionCheckPage from "./pages/citizen/Adoption/AdoptionCheckPage";
import BirthCheckPage from "./pages/citizen/BirthRegistration/BirthCheckPage";
import DeathCheckPage from "./pages/citizen/DeathRegistration/DeathCheckPage";
import MarriageCheckPage from "./pages/citizen/MarriageRegistration/MarriageCheckPage";
import AdoptionAcknowledgement from "./pages/citizen/Adoption/AdoptionAcknowledgement";
import BirthAcknowledgement from "./pages/citizen/BirthRegistration/BirthAcknowledgement";
import StillBirthAcknowledgement from "./pages/citizen/StillBirthRegistration/StillBirthAcknowledgement";
import DeathAcknowledgement from "./pages/citizen/DeathRegistration/DeathAcknowledgement";
import MarriageAcknowledgement from "./pages/citizen/MarriageRegistration/MarriageAcknowledgement";
import BirthCertificate from "./pages/citizen/Certificate/BirthCertificate";
import CreateDeathRegistration from "./pages/citizen/DeathRegistration";
// import InsideIndia from "./pageComponents/deathComponents/InsideIndia";
import CRCard from "./components/CRCard";
import Response from "./pages/Response";
import EmployeeApp from "./pages/employee";
import CitizenApp from "./pages/citizen";

import CreateMarriageRegistration from "./pages/citizen/MarriageRegistration";
import GroomDetails from "./pageComponents/marriageComponents/GroomDetails";
import BrideDetails from "./pageComponents/marriageComponents/BrideDetails";
import MarriageInstitution from "./pageComponents/marriageComponents/MarriageInstitution";
import MarriagePublicPlace from "./pageComponents/marriageComponents/MarriagePublicPlace";
import MarriageRegistration from "./pageComponents/marriageComponents/MarriageRegistration";
import HouseMarriageRegistration from "./pageComponents/marriageComponents/HouseMarriageRegistration";
import witnessdetails from "./pageComponents/marriageComponents/witnessdetails";

export const CRModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "CR";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("CR_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const CRLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/cr-birth-creation`,
      i18nKey: t("CR_BIRTH_REGISTRATION"),
      section:'birth'
    },
    {
      link: `${matchPath}/cr-stillbirth-creation`,
      i18nKey: t("CR_STILL_BIRTH_REGISTRATION"),
      section:'birth'
    },
    {
      link: `${matchPath}/cr-outsideindiabirth-creation`,
      i18nKey: t("CR_OUTSIDEINDIA_BIRTH_REGISTRATION"),
      section:'birth'
    },
    {
      link: `${matchPath}/create-birth-certificate`,
      i18nKey: t("CR_BIRTH_CERTIFICATE"),
      section:'birth'
    },
    {
      link: `${matchPath}/cr-death-creation`,
      i18nKey: t("CR_DEATH_REGISTRATION"),
      section:'death'
    },
    {
      link: `${matchPath}/create-death-certificate`,
      i18nKey: t("CR_DEATH_CERTIFICATE"),
      section:'death'
    },
    // {
    //   link: `${matchPath}/cr-marriage-creation`,
    //   i18nKey: t("CR_MARRIAGE_REGISTRATION"),
    // },
    
  ];

  return (
    <CitizenHomeCard
      style={{ display: "flex", justifyContent: "space-evenly" }}
      header={t("ACTION_TEST_TRADE_LICENSE")}
      links={links}
      Icon={() => <CaseIcon className="fill-path-primary-main" />}
    />
  );
};

const componentsToRegister = {
  MyCRApplications,
  CustomTimePicker,
  CRModule,
  CRLinks,
  CRCard,
  AdoptionChildDetails,
  AdoptionAddressBasePage,
  AdoptionParentsDetails,
  AdoptionInitiatorDetails,
  ChildDetails,
  CRApplicationDetails,
  CRApplicationDeathDetails,
  CRSearch,
  SearchCrApplication,
  SearchRegistryDeath,
  SearchDeathApplication,
  ChildDetails,
  AddressOne,
  AddressInsideIndia,
  AddressSameAsAbove,
  AddressPermanent,
  MultipleBirth,
  CRCreateBirthRegistration: CreateBirthRegistration,
  CRCreateAdoptions:CreateAdoptions,
  CRCreateStillBirthRegistration: CreateStillBirthRegistration,
  CRCreateBornOutsideRegistration: CreateBornOutsideRegistration,  
  ParentsDetails,
  BirthPlaceHospital,
  BirthPlaceInstitution,
  BirthPlaceHome,
  BirthPlacePublicPlace,
  BirthPlaceVehicle,
  AddressBasePage,
  AddressPresent,
  AddressPresentInsideKerala,
  AddressPresentOutsideKerala,
  AddressPresentOutsideIndia,
  AddressPermanentOutsideKerala,
  AddressPermanentOutsideIndia,
  AddressPermanentInsideKerala,
  InformarHospitalInstitution,
  InitiatorDetails,
  //////////////////
  StillBirthChildDetails,
  StillBirthParentsDetails,
  StillBirthPlaceHome,
  StillBirthPlaceHospital,
  StillBirthPlaceInstitution,
  StillBirthPlacePublicPlace,
  StillBirthPlaceVehicle,
  StillBirthInitiatorDetails,
  StillBirthInformarDetails,
  StillBirthCheckPage,
  //////////////////
  BornOutsideChildDetails,
  BornOutsideParentsDetails,
  BornOutsideCheckPage,
  //////////////////
  // SearchRegistry,
  AdoptionDetails,
  AdoptionMotherInformation,
  AdoptiveParentsDetails,
  BirthMotherInformation,
  BirthFatherInformation,
  BirthParentsAddress,
  AdoptionStatisticalInformation,
  AdoptionParentsAddress,

  //////////////////
  CRDeathcorrection,
  CRSearchdeathcorrection,
  CRSearchDeathCorrectionRoute,
  InformationDeath,
  // AddressOfDecesed,
  // OutSideIndia,
  FamilyInformationDeath,
  // PlaceOfDeath,
  // PlaceOfDeathHome,
  // PlaceOfDeathHospital,
  // PlaceOfDeathInstitution,
  // PlaceOfDeathOther,
  // PlaceOfDeathVehicle,
  // InformentAddress,
  StatisticalInfo,
  // ApplicantDetails,
  DeathPlaceVehicle,
  DeathPlaceHome,
  Institution,
  Hospital,
  DeathPublicPlace,
  DeathOutsideJurisdiction,
  Informer,
  Initiater,
  // DeathCertificate,
  // GeneralRemarks,
  AdoptionCheckPage,
  BirthCheckPage,
  DeathCheckPage,
  MarriageCheckPage,
  AdoptionAcknowledgement,
  BirthAcknowledgement,
  DeathAcknowledgement,
  MarriageAcknowledgement,
  StillBirthAcknowledgement,
  BirthCertificate,
  CRCreateDeathRegistration: CreateDeathRegistration,
  TLResponse: Response,
  //Marriage
  CRCreateMarriageRegistration: CreateMarriageRegistration,
  GroomDetails,
  BrideDetails,
  MarriageInstitution,
  MarriagePublicPlace,
  MarriageRegistration,
  HouseMarriageRegistration,
  witnessdetails,
};

export const initCRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
