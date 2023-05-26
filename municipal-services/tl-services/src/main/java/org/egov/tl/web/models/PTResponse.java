package org.egov.tl.web.models;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@ApiModel(description = "Contract class to send response. Array of tradelicense items are used in case of search results or response for create, whereas single tradelicense item is used for update")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PTResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo = null;

    @JsonProperty("BuildingDet")
    @Valid
    private BuildingDet buildingDet = null;

    @JsonProperty("Count")
    private int count;

    // public PTResponse addLicensesItem(BuildingDet licensesItem) {
    //     if (this.buildingDet == null) {
    //         this.buildingDet = new ArrayList<>();
    //     }
    //     this.buildingDet.add(licensesItem);
    //     return this;
    // }

}
