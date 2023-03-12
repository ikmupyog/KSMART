package org.egov.common.entity.edcr;

import java.math.BigDecimal;

/**
 * @author vinoth
 *
 * Inside building declared parking area occupancy wise will be captured
 */
public class ParkingArea {


    private static final long serialVersionUID = 90L;
    private OccupancyTypeHelper occupancyType;
    private BigDecimal parkingArea;
    private BigDecimal existParkingArea;

    public OccupancyTypeHelper getOccupancyType() {
		return occupancyType;
	}

	public void setOccupancyType(OccupancyTypeHelper occupancyType) {
		this.occupancyType = occupancyType;
	}

	public BigDecimal getParkingArea() {
        return parkingArea;
    }

    public void setParkingArea(BigDecimal parkingArea) {
        this.parkingArea = parkingArea;
    }

    public BigDecimal getExistParkingArea() {
        return existParkingArea;
    }

    public void setExistParkingArea(BigDecimal existParkingArea) {
        this.existParkingArea = existParkingArea;
    }


}
