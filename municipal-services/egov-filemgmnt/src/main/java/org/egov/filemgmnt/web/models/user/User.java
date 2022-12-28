package org.egov.filemgmnt.web.models.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.egov.common.contract.request.Role;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {

    @JsonProperty("id")
    private Long id;

    @Size(max = 64)
    @JsonProperty("uuid")
    private String uuid;

//    @Size(max = 64)
//    @JsonProperty("userName")
//    private String userName;
//
//    @Size(max = 64)
//    @JsonProperty("password")
//    private String password;
//
    @JsonProperty("title")
    private String title;

    @NotNull
    @Size(max = 100)
    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("gender")
    private String gender;

    @NotNull
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    @JsonProperty("mobileNo")
    private String mobileNo;

    @Size(max = 128)
    @JsonProperty("email")
    @Pattern(regexp = "^$|^(?=^.{1,64}$)((([^<>()\\[\\]\\\\.,;:\\s$*@'\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@'\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))$",
             message = "Invalid emailId")
    private String email;

    @Pattern(regexp = "^[0-9]{12}$", message = "AdharNumber should be 12 digit number")
    @JsonProperty("aadhaarNo")
    private String aadhaarNo;

    @Size(max = 300)
    @JsonProperty("permanentAddress")
    private String permanentAddress;

    @Size(max = 300)
    @JsonProperty("mainPlace")
    private String mainPlace;

    @Size(max = 10)
    @JsonProperty("pincode")
    private String pincode;

    @JsonProperty("active")
    private Boolean active;

    @JsonProperty("dateOfBirth")
    private Long dateOfBirth;

//
//    @Size(max = 16)
//    @JsonProperty("locale")
//    private String locale;
//
//    @Size(max = 50)
//    @JsonProperty("type")
//    private String type;
//
//    @JsonProperty("signature")
//    private String signature;
//
//    @JsonProperty("accountLocked")
//    private Boolean accountLocked;

    @JsonProperty("roles")
    @Valid
    private List<Role> roles;

    @Size(max = 64)
    @JsonProperty("createdBy")
    private String createdBy;

    @JsonProperty("createdDate")
    private Long createdDate;

    @Size(max = 64)
    @JsonProperty("lastModifiedBy")
    private String lastModifiedBy;

    @JsonProperty("lastModifiedDate")
    private Long lastModifiedDate;

    @Size(max = 256)
    @JsonProperty("tenantId")
    private String tenantId;

    public User addRolesItem(Role rolesItem) {
        if (this.roles == null) {
            this.roles = new ArrayList<>();
        }
        this.roles.add(rolesItem);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return Objects.equals(uuid, user.uuid) && Objects.equals(firstName, user.firstName)
                && Objects.equals(mobileNo, user.mobileNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, firstName, mobileNo);
    }

}
