package org.egov.filemgmnt.work;

import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.egov.encryption.config.AbacConfiguration;
import org.egov.encryption.config.EncryptionPolicyConfiguration;
import org.egov.encryption.models.Attribute;
import org.egov.encryption.models.EncryptionPolicy;
import org.egov.encryption.models.KeyRoleAttributeAccess;
import org.egov.encryption.models.RoleAttributeAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.FileCopyUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import lombok.extern.slf4j.Slf4j;

//@Component
//@Profile("test")
@Slf4j
public class EncryptionPolicyOverride {

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EncryptionPolicyConfiguration encPolicy;

    @Autowired
    private AbacConfiguration abacConfig;

    @PostConstruct
    void initializeKeyAttributeMapFromMdms() {
        overrideEncryptionPolicyConfig();

        overrideAbacConfig();
    }

    private void overrideAbacConfig() {
        final Resource resource = resourceLoader.getResource("classpath:DecryptionABAC.json");

        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            final String roleAttributesJson = FileCopyUtils.copyToString(reader);

            final ObjectReader jsonReader = objectMapper.readerFor(objectMapper.getTypeFactory()
                                                                               .constructCollectionType(List.class,
                                                                                                        KeyRoleAttributeAccess.class));
            final List<KeyRoleAttributeAccess> keyRoleAttributeAccessList = jsonReader.readValue(roleAttributesJson);

            final Map<String, List<RoleAttributeAccess>> keyRoleAttributeAccessMap = keyRoleAttributeAccessList.stream()
                                                                                                               .collect(Collectors.toMap(KeyRoleAttributeAccess::getKey,
                                                                                                                                         KeyRoleAttributeAccess::getRoleAttributeAccessList));
            final Field field = abacConfig.getClass()
                                          .getDeclaredField("keyRoleAttributeAccessMap");
            field.setAccessible(true); // NOPMD
            field.set(abacConfig, keyRoleAttributeAccessMap);
            field.setAccessible(false);

        } catch (Exception e) {
            log.error("Failed loading DecryptionABAC.json", e);
        }
    }

    private void overrideEncryptionPolicyConfig() {
        final Resource resource = resourceLoader.getResource("classpath:EncryptionPolicy.json");

        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            final String encryptionPolicyJson = FileCopyUtils.copyToString(reader);

            final ObjectReader jsonReader = objectMapper.readerFor(objectMapper.getTypeFactory()
                                                                               .constructCollectionType(List.class,
                                                                                                        EncryptionPolicy.class));
            final List<EncryptionPolicy> encryptionPolicyList = jsonReader.readValue(encryptionPolicyJson);

            final Map<String, List<Attribute>> keyAttributeMap = encryptionPolicyList.stream()
                                                                                     .collect(Collectors.toMap(EncryptionPolicy::getKey,
                                                                                                               EncryptionPolicy::getAttributeList));
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
