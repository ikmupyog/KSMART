import React, { useCallback, useMemo, useState } from "react";
import { Table } from "@egovernments/digit-ui-react-components";
import { convertEpochToDateDMY } from "../../utils";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { downloadDocument } from "../../utils/uploadedDocuments";

const GetCell = (value) => <span className="cell-text">{value}</span>;

const ResultTable = ({ setValue, getValues, data = [], count = 0, handleSubmit, t, onSubmit, downloadLink, searchType, tenantId }) => {
  let history = useHistory();
  const fileSource = Digit.Hooks.cr.getMarriageRegistryFileSourceDetails(tenantId);
  const [isLoading, setIsLoading] = useState(false);

  const goToLink = ({ pathname, state = {} }) => {
    history.push({ pathname, state });
  };

  const generateActions = (rowData) => {
    console.log({ rowData })
    const status = _.get(rowData, "TL_APPLICATION_STATUS", "INITIATED");
    let response = "";
    switch (status) {
      case "CITIZENACTIONREQUIRED":
        response = <span className="link" onClick={() => goToLink({ pathname: '/digit-ui/citizen/cr/marriage-correction-edit', state: { marriageCorrectionData: rowData } })}>
          EDIT
        </span>
        break;
      case "PENDINGPAYMENT":
        response = <span className="link" onClick={() => goToLink({ pathname: `/digit-ui/citizen/payment/collect/CR/${rowData?.applicationNumber}?tenantId=${rowData?.marriageTenantid}` })}>
          MAKE PAYMENT
        </span>
        break;
      default:
        response = <span className="link" onClick={() => goToLink({ pathname: `/digit-ui/citizen/cr/my-application-marriage/${rowData.applicationNumber}` })}>
          VIEW DETAILS
        </span>
        break;
    }
    return response;
  }

  const columns = useMemo(() => {
    const cols = [
      {
        Header: t(searchType == "application" ? "CR_SEARCH_APP_NO_LABEL" : "CR_REGISTRATION_NO"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.applicationNumber)
      },
      {
        Header: t("CR_DATE_OF_MARRIAGE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.marriageDOM ? convertEpochToDateDMY(row.marriageDOM) : ""),
      },
      {
        Header: t("CR_NAME_OF_HUSBAND"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            `${row.GroomDetails.groomFirstnameEn || ""} ${row.GroomDetails.groomMiddlenameEn || ""} ${row.GroomDetails.groomLastnameEn || ""}` || "-"
          ),
      },
      {
        Header: t("CR_NAME_OF_WIFE"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            `${row.BrideDetails.brideFirstnameEn || ""} ${row.BrideDetails.brideMiddlenameEn || ""} ${row.BrideDetails.brideLastnameEn || ""}` || "-"
          ),
      }
    ];

    if (searchType == "certificate") {
      cols.push({
        Header: t("Download Certificate"),
        disableSortBy: true,
        Cell: ({ row }) => {
          let id = _.get(row, "original.id", null);
          return (
            <div>
              {id !== null && (
                <span
                  className="link"
                  onClick={() => {
                    setIsLoading(true);
                    fileSource.mutate(
                      { filters: { id, source: "sms" } },
                      {
                        onSuccess: (fileDownloadInfo) => {
                          setIsLoading(false);
                          const { filestoreId } = fileDownloadInfo;
                          if (filestoreId) {
                            downloadDocument(filestoreId);
                          } else {
                            console.log("filestoreId is null");
                          }
                        },
                        onError: (err) => {
                          setIsLoading(false);
                          alert("Download certificate not available");
                        },
                      }
                    );
                  }}
                >
                  Download
                </span>
              )}
            </div>
          );
        },
      });
    } else {
      cols.push({
        Header: t("STATUS"),
        disableSortBy: true,
        Cell: ({ row }) => generateActions(row.original)
      })
    }
    return cols;
  }, []);

  const onSort = useCallback((args) => {
    if (args.length === 0) return;
    setValue("sortBy", args.id);
    setValue("sortOrder", args.desc ? "DESC" : "ASC");
  }, []);

  function onPageSizeChange(e) {
    setValue("limit", Number(e.target.value));
    handleSubmit(onSubmit)();
  }

  function nextPage() {
    setValue("offset", getValues("offset") + getValues("limit"));
    handleSubmit(onSubmit)();
  }
  function previousPage() {
    setValue("offset", getValues("offset") - getValues("limit"));
    handleSubmit(onSubmit)();
  }

  return (
    <Table
      t={t}
      data={data}
      totalRecords={count}
      columns={columns}
      getCellProps={(cellInfo) => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
            padding: "20px 18px",
            fontSize: "16px",
          },
        };
      }}
      onPageSizeChange={onPageSizeChange}
      currentPage={getValues("offset") / getValues("limit")}
      onNextPage={nextPage}
      onPrevPage={previousPage}
      pageSizeLimit={getValues("limit")}
      onSort={onSort}
      disableSort={false}
      sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
    />
  );
};

export default ResultTable;
