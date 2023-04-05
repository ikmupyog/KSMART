import { Card, Header, KeyNote, Loader, SubmitBar, BackButton } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchDeathApplication from "../../../components/SearchDeathApplication";

const MyCRDeathApplications = ({view}) => {
  const { t } = useTranslation();
  const [payload, setPayload] = useState({});

  const { mobileNumber, tenantId } = Digit.UserService.getUser()?.info || {}

  const onSubmit = (_data) => {
    console.log('_data', _data)
    var fromDate = new Date(_data?.fromDate)
    fromDate?.setSeconds(fromDate?.getSeconds() - 19800)
    var toDate = new Date(_data?.toDate)
    toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
    const data = {
        ..._data,
        ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
        ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {})
    }

    setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))
  }
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
}


  
  const { isLoading, isSuccess, isError, data, error, Count: count, ...rest } = view === "bills" ? Digit.Hooks.cr.useDeathFetchBill(
    {
      params: { businessService: "CR", tenantId, mobileNumber },
      config: { enabled: view === "bills" }
    }
  ) : Digit.Hooks.cr.useCRDeathSearchApplication({}, {
     enabled: view !== "bills"
  },t);
  if (isLoading) {
    return <Loader />;
  }
 
  return (
    <React.Fragment>
     
     <Header>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</Header>
     <SearchDeathApplication
      t = {t}
      onSubmit = {onSubmit}
      data={data}
      isSuccess={isSuccess}
      isLoading={isLoading}
      count={count}
     />
     
      {/* {data?.map((application) => {
        return (
          
          <div>
            <Card>
              {Object.keys(application).filter(e => e !== "raw" && application[e] !== null).map(item => <KeyNote keyValue={t(item)} note={t(application[item])} />)}
               <Link to={`/digit-ui/citizen/cr/cr/death/application/${application?.TL_COMMON_TABLE_COL_APP_NO}/${application?.TL_COMMON_CITY_NAME}`}>
                <SubmitBar label={t(application.deathCertificateDtls?.applicationStatus !="WF_DEATHHOSP_PENDINGPAYMENT" ? "TL_VIEW_DETAILS" : "TL_VIEW_DETAILS_PAY")} />
              </Link>{" "}
            </Card>
          </div>
        );
      })} */}
    </React.Fragment>
  );
};
export default MyCRDeathApplications;
