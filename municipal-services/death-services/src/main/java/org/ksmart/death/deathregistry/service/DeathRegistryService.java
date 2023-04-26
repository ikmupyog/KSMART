package org.ksmart.death.deathregistry.service;

import java.util.List;
import java.util.UUID;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.enrichment.DeathRegistryEnrichment;
import org.ksmart.death.deathregistry.kafka.producer.DeathRegistryProducer;
import org.ksmart.death.deathregistry.repository.DeathRegistryRepository;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfResp;
import org.ksmart.death.deathregistry.web.models.naccertmodel.DeathNACCertificate;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACCertRequest;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.ksmart.death.deathregistry.web.models.DeathNACCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service 
public class DeathRegistryService {
     private final DeathRegistryProducer producer;
     private final DeathRegistryConfiguration deathConfig;
     private final DeathRegistryRepository repository;
     private final DeathRegistryEnrichment enrichmentService;  
    @Autowired
    DeathRegistryService(DeathRegistryProducer producer,DeathRegistryConfiguration deathConfig 
                                        ,DeathRegistryRepository repository,
                                        DeathRegistryEnrichment enrichmentService ){
         this.producer = producer;
         this.deathConfig = deathConfig;
         this.repository=repository;
         this.enrichmentService = enrichmentService;
     }
    //Rakhi S ikm on 09.02.2023
    public List<DeathRegistryDtl> create(DeathRegistryRequest request) {   
     //  Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getTenantId());
     //  mdmsValidator.validateMDMSData(request,mdmsData);
       enrichmentService.enrichCreate(request);
       enrichmentService.setRegistrationNumberDetails(request); 
       enrichmentService.setCertificateNumberDetails(request);
       producer.push(deathConfig.getSaveDeathRegistryDetailsTopic(), request);
       return request.getDeathCertificateDtls();
   }

      //UPDATE BEGIN Jasmine 7.03.2023
      // public List<DeathRegistryDtl> update(DeathRegistryRequest request) {

      //  String regNo = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getRegistrationNo();

      //  String tenantId = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId();

      //   // List<DeathRegistryDtl> searchResult = repository.getDeathApplication(DeathRegistryCriteria
      //   //                                                                       .builder()
      //   //                                                                       .tenantId(tenantId)
      //   //                                                                       .registrationNo(regNo)
      //   //                                                                       .build());

      //   producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);

