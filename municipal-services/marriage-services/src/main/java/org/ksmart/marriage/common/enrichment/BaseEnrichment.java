package org.ksmart.marriage.common.enrichment;

// import org.ksmart.birth.common.model.AuditDetails;
// import org.ksmart.birth.utils.CommonUtils;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.utils.CommonUtils;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public interface BaseEnrichment {
    default AuditDetails buildAuditDetails(String by, Boolean create) {
        AuditDetails auditDetails;
        Long currentTime = CommonUtils.currentDateTime();
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
