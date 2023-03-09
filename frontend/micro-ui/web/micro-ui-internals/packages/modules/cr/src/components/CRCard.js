import { DropIcon, EmployeeModuleCard } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";

const CRCard = () => {
    sessionStorage.setItem("breadCrumbUrl", "home");
    if (!Digit.Utils.crAccess()) {
        return null;
    }
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const inboxSearchParams = { limit: 10, offset: 0 }
    const { isLoading, data: inboxData } = Digit.Hooks.cr.useInbox({
        tenantId,
        filters: { ...inboxSearchParams },
        config: {}
    });

    const [isStateLocalisation, setIsStateLocalisation] = useState(true);

    useEffect(() => {
        if (tenantId && isStateLocalisation) {
            setIsStateLocalisation(false);
            Digit.LocalizationService.getLocale({ modules: [`rainmaker-${tenantId}`], locale: Digit.StoreData.getCurrentLanguage(), tenantId: `${tenantId}` });
        }
    }, [tenantId]);


    let links = [
        {
            count: isLoading ? "-" : inboxData?.totalCount,
            label: t("ES_COMMON_INBOX"),
            link: `/digit-ui/employee/cr/inbox-flow`,
            // link: `/digit-ui/employee/cr/inbox`,
        },
        {
            label: t("CR_BIRTH_REGISTRATION"),
            link: `/digit-ui/employee/cr/cr-flow`,
            role: "BND_CEMP" || "BND_SUB_REGISTRAR" || "BND_LOCAL_REGISTRAR" || "BND_DISTRICT_REGISTRAR" || "JHI" || "HOSPITAL_OPERATOR" || "HOSPITAL_APPROVER" || "INSTITUTION_OPERATOR" || "INSTITUTION_APPROVER"
        },
        {
            label: t("CR_DEATH_REGISTRATION"),
            link: `/digit-ui/employee/cr/death-flow`,
            role: "BND_CEMP" || "BND_SUB_REGISTRAR" || "BND_LOCAL_REGISTRAR" || "BND_DISTRICT_REGISTRAR" || "JHI" || "HOSPITAL_OPERATOR" || "HOSPITAL_APPROVER" || "INSTITUTION_OPERATOR" || "INSTITUTION_APPROVER"
        },
        {
            label: t("CR_SEARCH_APPLICATIONS"),
            link: `/digit-ui/employee/cr/search-flow`
            // link: `/digit-ui/employee/cr/search/application`
        },
    ]

    links = links.filter(link => link.role ? checkForEmployee(link.role) : true);

    const propsForModuleCard = {
        Icon: <DropIcon />,
        moduleName: t("Civil Registration"),
        // TL_COMMON_TL
        kpis: [
            {
                count: isLoading ? "-" : inboxData?.totalCount,
                label: t("TOTAL_TL"),
                link: `/digit-ui/employee/cr/inbox`
            },
            {
                label: t("TOTAL_NEARING_SLA"),
                link: `/digit-ui/employee/cr/inbox`
            }
        ],
        links: links
    }
    return <EmployeeModuleCard {...propsForModuleCard} />
};

export default CRCard;

