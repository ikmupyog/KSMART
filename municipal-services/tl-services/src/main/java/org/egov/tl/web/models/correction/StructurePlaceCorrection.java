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
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-04-11T12:46:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class StructurePlaceCorrection {

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("structureId")
    private String structureId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("blockNo")
    private String blockNo = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("surveyNo")
    private String surveyNo = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("subDivisionNo")
    private String subDivisionNo = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("partitionNo")
    private String partitionNo = null;

    @Range(min = 0, max = 100000)
    @JsonProperty("doorNo")
    private Integer doorNo = 0;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("doorNoSub")
    private String doorNoSub = null;

    // @Size(max = 64)
    @JsonProperty("buildingId")
    private Long buildingId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("vehicleNo")
    private String vehicleNo = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("vesselNo")
    private String vesselNo = null;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("isResurveyed")
    private Boolean isResurveyed;

    @Size(max = 150)
    @SafeHtml
    @JsonProperty("stallNo")
    private String stallNo = null;

}
