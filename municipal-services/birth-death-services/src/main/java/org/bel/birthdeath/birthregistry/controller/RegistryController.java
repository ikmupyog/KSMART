package org.bel.birthdeath.birthregistry.controller;

import lombok.extern.slf4j.Slf4j;

import org.bel.birthdeath.birthregistry.model.RegisterBirthDetail;
import org.bel.birthdeath.birthregistry.model.RegisterBirthDetailsRequest;
import org.bel.birthdeath.birthregistry.model.RegisterBirthResponse;
import org.bel.birthdeath.birthregistry.model.RegisterBirthSearchCriteria;
import org.bel.birthdeath.birthregistry.service.RegisterBirthService;
import org.bel.birthdeath.crbirth.model.BirthApplicationResponse;
import org.bel.birthdeath.crbirth.model.BirthDetail;
import org.bel.birthdeath.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/cr/registry")
public class RegistryController {

    private final ResponseInfoFactory responseInfoFactory;
    private final RegisterBirthService registerBirthService;

    @Autowired
    RegistryController(RegisterBirthService registerBirthService, ResponseInfoFactory responseInfoFactory) {
        this.registerBirthService = registerBirthService;
        this.responseInfoFactory = responseInfoFactory;
    }


        @PostMapping(value = { "/_create"})
        public ResponseEntity<?> saveRegisterBirthDetails(@RequestBody RegisterBirthDetailsRequest request) {
            List<RegisterBirthDetail> registerBirthDetails = registerBirthService.saveRegisterBirthDetails(request);
            return new ResponseEntity<>(registerBirthDetails, HttpStatus.OK);
        }

        @PostMapping(value = { "/_update"})
        public ResponseEntity<?> updateRegisterBirthDetails(@RequestBody RegisterBirthDetailsRequest request) {
            List<RegisterBirthDetail> registerBirthDetails = registerBirthService.updateRegisterBirthDetails(request);
            return new ResponseEntity<>(registerBirthDetails, HttpStatus.OK);
        }

//    @PostMapping(value = { "/_search"})
//    public ResponseEntity<RegisterBirthResponse> listByHospitalId(@RequestBody RegisterBirthDetailsRequest request,
//                                                                     @Valid @ModelAttribute RegisterBirthSearchCriteria criteria) {
//        List<RegisterBirthDetail> registerBirthDetail = registerBirthService.searchBirthDetails(criteria);
//        RegisterBirthResponse response = RegisterBirthResponse.builder()
//                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
//                .registerDetails(registerBirthDetail)
//                .build();
//        return ResponseEntity.ok(response);
//    }

    }

