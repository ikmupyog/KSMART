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
        this.enrichment=enrichment;
        this.repository=repository;
    }
    //create Moduledetails
    public ModuleDetails createModule( final ModuleDetailsRequest request){
        final ModuleDetails moduleDetails=request.getModuleDetails();
        enrichment.enrichCreateModule(request);
        producer.push(fmConfiguration.getSaveModuleMasterTopic(),request);
        return request.getModuleDetails();
    }


//    //create MajorFunction
//    public MajorFunctionDetails createMF(final MajorFunctionDetailsRequest request) {
//        GlobalMasterEnrichment.enrichCreateMajorFunction(request);
//        producer.push(fmConfiguration.getSaveMajorFunctionTopic(),request);
//        return request.getMajorFunctionDetails();
//    }


    //create Subfunction
    public  SubFunctionDetails createSF(final SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunctionDetails=request.getSubFunctionDetails();
        enrichment.enrichCreateSubFunction(request);
        producer.push(fmConfiguration.getSaveSubFunctionTopic(),request);
        return request.getSubFunctionDetails();
    }
//    //create Servicedetails
//    public ServiceDetails createService(ServiceDetailsRequest request){
//        GlobalMasterEnrichment.enrichCreateServiceDetails(request);
//        producer.push(fmConfiguration.getSaveServiceDetailsTopic(),request);
//        return request.getServiceDetails();
//    }

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
        final List<ModuleDetails> result= repository.searchModule(searchCriteria);
        return (result);
    }


    public SubFunctionDetails updateSF(SubFunctionDetailsRequest request) {
        final SubFunctionDetails subFunctionDetails = request.getSubFunctionDetails();

        String sfCode = null;
        sfCode = subFunctionDetails.getSubFunctionCode();

        // search database
        List<SubFunctionDetails> searchResult = repository.searchSF(SubFunctionSearchCriteria.builder()
                .subFunctionCode(sfCode)
                .build());
        // validate request
        //  validator.validateUpdate(request, searchResult);

        enrichment.enrichUpdateSubFunction(request);

      //  producer.push(fmConfiguration.getUpdateSubFunctionTopic(), request);

        return request.getSubFunctionDetails();

    }

    public List<SubFunctionDetails> searchSF(RequestInfo requestInfo, SubFunctionSearchCriteria searchCriteria) {
        final List<SubFunctionDetails> result= repository.searchSF(searchCriteria);
        return (result);
    }

}
