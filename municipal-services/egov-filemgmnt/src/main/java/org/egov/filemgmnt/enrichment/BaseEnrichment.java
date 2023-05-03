package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.util.IdgenUtil;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;

class BaseEnrichment {

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

    protected List<String> generateIds(final RequestInfo requestInfo, final String tenantId, final String idName,
                                       final String moduleCode, final String fnType, final int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    protected void validateFileCodes(final List<String> fileCodes, final int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

        if (fileCodes.size() != count) {
            throw new CustomException(IDGEN_ERROR.getCode(),
                    "The number of file code(s) returned by idgen service is not equal to the request count");
        }
    }
}
