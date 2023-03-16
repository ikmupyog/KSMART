package org.egov.filemgmnt.service;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ArisingFileEnrichment;
import org.egov.filemgmnt.enrichment.CommunicationFileManagementEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.CommunicationFileManagementRepository;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.CommunicationFileManagementValidator;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchResponse;
import org.egov.filemgmnt.web.models.ArisingFile;
import org.egov.filemgmnt.web.models.ArisingFileRequest;

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
    
    
    ArisingFileService (ArisingFileEnrichment fileEnrichment, @Qualifier("fmProducer") Producer producer,FMConfiguration fmConfig) {

    	this.fileEnrichment = fileEnrichment;
    	this.producer = producer;
    	this.fmConfig = fmConfig;
    	}
	
	public List<ArisingFile> createArisingFile(ArisingFileRequest request) {
			
		 // enrich request
        fileEnrichment.enrichAriseFileCreate(request);
        
		producer.push(fmConfig.getSaveArisingFileTopic(), request);
		return request.getArisingFileDetail();
	}

}


