package org.egov.filemgmnt.web.models.draftfile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Draft file service request for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftFileRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @Valid
    @NotNull(message = "Draft file is required")
    @JsonProperty("DraftFile")
    private DraftFile draftFile;

}
