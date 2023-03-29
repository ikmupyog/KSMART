package org.egov.filemgmnt.web.controllers;

import lombok.extern.slf4j.Slf4j;
import org.egov.filemgmnt.service.EnquiryService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.Enquiry.Enquiry;
import org.egov.filemgmnt.web.models.Enquiry.EnquiryRequest;
import org.egov.filemgmnt.web.models.Enquiry.EnquiryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1")
public class EnquiryController {
    @Autowired
    private final ResponseInfoFactory responseInfoFactory;
    @Autowired
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
}
