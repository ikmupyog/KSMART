package org.egov.filemgmnt.web.models.certificate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResidentialCertificate {

    private String id; // serviceDetailId
    private String buildingNo;
    private String durationYear;
    private String durationMonth;
    private String wardNo;
    private String tenantId;
    private String lbName;
    private String lbAddressWithPinCode;
    private String name;
    private String ownerName;
    private String ownerAddress;
    private String address;
    private String embeddedUrl;
    private Long dateOfIssue;
}
