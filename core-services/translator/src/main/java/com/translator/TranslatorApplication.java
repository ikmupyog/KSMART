package com.translator;


import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({TracerConfiguration.class})
public class TranslatorApplication {
	@Value("${app.timezone}")
	private String timeZone;

	public static void main(String[] args)
	{
		SpringApplication.run(TranslatorApplication.class, args);
	}
}
