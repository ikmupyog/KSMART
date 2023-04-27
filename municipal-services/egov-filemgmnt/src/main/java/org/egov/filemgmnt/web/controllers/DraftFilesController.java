package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.DraftFilesService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateResponse;
import org.egov.filemgmnt.web.models.dratfile.DraftFile;
import org.egov.filemgmnt.web.models.dratfile.DraftFileRequest;
import org.egov.filemgmnt.web.models.dratfile.DraftFileResponse;
import org.egov.filemgmnt.web.models.dratfile.DraftFileSearchCriteria;
import org.egov.filemgmnt.web.models.dratfile.DraftFileSearchResponse;
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
public class DraftFilesController {
    private final ResponseInfoFactory responseInfoFactory;
    private final DraftFilesService draftingService;

    DraftFilesController(final DraftFilesService draftingService, final ResponseInfoFactory responseInfoFactory) {
        this.draftingService = draftingService;
        this.responseInfoFactory = responseInfoFactory;

    }

    @PostMapping("/draftfiles/_create")
    public ResponseEntity<DraftFileResponse> createDraftingMain(@RequestBody final DraftFileRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting main-create:  \n{}", FMUtils.toJson(request));
        }
        List<DraftFile> draftingDetails = draftingService.create(request);

        DraftFileResponse response = DraftFileResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(draftingDetails)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_update")
    public ResponseEntity<DraftFileResponse> updateDrafting(@RequestBody DraftFileRequest request) {

        List<DraftFile> files = draftingService.update(request);

        DraftFileResponse response = DraftFileResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(files)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_updateStatus")
    public ResponseEntity<DraftFileResponse> updateDraftingStatus(@RequestBody DraftFileRequest request) {

        List<DraftFile> drfiles = draftingService.updateDraftingStatus(request);

        DraftFileResponse response = DraftFileResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(drfiles)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_search")
    public ResponseEntity<DraftFileSearchResponse> searchDraft(@RequestBody final RequestInfoWrapper request,
                                                               @ModelAttribute DraftFileSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<DraftFile> result = draftingService.search(request.getRequestInfo(), searchCriteria);
        return ResponseEntity.ok(DraftFileSearchResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .draftings(result)
                                                         .build());
    }

    @PostMapping("/applicantservices/_downloadDraftPdf")
    public ResponseEntity<DraftCertificateResponse> downloadDraftCertificate(@RequestBody final RequestInfoWrapper request,
                                                                             @ModelAttribute final DraftFileSearchCriteria searchCriteria) {

        final List<DraftCertificateDetails> certificateDetails = draftingService.downloadDraftCertificate(request.getRequestInfo(),
                                                                                                          searchCriteria);
        return ResponseEntity.ok(DraftCertificateResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .draftCertificateDetails(certificateDetails)
                                                         .build());
    }

}
