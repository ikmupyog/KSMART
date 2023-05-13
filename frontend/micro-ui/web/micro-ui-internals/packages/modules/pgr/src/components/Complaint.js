import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Card, DateWrap, KeyNote, Table } from "@egovernments/digit-ui-react-components";
import { CardSubHeader } from "@egovernments/digit-ui-react-components";
import { LOCALIZATION_KEY } from "../constants/Localization";

// import { ConvertTimestampToDate } from "../@egovernments/digit-utils/services/date";

const Complaint = ({ data, path, onNextPage, onPrevPage, currentPage, onPageSizeChange, pageSizeLimit }) => {
  // let { serviceCode, serviceRequestId, applicationStatus } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const { t } = useTranslation();

  // const handleClick = () => {
  //   history.push(`${path}/${serviceRequestId}`);
  // };

  // const fetchData = async () => {
  //   const serviceIds = data.map(item => item.serviceRequestId)
  //   const serviceIdParams = serviceIds.join();
  //   const workflowInstances = await Digit.WorkflowService.getByBusinessId(tenantId, serviceIdParams);
  //   console.log("wfi", workflowInstances)
  // }

  useEffect(() => {
    // fetchData()
  }, [data])

  const closedStatus = ["RESOLVED", "REJECTED", "CLOSEDAFTERREJECTION", "CLOSEDAFTERRESOLUTION"];

  const headerStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "80%",
    fontSize: "26px"
  }

  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const columns = React.useMemo(
    () => [
      {
        Header: t("CS_COMMON_COMPLAINT_NO"),
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <Link to={`${path}/${row.original["serviceRequestId"]}`}>{row.original["serviceRequestId"]}</Link>
              </span>
              <br />
            </div>
          );
        },
      },
      {
        Header: t("CS_ADDCOMPLAINT_COMPLAINT_TYPE"),
        Cell: ({ row }) => {
          return GetCell(t(`SERVICEDEFS.${row.original["serviceCode"].toUpperCase()}`));
        },
      },
      {
        Header: t("CS_COMPLAINT_FILED_DATE"),
        Cell: ({ row }) => {
          return GetCell(Digit.DateUtils.ConvertTimestampToDate(row.original?.auditDetails["createdTime"]));
        },
      },
      {
        Header: t("CS_COMPLAINT_DETAILS_APPLICATION_STATUS"),
        Cell: ({ row }) => {
          return GetCell(t(`CS_COMMON_${row.original["applicationStatus"]}`));
        },
      }
    ],
    [t]
  );

  return (
    <div className="col-md-12">
      <Table
        t={t}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("CS_COMMON_COMPLAINT_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
            },
          };
        }}
        data={data}
        columns={columns}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        currentPage={currentPage}
        onPageSizeChange={onPageSizeChange}
        pageSizeLimit={pageSizeLimit}
      />
    </div>
  );
};

export default Complaint;
