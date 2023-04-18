package org.ksmart.death.deathapplication.web.models.DeathCorrection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.death.deathapplication.web.models.AuditDetails;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrectionField {
    @JsonProperty("id")
    private String id;

    @JsonProperty("deathId")
    private String deathId;
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
