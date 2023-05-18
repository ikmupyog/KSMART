import React, { useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Loader } from "@egovernments/digit-ui-react-components";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
import { useTranslation } from "react-i18next";
import { downloadDocument } from "../../utils/uploadedDocuments";
import { STATE_CODE } from "../../config/constants";
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

const SearchRegistryBirth = ({ onSubmit, data, isSuccess, isLoading, count }) => {
  let tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === STATE_CODE.KL) {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const fileSource = Digit.Hooks.cr.getBirthFileSourceDetails({ params: {} });

  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "birthDate",
      sortOrder: "DESC",
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "birthDate");
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
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, data, onSubmit }} />;
  }

  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("CR_COMMON_CHILD_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.fullName ? row?.fullName : "-"),
      },
      {
        Header: t("CR_COMMON_COL_DOB"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.dateofbirth ? convertEpochToDateDMY(row.dateofbirth) : "-"),
      },
            {
        Header: t("CR_COMMON_GENDER"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.gender || "-"),
      },
            {
        Header: t("CR_COMMON_FATHER_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.registerBirthFather?.firstname_en || "-"),
      },
      {
        Header: t("CR_COMMON_MOTHER_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.registerBirthMother?.firstname_en || "-"),
      },
      {
        Header: t("CR_REGISTRATION_NUMBER"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.registration_no || "-"),
      },
      {
        Header: t("Download Certificate"),
        disableSortBy: true,
        Cell: ({ row }) => {
          let id = _.get(row, "original.id", null);
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
        }
      }
    ],
    []
  );

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("BIRTH CERTIFICATE")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, previousPage, t, tenantId }} />
        </SearchForm>
      </div>
      {isLoading ? <Loader /> : data.length > 0 ? <Table
        t={t}
        data={data || []}
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

export default SearchRegistryBirth;
