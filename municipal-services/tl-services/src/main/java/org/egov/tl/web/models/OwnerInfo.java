package org.egov.tl.web.models;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.*;
import org.egov.common.contract.request.Role;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * OwnerInfo
 */
@ApiModel(description = "A Object holds the details of the Applicant")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OwnerInfo extends User {

        @JsonProperty("documents")
        @Valid
        private List<Document> documents;

        @JsonProperty("userActive")
        private Boolean userActive;

        @Size(max = 300)
        @SafeHtml
        @JsonProperty("applicantNameLocal")
        private String applicantNameLocal = null;

        @Size(max = 10)
        @SafeHtml
        @JsonProperty("careOf")
        private String careOf = null;

        @Size(max = 200)
        @SafeHtml
        @JsonProperty("careOfName")
        private String careOfName = null;

        @Size(max = 150)
        @SafeHtml
        @JsonProperty("designation")
        private String designation = null;

        @Size(max = 200)
        @SafeHtml
        @JsonProperty("houseName")
        private String houseName = null;

        @Size(max = 150)
        @SafeHtml
        @JsonProperty("street")
        private String street = null;

        @Size(max = 150)
        @SafeHtml
        @JsonProperty("locality")
        private String locality = null;

        @Size(max = 150)
        @SafeHtml
        @JsonProperty("postOffice")
        private String postOffice = null;

        @Size(max = 10)
        @SafeHtml
        @JsonProperty("pincode")
        private String pincode = null;

        @Builder
        public OwnerInfo(Long id, String uuid, String userName, String password, String salutation, String name,
                        String gender, String mobileNumber, String emailId, String altContactNumber,
                        String pan, String aadhaarNumber, String permanentAddress, String permanentCity,
                        String permanentPincode, String correspondenceCity, String correspondencePincode,
                        String correspondenceAddress, Boolean active, Long dob, Long pwdExpiryDate,
                        String locale, String type, String signature, Boolean accountLocked,
                        List<Role> roles, String fatherOrHusbandName, String bloodGroup,
                        String identificationMark, String photo, String createdBy, Long createdDate,
                        String lastModifiedBy, Long lastModifiedDate, String otpReference, String tenantId,
                        List<Document> documents, Boolean userActive, String houseName, String street,
                        String locality, String postOffice, String pincode, String designation, String careOf,
                        String careOfName, String applicantNameLocal) {
                super(id, uuid, userName, password, salutation, name, gender, mobileNumber, emailId, altContactNumber,
                                pan, aadhaarNumber, permanentAddress, permanentCity, permanentPincode,
                                correspondenceCity, correspondencePincode, correspondenceAddress, active, dob,
                                pwdExpiryDate, locale, type, signature, accountLocked, roles, fatherOrHusbandName,
                                bloodGroup, identificationMark, photo, createdBy, createdDate, lastModifiedBy,
                                lastModifiedDate, otpReference, tenantId);
                this.documents = documents;
                this.userActive = userActive;
                this.houseName = houseName;
                this.street = street;
                this.locality = locality;
                this.postOffice = postOffice;
                this.pincode = pincode;
                this.designation = designation;
                this.careOf = careOf;
                this.careOfName = careOfName;
                this.applicantNameLocal = applicantNameLocal;
        }

        public OwnerInfo addDocumentsItem(Document documentsItem) {
                if (this.documents == null) {
                        this.documents = new ArrayList<>();
                }
                if (!this.documents.contains(documentsItem))
                        this.documents.add(documentsItem);
                return this;
        }

        /**
         * Populates Owner fields from the given User object
         * 
         * @param user User object obtained from user service
         */
        public void addUserDetail(User user) {
                this.setId(user.getId());
                this.setLastModifiedDate(user.getLastModifiedDate());
                this.setLastModifiedBy(user.getLastModifiedBy());
                this.setCreatedBy(user.getCreatedBy());
                this.setCreatedDate(user.getCreatedDate());
                this.setUserName(user.getUserName());
                this.setPassword(user.getPassword());
                this.setSalutation(user.getSalutation());
                this.setName(user.getName());
                this.setGender(user.getGender());
                this.setMobileNumber(user.getMobileNumber());
                this.setEmailId(user.getEmailId());
                this.setAltContactNumber(user.getAltContactNumber());
                this.setPan(user.getPan());
                this.setAadhaarNumber(user.getAadhaarNumber());
                this.setPermanentAddress(user.getPermanentAddress());
                this.setPermanentCity(user.getPermanentCity());
                this.setPermanentPincode(user.getPermanentPincode());
                this.setCorrespondenceAddress(user.getCorrespondenceAddress());
                this.setCorrespondenceCity(user.getCorrespondenceCity());
                this.setCorrespondencePincode(user.getCorrespondencePincode());
                this.setActive(user.getActive());
                this.setDob(user.getDob());
                this.setPwdExpiryDate(user.getPwdExpiryDate());
                this.setLocale(user.getLocale());
                this.setType(user.getType());
                this.setAccountLocked(user.getAccountLocked());
                this.setRoles(user.getRoles());
                this.setFatherOrHusbandName(user.getFatherOrHusbandName());
                this.setBloodGroup(user.getBloodGroup());
                this.setIdentificationMark(user.getIdentificationMark());
                this.setPhoto(user.getPhoto());
                this.setTenantId(user.getTenantId());
        }

        public OwnerInfo(org.egov.common.contract.request.User user) {
                this.setTenantId(user.getTenantId());
                this.setUserName(user.getUserName());
                this.setId(user.getId());
                this.setName(user.getName());
                this.setType(user.getType());
                this.setMobileNumber(user.getMobileNumber());
                this.setEmailId(user.getEmailId());
                this.setRoles(addRoles(user.getRoles()));
                this.setUuid(user.getUuid());
        }

        public void addCitizenDetail(User user) {
                this.setTenantId(user.getTenantId());
                this.setUserName(user.getUserName());
                this.setId(user.getId());
                this.setName(user.getName());
                this.setType(user.getType());
                this.setMobileNumber(user.getMobileNumber());
                this.setEmailId(user.getEmailId());
                this.setRoles(user.getRoles());
                this.setUuid(user.getUuid());
        }

        private List<Role> addRoles(List<org.egov.common.contract.request.Role> Roles) {
                LinkedList<Role> addroles = new LinkedList<>();
                Roles.forEach(role -> {
                        Role addrole = new Role();
                        addrole.setId(role.getId());
                        addrole.setName(role.getName());
                        addrole.setCode(role.getCode());
                        addroles.add(addrole);
                });
                return addroles;
        }

        /**
         * Populates Owner fields from the given User object
         * 
         * @param user User object obtained from user service
         */
        public void addUserWithoutAuditDetail(OwnerInfo user) {
                this.setUuid(user.getUuid());
                this.setId(user.getId());
                this.setUserName(user.getUserName());
                this.setPassword(user.getPassword());
                this.setSalutation(user.getSalutation());
                this.setName(user.getName());
                this.setGender(user.getGender());
                this.setMobileNumber(user.getMobileNumber());
                this.setEmailId(user.getEmailId());
                this.setAltContactNumber(user.getAltContactNumber());
                this.setPan(user.getPan());
                this.setAadhaarNumber(user.getAadhaarNumber());
                this.setPermanentAddress(user.getPermanentAddress());
                this.setPermanentCity(user.getPermanentCity());
                this.setPermanentPincode(user.getPermanentPincode());
                this.setCorrespondenceAddress(user.getCorrespondenceAddress());
                this.setCorrespondenceCity(user.getCorrespondenceCity());
                this.setCorrespondencePincode(user.getCorrespondencePincode());
                this.setActive(user.getActive());
                this.setDob(user.getDob());
                this.setPwdExpiryDate(user.getPwdExpiryDate());
                this.setLocale(user.getLocale());
                this.setType(user.getType());
                this.setAccountLocked(user.getAccountLocked());
                this.setRoles(user.getRoles());
                this.setFatherOrHusbandName(user.getFatherOrHusbandName());
                this.setBloodGroup(user.getBloodGroup());
                this.setIdentificationMark(user.getIdentificationMark());
                this.setPhoto(user.getPhoto());
                this.setTenantId(user.getTenantId());
        }

        @Override
        public boolean equals(Object o) {
                if (this == o)
                        return true;
                if (o == null || getClass() != o.getClass())
                        return false;
                if (!super.equals(o))
                        return false;

                User user = (User) o;

                return Objects.equals(this.getUuid(), user.getUuid()) &&
                                Objects.equals(this.getName(), user.getName()) &&
                                Objects.equals(this.getMobileNumber(), user.getMobileNumber());
        }

        @Override
        public int hashCode() {

                return super.hashCode();
        }
}
