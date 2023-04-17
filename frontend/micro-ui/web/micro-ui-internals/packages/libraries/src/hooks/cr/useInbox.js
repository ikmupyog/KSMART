import React from "react"
import useInbox from "../useInbox"

const useCRInbox = ({ tenantId, filters, config }) => {

    const {applicationStatus, mobileNumber, applicationNumber, sortBy, sortOrder, locality, uuid, limit, offset } = filters
    const USER_UUID = Digit.UserService.getUser()?.info?.uuid;
    
    const _filters = {
        tenantId,
		processSearchCriteria: {
            moduleName: "CR",
			businessService: ["WFBIRTH21DAYS"],
            ...(applicationStatus?.length > 0 ? {status: applicationStatus} : {}),
            ...(uuid && Object.keys(uuid).length > 0 ? {assignee: uuid.code === "ASSIGNED_TO_ME" ? USER_UUID : ""} : {}),
        },
		moduleSearchCriteria: {
            ...(mobileNumber ? {mobileNumber}: {}),
            ...(applicationNumber ? {applicationNumber} : {}),
            ...(sortBy ? {sortBy} : {}),
            ...(sortOrder ? {sortOrder} : {}),
            ...(locality?.length > 0 ? {locality: locality.map((item) => item.code.split("_").pop()).join(",")} : {}),
        },
        limit,
        offset
    }

    return useInbox({tenantId, filters: _filters, config:{
        select: (data) =>({
            statuses: data.statusMap,
            table: data?.items.map( application => ({
                applicationId: application.ChildDetails.applicationNumber,
                date: application.ChildDetails.applicationDate,
                businessService: application?.ProcessInstance?.businessService,
                locality: `${application.ChildDetails?.tenantId?.toUpperCase()?.split(".")?.join("_")}_REVENUE_${application.businessObject?.ChildDetails?.address?.locality?.code?.toUpperCase()}`,
                status: application.ChildDetails.status,
                owner: application.ProcessInstance?.assigner?.name,
                sla: Math.round(application.ProcessInstance?.businesssServiceSla / (24 * 60 * 60 * 1000))
            })),
            totalCount: data.totalCount
        }),
        ...config
    }})
}

export default useCRInbox