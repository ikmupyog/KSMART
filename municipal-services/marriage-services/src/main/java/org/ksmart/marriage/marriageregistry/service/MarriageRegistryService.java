package org.ksmart.marriage.marriageregistry.service;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriagecorrection.enrichment.MarriageCorrectionEnrichment;
import org.ksmart.marriage.marriagecorrection.mapper.CorrectionApplicationToRegistryMapper;
import org.ksmart.marriage.marriagecorrection.validator.MarriageCorrectionApplnValidator;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageCertificateEnrichment;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPDFRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPdfResponse;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
import org.ksmart.marriage.utils.NumToWordConverter;
import org.springframework.stereotype.Service;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_CREATE;

/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Slf4j
@Service
public class MarriageRegistryService {
    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageRegistryEnrichment marriageRegistryEnrichment;
    private final MarriageRegistryRepository repository;
    private final MarriageCertificateEnrichment marriageCertificateEnrichment;
    private final MarriageCorrectionEnrichment marriageCorrectionEnrichment;
    private final MarriageApplicationRepository marriageApplicationRepository;
    private final CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper;
    private final MarriageCorrectionApplnValidator marriageCorrectionApplnValidator;

    public MarriageRegistryService(MarriageRegistryRepository repository, MarriageRegistryEnrichment marriageRegistryEnrichment,
                                   MarriageProducer producer,
                                   MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageCertificateEnrichment marriageCertificateEnrichment, MarriageCorrectionEnrichment marriageCorrectionEnrichment, MarriageApplicationRepository marriageApplicationRepository, CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper, MarriageCorrectionApplnValidator marriageCorrectionApplnValidator) {

            this.producer = producer;
            this.marriageApplicationConfiguration = marriageApplicationConfiguration;
            this.marriageRegistryEnrichment = marriageRegistryEnrichment;
            this.repository = repository;
        this.marriageCertificateEnrichment = marriageCertificateEnrichment;
        this.marriageCorrectionEnrichment = marriageCorrectionEnrichment;
        this.marriageApplicationRepository = marriageApplicationRepository;
        this.correctionApplicationToRegistryMapper = correctionApplicationToRegistryMapper;
        this.marriageCorrectionApplnValidator = marriageCorrectionApplnValidator;
    }
//    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    public List<MarriageRegistryDetails> createRegistry(MarriageRegistryRequest request) {

        marriageRegistryEnrichment.enrichCreate(request);

