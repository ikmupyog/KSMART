package org.egov.filemgmnt.repository;

import java.util.List;

import org.egov.filemgmnt.TestConfig;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;

import lombok.extern.slf4j.Slf4j;

@Disabled
@SpringBootTest
@Import(TestConfig.class)
@TestPropertySource(locations = { "classpath:test.properties" })
@SuppressWarnings({ "PMD.JUnitTestsShouldIncludeAssert" })
@Slf4j
class FileManagementRepositoryTests {

    @Autowired
    private FileManagementRepository repository;

    @Test
    @Order(1)
    void searchApplicants() {

        ApplicantSearchCriteria searchCriteria = new ApplicantSearchCriteria();
        searchCriteria.setId("f149795a-09ea-4fdb-908e-61576cada407");

        List<ApplicantPersonal> result = repository.searchApplicantPersonals(searchCriteria);
        log.debug("*** Applicant Search:: \n{}", FMUtils.toJson(result));
    }

    @Test
    @Order(1)
    void searchServices() {

        ApplicantServiceSearchCriteria searchCriteria = new ApplicantServiceSearchCriteria();
        searchCriteria.setServiceDetailId("ffd9101b-3b90-4127-8c03-b9271402e0a0");

        List<ApplicantServiceDetail> result = repository.searchApplicantServices(searchCriteria);
        log.debug("*** Applicant Service Search:: \n{}", FMUtils.toJson(result));
    }
}
