package org.egov.kssmSamaswasamScheme1;


import org.egov.tracer.config.TracerConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@Import({ TracerConfiguration.class })
@SpringBootApplication

@ComponentScan(basePackages = { "org.egov.kssmSamaswasamScheme1", "org.egov.kssmSamaswasamScheme1.web.controller",
        "org.egov.kssmSamaswasamScheme1.config" })
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

}
