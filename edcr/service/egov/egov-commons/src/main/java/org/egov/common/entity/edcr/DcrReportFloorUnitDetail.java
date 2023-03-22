package org.egov.common.entity.edcr;

import java.math.BigDecimal;

public class DcrReportFloorUnitDetail {

    private String description;

    private String floorNo;

    private String occupancy;

    private BigDecimal units = BigDecimal.ZERO;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(String floorNo) {
        this.floorNo = floorNo;
    }

    public String getOccupancy() {
        return occupancy;
    }

    public void setOccupancy(String occupancy) {
        this.occupancy = occupancy;
    }

    public BigDecimal getUnits() {
        return units;
    }

    public void setUnits(BigDecimal units) {
        this.units = units;
    }

}
