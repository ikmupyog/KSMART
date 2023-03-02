package org.egov.kssmAswasakiranam.service;


import java.util.List;
import org.egov.kssmAswasakiranam.web.models.m_Aswasakiranam;
import org.egov.kssmAswasakiranam.web.models.AswasakiranamRequest;

import org.egov.kssmAswasakiranam.config.AswasakiranamConfig;
import org.egov.kssmAswasakiranam.kafka.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AswasakiranamService {

    private final Producer producer;
    private final AswasakiranamConfig snehapoorvamConfig;

    @Autowired
    AswasakiranamService(Producer producer, AswasakiranamConfig obcon) {
        this.producer = producer;
        this.snehapoorvamConfig = obcon;
    }

    public List<m_Aswasakiranam> create(AswasakiranamRequest request) {
        producer.push(snehapoorvamConfig.getSaveAswasakiranamTopic(), request);
        return request.getM_Aswasakiranams();
    }

    public List<m_Aswasakiranam> Update(AswasakiranamRequest request) {
        producer.push(snehapoorvamConfig.getUpdateAswasakiranamTopic(),request);
        return request.getM_Aswasakiranams();
    }
}
