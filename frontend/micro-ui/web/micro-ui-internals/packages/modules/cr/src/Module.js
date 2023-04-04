import { CitizenHomeCard, CaseIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import AdoptionChildDetails from "../src/pageComponents/adoptionComponents/AdoptionChildDetails";
import AdoptionAddressBasePage from "../src/pageComponents/adoptionComponents/AdoptionAddressBasePage";
import AdoptionParentsDetails from "./pageComponents/adoptionComponents/AdoptionParentsDetails";
import AdoptionInitiatorDetails from "../src/pageComponents/adoptionComponents/AdoptionInitiatorDetails";

import ChildDetails from "../src/pageComponents/birthComponents/ChildDetails";
import BirthNACDetails from "./pageComponents/birthNACComponents/BirthNACDetails";
import BirthNACParentsDetails from "./pageComponents/birthNACComponents/BirthNACParentsDetails";
import BirthNACAddressPage from "./pageComponents/birthNACComponents/BirthNACAddressPage";
import BirthNACInitiator from "./pageComponents/birthNACComponents/BirthNACInitiator";
import AddressOne from "./pageComponents/birthComponents/OldAddressOne";
import AddressInsideIndia from "./pageComponents/birthComponents/OldAddressInsideIndia";
import AddressSameAsAbove from "../src/pageComponents/birthComponents/AddressSameAsAbove";
import AddressPermanent from "../src/pageComponents/birthComponents/AddressPermanent";
import MultipleBirth from "../src/pageComponents/birthComponents/MultipleBirth";
import CreateBirthRegistration from "./pages/citizen/BirthRegistration";
import CreateBirthEmp from "./pages/employee/BirthRegistration";
import CreateBirthNACRegistration from "./pages/citizen/BirthNACRegistration";
import MarriageCorrection from "./pages/citizen/MarriageCorrection";
import BirthNACDownloadPage from "./pageComponents/birthNACComponents/BirthNACDownloadPage";
import BirthInclusion from "./pages/citizen/BirthInclusion";
import BirthInclusionEditPage from "./pageComponents/birthComponents/BirthInclusionPage/BirthInclusionEditPage";
import BirthInclusionPage from "./pageComponents/birthComponents/BirthInclusionPage/index";
import SearchBirthInclusion from './components/SearchBirthInclusion';
import BirthInclusionModal from './components/BirthInclusionModal';

import SearchMarriageInclusion from "./components/SearchMarriageInclusion";
import SearchApplicationMarriage from "./components/SearchApplicationMarriage";
import CreateAdoptions from "./pages/citizen/Adoption";
import CreateStillBirthRegistration from "./pages/citizen/StillBirthRegistration";
import CreateBornOutsideRegistration from "./pages/citizen/BornOutsideReg";
import CreateAbandonedBirth from "./pages/employee/Abandoned-birth-route";
import CrFlowApp from "./pages/employee/Birth-route";
import ScrFlowApp from "./pages/employee/StillBirth-route";
import CreateBornOutsideEmp from "./pages/employee/OutsideIndiaBirth-route";

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
import BornOutsideStaticInfn from "./pageComponents/bornOutsideIndiaComponents/BornOutsideStaticInfn";
import BornOutsideCheckPage from "./pages/citizen/BornOutsideReg/BornOutsideCheckPage";
import BornOutsideAddressPage from "./pageComponents/bornOutsideIndiaComponents/BornOutsideAddressPage";
import BornOutsidePresentOutsideIndia from "./pageComponents/bornOutsideIndiaComponents/BornOutsidePresentOutsideIndia";
import BornoutsidePermanentInsideKerala from "./pageComponents/bornOutsideIndiaComponents/BornoutsidePermanentInsideKerala";
import BornoutsideSameAsAbove from "./pageComponents/bornOutsideIndiaComponents/BornoutsideSameAsAbove";
import BornOutsidePermanent from "./pageComponents/bornOutsideIndiaComponents/BornOutsidePermanent";
import BornOutsidePresent from "./pageComponents/bornOutsideIndiaComponents/BornOutsidePresent";
// import SearchRegistry from "../src/pageComponents/adoptionComponents/SearchRegistry";
import AdoptionMotherInformation from "../src/pageComponents/adoptionComponents/AdoptionMotherInformation";
import AdoptiveParentsDetails from "../src/pageComponents/adoptionComponents/AdoptiveParentsDetails";
import AdoptionDetails from "../src/pageComponents/adoptionComponents/AdoptionDetails";
import BirthMotherInformation from "../src/pageComponents/adoptionComponents/BirthMotherInformation";
import BirthFatherInformation from "../src/pageComponents/adoptionComponents/BirthFatherInformation";
import BirthParentsAddress from "../src/pageComponents/adoptionComponents/BirthParentsAddress";
import AdoptionStatisticalInformation from "../src/pageComponents/adoptionComponents/AdoptionStatisticalInformation";
import AdoptionParentsAddress from "../src/pageComponents/adoptionComponents/AdoptionParentsAddress";

// import AbandonedChildDetails from "../src/pageComponents/abandonedBirthComponents/AbandonedChildDetails";

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
import MyCRDeathApplications from "./pages/citizen/Applications/ApplicationDeath";
// import DeathCertificate from "./pageComponents/deathComponents/DeathCertificate";
// import GeneralRemarks from "./pageComponents/deathComponents/GeneralRemarks";
import CRSearch from "./pages/employee/Search";
// import CRDeathsearch from "./pages/employee/Search";
import SearchCrApplication from "./components/SearchApplication";
import SearchRegistryDeath from "./components/SearchRegistryDeath";
import CRCitizenApplicationDetails from "./pages/citizen/Applications/ApplicationDetails";
import CRDeathApplicationDetails from "./pages/citizen/Applications/ApplicationDeathDetails";
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
import BirthNACCheckPage from "./pages/citizen/BirthNACRegistration/BirthNACCheckPage";
import DeathCheckPage from "./pages/citizen/DeathRegistration/DeathCheckPage";
import BirthNACAcknowledgement from "./pages/citizen/BirthNACRegistration/BirthNACAcknowledgement";
import AdoptionAcknowledgement from "./pages/citizen/Adoption/AdoptionAcknowledgement";
import BirthAcknowledgement from "./pages/citizen/BirthRegistration/BirthAcknowledgement";
import StillBirthAcknowledgement from "./pages/citizen/StillBirthRegistration/StillBirthAcknowledgement";
import DeathAcknowledgement from "./pages/citizen/DeathRegistration/DeathAcknowledgement";
import BirthCertificate from "./pages/citizen/Certificate/BirthCertificate";
import CreateDeathRegistration from "./pages/citizen/DeathRegistration";
// import InsideIndia from "./pageComponents/deathComponents/InsideIndia";
import CRCard from "./components/CRCard";
import Response from "./pages/Response";
import EmployeeApp from "./pages/employee";
import CitizenApp from "./pages/citizen";
import CRDocuments from "./pageComponents/birthComponents/CRDocuments";
import CRDDocuments from "./pageComponents/deathComponents/CRDDocuments";
import CRWFApplicationTimeline from "./pageComponents/birthComponents/CRWFApplicationTimeline";
import CRDWFApplicationTimeline from "./pageComponents/deathComponents/CRDWFApplicationTimeline";
import DeathInclusion from "./pages/citizen/DeathInclusion";
import SearchDeathInclusion from "./components/SearchDeathInclusion";
import DeathCorrectionEditPage from "./pageComponents/deathComponents/DeathCorrectionEditPage";
import FormFieldContainer from "../src/components/FormFieldContainer";
import MarriageAddressPage from "./pageComponents/marriageComponents/MarriageAddressPage";
import CreateMarriageRegistration from "./pages/citizen/MarriageRegistration";
import GroomDetails from "./pageComponents/marriageComponents/GroomDetails";
import BrideDetails from "./pageComponents/marriageComponents/BrideDetails";
import MarriageInstitution from "./pageComponents/marriageComponents/MarriageInstitution";
import MarriagePublicPlace from "./pageComponents/marriageComponents/MarriagePublicPlace";
import MarriageRegistration from "./pageComponents/marriageComponents/MarriageRegistration";
import HouseMarriageRegistration from "./pageComponents/marriageComponents/HouseMarriageRegistration";
import Witnessdetails from "./pageComponents/marriageComponents/Witnessdetails";
import MarriageCorrectionEditPage from "./pageComponents/marriageComponents/MarriageCorrectionPage/MarriageCorrectionEditPage";
import MarriageCorrectionLoadPage from "./pageComponents/marriageComponents/MarriageCorrectionPage/index";
import MarriageCheckPage from "./pages/citizen/MarriageRegistration/MarriageCheckPage";
import MarriageAcknowledgement from "./pages/citizen/MarriageRegistration/MarriageAcknowledgement";
import MarriageAddressBasePage from "./pageComponents/marriageComponents/MarriageAddressBasePage";
import MarriageAddressPermanent from "./pageComponents/marriageComponents/MarriageAddressPermanent";
import MarriageAddressPermanentInsideKerala from "./pageComponents/marriageComponents/MarriageAddressPermanentInsideKerala";
import MarriageAddressPermanentOutsideIndia from "./pageComponents/marriageComponents/MarriageAddressPermanentOutsideIndia";
import MarriageAddressPermanentOutsideKerala from "./pageComponents/marriageComponents/MarriageAddressPermanentOutsideKerala";
import MarriageAddressPresent from "./pageComponents/marriageComponents/MarriageAddressPresent";
import MarriageAddressPresentInsideKerala from "./pageComponents/marriageComponents/MarriageAddressPresentInsideKerala";
import MarriageAddressPresentOutsideIndia from "./pageComponents/marriageComponents/MarriageAddressPresentOutsideIndia";
import MarriageAddressPresentOutsideKerala from "./pageComponents/marriageComponents/MarriageAddressPresentOutsideKerala";
import MarriageAddressSameAsAbove from "./pageComponents/marriageComponents/MarriageAddressSameAsAbove";

import AbandonedChildDetails from "./pageComponents/abandonedBirthComponents/AbandonedChildDetails";
import AbandonedBirthInformarDetails from "./pageComponents/abandonedBirthComponents/AbandonedBirthInformarDetails";
import AbandonedBirthAcknowledgement from "./pages/employee/Abandoned-birth-route/AbandonedBirthAcknowledgement";
import AbandonedBirthCheckPage from "./pages/employee/Abandoned-birth-route/AbandonedBirthCheckPage";

import BornOutsideAcknowledgement from "./pages/citizen/BornOutsideReg/BornOutsideAcknowledgement";

import InformationDeathAband from "./pageComponents/deathAbandoned/InformationDeathAband";
import CreateDeathNACRegistration from "./pages/citizen/DeathNACRegistration";
import DeathNACDetails from "./pageComponents/DeathNACComponents/DeathNACDetails";
import DeathNACAddressPage from "./pageComponents/DeathNACComponents/DeathNACAddressPage";
import DeathNACParentsDetails from "./pageComponents/DeathNACComponents/DeathNACParentsDetails";
import DeathNACInitiator from "./pageComponents/DeathNACComponents/DeathNACInitiator";
import DeathNACDownloadPage from "./pageComponents/DeathNACComponents/DeathNACDownloadPage";
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
      section: "birth",
    },
    {
      link: `${matchPath}/cr-stillbirth-creation`,
      i18nKey: t("CR_STILL_BIRTH_REGISTRATION"),
      section: "birth",
    },
    {
      link: `${matchPath}/cr-outsideindiabirth-creation`,
      i18nKey: t("CR_OUTSIDEINDIA_BIRTH_REGISTRATION"),
      section: "birth",
    },
    {
      link: `${matchPath}/cr-abandonedbirth-creation`,
      i18nKey: t("CR_ABANDONED_BIRTH_REGISTRATION"),
      section: "birth",
    },
    {
      link: `${matchPath}/create-birth-certificate`,
      i18nKey: t("CR_BIRTH_CERTIFICATE"),
      section: "birth",
    },
    {
      link: `${matchPath}/cr-death-creation`,
      i18nKey: t("CR_DEATH_REGISTRATION"),
      section: "death",
    },
    {
      link: `${matchPath}/create-death-certificate`,
      i18nKey: t("CR_DEATH_CERTIFICATE"),
      section: "death",
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
  CrFlowApp,
  ScrFlowApp,
  CreateBornOutsideEmp,
  MyCRApplications,
  MyCRDeathApplications,
  CustomTimePicker,
  CRModule,
  CRSearch,
  CRLinks,
  CRCard,
  AdoptionChildDetails,
  AdoptionAddressBasePage,
  AdoptionParentsDetails,
  AdoptionInitiatorDetails,
  ChildDetails,
  CRCitizenApplicationDetails,
  CRDeathApplicationDetails,
  CRApplicationDetails,
  CRApplicationDeathDetails,
  SearchDeathInclusion,
  // CRDeathsearch,
  SearchCrApplication,
  SearchRegistryDeath,
  SearchDeathApplication,
  AddressOne,
  AddressInsideIndia,
  AddressSameAsAbove,
  AddressPermanent,
  MultipleBirth,
  CRCreateBirthRegistration: CreateBirthRegistration,
  CreateBirthEmp,
  CRCreateAdoptions: CreateAdoptions,
  CRCreateStillBirthRegistration: CreateStillBirthRegistration,
  CRCreateBornOutsideRegistration: CreateBornOutsideRegistration,
  CreateAbandonedBirth,
  CRCreateBirthNACRegistration: CreateBirthNACRegistration,
  CRCreateDeathNACRegistration: CreateDeathNACRegistration,
  DeathNACDownloadPage,
  DeathNACDetails,
  BirthNACParentsDetails,
  BirthNACDetails,
  DeathNACAddressPage,
  DeathNACParentsDetails,
  BirthNACDownloadPage,
  DeathNACInitiator,
  ParentsDetails,
  BirthNACAddressPage,
  BirthNACInitiator,
  CRBirthInclusions: BirthInclusion,
  CRMarriageCorrection: MarriageCorrection,
  CRBirthInclusionEditPage: BirthInclusionEditPage,
  CRBirthInclusionPage:BirthInclusionPage, 
  SearchBirthInclusion,
  BirthInclusionModal,
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
  // AddressPermanentOutsideIndia,
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
  BornOutsideStaticInfn,
  BornOutsideAddressPage,
  BornOutsideCheckPage,
  BornOutsideAddressPage,
  BornOutsidePresentOutsideIndia,
  BornoutsidePermanentInsideKerala,
  BornoutsideSameAsAbove,
  BornOutsidePermanent,
  BornOutsidePresent,
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
  CRDeathCorrectionEditPage:DeathCorrectionEditPage,
  SearchMarriageInclusion,
  SearchApplicationMarriage,
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
  CRDeathInclusions:DeathInclusion,
  SearchDeathInclusion:
  Informer,
  Initiater,
  // DeathCertificate,
  // GeneralRemarks,
  AdoptionCheckPage,
  BirthCheckPage,
  BirthNACCheckPage,
  DeathCheckPage,
  MarriageCheckPage,
  BirthNACAcknowledgement,
  AdoptionAcknowledgement,
  BirthAcknowledgement,
  DeathAcknowledgement,
  MarriageAcknowledgement,
  CRMarriageCorrectionEditPage:MarriageCorrectionEditPage,
  CRMarriageCorrectionLoadPage:MarriageCorrectionLoadPage,
  StillBirthAcknowledgement,
  BirthCertificate,
  CRCreateDeathRegistration: CreateDeathRegistration,
  TLResponse: Response,
  CRDocuments,
  CRDDocuments,
  CRWFApplicationTimeline,
  CRDWFApplicationTimeline,
  InformationDeathAband,
  AbandonedChildDetails,
  AbandonedBirthInformarDetails,
  //Marriage
  CRCreateMarriageRegistration: CreateMarriageRegistration,
  GroomDetails,
  BrideDetails,
  MarriageInstitution,
  MarriagePublicPlace,
  MarriageRegistration,
  MarriageAddressPage,
  HouseMarriageRegistration,
  Witnessdetails,
  MarriageAddressBasePage,
  MarriageAddressPermanent,
  MarriageAddressPermanentInsideKerala,
  MarriageAddressPermanentOutsideIndia,
  MarriageAddressPermanentOutsideKerala,
  MarriageAddressPresent,
  MarriageAddressPresentInsideKerala,
  MarriageAddressPresentOutsideIndia,
  MarriageAddressPresentOutsideKerala,
  MarriageAddressSameAsAbove,
  FormFieldContainer,
  BornOutsideAcknowledgement,
  AbandonedBirthAcknowledgement,
  AbandonedBirthCheckPage,
};

export const initCRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
