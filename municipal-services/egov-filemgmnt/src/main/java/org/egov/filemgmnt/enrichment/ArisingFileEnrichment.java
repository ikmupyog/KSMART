package org.egov.filemgmnt.enrichment;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;

import org.egov.filemgmnt.web.models.ArisingFileRequest;
import org.egov.filemgmnt.web.models.AuditDetails;

import org.springframework.stereotype.Component;

@Component
public class ArisingFileEnrichment extends BaseEnrichment {
	
	
   /* private final IdgenUtil idgenUtil;
    
    // @Autowired
    ArisingFileEnrichment(IdgenUtil idgenUtil) {
        this.idgenUtil = idgenUtil;
    } */

	public void enrichAriseFileCreate(ArisingFileRequest request)  {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getArisingFileDetail()
               .forEach(arisingfile -> {
            	   arisingfile.setId(UUID.randomUUID()
                                           .toString());
            	   arisingfile.setAuditDetails(auditDetails);
               });
        
    }

	
    
}
   