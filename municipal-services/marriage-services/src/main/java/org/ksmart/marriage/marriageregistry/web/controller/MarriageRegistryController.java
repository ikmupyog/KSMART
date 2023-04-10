package org.ksmart.marriage.marriageregistry.web.controller;


// import lombok.extern.slf4j.Slf4j;


import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryResponse;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertResponse.java;

import lombok.extern.slf4j.Slf4j;

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

    @PostMapping("_certificate")
    public  ResponseEntity<MarriageCertRespons> certificateDownload(@RequestBody MarriageRegistryRequest request,
                                                                     @Valid @ModelAttribute MarriageRegistrySearchCriteria criteria) {
        List<MarriageCertificate> marriageCertResponseList = marriageService.searchCertificate(criteria);
        MarriageCertResponse response;
//        if(null!=marriageCertResponseList&&!marriageCertResponseList.isEmpty()){
//            response = MarriageCertResponse
//                    .builder()
//                    .filestoreId(marriageCertResponseList.get(0).getFilestoreid())
//                    .tenantId(marriageCertResponseList.get(0).getMarriageRegistryDetails().getTenantid())
//                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
//                    .build();
//            return ResponseEntity.ok(response);
//        }else{
            MarriageCertificate marriageCertificate = marriageService.download(criteria,request.getRequestInfo());

            response = MarriageCertResponse
                    .builder()
                    .filestoreId(marriageCertificate.getFilestoreid())
                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
                    .build();
//        }
        return ResponseEntity.ok(response);
    }


}
