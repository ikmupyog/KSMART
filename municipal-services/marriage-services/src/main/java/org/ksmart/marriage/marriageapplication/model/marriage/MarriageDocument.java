package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;

import java.util.Objects;
import lombok.*;

import org.ksmart.marriage.common.model.AuditDetails;
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
public class MarriageDocument {

    @JsonProperty("Id")
    private String id;

    @JsonProperty("Active")
    private Boolean active;

    @JsonProperty("marriageTenantid")
    private String marriageTenantid = null;

    @JsonProperty("documentType")
    private String documentType = null;

    @JsonProperty("fileStoreId")
    private String fileStoreId = null;

    @JsonProperty("fileName")
    private String fileName = null;

    @JsonProperty("marriageId")
    private String marriageId = null;

    @JsonProperty("documentOwner")
    private String documentOwner = null;

    @JsonProperty("documentUid")
    private String documentUid;

    @JsonProperty("applicationNumber")
    private String deathACKNo = null;

    @JsonProperty("AuditDetails")
    private AuditDetails deathDocAuditDetails = null;
    
}
