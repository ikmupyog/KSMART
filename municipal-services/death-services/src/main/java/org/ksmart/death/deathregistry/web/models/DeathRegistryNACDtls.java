package org.ksmart.death.deathregistry.web.models;

import java.util.List;

import javax.swing.text.Document;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
     * Creates DeathRegistryNACDtls  Model
     * Rakhi S  on 04.04.2023
     * 
     */

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryNACDtls {
    
    @JsonProperty("InformationDeath")
    private DeathRegistryBasicInfo deathBasicInfo;

    @JsonProperty("AddressBirthDetails")
    private DeathRegistryAddressInfo deathAddressInfo; 

    @JsonProperty("AuditDetails")
    private AuditDetails  deathAuditDetails;

    @JsonProperty("applicationType")
    private String applicationType;

    @JsonProperty("applicationStatus")
    private String applicationStatus;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("action")
    private String action;

    @JsonProperty("assignee")
    private List<String> assignees;

    @JsonProperty("workflowcode")
    private String workflowcode;

    private String assignuser;
    private String comment;

    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;
    public void setStatus(String s) {
    }
}
