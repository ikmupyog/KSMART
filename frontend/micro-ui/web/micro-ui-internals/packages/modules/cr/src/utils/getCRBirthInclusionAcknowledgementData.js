import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");


const getCorrectionDetails = (application, t) => {
    const correction = application?.CorrectionField?.[0]?.correctionFieldValue?.[0];
    const isDate = correction?.correctionFieldName === "CHILD_DOB" ? true : false ;
  return {
    title: t(correction?.column),
    values: [
      { title: t("old value"), value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.oldValue,10), "dd/MM/yyyy") : correction?.oldValue},
      { title: t("new value"), value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.newValue,10), "dd/MM/yyyy") : correction?.newValue}
    ],
  };
};

const getCRBirthInclusionAcknowledgementData = async (application, tenantInfo, t) => {
console.log("get data===",application, tenantInfo, t);
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title:t("Acknowledgment Details"),
        values: [
          { title: t("Application No"), value: application?.applicationNumber },
          {
            title: t("Application Date"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.dateOfReport, "dd/MM/yyyy"),
          },
        ],
      },
    //   getChildDetails(application, t),
    //   getAddressDetails(application, t),
      getCorrectionDetails(application, t)
    ],
  };
};

export default getCRBirthInclusionAcknowledgementData;
