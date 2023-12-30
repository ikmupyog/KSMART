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

package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Lift;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class LiftService extends FeatureProcess {

    private static final String SUBRULE_48_DESC = "Minimum number of lifts for block %s";
    private static final String SUBRULE_48 = "48";
    private static final String REMARKS = "Remarks";
    private static final String SUBRULE_48_DESCRIPTION = "Minimum number of lifts";
    private static final String SUBRULE_40A_3 = "40A(3)";
    private static final String SUBRULE_118 = "118";
    private static final String SUBRULE_118_DESCRIPTION = "Minimum dimension Of lift %s on floor %s";
    private static final String SUBRULE_118_DESC = "Minimum dimension Of lift";
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

    @Override
    public Plan validate(Plan pl) {
        for (Block block : pl.getBlocks()) {
            if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
                for (Floor floor : block.getBuilding().getFloors()) {
                	if(!floor.getTerrace()) {
                    List<Lift> lifts = floor.getLifts();
                    if (lifts != null && !lifts.isEmpty()) {
                        for (Lift lift : lifts) {
                            List<Measurement> liftPolyLines = lift.getLifts();
                            if (liftPolyLines != null && !liftPolyLines.isEmpty()) {
                                validateDimensions(pl, block.getNumber(), floor.getNumber(), lift.getNumber().toString(), liftPolyLines);
                            }
                          }
                        }
                    }
                }
            }
        }
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        if (pl != null && !pl.getBlocks().isEmpty()) {
            blk:
            for (Block block : pl.getBlocks()) {
                scrutinyDetail = new ScrutinyDetail();
                scrutinyDetail.addColumnHeading(1, RULE_NO);
                scrutinyDetail.addColumnHeading(2, DESCRIPTION);
                scrutinyDetail.addColumnHeading(3, REQUIRED);
                scrutinyDetail.addColumnHeading(4, PROVIDED);
                scrutinyDetail.addColumnHeading(5, STATUS);
                scrutinyDetail.addColumnHeading(6, REMARKS);
                scrutinyDetail.setKey("Block_" + block.getNumber() + "_" + "Lift - Minimum Required");

                ScrutinyDetail scrutinyDetail1 = new ScrutinyDetail();
                scrutinyDetail1.addColumnHeading(1, RULE_NO);
                scrutinyDetail1.addColumnHeading(2, DESCRIPTION);
                scrutinyDetail1.addColumnHeading(3, REQUIRED);
                scrutinyDetail1.addColumnHeading(4, PROVIDED);
                scrutinyDetail1.addColumnHeading(5, STATUS);
                scrutinyDetail1.addColumnHeading(6, REMARKS);
                scrutinyDetail1.setKey("Block_" + block.getNumber() + "_" + "Lift - Minimum Dimension");

                if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
                    if (block.getSingleOrDualFamilyBuilding()) {
                        continue blk;
                    }
                    List<OccupancyTypeHelper> occupancyTypes = block.getBuilding().getOccupancies().stream().map(occupancy -> occupancy.getTypeHelper()).collect(Collectors.toList());
                    List<String> occupancyTypeList = occupancyTypes.stream().map(occ -> occ.getType().getCode()).collect(Collectors.toList());
                    BigDecimal noOfLiftsRqrd;
                    if ((occupancyTypeList.contains(C) ||
                            occupancyTypeList.contains(C1) || occupancyTypeList.contains(C2) ||
                            occupancyTypeList.contains(C3)) && block.getBuilding().getFloorsAboveGround() != null &&
                            block.getBuilding().getFloorsAboveGround().compareTo(BigDecimal.valueOf(3)) > 0) {
                        noOfLiftsRqrd = BigDecimal.valueOf(1);
                        if (block.getBuilding().getTotalFloorArea() != null && block.getBuilding().getTotalFloorArea().compareTo(BigDecimal.valueOf(4000)) > 0) {
                            noOfLiftsRqrd = noOfLiftsRqrd.add(BigDecimal.valueOf(Math.ceil((block.getBuilding().getTotalFloorArea().subtract
                                    (BigDecimal.valueOf(4000))).divide(BigDecimal.valueOf(2500), 2, RoundingMode.HALF_UP).doubleValue())));
                        }
                        boolean valid = false;
                        if (noOfLiftsRqrd.compareTo(BigDecimal.valueOf(Double.valueOf(block.getNumberOfLifts()))) <= 0) {
                            valid = true;
                        }
                        if (valid) {
                            setReportOutputDetails(pl, SUBRULE_48 + ", " + SUBRULE_40A_3, SUBRULE_48_DESCRIPTION, noOfLiftsRqrd.toString(),
                                    block.getNumberOfLifts(),
                                    Result.Accepted.getResultVal(), "Medical Occupancy is most restrictive, so number of floors above ground level > 3 is required to have lifts", scrutinyDetail);
                        } else {
                            setReportOutputDetails(pl, SUBRULE_48, SUBRULE_48_DESCRIPTION, noOfLiftsRqrd.toString(),
                                    block.getNumberOfLifts(),
                                    Result.Verify.getResultVal(), "Medical Occupancy is most restrictive, so number of floors above ground level > 3 is required to have lifts", scrutinyDetail);
                        }

                    } else if ((!occupancyTypeList.contains(C) &&
                            !occupancyTypeList.contains(C1) &&
                            !occupancyTypeList.contains(C2) &&
                            !occupancyTypeList.contains(C3)) && (occupancyTypeList.contains(A1) ||
                            occupancyTypeList.contains(A2) || occupancyTypeList.contains(A3) ||
                            occupancyTypeList.contains(A4) || occupancyTypeList.contains(A5) ||
                            occupancyTypeList.contains(B1) || occupancyTypeList.contains(B2) ||
                            occupancyTypeList.contains(B3) || occupancyTypeList.contains(D) ||
                            occupancyTypeList.contains(D1) ||
                            occupancyTypeList.contains(D2) ||
                            occupancyTypeList.contains(E) || occupancyTypeList.contains(F) ||
                            occupancyTypeList.contains(F1) || occupancyTypeList.contains(F2) ||
                            occupancyTypeList.contains(F3) || occupancyTypeList.contains(F3) ||
                            occupancyTypeList.contains(G1) ||
                            occupancyTypeList.contains(G2) || occupancyTypeList.contains(H) ||
                            occupancyTypeList.contains(I1) || occupancyTypeList.contains(I2))
                            && block.getBuilding().getFloorsAboveGround() != null &&
                            block.getBuilding().getFloorsAboveGround().compareTo(BigDecimal.valueOf(4)) > 0) {
                        noOfLiftsRqrd = BigDecimal.valueOf(1);
                        if (block.getBuilding().getTotalFloorArea() != null && block.getBuilding().getTotalFloorArea().compareTo(BigDecimal.valueOf(4000)) > 0) {
                            noOfLiftsRqrd = noOfLiftsRqrd.add(BigDecimal.valueOf(Math.ceil((block.getBuilding().getTotalFloorArea().subtract
                                    (BigDecimal.valueOf(4000))).divide(BigDecimal.valueOf(2500), 2, RoundingMode.HALF_UP).doubleValue())));
                        }
                        boolean valid = false;
                        if (noOfLiftsRqrd.compareTo(BigDecimal.valueOf(Double.valueOf(block.getNumberOfLifts()))) <= 0) {
                            valid = true;
                        }
                        if (valid) {
                            setReportOutputDetails(pl, SUBRULE_48 + ", " + SUBRULE_40A_3, SUBRULE_48_DESCRIPTION, noOfLiftsRqrd.toString(),
                                    block.getNumberOfLifts(),
                                    Result.Accepted.getResultVal(), "Occupancies other than Medical are provided,so number of floors above ground level > 4 is required to have lifts", scrutinyDetail);

                        } else {
                            setReportOutputDetails(pl, SUBRULE_48 + ", " + SUBRULE_40A_3, SUBRULE_48_DESCRIPTION, noOfLiftsRqrd.toString(),
                                    block.getNumberOfLifts(),
                                    Result.Verify.getResultVal(), "Occupancies other than Medical are provided,so number of floors above ground level > 4 is required to have lifts", scrutinyDetail);
                        }
                    }
                }

                if (block.getBuilding() != null && block.getBuilding().getBuildingHeight() != null && block.getBuilding().getBuildingHeight().intValue() > 16) {
                    if (!block.getBuilding().getFloors().isEmpty()) {
                        Integer floorUnits = 0;
                        for (Floor floor : block.getBuilding().getFloors()) {
                        	if(!floor.getTerrace()) {
                            floorUnits = floorUnits + floor.getUnits().size();
                        	}
                        }
                        if (floorUnits > 16) {
                            boolean validOutside = false;
                            Map<String, String> liftDimensions = new HashMap<>();
                            flr:
                            for (Floor floor : block.getBuilding().getFloors()) {
                            	if(!floor.getTerrace()) {
                                for (Lift lift : floor.getLifts()) {
                                    if (lift.getLiftClosed()) {
                                        for (Measurement measurement : lift.getLifts()) {
                                            measurement.setWidth(BigDecimal.valueOf(Math.round(measurement.getWidth().doubleValue() * 100d) / 100d));
                                            measurement.setHeight(BigDecimal.valueOf(Math.round(measurement.getHeight().doubleValue() * 100d) / 100d));
                                            if (measurement.getWidth().compareTo(BigDecimal.valueOf(1.1)) >= 0 && measurement.getHeight().compareTo(BigDecimal.valueOf(2)) >= 0) {
                                                validOutside = true;
                                                liftDimensions.put("width", measurement.getWidth().toString());
                                                liftDimensions.put("length", measurement.getHeight().toString());
                                                liftDimensions.put("floor", floor.getNumber().toString());
                                                liftDimensions.put("lift", lift.getNumber().toString());
                                                break flr;
                                            }
                                        }
                                    }
                                }
                              } 
                            }
                            if (validOutside) {
                                setReportOutputDetails(pl, SUBRULE_118, String.format(SUBRULE_118_DESCRIPTION, liftDimensions.get("lift"), liftDimensions.get("floor")),
                                        "2.0 m * 1.10 m", liftDimensions.get("length") + " * " + liftDimensions.get("width"), Result.Accepted.getResultVal(),
                                        "Height of building is greater than 16 m", scrutinyDetail1);
                            } else {
                                setReportOutputDetails(pl, SUBRULE_118, SUBRULE_118_DESC,
                                        "2.0 m * 1.10 m", "None of the lift has minimum dimensions as provided", Result.Not_Accepted.getResultVal(),
                                        "Height of building is greater than 16 m", scrutinyDetail1);
                            }
                        }
                    }
                }

            }
        }

        return pl;
    }

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual, String status, String remarks, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        details.put(REMARKS, remarks);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void validateDimensions(Plan planDetail, String blockNo, int floorNo, String liftNo, List<Measurement> liftPolylines) {
        int count = 0;
        for (Measurement m : liftPolylines) {
            if (m.getInvalidReason() != null && m.getInvalidReason().length() > 0) {
                count++;
            }
        }
        if (count > 0) {
            planDetail.addError(String.format(DxfFileConstants.
                    LAYER_LIFT_WITH_NO, blockNo, floorNo, liftNo), count + " number of lift polyline not having only 4 points in layer " + String.format(DxfFileConstants.
                    LAYER_LIFT_WITH_NO, blockNo, floorNo, liftNo));

        }
    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }

}
