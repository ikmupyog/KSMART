package org.egov.common.entity.edcr;

import java.math.BigDecimal;

public class ReportOccupancyFloorUnit {

    private String occupancy;

    private BigDecimal unitCount = BigDecimal.ZERO;

    public void setOccupancy(String occupancy) {
        this.occupancy = occupancy;
    }

    public String getOccupancy() {
        return occupancy;
    }

    public void setUnitCount(BigDecimal unitCount) {
        this.unitCount = unitCount;
    }

    public BigDecimal getUnitCount() {
        return unitCount;
    }
}