        producer.push(marriageApplicationConfiguration.getSaveMarriageRegistryTopic(), request);
        //MarriageRegistrySearchCriteria criteria = MarriageRegistrySearchCriteria.builder().id(request.getMarriageDetails().get(0).getId()).tenantId(request.getMarriageDetails().get(0).getTenantid()).build();
        //download(criteria,request.getRequestInfo());
        MarriageRegistryRequest result = MarriageRegistryRequest
                                .builder()
                                .requestInfo(request.getRequestInfo())
                                .marriageDetails(request.getMarriageDetails())
                                .build();
        return result.getMarriageDetails();

    }

    public List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria,RequestInfo requestInfo) {
        
        return repository.searchMarriageRegistry(criteria,requestInfo);
    }

    public MarriageCertificate download(MarriageRegistrySearchCriteria criteria, RequestInfo requestInfo) {
        List<MarriageRegistryDetails> marriageRegistryDetailsList = repository.searchMarriageRegistry(criteria, requestInfo);
        if (marriageRegistryDetailsList != null && !marriageRegistryDetailsList.isEmpty()) {
        try {
            MarriageCertificate marriageCertificate = new MarriageCertificate();
            MarriageCertRequest marriageCertRequest = MarriageCertRequest.builder().marriageCertificate(marriageCertificate).requestInfo(requestInfo).build();
            marriageCertificate.setMarriageRegistryDetails(marriageRegistryDetailsList.get(0));
            marriageCertificate.setRegistrationno(marriageRegistryDetailsList.get(0).getRegistrationno());
            List<MarriageCertificate> marriageDtls = searchCertificate(criteria,requestInfo);
            if (null!=marriageDtls && marriageDtls.size() > 1) {
                throw new CustomException("Invalid_Input", "Error in processing data");
            }
            marriageCertificate.setMarriageRegId(marriageRegistryDetailsList.get(0).getId());
            SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
                String date = df.format(marriageRegistryDetailsList.get(0).getRegistrationDate());
                String datestr = date.split("-")[2];
                marriageCertificate.setYear(datestr);
            MarriageCertPDFRequest marriageCertPDFRequest = MarriageCertPDFRequest.builder().requestInfo(requestInfo).marriageCertificate(Arrays.asList(marriageCertificate)).build();
            long currentDate=System.currentTimeMillis();
            long dateOfIssue = 0l;
            if(null!=marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails()&&null!=marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails().getAuditDetails()){
                dateOfIssue=marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails().getAuditDetails().getLastModifiedTime()!=null?marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails().getAuditDetails().getLastModifiedTime() : marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails().getAuditDetails().getCreatedTime();
            }
            marriageCertificate.setDateofissue(dateOfIssue!=0l?dateOfIssue:currentDate);
            String strDate=null;
            String dodInWords = null;
            if(marriageCertificate.getDateofissue() != null){
                Date res = new Date(marriageCertificate.getDateofissue()) ;
                SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
                strDate= formatter.format(res);
                String[] dobAry = strDate.split("/");
                try {
                    dodInWords = NumToWordConverter.convertNumber(Long.parseLong(dobAry[0])) + "/" + new SimpleDateFormat("MMMM").format(res) + "/" + NumToWordConverter.convertNumber(Long.parseLong(dobAry[2]));
                    marriageCertificate.setDateOfIssueInWords(StringUtils.upperCase(StringUtils.isNotBlank(dodInWords)?dodInWords.trim():dodInWords));
                } catch(Exception e) {
                    log.error("DateToWords conversion error. threw an Exception: ",e);
                }
            }

            marriageCertificate.setEmbeddedUrl(marriageCertPDFRequest.getMarriageCertificate().get(0).getEmbeddedUrl());
            MarriageCertPdfResponse pdfResp = repository.saveMarriageCertPdf(marriageCertPDFRequest);
            marriageCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
            marriageCertificate.setCertificateStatus(MarriageCertificate.StatusEnum.FREE_DOWNLOAD);
            marriageCertificate.setCount(1);//If 1 download from filestoreId, If 0, need to regenerate certificate
            marriageCertificate.setMarriagecertificateno(marriageRegistryDetailsList.get(0).getCertificateNo());
            List<MarriageCertificate> marriageCertSearch = repository.searchCertificateByMarriageId(marriageCertRequest.getMarriageCertificate().getMarriageRegId());
            if (null != marriageCertSearch && !marriageCertSearch.isEmpty()) {
                marriageCertRequest.getMarriageCertificate().setId(marriageCertSearch.get(0).getId());
                repository.updateMarriageCertificate(marriageCertRequest);
            } else {
                repository.saveMarriageCertificate(marriageCertRequest);
            }
            return marriageCertificate;
        } catch (Exception e) {
            log.error("DOWNLOAD_ERROR. Marriage Certificate , threw an Exception: ",e);
            throw new CustomException("DOWNLOAD_ERROR", "Error in Downloading Certificate"+e.getMessage());
        }
        }else if (marriageRegistryDetailsList == null && marriageRegistryDetailsList.isEmpty()){
            log.info("DOWNLOAD_ERROR. Marriage Certificate , Marriage registry not found");
            throw new CustomException("DOWNLOAD_ERROR", "Marriage registry not found");
        }else{
            log.info("DOWNLOAD_ERROR. Marriage Certificate , More than one marriage registry found");
            throw new CustomException("DOWNLOAD_ERROR", "More than one marriage registry found");
        }

    }

    public List<MarriageCertificate> searchCertificate(MarriageRegistrySearchCriteria criteria,RequestInfo requestInfo) {
        List<MarriageRegistryDetails> obj = repository.searchMarriageRegistry(criteria,requestInfo);
        if(null!=obj&&obj.size()>0) {
            return repository.searchCertificateByMarriageId(obj.get(0).getId());
        }else{
            throw  new CustomException("MARRIAGE REGISTRY DATA NOT FOUND", " Marriage Registry data not found");
        }
    }



    public List<MarriageCorrectionDetails> updateMarriageRegistry(MarriageCorrectionRequest request) {
        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        criteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria,request.getRequestInfo());
        marriageCorrectionApplnValidator.validateCorrectionRegistrySearch(marriageRegistryDetails);

        MarriageApplicationSearchCriteria aplnCriteria=new MarriageApplicationSearchCriteria();
        aplnCriteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        aplnCriteria.setApplicationNo(request.getMarriageCorrectionDetails().get(0).getApplicationNo());
        aplnCriteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());
        List<MarriageApplicationDetails> marriageAplnDetails = marriageApplicationRepository.getMarriageApplication(aplnCriteria, request.getRequestInfo());
        marriageCorrectionApplnValidator.validateCorrectionApplnSearch(marriageAplnDetails);

        MarriageRegistryRequest marriageRegistryRequest = correctionApplicationToRegistryMapper.convert(marriageRegistryDetails, marriageAplnDetails);
        marriageRegistryRequest.setRequestInfo(request.getRequestInfo());
        marriageCorrectionEnrichment.enrichRegistryUpdate(marriageRegistryRequest);
        producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryCorrectionTopic(), marriageRegistryRequest);

        return request.getMarriageCorrectionDetails();
    }
}
