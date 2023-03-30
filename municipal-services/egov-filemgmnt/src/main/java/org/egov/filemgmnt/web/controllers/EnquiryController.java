package org.egov.filemgmnt.web.controllers;

import lombok.extern.slf4j.Slf4j;
import org.egov.filemgmnt.service.EnquiryService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.Enquiry.*;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.egov.filemgmnt.web.models.Enquiry.EnquirySearchCriteria;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1")
public class EnquiryController {
    @Autowired
    private final ResponseInfoFactory responseInfoFactory;
    private final EnquiryService enquiryService;



    public EnquiryController(ResponseInfoFactory responseInfoFactory, EnquiryService enquiryService) {
        this.responseInfoFactory = responseInfoFactory;
        this.enquiryService = enquiryService;

    }

    @PostMapping("/applicantservices/_saveEnquiry")
    public ResponseEntity<EnquiryResponse> saveEnquiry(@RequestBody final EnquiryRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Enquiry main-create:  \n{}", FMUtils.toJson(request));
        }
        List<Enquiry> enquiryDetails = enquiryService.saveEnquiry(request);
        EnquiryResponse response = EnquiryResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .enquiryList(enquiryDetails)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/applicantservices/_searchEnquiry")
    public ResponseEntity<EnquirySearchResponse> SearchEnquiry(@RequestBody final RequestInfoWrapper request,
                                                                        @ModelAttribute EnquirySearchCriteria enquirySearchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("Enquiry-search:  \n{}", FMUtils.toJson(enquirySearchCriteria));
        }
        final List<Enquiry> result = enquiryService.SearchEnquiry(request.getRequestInfo(), enquirySearchCriteria);
        return ResponseEntity.ok(EnquirySearchResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .enquiries(result)
                .build());

    }
}

