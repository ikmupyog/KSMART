package org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3;
import javax.validation.constraints.Size;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Schema(description = "A Object holds the breg_noasic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class m_SamaswasamSearchResponse {
  @JsonProperty("intid")
private	Integer	intid;

@JsonProperty("numkssmpensionerid")
private	Integer	numkssmpensionerid	;

@JsonProperty("scheme_id")
private	Integer	scheme_id	;

@JsonProperty("district")
private	Integer	district	;

@JsonProperty("application_no")
private	Integer	application_no	;

@JsonProperty("reg_no")
private	Integer	reg_no;


@JsonFormat(pattern = "dd/MM/yyyy")
@JsonProperty("application_date")
private	String	application_date	;

@JsonProperty("office_typeid")
private	Integer	office_typeid	;

@JsonProperty("office_nameid")
private	Integer	office_nameid	;

@JsonProperty("applicant_nameeng")
private	String	applicant_nameeng	;

@JsonProperty("applicant_namemal")
private	String	applicant_namemal	;


@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
@JsonProperty("dtdecision_date")
private	String	dtdecision_date	;

}
