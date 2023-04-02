import React, { useEffect, useState } from "react";
import {
  BackButton,
  Loader,
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
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeathCertificate from "../../../components/SearchRegistryDeath";

const DeathCertificateSearch = ({ path }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  const tenantId = "kl.cochin";
  let downloadDeathConfig ={
    enabled: false
  }
  // const tenantId1 = Digit.ULBService.getCurrentTenantId();
  // const tenantId2 = Digit.ULBService.getStateId();
  const [payload, setPayload] = useState({});
  const [registryPayload, setRegistryPayload] = useState({});

  const Search = Digit.ComponentRegistryService.getComponent(variant === "license" ? "SearchLicense" : "SearchDfmApplication");

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
    console.log("search api params==,",config,payload);
    refetch();
  }
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0),
  };

 

  const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess,refetch } = Digit.Hooks.cr.useRegistrySearchDeath({
    tenantId,
    filters: payload,
    config,
  });

  // console.log("searchResult",isSuccess,searchResult?.[0]);
  useEffect(() => {
    console.log("reached==",isSuccess,searchResult,isLoading);
    if((searchResult?.length > 0)){
    let payloadData = { id: isSuccess && searchResult?.[0]?.InformationDeath?.Id, source: "sms" };

    let tempRegistryPayload = Object.keys(payloadData)
      .filter((k) => payloadData[k])
      .reduce((acc, key) => ({ ...acc, [key]: typeof payloadData[key] === "object" ? payloadData[key].code : payloadData[key] }), {});
    
    downloadDeathConfig = {
      enabled : (registryPayload && Object.keys(registryPayload).length > 0),
    }
    console.log("tempPatload==",tempRegistryPayload,downloadDeathConfig);
    setRegistryPayload(tempRegistryPayload);
    }
  }, [searchResult,isSuccess,isLoading]);

  const { data: { filestoreId: storeId } = {}, isLoading:isDownLoadLoading, isSuccess:isDownloadSuccess } = Digit.Hooks.cr.useRegistryDownloadDeath({ tenantId, filters: registryPayload, config:downloadDeathConfig });
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <DeathCertificate
        t={t}
        tenantId={tenantId}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""}
        filestoreId={storeId}
        isSuccess={isSuccess}
        isLoading={isLoading}
        count={count}
      />
    </React.Fragment>
  );
};

export default DeathCertificateSearch;
