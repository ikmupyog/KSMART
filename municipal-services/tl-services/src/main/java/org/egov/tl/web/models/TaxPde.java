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
@ApiModel(description = "A Object holds the basic data for a Trade License")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class TaxPde {

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
    @JsonProperty("service")
    private String service = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("fromYear")
    private String fromYear = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("fromPeriod")
    private String fromPeriod = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("toYear")
    private String toYear = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("toPeriod")
    private String toPeriod = null;

    @Size(max = 15)
    @SafeHtml
    @JsonProperty("headCode")
    private String headCode = null;

    @JsonProperty("arrear")
    private Double arrear = null;

    @JsonProperty("current")
    private Double current = null;

    @JsonProperty("penal")
    private Double penal = null;

    @JsonProperty("amount")
    private Double amount = null;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

}
