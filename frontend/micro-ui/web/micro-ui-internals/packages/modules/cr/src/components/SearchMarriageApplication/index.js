import React, { useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header, SearchField, Loader, Dropdown } from "@egovernments/digit-ui-react-components";
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

const selectedSearch = [
  { label: "New Marriage", value: "marriagesearch" },
  { label: "Correction", value: "marriagecorrection" },
];
let validation = "";

const SearchMarriageApplication = ({ tenantId, t, onSubmit, data, count, applicationType, setApplicationType,isLoading }) => {
  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      // sortBy: "applicationNo",
      sortOrder: "DESC",
    },
  });

  const goto = (applicationNumber) => {
    let url = "";
    if (["CRMRCR"].some((term) => applicationNumber?.includes(term))) {
      url = `/digit-ui/employee/cr/marriage-correction-details/${applicationNumber}`;
    } else {
      url = `/digit-ui/employee/cr/application-marriagedetails/${applicationNumber}`;
    }
    return url;
  };

  const setSelectSearch = (value) => {
    setApplicationType(value);
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
    });
    previousPage();
  };

  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "applicationNo");
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
  const handleLinkClick = (finaldata) => {
    console.log({ finaldata });
    Digit.SessionStorage.set("CR_EDIT_MARRIAGE_REG", finaldata);
    sessionStorage.setItem("CR_MARRIAGE_EDIT_FLAG", true);
  };

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }
  console.log("inbox data" + JSON.stringify(data));
  //need to get from workflow
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_APP_NO"),
        accessor: "applicationNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          console.log({ data: GetCell(row) });
          return (
            <div>
              <span className="link">
                <Link onClick={() => handleLinkClick(row.original)} to={() => goto(row.original.applicationNumber)}>
                  {/* {row.original.applicationNumber} */}
                  {row.original.applicationNumber}
                </Link>
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
        Header: t("CR_GROOM_NAME"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            `${row?.GroomDetails?.groomFirstnameEn ? row?.GroomDetails?.groomFirstnameEn : ""} ${
              row?.GroomDetails?.groomMiddlenameEn ? row?.GroomDetails?.groomMiddlenameEn : ""
            } ${row?.GroomDetails?.groomLastnameEn ? row?.GroomDetails?.groomLastnameEn : ""}`
          ),
      },
      {
        Header: t("CR_BRIDE_NAME"),
        disableSortBy: true,
        accessor: (row) =>
          GetCell(
            `${row?.BrideDetails?.brideFirstnameEn ? row?.BrideDetails?.brideFirstnameEn : ""} ${
              row?.BrideDetails?.brideMiddlenameEn ? row?.BrideDetails?.brideMiddlenameEn : ""
            } ${row?.BrideDetails?.brideLastnameEn ? row?.BrideDetails?.brideLastnameEn : ""}`
          ),
      },
      {
        Header: t("CR_APPLICATION_STATUS"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.status ? row.status : ""),
      },
      // {
      //     Header: t("TL_APPLICATION_TYPE_LABEL"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
      // },
      // {
      //   Header: t("CR_COMMON_COL_MOTHER_NAME"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row.ParentsDetails["motherFirstNameEn"] || "-"),

      // },
      // {
      //   Header: t("CR_COMMON_COL_FATHER_NAME"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row.ParentsDetails["fatherFirstNameEn"] || "-"),
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
            option={selectedSearch}
            selected={applicationType}
            select={setSelectSearch}
            // disable={}
            placeholder={`${t("applicationType")}`}
            {...(validation = { isRequired: true, title: t("applicationType") })}
          />
        </SearchField>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, tenantId, t, applicationType }} />
        </SearchForm>
      </div>
      {isLoading && <Loader />}
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
        )
      )}
    </React.Fragment>
  );
};

export default SearchMarriageApplication;
