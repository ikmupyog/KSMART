package org.egov.filemgmnt.web.models.arisingfile;


import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;


@Schema(description = "Arising file service response for create and update")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class ArisingFileResponse {
	
		@JsonProperty( "ResponseInfo")
	    private ResponseInfo responseInfo;

	    @JsonProperty("ArisingFile")
	    private List<ArisingFile> arisingFileDetail;
	    
	    public ArisingFileResponse addArisingFile(ArisingFile arisingFile) {

	        if (arisingFileDetail == null) {
	        	arisingFileDetail = new ArrayList<>();
	        }
	        arisingFileDetail.add(arisingFile);
	        return this;
	    }
	    
}
