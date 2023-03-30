package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftingEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftingRepository;
import org.egov.filemgmnt.validators.DraftingValidator;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.egov.filemgmnt.web.models.drafting.DraftingSearchCriteria;
import org.egov.filemgmnt.web.models.drafting.ProcessInstance;
import org.egov.filemgmnt.web.models.drafting.ProcessInstanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;


@Service
public class DraftingService {
    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;
    private final DraftingRepository repository;

    private final DraftingEnrichment draftingEnrichment;
    private final DraftingValidator validator;


    DraftingService(DraftingRepository repository, FMConfiguration fmConfig, Producer producer, DraftingEnrichment draftingEnrichment, DraftingValidator validator) {
        this.repository = repository;
        this.fmConfig = fmConfig;
        this.draftingEnrichment = draftingEnrichment;
        this.validator = validator;
        this.producer = producer;
    }

    public List<Drafting> createDraftingMain(DraftingRequest request) {

        draftingEnrichment.enrichCreateDraftingMain(request);
        producer.push(fmConfig.getSaveDraftingTopic(), request);

        return request.getDrafting();
    }

    public List<Drafting> updateDrafting(DraftingRequest request) {
        List<String> draftfiles = request.getDrafting()
                .stream()
                .map(Drafting::getFileCode)
                .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = request.getRequestInfo().getUserInfo().getUuid();

        for (Drafting newDraft : request.getDrafting()) {
            fCode = newDraft.getFileCode();
            dType = newDraft.getDraftType();
        }

        // search database
        List<Drafting> searchResult = repository.searchDrafting(DraftingSearchCriteria.builder()
                .draftType(dType)
                .fileCode(fCode)
                .uuid(assignerUid)
                .build());
        // validate request
        validator.validateUpdate(request, searchResult);

        draftingEnrichment.enrichUpdate(request);

        producer.push(fmConfig.getUpdateDraftingTopic(), request);

        return request.getDrafting();

    }

    public List<Drafting> updateDraftingStatus(DraftingRequest statusrequest) {
        List<String> draftstatus = statusrequest.getDrafting()
                .stream()
                .map(Drafting::getFileCode)
                .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = statusrequest.getRequestInfo().getUserInfo().getUuid();

        for (Drafting newDrafts : statusrequest.getDrafting()) {
            fCode = newDrafts.getFileCode();
            dType = newDrafts.getDraftType();
        }
        // search database
        List<Drafting> searchResult = repository.searchDrafting(DraftingSearchCriteria.builder()
                .draftType(dType)
                .fileCode(fCode)
                .uuid(assignerUid)
                .build());
        // validate request
        validator.validateUpdate(statusrequest, searchResult);

        draftingEnrichment.enrichUpdate(statusrequest);

        producer.push(fmConfig.getUpdateDraftingStatusTopic(), statusrequest);

        return statusrequest.getDrafting();


    }


    public List<Drafting> searchDraft(final RequestInfo requestInfo, final DraftingSearchCriteria searchCriteria) {
        final List<Drafting> result = repository.searchDrafting(searchCriteria);
        return (result);
    }

	public List<ProcessInstance> createDraftProcessInstance(ProcessInstanceRequest request) {
		
        draftingEnrichment.enrichcreateDraftProcessInstance(request);
        producer.push(fmConfig.getSaveDraftProcessInstance(), request);

        return request.getProcessInstances();
	}
}



