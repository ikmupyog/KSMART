package org.ksmart.death.deathapplication.enrichment;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.util.DeathApplicationUtil;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathregistry.repository.DeathRegistryRepository;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

@Slf4j
@Component
public class DeathCorrectionEnrichment implements BaseEnrichment{
    @Autowired
    DeathConfiguration config;

    @Autowired
    IdGenRepository idGenRepository;

    @Autowired
    DeathApplicationUtil deathApplnUtil;

    @Autowired
    DeathRegistryRepository registerRepo;
    @Autowired
    DetailCorrectionEnrichment detailCorrectionEnrichment;

    public void enrichCreateCorrection(CorrectionRequest request) {
        String registrationNo = null;
        Date date = new Date();
        long doreport = date.getTime();
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        for (CorrectionDetails correctionApplication : request.getCorrectionDetails()) {
            correctionApplication.setDeathCorrAuditDetails(auditDetails);
            registrationNo = correctionApplication.getRegistrationNo();
            setApplicationNumbers(request,correctionApplication.getDeathCorrectionBasicInfo());
        }
        DeathRegistryCriteria criteria =  new DeathRegistryCriteria();
        criteria.setRegistrationNo(registrationNo);
        List<DeathRegistryDtl> registerBirthDetails = registerRepo.getDeathApplication(criteria,request.getRequestInfo());

        request.getCorrectionDetails()
                .forEach(death -> {
                    if(registerBirthDetails.size() > 0) {
                        DeathCorrectionBasicInfo deathCorrectionBasicInfo = new DeathCorrectionBasicInfo();
                        setApplicationNumbers(request,deathCorrectionBasicInfo);
                        deathCorrectionBasicInfo.setId(UUID.randomUUID().toString());
                        deathCorrectionBasicInfo.setDateOfDeath(registerBirthDetails.get(0).getDeathBasicInfo().getDateOfDeath());
                        deathCorrectionBasicInfo.setTenantId(registerBirthDetails.get(0).getDeathBasicInfo().getTenantId());
                        deathCorrectionBasicInfo.setApplicationDate(doreport);
                        death.setDeathCorrectionBasicInfo(deathCorrectionBasicInfo);
                    }
                });
        if(registerBirthDetails.size() >0) {
            detailCorrectionEnrichment.correctionField(request, registerBirthDetails, auditDetails);
        }
    }

    private void setApplicationNumbers(CorrectionRequest request, DeathCorrectionBasicInfo deathCorrectionBasicInfo) {
        RequestInfo requestInfo = request.getRequestInfo();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        List<CorrectionDetails> deathDtls = request.getCorrectionDetails();
        String tenantId = deathDtls.get(0).getDeathCorrectionBasicInfo().getTenantId();
        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                tenantId,
                config.getDeathACKNumberIdName(),
                request.getCorrectionDetails().get(0).getDeathCorrectionBasicInfo().getFuncionUID(),
                "AKNO",request.getCorrectionDetails().size());

        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getCorrectionDetails()
                .forEach(deathdtls -> {
                    deathCorrectionBasicInfo.setDeathACKNo(itr.next());
                    deathCorrectionBasicInfo.setAckNoID(deathApplnUtil.setSeqId(ackNoDetails));
                    deathCorrectionBasicInfo.setApplicationDate(currentTime);

                });
    }
}
