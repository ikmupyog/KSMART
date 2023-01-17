package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicantPersonalQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder().append(" SELECT")
                                                           // applicant, applicant address and applicant document
                                                           .append(APPLICANT_FIELDS)
                                                           .append(" FROM eg_fm_applicantpersonal ap")
                                                           .append(" INNER JOIN eg_fm_applicantaddress ad ON ad.applicantpersonalid = ap.id")
                                                           .append(" INNER JOIN eg_fm_applicantdocument doc ON doc.applicantpersonalid = ap.id")
                                                           .toString();

    public String getApplicantPersonalSearchQuery(@NotNull final ApplicantSearchCriteria criteria,
                                                  @NotNull final List<Object> preparedStmtValues,
                                                  @NotNull final Boolean isCount) {

        final StringBuilder query = new StringBuilder(QUERY);

        addFilter("ap.id", criteria.getId(), query, preparedStmtValues);
        addFilter("ap.aadhaarno", criteria.getAadhaarNo(), query, preparedStmtValues);
        addFilter("ap.tenantid", criteria.getTenantId(), query, preparedStmtValues);

        return query.toString();
    }
}
