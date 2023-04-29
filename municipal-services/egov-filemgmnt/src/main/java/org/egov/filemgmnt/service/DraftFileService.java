package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftFileEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.validators.DraftFilesValidator;
import org.egov.filemgmnt.web.models.certificate.draftfile.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.draftfile.DraftCertificateRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DraftFileService {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    private final DraftFilesRepository repository;
    private final DraftFileEnrichment enrichment;
    private final DraftFilesValidator validator;
    private final DraftCertificateService certService;

    DraftFileService(final DraftFilesRepository repository, final DraftFileEnrichment enrichment,
                     final DraftFilesValidator validator, final DraftCertificateService certService) {
        this.repository = repository;
        this.enrichment = enrichment;
        this.validator = validator;
        this.certService = certService;
    }

    public DraftFile create(final DraftFileRequest request) {
        final DraftFile draftFile = request.getDraftFile();

        validator.validateCreate(request);
        enrichment.enrichCreate(request);

        producer.push(fmConfig.getSaveDraftFileTopic(), request);

        return draftFile;
    }

    public DraftFile update(final DraftFileRequest request) {
        final DraftFile draftFile = request.getDraftFile();

        String assignerUuid = request.getRequestInfo()
                                     .getUserInfo()
                                     .getUuid();

        // search
        List<DraftFile> results = repository.search(DraftFileSearchCriteria.builder()
                                                                           .draftType(draftFile.getDraftType())
                                                                           .fileCode(draftFile.getFileCode())
                                                                           .assigner(assignerUuid)
                                                                           .build());
        // validate
        validator.validateUpdate(request, results);

        // enrich
        enrichment.enrichUpdate(request);

        // persist
        producer.push(fmConfig.getUpdateDraftFileTopic(), request);

        return request.getDraftFile();

    }

    public DraftFile updateStatus(DraftFileRequest request) {
        final DraftFile draftFile = request.getDraftFile();

        // search
        List<DraftFile> searchResult = repository.search(DraftFileSearchCriteria.builder()
                                                                                .draftType(draftFile.getDraftType())
                                                                                .fileCode(draftFile.getFileCode())
                                                                                .assigner(draftFile.getAssigner())
                                                                                .build());
        // validate
        validator.validateUpdate(request, searchResult);

        // enrich
        enrichment.enrichUpdate(request);

        // persist
        producer.push(fmConfig.getUpdateDraftFileStatusTopic(), request);

        return request.getDraftFile();

    }

    public List<DraftFile> search(final RequestInfo requestInfo, final DraftFileSearchCriteria searchCriteria) {

        return repository.search(searchCriteria);
    }

    // Draft certificate download
    public List<DraftCertificateDetails> download(final RequestInfo requestInfo,
                                                  final DraftFileSearchCriteria searchCriteria) {
        final DraftCertificateRequest request = certService.createDraftCertificateRequest(searchCriteria, requestInfo);

        if (log.isDebugEnabled()) {
            log.debug("Certificate request: \n{}", FMUtils.toJson(request));
        }

        // producer.push(fmConfig.getSaveApplicantCertificateTopic(), request);

        return request.getDraftCertificateDetails();
    }

}
