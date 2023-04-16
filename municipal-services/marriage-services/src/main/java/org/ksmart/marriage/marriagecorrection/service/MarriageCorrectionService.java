package org.ksmart.marriage.marriagecorrection.service;

import lombok.extern.slf4j.Slf4j;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.marriageapplication.validator.MarriageApplicationValidator;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriagecorrection.enrichment.MarriageCorrectionEnrichment;
import org.ksmart.marriage.marriagecorrection.mapper.CorrectionApplicationToRegistryMapper;
import org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.repository.MarriageCorrectionRepository;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionValidator;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MarriageCorrectionService {

    private final MarriageCorrectionRepository correctionRepository;

    private final MarriageRegistryRepository registryRepository;

    private final MarriageCorrectionEnrichment marriageCorrectionEnrichment;

    private final RegistryToApplicationMapper RegistryToApplicationMapper;

    private final MarriageApplicationService MarriageService;

    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    private final CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper;
    private final MarriageApplicationRepository applnRepository;
    private final MarriageApplicationValidator applnvalidatorService;
    private final WorkflowIntegrator workflowIntegrator;
    private final MarriageCorrectionValidator correctionValidatorService ;

    public MarriageCorrectionService(MarriageCorrectionRepository correctionRepository, MarriageRegistryRepository registryRepository, 
                                                MarriageCorrectionEnrichment marriageCorrectionEnrichment, org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper registryToApplicationMapper, 
                                                MarriageApplicationService marriageService, MarriageProducer producer, 
                                                MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageMdmsUtil util, 
                                                MarriageMDMSValidator mdmsValidator, 
                                                CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper,
                                                 MarriageApplicationRepository applnRepository,
                                                 MarriageApplicationValidator applnvalidatorService,
                                                 WorkflowIntegrator workflowIntegrator,
                                                 MarriageCorrectionValidator correctionValidatorService) {
        this.correctionRepository = correctionRepository;
        this.registryRepository = registryRepository;
        this.marriageCorrectionEnrichment = marriageCorrectionEnrichment;
        RegistryToApplicationMapper = registryToApplicationMapper;
        MarriageService = marriageService;
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
        this.correctionApplicationToRegistryMapper = correctionApplicationToRegistryMapper;
        this.applnRepository = applnRepository;
        this.applnvalidatorService = applnvalidatorService;
        this.workflowIntegrator = workflowIntegrator;
        this.correctionValidatorService = correctionValidatorService;
    }
//req for testing
    public List<MarriageCorrectionDetails> createCorrection(MarriageCorrectionRequest request) {

        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);
        if (!marriageRegistryDetails.isEmpty()) {
            MarriageApplicationDetails marriageApplicationDetail = RegistryToApplicationMapper.convert(marriageRegistryDetails);
            marriageCorrectionEnrichment.enrichCreate(request, marriageApplicationDetail);

            List<MarriageApplicationDetails> marriageApplicationDetailsList = new ArrayList<>();
            marriageApplicationDetailsList.add(marriageApplicationDetail);

            request.setMarriageDetails(marriageApplicationDetailsList);

            //correctionRepository.saveCorrectionDetails(request);

            //Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
            //mdmsValidator.validateMarriageMDMSData(request,mdmsData);

            producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);
        }
        return request.getMarriageCorrectionDetails();
    }

//req For Testing
    private List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        return registryRepository.searchMarriageRegistry(criteria);
    }

//req for testing
    public List<MarriageCorrectionDetails> updateMarriageRegistry(MarriageCorrectionRequest request) {
        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        criteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);

        if (!marriageRegistryDetails.isEmpty()) {
            MarriageApplicationSearchCriteria aplnCriteria=new MarriageApplicationSearchCriteria();
            aplnCriteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
            aplnCriteria.setApplicationNo(request.getMarriageCorrectionDetails().get(0).getApplicationNo());
            aplnCriteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());

            List<MarriageApplicationDetails> marriageAplnDetails = correctionRepository.searchMarriageDetails(aplnCriteria, request.getRequestInfo());

            if(!marriageAplnDetails.isEmpty()) {
                MarriageRegistryRequest marriageRegistryRequest = correctionApplicationToRegistryMapper.convert(marriageRegistryDetails, marriageAplnDetails);
                marriageRegistryRequest.setRequestInfo(request.getRequestInfo());
                marriageCorrectionEnrichment.enrichRegistryUpdate(marriageRegistryRequest);
                producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryCorrectionTopic(), marriageRegistryRequest);
           }
        }
        return request.getMarriageCorrectionDetails();
    }
//Jasmine 15.04.2023
public List<MarriageCorrectionDetails> updateMarriageCorrectionDetails(MarriageCorrectionRequest request) {

    String applicationNumber = request.getMarriageCorrectionDetails().get(0).getApplicationNo();
    MarriageApplicationSearchCriteria criteria =(MarriageApplicationSearchCriteria.builder()
                                                .applicationNo(applicationNumber)
                                                .build());
    List<MarriageApplicationDetails> searchResult = applnRepository.getMarriageApplication(criteria,request.getRequestInfo());
    correctionValidatorService.validateCorrectionUpdate(request, searchResult); 
    if (request.getMarriageCorrectionDetails().get(0).getIsWorkflow()){
        workflowIntegrator.callCorrectionWorkFlow(request);
    }
    producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationCorrectionTopic(), request);
    
    // request.getMarriageDetails().forEach(marriage->{
    //     if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
    //         List<Demand> demands = new ArrayList<>();
    //         Demand demand = new Demand();
    //         demand.setTenantId(marriage.getTenantid());
    //         demand.setConsumerCode(marriage.getApplicationNumber());
    //         demands.add(demand);
    //         marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
    //     }
    // }); 
     return request.getMarriageCorrectionDetails();

}

}
