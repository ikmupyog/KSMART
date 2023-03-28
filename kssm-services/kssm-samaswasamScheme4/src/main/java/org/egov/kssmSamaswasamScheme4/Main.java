package org.egov.kssmSamaswasamScheme4;


import org.egov.tracer.config.TracerConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@Import({ TracerConfiguration.class })
@SpringBootApplication

@ComponentScan(basePackages = { "org.egov.kssmSamaswasamScheme4", "org.egov.kssmSamaswasamScheme4.web.controller",
        "org.egov.kssmSamaswasamScheme4.config" })
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

}
