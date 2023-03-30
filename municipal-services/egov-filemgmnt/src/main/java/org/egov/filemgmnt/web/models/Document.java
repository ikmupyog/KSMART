package org.egov.filemgmnt.web.models;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the basic data for a Trade License")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-12-04T11:26:25.532+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id"})
public class Document   {

        @Size(max=64)
        @JsonProperty("id")
        private String id;

        @Size(max=64)
        @JsonProperty("tenantId")
        private String tenantId;

        @Size(max=64)
        @JsonProperty("documentType")
        private String documentType;

        @Size(max=64)
        @JsonProperty("fileStoreId")
        private String fileStoreId;

        @Size(max=64)
        @JsonProperty("documentUid")
        private String documentUid;

        @JsonProperty("auditDetails")
        private AuditDetails auditDetails;


}

