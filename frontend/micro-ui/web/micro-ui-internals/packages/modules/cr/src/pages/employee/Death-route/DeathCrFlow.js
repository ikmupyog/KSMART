import React from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import { Switch, useLocation, Link } from "react-router-dom";
import { PrivateRoute, BreadCrumb } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

// import { ReactComponent as BankIcon } from "../../Img/BankIcon.svg";
// import { ReactComponent as FileProtected } from "../../Img/FileProtected.svg";

const DeathCrFlow = ({ path }) => {
  console.log(path);
  const { t } = useTranslation();

  const cardMenuData = [
    {
      title: "New Registration",
      subTitle: "Inbox",
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
      subTitle: "Inbox",
      // img: <FileProtected />, 
    },
    // {
    //   title: "Suspension",
    //   subTitle: "Inbox",
    //   // img: <FileProtected />,
    // },
    {
      title: "Cancellation",
      subTitle: "Inbox",
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
          ( <div className="crfile">
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
