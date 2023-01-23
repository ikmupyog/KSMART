package org.egov.filemgmnt.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FMUserType {
    CITIZEN("CITIZEN", "Citizen"),
    EMPLOYEE("EMPLOYEE", "Employee");

    private String code;
    private String name;

    public boolean isCitizen() {
        return this == CITIZEN;
    }

    public boolean isEmployee() {
        return this == EMPLOYEE;
    }

//    @JsonCreator
//    public static FMUserType fromValue(final String value) {
//        return Arrays.stream(FMUserType.values())
//                     .filter(ty -> String.valueOf(ty)
//                                         .equalsIgnoreCase(value))
//                     .findFirst()
//                     .orElse(null);
//    }
}
