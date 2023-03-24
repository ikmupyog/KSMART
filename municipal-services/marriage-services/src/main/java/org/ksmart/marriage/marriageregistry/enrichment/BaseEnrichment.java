package org.ksmart.marriage.marriageregistry.enrichment;

import org.ksmart.marriage.common.model.AuditDetails;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
public interface BaseEnrichment {
    default AuditDetails buildAuditDetails(String by, Boolean create) {
        AuditDetails auditDetails;

        Long currentTime = Long.valueOf(System.currentTimeMillis());
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
