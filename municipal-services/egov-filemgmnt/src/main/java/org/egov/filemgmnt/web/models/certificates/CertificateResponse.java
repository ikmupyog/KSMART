package org.egov.filemgmnt.web.models.certificates;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificateResponse {

	@JsonProperty("ResponseInfo")
	private ResponseInfo responseInfo = null;

	@JsonProperty("CertificateDetails")
	private List<CertificateDetails> certificateDet;

	public CertificateResponse addCertificateDetails(CertificateDetails det) {

		if (certificateDet == null) {
			certificateDet = new ArrayList<>();
		}
		certificateDet.add(det);
		return this;

	}
}
