package org.ksmart.marriage.marriageregistry.enrichment;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertRequest;
import org.ksmart.marriage.utils.IDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class MarriageCertificateEnrichment implements BaseEnrichment {
    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;
    @Autowired
    IDGenerator idGenerator;

    public void enrichCreate(MarriageCertRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getMarriageCertificate().setId(UUID.randomUUID().toString());
        request.getMarriageCertificate().setAuditDetails(auditDetails);
        //createCertificateNo(request);

    }

    public void enrichUpdate(MarriageCertRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getMarriageCertificate().setAuditDetails(auditDetails);
        //createCertificateNo(request);

    }

//    public void createCertificateNo(MarriageCertRequest marriageCertRequest){
//        RequestInfo requestInfo = marriageCertRequest.getRequestInfo();
//        Long currentTime = Long.valueOf(System.currentTimeMillis());
//        String tenantId = marriageCertRequest.getMarriageCertificate().getMarriageRegistryDetails().getTenantid();
//
//        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
//                tenantId,
//                config.getGetMarriageCertificateName(),
//                marriageCertRequest.getMarriageCertificate().getModulecode(),
//                "CERT",1);
//        ListIterator<String> itr = ackNoDetails.listIterator();
//        marriageCertRequest.getMarriageCertificate().setMarriagecertificateno(itr.next());
//        marriageCertRequest.getMarriageCertificate().setDateofissue(currentTime);
//    }

    // private void setCertificateNumber(MarriageCertRequest marriageCertRequest) {

    //     RequestInfo requestInfo = marriageCertRequest.getRequestInfo();
    //     MarriageCertificate marriageDetails = marriageCertRequest.getMarriageCertificate();
    //     String tenantId = marriageDetails.getTenantid();

    //     List<String> filecodes = getIdList(requestInfo,
    //                             tenantId,
    //                             config.getGetMarriageRegNumberName(),
    //                             marriageCertRequest.getMarriageCertificate().getModulecode(),
    //                             "CERT",
    //                             1);
    //    // validateFileCodes(filecodes, marriageDetails.size());
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     ListIterator<String> itr = filecodes.listIterator();
    //     marriageDetails.setMarriagecertificateno(itr.next());
    //     marriageDetails.setDateofissue(currentTime);
                
    // }

}