      //   return request.getDeathCertificateDtls();
      // }
    //Registry Normal Search
      public List<DeathRegistryDtl> search(DeathRegistryCriteria criteria, RequestInfo requestInfo) {

		    return repository.getDeathApplication(criteria,requestInfo);
     }
 //Certificate download Rakhi S IKM on 10.02.2023
 public DeathCertificate download(DeathRegistryCriteria criteria, RequestInfo requestInfo) {
    try{
        DeathCertificate deathCertificate = new DeathCertificate();
        deathCertificate.setSource(criteria.getSource().toString());
        deathCertificate.setDeathDtlId(criteria.getId());
        deathCertificate.setTenantId(criteria.getTenantId());
        DeathCertRequest deathCertRequest = DeathCertRequest.builder().deathCertificate(deathCertificate).requestInfo(requestInfo).build();
        List<DeathRegistryDtl> deathDtls = repository.getDeathApplication(criteria,requestInfo);     

        DeathPdfApplicationRequest applicationRequest = DeathPdfApplicationRequest.builder().requestInfo(requestInfo).deathCertificate(deathDtls).build();
        if(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate()!=0){
          
        }
        else{
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().setCertificateDate(currentTime);           

        }       
        DeathPdfResp pdfResp = repository.saveDeathCertPdf(applicationRequest);
        deathCertificate.setEmbeddedUrl(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getEmbeddedUrl());
        deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getDateofissue());
        deathCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
        deathCertificate.setApplicationStatus(DeathCertificate.StatusEnum.FREE_DOWNLOAD);  
        deathCertificate.setAckNo(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getDeathACKNo());
        deathCertificate.setAuditDetails(applicationRequest.getDeathCertificate().get(0).getDeathAuditDetails());
        deathCertificate.setCounter(1);
        deathCertificate.setDeathcertificateno(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateNo());
        if(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate()!=0){
            deathCertificate.setDateofissue(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getCertificateDate());
        }
        else
        {
          Long currentTime = Long.valueOf(System.currentTimeMillis());
          deathCertificate.setDateofissue(currentTime);
        }
        //Rakhi S on 12.02.2023
        List<DeathCertificate> deathCertSearch = repository.searchCertificate(applicationRequest.getDeathCertificate().get(0).getDeathBasicInfo().getId());
        
        if (null != deathCertSearch && !deathCertSearch.isEmpty()){
          repository.updateCertificate(deathCertRequest);
        }
        else{
            deathCertificate.setId(UUID.randomUUID().toString());         
            repository.save(deathCertRequest);
        }
        return deathCertificate;
      }
      catch(Exception e) {
          e.printStackTrace();
          throw new CustomException("DOWNLOAD_ERROR","Error in Downloading Certificate");
    }
 }
  //Rakhi S IKM on 12.02.2023
  public List<DeathCertificate> searchCertificate(DeathRegistryCriteria criteria, RequestInfo requestInfo) {      
    List<DeathRegistryDtl> obj = repository.getDeathApplication(criteria,requestInfo);     
    return repository.searchCertificate(obj.get(0).getDeathBasicInfo().getId());
  }
 //Jasmine .06.03.2023
  public List<DeathRegistryCorrectionDtls> update(DeathRegistryCorrectionRequest request) {

    String regNo = request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getRegistrationNo();
    String tenantId = request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId();
    List<DeathRegistryCorrectionDtls> searchResult = repository.getDeathCorrectionApplication(DeathRegistryCriteria
                                                                           .builder()
                                                                           .tenantId(tenantId)
                                                                           .registrationNo(regNo)
                                                                           .build());

     request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().setId(searchResult.get(0).getDeathCorrectionBasicInfo().getId()) ;                                                       
     
     producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);
     return request.getDeathCorrection();
   }

   //Rakhi S ikm on 04.04.2023 Registry NAC  Create
   public List<DeathRegistryNACDtls> createNAC(DeathRegistryNACRequest request) { 
     enrichmentService.enrichCreateNAC(request);
    //  enrichmentService.setRegistrationNumberNAC(request); 
     enrichmentService.setCertificateNumberNAC(request);      
     producer.push(deathConfig.getSaveDeathRegistryNACTopic(), request);
     return request.getDeathNACDtls();
 }
 //Certificate NAC download Rakhi S IKM on 07.04.2023
 public DeathNACCertificate downloadNAC(DeathNACCriteria criteria, RequestInfo requestInfo) {
    try{
      DeathNACCertificate nacCertificate = new DeathNACCertificate();
        nacCertificate.setSource(criteria.getSource().toString());
        nacCertificate.setDeathDtlId(criteria.getId());
        nacCertificate.setTenantId(criteria.getTenantId());
        NACCertRequest nacCertRequest = NACCertRequest.builder().deathNACCertificate(nacCertificate).requestInfo(requestInfo).build();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        nacCertRequest.getDeathNACCertificate().setDateofissue(currentTime); 

        List<DeathRegistryNACDtls> deathDtls = repository.getDeathNACApplication(criteria,requestInfo);     
        NACPdfApplicationRequest applicationRequest = NACPdfApplicationRequest.builder().requestInfo(requestInfo).deathNACCertificate(deathDtls).build();
        if (null != deathDtls && !deathDtls.isEmpty()){
          if(deathDtls.get(0).getDeathBasicInfo().getFilestoreId() != null){
            nacCertificate.setFilestoreid(deathDtls.get(0).getDeathBasicInfo().getFilestoreId());
            nacCertificate.setConsumerCode(deathDtls.get(0).getDeathBasicInfo().getDeathACKNo());
          }
          else{
              if(deathDtls.get(0).getDeathBasicInfo().isDeathNAC()){
                NACPdfResp pdfResp = repository.saveDeathNACPdf(applicationRequest);
                nacCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
                Long currentSystemTime = Long.valueOf(System.currentTimeMillis());
                nacCertificate.setDateofissue(currentSystemTime);
                repository.updateNACCertificate(nacCertRequest);
              }
              else if(deathDtls.get(0).getDeathBasicInfo().isDeathNIA()){
                NACPdfResp pdfResp = repository.saveDeathNIAPdf(applicationRequest);
                nacCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
                Long currentSystemTime = Long.valueOf(System.currentTimeMillis());
                nacCertificate.setDateofissue(currentSystemTime);
                repository.updateNACCertificate(nacCertRequest);
              }       
          }
        }
        
        return nacCertificate;
      }
      catch(Exception e) {
        e.printStackTrace();
        throw new CustomException("DOWNLOAD_ERROR","Error in Downloading NAC Certificate");
  }
  }

   //Registry NAC Search
   public List<DeathRegistryNACDtls> searchNAC(DeathNACCriteria criteria, RequestInfo requestInfo) {

    return repository.getDeathNACApplication(criteria,requestInfo);
    
 }
   
}
 //           /********************************************* */

    //        try {
    //         ObjectMapper mapper = new ObjectMapper();
    //         Object obj = request;
    //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    //        System.out.println("rakhiNAC "+ mapper.writeValueAsString(obj));
    // }catch(Exception e) {
    //     log.error("Exception while fetching from searcher: ",e);
    // }

    
    // /********************************************** */