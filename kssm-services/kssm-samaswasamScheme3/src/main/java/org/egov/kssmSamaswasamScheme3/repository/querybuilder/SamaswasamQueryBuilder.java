package org.egov.kssmSamaswasamScheme3.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class SamaswasamQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" SELECT intid, numkssmpensionerid, scheme_id, district, application_no, reg_no, application_date, office_typeid, office_nameid,")
            .append(" applicant_nameeng, applicant_namemal, applicant_houseno, applicant_wardno, applicant_housenameeng, applicant_housenamemal, applicant_streetnameeng")
            .append(" applicant_streetnamemal, applicant_mainplacenameeng, applicant_mainplacenamemal, applicant_postofficeid, applicant_pincode, applicant_district_id, applicant_lbid, applicant_blockid, village_id_applicant, taluk_id_applicant, applicantlandphone_no, applicantmobile_no, applicant_age, applicant_dob, applicant_genderid, applicant_heamo_center_eng, applicant_heamo_center_mal, applicant_heamo_doctor_eng, applicant_heamo_doctor_mal, applicant_bankaccountno, applicant_bank, applicant_bank_branch, applicant_ifsccode, applicant_aadharno, applicant_eidno, file_status, sourceid, user_id, icdsofficer_id, fieldenquiry_date, icdsremarks, icdseligibility_id, cdporec_date, cdpoeligibility_id, remarks, cdposubmit_date, dtdecision_date, chvreason, penstart_date, verifier_id, verifierremarks, approver_id, approverremarks, numkssmefileid")
            .append(" FROM public.tr_live_samaswasam3")
            .toString();


          
    public String getSamaswasamDetailsSearchQuery(@NotNull SamaswasamSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("numkssmpensionerid", criteria.getNumkssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }

}
