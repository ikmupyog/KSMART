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
import { newConfig as newConfigCR } from "../../../config/config";
import { useQueryClient } from "react-query";
import SearchMarriageInclusion from "../../../components/SearchMarriageInclusion";

const MarriageCorrection = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let history = useHistory();

  const [payload, setPayload] = useState({});
  const [enableConfig, setEnableConfig] = useState({enabled:false});
  const [fetchData,setFetchData]  =useState([]);

  const mutation = Digit.Hooks.cr.useRegistrySearchMarriage(tenantId);

  const onSuccess = (data) =>{
 console.log("success data==",data);
 setFetchData(data?.MarriageDetails);
  }

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

    setEnableConfig({enabled: true})
    const params = {
      filters: payload
    }
    mutation.mutate(params,{onSuccess})
  }

  const gotoEditCorrection = async (data) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/marriage-correction-edit`,
      state: { marriageCorrectionData: data },
    });
  };

  // const config = {
  //   enabled: !!(payload && Object.keys(payload).length > 0),
  //   };

console.log("mutation.isLoading", mutation.isFetching,mutation.isLoading);

  return (
    <SearchMarriageInclusion
      t={t}
      tenantId={tenantId}
      onSubmit={onSubmit}
      data={fetchData?.length > 0 ? fetchData : ""}
      count={mutation.data?.Count}
      isLoading={mutation.isLoading}
      onCorrectionClick={gotoEditCorrection}
    />
  );
};

export default MarriageCorrection;
