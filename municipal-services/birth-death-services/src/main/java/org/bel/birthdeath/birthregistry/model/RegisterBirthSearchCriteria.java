package org.bel.birthdeath.birthregistry.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.Valid;

public class RegisterBirthSearchCriteria {
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id; // birthapplicant id

    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("fileCode")
    private String fileCode;

    @JsonProperty("fromDate")
    private Long fromDate; // report date

    @JsonProperty("toDate")
    private Long toDate; // report date

    @JsonProperty("fromDateFile")
    private Long fromDateFile; // file date

    @JsonProperty("toDateFile")
    private Long toDateFile; // file date

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
