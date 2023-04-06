package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrectionFieldValue {
    @JsonProperty("id")
    private String id;
    @JsonProperty("column")
    private String field;
    @JsonProperty("newValue")
    private String newValue;
    @JsonProperty("oldValue")
    private String oldValue;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
