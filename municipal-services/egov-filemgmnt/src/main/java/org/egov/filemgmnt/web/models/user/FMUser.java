package org.egov.filemgmnt.web.models.user;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.egov.common.contract.request.Role;
import org.egov.filemgmnt.web.enums.FMUserType;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class FMUser {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("userName")
    private String userName;

    @JsonProperty("salutation")
    private String salutation;

    @JsonProperty("name")
    private String name;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("mobileNumber")
    private String mobileNumber;

    @JsonProperty("alternatemobilenumber")
    private String alternatemobilenumber;

    @JsonProperty("emailId")
    private String emailId;

    @JsonProperty("altContactNumber")
    private String altContactNumber;

    @JsonProperty("pan")
    private String pan;

    @JsonProperty("aadhaarNumber")
    private String aadhaarNumber;

    @JsonProperty("permanentAddress")
    private String permanentAddress;

    @JsonProperty("permanentCity")
    private String permanentCity;

    @JsonProperty("permanentPinCode")
    private String permanentPinCode;

    @JsonProperty("correspondenceAddress")
    private String correspondenceAddress;

    @JsonProperty("correspondenceCity")
    private String correspondenceCity;

    @JsonProperty("correspondencePinCode")

    private String correspondencePinCode;

    @JsonProperty("active")
    private Boolean active;

    @Builder.Default
    @JsonProperty("locale")
    private String locale = "en_IN";

    @JsonProperty("type")
    private FMUserType type;

    @JsonProperty("accountLocked")
    private Boolean accountLocked;

    @JsonProperty("accountLockedDate")
    private Long accountLockedDate;

    @JsonProperty("fatherOrHusbandName")
    private String fatherOrHusbandName;

    @JsonProperty("relationship")
    private String relationship;

    @JsonProperty("signature")
    private String signature;

    @JsonProperty("bloodGroup")
    private String bloodGroup;

    @JsonProperty("photo")
    private String photo;

    @JsonProperty("identificationMark")
    private String identificationMark;

    @JsonProperty("createdBy")
    private Long createdBy;

    @JsonProperty("password")
    private String password;

    @JsonProperty("otpReference")
    private String otpReference;

    @JsonProperty("lastModifiedBy")
    private Long lastModifiedBy;

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("roles")
    private Set<Role> roles;

    @JsonProperty("uuid")
    private String uuid;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonProperty("createdDate")
    private java.util.Date createdDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonProperty("lastModifiedDate")
    private java.util.Date lastModifiedDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("dob")
    private java.util.Date dob;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonProperty("pwdExpiryDate")
    private java.util.Date pwdExpiryDate;

    public FMUser addRole(final Role role) {
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }
        this.roles.add(role);
        return this;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        final FMUser user = (FMUser) o;
        return Objects.equals(uuid, user.uuid) && Objects.equals(name, user.getName())
                && Objects.equals(mobileNumber, user.getMobileNumber());
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, name, mobileNumber);
    }

}
