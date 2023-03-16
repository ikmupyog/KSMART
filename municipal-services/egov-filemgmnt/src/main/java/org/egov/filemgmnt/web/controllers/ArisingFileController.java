package org.egov.filemgmnt.web.controllers;

import org.egov.filemgmnt.service.ArisingFileService;
import org.egov.filemgmnt.service.FileManagementService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.ArisingFile;
import org.egov.filemgmnt.web.models.ArisingFileRequest;
import org.egov.filemgmnt.web.models.ArisingFileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
public class ArisingFileController {
	
	
	 private final ResponseInfoFactory responseInfoFactory;
	 private final ArisingFileService arisingFileService;
	 
	 ArisingFileController(final ArisingFileService arisingFileService, final ResponseInfoFactory responseInfoFactory) {
	        this.arisingFileService = arisingFileService;
	        this.responseInfoFactory = responseInfoFactory;
	    }

	
	@PostMapping("/applicantservices/_createArisingFile")
    public ResponseEntity<ArisingFileResponse> createArisingFile(@RequestBody final ArisingFileRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("ArisingFileRequest-create:  \n{}", FMUtils.toJson(request));
        }

        final ArisingFile arisingFileDetails = arisingFileService.createArisingFile(request);

        return ResponseEntity.ok(ArisingFileResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .arisingFileDetail(arisingFileDetails)
                                                         .build());
    }
        
    

}
