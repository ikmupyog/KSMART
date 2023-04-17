package org.egov.tl.web.controllers;

import org.egov.tl.service.PaymentUpdateService;
import org.egov.tl.service.TradeLicenseCorrectionService;
import org.egov.tl.service.TradeLicensePdeService;
import org.egov.tl.service.notification.PaymentNotificationService;
import org.egov.tl.service.notification.TLNotificationService;
import org.egov.tl.util.ResponseInfoFactory;
import org.egov.tl.web.models.*;
import org.egov.tl.web.models.correction.Correction;
import org.egov.tl.web.models.correction.CorrectionRequest;
import org.egov.tl.web.models.correction.CorrectionResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

import javax.validation.constraints.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;

import static org.egov.tl.util.TLConstants.businessService_TL;

@RestController
@RequestMapping("/correction")
public class TradeLicenseCorrectionController {

        private final ObjectMapper objectMapper;

        private final HttpServletRequest request;

        private final TradeLicenseCorrectionService tradeLicenseCorrectionService;

        private final ResponseInfoFactory responseInfoFactory;

        private final PaymentNotificationService paymentNotificationService;

        private final TLNotificationService tlNotificationService;

        @Autowired
        public TradeLicenseCorrectionController(ObjectMapper objectMapper, HttpServletRequest request,
                        TradeLicenseCorrectionService tradeLicenseCorrectionService,
                        ResponseInfoFactory responseInfoFactory, PaymentNotificationService paymentNotificationService,
                        TLNotificationService tlNotificationService) {
                this.objectMapper = objectMapper;
                this.request = request;
                this.tradeLicenseCorrectionService = tradeLicenseCorrectionService;
                this.responseInfoFactory = responseInfoFactory;
                this.paymentNotificationService = paymentNotificationService;
                this.tlNotificationService = tlNotificationService;
        }

        @PostMapping({ "/{servicename}/_create", "/_create" })
        public ResponseEntity<CorrectionResponse> create(@Valid @RequestBody CorrectionRequest correctionRequest,
                        @PathVariable(required = false) String servicename) {
                List<Correction> licenses = tradeLicenseCorrectionService.create(correctionRequest, servicename);
                CorrectionResponse response = CorrectionResponse.builder().licenseCorrection(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                correctionRequest.getRequestInfo(), true))
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @RequestMapping(value = { "/{servicename}/_update", "/_update" }, method = RequestMethod.POST)
        public ResponseEntity<CorrectionResponse> update(@Valid @RequestBody CorrectionRequest correctionRequest,
                        @PathVariable(required = false) String servicename) {
                List<Correction> licenses = tradeLicenseCorrectionService.update(correctionRequest, servicename);

                CorrectionResponse response = CorrectionResponse.builder().licenseCorrection(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                correctionRequest.getRequestInfo(),
                                                true))
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

}
