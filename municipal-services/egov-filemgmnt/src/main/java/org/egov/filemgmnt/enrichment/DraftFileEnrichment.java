package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileAddress;
import org.egov.filemgmnt.web.models.draftfile.DraftFileReference;
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

        //Enrich Draft Reference
        final DraftFileReference draftFileReference= file.getDraftFileReference();
        draftFileReference.setId(UUID.randomUUID()
                .toString());
        draftFileReference.setDraftId(file.getId());
        draftFileReference.setFileCode(file.getFileCode());

        //Enrich Draft Address
        final DraftFileAddress draftFileAddress=file.getDraftFileAddress();
        draftFileAddress.setId(UUID.randomUUID()
                .toString());
        draftFileAddress.setDraftId(file.getId());
        draftFileAddress.setFileCode(file.getFileCode());
    }

    public void enrichUpdate(final DraftFileRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final DraftFile file = request.getDraftFile();

        file.setAuditDetails(auditDetails);
    }
}
