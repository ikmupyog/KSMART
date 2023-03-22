package org.egov.kssmAswasakiranam.service;


import java.util.List;
import javax.validation.Valid;

import org.egov.kssmAswasakiranam.config.AswasakiranamConfig;
import org.egov.kssmAswasakiranam.kafka.Producer;
import org.egov.kssmAswasakiranam.repository.AswasakiranamRepository;
import org.egov.kssmAswasakiranam.validators.AswasakiranamSearchValidator;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamRequest;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchCriteria;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_Aswasakiranam;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_AswasakiranamSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AswasakiranamService {

    private final Producer producer;
    private final AswasakiranamConfig snehapoorvamConfig;
    private final AswasakiranamRepository repository;
    private final AswasakiranamSearchValidator validator;

    @Autowired
    AswasakiranamService(Producer producer, AswasakiranamConfig obcon, AswasakiranamRepository repository, AswasakiranamSearchValidator validator ) {
        this.producer = producer;
        this.snehapoorvamConfig = obcon;
        this.validator = validator;
        this.repository = repository;
    }

    public List<m_Aswasakiranam> create(AswasakiranamRequest request) {
        producer.push(snehapoorvamConfig.getSaveAswasakiranamTopic(), request);
        return request.getM_Aswasakiranams();
    }

    public List<m_Aswasakiranam> Update(AswasakiranamRequest request) {
        producer.push(snehapoorvamConfig.getUpdateAswasakiranamTopic(),request);
        return request.getM_Aswasakiranams();
    }

    public List<m_AswasakiranamSearchResponse> Search(@Valid AswasakiranamSearchCriteria searchCriteria) {

        validator.validateSearch(searchCriteria);
        List<m_AswasakiranamSearchResponse> result = repository.getDetails(searchCriteria);
        return result;
    }
}
