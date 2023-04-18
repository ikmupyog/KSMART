package org.egov.filemgmnt.web.controllers;


import lombok.extern.slf4j.Slf4j;
import org.egov.filemgmnt.service.GlobalMasterServices;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.GlobalMaster.*;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
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
    @PostMapping("/Globalmaster/_createmodule")
    public ResponseEntity<ModuleDetailsResponse> createModuledetails(@RequestBody final ModuleDetailsRequest request) {
//        if (log.isDebugEnabled()) {
//            log.debug("Globalmaster/_createmodule:  \n{}", FMUtils.toJson(request));
//        }
        final ModuleDetails moduleDetails = globalMasterServices.createModule(request);
        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .moduleDetails(moduleDetails)
                .build());
    }

//    @PostMapping("/majorfunctiondetails/_create")
//    public ResponseEntity<MajorFunctionDetailsResponse> createMajorFunctionDetails(@RequestBody final MajorFunctionDetailsRequest request) {
//        if (log.isDebugEnabled()) {
//            log.debug("mjorfunctiondetails-create:  \n{}", FMUtils.toJson(request));
//        }
//        final MajorFunctionDetails majorFunctionDetails = globalMasterServices.createMF(request);
//        return ResponseEntity.ok(MajorFunctionDetailsResponse .builder()
//                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                        Boolean.TRUE))
//                .majorFunctionDetails(majorFunctionDetails)
//                .build());
//            }
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
//    @PostMapping("/servicedetails/_create")
//    public ResponseEntity<ServiceDetailsResponse>createServiceDetails(@RequestBody final ServiceDetailsRequest request){
//        if (log.isDebugEnabled()) {
//            log.debug("moduledetails-create:  \n{}", FMUtils.toJson(request));
//        }
//        final ServiceDetails serviceDetails = globalMasterServices.createService(request);
//       return ResponseEntity.ok(ServiceDetailsResponse .builder()
//                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                        Boolean.TRUE))
//                .serviceDetails(serviceDetails)
//                .build());
//    }
//
@PostMapping("/Globalmaster/_searchmodule")
public ResponseEntity<ModuleSearchResponse> searchModule(@RequestBody final RequestInfoWrapper request,
                                                            @ModelAttribute final ModuleSearchCriteria searchCriteria) {
    if (log.isDebugEnabled()) {
        log.debug("Globalmaster/_searchmodule:  \n{}", FMUtils.toJson(searchCriteria));
    }
    final List<ModuleDetails> result = globalMasterServices.searchModule(request.getRequestInfo(), searchCriteria);

    return ResponseEntity.ok(ModuleSearchResponse.builder()
            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                    Boolean.TRUE))
            .moduleDetails(result)
            .build());
}
    @PostMapping("/Globalmaster/_updatemodule")
    public ResponseEntity<ModuleDetailsResponse> updateModule(@RequestBody ModuleDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Globalmaster/_updatemodule:  \n{}", FMUtils.toJson(request));
        }

        final ModuleDetails moduleDetail = globalMasterServices.updateModule(request);

        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .moduleDetails(moduleDetail)
                .build());
          }


}
