package org.egov.filemgmnt.repository;

import java.util.Map;

import org.egov.filemgmnt.util.FMUtils;
import org.egov.tracer.model.ServiceCallException;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class ServiceRequestRepository {

    private final RestTemplate restTemplate;

    ServiceRequestRepository(final RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object fetchResult(final StringBuilder uri, final Object request) {
        return fetchResult(uri, request, Map.class);
    }

    public <T> T fetchResult(final StringBuilder uri, final Object request, final Class<T> clazz) {
        T response = null;
        try {
            if (log.isInfoEnabled()) {
                log.info("URI: {}", uri.toString());
                log.info("Request: \n{}", FMUtils.toJson(request));
            }

            response = restTemplate.postForObject(uri.toString(), request, clazz);

            if (log.isInfoEnabled()) {
                log.info("Response: \n{}", FMUtils.toJson(response));
            }
        } catch (HttpClientErrorException e) {
            log.error("External Service threw an Exception: ", e);
            throw new ServiceCallException(e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Exception while fetching from searcher: ", e);
        }

        return response;
    }

}