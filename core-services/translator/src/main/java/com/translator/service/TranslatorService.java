package com.translator.service;

import com.jayway.jsonpath.JsonPath;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.translator.utlis.TranslatorConstants;
import com.translator.utlis.MdmsUtil;

import java.util.List;

@Service
public class TranslatorService {
    private final MdmsUtil mdmsUtil;
    @Autowired
    TranslatorService(MdmsUtil mdmsUtil) {
        this.mdmsUtil = mdmsUtil;
    }
	public void translateMalayalam(String word, RequestInfo requestInfo) {
        Object mdmsData = mdmsUtil.mdmsCall(requestInfo);
        word = "ka";
        getLocalLangName(mdmsData, word);
        System.out.println("maya");
    }

    public String getLocalLangName(Object mdmsData, String code) {
        List<String> tenants  = getLocalLangCodes(mdmsData);
        int index = tenants.indexOf(code);
        return JsonPath.read(mdmsData, TranslatorConstants.MDMS_LOCAL_LANG_JSONPATH+"["+index+"].name");
    }

    private List<String> getLocalLangCodes(Object mdmsData) {
        return JsonPath.read(mdmsData, TranslatorConstants.MDMS_LOCAL_LANG_CODE_JSONPATH);
    }
}
