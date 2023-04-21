package org.egov.filemgmnt.service;


import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.GlobalMasterEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.GlobalMasterRepository;
import org.egov.filemgmnt.web.models.GlobalMaster.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlobalMasterServices {
    @Autowired
    private FMConfiguration fmConfiguration;
    private GlobalMasterEnrichment enrichment;
    private GlobalMasterRepository repository;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    GlobalMasterServices(FMConfiguration fmConfiguration, Producer producer, GlobalMasterEnrichment enrichment, GlobalMasterRepository repository) {
        this.fmConfiguration = fmConfiguration;
        this.producer = producer;
        this.enrichment = enrichment;
        this.repository = repository;
    }

    //create Moduledetails
    public ModuleDetails createModule(final ModuleDetailsRequest request) {
        final ModuleDetails moduleDetails = request.getModuleDetails();
        enrichment.enrichCreateModule(request);
        producer.push(fmConfiguration.getSaveModuleMasterTopic(), request);
        return request.getModuleDetails();
    }

    //create MajorFunction
    public MajorFunctionDetails createMF(final MajorFunctionDetailsRequest request) {
        enrichment.enrichCreateMajorFunction(request);
        producer.push(fmConfiguration.getSaveMfMasterTopic(), request);
        return request.getMajorFunctionDetails();
    }
//    //create Subfunction
//    public  SubFunctionDetails createSF(SubFunctionDetailsRequest request) {
//        GlobalMasterEnrichment.enrichCreateSubFunction(request);
//        producer.push(fmConfiguration.getSaveSubFunctionTopic(),request);
//        return request.getSubFunctionDetails();
//    }
    //create Servicedetails
    public ServiceDetails createService(ServiceDetailsRequest request){
       enrichment.enrichCreateService(request);
        producer.push(fmConfiguration.getSaveServiceMasterTopic(),request);
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
        //  validator.validateUpdate(request, searchResult);

        enrichment.enrichUpdateModule(request);

        producer.push(fmConfiguration.getUpdateModuleMasterTopic(), request);

        return request.getModuleDetails();

    }

    public List<ModuleDetails> searchModule(RequestInfo requestInfo, ModuleSearchCriteria searchCriteria) {
        final List<ModuleDetails> result = repository.searchModule(searchCriteria);
        return (result);
    }

    public MajorFunctionDetails updateMF(MajorFunctionDetailsRequest request) {
        final MajorFunctionDetails mfDetails = request.getMajorFunctionDetails();

        String mfCode = mfDetails.getMajorFunctionCode();

        // search database
        List<MajorFunctionDetails> searchResult = repository.searchMF(MajorFunctionSearchCriteria.builder()
                .majorFunctionCode(mfCode)
                .build());
        // validate request
        //  validator.validateUpdate(request, searchResult);

        enrichment.enrichUpdateMF(request);

        producer.push(fmConfiguration.getUpdateMfMasterTopic(), request);

        return request.getMajorFunctionDetails();

    }
    public List<MajorFunctionDetails> searchMF(RequestInfo requestInfo, final MajorFunctionSearchCriteria searchCriteria) {
      return repository.searchMF(searchCriteria);

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

    public ServiceDetails updateService(ServiceDetailsRequest request) {

        final ServiceDetails serviceDetails = request.getServiceDetails();

        String svcCode = serviceDetails.getServiceCode();

        // search database
        List<ServiceDetails> searchResult = repository.searchService(ServiceSearchCriteria.builder()
                .serviceCode(svcCode)
                .build());
        // validate request
        //  validator.validateUpdate(request, searchResult);

        enrichment.enrichUpdateService(request);

        producer.push(fmConfiguration.getUpdateServiceMasterTopic(), request);

        return request.getServiceDetails();
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
