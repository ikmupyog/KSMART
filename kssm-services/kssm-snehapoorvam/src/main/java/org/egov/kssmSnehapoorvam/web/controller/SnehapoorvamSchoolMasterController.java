package org.egov.kssmSnehapoorvam.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmSnehapoorvam.service.SnehapoorvamSchoolService;
import org.egov.kssmSnehapoorvam.util.ResponseInfoFactory;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SnehapoorvamSchoolMasterRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SnehapoorvamSchoolMasterResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.m_SnehapoorvamSchoolMaster;
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
@RequestMapping("/snehapoorvam")
@Validated
public class SnehapoorvamSchoolMasterController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

    private final SnehapoorvamSchoolService schoolService;

    @Autowired
    public SnehapoorvamSchoolMasterController(SnehapoorvamSchoolService schoolService) {

        this.schoolService = schoolService;
    }
    @PostMapping("/SchoolMaster/Create")
    public ResponseEntity <SnehapoorvamSchoolMasterResponse> create(@Valid @RequestBody SnehapoorvamSchoolMasterRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_SnehapoorvamSchoolMaster> ob =schoolService.create(request);

        SnehapoorvamSchoolMasterResponse response=SnehapoorvamSchoolMasterResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_SnehapoorvamSchoolMaster(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/SchoolMaster/Update")
    public ResponseEntity <SnehapoorvamSchoolMasterResponse> Update(@Valid @RequestBody SnehapoorvamSchoolMasterRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_SnehapoorvamSchoolMaster> ob =schoolService.Update(request);

        SnehapoorvamSchoolMasterResponse response=SnehapoorvamSchoolMasterResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .m_SnehapoorvamSchoolMaster(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }

    
   /*  @PostMapping("/_search")
    public ResponseEntity<SnehappoorvamSearchResponse> search(@RequestBody SnehapoorvamSearchRequest request,
                                                            @ModelAttribute SearchCriteria criteria) {

        List<SnehapoorvamSchoolRegistration> schools = schoolService.search(criteria);
        SnehappoorvamSearchResponse response=SnehappoorvamSearchResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
        .SnehapoorvamSchoolRegistration(schools)
        .build();
        return ResponseEntity.ok(response);
    }*/

    
}
