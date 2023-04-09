package org.ksmart.marriage.marriagecorrection.service;

import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.service.MarriageApplicationService;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriagecorrection.enrichment.MarriageCorrectionEnrichment;
import org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.repository.MarriageCorrectionRepository;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MarriageCorrectionService {

    private final MarriageCorrectionRepository correctionRepository;

    private final MarriageRegistryRepository registryRepository;

    private final MarriageCorrectionEnrichment marriageCorrectionEnrichment;

    private final RegistryToApplicationMapper RegistryToApplicationMapper;

    private final MarriageApplicationService MarriageService;

    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;

    public MarriageCorrectionService(MarriageCorrectionRepository correctionRepository, MarriageRegistryRepository registryRepository, MarriageCorrectionEnrichment marriageCorrectionEnrichment, org.ksmart.marriage.marriagecorrection.mapper.RegistryToApplicationMapper registryToApplicationMapper, MarriageApplicationService marriageService, MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageMdmsUtil util, MarriageMDMSValidator mdmsValidator) {
        this.correctionRepository = correctionRepository;
        this.registryRepository = registryRepository;
        this.marriageCorrectionEnrichment = marriageCorrectionEnrichment;
        RegistryToApplicationMapper = registryToApplicationMapper;
        MarriageService = marriageService;
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
    }

    public List<MarriageCorrectionDetails> createCorrection(MarriageCorrectionRequest request) {

        MarriageRegistrySearchCriteria criteria = new MarriageRegistrySearchCriteria();
        criteria.setRegistrationNo(request.getMarriageCorrectionDetails().get(0).getRegistrationno());
        List<MarriageRegistryDetails> marriageRegistryDetails = searchRegistry(criteria);
        if (!marriageRegistryDetails.isEmpty()) {
            MarriageApplicationDetails marriageApplicationDetail = RegistryToApplicationMapper.convert(marriageRegistryDetails);
            marriageCorrectionEnrichment.enrichCreate(request, marriageApplicationDetail);

            List<MarriageApplicationDetails> marriageApplicationDetailsList = new ArrayList<>();
            marriageApplicationDetailsList.add(marriageApplicationDetail);

            request.setMarriageDetails(marriageApplicationDetailsList);

            //correctionRepository.saveCorrectionDetails(request);

            //Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
            //mdmsValidator.validateMarriageMDMSData(request,mdmsData);

            producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);
        }
        return request.getMarriageCorrectionDetails();
    }


    private List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        return registryRepository.searchMarriageRegistry(criteria);
    }
}
