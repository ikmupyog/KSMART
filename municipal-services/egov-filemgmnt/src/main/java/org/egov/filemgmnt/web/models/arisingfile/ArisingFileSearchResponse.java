package org.egov.filemgmnt.web.models.arisingfile;

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

@Schema(description = "Arising file service search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArisingFileSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ArisingFiles")
    private List<ArisingFile> arisingFiles;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public ArisingFileSearchResponse addArisingFile(final ArisingFile arisingFile) {
        if (arisingFiles == null) {
            arisingFiles = new ArrayList<>();
        }

        arisingFiles.add(arisingFile);
        return this;
    }
}
