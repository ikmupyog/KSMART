import React, { useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header,SearchField,Dropdown } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchDeathFields";
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
const selectedDeathSearch = [
  { label: "Death", value: "death" },
  { label: "Death NAC", value: "deathnac" },
  { label: "Abandoned Death", value: "abandoneddeathsearch" },
  { label: "Correction", value: "deathcorrection" },
]
let validation = ''

const SearchApplicationDeath = ({ tenantId, t, onSubmit, data, count, applicationDeathType, setApplicationDeathType }) => {

  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "DateOfDeath",
      sortOrder: "",
    },
  });

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "DateOfDeath");
    register("sortOrder", "");
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
  const setDeathSelectSearch = (value) => {
    setApplicationDeathType(value)
    reset({
      searchAppllication: [],
      applicationNumber: "",
      fromDate: "",
      toDate: "",
      licenseNumbers: "",
      status: "",
      tradeName: "",
      offset: 0,
      limit: 10,
      sortBy: "DateOfDeath",
      sortOrder: ""
  });
  previousPage();
  }

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }


  const handleLinkClick = (finaldata) => {
    console.log({ finaldata });
    Digit.SessionStorage.set("CR_DEATH_EDIT", finaldata);
    sessionStorage.setItem("CR_DEATH_EDIT_FLAG", true);
  };
  const handleAbandonedLinkClick = (finaldata) => {
    console.log( "CR_CREATE_ABANDONEDDEATH_REG",finaldata );
    Digit.SessionStorage.set("CR_CREATE_ABANDONEDDEATH_REG", finaldata);
    sessionStorage.setItem("CR_DEATH_AbandonedEDIT_FLAG", true);
  };
  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("CR_SEARCH_ACK_NO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          console.log("row.....", row.original);
          return (
            <div>
              <span className="link">
                <Link
                  onClick={handleLinkClick(row.original)}
                  to={
                    row.original.InformationDeath?.["DeathACKNo"].includes("CRDRNR") ?
                    `/digit-ui/employee/cr/application-deathdetails/${row.original.InformationDeath?.["DeathACKNo"]}`
                    :
                    row.original.InformationDeath?.["DeathACKNo"].includes("CRDRNA") ?
                      `/digit-ui/employee/cr/application-deathnacdetails/${row.original.InformationDeath?.["DeathACKNo"]}` 
                    // :
                    //   row.original.InformationDeathAbandoned["DeathACKNo"].includes("CRDRAB") ?
                    //   `/digit-ui/employee/cr/application-abandoneddeathdetails/${row.original.InformationDeathAbandoned["DeathACKNo"]}`

                    : "/digit-ui/employee/cr/search-flow/deathsearch/application"
                  }
                >

                  {row.original.InformationDeath?.["DeathACKNo"]}
                </Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_DECEASED_DOB"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeath?.DateOfDeath ? convertEpochToDateDMY(row.InformationDeath?.DateOfDeath) : ""),
      },

      {
        Header: t("CR_COMMON_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            row.InformationDeath?.DeceasedFirstNameEn + " " + row.InformationDeath?.DeceasedMiddleNameEn +" " + row.InformationDeath?.DeceasedLastNameEn ||
            t("CR_NOT_RECORDED")
          ),
      },
      {
        Header: t("CR_COMMON_DEATH_PLACE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.deathPlace || "-"),
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
  const deathCorrectionColumns = useMemo(
    () => [
      {
        Header: t("CR_SEARCH_ACK_NO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          console.log("row.....", row.original);
          return (
            <div>
              <span className="link">
                <Link
                  onClick={handleLinkClick(row.original)}
                  to={
                    `/digit-ui/employee/cr/death-correction-details/${row.original.InformationDeathCorrection?.["DeathACKNo"]}`
                  }
                >

                  {
                 row.original.InformationDeathCorrection?.["DeathACKNo"]}
                </Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_DECEASED_DOB"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeathCorrection?.DateOfDeath ? convertEpochToDateDMY(row.InformationDeathCorrection?.DateOfDeath) : ""),
      },

      {
        Header: t("CR_COMMON_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            row.InformationDeathCorrection?.DeceasedFirstNameEn + " " + row.InformationDeathCorrection?.DeceasedMiddleNameEn +" " + row.InformationDeathCorrection?.DeceasedLastNameEn ||
            t("CR_NOT_RECORDED")
          ),
      },
      {
        Header: t("CR_COMMON_DEATH_PLACE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeathCorrection.DeathPlace || "-"),
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

  const Abandonedcolumns = useMemo(
    () => [
      {
        Header: t("CR_SEARCH_ACK_NO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          {console.log("row",row)}
          return (
          
            <div>
              <span className="link">
                <Link
                  onClick={handleAbandonedLinkClick(row.original)}
                  to={
                     `/digit-ui/employee/cr/application-abandoneddeathdetails/${row.original.InformationDeathAbandoned["DeathACKNo"]}`
                  }
                >
                  {row.original.InformationDeathAbandoned["DeathACKNo"]}
                </Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_SEARCH_ACK_NO"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.InformationDeathAbandoned?.DateOfDeath ? convertEpochToDateDMY(row.InformationDeathAbandoned?.DateOfDeath) : ""),
      },

      {
        Header: t("CR_COMMON_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
           ( row.InformationDeathAbandoned?.DeceasedFirstNameEn==="Not Recorded")&&
             + (row.InformationDeathAbandoned?.DeceasedMiddleNameEn==="Not Recorded")&& + 
            ( row.InformationDeathAbandoned?.DeceasedLastNameEn==="Not Recorded")? t("CR_NOT_RECORDED")
            : row.InformationDeathAbandoned?.DeceasedFirstNameEn+row.InformationDeathAbandoned?.DeceasedMiddleNameEn+row.InformationDeathAbandoned?.DeceasedLastNameEn
             ||
            t("CR_NOT_RECORDED")
          ),
      },
      {
        Header: t("CR_COMMON_DEATH_PLACE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.deathPlace || "-"),
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
        <h1 style={hstyle}>{t("TL_SEARCH_APPLICATIONS")}</h1>
        <SearchField>
          <label>
            {t("Application Type")}
            <span className="mandatorycss">*</span>
          </label>
          <Dropdown
            t={t}
            optionKey="label"
            isMandatory={true}
            option={selectedDeathSearch}
            selected={applicationDeathType}
            select={setDeathSelectSearch}
            // disable={}
            placeholder={`${t("applicationDeathType")}`}
            {...(validation = { isRequired: true, title: t("applicationDeathType") })}
          />
        </SearchField>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, tenantId, t, previousPage, applicationDeathType }} />
        </SearchForm>
      </div>

      {data?.display ? (
        <Card style={{ marginTop: 20 }}>
          {t(data.display)
            .split("\\n")
            .map((text, index) => (
              <p key={index} style={{ textAlign: "center" }}>
                {text}
              </p>
            ))}
        </Card>
      ) : (
        data !== "" && (
          <Table
            t={t}
            data={data}
            totalRecords={count}
            columns={applicationDeathType?.value === "abandoneddeathsearch" ? Abandonedcolumns :  applicationDeathType?.value === "deathcorrection" ? deathCorrectionColumns :columns}
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
        )
      )}
    </React.Fragment>
  );
};

export default SearchApplicationDeath;
