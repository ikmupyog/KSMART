package org.egov.filemgmnt.web.models.dratfile;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Schema(description = "Arising file service request for create and update")
@Validated

@Data
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
    @JsonProperty("DraftFiles")
    private List<DraftFile> drafting;

    public DraftFileRequest addDrafting(DraftFile newDrafting) {

        if (drafting == null) {
            drafting = new ArrayList<>();
        }
        drafting.add(newDrafting);
        return this;
    }

}
