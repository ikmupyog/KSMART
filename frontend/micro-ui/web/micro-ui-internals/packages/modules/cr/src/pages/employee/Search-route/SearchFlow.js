import React from "react";
import { Link } from "react-router-dom";
import { CardLabel,SearchIconSvg } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SearchFlow = ({ path }) => {
  const { t } = useTranslation();
  const cardMenuData = [
    {
      title: "Birth Search",
      subTitle: "Birth Applications Search",
      img: <SearchIconSvg />,
      link: `${path}/birthsearch/application`,
    },
    {
      title: "Death Search",
      subTitle: "Death Applications Search",
      img: <SearchIconSvg />,
      link: `${path}/deathsearch/application`,
    },
    {
      title: "Marriage Search",
      subTitle: "Marriage Applications Search",
      img: <SearchIconSvg />,
      link: `${path}/marriagesearch/application`,
    },
   
    
  ];
  const ClassList = 
    {
     'Birth Search':  'crfile',
     'Death Search':  'crfileadoption',
     'Marriage Search':  'crfilecorrection',
    };
  return (
    <div>
      <div className="fileText">
        {" "}
        <CardLabel style={{fontSize: "15px",fontWeight: "400",marginBottom: "-18px"}}>{t("Select Application Type")}</CardLabel>
        {/* <h3>Select Functional Modules</h3> */}
      </div>
      <div className="FileFlowWrapper">
        <div className="cardWrapper">
          {cardMenuData?.map((item, index) => (
           item.link?(
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

export default SearchFlow;
