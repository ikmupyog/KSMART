package org.ksmart.death.deathregistry.web.controllers;

import java.util.List;
import javax.validation.Valid;

import org.ksmart.death.common.contract.RequestInfoWrapper;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.deathregistry.util.DeathRegistryConstants;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACResponse;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryResponse;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertResponse;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.deathregistry.web.models.naccertmodel.DeathNACCertificate;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACCertResponse;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.StringUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
import java.util.LinkedList;
import java.util.List;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionResponse;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;
import org.ksmart.death.deathregistry.web.models.DeathNACCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;

@Slf4j
@RestController
@RequestMapping("/v1")
@Validated
public class DeathRegistryController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;
	private final DeathRegistryService deathService;    
    @Autowired
    public DeathRegistryController(DeathRegistryService deathService) {

        this.deathService = deathService;
    }
    //Rakhi S on 09.02.2023 - Death Registry Create Controller 
    @PostMapping("/crdeathregistry/_createdeath")
    public ResponseEntity<DeathRegistryResponse> create(@Valid @RequestBody DeathRegistryRequest request) {
 
        List<DeathRegistryDtl> deathDetails = deathService.create(request);

        DeathRegistryResponse response = DeathRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .deathCertificateDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }    

        //Search  Jasmine 08.02.2023
        @PostMapping("/deathregistry/_searchdeath")
    
        public ResponseEntity<Object> search(@RequestBody RequestInfoWrapper request,
                                                              @ModelAttribute DeathRegistryCriteria criteria) {
            if(!criteria.getDeathType().equals(DeathRegistryConstants.DEATH_NAC) ){                                         
            List<DeathRegistryDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());    
            DeathRegistryResponse response = DeathRegistryResponse
                                                .builder()
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                                .deathCertificateDtls(deathDetails)
                                                .build();
            return ResponseEntity.ok(response);
            }else{ 
                DeathNACCriteria nacCriteria = new DeathNACCriteria();
                nacCriteria.setDeathACKNo(criteria.getDeathACKNo());
                List<DeathRegistryNACDtls> deathDetails = deathService.searchNAC(nacCriteria, request.getRequestInfo());

                DeathRegistryNACResponse response = DeathRegistryNACResponse
                                                    .builder()
                                                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                                    .deathNACDtls(deathDetails)
                                                    .build();
                return ResponseEntity.ok(response);
             }
    }

    //Certificate Download by Rakhi S on 10.02.2023
    @PostMapping("/deathregistry/_downloaddeath")
    public ResponseEntity<DeathCertResponse> download(@RequestBody RequestInfoWrapper requestInfoWrapper,
                                                    @Valid @ModelAttribute DeathRegistryCriteria criteria){

    List<DeathCertificate> deathCertSearch = deathService.searchCertificate(criteria,requestInfoWrapper.getRequestInfo()); 
    DeathCertResponse response ;
    if (null != deathCertSearch && !deathCertSearch.isEmpty()){
        if(deathCertSearch.get(0).getCounter()<=0){
           DeathCertificate deathCert = deathService.download(criteria,requestInfoWrapper.getRequestInfo());
        
            response = DeathCertResponse
                                        .builder()
                                        .filestoreId(deathCert.getFilestoreid())
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                        .build();
            return ResponseEntity.ok(response);
          }
    
          else{
                response = DeathCertResponse
                            .builder()
                            .filestoreId(deathCertSearch.get(0).getFilestoreid())
                            .consumerCode(deathCertSearch.get(0).getDeathcertificateno())
                            // .tenantId(deathCertSearch.get(0).getTenantId())
                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                            .build();
             return ResponseEntity.ok(response);
          }
    }
    else{
        DeathCertificate deathCert = deathService.download(criteria,requestInfoWrapper.getRequestInfo());
        
            response = DeathCertResponse
                                        .builder()
                                        .filestoreId(deathCert.getFilestoreid())
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                        .build();
            return ResponseEntity.ok(response);
    }
    }

    //Update Jasmine 06.03.2023
    @PostMapping("/deathregistry/_updatedeath")

    public ResponseEntity<DeathRegistryCorrectionResponse> update(@RequestBody DeathRegistryCorrectionRequest request) {       
       
        List<DeathRegistryCorrectionDtls> deathDetails = deathService.update(request);        
        DeathRegistryCorrectionResponse response = DeathRegistryCorrectionResponse
                                                    .builder()
                                                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                    .deathCorrection(deathDetails)
                                                    .build();
        return ResponseEntity.ok(response);
    }
    
     //Rakhi S on 04.04.2023 - Death Registry NAC Create Controller 
     @PostMapping("/crdeathregistry/_createdeathnac")
     public ResponseEntity<DeathRegistryNACResponse> createNAC(@Valid @RequestBody DeathRegistryNACRequest request) {  
         List<DeathRegistryNACDtls> deathDetails = deathService.createNAC(request);
 
         DeathRegistryNACResponse response = DeathRegistryNACResponse
                                             .builder()
                                             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                             .deathNACDtls(deathDetails)
                                             .build();
         return ResponseEntity.ok(response);
     }   
    //   //Certificate Download NAC by Rakhi S on 07.04.2023
    @PostMapping("/deathregistry/_downloaddeathnac")
    public ResponseEntity<NACCertResponse> downloadNAC(@RequestBody RequestInfoWrapper requestInfoWrapper,
                                                    @Valid @ModelAttribute DeathNACCriteria criteria){
            DeathNACCertificate deathNACCert = deathService.downloadNAC(criteria,requestInfoWrapper.getRequestInfo());
        
            NACCertResponse response ;
            response = NACCertResponse
                                        .builder()
                                        .filestoreId(deathNACCert.getFilestoreid())
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                        .build();
            return ResponseEntity.ok(response);

    }
    //Rakhi S on 19.04.2023 - Death Registry NAC Search Controller 
    @PostMapping("/deathregistry/_searchdeathnac")    
    public ResponseEntity<DeathRegistryNACResponse> searchNAC(@RequestBody RequestInfoWrapper request,
                                                          @ModelAttribute DeathNACCriteria criteria) {
                                                           
        List<DeathRegistryNACDtls> deathDetails = deathService.searchNAC(criteria, request.getRequestInfo());

        DeathRegistryNACResponse response = DeathRegistryNACResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .deathNACDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }
}
