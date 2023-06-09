import React, { useEffect, useState } from "react";
import moment from "moment";
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
  const [enableConfig, setEnableConfig] = useState({ enabled: false });
  const [fetchData, setFetchData] = useState([]);

  const mutation = Digit.Hooks.cr.useRegistrySearchMarriage(tenantId);

  const onSuccess = (data) => {
    setFetchData(data?.MarriageDetails);
  };

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
    setEnableConfig({ enabled: true });
    const params = {
      filters: payload,
    };
   
  }

  useEffect(()=>{
   if( Object.keys(payload)?.length > 0) {
    console.log("payload==",payload);
    mutation.mutate(
      {
        filters: {...payload,marriageDOM: payload.marriageDOM && moment(payload.marriageDOM, 'YYYY-MM-DD').valueOf()},
      },
      { onSuccess }
    );
   }
  },[payload])

  const gotoEditCorrection = async (data) => {
    history.push({
      // pathname: `/digit-ui/citizen/cr/marriage-correction-edit`,
      pathname: `/digit-ui/citizen/cr/marriage-correction-applicant-details`,
      state: { marriageCorrectionData: data },
    });
  };

  // const config = {
  //   enabled: !!(payload && Object.keys(payload).length > 0),
  //   };

  return (
    <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
    <SearchMarriageInclusion
      t={t}
      tenantId={tenantId}
      onSubmit={onSubmit}
      data={fetchData?.length > 0 ? fetchData : ""}
      count={mutation.data?.Count}
      isLoading={mutation.isLoading}
      isSuccess={mutation.isSuccess}
      onCorrectionClick={gotoEditCorrection}
    />
    </React.Fragment>
  );
};

export default MarriageCorrection;
