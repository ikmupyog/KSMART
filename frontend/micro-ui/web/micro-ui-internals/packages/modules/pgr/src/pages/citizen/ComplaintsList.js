import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import { Card, Header, Loader } from "@egovernments/digit-ui-react-components";
import { LOCALE } from "../../constants/Localization";
import Complaint from "../../components/Complaint";

export const ComplaintsList = (props) => {
  const User = Digit.UserService.getUser();
  const mobileNumber = User.mobileNumber || User?.info?.mobileNumber || User?.info?.userInfo?.mobileNumber;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  let { isLoading, error, data, revalidate } = Digit.Hooks.pgr.useComplaintsListByMobile(tenantId, { mobileNumber: mobileNumber, offset: pageOffset, limit: pageSize });

  useEffect(() => {
    revalidate();
  }, []);

  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + pageSize);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - pageSize);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  if (isLoading) {
    return (
      <React.Fragment>
        <Header>{t(LOCALE.MY_COMPLAINTS)}</Header>
        <Loader />
      </React.Fragment>
    );
  }


  let complaints = data?.ServiceWrappers;
  let complaintsList;
  if (error) {
    complaintsList = (
      <Card>
        {t(LOCALE.ERROR_LOADING_RESULTS)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (complaints.length === 0) {
    complaintsList = (
      <Card>
        {t(LOCALE.NO_COMPLAINTS)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else {
    const serviceData = complaints.map(item => item.service)
    complaintsList = <Complaint
      data={serviceData}
      path={path}
      onPageSizeChange={handlePageSizeChange}
      onNextPage={fetchNextPage}
      onPrevPage={fetchPrevPage}
      currentPage={Math.floor(pageOffset / pageSize)}
      pageSizeLimit={pageSize}
    />;
  }

  return (
    <div className="row">
      <div className="col-md-12" style={{ margin: "10px", textAlign: "center" }}>
        <Header>{t(LOCALE.MY_COMPLAINTS)}</Header>
      </div>
      <div className="col-md-12">
        {complaintsList}
      </div>
    </div>
  );
};
