import React from "react";

const EditButton = ({ label, onClick, selected }) => {
  return (
    <React.Fragment>
      <button tabIndex="0" type="button" className={selected ? "customBtn-selected" : "customBtn"} onClick={onClick}>
        {label}
      </button>
    </React.Fragment>
  );
};

export default EditButton;
