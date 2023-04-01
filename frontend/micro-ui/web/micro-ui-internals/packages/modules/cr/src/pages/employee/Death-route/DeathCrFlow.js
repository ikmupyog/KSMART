import React from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import { Switch, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { convertToAbandonedDeathRegistration } from "../../../utils";


const DeathCrFlow = ({ data, path }) => {
  const { t } = useTranslation();
  const isEdit = window.location.href.includes("renew-trade");
  sessionStorage.removeItem("CR_DEATH_EDIT_FLAG");
  sessionStorage.removeItem("Digit.CR_DEATH_EDIT");
  const cardMenuData = [
    {
      title: "New Registration",
      subTitle: "New Death Registration",
      // img: <BankIcon />,
      link: `${path}/information-death`,
    },
    {
      title: "New Registration",
      subTitle: "New Death Registration Abandoned",
      // img: <BankIcon />,
      link: `${path}/abandoned-information-death`,
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
      link: `${path}/specify-correction`,
      // link: `${path}/search-correction/application`,
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
  
  let formdata = !isEdit ? convertToAbandonedDeathRegistration(data):[] ;
  console.log(formdata);
  // formdata.BirthDetails[0].tenantId = formdata?.BirthDetails[0]?.tenantId || tenantId1;
  if(!isEdit)
  {
    console.log("data",formdata)
    // mutation.mutate(formdata, {
    //   onSuccess,
    // })
  }
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
