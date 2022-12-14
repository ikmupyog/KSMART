package org.egov.filemgmnt.web.models;

import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the service related data for a Applicant")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ApplicantChild {

    @Schema(type = "string", format = "uuid", description = "Applicant child details id")
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", format = "uuid", description = "Applicant id")
    @Size(max = 40)
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Building number")
    @Size(max = 64)
//    @NotBlank(message = "Building number is required")
    @JsonProperty("buildingNumber ")
    private String buildingNumber;

    @Schema(type = "string", description = "Relation of assessee")
    @Size(max = 64)
    @JsonProperty("relationOfAssessee  ")
    private String relationOfAssessee;

    @Schema(type = "string", description = "Name of occupier")
    @Size(max = 64)
    @JsonProperty("nameOfOccupier")
    private String nameOfOccupier;

    @Schema(type = "string", description = "Relation of occupier")
    @Size(max = 64)
    @JsonProperty("relationOfOccupier")
    private String relationOfOccupier;

    @Schema(type = "string", description = "Duration of residence")
    @Size(max = 64)
    @JsonProperty("durationOfResidence ")
    private String durationOfResidence;

}
