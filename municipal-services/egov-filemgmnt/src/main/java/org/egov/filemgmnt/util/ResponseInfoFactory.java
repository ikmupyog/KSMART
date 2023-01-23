package org.egov.filemgmnt.util;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.stereotype.Component;

@Component
public class ResponseInfoFactory {

    private static final String DEFAULT_RES_MSG_ID = "uief87324"; // FIXME : Hard-coded

    public ResponseInfo createResponseInfoFromRequestInfo(final RequestInfo info, final Boolean success) {

        String apiId = "";
        String ver = "";
        Long ts = null;
        String msgId = "";

        if (info != null) {
            apiId = info.getApiId();
            ver = info.getVer();
            ts = info.getTs();
            msgId = info.getMsgId();
        }

        return ResponseInfo.builder()
                           .apiId(apiId)
                           .ver(ver)
                           .ts(ts)
                           .msgId(msgId)
                           .resMsgId(DEFAULT_RES_MSG_ID)
                           .status(success
                                   ? "successful"
                                   : "failed")
                           .build();
    }

}