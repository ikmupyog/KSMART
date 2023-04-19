package org.ksmart.marriage.marriagecorrection.service;

import lombok.extern.slf4j.Slf4j;

import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.marriageapplication.validator.MarriageApplicationValidator;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriagecorrection.enrichment.MarriageCorrectionEnrichment;
import org.ksmart.marriage.marriagecorrection.mapper.CorrectionApplicationToRegistryMapper;
import org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionApplnValidator;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionMDMSValidator;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.repository.MarriageCorrectionRepository;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionValidator;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_CREATE;

@Slf4j
@Service
public class MarriageCorrectionService {

    private final MarriageCorrectionRepository correctionRepository;
    private final MarriageApplicationRepository applicationRepository;
    private final MarriageRegistryRepository registryRepository;

    private final MarriageCorrectionEnrichment marriageCorrectionEnrichment;

    private final RegistryToApplicationMapper RegistryToApplicationMapper;

    private final MarriageApplicationService MarriageService;
    private final MarriageApplicationValidator validatorService;
    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    private final CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper;
    private final MarriageApplicationRepository applnRepository;
    private final MarriageApplicationValidator applnvalidatorService;
    private final WorkflowIntegrator workflowIntegrator;
    private final MarriageCorrectionValidator correctionValidatorService ;
    private final MarriageCorrectionApplnValidator marriageCorrectionApplnValidator;
    private final MarriageCorrectionMDMSValidator marriageCorrectionMDMSValidator;
    private final MarriageDetailsEnrichment marriageDetailsEnrichment;


    public MarriageCorrectionService(MarriageCorrectionRepository correctionRepository, MarriageApplicationRepository applicationRepository, MarriageRegistryRepository registryRepository,
                                     MarriageCorrectionEnrichment marriageCorrectionEnrichment, org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper registryToApplicationMapper,
                                     MarriageApplicationService marriageService, MarriageApplicationValidator validatorService, MarriageProducer producer,
                                     MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageMdmsUtil util,
                                     MarriageMDMSValidator mdmsValidator,
                                     CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper,
                                     MarriageApplicationRepository applnRepository,
                                     MarriageApplicationValidator applnvalidatorService,
                                     WorkflowIntegrator workflowIntegrator,
                                     MarriageCorrectionValidator correctionValidatorService, MarriageCorrectionApplnValidator marriageCorrectionApplnValidator, MarriageCorrectionMDMSValidator marriageCorrectionMDMSValidator, MarriageDetailsEnrichment marriageDetailsEnrichment) {
        this.correctionRepository = correctionRepository;
        this.applicationRepository = applicationRepository;
        this.registryRepository = registryRepository;
        this.marriageCorrectionEnrichment = marriageCorrectionEnrichment;
        RegistryToApplicationMapper = registryToApplicationMapper;
        MarriageService = marriageService;
        this.validatorService = validatorService;
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
        this.correctionApplicationToRegistryMapper = correctionApplicationToRegistryMapper;
        this.applnRepository = applnRepository;
        this.applnvalidatorService = applnvalidatorService;
        this.workflowIntegrator = workflowIntegrator;
        this.correctionValidatorService = correctionValidatorService;
        this.marriageCorrectionApplnValidator = marriageCorrectionApplnValidator;
        this.marriageCorrectionMDMSValidator = marriageCorrectionMDMSValidator;
        this.marriageDetailsEnrichment = marriageDetailsEnrichment;
    }
//req for testing
    public List<MarriageCorrectionDetails> createCorrection(MarriageCorrectionRequest request) {

        //WorkFlowCheck wfc = new WorkFlowCheck();
        marriageCorrectionApplnValidator.validateCorrectionCreate(request);
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageCorrectionDetails().get(0).getTenantid());
        marriageCorrectionMDMSValidator.validateMarriageCorrectionMDMSData(request,mdmsData);

        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);
        if (!marriageRegistryDetails.isEmpty()) {
            MarriageApplicationDetails marriageApplicationDetail = RegistryToApplicationMapper.convert(marriageRegistryDetails);
            marriageCorrectionEnrichment.enrichCreate(request, marriageApplicationDetail);

            List<MarriageApplicationDetails> marriageApplicationDetailsList = new ArrayList<>();
            marriageApplicationDetailsList.add(marriageApplicationDetail);
            request.setMarriageDetails(marriageApplicationDetailsList);

            MarriageDetailsRequest marriageDetailsRequest=new MarriageDetailsRequest();
            marriageDetailsRequest.setMarriageDetails(marriageApplicationDetailsList);
            mdmsValidator.validateMarriageMDMSData(marriageDetailsRequest,mdmsData);
            //validatorService.ruleEngineMarriage(marriageDetailsRequest, wfc, mdmsData);

            producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);

            /*if (request.getMarriageCorrectionDetails().get(0).getIsWorkflow()){
                workflowIntegrator.callCorrectionWorkFlow(request);
            }
            request.getMarriageDetails().forEach(marriage->{
                if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
                    List<Demand> demands = new ArrayList<>();
                    Demand demand = new Demand();
                    demand.setTenantId(marriage.getTenantid());
                    demand.setConsumerCode(marriage.getApplicationNumber());
                    demands.add(demand);
                    marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
                }
            });*/

        }else{
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        return request.getMarriageCorrectionDetails();
    }

