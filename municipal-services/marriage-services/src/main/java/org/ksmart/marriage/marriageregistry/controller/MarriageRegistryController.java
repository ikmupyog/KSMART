package org.ksmart.marriage.marriageregistry.controller;


// import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.marriageregistry.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryResponse;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")

public class MarriageRegistryController {
    private final MarriageRegistryService marriageService;
    private final ResponseInfoFactory responseInfoFactory;


    public MarriageRegistryController( MarriageRegistryService marriageService, ResponseInfoFactory responseInfoFactory) {
        this.marriageService = marriageService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @PostMapping(value = {"/_createregistry"})
    public ResponseEntity<MarriageRegistryResponse> saveMarriageDetails(@RequestBody MarriageRegistryRequest request) {
        List<MarriageRegistryDetails> marriageDetails=marriageService.createRegistry(request);
        MarriageRegistryResponse response= MarriageRegistryResponse.builder()
                                                                  .marriageApplicationDetails(marriageDetails)
                                                                  .responseInfo(
                                                                   responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),true))
                                                                  .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("_searchregistry")
        
    public ResponseEntity<MarriageRegistryResponse> search(@RequestBody  MarriageRegistryRequest request,
                                                        @ModelAttribute MarriageRegistrySearchCriteria criteria) {

        List<MarriageRegistryDetails> marriageDetails = marriageService.searchRegistry(criteria);

        MarriageRegistryResponse response = MarriageRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .marriageApplicationDetails(marriageDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }


}
