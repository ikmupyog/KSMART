package org.ksmart.death.deathapplication.web.models;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class WorkFlowDocuments {
    @JsonProperty("Id")
    private String id;

    @JsonProperty("DeathDtlId")
    private String deathDtlId;

    @JsonProperty("Active")
    private Boolean active;

    @JsonProperty("TenantId")
    private String tenantId = null;

    @JsonProperty("documentType")
    private String documentType = null;

    @JsonProperty("fileStoreId")
    private String fileStoreId = null;

    @JsonProperty("fileName")
    private String fileName = null;
}
