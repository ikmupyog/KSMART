package org.egov.filemgmnt.util;

import org.apache.commons.lang3.StringUtils;

import com.github.vertical_blank.sqlformatter.SqlFormatter;
import com.github.vertical_blank.sqlformatter.core.FormatConfig;
import com.github.vertical_blank.sqlformatter.languages.Dialect;
import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

public class PrettySqlFormat implements MessageFormattingStrategy {

    private static final String NEW_LINE = StringUtils.CR + StringUtils.LF;

    private static final FormatConfig CONFIG = FormatConfig.builder()
                                                           .indent("  ")
                                                           .uppercase(false)
                                                           .linesBetweenQueries(0)
                                                           .maxColumnLength(150)
                                                           .build();

    @Override
    public String formatMessage(final int connectionId, final String now, final long elapsed, final String category, // NOPMD
                                final String prepared, final String sql, final String url) {

        String result = StringUtils.EMPTY;
        if (StringUtils.isNotBlank(sql)) {
            final String formatSql = SqlFormatter.of(Dialect.PostgreSql)
                                                 .format(sql, CONFIG);
            result = "#" + now + " | took " + elapsed + "ms | " + category + " | connection " + connectionId + "| url "
                    + url + NEW_LINE + formatSql + ";";
        }
        return result;
    }
}