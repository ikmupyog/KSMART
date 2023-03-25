package org.egov.kssmwecare.web.controller;

import javax.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.egov.kssmwecare.service.WecareService;
import org.egov.kssmwecare.web.models.Wecare.WeCareSearchRequest;
import org.egov.kssmwecare.web.models.Wecare.WeCareSearchResponse;
import org.egov.kssmwecare.web.models.Wecare.WecareRequest;
import org.egov.kssmwecare.web.models.Wecare.WecareResponse;
import org.egov.kssmwecare.web.models.Wecare.WecareSearchCriteria;
import org.egov.kssmwecare.web.models.Wecare.m_Wecare;
import org.egov.kssmwecare.web.models.Wecare.m_WecareSearch;
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
@RequestMapping("/wecare")
@Validated
public class WecareController {

    @Autowired
    private org.egov.kssmwecare.util.ResponseInfoFactory responseInfoFactory;

    private final WecareService obService;

    @Autowired
    public WecareController(WecareService obService) {

        this.obService = obService;
    }
    @PostMapping("/v1/Create")
    public ResponseEntity <WecareResponse> create(@Valid @RequestBody WecareRequest request) {
        
      
        List<m_Wecare> ob =obService.create(request);

        WecareResponse response=WecareResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .tr_Wecares(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping("/v1/Update")
    public ResponseEntity <WecareResponse> Update(@Valid @RequestBody WecareRequest request) {
        
        try {
                ObjectMapper mapper = new ObjectMapper();
                Object obj = request;
                mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                
            }catch(Exception e) {
                log.error("Exception while fetching from searcher: ",e);
            }
        List<m_Wecare> ob =obService.Update(request);

        WecareResponse response=WecareResponse.builder().responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                                        .tr_Wecares(ob)
                                                                        .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping("/v1/Search")
    public ResponseEntity<WeCareSearchResponse> searchSchoolCode(@RequestBody WeCareSearchRequest request,
            @Valid @ModelAttribute WecareSearchCriteria searchCriteria) {

        List<m_WecareSearch> result = obService.Search(searchCriteria);

        WeCareSearchResponse response = WeCareSearchResponse.builder()
                .responseInfo(
                        responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .wecareSearchDetails(result)
                .build();
        return ResponseEntity.ok(response);
    }


    }


    

