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

    @JsonProperty("id")
    private String id;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("marriageTenantid")
    private String tenantid = null;

    @JsonProperty("documentType")
    private String documentType = null;

    @JsonProperty("documentName")
    private String documentName = null;

    @JsonProperty("fileStoreId")
    private String fileStoreId = null;

    @JsonProperty("marriageId")
    private String marriageId = null;
//bride or groom
    @JsonProperty("documentOwner") 
    private String documentOwner = null;

     @JsonProperty("documentlink")
     private String documentlink;

    @JsonProperty("applicationNumber")
    private String applicationNumber = null;

    @JsonProperty("AuditDetails")
    private AuditDetails marriageDocAuditDetails = null;
    
}
