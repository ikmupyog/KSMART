package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.GlobalMasterEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.GlobalMasterRepository;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetailsRequest;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class GlobalMasterServices {

    private final FMConfiguration fmConfiguration;
    private final GlobalMasterEnrichment enrichment;
    private final GlobalMasterRepository repository;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    GlobalMasterServices(FMConfiguration fmConfiguration, Producer producer, GlobalMasterEnrichment enrichment,
                         GlobalMasterRepository repository) {
        this.fmConfiguration = fmConfiguration;
        this.producer = producer;
        this.enrichment = enrichment;
        this.repository = repository;
    }

    // create Moduledetails
    public ModuleDetails createModule(final ModuleDetailsRequest request) {
        enrichment.enrichCreateModule(request);
        producer.push(fmConfiguration.getSaveModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    // create MajorFunction
    public MajorFunctionDetails createMF(final MajorFunctionDetailsRequest request) {
        enrichment.enrichCreateMajorFunction(request);
        producer.push(fmConfiguration.getSaveMfMasterTopic(), request);
        return request.getMajorFunctionDetails();
    }

    // create Subfunction
    public SubFunctionDetails createSF(final SubFunctionDetailsRequest request) {
        enrichment.enrichCreateSubFunction(request);
        producer.push(fmConfiguration.getSaveSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    // create Servicedetails
    public ServiceDetails createService(ServiceDetailsRequest request) {
        enrichment.enrichCreateService(request);
        producer.push(fmConfiguration.getSaveServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public ModuleDetails updateModule(ModuleDetailsRequest request) {
        final ModuleDetails moduledetails = request.getModuleDetails();
        String mCode = null;
        mCode = moduledetails.getModuleCode();
        // search database
        List<ModuleDetails> searchResult = repository.searchModule(ModuleSearchCriteria.builder()
                                                                                       .moduleCode(mCode)
                                                                                       .build());
        // validate request
        // validator.validateUpdate(request, searchResult);
        enrichment.enrichUpdateModule(request);
        producer.push(fmConfiguration.getUpdateModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails updateMF(MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails mfDetails = request.getMajorFunctionDetails();
        String mfCode = mfDetails.getMajorFunctionCode();
        // search database
        List<MajorFunctionDetails> searchResult = repository.searchMF(MajorFunctionSearchCriteria.builder()
                                                                                                 .majorFunctionCode(mfCode)
                                                                                                 .build());
        // validate request
        // validator.validateUpdate(request, searchResult);
        enrichment.enrichUpdateMF(request);
        producer.push(fmConfiguration.getUpdateMfMasterTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails updateSF(SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunctionDetails = request.getSubFunctionDetails();
        String sfCode = null;
        sfCode = subFunctionDetails.getSubFunctionCode();
        // search database
        List<SubFunctionDetails> searchResult = repository.searchSF(SubFunctionSearchCriteria.builder()
                                                                                             .subFunctionCode(sfCode)
                                                                                             .build());
        enrichment.enrichUpdateSubFunction(request);
        producer.push(fmConfiguration.getUpdateSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails updateService(ServiceDetailsRequest request) {
        final ServiceDetails serviceDetails = request.getServiceDetails();
        String svcCode = serviceDetails.getServiceCode();
        // search database
        List<ServiceDetails> searchResult = repository.searchService(ServiceSearchCriteria.builder()
                                                                                          .serviceCode(svcCode)
                                                                                          .build());
        // validate request
        // validator.validateUpdate(request, searchResult);
        enrichment.enrichUpdateService(request);
        producer.push(fmConfiguration.getUpdateServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

    public List<ModuleDetails> searchModule(RequestInfo requestInfo, ModuleSearchCriteria searchCriteria) {
        final List<ModuleDetails> result = repository.searchModule(searchCriteria);
        return (result);
    }

    public List<MajorFunctionDetails> searchMF(RequestInfo requestInfo,
                                               final MajorFunctionSearchCriteria searchCriteria) {
        return repository.searchMF(searchCriteria);
    }

    public List<SubFunctionDetails> searchSF(RequestInfo requestInfo, SubFunctionSearchCriteria searchCriteria) {
        final List<SubFunctionDetails> result = repository.searchSF(searchCriteria);
        return (result);
    }

    public List<ServiceDetails> searchService(RequestInfo requestInfo, ServiceSearchCriteria searchCriteria) {
        final List<ServiceDetails> result = repository.searchService(searchCriteria);
        return (result);
    }

    public ModuleDetails deleteModule(ModuleDetailsRequest request) {
        final ModuleDetails mfDetails = request.getModuleDetails();
        String mCode = mfDetails.getModuleCode();
        // search database
        List<ModuleDetails> searchResult = repository.searchModule(ModuleSearchCriteria.builder()
                                                                                       .moduleCode(mCode)
                                                                                       .build());
        enrichment.enrichDeleteModule(request);
        producer.push(fmConfiguration.getDeleteModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    public MajorFunctionDetails deleteMF(MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails mfDetails = request.getMajorFunctionDetails();
        String mfCode = mfDetails.getMajorFunctionCode();
        // search database
        List<MajorFunctionDetails> searchResult = repository.searchMF(MajorFunctionSearchCriteria.builder()
                                                                                                 .majorFunctionCode(mfCode)
                                                                                                 .build());
        enrichment.enrichDeleteMF(request);
        producer.push(fmConfiguration.getDeleteMfMasterTopic(), request);
        return request.getMajorFunctionDetails();
    }

    public SubFunctionDetails deleteSF(SubFunctionDetailsRequest request) {
        final SubFunctionDetails sfDetails = request.getSubFunctionDetails();
        String sfCode = sfDetails.getSubFunctionCode();
        // search database
        List<SubFunctionDetails> searchResult = repository.searchSF(SubFunctionSearchCriteria.builder()
                                                                                             .subFunctionCode(sfCode)
                                                                                             .build());
        enrichment.enrichDeleteSF(request);
        producer.push(fmConfiguration.getDeleteSubFunctionTopic(), request);
        return request.getSubFunctionDetails();
    }

    public ServiceDetails deleteService(ServiceDetailsRequest request) {
        final ServiceDetails serviceDetails = request.getServiceDetails();
        String svcCode = serviceDetails.getServiceCode();
        // search database
        List<ServiceDetails> searchResult = repository.searchService(ServiceSearchCriteria.builder()
                                                                                          .serviceCode(svcCode)
                                                                                          .build());
        enrichment.enrichDeleteService(request);
        producer.push(fmConfiguration.getDeleteServiceMasterTopic(), request);
        return request.getServiceDetails();
    }

}
