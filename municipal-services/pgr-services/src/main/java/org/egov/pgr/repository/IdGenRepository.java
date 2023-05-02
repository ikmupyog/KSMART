package org.egov.pgr.repository;

 

import org.egov.common.contract.request.RequestInfo;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.web.models.Idgen.IdGenerationRequest;
import org.egov.pgr.web.models.Idgen.IdGenerationResponse;
import org.egov.pgr.web.models.Idgen.IdRequest;
import org.egov.pgr.web.models.Idgen.IdResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.tracer.model.ServiceCallException;
 
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class IdGenRepository {



    private RestTemplate restTemplate;

    private PGRConfiguration config;
    
    @Autowired
//    @Qualifier("objectMapperBnd")
    private ObjectMapper mapper;
    

    @Autowired
    public IdGenRepository(RestTemplate restTemplate, PGRConfiguration config) {
        this.restTemplate = restTemplate;
        this.config = config;
    }


    /**
     * Call iDgen to generateIds
     * @param requestInfo The rquestInfo of the request
     * @param tenantId The tenantiD of the service request
     * @param name Name of the foramt
     * @param format Format of the ids
     * @param count Total Number of idGen ids required
     * @return
     */
    public IdGenerationResponse getId(RequestInfo requestInfo, String tenantId, String name, String format, int count) {

        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder().idName(name).format(format).tenantId(tenantId).build());
        }
        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
        IdGenerationResponse response = null;
        try {
            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
        } catch (HttpClientErrorException e) {
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            Map<String, String> map = new HashMap<>();
            map.put(e.getCause().getClass().getName(),e.getMessage());
            throw new CustomException(map);
        }
        return response;
    }
    
    public  List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {
        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder()
                    .idName(idName)
                    .tenantId(tenantId)
                    .moduleCode(moduleCode)
                    .fnType(fnType)
                    .build());
        }

        IdGenerationRequest request = IdGenerationRequest.builder()
                .idRequests(reqList)
                .requestInfo(requestInfo)
                .build();
//        StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
        
        IdGenerationResponse response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), request, IdGenerationResponse.class);
        
        
        List<IdResponse> idResponses = response.getIdResponses();

        if (CollectionUtils.isEmpty(idResponses)) {
            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
        }

        return idResponses.stream()
                .map(IdResponse::getId)
                .collect(Collectors.toList());
        
 
        
        
    }





}
