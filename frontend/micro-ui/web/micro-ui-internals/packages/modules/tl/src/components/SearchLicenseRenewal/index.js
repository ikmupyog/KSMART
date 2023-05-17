import React, { useCallback, useMemo, useEffect } from "react"
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
import { useLocation, useRouteMatch } from "react-router-dom";

const mystyle = {
  bgOpacity: "1",
  backgroundColor: "#fff",
  backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))",
  marginBottom: "24px",
  padding: "1.5rem",
  borderRadius: "1.6rem"
};
const hstyle = {
  fontSize: "20px",
  fontWeight: "500",
  color: "#2B2F3E",
  marginBottom: ".5rem",
  lineHieght: "1.5rem"
};

const SearchLicenseRenewal = ({ tenantId, t, onSubmit, data, count, isProcessreq }) => {
  const { pathname } = useLocation();

  let currentPath = pathname.split("/").pop();
  isProcessreq = currentPath === "license-correction-search" ? 
   "correction" 
   : currentPath === "license-cancellation-search" ? "cancellation" : "renewal" ;

  
  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "wardId",
      sortOrder: "DESC"
    }
  })
  useEffect(() => {
    register("offset", 0)
    register("limit", 10)
    register("sortBy", "wardId")
    register("sortOrder", "DESC")
  }, [register])

  const onSort = useCallback((args) => {
    if (args.length === 0) return
    setValue("sortBy", args.id)
    setValue("sortOrder", args.desc ? "DESC" : "ASC")
  }, [])

  function onPageSizeChange(e) {
    setValue("limit", Number(e.target.value))
    handleSubmit(onSubmit)()
  }

  function nextPage() {
    setValue("offset", getValues("offset") + getValues("limit"))
    handleSubmit(onSubmit)()
  }
  function previousPage() {
    setValue("offset", getValues("offset") - getValues("limit"))
    handleSubmit(onSubmit)()
  }

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />
  }
  const handleLinkClick = (finaldata) => {
    let formdisable = {
      "commencementDate": finaldata?.commencementDate && finaldata?.commencementDate !== null && finaldata?.commencementDate !== "" ? true : false,
      "licenseUnitName": finaldata?.licenseUnitName && finaldata?.licenseUnitName !== null && finaldata?.licenseUnitName !== "" ? true : false,
      "licenseUnitNameLocal": finaldata?.licenseUnitNameLocal && finaldata?.licenseUnitNameLocal !== null && finaldata?.licenseUnitNameLocal !== "" ? true : false,
      "businessSector": finaldata?.tradeLicenseDetail?.businessSector && finaldata?.tradeLicenseDetail?.businessSector !== null && finaldata?.tradeLicenseDetail?.businessSector !== "" ? true : false,
      "noOfEmployees": finaldata?.tradeLicenseDetail?.noOfEmployees && finaldata?.tradeLicenseDetail?.noOfEmployees !== null && finaldata?.tradeLicenseDetail?.noOfEmployees !== "" ? true : false,
      "desiredLicensePeriod": finaldata?.desiredLicensePeriod && finaldata?.desiredLicensePeriod !== null && finaldata?.desiredLicensePeriod !== "" ? true : false,
      "capitalInvestment": finaldata?.tradeLicenseDetail?.capitalInvestment && finaldata?.tradeLicenseDetail?.capitalInvestment !== null && finaldata?.tradeLicenseDetail?.capitalInvestment !== "" ? true : false,
    }
    delete finaldata?.tradeLicenseDetail?.applicationDocuments;
    isProcessreq === "correction"  ? Digit.SessionStorage.set("TL_CORRECTION_TRADE", finaldata) 
    : isProcessreq === "cancellation" ? Digit.SessionStorage.set("TL_CANCELLATION_TRADE", finaldata)
    : Digit.SessionStorage.set("TL_RENEWAL_TRADE", finaldata);

    let tempdata = { "TradeDetails": finaldata }
    isProcessreq === "correction" ? Digit.SessionStorage.set("TL_CORRECTED_TRADE", tempdata) : "";
    Digit.SessionStorage.set("TL_RENEWAL_ENABLE_TRADE", formdisable);
  }
  //need to get from workflow
  let routepath = isProcessreq === "correction" ? `/digit-ui/citizen/tl/tradelicence/license-correction`
  : isProcessreq === "cancellation" ? `/digit-ui/citizen/tl/tradelicence/license-cancellation`
  : `/digit-ui/citizen/tl/tradelicence/license-renewal-pde`;
  const GetCell = (value) => <span className="cell-text" style={{ wordBreak: "break-word" }}>{value}</span>;
  const columns = useMemo(() => ([
    {
      Header: t("TL_COMMON_TABLE_COL_APP_NO"),
      accessor: "applicationNo",
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          (isProcessreq && row.original["isCurrentRequest"]) ?
            <div>
              <span >
                {row.original["applicationNumber"]}
              </span>
            </div>
            :
            <div>
              <span className="link">

                <Link onClick={event => handleLinkClick(row.original)} to={{ pathname: routepath }}>
                  {row.original["applicationNumber"]}
                </Link>
              </span>
            </div>
        );
      },
    },
    {
      Header: t("TL_COMMON_TABLE_COL_TRD_NAME"),
      disableSortBy: true,
      accessor: (row) => GetCell(row.licenseUnitName),
    },
    {
      Header: t("TL_LOCALIZATION_LICENSEE_NAME"),
      disableSortBy: true,
      accessor: (row) => GetCell(row.tradeLicenseDetail.owners.map(owner => owner.name + " ")),
    },
    {
      Header: t("TL_DOOR_DETAILS"),
      disableSortBy: true,
      accessor: (row) => GetCell(row.tradeLicenseDetail.address.wardNo + " - " + row.tradeLicenseDetail.address.doorNo),
    },

    {
      Header: t("TL_LOCALIZATION_SECTOR"),
      disableSortBy: true,
      accessor: (row) => GetCell(row.tradeLicenseDetail.businessSector),
    },
    {
      Header: t("TL_HOME_SEARCH_RESULTS_APP_STATUS_LABEL"),
      disableSortBy: true,
      accessor: (row) => (isProcessreq && row.isCurrentRequest) ? "Active Request Pending" :
      (isProcessreq) ? ""
      : 
      GetCell(row.status),
    },


  ]), [])

  return <React.Fragment>

    <div style={mystyle}>
      <h1 style={hstyle}>{t("TL_SEARCH_APPLICATIONS")}</h1>
      <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit} id="true">
        <SearchFields {...{ register, control, reset, tenantId, t }} />
      </SearchForm>

    </div>
    
    {data?.display ? <Card style={{ marginTop: 20 }}>
      {
        t(data.display)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))
      }
    </Card>
      : data !== "" && <Table
        t={t}
        data={data}
        totalRecords={count}
        columns={columns}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px"
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
      />}
  </React.Fragment>
}

export default SearchLicenseRenewal