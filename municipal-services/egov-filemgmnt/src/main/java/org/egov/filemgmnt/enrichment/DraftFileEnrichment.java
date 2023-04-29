package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.springframework.stereotype.Component;

@Component
public class DraftFileEnrichment extends BaseEnrichment {

    public void enrichCreate(final DraftFileRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final DraftFile file = request.getDraftFile();

        file.setId(UUID.randomUUID()
                       .toString());
        file.setAuditDetails(auditDetails);
    }

    public void enrichUpdate(final DraftFileRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final DraftFile file = request.getDraftFile();

        file.setAuditDetails(auditDetails);
    }
}
