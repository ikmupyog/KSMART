import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getAbandonedBirthChildDetails = (application, t) => {
  console.log(application);
  application.owners = application?.AbandonedDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
  //if (application?.ChildDetails?.applicationNumber == "TL_COMMON_TABLE_COL_APP_NO") {
 
  return {
    title: "",
    values: [
      { title: t("Date of Birth"), value: application?.childDOB ? Digit.DateUtils.ConvertTimestampToDate(application?.childDOB, "dd/MM/yyyy") : t("CS_NA") },
      { title: t("Gender"), value: application?.gender ? application?.gender : t("CS_NA") },
      { title: t("Birth Place"), value: application?.birthPlace ? application?.birthPlace : t("CS_NA") },
      // { title: t("Birth Place Name"), value: application?.hospitalName ? application?.hospitalName : t("CS_NA") },
   //   { title: "Birth Place Name", value: response?.hospitalName + "/" + response?.hospitalNameMl || "NA"},   
    ],
  };

};

const getCRAbandonedBirthAcknowledgementData = async (application, tenantInfo, t) => {

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
       
          { title: t("Application Date"),value: Digit.DateUtils.ConvertTimestampToDate(application?.dateofreport, "dd/MM/yyyy"), },
       
        ],
      },
      getAbandonedBirthChildDetails(application, t),
    ],
  };
  
};

export default getCRAbandonedBirthAcknowledgementData;
