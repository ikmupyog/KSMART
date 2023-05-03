package org.ksmart.marriage.marriageregistry.web.controller;


// import lombok.extern.slf4j.Slf4j;


import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryResponse;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertResponse;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
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
    private final MarriageRegistryRepository registryRepository;

    public MarriageRegistryController( MarriageRegistryService marriageService, 
                                        ResponseInfoFactory responseInfoFactory,
                                        MarriageRegistryRepository registryRepository) {
        this.marriageService = marriageService;
        this.responseInfoFactory = responseInfoFactory;
        this.registryRepository = registryRepository;
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
//for testing req
    @PostMapping("_searchregistry")
        
    public ResponseEntity<MarriageRegistryResponse> search(@RequestBody  MarriageRegistryRequest request,

                                                           @ModelAttribute MarriageRegistrySearchCriteria criteria) {
        int registryCount=registryRepository.getMarriageRegistryCount(criteria);

        List<MarriageRegistryDetails> marriageDetails = marriageService.searchRegistry(criteria,request.getRequestInfo());

        MarriageRegistryResponse response = MarriageRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .marriageApplicationDetails(marriageDetails)
                                            .count(registryCount)
                                            .build();
        return ResponseEntity.ok(response);
    }
    //for testing req
    @PostMapping("_certificate")
    public  ResponseEntity<MarriageCertResponse> certificateDownload(@RequestBody MarriageRegistryRequest request,
                                                                     @Valid @ModelAttribute MarriageRegistrySearchCriteria criteria) {
        List<MarriageCertificate> marriageCertResponseList = marriageService.searchCertificate(criteria,request.getRequestInfo());
        MarriageCertResponse response;



        if(null!=marriageCertResponseList&&!marriageCertResponseList.isEmpty()&&marriageCertResponseList.get(0).getCount()>0){


            response = MarriageCertResponse
                    .builder()
                    .filestoreId(marriageCertResponseList.get(0).getFilestoreid())
                    .tenantId(marriageCertResponseList.get(0).getMarriageRegistryDetails().getTenantid())
                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
                    .build();
            return ResponseEntity.ok(response);
        }else{



            MarriageCertificate marriageCertificate = marriageService.download(criteria,request.getRequestInfo());

            response = MarriageCertResponse
                    .builder()
                    .filestoreId(marriageCertificate.getFilestoreid())
                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
                    .build();
        }
        return ResponseEntity.ok(response);
    }


}
