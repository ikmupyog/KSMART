package org.egov.filemgmnt.web.models;

import java.util.List;

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
public class ApplicantServiceSearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("serviceDetailId")
    private String serviceDetailId;

    @JsonProperty("applicantId")
    private String applicantId;

    @JsonProperty("fileCode")
    private String fileCode;

    @JsonProperty("fromDate")
    private Long fromDate; // file arising date

    @JsonProperty("toDate")
    private Long toDate; // file arising date

    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

    @JsonProperty("offset")
    private Integer offset;

    @JsonProperty("limit")
    private Integer limit;

    @JsonProperty("applicantIds")
    private List<String> applicantIds;

}
