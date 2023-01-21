package org.egov.filemgmnt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Configuration
public class FMConfiguration {

    @Value("${app.timezone}")
    private String timeZone;

    @Value("${egov.state.level.tenant.id}")
    private String stateLevelTenantId;

    // Applicant personal service
    @Value("${persister.save.applicantservice.topic}")
    private String saveApplicantServiceTopic;

    @Value("${persister.update.applicantservice.topic}")
    private String updateApplicantServiceTopic;

    @Value("${persister.save.applicantcertificate.topic}")
    private String saveApplicantCertificateTopic;

    @Value("${citizen.allowed.search.params}")
    private String allowedCitizenSearchParams;

    @Value("${employee.allowed.search.params}")
    private String allowedEmployeeSearchParams;

    // Idgen config
    @Value("${egov.idgen.fm.fileCode.name}")
    private String filemgmntFileCodeName;

    @Value("${egov.idgen.fm.fileCode.format}")
    private String filemgmntFileCodeFormat;

    @Value("${egov.idgen.fm.cerificatenumber.name}")
    private String filemgmntResidentialCertName;

    @Value("${egov.idgen.fm.cerificatenumber.format}")
    private String filemgmntResidentialCertFormat;

    // Worflow service config
    @Value("${workflow.context.path}")
    private String wfHost;

    @Value("${workflow.transition.path}")
    private String wfTransitionPath;

    // User service config
    @Value("${egov.user.host}")
    private String userHost;

    @Value("${egov.user.context.path}")
    private String userContextPath;

    @Value("${egov.user.create.path}")
    private String userCreateEndpoint;

    @Value("${egov.user.update.path}")
    private String userUpdateEndpoint;

    @Value("${egov.user.search.path}")
    private String userSearchEndpoint;

    // Communication file config
    @Value("${persister.save.communicationfile.topic}")
    private String saveCommunicationFileTopic;

    @Value("${persister.update.communicationfile.topic}")
    private String updateCommunicationFileTopic;

    // PDF Gen

    @Value("${egov.pdfservice.host}")
    private String egovPdfHost;

    @Value("${egov.pdf.residentialcert.createEndPoint}")
    private String egovPdfResidentialEndPoint;

    @Value("${egov.ui.app.host}")
    private String uiAppHost;

    @Value("${egov.fm.residentialcert.link}")
    private String residentialCertLink;

    @Value("${egov.url.shortner.host}")
    private String urlShortnerHost;

    @Value("${egov.url.shortner.endpoint}")
    private String urlShortnerEndpoint;
}
