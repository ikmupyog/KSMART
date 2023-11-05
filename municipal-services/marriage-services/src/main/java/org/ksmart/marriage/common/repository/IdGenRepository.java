package org.ksmart.marriage.common.repository;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.egov.tracer.model.ServiceCallException;
import org.ksmart.marriage.common.Idgen.IdGenerationRequest;
import org.ksmart.marriage.common.Idgen.IdGenerationResponse;
import org.ksmart.marriage.common.Idgen.IdRequest;
import org.ksmart.marriage.common.Idgen.IdResponse;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class IdGenRepository {

	@Autowired
    private RestTemplate restTemplate;

    @Autowired
    private MarriageApplicationConfiguration config;

    @Autowired
    @Qualifier("objectMapperBnd")
    private ObjectMapper mapper;

    @Autowired
    private ServiceRequestRepository restRepo;



//Jasmine -03.04.2023

    // @Autowired
    // private RestTemplate restTemplate;

	// @Autowired
    // private BirthDeathConfiguration config;

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
       //Jasmine  
    public List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String moduleCode,String fnType, int count) {
        List<IdResponse> idResponses = getMarriageIds(requestInfo, tenantId, idName, moduleCode, fnType, count).getIdResponses();

        if (CollectionUtils.isEmpty(idResponses))
        throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

        return idResponses.stream()
        .map(IdResponse::getId).collect(Collectors.toList());
        }

       //Jasmine  
    public IdGenerationResponse getMarriageIds(RequestInfo requestInfo, String tenantId, String Idname,  String modulecode, String functionType ,int count) {
    //System.out.println("modulecode"+modulecode);
        List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder().idName(Idname).moduleCode(modulecode).tenantId(tenantId).fnType(functionType).build());
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

//    public IdGenerationResponse getIdOld(RequestInfo requestInfo, String tenantId, String name, String format, int count) {
//
//        List<IdRequest> reqList = new ArrayList<>();
//        for (int i = 0; i < count; i++) {
//            reqList.add(IdRequest.builder().idName(name)
//                    .format(format)
//                    .tenantId(tenantId).build());
//        }
//        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
//        IdGenerationResponse response = null;
//        try {
//            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
//        } catch (HttpClientErrorException e) {
//            throw new ServiceCallException(e.getResponseBodyAsString());
//        } catch (Exception e) {
//            Map<String, String> map = new HashMap<>();
//            map.put(e.getCause().getClass().getName(),e.getMessage());
//            throw new CustomException(map);
//        }
//        return response;
//    }

//    public IdGenerationResponse getId(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {
//
//        List<IdRequest> reqList = new ArrayList<>();
//        for (int i = 0; i < count; i++) {
//            reqList.add(IdRequest.builder().idName(idName)
//                    .tenantId(tenantId)
//                   .moduleCode(moduleCode)
//                    .fnType(fnType)
//                    .build());
//        }
//        IdGenerationRequest req = IdGenerationRequest.builder().idRequests(reqList).requestInfo(requestInfo).build();
//        IdGenerationResponse response = null;
//        try {
//            response = restTemplate.postForObject( config.getIdGenHost()+ config.getIdGenPath(), req, IdGenerationResponse.class);
//        } catch (HttpClientErrorException e) {
//            throw new ServiceCallException(e.getResponseBodyAsString());
//        } catch (Exception e) {
//            Map<String, String> map = new HashMap<>();
//            map.put(e.getCause().getClass().getName(),e.getMessage());
//            throw new CustomException(map);
//        }
//        return response;
//    }


//    public List<String> getIdListOld(RequestInfo requestInfo, String tenantId, String idName, String idformat, Integer count) {
//        List<IdRequest> reqList = new ArrayList<>();
//        for (int i = 0; i < count; i++) {
//            reqList.add(IdRequest.builder()
//                    .idName(idName)
//                    .format(idformat)
//                    .tenantId(tenantId)
//                    .build());
//        }
//
//        IdGenerationRequest request = IdGenerationRequest.builder()
//                .idRequests(reqList)
//                .requestInfo(requestInfo)
//                .build();
//        StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
//        IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
//                IdGenerationResponse.class);
//
//        List<IdResponse> idResponses = response.getIdResponses();
//
//        if (CollectionUtils.isEmpty(idResponses)) {
//            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
//        }
//
//        return idResponses.stream()
//                .map(IdResponse::getId)
//                .collect(Collectors.toList());
//    }
//comment from here on 3.04.2023
    // public List<String> getIdList(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String  fnType, int count) {
    //     List<IdRequest> reqList = new ArrayList<>();
    //     for (int i = 0; i < count; i++) {
    //         reqList.add(IdRequest.builder()
    //                 .idName(idName)
    //                 .tenantId(tenantId)
    //                 .moduleCode(moduleCode)
    //                 .fnType(fnType)
    //                 .build());
    //     }

    //     IdGenerationRequest request = IdGenerationRequest.builder()
    //             .idRequests(reqList)
    //             .requestInfo(requestInfo)
    //             .build();
    //     StringBuilder uri = new StringBuilder(config.getIdGenHost()).append(config.getIdGenPath());
    //     System.out.println("req  :"+request);
    //     IdGenerationResponse response = mapper.convertValue(restRepo.fetchResult(uri, request),
    //             IdGenerationResponse.class);

    //     List<IdResponse> idResponses = response.getIdResponses();

    //     if (CollectionUtils.isEmpty(idResponses)) {
    //         throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
    //     }

    //     return idResponses.stream()
    //             .map(IdResponse::getId)
    //             .collect(Collectors.toList());
    // }


}
