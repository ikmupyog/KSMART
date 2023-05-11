import React, { useEffect } from "react";
import PGRCard from "./components/PGRCard";

import getRootReducer from "./redux/reducers";
import CitizenApp from "./pages/citizen";

import EmployeeApp from "./EmployeeApp";
import { ComplaintIcon, CitizenHomeCard, Loader } from "@egovernments/digit-ui-react-components";
import { PGR_CITIZEN_CREATE_COMPLAINT } from "./constants/Citizen";
import { useTranslation } from "react-i18next";
import { LOCALE } from "./constants/Localization";
import { ComplaintDetails } from "./pages/employee/ComplaintDetails";
import { CreateComplaint as CreateComplaintEmp } from "./pages/employee/CreateComplaint";
import Inbox from "./pages/employee/Inbox";
import ResponseEmp from "./pages/employee/CreateComplaint/Response";

import { CreateComplaint as CreateComplaintCitizen } from "./pages/citizen/Create";
import { ComplaintsList } from "./pages/citizen/ComplaintsList";
import ComplaintDetailsPage from "./pages/citizen/ComplaintDetails";
import SelectRating from "./pages/citizen/Rating/SelectRating";
import ResponseCitizen from "./pages/citizen/Create/Response";
import SelectPincode from "./pageComponents/Steps/SelectPincode";
import SelectAddress from "./pageComponents/Steps/SelectAddress";
import SelectComplaintType from "./pageComponents/Steps/SelectComplaintType";
import SelectDetails from "./pageComponents/Steps/SelectDetails";
import SelectGeolocation from "./pageComponents/Steps/SelectGeolocation";
import SelectImages from "./pageComponents/Steps/SelectImages";
import SelectLandmark from "./pageComponents/Steps/SelectLandmark";
import SelectSubType from "./pageComponents/Steps/SelectSubType";
import ComplaintInformer from "./pageComponents/Steps/ComplaintInformer";
import ComplaintSummary from "./pageComponents/Steps/ComplaintSummary";

export const PGRReducers = getRootReducer;

const PGRModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "PGR";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  if (isLoading) {
    return <Loader />;
  }

  Digit.SessionStorage.set("PGR_TENANTS", tenants);

  if (userType === "citizen") {
    return <CitizenApp />;
  } else {
    return <EmployeeApp />;
  }
};

const PGRLinks = ({ matchPath }) => {
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage(PGR_CITIZEN_CREATE_COMPLAINT, {});

  useEffect(() => {
    clearParams();
  }, []);

  const links = [
    {
      link: `${matchPath}/create-complaint/complaint-type`,
      i18nKey: t("CS_COMMON_FILE_A_COMPLAINT"),
    },
    {
      link: `${matchPath}/complaints`,
      i18nKey: t(LOCALE.MY_COMPLAINTS),
    },
  ];

  return <CitizenHomeCard header={t("CS_COMMON_HOME_COMPLAINTS")} links={links} Icon={ComplaintIcon} />;
};

const componentsToRegister = {
  PGRModule, PGRLinks, PGRCard,
  PGRComplaintDetails: ComplaintDetails,
  PGRCreateComplaintEmp: CreateComplaintEmp,
  PGRInbox: Inbox,
  PGRResponseEmp: ResponseEmp,
  PGRCreateComplaintCitizen: CreateComplaintCitizen,
  PGRComplaintsList: ComplaintsList,
  PGRComplaintDetailsPage: ComplaintDetailsPage,
  PGRSelectRating: SelectRating,
  PGRResponseCitzen: ResponseCitizen,
  PGRComplaintInformer: ComplaintInformer,
  PGRSelectAddress: SelectAddress,
  PGRSelectComplaintType: SelectComplaintType,
  PGRSelectDetails: SelectDetails,
  PGRSelectGeolocation: SelectGeolocation,
  PGRSelectImages: SelectImages,
  PGRSelectLandmark: SelectLandmark,
  PGRSelectPincode: SelectPincode,
  PGRSelectSubType: SelectSubType,
  PGRComplaintSummary: ComplaintSummary
};

export const initPGRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
