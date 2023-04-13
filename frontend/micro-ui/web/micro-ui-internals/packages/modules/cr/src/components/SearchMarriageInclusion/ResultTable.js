import React, {Fragment, useCallback, useMemo} from "react";
import { Table } from "@egovernments/digit-ui-react-components";
import {convertEpochToDateDMY} from "../../utils";

const ResultTable = ({
                         setValue,
                         getValues,
                         data = [],
                         handleSubmit,
                         t,
                         onSubmit,
                         goToLink,
                         downloadLink,
                         searchType
                     }) => {
    const GetCell = (value) => <span className="cell-text">{value}</span>;

    const columns = useMemo(
        () => {
            const cols = [
                {
                    Header: t(searchType == 'application' ? "CR_SEARCH_APP_NO_LABEL" : "REGISTRATION NO"),
                    accessor: "marriageRecordNo",
                    disableSortBy: true,
                    Cell: ({ row }) => {
                        return (
                            <div>
                            <span className="link" onClick={() => goToLink(row.original)}>
                                {searchType == 'application' ? row.original.applicationNumber : row.original.registrationno}
                            </span>
                            </div>
                        );
                    },
                },
                {
                    Header: t("CR_DATE_OF_MARRIAGE"),
                    disableSortBy: true,
                    accessor: (row) => GetCell(row.marriageDOM ? convertEpochToDateDMY(row.marriageDOM) : ""),
                },
                {
                    Header: t("CR_NAME_OF_HUSBAND"),
                    disableSortBy: true,
                    accessor: (row) => GetCell(`${row.GroomDetails.groomFirstnameEn || ""} ${row.GroomDetails.groomMiddlenameEn || ""} ${row.GroomDetails.groomLastnameEn || ""}` || "-"),
                },
                {
                    Header: t("TL_NAME_OF_WIFE"),
                    disableSortBy: true,
                    accessor: (row) => GetCell(`${row.BrideDetails.brideFirstnameEn || ""} ${row.BrideDetails.brideMiddlenameEn || ""} ${row.BrideDetails.brideLastnameEn || ""}` || "-"),
                }
            ];
            if (searchType == 'certificate') {
                cols.push({
                    Header: t("ACTION"),
                    accessor: "action",
                    disableSortBy: true,
                    Cell: ({ row }) => {
                        return (
                            <div>
                            <span className="link" onClick={() => downloadLink(row.original)}>
                                Download
                            </span>
                            </div>
                        );
                    },
                })
            }
            return cols;
        },
        []
    );

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
        <>
            <Table
                t={t}
                data={data}
                totalRecords={data.length + 1000} // count always 0 in api. need to change once api is fixed
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
        </>
    )
};

export default  ResultTable;