package org.egov.kssmSnehapoorvam.service.SnehapoorvamSchoolMasterService;


import java.util.List;

import org.egov.kssmSnehapoorvam.config.SnehapoorvamConfig;
import org.egov.kssmSnehapoorvam.kafka.Producer;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SnehapoorvamSchoolMasterRequest;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.m_SnehapoorvamSchoolMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SnehapoorvamSchoolService {
    //private final SnehapoorvamSearchValidator validatorService;

    private final Producer producer;
    private final SnehapoorvamConfig snehapoorvamConfig;
   // private final SchoolRepository repository;




    @Autowired
    SnehapoorvamSchoolService(Producer producer, SnehapoorvamConfig obcon) {
        this.producer = producer;
        this.snehapoorvamConfig = obcon;
        //this.validatorService=validatorService;
//this.repository=repository;
    }

    

    

    public List<m_SnehapoorvamSchoolMaster> create(SnehapoorvamSchoolMasterRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamSchoolCreateTopic(), request);
        return request.getM_snehapoorvamSchoolMaster();
    }

    public List<m_SnehapoorvamSchoolMaster> Update(SnehapoorvamSchoolMasterRequest request) {
        producer.push(snehapoorvamConfig.getSaveSnehapoorvamSchoolUpdateTopic(),request);
        return request.getM_snehapoorvamSchoolMaster();
    }

  
   /*  public List<SnehapoorvamSchoolRegistration> search(SearchCriteria criteria) {
		validatorService.validateSearch(criteria);
		return repository.getSchoolDetails(criteria);
	}*/
}
