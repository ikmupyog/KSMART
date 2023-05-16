import React from "react"
import useInbox from "../useInbox"

const useCRInbox = ({ tenantId, filters = {}, config }) => {
    console.log("reached", filters);
    const { tableType = "all", applicationStatus = "", mobileNumber = "", applicationNumber = "", sortBy = "", sortOrder = "", locality = "", uuid = "", limit = "", offset = "", businessServiceCodes = ["WFBIRTH21DAYS"] } = filters
    const USER_UUID = Digit.UserService.getUser()?.info?.uuid;
    console.log("reached22", businessServiceCodes, tableType,USER_UUID);
    const _filters = {
        tenantId,
        processSearchCriteria: {
            moduleName: "CR",
            businessService: [...businessServiceCodes],
            ...(applicationStatus?.length > 0 ? { status: applicationStatus } : {}),
            assignee: USER_UUID ,
        },
        moduleSearchCriteria: {
            ...(mobileNumber ? { mobileNumber } : {}),
            ...(applicationNumber ? { applicationNumber } : {}),
            ...(sortBy ? { sortBy } : {}),
            ...(sortOrder ? { sortOrder } : {}),
            ...(locality?.length > 0 ? { locality: locality.map((item) => item.code.split("_").pop()).join(",") } : {}),
        },
        limit,
        offset
    };

    const getTableData = (data) => {
        let tableData = [];
        if (tableType === "marriage") {
            tableData = ({
                statuses: data.statusMap,
                table: data?.items?.map(application => ({
                    applicationNumber: application.businessObject.applicationNumber,
                    date: application.businessObject.applicationDate,
                    businessService: application?.ProcessInstance?.businessService,
                    motherName: application?.ParentsDetails?.motherFirstNameEn,
                    gender: application?.businessObject?.gender,
                    // locality: `${application.businessObject?.tenantid?.toUpperCase()?.split(".")?.join("_")}_REVENUE_${application.businessObject?.tradeLicenseDetail?.address?.locality?.code?.toUpperCase()}`,
                    status: application.businessObject.applicationStatus,
                    // owner: application.ProcessInstance?.assigner?.name,
                    // sla: Math.round(application.ProcessInstance?.businesssServiceSla / (24 * 60 * 60 * 1000))
                })),
                totalCount: data.totalCount
            });
        } else {
            console.log("data--else", data);
            tableData = ({
                statuses: data.statusMap,
                table: data?.items?.map(application => ({
                    applicationNumber: application.businessObject.applicationNumber,
                    date: application.businessObject.applicationDate,
                    businessService: application?.ProcessInstance?.businessService,
                    motherName: application?.ParentsDetails?.motherFirstNameEn,
                    gender: application?.businessObject?.gender,
                    // locality: `${application.businessObject?.tenantid?.toUpperCase()?.split(".")?.join("_")}_REVENUE_${application.businessObject?.tradeLicenseDetail?.address?.locality?.code?.toUpperCase()}`,
                    status: application.businessObject.applicationStatus,
                    // owner: application.ProcessInstance?.assigner?.name,
                    // sla: Math.round(application.ProcessInstance?.businesssServiceSla / (24 * 60 * 60 * 1000))
                })),
                totalCount: data.totalCount
            });
        }
        return tableData;
    }

    console.log("filetrrr", _filters);
    return useInbox({
        tenantId, filters: _filters, config: {
            select: (data) => getTableData(data),
            ...config
        }
    })
}

export default useCRInbox