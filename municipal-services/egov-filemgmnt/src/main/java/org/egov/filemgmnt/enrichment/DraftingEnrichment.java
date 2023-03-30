package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.List;
import java.util.UUID;

import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.egov.filemgmnt.web.models.drafting.ProcessInstanceRequest;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DraftingEnrichment extends BaseEnrichment {

    @Autowired
	 private FMConfiguration fmConfig;

    public void enrichcreateDraftingMain(DraftingRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDrafting()
               .forEach(drafting -> {
                drafting.setUuid(UUID.randomUUID()
                                           .toString());
                                           drafting.setAuditDetails(auditDetails);
            	   
               });

    }

    public void enrichcreateDraftProcessInstance(ProcessInstanceRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getProcessInstances()
               .forEach(processInstances -> {
                processInstances.setId(UUID.randomUUID()
                                           .toString());
                                           processInstances.setAuditDetails(auditDetails);
            	   
               });
    }
    

}
