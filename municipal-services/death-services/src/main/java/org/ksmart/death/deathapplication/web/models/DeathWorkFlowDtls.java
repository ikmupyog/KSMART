package org.ksmart.death.deathapplication.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
/*
     * Creates main model class  
     * Jasmine on 4.02.2023      
*/
@Schema(name = "Death Registration Request", description = "An Object holds the  workflow details ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathWorkFlowDtls {

        @Size(max = 64)
    @JsonProperty("applicationType")
    private String applicationType;

    @JsonProperty("registrationNo")
    private String registrationNo ; 

    @JsonProperty("applicationStatus")
    private String applicationStatus;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("action")
    private String action;

    @JsonProperty("assignee")
    private List<String> assignee;

    @JsonProperty("workflowcode")
    private String workflowcode;

    @JsonProperty("funcionUID")
    private String funcionUID;

    @JsonProperty("Comment")
    private String comment;

    // public void setStatus(String s) {
    // }

}
