package org.ksmart.birth.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.birth.marriageapplication.model.birth.BirthApplicationSearchCriteria;
import org.ksmart.birth.marriageapplication.model.BirthApplicationDetail;
import org.ksmart.birth.marriageapplication.model.birth.BirthDetailsRequest;
import org.ksmart.birth.marriageapplication.repository.BirthApplicationRepository;
import org.ksmart.birth.marriageapplication.validator.BirthApplicationValidator;
import org.ksmart.birth.marriageapplication.validator.MdmsValidator;
import org.ksmart.birth.marriageregistry.service.MdmsDataService;
import org.ksmart.birth.utils.MdmsUtil;
import org.ksmart.birth.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BirthApplicationService {
    private final BirthApplicationRepository repository;
    private final WorkflowIntegrator workflowIntegrator;
    private final MdmsUtil mdmsUtil;

    private final MdmsDataService mdmsDataService;
    private final MdmsValidator mdmsValidator;
    private final BirthApplicationValidator applicationValidator;

    @Autowired
    BirthApplicationService(BirthApplicationRepository repository, WorkflowIntegrator workflowIntegrator, MdmsUtil mdmsUtil,
                            MdmsValidator mdmsValidator, BirthApplicationValidator applicationValidator, MdmsDataService mdmsDataService) {
        this.repository = repository;
        this.workflowIntegrator = workflowIntegrator;
        this.mdmsUtil = mdmsUtil;
        this.mdmsValidator = mdmsValidator;
        this.applicationValidator = applicationValidator;
        this.mdmsDataService = mdmsDataService;
    }


    public List<BirthApplicationDetail> saveBirthDetails(BirthDetailsRequest request) {

         //validate mdms data
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());

        // validate request
        applicationValidator.validateCreate(request, mdmsData);

        //call save
        List<BirthApplicationDetail> birthApplicationDetails =  repository.saveBirthDetails(request);

        //WorkFlow Integration
        workflowIntegrator.callWorkFlow(request);

        return  birthApplicationDetails;
    }

    public List<BirthApplicationDetail> updateBirthDetails(BirthDetailsRequest request) {
        
        workflowIntegrator.callWorkFlow(request);

        //mdmsDataService,
        
        return repository.updateBirthDetails(request);

    }

    public List<BirthApplicationDetail> searchBirthDetails(BirthApplicationSearchCriteria criteria) {
        return repository.searchBirthDetails(criteria);
    }
}
