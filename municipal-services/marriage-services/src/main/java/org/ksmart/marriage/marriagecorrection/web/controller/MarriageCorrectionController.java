package org.ksmart.marriage.marriagecorrection.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionApplnValidator;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionResponse;
import org.ksmart.marriage.marriagecorrection.service.MarriageCorrectionService;
import org.ksmart.marriage.marriageregistry.service.MarriageRegistryService;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")
public class MarriageCorrectionController {


    private final MarriageCorrectionService marriageCorrectionService;

    private final MarriageRegistryService marriageRegistryService;

    private final ResponseInfoFactory responseInfoFactory;
    private final MarriageCorrectionApplnValidator marriageCorrectionApplnValidator;

    public MarriageCorrectionController(MarriageCorrectionService marriageCorrectionService, MarriageRegistryService marriageRegistryService, ResponseInfoFactory responseInfoFactory, MarriageCorrectionApplnValidator marriageCorrectionApplnValidator) {
        this.marriageCorrectionService = marriageCorrectionService;
        this.marriageRegistryService = marriageRegistryService;
        this.responseInfoFactory = responseInfoFactory;
        this.marriageCorrectionApplnValidator = marriageCorrectionApplnValidator;
    }

    @PostMapping("/_createmarriagecorrection")
    public ResponseEntity<MarriageCorrectionResponse> createCorrection(@RequestBody MarriageCorrectionRequest request) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {

        List<MarriageCorrectionDetails> marriageCorrectionDetailsList = marriageCorrectionService.createCorrection(request);
        MarriageCorrectionResponse response = MarriageCorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageCorrectionDetails(marriageCorrectionDetailsList)
                .build();
        return ResponseEntity.ok(response);
    }



    @PostMapping(value = { "/_updatemarriagecorrection"})
    public ResponseEntity<MarriageCorrectionResponse> updateCorrection(@RequestBody MarriageCorrectionRequest request) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        
        List<MarriageCorrectionDetails> marriageapplnDetails = marriageCorrectionService.updateMarriageCorrectionDetails(request);

        //Updating Marriage registry if Registrar Approved
        if(marriageapplnDetails.get(0).getStatus().equals(MarriageConstants.WORKFLOW_STATUS_APPROVED) && (marriageapplnDetails.get(0).getApplicationtype().equals(MarriageConstants.APPLICATION_CORRECTION))) {

            List<MarriageCorrectionDetails> marriageCorrectionDetailsList = marriageRegistryService.updateMarriageRegistry(request);

        }
        MarriageCorrectionResponse response = MarriageCorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageCorrectionDetails(request.getMarriageCorrectionDetails())
                .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = {"/_searchmarriagecorrection"})
    public ResponseEntity<MarriageCorrectionResponse> searchCorrection(@RequestBody MarriageCorrectionRequest request, @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
        List<MarriageApplicationDetails> marriageCorrectionAplnDetails=marriageCorrectionService.searchCorrectionApplinDetails(request, criteria);
        marriageCorrectionApplnValidator.validateCorrectionApplnSearch(marriageCorrectionAplnDetails);
        String marriageId = marriageCorrectionAplnDetails.get(0).getId();
        List<MarriageCorrectionDetails> marriageCorrectionDetails = marriageCorrectionService.searchCorrectionDetails(marriageId);

        MarriageCorrectionResponse response=MarriageCorrectionResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageDetails(marriageCorrectionAplnDetails)
                .marriageCorrectionDetails(marriageCorrectionDetails)
                .build();
        return ResponseEntity.ok(response);
    }
}
