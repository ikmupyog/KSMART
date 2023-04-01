package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MarriageApplicationService {
    private final MarriageApplicationRepository repository;
    private final WorkflowIntegrator workflowIntegrator;
    private final MarriageDetailsEnrichment marriageDetailsEnrichment;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    

    public MarriageApplicationService(MarriageApplicationRepository repository , 
                                    WorkflowIntegrator workflowIntegrator,
                                    MarriageDetailsEnrichment marriageDetailsEnrichment,     
                                    MarriageMdmsUtil util,
                                    MarriageMDMSValidator mdmsValidator) {
        this.repository = repository;
        this.workflowIntegrator = workflowIntegrator;
        this. marriageDetailsEnrichment= marriageDetailsEnrichment;
        this.util = util;
        this.mdmsValidator=mdmsValidator;
    }

    public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {
        // validatorService.validateCommonFields( request);
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        marriageDetailsEnrichment.enrichCreate(request);
        List<MarriageApplicationDetails>  marriageApplicationDetails = repository.saveMarriageDetails(request);
       // workflowIntegrator.callWorkFlow(request);
        marriageApplicationDetails.forEach(marriage->{
            if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
                List<Demand> demands = new ArrayList<>();
                Demand demand = new Demand();
                demand.setTenantId(marriage.getTenantid());
                demand.setConsumerCode(marriage.getApplicationNumber());
                demands.add(demand);
                marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
            }
        }); 
        return marriageApplicationDetails;

    }

    public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {
        // validatorService.validateCommonFields( request);
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        marriageDetailsEnrichment.enrichUpdate(request);
        // workflowIntegrator.callWorkFlow(request);
        List<MarriageApplicationDetails>  marriageApplicationDetails =repository.updateMarriageDetails(request);

        marriageApplicationDetails.forEach(marriage->{
            if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
                List<Demand> demands = new ArrayList<>();
                Demand demand = new Demand();
                demand.setTenantId(marriage.getTenantid());
                demand.setConsumerCode(marriage.getApplicationNumber());
                demands.add(demand);
                marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
            }
        }); 
        return marriageApplicationDetails;

    }

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria) {
        return repository.searchMarriageDetails(criteria);
    }
}
