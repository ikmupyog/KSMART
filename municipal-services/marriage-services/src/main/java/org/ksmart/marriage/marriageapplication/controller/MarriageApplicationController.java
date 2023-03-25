package org.ksmart.marriage.marriageapplication.controller;


// import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationResponse;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.util.List;
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
    private final MarriageApplicationService crMarriageService;
    private final ResponseInfoFactory responseInfoFactory;


    public MarriageApplicationController( MarriageApplicationService crMarriageService, ResponseInfoFactory responseInfoFactory) {
        this.crMarriageService = crMarriageService;
        this.responseInfoFactory = responseInfoFactory;
    }


    @PostMapping(value = {"/_createmarriage"})
    public ResponseEntity<MarriageApplicationResponse> saveMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        List<MarriageApplicationDetails> marriageDetails=crMarriageService.saveMarriageDetails(request);
        MarriageApplicationResponse response= MarriageApplicationResponse.builder()
                                                                  .marriageApplicationDetails(marriageDetails)
                                                                  .responseInfo(
                                                                 responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),true))

                                                                 .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping(value = { "/_updatemarriage"})
    public ResponseEntity<?> updateMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        List<MarriageApplicationDetails> marriageDetails = crMarriageService.updateMarriageDetails(request);
        return new ResponseEntity<>(marriageDetails, HttpStatus.OK);
    }

    @PostMapping(value = { "/_searchmarriage"})
    public ResponseEntity<MarriageApplicationResponse> searchMarriageDetails(@RequestBody MarriageDetailsRequest request,
                                                                     @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
        List<MarriageApplicationDetails> marriageDetails = crMarriageService.searchMarriageDetails(criteria);
        MarriageApplicationResponse response = MarriageApplicationResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .marriageApplicationDetails(marriageDetails)
                .build();
        return ResponseEntity.ok(response);
    }



}
