package org.egov.filemgmnt.util;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;

import java.util.Collection;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Slf4j
public class FMUtils implements ApplicationContextAware {

    public static final String TENANT_FORMAT = "^kl\\.[a-z]+$";

    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException { // NOPMD
        FMUtils.applicationContext = applicationContext;
    }

    public static ObjectMapper getObjectMapper() {
        return applicationContext.getBean(ObjectMapper.class);
    }

    public static String toJson(final Object obj) {
        try {
            return getObjectMapper().writerWithDefaultPrettyPrinter()
                                    .writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("Failed converting to json", e);
        }
        return StringUtils.EMPTY;
    }

    public static void validateSearchParam(final BeanWrapper bw, final String param, final List<String> allowedParams) {
        final Object value = bw.getPropertyValue(param);

        boolean invalid = false; // NOPMD
        if (value instanceof Collection) {
            invalid = CollectionUtils.isNotEmpty((Collection<?>) value) && !allowedParams.contains(param);
        } else {
            invalid = value != null && !allowedParams.contains(param);
        }

        if (invalid) {
            throw new CustomException(INVALID_SEARCH.getCode(), String.format("Search on %s is not allowed", param));
        }
    }

    public static boolean isValidFormat(final String regex, final String input) {
        return Pattern.matches(regex, input);
    }
}
