package org.egov.kssmwecare.service;


import java.util.List;
import javax.validation.Valid;



import org.egov.kssmwecare.config.WecareConfig;
import org.egov.kssmwecare.kafka.Producer;
import org.egov.kssmwecare.repository.WecareRepository;
import org.egov.kssmwecare.validators.WecareSearchValidator;
import org.egov.kssmwecare.web.models.Wecare.WecareRequest;
import org.egov.kssmwecare.web.models.Wecare.WecareSearchCriteria;
import org.egov.kssmwecare.web.models.Wecare.m_Wecare;
import org.egov.kssmwecare.web.models.Wecare.m_WecareSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WecareService {

    private final Producer producer;
    private final WecareConfig wecareConfig;
    private final WecareRepository repository;
    private final WecareSearchValidator validator;

    
    

    public WecareService(Producer producer, WecareConfig wecareConfig, WecareRepository repository,
            WecareSearchValidator validator) {
        this.producer = producer;
        this.wecareConfig = wecareConfig;
        this.repository = repository;
        this.validator = validator;
    }

    public List<m_Wecare> create(WecareRequest request) {
        producer.push(wecareConfig.getSaveWecareTopic(), request);
        return request.getTr_Wecares();
    }

    public List<m_Wecare> Update(WecareRequest request) {
        producer.push(wecareConfig.getUpdateWecareTopic(),request);
        return request.getTr_Wecares();
    }

    public List<m_WecareSearch> Search(@Valid WecareSearchCriteria searchCriteria) {

        validator.validateSearch(searchCriteria);
        List<m_WecareSearch> result = repository.getDetails(searchCriteria);
        return result;
    }

   
}
