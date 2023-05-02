package org.egov.filemgmnt.service;

import java.util.Collections;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.Getter;

abstract class AbstractCertificateService { // NOPMD

    @Getter
    private FMConfiguration fmConfig;
    @Getter
    private ServiceRequestRepository restRepo;

    @Autowired
    public final void setFmConfig(final FMConfiguration fmConfig) {
        this.fmConfig = fmConfig;
    }

    @Autowired
    public final void setRestRepo(final ServiceRequestRepository restRepo) {
        this.restRepo = restRepo;
    }

    protected String getShortenedUrl(final String url) {
        final StringBuilder buf = new StringBuilder().append(fmConfig.getUrlShortnerHost())
                                                     .append(fmConfig.getUrlShortnerEndpoint());
        final Map<String, String> request = Collections.singletonMap("url", url);
        final String response = restRepo.fetchResult(buf, request, String.class);

        return StringUtils.isNotBlank(response)
                ? response
                : url;
    }
}
