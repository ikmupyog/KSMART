package org.egov.filemgmnt.web.models;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.response.ResponseInfo;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.filemgmnt.web.models.communication.CommunicationFile;
import org.egov.filemgmnt.web.models.communication.CommunicationFileRequest;

import com.fasterxml.jackson.annotation.JsonProperty;


import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;



import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Schema(description = "Arising file service request for create and update")
@Validated

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ArisingFileRequest {
	 @JsonProperty("RequestInfo")
	    private RequestInfo requestInfo;

	    @JsonProperty("ArisingFile")
	    private List<ArisingFile> arisingFileDetail;
	    
	    public ArisingFileRequest addArisingFile(ArisingFile arisingFile) {

	        if (arisingFileDetail == null) {
	        	arisingFileDetail = new ArrayList<>();
	        }
	        arisingFileDetail.add(arisingFile);
	        return this;
	    }
	    
	 }
