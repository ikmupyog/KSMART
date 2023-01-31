package org.ksmart.marriage.marriageapplication.controller;


import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.marriageregistry.model.BirthCertificate;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetail;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthDetailsRequest;
//import org.ksmart.marriage.marriageregistry.model.RegisterBirthSearchCriteria;
//import org.ksmart.marriage.marriageregistry.service.RegisterBirthService;
//import org.ksmart.marriage.utils.ResponseInfoFactory;


@Slf4j
//@RestController
//@RequestMapping("/cr/birth")
public class MarriageApplicationController {




//    @PostMapping(value = {"/_create"})
//    public ResponseEntity<MarriageApplicationResponse> saveBirthDetails(@RequestBody MarriageDetailsRequest request) {
//        List<MarriageApplicationDetail> birthDetails=crBirthService.saveBirthDetails(request);
//        MarriageApplicationResponse response= MarriageApplicationResponse.builder()
//                                                                  .birthDetails(birthDetails)
//                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                                                                                                                                                 true))
//                                                                 .build();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

//    @PostMapping(value = {"/_update"})
//    public ResponseEntity<MarriageApplicationResponse> updateBirthDetails(@RequestBody MarriageDetailsRequest request) {
//        //BirthCertificate birthCertificate = new BirthCertificate();
//        List<MarriageApplicationDetail> birthApplicationDetails=crBirthService.updateBirthDetails(request);
//        //Download certificate when Approved
//        if((birthApplicationDetails.get(0).getStatus() == "APPROVED") && (birthApplicationDetails.get(0).getAction() == "APPROVE")){
//            RegisterBirthDetailsRequest registerBirthDetailsRequest = registryRequestService.createRegistryRequest(request);
//            List<RegisterBirthDetail> registerBirthDetails =  registerBirthService.saveRegisterBirthDetails(registerBirthDetailsRequest);
//            RegisterBirthSearchCriteria criteria = new RegisterBirthSearchCriteria();
//            criteria.setTenantId(registerBirthDetails.get(0).getTenantId());
//            System.out.println(criteria.getTenantId());
//
//            criteria.setRegistrationNo(registerBirthDetails.get(0).getRegistrationNo()); System.out.println(registerBirthDetails.get(0).getRegistrationNo());
//            birthCertificate = registerBirthService.download(criteria,request.getRequestInfo());
//        }
//        MarriageApplicationResponse response= MarriageApplicationResponse.builder()
//                                                                  .birthDetails(birthApplicationDetails)
//                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                                                                                                                                                 true))
//                                                                  .birthCertificate(birthCertificate)
//                                                                  .build();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    @PostMapping(value = {"/_search"})
//    public ResponseEntity<MarriageApplicationResponse> listByHospitalId(@RequestBody MarriageDetailsRequest request, @Valid @ModelAttribute MarriageApplicationSearchCriteria criteria) {
//        List<MarriageApplicationDetail> birthDetails=crBirthService.searchBirthDetails(criteria);
//        MarriageApplicationResponse response= MarriageApplicationResponse.builder()
//                                                                  .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
//                                                                                                                                                 Boolean.TRUE))
//                                                                  .birthDetails(birthDetails)
//                                                                  .build();
//        return ResponseEntity.ok(response);
//    }

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
