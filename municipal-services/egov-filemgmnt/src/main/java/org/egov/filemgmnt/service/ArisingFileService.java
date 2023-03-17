package org.egov.filemgmnt.service;

import org.egov.filemgmnt.repository.ArisingFileRepository;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.kafka.Producer;

import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.ArisingFile;
import org.egov.filemgmnt.web.models.ArisingFileRequest;

import org.egov.filemgmnt.web.models.ArisingFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.xml.validation.Validator;
import java.util.List;
@Service
public class ArisingFileService  {
   private final ArisingFileRepository repository;
	@Autowired
    private FMConfiguration fmConfig;

   
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

	public ArisingFileService(ArisingFileRepository repository) {
		this.repository = repository;
	}


	public ArisingFile createArisingFile(ArisingFileRequest request) {
		producer.push(fmConfig.getSaveArisingFileTopic(), request);
		return request.getArisingFileDetail();
	}

	public List<ArisingFile> searchFile(final RequestInfo requestInfo, final ArisingFileSearchCriteria searchCriteria) {
		final List<ArisingFile> result = repository.searchArisingFiles(searchCriteria);
		return (result);
	}
}
