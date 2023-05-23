import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SubmitBar, Toast, Loader } from "@egovernments/digit-ui-react-components";
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

const SearchBirthInclusion = ({ onSubmit, data, count, onInclusionClick, isLoading, toast, setToast, isSuccess }) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { t } = useTranslation();

  const { register, control, handleSubmit, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      // sortBy: "applicationNumber",
      // sortOrder: "DESC",
      tenantId: Digit.ULBService.getCitizenCurrentTenant(),
    },
  });

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    // register("sortBy", "applicationNumber");
    // register("sortOrder", "DESC");
    register("tenantId", Digit.ULBService.getCitizenCurrentTenant());
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
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, data, onSubmit, isSuccess }} />;
  }

  const handleLinkClick = () => {
    console.log("path", path);
    history.push(`${path}/birth-inclusion-edit`);
  };

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
              <span className="link" onClick={() => onInclusionClick(row.original)}>
                {row.original.ack_no}
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_COMMON_CHILD_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.fullName ? row?.fullName : "-"),
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
    ],
    []
  );

  let tmpData = data;

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("INCLUSIONS_CORRECTIONS")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, watch, reset, previousPage, t }} />
        </SearchForm>
      </div>
      {isLoading && <Loader />}
      {data?.length > 0 && isSuccess ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : isSuccess ? (
        <Card style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center" }}>{t("ES_COMMON_NO_DATA")}</p>
        </Card>
      ) : null}
      {toast.show && <Toast error={toast.show} label={toast.message} onClose={() => setToast(false)} />}
    </React.Fragment>
  );
};

export default SearchBirthInclusion;
