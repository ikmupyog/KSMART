package org.ksmart.marriage.marriagecommon.services;

import com.jayway.jsonpath.JsonPath;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.utils.MarriageConstants;
// import org.ksmart.birth.birthcommon.model.WorkFlowCheck;

import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
@Service
public class CommonValidationFromMdms {

    public WorkFlowCheck checkValidation(Object mdmsData, String birthPlace, Long dob, WorkFlowCheck wfc) {
        Calendar calendar = Calendar.getInstance();
        Long currentDate = calendar.getTimeInMillis();
        List<LinkedHashMap<String, Object>> wfLists = JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_NEW_WF_JSONPATH + "[*]");
        for (int n = 0; n < wfLists.size(); n++) {
            String startStr = wfLists.get(n).get("startdateperiod").toString();
            String endStr = wfLists.get(n).get("enddateperiod").toString();
            Long start = Long.parseLong(startStr);
            Long end = Long.parseLong(endStr);
            if (wfLists.get(n).get("BirtPlace").equals(birthPlace)) {
                if (end > 0L) {
                    Long comp = currentDate - dob;
                    if (comp <= end && comp >= start) {
                        wfc.setApplicationType(wfLists.get(n).get("ApplicationType").toString());
                        wfc.setWorkflowCode(wfLists.get(n).get("WorkflowCode").toString());
                        if(wfLists.get(n).get("payment").toString().equals("true"))
                        wfc.setPayment(true);
                        else
                            wfc.setPayment(false);
                        wfc.setAmount(Integer.parseInt(wfLists.get(n).get("amount").toString()));
                        wfc.setActive(Boolean.getBoolean(wfLists.get(n).get("active").toString()));
                    }
                }
            }
        }
        return wfc;
    }
}



