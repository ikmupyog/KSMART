package org.bel.birthdeath.birthregistry.enrichment;

import org.bel.birthdeath.birthregistry.model.RegisterBirthDetailsRequest;
import org.bel.birthdeath.common.model.AuditDetails;
import org.bel.birthdeath.crbirth.enrichment.BaseEnrichment;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public class RegisterBirthDetailsEnrichment implements BaseEnrichment {

    public void enrichCreate(RegisterBirthDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getRegisterBirthDetails().forEach(register -> {

            register.setId(UUID.randomUUID().toString());

            register.setAuditDetails(auditDetails);

            register.getRegisterBirthPlace().setId(UUID.randomUUID().toString());

            register.getRegisterBirthFather().setId(UUID.randomUUID().toString());

            register.getRegisterBirthMother().setId(UUID.randomUUID().toString());

            register.getRegisterBirthPermanent().setId(UUID.randomUUID().toString());

            register.getRegisterBirthPresent().setId(UUID.randomUUID().toString());

            register.getRegisterBirthStatitical().setId(UUID.randomUUID().toString());
        });
    }

    public void enrichUpdate(RegisterBirthDetailsRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        request.getRegisterBirthDetails()
                .forEach(personal -> personal.setAuditDetails(auditDetails));
    }
}
