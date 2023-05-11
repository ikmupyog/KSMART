import React, { useState } from "react";
import moment from "moment";
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
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBirthInclusion from "../../../components/SearchBirthInclusion";
import BirthInclusionEditPage from "../../../pageComponents/birthComponents/BirthInclusionPage";
// import BirthCertificate from "./BirthCertificate";

const BirthInclusion = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  let history = useHistory();
  const [apiConfig, setApiConfig] = useState({ enabled: false });
  const [payload, setPayload] = useState({});

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
    setApiConfig({ enabled: true });
  }
  //   const queryClient = useQueryClient();
  // const tenantId = Digit.ULBService.getCurrentTenantId();

  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0),
  };

  const { data: { RegisterBirthDetails: searchReult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistrySearchBirth({
    filters: {...payload, dateofbirth: payload.dateofbirth && moment(payload.dateofbirth, 'YYYY/MM/DD').valueOf()},
    config,
  });

  const gotoEditInclusion = async (data) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/birth-inclusion-edit`,
      state: { inclusionData: data, isfetchData: true },
    });
  };
  // const { data: { filestoreId: storeId } = {} } = Digit.Hooks.cr.useResistryDownloadBirth({ filters: registryPayload, config });

  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      {/* <Switch>
        <Route path={`${path}`}> */}
      <SearchBirthInclusion
        t={t}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchReult?.length > 0 ? searchReult : []) : ""}
        // filestoreId={storeId}
        // isSuccess={isSuccess}
        isLoading={isLoading}
        count={count}
        onInclusionClick={gotoEditInclusion}
      />
      {/* </Route> */}
      {/* <Route path={`${path}/acknowledgement`}>
          <BirthInclusionEditPage />
        </Route> */}
      {/* <Route>
          <Redirect to={`${match.path}/${config.indexRoute}`} />
        </Route> */}
      {/* </Switch> */}
    </React.Fragment>
  );
};

export default BirthInclusion;
