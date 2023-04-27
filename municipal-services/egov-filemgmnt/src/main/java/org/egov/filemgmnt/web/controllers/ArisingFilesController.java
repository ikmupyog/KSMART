package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.ArisingFileService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileResponse;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
public class ArisingFilesController implements ArisingFilesBaseController {

    private final ResponseInfoFactory responseInfoFactory;
    private final ArisingFileService arisingFileService;

    ArisingFilesController(final ArisingFileService arisingFileService, final ResponseInfoFactory responseInfoFactory) {
        this.arisingFileService = arisingFileService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @Override
    @PostMapping("/arisingfiles/_create")
    public ResponseEntity<ArisingFileResponse> create(@RequestBody final ArisingFileRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("arisingfiles-create:  \n{}", FMUtils.toJson(request));
        }

        final ArisingFile arisingFile = arisingFileService.createArisingFile(request);
        return ResponseEntity.ok(ArisingFileResponse.builder()
                                                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                        Boolean.TRUE))
                                                    .arisingFile(arisingFile)
                                                    .build());
    }

//    @PostMapping("/arisingfiles/_update")
//    public ResponseEntity<ArisingFileResponse> update(@RequestBody ArisingFileRequest request) {
//
//        ArisingFile files = arisingFileService.updateArisingFile(request);
//
//        ArisingFileResponse response = ArisingFileResponse.builder()
//                                                          .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                                                                                                                              Boolean.TRUE))
//                                                          .arisingFileDetail(files)
//                                                          .build();
//
//        return ResponseEntity.ok(response);
//    }

    @Override
    @PostMapping("/arisingfiles/_search")
    public ResponseEntity<ArisingFileSearchResponse> search(@RequestBody final RequestInfoWrapper request,
                                                            @ModelAttribute final ArisingFileSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("arisingfiles-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ArisingFile> result = arisingFileService.searchFile(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ArisingFileSearchResponse.builder()
                                                          .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                              Boolean.TRUE))
                                                          .arisingFiles(result)
                                                          .build());
    }
}