package org.ksmart.marriage.marriageapplication.controller;


import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.model.birth.BirthApplicationResponse;
import org.ksmart.marriage.marriageapplication.model.birth.BirthApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.BirthApplicationDetail;
import org.ksmart.marriage.marriageapplication.model.birth.BirthDetailsRequest;
import org.ksmart.marriage.marriageapplication.service.BirthApplicationService;
import org.ksmart.marriage.marriageapplication.service.RegistryRequestService;
import org.ksmart.marriage.marriageregistry.model.BirthCertificate;
import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetail;
import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetailsRequest;
import org.ksmart.marriage.marriageregistry.model.RegisterBirthSearchCriteria;
import org.ksmart.marriage.marriageregistry.service.RegisterBirthService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cr/birth")
public class BirthApplicationController {

    private final ResponseInfoFactory responseInfoFactory;
    private final BirthApplicationService crBirthService;
    private final RegisterBirthService registerBirthService;
    private final RegistryRequestService registryRequestService;

    @Autowired
    BirthApplicationController(BirthApplicationService crBirthService, ResponseInfoFactory responseInfoFactory,
                               RegisterBirthService registerBirthService, RegistryRequestService registryRequestService) {
        this.crBirthService=crBirthService;
        this.responseInfoFactory=responseInfoFactory;
        this.registerBirthService = registerBirthService;
        this.registryRequestService = registryRequestService;
    }

    @PostMapping(value = {"/_create"})
    public ResponseEntity<BirthApplicationResponse> saveBirthDetails(@RequestBody BirthDetailsRequest request) {
        List<BirthApplicationDetail> birthDetails=crBirthService.saveBirthDetails(request);
        BirthApplicationResponse response=BirthApplicationResponse.builder()
                                                                  .birthDetails(birthDetails)
                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                                 true))
                                                                 .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = {"/_update"})
    public ResponseEntity<BirthApplicationResponse> updateBirthDetails(@RequestBody BirthDetailsRequest request) {
        BirthCertificate birthCertificate = new BirthCertificate();
        List<BirthApplicationDetail> birthApplicationDetails=crBirthService.updateBirthDetails(request);
        //Download certificate when Approved
        if((birthApplicationDetails.get(0).getStatus() == "APPROVED") && (birthApplicationDetails.get(0).getAction() == "APPROVE")){
            RegisterBirthDetailsRequest registerBirthDetailsRequest = registryRequestService.createRegistryRequest(request);
            List<RegisterBirthDetail> registerBirthDetails =  registerBirthService.saveRegisterBirthDetails(registerBirthDetailsRequest);
            RegisterBirthSearchCriteria criteria = new RegisterBirthSearchCriteria();
            criteria.setTenantId(registerBirthDetails.get(0).getTenantId());
            System.out.println(criteria.getTenantId());

            criteria.setRegistrationNo(registerBirthDetails.get(0).getRegistrationNo()); System.out.println(registerBirthDetails.get(0).getRegistrationNo());
            birthCertificate = registerBirthService.download(criteria,request.getRequestInfo());
        }
        BirthApplicationResponse response=BirthApplicationResponse.builder()
                                                                  .birthDetails(birthApplicationDetails)
                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                                 true))
                                                                  .birthCertificate(birthCertificate)
                                                                  .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = {"/_search"})
    public ResponseEntity<BirthApplicationResponse> listByHospitalId(@RequestBody BirthDetailsRequest request, @Valid @ModelAttribute BirthApplicationSearchCriteria criteria) {
        List<BirthApplicationDetail> birthDetails=crBirthService.searchBirthDetails(criteria);
        BirthApplicationResponse response=BirthApplicationResponse.builder()
                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                                                                                                                                                 Boolean.TRUE))
                                                                  .birthDetails(birthDetails)
                                                                  .build();
        return ResponseEntity.ok(response);
    }

//    @PostMapping(value = { "/_getfilestoreid"})
//    public ResponseEntity<BirthCertResponse> getfilestoreid(@RequestBody RequestInfoWrapper requestInfoWrapper,
//                                                            @Valid @ModelAttribute SearchCriteria criteria) {
//
//        BirthCertificate birthCert = birthService.getBirthCertReqByConsumerCode(criteria,requestInfoWrapper.getRequestInfo());
//        BirthCertResponse response = BirthCertResponse.builder().filestoreId(birthCert.getFilestoreid()).tenantId(criteria.getTenantId()).responseInfo(
//                        responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
//                .build();
//        if(null!=birthCert.getFilestoreid()) {
//            birthCert.setBirthCertificateNo(criteria.getConsumerCode());
//            birthService.updateDownloadStatus(BirthCertRequest.builder().birthCertificate(birthCert).requestInfo(requestInfoWrapper.getRequestInfo()).build());
//        }
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }


}
