package org.egov.filemgmnt;

import org.egov.encryption.config.EncryptionConfiguration;

//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

import lombok.extern.slf4j.Slf4j;

@Import({ TracerConfiguration.class })
@SpringBootApplication
@ComponentScan(basePackages = { "org.egov.filemgmnt", "org.egov.encryption" },
               excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
                                                      classes = { EncryptionConfiguration.class }))
@Slf4j
public class Main { // NOPMD

//    @Autowired
//    private EncryptionService encService;

    public static void main(String[] args) { // NOPMD
        SpringApplication.run(Main.class, args);
    }

    @Autowired
    @Bean
    protected ApplicationRunner debugJdbcUrl(final Environment env) {
        return args -> {
            if (log.isInfoEnabled()) {
                log.info("JDBC Url = {}", env.getProperty("spring.datasource.url"));
            }
        };
    }

//    @Autowired
//    @Bean
//    ApplicationRunner debugEncryption() {
//        return args -> {
//            DummyUser user = new DummyUser("1234567890");
//            try {
//                String result = encService.encryptJson(user, "User", "kl", DummyUser.class);
//                log.info("*** Encrypted Value:  {}", result);
//            } catch (IOException e) {
//                log.error(e.getLocalizedMessage(), e);
//            }
//        };
//    }
//
//    @Getter
//    @Setter
//    @AllArgsConstructor
//    private static class DummyUser {
//        private String aadhaarNumber;
//    }
}
