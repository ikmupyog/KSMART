package org.ksmart.marriage.marriagecommon.controller;

import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.marriagecommon.model.common.CommonPay;
import org.ksmart.marriage.marriagecommon.model.common.CommonPayRequest;
import org.ksmart.marriage.marriagecommon.model.common.CommonPayResponse;
import org.ksmart.marriage.marriagecommon.services.CommonService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cr/common")
public class CommonController {
    private final CommonService commonService;
    private final ResponseInfoFactory responseInfoFactory;
    @Autowired
    CommonController(CommonService commonService, ResponseInfoFactory responseInfoFactory){
        this.commonService = commonService;
        this.responseInfoFactory = responseInfoFactory;
    }

    // @PostMapping(value = {"/updatepaywf"})
    // public ResponseEntity<?> updatePaymentWorkflow(@RequestBody CommonPayRequest request) {
    //     List<CommonPay> paymentDetails=commonService.updatePaymentWorkflow(request);
    //     CommonPayResponse response= CommonPayResponse.builder()
    //             .payments(paymentDetails)
    //             .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
    //                     true))
    //             .build();
    //     return new ResponseEntity<>(response, HttpStatus.OK);
    // }

}
