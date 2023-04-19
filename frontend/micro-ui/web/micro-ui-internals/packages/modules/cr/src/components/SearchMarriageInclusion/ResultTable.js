import React, {Fragment, useCallback, useMemo, useState} from "react";
import {Loader, Table} from "@egovernments/digit-ui-react-components";
import {convertEpochToDateDMY} from "../../utils";
import _ from "lodash";
import { downloadDocument } from "../../utils/uploadedDocuments";

const ResultTable = ({
                         setValue,
                         getValues,
                         data = [],
                         count = 0,
                         handleSubmit,
                         t,
                         onSubmit,
                         goToLink,
                         downloadLink,
                         searchType,
                         tenantId
                     }) => {
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    const fileSource = Digit.Hooks.cr.getMarriageRegistryFileSourceDetails(tenantId);
    const [isLoading, setIsLoading] = useState(false);



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
                    Header: t("Download Certificate"),
                    disableSortBy: true,
                    Cell: ({ row }) => {
                        let id = _.get(row, "original.id", null);
                        return (
                            <div>
                                {id !== null && <span className="link" onClick={() => {
                                    setIsLoading(true);
                                    fileSource.mutate({ filters: { id, source: "sms" } }, {
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
                                        }
                                    });
                                }}>
                Download
              </span>}
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
            {isLoading && <Loader/>}
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
        </>
    )
};

export default  ResultTable;