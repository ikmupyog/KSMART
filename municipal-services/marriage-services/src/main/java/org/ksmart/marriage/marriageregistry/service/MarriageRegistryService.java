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
import org.springframework.stereotype.Service;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
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

    public MarriageRegistryService(MarriageRegistryRepository repository, MarriageRegistryEnrichment marriageRegistryEnrichment,
                                   MarriageProducer producer,
                                   MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageCertificateEnrichment marriageCertificateEnrichment, MarriageCorrectionEnrichment marriageCorrectionEnrichment, MarriageApplicationRepository marriageApplicationRepository, CorrectionApplicationToRegistryMapper correctionApplicationToRegistryMapper) {

            this.producer = producer;
            this.marriageApplicationConfiguration = marriageApplicationConfiguration;
            this.marriageRegistryEnrichment = marriageRegistryEnrichment;
            this.repository = repository;
        this.marriageCertificateEnrichment = marriageCertificateEnrichment;
        this.marriageCorrectionEnrichment = marriageCorrectionEnrichment;
        this.marriageApplicationRepository = marriageApplicationRepository;
        this.correctionApplicationToRegistryMapper = correctionApplicationToRegistryMapper;
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

    public List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        
        return repository.searchMarriageRegistry(criteria);
    }

    public MarriageCertificate download(MarriageRegistrySearchCriteria criteria, RequestInfo requestInfo) {
        List<MarriageRegistryDetails> marriageRegistryDetailsList = repository.searchMarriageRegistry(criteria);
        if (marriageRegistryDetailsList != null && !marriageRegistryDetailsList.isEmpty()) {
//            List<MarriageCertificate> marriageCertificateList = repository.searchCertificateByMarriageId(marriageRegistryDetailsList.get(0).getId());
        try {

            MarriageCertificate marriageCertificate = new MarriageCertificate();

            MarriageCertRequest marriageCertRequest = MarriageCertRequest.builder().marriageCertificate(marriageCertificate).requestInfo(requestInfo).build();
            marriageCertificate.setMarriageRegistryDetails(marriageRegistryDetailsList.get(0));
            marriageCertificate.setRegistrationno(marriageRegistryDetailsList.get(0).getRegistrationno());
            List<MarriageCertificate> marriageDtls = searchCertificate(criteria);
            if (null!=marriageDtls && marriageDtls.size() > 1) {
                throw new CustomException("Invalid_Input", "Error in processing data");
            }

//            if(marriageDtls.size() > 0) { //TODO check if certificate already available , will the date of issue changes?
            marriageCertificate.setMarriageRegId(marriageRegistryDetailsList.get(0).getId());
//                marriageCertificate.setApplicationId(marriageDtls.get(0).getApplicationId());
//                marriageCertificate.setApplicationNumber(marriageDtls.get(0).getAckNo());
//            marriageCertificate.setDateofreporting(marriageRegistryDetailsList.get(0).getDateofreporting());
//            marriageCertificate.setTenantid(marriageRegistryDetailsList.get(0).getTenantid());
            SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
                String date = df.format(marriageRegistryDetailsList.get(0).getRegistrationDate());
                String datestr = date.split("-")[2];
                marriageCertificate.setYear(datestr);
//TODO re-check the fields setting
//            marriageDtls.get(0).setCertId(marriageCertRequest.getMarriageCertificate().getMarriagecertificateno());
//            if(null!=marriageDtls&&marriageDtls.size()==1){
//                marriageDtls.get(0).setMarriageRegistryDetails(marriageRegistryDetailsList.get(0));
//            }
//            else if (marriageDtls==null||marriageDtls.size()==0) {
//                marriageDtls.add(marriageCertificate);
//            }
            MarriageCertPDFRequest marriageCertPDFRequest = MarriageCertPDFRequest.builder().requestInfo(requestInfo).marriageCertificate(Arrays.asList(marriageCertificate)).build();
            marriageCertPDFRequest.getMarriageCertificate().forEach(cert->{
                String uiHost = marriageApplicationConfiguration.getUiAppHost();
                String marriageCertPath = StringUtils.replaceEach(marriageApplicationConfiguration.getMarriageCertLink(),new String[]{"$id","$tenantId","$regNo","$marriagecertificateno"}, new String[]{cert.getId(),cert.getMarriageRegistryDetails().getTenantid(),cert.getMarriageRegistryDetails().getRegistrationno(),cert.getMarriagecertificateno()});
                cert.setEmbeddedUrl(repository.getShortenedUrl(uiHost+marriageCertPath));
            });
            Calendar cal = Calendar.getInstance();
            marriageCertificate.setDateofissue(cal.getTimeInMillis());
            marriageCertificate.setEmbeddedUrl(marriageCertPDFRequest.getMarriageCertificate().get(0).getEmbeddedUrl());
           // marriageCertificateEnrichment.createCertificateNo(marriageCertRequest); //TODO check IdGenError
            MarriageCertPdfResponse pdfResp = repository.saveMarriageCertPdf(marriageCertPDFRequest);
//            marriageCertificate.setDateofissue(marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails().getRegistrationDate());
            marriageCertificate.setFilestoreid(pdfResp.getFilestoreIds().get(0));
            marriageCertificate.setCertificateStatus(MarriageCertificate.StatusEnum.FREE_DOWNLOAD);

//            }
            marriageCertificate.setMarriagecertificateno(marriageRegistryDetailsList.get(0).getCertificateNo());
            List<MarriageCertificate> marriageCertSearch = repository.searchCertificateByMarriageId(marriageCertRequest.getMarriageCertificate().getId());
            if (null != marriageCertSearch && !marriageCertSearch.isEmpty()) {
                marriageCertRequest.getMarriageCertificate().setId(marriageCertSearch.get(0).getId());
                repository.updateMarriageCertificate(marriageCertRequest);
            } else {
                //marriageCertificate.setId(UUID.randomUUID().toString());
                repository.saveMarriageCertificate(marriageCertRequest);
            }


            return marriageCertificate;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw new CustomException("DOWNLOAD_ERROR", "Error in Downloading Certificate"+e.getMessage());
        }
        }else if (marriageRegistryDetailsList == null && marriageRegistryDetailsList.isEmpty()){
            throw new CustomException("DOWNLOAD_ERROR", "Marriage registry not found");
        }else{
            throw new CustomException("DOWNLOAD_ERROR", "More than one marriage registry found");
        }

    }

    public List<MarriageCertificate> searchCertificate(MarriageRegistrySearchCriteria criteria) {
        List<MarriageRegistryDetails> obj = repository.searchMarriageRegistry(criteria);
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
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);

        if (!marriageRegistryDetails.isEmpty()) {
            MarriageApplicationSearchCriteria aplnCriteria=new MarriageApplicationSearchCriteria();
            aplnCriteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
            aplnCriteria.setApplicationNo(request.getMarriageCorrectionDetails().get(0).getApplicationNo());
            aplnCriteria.setTenantId(request.getMarriageCorrectionDetails().get(0).getTenantid());

            List<MarriageApplicationDetails> marriageAplnDetails = marriageApplicationRepository.getMarriageApplication(aplnCriteria, request.getRequestInfo());

            if(!marriageAplnDetails.isEmpty()) {
                MarriageRegistryRequest marriageRegistryRequest = correctionApplicationToRegistryMapper.convert(marriageRegistryDetails, marriageAplnDetails);
                marriageRegistryRequest.setRequestInfo(request.getRequestInfo());
                marriageCorrectionEnrichment.enrichRegistryUpdate(marriageRegistryRequest);
                producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryCorrectionTopic(), marriageRegistryRequest);
            }else{
                throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                        "Marriage Application(s) not found in database.");
            }
        }else{
            throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        return request.getMarriageCorrectionDetails();
    }
}
