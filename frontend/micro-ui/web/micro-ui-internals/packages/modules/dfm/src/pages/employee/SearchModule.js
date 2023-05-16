import React, { useState,useEffect } from "react";
import { TextInput } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchModule = ({ path }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log(tenantId);

  const [payload, setPayload] = useState({});

  const Search = Digit.ComponentRegistryService.getComponent("SearchModuleApplication");
  const SearchSubfunction = Digit.ComponentRegistryService.getComponent("SubFunctionApplication");

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
  if (window.location.href.includes("/module-adding") == true) {
    const { data: { ModuleDetails: searchReult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.dfm.useSearchmodule({
      tenantId,
      filters: payload,
      config,
    });
    useEffect(() => {
      
    }, [searchReult]);
    return (
      <Search
        t={t}
        tenantId={tenantId}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchReult?.length > 0 ? searchReult : { display: "ES_COMMON_NO_DATA" }) : ""}
        count={count}
      />
    );
   
  } else if (window.location.href.includes("/sub-function-adding") == true) {
    const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useAdoptionSearch({
      tenantId,
      filters: payload,
      config,
    });
    return (
      <SearchSubfunction
        t={t}
        tenantId={tenantId}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""}
        count={count}
      />
    );
  }
};

export default SearchModule;
