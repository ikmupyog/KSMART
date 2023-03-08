package org.egov.edcr.entity.blackbox;

import org.egov.common.entity.edcr.FloorUnit;
import org.kabeja.dxf.DXFLWPolyline;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FloorUnitDetail extends FloorUnit {
    /**
     *
     */
    private static final long serialVersionUID = 70L;
    @JsonIgnore
    private transient DXFLWPolyline polyLine;
    
	public DXFLWPolyline getPolyLine() {
		return polyLine;
	}
	public void setPolyLine(DXFLWPolyline polyLine) {
		this.polyLine = polyLine;
	}
	
}
