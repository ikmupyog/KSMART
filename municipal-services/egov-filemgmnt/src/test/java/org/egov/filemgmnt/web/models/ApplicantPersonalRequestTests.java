package org.egov.filemgmnt.web.models;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.assertj.core.api.Assertions;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.TestConfig;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.tracer.model.CustomException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
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
class ApplicantPersonalRequestTests {

    @Test
    void requestJson() {
        ApplicantPersonalRequest request = ApplicantPersonalRequest.builder()
                                                                   .requestInfo(RequestInfo.builder()
                                                                                           .userInfo(User.builder()
                                                                                                         .uuid(UUID.randomUUID()
                                                                                                                   .toString())
                                                                                                         .build())
                                                                                           .build())
                                                                   .build();

        request.addApplicantPersonal(ApplicantPersonal.builder()
                                                      .id(UUID.randomUUID()
                                                              .toString())
                                                      .firstName("FirstName")
                                                      .serviceDetails(new ServiceDetails())
                                                      .applicantAddress(new ApplicantAddress())
                                                      .applicantServiceDocuments(new ApplicantServiceDocuments())
                                                      .applicantDocuments(new ApplicantDocuments())
                                                      .fileDetail(new FileDetail())
                                                      .auditDetails(new AuditDetails())
                                                      .build());
        log.info(" *** APPLICANT PERSONAL JSON \n {}", FMUtils.toJson(request));
    }

    @Test
    void validateSearchParams() {
        ApplicantPersonal applicant = ApplicantPersonal.builder()
                                                       .id(UUID.randomUUID()
                                                               .toString())
                                                       .firstName("FirstName")
                                                       .lastName("LastName")
                                                       .mobileNo("9446903827")
                                                       .tenantId("kl")
                                                       .aadhaarNo("123456789123")
                                                       .build();

        List<String> allowedParams = Collections.singletonList("firstName");
        BeanWrapper bw = new BeanWrapperImpl(applicant);

        log.info("*** firstName: {}", bw.getPropertyValue("firstName"));
        log.info("*** mobileNo: {}", bw.getPropertyValue("mobileNo"));

        FMUtils.validateSearchParam(bw, "firstName", allowedParams);

        Assertions.assertThatThrownBy(() -> {
            FMUtils.validateSearchParam(bw, "mobileNo", allowedParams);
        })
                  .isInstanceOf(CustomException.class)
                  .hasMessageContaining("Search on mobileNo is not allowed");
    }

    @ParameterizedTest
    @MethodSource("validateArguments")
    void validateApplicantPersonalRequest(Validator validator, ApplicantPersonalRequest request) {
        ApplicantPersonal applicant = ApplicantPersonal.builder()
                                                       .id(UUID.randomUUID()
                                                               .toString())
                                                       .firstName("FirstName")
                                                       .lastName("LastName")
                                                       .mobileNo("9446903827")
                                                       .tenantId("kl")
                                                       .aadhaarNo("123456789123")
                                                       .email("demo@gmail.com")
//            .serviceDetails(new ServiceDetails())
//            .applicantAddress(new ApplicantAddress())
//            .applicantServiceDocuments(new ApplicantServiceDocuments())
//            .applicantDocuments(new ApplicantDocuments())
//            .fileDetail(new FileDetail())
//            .auditDetails(new AuditDetails())
                                                       .build();
        request.addApplicantPersonal(applicant);

        Set<ConstraintViolation<ApplicantPersonalRequest>> constraintViolations = validator.validate(request);
        constraintViolations.forEach(System.out::println);

        Assertions.assertThat(constraintViolations)
                  .describedAs("Applicant personal request")
                  .isEmpty();
    }

    static Stream<Arguments> validateArguments() {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();

        ApplicantPersonalRequest request = ApplicantPersonalRequest.builder()
                                                                   .requestInfo(RequestInfo.builder()
                                                                                           .userInfo(User.builder()
                                                                                                         .uuid(UUID.randomUUID()
                                                                                                                   .toString())
                                                                                                         .build())
                                                                                           .build())
                                                                   .build();

        return Stream.of(Arguments.of(validatorFactory.getValidator(), request));
    }
}
