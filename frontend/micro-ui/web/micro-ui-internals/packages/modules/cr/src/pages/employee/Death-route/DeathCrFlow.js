import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb,CardLabel } from "@egovernments/digit-ui-react-components";
// import { ReactComponent as BankIcon } from "../../Img/BankIcon.svg";
// import { ReactComponent as FileProtected } from "../../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";

const DeathCrFlow = ({ path }) => {
  const { t } = useTranslation();
  const cardMenuData = [
    {
      title: "New Registration",
      subTitle: "New Death Registration",
      // img: <BankIcon />,
      link: `${path}/information-death`,
    },
    // {
    //   title: "Name Inclusion",
    //   subTitle: "Inbox",
    //   // img: <FileProtected />,
    //   link: `${path}/structure-type`,
    // },
    {
      title: "Correction",
      subTitle: "Correction of Registered Death",
      // img: <FileProtected />, 
    },
    // {
    //   title: "Suspension",
    //   subTitle: "Inbox",
    //   // img: <FileProtected />,
    // },
    {
      title: "Cancellation",
      subTitle: "Cancellation of Registered Death",
      // img: <FileProtected />,
    },
    // {
    //   title: "Revoke",
    //   subTitle: "Inbox",
    //   // img: <FileProtected />,
    // },
    
    
  ];
  const ClassList = 
  {
   'New Registration':  'crfile',
   'Correction':  'crfilecorrection', 
   'Cancellation':  'crfileadoption', 
  };
  return (
    <div>
      <div className="fileText">
        {" "}
        {/* <h3>Select Functional Modules</h3> */}
        <CardLabel style={{fontSize: "15px",fontWeight: "400",marginBottom: "-18px"}}>{t("Select Functional Modules")}</CardLabel>
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {cardMenuData?.map((item, index) => (
           item.link?(
            <Link to={item.link}>
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
           ):
          ( <div className={ClassList[item.title]}>
             <div className="contentMenu">
               <div className="contentImg">{item.img}</div>
               <div className="contentText">
                 <h6>{item.title}</h6>
                 <span>{item.subTitle}</span>
               </div>
             </div>
           </div>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeathCrFlow;
