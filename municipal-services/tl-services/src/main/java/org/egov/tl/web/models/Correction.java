package org.egov.tl.web.models;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import org.apache.http.impl.client.NullBackoffStrategy;
import org.egov.tl.web.models.AuditDetails;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the details of the owner of the premises")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-03-26T13:07:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Correction {

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeLicenseId")
    private String tradeLicenseId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeLicenseDetailId")
    private String tradeLicenseDetailId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("licenseNumber")
    private String licenseNumber = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("applicationNumber")
    private String applicationNumber = null;

    @JsonProperty("correction")
    private JsonNode correction = null;

    @JsonProperty("history")
    private JsonNode history = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("status")
    private String status = null;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

    @JsonProperty("active")
    private Boolean active;

}
