package org.ksmart.marriage.marriageapplication.repository.querybuilder;


import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.List;
@Component
public class MarriageApplicationQueryBuilder extends BaseBirthQuery {
    private static final String QUERY = new StringBuilder()
            .append("SELECT mrg.id, mrg.dateofreport, mrg.dateofmarriage, mrg.firstname_bride_en, mrg.firstname_bride_ml,")
            .append("mrg.middlename_bride_en, mrg.middlename_bride_ml, mrg.lastname_bride_en, mrg.lastname_bride_ml, mrg.firstname_groom_en, mrg.firstname_groom_ml,")
            .append("mrg.middlename_groom_en, mrg.middlename_groom_ml, mrg.lastname_groom_en, mrg.lastname_groom_ml, mrg.tenantid, mrg.remarks_en, mrg.remarks_ml, mrg.aadharno, ")
            .append("mrg.esign_user_code, mrg.esign_user_desig_code, mrg.applicationtype, mrg.businessservice, mrg.workflowcode, mrg.fm_fileno, mrg.file_date, mrg.file_status,")
            .append("mrg.applicationtype, mrg.businessservice, mrg.workflowcode, mrg.fm_fileno, mrg.file_date, mrg.applicationno, mrg.registrationno,")
            .append("mrg.applicationno, mrg.registrationno, mrg.registration_date, mrg.action, mrg.status, mrg.createdtime, mrg.createdby, mrg.lastmodifiedtime, mrg.lastmodifiedby")
            .append(" FROM public.eg_marriage_details mrg").toString();


    public String getBirthApplicationSearchQuery(@NotNull MarriageApplicationSearchCriteria criteria,
                                                 @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("mrg.id", criteria.getId(), query, preparedStmtValues);
        addFilter("mrg.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("mrg.applicationno", criteria.getApplicationNo(), query, preparedStmtValues);

        return query.toString();
    }
    public String getNextIDQuery() {
        StringBuilder query = new StringBuilder("select fn_next_id(?,?,?)");
        return query.toString();
    }

}
