import React from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea } from "@egovernments/digit-ui-react-components";
import { Switch, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { convertToDeathRegistration } from "../../../utils/deathindex";


const DeathCrFlow = ({ data, path }) => {
  const { t } = useTranslation();
  const isEdit = window.location.href.includes("renew-trade");
  const cardMenuData = [
    {
      title: "CR_NEW_REGISTRATION",
      subTitle: "CR_DEATH_NEW_REGISTRATION",
      // img: <BankIcon />,
      link: `/digit-ui/employee/cr/create-death/information-death`,
    },
    {
      title: "CR_NEW_REGISTRATION_ABANDONED",
      subTitle: "CR_ABANDONED_DEATH_REG",
      // img: <BankIcon />,
      link: `/digit-ui/employee/cr/death-flow/Abandoned-death/abandoned-death-information`,
    },
  
    // {
    //   title: "Name Inclusion",
    //   subTitle: "Inbox",
    //   // img: <FileProtected />,
    //   link: `${path}/structure-type`,
    // },
    {
      title: "CR_DEATH_CORRECTIONS",
      subTitle: "CR_REG_CORRECTION_SUB",
      link: `${path}/specify-correction`,
      // link: `${path}/search-correction/application`,
      // img: <FileProtected />, 
    },
    // {
    //   title: "Cancellation",
    //   subTitle: "Cancellation of Registered Death",
    //   // img: <FileProtected />,
    // },
    
    
  ];
  const ClassList = 
  {
   'CR_NEW_REGISTRATION':  'crfile',
   'CR_DEATH_CORRECTIONS':  'crfilecorrection', 
   'CR_NEW_REGISTRATION_ABANDONED':  'crfileadoption', 
  };
  
  let formdata = !isEdit ? convertToDeathRegistration(data):[] ;
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
