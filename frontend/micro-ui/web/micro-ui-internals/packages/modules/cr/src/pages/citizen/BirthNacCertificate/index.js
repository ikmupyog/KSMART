import React, { useState } from "react";
import { BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import BirthNacCertificate from "../../../components/SearchNacBirthApplication";
import _ from "lodash";
import { convertDateToEpoch } from "../../../utils";

const BirthNacCertificateSearch = ({ path }) => {
  const { t } = useTranslation();
  const [payload, setPayload] = useState({});

  function onSubmit(_data) {
    const data = {
      ..._data,
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

  const { data: { nacDetails: searchReult, Count: count = 0 } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistryNacSearchBirth({
    filters: payload,
    config,
  });
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <BirthNacCertificate t={t} onSubmit={onSubmit} data={searchReult || []} isSuccess={isSuccess} isLoading={isLoading} count={count} />
    </React.Fragment>
  );
};

export default BirthNacCertificateSearch;
