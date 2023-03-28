package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.List;
import java.util.UUID;

import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
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

    public void enrichCreateDraftingMain(DraftingRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDrafting()
               .forEach(drafting -> {
                drafting.setUuid(UUID.randomUUID()
                                           .toString());
                                           drafting.setAuditDetails(auditDetails);
            	  // arisingfile.setFileCode(null);
            	   
               });

    }


    public void enrichUpdate(DraftingRequest request) {

       final  RequestInfo requestInfo = request.getRequestInfo();
       final  User userInfo = requestInfo.getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
      //  final List <Drafting> draftfiles = request.getDrafting();

    //    draftfiles.setfileCode(requestInfo.getfileCode());
      //  draftfiles.setAuditDetails(serviceAuditDetails);
     //   DraftingRequest.AuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
    //    serviceAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());

        request.getDrafting()
                .forEach(draftingfile -> {
                    draftingfile.setAuditDetails(auditDetails);
                    draftingfile.getDraftText();



                });
    }


}
