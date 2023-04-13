import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CameraSvg } from "./svgindex";
import { DeleteBtn } from "./svgindex";

const MiniUpload = ({ onUpload }) => {
  return (
    <div className="upload-img-container">
      <CameraSvg className="upload-camera-img" />
      <input type="file" id="miniupload" accept="image/*" onChange={(e) => onUpload(e)} />
    </div>
  );
};

const UploadImages = ({ thumbnails = [], isMulti = true, onDelete, onUpload }) => {
  if (thumbnails && thumbnails.length > 0) {
    // if (!isMulti) {
    //   return (
    //     <div className="multi-upload-wrap">
    //       <div>
    //         <DeleteBtn onClick={() => onDelete(thumbnails[0])} className="delete" fill="#d4351c" />
    //         <img src={thumbnails[0]} alt="uploaded thumbnail" />
    //       </div>
    //     </div>
    //   );
    // } else {
    return (
      <div className={!isMulti ? "single-upload-wrap" : "multi-upload-wrap"}>
        {thumbnails.map((thumbnail, index) => {
          return (
            <div key={index}>
              <DeleteBtn onClick={() => onDelete(thumbnail)} className="delete" fill="#d4351c" />
              <img src={thumbnail} alt="uploaded thumbnail" />
            </div>
          );
        })}
        {thumbnails.length < 3 && isMulti ? <MiniUpload onUpload={onUpload} /> : null}
      </div>
    );
    // }
  } else {
    return (
      <div className={!isMulti ? "upload-single-wrap" : "upload-wrap"} onClick={(e) => onUpload(e)}>
        <CameraSvg />
        <input type="file" id="upload" accept="image/*" onChange={(e) => onUpload(e)} />
      </div>
    );
  }
};

UploadImages.propTypes = {
  thumbnail: PropTypes.array,
  onUpload: PropTypes.func,
};

UploadImages.defaultProps = {
  thumbnail: [],
  onUpload: undefined,
};

export default UploadImages;
