package org.ksmart.marriage.marriageregistry.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Slf4j
@Service
public class MarriageRegistryService {
    private final MarriageRegistryRepository repository;

    public MarriageRegistryService(MarriageRegistryRepository repository) {
        this.repository = repository;
    }

    public List<MarriageRegistryDetails> createRegistry(MarriageRegistryRequest request) {

        return repository.createMarriageRegistry(request);
    }

    // public List<MarriageRegistryDetails> updateRegistry(MarriageRegistryRequest request) {

    //     return repository.updateMarriageRegistry(request);
    // }

    public List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        return repository.searchMarriageRegistry(criteria);
    }


}
