package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.List;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileApplicant;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArisingFileEnrichment extends BaseEnrichment {
    @Autowired
    private FMConfiguration fmConfig;

    public void enrichAriseFileCreate(ArisingFileRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        final ArisingFile arisingFile = request.getArisingFileDetail();
        final AuditDetails arisingAuditDetails = arisingFile.getAuditDetails();
        arisingFile.setId(UUID.randomUUID()
                .toString());
        arisingFile.setAuditDetails(arisingAuditDetails);
        arisingFile.getAuditDetails()
                .setLastModifiedBy(auditDetails.getLastModifiedBy());
        arisingAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
        setFileCodes(request);
        //enrich applicant address
        final ArisingFileApplicant applicantDetails = arisingFile.getArisingFileApplicant();
        final AuditDetails applicantAuditDetails = arisingFile.getArisingFileApplicant().getAuditDetails();
        applicantDetails.setArisingFileId(arisingFile.getId());
        applicantDetails.setAuditDetails(applicantAuditDetails);
        applicantAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
        applicantAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
    }
//public void enrichArisingFileUpdate(ArisingFileRequest request) {
//    RequestInfo requestInfo = request.getRequestInfo();
//    User userInfo = requestInfo.getUserInfo();
//
//    AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
//    final List<ArisingFile> arisingFiles= Collections.singletonList(request.getArisingFileDetail());
//    for (ArisingFile currentArisingFile : arisingFiles ) {
//        currentArisingFile.setAuditDetails(auditDetails);
//    }
//
//    }

      private void setFileCodes(final ArisingFileRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final ArisingFile files = request.getArisingFileDetail();
        final String tenantId = files.getTenantId();
//        for (ArisingFile arising : files) {
//            tenantId = arising.getTenantId();
//        }

        final List<String> filescodes = generateIds(requestInfo, tenantId, "fm.filecode",
//                                                    request.getArisingFileDetail()
//                                                           .getFileCode(),
                                                    "FM",
                                                    "APP",
                                                    // FMConstants.FMMODULENAMEVALUE,
                                                    1);
        validateFileCodes(filescodes, 1);

//        String fileCode = null;
//        for (ArisingFile arisefilecode : files) {
//            arisefilecode.setFileCode(filescodes.get(0));
//        }
        final ArisingFile fileDetail = request.getArisingFileDetail();
        System.out.println("Filecode=: " + filescodes.get(0));

    }

    private void validateFileCodes(final List<String> fileCodes, final int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

        if (fileCodes.size() != count) {
            throw new CustomException(IDGEN_ERROR.getCode(),
                    "The number of file code(s) returned by idgen service is not equal to the request count");
        }
    }
}
