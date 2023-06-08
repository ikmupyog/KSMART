import { SearchForm, Table } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import SearchDeathFields from "./SearchDeathFields";
import { Link } from "react-router-dom";
import MobileSearchApplication from "./MobileSearchApplication";
import _ from "lodash";

const mystyle = {
  bgOpacity: "1",
  backgroundColor: "#EDF2FA",
  marginBottom: "24px",
  marginTop: "20px",
  padding: "2.5rem",
  borderRadius: "2.6rem",
};
const hstyle = {
  fontSize: "20px",
  fontWeight: "500",
  color: "#00377B",
  marginBottom: "2.5rem",
  lineHieght: "2.5rem",
};

const DEATH_APPLICATION_TYPE = {
  NORMAL: "CRDRNR",
  NAC: "CRDRNA",
};

const generateActions = (rowData) => {
  const status = _.get(rowData, "TL_APPLICATION_STATUS", "INITIATED");
  const type = _.get(rowData, "APPLICATION_TYPE", DEATH_APPLICATION_TYPE.NORMAL);
  let response = "";
  switch (status) {
    case "CITIZENACTIONREQUIRED":
      response = (
        <span className="link">
          <Link
            to={`/digit-ui/citizen/cr/cr-death-creation/information-death/${rowData?.TL_COMMON_TABLE_COL_APP_NO}/${rowData?.TL_COMMON_CITY_NAME}`}
          >
            EDIT
          </Link>
        </span>
      );
      break;
    case "PENDINGPAYMENT":
      response = (
        <span className="link">
          <Link to={`/digit-ui/citizen/payment/collect/CR/${rowData?.TL_COMMON_TABLE_COL_APP_NO}?tenantId=${rowData?.TL_COMMON_CITY_NAME}`}>
            MAKE PAYMENT
          </Link>
        </span>
      );
      break;
    default:
      response = (
        <span className="link">
          <Link
            to={`/digit-ui/citizen/cr/${type === DEATH_APPLICATION_TYPE.NORMAL ? "my-application-death" : "my-application-death-nac"}/${
              rowData?.TL_COMMON_TABLE_COL_APP_NO
            }`}
          >
            VIEW DETAILS
          </Link>
        </span>
      );
      break;
  }
  return response;
};

const SearchDeathApplication = ({ t, onSubmit, data, count, isSuccess, isLoading, tenantId }) => {
  const [FileData, setFileData] = useState([]);

  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      // sortBy: "TL_COMMON_TABLE_COL_APP_NO",
      // sortOrder: "",
    },
  });

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }

  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_ACKNO"),
        accessor: (row) => GetCell(row.TL_COMMON_TABLE_COL_APP_NO),
      },
      {
        Header: t("CR_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.CR_DECEASED_NAME),
      },
      {
        Header: t("CR_COMMON_FATHER_NAME"),
        accessor: (row) => GetCell(row?.CR_DECEASED_FATHER_NAME || "-"),
      },
      {
        Header: t("CR_COMMON_MOTHER_NAME"),
        accessor: (row) => GetCell(row?.CR_DECEASED_MOTHER_NAME || "-"),
      },
      {
        Header: "Address",
        accessor: (row) => GetCell(row.CR_ADDRESS),
      },
      {
        Header: "Status",
        disableSortBy: true,
        Cell: ({ row }) => {
          console.log({ row });
          return generateActions(row.original);
        },
      },
    ],
    []
  );
  // let tmpData = data;

  // useEffect(() => {
  //   if (isSuccess === true) {
  //     tmpData[0] = { ...data[0], isSuccess };
  //   }
  //   setFileData(tmpData);
  // });
  const onSort = useCallback((args) => {
    if (args.length === 0) return;
    // setValue("sortBy", args.id);
    // setValue("sortOrder", "");
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

  return (
    <React.Fragment>
      <div style={mystyle}>
        <h1 style={hstyle}>{t("TL_SEARCH_APPLICATIONS")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchDeathFields {...{ register, control, reset, previousPage, t }} />
        </SearchForm>
      </div>
      {data !== [] && (
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
                  borderRadius: "25px",
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
    </React.Fragment>
  );
};

export default SearchDeathApplication;
