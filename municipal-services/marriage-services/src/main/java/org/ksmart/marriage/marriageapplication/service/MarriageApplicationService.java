package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MarriageApplicationService {
    private final MarriageApplicationRepository repository;




    public MarriageApplicationService(MarriageApplicationRepository repository) {
        this.repository = repository;
    }

    public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {




        //  workflowIntegrator.callWorkFlow(request);
        return repository.saveMarriageDetails(request);
    }

    public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {
        return repository.updateMarriageDetails(request);
    }

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria) {
        return repository.searchMarriageDetails(criteria);
    }
}
