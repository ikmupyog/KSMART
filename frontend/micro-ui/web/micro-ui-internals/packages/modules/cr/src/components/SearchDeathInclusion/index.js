 import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SubmitBar, Toast, Loader } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
import { downloadDocument } from "../../utils/uploadedDocuments";
import { useTranslation } from "react-i18next";

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

const  SearchDeathInclusion = ({ tenantId, onSubmit, data, count, isLoading, toast, setToast, onCorrectionClick, isSuccess }) => {
  // const [FileData, setFileData] = useState([]);
  console.log(data,"data");
  const { register, control, handleSubmit, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "DateOfDeath",
      sortOrder: "DESC",
      tenantId: Digit.ULBService.getCitizenCurrentTenant(),
    },
  });
  console.log("isSuccess", isSuccess);
  const { t } = useTranslation();

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "DateOfDeath");
    register("sortOrder", "DESC");
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
    // handleSubmit(onSubmit)();
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
        Header: t("DC_DEATH_AKNOWLEDGEMENT_NUMBER"),
        accessor: "deathApplicationNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link"  onClick={() => onCorrectionClick(row.original)}>
                {/* <Link to={`/digit-ui/citizen/cr/birth-inclusion-edit`}
                      onClick={() => onInclusionClick(row.original)}
                      > */}
                   {row.original.InformationDeath.DeathACKNo}
                {/* </Link> */}
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_COMMON_COL_APP_DATE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.AuditDetails.createdTime ? convertEpochToDateDMY(row.AuditDetails.createdTime) : ""),
      },
      {
        Header: t("CR_DATE_OF_DEATH"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeath.DateOfDeath ? convertEpochToDateDMY(row.InformationDeath.DateOfDeath) : ""),
      },
      // {
      //     Header: t("TL_APPLICATION_TYPE_LABEL"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.StatisticalInfo.applicationType}`)),
      // },
      {
        Header: t("CR_GROOM_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(`${row.InformationDeath.DeceasedFirstNameEn} ${row.InformationDeath.DeceasedMiddleNameEn} ${row.InformationDeath.DeceasedLastNameEn}` || "-"),
      },
      {
        Header: t("CR_PLACE_OF_DEATH"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeath.DeathPlace || "-"),
      },
      // {
      //   Header: t("Download Certificate"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => {
      //     // console.log('row',row?.original);
      //     return (
      //       <div>
      //         {row.original?.filestoreId && row.original?.isSuccess === true ? (
      //           <span className="link" onClick={() => downloadDocument(row?.original?.filestoreId)}>
      //             Download
      //           </span>
      //         ) : (
      //           <Loader />
      //         )}
      //       </div>
      //     );
      //   },
      // },

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
  // useEffect(() => {
  //   if (filestoreId && isSuccess === true) {
  //     tmpData[0] = { ...data[0], filestoreId, isSuccess };
  //   }
  //   setFileData(tmpData);
  // }, [filestoreId]);
  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("CR_DEATH_CORRECTION")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, watch, control, reset, tenantId, previousPage, t }} />
        </SearchForm>
      </div>
      {isLoading && <Loader />}
      {(data?.length > 0 && isSuccess) ? (
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
        ): null}
      {toast.show && <Toast error={toast.show} label={toast.message} onClose={() => setToast(false)} />}
    </React.Fragment>
  );
};

export default  SearchDeathInclusion;
