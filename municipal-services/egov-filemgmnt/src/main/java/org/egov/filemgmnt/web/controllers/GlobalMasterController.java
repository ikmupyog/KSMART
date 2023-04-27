package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.GlobalMasterServices;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionSearchResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetailsResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetailsResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceSearchResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

public class GlobalMasterController {
    @Autowired
    private final ResponseInfoFactory responseInfoFactory;
    private final GlobalMasterServices globalMasterServices;

    GlobalMasterController(final ResponseInfoFactory responseInfoFactory,
                           final GlobalMasterServices globalMasterServices) {
        this.globalMasterServices = globalMasterServices;
        this.responseInfoFactory = responseInfoFactory;
    }

    @PostMapping("/globalmaster/_createmodule")
    public ResponseEntity<ModuleDetailsResponse> createModuledetails(@RequestBody final ModuleDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("globalmaster/_createmodule:  \n{}", FMUtils.toJson(request));
        }
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
        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                                                             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                 Boolean.TRUE))
                                                             .majorFunctionDetails(majorFunctionDetails)
                                                             .build());
    }

    @PostMapping("/globalmaster/_createSF")
    public ResponseEntity<SubFunctionDetailsResponse> createSubFunction(@RequestBody SubFunctionDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("globalmaster/_createSF:  \n{}", FMUtils.toJson(request));
        }
        final SubFunctionDetails subFunctionDetails = globalMasterServices.createSF(request);
        return ResponseEntity.ok(SubFunctionDetailsResponse.builder()
                                                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                               Boolean.TRUE))
                                                           .subFunctionDetails(subFunctionDetails)
                                                           .build());
    }

    @PostMapping("/globalmaster/_createService")
    public ResponseEntity<ServiceDetailsResponse> createServiceDetails(@RequestBody final ServiceDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("moduledetails-create:  \n{}", FMUtils.toJson(request));
        }
        final ServiceDetails serviceDetails = globalMasterServices.createService(request);
        return ResponseEntity.ok(ServiceDetailsResponse.builder()
                                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                           Boolean.TRUE))
                                                       .serviceDetails(serviceDetails)
                                                       .build());
    }

    @PostMapping("/globalmaster/_updatemodule")
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

    @PostMapping("/globalmaster/_updateMF")
    public ResponseEntity<MajorFunctionDetailsResponse> updateMF(@RequestBody MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails mfDetails = globalMasterServices.updateMF(request);

        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                                                             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                 Boolean.TRUE))
                                                             .majorFunctionDetails(mfDetails)
                                                             .build());
    }

    @PostMapping("/globalmaster/_updateSF")
    public ResponseEntity<SubFunctionDetailsResponse> updateSF(@RequestBody SubFunctionDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Globalmaster/_updateSF:  \n{}", FMUtils.toJson(request));
        }

        final SubFunctionDetails subFunctionDetail = globalMasterServices.updateSF(request);

        return ResponseEntity.ok(SubFunctionDetailsResponse.builder()
                                                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                               Boolean.TRUE))
                                                           .subFunctionDetails(subFunctionDetail)
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

    @PostMapping("/globalmaster/_searchmodule")
    public ResponseEntity<ModuleSearchResponse> searchModule(@RequestBody final RequestInfoWrapper request,
                                                             @ModelAttribute final ModuleSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("globalmaster/_searchmodule:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ModuleDetails> result = globalMasterServices.searchModule(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ModuleSearchResponse.builder()
                                                     .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                         Boolean.TRUE))
                                                     .moduleDetails(result)
                                                     .build());
    }

    @PostMapping("/globalmaster/_searchMF")
    public ResponseEntity<MajorFunctionSearchResponse> searchMF(@RequestBody final RequestInfoWrapper request,
                                                                @ModelAttribute MajorFunctionSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("MajorFunction_search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<MajorFunctionDetails> result = globalMasterServices.searchMF(request.getRequestInfo(),
                                                                                searchCriteria);

        return ResponseEntity.ok(MajorFunctionSearchResponse.builder()
                                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                Boolean.TRUE))
                                                            .majorFunctionDetails(result)
                                                            .build());
    }

    @PostMapping("/globalmaster/_searchSF")
    public ResponseEntity<SubFunctionSearchResponse> searchSF(@RequestBody final RequestInfoWrapper request,
                                                              @ModelAttribute final SubFunctionSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("globalmaster/_searchSF:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<SubFunctionDetails> result = globalMasterServices.searchSF(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(SubFunctionSearchResponse.builder()
                                                          .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                              Boolean.TRUE))
                                                          .subFunctionDetails(result)
                                                          .build());
    }

    @PostMapping("/globalmaster/_searchService")
    public ResponseEntity<ServiceSearchResponse> searchService(@RequestBody final RequestInfoWrapper request,
                                                               @ModelAttribute final ServiceSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("globalmaster/_searchService:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ServiceDetails> result = globalMasterServices.searchService(request.getRequestInfo(),
                                                                               searchCriteria);

        return ResponseEntity.ok(ServiceSearchResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .serviceDetails(result)
                                                      .build());
    }

    @PostMapping("/globalmaster/_deleteModule")
    public ResponseEntity<ModuleDetailsResponse> deleteModule(@RequestBody ModuleDetailsRequest request) {

        final ModuleDetails moduleDetail = globalMasterServices.deleteModule(request);

        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .moduleDetails(moduleDetail)
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

    @PostMapping("/globalmaster/_deleteSF")
    public ResponseEntity<SubFunctionDetailsResponse> deleteMF(@RequestBody SubFunctionDetailsRequest request) {
        final SubFunctionDetails sfDetails = globalMasterServices.deleteSF(request);
        return ResponseEntity.ok(SubFunctionDetailsResponse.builder()
                                                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                               Boolean.TRUE))
                                                           .subFunctionDetails(sfDetails)
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
