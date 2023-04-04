import React, { useState } from "react";

import { Card, Header, KeyNote, Loader, SubmitBar, BackButton, } from "@egovernments/digit-ui-react-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchBirthApplication from "../../../components/SearchBirthApplication";

const MyCRApplications = ({ view }) => {
  const { variant } = useParams();
  const { t } = useTranslation();
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
    enabled: !!(payload && Object?.keys(payload).length > 0),
  };

    const { mobileNumber, tenantId } = Digit.UserService.getUser()?.info || {}
    const { isLoading, isError, data, error, ...rest } = view === "bills" ? Digit.Hooks.cr.useFetchBill(
      {
        params: { businessService: "CR", tenantId, mobileNumber },
        config: { enabled: view === "bills" }
      }
    ) : Digit.Hooks.cr.useCRSearchApplication({}, {
      enabled: view !== "bills"
    },t);
    if (isLoading) {
      return <Loader />;
    }
    
  return (
    <React.Fragment>
      {/* <Header>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</Header>
      {data?.map((application) => {
        return (
          
          <div>
           
            <Card>
              {Object.keys(application).filter(e => e !== "raw" && application[e] !== null).map(item => <KeyNote keyValue={t(item)} note={t(application[item])} />)}
               <Link to={`/digit-ui/citizen/cr/cr/application/${application?.TL_COMMON_TABLE_COL_APP_NO}/${application?.TL_COMMON_CITY_NAME}`}>
                <SubmitBar label={t(application?.ChildDetails?.applicationStatus != "PENDINGPAYMENT" ? "TL_VIEW_DETAILS" : "TL_VIEW_DETAILS_PAY")} />
              </Link>{" "}
            </Card>
          </div>
        );
      })} */}
      <BackButton>{t("CS_COMMON_BACK2")}</BackButton>
      <SearchBirthApplication
        t={t}
        data={data}
        onSubmit={onSubmit}
        // filestoreId={storeId}
        // isSuccess={isSuccess}
        // isLoading={isLoading}
        count={50}
      />

    </React.Fragment>
  );
};
export default MyCRApplications;
