package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.StairLanding;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.GeneralStairDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class GeneralStair extends FeatureProcess {
    private static final Logger LOG = LogManager.getLogger(GeneralStair.class);
    private static final String EXPECTED_WIDTH = "1.2 M";
    private static final String EXPECTED_TREAD = "0.3 M";
    private static final String WIDTH_DESCRIPTION = "Minimum width for general stair %s";
    private static final String TREAD_DESCRIPTION = "Minimum tread for general stair %s";
    private static final String HEIGHT_FLOOR_DESCRIPTION = "Height of floor in layer ";
    private static final String FLOOR = "Floor";
    private static final String FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION = "Flight polyline is not defined in layer ";
    private static final String FLIGHT_WIDTH_DEFINED_DESCRIPTION = "General stair is not defined in layer ";
    private static final String RISER_DESCRIPTION = "Maximum Height of Riser";
    private static final String RULE35_1_5 = "39(1)(5)";
    private static final String RULE_35_1_3a = "35(1)(3a)";
    private static final String RULE_35_1_3b = "35(1)(3b)";
    private static final String RULE_35_1_3c = "35(1)(3c)";
    private static final String RULE_35_1_3d = "35(1)(3d)";
    private static final BigDecimal RISER = BigDecimal.valueOf(0.15);
    private static final BigDecimal minimumWidth = new BigDecimal(1.2);
    private static final BigDecimal minimumTread = new BigDecimal(0.3);
    
    @Autowired
    private LayerNames layerNames;

    @Override
    public Plan validate(Plan plan) {
        return plan;
    }

    @Override
    public Plan process(Plan pl) {
        // validate(planDetail);
        HashMap<String, String> errors = new HashMap<>();
        blk: for (Block block : pl.getBlocks()) {
            if (block.getBuilding() != null && !block.getBuilding().getOccupancies().isEmpty()) {
				if (block.getBuilding() != null && block.getBuilding().getFloorsAboveGround() != null
						&& block.getBuilding().getFloorsAboveGround().intValue() <= 1) {
					continue blk;
				}

                ScrutinyDetail scrutinyDetail2 = new ScrutinyDetail();
                scrutinyDetail2.addColumnHeading(1, RULE_NO);
                scrutinyDetail2.addColumnHeading(2, FLOOR);
                scrutinyDetail2.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail2.addColumnHeading(4, REQUIRED);
                scrutinyDetail2.addColumnHeading(5, PROVIDED);
                scrutinyDetail2.addColumnHeading(6, STATUS);
                scrutinyDetail2.setKey("Block_" + block.getNumber() + "_" + "General Stair - Width");

                ScrutinyDetail scrutinyDetail3 = new ScrutinyDetail();
                scrutinyDetail3.addColumnHeading(1, RULE_NO);
                scrutinyDetail3.addColumnHeading(2, FLOOR);
                scrutinyDetail3.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail3.addColumnHeading(4, REQUIRED);
                scrutinyDetail3.addColumnHeading(5, PROVIDED);
                scrutinyDetail3.addColumnHeading(6, STATUS);
                scrutinyDetail3.setKey("Block_" + block.getNumber() + "_" + "General Stair - Tread");

                ScrutinyDetail stairDefined = new ScrutinyDetail();
                stairDefined.addColumnHeading(1, RULE_NO);
                stairDefined.addColumnHeading(2, REQUIRED);
                stairDefined.addColumnHeading(3, PROVIDED);
                stairDefined.addColumnHeading(4, STATUS);
                stairDefined.setKey("Block_" + block.getNumber() + "_" + "General Stair - Defined Or Not");

                ScrutinyDetail scrutinyDetail6 = new ScrutinyDetail();
                scrutinyDetail6.addColumnHeading(1, RULE_NO);
                scrutinyDetail6.addColumnHeading(2, FLOOR);
                scrutinyDetail6.addColumnHeading(3, DESCRIPTION);
                scrutinyDetail6.addColumnHeading(4, REQUIRED);
                scrutinyDetail6.addColumnHeading(5, PROVIDED);
                scrutinyDetail6.addColumnHeading(6, STATUS);
                scrutinyDetail6.setKey("Block_" + block.getNumber() + "_" + "General Stair - Maximum Height of Riser");

                ScrutinyDetail scrutinyDetail7 = new ScrutinyDetail();
                scrutinyDetail7.addColumnHeading(1, RULE_NO);
                scrutinyDetail7.addColumnHeading(2, FLOOR);
                scrutinyDetail7.addColumnHeading(3, REQUIRED);
                scrutinyDetail7.addColumnHeading(4, PROVIDED);
                scrutinyDetail7.addColumnHeading(5, STATUS);
                scrutinyDetail7.setKey("Block_" + block.getNumber() + "_" + "General Stair - High Rise ");

                BigDecimal generalStairCount = BigDecimal.ZERO;
                BigDecimal noOfFireStair = BigDecimal.ZERO;
                List<Floor> floors = block.getBuilding().getFloors();
                int floorSize = floors.size();
                Floor topMostFloor = floors.stream()
                        .filter(floor -> floor.getTerrace() || floor.getUpperMost())
                        .findAny()
                        .orElse(null);
                for (Floor floor : floors) {

                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getNumber() == topMostFloor.getNumber() : false;
                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getTerrace()?( floor.getNumber() ==
                    // topMostFloor.getNumber() -1):(floor.getNumber() == topMostFloor.getNumber()): false;
                    boolean belowTopMostFloor = false;
                    if (topMostFloor != null) {
                        if (topMostFloor.getTerrace())
                            belowTopMostFloor = (floor.getNumber() >= topMostFloor.getNumber() - 1);
                        else
                            belowTopMostFloor = (floor.getNumber() == topMostFloor.getNumber());

                    }
                    // boolean belowTopMostFloor = topMostFloor != null ? floor.getTerrace()?( floor.getNumber() ==
                    // topMostFloor.getNumber() -1):(floor.getNumber() == topMostFloor.getNumber()): false;

                    boolean isTypicalRepititiveFloor = false;
                    Map<String, Object> typicalFloorValues = Util.getTypicalFloorValues(block, floor, isTypicalRepititiveFloor);

                    List<org.egov.common.entity.edcr.GeneralStair> generalStairs = floor.getGeneralStairs();

                    generalStairCount = Util.roundOffTwoDecimal(generalStairCount.add(BigDecimal.valueOf(generalStairs.size())));

                    // getting the count of fire stair which satisfy general stair
                    long fireStairCount = floor.getFireStairs().stream()
                            .filter(fireStair -> fireStair.isGeneralStair())
                            .count();

                    noOfFireStair = Util.roundOffTwoDecimal(noOfFireStair.add(BigDecimal.valueOf(fireStairCount)));
                    if (generalStairs.size() != 0) {

                        // High Rise Building
                        boolean highRise = Util.roundOffTwoDecimal(block.getBuilding().getBuildingHeight())
                                .compareTo(BigDecimal.valueOf(16)) > 0;
                        if (highRise && !belowTopMostFloor) {
                            if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
                                boolean valid = false;

                                long size = generalStairs.size() + fireStairCount;
                                if (size >= 2) {
                                    valid = true;
                                }

                                String value = typicalFloorValues.get("typicalFloors") != null
                                        ? (String) typicalFloorValues.get("typicalFloors")
                                        : " floor " + floor.getNumber();

                                if (valid) {
                                    setReportOutputDetailsFloorWise(pl, RULE35_1_5, value, String.valueOf(2),
                                            String.valueOf(size), Result.Accepted.getResultVal(), scrutinyDetail7);
                                } else {
                                    setReportOutputDetailsFloorWise(pl, RULE35_1_5, value, String.valueOf(2),
                                            String.valueOf(size), Result.Not_Accepted.getResultVal(), scrutinyDetail7);
                                }
                            }
                        }

                        for (org.egov.common.entity.edcr.GeneralStair gstair : generalStairs) {
                        	GeneralStairDetail generalStair = (GeneralStairDetail) gstair;
                            List<List<Measurement>> flightPolylines = gstair.getFlights().stream().map(f -> f.getFlights()).collect(Collectors.toList());
                            Map<Integer, List<Measurement>> flightMapByColorCode = new HashMap<>();
                            for(List<Measurement> steps : flightPolylines) {
                            	for(Measurement step : steps) {
                            		Integer colorCode = Integer.valueOf(step.getColorCode());
                            		if(flightMapByColorCode.containsKey(colorCode)) {
                            			List<Measurement> existingSteps = flightMapByColorCode.get(colorCode);
                            			existingSteps.add(step);
                            			flightMapByColorCode.put(colorCode, existingSteps);
                            		} else {
                            			List<Measurement> ms = new ArrayList<>();
                            			ms.add(step);
                            			flightMapByColorCode.put(colorCode, ms);
                            		}
                            	}
                            }
                            
                            // Boolean flightPolyLineClosed = generalStair.getFlightPolyLineClosed();
                            String flightLayerName = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_FLIGHT"), block.getNumber(),
                                    floor.getNumber(), generalStair.getNumber());

                            int totalStepsInFloor = 0;
                            if (!floor.getTerrace() && !floor.getUpperMost() && !belowTopMostFloor) {
                                if (!flightMapByColorCode.isEmpty()) {
                                    // if (flightPolyLineClosed) {
                                	
                                	for(Map.Entry<Integer, List<Measurement>> stepsMap : flightMapByColorCode.entrySet()) {
                                		int failedWidthCount = 0;
                                    	int failedTreadCount = 0;
                                    	int totalSteps = stepsMap.getValue().size();
                                    	totalStepsInFloor = totalStepsInFloor + totalSteps;
                                    	Integer flightColor = stepsMap.getKey();
                                    	for(Measurement sm : stepsMap.getValue()) {
                                    		if (sm.getHeight().setScale(2, RoundingMode.HALF_UP).compareTo(minimumWidth) < 0)
                                    			failedWidthCount++;
                                    		if(sm.getWidth().setScale(2, RoundingMode.HALF_UP).compareTo(minimumTread) < 0)
                                    			failedTreadCount++;
                                    	}

										if (!(Boolean) typicalFloorValues.get("isTypicalRepititiveFloor")) {
											String value = typicalFloorValues.get("typicalFloors") != null
													? (String) typicalFloorValues.get("typicalFloors")
													: " floor " + floor.getNumber();

											if (failedWidthCount > 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3a, value,
														String.format(WIDTH_DESCRIPTION, generalStair.getNumber()),
														EXPECTED_WIDTH,
														failedWidthCount + " out of " + totalSteps
																+ " steps in the flight-" + flightColor
																+ " are not having the minimum width",
														Result.Not_Accepted.getResultVal(), scrutinyDetail2);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3a, value,
														String.format(WIDTH_DESCRIPTION, generalStair.getNumber()),
														EXPECTED_WIDTH,
														totalSteps + " steps in the flight-"
																+ flightColor + " are having the minimum width",
														Result.Accepted.getResultVal(), scrutinyDetail2);

											}

											if (failedTreadCount > 0) {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3b, value,
														String.format(TREAD_DESCRIPTION, generalStair.getNumber()),
														EXPECTED_TREAD,
														failedTreadCount + " out of " + totalSteps
																+ " steps in the flight-" + flightColor
																+ " are not having the minimum tread",
														Result.Not_Accepted.getResultVal(), scrutinyDetail3);
											} else {
												setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3b, value,
														String.format(TREAD_DESCRIPTION, generalStair.getNumber()),
														EXPECTED_TREAD,
														totalSteps + " steps in the flight-"
																+ flightColor + " are having the minimum tread",
														Result.Accepted.getResultVal(), scrutinyDetail3);
											}
										}
                                	}
                                } else {
                                    errors.put("Flight PolyLine width" + flightLayerName,
                                            FLIGHT_WIDTH_DEFINED_DESCRIPTION + flightLayerName);
                                    pl.addErrors(errors);
                                }

                                /**
                                     * (Total length of polygons in layer BLK_n_FLR_i_STAIR_k_FLIGHT) / (Number of rises - number
                                     * of polygons in layer BLK_n_FLR_i_STAIR_k_FLIGHT - number of lines in layer
                                     * BLK_n_FLR_i_STAIR_k_FLIGHT) shall not be more than 0.30 m
                                     */
                                    if (!flightMapByColorCode.isEmpty()) {
                                        try {
                                        	int landingSize = 0;
                                        	for(StairLanding lds : gstair.getLandings())
                                        		landingSize = landingSize + lds.getLandings().size();
                                        	int noOfRisesInFloor = totalStepsInFloor + landingSize + 1;
                                        	
                                            if (generalStair != null && generalStair.getFloorHeight() != null && generalStair.getFloorHeight().doubleValue() > 0) {
                                            	
                                                BigDecimal providedRise = generalStair.getFloorHeight().divide(BigDecimal.valueOf(noOfRisesInFloor),
                                                        DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                                                        DcrConstants.ROUNDMODE_MEASUREMENTS);
                                                String value = typicalFloorValues.get("typicalFloors") != null
                                                        ? (String) typicalFloorValues.get("typicalFloors")
                                                        : " floor " + floor.getNumber();

                                                
                                                if (providedRise.compareTo(RISER) <= 0) {
                                                    setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3c, value,
                                                            String.format(RISER_DESCRIPTION, generalStair.getNumber()),
                                                            String.valueOf(RISER), String.valueOf(providedRise),
                                                            Result.Accepted.getResultVal(), scrutinyDetail6);
                                                } else {
                                                    setReportOutputDetailsFloorStairWise(pl, RULE_35_1_3c, value,
                                                            String.format(RISER_DESCRIPTION, generalStair.getNumber()),
                                                            String.valueOf(RISER), String.valueOf(providedRise),
                                                            Result.Not_Accepted.getResultVal(), scrutinyDetail6);
                                                }

                                            } else {
                                                String layerName = String.format(DxfFileConstants.LAYER_STAIR_FLOOR,
                                                        block.getNumber(), floor.getNumber(), generalStair.getNumber());
                                                errors.put("FLR_HT_M " + layerName,
                                                        edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                                                new String[] { HEIGHT_FLOOR_DESCRIPTION + layerName },
                                                                LocaleContextHolder.getLocale()));
                                                pl.addErrors(errors);
                                            }
                                        } catch (ArithmeticException e) {
                                            LOG.info("Denominator is zero");
                                        }
                                    } else {
                                        errors.put("Flight PolyLine length" + flightLayerName,
                                        		FLIGHT_POLYLINE_NOT_DEFINED_DESCRIPTION + flightLayerName);
                                        pl.addErrors(errors);
                                    }
                                } 
                            }

                        }
                    }

                if (floorSize > 3) {
                    if (noOfFireStair.add(generalStairCount)
                            .compareTo(Util.roundOffTwoDecimal(BigDecimal.valueOf(2))) >= 0) {
                        setReportOutputDetails(pl, RULE35_1_5, String.format(RULE35_1_5, block.getNumber()), "",
                                DcrConstants.OBJECTDEFINED_DESC, Result.Accepted.getResultVal(), stairDefined);
                        setReportOutputDetails(pl, RULE_35_1_3d, String.format(RULE_35_1_3d, block.getNumber()), "The height of stair handrails shall not be less than 90 cm",
                                "", Result.Verify.getResultVal(), stairDefined);
                    } else {
                        setReportOutputDetails(pl, RULE35_1_5, String.format(RULE35_1_5, block.getNumber()),
                                "Minimum 2 General stair required",
                                DcrConstants.OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal(), stairDefined);
                    }
                }
            }
        }
        return pl;
    }

    private void setReportOutputDetails(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void setReportOutputDetailsFloorWise(Plan pl, String ruleNo, String floor, String expected, String actual,
            String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(FLOOR, floor);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    private void setReportOutputDetailsFloorStairWise(Plan pl, String ruleNo, String floor, String description,
            String expected, String actual, String status, ScrutinyDetail scrutinyDetail) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(FLOOR, floor);
        details.put(DESCRIPTION, description);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }

}
