package org.egov.filemgmnt.service;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.kafka.Producer;

import org.egov.filemgmnt.web.models.ArisingFile;
import org.egov.filemgmnt.web.models.ArisingFileRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class ArisingFileService {

	@Autowired
    private FMConfiguration fmConfig;
   
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

	
	public ArisingFile createArisingFile(ArisingFileRequest request) {
		producer.push(fmConfig.getSaveArisingFileTopic(), request);
		return request.getArisingFileDetail();
	}

}
