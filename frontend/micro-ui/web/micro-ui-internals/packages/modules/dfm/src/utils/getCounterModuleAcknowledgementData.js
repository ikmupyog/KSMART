import { pdfDocumentName, pdfDownloadLink, stringReplaceAll, getTransaltedLocality } from "./index";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");




const getApplicantDetails = (application, t) => {
    let firstName = sessionStorage.getItem("firstName") || "Not Recorded";
    let institutionName = sessionStorage.getItem("institutionName") || "Not Recorded";
    application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];
    if (firstName) {
        return {
            title: "",
            values: [

                { title: t("APPLICANT_NAME"), value: application?.arisingFileApplicant?.firstName ? application?.arisingFileApplicant?.firstName : t("NOT_RECORDED") },
                { title: t("MIDDLE_NAME"), value: application?.arisingFileApplicant?.middleName ? application?.arisingFileApplicant?.middleName : t("NOT_RECORDED") },
                { title: t("LAST_NAME"), value: application?.arisingFileApplicant?.lastName ? application?.arisingFileApplicant?.lastName : t("NOT_RECORDED") },
            ],
        }
    } else {
        return {
            title: "",
            values: [

                { title: t("INSTITUTION_NAME"), value: application?.arisingFileApplicant?.institutionName ? application?.arisingFileApplicant?.institutionName : t("NOT_RECORDED") },
                { title: t("OFFICER_NAME"), value: application?.arisingFileApplicant?.officerName ? application?.arisingFileApplicant?.officerName : t("NOT_RECORDED") },
                { title: t("DESIGNATION"), value: application?.arisingFileApplicant?.designation ? application?.arisingFileApplicant?.designation : t("NOT_RECORDED") },
            ],
        }
    }
};




const getDataDetails = (application, t) => {
    application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];

    return {
        title: "",
        values: [

            // { title: t("ID_DETAILS"), value: application?.arisingFileApplicant?.idDetails ? application?.arisingFileApplicant?.idDetails : t("NOT_RECORDED") },
            { title: t("EMAIL"), value: application?.arisingFileApplicant?.emailId ? application?.arisingFileApplicant?.emailId : t("NOT_RECORDED") },
            { title: t("MOBILE"), value: application?.arisingFileApplicant?.mobileNo ? application?.arisingFileApplicant?.mobileNo : t("NOT_RECORDED") },

        ],
    };
};
const getDataPlaceDetails = (application, t) => {
    application.owners = application?.nacDetails?.filter((applicationNumber) => applicationNumber.active == true) || [];

    return {
        title: "",
        values: [

            { title: t("WARD_NO"), value: application?.arisingFileApplicant?.wardNo ? application?.arisingFileApplicant?.wardNo : t("NOT_RECORDED") },
            { title: t("MAIN_PLACE"), value: application?.arisingFileApplicant?.mainPlace ? application?.arisingFileApplicant?.mainPlace : t("NOT_RECORDED") },
            { title: t("PINCODE"), value: application?.arisingFileApplicant?.pinCode ? application?.arisingFileApplicant?.pinCode : t("NOT_RECORDED") },
        ],
    };
};
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

const getCounterModuleAcknowledgementData = async (application, tenantInfo, t) => {

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
            getApplicantDetails(application, t),
            getDataDetails(application, t),
            getDataPlaceDetails(application, t)
        ],
    };
};

export default getCounterModuleAcknowledgementData;
