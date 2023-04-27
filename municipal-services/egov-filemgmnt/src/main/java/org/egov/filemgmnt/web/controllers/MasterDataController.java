package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.MasterDataService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetails;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchResponse;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsResponse;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
public class MasterDataController implements MasterDataBaseController {

    private final ResponseInfoFactory responseInfoFactory;
    private final MasterDataService masterDataService;

    MasterDataController(final ResponseInfoFactory responseInfoFactory, final MasterDataService masterDataService) {
        this.masterDataService = masterDataService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @Override
    @PostMapping("/masterdata/modules/_create")
    public ResponseEntity<ModuleDetailsResponse> createModule(@RequestBody final ModuleDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-modules-create:  \n{}", FMUtils.toJson(request));
        }
        final ModuleDetails moduleDetails = masterDataService.createModule(request);
        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .moduleDetails(moduleDetails)
                                                      .build());
    }

    @Override
    @PostMapping("/masterdata/majorfunctions/_create")
    public ResponseEntity<MajorFunctionDetailsResponse> createMajorFunction(@RequestBody final MajorFunctionDetailsRequest request) {

        final MajorFunctionDetails majorFunctionDetails = masterDataService.createMF(request);
        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                                                             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                 Boolean.TRUE))
                                                             .majorFunctionDetails(majorFunctionDetails)
                                                             .build());
    }

    @Override
    @PostMapping("/masterdata/subfunctions/_create")
    public ResponseEntity<SubFunctionDetailsResponse> createSubFunction(@RequestBody SubFunctionDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-subfunctions-create:  \n{}", FMUtils.toJson(request));
        }
        final SubFunctionDetails subFunctionDetails = masterDataService.createSF(request);
        return ResponseEntity.ok(SubFunctionDetailsResponse.builder()
                                                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                               Boolean.TRUE))
                                                           .subFunctionDetails(subFunctionDetails)
                                                           .build());
    }

    @Override
    @PostMapping("/masterdata/services/_create")
    public ResponseEntity<ServiceDetailsResponse> createService(@RequestBody final ServiceDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-services-create:  \n{}", FMUtils.toJson(request));
        }
        final ServiceDetails serviceDetails = masterDataService.createService(request);
        return ResponseEntity.ok(ServiceDetailsResponse.builder()
                                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                           Boolean.TRUE))
                                                       .serviceDetails(serviceDetails)
                                                       .build());
    }

    @Override
    @PutMapping("/masterdata/modules/_update")
    public ResponseEntity<ModuleDetailsResponse> updateModule(@RequestBody ModuleDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-modules-update:  \n{}", FMUtils.toJson(request));
        }

        final ModuleDetails moduleDetail = masterDataService.updateModule(request);

        return ResponseEntity.ok(ModuleDetailsResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .moduleDetails(moduleDetail)
                                                      .build());

    }

    @Override
    @PutMapping("/masterdata/majorfunctions/_update")
    public ResponseEntity<MajorFunctionDetailsResponse> updateMajorFunction(@RequestBody MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails mfDetails = masterDataService.updateMF(request);

        return ResponseEntity.ok(MajorFunctionDetailsResponse.builder()
                                                             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                 Boolean.TRUE))
                                                             .majorFunctionDetails(mfDetails)
                                                             .build());
    }

    @Override
    @PutMapping("/masterdata/subfunctions/_update")
    public ResponseEntity<SubFunctionDetailsResponse> updateSubFunction(@RequestBody SubFunctionDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-subfunctions-update:  \n{}", FMUtils.toJson(request));
        }

        final SubFunctionDetails subFunctionDetail = masterDataService.updateSF(request);

        return ResponseEntity.ok(SubFunctionDetailsResponse.builder()
                                                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                               Boolean.TRUE))
                                                           .subFunctionDetails(subFunctionDetail)
                                                           .build());
    }

    @Override
    @PutMapping("/masterdata/services/_update")
    public ResponseEntity<ServiceDetailsResponse> updateService(@RequestBody ServiceDetailsRequest request) {

        final ServiceDetails serviceDetails = masterDataService.updateService(request);

        return ResponseEntity.ok(ServiceDetailsResponse.builder()
                                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                           Boolean.TRUE))
                                                       .serviceDetails(serviceDetails)
                                                       .build());
    }

    @Override
    @PostMapping("/masterdata/modules/_search")
    public ResponseEntity<ModuleSearchResponse> searchModules(@RequestBody final RequestInfoWrapper request,
                                                              @ModelAttribute final ModuleSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-modules-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ModuleDetails> result = masterDataService.searchModule(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ModuleSearchResponse.builder()
                                                     .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                         Boolean.TRUE))
                                                     .moduleDetails(result)
                                                     .build());
    }

    @Override
    @PostMapping("/masterdata/majorfunctions/_search")
    public ResponseEntity<MajorFunctionSearchResponse> searchMajorFunctions(@RequestBody final RequestInfoWrapper request,
                                                                            @ModelAttribute MajorFunctionSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-majorfunctions-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<MajorFunctionDetails> result = masterDataService.searchMF(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(MajorFunctionSearchResponse.builder()
                                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                Boolean.TRUE))
                                                            .majorFunctionDetails(result)
                                                            .build());
    }

    @Override
    @PostMapping("/masterdata/subfunctions/_search")
    public ResponseEntity<SubFunctionSearchResponse> searchSubFunctions(@RequestBody final RequestInfoWrapper request,
                                                                        @ModelAttribute final SubFunctionSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-subfunctions-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<SubFunctionDetails> result = masterDataService.searchSF(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(SubFunctionSearchResponse.builder()
                                                          .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                              Boolean.TRUE))
                                                          .subFunctionDetails(result)
                                                          .build());
    }

    @Override
    @PostMapping("/masterdata/services/_search")
    public ResponseEntity<ServiceSearchResponse> searchServices(@RequestBody final RequestInfoWrapper request,
                                                                @ModelAttribute final ServiceSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("masterdata-services-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ServiceDetails> result = masterDataService.searchService(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ServiceSearchResponse.builder()
                                                      .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                          Boolean.TRUE))
                                                      .serviceDetails(result)
                                                      .build());
    }

    @Override
    @DeleteMapping("/masterdata/modules/_delete")
    public ResponseEntity<Void> deleteModule(@RequestBody ModuleDetailsRequest request) {
        return ResponseEntity.noContent()
                             .build();
    }

    @Override
    @DeleteMapping("/masterdata/majorfunctions/_delete")
    public ResponseEntity<Void> deleteMajorFunction(@RequestBody MajorFunctionDetailsRequest request) {
        return ResponseEntity.noContent()
                             .build();
    }

    @Override
    @DeleteMapping("/masterdata/subfunctions/_delete")
    public ResponseEntity<Void> deleteSubFunction(@RequestBody SubFunctionDetailsRequest request) {
        return ResponseEntity.noContent()
                             .build();
    }

    @Override
    @DeleteMapping("/masterdata/services/_delete")
    public ResponseEntity<Void> deleteService(@RequestBody ServiceDetailsRequest request) {
        return ResponseEntity.noContent()
                             .build();
    }
}
