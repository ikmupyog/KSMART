package org.egov.filemgmnt.web.models.GlobalMaster;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;

import java.util.ArrayList;
import java.util.List;
@Schema(description = "Module response for create and update")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ModuleDetailsResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ModuleDetail")
    private ModuleDetails moduleDetails;

}