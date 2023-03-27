import React from "react";

const FormFieldContainer = (props) => {
  return (
    <div className="row">
      <div className="col-md-12" >{props.children}</div>
    </div>
  );
};

export default FormFieldContainer;
