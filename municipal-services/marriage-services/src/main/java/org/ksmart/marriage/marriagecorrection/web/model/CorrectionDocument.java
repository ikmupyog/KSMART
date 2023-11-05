package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.*;
import org.hibernate.validator.constraints.SafeHtml;
import org.ksmart.marriage.common.model.AuditDetails;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Size;

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
public class CorrectionDocument {

    @Size(max=64)
    @SafeHtml
    @JsonProperty("id")
    private String id;
    @Size(max=64)
    @SafeHtml
    @JsonProperty("marriageId")
    private String marriageId;
    @JsonProperty("correctionId")
    private String correctionId;
     @JsonProperty("correctionFieldName")
    private String correctionFieldName = null;
    @JsonProperty("documentType")
    private String documentType = null;
    @JsonProperty("documentName")
    private String documentName = null;
    @JsonProperty("fileStoreId")
    private String fileStoreId = null;

    @JsonProperty("active")
    private Boolean active = true;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}

