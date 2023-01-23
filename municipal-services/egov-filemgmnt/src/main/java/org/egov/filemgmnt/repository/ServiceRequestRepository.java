package org.egov.filemgmnt.repository;

import java.util.Map;

import org.egov.tracer.model.ServiceCallException;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class ServiceRequestRepository {

    // private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    ServiceRequestRepository(/* final ObjectMapper mapper, */ final RestTemplate restTemplate) {
        // this.objectMapper = mapper;
        this.restTemplate = restTemplate;
    }

    public Object fetchResult(final StringBuilder uri, final Object request) {
        return fetchResult(uri, request, Map.class);
    }

    public Object fetchResult(final StringBuilder uri, final Object request, final Class<?> clazz) {
        // objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        Object response = null;
        try {
            response = restTemplate.postForObject(uri.toString(), request, clazz);
        } catch (HttpClientErrorException e) {
            log.error("External Service threw an Exception: ", e);
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Exception while fetching from searcher: ", e);
        }

        return response;
    }
}