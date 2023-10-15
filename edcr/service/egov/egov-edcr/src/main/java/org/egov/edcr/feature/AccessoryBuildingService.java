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

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.egov.common.entity.edcr.AccessoryBlock;
import org.egov.common.entity.edcr.CulDeSacRoad;
import org.egov.common.entity.edcr.Lane;
import org.egov.common.entity.edcr.NonNotifiedRoad;
import org.egov.common.entity.edcr.NotifiedRoad;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.utility.DcrConstants;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessoryBuildingService extends FeatureProcess{

    private static final String SUBRULE_88_1_DESC = "Maximum area of accessory block";
    private static final String SUBRULE_88_3_DESC = "Maximum height of accessory block %s";

    private static final String SUBRULE_88_1 = "88(1)";
    private static final String SUBULE_88_3 = "88(3)";
    private static final String SUBRULE_88_4 = "88(4)";
    private static final String SUBRULE_88_5 = "88(5)";

    private static final String SUBRULE_67 = "67";
    private static final String SUBRULE_67_PROVISO = "67 Proviso 2";
    private static final String SUBRULE_67_PROVISO3 = "67 Proviso 3 23(2)";
    private static final String  SUBRULE_67_PROVISION_4= "67 Proviso 4";

    private static final String MIN_DIS_NOTIFIED_ROAD_FROM_ACC_BLDG = "Minimum distance from accessory block to notified road";
    private static final String MIN_DIS_NON_NOTIFIED_ROAD_FROM_ACC_BLDG = "Minimum distance from accessory building to non notified road";
    private static final String MIN_DIS_CULDESAC_ROAD_FROM_ACC_BLDG = "Minimum distance from accessory building to culdesac road";
    private static final String MIN_DIS_LANE_ROAD_FROM_ACC_BLDG = "Minimum distance from accessory building to lane road";
    private static final String SUBRULE_88_5_DESC = "Minimum distance from accessory block %s to plot boundary";
    private static final String SUBRULE_ACC_DIST_BLDNG_DESC = "The minimum distance between accessory buildings and other existing or proposed buildings shall be minimum 1.0 m";
    private static final String ACC_BLK_NOT_A1_ERROR = "The accessory buildings shall be allowed to residential buildings only, accessory buildings with occupancy other than residential to be drawn as separate block";

    private static final String MIN_DIS_UN_NOTIFIED_ROAD_FROM_ACC_BLDG = "Minimum distance from accessory building to un-notified road";

    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();
        if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
            for (AccessoryBlock accessoryBlock : pl.getAccessoryBlocks()) {
                if (accessoryBlock.getAccessoryBuilding() != null
                        && accessoryBlock.getAccessoryBuilding().getHeight().compareTo(BigDecimal.valueOf(0)) == 0) {
                    errors.put(String.format(DcrConstants.ACCESSORRY_BLK_HGHT, accessoryBlock.getNumber()),
                            edcrMessageSource.getMessage(
                                    DcrConstants.OBJECTNOTDEFINED, new String[] { String
                                            .format(DcrConstants.ACCESSORRY_BLK_HGHT, accessoryBlock.getNumber()) },
                                    LocaleContextHolder.getLocale()));
                    pl.addErrors(errors);

                }
            }
            boolean shortestDistanceDefined = false;
            if (!pl.getNotifiedRoads().isEmpty())
                for (NotifiedRoad notifiedRoad : pl.getNotifiedRoads()) {
                    for (BigDecimal shortestDistanceToRoad : notifiedRoad.getDistanceFromAccessoryBlock()) {
                        if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                            shortestDistanceDefined = true;
                            break;
                        }
                    }
                }
            if (!pl.getNonNotifiedRoads().isEmpty())
                for (NonNotifiedRoad nonNotifiedRoad : pl.getNonNotifiedRoads()) {
                    for (BigDecimal shortestDistanceToRoad : nonNotifiedRoad.getDistanceFromAccessoryBlock())
                        if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                            shortestDistanceDefined = true;
                            break;
                        }
                }
            if (!pl.getLaneRoads().isEmpty())
                for (Lane laneRoad : pl.getLaneRoads()) {
                    for (BigDecimal shortestDistanceToRoad : laneRoad.getDistanceFromAccessoryBlock())
                        if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                            shortestDistanceDefined = true;
                            break;
                        }
                }
            if (!pl.getCuldeSacRoads().isEmpty())
                for (CulDeSacRoad culdSac : pl.getCuldeSacRoads()) {
                    for (BigDecimal shortestDistanceToRoad : culdSac.getDistanceFromAccessoryBlock())
                        if (shortestDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                            shortestDistanceDefined = true;
                            break;
                        }
                }

            if (!shortestDistanceDefined) {
                errors.put(DcrConstants.SHORTESTDISTANCETOROAD,
                        getLocaleMessage(DcrConstants.OBJECTNOTDEFINED, DcrConstants.SHORTESTDISTANCETOROAD));
                pl.addErrors(errors);
            }
        }
        validateMinimumDistanceOfAccBlkToPlotBndry(pl, errors);
        return pl;
    }

    private void validateMinimumDistanceOfAccBlkToPlotBndry(Plan pl, HashMap<String, String> errors) {
        if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
            for (AccessoryBlock accessoryBlock : pl.getAccessoryBlocks()) {
                if (accessoryBlock.getNumber() != null && accessoryBlock.getAccessoryBuilding() != null && accessoryBlock.getAccessoryBuilding().getDistanceFromPlotBoundary().isEmpty()) {
                    errors.put(String.format(DcrConstants.ACCESSORRY_BLK_DIST_FRM_PLOT_BNDRY, accessoryBlock.getNumber()),
                            edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                    new String[]{String.format(DcrConstants.ACCESSORRY_BLK_DIST_FRM_PLOT_BNDRY, accessoryBlock.getNumber())},
                                    LocaleContextHolder.getLocale()));
                    pl.addErrors(errors);
                }
            }
        }
    }


    @Override
    public Plan process(Plan pl) {
        validate(pl);
        processAreaOfAccessoryBlock(pl);
        processHeightOfAccessoryBlock(pl);
        processShortestDistanceOfAccBlkFromRoad(pl);
        processShortestDistanceOfAccBlkFromPlotBoundary(pl);

        //if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
		processShortestAccBlkDistanceToBldng(pl);

		if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
			if (pl.getVirtualBuilding().getOccupancyTypes().size() > 1
					|| (pl.getVirtualBuilding().getOccupancyTypes().size() == 1
							&& !pl.getVirtualBuilding().containsOccupancy(DxfFileConstants.A1))) {
				pl.addError("ACC_BLDNG_A1_ERROR", ACC_BLK_NOT_A1_ERROR);
			}
		}

      //  }

        return pl;
    }

    private void processShortestDistanceOfAccBlkFromPlotBoundary(Plan pl) {
        String subRule=SUBRULE_67_PROVISION_4;
     
        ScrutinyDetail scrutinyDetail3 = new ScrutinyDetail();
        scrutinyDetail3.setKey("Common_Accessory Block - Minimum distance from plot boundary");
        scrutinyDetail3.addColumnHeading(1, RULE_NO);
        scrutinyDetail3.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail3.addColumnHeading(3, REQUIRED);
        scrutinyDetail3.addColumnHeading(4, PROVIDED);
        scrutinyDetail3.addColumnHeading(5, STATUS);
        if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
            for (AccessoryBlock accessoryBlock : pl.getAccessoryBlocks()) {
                boolean valid = false;
                if (accessoryBlock.getAccessoryBuilding() != null
                        && !accessoryBlock.getAccessoryBuilding().getDistanceFromPlotBoundary().isEmpty()) {
                    BigDecimal minimumAccBlkDisFromPlotBoundary = accessoryBlock.getAccessoryBuilding()
                            .getDistanceFromPlotBoundary().get(0);
                    for (BigDecimal disOfAccBlkFromPlotBndry : accessoryBlock.getAccessoryBuilding()
                            .getDistanceFromPlotBoundary()) {
                        if (minimumAccBlkDisFromPlotBoundary.compareTo(disOfAccBlkFromPlotBndry) > 0) {
                            minimumAccBlkDisFromPlotBoundary = disOfAccBlkFromPlotBndry;
                        }
                    }
                    if (minimumAccBlkDisFromPlotBoundary.compareTo(BigDecimal.valueOf(1)) >= 0) {
                        valid = true;
                    }
                    if (valid) {
                        setReportOutputDetails(pl, subRule,
                                String.format(SUBRULE_88_5_DESC, accessoryBlock.getNumber()), String.valueOf(1),
                                minimumAccBlkDisFromPlotBoundary.toString(), Result.Accepted.getResultVal(),
                                scrutinyDetail3);
                    } else {
                        setReportOutputDetails(pl, subRule,
                                String.format(SUBRULE_88_5_DESC, accessoryBlock.getNumber()), String.valueOf(1),
                                minimumAccBlkDisFromPlotBoundary.toString(), Result.Not_Accepted.getResultVal(),
                                scrutinyDetail3);
                    }
                }
            }
        }
    }

    private void processShortestDistanceOfAccBlkFromRoad(Plan pl) {
        String subRule=SUBRULE_67_PROVISO3; 
        
        ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
        scrutinyDetail2.setKey("Common_Accessory Block - Minimum distance from the boundary abutting the road");
        scrutinyDetail2.addColumnHeading(1, RULE_NO);
        scrutinyDetail2.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail2.addColumnHeading(3, REQUIRED);
        scrutinyDetail2.addColumnHeading(4, PROVIDED);
        scrutinyDetail2.addColumnHeading(5, STATUS);
            processNotifiedRoads(pl, subRule, scrutinyDetail2);
            processNonNotifiedRoads(pl, subRule, scrutinyDetail2);
            processCuldesacRoad(pl, subRule, scrutinyDetail2);
            processLaneRoads(pl, subRule, scrutinyDetail2);
    }

    private void processNonNotifiedRoads(Plan pl, String subRule, ScrutinyDetail scrutinyDetail2) {
        if (!pl.getNonNotifiedRoads().isEmpty()
                && !pl.getNonNotifiedRoads().get(0).getDistanceFromAccessoryBlock().isEmpty()) {
            boolean valid = false;
            BigDecimal minimumDisFmNonNotifiedRoad = pl.getNonNotifiedRoads().get(0).getDistanceFromAccessoryBlock()
                    .get(0);
            for (BigDecimal disFrmAccBldg : pl.getNonNotifiedRoads().get(0).getDistanceFromAccessoryBlock()) {
                if (disFrmAccBldg.compareTo(minimumDisFmNonNotifiedRoad) < 0) {
                    minimumDisFmNonNotifiedRoad = disFrmAccBldg;
                }
            }
            if (minimumDisFmNonNotifiedRoad.compareTo(BigDecimal.valueOf(2)) >= 0) {
                valid = true;
            }
            String ruleDesc=MIN_DIS_UN_NOTIFIED_ROAD_FROM_ACC_BLDG; 
            if (valid) {
                setReportOutputDetails(pl, subRule, ruleDesc, String.valueOf(2),
                        minimumDisFmNonNotifiedRoad.toString(), Result.Accepted.getResultVal(), scrutinyDetail2);
            } else {
                setReportOutputDetails(pl, subRule, ruleDesc, String.valueOf(2),
                        minimumDisFmNonNotifiedRoad.toString(), Result.Not_Accepted.getResultVal(), scrutinyDetail2);
            }
        }
    }
 
    private void processLaneRoads(Plan pl, String subRule, ScrutinyDetail scrutinyDetail2) {
        if (!pl.getLaneRoads().isEmpty() && !pl.getLaneRoads().get(0).getDistanceFromAccessoryBlock().isEmpty()) {
            boolean valid = false;
            BigDecimal minimumDisFmLaneRoad = pl.getLaneRoads().get(0).getDistanceFromAccessoryBlock().get(0);
            for (BigDecimal disFrmAccBldg : pl.getLaneRoads().get(0).getDistanceFromAccessoryBlock()) {
                if (disFrmAccBldg.compareTo(minimumDisFmLaneRoad) < 0) {
                    minimumDisFmLaneRoad = disFrmAccBldg;
                }
            }
            if (minimumDisFmLaneRoad.compareTo(BigDecimal.valueOf(1.5)) >= 0) {
                valid = true;
            }
            if (valid) {
                setReportOutputDetails(pl, subRule, MIN_DIS_LANE_ROAD_FROM_ACC_BLDG, String.valueOf(1.5),
                        minimumDisFmLaneRoad.toString(), Result.Accepted.getResultVal(), scrutinyDetail2);
            } else {
                setReportOutputDetails(pl, subRule, MIN_DIS_LANE_ROAD_FROM_ACC_BLDG, String.valueOf(1.5),
                        minimumDisFmLaneRoad.toString(), Result.Not_Accepted.getResultVal(), scrutinyDetail2);
            }
        }
    }

    private void processCuldesacRoad(Plan pl, String subRule, ScrutinyDetail scrutinyDetail2) {
        if (!pl.getCuldeSacRoads().isEmpty()
                && !pl.getCuldeSacRoads().get(0).getDistanceFromAccessoryBlock().isEmpty()) {
            boolean valid = false;
            BigDecimal minimumDisFmCuldesacRoad = pl.getCuldeSacRoads().get(0).getDistanceFromAccessoryBlock().get(0);
            for (BigDecimal disFrmAccBldg : pl.getCuldeSacRoads().get(0).getDistanceFromAccessoryBlock()) {
                if (disFrmAccBldg.compareTo(minimumDisFmCuldesacRoad) < 0) {
                    minimumDisFmCuldesacRoad = disFrmAccBldg;
                }
            }
            if (minimumDisFmCuldesacRoad.compareTo(BigDecimal.valueOf(2)) >= 0) {
                valid = true;
            }
            if (valid) {
                setReportOutputDetails(pl, subRule, MIN_DIS_CULDESAC_ROAD_FROM_ACC_BLDG, String.valueOf(2),
                        minimumDisFmCuldesacRoad.toString(), Result.Accepted.getResultVal(), scrutinyDetail2);
            } else {
                setReportOutputDetails(pl, subRule, MIN_DIS_CULDESAC_ROAD_FROM_ACC_BLDG, String.valueOf(2),
                        minimumDisFmCuldesacRoad.toString(), Result.Not_Accepted.getResultVal(), scrutinyDetail2);
            }
        }
    }

    private void processNotifiedRoads(Plan pl, String subRule, ScrutinyDetail scrutinyDetail2) {
        if (!pl.getNotifiedRoads().isEmpty()
                && !pl.getNotifiedRoads().get(0).getDistanceFromAccessoryBlock().isEmpty()) {
            boolean valid = false;
            BigDecimal minimumDisFmNotifiedRoad = pl.getNotifiedRoads().get(0).getDistanceFromAccessoryBlock().get(0);
            for (BigDecimal disFrmAccBldg : pl.getNotifiedRoads().get(0).getDistanceFromAccessoryBlock()) {
                if (disFrmAccBldg.compareTo(minimumDisFmNotifiedRoad) < 0) {
                    minimumDisFmNotifiedRoad = disFrmAccBldg;
                }
            }
            if (minimumDisFmNotifiedRoad.compareTo(BigDecimal.valueOf(3)) >= 0) {
                valid = true;
            }
            if (valid) {
                setReportOutputDetails(pl, subRule, MIN_DIS_NOTIFIED_ROAD_FROM_ACC_BLDG, String.valueOf(3),
                        minimumDisFmNotifiedRoad.toString(), Result.Accepted.getResultVal(), scrutinyDetail2);
            } else {
                setReportOutputDetails(pl, subRule, MIN_DIS_NOTIFIED_ROAD_FROM_ACC_BLDG, String.valueOf(3),
                        minimumDisFmNotifiedRoad.toString(), Result.Not_Accepted.getResultVal(), scrutinyDetail2);
            }
        }
    }

    private void processShortestAccBlkDistanceToBldng(Plan pl) {
        String subRule=SUBRULE_67_PROVISION_4;
     
        ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey(
                "Common_Accessory Block - Minimum distance between Accessory buildings and other existing or proposed buildings");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(5, STATUS);
         
        if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
            if (pl.getAccessoryBlockDistances() != null && !pl.getAccessoryBlockDistances().isEmpty()) {
                Long count = pl.getAccessoryBlockDistances().stream()
                        .filter(distance -> distance.compareTo(BigDecimal.ONE) < 0).count();
                if (count > 1) {
                    setReportOutputDetails(pl, subRule, SUBRULE_ACC_DIST_BLDNG_DESC,
                            BigDecimal.ONE.toString() + DcrConstants.IN_METER,
                            count.toString() + " having minimum distance less than 1m",
                            Result.Not_Accepted.getResultVal(), scrutinyDetail);
                } else {
                    setReportOutputDetails(pl, subRule, SUBRULE_ACC_DIST_BLDNG_DESC,
                            BigDecimal.ONE.toString() + DcrConstants.IN_METER,
                            count.toString() + " having minimum distance less than 1m", Result.Accepted.getResultVal(),
                            scrutinyDetail);
                }

            } else {
                pl.addError("ACC_BLK_DIST_BLDNG_ERR",
                        "Minimum distance between accessory buildings and other existing or proposed buildings are not defined.");
            }
        }
    }

    private void processHeightOfAccessoryBlock(Plan pl) {
        ScrutinyDetail scrutinyDetail1 = new ScrutinyDetail();
        scrutinyDetail1.addColumnHeading(1, RULE_NO);
        scrutinyDetail1.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail1.addColumnHeading(3, REQUIRED);
        scrutinyDetail1.addColumnHeading(4, PROVIDED);
        scrutinyDetail1.addColumnHeading(5, STATUS);
        scrutinyDetail1.setKey("Common_Accessory Block - Maximum Height");
        String subRuleDesc = SUBRULE_88_3_DESC;
        String subRule=SUBRULE_67_PROVISO;
      
        if (pl != null && !pl.getAccessoryBlocks().isEmpty()) {
            for (AccessoryBlock accessoryBlock : pl.getAccessoryBlocks()) {
                Boolean valid = false;
                if (accessoryBlock.getAccessoryBuilding() != null
                        && accessoryBlock.getAccessoryBuilding().getHeight() != null
                        && accessoryBlock.getAccessoryBuilding().getHeight().compareTo(BigDecimal.valueOf(0)) > 0) {
                    if (accessoryBlock.getAccessoryBuilding().getHeight().compareTo(BigDecimal.valueOf(2.5)) <= 0) {
                        valid = true;
                    }
                    if (valid) {
                        setReportOutputDetails(pl, subRule, String.format(subRuleDesc, accessoryBlock.getNumber()),
                                BigDecimal.valueOf(2.5) + DcrConstants.IN_METER,
                                accessoryBlock.getAccessoryBuilding().getHeight() + DcrConstants.IN_METER,
                                Result.Accepted.getResultVal(), scrutinyDetail1);
                    } else {
                        setReportOutputDetails(pl, subRule, String.format(subRuleDesc, accessoryBlock.getNumber()),
                                BigDecimal.valueOf(2.5) + DcrConstants.IN_METER,
                                accessoryBlock.getAccessoryBuilding().getHeight() + DcrConstants.IN_METER,
                                Result.Not_Accepted.getResultVal(), scrutinyDetail1);

                    }
                }
            }
        }
    }

    private void processAreaOfAccessoryBlock(Plan pl) {
        ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
        scrutinyDetail.setKey("Common_Accessory Block - Maximum Area");
        String subRuleDesc = SUBRULE_88_1_DESC;
        String subRule  = SUBRULE_67;
       
        if (pl != null && pl.getPlot() != null && pl.getPlot().getArea() != null && pl.getVirtualBuilding() != null
                && pl.getVirtualBuilding().getTotalCoverageArea() != null
                && pl.getVirtualBuilding().getTotalCoverageArea().compareTo(BigDecimal.valueOf(0)) > 0) {
            BigDecimal fifteenPercentOfEmptyArea = (pl.getPlot().getArea()
                    .subtract(pl.getVirtualBuilding().getTotalCoverageArea())).multiply(BigDecimal.valueOf(0.15));
            if (!pl.getAccessoryBlocks().isEmpty()) {
                BigDecimal accessoryBlockArea = BigDecimal.ZERO;

                for (AccessoryBlock accessoryBlock : pl.getAccessoryBlocks()) {
                     if (accessoryBlock.getAccessoryBuilding() != null
                            && accessoryBlock.getAccessoryBuilding().getArea() != null
                            && accessoryBlock.getAccessoryBuilding().getArea().compareTo(BigDecimal.valueOf(0)) > 0) {
                        accessoryBlockArea = accessoryBlockArea.add(accessoryBlock.getAccessoryBuilding().getArea());
                    }
                }     
                    Boolean valid = false;
                    if (fifteenPercentOfEmptyArea != null && fifteenPercentOfEmptyArea.compareTo(BigDecimal.ZERO) > 0
                            && accessoryBlockArea != null && accessoryBlockArea.compareTo(BigDecimal.ZERO) > 0) {
                        if (fifteenPercentOfEmptyArea.compareTo(accessoryBlockArea) >= 0) {
                            valid = true;
                        }
                        if (valid) { //TODO: CHECK SUM OF ALL ACCESSROTY BLOCK OR INDIVIDUAL AREA TO BE VERIFY ?
                            setReportOutputDetails(pl, subRule, subRuleDesc,
                                    fifteenPercentOfEmptyArea + DcrConstants.IN_METER_SQR,
                                    accessoryBlockArea + DcrConstants.IN_METER_SQR, Result.Accepted.getResultVal(),
                                    scrutinyDetail);
                        } else {
                            setReportOutputDetails(pl, subRule, subRuleDesc,
                                    fifteenPercentOfEmptyArea + DcrConstants.IN_METER_SQR,
                                    accessoryBlockArea + DcrConstants.IN_METER_SQR, Result.Not_Accepted.getResultVal(),
                                    scrutinyDetail);
                        }
                }
            }
        }
    }



    private void setReportOutputDetails(Plan plan, String ruleNo, String ruleDesc, String expected, String actual, String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        plan.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

	@Override
	public Map<String, Date> getAmendments() {
        Map<String, Date> additionalFeatureAmendments = new ConcurrentHashMap<>();
        additionalFeatureAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        return additionalFeatureAmendments;
    }
}
