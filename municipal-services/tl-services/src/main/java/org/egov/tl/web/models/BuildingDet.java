package org.egov.tl.web.models;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuildingDet {
    private int lbId;
    private String buildingId;
    private String wardYear;
    private String wardId;
    private String zoneId;
    private int doorNo;
    private String doorNoSub;
    // private int buildingCategoryId;
    // private String buildingCategory;
    private int buildingFunctionId;
    private String buildingfunction;
    private List<BuildingOwner> buildingOwner;
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo = null;
}
