package org.egov.filemgmnt.web.models.drafting;

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

@Schema(description = "Arising file service response for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftFilesSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;
    @JsonProperty("Drafting")
    private List<DraftFiles> draftings;

    public DraftFilesSearchResponse addDrafting(DraftFiles drafting) {

        if (draftings == null) {
            draftings = new ArrayList<>();
        }
        draftings.add(drafting);
        return this;
    }

}
