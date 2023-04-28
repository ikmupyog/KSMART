package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftFilesEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.validators.DraftFilesValidator;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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

    private final DraftCertificateService draftCertificateService;

    DraftFilesService(DraftFilesRepository repository, FMConfiguration fmConfig, Producer producer,
                      DraftFilesEnrichment draftingEnrichment, DraftFilesValidator validator,
                      final DraftCertificateService draftCertificateService) {
        this.repository = repository;
        this.fmConfig = fmConfig;
        this.draftingEnrichment = draftingEnrichment;
        this.validator = validator;
        this.producer = producer;
        this.draftCertificateService = draftCertificateService;
    }

    public List<DraftFile> create(DraftFileRequest request) {

        validator.validateDraftCreate(request);
        draftingEnrichment.enrichCreateDrafting(request);
        producer.push(fmConfig.getSaveDraftingTopic(), request);

        return request.getDraftFiles();
    }

    public List<DraftFile> update(DraftFileRequest request) {
        List<String> draftfiles = request.getDraftFiles()
                                         .stream()
                                         .map(DraftFile::getFileCode)
                                         .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = request.getRequestInfo()
                                    .getUserInfo()
                                    .getUuid();

        for (DraftFile newDraft : request.getDraftFiles()) {
            fCode = newDraft.getFileCode();
            dType = newDraft.getDraftType();
        }

        // search database
        List<DraftFile> searchResult = repository.searchDrafting(DraftFileSearchCriteria.builder()
                                                                                        .draftType(dType)
                                                                                        .fileCode(fCode)
                                                                                        .assigner(assignerUid)
                                                                                        .build());
        // validate request
        validator.validateUpdate(request, searchResult);

        draftingEnrichment.enrichUpdate(request);

        producer.push(fmConfig.getUpdateDraftingTopic(), request);

        return request.getDraftFiles();

    }

    public List<DraftFile> updateStatus(DraftFileRequest statusrequest) {
        List<String> draftstatus = statusrequest.getDraftFiles()
                                                .stream()
                                                .map(DraftFile::getFileCode)
                                                .collect(Collectors.toCollection(LinkedList::new));
        String fCode = null;
        String dType = null;
        String assignerUid = null;

        for (DraftFile newDrafts : statusrequest.getDraftFiles()) {
            fCode = newDrafts.getFileCode();
            dType = newDrafts.getDraftType();
            assignerUid = newDrafts.getAssigner();
        }
        // search database
        List<DraftFile> searchResult = repository.searchDrafting(DraftFileSearchCriteria.builder()
                                                                                        .draftType(dType)
                                                                                        .fileCode(fCode)
                                                                                        .assigner(assignerUid)
                                                                                        .build());
        // validate request
        validator.validateUpdate(statusrequest, searchResult);

        draftingEnrichment.enrichUpdate(statusrequest);

        producer.push(fmConfig.getUpdateDraftingStatusTopic(), statusrequest);

        return statusrequest.getDraftFiles();

    }

    public List<DraftFile> search(final RequestInfo requestInfo, final DraftFileSearchCriteria searchCriteria) {
        final List<DraftFile> result = repository.searchDrafting(searchCriteria);
        return (result);
    }

    // Draft certificate download
    public List<DraftCertificateDetails> downloadDraftCertificate(final RequestInfo requestInfo,
                                                                  final DraftFileSearchCriteria searchCriteria) {
        final DraftCertificateRequest request = draftCertificateService.createDraftCertificateRequest(searchCriteria,
                                                                                                      requestInfo);

        if (log.isDebugEnabled()) {
            log.debug("Certificate request: \n{}", FMUtils.toJson(request));
        }

        // producer.push(fmConfig.getSaveApplicantCertificateTopic(), request);

        return request.getDraftCertificateDetails();
    }

}
