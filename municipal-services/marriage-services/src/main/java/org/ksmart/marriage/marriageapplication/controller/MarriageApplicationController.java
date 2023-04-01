package org.ksmart.marriage.marriageapplication.controller;


// import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationResponse;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.marriageapplication.service.MarriageRegistryRequestService;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.util.List;

import static org.ksmart.marriage.utils.MarriageConstants.APPLICATION_NEW;
import static org.ksmart.marriage.utils.MarriageConstants.WORKFLOW_STATUS_APPROVED;
//import org.ksmart.marriage.marriageregistry.model.BirthCertificate;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetail;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetailsRequest;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthSearchCriteria;
//import org.ksmart.marriage.marriageregistry.service.RegisterBirthService;
//import org.ksmart.marriage.utils.ResponseInfoFactory;


@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")

public class MarriageApplicationController {
    private final MarriageApplicationService MarriageService;
    private final ResponseInfoFactory responseInfoFactory;
    private final MarriageRegistryRequestService marriageRegistryRequestService;

    private final MarriageRegistryService marriageRegistryService;


    public MarriageApplicationController(MarriageApplicationService MarriageService, ResponseInfoFactory responseInfoFactory, MarriageRegistryRequestService marriageRegistryRequestService, MarriageRegistryService marriageRegistryService) {
        this.MarriageService = MarriageService;
        this.responseInfoFactory = responseInfoFactory;
        this.marriageRegistryRequestService = marriageRegistryRequestService;
        this.marriageRegistryService = marriageRegistryService;
    }


    @PostMapping(value = {"/_createmarriage"})
    public ResponseEntity<MarriageApplicationResponse> saveMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        List<MarriageApplicationDetails> marriageDetails = MarriageService.saveMarriageDetails(request);
        MarriageApplicationResponse response = MarriageApplicationResponse.builder()
                .marriageApplicationDetails(marriageDetails)
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))

                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = {"/_updatemarriage"})
    public ResponseEntity<?> updateMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        List<MarriageApplicationDetails> marriageDetails = MarriageService.updateMarriageDetails(request);
       // if ((marriageDetails.get(0).getStatus() == WORKFLOW_STATUS_APPROVED && marriageDetails.get(0).getApplicationtype() == APPLICATION_NEW)) {
            MarriageRegistryRequest marriageRegistryRequest = marriageRegistryRequestService.createRegistryRequest(request);
            List<MarriageRegistryDetails> marriageRegistryDetails = marriageRegistryService.createRegistry(marriageRegistryRequest);

      //  }

        return new ResponseEntity<>(marriageDetails, HttpStatus.OK);
    }

    @PostMapping(value = { "/_searchmarriage"})
    public ResponseEntity<MarriageApplicationResponse> searchMarriageDetails(@RequestBody MarriageDetailsRequest request,
                                                                     @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
        List<MarriageApplicationDetails> marriageDetails = MarriageService.searchMarriageDetails(criteria);
        MarriageApplicationResponse response = MarriageApplicationResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .marriageApplicationDetails(marriageDetails)
                .build();
        return ResponseEntity.ok(response);
    }



}
