import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");




const getCorrectionFieldValue = (newValue, isDate,t) =>{
    let correctionNewValue = newValue ? newValue : t("CR_NOT_RECORDED");
    if(isDate){
      correctionNewValue = newValue ? Digit.DateUtils.ConvertTimestampToDate(parseInt(newValue, 10), "dd/MM/yyyy") : t("CR_NOT_RECORDED");
    }
    return correctionNewValue;
  }



const getCorrectionDetails = (application, t) => {
    const correctionField = application?.CorrectionField;
    const returnDetails = correctionField?.map((correctionItem) => {
      const isDate = correctionItem?.correctionFieldName === "DECEASED_DOB" ? true : false;
      const correctionData = correctionItem.correctionFieldValue?.map((correction) => {
        const correctionFieldName = getCorrectionFieldValue(correction?.newValue, isDate, t);
        const marriageLabels = correction?.column?.split('_');
        const isMalField = ["MAL","ML"].includes(marriageLabels[marriageLabels?.length - 1]);
        if(!isMalField){
        return (
          {
            title: t(correction?.column),
            value: correctionFieldName,
          }
        );
    } else {
        return "NA";
      }
      });
      const formattedCorrectionData = correctionData.filter((item) => item !== 'NA')
      return { title: t((`CR_${correctionItem?.correctionFieldName}`)), values: formattedCorrectionData };
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
