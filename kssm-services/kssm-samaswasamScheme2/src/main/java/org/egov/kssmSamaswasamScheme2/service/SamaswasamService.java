package org.egov.kssmSamaswasamScheme2.service;


import java.util.List;
import javax.validation.Valid;

import org.egov.kssmSamaswasamScheme2.config.SamaswasamConfig;
import org.egov.kssmSamaswasamScheme2.kafka.Producer;
import org.egov.kssmSamaswasamScheme2.repository.SamaswasamRepository;
import org.egov.kssmSamaswasamScheme2.validators.SamaswasamSearchValidator;
import org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2.SamaswasamRequest;
import org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2.SamaswasamSearchCriteria;
import org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2.m_Samaswasam;
import org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2.m_SamaswasamSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SamaswasamService {

    private final Producer producer;
    private final SamaswasamConfig snehapoorvamConfig;
    private final SamaswasamRepository repository;
    private final SamaswasamSearchValidator validator;

    @Autowired
    SamaswasamService(Producer producer, SamaswasamConfig obcon, SamaswasamRepository repository, SamaswasamSearchValidator validator ) {
        this.producer = producer;
        this.snehapoorvamConfig = obcon;
        this.validator = validator;
        this.repository = repository;
    }

    public List<m_Samaswasam> create(SamaswasamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSamaswasamTopic(), request);
        return request.getM_Samaswasam();
    }

    public List<m_Samaswasam> Update(SamaswasamRequest request) {
        producer.push(snehapoorvamConfig.getUpdateSamaswasamTopic(),request);
        return request.getM_Samaswasam();
    }

    public List<m_SamaswasamSearchResponse> Search(@Valid SamaswasamSearchCriteria searchCriteria) {

        validator.validateSearch(searchCriteria);
        List<m_SamaswasamSearchResponse> result = repository.getDetails(searchCriteria);
        return result;
    }
}
