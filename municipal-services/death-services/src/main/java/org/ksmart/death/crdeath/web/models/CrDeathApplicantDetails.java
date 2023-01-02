package org.ksmart.death.crdeath.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;
/*  02/01/2023 
    * Creates CrDeathApplicantDetails model
    * Jasmine
    */
@Schema(name = "CrDeath Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CrDeathApplicantDetails {
    
    @Schema(type = "string", format = "uuid", description = "applicant details  id")
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "tenantId")
    @Size(max = 64)
    @JsonProperty("tenantId")
    private String tenantId ;

    @Schema(type = "string", description = "Name of applicant")
    @Size(max = 64)
    @JsonProperty("applicantName")
    private String applicantName;

    @Schema(type = "string", description = "Aadhar number of applicant")
    @Size(max = 64)
    @JsonProperty("applicantAadhar")
    private String applicantAadhar ;



}
