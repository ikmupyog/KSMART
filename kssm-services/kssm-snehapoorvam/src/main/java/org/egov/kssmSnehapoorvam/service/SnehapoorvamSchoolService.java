package org.egov.kssmSnehapoorvam.service;

import javax.validation.Valid;
import java.util.List;

import org.egov.kssmSnehapoorvam.config.SnehapoorvamConfig;
import org.egov.kssmSnehapoorvam.kafka.Producer;
import org.egov.kssmSnehapoorvam.repository.SnehapoorvamSchoolRepository;
import org.egov.kssmSnehapoorvam.validators.SnehapoorvamSchoolRegValidator;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SchoolSearchCriteria;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SnehapoorvamSchoolMasterRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.m_SnehapoorvamSchoolReg;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.m_SnehapoorvamSchoolMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SnehapoorvamSchoolService {

    private final Producer producer;
    private final SnehapoorvamConfig snehapoorvamConfig;
    private final SnehapoorvamSchoolRepository repository;
    private final SnehapoorvamSchoolRegValidator validator;

    @Autowired
    SnehapoorvamSchoolService(Producer producer, SnehapoorvamConfig obcon, SnehapoorvamSchoolRepository repository,
            SnehapoorvamSchoolRegValidator validator) {
        this.producer = producer;
        this.snehapoorvamConfig = obcon;
        this.validator = validator;
        this.repository = repository;
    }

    public List<m_SnehapoorvamSchoolMaster> create(SnehapoorvamSchoolMasterRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamSchoolCreateTopic(), request);
        return request.getM_snehapoorvamSchoolMaster();
    }

    public List<m_SnehapoorvamSchoolMaster> Update(SnehapoorvamSchoolMasterRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamSchoolUpdateTopic(), request);
        return request.getM_snehapoorvamSchoolMaster();
    }

    public List<m_SnehapoorvamSchoolReg> searchSchoolCode(@Valid SchoolSearchCriteria searchCriteria) {

        validator.validateSearch(searchCriteria);
        List<m_SnehapoorvamSchoolReg> result = repository.getSchoolDetails(searchCriteria);
        return result;
    }

}
