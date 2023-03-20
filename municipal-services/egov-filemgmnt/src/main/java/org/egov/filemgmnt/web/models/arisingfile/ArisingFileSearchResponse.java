package org.egov.filemgmnt.web.models.arisingfile;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "Arising file service search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ArisingFileSearchResponse {
    @JsonProperty ("ResponseInfo")
    private ResponseInfo responseInfo;
        @JsonProperty("ArisingFile")
    private List<ArisingFile> arisingFileDetails;
    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public ArisingFileSearchResponse addArisingFile(final ArisingFile arisingFile){
        if (arisingFileDetails == null){
            arisingFileDetails = new ArrayList<>();
        }
        arisingFileDetails.add(arisingFile);
        return this;
    }
}

