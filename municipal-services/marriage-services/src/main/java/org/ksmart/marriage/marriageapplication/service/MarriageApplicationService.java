package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.validator.BirthApplicationValidator;
import org.ksmart.marriage.marriageapplication.validator.MdmsValidator;
import org.ksmart.marriage.marriageregistry.service.MdmsDataService;
import org.ksmart.marriage.utils.MdmsUtil;
import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BirthApplicationService {
    private final MarriageApplicationRepository repository;
    private final WorkflowIntegrator workflowIntegrator;
    private final MdmsUtil mdmsUtil;

    private final MdmsDataService mdmsDataService;
    private final MdmsValidator mdmsValidator;
    private final BirthApplicationValidator applicationValidator;

    @Autowired
    BirthApplicationService(MarriageApplicationRepository repository, WorkflowIntegrator workflowIntegrator, MdmsUtil mdmsUtil,
                            MdmsValidator mdmsValidator, BirthApplicationValidator applicationValidator, MdmsDataService mdmsDataService) {
        this.repository = repository;
        this.workflowIntegrator = workflowIntegrator;
        this.mdmsUtil = mdmsUtil;
        this.mdmsValidator = mdmsValidator;
        this.applicationValidator = applicationValidator;
        this.mdmsDataService = mdmsDataService;
    }


    public List<MarriageApplicationDetail> saveBirthDetails(MarriageDetailsRequest request) {

         //validate mdms data
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());

        // validate request
        applicationValidator.validateCreate(request, mdmsData);

        //call save
        List<MarriageApplicationDetail> birthApplicationDetails =  repository.saveBirthDetails(request);

        //WorkFlow Integration
        workflowIntegrator.callWorkFlow(request);

        return  birthApplicationDetails;
    }

    public List<MarriageApplicationDetail> updateBirthDetails(MarriageDetailsRequest request) {
        
        workflowIntegrator.callWorkFlow(request);

        //mdmsDataService,
        
        return repository.updateBirthDetails(request);

    }

    public List<MarriageApplicationDetail> searchBirthDetails(MarriageApplicationSearchCriteria criteria) {
        return repository.searchBirthDetails(criteria);
    }
}
