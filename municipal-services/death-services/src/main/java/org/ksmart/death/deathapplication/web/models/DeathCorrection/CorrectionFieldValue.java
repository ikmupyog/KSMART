package org.ksmart.death.deathapplication.web.models.DeathCorrection;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.death.deathapplication.web.models.AuditDetails;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrectionFieldValue {
    @JsonProperty("id")
    private String id;
    @JsonProperty("deathId")
    private String deathId;

    @JsonProperty("correctionId")
    private String correctionId;
    @JsonProperty("correctionFieldName")
    private String correctionFieldName;
    @JsonProperty("column")
    private String column;
    @JsonProperty("tableName")
    private String tableName;
    @JsonProperty("columnName")
    private String columnName;
    @JsonProperty("newValue")
    private String newValue;
    @JsonProperty("oldValue")
    private String oldValue;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
