package org.egov.kssmAswasakiranam.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmAswasakiranam.service.AswasakiranamService;
import org.egov.kssmAswasakiranam.util.ResponseInfoFactory;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamRequest;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamResponse;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchCriteria;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchRequest;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchResponse;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_Aswasakiranam;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_AswasakiranamSearchResponse;
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
@RequestMapping("/aswasakiranam")
@Validated
public class AswasakiranamController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

    private final AswasakiranamService obService;

    @Autowired
    public AswasakiranamController(AswasakiranamService obService) {

        this.obService = obService;
    }
    @PostMapping("/v1/Create")
    public ResponseEntity <AswasakiranamResponse> create(@Valid @RequestBody AswasakiranamRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_Aswasakiranam> ob =obService.create(request);

        AswasakiranamResponse response=AswasakiranamResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_Aswasakiranams(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping("/v1/Update")
    public ResponseEntity <AswasakiranamResponse> Update(@Valid @RequestBody AswasakiranamRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_Aswasakiranam> ob =obService.Update(request);

        AswasakiranamResponse response=AswasakiranamResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_Aswasakiranams(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/v1/Search")
    public ResponseEntity<AswasakiranamSearchResponse> searchSchoolCode(@RequestBody AswasakiranamSearchRequest request,
            @Valid @ModelAttribute AswasakiranamSearchCriteria searchCriteria) {

        List<m_AswasakiranamSearchResponse> result = obService.Search(searchCriteria);

        AswasakiranamSearchResponse response = AswasakiranamSearchResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .AswasakiranamDetails(result)
                .build();
        return ResponseEntity.ok(response);
    }


    
}
