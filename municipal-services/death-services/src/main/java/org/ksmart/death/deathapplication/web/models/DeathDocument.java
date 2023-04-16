package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;

import java.util.Objects;
import lombok.*;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class DeathDocument {

    @JsonProperty("Id")
    private String id;

    @JsonProperty("DeathDtlId")
    private String deathDtlId;

    @JsonProperty("Active")
    private Boolean active;

    @JsonProperty("TenantId")
    private String tenantId = null;

    @JsonProperty("DocumentType")
    private String documentType = null;

    @JsonProperty("FileStoreId")
    private String fileStoreId = null;

    @JsonProperty("FileName")
    private String fileName = null;

    @JsonProperty("DeathCorrectionId")
    private String deathCorrectionId = null;

    @JsonProperty("DeathACKNo")
    private String deathACKNo = null;

    @JsonProperty("AuditDetails")
    private AuditDetails deathDocAuditDetails = null;
    
}
