import React, { useCallback, useMemo, useEffect, useState } from "react";
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

const SearchNacRegistryDeath = ({ onSubmit, data, isSuccess, isLoading, count }) => {
  let tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === STATE_CODE.KL) {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const fileSource = Digit.Hooks.cr.getNacDeathFileSourceDetails({ params: { tenantId } });

  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      //   sortBy: "birthDate",
      //   sortOrder: "DESC",
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    // register("sortBy", "birthDate");
    // register("sortOrder", "DESC");
  }, [register]);

  const onSort = useCallback((args) => {
    if (args.length === 0) return;
    // setValue("sortBy", args.id);
    // setValue("sortOrder", args.desc ? "DESC" : "ASC");
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
                {row.original?.InformationDeath.DeathACKNo}
              </span>
            </div>
          );
        },
      },
      {
        Header: t("Applicant Name"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.DeathApplicantDtls?.ApplicantName + " " + row?.DeathApplicantDtls?.ApplicantName),
      },
      // {
      //   Header: t("Applicant Name"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row?.DeathApplicantDtls?.ApplicantName),
      // },
      {
        Header: t("Decesed Name"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DeceasedFirstNameEn + " " + row?.InformationDeath?.DeceasedFirstNameEn + " " + row?.InformationDeath?.DeceasedLastNameEn),
      },
      {
        Header: t("Date of Death"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DateOfDeath ? convertEpochToDateDMY(row?.InformationDeath?.DateOfDeath) : ""),
      },
      {
        Header: t("CR_COMMON_GENDER"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath.DeceasedGender || "-"),
      },
      {
        Header: t("Download Certificate"),
        disableSortBy: true,
        Cell: ( row ) => {
          let id = row?.data[0]?.InformationDeath?.Id;
          return (
            <div>
              {id !== null && (
                <span
                  className="link"
                  onClick={() => {
                    fileSource.mutate(
                      { filters: { id, source: "sms" } },
                      {
                        onSuccess: (fileDownloadInfo) => {
                          const { filestoreId } = fileDownloadInfo;
                          if (filestoreId) {
                            downloadDocument(filestoreId);
                          } else {
                            console.log("filestoreId is null");
                          }
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
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("CR_DEATH_NAC_CERTIFICATE")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, previousPage, t, tenantId }} />
        </SearchForm>
      </div>
      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <Table
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
        />
      ) : (
        <Card style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center" }}>{t("ES_COMMON_NO_DATA")}</p>
        </Card>
      )}
    </React.Fragment>
  );
};

export default SearchNacRegistryDeath;
