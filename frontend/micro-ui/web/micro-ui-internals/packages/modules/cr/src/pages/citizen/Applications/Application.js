import React, { useState } from "react";
import { Loader, BackButton, } from "@egovernments/digit-ui-react-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBirthApplication from "../../../components/SearchBirthApplication";

const MyCRApplications = ({ view }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  const [payload, setPayload] = useState({
    offset: 0,
    limit: 10,
    sortBy: "applicationNumber",
    sortOrder: "DESC",
  });

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


  const { mobileNumber, tenantId } = Digit.UserService.getUser()?.info || {}
  const { isLoading, isSuccess, isError, data, error, Count, ...rest } = view === "bills" ? Digit.Hooks.cr.useFetchBill(
    {
      params: { businessService: "CR", tenantId, mobileNumber },
      config: { enabled: view === "bills" }
    }
  ) : Digit.Hooks.cr.useCRSearchApplication({...payload}, {
    enabled: view !== "bills"
  }, t);
  if (isLoading) {
    return <Loader />;
  }
  console.log('Count', Count)
  return (
    <React.Fragment>
      <SearchBirthApplication
        t={t}
        data={data || []}
        onSubmit={onSubmit}
        // filestoreId={storeId}
        isSuccess={isSuccess}
        isLoading={isLoading}
        count={Count}
      />

    </React.Fragment>
  );
};
export default MyCRApplications;
