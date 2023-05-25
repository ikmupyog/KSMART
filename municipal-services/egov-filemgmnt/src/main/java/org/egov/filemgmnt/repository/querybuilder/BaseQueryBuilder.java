package org.egov.filemgmnt.repository.querybuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.filemgmnt.web.enums.TypeValue;

class BaseQueryBuilder {

    protected static final String APPLICANT_FIELDS = new StringBuilder().append("      ap.id AS applicant_id, ap.aadhaarno, ap.email, ap.firstname, ap.lastname, ap.title, ap.mobileno")
                                                                        .append("    , ap.tenantid, ap.createdby AS applicant_createdby, ap.createdtime AS applicant_createdtime")
                                                                        .append("    , ap.lastmodifiedby AS applicant_lastmodifiedby, ap.lastmodifiedtime AS applicant_lastmodifiedtime")
                                                                        .append("    , ap.fatherfirstname, ap.fatherlastname, ap.motherfirstname, ap.motherlastname, ap.applicantcategory")
                                                                        .append("    , ap.dateofbirth, ap.bankaccountno, ap.firstnamemal, ap.lastnamemal, ap.fatherfirstnamemal")
                                                                        .append("    , ap.fatherlastnamemal, ap.motherfirstnamemal, ap.motherlastnamemal")
                                                                        // applicant address columns
                                                                        .append("    , ad.id AS address_id, ad.buildingno, ad.housename, ad.street")
                                                                        .append("    , ad.pincode, ad.postofficename, ad.createdby AS address_createdby, ad.createdtime AS address_createdtime")
                                                                        .append("    , ad.lastmodifiedby AS address_lastmodifiedby, ad.lastmodifiedtime AS address_lastmodifiedtime")
                                                                        .append("    , ad.residenceassociationno, ad.localplace, ad.mainplace, ad.wardno, ad.subno, ad.housenamemal, ad.village")
                                                                        .append("    , ad.taluk, ad.streetmal, ad.localplacemal, ad.mainplacemal")
                                                                        // applicant document columns
                                                                        .append("    , doc.id AS document_id, doc.documenttypeid, doc.documentnumber")
                                                                        .append("    , doc.docexpirydate, doc.createdby AS document_createdby, doc.createdtime AS document_createdtime")
                                                                        .append("    , doc.lastmodifiedby AS document_lastmodifiedby, doc.lastmodifiedtime AS document_lastmodifiedtime")
                                                                        .toString();

    void addDateRangeFilter(final String column, final Long startDate, final Long endDate, final StringBuilder query,
                            final List<Object> paramValues) {

        if (startDate != null || endDate != null) {
            addWhereClause(paramValues, query);
            query.append(" (");

            if (startDate != null) {
                query.append(column)
                     .append(" >= ? ");
                paramValues.add(startDate);
            }

            if (endDate != null) {
                if (startDate != null) {
                    query.append(" AND ");
                }

                query.append(column)
                     .append(" <= ? ");
                paramValues.add(endDate);
            }

            query.append(") ");
        }
    }

    void addFilters(final String column, final List<String> ids, final StringBuilder query,
                    final List<Object> paramValues) {
        if (CollectionUtils.isNotEmpty(ids)) {
            addWhereClause(paramValues, query);
            query.append(column)
                 .append(" IN (")
                 .append(getStatementParameters(ids.size()))
                 .append(") ");
            ids.forEach(paramValues::add);
        }
    }

    void addFilter(final String column, final String value, final StringBuilder query, final List<Object> paramValues) {
        if (StringUtils.isNotBlank(value)) {
            addWhereClause(paramValues, query);
            query.append(column)
                 .append("=? ");
            paramValues.add(value);
        }
    }

    void addFilter(final String column, final TypeValue ty, final StringBuilder query, final List<Object> paramValues) {

        String value = (ty != null)
                ? ty.getValue()
                : StringUtils.EMPTY;

        if (StringUtils.isNotBlank(value)) {
            addWhereClause(paramValues, query);
            query.append(column)
                 .append("=? ");
            paramValues.add(value);
        }
    }

    void addWhereClause(final List<Object> values, final StringBuilder query) {
        if (CollectionUtils.isEmpty(values)) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

    private String getStatementParameters(final int count) {
        return Collections.nCopies(count, "(?)")
                          .stream()
                          .collect(Collectors.joining(", "));
    }
}
