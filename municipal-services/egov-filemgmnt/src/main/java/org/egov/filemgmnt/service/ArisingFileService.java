package org.egov.filemgmnt.service;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ArisingFileEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.ArisingFileRepository;
import org.egov.filemgmnt.validators.ArisingFileValidator;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
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

    private final ArisingFileEnrichment fileEnrichment;
    private final ArisingFileRepository repository;

    private final ArisingFileValidator validator;

    ArisingFileService(ArisingFileValidator validator, ArisingFileEnrichment fileEnrichment,
                       @Qualifier("fmProducer") Producer producer, FMConfiguration fmConfig,
                       ArisingFileRepository repository) {
        this.validator = validator;
        this.fileEnrichment = fileEnrichment;
        this.producer = producer;
        this.fmConfig = fmConfig;
        this.repository = repository;
    }

    //public List<ArisingFile> createArisingFile(ArisingFileRequest request) {
    public ArisingFile createArisingFile(ArisingFileRequest request) {

        final ArisingFile arisingFile=request.getArisingFileDetail();
        // enrich request
        fileEnrichment.enrichAriseFileCreate(request);

        producer.push(fmConfig.getSaveArisingFileTopic(), request);
        return request.getArisingFileDetail();
    }

//        public ArisingFile updateArisingFile(ArisingFileRequest request) {
//        String arisingFileCode = request.getArisingFileDetail().getFileCode();
//
//        // search database
//        List<ArisingFile> searchResult = repository.searchArisingFiles(ArisingFileSearchCriteria.builder()
//                                                .fileCode(Collections.singletonList(arisingFileCode))
//                                                .build());
//
//        // validate request
//
//        validator.validateArisingFileUpdate(request, searchResult);
//        fileEnrichment.enrichArisingFileUpdate(request);
//
//        producer.push(fmConfig.getUpdateArisingFileTopic(), request);
//
//        return request.getArisingFileDetail();
//    }

    public List<ArisingFile> searchFile(final RequestInfo requestInfo, final ArisingFileSearchCriteria searchCriteria) {
        final List<ArisingFile> result = repository.searchArisingFiles(searchCriteria);
        return (result);
    }
}
