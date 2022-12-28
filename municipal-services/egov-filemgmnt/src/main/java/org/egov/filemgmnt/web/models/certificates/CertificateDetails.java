package org.egov.filemgmnt.web.models.certificates;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.web.models.AuditDetails;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificateDetails {

	@Schema(type = "string", format = "uuid", description = "Certificate id") // NOPMD
	@Size(max = 64)
	@JsonProperty("id")
	private String id;

	@Schema(type = "string", description = "Tenant identification number")
	@Size(max = 64)
	@NotNull
	@JsonProperty("tenantId")
	private String tenantId;

	@Schema(type = "string", description = "Bussiness service code")
	@Size(max = 64)
	@JsonProperty("bussinessService")
	private String bussinessService;

	@Schema(type = "string", description = "Certificate number")
	@Size(max = 64)
	@JsonProperty("certificateNo")
	private String certificateNo;

	@Schema(type = "string", description = "Status of certificate")
	@Size(max = 64)
	@JsonProperty("certificateStatus")
	private StatusEnum certificateStatus;

	@Schema(type = "string", description = "Applicant id")
	@Size(max = 64)
	@JsonProperty("applicantPersonalId")
	private String applicantPersonalId;

	@Schema(type = "string", description = "File store id")
	@Size(max = 64)
	@JsonProperty("filestoreId")
	private String filestoreId;

	@Schema(type = "integer", format = "int64", description = "Certificate issuing date")
	@JsonProperty("dateofIssue")
	private Long dateofIssue;

	@JsonProperty("auditDetails")
	private AuditDetails auditDetails;

	public enum StatusEnum {
		ACTIVE("ACTIVE"),

		CANCELLED("CANCELLED"),

		FREE_DOWNLOAD("FREE_DOWNLOAD"),

		PAID_DOWNLOAD("PAID_DOWNLOAD"),

		PAID_PDF_GENERATED("PAID_PDF_GENERATED"),

		PAID("PAID");

		private String value;

		StatusEnum(String value) {
			this.value = value;
		}

		@Override
		@JsonValue
		public String toString() {
			return String.valueOf(value);
		}

		@JsonCreator
		public static StatusEnum fromValue(String text) {
			for (StatusEnum b : StatusEnum.values()) {
				if (String.valueOf(b.value).equals(text)) {
					return b;
				}
			}
			return null;
		}
	}
}
