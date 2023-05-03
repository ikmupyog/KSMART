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
//    @Value("${persister.save.communicationfile.topic:}")
//    private String saveCommunicationFileTopic;
//
//    @Value("${persister.update.communicationfile.topic:}")
//    private String updateCommunicationFileTopic;

    // Arising file config
    @Value("${persister.save.arisingfile.topic}")
    private String saveArisingFileTopic;

    @Value("${persister.update.arisingfile.topic:}")
    private String updateArisingFileTopilc;

    // Draft file config
    @Value("${persister.save.draftfile.topic:}")
    private String saveDraftFileTopic;

    @Value("${persister.update.draftfile.topic:}")
    private String updateDraftFileTopic;

    @Value("${persister.update.draftfilestatus.topic:}")
    private String updateDraftFileStatusTopic;

    @Value("${draftfile.allowed.search.params}")
    private String allowedDraftFilesSearchParams;

    // Enquiry config
    @Value("${persister.save.enquiry.topic:}")
    private String saveEnquiryTopic;

    @Value("${persister.save.draftprocessinstance.topic:}")
    private String saveDraftProcessInstanceTopic;

    // PDF Gen
    @Value("${egov.pdfservice.host}")
    private String egovPdfHost;

    @Value("${egov.pdf.residentialcertificate.createEndPoint}")
    private String egovPdfResidentialEndPoint;

    @Value("${egov.ui.app.host}")
    private String uiAppHost;

    @Value("${egov.fm.residentialcertificate.link}")
    private String residentialCertLink;

    @Value("${egov.url.shortner.host}")
    private String urlShortnerHost;

    @Value("${egov.url.shortner.endpoint}")
    private String urlShortnerEndpoint;

    @Value("${egov.pdf.draftcertificate.createEndPoint}")
    private String egovPdfDraftEndPoint;

    @Value("${egov.fm.draftcertificate.link}")
    private String draftCertificateLink;

    @Value("${egov.pdf.circularcertificate.createEndPoint}")
    private String egovPdfCircularEndPoint;

    @Value("${egov.fm.circularcertificate.link}")
    private String circularCertificateLink;

    @Value("${egov.pdf.noticecertificate.createEndPoint}")
    private String egovPdfNoticeEndPoint;

    @Value("${egov.fm.noticecertificate.link}")
    private String noticeCertificateLink;

    @Value("${egov.pdf.affidavitcertificate.createEndPoint}")
    private String egovPdfAffidavitEndPoint;

    @Value("${egov.fm.affidavitcertificate.link}")
    private String affidavitCertificateLink;

    @Value("${egov.pdf.memocertificate.createEndPoint}")
    private String egovPdfMemoEndPoint;

    @Value("${egov.fm.memocertificate.link}")
    private String memoCertificateLink;

    // GLOBAL MASTER SETTINGS

    // Module Master save, update, delete
    @Value("${persister.save.modulemaster.topic:}")
    private String saveModuleMasterTopic;

    @Value("${persister.update.modulemaster.topic:}")
    private String updateModuleMasterTopic;

    @Value("${persister.delete.modulemaster.topic:}")
    private String deleteModuleMasterTopic;

    // MajorFuncton save, update, delete
    @Value("${persister.save.majorfunction.topic:}")
    private String saveMajorFunctionTopic;

    @Value("${persister.update.majorfunction.topic:}")
    private String updateMajorFunctionTopic;

    @Value("${persister.delete.majorfunction.topic:}")
    private String deleteMajorFunctionTopic;

    // SubFuncton save, update, delete
    @Value("${persister.save.subfunction.topic:}")
    private String saveSubFunctionTopic;

    @Value("${persister.update.subfunction.topic:}")
    private String updateSubFunctionTopic;

    @Value("${persister.delete.subfunction.topic:}")
    private String deleteSubFunctionTopic;

    // Service master save, update, delete
    @Value("${persister.save.servicemaster.topic:}")
    private String saveServiceMasterTopic;

    @Value("${persister.update.servicemaster.topic:}")
    private String updateServiceMasterTopic;

    @Value("${persister.delete.servicemaster.topic:}")
    private String deleteServiceMasterTopic;
}
