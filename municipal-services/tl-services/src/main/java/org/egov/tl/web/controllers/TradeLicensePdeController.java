package org.egov.tl.web.controllers;

import org.egov.tl.service.PaymentUpdateService;
import org.egov.tl.service.TradeLicensePdeService;
import org.egov.tl.service.notification.PaymentNotificationService;
import org.egov.tl.service.notification.TLNotificationService;
import org.egov.tl.util.ResponseInfoFactory;
import org.egov.tl.web.models.*;
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
@RequestMapping("/pde")
public class TradeLicensePdeController {

        private final ObjectMapper objectMapper;

        private final HttpServletRequest request;

        private final TradeLicensePdeService tradeLicensePdeService;

        private final ResponseInfoFactory responseInfoFactory;

        private final PaymentNotificationService paymentNotificationService;

        private final TLNotificationService tlNotificationService;

        @Autowired
        public TradeLicensePdeController(ObjectMapper objectMapper, HttpServletRequest request,
                        TradeLicensePdeService tradeLicensePdeService,
                        ResponseInfoFactory responseInfoFactory, PaymentNotificationService paymentNotificationService,
                        TLNotificationService tlNotificationService) {
                this.objectMapper = objectMapper;
                this.request = request;
                this.tradeLicensePdeService = tradeLicensePdeService;
                this.responseInfoFactory = responseInfoFactory;
                this.paymentNotificationService = paymentNotificationService;
                this.tlNotificationService = tlNotificationService;
        }

        @PostMapping({ "/{servicename}/_create", "/_create" })
        public ResponseEntity<TradeLicenseResponse> create(@Valid @RequestBody TradeLicenseRequest tradeLicenseRequest,
                        @PathVariable(required = false) String servicename) {
                List<TradeLicense> licenses = tradeLicensePdeService.create(tradeLicenseRequest, servicename);
                TradeLicenseResponse response = TradeLicenseResponse.builder().licenses(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                tradeLicenseRequest.getRequestInfo(), true))
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @RequestMapping(value = { "/{servicename}/_search", "/_search" }, method = RequestMethod.POST)
        public ResponseEntity<TradeLicenseResponse> search(@Valid @RequestBody RequestInfoWrapper requestInfoWrapper,
                        @Valid @ModelAttribute TradeLicenseSearchCriteria criteria,
                        @PathVariable(required = false) String servicename, @RequestHeader HttpHeaders headers) {
                List<TradeLicense> licenses = tradeLicensePdeService.search(criteria,
                                requestInfoWrapper.getRequestInfo(),
                                servicename, headers);

                // int count = tradeLicensePdeService.countLicenses(criteria,
                // requestInfoWrapper.getRequestInfo(), servicename,
                // headers);

                TradeLicenseResponse response = TradeLicenseResponse.builder().licenses(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                requestInfoWrapper.getRequestInfo(),
                                                true))
                                .count(0)
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @RequestMapping(value = { "/{servicename}/_update", "/_update" }, method = RequestMethod.POST)
        public ResponseEntity<TradeLicenseResponse> update(@Valid @RequestBody TradeLicenseRequest tradeLicenseRequest,
                        @PathVariable(required = false) String servicename) {
                List<TradeLicense> licenses = tradeLicensePdeService.update(tradeLicenseRequest, servicename);

                TradeLicenseResponse response = TradeLicenseResponse.builder().licenses(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                tradeLicenseRequest.getRequestInfo(),
                                                true))
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @RequestMapping(value = { "/{servicename}/_updatewf", "/_updatewf" }, method = RequestMethod.POST)
        public ResponseEntity<TradeLicenseResponse> updatewf(
                        @Valid @RequestBody TradeLicenseRequest tradeLicenseRequest,
                        @PathVariable(required = false) String servicename) {
                List<TradeLicense> licenses = tradeLicensePdeService.updatewf(tradeLicenseRequest, servicename);

                TradeLicenseResponse response = TradeLicenseResponse.builder().licenses(licenses).responseInfo(
                                responseInfoFactory.createResponseInfoFromRequestInfo(
                                                tradeLicenseRequest.getRequestInfo(),
                                                true))
                                .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
        }

        // @RequestMapping(value = { "/{servicename}/{jobname}/_batch", "/_batch" },
        // method = RequestMethod.POST)
        // public ResponseEntity sendReminderSMS(@Valid @RequestBody RequestInfoWrapper
        // requestInfoWrapper,
        // @PathVariable(required = false) String servicename,
        // @PathVariable(required = true) String jobname) {

        // tradeLicensePdeService.runJob(servicename, jobname,
        // requestInfoWrapper.getRequestInfo());

        // return new ResponseEntity(HttpStatus.ACCEPTED);
        // }

        // @RequestMapping(value = "/_plainsearch", method = RequestMethod.POST)
        // public ResponseEntity<TradeLicenseResponse> plainsearch(@Valid @RequestBody
        // RequestInfoWrapper requestInfoWrapper,
        // @Valid @ModelAttribute TradeLicenseSearchCriteria criteria) {

        // List<TradeLicense> licenses = tradeLicensePdeService.plainSearch(criteria,
        // requestInfoWrapper.getRequestInfo());

        // TradeLicenseResponse response =
        // TradeLicenseResponse.builder().licenses(licenses).responseInfo(
        // responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(),
        // true))
        // .build();
        // return new ResponseEntity<>(response, HttpStatus.OK);
        // }
}
