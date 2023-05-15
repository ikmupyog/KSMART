import React, { useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Loader, Card } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
import { downloadDocument } from "../../utils/uploadedDocuments";
import _ from "lodash";

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

const SearchRegistryDeath = ({ tenantId, t, onSubmit, data, isSuccess, isLoading, count, onRestClick, payload: {deathType = "CRDRNR"} }) => {
  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "DateOfDeath",
      sortOrder: "DESC",
    },
  });

  const fileSource = deathType === "CRDRNA" ? Digit.Hooks.cr.getNacDeathFileSourceDetails({ params: { tenantId } }) : Digit.Hooks.cr.getDeathFileSourceDetails(tenantId);

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "DateOfDeath");
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
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }

  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const columns = useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_APP_NO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                  {row.original?.InformationDeath?.DeathACKNo}
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_COMMON_COL_APP_DATE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.AuditDetails?.createdTime ? convertEpochToDateDMY(row.AuditDetails.createdTime) : ""),
      },
      {
        Header: t("CR_COMMON_COL_DOD"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DateOfDeath ? convertEpochToDateDMY(row.InformationDeath.DateOfDeath) : ""),
      },
      {
        Header: t("TL_APPLICATION_TYPE_LABEL"),
        disableSortBy: true,
        accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
      },
      {
        Header: t("CR_COMMON_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.deceasedFirstNameEn + row?.InformationDeath?.deceasedMiddleNameEn + row?.InformationDeath?.deceasedLastNameEn || "-"),
      },
      {
        Header: t("CR_COMMON_DEATH_PLACE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.deathPlace || "-"),
      },
      {
        Header: t("Download Certificate"),
        disableSortBy: true,
        Cell: ({ row }) => {
          let id = _.get(row, "original.InformationDeath.Id", null);
          return (
            <div>
              {id !== null && <span className="link" onClick={() => {
                fileSource.mutate({ filters: { id, source: "sms" } }, {
                  onSuccess: (fileDownloadInfo) => {
                    const { filestoreId } = fileDownloadInfo;
                    if (filestoreId) {
                      downloadDocument(filestoreId);
                    } else {
                      console.log("filestoreId is null");
                    }
                  }
                });
              }}>
                Download
              </span>}
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

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("DEATH CERTIFICATE")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, tenantId, previousPage, t, onRestClick }} />
        </SearchForm>
      </div>
      {isLoading ? <Loader /> : data.length > 0 ? <Table
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
      /> : <Card style={{ marginTop: 20 }}>
        <p style={{ textAlign: "center" }}>
          {t("ES_COMMON_NO_DATA")}
        </p>
      </Card>}
    </React.Fragment>
  );
};

export default SearchRegistryDeath;
