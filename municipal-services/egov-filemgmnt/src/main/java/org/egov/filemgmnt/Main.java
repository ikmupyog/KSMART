package org.egov.filemgmnt;

//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

import lombok.extern.slf4j.Slf4j;

@Import({ TracerConfiguration.class })
@SpringBootApplication
//@ComponentScan(basePackages = { "org.egov.filemgmnt", "org.egov.encryption" },
//               excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
//                                                      classes = { EncryptionConfiguration.class }))

@ComponentScan(basePackages = { "org.egov.filemgmnt" })

@Slf4j
public class Main { // NOPMD

//    @Autowired
//    private EncryptionService encService;

    public static void main(String[] args) { // NOPMD
        SpringApplication.run(Main.class, args);
    }
//    @Autowired
//    @Bean
//    public ObjectMapper objectMapperFM() {
//        return new ObjectMapper().configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true)
//                                 .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
//                                 .enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
//    }

    @Autowired
    @Bean
    public ApplicationRunner debugJdbcUrl(Environment env) {
        return args -> {
            log.info("JDBC Url = {}", env.getProperty("spring.datasource.url"));
        };
    }

//    @Autowired
//    @Bean
//    ApplicationRunner debugJdbcUrl(Environment env) {
//        return args -> {
//            log.info("JDBC Url = {}", env.getProperty("spring.datasource.url"));

//            DummyUser user = new DummyUser("1234567890");
//            try {
//                String result = encService.encryptJson(user, "User", "kl", DummyUser.class);
//                log.info("*** Encrypted Value:  {}", result);
//            } catch (IOException e) {
//                log.error(e.getLocalizedMessage(), e);
//            }
//        };
//    }

//    @Getter
//    @Setter
//    @AllArgsConstructor
//    private static class DummyUser {
//        private String aadhaarNumber;
//    }
}