//req For Testing
    private List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        return registryRepository.searchMarriageRegistry(criteria);
    }

//req for testing
//    public List<MarriageCorrectionDetails> updateMarriageRegistry(MarriageCorrectionRequest request) {
//        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
//        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
//        criteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());
//        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);
//
//        if (!marriageRegistryDetails.isEmpty()) {
//            MarriageApplicationSearchCriteria aplnCriteria=new MarriageApplicationSearchCriteria();
//            aplnCriteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
//            aplnCriteria.setApplicationNo(request.getMarriageCorrectionDetails().get(0).getApplicationNo());
//            aplnCriteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());
//
//            List<MarriageApplicationDetails> marriageAplnDetails = correctionRepository.searchMarriageDetails(aplnCriteria, request.getRequestInfo());
//
//            if(!marriageAplnDetails.isEmpty()) {
//                MarriageRegistryRequest marriageRegistryRequest = correctionApplicationToRegistryMapper.convert(marriageRegistryDetails, marriageAplnDetails);
//                marriageRegistryRequest.setRequestInfo(request.getRequestInfo());
//                marriageCorrectionEnrichment.enrichRegistryUpdate(marriageRegistryRequest);
//                producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryCorrectionTopic(), marriageRegistryRequest);
//           }
//        }
//        return request.getMarriageCorrectionDetails();
//    }
//Jasmine 15.04.2023
public List<MarriageCorrectionDetails> updateMarriageCorrectionDetails(MarriageCorrectionRequest request) {

    marriageCorrectionApplnValidator.validateCorrectionUpdate(request);
    Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageCorrectionDetails().get(0).getTenantid());
    marriageCorrectionMDMSValidator.validateMarriageCorrectionMDMSData(request,mdmsData);

    String applicationNumber = request.getMarriageCorrectionDetails().get(0).getApplicationNo();
    MarriageApplicationSearchCriteria criteria = (MarriageApplicationSearchCriteria.builder()
                                                .applicationNo(applicationNumber)
                                                .build());
    List<MarriageApplicationDetails> searchResult = applnRepository.getMarriageApplication(criteria, request.getRequestInfo());
    correctionValidatorService.validateCorrectionUpdate(request, searchResult);

    marriageCorrectionEnrichment.enrichUpdate(request, searchResult);
    request.setMarriageDetails(searchResult);

    if (request.getMarriageCorrectionDetails().get(0).getIsWorkflow()) {
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
    public List<MarriageApplicationDetails> searchCorrectionApplinDetails(MarriageCorrectionRequest request,MarriageApplicationSearchCriteria criteria) {
        return applicationRepository.getMarriageApplication(criteria,request.getRequestInfo());
    }

    public List<MarriageCorrectionDetails> searchCorrectionDetails(String marriageId) {
        return correctionRepository.searchCorrectionDetails(marriageId);
    }
}
