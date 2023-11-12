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

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class SanityDetails implements Serializable {
    private static final long serialVersionUID = 9L;
    // Water closets
    private List<Measurement> maleWaterClosets = new ArrayList<>();
    private List<Measurement> femaleWaterClosets = new ArrayList<>();
    private List<Measurement> commonWaterClosets = new ArrayList<>();
    private List<Measurement> maleVisitorsWaterClosets = new ArrayList<>();
    private List<Measurement> femaleVisitorsWaterClosets = new ArrayList<>();
    private List<Measurement> maleOrFemaleVisitorsWaterClosets = new ArrayList<>();

    //urinals
    //private List<Measurement> urinals = new ArrayList<>();
    private List<Measurement> maleUrinals = new ArrayList<>();
    private List<Measurement> maleVisitorUrinals = new ArrayList<>();
    private List<Measurement> commonUrinals = new ArrayList<>();
    private List<Measurement> maleOrFemaleVisitorsUrinals = new ArrayList<>();
    
// Exclusive for Bath and Shower
    private List<Measurement> maleBathRooms = new ArrayList<>();
    private List<Measurement> femaleBathRooms = new ArrayList<>();
    private List<Measurement> commonBathRooms = new ArrayList<>();
    // Room + Bath + Water Closet
    private List<Measurement> maleRoomsWithWaterCloset = new ArrayList<>();
    private List<Measurement> femaleRoomsWithWaterCloset = new ArrayList<>();
    private List<Measurement> commonRoomsWithWaterCloset = new ArrayList<>();

    private List<Measurement> drinkingWater = new ArrayList<>();

    private List<Measurement> totalSpecialWC = new ArrayList<>();
    private List<Occupancy> parkingArea = new ArrayList<>();
    
    private int totalSPWC = 0;
    private int totalwashBasins = 0;
    private int totalVisitorSPWC=0;
    public void addParkingArea(Occupancy occupancy) {
        if (parkingArea == null) {
        	parkingArea = new ArrayList<>();
        	parkingArea.add(occupancy);
        } else if (parkingArea.contains(occupancy)) {
        	parkingArea.get(parkingArea.indexOf(occupancy))
                    .setBuiltUpArea((parkingArea.get(parkingArea.indexOf(occupancy)).getBuiltUpArea() == null
                            ? BigDecimal.ZERO
                            : parkingArea.get(parkingArea.indexOf(occupancy)).getBuiltUpArea())
                                    .add(occupancy.getBuiltUpArea()));
        	parkingArea.get(parkingArea.indexOf(occupancy)).setExistingBuiltUpArea(
                    (parkingArea.get(parkingArea.indexOf(occupancy)).getExistingBuiltUpArea() == null ? BigDecimal.ZERO
                            : parkingArea.get(parkingArea.indexOf(occupancy)).getExistingBuiltUpArea())
                                    .add(occupancy.getExistingBuiltUpArea()));

        } else
        	parkingArea.add(occupancy);

    }
    
    public int getTotalVisitorSPWC() {
		return totalVisitorSPWC;
	}

	public void setTotalVisitorSPWC(int totalVisitorSPWC) {
		this.totalVisitorSPWC = totalVisitorSPWC;
	}

	public List<Measurement> getMaleWaterClosets() {
        return maleWaterClosets;
    }

    public void setMaleWaterClosets(List<Measurement> maleWaterClosets) {
        this.maleWaterClosets = maleWaterClosets;
    }

    public List<Measurement> getFemaleWaterClosets() {
        return femaleWaterClosets;
    }

    public void setFemaleWaterClosets(List<Measurement> femaleWaterClosets) {
        this.femaleWaterClosets = femaleWaterClosets;
    }
/*
    public List<Measurement> getUrinals() {
        return urinals;
    }

    public void setUrinals(List<Measurement> urinals) {
        this.urinals = urinals;
    }*/

    public List<Measurement> getMaleBathRooms() {
        return maleBathRooms;
    }

    public List<Measurement> getMaleUrinals() {
		return maleUrinals;
	}
	public void setMaleUrinals(List<Measurement> maleUrinals) {
		this.maleUrinals = maleUrinals;
	}
	public List<Measurement> getMaleVisitorUrinals() {
		return maleVisitorUrinals;
	}
	public void setMaleVisitorUrinals(List<Measurement> maleVisitorUrinals) {
		this.maleVisitorUrinals = maleVisitorUrinals;
	}
	public void setMaleBathRooms(List<Measurement> maleBathRooms) {
        this.maleBathRooms = maleBathRooms;
    }

    public List<Measurement> getFemaleBathRooms() {
        return femaleBathRooms;
    }

    public void setFemaleBathRooms(List<Measurement> femaleBathRooms) {
        this.femaleBathRooms = femaleBathRooms;
    }

    public List<Measurement> getMaleRoomsWithWaterCloset() {
        return maleRoomsWithWaterCloset;
    }

    public void setMaleRoomsWithWaterCloset(List<Measurement> maleRoomsWithWaterCloset) {
        this.maleRoomsWithWaterCloset = maleRoomsWithWaterCloset;
    }

    public List<Measurement> getFemaleRoomsWithWaterCloset() {
        return femaleRoomsWithWaterCloset;
    }

    public void setFemaleRoomsWithWaterCloset(List<Measurement> femaleRoomsWithWaterCloset) {
        this.femaleRoomsWithWaterCloset = femaleRoomsWithWaterCloset;
    }

    public List<Measurement> getDrinkingWater() {
        return drinkingWater;
    }

    public void setDrinkingWater(List<Measurement> drinkingWater) {
        this.drinkingWater = drinkingWater;
    }

    public List<Measurement> getTotalSpecialWC() {
        return totalSpecialWC;
    }

    public void setTotalSpecialWC(List<Measurement> totalSpecialWC) {
        this.totalSpecialWC = totalSpecialWC;
    }

    public List<Measurement> getCommonWaterClosets() {
        return commonWaterClosets;
    }

    public void setCommonWaterClosets(List<Measurement> commonWaterClosets) {
        this.commonWaterClosets = commonWaterClosets;
    }

    public List<Measurement> getMaleVisitorsWaterClosets() {
		return maleVisitorsWaterClosets;
	}

	public void setMaleVisitorsWaterClosets(List<Measurement> maleVisitorsWaterClosets) {
		this.maleVisitorsWaterClosets = maleVisitorsWaterClosets;
	}

	public List<Measurement> getFemaleVisitorsWaterClosets() {
		return femaleVisitorsWaterClosets;
	}

	public void setFemaleVisitorsWaterClosets(List<Measurement> femaleVisitorsWaterClosets) {
		this.femaleVisitorsWaterClosets = femaleVisitorsWaterClosets;
	}

	public int getTotalSPWC() {
        return totalSPWC;
    }

    public void setTotalSPWC(int totalSPWC) {
        this.totalSPWC = totalSPWC;
    }

    public int getTotalwashBasins() {
        return totalwashBasins;
    }

    public void setTotalwashBasins(int totalwashBasins) {
        this.totalwashBasins = totalwashBasins;
    }

    public List<Measurement> getCommonBathRooms() {
        return commonBathRooms;
    }

    public List<Measurement> getCommonRoomsWithWaterCloset() {
        return commonRoomsWithWaterCloset;
    }

    public void setCommonBathRooms(List<Measurement> commonBathRooms) {
        this.commonBathRooms = commonBathRooms;
    }

    public void setCommonRoomsWithWaterCloset(List<Measurement> commonRoomsWithWaterCloset) {
        this.commonRoomsWithWaterCloset = commonRoomsWithWaterCloset;
    }

	public List<Occupancy> getParkingArea() {
		return parkingArea;
	}

	public void setParkingArea(List<Occupancy> parkingArea) {
		this.parkingArea = parkingArea;
	}
	public List<Measurement> getMaleOrFemaleVisitorsWaterClosets() {
		return maleOrFemaleVisitorsWaterClosets;
	}
	public void setMaleOrFemaleVisitorsWaterClosets(List<Measurement> maleOrFemaleVisitorsWaterClosets) {
		this.maleOrFemaleVisitorsWaterClosets = maleOrFemaleVisitorsWaterClosets;
	}
	public List<Measurement> getMaleOrFemaleVisitorsUrinals() {
		return maleOrFemaleVisitorsUrinals;
	}
	public void setMaleOrFemaleVisitorsUrinals(List<Measurement> maleOrFemaleVisitorsUrinals) {
		this.maleOrFemaleVisitorsUrinals = maleOrFemaleVisitorsUrinals;
	}
	public List<Measurement> getCommonUrinals() {
		return commonUrinals;
	}
	public void setCommonUrinals(List<Measurement> commonUrinals) {
		this.commonUrinals = commonUrinals;
	}
    
}