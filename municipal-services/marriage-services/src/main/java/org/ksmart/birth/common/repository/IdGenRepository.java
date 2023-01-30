package org.ksmart.birth.common.repository;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.ksmart.birth.common.Idgen.IdGenerationRequest;
import org.ksmart.birth.common.Idgen.IdGenerationResponse;
import org.ksmart.birth.common.Idgen.IdRequest;
import org.ksmart.birth.common.Idgen.IdResponse;
import org.ksmart.birth.config.BirthConfiguration;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

@Repository
public class IdGenRepository {

	@Autowired
    private RestTemplate restTemplate;

	@Autowired
    private BirthConfiguration config;

    @Autowired
    @Qualifier("objectMapperBnd")
    private ObjectMapper mapper;

    @Autowired
    private ServiceRequestRepository restRepo;

    public IdGenerationResponse getId(RequestInfo requestInfo, String tenantId, String name, String format, int count) {

        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder().idName(name).format(format).tenantId(tenantId).build());
        }
        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
        IdGenerationResponse response = null;
//        try {
            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
//        } catch (HttpClientErrorException e) {
//            throw new ServiceCallException(e.getResponseBodyAsString());
//        } catch (Exception e) {
//            Map<String, String> map = new HashMap<>();
//            map.put(e.getCause().getClass().getName(),e.getMessage());
//            throw new CustomException(map);
//        }
        return response;
    }


    public List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String idformat,
                                  Integer count) {
        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder()
                    .idName(idName)
                    .format(idformat)
                    .tenantId(tenantId)
                    .build());
        }

        IdGenerationRequest request = IdGenerationRequest.builder()
                .idRequests(reqList)
                .requestInfo(requestInfo)
                .build();
        StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
        IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
                IdGenerationResponse.class);

        List<IdResponse> idResponses = response.getIdResponses();

        if (CollectionUtils.isEmpty(idResponses)) {
            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
        }

        return idResponses.stream()
                .map(IdResponse::getId)
                .collect(Collectors.toList());
    }

}
