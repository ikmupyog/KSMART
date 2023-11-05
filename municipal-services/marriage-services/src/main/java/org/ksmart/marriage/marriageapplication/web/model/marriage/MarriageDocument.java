package org.ksmart.marriage.marriageapplication.web.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

import org.ksmart.marriage.common.model.AuditDetails;
import org.springframework.validation.annotation.Validated;

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
    private String marriageTenantid ;

    @JsonProperty("documentType")
    private String documentType ;

    @JsonProperty("documentName")
    private String documentName ;

    @JsonProperty("fileStoreId")
    private String fileStoreId ;

    @JsonProperty("marriageId")
    private String marriageId ;
//bride or groom
    @JsonProperty("documentOwner") 
    private String documentOwner ;

     @JsonProperty("fileURL")
     private String fileURL;

    @JsonProperty("applicationNumber")
    private String applicationNumber ;

    @JsonProperty("registrationNumber")
    private String registrationNumber ;

    @JsonProperty("applicationType")
    private String applicationType ;

    @JsonProperty("updatedFlag")
    private Integer updatedFlag ;

    @JsonProperty("activeFalse")
    private Boolean activeFalse ;

    @JsonProperty("auditDetails")
    private AuditDetails marriageDocAuditDetails ;

    @JsonProperty("correctionId")
    private String correctionId;

    @JsonProperty("correctionFieldName")
    private String correctionFieldName ;
}
