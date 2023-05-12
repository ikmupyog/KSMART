import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";

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

const SearchMarriageInclusion = ({ tenantId, t, onSubmit, data, count, onCorrectionClick, isLoading, isSuccess }) => {
  const stateId = Digit.ULBService.getStateId();
  // let { data: newConfig, isLoading } = Digit.Hooks.tl.useMDMS.getFormConfig(stateId, {});
  // const [FileData, setFileData] = useState([]);

  const { register, control, handleSubmit, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "marriageDOM",
      sortOrder: "DESC",
      tenantId: Digit.ULBService.getCitizenCurrentTenant(),
    },
  });

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    // register("sortBy", "marriageDOM");
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
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }

  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const columns = useMemo(
    () => [
      {
        Header: t("CR_MARRIAGE_REGISTRATION_NUMBER"),
        accessor: "marriageApplicationNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link" onClick={() => onCorrectionClick(row.original)}>
                {row.original.registrationno}
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
        accessor: (row) =>
          GetCell(`${row.GroomDetails.groomFirstnameEn} ${row.GroomDetails.groomMiddlenameEn} ${row.GroomDetails.groomLastnameEn}` || "-"),
      },
      {
        Header: t("CR_NAME_OF_WIFE"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(`${row.BrideDetails.brideFirstnameEn} ${row.BrideDetails.brideMiddlenameEn} ${row.BrideDetails.brideLastnameEn}` || "-"),
      },
    ],
    []
  );
  console.log("isSuccess",isSuccess);

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("CR_MARRIAGE_CORRECTIONS")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, watch, control, reset, tenantId, previousPage, t }} />
        </SearchForm>
      </div>
      {isLoading && <Loader />}
      {(data?.length > 0 && isSuccess) ? (
        <React.Fragment>
          {/* {(filestoreId && isSuccess === true )? <div style={registyBtnStyle}>
        <SubmitBar label={t("Download Certificate")} onSubmit={() => downloadDocument(filestoreId)} />
       </div>:<Loader/>} */}
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
      ) : isSuccess? (
        <Card style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center" }}>{t("ES_COMMON_NO_DATA")}</p>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

export default SearchMarriageInclusion;
