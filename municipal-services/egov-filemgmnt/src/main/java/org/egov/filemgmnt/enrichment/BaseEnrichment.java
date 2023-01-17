package org.egov.filemgmnt.enrichment;

import org.egov.filemgmnt.web.models.AuditDetails;

interface BaseEnrichment {

    default AuditDetails buildAuditDetails(final String by, final Boolean create) {
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
}
