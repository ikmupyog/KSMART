import React, { useState } from "react";
import { BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import DeathNacCertificate from "../../../components/SearchNacBirthApplication";
import DeathNacCertificate from "../../../components/SearchNacDeathApplication";
import _ from "lodash";
import { convertDateToEpoch } from "../../../utils";

const DeathNacCertificateSearch = ({ path }) => {
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

  const { data: { deathNACDtls: searchReult, Count: count = 0 } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistryNacSearchDeath({
    filters: payload,
    config,
  });
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <DeathNacCertificate t={t} onSubmit={onSubmit} data={searchReult || []} isSuccess={isSuccess} isLoading={isLoading} count={count} />
    </React.Fragment>
  );
};

export default DeathNacCertificateSearch;
