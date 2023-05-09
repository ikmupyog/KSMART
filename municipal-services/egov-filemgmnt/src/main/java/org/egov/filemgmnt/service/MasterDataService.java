package org.egov.filemgmnt.service;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.MasterDataEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.MasterDataRepository;
import org.egov.filemgmnt.validators.MasterDataValidator;
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
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class MasterDataService {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    private final MasterDataValidator validator;
    private final MasterDataEnrichment enrichment;
    private final MasterDataRepository repository;

    MasterDataService(final MasterDataValidator validator, final MasterDataEnrichment enrichment,
                      final MasterDataRepository repository) {
        this.validator = validator;
        this.enrichment = enrichment;
        this.repository = repository;

    }

    public ModuleDetails createModule(final ModuleDetailsRequest request) {
        final ModuleDetails module = request.getModuleDetails();
        Assert.notNull(module, "Master data module detail must not be null");

        final ModuleDetails existing = findModuleByCode(module.getModuleCode());
        validator.validateCreate(request, existing);
        enrichment.enrichCreateModule(request);
        producer.push(fmConfig.getSaveModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails createMajorFunction(final MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();
        Assert.notNull(majorFunction, "Master data major function detail must not be null");

        final MajorFunctionDetails existing = findMajorFunctionByCode(majorFunction.getMajorFunctionCode());

        validator.validateCreate(request, existing);
        enrichment.enrichCreateMajorFunction(request);
        producer.push(fmConfig.getSaveMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails createSubFunction(final SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunction = request.getSubFunctionDetails();
        Assert.notNull(subFunction, "Master data sub function detail must not be null");

        // Duplicate sub function, do not create
        final SubFunctionDetails existing = findSubFunctionByCode(subFunction.getSubFunctionCode());

        validator.validateCreate(request, existing);
        enrichment.enrichCreateSubFunction(request);
        producer.push(fmConfig.getSaveSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails createService(final ServiceDetailsRequest request) {
        final ServiceDetails service = request.getServiceDetails();
        Assert.notNull(service, "Master data service detail must not be null");

        // Duplicate service, do not create
        final ServiceDetails existing = findServiceByCode(service.getServiceCode());

        validator.validateCreate(request, existing);
        enrichment.enrichCreateService(request);
        producer.push(fmConfig.getSaveServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public ModuleDetails updateModule(final ModuleDetailsRequest request) {
        final ModuleDetails module = request.getModuleDetails();

        // find existing
        final ModuleDetails existing = findModuleByCode(module.getModuleCode());

        // validate
        validator.validateUpdate(request, existing);

        // enrich
        enrichment.enrichUpdateModule(request, existing);

        // persist
        producer.push(fmConfig.getUpdateModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails updateMajorFunction(final MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        // find existing
        final MajorFunctionDetails existing = findMajorFunctionByCode(majorFunction.getMajorFunctionCode());

        // validate
        validator.validateUpdate(request, existing);

        // enrich
        enrichment.enrichUpdateMajorFunction(request, existing);

        // persist
        producer.push(fmConfig.getUpdateMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails updateSubFunction(final SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunction = request.getSubFunctionDetails();

        // search
        final SubFunctionDetails result = findSubFunctionByCode(subFunction.getSubFunctionCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data sub function not found.");
        }

        // validate existing
        validator.validateUpdate(request, result);

        // enrich
        enrichment.enrichUpdateSubFunction(request, result);

        // persist
        producer.push(fmConfig.getUpdateSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails updateService(final ServiceDetailsRequest request) {
        final ServiceDetails service = request.getServiceDetails();

        // search
        final ServiceDetails result = findServiceByCode(service.getServiceCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data service not found.");
        }
        // validate existing
        validator.validateUpdate(request, result);


        // enrich
        enrichment.enrichUpdateService(request, result);

        // persist
        producer.push(fmConfig.getUpdateServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public ModuleDetails deleteModule(final ModuleDetailsRequest request) {
        final ModuleDetails module = request.getModuleDetails();

        // search
        final ModuleDetails result = findModuleByCode(module.getModuleCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data module not found.");
        }

        enrichment.enrichDeleteModule(request);
        producer.push(fmConfig.getDeleteModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails deleteMajorFunction(final MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails majorFunction = request.getMajorFunctionDetails();

        // search
        final MajorFunctionDetails result = findMajorFunctionByCode(majorFunction.getMajorFunctionCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data major function not found.");
        }

        enrichment.enrichDeleteMajorFunction(request);
        producer.push(fmConfig.getDeleteMajorFunctionTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails deleteSubFunction(final SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunction = request.getSubFunctionDetails();

        // search
        final SubFunctionDetails result = findSubFunctionByCode(subFunction.getSubFunctionCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data sub function not found.");
        }

        enrichment.enrichDeleteSubFunction(request);
        producer.push(fmConfig.getDeleteSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails deleteService(final ServiceDetailsRequest request) {
        final ServiceDetails service = request.getServiceDetails();

        // search
        final ServiceDetails result = findServiceByCode(service.getServiceCode());
        if (result == null) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Master data service not found.");
        }

        enrichment.enrichDeleteService(request);
        producer.push(fmConfig.getDeleteServiceMasterTopic(), request);
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

    // FIND existing
    private ModuleDetails findModuleByCode(final String moduleCode) {
        List<ModuleDetails> results = repository.searchModules(ModuleSearchCriteria.builder()
                                                                                   .moduleCode(moduleCode)
                                                                                   .build());
        return CollectionUtils.isNotEmpty(results)
                ? results.get(0)
                : null;
    }

    private MajorFunctionDetails findMajorFunctionByCode(final String majorFunctionCode) {
        List<MajorFunctionDetails> results = repository.searchMajorFunctions(MajorFunctionSearchCriteria.builder()
                                                                                                        .majorFunctionCode(majorFunctionCode)
                                                                                                        .build());
        return CollectionUtils.isNotEmpty(results)
                ? results.get(0)
                : null;
    }

    private SubFunctionDetails findSubFunctionByCode(final String subFunctionCode) {
        List<SubFunctionDetails> results = repository.searchSubFunctions(SubFunctionSearchCriteria.builder()
                                                                                                  .subFunctionCode(subFunctionCode)
                                                                                                  .build());
        return CollectionUtils.isNotEmpty(results)
                ? results.get(0)
                : null;
    }

    private ServiceDetails findServiceByCode(final String serviceCode) {
        List<ServiceDetails> results = repository.searchServices(ServiceSearchCriteria.builder()
                                                                                      .serviceCode(serviceCode)
                                                                                      .build());
        return CollectionUtils.isNotEmpty(results)
                ? results.get(0)
                : null;
    }

}
