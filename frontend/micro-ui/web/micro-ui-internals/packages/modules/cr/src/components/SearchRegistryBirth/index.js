import React, { useCallback, useMemo, useEffect,useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
import { useTranslation } from "react-i18next";
import { Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { downloadDocument } from "../../utils/uploadedDocuments";

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
  lineHieght: "1.5rem",
};
const registyBtnStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "15px",
  marginBottom: "15px",
};

const SearchRegistryBirth = ({  onSubmit, data, filestoreId, isSuccess, isLoading, count }) => {
  const [FileData, setFileData] = useState([]);

  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "commencementDate",
      sortOrder: "DESC",
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "commencementDate");
    register("sortOrder", "DESC");
  }, [register]);

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

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit,  data, onSubmit }} />;
  }

  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("CR_RGISTRATION_NUMBER"),
        accessor: "birthApplicationNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                {/* <Link to={`/digit-ui/employee/cr/application-deathdetails/${row.original.deathApplicationNo}`}>
                    {row.original.deathApplicationNo}
                  </Link> */}
                {row.original.registrationno}
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_COMMON_CHILD_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.fullName? row?.fullName: "-"),
      },
      {
        Header: t("CR_COMMON_COL_APP_DATE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
      },
      {
        Header: t("CR_COMMON_COL_DOB"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.dateofbirth ? convertEpochToDateDMY(row.dateofbirth) : "-"),
      },
      // {
      //     Header: t("TL_APPLICATION_TYPE_LABEL"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
      // },
      {
        Header: t("CR_COMMON_MOTHER_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.registerBirthMother?.firstname_en || "-"),
      },
      {
        Header: t("CR_COMMON_GENDER"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.gender || "-"),
      },
      {
        Header: t("Download Certificate"),
        disableSortBy: true,
        Cell: ({ row }) => {
          // console.log('row',row?.original);
          return (
            <div>
              {row.original?.filestoreId && row.original?.isSuccess === true ? (
                <span className="link" onClick={() => downloadDocument(row?.original?.filestoreId)}>
                  Download
                </span>
              ) : (
                <Loader />
              )}
            </div>
          );
        },
      },
      // {
      //   Header: t("TL_COMMON_TABLE_COL_TRD_NAME"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row.tradeName || ""),
      // },
      // {
      //   Header: t("TL_LOCALIZATION_TRADE_OWNER_NAME"),
      //   accessor: (row) => GetCell(row.tradeLicenseDetail.owners.map( o => o.name ). join(",") || ""),
      //   disableSortBy: true,
      // },
      // {
      //   Header: t("TL_COMMON_TABLE_COL_STATUS"),
      //   accessor: (row) =>GetCell(t( row?.workflowCode&&row?.status&&`WF_${row?.workflowCode?.toUpperCase()}_${row.status}`|| "NA") ),
      //   disableSortBy: true,
      // }
    ],
    []
  );

  let tmpData = data;
  useEffect(() => {
    if (filestoreId && isSuccess === true) {
      tmpData[0] = { ...data[0], filestoreId, isSuccess };
    }
    setFileData(tmpData);
  }, [filestoreId]);
  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("BIRTH CERTIFICATE")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, previousPage, t }} />
        </SearchForm>
      </div>
      {FileData?.display ? (
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
      ) : (
        FileData !== "" && (
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
              currentPage={getValues("offset") / getValues("limit")}
              onNextPage={nextPage}
              onPrevPage={previousPage}
              pageSizeLimit={getValues("limit")}
              onSort={onSort}
              disableSort={false}
              sortParams={[{ id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false }]}
            />
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
};

export default SearchRegistryBirth;
