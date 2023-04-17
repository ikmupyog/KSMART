import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { convertEpochToDateDMY } from "../../utils";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchFields from "./SearchFields";

const mystyle = {
    bgOpacity: "1",
    backgroundColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
    marginBottom: "24px",
    padding: "1.5rem",
    borderRadius: "1.6rem",
};
const hstyle = {
    fontSize: "20px",
    fontWeight: "500",
    color: "#2B2F3E",
    marginBottom: ".5rem",
    lineHeight: "1.5rem",
};
const registyBtnStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "15px",
    marginBottom: "15px",
};

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
                // disableSortBy: true,
                // Cell: ({ row }) => {
                //     return (
                //         <div>
                //             <span className="link">
                //                 {/* <Link to={`/digit-ui/employee/cr/application-deathdetails/${row.original.deathApplicationNo}`}>
                //         {row.original.deathApplicationNo}
                //       </Link> */}
                //                 {row.original.TL_COMMON_TABLE_COL_APP_NO}
                //             </span>
                //         </div>
                //     );
                // },
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
                    return (
                        <div>
                            {row.original?.TL_APPLICATION_STATUS === "INITIATED" ? (
                                <span className="link" onClick={() => downloadDocument(row?.original?.filestoreId)}>
                                    <Link to={`/digit-ui/citizen/cr/cr/application/${row.original?.TL_COMMON_TABLE_COL_APP_NO}/${row.original?.TL_COMMON_CITY_NAME}`}>

                                        VIEW DETAILS
                                    </Link>
                                </span>
                            ) : (
                                <span className="link" onClick={() => downloadDocument(row?.original?.filestoreId)}>
                                    <Link to={`/digit-ui/citizen/payment/collect/CR/${row.original?.TL_COMMON_TABLE_COL_APP_NO}`}>

                                        MAKE PAYMENT
                                    </Link>
                                </span>
                            )}
                        </div>
                    );
                },
            },
        ],
        []
    );
    let tmpData = data;
   
    useEffect(() => {
        if ( isSuccess === true) {
            tmpData[0] = { ...data[0], isSuccess };
        }
        setFileData(tmpData);
    });
    return (
        <React.Fragment>
            <div style={mystyle}>
                <h1 style={hstyle}>{t("BIRTH CERTIFICATE")}</h1>
                <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                    <SearchFields {...{ register, control, reset, previousPage, t }} />
                </SearchForm>
            </div>
            {/* { FileData?.display ? (
                <Card style={{ marginTop: 20 }}>
                    {t(FileData.display)
                        .split("\\n")
                        .map((text, index) => (
                            <p key={index} style={{ textAlign: "center" }}>
                                {text}
                            </p>
                        ))}
                </Card>
            ) : isLoading && !FileData === true ? (
                <Loader />
            ) : ( */}
                {FileData !== [] && (
                    <React.Fragment>
                        {/* {(filestoreId && isSuccess === true )? <div style={registyBtnStyle}>
        <SubmitBar label={t("Download Certificate")} onSubmit={() => downloadDocument(filestoreId)} />
       </div>:<Loader/>} */}
       
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
            {/* )}  */}
        </React.Fragment>
    )
}
export default SearchBirthApplication;