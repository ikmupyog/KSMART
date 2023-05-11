import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import CrLinks from "./inbox/CrLinks";
import CRTable from "./inbox/CrTable";
import Filter from "./inbox/Filter";
import BirthSearchInbox from "./inbox/search";
import { convertEpochToDateDMY } from "../utils";

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
  let SearchInbox = window.location.href.includes("/birthinbox") == true ? "birth" : window.location.href.includes("/marriageinbox") == true ? "marriage" : "death";

  const GetSlaCell = (value) => {
    return value < 0 ? <span className="sla-cell-error">{value || ""}</span> : <span className="sla-cell-success">{value || ""}</span>;
  };

  const handleLinkClick = (finaldata) => {
    let temp = {};
    const applicationNumber = SearchInbox === "death" ? finaldata?.InformationDeath?.["DeathACKNo"] : finaldata.applicationNumber ;
    const correctionCode = applicationNumber?.split('-')?.[4];
    if(correctionCode === "CRBRCN"){
      temp.ChildDetails = finaldata;
    } 
    //  please change the condition according to the respective page.
    else{
      temp.ChildDetails = finaldata;
    }

    sessionStorage.setItem("CR_BIRTH_EDIT_FLAG", true);
    Digit.SessionStorage.set("CR_EDIT_BIRTH_REG", temp);
    
  }

  const goto = (data,inboxType) =>{
    const applicationNumber = SearchInbox === "death" ? data?.InformationDeath?.["DeathACKNo"] : data.applicationNumber?  data.applicationNumber :  data.applicationId ? data.applicationId : "" ;
    const correctionCode = applicationNumber?.split('-')?.[4];
  console.log("applicationNumber in correction",applicationNumber);
    let url = `/digit-ui/employee/cr/application-details/${applicationNumber}`;
    switch(inboxType){
      case "death":
         url = `/digit-ui/employee/cr/application-deathdetails/${applicationNumber}`;
         break;
      case "marriage":
        url = `/digit-ui/employee/cr/application-marriagedetails/${applicationNumber}`
    }    
  
    if(["CRBRCN","CRDRCN","CRMRCR"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/correction-details/${applicationNumber}/${SearchInbox}`;
    } else if(["CRBRSB"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-stillbirth/${applicationNumber}`;
    } else if(["CRBRBO"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-bornOutsideIndia/${applicationNumber}`;
    } else if(["CRBRAB"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-abandonedbirth/${applicationNumber}`;
    } else if(["CRBRAD"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-Adoptiondetails/${applicationNumber}`;
    } else if(["CRBRNC"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-nacbirth/${applicationNumber}`;
    } else if(["CRDRAD"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-abandoneddeathdetails/${applicationNumber}`;
    } else if(["CRDRNC"].includes(correctionCode)){
      url = `/digit-ui/employee/cr/application-deathnacdetails/${applicationNumber}`;
    } else{
      url = `/digit-ui/employee/cr/correction-details/${applicationNumber}/${SearchInbox}`;
    }
    return url;
  }

  const MarriageColumns = React.useMemo(() => ([
    {
      Header: t("CR_COMMON_COL_APP_NO"),
      accessor: "applicationNumber",
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div>
            <span className="link">
              <Link onClick={event => handleLinkClick(row.original)} to={()=>goto(row.original,SearchInbox)}>
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
      Header: t("WF_INBOX_HEADER_LOCALITY"),
      Cell: ({ row }) => {
        return GetCell(t((row.original["wardNo"])));
      },
    },
    {
      Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
      Cell: ({ row }) => {
        return GetCell(t(`CS_COMMON_${row.original["applicationStatus"]}`));
      },
    }
  ]), [])



  const Deathcolumns = React.useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_ACKNO"),
        accessor: "DeathACKNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            // <div>
            //   <span className="link">
            //     <Link to={`/digit-ui/employee/cr/application-deathdetails/${row.original.DeathACKNo}`}>{row.original.DeathACKNo}</Link>
            //   </span>
            // </div>
            <div>
              <span className="link">
                <Link onClick={handleLinkClick(row.original)} to={()=>goto(row.original,SearchInbox)}>
                  {row.original.InformationDeath["DeathACKNo"]}
                </Link>
              </span>
            </div>
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
        accessor: (row) => GetCell(row?.InformationDeath?.DateOfDeath ? convertEpochToDateDMY(row.InformationDeath.DateOfDeath) : "-"),
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



  const BirthColumns = React.useMemo(() => ([
    {
      Header: t("CR_COMMON_COL_APP_NO"),
      accessor: "applicationNumber",
      disableSortBy: true,
      Cell: ({ row }) => {
        console.log("row data birth==",row.original);
        return (
          <div>
            <span className="link">
              <Link onClick={event => handleLinkClick(row.original)} to={()=>goto(row.original,SearchInbox)}>
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
      Header: t("WF_INBOX_HEADER_LOCALITY"),
      Cell: ({ row }) => {
        return GetCell(t((row.original["wardNo"])));
      },
    },
    {
      Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
      Cell: ({ row }) => {
        return GetCell(t(`CS_COMMON_${row.original["applicationStatus"]}`));
      },
    }
  ]), [])

  const BirthInboxColumns = React.useMemo(() => ([
    {
      Header: t("CR_COMMON_COL_APP_NO"),
      accessor: "applicationNumber",
      disableSortBy: true,
      Cell: ({ row }) => {
        console.log("row data birth==",row.original);
        return (
          <div>
            <span className="link">
              <Link onClick={event => handleLinkClick(row.original)} to={()=>goto(row.original,SearchInbox)}>
                {/* {row.original.applicationNumber} */}
                {row.original.applicationId}
              </Link>
            </span>
          </div>
        );
      },
    },
    {
      Header: t("CR_COMMON_COL_APP_DATE"),
      disableSortBy: true,
      accessor: (row) => GetCell(row?.date ? convertEpochToDateDMY(row.date) : ""),
    },
    {
      Header: t("WF_INBOX_HEADER_LOCALITY"),
      Cell: ({ row }) => {
        return GetCell(t((row.original["wardNo"])));
      },
    },
    {
      Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
      Cell: ({ row }) => {
        return GetCell(t(`CS_COMMON_${row.original["applicationStatus"]}`));
      },
    }
  ]), []);

  const getColumns = () =>{
    let columns = []
    if(SearchInbox === "birth"){ 
      // columns = BirthColumns;
      columns = BirthInboxColumns;  
  } else if(SearchInbox === "marriage"){
      columns =  MarriageColumns;
  } else if(SearchInbox === "death"){
      columns = Deathcolumns;
  }
  return columns;
}

 

  let result;
  if (isLoading) {
    result = <Loader />;
  } else if (data && data.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t("CS_MYAPPLICATIONS_NO_APPLICATION")
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
        columns={getColumns()}
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
        onPageSizeChange={onPageSizeChange}
        currentPage={currentPage}
        pageSizeLimit={pageSizeLimit}
      />
    );
  } else {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t("CS_COMMON_ERROR_LOADING_RESULTS")
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
        <CrLinks SearchInbox={SearchInbox} />
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
