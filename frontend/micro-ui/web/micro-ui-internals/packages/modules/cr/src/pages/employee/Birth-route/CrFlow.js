import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb,DocumentIcon,CardLabel } from "@egovernments/digit-ui-react-components";
import { ReactComponent as BankIcon } from "../Img/BankIcon.svg";
import { ReactComponent as FileProtected } from "../Img/FileProtected.svg";
import { useTranslation } from "react-i18next";

const CrFlow = ({ path }) => {
  const { t } = useTranslation();
  const cardMenuData = [
    {
      title: "New Registration",
      subTitle: "New Birth Registration",
      img: <BankIcon />,
      link: `${path}/child-details`,
    },

    {
      title: "Name Inclusion",
      subTitle: "Include Name In Registered Birth",
      img: <FileProtected />,
      // link: `${path}/structure-type`,
    },
    {
      title: "Correction",
      subTitle: "Correction of Registered Birth",
      img: <FileProtected />, 
    },
    {
      title: "Adoption",
      subTitle: "Registered/New Adoption",
      img: <FileProtected />,
      link: `${path}/search-registry`,
    },
    // {
    //   title: "Cancellation",
    //   subTitle: "Inbox",
    //   img: <FileProtected />,
    // },
    // {
    //   title: "Revoke",
    //   subTitle: "Inbox",
    //   img: <FileProtected />,
    // },
    
  ];
  const ClassList = 
    {
     'New Registration':  'crfile',
     'Name Inclusion':  'crfilename',
     'Correction':  'crfilecorrection', 
     'Adoption':  'crfileadoption', 
    };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{fontSize: "15px",fontWeight: "400",marginBottom: "-18px"}}>{t("Select Functional Modules")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
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

export default CrFlow;
