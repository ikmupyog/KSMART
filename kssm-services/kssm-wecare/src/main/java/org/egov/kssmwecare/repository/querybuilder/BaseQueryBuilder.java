package org.egov.kssmwecare.repository.querybuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

public class BaseQueryBuilder {

    void addFilters(final String column, final List<Long> numkssmpensionerid, final StringBuilder query,
            final List<Object> paramValues) {

        if (CollectionUtils.isNotEmpty(numkssmpensionerid)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append(" IN (")
                    .append(getStatementParameters(numkssmpensionerid.size()))
                    .append(") ");
            numkssmpensionerid.forEach(paramValues::add);
        }
    }

    void addFilter(final String column, final String value, final StringBuilder query, final List<Object> paramValues) {
        if (StringUtils.isNotBlank(value)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append("=? ");
            paramValues.add(value);
            System.out.println("parammm" + value);
        }
    }

    void addWhereClause(final List<Object> values, final StringBuilder query) {
        if (CollectionUtils.isEmpty(values)) {
            System.out.println("valuesssss" + values);
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
