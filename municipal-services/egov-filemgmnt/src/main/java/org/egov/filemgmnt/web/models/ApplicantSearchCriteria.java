package org.egov.filemgmnt.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantSearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id; // applicant id

    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

}
