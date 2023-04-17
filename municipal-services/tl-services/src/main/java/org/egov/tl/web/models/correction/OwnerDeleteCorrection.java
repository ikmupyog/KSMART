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
@ApiModel(description = "A Object holds the Structure place details to be updated on approval of Correction Request")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-04-11T20:13:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class OwnerDeleteCorrection {

    @Size(max = 64)
    @JsonProperty("uuid")
    private String uuid;

    @JsonProperty("userActive")
    private Boolean userActive;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeLicenseDetailDelId")
    private String tradeLicenseDetailDelId = null;

}
