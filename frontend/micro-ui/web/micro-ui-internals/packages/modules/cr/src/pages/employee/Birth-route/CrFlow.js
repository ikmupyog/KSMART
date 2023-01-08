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
      title: "Adoption",
      subTitle: "Registered/New Adoption",
      img: <FileProtected />,
      link: `${path}/adoption-details`,
    },
    {
      title: "Still Birth",
      subTitle: "Still Birth Registration",
      img: <BankIcon />,
      // link: `${path}/child-details`,
    },
    {
      title: "Born Outside India",
      subTitle: "Registration of Born Outside India",
      img: <BankIcon />,
      // link: `${path}/child-details`,
    },

    {
      title: "Name Inclusion/Correction",
      subTitle: "Name Inclusion/Correction In Registered Birth",
      img: <FileProtected />,
      // link: `${path}/structure-type`,
    },
    
  ];
  const ClassList = 
    {
     'New Registration':  'crfilename',
     'Adoption':  'crfileadoption', 
     'Still Birth':  'crstillbirthfile',
     'Born Outside India':  'crfile',
     'Name Inclusion/Correction':  'crfilecorrection',    
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
