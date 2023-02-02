package org.ksmart.marriage.marriageapplication.enrichment;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public class MarriageDetailsEnrichment implements BaseEnrichment {
    @Autowired
     MarriageApplicationConfiguration config;
    public void enrichCreate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getMarriageDetails().forEach(marriage -> {

            marriage.setId(UUID.randomUUID().toString());

            marriage.setAuditDetails(auditDetails);

          
        });


    }
    public void enrichUpdate(MarriageDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        request.getMarriageDetails()
                .forEach(birth -> birth.setAuditDetails(auditDetails));
    }

}
