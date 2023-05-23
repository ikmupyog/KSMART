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
public class DeathInformantDtls {
   
    @JsonProperty("InformantAadharNo")
    private String informantAadharNo ;

    @JsonProperty("InformantNameEn")
    private String informantNameEn ;

    @JsonProperty("DeathSignedOfficerDesignation")
    private String deathSignedOfficerDesignation ;

    @JsonProperty("InformantMobileNo")
    private Long informantMobileNo ;

    @JsonProperty("InformantAddress")
    private String informantAddress ;

    @JsonProperty("IsDeclarationInformant")
    private boolean isDeclarationInformant;    

    @JsonProperty("InformantAadharSubmitted")
    private boolean  informantAadharSubmitted ;   

    @JsonProperty("auditDetails")
    private AuditDetails  deathAuditDetails;
       
}
