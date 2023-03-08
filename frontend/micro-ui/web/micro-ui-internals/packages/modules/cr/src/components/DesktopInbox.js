import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import CrLinks from "./inbox/CrLinks";
import CRTable from "./inbox/CrTable";
import Filter from "./inbox/Filter";
import BirthSearchInbox from "./inbox/search";
import { convertEpochToDateDMY } from  "../utils";
import { LOCALE } from "../components/constants/Localization";

const DesktopInbox = ({
  data,
  onFilterChange,
  onSearch,
  isLoading,
  searchParams,
  onNextPage,
  onPrevPage,
  currentPage,
  pageSizeLimit,
  onPageSizeChange,
  totalRecords,
}) => {
  const { t } = useTranslation();
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  let SearchInbox =(window.location.href.includes("/birthinbox") == true?"birth":"death") 
  const GetSlaCell = (value) => {
    return value < 0 ? <span className="sla-cell-error">{value || ""}</span> : <span className="sla-cell-success">{value || ""}</span>;
  };
  const handleLinkClick = (finaldata) => {  
    //console.log(finaldata);
    let temp={};
    temp.ChildDetails=finaldata;
     Digit.SessionStorage.set("CR_EDIT_BIRTH_REG", temp);      
    //  Digit.SessionStorage.set("CR_BIRTH_EDIT_FLAG", true); 
  }

  const Deathcolumns = React.useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_ACKNO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          // console.log('rw',row);
          return (
            // <div>
            //   <span className="link">
            //     <Link to={`/digit-ui/employee/cr/application-deathdetails/${row.original.DeathACKNo}`}>{row.original.DeathACKNo}</Link>
            //   </span>
            // </div>
            <div>
                <span className="link">
                  <Link onClick={handleLinkClick(row.original)} to={`/digit-ui/employee/cr/application-deathdetails/${row.original.InformationDeath["DeathACKNo"]}`}>
                    {row.original.InformationDeath["DeathACKNo"]}
                  </Link>
                </span>
              </div>
            // <div>
            //     <span className="link">
            //       <Link onClick={event => handleLinkClick(row.original.InformationDeath)} to={{pathname:`/digit-ui/employee/cr/application-deathdetails/`}}>
            //         {row.original.InformationDeath["DeathACKNo"]}
            //       </Link>
            //     </span>
            //   </div>
          );
        },
      },
      // {
      //     Header: t("CR_COMMON_COL_APP_DATE"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
      // },
      // {
      //   Header: t("CR_COMMON_COL_DOD"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row.DateOfDeath ? convertEpochToDateDMY(row.DateOfDeath) : ""),
      // },
      {
        Header: t("CR_COMMON_COL_DOD"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DateOfDeath?convertEpochToDateDMY(row.InformationDeath.DateOfDeath):"-"),
      },
      // {
      //     Header: t("TL_APPLICATION_TYPE_LABEL"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
      // },
      {
        Header: t("CR_COMMON_DECEASED_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DeceasedFirstNameEn || "-"),
      },
      {
        Header: t("CR_COMMON_DEATH_PLACE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row?.InformationDeath?.DeathPlace || "-"),
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

    const columns = React.useMemo( () => ([
        {
          Header: t("CR_COMMON_COL_APP_NO"),
          accessor: "applicationNumber",
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div>
                <span className="link">
                  <Link onClick={event => handleLinkClick(row.original)} to={`/digit-ui/employee/cr/application-birthdetails/${row.original.applicationNumber}`}>
                    {/* {row.original.applicationNumber} */}
                    {row.original.applicationNumber}
                  </Link>
                </span>
              </div>
            );
          },
        },
        {
          Header: t("CR_COMMON_COL_APP_DATE"),
          disableSortBy: true,
          accessor: (row) => GetCell(row?.auditDetails?.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
        },
        {
          Header: t("CR_COMMON_CHILD_NAME"),
          disableSortBy: true,
          accessor: (row) => GetCell(row?.childFirstNameEn? row?.childFirstNameEn: "-"),
        },
        {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,            
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
        },
        // {
        //     Header: t("CR_COMMON_CHILD_NAME"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.childFirstNameEn}`)),
        // },
        
        {
          Header: t("CR_COMMON_COL_MOTHER_NAME"),
          disableSortBy: true,
          accessor: (row) => GetCell(row?.ParentsDetails?.motherFirstNameEn  || "-"),
        
        },
        {
          Header: t("CR_COMMON_GENDER"),
          disableSortBy: true,
          accessor: (row) => GetCell(row?.gender || "-"),
        },
        // {
        //     Header: t("CR_COMMON_COL_FATHER_NAME"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(row.ParentsDetails["fatherFirstNameEn"]  || "-"),
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
      ]), [] )
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: t("CS_COMMON_COMPLAINT_NO"),
  //       Cell: ({ row }) => {
  //         return (
  //           <div>
  //             <span className="link">
  //               <Link to={"/digit-ui/employee/pgr/complaint/details/" + row.original["serviceRequestId"]}>{row.original["serviceRequestId"]}</Link>
  //             </span>
  //             {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
  //             <br />
  //             {/* <span className="complain-no-cell-text">{t(`SERVICEDEFS.${row.original["complaintSubType"].toUpperCase()}`)}</span> */}
  //           </div>
  //         );
  //       },
  //     },
  //     // {
  //     //   Header: t("WF_INBOX_HEADER_LOCALITY"),
  //     //   Cell: ({ row }) => {
  //     //     return GetCell(t(Digit.Utils.locale.getLocalityCode(row.original["locality"], row.original["tenantId"])));
  //     //   },
  //     // },
  //     {
  //       Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
  //       Cell: ({ row }) => { 
  //         return GetCell(t(`CS_COMMON_${row.original["status"]}`));
  //       },
  //     },
  //     {
  //       Header: t("WF_INBOX_HEADER_CURRENT_OWNER"),
  //       Cell: ({ row }) => {
  //         return GetCell(row.original["taskOwner"]);
  //       },
  //     },
  //     {
  //       Header: t("WF_INBOX_HEADER_SLA_DAYS_REMAINING"),
  //       Cell: ({ row }) => {
  //         return GetSlaCell(row.original["sla"]);
  //       },
  //     },
  //   ],
  //   [t]
  // );

  let result;
  if (isLoading) {
    result = <Loader />;
  } else if (data && data.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t(LOCALE.NO_COMPLAINTS_EMPLOYEE)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (data?.length > 0) {
    result = (
      <CRTable
        t={t}
        data={data}
        columns={SearchInbox=="birth"?columns:Deathcolumns}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("CS_COMMON_COMPLAINT_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
            },
          };
        }}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        totalRecords={totalRecords}
        onPageSizeChagne={onPageSizeChange}
        currentPage={currentPage}
        pageSizeLimit={pageSizeLimit}
      />
    );
  } else {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t(LOCALE.ERROR_LOADING_RESULTS)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  }


  return (
    <div className="inbox-container">
      <div className="filters-container">
        <CrLinks SearchInbox={SearchInbox}/>
        <div>
          <Filter complaints={data} onFilterChange={onFilterChange} type="desktop" searchParams={searchParams} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <BirthSearchInbox onSearch={onSearch} type="desktop" />
        <div style={{ marginTop: "24px", marginTop: "24px", marginLeft: "24px", flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default DesktopInbox;
