package org.egov.kssmAswasakiranam.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmAswasakiranam.service.AswasakiranamService;
import org.egov.kssmAswasakiranam.util.ResponseInfoFactory;
import org.egov.kssmAswasakiranam.web.models.AswasakiranamRequest;
import org.egov.kssmAswasakiranam.web.models.AswasakiranamResponse;
import org.egov.kssmAswasakiranam.web.models.m_Aswasakiranam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
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

    
}
