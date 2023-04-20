package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftFilesEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.validators.DraftFilesValidator;
import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.egov.filemgmnt.web.models.drafting.DraftFilesRequest;
import org.egov.filemgmnt.web.models.drafting.DraftFilesSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class DraftFilesService {
    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;
    private final DraftFilesRepository repository;

    private final DraftFilesEnrichment draftingEnrichment;
    private final DraftFilesValidator validator;

    DraftFilesService(DraftFilesRepository repository, FMConfiguration fmConfig, Producer producer,
                      DraftFilesEnrichment draftingEnrichment, DraftFilesValidator validator) {
        this.repository = repository;
        this.fmConfig = fmConfig;
        this.draftingEnrichment = draftingEnrichment;
        this.validator = validator;
        this.producer = producer;
    }

    public List<DraftFiles> create(DraftFilesRequest request) {

        draftingEnrichment.enrichCreateDrafting(request);
        producer.push(fmConfig.getSaveDraftingTopic(), request);

        return request.getDrafting();
    }

    public List<DraftFiles> update(DraftFilesRequest request) {
        List<String> draftfiles = request.getDrafting()
                                         .stream()
                                         .map(DraftFiles::getFileCode)
                                         .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = request.getRequestInfo()
                                    .getUserInfo()
                                    .getUuid();

        for (DraftFiles newDraft : request.getDrafting()) {
            fCode = newDraft.getFileCode();
            dType = newDraft.getDraftType();
        }

        // search database
        List<DraftFiles> searchResult = repository.searchDrafting(DraftFilesSearchCriteria.builder()
                                                                                          .draftType(dType)
                                                                                          .fileCode(fCode)
                                                                                          .assigner(assignerUid)
                                                                                          .build());
        // validate request
        validator.validateUpdate(request, searchResult);

        draftingEnrichment.enrichUpdate(request);

        producer.push(fmConfig.getUpdateDraftingTopic(), request);

        return request.getDrafting();

    }

    public List<DraftFiles> updateDraftingStatus(DraftFilesRequest statusrequest) {
        List<String> draftstatus = statusrequest.getDrafting()
                                                .stream()
                                                .map(DraftFiles::getFileCode)
                                                .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = null;

        for (DraftFiles newDrafts : statusrequest.getDrafting()) {
            fCode = newDrafts.getFileCode();
            dType = newDrafts.getDraftType();
            assignerUid = newDrafts.getAssigner();
        }
        // search database
        List<DraftFiles> searchResult = repository.searchDrafting(DraftFilesSearchCriteria.builder()
                                                                                          .draftType(dType)
                                                                                          .fileCode(fCode)
                                                                                          .assigner(assignerUid)
                                                                                          .build());
        // validate request
        validator.validateUpdate(statusrequest, searchResult);

        draftingEnrichment.enrichUpdate(statusrequest);

        producer.push(fmConfig.getUpdateDraftingStatusTopic(), statusrequest);

        return statusrequest.getDrafting();

    }

    public List<DraftFiles> search(final RequestInfo requestInfo, final DraftFilesSearchCriteria searchCriteria) {
        final List<DraftFiles> result = repository.searchDrafting(searchCriteria);
        return (result);
    }

}
