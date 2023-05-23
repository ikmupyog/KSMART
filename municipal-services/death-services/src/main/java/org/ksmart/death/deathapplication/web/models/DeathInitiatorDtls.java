package org.ksmart.death.deathapplication.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathInitiatorDtls {
    @Size(max = 64)
    @JsonProperty("InitiatorRelation")
    private String initiatorRelation ;

    @JsonProperty("InitiatorAadhaar")
    private String initiatorAadhaar ;

    @JsonProperty("InitiatorName")
    private String initiatorName ;

    @JsonProperty("InitiatorMobile")
    private Long initiatorMobile ;

    @JsonProperty("InitiatorAddress")
    private String initiatorAddress ;

    @JsonProperty("IsDeclarationInitiator")
    private boolean isDeclarationInitiator ;   

    // @JsonProperty("DocumentId")
    // private String documentId ;

    // @JsonProperty("DocumentDeathDtlId")
    // private String documentDeathDtlId ;

    // @JsonProperty("DocumentTenantId")
    // private String documentTenantId ;

    // @JsonProperty("DocumentAckNo")
    // private String documentAckNo ;

    // @JsonProperty("DocumentType")
    // private String documentType ;

    // @JsonProperty("DocumentUserType")
    // private String documentUserType ;

    // @JsonProperty("DocumentFileStoreId")
    // private String documentFileStoreId ;

    @JsonProperty("InitiatorAadharSubmitted")
    private boolean  InitiatorAadharSubmitted ;   

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;
       
    @JsonProperty("initiatorDesi")
    private String initiatorDesi ;

    @JsonProperty("initiatorInstitutionName")
    private String initiatorInstitutionName ;
    
    @JsonProperty("isCaretaker")
    private boolean isCaretaker ;

    @JsonProperty("isGuardian")
    private boolean isGuardian ;

    @JsonProperty("ipopList")
    private String ipopList ;

    @JsonProperty("ipopNumber")
    private String ipopNumber ;

    @JsonProperty("registrationNoHospital")
    private String registrationNoHospital ;

    @JsonProperty("registrationNoInstitution")
    private String registrationNoInstitution ;

    @JsonProperty("admissionNoInstitution")
    private String admissionNoInstitution ;
}
