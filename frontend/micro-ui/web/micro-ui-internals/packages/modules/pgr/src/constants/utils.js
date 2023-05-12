const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

export const arraySort = (options, optionkey, locilizationkey) => {
    return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
};

const getAddress = (application, t) => {
    return `${application?.address?.landmark || ""}, ${t(application?.address?.region || "")}, ${t(application?.address?.district || "")}, ${t(application?.address?.state || "")}.`
}
const getEmployee = (application, t) => {
    return `${application?.employee?.name}, ${application?.employee?.mobileNumber}. `
}
const getInformer = (application, t) => {
    if (application?.informer && application?.informer?.name) {
        return `${application?.informer?.name}, ${application?.informer?.mobileNumber}. `
    } else {
        return `${t('CS_NA')}`
    }
}

export const getPGRAkgData = async (application, tenantInfo, t) => {

    return {
        t: t,
        tenantId: tenantInfo?.code,
        title: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
        name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t(`ULBGRADE_${tenantInfo?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`))}`,
        email: "",
        phoneNumber: "",
        details: [
            {
                title: t("PGR_ACKNOWLEDGMENT_DETAILS"),
                values: [
                    { title: t("CS_COMPLAINT_DETAILS_COMPLAINT_NO"), value: application?.serviceRequestId },
                    {
                        title: t("CS_COMPLAINT_FILED_DATE"),
                        value: Digit.DateUtils.ConvertTimestampToDate(application?.auditDetails?.createdTime, "dd/MM/yyyy"),
                    }
                ]
            },
            {
                title: "",
                values: [
                    { title: t("CS_ADDCOMPLAINT_COMPLAINT_TYPE"), value: t(application?.serviceCode) },
                    { title: t("PGR_DEPARTMENT"), value: application?.deptCode }
                ]
            },
            {
                title: "",
                values: [
                    { title: t("CS_COMPLAINT_ADDTIONAL_DETAILS"), value: application?.description },
                    { title: t("ES_CREATECOMPLAINT_ADDRESS"), value: getAddress(application, t) }
                ]
            },
            {
                title: "",
                values: [
                    { title: t("ES_COMMON_FILED_BY"), value: getInformer(application, t) },
                ]
            },
            {
                title: "",
                values: [
                    { title: t("ES_ALL_COMPLAINTS_SUBMITTED_BY"), value: getEmployee(application, t) },
                ]
            }
            //       {
            //         title: t("TL_COMMON_DOCS"),
            //         values:
            //           application?.tradeLicenseDetail?.applicationDocuments?.length > 0
            //             ? application?.tradeLicenseDetail?.applicationDocuments.map((document, index) => {
            //               let documentLink = pdfDownloadLink(res?.data, document?.fileStoreId);
            //               return {
            //                 title: t(`TL_NEW_${document?.documentType}` || t("CS_NA")),
            //                 value: pdfDocumentName(documentLink, index) || t("CS_NA"),
            //               };
            //             })
            //             : [],
            //       },
        ],
    };
};