package org.egov.kssmSnehapoorvam.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmSnehapoorvam.service.SnehapoorvamService;
import org.egov.kssmSnehapoorvam.util.ResponseInfoFactory;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamSearchRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamSearchResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_Snehapoorvam;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_SnehapoorvamSearchResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.snehapoorvamSearchCriteria;
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
@RequestMapping("/snehapoorvam")
@Validated
public class SnehapoorvamController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

    private final SnehapoorvamService obService;

    @Autowired
    public SnehapoorvamController(SnehapoorvamService obService) {

        this.obService = obService;
    }

    @PostMapping("/v1/Create")
    public ResponseEntity<SnehapoorvamResponse> create(@Valid @RequestBody SnehapoorvamRequest request) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Object obj = request;
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        } catch (Exception e) {
            log.error("Exception while fetching from searcher: ", e);
        }
        List<m_Snehapoorvam> ob = obService.create(request);

        SnehapoorvamResponse response = SnehapoorvamResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .m_Snehapoorvams(ob)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/v1/Update")
    public ResponseEntity<SnehapoorvamResponse> Update(@Valid @RequestBody SnehapoorvamRequest request) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Object obj = request;
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        } catch (Exception e) {
            log.error("Exception while fetching from searcher: ", e);
        }
        List<m_Snehapoorvam> ob = obService.Update1(request);

        SnehapoorvamResponse response = SnehapoorvamResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .m_Snehapoorvams(ob)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/v1/Search")
    public ResponseEntity<SnehapoorvamSearchResponse> searchSchoolCode(@RequestBody SnehapoorvamSearchRequest request,
            @Valid @ModelAttribute snehapoorvamSearchCriteria searchCriteria) {

        List<m_SnehapoorvamSearchResponse> result = obService.Search(searchCriteria);

        SnehapoorvamSearchResponse response = SnehapoorvamSearchResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .SnehapoorvamDetails(result)
                .build();
        return ResponseEntity.ok(response);
    }

}
