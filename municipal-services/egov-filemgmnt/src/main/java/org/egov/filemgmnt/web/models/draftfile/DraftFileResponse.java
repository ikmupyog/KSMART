package org.egov.filemgmnt.web.models.draftfile;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Draft file response for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DraftFileResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Drafting")
    private List<DraftFile> drafting;

    public DraftFileResponse addDrafting(DraftFile newDraft) {

        if (drafting == null) {
            drafting = new ArrayList<>();
        }
        drafting.add(newDraft);
        return this;
    }

}
