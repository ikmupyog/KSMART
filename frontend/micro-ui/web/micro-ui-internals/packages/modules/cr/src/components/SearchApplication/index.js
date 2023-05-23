import React, { useCallback, useMemo, useEffect } from "react"
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header ,SearchField,Dropdown} from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from  "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";

const mystyle = {
  bgOpacity:"1",
  backgroundColor:"#fff",
  backgroundColor:"rgba(255, 255, 255, var(--bg-opacity))",
  marginBottom:"24px",
  padding:"1.5rem",
  borderRadius:"1.6rem"
 };
 const hstyle ={
  fontSize:"20px",
  fontWeight:"500",
  color:"#2B2F3E",
  marginBottom:".5rem",
  lineHieght:"1.5rem"

 };
 const selectedSearch=[
  {label:"Adoption", value:"adoptionsearch"},
  {label:"New Birth", value:"birthsearch"},
  { label: "Still Birth", value: "stillbirthsearch" },
  { label: "Birth - Born Outside India", value: "bornoutsidebirthsearch" },
  { label: "Abandoned Birth", value: "abandonedbirthsearch" },
  { label: "NAC Birth", value: "nacbirthsearch" },
  { label: "Correction", value: "birthcorrection" },
]
let  validation =''

const SearchApplication = ({tenantId, t, onSubmit, data, count,applicationType, setApplicationType }) => {

    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "applicationNumber",
            sortOrder: "DESC"
        }
    })

    useEffect(() => {
      register("offset", 0)
      register("limit", 10)
      register("sortBy", "applicationNumber")
      register("sortOrder", "DESC")
    },[register])

    const onSort = useCallback((args) => {
      if (args.length === 0) return
      setValue("sortBy", args.id)
      setValue("sortOrder", args.desc ? "DESC" : "ASC")
    }, [])
    useEffect(()=>{
          console.log("data in correction==",data);
    },[data])

    function onPageSizeChange(e){
        setValue("limit",Number(e.target.value))
        handleSubmit(onSubmit)()
    }

    function nextPage () {
        setValue("offset", getValues("offset") + getValues("limit"))
        handleSubmit(onSubmit)()
    }
    function previousPage () {
        setValue("offset", getValues("offset") - getValues("limit") )
        handleSubmit(onSubmit)()
    }
    const setSelectSearch =(value)=>{
      setApplicationType(value)
      reset({ 
        searchAppllication:[],
        applicationNumber: "", 
        fromDate: "", 
        toDate: "",
        licenseNumbers: "",
        status: "",
        tradeName: "",
        offset: 0,
        limit: 10,
        sortBy: "dateOfBirth",
        sortOrder: "DESC"
    });
    previousPage();
    }

    const isMobile = window.Digit.Utils.browser.isMobile();

    if (isMobile) {
      return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }}/>
    }
    const handleLinkClick = (finaldata) => {  
      //console.log(finaldata);
      let temp={};
      temp.ChildDetails=finaldata;
       Digit.SessionStorage.set("CR_EDIT_BIRTH_REG", temp);   
       sessionStorage.setItem("CR_BIRTH_EDIT_FLAG", true);
    }

    const goto = (applicationNumber) => {
    let url ="";
      if (["CRBRCN"].some(term => applicationNumber?.includes(term))) {
        url = `/digit-ui/employee/cr/birth-correction-details/${applicationNumber}`;
      } else {
        url = `/digit-ui/employee/cr/application-details/${applicationNumber}`
      }
      return url;
    }
  

    //need to get from workflow
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    const correctionColumns = useMemo( () => ([
      {
        Header: t("CR_COMMON_COL_APP_NO"),
        accessor: "applicationNumber",
        disableSortBy: true,
        Cell: ({ row }) => {
          console.log("row data looped",row?.original);
          return (
            <div>
              <span className="link">
                <Link onClick={event => handleLinkClick(row.original)} to={goto(row?.original?.applicationNumber)}>
                  {/* {row.original.applicationNumber} */}
                  {row?.original?.applicationNumber}
                </Link>
              </span>
            </div>
          );
        },
      },
      {
        Header: t("CR_COMMON_COL_APP_DATE"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
      },
      {
          Header: t("CR_COMMON_COL_DOB"),
          disableSortBy: true,            
          accessor: (row) => GetCell(row.dateOfBirth ? convertEpochToDateDMY(row.dateOfBirth) : ""),
      },
      // {
      //     Header: t("TL_APPLICATION_TYPE_LABEL"),
      //     disableSortBy: true,
      //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
      // },
      {
        Header: t("CR_COMMON_COL_MOTHER_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.motherFirstNameEn),
      
      },
      {
          Header: t("CR_COMMON_COL_FATHER_NAME"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.fatherFirstNameEn),
      },
    ]), [] );
    
    const columns = useMemo( () => ([
        {
          Header: t("CR_COMMON_COL_APP_NO"),
          accessor: "applicationNumber",
          disableSortBy: true,
          Cell: ({ row }) => {
            console.log("row data looped",row?.original);
            return (
              <div>
                <span className="link">
                  <Link onClick={event => handleLinkClick(row.original)} to={goto(row?.original?.applicationNumber)}>
                    {/* {row.original.applicationNumber} */}
                    {row?.original?.applicationNumber}
                  </Link>
                </span>
              </div>
            );
          },
        },
        {
          Header: t("CR_COMMON_COL_APP_DATE"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
        },
        {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,            
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
        },
        // {
        //     Header: t("TL_APPLICATION_TYPE_LABEL"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
        // },
        {
          Header: t("CR_COMMON_COL_MOTHER_NAME"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.ParentsDetails["motherFirstNameEn"]  || "-"),
        
        },
        {
            Header: t("CR_COMMON_COL_FATHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ParentsDetails["fatherFirstNameEn"]  || "-"),
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
      ]), [] )
      const AdoptionColumns = useMemo( () => ([
        {
          Header: t("CR_COMMON_COL_APP_NO"),
          accessor: "applicationNumber",
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div>
                  <span className="link">
                  <Link onClick={event => handleLinkClick(row.original)} to={`/digit-ui/employee/cr/application-Adoptiondetails/${row.original.applicationNumber}`}>
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
          accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
        },
        {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,            
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
        },
        // {
        //     Header: t("TL_APPLICATION_TYPE_LABEL"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
        // },
        {
          Header: t("CR_COMMON_COL_MOTHER_NAME"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.ParentsDetails["motherFirstNameEn"]  || "-"),
        
        },
        {
            Header: t("CR_COMMON_COL_FATHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ParentsDetails["fatherFirstNameEn"]  || "-"),
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
      ]), [] )

      const handleStillBirthLinkClick = (finaldata) => {  
        // console.log(finaldata);
        let temp={};
        temp.StillBirthChildDetails =finaldata;
         Digit.SessionStorage.set("CR_EDIT_STILLBIRTH_REG", temp);      
         sessionStorage.setItem("CR_STILLBIRTH_EDIT_FLAG", true);
      }
      const StillBirthColumns = useMemo(
        () => [
          {
            Header: t("CR_COMMON_COL_APP_NO"),
            accessor: "applicationNumber",
            disableSortBy: true,
            Cell: ({ row }) => {
              return (
                <div>
                  <span className="link">
                    <Link
                      onClick={(event) => handleStillBirthLinkClick(row.original)}
                      to={`/digit-ui/employee/cr/application-stillbirth/${row.original.applicationNumber}`}
                    >
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
            accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
          },
          {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
          },
          // {
          //     Header: t("TL_APPLICATION_TYPE_LABEL"),
          //     disableSortBy: true,
          //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
          // },
          {
            Header: t("CR_COMMON_COL_MOTHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.StillBirthParentsDetails["motherFirstNameEn"] || "-"),
          },
          {
            Header: t("CR_COMMON_COL_FATHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.StillBirthParentsDetails["fatherFirstNameEn"] || "-"),
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
      const handleBornOutsideBirthLinkClick = (finaldata) => {  
        let temp={};
        temp.BornOutsideChildDetails =finaldata;
         Digit.SessionStorage.set("CR_EDIT_BORNOUTSIDEBIRTH_REG", temp);      
         sessionStorage.setItem("CR_BORNOUTSIDEBIRTH_EDIT_FLAG", true);
      }
      const handleNACBirthLinkClick = (finaldata) => {  
        let temp={};
        temp.NacDetails =finaldata;
         Digit.SessionStorage.set("CR_EDIT_NACEBIRTH_REG", temp);      
         sessionStorage.setItem("CR_NACBIRTH_EDIT_FLAG", true);
      }
      
      const NACBirthColumns = useMemo(
        () => [
          {
            Header: t("CR_COMMON_COL_APP_NO"),
            accessor: "applicationNumber",
            disableSortBy: true,
            Cell: ({ row }) => {
              return (
                <div>
                  <span className="link">
                    <Link
                      onClick={(event) => handleNACBirthLinkClick(row.original)}
                      to={`/digit-ui/employee/cr/application-nacbirth/${row.original.applicationNumber}`}
                    >
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
            accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
          },
          {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
          },
          {
            Header: t("CR_COMMON_COL_MOTHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ParentsDetails["motherFirstNameEn"] || "-"),
          },
          {
            Header: t("CR_COMMON_COL_FATHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ParentsDetails["fatherFirstNameEn"] || "-"),
          },
        ],
        []
      );
      const BornOutSideBirthColumns = useMemo(
        () => [
          {
            Header: t("CR_COMMON_COL_APP_NO"),
            accessor: "applicationNumber",
            disableSortBy: true,
            Cell: ({ row }) => {
              console.log("row",row)
              return (
                <div>
                  <span className="link">
                    <Link
                      onClick={(event) => handleBornOutsideBirthLinkClick(row.original)}
                      to={`/digit-ui/employee/cr/application-bornOutsideIndia/${row.original.applicationNumber}`}
                    >
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
            
            accessor: (row) => 
            GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
          },
          {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
          },
          // {
          //     Header: t("TL_APPLICATION_TYPE_LABEL"),
          //     disableSortBy: true,
          //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
          // },
          {
            Header: t("CR_COMMON_COL_MOTHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.BornOutsideParentsDetails["motherFirstNameEn"] || "-"),
          },
          {
            Header: t("CR_COMMON_COL_FATHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.BornOutsideParentsDetails["fatherFirstNameEn"] || "-"),
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

      const handleAbandonedBirthLinkClick = (finaldata) => {  
        console.log(finaldata);
        let temp={};
        temp.AbandonedChildDetails =finaldata;
         Digit.SessionStorage.set("CR_EDIT_ABANDONEDBIRTH_REG", temp);      
         sessionStorage.setItem("CR_ABANDONEDBIRTH_EDIT_FLAG", true);
      }
      const AbandonedBirthColumns = useMemo(
        () => [
          {
            Header: t("CR_COMMON_COL_APP_NO"),
            accessor: "applicationNumber",
            disableSortBy: true,
            Cell: ({ row }) => {
              return (
                <div>
                  <span className="link">
                    <Link
                      onClick={(event) => handleAbandonedBirthLinkClick(row.original)}
                      to={`/digit-ui/employee/cr/application-abandonedbirth/${row.original.applicationNumber}`}
                    >
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
            accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
          },
          {
            Header: t("CR_COMMON_COL_DOB"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.childDOB ? convertEpochToDateDMY(row.childDOB) : ""),
          },
          // {
          //     Header: t("TL_APPLICATION_TYPE_LABEL"),
          //     disableSortBy: true,
          //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
          // },
          {
            Header: t("CR_COMMON_COL_MOTHER_NAME"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.ParentsDetails["motherFirstNameEn"] || "-"),
          },
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
            <SearchFields {...{ register, control, reset, tenantId, t, previousPage, applicationType }} />
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
              // columns={applicationType?.value =="adoptionsearch"?AdoptionColumns:applicationType?.value =="birthsearch"?columns:[]}
              columns={applicationType?.value == "adoptionsearch" ? AdoptionColumns : applicationType?.value == "stillbirthsearch" ? StillBirthColumns : applicationType?.value == "bornoutsidebirthsearch" ? BornOutSideBirthColumns  : applicationType?.value === "nacbirthsearch" ? NACBirthColumns: applicationType?.value == "abandonedbirthsearch" ? AbandonedBirthColumns: applicationType?.value == "birthcorrection" ? correctionColumns : applicationType?.value == "birthsearch" ? columns :  []}
              getCellProps={(cellInfo) => {
                return {
                  style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "180px" : "",
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
}

export default SearchApplication