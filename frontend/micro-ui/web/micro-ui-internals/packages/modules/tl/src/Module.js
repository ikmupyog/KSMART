import {CitizenHomeCard, CaseIcon } from "@egovernments/digit-ui-react-components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import TradeLicense from "../src/pageComponents/TradeLicense";
import Proof from "./pageComponents/Proof";
import TLCheckPage from "./pages/citizen/Create/CheckPage";
import TLDocument from "./pageComponents/TLDocumets";
import TLAcknowledgement from "./pages/citizen/Create/TLAcknowledgement";
import TradeLicenseList from "./pages/citizen/Renewal/TradeLicenseList";
import TLWFApplicationTimeline from "./pageComponents/TLWFApplicationTimeline";


import TLCard from "./components/TLCard";
import TLInfoLabel from "./pageComponents/TLInfoLabel";
import SearchApplication from "./components/SearchApplication"
import SearchLicense from "./components/SearchLicense"
import TL_INBOX_FILTER from "./components/inbox/InboxFilter";
import NewApplication from "./pages/employee/NewApplication";
import ReNewApplication from "./pages/employee/ReNewApplication";
import Search from "./pages/employee/Search";
import Response from "./pages/Response";
import TLApplicationDetails from "./pages/citizen/Applications/ApplicationDetails"
import CreateTradeLicence from "./pages/citizen/Create";
import EditTrade from "./pages/citizen/EditTrade";
import { TLList } from "./pages/citizen/Renewal";
import RenewTrade from "./pages/citizen/Renewal/renewTrade";
import SearchTradeComponent from "./pages/citizen/SearchTrade";

import CitizenApp from "./pages/citizen";
import EmployeeApp from "./pages/employee";
import PdeApplication from "./pages/employee/PdeApplication";
import TLPdeEntry from "./pageComponents/TLPdeEntry";
import SearchPde from "./pages/employee/SearchPde";
import SearchPdeApplication from "./components/SearchPdeApplication";
import TLLicenseUnitDet from "./pageComponents/TLLicenseUnitDet";
import TLLicenseApplicantDet from "./pageComponents/TLLicenseApplicantDet";
import TLDocumentUpload from "./pageComponents/TLDocumentUpload";
import SearchRenewalTrade from "./pages/citizen/SearchRenewalTrade";
import SearchLicenseRenewal from "./components/SearchLicenseRenewal";
import TLLicenseUnitDetRenewal from "./pageComponents/TLLicenseUnitDetRenewal";
import TLLicenseApplicantDetRenewal from './pageComponents/TLLicenseApplicantDetRenewal';
import TLLocationSearch from './pageComponents/TLLocationSearch';

import TLCorrectionApplicant from "./pageComponents/TLCorrectionApplicant";
import TLCorrectionDetails from "./pageComponents/TLCorrectionDetails";
import CorrectionTradeLicence from "./pages/citizen/Correction";
import TLCorrectionOwner from "./pageComponents/TLCorrectionOwner";
import TLCorrectionActivity from "./pageComponents/TLCorrectionActivity";
import TLCorrectionPlaceOfActivity from "./pageComponents/TLCorrectionPlaceOfActivity";
import CorrectionCheckPage from "./pages/citizen/Correction/CorrectionCheckPage"
import TLCorrectionDetailsView from "./pageComponents/TLCorrectionDetailsView"
import TLCorrectionDocumentUpload from "./pageComponents/TLCorrectionDocumentUpload"
import TLCorrectionAcknowledgement from "./pages/citizen/Correction/TLCorrectionAcknowledgement"
import MyApplicationDetails from "./pages/citizen/Applications/MyApplicationDetails"
import SearchCitizenApplication from "./components/SearchCitizenApplication"
import CancelTradeLicence from "./pages/citizen/Cancellation";
import TLCancelTradeLicenceDetails from "./pageComponents/TLCancelTradeLicenceDetails"
import TLCancellationAcknowledgement from "./pages/citizen/Cancellation/TLCancellationAcknowledgement"
import SearchMigrate from "./pages/employee/SearchMigrate";
import SearchLicenseMigration from "./components/SearchLicenseMigration";
import TLLicenseUnitDetPDE from "./pageComponents/TLLicenseUnitDetPDE";
import TLLicenseApplicantDetPDE from "./pageComponents/TLLicenseApplicantDetPDE";
import MigrateApplication from "./pages/employee/MigrateApplication";
export const TLModule = ({ stateCode, userType, tenants }) => {
  const { path, url } = useRouteMatch();

  const moduleCode = "TL";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  //addComponentsToRegistry();
  Digit.SessionStorage.set("TL_TENANTS", tenants);

  if (userType === "employee") {
    return <EmployeeApp path={path} url={url} userType={userType} />;
  } else return <CitizenApp />;
};

