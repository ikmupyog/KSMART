package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.EnquiryService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.enquiry.Enquiry;
import org.egov.filemgmnt.web.models.enquiry.EnquiryRequest;
import org.egov.filemgmnt.web.models.enquiry.EnquiryResponse;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
public class EnquiryController {
    @Autowired
    private final ResponseInfoFactory responseInfoFactory;
    private final EnquiryService enquiryService;

    public EnquiryController(final ResponseInfoFactory responseInfoFactory, final EnquiryService enquiryService) {
        this.responseInfoFactory = responseInfoFactory;
        this.enquiryService = enquiryService;

    }

    @PostMapping("/applicantservices/_saveEnquiry")
    public ResponseEntity<EnquiryResponse> saveEnquiry(@RequestBody final EnquiryRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Enquiry main-create:  \n{}", FMUtils.toJson(request));
        }
        final List<Enquiry> enquiryDetails = enquiryService.saveEnquiry(request);
        final EnquiryResponse response = EnquiryResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .enquiryList(enquiryDetails)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/applicantservices/_searchEnquiry")
    public ResponseEntity<EnquirySearchResponse> searchEnquiry(@RequestBody final RequestInfoWrapper request,
                                                               @ModelAttribute final EnquirySearchCriteria enquirySearchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("Enquiry-search:  \n{}", FMUtils.toJson(enquirySearchCriteria));
        }
        final List<Enquiry> result = enquiryService.searchEnquiry(request.getRequestInfo(), enquirySearchCriteria);
        return ResponseEntity.ok(EnquirySearchResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .enquiries(result)
                                                      .build());

    }
}
