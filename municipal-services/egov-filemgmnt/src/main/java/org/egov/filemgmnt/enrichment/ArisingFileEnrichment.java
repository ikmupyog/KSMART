package org.egov.filemgmnt.enrichment;

import java.util.List;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileApplicant;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ArisingFileEnrichment extends BaseEnrichment {

    public void enrichCreateRequest(final ArisingFileRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final ArisingFile arisingFile = request.getArisingFile();

        // Enrich arising file
        arisingFile.setId(UUID.randomUUID()
                              .toString());
        arisingFile.setAuditDetails(auditDetails);

        setFileCodes(request);

        final Long currentTime = Long.valueOf(System.currentTimeMillis());
        arisingFile.setFileArisingDate(currentTime);

        // Enrich applicant address
        final ArisingFileApplicant applicant = arisingFile.getArisingFileApplicant();
        applicant.setId(UUID.randomUUID()
                            .toString());
        applicant.setArisingFileId(arisingFile.getId());
        applicant.setAuditDetails(auditDetails);
    }

//    public void enrichUpdateRequest(final ArisingFileRequest request) {
//        final RequestInfo requestInfo = request.getRequestInfo();
//        final User userInfo = requestInfo.getUserInfo();
//
//        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
//
//        final ArisingFile arisingFile = request.getArisingFile();
//        arisingFile.setAuditDetails(auditDetails);
//    }

    private void setFileCodes(final ArisingFileRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final ArisingFile file = request.getArisingFile();
        final String tenantId = file.getTenantId();

        final List<String> filecodes = generateIds(requestInfo,
                                                   tenantId,
                                                   "fm.filecode",
                                                   FMConstants.FM_MODULE_CODE,
                                                   "APP",
                                                   1);

        validateFileCodes(filecodes, 1);

        final String fileCode = filecodes.get(0);
        file.setFileCode(fileCode);

        if (log.isDebugEnabled()) {
            log.debug("Arising file code = {}", fileCode);
        }
    }
}
