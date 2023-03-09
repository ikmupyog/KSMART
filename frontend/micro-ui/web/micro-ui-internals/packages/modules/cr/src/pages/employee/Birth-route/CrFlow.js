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
      title: "CR_BIRTH_REGISTRATION",
      subTitle: "CR_BIRTH_NEW_REGISTRATION",
      img: <BankIcon />,
      link: `${path}/child-details`,
    },
    // {
    //   title: "CR_BIRTH_ADOPTION",
    //   subTitle: "CR_BIRTH_REG_NEW_ADOPTION",
    //   img: <FileProtected />,
    //   link: `${path}/adoption-details`,
    // },
    // {
    //   title: "CR_STILL_BIRTH",
    //   subTitle: "CR_STILL_BIRTH_REG",
    //   img: <BankIcon />,
    //   // link: `${path}/child-details`,
    // },
    // {
    //   title: "CR_BIRTH_BORN_OUTSIDE",
    //   subTitle: "CR_BIRTH_BORN_OUTSIDE_DESC",
    //   img: <BankIcon />,
    //   // link: `${path}/child-details`,
    // },

    // {
    //   title: "CR_BIRTH_NAME_INC_CORRECTION",
    //   subTitle: "CR_BIRTH_NAME_INC_CORRECTION_DESC",
    //   img: <FileProtected />,
    //   // link: `${path}/structure-type`,
    // },
    
  ];
  const ClassList = 
    {
     'CR_BIRTH_REGISTRATION':  'crfilename',
    //  'CR_BIRTH_NEW_REG':  'crfilename',
     'CR_BIRTH_ADOPTION':  'crfileadoption', 
     'CR_STILL_BIRTH':  'crstillbirthfile',
     'CR_BIRTH_BORN_OUTSIDE':  'crfile',
     'CR_BIRTH_NAME_INC_CORRECTION':  'crfilecorrection',    
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
