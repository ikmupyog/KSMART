package org.egov.kssmwecare.web.models.Wecare;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the breg_noasic data for wecare scheme")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Schemes_address {

@JsonProperty("address_id")
private	Integer	address_id;

@JsonProperty("intid")
private	Integer	intid;

@JsonProperty("schemeid")
private	Integer	schemeid;

@JsonProperty("addresstype_id")
private	Integer	addresstype_id;

@JsonProperty("houseno")
private	Integer	houseno	;

@JsonProperty("wardno")
private	Integer	wardno	;

@JsonProperty("housenameeng")
private	String	housenameeng;

@JsonProperty("housenamemal")
private	String	housenamemal;

@JsonProperty("streetnameeng")
private	String	streetnameeng;

@JsonProperty("streetnamemal")
private	String	streetnamemal;

@JsonProperty("mainplacenameeng")
private	String	mainplacenameeng;

@JsonProperty("mainplacenamemal")
private	String	mainplacenamemal;

@JsonProperty("postofficeid")
private	Integer	postofficeid;

@JsonProperty("pincode")
private	Integer	pincode;

@JsonProperty("district_id")
private	Integer	district_id;

@JsonProperty("lbid")
private	Integer	lbid;

@JsonProperty("blockid")
private	Integer	blockid;

@JsonProperty("village_id")
private	Integer	village_id;

@JsonProperty("taluk_id")
private	Integer	taluk_id;

@JsonProperty("landphone_no")
private	String	landphone_no;

@JsonProperty("mobile_no")
private	String	mobile_no;


    
}
