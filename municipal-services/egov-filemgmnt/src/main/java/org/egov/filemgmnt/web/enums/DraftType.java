package org.egov.filemgmnt.web.enums;

import java.util.Arrays;

import org.apache.commons.codec.binary.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DraftType {
    CIRCULAR("1"),
    AFFIDAVIT("2"),
    NOTICE("3"),
    MEMO("4"),
    CERTIFICATE("5");

    private String value;

    @Override
    @JsonValue
    public String toString() {
        return String.valueOf(value);
    }

    public static boolean isCircular(final String type) {
        return StringUtils.equals(type, CIRCULAR.getValue());
    }

    public static boolean isAffidavit(final String type) {
        return StringUtils.equals(type, AFFIDAVIT.getValue());
    }

    public static boolean isNotice(final String type) {
        return StringUtils.equals(type, NOTICE.getValue());
    }

    public static boolean isMemo(final String type) {
        return StringUtils.equals(type, MEMO.getValue());
    }

    public static boolean isCertificate(final String type) {
        return StringUtils.equals(type, CERTIFICATE.getValue());
    }

    @JsonCreator
    public static DraftType fromValue(final String value) {
        return Arrays.stream(DraftType.values())
                     .filter(ty -> String.valueOf(ty)
                                         .equalsIgnoreCase(value))
                     .findFirst()
                     .orElse(null);
    }
}