export const TLLinks = ({ matchPath, userType }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/tradelicence/new-application`,
      i18nKey: t("TL_CREATE_TRADE"),
    },
    // {
    //   link: `${matchPath}/tradelicence/renewal-list`,
    //   i18nKey: t("TL_RENEWAL_HEADER"),
    // },
    {
      link: `${matchPath}/tradelicence/my-application`,
      i18nKey: t("TL_MY_APPLICATIONS_HEADER"),
    },
    {
      link: `${matchPath}/tradelicence/license-renewal-search`,
      i18nKey: t("TL_RENEWAL_HEADER"),
    },
    {
      link: `${matchPath}/tradelicence/license-correction-search`,
      i18nKey: t("TL_CORRECTION_HEADER"),
    }, 
    // {
    //   link: `${matchPath}/tradelicence/license-cancellation-search`,
    //   i18nKey: t("TL_CANCELLATION_HEADER"),
    // }
  ];

  return <CitizenHomeCard header={t("ACTION_TEST_TRADE_LICENSE")} links={links} Icon={() => <CaseIcon className="fill-path-primary-main" />} />;
};

const componentsToRegister = {
  TLModule,
  TLLinks,
  TLCard,
  TradeLicense,
  Proof,
  TLCheckPage,
  TLDocument,
  TLAcknowledgement,
  TradeLicenseList,
  SearchApplication,
  SearchLicense,
  TL_INBOX_FILTER,
  TLInfoLabel,
  TLWFApplicationTimeline,
  TLApplicationDetails,
  TLCreateTradeLicence: CreateTradeLicence,
  TLEditTrade: EditTrade,
  TLList,
  TLRenewTrade: RenewTrade,
  TLSearchTradeComponent: SearchTradeComponent,
  TLNewApplication: NewApplication,
  TLReNewApplication: ReNewApplication,
  TLSearch: Search,
  TLResponse: Response,
  TLCreatePdeApplication: PdeApplication,
  TLPdeEntry,
  TLSearchPde: SearchPde,
  SearchPdeApplication,
  TLLicenseUnitDet,
  TLLicenseApplicantDet,
  TLDocumentUpload,
  TLSearchRenewalTrade: SearchRenewalTrade,
  SearchLicenseRenewal,
  TLLicenseUnitDetRenewal,
  TLLicenseApplicantDetRenewal,
  TLLocationSearch,
  TLCorrectionApplicant,
  TLCorrectionDetails,
  CorrectionTradeLicence,
  TLCorrectionOwner,
  TLCorrectionActivity,
  TLCorrectionPlaceOfActivity,
  CorrectionCheckPage,
  TLCorrectionDetailsView,
  TLCorrectionAcknowledgement,
  TLCorrectionDocumentUpload,
  MyApplicationDetails,
  SearchCitizenApplication,
  CancelTradeLicence,
  TLCancelTradeLicenceDetails,
  TLCancellationAcknowledgement,
  SearchMigrate,
  SearchLicenseMigration,
  TLLicenseUnitDetPDE,
  TLLicenseApplicantDetPDE,
  MigrateApplication
};
export const initTLComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
