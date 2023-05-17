package org.ksmart.marriage.marriageapplication.config;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class MarriageApplicationConfiguration {

    @Value("${egov.idgen.host}")
    private String idGenHost;
    @Value("${egov.idgen.path}")
    private String idGenPath;
   @Value("${persister.save.marriage.application.topic}")
   private String saveMarriageApplicationTopic;

//     @Value("persister.save.marriage.application.topic")
//     private String saveMarriageApplicationTopic;
     @Value("${persister.update.marriage.application.topic}")
     private String updateMarriageApplicationTopic;

    @Value("${egov.idgen.marriagehapp.name}")
    private String marriageApplNumberIdName;

    @Value("${egov.idgen.marriagefile.name}")
    private String marriageFileNumberName;

    @Value("${egov.idgen.marriagereg.name}")
    private String getMarriageRegNumberName;

    @Value("${egov.idgen.marriagecert.name}")
    private String getMarriageCertificateName;

    //Jasmine 24.03.2023

    @Value("${persister.save.marriage.registry.topic}")
    private String SaveMarriageRegistryTopic;

    @Value("${persister.update.marriage.registry.topic}")
    private String UpdateMarriageRegistryTopic;
    

    @Value("${egov.bnd.default.limit}")
    private Integer defaultBndLimit;

    @Value("${egov.bnd.default.offset}")
    private Integer defaultOffset;

    @Value("${egov.bnd.max.limit}")
    private Integer maxSearchLimit;

    //Workflow

    @Value("${egov.workflow.host}")
    private String wfHost;

    @Value("${egov.workflow.path}")
    private String wfTransitionPath;

    //Demand
  
    @Value("${egov.billingservice.host}")
    private String billingHost;
    
    @Value("${egov.bill.gen.endpoint}")
    private String fetchBillEndpoint;
    
    @Value("${egov.demand.create.endpoint}")
    private String demandCreateEndpoint;

    //MDMS
    @Value("${egov.mdms.host}")
    private String mdmsHost;
     
    @Value("${egov.mdms.search.endpoint}")
    private String mdmsEndPoint;

    @Value("${egov.state.level.tenant.id}")
    private String egovStateLevelTenant;

    @Value("${egov.ui.app.host}")
    private String uiAppHost;

    @Value("${egov.bnd.marriagecert.link}")
    private String marriageCertLink;

    @Value("${egov.url.shortner.host}")
    private String urlShortnerHost;

    @Value("${egov.url.shortner.endpoint}")
    private String urlShortnerEndpoint;

    @Value("${egov.pdf.marriagecert.createEndPoint}")
    private String egovPdfMarriageEndPoint;

    @Value("${egov.pdf.marriagecert.postendpoint}")
    private String saveMarriageCertEndpoint;

    @Value("${egov.pdfservice.host}")
    private String	egovPdfHost;

    @Value("${persister.save.marriagecertificate.topic}")
    private String saveMarriageCertificateTopic;

    @Value("${persister.update.marriagecertificate.topic}")
    private String updateMarriageCertificateTopic;

    @Value("${egov.idgen.marriageapplncertno.name}")
    private String marriageCertNumberIdName;

    //Marriage Correction
    @Value("${persister.save.marriage.correction.topic}")
    private String saveMarriageCorrectionTopic;

    @Value("${persister.update.marriage.registry.correction.topic}")
    private String updateMarriageRegistryCorrectionTopic;

    @Value("${persister.update.marriage.application.correction.topic}")
    private String updateMarriageApplicationCorrectionTopic;

    @Value("${egov.marriage.image.startPoint}")
    private String imageURLStartPath;

    @Value("${persister.update.marriage.demand.topic}")
    private String updateDemandTopic;

    @Value("${egov.marriage.image.DefaultPhotoUrl}")
    private String defaultPhotoUrl;

    @Value("${egov.demand.taxheadmastercode}")
    private String taxHeadMasterCode;

    //Payment 
    @Value("${persister.update.marriage.payment.topic}")
    private String updateMarriagePaymentTopic;

}
