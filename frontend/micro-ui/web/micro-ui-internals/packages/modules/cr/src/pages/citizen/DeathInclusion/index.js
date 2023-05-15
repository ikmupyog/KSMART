import React, { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { Route, Switch, useRouteMatch, useLocation, useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchDeathInclusion from "../../../components/SearchDeathInclusion";
import DeathCorrectionAcknowledgement from "../../../pageComponents/deathComponents/DeathCorrectionEditPage/DeathCorrectionAcknowledgement";


const DeathInclusion = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch()
  const history = useHistory();
  const [payload, setPayload] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });

  function onSubmit(_data) {
    console.log("error data", _data);
    if (!_data.DeceasedGender && !_data.DeathACKNo) {    
      setToast({ show: true, message: t("CR_INVALID_GENDER") });
      return false;
    }
    setToast({ show: false, message: "" });
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

  const gotoEditCorrection = async (data) => {
    history.push({
      pathname: `/digit-ui/citizen/cr/death-correction-edit`,
      state: { correctionData:data }
    });
  };
 
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0) && !toast.show,
  };

  const {
    data: { deathCertificateDtls: searchResult, Count: count } = {},
    isLoading,
    isSuccess,
  } = Digit.Hooks.cr.useRegistrySearchDeath({filters: {...payload,DateOfDeath: payload.DateOfDeath && moment(payload.DateOfDeath, 'YYYY-MM-DD').valueOf()}, config }); 
  useEffect(()=>{
    console.log("searchResult==",searchResult,path);
  },[searchResult,isLoading])
//   let payloadData = { id: isSuccess && searchResult[0]?.id, source: "sms" };
//   let registryPayload = Object.keys(payloadData)
//     .filter((k) => payloadData[k])
//     .reduce((acc, key) => ({ ...acc, [key]: typeof payloadData[key] === "object" ? payloadData[key].code : payloadData[key] }), {});
//   const { data:  { filestoreId: storeId } = {} } = Digit.Hooks.cr.useRegistryDownloadDeath({  filters: registryPayload, config });

  const params = {}
  const onSuccess = {}
  return (
    <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
 
        <SearchDeathInclusion
        t={t}
        onSubmit={onSubmit}
        data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : []) : ""}
        isSuccess={isSuccess}
        // filestoreId={storeId}
        // isSuccess={isSuccess}
        // isLoading={isLoading}
        count={count}
        toast={toast}
        setToast={setToast}
        onCorrectionClick={gotoEditCorrection}
      />
  </React.Fragment>
  );
};

export default DeathInclusion;
