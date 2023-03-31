import React, { useEffect, useState } from "react";
import {
  BackButton,
  TextInput,
  Label,
  SubmitBar,
  LinkLabel,
  ActionBar,
  CloseSvg,
  DatePicker,
  CardLabelError,
  SearchForm,
  SearchField,
  Dropdown,
} from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchMarriageInclusion from "../../../components/SearchMarriageInclusion";
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";

const MarriageInclusion = () => {
  // const [enableFlag, setEnableFlag] = useState(false);
  // const { t } = useTranslation();
  // const { path } = useRouteMatch();
  // const match = useRouteMatch();
  // const { pathname } = useLocation();
  // const history = useHistory();
  // const queryClient = useQueryClient();
  // // const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_SEARCH_MARRIAGE_REG", {});

  // const stateId = Digit.ULBService.getStateId();
  // // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  // let config = [];
  // let { data: newConfig, isLoading } = true;
  // newConfig = newConfigCR;
  // newConfig?.forEach((obj) => {
  //   config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  // });
  // // config.indexRoute = "marriage-registration";
  // const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
  //   let currentPath = pathname.split("/").pop(),
  //     nextPage;
  //   let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
  //   let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
  //   let redirectWithHistory = history.push;
  //   if (skipStep) {
  //     redirectWithHistory = history.replace;
  //   }
  //   if (isAddMultiple) {
  //     nextStep = key;
  //   }
  //   if (nextStep === null) {
  //     return redirectWithHistory(`${match.path}/check`);
  //   }
  //   nextPage = `${match.path}/${nextStep}`;
  //   redirectWithHistory(nextPage);
  // };

  // // function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
  // //   setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
  // //   if (key === "isSkip" && data === true) {
  // //     goNext(skipStep, index, isAddMultiple, key, true);
  // //   } else {
  // //     goNext(skipStep, index, isAddMultiple, key);
  // //   }
  // // }
  // const createProperty = async () => {
  //   history.push(`${match.path}/acknowledgement`);
  // };

  // const onSuccess = () => {
  //   sessionStorage.removeItem("CurrentFinancialYear");
  //   queryClient.invalidateQueries("CR_CREATE_BIRTH_REG");
  // };
  // const handleSkip = () => {};
  // const handleMultiple = () => {};

  // const [payload, setPayload] = useState({});

  // function onSubmit(_data) {
  //   var fromDate = new Date(_data?.fromDate);
  //   fromDate?.setSeconds(fromDate?.getSeconds() - 19800);
  //   var toDate = new Date(_data?.toDate);
  //   toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800);
  //   const data = {
  //     ..._data,
  //     ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
  //     ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {}),
  //   };

  //   setPayload(
  //     Object.keys(data)
  //       .filter((k) => data[k])
  //       .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {})
  //   );
  //   refetch();
  // }

  // const configTemp = {
  //   enabled: !!(payload && Object.keys(payload).length > 0),
  // };

  // const { data: { marriageCertificateDtls: searchResult, Count: count } = {}, isLoadingData, isSuccess, refetch } = Digit.Hooks.cr.useSearchMarriage({
  //   filters: payload,
  //   configTemp,
  //   // enableFlag: ,
  // });
  // // useEffect(() => {
  // //   console.log("searchResult", searchResult);
  // // }, [searchResult, isLoadingData]);

  // const gotoEditInclusion = async (data) => {
  //   history.push(`${path}/marriage-correction-edit/marriage-registration-correction`,{
  //     inclusionData:data,
  //   });
  // };
  // //   let payloadData = { id: isSuccess && searchResult[0]?.id, source: "sms" };
  // //   let registryPayload = Object.keys(payloadData)
  // //     .filter((k) => payloadData[k])
  // //     .reduce((acc, key) => ({ ...acc, [key]: typeof payloadData[key] === "object" ? payloadData[key].code : payloadData[key] }), {});
  // //   const { data:  { filestoreId: storeId } = {} } = Digit.Hooks.cr.useRegistryDownloadDeath({  filters: registryPayload, config });

  // return (
  //   <React.Fragment>
  //     <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
  //       <SearchMarriageInclusion
  //         t={t}
  //         onSubmit={onSubmit}
  //         data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""}
  //         // filestoreId={storeId}
  //         // isSuccess={isSuccess}
  //         // isLoading={isLoading}
  //         count={count}
  //         onInclusionClick={gotoEditInclusion}
  //       />
  //   </React.Fragment>
  // );

  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let history = useHistory();

  const [payload, setPayload] = useState({});

  function onSubmit(_data) {
    var fromDate = new Date(_data?.fromDate);
    fromDate?.setSeconds(fromDate?.getSeconds() - 19800);
    var toDate = new Date(_data?.toDate);
    toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800);
    const data = {
      ..._data,
      ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
      ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {}),
    };

    setPayload(
      Object.keys(data)
        .filter((k) => data[k])
        .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {})
    );
  }
  //   const queryClient = useQueryClient();

  const config = {
    enabled: true,
  };
  

  const gotoEditInclusion = async (data) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/marriage-correction-edit/marriage-registration-correction`,
      state: { inclusionData:data }
    });
  };
  // const { data: { filestoreId: storeId } = {} } = Digit.Hooks.cr.useResistryDownloadBirth({ filters: registryPayload, config });

  // return (
  //   <React.Fragment>
  //     <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
  //     {/* <Switch>
  //       <Route path={`${path}`}> */}
  //         <SearchMarriageInclusion
  //           t={t}
  //           onSubmit={onSubmit}
  //           data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""}
  //           // filestoreId={storeId}
  //           // isSuccess={isSuccess}
  //           // isLoading={isLoading}
  //           count={count}
  //           onInclusionClick={gotoEditInclusion}
  //         />
  //       {/* </Route> */}
  //       {/* <Route path={`${path}/birth-inclusion-edit`}>
  //         <BirthInclusionEditPage />
  //       </Route> */}
  //       {/* <Route>
  //         <Redirect to={`${match.path}/${config.indexRoute}`} />
  //       </Route> */}
  //     {/* </Switch> */}
  //   </React.Fragment>
  // );
  console.log("Jetheesh");
  const SearchMarriageInclusion = Digit.ComponentRegistryService.getComponent('SearchMarriageInclusion')

  const { data: { marriageDetails: searchResult, Count: count } = {}, isLoading, isSuccess, } = Digit.Hooks.cr.useRegistrySearchMarriage({ filters: payload, config });
  console.log(searchResult);
  return <SearchMarriageInclusion t={t} tenantId={tenantId} onSubmit={onSubmit}  data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />

};

export default MarriageInclusion;
