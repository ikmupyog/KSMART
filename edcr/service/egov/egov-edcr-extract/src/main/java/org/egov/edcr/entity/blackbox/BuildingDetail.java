package org.egov.edcr.entity.blackbox;

import java.util.List;

import org.egov.common.entity.edcr.Building;
import org.kabeja.dxf.DXFLine;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BuildingDetail extends Building {
    /**
     *
     */
    private static final long serialVersionUID = 90L;
    
    @JsonIgnore
	private transient List<DXFLine> roofLevel;
    @JsonIgnore
    private transient List<DXFLine> avgGroundLevel;
    
    public BuildingDetail(Building building) {
        super();
    }
    
    public BuildingDetail() {
        // Invariant
    }

    
    public List<DXFLine> getRoofLevel() {
        return roofLevel;
    }

    public void setRoofLevel(List<DXFLine> roofLevel) {
        this.roofLevel = roofLevel;
    }

    public List<DXFLine> getAvgGroundLevel() {
        return avgGroundLevel;
    }

    public void setAvgGroundLevel(List<DXFLine> avgGroundLevel) {
        this.avgGroundLevel = avgGroundLevel;
    }

}
