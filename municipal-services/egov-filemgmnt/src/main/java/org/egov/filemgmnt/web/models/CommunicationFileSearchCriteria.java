package org.egov.filemgmnt.web.models;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommunicationFileSearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("ids")
    private List<String> ids;

    @JsonProperty("fileCode")
    private String fileCode;

    public boolean isEmpty() {
        return StringUtils.isBlank(tenantId) && StringUtils.isBlank(fileCode);
    }

    public boolean tenantIdOnly() {
        return StringUtils.isNotBlank(tenantId) && StringUtils.isBlank(fileCode);
    }

}
