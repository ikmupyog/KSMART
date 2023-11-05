package org.ksmart.marriage.marriagecommon.model.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;

import org.ksmart.marriage.common.model.AuditDetails;

import java.math.BigDecimal;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CommonPay {
    @Size(max = 64)
    @JsonProperty("applicationNumber")
    private String applicationNumber;

    private String action;

    private String applicationStatus;

    private Boolean hasPayment;

    @JsonProperty("paymentTransactionId")
    private String paymentTransactionId;
    @JsonProperty("isPaymentSuccess")
    private Boolean isPaymentSuccess;

    private BigDecimal amount = BigDecimal.ZERO;
    
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
