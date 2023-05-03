package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ArisingFileEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.ArisingFileRepository;
import org.egov.filemgmnt.validators.ArisingFileValidator;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
import org.egov.filemgmnt.workflow.ArisingFileWorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ArisingFileService {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    // private final ArisingFileValidator validator;
    private final ArisingFileEnrichment enrichment;
    private final ArisingFileRepository repository;
    private final ArisingFileWorkflowIntegrator wfIntegrator;

    ArisingFileService(final ArisingFileValidator validator, final ArisingFileEnrichment enrichment,
                       final ArisingFileRepository repository, final ArisingFileWorkflowIntegrator wfIntegrator) {
        // this.validator = validator;
        this.enrichment = enrichment;
        this.repository = repository;
        this.wfIntegrator = wfIntegrator;
    }

    public ArisingFile create(final ArisingFileRequest request) {
        // enrich request
        enrichment.enrichCreateRequest(request);

        // persister save
        producer.push(fmConfig.getSaveArisingFileTopic(), request);

        // create workflow
        wfIntegrator.callWorkflow(request);

        return request.getArisingFile();
    }

//    public ArisingFile update(ArisingFileRequest request) {
//        String arisingFileCode = request.getArisingFile()
//                                        .getFileCode();
//
//        // search database
//        List<ArisingFile> searchResult = repository.search(ArisingFileSearchCriteria.builder()
//                                                                                    .fileCode(arisingFileCode)
//                                                                                    .build());
//        // validate request
//        validator.validateArisingFileUpdate(request, searchResult);
//        enrichment.enrichArisingFileUpdate(request);
//
//        producer.push(fmConfig.getUpdateArisingFileTopilc(), request);
//
//        return request.getArisingFile();
//    }

    public List<ArisingFile> search(final RequestInfo requestInfo, final ArisingFileSearchCriteria searchCriteria) {

        return repository.search(searchCriteria);
    }
}
