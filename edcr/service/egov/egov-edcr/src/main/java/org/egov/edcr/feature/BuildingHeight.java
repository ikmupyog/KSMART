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
import static org.egov.edcr.utility.DcrConstants.BUILDING_HEIGHT;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.HEIGHT_OF_BUILDING;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.SECURITY_ZONE;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.CulDeSacRoad;
import org.egov.common.entity.edcr.Lane;
import org.egov.common.entity.edcr.NonNotifiedRoad;
import org.egov.common.entity.edcr.NotifiedRoad;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class BuildingHeight extends FeatureProcess {
    private static final Logger LOG = LogManager.getLogger(BuildingHeight.class);

	private static final String RULE_EXPECTED_KEY = "buildingheight.expected";
    private static final String RULE_ACTUAL_KEY = "buildingheight.actual";
    private static final String SECURITYZONE_RULE_EXPECTED_KEY = "securityzone.expected";
    private static final String SECURITYZONE_RULE_ACTUAL_KEY = "securityzone.actual";

    private static final String SUB_RULE_32_1A = "32(1A)";
    private static final String SUB_RULE_AMD19_24_1A = "24(1A)";
    private static final String SUB_RULE_AMD19_50_2 = "50(2)";
    private static final String SUB_RULE_32_3 = "32(3)";
    private static final String SUB_RULE_AMD19_24_3 = "24(3)";
    public static final String UPTO = "Up To";
    public static final String DECLARED = "Declared";
    private static final BigDecimal TWELVE = BigDecimal.valueOf(12);
    private static final BigDecimal TEN = BigDecimal.valueOf(10);
    private static final String MANYLINES = "Multiple Lines Defined";
    private static final String SLOPE = "SLOPE OF LINE";
    private static final String MORETHANONEROAD_ABUTTINGPLOT = "More than one road/street abutting the plot, hence according to wider road/street fix the maximum height of building.";

	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();


    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();
        if (!Util.isSmallPlot(pl)) {
            for (Block block : pl.getBlocks()) {

                BigDecimal heightOfBuilding_defined = BigDecimal.ZERO;
                BigDecimal heightOfBuilding_measured = BigDecimal.ZERO;

                if (!block.getCompletelyExisting()) {
                    if (pl.getStrictlyValidateDimension() && block.getBuilding() != null) { // added getStrictlyValidateDimension
                                                                                            // flag condition temporarily
                        heightOfBuilding_measured = block.getBuilding().getBuildingHeightAsMeasured();
                        heightOfBuilding_defined = block.getBuilding().getBuildingHeight();

                        if (heightOfBuilding_measured != null && heightOfBuilding_defined != null &&
                                (heightOfBuilding_defined.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                        .compareTo(heightOfBuilding_measured.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)) > 0
                                        || heightOfBuilding_defined.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS).compareTo(
                                                heightOfBuilding_measured.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)) < 0)) {
                            pl.getErrors().put(BUILDING_HEIGHT + "Measure" + block.getNumber(),
                                    "The defined height of building "
                                            + heightOfBuilding_defined.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS)
                                            + " is not matching with the measured height of building "
                                            + heightOfBuilding_measured.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS));
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
        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey("Common_Height of Building");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, UPTO);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);

        checkBuildingHeight(pl);
        checkBuildingInSecurityZoneArea(pl);
        return pl;
    }

    private void checkBuildingHeight(Plan pl) {
        String subRule;
        if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
            if (Util.isSmallPlot(pl))
                subRule = SUB_RULE_AMD19_50_2;
            else
                subRule = SUB_RULE_AMD19_24_1A;
        } else
            subRule = SUB_RULE_32_1A;

        String rule = HEIGHT_OF_BUILDING;

        BigDecimal maximumDistanceToRoad = BigDecimal.ZERO;
        BigDecimal minimumDistanceToRoad = BigDecimal.ZERO;

        // Get Maximum road distane from plot.
        maximumDistanceToRoad = getMaximimShortestdistanceFromRoad(pl, maximumDistanceToRoad);

        // Get Minimum Distance to Road
        if (maximumDistanceToRoad.compareTo(TWELVE) > 0)
            minimumDistanceToRoad = getMinimumShortestdistanceFromRoad(pl, maximumDistanceToRoad);

        // get maximum height from buildings.
        for (Block block : pl.getBlocks()) {
            if (!block.getCompletelyExisting()) {

                BigDecimal maximumDistanceToRoadEdge = BigDecimal.ZERO;
                BigDecimal maximumSetBackToBuildingLine = BigDecimal.ZERO;
                BigDecimal maximum_heightAllowed = BigDecimal.ZERO;
                BigDecimal heightOfBuilding_defined = BigDecimal.ZERO;

                // Get Maximum distance to road Edge
                maximumDistanceToRoadEdge = getMaximumDistanceFromRoadEdge(maximumDistanceToRoadEdge, block);
                maximumSetBackToBuildingLine = getMaximumDistanceFromSetBackToBuildingLine(maximumSetBackToBuildingLine, block);
                heightOfBuilding_defined = block.getBuilding().getBuildingHeight();
                if (maximumDistanceToRoadEdge != null && maximumDistanceToRoad.compareTo(TWELVE) <= 0) {
                    if (maximumSetBackToBuildingLine != null && maximumSetBackToBuildingLine.compareTo(BigDecimal.ZERO) > 0) {
                        maximum_heightAllowed = maximumDistanceToRoadEdge
                                .multiply(BigDecimal.valueOf(2))
                                .add(BigDecimal.valueOf(3).multiply(maximumSetBackToBuildingLine
                                        .divide(BigDecimal.valueOf(0.5), 0, RoundingMode.DOWN)))
                                .setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
                    } else
                        maximum_heightAllowed = maximumDistanceToRoadEdge.multiply(BigDecimal.valueOf(2))
                                .setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
                }
                if (Util.isSmallPlot(pl))
                    maximum_heightAllowed = BigDecimal.valueOf(10);
                // Show for each block height
                if (maximum_heightAllowed.compareTo(BigDecimal.ZERO) > 0) {
                    String actualResult = getLocaleMessage(RULE_ACTUAL_KEY, heightOfBuilding_defined.toString());
                    String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, maximum_heightAllowed.toString());

                    if (heightOfBuilding_defined.compareTo(maximum_heightAllowed) > 0) {
                        Map<String, String> details = new HashMap<>();
                        details.put(RULE_NO, subRule);
                        details.put(DESCRIPTION, HEIGHT_OF_BUILDING + " for Block " + block.getNumber());
                        details.put(UPTO, expectedResult);
                        details.put(PROVIDED, actualResult);
                        details.put(STATUS, Result.Not_Accepted.getResultVal());
                        scrutinyDetail.getDetail().add(details);
                        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                    } else {
                        Map<String, String> details = new HashMap<>();
                        details.put(RULE_NO, subRule);
                        details.put(DESCRIPTION, HEIGHT_OF_BUILDING + " for Block " + block.getNumber());
                        details.put(UPTO, expectedResult);
                        details.put(PROVIDED, actualResult);
                        details.put(STATUS, Result.Verify.getResultVal());
                        scrutinyDetail.getDetail().add(details);
                        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                    }
                } else if (maximum_heightAllowed.compareTo(BigDecimal.ZERO) == 0 && maximumDistanceToRoad != null
                        && maximumDistanceToRoad.compareTo(TWELVE) > 0) {
                    String actualResult = "";
                    String expectedResult = "";
                    // If the Distance from road greater than 12 but also there are shorter roads present then mark to verify the
                    // roads.
                    if (minimumDistanceToRoad != null && minimumDistanceToRoad.compareTo(maximumDistanceToRoad) < 0 &&
                            minimumDistanceToRoad.compareTo(BigDecimal.ZERO) > 0) {
                        actualResult = MORETHANONEROAD_ABUTTINGPLOT;

                    } else if (maximumDistanceToRoadEdge != null && maximumDistanceToRoad.compareTo(TWELVE) > 0) {

                        actualResult = getLocaleMessage(RULE_ACTUAL_KEY, heightOfBuilding_defined.toString());
                        maximum_heightAllowed = maximumDistanceToRoadEdge.multiply(BigDecimal.valueOf(2))
                                .setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
                        expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, maximum_heightAllowed.toString());

                    }
                    Map<String, String> details = new HashMap<>();
                    details.put(RULE_NO, subRule);
                    details.put(DESCRIPTION, HEIGHT_OF_BUILDING + " for Block " + block.getNumber());
                    details.put(UPTO, expectedResult);
                    details.put(PROVIDED, actualResult);
                    details.put(STATUS, Result.Verify.getResultVal());
                    scrutinyDetail.getDetail().add(details);
                    pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

                }
            }
        }
    }

    private void checkBuildingInSecurityZoneArea(Plan pl) {

        String subRule;
        if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
            subRule = SUB_RULE_AMD19_24_3;
            pl.getFeatureAmendments().put("Common_Security Zone", AMEND_DATE_081119.toString());
        } else
            subRule = SUB_RULE_32_3;

        if (pl.getPlanInformation().getSecurityZone()) {
            BigDecimal maxBuildingHeight = BigDecimal.ZERO;
            for (Block block : pl.getBlocks()) {
                if (!block.getCompletelyExisting() && maxBuildingHeight.compareTo(BigDecimal.ZERO) == 0 ||
                        block.getBuilding().getBuildingHeight().compareTo(maxBuildingHeight) >= 0) {
                    maxBuildingHeight = block.getBuilding().getBuildingHeight();
                }
            }
            if (maxBuildingHeight.compareTo(BigDecimal.ZERO) > 0) {

                scrutinyDetail = new ScrutinyDetail();
                scrutinyDetail.setKey("Common_Security Zone");
                scrutinyDetail.addColumnHeading(1, RULE_NO);
                scrutinyDetail.addColumnHeading(2, DESCRIPTION);
                scrutinyDetail.addColumnHeading(3, REQUIRED);
                scrutinyDetail.addColumnHeading(4, PROVIDED);
                scrutinyDetail.addColumnHeading(5, STATUS);

                String actualResult = getLocaleMessage(SECURITYZONE_RULE_ACTUAL_KEY,
                        maxBuildingHeight.toString());
                String expectedResult = getLocaleMessage(SECURITYZONE_RULE_EXPECTED_KEY, TEN.toString());

                if (maxBuildingHeight.compareTo(TEN) <= 0) {
                    Map<String, String> details = new HashMap<>();
                    details.put(RULE_NO, subRule);
                    details.put(DESCRIPTION, SECURITY_ZONE);
                    details.put(REQUIRED, expectedResult);
                    details.put(PROVIDED, actualResult);
                    details.put(STATUS, Result.Verify.getResultVal());
                    scrutinyDetail.getDetail().add(details);
                    pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                } else {
                    Map<String, String> details = new HashMap<>();
                    details.put(RULE_NO, subRule);
                    details.put(DESCRIPTION, SECURITY_ZONE);
                    details.put(REQUIRED, expectedResult);
                    details.put(PROVIDED, actualResult);
                    details.put(STATUS, Result.Not_Accepted.getResultVal());
                    scrutinyDetail.getDetail().add(details);
                    pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
                }
            }
        } else {
            scrutinyDetail = new ScrutinyDetail();
            scrutinyDetail.setKey("Common_Security Zone");
            scrutinyDetail.addColumnHeading(1, RULE_NO);
            scrutinyDetail.addColumnHeading(2, DESCRIPTION);
            scrutinyDetail.addColumnHeading(3, DECLARED);
            scrutinyDetail.addColumnHeading(4, STATUS);

            Map<String, String> details = new HashMap<>();
            details.put(RULE_NO, subRule);
            details.put(DESCRIPTION, SECURITY_ZONE);
            details.put(DECLARED, "No");
            details.put(STATUS, Result.Verify.getResultVal());
            scrutinyDetail.getDetail().add(details);
            pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

        }

    }

    private BigDecimal getMaximumDistanceFromRoadEdge(BigDecimal maximumDistanceToRoadEdge, Block block) {
        if (block.getBuilding().getDistanceFromBuildingFootPrintToRoadEnd() != null) {
            for (BigDecimal distanceFromroadEnd : block.getBuilding().getDistanceFromBuildingFootPrintToRoadEnd()) {
                if (distanceFromroadEnd.compareTo(maximumDistanceToRoadEdge) > 0) {
                    maximumDistanceToRoadEdge = distanceFromroadEnd;
                }
            }
        }
        return maximumDistanceToRoadEdge;
    }

    private BigDecimal getMaximumDistanceFromSetBackToBuildingLine(BigDecimal distancceFromSetbackToBuildingLine, Block block) {
        if (block.getBuilding().getDistanceFromSetBackToBuildingLine() != null) {
            for (BigDecimal distance : block.getBuilding().getDistanceFromSetBackToBuildingLine()) {
                if (distance.compareTo(distancceFromSetbackToBuildingLine) > 0) {
                    distancceFromSetbackToBuildingLine = distance;
                }
            }
        }
        return distancceFromSetbackToBuildingLine;
    }

    private BigDecimal getMaximimShortestdistanceFromRoad(Plan pl, BigDecimal maximumDistanceToRoad) {
        if (pl.getNonNotifiedRoads() != null)
            for (NonNotifiedRoad nonnotifiedRoad : pl.getNonNotifiedRoads())
                for (BigDecimal shortDistance : nonnotifiedRoad.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(maximumDistanceToRoad) > 0) {
                        maximumDistanceToRoad = shortDistance;
                    }
        if (pl.getNotifiedRoads() != null)
            for (NotifiedRoad notifiedRoad : pl.getNotifiedRoads())
                for (BigDecimal shortDistance : notifiedRoad.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(maximumDistanceToRoad) > 0) {
                        maximumDistanceToRoad = shortDistance;
                    }
        if (pl.getCuldeSacRoads() != null)
            for (CulDeSacRoad culdRoad : pl.getCuldeSacRoads())
            	if(culdRoad.getShortestDistanceToRoad() != null)
	                for (BigDecimal shortDistance : culdRoad.getShortestDistanceToRoad())
	                    if (shortDistance.compareTo(maximumDistanceToRoad) > 0) {
	                        maximumDistanceToRoad = shortDistance;
	                    }
        if (pl.getLaneRoads() != null)
            for (Lane lane : pl.getLaneRoads())
                for (BigDecimal shortDistance : lane.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(maximumDistanceToRoad) > 0) {
                        maximumDistanceToRoad = shortDistance;
                    }
        return maximumDistanceToRoad;
    }

    private BigDecimal getMinimumShortestdistanceFromRoad(Plan pl, BigDecimal minimumDistanceToRoad) {
        if (pl.getNonNotifiedRoads() != null)
            for (NonNotifiedRoad nonnotifiedRoad : pl.getNonNotifiedRoads())
                for (BigDecimal shortDistance : nonnotifiedRoad.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(minimumDistanceToRoad) <= 0) {
                        minimumDistanceToRoad = shortDistance;
                    }
        if (pl.getNotifiedRoads() != null)
            for (NotifiedRoad notifiedRoad : pl.getNotifiedRoads())
                for (BigDecimal shortDistance : notifiedRoad.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(minimumDistanceToRoad) <= 0) {
                        minimumDistanceToRoad = shortDistance;
                    }
        if (pl.getCuldeSacRoads() != null)
            for (CulDeSacRoad culdRoad : pl.getCuldeSacRoads())
                for (BigDecimal shortDistance : culdRoad.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(minimumDistanceToRoad) <= 0) {
                        minimumDistanceToRoad = shortDistance;
                    }
        if (pl.getLaneRoads() != null)
            for (Lane lane : pl.getLaneRoads())
                for (BigDecimal shortDistance : lane.getShortestDistanceToRoad())
                    if (shortDistance.compareTo(minimumDistanceToRoad) <= 0) {
                        minimumDistanceToRoad = shortDistance;
                    }
        return minimumDistanceToRoad;
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> septicTankAmend = new ConcurrentHashMap<>();
        septicTankAmend.put(AMEND_NOV19, AMEND_DATE_081119);
        return septicTankAmend;
    }

}
