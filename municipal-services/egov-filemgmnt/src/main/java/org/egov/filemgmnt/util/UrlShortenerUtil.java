package org.egov.filemgmnt.util;

import java.util.Collections;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UrlShortenerUtil {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${egov.url.shortner.host}")
    private String urlShortnerHost;

    @Value("${egov.url.shortner.endpoint}")
    private String urShortnerPath;

    public String getShortenedUrl(final String url) {
        final Map<String, String> body = Collections.singletonMap("url", url);

        String response = restTemplate.postForObject(urlShortnerHost, body, String.class);

        if (StringUtils.isEmpty(response)) {
            if (log.isErrorEnabled()) {
                log.error("URL_SHORTENING_ERROR", "Unable to shorten url: {}", url);
            }
            response = url;
        }

        return response;
    }

}