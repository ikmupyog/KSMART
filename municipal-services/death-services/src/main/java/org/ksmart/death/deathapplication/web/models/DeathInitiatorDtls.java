package org.ksmart.death.deathapplication.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
/*
     * Creates  model class  
     * Jasmine on 11.02.2023      
*/
@Schema(name = "Death Initiator Request", description = "An Object holds the  Initiator details of death ")
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

    // @JsonProperty("InitiatorAddrId")
    // private String initiatorAddrId;

    // @JsonProperty("InitiatorAddrDeathDtlId")
    // private String initiatorAddrDeathDtlId ;

    // @JsonProperty("InitiatorAddrTenantId")
    // private String initiatorAddrTenantId ;

    // @JsonProperty("InitiatorAddrTypeId")
    // private String initiatorAddrTypeId ;

    // @JsonProperty("InitiatorAddrLocationType")
    // private String initiatorAddrLocationType ;

    // @JsonProperty("InitiatorAddrCountryId")
    // private String initiatorAddrCountryId ;

    // @JsonProperty("InitiatorAddrStateId")
    // private String initiatorAddrStateId ;

    // @JsonProperty("InitiatorAddrDistrictId")
    // private String initiatorAddrDistrictId ;

    // @JsonProperty("InitiatorAddrTalukId")
    // private String initiatorAddrTalukId ;

    // @JsonProperty("InitiatorAddrVillageId")
    // private String initiatorAddrVillageId ;

    // @JsonProperty("InitiatorAddrLbType")
    // private String initiatorAddrLbType ;

    // @JsonProperty("InitiatorAddrWardId")
    // private String initiatorAddrWardId ;

    // @JsonProperty("InitiatorAddrPostofficeId")
    // private String initiatorAddrPostofficeId ;

    // @JsonProperty("InitiatorAddrPincode")
    // private Long initiatorAddrPincode ;

    // @JsonProperty("InitiatorAddrLocalityEn")
    // private String initiatorAddrLocalityEn ;

    // @JsonProperty("InitiatorAddrLocalityMl")
    // private String initiatorAddrLocalityMl ;

    // @JsonProperty("InitiatorAddrStreetNameEn")
    // private String initiatorAddrStreetNameEn ;

    // @JsonProperty("InitiatorAddrStreetNameMl")
    // private String initiatorAddrStreetNameMl ;

    // @JsonProperty("InitiatorAddrHoueNameEn")
    // private String initiatorAddrHoueNameEn ;

    // @JsonProperty("InitiatorAddrHoueNameMl")
    // private String initiatorAddrHoueNameMl ;

    // @JsonProperty("InitiatorAddrPostalCode")
    // private String initiatorAddrPostalCode ;

    @JsonProperty("DocumentId")
    private String documentId ;

    @JsonProperty("DocumentDeathDtlId")
    private String documentDeathDtlId ;

    @JsonProperty("DocumentTenantId")
    private String documentTenantId ;

    @JsonProperty("DocumentAckNo")
    private String documentAckNo ;

    @JsonProperty("DocumentType")
    private String documentType ;

    @JsonProperty("DocumentUserType")
    private String documentUserType ;

    @JsonProperty("DocumentFileStoreId")
    private String documentFileStoreId ;

    //Rakhi s on 08.02.2023
    @Schema(type = "boolean" ,description = "Initiator aadhar submitted(0/1)")
    @JsonProperty("InitiatorAadharSubmitted")
    private boolean  InitiatorAadharSubmitted ;   

    //Jasmine 9.02.2023
    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;
       
    
}
