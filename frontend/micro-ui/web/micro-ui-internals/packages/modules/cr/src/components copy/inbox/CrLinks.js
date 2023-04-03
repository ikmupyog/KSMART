import { Card } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CrLinks = ({ isMobile, data,SearchInbox }) => {
  const { t } = useTranslation();

  const allLinksBirth = [
    { text:  t("CR_BIRTH_REGISTRATION"), link: "/digit-ui/employee/cr/cr-flow/child-details", accessTo: ["CSR"] },
    { text:  t("CR_SEARCH_APPLICATIONS"), link: "/digit-ui/employee/cr/search-flow", accessTo: ["CSR"] },
    // { text: "Reports", link: "/employee" },
    // { text: "Dashboard", link: "/employee" },
  ];
  const allLinksDeath = [
    { text:  t("CR_DEATH_REGISTRATION"), link: "/digit-ui/employee/cr/death-flow/information-death", accessTo: ["CSR"] },
    { text:  t("CR_SEARCH_APPLICATIONS"), link: "/digit-ui/employee/cr/search-flow", accessTo: ["CSR"] },
    // { text: "Reports", link: "/employee" },
    // { text: "Dashboard", link: "/employee" },
  ];

  const [links, setLinks] = useState([]);

  useEffect(() => {
    let linksToShow = [];
    let allLinks = SearchInbox =="birth"? allLinksBirth : allLinksDeath
    allLinks.forEach((link) => {
      // if (link.accessTo) {
      //   if (Digit.UserService.hasAccess(link.accessTo)) {
      //     linksToShow.push(link);
      //   }
      // } else {
      //   linksToShow.push(link);
      // }
      linksToShow.push(link);
    });
    setLinks(linksToShow);
  }, []);

  // useEffect(() => {
  //   if (isMobile) {
  //     const mobileLinks = links.filter((link) => {
  //       return link.text !== "Dashboard";
  //     });
  //     setLinks(mobileLinks);
  //   }
  // }, []);

  const GetLogo = () => (
    <div className="header">
      <span className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white" />
        </svg>
      </span>{" "}
      <span className="text">{SearchInbox=="birth"?t("Birth Inbox"):t("Death Inbox")}</span>
    </div>
  );

  return (
    <Card className="employeeCard filter inboxLinks">
      <div className="complaint-links-container">
        {GetLogo()}
        <div className="body">
          {links.map(({ link, text }, index) => (
            <span className="link" key={index}>
              <Link to={link}>{t(text)}</Link>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CrLinks;
