package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.MasterDataEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.MasterDataRepository;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetails;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class MasterDataService { // NOPMD

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    private final MasterDataEnrichment enrichment;
    private final MasterDataRepository repository;

    MasterDataService(final MasterDataEnrichment enrichment, final MasterDataRepository repository) {
        this.enrichment = enrichment;
        this.repository = repository;
    }

    public ModuleDetails createModule(final ModuleDetailsRequest request) {
        enrichment.enrichCreateModule(request);
        producer.push(fmConfig.getSaveModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails createMajorFunction(final MajorFunctionDetailsRequest request) {
        enrichment.enrichCreateMajorFunction(request);
        producer.push(fmConfig.getSaveMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails createSubFunction(final SubFunctionDetailsRequest request) {
        enrichment.enrichCreateSubFunction(request);
        producer.push(fmConfig.getSaveSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails createService(ServiceDetailsRequest request) {
        enrichment.enrichCreateService(request);
        producer.push(fmConfig.getSaveServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public ModuleDetails updateModule(ModuleDetailsRequest request) {
//        final ModuleDetails module = request.getModuleDetails();

        // search database
//        List<ModuleDetails> results = repository.searchModules(ModuleSearchCriteria.builder()
//                                                                                   .moduleCode(module.getModuleCode())
//                                                                                   .build());
        // validate
//        validator.validateUpdate(request, results);

        // enrich
        enrichment.enrichUpdateModule(request);

        // persist
        producer.push(fmConfig.getUpdateModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails updateMajorFunction(MajorFunctionDetailsRequest request) {
//        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        // search
//        List<MajorFunctionDetails> results = repository.searchMajorFunctions(MajorFunctionSearchCriteria.builder()
//                                                                                                        .majorFunctionCode(majorFunction.getMajorFunctionCode())
//                                                                                                        .build());
        // validate request
//        validator.validateUpdate(request, results);

        // enrichment
        enrichment.enrichUpdateMajorFunction(request);

        // persist
        producer.push(fmConfig.getUpdateMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails updateSubFunction(SubFunctionDetailsRequest request) {
//        final SubFunctionDetails subFunction = request.getSubFunctionDetails();

        // search
//        List<SubFunctionDetails> results = repository.searchSubFunctions(SubFunctionSearchCriteria.builder()
//                                                                                                  .subFunctionCode(subFunction.getSubFunctionCode())
//                                                                                                  .build());
        // enrich
        enrichment.enrichUpdateSubFunction(request);

        // persist
        producer.push(fmConfig.getUpdateSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails updateService(ServiceDetailsRequest request) {
//        final ServiceDetails service = request.getServiceDetails();

        // search
//        List<ServiceDetails> results = repository.searchServices(ServiceSearchCriteria.builder()
//                                                                                      .serviceCode(service.getServiceCode())
//                                                                                      .build());
        // validate
//         validator.validateUpdate(request, results);

        // enrich
        enrichment.enrichUpdateService(request);

        // persist
        producer.push(fmConfig.getUpdateServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public List<ModuleDetails> searchModules(final RequestInfo requestInfo, final ModuleSearchCriteria searchCriteria) {
        return repository.searchModules(searchCriteria);
    }

    public List<MajorFunctionDetails> searchMajorFunctions(final RequestInfo requestInfo,
                                                           final MajorFunctionSearchCriteria searchCriteria) {
        return repository.searchMajorFunctions(searchCriteria);
    }

    public List<SubFunctionDetails> searchSubFunctions(final RequestInfo requestInfo,
                                                       final SubFunctionSearchCriteria searchCriteria) {
        return repository.searchSubFunctions(searchCriteria);
    }

    public List<ServiceDetails> searchServices(final RequestInfo requestInfo,
                                               final ServiceSearchCriteria searchCriteria) {
        return repository.searchServices(searchCriteria);
    }

    public ModuleDetails deleteModule(final ModuleDetailsRequest request) {
//        final ModuleDetails module = request.getModuleDetails();

        // search database
//        List<ModuleDetails> results = repository.searchModules(ModuleSearchCriteria.builder()
//                                                                                   .moduleCode(module.getModuleCode())
//                                                                                   .build());
        enrichment.enrichDeleteModule(request);
        producer.push(fmConfig.getDeleteModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails deleteMajorFunction(final MajorFunctionDetailsRequest request) {
//        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        // search database
//        List<MajorFunctionDetails> results = repository.searchMajorFunctions(MajorFunctionSearchCriteria.builder()
//                                                                                                        .majorFunctionCode(majorFunction.getMajorFunctionCode())
//                                                                                                        .build());
        enrichment.enrichDeleteMajorFunction(request);
        producer.push(fmConfig.getDeleteMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails deleteSubFunction(final SubFunctionDetailsRequest request) {
//        final SubFunctionDetails subFunction = request.getSubFunctionDetails();

        // search database
//        List<SubFunctionDetails> results = repository.searchSubFunctions(SubFunctionSearchCriteria.builder()
//                                                                                                  .subFunctionCode(subFunction.getSubFunctionCode())
//                                                                                                  .build());
        enrichment.enrichDeleteSubFunction(request);
        producer.push(fmConfig.getDeleteSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails deleteService(final ServiceDetailsRequest request) {
//        final ServiceDetails service = request.getServiceDetails();

        // search database
//        List<ServiceDetails> results = repository.searchServices(ServiceSearchCriteria.builder()
//                                                                                      .serviceCode(service.getServiceCode())
//                                                                                      .build());
        enrichment.enrichDeleteService(request);
        producer.push(fmConfig.getDeleteServiceMasterTopic(), request);
        return request.getServiceDetails();
    }
}
