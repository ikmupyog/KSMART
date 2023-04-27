package org.egov.filemgmnt.web.models.GlobalMaster;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Module response for create and update")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ModuleDetailsResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ModuleDetails")
    private ModuleDetails moduleDetails;

}