package org.egov.tl.web.models;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
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
import org.egov.tl.web.models.TradeLicenseDetail;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds an Institution Master")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-01-03T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class InstitutionMaster {

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
    @JsonProperty("institutionId")
    private String institutionId = null;

    @Size(max = 256)
    @SafeHtml
    @JsonProperty("institutionName")
    private String institutionName = null;

    @Size(max = 500)
    @SafeHtml
    @JsonProperty("institutionNameLocal")
    private String institutionNameLocal = null;

    @Size(max = 30)
    @SafeHtml
    @JsonProperty("gstNumber")
    private String gstNumber = null;

    @Size(max = 30)
    @SafeHtml
    @JsonProperty("panNumber")
    private String panNumber = null;

    @Size(max = 1500)
    @SafeHtml
    @JsonProperty("address")
    private String address = null;

    @Size(max = 20)
    @SafeHtml
    @JsonProperty("email")
    private String email = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("contactno")
    private String contactno = null;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

}
