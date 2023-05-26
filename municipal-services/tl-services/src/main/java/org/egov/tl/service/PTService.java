package org.egov.tl.service;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.client.ClientProtocolException;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tl.util.TradeUtil;
import org.egov.tl.web.models.BuildingDet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

@Service
public class PTService {
    private TradeUtil util;

    @Autowired
    public PTService(TradeUtil util) {
        this.util = util;
    }

    public BuildingDet search(BuildingDet criteria,
            String serviceFromPath) throws ClientProtocolException, IOException, ParserConfigurationException, SAXException {
                return  util.pTBuildingCall(criteria.getLbId(), criteria.getZoneId(), criteria.getWardId(), criteria.getDoorNo(), criteria.getDoorNoSub());
         
    }

}
