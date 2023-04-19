import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb, DocumentIcon, CardLabel } from "@egovernments/digit-ui-react-components";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";

const CrFlow = ({ path }) => {
  const { t } = useTranslation();
  //New Registration
  sessionStorage.removeItem("CR_BIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_BIRTH_REG");
  sessionStorage.removeItem("CR_STILLBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_STILLBIRTH_REG");
  sessionStorage.removeItem("CR_BORNOUTSIDEBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("CR_NACBIRTH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_EDIT_BORNOUTSIDEBIRTH_REG");
  const cardMenuData = [
    {
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-birth/child-details`,
    },
    // {
    //   title: "CR_BIRTH_ADOPTION",
    //   subTitle: "CR_BIRTH_REG_NEW_ADOPTION",
    //   img: <FileProtected />,
    //   link: `${path}/adoption-details`,
    // },
    {
      title: "CR_STILL_BIRTH",
      subTitle: "CR_STILL_BIRTH_REG",
      img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-stillbirth/stillbirth-child-details`,
    },
    {
      title: "CR_BIRTH_BORN_OUTSIDE",
      subTitle: "CR_BIRTH_BORN_OUTSIDE_DESC",
      img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-bornoutsidebirth/born-outside-child-details`,
    },
    {
      title: "CR_ABANDONED_BIRTH_REGISTRATION",
      subTitle: "CR_ABANDONED_BIRTH_NEW_REGISTRATION",
      img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-abandonedbirth/abandoned-child-details`,
    },
    {
      title: "CR_NAC_BIRTH",
      subTitle: "CR_NAC_BIRTH_REG",
      img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-nacbirthsearch/nac-download-details`,
    },
    // {
    //   title: "CR_BIRTH_NAME_INC_CORRECTION",
    //   subTitle: "CR_BIRTH_NAME_INC_CORRECTION_DESC",
    //   img: <FileProtected />,
    //   // link: `${path}/structure-type`,
    // },
  ];
  const ClassList = {
    CR_BIRTH_REGISTRATION: "crfilename",
    //  'CR_BIRTH_NEW_REG':  'crfilename',
    CR_BIRTH_ADOPTION: "crfileadoption",
    CR_STILL_BIRTH: "crstillbirthfile",
    CR_BIRTH_BORN_OUTSIDE: "crfile",
    CR_ABANDONED_BIRTH_REGISTRATION: "crfilecorrection",
    CR_BIRTH_NAME_INC_CORRECTION: "crfilecorrection",
    CR_NAC_BIRTH: "crfilecorrection",
  };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{ fontSize: "15px", fontWeight: "400", marginBottom: "-18px" }}>{t("Select Functional Modules")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {cardMenuData?.map((item, index) =>
            item.link ? (
              <Link to={item.link} key={index}>
                {/* <Link to='trade-lisense'> */}
                <div className={ClassList[item.title]}>
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
              <div className={ClassList[item.title]}>
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

export default CrFlow;
