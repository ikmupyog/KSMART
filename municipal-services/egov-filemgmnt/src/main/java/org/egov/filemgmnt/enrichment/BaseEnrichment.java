package org.egov.filemgmnt.enrichment;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.util.IdgenUtil;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.beans.factory.annotation.Autowired;

abstract class BaseEnrichment { // NOPMD

    @Autowired
    private IdgenUtil idgenUtil;

    @Autowired
    public final void setIdgenUtil(final IdgenUtil idgenUtil) {
        this.idgenUtil = idgenUtil;
    }

    protected AuditDetails buildAuditDetails(final String by, final Boolean create) {
        AuditDetails auditDetails;

        final Long currentTime = Long.valueOf(System.currentTimeMillis());
        if (create) {
            auditDetails = AuditDetails.builder()
                                       .createdBy(by)
                                       .createdTime(currentTime)
                                       .lastModifiedBy(by)
                                       .lastModifiedTime(currentTime)
                                       .build();
        } else {
            auditDetails = AuditDetails.builder()
                                       .lastModifiedBy(by)
                                       .lastModifiedTime(currentTime)
                                       .build();
        }
        return auditDetails;
    }

    protected List<String> generateIds(final RequestInfo requestInfo, final String tenantId, final String idKey,
                                       final String idformat, final int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idKey, idformat, count);
    }
}
