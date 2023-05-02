import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CameraSvg } from "./svgindex";
import { DeleteBtn } from "./svgindex";

const UploadImages = ({ onUpload }) =>{
  return (
    <div className="upload-single-wrap" onClick={(e) => onUpload(e)}>
      <CameraSvg />
      <input type="file" id="upload" accept="image/*" onChange={(e) => onUpload(e)} />
    </div>
  );
}
  // { thumbnails = [], isMulti = true, onDelete, onUpload }
  // {
    // if (thumbnails && thumbnails.length > 0) {
    //   return (
    //     <div className="single-upload-wrap">
    //       {thumbnails.map((thumbnail, index) => {
    //         return (
    //           <div key={index}>
    //             <DeleteBtn onClick={() => onDelete(thumbnail)} className="delete" fill="#d4351c" />
    //             <img src={thumbnail} alt="uploaded thumbnail" />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
    // }
    // } else {
    
  // };
// };

export default UploadImages;
