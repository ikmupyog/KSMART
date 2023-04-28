package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.DraftFilesService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateResponse;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFileResponse;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;

@Slf4j
@RestController
@RequestMapping("/v1")
public class DraftFilesController implements DraftFilesBaseController {
    private final ResponseInfoFactory responseInfoFactory;
    private final DraftFilesService draftFileService;

    DraftFilesController(final DraftFilesService draftFileService, final ResponseInfoFactory responseInfoFactory) {
        this.draftFileService = draftFileService;
        this.responseInfoFactory = responseInfoFactory;

    }

    @Override
    @PostMapping("/draftfiles/_create")
    public ResponseEntity<DraftFileResponse> create(@RequestBody final DraftFileRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("draftfiles-create:  \n{}", FMUtils.toJson(request));
        }

        final DraftFile result = draftFileService.createDraftFile(request);
        return ResponseEntity.ok(DraftFileResponse.builder()
                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                      Boolean.TRUE))
                                                  .draftFile(result)
                                                  .build());
    }


    @Override
    @PutMapping("/draftfiles/_update")
    public ResponseEntity<DraftFileResponse> update(@RequestBody final DraftFileRequest request,
                                                    @RequestParam final String mode) {

        DraftFile result = null;
        if (StringUtils.equals(mode, "STATUS")) {
            result = draftFileService.updateStatus(request);
        } else {
            result = draftFileService.updateDraftFile(request);
        }

        return ResponseEntity.ok(DraftFileResponse.builder()
                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                      Boolean.TRUE))
                                                  .draftFile(result)
                                                  .build());
    }

    @Override
    @PostMapping("/draftfiles/_search")
    public ResponseEntity<DraftFileSearchResponse> search(@RequestBody final RequestInfoWrapper request,
                                                          @ModelAttribute DraftFileSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("draftfiles-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<DraftFile> result = draftFileService.search(request.getRequestInfo(), searchCriteria);
        return ResponseEntity.ok(DraftFileSearchResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .draftings(result)
                                                        .build());
    }

    @Override
    @PostMapping("/draftfiles/_download")
    public ResponseEntity<DraftCertificateResponse> download(@RequestBody final RequestInfoWrapper request,
                                                             @ModelAttribute final DraftFileSearchCriteria searchCriteria) {

        final List<DraftCertificateDetails> certificateDetails = draftFileService.downloadDraftCertificate(request.getRequestInfo(),
                                                                                                           searchCriteria);
        return ResponseEntity.ok(DraftCertificateResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .draftCertificateDetails(certificateDetails)
                                                         .build());
    }

}
