package org.ksmart.death.deathregistry.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathRegistryFamilyInfo {


    @JsonProperty("SpouseUnavailable")
    private Boolean spouseUnavailable ;

    @JsonProperty("SpouseType")
    private String spouseType ;

    @JsonProperty("SpouseNameEn")
    private String spouseNameEn ;

    @JsonProperty("SpouseNameML")
    private String spouseNameML ;

    @JsonProperty("FatherUnavailable")
    private Boolean fatherUnavailable ;

    @JsonProperty("FatherNameEn")
    private String fatherNameEn ;

    @JsonProperty("FatherNameMl")
    private String fatherNameMl ;

    @JsonProperty("MotherUnavailable")
    private Boolean motherUnavailable;
    
    @JsonProperty("MotherNameEn")
    private String motherNameEn;
    
    
    @JsonProperty("MotherNameMl")
    private String motherNameMl;
    
    
    @JsonProperty("FamilyMobileNo")
    private Long familyMobileNo;
    
    @JsonProperty("FamilyEmailId")
    private String familyEmailId;

    @Size(max = 12)
    @JsonProperty("SpouseAadhaar")
    private String spouseAadhaar;
    
    @Size(max = 12)
    @JsonProperty("FatherAadharNo")
    private String fatherAadharNo;

    @Size(max = 12)
    @JsonProperty("MotherAadharNo")
    private String motherAadharNo;

    private String spouseName;

    private String motherName;

    private String fatherName;

    @JsonProperty("spouseAgeIfAlive")
    private String spouseAgeIfAlive;

    @JsonProperty("spouseAge")
    private Integer spouseAge;
      
}
