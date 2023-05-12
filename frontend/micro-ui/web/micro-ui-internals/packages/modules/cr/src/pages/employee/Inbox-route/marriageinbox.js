import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../../components/DesktopInbox";
import MobileInbox from "../../../components/MobileInbox";

const MarriageInbox = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { uuid } = Digit.UserService.getUser().info;
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchParams, setSearchParams] = useState({ filters: { assignee: uuid }, search: "", sort: {} });
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    (async () => {
      // console.log(searchParams);
      // const applicationStatus = searchParams?.filters?.pgrfilters?.applicationStatus?.map(e => e.code).join(",")
      // let response = await Digit.PGRService.count(tenantId, applicationStatus?.length > 0  ? {applicationStatus} : {} );
      // if (response?.count) {
      //   setTotalRecords(response.count);
      // }

    })();
  }, [searchParams]);


  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + 10);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - 10);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleFilterChange = (filterParam) => {
    setSearchParams({ ...searchParams, filters: filterParam });
  };

  // const onSuccess = (successData) =>{
  //   console.log("successs====data",successData);
  //   setSearchResult(successData?.MarriageDetails);
  // }

  const onSearch = (params = "") => {
    console.log("params for seRCH",params);
    setSearchParams({ ...searchParams,search: {applicationNo: params.applicationNumber}});
    // mutation.mutate({},{onSuccess});
    // refetch();
  };

  let complaints = []
  let isMobile = Digit.Utils.browser.isMobile();
  // console.log("233", searchParams)

  // const mutation = Digit.Hooks.cr.useMarriageApplicationSearch({ tenantId, filters: { ...searchParams?.search, ...searchParams?.filters, offset: pageOffset, limit: pageSize} })
//   sortBy: 'dateOfBirth', sortOrder: 'DESC' 
  // let { data: complaintsz } = Digit.Hooks.cr.useInbox({ tenantId, ...searchParams?.search, ...searchParams?.filters, offset: pageOffset, limit: pageSize });
  // let birthData = searchParams?.search ? searchResult : searchParams?.filters?.assignee ? searchResult : []
  // console.log("complaintsz", complaintsz)

  let { data: searchResults, isLoading, isSuccess,refetch } = Digit.Hooks.cr.useInbox({ tenantId, ...searchParams?.search, ...searchParams?.filters,businessServiceCode:["MARRIAGECORRECTION"], offset: pageOffset, limit: pageSize });

  // let Loading = mutation?.isLoading;
  let Loading = isLoading;


  // useEffect(()=>{
  //   mutation.mutate({},{onSuccess});
  // },[])

  if (complaints?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox data={searchResult} isLoading={Loading} onFilterChange={handleFilterChange} onSearch={onSearch} searchParams={searchParams} />
      );
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox
            data={searchResults}
            isLoading={Loading}
            onFilterChange={handleFilterChange}
            onSearch={onSearch}
            searchParams={searchParams}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            onPageSizeChange={handlePageSizeChange}
            currentPage={Math.floor(pageOffset / pageSize)}
            totalRecords={totalRecords}
            pageSizeLimit={pageSize}
          />
        </div>
      );
    }
  } else {
    return <Loader />;
  }
};

export default MarriageInbox;
