package org.egov.kssmsnehaswanthanam;

import static org.mockito.Mockito.mock;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.kafka.core.KafkaTemplate;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@TestConfiguration
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class TestConfig { // NOPMD

    @Bean
    @Primary
    @SuppressWarnings("unchecked")
    KafkaTemplate<String, Object> kafkaTemplate() {
        return mock(KafkaTemplate.class);
    }

//    @Bean
//    @Primary
//    JdbcTemplate jdbcTemplate() {
//        return mock(JdbcTemplate.class);
//    }

//    @Bean
//    @Primary
//    RestTemplate restTemplate() {
//        return mock(RestTemplate.class);
//    }

}
