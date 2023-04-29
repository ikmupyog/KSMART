package org.egov.filemgmnt.web.models.certificate.draftfile;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BuildDraftCertificate {

    private String id;
    private String tenantId;
    private String fileCode;
    private String draftText;
    private String embeddedUrl;
    private Long dateOfIssue;

}
