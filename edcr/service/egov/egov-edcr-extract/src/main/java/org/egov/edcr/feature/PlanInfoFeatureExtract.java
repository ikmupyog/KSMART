package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.OPENING_ABOVE_2_1_ON_REAR_LESS_1M;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.PlanInformation;
import org.egov.common.entity.edcr.SetBack;
import org.egov.common.entity.edcr.VirtualBuilding;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.entity.blackbox.PlotDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanInfoFeatureExtract extends FeatureExtract {
	private static final Logger LOG = LogManager.getLogger(PlanInfoFeatureExtract.class);
	public static final String MSG_ERROR_MANDATORY = "msg.error.mandatory.object.not.defined";
	private String digitsRegex = "[^\\d.]";
	private static final BigDecimal ONEHUDREDTWENTYFIVE = BigDecimal.valueOf(125);
	@Autowired
	private LayerNames layerNames;
	@Autowired
	private Util util;

	@Override
	public PlanDetail extract(PlanDetail pl) {
		LOG.info("Starting plan info extraction.....");
		pl.setPlanInformation(extractPlanInfo(pl));

		VirtualBuilding virtualBuilding = new VirtualBuilding();

		pl.setVirtualBuilding(virtualBuilding);

		extractPlotDetails(pl);

		extractBuildingFootprint(pl);
		extractBuildingBasementFootprint(pl);
		LOG.info("Starting plan info extraction end.");
		return pl;

	}

	@Override
	public PlanDetail validate(PlanDetail planDetail) {
		return planDetail;
	}

	public PlanDetail process(PlanDetail planDetail) {
		return planDetail;

	}

	private void extractPlotDetails(PlanDetail pl) {
		List<DXFLWPolyline> plotBoundaries = Util.getPolyLinesByLayer(pl.getDoc(),
				layerNames.getLayerName("LAYER_NAME_PLOT_BOUNDARY"));
		if (!plotBoundaries.isEmpty()) {
			DXFLWPolyline plotBndryPolyLine = plotBoundaries.get(0);
			((PlotDetail) pl.getPlot()).setPolyLine(plotBndryPolyLine);
			pl.getPlot().setPlotBndryArea(Util.getPolyLineArea(plotBndryPolyLine));
		} else
			pl.addError(layerNames.getLayerName("LAYER_NAME_PLOT_BOUNDARY"),
					getLocaleMessage(OBJECTNOTDEFINED, layerNames.getLayerName("LAYER_NAME_PLOT_BOUNDARY")));
	}

	private void extractBuildingFootprint(PlanDetail pl) {

		List<DXFLWPolyline> polyLinesByLayer;
		String buildingFootPrint = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "\\d+_"
				+ layerNames.getLayerName("LAYER_NAME_LEVEL_NAME_PREFIX") + "\\d+_"
				+ layerNames.getLayerName("LAYER_NAME_BUILDING_FOOT_PRINT");
		List<String> layerNames1 = Util.getLayerNamesLike(pl.getDoc(), buildingFootPrint);
		for (String s : layerNames1) {
			polyLinesByLayer = Util.getPolyLinesByLayer(pl.getDoc(), s);
			if (polyLinesByLayer.size() > 1) {
				HashMap<String, String> errors = new HashMap<>();
				errors.put(s, getEdcrMessageSource().getMessage(DcrConstants.MORETHANONEPOLYLINEDEFINED,
						new String[] { s }, null));
				pl.addErrors(errors);
			}
			if (!polyLinesByLayer.isEmpty())
				if (pl.getBlockByName(s.split("_")[1]) == null) {
					Block block = new Block();
					block.setName(s.split("_")[1]);
					block.setNumber(String.valueOf(s.split("_")[1]));
					SetBack setBack = new SetBack();
					setBack.setLevel(Integer.valueOf(String.valueOf(s.split("_")[3])));
					MeasurementDetail footPrint = new MeasurementDetail(polyLinesByLayer.get(0));
					footPrint.setPresentInDxf(true);
					setBack.setBuildingFootPrint(footPrint);
					block.getSetBacks().add(setBack);
					pl.getBlocks().add(block);
				} else {
					Block block = pl.getBlockByName(s.split("_")[1]);
					block.setName(s.split("_")[1]);
					block.setNumber(String.valueOf(s.split("_")[1]));

					SetBack setBack = new SetBack();
					setBack.setLevel(Integer.valueOf(String.valueOf(s.split("_")[3])));
					Measurement footPrint = new MeasurementDetail(polyLinesByLayer.get(0));
					footPrint.setPresentInDxf(true);
					setBack.setBuildingFootPrint(footPrint);
					block.getSetBacks().add(setBack);

				}

		}

		if (pl.getBlocks().isEmpty())
			pl.addError(layerNames.getLayerName("LAYER_NAME_BUILDING_FOOT_PRINT"),
					getEdcrMessageSource().getMessage(DcrConstants.OBJECTNOTDEFINED,
							new String[] { layerNames.getLayerName("LAYER_NAME_BUILDING_FOOT_PRINT") }, null));

		for (Block b : pl.getBlocks()) {
			String layerName = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + b.getNumber() + "_"
					+ layerNames.getLayerName("LAYER_NAME_HEIGHT_OF_BUILDING");
			BigDecimal height = Util.getSingleDimensionValueByLayer(pl.getDoc(), layerName, pl);
			b.setHeight(height);
			b.getBuilding().setBuildingHeight(height);
			b.getBuilding().setDeclaredBuildingHeight(height);
			if (height.compareTo(BigDecimal.valueOf(16)) > 0)
				b.getBuilding().setIsHighRise(true);
		}
	}

	private void extractBuildingBasementFootprint(PlanDetail pl) {

		List<DXFLWPolyline> polyLinesByLayer;
		String basementFootPrint = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "\\d+_"
				//+ layerNames.getLayerName("LAYER_NAME_LEVEL_NAME_PREFIX") + "-\\d+_"
				+ layerNames.getLayerName("LAYER_NAME_BSMNT_FOOT_PRINT");
		List<String> layerNames = Util.getLayerNamesLike(pl.getDoc(), basementFootPrint);
		for (String s : layerNames) {
			polyLinesByLayer = Util.getPolyLinesByLayer(pl.getDoc(), s);
			if (polyLinesByLayer.size() > 1) {
				HashMap<String, String> errors = new HashMap<>();
				errors.put(s, getEdcrMessageSource().getMessage(DcrConstants.MORETHANONEPOLYLINEDEFINED,
						new String[] { s }, null));
				pl.addErrors(errors);
			}
			if (!polyLinesByLayer.isEmpty())
				if (pl.getBlockByName(s.split("_")[1]) == null) {
					Block block = new Block();
					block.setName(s.split("_")[1]);
					block.setNumber(String.valueOf(s.split("_")[1]));
					SetBack setBack = new SetBack();
					setBack.setLevel(-1);
					MeasurementDetail footPrint = new MeasurementDetail(polyLinesByLayer.get(0));
					footPrint.setPresentInDxf(true);
					setBack.setBuildingFootPrint(footPrint);
					block.getSetBacks().add(setBack);
					pl.getBlocks().add(block);
				} else {
					Block block = pl.getBlockByName(s.split("_")[1]);
					block.setName(s.split("_")[1]);
					block.setNumber(String.valueOf(s.split("_")[1]));

					SetBack setBack = new SetBack();
					setBack.setLevel(-1);
					Measurement footPrint = new MeasurementDetail(polyLinesByLayer.get(0));
					footPrint.setPresentInDxf(true);
					setBack.setBuildingFootPrint(footPrint);
					block.getSetBacks().add(setBack);

				}

		}
	}

	private PlanInformation extractPlanInfo(PlanDetail pl) {
		PlanInformation pi = pl.getPlanInformation();
		Map<String, String> planInfoProperties = util.getFormatedPlanInfoProperties(pl.getDoc());
		pl.setPlanInfoProperties(planInfoProperties);

		String architectName = planInfoProperties.get(DxfFileConstants.ARCHITECT_NAME);
		if (StringUtils.isNotBlank(architectName))
			pi.setArchitectInformation(architectName);

		String plotArea = planInfoProperties.get(DxfFileConstants.PLOT_AREA);
		PlotDetail plot = new PlotDetail();
		if (plotArea == null) {
			pl.addError(DxfFileConstants.PLOT_AREA,
					DxfFileConstants.PLOT_AREA + " is not defined in the Plan Information Layer");
			plot.setPresentInDxf(false);
			pl.setPlot(plot);
		} else {
			plotArea = plotArea.replaceAll(digitsRegex, "");
			BigDecimal numericValue = getNumericValue(plotArea, pl, DxfFileConstants.PLOT_AREA);
			if (numericValue != null) {
				pi.setPlotArea(numericValue);
				plot.setArea(numericValue);
				if (numericValue.compareTo(ONEHUDREDTWENTYFIVE) <= 0)
					plot.setSmallPlot(true);
			}
			plot.setPresentInDxf(true);
			pl.setPlot(plot);
		}

		String noOfSeats = planInfoProperties.get(DxfFileConstants.SEATS_SP_RESI);
		if (StringUtils.isNotBlank(noOfSeats)) {
			noOfSeats = noOfSeats.replaceAll("[^\\d.]", "");
			if (getNumericValue(noOfSeats, pl, DxfFileConstants.SEATS_SP_RESI) != null)
				pi.setNoOfSeats(getNumericValue(noOfSeats, pl, DxfFileConstants.SEATS_SP_RESI).intValue());
		}

		String noOfMechanicalParking = planInfoProperties.get(layerNames.getLayerName("LAYER_NAME_MECHANICAL_PARKING"));
		if (StringUtils.isNotBlank(noOfMechanicalParking)) {
			noOfMechanicalParking = noOfMechanicalParking.replaceAll("[^\\d.]", "");
			if (getNumericValue(noOfMechanicalParking, pl,
					layerNames.getLayerName("LAYER_NAME_MECHANICAL_PARKING")) != null)
				pi.setNoOfMechanicalParking(getNumericValue(noOfMechanicalParking, pl,
						layerNames.getLayerName("LAYER_NAME_MECHANICAL_PARKING")).intValue());
		}
		
        String powerUsedHp = planInfoProperties.get(DxfFileConstants.POWER_USED_HP);
        if (StringUtils.isNotBlank(powerUsedHp)) {
            powerUsedHp = powerUsedHp.replaceAll("[^\\d.]", "");
            if (getNumericValue(powerUsedHp, pl, DxfFileConstants.POWER_USED_HP) != null)
                pi.setPowerUsedHp(getNumericValue(powerUsedHp, pl, DxfFileConstants.POWER_USED_HP).intValue());
        }

        String numberOfWorkers = planInfoProperties.get(DxfFileConstants.NO_OF_WORKERS);
        if (StringUtils.isNotBlank(numberOfWorkers)) {
            numberOfWorkers = numberOfWorkers.replaceAll("[^\\d.]", "");
            if (getNumericValue(numberOfWorkers, pl, DxfFileConstants.NO_OF_WORKERS) != null)
                pi.setNumberOfWorkers(getNumericValue(numberOfWorkers, pl, DxfFileConstants.NO_OF_WORKERS).intValue());
        }

		String demolitionArea = planInfoProperties
				.get(layerNames.getLayerName("LAYER_NAME_EXISTING_FLOOR_AREA_TO_BE_DEMOLISHED"));
		if (StringUtils.isNotBlank(demolitionArea)) {
			demolitionArea = demolitionArea.replaceAll(digitsRegex, "");
			if (getNumericValue(demolitionArea, pl,
					layerNames.getLayerName("LAYER_NAME_EXISTING_FLOOR_AREA_TO_BE_DEMOLISHED")) != null)
				pi.setDemolitionArea(getNumericValue(demolitionArea, pl,
						layerNames.getLayerName("LAYER_NAME_EXISTING_FLOOR_AREA_TO_BE_DEMOLISHED")));
		}
		
        String alteredArea = planInfoProperties.get(DxfFileConstants.ALTERED_AREA);
        if (StringUtils.isNotBlank(alteredArea)) {
            alteredArea = alteredArea.replaceAll(digitsRegex, "");
            if (getNumericValue(alteredArea, pl, DxfFileConstants.ALTERED_AREA) != null)
                pi.setAlteredArea(getNumericValue(alteredArea, pl, DxfFileConstants.ALTERED_AREA));
        }

		String singleFamilyBldg = planInfoProperties.get(DxfFileConstants.SINGLE_FAMILY_BLDG);
		if (StringUtils.isNotBlank(singleFamilyBldg))
			if (singleFamilyBldg.equalsIgnoreCase(DcrConstants.YES))
				pi.setSingleFamilyBuilding(true);
			else
				pi.setSingleFamilyBuilding(false);

		String crzZone = planInfoProperties.get(DxfFileConstants.CRZ_ZONE);
		if (StringUtils.isNotBlank(crzZone)) {
			String value = crzZone;
			if (value.equalsIgnoreCase(DcrConstants.YES)) {
				pi.setCrzZoneArea(true);
				//pi.setCrzZoneDesc(DcrConstants.YES);
			} else if (value.equalsIgnoreCase(DcrConstants.NO)) {
				pi.setCrzZoneArea(false);
				//pi.setCrzZoneDesc(DcrConstants.NO);
			} else
				pl.addError(DxfFileConstants.CRZ_ZONE,
						DxfFileConstants.CRZ_ZONE + " cannot be accepted , should be either YES/NO.");
		} /*
			 * else pl.addError(DxfFileConstants.CRZ_ZONE, DxfFileConstants.CRZ_ZONE +
			 * " cannot be accepted , should be either YES/NO.");
			 */

		String securityZone = planInfoProperties.get(DxfFileConstants.SECURITY_ZONE);
		if (StringUtils.isNotBlank(securityZone))
			if (securityZone.equalsIgnoreCase(DcrConstants.YES)) {
				pi.setSecurityZone(true);
				//pi.setSecurityZoneDesc(DcrConstants.YES);
			} else if (securityZone.equalsIgnoreCase(DcrConstants.NO)) {
				pi.setSecurityZone(false);
				//pi.setSecurityZoneDesc(DcrConstants.NO);
			} else
				pl.addError(DxfFileConstants.SECURITY_ZONE,
						DxfFileConstants.SECURITY_ZONE + " cannot be accepted , should be either YES/NO.");

		// Labels changed check
        if (planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_SIDE_LESS_1M_OR_EQ_0_POINT_6) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_SIDE_LESS_1M_AS_PER_AMD_NOV19) != null) {
            String openingBelow2mside = planInfoProperties
                    .get(DxfFileConstants.OPENING_BELOW_2_1_ON_SIDE_LESS_1M_OR_EQ_0_POINT_6);
            if (StringUtils.isBlank(openingBelow2mside))
                openingBelow2mside = planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_SIDE_LESS_1M_AS_PER_AMD_NOV19);
            if (openingBelow2mside.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setOpeningOnSideBelow2mts(true);
                pi.setOpeningOnSide(true);
                pi.setOpeningOnSideBelow2mtsDesc(DcrConstants.YES);
            } else if (openingBelow2mside.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setOpeningOnSideBelow2mts(false);
                pi.setOpeningOnSideBelow2mtsDesc(DcrConstants.NO);
            } else {
                // pi.setOpeningOnSideBelow2mts(null);
                pi.setOpeningOnSideBelow2mtsDesc(DcrConstants.NA);
            }
        } else {
            // pi.setOpeningOnSideBelow2mts(null);
            pi.setOpeningOnSideBelow2mtsDesc(DcrConstants.NA);
        }
        // Labels changed check
        if (planInfoProperties.get(OPENING_ABOVE_2_1_ON_REAR_LESS_1M) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_REAR_LESS_1M_AS_PER_AMD_NOV19) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_REAR_LESS_1M_AS_PER_AMD_OCT20) != null) {
            String openingAbove2mrear = planInfoProperties.get(OPENING_ABOVE_2_1_ON_REAR_LESS_1M);
            if (StringUtils.isBlank(openingAbove2mrear))
                openingAbove2mrear = planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_REAR_LESS_1M_AS_PER_AMD_OCT20);
            if (StringUtils.isBlank(openingAbove2mrear))
                openingAbove2mrear = planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_REAR_LESS_1M_AS_PER_AMD_NOV19);
            if (openingAbove2mrear.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setOpeningOnRearAbove2mts(true);
                pi.setOpeningOnRearAbove2mtsDesc(DcrConstants.YES);
            } else if (openingAbove2mrear.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setOpeningOnRearAbove2mts(false);
                pi.setOpeningOnRearAbove2mtsDesc(DcrConstants.NO);
            } else {
                // pi.setOpeningOnRearAbove2mts(null);
                pi.setOpeningOnRearAbove2mtsDesc(DcrConstants.NA);
            }
        } else {
            // pi.setOpeningOnRearAbove2mts(null);
            pi.setOpeningOnRearAbove2mtsDesc(DcrConstants.NA);
        }
        if (planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_SIDE_LESS_1M_OR_EQ_0_POINT_6) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_SIDE_LESS_1M_AS_PER_AMD_NOV19) != null) {
            String openingAbove2mSide = planInfoProperties
                    .get(DxfFileConstants.OPENING_ABOVE_2_1_ON_SIDE_LESS_1M_OR_EQ_0_POINT_6);
            if (StringUtils.isBlank(openingAbove2mSide))
                openingAbove2mSide = planInfoProperties.get(DxfFileConstants.OPENING_ABOVE_2_1_ON_SIDE_LESS_1M_AS_PER_AMD_NOV19);
            if (openingAbove2mSide.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setOpeningOnSideAbove2mts(true);
                pi.setOpeningOnSide(true);
                pi.setOpeningOnSideAbove2mtsDesc(DcrConstants.YES);
            } else if (openingAbove2mSide.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setOpeningOnSideAbove2mts(false);
                pi.setOpeningOnSideAbove2mtsDesc(DcrConstants.NO);
            } else {
                // pi.setOpeningOnSideAbove2mts(null);
                pi.setOpeningOnSideAbove2mtsDesc(DcrConstants.NA);
            }
        } else {
            // pi.setOpeningOnSideAbove2mts(null);
            pi.setOpeningOnSideAbove2mtsDesc(DcrConstants.NA);
        }
        // Labels changed check
        if (planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M_AS_PER_AMD_NOV19) != null
                || planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M_AS_PER_AMD_OCT20) != null) {
            String openingBelow2mrear = planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M);
            if (StringUtils.isBlank(openingBelow2mrear))
                openingBelow2mrear = planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M_AS_PER_AMD_OCT20);
            if (StringUtils.isBlank(openingBelow2mrear))
                openingBelow2mrear = planInfoProperties.get(DxfFileConstants.OPENING_BELOW_2_1_ON_REAR_LESS_1M_AS_PER_AMD_NOV19);
            if (openingBelow2mrear.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setOpeningOnRearBelow2mts(true);
                pi.setOpeningOnRearBelow2mtsDesc(DcrConstants.YES);
            } else if (openingBelow2mrear.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setOpeningOnRearBelow2mts(false);
                pi.setOpeningOnRearBelow2mtsDesc(DcrConstants.NO);
            } else {
                // pi.setOpeningOnRearBelow2mts(null);
                pi.setOpeningOnRearBelow2mtsDesc(DcrConstants.NA);
            }
        } else {
            // pi.setOpeningOnRearBelow2mts(null);
            pi.setOpeningOnRearBelow2mtsDesc(DcrConstants.NA);
        }

        // Labels changed check
        if (planInfoProperties.get(DxfFileConstants.NOC_TO_ABUT_SIDE) != null) {
            String nocAbutSide = planInfoProperties.get(DxfFileConstants.NOC_TO_ABUT_SIDE);
            if (nocAbutSide.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setNocToAbutSide(true);
                pi.setNocToAbutSideDesc(DcrConstants.YES);
            } else if (nocAbutSide.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setNocToAbutSide(false);
                pi.setNocToAbutSideDesc(DcrConstants.NO);
            } else {
                // pi.setNocToAbutSide(null);
                pi.setNocToAbutSideDesc(DcrConstants.NA);
            }
        } else {
            // pi.setNocToAbutSide(null);
            pi.setNocToAbutSideDesc(DcrConstants.NA);
        }
        // Labels changed check
        if (planInfoProperties.get(DxfFileConstants.NOC_TO_ABUT_REAR) != null) {
            String nocAbutRear = planInfoProperties.get(DxfFileConstants.NOC_TO_ABUT_REAR);
            if (nocAbutRear.equalsIgnoreCase(DcrConstants.YES)) {
                // pi.setNocToAbutRear(true);
                pi.setNocToAbutRearDesc(DcrConstants.YES);
            } else if (nocAbutRear.equalsIgnoreCase(DcrConstants.NO)) {
                // pi.setNocToAbutRear(false);
                pi.setNocToAbutRearDesc(DcrConstants.NO);
            } else {
                // pi.setNocToAbutRear(null);
                pi.setNocToAbutRearDesc(DcrConstants.NA);
            }
        } else {
            // pi.setNocToAbutRear(null);
            pi.setNocToAbutRearDesc(DcrConstants.NA);
        }

		String reSurveyNo = planInfoProperties.get(DxfFileConstants.RESURVEY_NO);
		if (StringUtils.isNotBlank(reSurveyNo))
			pi.setReSurveyNo(reSurveyNo);

		String revenueWard = planInfoProperties.get(DxfFileConstants.REVENUE_WARD);
		if (StringUtils.isNotBlank(revenueWard))
			pi.setRevenueWard(revenueWard);

		String village = planInfoProperties.get(DxfFileConstants.VILLAGE);
		if (StringUtils.isNotBlank(village))
			pi.setVillage(village);

		String desam = planInfoProperties.get(DxfFileConstants.DESAM);
		if (StringUtils.isNotBlank(desam))
			pi.setDesam(desam);

        if (!planInfoProperties.isEmpty()) {
            String accessWidth = planInfoProperties.get(DxfFileConstants.ACCESS_WIDTH);
            if (accessWidth == null) {

                Set<String> keySet = planInfoProperties.keySet();
                for (String s : keySet)
                    if (s.contains(DxfFileConstants.ACCESS_WIDTH)) {
                        accessWidth = planInfoProperties.get(s);
                        pl.addError(DxfFileConstants.ACCESS_WIDTH,
                                DxfFileConstants.ACCESS_WIDTH + " is invalid .Text in dxf file is " + s);
                    }

            }

            if (accessWidth == null)
                pl.addError(DxfFileConstants.ACCESS_WIDTH, DxfFileConstants.ACCESS_WIDTH + "  Is not defined");
            else {
                accessWidth = accessWidth.replaceAll(digitsRegex, "");

                pi.setAccessWidth(getNumericValue(accessWidth, pl, DxfFileConstants.ACCESS_WIDTH));

            }
        } else
            pi.setAccessWidth(BigDecimal.ZERO);

        String accessOfHeadRoom = planInfoProperties.get(DxfFileConstants.ACCESS_HEAD_ROOM);
        if(accessOfHeadRoom == null || accessOfHeadRoom.equals(DcrConstants.NA))
        	pi.setAccessHeadRoom(null);
        else {
        	accessOfHeadRoom = accessOfHeadRoom.replaceAll(digitsRegex, "");
        	pi.setAccessHeadRoom(getNumericValue(accessOfHeadRoom, pl, DxfFileConstants.ACCESS_HEAD_ROOM));
        }
        
		String depthCutting = planInfoProperties.get(DxfFileConstants.DEPTH_CUTTING);
		if (StringUtils.isNotBlank(depthCutting))
			if (depthCutting.equalsIgnoreCase(DcrConstants.YES)) {
				pi.setDepthCutting(true);
				pi.setDepthCuttingDesc(DcrConstants.YES);
			} else if (depthCutting.equalsIgnoreCase(DcrConstants.NO)) {
				pi.setDepthCutting(false);
				pi.setDepthCuttingDesc(DcrConstants.NO);
			} else
				pl.addError(DxfFileConstants.DEPTH_CUTTING,
						DxfFileConstants.DEPTH_CUTTING + " cannot be accepted , should be either YES/NO.");
		
		String depthHeightCutting = planInfoProperties.get(DxfFileConstants.DEPTH_HEIGHT_CUTTING);
		if (StringUtils.isNotBlank(depthHeightCutting))
			if (depthHeightCutting.equalsIgnoreCase(DcrConstants.YES)) {
				pi.setDepthHeightCutting(DcrConstants.YES);
			} else if (depthHeightCutting.equalsIgnoreCase(DcrConstants.NO)) {
				pi.setDepthHeightCutting(DcrConstants.NO);
			} else
				pl.addError(DxfFileConstants.DEPTH_HEIGHT_CUTTING,
						DxfFileConstants.DEPTH_HEIGHT_CUTTING + " cannot be accepted , should be either YES/NO.");

		String governmentAided = planInfoProperties.get(DxfFileConstants.GOVERNMENT_AIDED);
		if (StringUtils.isNotBlank(governmentAided))
			if (governmentAided.equalsIgnoreCase(DcrConstants.YES))
				pi.setGovernmentOrAidedSchool(true);
			else if (governmentAided.equalsIgnoreCase(DcrConstants.NO))
				pi.setGovernmentOrAidedSchool(false);
			else
				pl.addError(DxfFileConstants.GOVERNMENT_AIDED,
						DxfFileConstants.GOVERNMENT_AIDED + " cannot be accepted , should be either YES/NO.");

		if (planInfoProperties.get(DxfFileConstants.PLOT_IN_COMMERCIAL_ZONE) != null) {
            String plotInCommZone = planInfoProperties.get(DxfFileConstants.PLOT_IN_COMMERCIAL_ZONE);
            if (plotInCommZone.equalsIgnoreCase(DcrConstants.YES)) {
                pi.setPlotInCommercialZone(DcrConstants.YES);
            } else if (plotInCommZone.equalsIgnoreCase(DcrConstants.NO)) {
                pi.setPlotInCommercialZone(DcrConstants.NO);
            } else {
                pi.setPlotInCommercialZone(DcrConstants.NA);
            }
        } else {
            pi.setPlotInCommercialZone(DcrConstants.NA);
        }

        if (planInfoProperties.get(DxfFileConstants.COMMERCIAL_ZONE_BLDG_OPENING_ON_SIDE1) != null) {
            String commZoneBldOpenOnSide1 = planInfoProperties.get(DxfFileConstants.COMMERCIAL_ZONE_BLDG_OPENING_ON_SIDE1);
            if (commZoneBldOpenOnSide1.equalsIgnoreCase(DcrConstants.YES)) {
                pi.setCommercialZoneBldgOpenOnSide1(DcrConstants.YES);
            } else if (commZoneBldOpenOnSide1.equalsIgnoreCase(DcrConstants.NO)) {
                pi.setCommercialZoneBldgOpenOnSide1(DcrConstants.NO);
            } else {
                pi.setCommercialZoneBldgOpenOnSide1(DcrConstants.NA);
            }
        } else {
            pi.setCommercialZoneBldgOpenOnSide1(DcrConstants.NA);
        }
        if (planInfoProperties.get(DxfFileConstants.COMMERCIAL_ZONE_BLDG_OPENING_ON_SIDE2) != null) {
            String commZoneBldOpenOnSide2 = planInfoProperties.get(DxfFileConstants.COMMERCIAL_ZONE_BLDG_OPENING_ON_SIDE2);
            if (commZoneBldOpenOnSide2.equalsIgnoreCase(DcrConstants.YES)) {
                pi.setCommercialZoneBldgOpenOnSide2(DcrConstants.YES);
            } else if (commZoneBldOpenOnSide2.equalsIgnoreCase(DcrConstants.NO)) {
                pi.setCommercialZoneBldgOpenOnSide2(DcrConstants.NO);
            } else {
                pi.setCommercialZoneBldgOpenOnSide2(DcrConstants.NA);
            }
        } else {
            pi.setCommercialZoneBldgOpenOnSide2(DcrConstants.NA);
        }
        
		String noOfBeds = planInfoProperties.get(DxfFileConstants.NO_OF_BEDS);
		if (StringUtils.isNotBlank(noOfBeds)) {
			noOfBeds = noOfBeds.replaceAll(digitsRegex, "");
			if (getNumericValue(noOfBeds, pl, DxfFileConstants.NO_OF_BEDS.toString()) != null)
				pi.setNoOfBeds(BigDecimal.valueOf(Integer.valueOf(noOfBeds)));
		}

		/*
		 * String roadWidth = planInfoProperties.get(DxfFileConstants.ROAD_WIDTH); if
		 * (StringUtils.isNotBlank(roadWidth)) { roadWidth =
		 * roadWidth.replaceAll(digitsRegex, ""); BigDecimal roadWidthValue =
		 * getNumericValue(roadWidth, pl, DxfFileConstants.ROAD_WIDTH);
		 * pi.setRoadWidth(roadWidthValue); } else
		 * pl.addError(DxfFileConstants.ROAD_WIDTH, getLocaleMessage(OBJECTNOTDEFINED,
		 * DxfFileConstants.ROAD_WIDTH + " of PLAN_INFO layer"));
		 * 
		 * String roadLength = planInfoProperties.get(DxfFileConstants.ROAD_LENGTH); if
		 * (StringUtils.isNotBlank(roadLength)) { roadLength =
		 * roadLength.replaceAll(digitsRegex, ""); BigDecimal roadLengthValue =
		 * getNumericValue(roadLength, pl, DxfFileConstants.ROAD_LENGTH);
		 * pi.setRoadLength(roadLengthValue); }
		 */ /*
			 * else pl.addError(DxfFileConstants.ROAD_LENGTH,
			 * getLocaleMessage(OBJECTNOTDEFINED, DxfFileConstants.ROAD_LENGTH +
			 * " of PLAN_INFO layer"));
			 */

		/*
		 * String areaType = planInfoProperties.get(DxfFileConstants.AREA_TYPE); if
		 * (StringUtils.isNotBlank(areaType)) pi.setTypeOfArea(areaType); else
		 * pl.addError(DxfFileConstants.AREA_TYPE, getLocaleMessage(OBJECTNOTDEFINED,
		 * DxfFileConstants.AREA_TYPE + " of PLAN_INFO layer"));
		 */

		/*
		 * String plotDepth = planInfoProperties.get(DxfFileConstants.AVG_PLOT_DEPTH);
		 * if (StringUtils.isNotBlank(plotDepth)) { plotDepth =
		 * plotDepth.replaceAll(digitsRegex, ""); BigDecimal plotDepthValue =
		 * getNumericValue(plotDepth, pl, DxfFileConstants.AVG_PLOT_DEPTH);
		 * pi.setDepthOfPlot(plotDepthValue); } else
		 * pl.addError(DxfFileConstants.AVG_PLOT_DEPTH,
		 * getLocaleMessage(OBJECTNOTDEFINED, DxfFileConstants.AVG_PLOT_DEPTH +
		 * " of PLAN_INFO layer"));
		 * 
		 * String plotWidth = planInfoProperties.get(DxfFileConstants.AVG_PLOT_WIDTH);
		 * if (StringUtils.isNotBlank(plotWidth)) { plotWidth =
		 * plotWidth.replaceAll(digitsRegex, ""); BigDecimal plotWidthValue =
		 * getNumericValue(plotWidth, pl, DxfFileConstants.AVG_PLOT_WIDTH);
		 * pi.setWidthOfPlot(plotWidthValue); } else
		 * pl.addError(DxfFileConstants.AVG_PLOT_WIDTH,
		 * getLocaleMessage(OBJECTNOTDEFINED, DxfFileConstants.AVG_PLOT_WIDTH +
		 * " of PLAN_INFO layer"));
		 */

		String nocNearAirport = planInfoProperties.get(DxfFileConstants.NOC_FOR_CONSTRUCTION_NEAR_AIRPORT);
		if (StringUtils.isNotBlank(nocNearAirport)) {
			if (nocNearAirport.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocNearAirport(DcrConstants.YES);
			else if (nocNearAirport.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocNearAirport(DcrConstants.NO);
			else
				pi.setNocNearAirport(DcrConstants.NA);
		} else
			pi.setNocNearAirport(DcrConstants.NA);

		String nocCollectorGvtLand = planInfoProperties.get(DxfFileConstants.NOC_COLLECTOR_GVT_LAND);
		if (StringUtils.isNotBlank(nocCollectorGvtLand)) {
			if (nocCollectorGvtLand.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocCollectorGvtLand(DcrConstants.YES);
			else if (nocCollectorGvtLand.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocCollectorGvtLand(DcrConstants.NO);
			else
				pi.setNocCollectorGvtLand(DcrConstants.NA);
		} else
			pi.setNocCollectorGvtLand(DcrConstants.NA);

		String nocNearDefenceAerodomes = planInfoProperties
				.get(DxfFileConstants.NOC_FOR_CONSTRUCTION_NEAR_DEFENCE_AERODOMES);
		if (StringUtils.isNotBlank(nocNearDefenceAerodomes)) {
			if (nocNearDefenceAerodomes.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocNearDefenceAerodomes(DcrConstants.YES);
			else if (nocNearDefenceAerodomes.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocNearDefenceAerodomes(DcrConstants.NO);
			else
				pi.setNocNearDefenceAerodomes(DcrConstants.NA);
		} else
			pi.setNocNearDefenceAerodomes(DcrConstants.NA);

		/*
		 * String nocNearMonuments =
		 * planInfoProperties.get(DxfFileConstants.NOC_FOR_CONSTRUCTION_NEAR_MONUMENT);
		 * if (StringUtils.isNotBlank(nocNearMonuments)) { if
		 * (nocNearMonuments.equalsIgnoreCase(DcrConstants.YES)) {
		 * pi.setNocNearMonument(DcrConstants.YES); } else if
		 * (nocNearMonuments.equalsIgnoreCase(DcrConstants.NO)) {
		 * pi.setNocNearMonument(DcrConstants.NO); } else {
		 * pi.setNocNearMonument(DcrConstants.NA); } } else {
		 * pi.setNocNearMonument(DcrConstants.NA); }
		 */

		String nocRailways = planInfoProperties.get(DxfFileConstants.NOC_RAILWAY);
		if (StringUtils.isNotBlank(nocRailways)) {
			if (nocRailways.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocRailways(DcrConstants.YES);
			else if (nocRailways.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocRailways(DcrConstants.NO);
			else
				pi.setNocRailways(DcrConstants.NA);
		} else
			pi.setNocRailways(DcrConstants.NA);

		String nocIrrigationDept = planInfoProperties.get(DxfFileConstants.NOC_IRRIGATION_DEPT);
		if (StringUtils.isNotBlank(nocIrrigationDept)) {
			if (nocIrrigationDept.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocIrrigationDept(DcrConstants.YES);
			else if (nocIrrigationDept.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocIrrigationDept(DcrConstants.NO);
			else
				pi.setNocIrrigationDept(DcrConstants.NA);
		} else
			pi.setNocIrrigationDept(DcrConstants.NA);

		/*
		 * String nocFireDept = planInfoProperties.get(DxfFileConstants.NOC_FIRE_DEPT);
		 * if (StringUtils.isNotBlank(nocFireDept)) { if
		 * (nocFireDept.equalsIgnoreCase(DcrConstants.YES)) {
		 * pi.setNocFireDept(DcrConstants.YES); } else if
		 * (nocFireDept.equalsIgnoreCase(DcrConstants.NO)) {
		 * pi.setNocFireDept(DcrConstants.NO); } else {
		 * pi.setNocFireDept(DcrConstants.NA); } } else {
		 * pi.setNocFireDept(DcrConstants.NA); }
		 */

		String nocStateEnvImpact = planInfoProperties.get(DxfFileConstants.NOC_STATE_ENV_IMPACT);
		if (StringUtils.isNotBlank(nocStateEnvImpact)) {
			if (nocStateEnvImpact.equalsIgnoreCase(DcrConstants.YES))
				pi.setNocStateEnvImpact(DcrConstants.YES);
			else if (nocStateEnvImpact.equalsIgnoreCase(DcrConstants.NO))
				pi.setNocStateEnvImpact(DcrConstants.NO);
			else
				pi.setNocStateEnvImpact(DcrConstants.NA);
		} else
			pi.setNocStateEnvImpact(DcrConstants.NA);

		String buildingNearGovtBuilding = planInfoProperties.get(DxfFileConstants.BUILDING_NEAR_GOVT_BLDG);
		if (StringUtils.isNotBlank(buildingNearGovtBuilding)) {
			if (buildingNearGovtBuilding.equalsIgnoreCase(DcrConstants.YES))
				pi.setBuildingNearGovtBuilding(DcrConstants.YES);
			else if (buildingNearGovtBuilding.equalsIgnoreCase(DcrConstants.NO))
				pi.setBuildingNearGovtBuilding(DcrConstants.NO);
			else
				pi.setBuildingNearGovtBuilding(DcrConstants.NA);
		} else
			pi.setBuildingNearGovtBuilding(DcrConstants.NA);

		String buildingNearToRiver = planInfoProperties.get(DxfFileConstants.BUILDING_NEAR_TO_RIVER);
		if (StringUtils.isNotBlank(buildingNearToRiver)) {
			if (buildingNearToRiver.equalsIgnoreCase(DcrConstants.YES))
				pi.setBuildingNearToRiver(DcrConstants.YES);
			else if (buildingNearToRiver.equalsIgnoreCase(DcrConstants.NO))
				pi.setBuildingNearToRiver(DcrConstants.NO);
			else
				pi.setBuildingNearToRiver(DcrConstants.NA);
		} else
			pi.setBuildingNearToRiver(DcrConstants.NA);

		String provisionForGreenBuildings = planInfoProperties
				.get(DxfFileConstants.PROVISION_FOR_GREEN_BUILDINGS_AND_SUSTAINABILITY);
		if (StringUtils.isNotBlank(provisionForGreenBuildings)) {
			if (provisionForGreenBuildings.equalsIgnoreCase(DcrConstants.YES))
				pi.setProvisionsForGreenBuildingsAndSustainability(DcrConstants.YES);
			else if (provisionForGreenBuildings.equalsIgnoreCase(DcrConstants.NO))
				pi.setProvisionsForGreenBuildingsAndSustainability(DcrConstants.NO);
			else
				pi.setProvisionsForGreenBuildingsAndSustainability(DcrConstants.NA);
		} else
			pi.setProvisionsForGreenBuildingsAndSustainability(DcrConstants.NA);

		String fireProtectionAndFireSafetyRequirements = planInfoProperties
				.get(DxfFileConstants.FIRE_PROTECTION_AND_FIRE_SAFETY_REQUIREMENTS);
		if (StringUtils.isNotBlank(fireProtectionAndFireSafetyRequirements)) {
			if (fireProtectionAndFireSafetyRequirements.equalsIgnoreCase(DcrConstants.YES))
				pi.setFireProtectionAndFireSafetyRequirements(DcrConstants.YES);
			else if (fireProtectionAndFireSafetyRequirements.equalsIgnoreCase(DcrConstants.NO))
				pi.setFireProtectionAndFireSafetyRequirements(DcrConstants.NO);
			else
				pi.setFireProtectionAndFireSafetyRequirements(DcrConstants.NA);
		} else
			pi.setFireProtectionAndFireSafetyRequirements(DcrConstants.NA);

		String barrierFreeAccessForPhyChlngdPpl = planInfoProperties

				.get(DxfFileConstants.BARRIER_FREE_ACCESS_FOR_PHYSICALLY_CHALLENGED_PEOPLE);
		if (StringUtils.isNotBlank(barrierFreeAccessForPhyChlngdPpl)) {
			if (barrierFreeAccessForPhyChlngdPpl.equalsIgnoreCase(DcrConstants.YES))
				pi.setBarrierFreeAccessForPhyChlngdPpl(DcrConstants.YES);
			else if (barrierFreeAccessForPhyChlngdPpl.equalsIgnoreCase(DcrConstants.NO))
				pi.setBarrierFreeAccessForPhyChlngdPpl(DcrConstants.NO);
			else
				pi.setBarrierFreeAccessForPhyChlngdPpl(DcrConstants.NA);
		} else
			pi.setBarrierFreeAccessForPhyChlngdPpl(DcrConstants.NA);

		String buildingNearMonuments = planInfoProperties.get(DxfFileConstants.BUILDING_NEAR_MONUMENT);
		if (StringUtils.isNotBlank(buildingNearMonuments))
			pi.setBuildingNearMonument(buildingNearMonuments);

		String landUseZone = planInfoProperties.get(DxfFileConstants.LAND_USE_ZONE);
		if (StringUtils.isNotBlank(landUseZone))
			pi.setLandUseZone(landUseZone);

		String plotNo = planInfoProperties.get(DxfFileConstants.PLOT_NO);
		if (StringUtils.isNotBlank(plotNo))
			pi.setPlotNo(plotNo);

		String khataNo = planInfoProperties.get(DxfFileConstants.KHATA_NO);
		if (StringUtils.isNotBlank(khataNo))
			pi.setKhataNo(khataNo);

		String district = planInfoProperties.get(DxfFileConstants.DISTRICT);
		if (StringUtils.isNotBlank(district))
			pi.setDistrict(district);

		String mauza = planInfoProperties.get(DxfFileConstants.MAUZA);
		if (StringUtils.isNotBlank(mauza))
			pi.setMauza(mauza);

		String leaseHoldLand = planInfoProperties.get(DxfFileConstants.LEASEHOLD_LAND);
		if (StringUtils.isNotBlank(leaseHoldLand)) {
			if (leaseHoldLand.equalsIgnoreCase(DcrConstants.YES))
				pi.setLeaseHoldLand(DcrConstants.YES);
			else if (leaseHoldLand.equalsIgnoreCase(DcrConstants.NO))
				pi.setLeaseHoldLand(DcrConstants.NO);
			else
				pi.setLeaseHoldLand(DcrConstants.NA);
		} else
			pi.setLeaseHoldLand(DcrConstants.NA);

		String rwhDeclared = planInfoProperties.get(DxfFileConstants.RWH_DECLARED);
		if (StringUtils.isNotBlank(rwhDeclared)) {
			if (rwhDeclared.equalsIgnoreCase(DcrConstants.YES))
				pi.setRwhDeclared(DcrConstants.YES);
			else if (rwhDeclared.equalsIgnoreCase(DcrConstants.NO))
				pi.setRwhDeclared(DcrConstants.NO);
			else
				pi.setRwhDeclared(DcrConstants.NA);
		} else
			pi.setRwhDeclared(DcrConstants.NA);

		return pi;
	}

	public void setUtil(Util util) {
		this.util = util;
	}

	public void setLayerNames(LayerNames layerNames) {
		this.layerNames = layerNames;
	}
	
	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}

}
