package org.egov.filemgmnt.service;


import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftingRepository;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DraftingService {
    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;
    private final DraftingRepository repository;

    DraftingService(DraftingRepository repository,FMConfiguration fmConfig,Producer producer){
    this.repository = repository;
    this.fmConfig = fmConfig;
    }
    public List<Drafting>searchDraft(final RequestInfo requestInfo, final DraftingSearchCriteria searchCriteria){
        final List<Drafting> result = repository.searchDrafting(searchCriteria);
        return (result);
    }
}
