package org.egov.kssmSamaswasamScheme3.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmSamaswasamScheme3.service.SamaswasamService;
import org.egov.kssmSamaswasamScheme3.util.ResponseInfoFactory;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamRequest;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamResponse;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchCriteria;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchRequest;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchResponse;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.m_Samaswasam;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.m_SamaswasamSearchResponse;
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
@RequestMapping("/Samaswasam")
@Validated
public class SamaswasamController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

    private final SamaswasamService obService;

    @Autowired
    public SamaswasamController(SamaswasamService obService) {

        this.obService = obService;
    }
    @PostMapping("/v1/Create")
    public ResponseEntity <SamaswasamResponse> create(@Valid @RequestBody SamaswasamRequest request) {
        
    
        List<m_Samaswasam> ob =obService.create(request);

        SamaswasamResponse response=SamaswasamResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_Samaswasams(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping("/v1/Update")
    public ResponseEntity <SamaswasamResponse> Update(@Valid @RequestBody SamaswasamRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_Samaswasam> ob =obService.Update(request);

        SamaswasamResponse response=SamaswasamResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_Samaswasams(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/v1/Search")
    public ResponseEntity<SamaswasamSearchResponse> searchSchoolCode(@RequestBody SamaswasamSearchRequest request,
            @Valid @ModelAttribute SamaswasamSearchCriteria searchCriteria) {

        List<m_SamaswasamSearchResponse> result = obService.Search(searchCriteria);

        SamaswasamSearchResponse response = SamaswasamSearchResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .SamaswasamDetails(result)
                .build();
        return ResponseEntity.ok(response);
    }


    
}
