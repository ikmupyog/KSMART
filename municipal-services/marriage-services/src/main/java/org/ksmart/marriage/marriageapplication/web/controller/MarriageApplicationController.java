package org.ksmart.marriage.marriageapplication.web.controller;


// import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationResponse;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.marriageapplication.service.MarriageRegistryRequestService;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;

import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")

public class MarriageApplicationController implements MarriageApplicationBaseController {
    private final MarriageApplicationService MarriageService;
    private final ResponseInfoFactory responseInfoFactory;
    private final MarriageRegistryRequestService marriageRegistryRequestService;
    private final MarriageRegistryService marriageRegistryService;
    private final MarriageApplicationRepository repository;


    public MarriageApplicationController(MarriageApplicationService MarriageService, 
                                        ResponseInfoFactory responseInfoFactory, 
                                        MarriageRegistryRequestService marriageRegistryRequestService, 
                                        MarriageRegistryService marriageRegistryService,
                                        MarriageApplicationRepository repository) {
        this.MarriageService = MarriageService;
        this.responseInfoFactory = responseInfoFactory;
        this.marriageRegistryRequestService = marriageRegistryRequestService;
        this.marriageRegistryService = marriageRegistryService;
        this.repository = repository;
    }
    @Override
    @PostMapping(value = {"/_createmarriage"})
    
    public ResponseEntity<MarriageApplicationResponse> saveMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        
        List<MarriageApplicationDetails> marriageDetails = MarriageService.saveMarriageDetails(request);
        
        MarriageApplicationResponse response = MarriageApplicationResponse
                                                .builder()
                                                .marriageApplicationDetails(marriageDetails)
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
                                                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping(value = {"/_updatemarriage"})

    public ResponseEntity<?> updateMarriageDetails(@RequestBody MarriageDetailsRequest request) {
        
        List<MarriageApplicationDetails> marriageDetails = MarriageService.updateMarriageDetails(request);

        String status=marriageDetails.get(0).getStatus();

        String applicationType=marriageDetails.get(0).getApplicationtype();

        if ((status.equals( MarriageConstants.WORKFLOW_STATUS_APPROVED) &&  applicationType.equals(MarriageConstants.APPLICATION_NEW))) {
            
            MarriageRegistryRequest marriageRegistryRequest = marriageRegistryRequestService.createRegistryRequest(request);
            
            List<MarriageRegistryDetails> marriageRegistryDetails = marriageRegistryService.createRegistry(marriageRegistryRequest);

        }
        MarriageApplicationResponse response = MarriageApplicationResponse
                                                .builder()
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                .marriageApplicationDetails(marriageDetails)
                                                .build();
        return ResponseEntity.ok(response); 
       // return new ResponseEntity<>(marriageDetails, HttpStatus.OK);
    }

    @PostMapping(value = { "/_searchmarriage"})
    public ResponseEntity<MarriageApplicationResponse> searchMarriageDetails(@RequestBody MarriageDetailsRequest request,
                                                                     @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
      //  System.out.println("SearchCriteria"+criteria);
        int count=repository.getMarriageCount(criteria);
        
        List<MarriageApplicationDetails> marriageDetails = MarriageService.searchMarriageDetails(criteria, request.getRequestInfo());
    //     try {
    //         ObjectMapper mapper = new ObjectMapper();
    //         Object obj = criteria;
    //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    //        System.out.println("MarriageRequest "+ mapper.writeValueAsString(obj));
    //     }catch(Exception e) {
    //     log.error("Exception while fetching from searcher: ",e);
    // }
        MarriageApplicationResponse response = MarriageApplicationResponse
                                                .builder()
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                .marriageApplicationDetails(marriageDetails)
                                                .count(count)
                                                .build();
        return ResponseEntity.ok(response);
    }

    
}
