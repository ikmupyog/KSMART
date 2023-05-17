import React from "react";
import { CardLabel, Card, TextInput, Modal, SearchField, SubmitBar, DatePicker, Table, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import Search from '../../components/SearchApplicationBirth'

const BirthReqSearch = ({ BirthRegNo, setSelectSetBirthRegNo, setSearchRegId, closePopup, setBirthRegPopup }) => {
  const { t } = useTranslation();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  let validation = "";
  // let searchParams = {
  //   applicationNumber: BirthRegNo ? BirthRegNo : "",
  // };
  const convertEpochToDateDMY = (dateEpoch) => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return t("CR_NOT_RECORDED");
    }
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  };
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  const [payload, setPayload] = React.useState({});
  const [getValues, setValues] = React.useState({
    offset: 0,
    limit: 10,
    sortBy: "applicationNumber",
    sortOrder: "DESC",
  });
  const [applicationNum, setApplicationNum] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toData, setToDate] = React.useState("");
  const [MotherName, setMotherName] = React.useState("");

  // const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearch({
  //   tenantId,
  //   filters: searchParams,
  // });

  // let birthReg = BirthRegNo ? searchResult : [];
  // if (birthReg?.length > 0) {
  //   setSearchRegId(birthReg[0]);
  // } else {
  //   setSearchRegId("");
  // }
  const onSort = React.useCallback((args) => {
    // console.log(args);
    if (args.length === 0) return;
    let tmp = getValues;
    tmp.sortBy = args.id;
    tmp.sortOrder = args.desc ? "DESC" : "ASC";
    setValues(tmp);

    // setValues((pre)=>pre.sortBy = args.id)
    // setValues((pre)=> pre.sortOrder= args.desc ? "DESC" : "ASC")
  }, []);

  function onPageSizeChange(e) {
    let tmp = getValues;
    tmp.limit = Number(e.target.value);
    setValues(tmp);
    onSubmit();
    // setValues((pre)=>pre.limit=Number(e.target.value))
    // handleSubmit(onSubmit)()
  }

  function nextPage() {
    let tmp = getValues;
    tmp.offset = tmp.offset + tmp.limit;
    setValues(tmp);
    onSubmit();
    // setValues((pre)=>pre.offset = getValues((pre)=>pre.offset) + getValues((pre)=>pre.limit))
    // handleSubmit(onSubmit)()
  }
  function previousPage() {
    let tmp = getValues;
    tmp.offset = tmp.offset - tmp.limit;
    setValues(tmp);
    onSubmit();
    // setValues((pre)=>pre.offset= getValues((pre)=>pre.offset) - getValues((pre)=>pre.limit) )
    // handleSubmit(onSubmit)()
  }
  // console.log(getValues);
  function onSubmit() {
    let _data = {
      // offset: 0,
      // limit: 10,
      // sortBy: "applicationNumber",
      // sortOrder: "DESC",
      ...getValues,
      registrationNo: applicationNum,
      // applicationNumber: applicationNum,
      fromDate: fromDate,
      toDate: toData,
      MotherName: MotherName,
    };
    var fromDate = new Date(_data?.fromDate);
    fromDate?.setSeconds(fromDate?.getSeconds() - 19800);
    var toDate = new Date(_data?.toDate);
    toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800);
    const data = {
      ..._data,
      ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
      ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {}),
    };
    setPayload(
      Object.keys(data)
        .filter((k) => data[k])
        .reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {})
    );
  }

  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0),
  };
  const Heading = ({ t, heading }) => {
    return <h1 className="heading-m">{`${t(heading)}`}</h1>;
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
      //  return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };
  const handleClear = () => {
    setApplicationNum(""), setFromDate(""), setToDate(""), setMotherName("");
    setValues({
      offset: 0,
      limit: 10,
      sortBy: "applicationNumber",
      sortOrder: "DESC",
    });
    onSubmit();
  };

  const Close = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );

  const CloseBtn = (props) => {
    return (
      <div className="icon-bg-secondary" style={{ cursor: "pointer" }} onClick={props.onClick}>
        <Close />
      </div>
    );
  };
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = React.useMemo(
    () => [
      {
        Header: t("CR_COMMON_COL_APP_NO"),
        accessor: "applicationNumber",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link" style={{ color: "#626ad3" }}>
                <Link
                  onClick={() => {
                    setSearchRegId(row.original), setBirthRegPopup(false);
                  }}
                >
                  {row.original.registrationNo}
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
        Header: t("CR_GENDER"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.gender || "-"),
      },
      {
        Header: t("CR_PLACE_OF_BIRTH"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.birthPlace || "-"),
      },
    ],
    []
  );
  // const Search = Digit.ComponentRegistryService.getComponent("SearchCrApplication"); useSearch ChildDetails
  if (window.location.href.includes("/adoption-child-details") == true) {
    const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useRegistrySearchAdoption({
      tenantId,
      filters: payload,
      config,
    });
    // console.log(searchResult);
    return (
      <Modal
        headerBarMain={<Heading t={t} heading={"CR_SEARCH_BR_APPLICATIONS"} />}
        headerBarEnd={<CloseBtn onClick={closePopup} />}
        popupStyles={mobileView ? { height: "fit-content", minHeight: "100vh" } : { width: "1300px", height: "650px", margin: "auto" }}
        formId="modal-action"
        hideSubmit={true}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <label>
                {t("CR_ADOPTION_REG_NO")}
                <span className="mandatorycss">*</span>
              </label>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="registrationNo"
                value={applicationNum}
                //  disable={isDisableEdit}
                onChange={(e) => setApplicationNum(e.target.value)}
                placeholder={`${t("CR_ADOPTION_REG_NO")}`}
                //  inputProps={{
                //    maxLength: 12,
                //  }}
                {...(validation = { isRequired: false, type: "text", title: t("") })}
              />
            </div>
            <div className="col-md-3">
              <label>{t("CR_FROM_DATE")}</label>

              <DatePicker
                date={fromDate}
                name="fromDate"
                max={convertEpochToDate(new Date())}
                //min={convertEpochToDate("1900-01-01")}
                onChange={(e) => setFromDate(e)}
                // disable={isDisableEdit}
                //  inputFormat="DD-MM-YYYY"
                placeholder={`${t("CR_FROM_DATE")}`}
                {...(validation = { isRequired: true, title: t("") })}
              />
            </div>
            <div className="col-md-3">
              <label>{t("CR_TO_DATE")}</label>

              <DatePicker
                date={toData}
                name="toDate"
                max={convertEpochToDate(new Date())}
                //min={convertEpochToDate("1900-01-01")}
                onChange={(e) => setToDate(e)}
                // disable={isDisableEdit}
                //  inputFormat="DD-MM-YYYY"
                placeholder={`${t("CR_TO_DATE")}`}
                {...(validation = { isRequired: true, title: t("") })}
              />
            </div>
            <div className="col-md-3">
              <label>{t("CR_BIRTH_MOTHERNAME_LABEL")}</label>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="MotherName"
                value={MotherName}
                //  disable={isDisableEdit}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder={`${t("CR_BIRTH_MOTHERNAME_LABEL")}`}
                //  inputProps={{
                //    maxLength: 12,
                //  }}
                {...(validation = { isRequired: false, type: "text", title: t("") })}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>

        <div className=" row search-form-wrapper" style={{ marginLeft: "14px" }}>
          <div className="form-field submit">
            <SubmitBar label={t("ES_COMMON_SEARCH")} onSubmit={onSubmit} />
            <p
              onClick={() => {
                handleClear();
              }}
            >
              {t(`ES_COMMON_CLEAR_ALL`)}
            </p>
          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <Loader />
          ) : searchResult !== "" && searchResult?.length > 0 ? (
            <Table
              styles={{ marginLeft: "7px", width: "98.9%" }}
              paginationStyle={{ marginLeft: "7px", width: "98.9%" }}
              t={t}
              data={searchResult}
              totalRecords={count}
              // columns={applicationType?.value =="adoptionsearch"?AdoptionColumns:applicationType?.value =="birthsearch"?columns:[]}
              columns={columns}
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
              currentPage={getValues["offset"] / getValues["limit"]}
              onNextPage={nextPage}
              onPrevPage={previousPage}
              pageSizeLimit={getValues["limit"]}
              onSort={onSort}
              disableSort={false}
              sortParams={[{ id: getValues.sortBy, desc: getValues.sortOrder === "DESC" ? true : false }]}
            />
          ) : (
            <Card style={{ marginTop: 20, marginLeft: "10px", width: "99.2%" }}>
              <p style={{ textAlign: "center" }}>{t("ES_COMMON_NO_DATA")}</p>
            </Card>
          )}
        </div>
      </Modal>
    );
  }
  ``;
};
export default BirthReqSearch;
