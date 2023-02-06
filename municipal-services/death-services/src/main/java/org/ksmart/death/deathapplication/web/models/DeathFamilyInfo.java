package org.ksmart.death.deathapplication.web.models;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.Size;
// import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

/*
     * Creates main model class  
     * Jasmine on 6.02.2023      
*/

@Schema(name = "Death Registration Request", description = "An Object holds the  data for death registration ")
@Validated
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathFamilyInfo {

    @Size(max = 64)
    @JsonProperty("SpouseUnavailable")
    private String spouseUnavailable ;

    @JsonProperty("SpouseType")
    private String spouseType ;

    @JsonProperty("SpouseNameEn")
    private String spouseNameEn ;

    @JsonProperty("SpouseNameML")
    private String spouseNameML ;

    @JsonProperty("FatherUnavailable")
    private String fatherUnavailable ;

    @JsonProperty("FatherNameEn")
    private String fatherNameEn ;

    @JsonProperty("FatherNameMl")
    private String fatherNameMl ;

    @JsonProperty("MotherUnavailable")
    private String motherUnavailable;
    
    @JsonProperty("MotherNameEn")
    private String motherNameEn;
    
    
    @JsonProperty("MotherNameMl")
    private String motherNameMl;
    
    
    @JsonProperty("FamilyMobileNo")
    private String familyMobileNo;
    
    @JsonProperty("FamilyEmailId")
    private String familyEmailId;
    
    
    
}
