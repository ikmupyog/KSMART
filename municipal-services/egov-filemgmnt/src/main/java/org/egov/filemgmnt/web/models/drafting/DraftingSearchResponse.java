package org.egov.filemgmnt.web.models.drafting;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;


@Schema(description = "Arising file service response for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftingSearchResponse {
    @JsonProperty( "ResponseInfo")
    private ResponseInfo responseInfo;
    @JsonProperty("Drafting")
    private List<Drafting> draftings;
    public DraftingSearchResponse addDrafting(Drafting drafting) {

        if (draftings== null) {
            draftings = new ArrayList<>();
        }
        draftings.add(drafting);
        return this;
    }

}




