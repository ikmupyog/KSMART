package org.egov.kssmSnehaswanthanam.service;

import java.util.List;

import javax.validation.Valid;

import org.egov.kssmSnehaswanthanam.config.SnehaswanthanamConfig;
import org.egov.kssmSnehaswanthanam.kafka.Producer;
import org.egov.kssmSnehaswanthanam.repository.SnehaswanthanamRepository;
import org.egov.kssmSnehaswanthanam.validators.SnehaswanthanamValidator;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamRequest;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamSearchCriteria;
import org.egov.kssmSnehaswanthanam.web.models.m_Snehaswanthanam;
import org.springframework.stereotype.Service;


@Service
public class SnehaswanthanamService {

    private final Producer producer;
    private final SnehaswanthanamConfig configob;
    private final SnehaswanthanamValidator validator;
    private final SnehaswanthanamRepository repository;

    


    public SnehaswanthanamService(Producer producer, SnehaswanthanamConfig configob, SnehaswanthanamValidator validator,
            SnehaswanthanamRepository repository) {
        this.producer = producer;
        this.configob = configob;
        this.validator = validator;
        this.repository = repository;
    }

    public List<m_Snehaswanthanam> create(SnehaswanthanamRequest request) {

        SnehaswanthanamRequest rq = new SnehaswanthanamRequest();
        producer.push(configob.getSnehaswanthanamCreateTopic(), request);
        return request.getM_Snehaswanthanam();
    }

    public List<m_Snehaswanthanam> update(@Valid SnehaswanthanamRequest request) {
        producer.push(configob.getSnehaswanthanamUpdateTopic(), request);
        return (List<m_Snehaswanthanam>) request.getM_Snehaswanthanam();
    }

    public List<m_Snehaswanthanam> searchSnehaswanthanamDetails(@Valid SnehaswanthanamSearchCriteria searchCriteria) {
        validator.validateSearch( searchCriteria);
        List<m_Snehaswanthanam> result = repository.getSnehaswanthanamDetails(searchCriteria);
        return result;
    }
}
