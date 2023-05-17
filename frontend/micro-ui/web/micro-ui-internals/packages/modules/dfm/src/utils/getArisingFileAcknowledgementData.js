import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");


const getAddressDetails = (application, t) => {
    return {
        title: "",
        values: [
            { title: t("SEARCH_SELECT_SERVICE"), value: application?.serviceId || t("NOT_RECORDED") },
            { title: t("TITLE"), value: application?.title || t("NOT_RECORDED") },
            { title: t("DESCRIPTION"), value: application?.description || t("NOT_RECORDED") },

        ],
    };
};

const getArisingFileAcknowledgementData = async (application, tenantInfo, t) => {

    return {
        t: t,
        tenantId: tenantInfo?.code,
        title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
        name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
        email: "",
        phoneNumber: "",
        details: [
            {
                title: t("Acknowledgment Details"),
                values: [
                    { title: t("Application No"), value: application?.fileCode },
                    {
                        title: t("Application Date"),
                        value: Digit.DateUtils.ConvertTimestampToDate(application?.fileArisingDate, "dd/MM/yyyy"),
                    },
                ],
            },

            getAddressDetails(application, t),
        ],
    };
};

export default getArisingFileAcknowledgementData;
