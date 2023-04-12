import { Card, Header, KeyNote, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MyApplications = ({ view }) => {
  const TableHeaderCell =  {
  //  backgroundColor: "#f1f1f1",
    padding: 12,
    fontWeight: 500,
    textAlign: "left",
    fontSize: 14,
    borderBottom: '1pt solid #000000',
    borderTop: '1pt solid #000000',
   // lineHeight:50
  };
  const TableHeaderRow =  {
    //backgroundColor: "#f1f1f1",
    padding: 12,
    // fontWeight: 400,
    textAlign: "left",
    fontSize: 14,
    borderBottom: '1pt solid #000000'
  };
  const Heading =  {
    padding: 20,
    fontWeight: 500,
    textAlign: "left",
    fontSize: 20,
    paddingBottom:"20px"
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
console.log(JSON.stringify(data));
  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>

      {/* <Header>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</Header> */}
      <span style={Heading}>{`${t("TL_MY_APPLICATIONS_HEADER")}`}</span>
      <div>
        <table>
          <thead style={TableHeaderCell}>
          <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_COMMON_TABLE_COL_APP_NO")}`}</th>
          <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_APPLICATION_CATEGORY")}`}</th>
          <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_COMMON_TABLE_COL_OWN_NAME")}`}</th>
          <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_COMMON_TABLE_COL_STATUS")}`}</th>
          <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_COMMON_TABLE_COL_TRD_NAME")}`}</th>
          {/* <th style={{width:"12%",textAlign:"left"}}>{`${t("TL_INSTITUTION_TYPE_LABEL")}`}</th> */}
          <th style={{width:"12%",textAlign:"left"}}></th>
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
