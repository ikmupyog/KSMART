package org.egov.kssmSnehaswanthanam.web.controller;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmSnehaswanthanam.service.SnehaswanthanamService;
import org.egov.kssmSnehaswanthanam.util.ResponseInfoFactory;
import org.egov.kssmSnehaswanthanam.web.models.RequestInfoWrapper;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamRequest;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamResponse;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamSearchCriteria;
import org.egov.kssmSnehaswanthanam.web.models.m_Snehaswanthanam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequestMapping("/snehaswanthanam")
@Validated
public class SnehaswanthanamController {

    // @Autowired
    // private iSnehasanthwanamServices isnehaservice;

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

    private final SnehaswanthanamService obService;

    @Autowired
    public SnehaswanthanamController(SnehaswanthanamService obService) {

        this.obService = obService;
    }

    @PostMapping("/v1/Create")
    public ResponseEntity<SnehaswanthanamResponse> create(@Valid @RequestBody SnehaswanthanamRequest request) {
        
        
        List<m_Snehaswanthanam> ob = obService.create(request);

        SnehaswanthanamResponse response = SnehaswanthanamResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .m_Snehaswanthanam(ob)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = { "/v1/Update" })
    public ResponseEntity<SnehaswanthanamResponse> update_snehasanthwanam(
            @Valid @RequestBody SnehaswanthanamRequest request) {

        List<m_Snehaswanthanam> newRes = new ArrayList<m_Snehaswanthanam>();

        for (m_Snehaswanthanam snehaswanthanam : request.getM_Snehaswanthanam()) {
            if ((Long) snehaswanthanam.getNumkssmpensionerid() != null
                    && (Long) snehaswanthanam.getNumkssmpensionerid() != 0) {

                try {
                    newRes.add(snehaswanthanam);
                    // request.setRequestInfo(request.getRequestInfo());
                    request.setM_Snehaswanthanam(newRes);
                    List<m_Snehaswanthanam> ob = obService.update(request);
                } catch (Exception e) {
                    log.error("Exception while fetching from searcher: ", e);
                }

            }
        }

        SnehaswanthanamResponse response = SnehaswanthanamResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .m_Snehaswanthanam(newRes).build();
        return ResponseEntity.ok(response);

    }

    @PostMapping("/v1/Search")
    public ResponseEntity<SnehaswanthanamResponse> search_snehaswanthanam(@RequestBody RequestInfoWrapper request,
            @Valid @ModelAttribute SnehaswanthanamSearchCriteria searchCriteria) {

        List<m_Snehaswanthanam> result = obService.searchSnehaswanthanamDetails(searchCriteria);
        SnehaswanthanamResponse response = SnehaswanthanamResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .m_Snehaswanthanam(result).build();
        return ResponseEntity.ok(response);

    }

}
