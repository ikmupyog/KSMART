package org.egov.kssmSnehapoorvam;


import org.egov.tracer.config.TracerConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@Import({ TracerConfiguration.class })
@SpringBootApplication

@ComponentScan(basePackages = { "org.egov.kssmSnehapoorvam", "org.egov.kssmSnehapoorvam.web.controller",
        "org.egov.kssmSnehapoorvam.config" })
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

}
