import React, { useCallback, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, Component } from "@egovernments/digit-ui-react-components";
import { newConfig as newConfigCR } from "../../../config/config";
import {
  TextInput,
  SubmitBar,
  LinkLabel,
  ActionBar,
  CloseSvg,
  DatePicker,
  CardLabelError,
  SearchForm,
  Header,
  SearchField,
  Dropdown,
  Table,
  Card,
} from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY, stringReplaceAll } from "../../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";
// import Deathcomp from "./DeathCorrectionroute";
import { useTranslation } from "react-i18next";

const DeathCorrection = ({ tenantId, onSubmit, data, count }) => {
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_TRADE", {});
  const [dataParams, setDataParams, clearDataParams] = Digit.Hooks.useSessionStorage("CR_DEATHCORRECTION_DATA", {});

  let config = [];
  let { data: newConfig, isLoading } = true;
  newConfig = newConfigCR;
  newConfig?.forEach((obj) => {
    config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
  });
  console.log('d',data);
  // useEffect(()=>{
  //   if(data)
  // },[data])
  config.indexRoute = "information-death";
  const goNext = (skipStep, index, isAddMultiple, key, isPTCreateSkip) => {
    let currentPath = pathname.split("/").pop(),
      nextPage;
    let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
    let { isCreateEnabled: enableCreate = true } = config.find((routeObj) => routeObj.route === currentPath);
    // if (typeof nextStep == "object" && nextStep != null) {
    //   if((params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && (nextStep[sessionStorage.getItem("isAccessories")] && nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")  )
    //   {
    //     nextStep = "property-details";
    //   }
    //   if (
    //     nextStep[sessionStorage.getItem("isAccessories")] &&
    //     (nextStep[sessionStorage.getItem("isAccessories")] === "accessories-details" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "map" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "owner-ship-details" ||
    //       nextStep[sessionStorage.getItem("isAccessories")] === "know-your-property")
    //   ) {
    //     nextStep = `${nextStep[sessionStorage.getItem("isAccessories")]}`;
    //   } else if (
    //     nextStep[sessionStorage.getItem("StructureType")] &&
    //     (nextStep[sessionStorage.getItem("StructureType")] === "Building-type" ||
    //       nextStep[sessionStorage.getItem("StructureType")] === "vehicle-type")
    //   ) {
    //     nextStep = `${nextStep[sessionStorage.getItem("setPlaceofActivity")]}`;
    //     nextStep = `${nextStep[sessionStorage.getItem("StructureType")]}`;
    //   } else if (
    //     nextStep[sessionStorage.getItem("KnowProperty")] &&
    //     (nextStep[sessionStorage.getItem("KnowProperty")] === "search-property" ||
    //       nextStep[sessionStorage.getItem("KnowProperty")] === "create-property")
    //   ) {
    //       if(nextStep[sessionStorage.getItem("KnowProperty")] === "create-property" && !enableCreate)
    //       {
    //         nextStep = `map`;
    //       }
    //       else{
    //      nextStep = `${nextStep[sessionStorage.getItem("KnowProperty")]}`;
    //       }
    //   }
    // }
    // if( (params?.cptId?.id || params?.cpt?.details?.propertyId || (isReneworEditTrade && params?.cpt?.details?.propertyId ))  && nextStep === "know-your-property" )
    // {
    //   nextStep = "property-details";
    // }
    // let redirectWithHistory = history.push;
    // if (skipStep) {
    //   redirectWithHistory = history.replace;
    // }
    // if (isAddMultiple) {
    //   nextStep = key;
    // }
    // if (nextStep === null) {
    //   return redirectWithHistory(`${match.path}/check`);
    // }
    // if(isPTCreateSkip && nextStep === "acknowledge-create-property")
    // {
    //   nextStep = "map";
    // }
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (isAddMultiple) {
      nextStep = key;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${match.path}/check`);
    }
    nextPage = `${match.path}/${nextStep}`;
    redirectWithHistory(nextPage);
  };
  function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
    setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
    if (key === "isSkip" && data === true) {
      goNext(skipStep, index, isAddMultiple, key, true);
    } else {
      goNext(skipStep, index, isAddMultiple, key);
    }
  }
  const createProperty = async () => {
    history.push(`${match.path}/acknowledgement`);
  };

  const onSuccess = () => {
    sessionStorage.removeItem("CurrentFinancialYear");
    queryClient.invalidateQueries("CR_CREATE_BIRTH");
  };
  const handleSkip = () => {};
  const handleMultiple = () => {};
  const DeathCheckPage = Digit?.ComponentRegistryService?.getComponent("DeathCheckPage");
  const DeathAcknowledgement = Digit?.ComponentRegistryService?.getComponent("DeathAcknowledgement");
  const SearchCorrection = Digit?.ComponentRegistryService?.getComponent("CRSearchdeathcorrection");

  console.log("test");
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      offset: 0,
      limit: 10,
      sortBy: "commencementDate",
      sortOrder: "DESC",
      status: "",
      RenewalPending: true,
    },
  });
  const handleUpdate=(value)=>{
    console.log('v',value);
    sessionStorage.setItem("CR_DEATH_CORRECTIONS", JSON.stringify(value));
  }
  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
    register("sortBy", "commencementDate");
    register("sortOrder", "DESC");
    register("status", "");
    register("RenewalPending", true);
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

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isMobile) {
    return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }} />;
  }

  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("DEATH_APPLICATION_NO2"),
        accessor: "deathApplicationNo",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link" onClick={()=>handleUpdate(row?.original)}>
              <Link to={`/digit-ui/employee/cr/death-flow/death-information`}>
                 {row.original["deathApplicationNo"]}
                  </Link>
                {/* <Link to={`${path}/information-death/`}>{row.original["deathApplicationNo"]}</Link> */}
                {/* <a href={`/information-death/`}>
                  {row.original["deathApplicationNo"]}
                </a> */}
              </span>
            </div>
            // <div>
            //   <Route path="/death-correction" element={<Deathcomp />}>

            //   </Route>

            //   </div>
          );
        },
      },
      {
        Header: t("CR_NAME_DECEASED"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.deceasedFirstNameEn || ""),
        link: `${path}/`,
      },
      {
        Header: t("CR_DATE_OF_DEATH"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.dateOfDeath ? convertEpochToDateDMY(row.dateOfDeath) : ""),
      },
      {
        Header: t("CR_DECEASED_ADHAR_NO"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.deceasedAadharNumber || ""),
      },
      {
        Header: t("CR_FATHER_NAME"),
        disableSortBy: true,
        accessor: (row) => GetCell(row.maleDependentNameEn || ""),
      },
      // {
      //   Header: t("TL_HOME_SEARCH_RESULTS__LOCALITY"),
      //   disableSortBy: true,
      //   accessor: (row) => GetCell(row.tradeLicenseDetail.address.locality.name || ""),
      //   accessor: (row) =>
      //     GetCell(t(`${stringReplaceAll(row.tenantId?.toUpperCase(), ".", "_")}_REVENUE_${row.tradeLicenseDetail.address.locality.code}`) || ""),
      // },
      {
        Header: t("TL_COMMON_TABLE_COL_STATUS"),
        accessor: (row) => GetCell(t((row?.workflowCode && row?.status && `WF_${row?.workflowCode?.toUpperCase()}_${row.status}`) || "NA")),
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="search-wrapper">
        <h1 className="search-header">{t("CR_SEARCH_APPLICATION")}</h1>
        <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <SearchFields {...{ register, control, reset, tenantId, t }} />
        </SearchForm>
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
      </div>

    
      {/* <DeathCrFlow path={path} /> */}
      {/* <PrivateRoute  parentRoute={path} path={`${path}/$search-correction/application`} component={() => < parentUrl={path} />} /> */}
      {/* <PrivateRoute path={`${path}/search/:variant`} component={(props) => <SearchCorrection {...props} parentRoute={path} />} /> */}
    </React.Fragment>
  );
};

export default DeathCorrection;
