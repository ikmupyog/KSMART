package org.egov.filemgmnt.enrichment;

import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DraftFilesEnrichment extends BaseEnrichment {

    @Autowired
    private FMConfiguration fmConfig;

    public void enrichCreateDrafting(DraftFileRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final DraftFile draftFile = request.getDraftFile();

        draftFile.setId(UUID.randomUUID()
                                      .toString());
        draftFile.setAuditDetails(auditDetails);
    }

    public void enrichUpdate(DraftFileRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final DraftFile draftFile = request.getDraftFile();

        draftFile.setAuditDetails(auditDetails);
        draftFile.getDraftText();
    }

}
