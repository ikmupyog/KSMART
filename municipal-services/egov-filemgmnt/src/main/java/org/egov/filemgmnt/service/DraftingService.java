package org.egov.filemgmnt.service;


import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftingEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftingRepository;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
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

    private final DraftingEnrichment draftingEnrichment;

    DraftingService(DraftingRepository repository,FMConfiguration fmConfig,Producer producer, DraftingEnrichment draftingEnrichment){
        this.repository = repository;
        this.fmConfig = fmConfig;
        this.draftingEnrichment = draftingEnrichment;
    }

    public List<Drafting> createDraftingMain(DraftingRequest request) {

        draftingEnrichment.enrichcreateDraftingMain(request);
        producer.push(fmConfig.getSaveDraftingTopic(), request);

        return request.getDrafting();
    }


    public List<Drafting>searchDraft(final RequestInfo requestInfo, final DraftingSearchCriteria searchCriteria){
        final List<Drafting> result = repository.searchDrafting(searchCriteria);
        return (result);
    }
}

