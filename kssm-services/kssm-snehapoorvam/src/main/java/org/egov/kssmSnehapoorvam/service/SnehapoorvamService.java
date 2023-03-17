package org.egov.kssmSnehapoorvam.service;


import java.util.List;

import javax.validation.Valid;

import org.egov.kssmSnehapoorvam.config.SnehapoorvamConfig;
import org.egov.kssmSnehapoorvam.kafka.Producer;
import org.egov.kssmSnehapoorvam.repository.SnehapoorvamRepository;
import org.egov.kssmSnehapoorvam.validors.SnehapoorvamSchoolRegValidator;
import org.egov.kssmSnehapoorvam.web.models.SchoolSearchCriteria;
import org.egov.kssmSnehapoorvam.web.models.SnehapoorvamRequest;
import org.egov.kssmSnehapoorvam.web.models.SnehapoorvamSchoolReg;
import org.egov.kssmSnehapoorvam.web.models.m_Snehapoorvam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SnehapoorvamService {

    private final Producer producer;
    private final SnehapoorvamConfig snehapoorvamConfig;
    private final SnehapoorvamRepository repository;
    private final SnehapoorvamSchoolRegValidator validator;

    

    @Autowired
    public SnehapoorvamService(Producer producer, SnehapoorvamConfig snehapoorvamConfig,
            SnehapoorvamRepository repository, SnehapoorvamSchoolRegValidator validator) {
        this.producer = producer;
        this.snehapoorvamConfig = snehapoorvamConfig;
        this.repository = repository;
        this.validator = validator;
    }

    public List<m_Snehapoorvam> create(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamCreateTopic(), request);
        return request.getM_snehapoorvams();
    }

    public List<m_Snehapoorvam> Update1(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamUpdateTopic(),request);
        return request.getM_snehapoorvams();
    }

    public List<SnehapoorvamSchoolReg> searchSchoolCode(@Valid SchoolSearchCriteria searchCriteria) {
        
    
        validator.validateSearch( searchCriteria);
        List<SnehapoorvamSchoolReg> result = repository.getSchoolDetails(searchCriteria);
        return result;
    }

}
