package org.egov.tl.web.models;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.egov.tl.web.models.Accessory;
import org.egov.tl.web.models.Address;
import org.egov.tl.web.models.AuditDetails;
import org.egov.tl.web.models.Document;
import org.egov.tl.web.models.OwnerInfo;
import org.egov.tl.web.models.TradeUnit;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the basic data for a Trade License")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-09-18T17:06:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TradeLicenseDetail {

  @JsonProperty("id")
  @SafeHtml
  @Size(max = 64)
  private String id;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("ownershipCategory")
  private String ownershipCategory = null;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("structureType")
  private String structureType;

  @JsonProperty("noOfEmployees")
  private Integer noOfEmployees;

  @NotNull
  @JsonProperty("owners")
  @Valid
  private List<OwnerInfo> owners = new ArrayList<>();

  /**
   * License can be created from different channels
   */
  public enum ChannelEnum {
    COUNTER("COUNTER"),

    CITIZEN("CITIZEN"),

    DATAENTRY("DATAENTRY"),

    PDE("PDE");

    private String value;

    ChannelEnum(String value) {
      this.value = value;
    }

    @Override
    @JsonValue
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static ChannelEnum fromValue(String text) {
      for (ChannelEnum b : ChannelEnum.values()) {
        if (String.valueOf(b.value).equals(text)) {
          return b;
        }
      }
      return null;
    }
  }

  @JsonProperty("channel")
  private ChannelEnum channel = null;

  @NotNull
  @Valid
  @JsonProperty("address")
  private Address address = null;

  @NotNull
  @JsonProperty("tradeUnits")
  @Valid
  private List<TradeUnit> tradeUnits = new ArrayList<>();

  @JsonProperty("applicationDocuments")
  @Valid
  private List<Document> applicationDocuments = null;

  @JsonProperty("verificationDocuments")
  @Valid
  private List<Document> verificationDocuments = null;

  @Valid
  @JsonProperty("institution")
  private Institution institution = null;

  @JsonProperty("structurePlace")
  @Valid
  private List<StructurePlace> structurePlace = new ArrayList<>();

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("businessSector")
  private String businessSector;

  @JsonProperty("capitalInvestment")
  private Double capitalInvestment;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("enterpriseType")
  private String enterpriseType;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("structurePlaceSubtype")
  private String structurePlaceSubtype;

  @Size(max = 1024)
  @SafeHtml
  @JsonProperty("businessActivityDesc")
  private String businessActivityDesc = null;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("licenseeType")
  private String licenseeType;

  @JsonProperty("auditDetails")
  private AuditDetails auditDetails = null;

  @JsonProperty("ownersPde")
  @Valid
  private List<OwnerPde> ownersPde = new ArrayList<>();

  @JsonProperty("taxPde")
  @Valid
  private List<TaxPde> taxPde = new ArrayList<>();

  List<TaxPde> taxPdefinal = new ArrayList<>();

  @JsonProperty("establishmentUnit")
  private EstablishmentUnit establishmentUnit;

  @Size(max = 64)
  @SafeHtml
  @JsonProperty("establishmentUnitId")
  private String establishmentUnitId = null;

  @JsonProperty("ownerspremise")
  @Valid
  private List<OwnerPremise> ownerspremise = new ArrayList<>();

  public TradeLicenseDetail addOwnersItem(OwnerInfo ownersItem) {
    if (this.owners == null)
      this.owners = new ArrayList<>();
    if (!this.owners.contains(ownersItem))
      this.owners.add(ownersItem);
    return this;
  }

  public TradeLicenseDetail addTradeUnitsItem(TradeUnit tradeUnitsItem) {
    if (this.tradeUnits == null)
      this.tradeUnits = new ArrayList<>();
    if (!this.tradeUnits.contains(tradeUnitsItem))
      this.tradeUnits.add(tradeUnitsItem);
    return this;
  }

  public TradeLicenseDetail addApplicationDocumentsItem(Document applicationDocumentsItem) {
    if (this.applicationDocuments == null) {
      this.applicationDocuments = new ArrayList<>();
    }
    if (!this.applicationDocuments.contains(applicationDocumentsItem))
      this.applicationDocuments.add(applicationDocumentsItem);
    return this;
  }

  public TradeLicenseDetail addVerificationDocumentsItem(Document verificationDocumentsItem) {
    if (this.verificationDocuments == null) {
      this.verificationDocuments = new ArrayList<>();
    }
    if (!this.verificationDocuments.contains(verificationDocumentsItem))
      this.verificationDocuments.add(verificationDocumentsItem);
    return this;
  }

  public TradeLicenseDetail addStructurePlaceItem(StructurePlace structureplaceItem) {
    if (this.structurePlace == null)
      this.structurePlace = new ArrayList<>();
    if (!this.structurePlace.contains(structureplaceItem))
      this.structurePlace.add(structureplaceItem);
    return this;
  }

  public TradeLicenseDetail addTaxPdeItem(TaxPde taxPdeItem) {
    if (this.taxPde == null)
      this.taxPde = new ArrayList<>();
    if (!this.taxPde.contains(taxPdeItem))
      this.taxPde.add(taxPdeItem);
    return this;
  }

  public TradeLicenseDetail addOwnersPdeItem(OwnerPde ownerPdeItem) {
    if (this.ownersPde == null)
      this.ownersPde = new ArrayList<>();
    if (!this.ownersPde.contains(ownerPdeItem))
      this.ownersPde.add(ownerPdeItem);
    return this;
  }

}
