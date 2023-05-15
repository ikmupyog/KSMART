package org.ksmart.death.deathapplication.web.models;
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
public class DeathFamilyInfo {


    @JsonProperty("SpouseUnavailable")
    private boolean spouseUnavailable ;

    @JsonProperty("SpouseType")
    private String spouseType ;

    @JsonProperty("SpouseNameEn")
    private String spouseNameEn ;

    @JsonProperty("SpouseNameML")
    private String spouseNameML ;

    @JsonProperty("FatherUnavailable")
    private boolean fatherUnavailable ;

    @JsonProperty("FatherNameEn")
    private String fatherNameEn ;

    @JsonProperty("FatherNameMl")
    private String fatherNameMl ;

    @JsonProperty("MotherUnavailable")
    private boolean motherUnavailable;
    
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

    @JsonProperty("spouseAgeIfAlive")
    private String spouseAgeIfAlive;

    @JsonProperty("spouseAge")
    private Integer spouseAge;
    
}
