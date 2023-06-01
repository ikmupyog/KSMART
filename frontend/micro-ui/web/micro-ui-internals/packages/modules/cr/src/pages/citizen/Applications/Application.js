import React, { useState } from "react";
import { Loader, BackButton, } from "@egovernments/digit-ui-react-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBirthApplication from "../../../components/SearchBirthApplication";
import _ from "lodash";

const MyCRApplications = ({ view }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  const [payload, setPayload] = useState({
    offset: 0,
    limit: 10,
    sortBy: "applicationNumber",
    sortOrder: "DESC",
    searchType: "MYAPP"
  });

  // const Search = Digit.ComponentRegistryService.getComponent(variant === "license" ? "SearchLicense" : "SearchDfmApplication");

  function onSubmit(data) {
    _.set(data, 'searchType', 'MYAPP');
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
  ) : Digit.Hooks.cr.useCRSearchApplication({ ...payload }, {
    enabled: view !== "bills"
  }, t);
  if (isLoading) {
    return <Loader />;
  }
  console.log('Count', Count)
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
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
