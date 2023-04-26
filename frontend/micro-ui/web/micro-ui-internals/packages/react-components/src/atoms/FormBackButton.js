import React from "react";
import { ArrowLeft, ArrowLeftWhite } from "./svgindex";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FormBackButton = ({ history, style, isSuccessScreen, isCommonPTPropertyScreen, getBackPageNumber, className = "", variant = "black" }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div
        className={`back-btn-form ${className}`}
        style={style ? style : {}}
        onClick={() => {
          !isSuccessScreen ? (!isCommonPTPropertyScreen ? history.goBack() : history.go(getBackPageNumber())) : null;
        }}
      >
        {/* {variant == "black" ? ( */}

        {/* <ArrowLeft /> */}
        <p>{t("CS_COMMON_BACK")}</p>

        {/* ) : (
        <ArrowLeftWhite />
      )} */}
      </div>
    </React.Fragment>
  );
};
export default withRouter(FormBackButton);
