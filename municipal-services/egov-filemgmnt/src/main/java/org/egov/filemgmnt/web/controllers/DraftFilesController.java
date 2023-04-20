package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.DraftFilesService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateResponse;
import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.egov.filemgmnt.web.models.drafting.DraftFilesRequest;
import org.egov.filemgmnt.web.models.drafting.DraftFilesResponse;
import org.egov.filemgmnt.web.models.drafting.DraftFilesSearchCriteria;
import org.egov.filemgmnt.web.models.drafting.DraftFilesSearchResponse;
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
    public ResponseEntity<DraftFilesResponse> createDraftingMain(@RequestBody final DraftFilesRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting main-create:  \n{}", FMUtils.toJson(request));
        }
        List<DraftFiles> draftingDetails = draftingService.create(request);

        DraftFilesResponse response = DraftFilesResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(draftingDetails)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_update")
    public ResponseEntity<DraftFilesResponse> updateDrafting(@RequestBody DraftFilesRequest request) {

        List<DraftFiles> files = draftingService.update(request);

        DraftFilesResponse response = DraftFilesResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(files)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_updateStatus")
    public ResponseEntity<DraftFilesResponse> updateDraftingStatus(@RequestBody DraftFilesRequest request) {

        List<DraftFiles> drfiles = draftingService.updateDraftingStatus(request);

        DraftFilesResponse response = DraftFilesResponse.builder()
                                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                            Boolean.TRUE))
                                                        .drafting(drfiles)
                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/draftfiles/_search")
    public ResponseEntity<DraftFilesSearchResponse> searchDraft(@RequestBody final RequestInfoWrapper request,
                                                                @ModelAttribute DraftFilesSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<DraftFiles> result = draftingService.search(request.getRequestInfo(), searchCriteria);
        return ResponseEntity.ok(DraftFilesSearchResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .draftings(result)
                                                         .build());
    }

    @PostMapping("/applicantservices/_downloadDraftPdf")
    public ResponseEntity<DraftCertificateResponse> downloadDraftCertificate(@RequestBody final RequestInfoWrapper request,
                                                                             @ModelAttribute final DraftFilesSearchCriteria searchCriteria) {

        final List<DraftCertificateDetails> certificateDetails = draftingService.downloadDraftCertificate(request.getRequestInfo(),
                                                                                                          searchCriteria);
        return ResponseEntity.ok(DraftCertificateResponse.builder()
                                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                             Boolean.TRUE))
                                                         .draftCertificateDetails(certificateDetails)
                                                         .build());
    }

}
