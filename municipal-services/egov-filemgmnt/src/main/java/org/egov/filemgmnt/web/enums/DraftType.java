package org.egov.filemgmnt.web.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DraftType implements TypeValue {
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

    public boolean isCircular() {
        return this == CIRCULAR;
    }

    public boolean isAffidavit() {
        return this == AFFIDAVIT;
    }

    public boolean isNotice() {
        return this == NOTICE;
    }

    public boolean isMemo() {
        return this == MEMO;
    }

    public boolean isCertificate() {
        return this == CERTIFICATE;
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
