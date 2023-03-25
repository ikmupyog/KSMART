package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftingEnrichment;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import org.egov.filemgmnt.kafka.Producer;

@Service
public class DraftingService {

    @Autowired
	private FMConfiguration fmConfig;

	@Autowired
	@Qualifier("fmProducer")
	private Producer producer;

    private final DraftingEnrichment draftingEnrichment;

    DraftingService (DraftingEnrichment draftingEnrichment,@Qualifier("fmProducer") Producer producer, FMConfiguration fmConfig ){
        
        this.draftingEnrichment = draftingEnrichment;
        this.producer = producer;
        this.fmConfig = fmConfig;
    }

    public List<Drafting> createDraftingMain(DraftingRequest request) {

        draftingEnrichment.enrichAriseFileCreate(request);
        producer.push(fmConfig.getSaveDraftingTopic(), request);

        return request.getDrafting();
    }
}
