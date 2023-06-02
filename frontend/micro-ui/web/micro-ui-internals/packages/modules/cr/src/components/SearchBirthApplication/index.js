import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchForm, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchFields from "./SearchFields";
import _ from "lodash";

const mystyle = {
    bgOpacity: "1",
    backgroundColor: "red",
    backgroundColor: "#EDF2FA",
    marginBottom: "24px",
    marginTop: "20px",
    padding: "2.5rem",
    borderRadius: "2.6rem",
};
const hstyle = {
    fontSize: "20px",
    fontWeight: "500",
    color: "#00377B",
    marginBottom: "2.5rem",
    lineHeight: "2.5rem",
};

const generateActions = (rowData) => {
    const status = _.get(rowData, "TL_APPLICATION_STATUS", "INITIATED");
    let response = "";
    switch (status) {
        case "CITIZENACTIONREQUIRED":
            response = <span className="link">
                <Link to={`/digit-ui/citizen/cr/cr-birth-creation/child-details/${rowData?.TL_COMMON_TABLE_COL_APP_NO}`}>
                    EDIT
                </Link>
            </span>
            break;
        case "PENDINGPAYMENT":
            response = <span className="link">
                <Link to={`/digit-ui/citizen/payment/collect/CR/${rowData?.TL_COMMON_TABLE_COL_APP_NO}?tenantId=${rowData?.TL_COMMON_CITY_NAME}`}>
                    MAKE PAYMENT
                </Link>
            </span>
            break;
        default:
            response = <span className="link">
                <Link to={`/digit-ui/citizen/cr/cr/application/${rowData?.TL_COMMON_TABLE_COL_APP_NO}/${rowData?.TL_COMMON_CITY_NAME}`}>
                    VIEW DETAILS
                </Link>
            </span>
            break;
    }
    return response;
}

const SearchBirthApplication = ({ onSubmit, data, filestoreId, isSuccess, isLoading, count }) => {
    const [FileData, setFileData] = useState([]);
    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "applicationNumber",
            sortOrder: "DESC",
        },
    });
    const { t } = useTranslation();

    useEffect(() => {
        register("offset", 0);
        register("limit", 10);
        register("sortBy", "applicationNumber");
        register("sortOrder", "DESC");
    }, [register]);

    const onSort = useCallback((args) => {
        if (args.length === 0) return;
        setValue("sortBy", args.id);
        setValue("sortOrder", args.desc ? "DESC" : "ASC");
    }, []);

    function onPageSizeChange(e) {
        setValue("limit", Number(e.target.value));
        console.log('e.target.value', e.target.value)
        // setValue("limit", 10);
        handleSubmit(onSubmit)();
    }

    function onCurrentPage() {
        setValue("offset", getValues("offset") / getValues("limit"))
    }

    function nextPage() {
        setValue("offset", getValues("offset") + getValues("limit"));
        handleSubmit(onSubmit)();
        console.log('next');
    }
    function previousPage() {
        setValue("offset", getValues("offset") - getValues("limit"));
        handleSubmit(onSubmit)();
        console.log('prev');
    }
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    const columns = useMemo(
        () => [
            {
                Header: t("CR_COMMON_COL_ACKNO"),
                accessor: (row) => GetCell(row.TL_COMMON_TABLE_COL_APP_NO),
            },
            {
                Header: t("CR_COMMON_MOTHER_NAME"),
                disableSortBy: true,
                accessor: (row) => GetCell(row?.CR_MOTHER_NAME || "-"),
            },
            {
                Header: "Father Name",
                disableSortBy: true,
                accessor: (row) => GetCell(row?.CR_FATHER_NAME || "-"),
            },
            {
                Header: "Status",
                disableSortBy: true,
                Cell: ({ row }) => {
                    return (generateActions(row.original));
                },
            },
        ],
        []
    );
    let tmpData = data;

    useEffect(() => {
        if (isSuccess === true) {
            tmpData[0] = { ...data[0], isSuccess };
        }
        setFileData(tmpData);
    });
    return (
        <React.Fragment>
            <div style={mystyle}>
                <h1 style={hstyle}>{t("APPLICATION_DETAILS")}</h1>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <SearchFields {...{ register, control, reset, previousPage, t }} />
                </SearchForm>
            </div>
            {FileData !== [] && (
                <React.Fragment>
                    <Table
                        t={t}
                        data={FileData ? FileData : data}
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
                        // currentPage={getValues("offset")}
                        onNextPage={nextPage}
                        onPrevPage={previousPage}
                        pageSizeLimit={getValues("limit")}
                        onSort={onSort}
                        disableSort={false}
                        sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
export default SearchBirthApplication;
