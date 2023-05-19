import { Card, Header, KeyNote, Loader, SubmitBar, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MyApplications = ({ view }) => {
  const [applicationNumber, setApplicationNumber] = useState();
  const TableHeaderCell = {
    //  backgroundColor: "#f1f1f1",
    padding: 12,
    fontWeight: 500,
    textAlign: "left",
    fontSize: 14,
    borderBottom: '1pt solid #000000',
    borderTop: '1pt solid #000000',
    // lineHeight:50
  };
  const TableHeaderRow = {
    //backgroundColor: "#f1f1f1",
    padding: 12,
    // fontWeight: 400,
    textAlign: "left",
    fontSize: 14,
    borderBottom: '1pt solid #000000'
  };
  const Heading = {
    padding: 20,
    fontWeight: 500,
    textAlign: "left",
    fontSize: 20,
    paddingBottom: "20px"
  };

  const { t } = useTranslation();

  const { mobileNumber, tenantId } = Digit.UserService.getUser()?.info || {}

  const { isLoading, isError, data, error, ...rest } = view === "bills" ? Digit.Hooks.tl.useFetchBill(
    {
      params: { businessService: "TL", tenantId, mobileNumber },
      config: { enabled: view === "bills" }
    }
  ) : Digit.Hooks.tl.useTLSearchApplication({}, {
    enabled: view !== "bills"
  }, t);

  const changesetApplicationNumber = (e => {
    if (e.target.value.trim().length > 0 && e.target.value.trim() !== ".") {
      setApplicationNumber(e.target.value.length <= 100 ? e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '') : (e.target.value.replace(/[^A-Za-z1-9' @&.]/ig, '')).substring(0, 100));
    }
    else {
      setApplicationNumber('');
    }

  });


  const searchData =  () => {

  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>

      {/* <Header>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</Header> */}
      <span style={Heading}>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</span>

      {/* <div className="row">
        <div className="col-md-12">
          <div className="col-md-3">
            <CardLabel>{`${t("TL_HOME_SEARCH_RESULTS_APP_NO_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput type={"text"} name="applicationNumber"
              value={applicationNumber} onChange={changesetApplicationNumber}
            />
             <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={searchData} />
          </div>
        </div>
      </div>
 */}


      <div>
        <table>
          <thead style={TableHeaderCell}>
            <th style={{ width: "12%", textAlign: "left" }}>{`${t("TL_COMMON_TABLE_COL_APP_NO")}`}</th>
            <th style={{ width: "12%", textAlign: "left" }}>{`${t("TL_APPLICATION_CATEGORY")}`}</th>
            <th style={{ width: "12%", textAlign: "left" }}>{`${t("TL_COMMON_TABLE_COL_OWN_NAME")}`}</th>
            <th style={{ width: "12%", textAlign: "left" }}>{`${t("TL_COMMON_TABLE_COL_STATUS")}`}</th>
            <th style={{ width: "12%", textAlign: "left" }}>{`${t("TL_COMMON_TABLE_COL_TRD_NAME")}`}</th>
            {/* <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_INSTITUTION_TYPE_LABEL")}`}</th> */}
            <th style={{ width: "12%", textAlign: "left" }}></th>
          </thead>
          <tbody >
            {data?.map((application) => (

              <tr style={TableHeaderRow}>
                <td>{application?.TL_COMMON_TABLE_COL_APP_NO}</td>
                <td>{application?.raw?.applicationType}</td>
                <td>{application?.TL_COMMON_TABLE_COL_OWN_NAME}</td>
                <td>{`${t(application?.TL_COMMON_TABLE_COL_STATUS)}`}</td>
                <td>{application?.raw?.licenseUnitName}</td>
                {/* <td>{application?.TL_INSTITUTION_TYPE_LABEL}</td> */}
                <td>
                  <Link to={`/digit-ui/citizen/tl/tradelicence/application/${application?.raw?.applicationNumber}/${application.raw?.tenantId}`}>
                    <SubmitBar label={t(application?.raw?.status != "PENDINGPAYMENT" ? "TL_VIEW_DETAILS" : "TL_VIEW_DETAILS_PAY")} />
                  </Link>{" "}
                </td>
              </tr>
            )

            )}
          </tbody>
        </table>
      </div>



    </React.Fragment>
  );
};
export default MyApplications;
