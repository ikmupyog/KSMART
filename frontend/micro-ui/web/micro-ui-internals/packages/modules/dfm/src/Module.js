import { Header, CitizenHomeCard, EditPencilIcon, HomeLink } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import DFMApplicationDetails from "../src/pageComponents/DFMApplicationDetails";
import DFMAddressDetails from "../src/pageComponents/DFMAddressDetails";
import DFMServiceDetails from "../src/pageComponents/DFMServiceDetails";
import DFMDocumentDetails from "../src/pageComponents/DFMDocumentDetails";
import DFMCheckPage from "./pages/citizen/Create/CheckPage";
import DFMEmployeeCheckPage from "./pages/employee/FileFlow/Create/EmployeeCheckPage";
import DFMEmployeeApplicationDetails from "./pageComponents/DFMEmployeeApplicationDetails";
import DFMEmployeeAddressDetails from "../src/pageComponents/DFMEmployeeAddressDetails";
import DFMEmployeeServiceDetails from "../src/pageComponents/DFMEmployeeServiceDetails";
import DFMEmployeeDocumentDetails from "../src/pageComponents/DFMEmployeeDocumentDetails";
// import TLDocument from "./pageComponents/TLDocumets";
import DFMAcknowledgement from "./pages/citizen/Create/DFMAcknowlegement";
import DFMEmployeeAcknowledgement from "./pages/employee/FileFlow/Create/DFMEmployeeAcknowlegement";
import EmployeeDetails from './pages/employee/EmployeeDetails'
import SearchDfmApplication from "./components/SearchApplication"
import DFMEmployeeSearch from './pages/employee/Search'
// import Proof from "./pageComponents/Proof";
import DFMCard from "./components/DFMCard";
import Response from "./pages/Response";

import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";
import NoteAndDrafting from "./components/NoteAndDrafting";
import DraftingFile from "./components/DraftingFile";
import LegacyFile from "./components/LegacyFile";
import DraftTemplate from "./components/DraftTemplate";
import Templates from "./components/Templates";
import TemplateSec from "./components/TemplateSec";
import ArisingFile from "./components/arisingFiles/ArisingFile";
import ModuleAdding from "./components/ModuleAdding";
import MajorFunctionAdding from "./components/MajorFunctionAdding";
import SubFunctionAdding from "./components/SubFunctionAdding";
import ServiceAdding from "./components/ServiceAdding";
import ArisingFileAcknowledgement from "./components/arisingFiles/ArisingFileAcknowledgement";
import ArisingFileSummary from "./components/arisingFiles/ArisingFileSummary";
import CounterModule from "./components/counterModule/CounterModule"
import CounterModuleSummary from "./components/counterModule/CounterModuleSummary"
import CounterModuleAcknowledgement from "./components/counterModule/CounterModuleAcknowledgement"
// import ArisingFiled from "./components/arisingFiles/ArisingFiled";

import SearchModuleApplication from "./components/SearchModuleApplication";
import SubFunctionApplication from "./components/SubFunctionApplication";
export const DFMModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "DFM";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("DFM_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  }
  else return <CitizenApp />;
};

export const DFMLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/sub-type`,
      i18nKey: t("Apply for new Service"),
    },
    {
      link: `${matchPath}/my-application`,
      i18nKey: t("My Application"),
    },
    // {
    //   link: `${matchPath}/tradelicence/my-application`,
    //   i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    // },
  ];

  return <CitizenHomeCard header={t("MODULE_DFM")} links={links} Icon={() => <EditPencilIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  DFMModule,
  DFMLinks,
  DFMCard,
  DFMApplicationDetails,
  DFMAddressDetails,
  DFMServiceDetails,
  DFMDocumentDetails,
  DFMEmployeeApplicationDetails,
  DFMEmployeeAddressDetails,
  DFMEmployeeServiceDetails,
  DFMEmployeeDocumentDetails,
  DFMAcknowledgement,
  DFMEmployeeAcknowledgement,
  DFMCheckPage,
  DFMEmployeeCheckPage,
  TLResponse: Response,
  SearchDfmApplication,
  DFMEmployeeSearch,
  EmployeeDetails,
  NoteAndDrafting,
  DraftingFile,
  LegacyFile,
  DraftTemplate,
  Templates,
  TemplateSec,
  ArisingFile,
  ModuleAdding,
  MajorFunctionAdding,
  SubFunctionAdding,
  ServiceAdding,
  ArisingFileAcknowledgement,
  ArisingFileSummary,
  CounterModule,
  SearchModuleApplication,
  ArisingFileSummary,
  CounterModuleSummary,
  CounterModuleAcknowledgement,
  // ArisingFiled
  SubFunctionApplication,
  //ArisingFileSummery
};

export const initDFMComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
