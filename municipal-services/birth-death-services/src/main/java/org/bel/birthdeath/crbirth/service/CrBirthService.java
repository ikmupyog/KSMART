package org.bel.birthdeath.crbirth.service;

import lombok.extern.slf4j.Slf4j;
import org.bel.birthdeath.crbirth.model.BirthApplicationSearchCriteria;
import org.bel.birthdeath.crbirth.model.BirthDetail;
import org.bel.birthdeath.crbirth.model.BirthDetailsRequest;
import org.bel.birthdeath.crbirth.repository.CrBirthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bel.birthdeath.workflow.WorkflowIntegrator;

import java.util.List;

@Slf4j
@Service
public class CrBirthService {

    @Autowired
    CrBirthRepository repository;

    @Autowired
    WorkflowIntegrator WorkflowIntegrator;


    public List<BirthDetail> saveBirthDetails(BirthDetailsRequest request) {

        WorkflowIntegrator.callWorkFlow(request);
        return repository.saveBirthDetails(request);
    }

    public List<BirthDetail> updateBirthDetails(BirthDetailsRequest request) {
        return repository.updateBirthDetails(request);
    }

    public List<BirthDetail> searchBirthDetails(BirthApplicationSearchCriteria criteria) {
        return repository.searchBirthDetails(criteria);
    }
}
