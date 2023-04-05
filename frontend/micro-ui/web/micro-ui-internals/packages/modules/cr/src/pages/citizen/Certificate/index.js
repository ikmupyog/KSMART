import { BackButton } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchRegistryDeath from "../../../components/SearchRegistryDeath";

const DeathCertificateSearch = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.cr.useRegSearchDeath(tenantId);

  const [payload, setPayload] = useState({});
  const [searchData, setSearchData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


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

  const onSuccess = (data) => {
    setSearchData(data);
    setIsSuccess(true);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsSuccess(false);
    setIsLoading(true);
    mutation.mutate({ filters: payload }, { onSuccess });
  }, [payload])

  const { deathCertificateDtls: searchResult, Count: count } = searchData;

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <SearchRegistryDeath
        t={t}
        tenantId={tenantId}
        onSubmit={onSubmit}
        data={searchResult || []}
        isSuccess={isSuccess}
        isLoading={isLoading}
        count={count}
      />
    </React.Fragment>
  );
};

export default DeathCertificateSearch;
