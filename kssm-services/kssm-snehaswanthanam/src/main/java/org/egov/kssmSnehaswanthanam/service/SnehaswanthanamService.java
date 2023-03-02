package org.egov.kssmSnehaswanthanam.service;

import java.util.List;

import javax.validation.Valid;

import org.egov.kssmSnehaswanthanam.config.SnehaswanthanamConfig;
import org.egov.kssmSnehaswanthanam.kafka.Producer;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamRequest;
import org.egov.kssmSnehaswanthanam.web.models.m_Snehaswanthanam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SnehaswanthanamService {

    private final Producer producer;
    private final SnehaswanthanamConfig configob;

    @Autowired
    SnehaswanthanamService(Producer producer, SnehaswanthanamConfig obcon) {
        this.producer = producer;
        this.configob = obcon;
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
}
