package org.egov.filemgmnt.web.controllers;

import java.util.List;

import javax.validation.Valid;

import org.egov.filemgmnt.service.ApplicantPersonalService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.ApplicantPersonalResponse;
import org.egov.filemgmnt.web.models.ApplicantPersonalSearchCriteria;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
public class FileManagementController implements FileManagementResource {

    private final ResponseInfoFactory responseInfoFactory;
    private final ApplicantPersonalService personalService;

    @Autowired
    FileManagementController(ApplicantPersonalService personalService, ResponseInfoFactory responseInfoFactory) {
        this.personalService = personalService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @Override
    @PostMapping("/applicantpersonals/_create")
    public ResponseEntity<ApplicantPersonalResponse> create(@RequestBody ApplicantPersonalRequest request) {

        List<ApplicantPersonal> personals = personalService.create(request);

        ApplicantPersonalResponse response = ApplicantPersonalResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .applicantPersonals(personals)
                                                                      .build();
        return ResponseEntity.ok(response);
    }

    @Override
    @PutMapping("/applicantpersonals/_update")
    public ResponseEntity<ApplicantPersonalResponse> update(@RequestBody ApplicantPersonalRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("ApplicantPersonalRequest:  {}", FMUtils.toJson(request));
        }
        List<ApplicantPersonal> personals = personalService.update(request);

        ApplicantPersonalResponse response = ApplicantPersonalResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .applicantPersonals(personals)
                                                                      .build();
        return ResponseEntity.ok(response);
    }

    @Override
    @PostMapping("/applicantpersonals/_search")
    public ResponseEntity<ApplicantPersonalResponse> search(@RequestBody RequestInfoWrapper request,
                                                            @ModelAttribute ApplicantPersonalSearchCriteria criteria) {

        List<ApplicantPersonal> personals = personalService.search(criteria, request.getRequestInfo());

        ApplicantPersonalResponse response = ApplicantPersonalResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .applicantPersonals(personals)
                                                                      .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = { "/applicantpersonals/_download" })
    public ResponseEntity<CertificateResponse> download(@RequestBody RequestInfoWrapper request,
                                                        @Valid @ModelAttribute ApplicantPersonalSearchCriteria criteria) {

        List<CertificateDetails> details = personalService.download(criteria, request.getRequestInfo());
        CertificateResponse response = CertificateResponse.builder()
                                                          .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                              Boolean.TRUE))
                                                          .certificateDet(details)
                                                          .build();
        return ResponseEntity.ok(response);
    }
}
