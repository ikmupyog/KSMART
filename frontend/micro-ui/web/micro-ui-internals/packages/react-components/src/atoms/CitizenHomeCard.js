import React from "react";
import { Link } from "react-router-dom";

const CitizenHomeCard = ({ header, links, state, Icon, Info, isInfo = false, styles,module }) => {

  let tmpLinks 
  // let defaultLink =links
  //  if (defaultLink ?.length>0 && window.location.href.includes('cr-home')){
  //   tmpLinks = defaultLink.filter((item)=>  item.module !== "cr-home" )
  // }else if(defaultLink ?.length>0 && window.location.href.includes('cr-home')){
  //   tmpLinks = defaultLink.filter((item)=>  item.module !== "cr-home" )
  // }
  // else{
    tmpLinks = links
  // }
  return (
    <div className="CitizenHomeCard" style={styles ? styles : {}}>
      <div className="header">
        <h2>{header}</h2>
        <Icon />
      </div>

      <div className="links"> 
        {tmpLinks.map((e, i) => (
          <Link key={i} to={{ pathname: e.link, state: e.state }}> 
            {e.i18nKey}
          </Link>
        ))}
      </div>
      <div>
        {isInfo ? <Info /> : null} 
      </div>
    </div>
  );
};

export default CitizenHomeCard;
