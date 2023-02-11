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

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the details of the owner of the premises")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-02-08T13:35:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class OwnerPremise {

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @Size(max = 200)
    @SafeHtml
    @JsonProperty("ownerName")
    private String ownerName = null;

    @Size(max = 200)
    @SafeHtml
    @JsonProperty("houseName")
    private String houseName = null;

    @Size(max = 150)
    @SafeHtml
    @JsonProperty("street")
    private String street = null;

    @Size(max = 150)
    @SafeHtml
    @JsonProperty("locality")
    private String locality = null;

    @Size(max = 150)
    @SafeHtml
    @JsonProperty("postOffice")
    private String postOffice = null;

    @Size(max = 10)
    @SafeHtml
    @JsonProperty("pincode")
    private String pincode = null;

    @Pattern(regexp = "^[0-9]{12}$", message = "AadharNumber should be 12 digit number")
    @JsonProperty("owneraadhaarNo")
    private String owneraadhaarNo;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("ownerContactNo")
    private String ownerContactNo = null;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

    @JsonProperty("active")
    private Boolean active;

}
