package org.ksmart.marriage.marriageapplication.web.model.Demand;

import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;

import org.ksmart.marriage.common.model.AuditDetails;

/**
 *  DemandDetail model created by Jasmine  on 30.03.2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DemandDetail   {
	
        @JsonProperty("id")
        @Valid
        private String id;
        
        @JsonProperty("demandId")
        @Valid
        private String demandId;

        @JsonProperty("taxHeadMasterCode")
        @Valid
        private String taxHeadMasterCode;

        @JsonProperty("taxAmount")
        @Valid
        private BigDecimal taxAmount;

        @Default
        @JsonProperty("collectionAmount")
        @Valid
        private BigDecimal collectionAmount = BigDecimal.ZERO;

        @JsonProperty("additionalDetails")
        @Valid
        private Object additionalDetails;

        @JsonProperty("auditDetails")
        @Valid
        private AuditDetails auditDetails;

        @JsonProperty("tenantId")
        @Valid
        private String tenantId;


}

