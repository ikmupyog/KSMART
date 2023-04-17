package org.egov.tl.web.models.correction;

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
@ApiModel(description = "A Object holds the business category details to be updated on approval of Correction Request")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-04-11T12:46:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class TradeUnitCorrection {

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeUnitId")
    private String tradeUnitId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("businessCategory")
    private String businessCategory = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("businessType")
    private String businessType = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("businessSubtype")
    private String businessSubtype = null;

    @JsonProperty("active")
    private Boolean active;
}
