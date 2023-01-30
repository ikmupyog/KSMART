package org.ksmart.birth.marriageregistry.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.Valid;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterBirthSearchCriteria {
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id; // birthapplicant id

    @JsonProperty("registrationNo")
    private String registrationNo;
    @JsonProperty("fromDate")
    private Long fromDate; // report date

    @JsonProperty("toDate")
    private Long toDate; // report date

    @JsonProperty("fromDateReg")
    private Long fromDateReg; // Registration date

    @JsonProperty("toDateReg")
    private Long toDateReg; // Registration date

    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

    @JsonProperty("offset")
    private Integer offset;

    @JsonProperty("limit")
    private Integer limit;

    @JsonProperty("dateOfBirth")
    @Valid
    private String dateOfBirth;
}
