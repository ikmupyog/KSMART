import { Header, CitizenHomeCard, CaseIcon, HomeLink } from "@egovernments/digit-ui-react-components";
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
// import Proof from "./pageComponents/Proof";
import DFMCard from "./components/DFMCard";
import Response from "./pages/Response";

import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";

export const DFMModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "DFM";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

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

  return <CitizenHomeCard header={t("MODULE_DFM")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
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
  TLResponse : Response,
};

export const initDFMComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
