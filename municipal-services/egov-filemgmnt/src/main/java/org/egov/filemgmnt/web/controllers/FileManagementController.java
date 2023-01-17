package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.FileManagementService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantSearchResponse;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceResponse;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchResponse;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
public class FileManagementController implements FileManagementBaseController {

    private final FileManagementService fmService;
    private final ResponseInfoFactory responseInfoFactory;

    FileManagementController(final FileManagementService fmService, final ResponseInfoFactory responseInfoFactory) {
        this.fmService = fmService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @Override
    @PostMapping("/applicantservices/_create")
    public ResponseEntity<ApplicantServiceResponse> create(@RequestBody final ApplicantServiceRequest request) {
        final ApplicantServiceDetail serviceDetail = fmService.create(request);

        return ResponseEntity.ok(ApplicantServiceResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .applicantServiceDetail(serviceDetail)
                                                         .build());
    }

    @Override
    @PutMapping("/applicantservices/_update")
    public ResponseEntity<ApplicantServiceResponse> update(@RequestBody final ApplicantServiceRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("FileServiceRequest:  %n{}", FMUtils.toJson(request));
        }

        final ApplicantServiceDetail serviceDetail = fmService.update(request);

        return ResponseEntity.ok(ApplicantServiceResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .applicantServiceDetail(serviceDetail)
                                                         .build());
    }

    @Override
    @PostMapping("/applicantservices/_search")
    public ResponseEntity<ApplicantServiceSearchResponse> searchServices(@RequestBody final RequestInfoWrapper request,
                                                                         @ModelAttribute final ApplicantServiceSearchCriteria searchCriteria) {

        final List<ApplicantServiceDetail> result = fmService.searchServices(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ApplicantServiceSearchResponse.builder()
                                                               .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                   Boolean.TRUE))
                                                               .applicantServiceDetails(result)
                                                               .build());
    }

    @Override
    @PostMapping("/applicantpersonals/_search")
    public ResponseEntity<ApplicantSearchResponse> searchApplicants(@RequestBody final RequestInfoWrapper request,
                                                                    @ModelAttribute final ApplicantSearchCriteria searchCriteria) {
        final List<ApplicantPersonal> result = fmService.searchApplicants(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ApplicantSearchResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .applicantPersonals(result)
                                                        .build());
    }

    @PostMapping("/applicantpersonals/_download") // value = { "/applicantpersonals/_download" }
    public ResponseEntity<CertificateResponse> download(@RequestBody final RequestInfoWrapper request,
                                                        @ModelAttribute final ApplicantSearchCriteria criteria) {

        final List<CertificateDetails> details = fmService.download(criteria, request.getRequestInfo());
        final CertificateResponse response = CertificateResponse.builder()
                                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                    Boolean.TRUE))
                                                                .certificateDet(details)
                                                                .build();
        return ResponseEntity.ok(response);
    }

}
