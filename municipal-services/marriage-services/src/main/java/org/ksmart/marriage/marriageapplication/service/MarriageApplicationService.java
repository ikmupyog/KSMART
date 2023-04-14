package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.validator.MarriageApplicationValidator;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MarriageApplicationService {
    private final MarriageProducer producer;
    private final MarriageApplicationRepository repository;
    private final WorkflowIntegrator workflowIntegrator;
    private final MarriageDetailsEnrichment marriageDetailsEnrichment;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;

    private final MarriageApplicationValidator validatorService;

    public MarriageApplicationService(MarriageProducer producer, MarriageApplicationRepository repository ,
                                      WorkflowIntegrator workflowIntegrator,
                                      MarriageDetailsEnrichment marriageDetailsEnrichment,
                                      MarriageMdmsUtil util,
                                      MarriageMDMSValidator mdmsValidator,
                                      MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageApplicationValidator validatorService) {
        this.repository = repository;
        this.workflowIntegrator = workflowIntegrator;
        this. marriageDetailsEnrichment= marriageDetailsEnrichment;
        this.util = util;
        this.mdmsValidator=mdmsValidator;
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.validatorService = validatorService;
    }

    public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {

    // try {
    //         ObjectMapper mapper = new ObjectMapper();
    //         Object obj = request;
    //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    //        System.out.println("MarriageRequest "+ mapper.writeValueAsString(obj));
    //     }catch(Exception e) {
    //     log.error("Exception while fetching from searcher: ",e);
    // }
    System.out.println("Workflowtesting"+request.getMarriageDetails().get(0).getIsWorkflow());
        WorkFlowCheck wfc = new WorkFlowCheck();
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        validatorService.ruleEngineMarriage(request, wfc, mdmsData);
        validatorService.validateCommonFields( request);
        mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        marriageDetailsEnrichment.enrichCreate(request);
        producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);


       // System.out.println("CheckWorkFlow"+request.getMarriageDetails().get(0).isWorkflow());
        if (request.getMarriageDetails().get(0).getIsWorkflow()){
            workflowIntegrator.callWorkFlow(request);
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
        }); 
        return request.getMarriageDetails();
    }

    public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {

        validatorService.validateCommonFields( request);
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        String applicationNumber = request.getMarriageDetails().get(0).getApplicationNumber();
        MarriageApplicationSearchCriteria criteria =(MarriageApplicationSearchCriteria.builder()
                                                    .applicationNo(applicationNumber)
                                                    .build());
        List<MarriageApplicationDetails> searchResult = repository.getMarriageApplication(criteria,request.getRequestInfo());
        validatorService.validateUpdate(request, searchResult);
        marriageDetailsEnrichment.enrichUpdate(request);
        if (request.getMarriageDetails().get(0).getIsWorkflow()){
            workflowIntegrator.callWorkFlow(request);
        }
        producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationTopic(), request);
        request.getMarriageDetails().forEach(marriage->{
            if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
                List<Demand> demands = new ArrayList<>();
                Demand demand = new Demand();
                demand.setTenantId(marriage.getTenantid());
                demand.setConsumerCode(marriage.getApplicationNumber());
                demands.add(demand);
                marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
            }
        }); 
        return request.getMarriageDetails();

    }

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        return repository.searchMarriageDetails(criteria,requestInfo);
    }
}
