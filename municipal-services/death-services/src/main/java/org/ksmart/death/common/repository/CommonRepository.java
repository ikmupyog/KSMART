package org.ksmart.death.common.repository;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.death.common.model.common.CommonPay;
import org.ksmart.death.common.model.common.CommonPayRequest;
import org.ksmart.death.common.producer.BndProducer;
import org.ksmart.death.common.repository.builder.CommonQueryBuilder;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class CommonRepository {
    @Autowired
    CommonQueryBuilder commonQueryBuilder;

    @Autowired
    DeathConfiguration birthDeathConfiguration;
    private final BndProducer producer;
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    CommonRepository(BndProducer producer, JdbcTemplate jdbcTemplate){
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
    }
    public List<CommonPay> updatePaymentDetails(CommonPayRequest request) {   
    	 
        producer.push(birthDeathConfiguration.getUpdateDeathPaymentTopic(), request);
        return request.getCommonPays();
    }   
}
