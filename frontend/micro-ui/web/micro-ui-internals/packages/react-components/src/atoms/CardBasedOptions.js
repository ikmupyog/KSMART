 import React from "react"

const Option = ({name, Icon, onClick, className }) => {
    return <div className={className || `CardBasedOptionsMainChildOption`} onClick={onClick}>
        <div className="ChildOptionImageWrapper">{Icon}</div>
        <p className="ChildOptionName">{name}</p>
    </div>
}

// const CardBasedOptions = ({header, sideOption, options, styles={}}) => {
//     return <div className="CardBasedOptions">
//         <div className="headContent">
//             <h2>{header}</h2>
//             <p onClick={sideOption.onClick}>{sideOption.name}</p>
//         </div>
//         <div className="mainContent citizenAllServiceGrid">
//             {options.map( (props, index) => 
//                 <Option key={index} {...props} />
//             )}
//         </div>
//     </div>
// }

const CardBasedOptions = ({header, sideOption, options, styles={}}) => {
    return (
    <div className="CardBasedOptions">
        <div className="headContent">
            <h2>{header}</h2>
            <p onClick={sideOption.onClick}>{sideOption.name}</p>
        </div>
        <div  style={{display: 'flex',justifyContent: 'space-between',marginTop: "-40px"}}>
        {options.map( (props, index) => 
        <div className="header-btm-search-box" key={index} onClick={()=>props.onClick()}>
              <div className="inner-box-v">
                <div className="icon-btm-sre-new">
                  <img src={props.Icon} alt="logoksmart"/>
                </div>
                <h4>{props.name}</h4>
              </div>
            </div>
        )}</div>
    </div>)
}

export default CardBasedOptions