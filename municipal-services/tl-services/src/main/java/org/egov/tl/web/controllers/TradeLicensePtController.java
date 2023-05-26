package org.egov.tl.web.controllers;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.client.ClientProtocolException;
import org.egov.tl.service.PTService;
import org.egov.tl.util.ResponseInfoFactory;
import org.egov.tl.web.models.BuildingDet;
import org.egov.tl.web.models.PTResponse;
import org.egov.tl.web.models.RequestInfoWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/pt")
public class TradeLicensePtController {

    private final PTService ptService;
    private final ResponseInfoFactory responseInfoFactory;

    @Autowired
    public TradeLicensePtController(PTService ptService,ResponseInfoFactory responseInfoFactory) {
        this.ptService = ptService;
        this.responseInfoFactory=responseInfoFactory;
    }

    @RequestMapping(value = { "/{servicename}/_search", "/_search" }, method = RequestMethod.POST)
    public ResponseEntity<PTResponse> search(@Valid @RequestBody BuildingDet criteria,
            @PathVariable(required = false) String servicename) throws ClientProtocolException, IOException, ParserConfigurationException, SAXException {
        BuildingDet building = ptService.search(criteria,
                               servicename);

        // int count = tradeLicensePdeService.countLicenses(criteria,
        // requestInfoWrapper.getRequestInfo(), servicename,
        // headers);

        PTResponse response = PTResponse.builder().buildingDet(building).responseInfo(
                responseInfoFactory.createResponseInfoFromRequestInfo(
                        criteria.getRequestInfo(),
                        true))
                .count(0)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
