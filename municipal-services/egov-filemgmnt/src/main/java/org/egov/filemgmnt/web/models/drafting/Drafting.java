package org.egov.filemgmnt.web.models.drafting;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;
import org.egov.filemgmnt.web.models.AuditDetails;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description="A Object holds the file data of drafting submitted by the user")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Drafting {

	@Schema(type = "string", description = "drafting id")
	@Size(max=256)
	@JsonProperty("uuid")
	private String uuid;


	@Schema(type = "string", description = "Tenant identification number", example = 		"kl.cochin")
	@Size(max = 64)
	@JsonProperty("tenantId")
	private String tenantId;


	@NotNull
	@Size(max=256)
	@JsonProperty("businessService")
	private String businessService;

	@NotNull
	@Size(max=256)
	@JsonProperty("moduleName")
	private String moduleName;


	@Size(max=64)
	@JsonProperty("fileCode")
	private String fileCode;

	@Schema(type = "string", description = "Draft Type")
	@Size(max = 64, message = "Draft Type length cannot exceed 64 characters")
	@JsonProperty("draftType")
	private String draftType;

	@Schema(type = "string", description = "Storing the Draft Content")
	@Size(max = 1024)
	@JsonProperty("draftText")
	private String draftText;


	@Schema(type = "string", description = " draft created user")
	@Size(max=64)
	@JsonProperty("assigner")
	private String assigner;

	@Size(max=64)
	@JsonProperty("fileStoreId")
	private String fileStoreId;

	@Schema(type = "string", description = "status")
	@Size(max = 64, message = "status length cannot exceed 64 characters")
	@JsonProperty("status")
	private String status;

	@JsonProperty("auditDetails")
	private AuditDetails auditDetails;
    
}
