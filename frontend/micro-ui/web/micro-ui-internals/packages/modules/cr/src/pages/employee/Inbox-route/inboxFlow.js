import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb, DocumentIcon, CardLabel } from "@egovernments/digit-ui-react-components";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../../../utils";

const SearchFlow = ({ path }) => {
  const { t } = useTranslation();
  const cardMenuData = [
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX"
    },
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX"
    },
  ];

  let links = [

    // HOSPITAL_OPERATOR START----------------------------------//    
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "HOSPITAL_OPERATOR"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "HOSPITAL_OPERATOR"
    },
    // HOSPITAL_OPERATOR END ----------------------------------------------------------//

    // HOSPITAL_APPROVER START--------------------------------------------------------//
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "HOSPITAL_APPROVER"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "HOSPITAL_APPROVER"
    },
    // HOSPITAL_APPROVER END----------------------------------------------------------

    // BND_DISTRICT_REGISTRAR START----------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "BND_DISTRICT_REGISTRAR"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "BND_DISTRICT_REGISTRAR"
    },
    // BND_LOCAL_REGISTRAR START----------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "BND_LOCAL_REGISTRAR"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "BND_LOCAL_REGISTRAR"
    },
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX",
      role: "BND_LOCAL_REGISTRAR"
    },

    // BND_LOCAL_REGISTRAR END----------------------------------------------------------

    // BND_SUB_REGISTRAR START----------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "BND_SUB_REGISTRAR"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "BND_SUB_REGISTRAR"
    },
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX",
      role: "BND_SUB_REGISTRAR"
    },

    // BND_SUB_REGISTRAR END-----------------------------------------------------------

    // JHI START-------------------------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "JHI"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "JHI"
    },
    // JHI END-------------------------------------------------------------------------

    // INSTITUTION_OPERATOR START-------------------------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "INSTITUTION_OPERATOR"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "INSTITUTION_OPERATOR"
    },
    // INSTITUTION_OPERATOR END-------------------------------------------------------------------------

    // INSTITUTION_APPROVER START-------------------------------------------------------------------------
    {
      title: t("CR_BIRTH_INBOX"),
      subTitle: t("CR_BIRTH_INBOX_APPLS"),
      img: <FileProtected />,
      link: `${path}/birthinbox`,
      code: "CR_BIRTH_INBOX",
      role: "INSTITUTION_APPROVER"
    },
    {
      title: t("CR_DEATH_INBOX"),
      subTitle: t("CR_DEATH_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/deathinbox`,
      code: "CR_DEATH_INBOX",
      role: "INSTITUTION_APPROVER"
    },

    // INSTITUTION_APPROVER END-------------------------------------------------------------------------

    // OFFICIAL_NOTIFIER START-------------------------------------------------------------------------


    // OFFICIAL_NOTIFIER END-------------------------------------------------------------------------

    // BND_CEMP START-----------------------------------------------------------------------------------


    // BND_CEMP END---------------------------------------------------------------------------------------

    // JD_OPERATOR START ---------------------------------------------------------------------------------------
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX",
      role: "JD_OPERATOR"
    },
    // JD_OPERATOR END ---------------------------------------------------------------------------------------

    // JD_VERIFIER START ---------------------------------------------------------------------------------------
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX",
      role: "JD_VERIFIER"
    },
    // JD_VERIFIER END ---------------------------------------------------------------------------------------

    // JD_APPROVER START ---------------------------------------------------------------------------------------
    {
      title: t("CR_MARRIAGE_INBOX"),
      subTitle: t("CR_MARRIAGE_INBOX_APPS"),
      img: <FileProtected />,
      link: `${path}/marriageinbox`,
      code: "CR_MARRIAGE_INBOX",
      role: "JD_APPROVER"
    },
    // JD_APPROVER END ---------------------------------------------------------------------------------------
    {
      label: t("CR_SEARCH_APPLICATIONS"),
      link: `/digit-ui/employee/cr/search-flow`
      // link: `/digit-ui/employee/cr/search/application`
    },
  ]

  links = links.filter(link => link.role ? checkForEmployee(link.role) : true);

  const ClassList =
  {
    'CR_BIRTH_INBOX': 'crfile',
    'CR_DEATH_INBOX': 'crfileadoption',
    'CR_MARRIAGE_INBOX': 'crmarriageCorrection'
  };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{ fontSize: "15px", fontWeight: "400", marginBottom: "-18px" }}>{t("SELECT_INBX_TYPE")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {links?.map((item, index) =>
            item.link ? (
              <Link to={item.link}>
                {/* <Link to='trade-lisense'> */}
                {/* {ClassList[item.title]} */}
                <div className={ClassList[item.code]}>
                  <div className="contentMenu">
                    <div className="contentImg">{item.img}</div>
                    <div className="contentText">
                      <h6>{item.title}</h6>
                      <span>{item.subTitle}</span>
                    </div>
                  </div>
                </div>{" "}
              </Link>
            ) : (
              <div className={ClassList[item.code]}>
                <div className="contentMenu">
                  <div className="contentImg">{item.img}</div>
                  <div className="contentText">
                    <h6>{item.title}</h6>
                    <span>{item.subTitle}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFlow;
