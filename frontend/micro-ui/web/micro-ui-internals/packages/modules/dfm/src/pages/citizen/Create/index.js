import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig as newConfigTL } from "../../../config/config";
// import CheckPage from "./CheckPage";
// import TLAcknowledgement from "./TLAcknowledgement";
import Acknowledgement from "./DFMAcknowlegement";

const CreateTradeLicence = ({ parentRoute }) => {
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  let config = [];
  const [submitResponse, updateSubmitResponse] = useState([]);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_CREATE_APPLICATION", {});
  // console.log(params);
  let isReneworEditTrade = window.location.href.includes("/renew-trade/") || window.location.href.includes("/edit-application/");

  const stateId = Digit.ULBService.getStateId();
  let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});

  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    if (typeof nextStep == "object" && nextStep != null) {
      if (
        (params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId)) &&
        nextStep[sessionStorage.getItem("isAccessories")] &&
        nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property"
      ) {
        nextStep = "property-details";
      }
      if (
        nextStep[sessionStorage.getItem("isAccessories")] &&
        (nextStep[sessionStorage.getItem("isAccessories")] === "accessories-details" ||
          nextStep[sessionStorage.getItem("isAccessories")] === "map" ||
          nextStep[sessionStorage.getItem("isAccessories")] === "owner-ship-details" ||
          nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")
      ) {
        nextStep = `${nextStep[sessionStorage.getItem("isAccessories")]}`;
      } else if (
        nextStep[sessionStorage.getItem("StructureType")] &&
        (nextStep[sessionStorage.getItem("StructureType")] === "Building-type" ||
          nextStep[sessionStorage.getItem("StructureType")] === "vehicle-type")
      ) {
        nextStep = `${nextStep[sessionStorage.getItem("setPlaceofActivity")]}`;
        nextStep = `${nextStep[sessionStorage.getItem("StructureType")]}`;
      } else if (
        nextStep[sessionStorage.getItem("KnowProperty")] &&
        (nextStep[sessionStorage.getItem("KnowProperty")] === "search-property" ||
          nextStep[sessionStorage.getItem("KnowProperty")] === "create-property")
      ) {
        if (nextStep[sessionStorage.getItem("KnowProperty")] === "create-property" && !enableCreate) {
          nextStep = `map`;
        } else {
          nextStep = `${nextStep[sessionStorage.getItem("KnowProperty")]}`;
        }
      }
    }
    if (
      (params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId)) &&
      nextStep === "know-your-property"
    ) {
      nextStep = "property-details";
    }
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      // return redirectWithHistory(`${match.path}/check`);
      return handleSubmit();
    }
    if (isPTCreateSkip && nextStep === "acknowledge-create-property") {
      nextStep = "map";
    }
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };

  const handleSubmit = async () => {
    console.log("loged");
    let dfmPayload = {
      RequestInfo: {
        apiId: "apiId",
        ver: "1.0",
        ts: null,
        action: null,
        did: null,
        key: null,
        msgId: null,
        authToken: "e1da9783-0cc3-4723-a82a-3b5e302b08fa",
        correlationId: null,
        userInfo: {
          id: 4664,
          userName: "ANISHFM",
          name: null,
          type: null,
          mobileNumber: null,
          emailId: null,
          tenantId: "kl",
          roles: [
            {
              name: "CITIZEN",
              code: "FM_CEMP",
              tenantId: "kl",
            },
          ],
          uuid: "d75bfcda-bded-4c58-b3f9-38bf9dbbbf95",
        },
      },
      ApplicantPersonals: [
        {
          id: 1,
          aadhaarNo: 62234567,
          email: null,
          firstName: "KP",
          lastName: "GG",
          title: null,
          mobileNo: 9446903827,
          tenantId: "kl",
          serviceDetails: {
            id: 1,
            applicantPersonalId: 23,
            serviceId: 16,
            serviceCode: "PN001.ALP",
            serviceSubType: 2,
            serviceMinorType: 5,
          },
          applicantAddress: {
            id: 1,
            applicantPersonalId: 23,
            houseNo: "45",
            houseName: "Smile",
            street: "Mannanthala",
            pincode: "695008",
            postOfficeName: "Ulloor",
          },
          applicantServiceDocuments: {
            id: 1,
            applicantPersonalId: 23,
            documentTypeId: 2,
            fileStoreId: 537,
            serviceDetailsId: 34,
            active: "Yes",
            documentNumber: 12345,
            applicationdetails: "aaaa",
          },
          applicantDocuments: {
            id: 1,
            applicantPersonalId: 23,
            documenttypeId: 2,
            documentNumber: 12345,
            docexpiryDate: 1234577,
          },
          fileDetail: {
            id: 1,
            applicantPersonalId: 23,
            tenantId: "kl",
            serviceDetailsId: 537,
            fileNumber: 1,
            fileCode: "KL-FM-2022-11-02-000043",
            fileName: "PensionAdalath",
            fileArisingMode: 1,
            fileArisingDate: null,
            financialYear: 2022,
            applicationDate: null,
            workflowCode: "NewDFM",
            action: "INITIATE",
            fileStatus: 1,
            businessService: 89,
            comment: "Test",
            assignee: [],
          },
          auditDetails: {
            createdBy: null,
            lastModifiedBy: null,
            createdTime: null,
            lastModifiedTime: null,
          },
        },
      ],
    };
    let pgrPayload = {
      service: {
        tenantId: "kl.cochin",
        serviceCode: "NoStreetlight",
        description: "test",
        additionalDetail: {},
        source: "web",
        address: {
          city: "Cochin Corporation",
          district: "Cochin Corporation",
          region: "Cochin Corporation",
          state: "Kerala",
          locality: { code: "56", name: "Panampilli Nagar" },
          geoLocation: {},
        },
      },
      workflow: { action: "APPLY" },
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: "0b34c11a-b204-43ce-9ec5-e77ffa347fea",
        userInfo: {
          id: 104,
          uuid: "d7b3a2f5-e6f0-4967-a4bb-257ff3c05e5f",
          userName: "9999999999",
          name: "sfsadf",
          mobileNumber: "9999999999",
          emailId: "ikm@kerala.gov.in",
          locale: null,
          type: "CITIZEN",
          roles: [{ name: "Citizen", code: "CITIZEN", tenantId: "kl" }],
          active: true,
          tenantId: "kl",
          permanentCity: null,
        },
        msgId: "1669898299780|en_IN",
      },
    };
    // const response = await Digit.PGRService.create(pgrPayload, "kl");
    const response = await Digit.DFMService.create(dfmPayload, "kl");
    if (response.responseInfo.status === "successful") {
      console.log("log");
      clearParams();
      updateSubmitResponse(response.ServiceWrappers);
    }
    console.log(response);
  };
  useEffect(() => {
    redirect();
  }, [submitResponse?.length > 0]);
  const redirect = () => {
    if (submitResponse?.length > 0) {
      console.log("dasg", submitResponse);
      history.push({
        pathname: `${match.path}/acknowledgement`,
        state: { detail: submitResponse },
      });
      // history.push(`${match.path}/acknowledgement`);
    }
  };

  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }

  const handleSkip = () => {};
  const handleMultiple = () => {};

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("TL_CREATE_TRADE");
  };

  newConfig = newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  // newConfig = newConfig ? newConfig : newConfigTL;
  // newConfig = newConfigTL;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  let skipenanbledOb = newConfig?.filter((obj) => obj?.body?.some((com) => com.component === "CPTCreateProperty"))?.[0];
  let skipenabled = skipenanbledOb?.body?.filter((ob) => ob?.component === "CPTCreateProperty")?.[0]?.isSkipEnabled;
  sessionStorage.setItem("skipenabled", skipenabled);
  config.indexRoute = "ApplicationDetails";
  // config.indexRoute = "TradeName";

  const CheckPage = Digit?.ComponentRegistryService?.getComponent("TLCheckPage");
  const TLAcknowledgement = Digit?.ComponentRegistryService?.getComponent("TLAcknowledgement");
  // console.log(config);
  return (
    <Switch>
      {config.map((routeObj, index) => {
        const { component, texts, inputs, key, isSkipEnabled } = routeObj;
        const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
        return (
          <Route path={`${match.path}/${routeObj.route}`} key={index}>
            <Component
              config={{ texts, inputs, key, isSkipEnabled }}
              onSelect={handleSelect}
              onSkip={handleSkip}
              t={t}
              formData={params}
              onAdd={handleMultiple}
              userType="citizen"
            />
          </Route>
        );
      })}
      {/* <Route path={`${match.path}/check`}>
        <CheckPage onSubmit={createProperty} value={params} />
      </Route> */}
      {/* <Route path={`${match.path}/acknowledgement`}>
        <TLAcknowledgement data={params} onSuccess={onSuccess} />
      </Route> */}
      <Route path={`${match.path}/acknowledgement`}>
        <Acknowledgement res={submitResponse} />
      </Route>
      {/* <Route path={`${match.path}/acknowledgement`}>
        <TLAcknowledgement data={params} onSuccess={onSuccess} />
      </Route> */}
      <Route>
        <Redirect to={`${match.path}/${config.indexRoute}`} />
      </Route>
    </Switch>
  );
};

export default CreateTradeLicence;
