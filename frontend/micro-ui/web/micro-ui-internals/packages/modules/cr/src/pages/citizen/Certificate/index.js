import React, { useState } from "react";
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
  // const tenantId1 = Digit.ULBService.getCurrentTenantId();
  // const tenantId2 = Digit.ULBService.getStateId();
  const [payload, setPayload] = useState({});

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
  }
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0),
  };

  console.log(Digit.Hooks.cr.useRegistrySearchDeath({ tenantId, filters: payload, config }));
  const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistrySearchDeath({ tenantId, filters: payload, config })

  console.log(searchResult);
  let payloadData = { id: isSuccess && searchResult[0]?.id, source: "sms" };
  let registryPayload = Object.keys(payloadData).filter((k) => payloadData[k]).reduce((acc, key) => ({ ...acc, [key]: typeof payloadData[key] === "object" ? payloadData[key].code : payloadData[key] }), {});
  const { data: { filestoreId: storeId } = {} } = Digit.Hooks.cr.useRegistryDownloadDeath({ tenantId, filters: registryPayload, config });
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
        count={Count}
      />
    </React.Fragment>
  );
};

export default DeathCertificateSearch;
