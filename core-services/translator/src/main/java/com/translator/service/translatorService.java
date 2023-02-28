package com.translator.service;

public class translatorService {
	
	public String getTenantName(Object mdmsData, String tenantId) {
        List<String> tenants  = getTenantCodes(mdmsData);
        int index = tenants.indexOf(tenantId);
        return JsonPath.read(mdmsData, BirthConstants.CR_MDMS_TENANTS_JSONPATH+"["+index+"].name");
    }


}
