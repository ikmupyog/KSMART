import { BackButton } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchRegistryDeath from "../../../components/SearchRegistryDeath";
import { STATE_CODE } from "../../../config/constants";
import { convertDateToEpoch } from "../../../utils";

const DeathCertificateSearch = () => {
  const { t } = useTranslation();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === STATE_CODE.KL) {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const mutation = Digit.Hooks.cr.useRegSearchDeath(tenantId);

  const [payload, setPayload] = useState({});
  const [searchData, setSearchData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  function onSubmit(data) {
    if (!_.isEmpty(data.DateOfDeath)) {
      _.set(data, "DateOfDeath", convertDateToEpoch(data.DateOfDeath, "start"))
    }
    
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
    let { limit, offset, sortBy, sortOrder, ...filters } = payload
    if (!_.isEmpty(filters)) {
      setIsSuccess(false);
      setIsLoading(true);
      mutation.mutate({ filters: payload }, { onSuccess });
    }
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
        onRestClick={setSearchData}
      />
    </React.Fragment>
  );
};

export default DeathCertificateSearch;
