package org.ksmart.marriage.utils;


import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.common.services.MdmsTenantService;
////import org.ksmart.birth.newbirth.repository.querybuilder.NewBirthQueryBuilder;
//import org.ksmart.birth.web.model.newbirth.NewBirthDetailRequest;
//import org.ksmart.birth.web.model.stillbirth.StillBirthDetailRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class IDGenerator {

    private final MarriageMdmsUtil mdmsUtil;
    private final MdmsTenantService mdmsTenantService;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageApplicationQueryBuilder queryBuilder;


    @Autowired
    public IDGenerator(MarriageMdmsUtil mdmsUtil, MdmsTenantService mdmsTenantService,
                       JdbcTemplate jdbcTemplate, MarriageApplicationQueryBuilder queryBuilder) {
        this.mdmsTenantService = mdmsTenantService;
        this.mdmsUtil = mdmsUtil;
        this.jdbcTemplate = jdbcTemplate;

        this.queryBuilder = queryBuilder;
    }

    /**
     * Sets the ApplicationNumber for given KsmartBirthDetailsRequest
     *
     * @param request KsmartBirthDetailsRequest which is to be created
     */
    public String setIDGenerator(MarriageDetailsRequest request, String moduleCode, String idType) {
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        String tenantId = request.getMarriageDetails().get(0).getTenantid();
        String nextID = getNewID(tenantId, moduleCode, idType, Year);

        // mdms call for tenand idgencode and lbtypecode
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());

        String idgenCode = mdmsTenantService.getTenantIdGenCode(mdmsData,tenantId);
        String lbTypeCode = mdmsTenantService.getTenantLetterCode(mdmsData,tenantId);

        String idGenerated = new StringBuilder().append(idType)
                                                .append("-")
                                                .append(nextID)
                                                .append("-")
                                                .append(String.valueOf(Year))
                                                .append("-")
                                                .append(moduleCode)
                                                .append("-")
                                                .append(lbTypeCode.charAt(0))
                                                .append("-")
                                                .append(idgenCode)
                                                .append("-")
                                                .append(MarriageConstants.STATE_CODE).toString();
        return idGenerated;
    }

//    public String setIDGeneratorStill(StillBirthDetailRequest request, String moduleCode, String idType) {
//        int Year = Calendar.getInstance().get(Calendar.YEAR);
//        String tenantId = request.getBirthDetails().get(0).getTenantId();
//        String nextID = getNewID(tenantId, Year, moduleCode, idType);
//
//        // mdms call for tenand idgencode and lbtypecode
//        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());
//
//        String idgenCode = mdmsTenantService.getTenantIdGenCode(mdmsData,tenantId);
//        String lbTypeCode = mdmsTenantService.getTenantLetterCode(mdmsData,tenantId);
//
//        String idGenerated = new StringBuilder().append(idType)
//                .append("-")
//                .append(nextID)
//                .append("-")
//                .append(String.valueOf(Year))
//                .append("-")
//                .append(moduleCode)
//                .append("-")
//                .append(lbTypeCode.charAt(0))
//                .append("-")
//                .append(idgenCode)
//                .append("-")
//                .append(BirthConstants.STATE_CODE).toString();
//        return idGenerated;
//    }
//

    public String setIDGeneratorStill(MarriageDetailsRequest request, String moduleCode, String idType) {
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        String tenantId = request.getMarriageDetails().get(0).getTenantid();
        String nextID = getNewID(tenantId, moduleCode, idType ,Year);

        // mdms call for tenand idgencode and lbtypecode
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo());

        String idgenCode = mdmsTenantService.getTenantIdGenCode(mdmsData,tenantId);
        String lbTypeCode = mdmsTenantService.getTenantLetterCode(mdmsData,tenantId);

        String idGenerated = new StringBuilder().append(idType)
                .append("-")
                .append(nextID)
                .append("-")
                .append(String.valueOf(Year))
                .append("-")
                .append(moduleCode)
                .append("-")
                .append(lbTypeCode.charAt(0))
                .append("-")
                .append(idgenCode)
                .append("-")
                .append(MarriageConstants.STATE_CODE).toString();
        return idGenerated;
    }

   public String getNewID( String idType , String moduleCode ,String tenantId, int Year) {

       List<Object> preparedStmtValues = new ArrayList<>();
        preparedStmtValues.add(idType);
        preparedStmtValues.add(moduleCode);
       preparedStmtValues.add(tenantId);
       preparedStmtValues.add(Year);
       String query = queryBuilder.getNextIDQuery();
       List<Map<String, Object>> nextID = jdbcTemplate.queryForList(query, preparedStmtValues.toArray());
       String finalid = String.valueOf(nextID.get(0).get("fn_next_id"));
       return finalid;
    }
}
