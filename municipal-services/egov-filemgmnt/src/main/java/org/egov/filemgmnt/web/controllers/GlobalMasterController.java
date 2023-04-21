package org.egov.filemgmnt.web.controllers;


import lombok.extern.slf4j.Slf4j;
import org.egov.filemgmnt.service.GlobalMasterServices;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.GlobalMaster.*;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchResponse;
import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.egov.filemgmnt.web.models.drafting.DraftFilesRequest;
import org.egov.filemgmnt.web.models.drafting.DraftFilesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/v1")

public class GlobalMasterController {
    @Autowired
    private final ResponseInfoFactory responseInfoFactory;
    private final GlobalMasterServices globalMasterServices;

    GlobalMasterController(final  ResponseInfoFactory responseInfoFactory, final GlobalMasterServices globalMasterServices) {
        this.globalMasterServices = globalMasterServices;
        this.responseInfoFactory = responseInfoFactory;
    }
    @PostMapping("/moduledetails/_create")
    public ResponseEntity<ModuleDetailsResponse> createModuledetails(@RequestBody final ModuleDetailsRequest request) {
//        if (log.isDebugEnabled()) {
//            log.debug("moduledetails-create:  \n{}", FMUtils.toJson(request));
//        }
        final ModuleDetails moduleDetails = globalMasterServices.createModule(request);
        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .moduleDetails(moduleDetails)
                .build());
    }
    @PostMapping("/globalmaster/_createMF")
    public ResponseEntity<MajorFunctionDetailsResponse> createMajorFunctionDetails(@RequestBody final MajorFunctionDetailsRequest request) {

        final MajorFunctionDetails majorFunctionDetails = globalMasterServices.createMF(request);
        return ResponseEntity.ok(MajorFunctionDetailsResponse .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .majorFunctionDetails(majorFunctionDetails)
                .build());
    }
//
//    @PostMapping("/subfunctiondetails/_create")
//    public ResponseEntity<SubFunctionDetailsResponse> createSubFunction(@RequestBody SubFunctionDetailsRequest request) {
//        if (log.isDebugEnabled()) {
//            log.debug("subfunction-create:  \n{}", FMUtils.toJson(request));
//        }
//        final SubFunctionDetails subFunctionDetails = globalMasterServices.createSF(request);
//        return ResponseEntity.ok(SubFunctionDetailsResponse .builder()
//                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                        Boolean.TRUE))
//                .subFunctionDetails(subFunctionDetails)
//                .build());
//    }
    @PostMapping("/globalmaster/_createService")
    public ResponseEntity<ServiceDetailsResponse>createServiceDetails(@RequestBody final ServiceDetailsRequest request){
        if (log.isDebugEnabled()) {
            log.debug("moduledetails-create:  \n{}", FMUtils.toJson(request));
        }
        final ServiceDetails serviceDetails = globalMasterServices.createService(request);
       return ResponseEntity.ok(ServiceDetailsResponse .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .serviceDetails(serviceDetails)
                .build());
    }

@PostMapping("/moduledetails/_search")
public ResponseEntity<ModuleSearchResponse> searchModule(@RequestBody final RequestInfoWrapper request,
                                                            @ModelAttribute final ModuleSearchCriteria searchCriteria) {
    if (log.isDebugEnabled()) {
        log.debug("Moduledetails_search:  \n{}", FMUtils.toJson(searchCriteria));
    }
    final List<ModuleDetails> result = globalMasterServices.searchModule(request.getRequestInfo(), searchCriteria);

    return ResponseEntity.ok(ModuleSearchResponse.builder()
            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                    Boolean.TRUE))
            .moduleDetails(result)
            .build());
}
    @PostMapping("/moduledetails/_update")
    public ResponseEntity<ModuleDetailsResponse> updateModule(@RequestBody ModuleDetailsRequest request) {

        final ModuleDetails moduleDetail = globalMasterServices.updateModule(request);

        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .moduleDetails(moduleDetail)
                .build());
          }
    @PostMapping("/globalmaster/_updateMF")
    public ResponseEntity<MajorFunctionDetailsResponse> updateMF(@RequestBody MajorFunctionDetailsRequest request) {

        final MajorFunctionDetails mfDetails = globalMasterServices.updateMF(request);

        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .majorFunctionDetails(mfDetails)
                .build());
    }

    @PostMapping("/globalmaster/_searchMF")
    public ResponseEntity<MajorFunctionSearchResponse> searchMF(@RequestBody final RequestInfoWrapper request,
                                                             @ModelAttribute  MajorFunctionSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("MajorFunction_search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<MajorFunctionDetails> result = globalMasterServices.searchMF(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(MajorFunctionSearchResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .majorFunctionDetails(result)
                .build());
    }

    @PostMapping("/globalmaster/_deleteMF")
    public ResponseEntity<MajorFunctionDetailsResponse> deleteMF(@RequestBody MajorFunctionDetailsRequest request) {

        final MajorFunctionDetails mfDetails = globalMasterServices.deleteMF(request);

        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .majorFunctionDetails(mfDetails)
                .build());
    }

    @PostMapping("/globalmaster/_updateService")
    public ResponseEntity<ServiceDetailsResponse> updateMF(@RequestBody ServiceDetailsRequest request) {

        final ServiceDetails serviceDetails = globalMasterServices.updateService(request);

        return ResponseEntity.ok(ServiceDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .serviceDetails(serviceDetails)
                .build());
    }

    @PostMapping("/globalmaster/_deleteService")
    public ResponseEntity<ServiceDetailsResponse> deleteService(@RequestBody ServiceDetailsRequest request) {

        final ServiceDetails serviceDetails = globalMasterServices.deleteService(request);

        return ResponseEntity.ok(ServiceDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .serviceDetails(serviceDetails)
                .build());
    }

}
