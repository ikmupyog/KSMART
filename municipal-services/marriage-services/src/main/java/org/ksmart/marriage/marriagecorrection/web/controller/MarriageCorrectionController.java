package org.ksmart.marriage.marriagecorrection.web.controller;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionResponse;
import org.ksmart.marriage.marriagecorrection.service.MarriageCorrectionService;
import org.ksmart.marriage.utils.ResponseInfoFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/marriagedetails")
public class MarriageCorrectionController {


    private final MarriageCorrectionService marriageCorrectionService;

    private final ResponseInfoFactory responseInfoFactory;

    public MarriageCorrectionController(MarriageCorrectionService marriageCorrectionService, ResponseInfoFactory responseInfoFactory) {
        this.marriageCorrectionService = marriageCorrectionService;
        this.responseInfoFactory = responseInfoFactory;
    }

    @PostMapping("/_createmarriagecorrection")
    public ResponseEntity<MarriageCorrectionResponse> create(@Valid @RequestBody MarriageCorrectionRequest request) throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {

        List<MarriageCorrectionDetails> marriageCorrectionDetailsList = marriageCorrectionService.createCorrection(request);
        MarriageCorrectionResponse response = MarriageCorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .marriageCorrectionDetails(marriageCorrectionDetailsList)
                .build();
        return ResponseEntity.ok(response);
    }
}
