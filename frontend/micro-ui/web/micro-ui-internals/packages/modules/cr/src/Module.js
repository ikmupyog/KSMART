import {  CitizenHomeCard, CaseIcon} from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import StatisticalInformation from "../src/pageComponents/birthComponents/StatisticalInformation";
import BirthVehicle from "../src/pageComponents/birthComponents/BirthVehicle";
import PublicPlace from "../src/pageComponents/birthComponents/PublicPlace";
import BirthPlace from "../src/pageComponents/birthComponents/BirthPlace";
import Address from "../src/pageComponents/birthComponents/Address";
import AddressOutsideIndia from "../src/pageComponents/birthComponents/AddressOutsideIndia";
import FatherInformation from "../src/pageComponents/birthComponents/FatherInformation";
import MotherInformation from "../src/pageComponents/birthComponents/MotherInformation";
import PlaceofBirthHome from "../src/pageComponents/birthComponents/PlaceofBirthHome";
import HospitalDetails from "../src/pageComponents/birthComponents/HospitalDetails";
import OtherCountry from "../src/pageComponents/birthComponents/OtherCountry";
import InstitutionDetails from "../src/pageComponents/birthComponents/InstitutionDetails";
import InstitutionAddress from "../src/pageComponents/birthComponents/InstitutionAddress";
import ChildDetails from "../src/pageComponents/birthComponents/ChildDetails";
import AddressOne from "../src/pageComponents/birthComponents/AddressOne";
import AddressInsideIndia from "../src/pageComponents/birthComponents/AddressInsideIndia";
import AddressSameAsAbove  from "../src/pageComponents/birthComponents/AddressSameAsAbove";
import AddressPermanent from "../src/pageComponents/birthComponents/AddressPermanent";
import MultipleBirth from "../src/pageComponents/birthComponents/MultipleBirth";
import BornOutsideIndia from "../src/pageComponents/birthComponents/BornOutsideIndia";
import InformantDetails from "../src/pageComponents/birthComponents/InformantDetails";
import InformantAddress from "../src/pageComponents/birthComponents/InformantAddress";
import CreateBirthRegistration from "./pages/citizen/BirthRegistration";
import ParentsDetails from "../src/pageComponents/birthComponents/ParentsDetails";
import BirthPlaceHospital from "../src/pageComponents/birthComponents/BirthPlaceHospital";
import BirthPlaceInstitution from "../src/pageComponents/birthComponents/BirthPlaceInstitution";



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
import AddressOfDecesed from "./pageComponents/deathComponents/AddressOfDecesed";
import OutSideIndia from "./pageComponents/deathComponents/OutSideIndia";
import FamilyInformationDeath from "./pageComponents/deathComponents/FamilyInformationDeath";
import PlaceOfDeath from "./pageComponents/deathComponents/PlaceOfDeath";
import PlaceOfDeathHome from "./pageComponents/deathComponents/PlaceOfDeathHome";
import PlaceOfDeathHospital from "./pageComponents/deathComponents/PlaceOfDeathHospital";
import PlaceOfDeathInstitution from "./pageComponents/deathComponents/PlaceOfDeathInstitution";
import PlaceOfDeathOther from "./pageComponents/deathComponents/PlaceOfDeathOther";
import PlaceOfDeathVehicle from "./pageComponents/deathComponents/PlaceOfDeathVehicle";
import InformentAddress from "./pageComponents/deathComponents/InformentAddress";
import StatisticalInfo from "./pageComponents/deathComponents/StatisticalInfo";
import StatisticalInfoContinue from "./pageComponents/deathComponents/StatisticalInfoContinue";
// import DeathCertificate from "./pageComponents/deathComponents/DeathCertificate";
import GeneralRemarks from "./pageComponents/deathComponents/GeneralRemarks";
import CRSearch from "./pages/employee/Search";
import SearchCrApplication from "./components/SearchApplication";
import SearchRegistryDeath from "./components/SearchRegistryDeath"
import CRApplicationDetails from "./pages/employee/ApplicationDetails";
import CRApplicationDeathDetails from "./pages/employee/ApplicationDeathDetails";
import ApplicantDetails from "./pageComponents/deathComponents/ApplicantDetails";
import SearchDeathApplication from "./components/SearchApplicationDeath";
import CRSearchdeathcorrection from "./pages/employee/SearchCorrection";
import CRSearchDeathCorrectionRoute from "./pages/employee/DeathCorrection/DeathCorrectionroute";
import CRDeathcorrection from "./pages/employee/DeathCorrection";
import CustomTimePicker from "./components/CustomTimePicker";
import BirthCheckPage from "./pages/citizen/BirthRegistration/CheckPage";
import DeathCheckPage from "./pages/citizen/DeathRegistration/DeathCheckPage";
import BirthAcknowledgement from "./pages/citizen/BirthRegistration/BirthAcknowledgement";
import DeathAcknowledgement from "./pages/citizen/DeathRegistration/DeathAcknowledgement";
import BirthCertificate from './pages/citizen/Certificate/BirthCertificate'
import CreateDeathRegistration from "./pages/citizen/DeathRegistration";

import CRCard from "./components/CRCard";
import Response from "./pages/Response";
import EmployeeApp from "./pages/employee";
import CitizenApp from "./pages/citizen";


export const CRModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "CR";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("CR_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  }
  else return <CitizenApp />;
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
      i18nKey: t("Birth Registration"),
    },
    {
      link: `${matchPath}/cr-death-creation`,
      i18nKey: t("Death Registration"),
    },
    {
      link: `${matchPath}/create-death-certificate`,
      i18nKey: t("Marriage Registration"),
    },
    {
      link: `${matchPath}/create-birth-certificate`,
      i18nKey: t("CR_BIRTH_CERTIFICATE"),
    },
    {
      link: `${matchPath}/create-death-certificate`,
      i18nKey: t("CR_DEATH_CERTIFICATE"),
    },
    
    // {
    //   link: `${matchPath}/tradelicence/renewal-list`,
    //   i18nKey: t("TL_RENEWAL_HEADER"),
    // },
    // {
    //   link: `${matchPath}/tradelicence/my-application`,
    //   i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    // },
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  CustomTimePicker,
  CRModule,
  CRLinks,
  CRCard,
  StatisticalInformation,
  BirthVehicle,
  PublicPlace,
  BirthPlace,
  Address,
  AddressOutsideIndia,
  FatherInformation,
  MotherInformation,
  PlaceofBirthHome,
  HospitalDetails,
  OtherCountry,
  InstitutionDetails,
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
  BornOutsideIndia,
  InstitutionAddress,
  InformantDetails,
  InformantAddress,
  CRCreateBirthRegistration : CreateBirthRegistration,
  ParentsDetails,
  BirthPlaceHospital,
  BirthPlaceInstitution,

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
  AddressOfDecesed,
  OutSideIndia,
  FamilyInformationDeath,
  PlaceOfDeath,
  PlaceOfDeathHome,
  PlaceOfDeathHospital,
  PlaceOfDeathInstitution,
  PlaceOfDeathOther,
  PlaceOfDeathVehicle,
  InformentAddress,
  StatisticalInfo,
  StatisticalInfoContinue,
  ApplicantDetails,
  // DeathCertificate,
  GeneralRemarks,
  BirthCheckPage,
  DeathCheckPage,
  BirthAcknowledgement,
  DeathAcknowledgement,
  BirthCertificate,
  CRCreateDeathRegistration : CreateDeathRegistration,
  TLResponse: Response,
};

export const initCRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};