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

  const gotoEditCorrection = async (data) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/marriage-correction-edit/marriage-registration-correction`,
      state: { marriageCorrectionData: data },
    });
  };

  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0),
    };

  const SearchMarriageInclusion = Digit.ComponentRegistryService.getComponent("SearchMarriageInclusion");

  const { data: { MarriageDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistrySearchMarriage({
    filters: payload,
    config,
  });

  return (
    <SearchMarriageInclusion
      t={t}
      tenantId={tenantId}
      onSubmit={onSubmit}
      data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""}
      count={count}
      onCorrectionClick={gotoEditCorrection}
    />
  );
};

export default MarriageInclusion;
