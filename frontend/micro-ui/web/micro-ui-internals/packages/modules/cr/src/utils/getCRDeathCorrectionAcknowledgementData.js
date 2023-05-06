import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");



const getCorrectionDetails = (application, t) => {
    const correctionField = application?.CorrectionField;
    const returnDetails = correctionField?.map((correctionItem) => {
      const isDate = correctionItem?.correctionFieldName === "DECEASED_DOB" ? true : false;
      const correctionData = correctionItem.correctionFieldValue?.map((correction) => {
        return (
          {
            title: t(correction?.column),
            value: isDate ? Digit.DateUtils.ConvertTimestampToDate(parseInt(correction?.newValue, 10), "dd/MM/yyyy") : correction?.newValue,
          }
        );
      });
      return { title: t((`CR_${correctionItem?.correctionFieldName}`)), values: correctionData };
    });
    return returnDetails;
  };

const getCRDeathCorrectionAcknowledgementData = async (application, tenantInfo, t) => {
  return {
    t: t,
    tenantId: tenantInfo?.code,
    title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
    email: "",
    phoneNumber: "",
    details: [
      {
        title:t("CR_ACKNOWLEDGMENT_DETAILS"),
        values: [
          { title: t("CR_COMMON_COL_APP_NO"), value: application?.InformationDeathCorrection?.DeathACKNo },
          {
            title: t("CR_COMMON_COL_APP_DATE"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.InformationDeathCorrection?.ApplicationDate, "dd/MM/yyyy"),
          },
        ],
      },
    //   getChildDetails(application, t),
    //   getAddressDetails(application, t),
      ...getCorrectionDetails(application, t)
    ],
  };
};

export default getCRDeathCorrectionAcknowledgementData;
