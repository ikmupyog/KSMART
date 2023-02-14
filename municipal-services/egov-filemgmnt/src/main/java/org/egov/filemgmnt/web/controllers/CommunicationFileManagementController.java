package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.CommunicationFileManagementService;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.communication.CommunicationFile;
import org.egov.filemgmnt.web.models.communication.CommunicationFileRequest;
import org.egov.filemgmnt.web.models.communication.CommunicationFileResponse;
import org.egov.filemgmnt.web.models.communication.CommunicationFileSearchCriteria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Communication File Management")
@RestController
@RequestMapping("/v1")
public class CommunicationFileManagementController {

    private final ResponseInfoFactory responseInfoFactory;
    private final CommunicationFileManagementService communicationService;

    // @Autowired
    CommunicationFileManagementController(ResponseInfoFactory responseInfoFactory,
                                          CommunicationFileManagementService communicationService) {
        this.responseInfoFactory = responseInfoFactory;
        this.communicationService = communicationService;

    }

    @Operation(hidden = true)
    @PostMapping("/officecommunication/_create")
    public ResponseEntity<CommunicationFileResponse> create(@RequestBody CommunicationFileRequest request) {
        List<CommunicationFile> files = communicationService.create(request);

        CommunicationFileResponse response = CommunicationFileResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .communicationFiles(files)
                                                                      .build();

        return ResponseEntity.ok(response);
    }

    @Operation(hidden = true)
    @PutMapping("/officecommuication/_update")
    public ResponseEntity<CommunicationFileResponse> update(@RequestBody CommunicationFileRequest request) {

        List<CommunicationFile> files = communicationService.update(request);

        CommunicationFileResponse response = CommunicationFileResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .communicationFiles(files)
                                                                      .build();

        return ResponseEntity.ok(response);
    }

    @Operation(hidden = true)
    @PostMapping("/officecommuication/_search")
    public ResponseEntity<CommunicationFileResponse> search(@RequestBody RequestInfoWrapper request,
                                                            @ModelAttribute CommunicationFileSearchCriteria criteria) {

        List<CommunicationFile> files = communicationService.search(criteria, request.getRequestInfo());

        CommunicationFileResponse response = CommunicationFileResponse.builder()
                                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                          Boolean.TRUE))
                                                                      .communicationFiles(files)
                                                                      .build();
        return ResponseEntity.ok(response);
    }
}
