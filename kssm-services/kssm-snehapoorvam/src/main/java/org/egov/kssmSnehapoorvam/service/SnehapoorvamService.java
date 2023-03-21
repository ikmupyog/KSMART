package org.egov.kssmSnehapoorvam.service;

import java.util.List;

import javax.validation.Valid;
import org.egov.kssmSnehapoorvam.config.SnehapoorvamConfig;
import org.egov.kssmSnehapoorvam.kafka.Producer;
import org.egov.kssmSnehapoorvam.repository.SnehapoorvamRepository;
import org.egov.kssmSnehapoorvam.validators.SnehapoorvamValidator;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_Snehapoorvam;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_SnehapoorvamSearchResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.snehapoorvamSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SnehapoorvamService {

    private final Producer producer;
    private final SnehapoorvamConfig snehapoorvamConfig;
    private final SnehapoorvamRepository repository;
    private final SnehapoorvamValidator validator;

    @Autowired
    public SnehapoorvamService(Producer producer, SnehapoorvamConfig snehapoorvamConfig,
            SnehapoorvamRepository repository, SnehapoorvamValidator validator) {
        this.producer = producer;
        this.snehapoorvamConfig = snehapoorvamConfig;
        this.validator = validator;
        this.repository = repository;

    }

    public List<m_Snehapoorvam> create(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamCreateTopic(), request);
        return request.getM_snehapoorvams();
    }

    public List<m_Snehapoorvam> Update1(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamUpdateTopic(), request);
        return request.getM_snehapoorvams();
    }

    public List<m_SnehapoorvamSearchResponse> Search(@Valid snehapoorvamSearchCriteria searchCriteria) {

        validator.validateSearch(searchCriteria);
        List<m_SnehapoorvamSearchResponse> result = repository.getSnehapoorvamDetails(searchCriteria);
        return result;
    }

}
