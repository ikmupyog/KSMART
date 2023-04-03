package org.egov.pgr.web.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.egov.common.contract.request.Role;
import org.hibernate.validator.constraints.SafeHtml;
import org.egov.pgr.util.PGRConstants;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import java.util.List;

 
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

	 private String empId;
	 
	 @SafeHtml
     @JsonProperty("tenantId")
     private String tenantId = null;
	  
	  @SafeHtml
     @JsonProperty("id")
	  private String id;	 
	  
	  @SafeHtml
     @JsonProperty("name")
	  private String name;
	  
	  @SafeHtml
     @JsonProperty("type")
	  private String type;
	  
	  @SafeHtml
	  @JsonProperty("rolecode")
      private String rolecode;
	  
	  @SafeHtml
	  @JsonProperty("uuid")
      private String uuid;
	  
	  @SafeHtml
	  @JsonProperty("mobileNumber")
      private String mobileNumber;
	  
	  @SafeHtml
	  @JsonProperty("emailId")
      private String emailId;
	
	
}
