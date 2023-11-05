package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrectionField {
    @JsonProperty("id")
    private String id;
    @JsonProperty("marriageId")
    private String marriageId;
    @JsonProperty("correctionFieldName")
    private String correctionFieldName;

    @JsonProperty("conditionCode")
    private String conditionCode;
    @JsonProperty("specificCondition")
    private String specificCondition;
    @JsonProperty("correctionFieldValue")
    private List<CorrectionFieldValue> correctionFieldValue;
    @JsonProperty("CorrectionDocument")
    private List<CorrectionDocument> correctionDocument;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;


}
