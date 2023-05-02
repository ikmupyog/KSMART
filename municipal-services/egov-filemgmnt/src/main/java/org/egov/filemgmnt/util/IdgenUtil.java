package org.egov.filemgmnt.util;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.web.models.idgen.IdGenerationRequest;
import org.egov.filemgmnt.web.models.idgen.IdGenerationResponse;
import org.egov.filemgmnt.web.models.idgen.IdRequest;
import org.egov.filemgmnt.web.models.idgen.IdResponse;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class IdgenUtil {

    @Value("${egov.idgen.host}")
    private String idGenHost;

    @Value("${egov.idgen.path}")
    private String idGenPath;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ServiceRequestRepository restRepo;

    public List<String> getIdList(final RequestInfo requestInfo, final String tenantId, final String idName, // NOPMD
                                  final String moduleCode, final String fnType, final Integer count) {
        final List<IdRequest> reqList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            reqList.add(IdRequest.builder()
                                 .tenantId(tenantId)
                                 .idName(idName)
//                                 .format(idformat)
                                 .moduleCode(moduleCode)
                                 .fnType(fnType)
                                 .count(count)
                                 .build());
        }

        final IdGenerationRequest request = IdGenerationRequest.builder()
                                                               .idRequests(reqList)
                                                               .requestInfo(requestInfo)
                                                               .build();

        final StringBuilder uri = new StringBuilder(idGenHost).append(idGenPath);

        if (log.isDebugEnabled()) {
            log.debug("ID Gen URI = {}", uri);
        }

        final IdGenerationResponse response = objectMapper.convertValue(restRepo.fetchResult(uri, request),
                                                                        IdGenerationResponse.class);

        final List<IdResponse> idResponses = response.getIdResponses();

        if (CollectionUtils.isEmpty(idResponses)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No ids returned from idgen Service");
        }

        return idResponses.stream()
                          .map(IdResponse::getId)
                          .collect(Collectors.toList());
    }
}