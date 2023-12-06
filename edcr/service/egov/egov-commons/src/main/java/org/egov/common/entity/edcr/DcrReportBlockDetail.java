/*
 * eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 * accountability and the service delivery of the government  organizations.
 *
 *  Copyright (C) <2019>  eGovernments Foundation
 *
 *  The updated version of eGov suite of products as by eGovernments Foundation
 *  is available at http://www.egovernments.org
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see http://www.gnu.org/licenses/ or
 *  http://www.gnu.org/licenses/gpl.html .
 *
 *  In addition to the terms of the GPL license to be adhered to in using this
 *  program, the following additional terms are to be complied with:
 *
 *      1) All versions of this program, verbatim or modified must carry this
 *         Legal Notice.
 *      Further, all user interfaces, including but not limited to citizen facing interfaces,
 *         Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *         derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *      For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *      For any further queries on attribution, including queries on brand guidelines,
 *         please contact contact@egovernments.org
 *
 *      2) Any misrepresentation of the origin of the material is prohibited. It
 *         is required that all modified versions of this material be marked in
 *         reasonable ways as different from the original version.
 *
 *      3) This license does not grant any rights to any user of the program
 *         with regards to rights under trademark law for use of the trade names
 *         or trademarks of eGovernments Foundation.
 *
 *  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.common.entity.edcr;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DcrReportBlockDetail {

    private String blockNo;

    private BigDecimal coverageArea;

    private BigDecimal buildingHeight;

    private List<DcrReportFloorDetail> dcrReportFloorDetails;

    private BigDecimal constructedArea = BigDecimal.ZERO;
    
	private BigDecimal totalUnits = BigDecimal.ZERO;

	private BigDecimal unitsWithAttachBath = BigDecimal.ZERO;

	private BigDecimal unitsWithoutAttachBath = BigDecimal.ZERO;

	private BigDecimal unitsWithDinningRoom = BigDecimal.ZERO;

	private BigDecimal totalBuiltUpArea=BigDecimal.ZERO;
					   

	private BigDecimal totalFloorArea=BigDecimal.ZERO;;

	private BigDecimal totalCoveredArea=BigDecimal.ZERO;;

	
	// Occupancy, unitDesc, unitCount
	private Map<String, Map<String, Integer>> units = new ConcurrentHashMap<>();
	
	private List<DcrReportFloorUnitDetail> dcrReportFloorUnitDetails = new LinkedList<>();
	
    
    public String getBlockNo() {
        return blockNo;
    }

    public void setBlockNo(String blockNo) {
        this.blockNo = blockNo;
    }

    public BigDecimal getCoverageArea() {
        return coverageArea;
    }

    public BigDecimal getBuildingHeight() {
        return buildingHeight;
    }

    public void setBuildingHeight(BigDecimal buildingHeight) {
        this.buildingHeight = buildingHeight;
    }

    public void setCoverageArea(BigDecimal coverageArea) {
        this.coverageArea = coverageArea;
    }

    public List<DcrReportFloorDetail> getDcrReportFloorDetails() {
        return dcrReportFloorDetails;
    }

    public void setDcrReportFloorDetails(List<DcrReportFloorDetail> dcrReportFloorDetails) {
        this.dcrReportFloorDetails = dcrReportFloorDetails;
    }

    public BigDecimal getConstructedArea() {
        return constructedArea;
    }

    public void setConstructedArea(BigDecimal constructedArea) {
        this.constructedArea = constructedArea;
    }

	public BigDecimal getTotalUnits() {
		return totalUnits;
	}

	public void setTotalUnits(BigDecimal totalUnits) {
		this.totalUnits = totalUnits;
	}

	public BigDecimal getUnitsWithAttachBath() {
		return unitsWithAttachBath;
	}

	public void setUnitsWithAttachBath(BigDecimal unitsWithAttachBath) {
		this.unitsWithAttachBath = unitsWithAttachBath;
	}

	public BigDecimal getUnitsWithoutAttachBath() {
		return unitsWithoutAttachBath;
	}

	public void setUnitsWithoutAttachBath(BigDecimal unitsWithoutAttachBath) {
		this.unitsWithoutAttachBath = unitsWithoutAttachBath;
	}

	public BigDecimal getUnitsWithDinningRoom() {
		return unitsWithDinningRoom;
	}

	public void setUnitsWithDinningRoom(BigDecimal unitsWithDinningRoom) {
		this.unitsWithDinningRoom = unitsWithDinningRoom;
	}

	public Map<String, Map<String, Integer>> getUnits() {
		return units;
	}

	public void setUnits(Map<String, Map<String, Integer>> units) {
		this.units = units;
	}

	public List<DcrReportFloorUnitDetail> getDcrReportFloorUnitDetails() {
		return dcrReportFloorUnitDetails;
	}

	public void setDcrReportFloorUnitDetails(List<DcrReportFloorUnitDetail> dcrReportFloorUnitDetails) {
		this.dcrReportFloorUnitDetails = dcrReportFloorUnitDetails;
	}

	public BigDecimal getTotalBuiltUpArea() {
		return totalBuiltUpArea;
	}

	public void setTotalBuiltUpArea(BigDecimal totalBuiltUpArea) {
		this.totalBuiltUpArea = totalBuiltUpArea;
	}

	public BigDecimal getTotalFloorArea() {
		return totalFloorArea;
	}

	public void setTotalFloorArea(BigDecimal totalFloorArea) {
		this.totalFloorArea = totalFloorArea;
	}

	public BigDecimal getTotalCoveredArea() {
		return totalCoveredArea;
	}

	public void setTotalCoveredArea(BigDecimal totalCoveredArea) {
		this.totalCoveredArea = totalCoveredArea;
	}

	
    
}
