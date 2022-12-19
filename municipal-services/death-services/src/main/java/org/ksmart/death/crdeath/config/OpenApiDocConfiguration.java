package org.ksmart.death.crdeath.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
class OpenApiDocConfiguration {

    @Bean
    GroupedOpenApi crDeathApi() {
        return GroupedOpenApi.builder()
                             .group("1.0.0")
                             .pathsToMatch("/v1/**")
                             .packagesToScan("org.ksmart.death.crdeath.web")
                             .build();
    }

    @Bean
    OpenAPI crDeathApiInfo() {
        return new OpenAPI().info(new Info().title("Death Registration API's")
                                            .description("egov Death Registration API's")
                                            .version("1.0.0"))
                            .addServersItem(new Server().url("http://localhost:9111/death-services")
                           //.addServersItem(new Server().url("http://localhost:8080/v3/api-docs/")
                                                        .description("Local Development Server"));
        // .schema("Error", getErrorSchema());
    }

//    private Schema<?> getErrorSchema() {
//        return new Schema<>().type("object")
//                             .description("Error details")
//                             .addProperty("code",
//                                          new Schema<>().type("string")
//                                                        .description("error message code")
//                                                        .example("NOT_FOUND"));
//    }
}

// https://github.com/swagger-api/swagger-core/wiki/Swagger-2.X---Annotations#OpenAPIDefinition
