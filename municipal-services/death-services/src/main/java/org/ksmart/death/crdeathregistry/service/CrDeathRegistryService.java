package org.ksmart.death.crdeathregistry.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.crdeath.kafka.producer.CrDeathProducer;
import org.ksmart.death.crdeath.validators.CrDeathValidator;
import org.ksmart.death.crdeath.validators.MDMSValidator;
import org.ksmart.death.crdeathregistry.repository.CrDeathRegistryRepository;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryMdmsUtil;
import org.ksmart.death.crdeathregistry.validators.CrDeathRegistryValidator;
import org.ksmart.death.crdeathregistry.validators.RegistryMDMSValidator;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.enrichment.CrDeathRegistryEnrichment;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on 28.11.2022
     */
 @Service
 
public class CrDeathRegistryService {

    private final CrDeathProducer producer;
    private final CrDeathRegistryConfiguration deathConfig;
    private final CrDeathRegistryEnrichment enrichmentService;
    private final CrDeathRegistryRepository repository;
    private final CrDeathRegistryMdmsUtil util;
    private final RegistryMDMSValidator mdmsValidator;
    private final CrDeathRegistryValidator validatorService;


    @Autowired
    CrDeathRegistryService(CrDeathProducer producer,CrDeathRegistryConfiguration deathConfig,
    CrDeathRegistryEnrichment enrichmentService ,CrDeathRegistryRepository repository ,
    CrDeathRegistryMdmsUtil util,RegistryMDMSValidator mdmsValidator,
    CrDeathRegistryValidator validatorService){
        this.producer = producer;
        this.deathConfig = deathConfig;
        this.enrichmentService = enrichmentService;
        this.repository=repository;
        this.util=util;
        this.mdmsValidator=mdmsValidator;
        this.validatorService=validatorService;
    }

    public List<CrDeathRegistryDtl> create(CrDeathRegistryRequest request) {
        // validate request
       // validatorService.validateCreate(request);

       // RAkhi S IKM validate mdms data       
        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
         
         /********************************************* */

        // try {
        //     ObjectMapper mapper = new ObjectMapper();
        //     Object obj = mdmsData;
        //     mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //    System.out.println("mdmsDataRegistry "+ mapper.writeValueAsString(obj));
        //     }catch(Exception e) {
        //        // log.error("Exception while fetching from searcher: ",e);
        //     }


            /********************************************** */
       // mdmsValidator.validateMDMSData(request,mdmsData);

         // enrich request
        enrichmentService.enrichCreate(request);
        //IDGen call
        //enrichmentService.setIdgenIds(request);    
        enrichmentService.setRegistrationNumberDetails(request); 

        producer.push(deathConfig.getSaveDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
    }
      //UPDATE BEGIN Jasmine
      public List<CrDeathRegistryDtl> update(CrDeathRegistryRequest request) {
      
        //Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
          
        String id = request.getDeathCertificateDtls().get(0).getId();

        List<CrDeathRegistryDtl> searchResult = repository.getDeathApplication(CrDeathRegistryCriteria.builder().id(id).build());

        validatorService.validateUpdate(request, searchResult);

       // mdmsValidator.validateMDMSData(request,mdmsData);

        enrichmentService.enrichUpdate(request);

        producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
      }
    //Search  
     public List<CrDeathRegistryDtl> search(CrDeathRegistryCriteria criteria, RequestInfo requestInfo) {
	    // validatorService.validateSearch(requestInfo, criteria);
		return repository.getDeathApplication(criteria);
     }
}
