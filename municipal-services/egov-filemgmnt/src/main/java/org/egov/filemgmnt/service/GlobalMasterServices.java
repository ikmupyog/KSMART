package org.egov.filemgmnt.service;


import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.GlobalMasterEnrichment;
import org.egov.filemgmnt.kafka.Producer;
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
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;
    GlobalMasterServices(FMConfiguration fmConfiguration, Producer producer, GlobalMasterEnrichment enrichment) {
        this.fmConfiguration = fmConfiguration;
        this.producer = producer;
        this.enrichment=enrichment;
    }
    //create Moduledetails
    public ModuleDetails createModule( final ModuleDetailsRequest request){
        final ModuleDetails moduleDetails=request.getModuleDetails();
        enrichment.enrichCreateModule(request);
        producer.push(fmConfiguration.getSaveModulemasterTopic(),request);
        return request.getModuleDetails();
    }
//    //create MajorFunction
//    public MajorFunctionDetails createMF(final MajorFunctionDetailsRequest request) {
//        GlobalMasterEnrichment.enrichCreateMajorFunction(request);
//        producer.push(fmConfiguration.getSaveMajorFunctionTopic(),request);
//        return request.getMajorFunctionDetails();
//    }
//    //create Subfunction
//    public  SubFunctionDetails createSF(SubFunctionDetailsRequest request) {
//        GlobalMasterEnrichment.enrichCreateSubFunction(request);
//        producer.push(fmConfiguration.getSaveSubFunctionTopic(),request);
//        return request.getSubFunctionDetails();
//    }
//    //create Servicedetails
//    public ServiceDetails createService(ServiceDetailsRequest request){
//        GlobalMasterEnrichment.enrichCreateServiceDetails(request);
//        producer.push(fmConfiguration.getSaveServiceDetailsTopic(),request);
//        return request.getServiceDetails();
//    }

}
