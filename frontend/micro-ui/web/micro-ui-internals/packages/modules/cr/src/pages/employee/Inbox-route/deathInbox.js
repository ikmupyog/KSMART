import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../../components/DesktopInbox";
import MobileInbox from "../../../components/MobileInbox";

const DeathInbox = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { uuid } = Digit.UserService.getUser().info;
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchParams, setSearchParams] = useState({ filters: { wfFilters: { assignee: [{ code: uuid }] } }, search: "", sort: {} });

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

  const onSearch = (params = "") => {
    setSearchParams({ ...searchParams, search: params });
  };

  // let complaints = Digit.Hooks.pgr.useInboxData(searchParams) || [];
  // let { data: complaints, isLoading } = Digit.Hooks.cr.useUserSearch({ ...searchParams, offset: pageOffset, limit: pageSize }) ;
let complaints=[]
// let isLoading AK-104-2023-CRDRNR-C-KOCHI-KL
  let isMobile = Digit.Utils.browser.isMobile();
  let filterParams= {...searchParams.search,
  limit: 10,
  sortBy: "DateOfDeath",
  sortOrder: "DESC",}
console.log('p',searchParams,filterParams); 
  const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchDeath({ tenantId, filters: filterParams  })
// console.log(searchResult);
let DeathData = searchParams?.search? searchResult : searchParams?.filters?.wfFilters?.assignee?.length>0?searchParams?.filters?.wfFilters?.assignee[0].code==""?searchResult:[]:[]
let Loading = searchParams?.search? isLoading : false
  if (complaints?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox data={DeathData} isLoading={Loading} onFilterChange={handleFilterChange} onSearch={onSearch} searchParams={searchParams} />
      );
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox
            data={DeathData}
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

export default DeathInbox;
