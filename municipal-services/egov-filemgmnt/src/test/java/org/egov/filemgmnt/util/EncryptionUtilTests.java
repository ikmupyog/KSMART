package org.egov.filemgmnt.util;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.common.contract.request.User;
import org.egov.encryption.config.AbacConfiguration;
import org.egov.encryption.config.EncryptionPolicyConfiguration;
import org.egov.encryption.models.Attribute;
import org.egov.encryption.models.EncryptionPolicy;
import org.egov.encryption.models.KeyRoleAttributeAccess;
import org.egov.encryption.models.RoleAttributeAccess;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import lombok.extern.slf4j.Slf4j;

@Disabled
@SpringBootTest
@TestPropertySource(locations = { "classpath:test.properties" })
@SuppressWarnings({ "PMD.JUnitTestsShouldIncludeAssert" })
@Slf4j
public class EncryptionUtilTests {

    @Autowired
    private EncryptionUtil encUtil;

    @BeforeEach
    void init() {
        overrideEncryptionPolicyConfig();
        overrideAbacConfig();
    }

    @Test
    void encryptDecrypt() {
        ApplicantPersonal applicant = ApplicantPersonal.builder()
                                                       .aadhaarNumber("1234567890")
                                                       .address(ApplicantAddress.builder()
                                                                                .id(UUID.randomUUID()
                                                                                        .toString())
                                                                                .build())
                                                       .build();
        try {
            ApplicantPersonal result = encUtil.encryptObject(applicant,
                                                             FMConstants.FM_APPLICANT_ENC_KEY,
                                                             ApplicantPersonal.class);

            if (log.isDebugEnabled()) { // 9327|5gYTHHFoEUfKIlwkYXanjbRYYNB4hp3PIc0=
                log.debug("*** Encrypted Value:\n{}", FMUtils.toJson(result));
            }

            ApplicantServiceDetail result2 = encUtil.decryptObject(ApplicantServiceDetail.builder()
                                                                                         .applicant(result)
                                                                                         .build(),
                                                                   FMConstants.FM_APPLICANT_ENC_KEY,
                                                                   ApplicantServiceDetail.class,
                                                                   RequestInfo.builder()
                                                                              .userInfo(User.builder()
                                                                                            .roles(Collections.singletonList(Role.builder()
                                                                                                                                 .code("EMPLOYEE")
                                                                                                                                 .build()))
                                                                                            .build())
                                                                              .build());

            if (log.isDebugEnabled()) {
                log.debug("*** Decrypted Value:\n{}", FMUtils.toJson(result2));
            }

        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error(e.getLocalizedMessage(), e);
            }
        }
    }

    private static void overrideAbacConfig() {
        try {
            final String roleAttributesJson = FMUtils.loadResourceAsString("DecryptionABAC.json");
            final ObjectMapper objectMapper = FMUtils.getObjectMapper();
            final ObjectReader jsonReader = objectMapper.readerFor(objectMapper.getTypeFactory()
                                                                               .constructCollectionType(List.class,
                                                                                                        KeyRoleAttributeAccess.class));
            final List<KeyRoleAttributeAccess> keyRoleAttributeAccessList = jsonReader.readValue(roleAttributesJson);

            final Map<String, List<RoleAttributeAccess>> keyRoleAttributeAccessMap = keyRoleAttributeAccessList.stream()
                                                                                                               .collect(Collectors.toMap(KeyRoleAttributeAccess::getKey,
                                                                                                                                         KeyRoleAttributeAccess::getRoleAttributeAccessList));
            final AbacConfiguration abacConfig = FMUtils.getBean(AbacConfiguration.class);
            final Field field = abacConfig.getClass()
                                          .getDeclaredField("keyRoleAttributeAccessMap");
            field.setAccessible(true); // NOPMD
            field.set(abacConfig, keyRoleAttributeAccessMap);
            field.setAccessible(false);

        } catch (Exception e) {
            log.error("Failed loading DecryptionABAC.json", e);
        }
    }

    private static void overrideEncryptionPolicyConfig() {
        try {
            final String encryptionPolicyJson = FMUtils.loadResourceAsString("EncryptionPolicy.json");
            final ObjectMapper objectMapper = FMUtils.getObjectMapper();
            final ObjectReader jsonReader = objectMapper.readerFor(objectMapper.getTypeFactory()
                                                                               .constructCollectionType(List.class,
                                                                                                        EncryptionPolicy.class));
            final List<EncryptionPolicy> encryptionPolicyList = jsonReader.readValue(encryptionPolicyJson);

            final Map<String, List<Attribute>> keyAttributeMap = encryptionPolicyList.stream()
                                                                                     .collect(Collectors.toMap(EncryptionPolicy::getKey,
                                                                                                               EncryptionPolicy::getAttributeList));

            final EncryptionPolicyConfiguration encPolicy = FMUtils.getBean(EncryptionPolicyConfiguration.class);
            final Field field = encPolicy.getClass()
                                         .getDeclaredField("keyAttributeMap");
            field.setAccessible(true); // NOPMD
            field.set(encPolicy, keyAttributeMap);
            field.setAccessible(false);

        } catch (Exception e) {
            log.error("Failed loading EncryptionPolicy.json", e);
        }
    }
}
