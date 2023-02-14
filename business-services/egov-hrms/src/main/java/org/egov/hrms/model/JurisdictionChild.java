package org.egov.hrms.model;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Validated
@EqualsAndHashCode(exclude = { "auditDetails" })
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@ToString
public class JurisdictionChild {

	@SafeHtml
	private String id;

	@SafeHtml
	private String jurisdictionId;

	@SafeHtml
	private String tenantId;

//	@SafeHtml
//	@NotNull
//	@Size(max = 256)
//	private String zoneCode;

	@SafeHtml
	@NotNull
	@NotBlank
	@NotEmpty
	@Size(max = 256)
	private String wardCode;

	@SafeHtml
	@Valid
	@NotBlank(message = "Ward Label is required")
	@Size(max = 256)
	private String wardLabel;


	private AuditDetails auditDetails;

	private Boolean isActive;

	@Size(max = 64)
	@JsonProperty("parentJurisdictionId")
	private String parentJurisdictionId;

}
