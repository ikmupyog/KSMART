package org.egov.filemgmnt.config;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
class JsonMapperConfiguration {

    private final FMConfiguration fmConfig;

    JsonMapperConfiguration(final FMConfiguration fmConfig) {
        this.fmConfig = fmConfig;
    }

    @PostConstruct
    void initialize() {
        TimeZone.setDefault(TimeZone.getTimeZone(fmConfig.getTimeZone()));
    }

    @Bean
    protected ObjectMapper objectMapper() {
        return JsonMapper.builder()
                         .addModules(new JavaTimeModule())
                         .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                         .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
                         .enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES)
                         .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
                         .defaultTimeZone(TimeZone.getTimeZone(fmConfig.getTimeZone()))
                         .build();
    }

    @Bean
    @Autowired
    protected MappingJackson2HttpMessageConverter jacksonConverter(final ObjectMapper objectMapper) {
        return new MappingJackson2HttpMessageConverter(objectMapper);
    }
}
