import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import BirthCertificate from "./BirthCertificate";
import BirthCertificate from "../../../components/SearchRegistryBirth";

const BirthCertificateSearch = ({ path }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
  // const tenantId = Digit.ULBService.getCurrentTenantId();
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


 
  const {
    data: { RegisterBirthDetails: searchReult, Count: count } = {},
    isLoading,
    isSuccess,
  } = Digit.Hooks.cr.useRegistrySearchBirth({filters: payload, config }); 
  // console.log(searchReult);
  let payloadData = { id: isSuccess && searchReult[0]?.id, source: "sms" };
  let registryPayload = Object.keys(payloadData)
    .filter((k) => payloadData[k])
    .reduce((acc, key) => ({ ...acc, [key]: typeof payloadData[key] === "object" ? payloadData[key].code : payloadData[key] }), {});
  const { data:  { filestoreId: storeId } = {} } = Digit.Hooks.cr.useResistryDownloadBirth({  filters: registryPayload, config });

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <BirthCertificate
        t={t}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchReult?.length > 0 ? searchReult : { display: "ES_COMMON_NO_DATA" }) : ""}
        filestoreId={storeId}
        isSuccess={isSuccess}
        isLoading={isLoading}
        count={count}
      />
    </React.Fragment>
  );
};

export default BirthCertificateSearch;
