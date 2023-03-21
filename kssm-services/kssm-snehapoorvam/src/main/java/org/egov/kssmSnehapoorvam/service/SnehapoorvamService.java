package org.egov.kssmSnehapoorvam.service;


import java.util.List;

import org.egov.kssmSnehapoorvam.config.SnehapoorvamConfig;
import org.egov.kssmSnehapoorvam.kafka.Producer;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.SnehapoorvamRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_Snehapoorvam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SnehapoorvamService {

    private final Producer producer;
    private final SnehapoorvamConfig snehapoorvamConfig;
   
    

    @Autowired
    public SnehapoorvamService(Producer producer, SnehapoorvamConfig snehapoorvamConfig) {
        this.producer = producer;
        this.snehapoorvamConfig = snehapoorvamConfig;
     
    }

    public List<m_Snehapoorvam> create(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamCreateTopic(), request);
        return request.getM_snehapoorvams();
    }

    public List<m_Snehapoorvam> Update1(SnehapoorvamRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamUpdateTopic(),request);
        return request.getM_snehapoorvams();
    }

   

}
