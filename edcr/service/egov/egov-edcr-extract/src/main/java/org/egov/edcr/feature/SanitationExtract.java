package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_FEMALE_WATER_CLOSET;
import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_MALE_WATER_CLOSET;
import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_MALE_VISITORS_WATER_CLOSET;
import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_FEMALE_VISITORS_WATER_CLOSET;
import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_MALE_OR_FEMALE_VISITORS_WATER_CLOSET;
import static org.egov.edcr.constants.DxfFileConstants.COLOR_KEY_COMMON_WATER_CLOSET;
import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.TypicalFloor;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.OccupancyDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFDocument;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author mani
 */

@Service
public class SanitationExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(SanitationExtract.class);

    public static final String MSG_ERROR_MANDATORY = "msg.error.mandatory.object.not.defined";
    public static final String FEMALE = "Female ";
    public static final String MALE = "Male ";
    public static final String BLOCK = "Block ";
    public static final String SANITY_RULE_DESC = "Sanity facility for Occupancy ";
    public static final String NEWLINE = "\n";
    public static final String SANITATION = "Sanitation";
    public static final String BLOCK_U_S = "Block_";
    public static final String RULE_55_12 = "55(12)";
    public static final String RULE_40_A_4 = "40A(4)";
    public static final String RULE_54_6 = "54(6)";
    private static final String VALIDATION_WRONG_COLORCODE_PARKINGAREA = "msg.error.wrong.colourcode.sanitationparkingarea";

    @Autowired
    private LayerNames layerNames;

    /**
     * Find Water Closets
     */
    @Override
    public PlanDetail extract(PlanDetail pl) {
    	DXFDocument doc = pl.getDoc();
        for (Block b : pl.getBlocks())
            if (!b.getCompletelyExisting()) {
                String layerName1 = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + b.getNumber() + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "\\d+_";
                collectSanityDetails(pl, doc, b, layerName1, 1);
                if (!b.getTypicalFloor().isEmpty())
                    for (TypicalFloor typicalFloor : b.getTypicalFloor()) {
                        String layerName = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + b.getNumber() + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + typicalFloor.getModelFloorNo() + "_";
                        collectSanityDetails(pl, doc, b, layerName, typicalFloor.getRepetitiveFloorNos().size());
                    }
            }

        // Special Water Closets for this will be added floor wise
        Map<String, Integer> subFeaturesColor = pl.getSubFeatureColorCodesMaster().get(SANITATION);

        for (Block block : pl.getBlocks())
            if (!block.getCompletelyExisting())
                for (Floor f : block.getBuilding().getFloors()) {
                    String layerName1 = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                            + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + f.getNumber() + "_"
                            + layerNames.getLayerName("LAYER_NAME_SPECIAL_WATER_CLOSET");
                    List<DXFLWPolyline> polyLinesByLayer = Util.getPolyLinesByLayer(doc, layerName1);
                    if (!polyLinesByLayer.isEmpty())
                        for (DXFLWPolyline pline : polyLinesByLayer) {
                            Measurement m = new MeasurementDetail(pline, true);
                            f.getSpecialWaterClosets().add(m);
                        }
                }

        // Wash Basins for this will be added floor wise. Colour codewise, measurements are not bifurcated.

        for (Block block : pl.getBlocks())
            if (!block.getCompletelyExisting())
                for (Floor f : block.getBuilding().getFloors()) {
                    String washBasinLayers = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber()
                    + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + f.getNumber() + "_"
                    + layerNames.getLayerName("LAYER_NAME_WASH");
                    List<DXFLWPolyline> polyLinesByLayer = Util.getPolyLinesByLayer(doc, washBasinLayers);
                    if (polyLinesByLayer.isEmpty()) {
                        List<DXFCircle> washBasinCircles = Util.getPolyCircleByLayer(doc, washBasinLayers);
                        for (DXFCircle dxfCircle : washBasinCircles) {
                            Measurement m = new Measurement();
                            double radius = dxfCircle.getRadius();
                            double area = 3.14 * radius * radius;
                            m.setArea(BigDecimal.valueOf(area));
                            m.setLength(BigDecimal.valueOf(dxfCircle.getLength()));
                            m.setPresentInDxf(true);
                            f.getWashBasins().add(m); 
                        }
                    } else if (!polyLinesByLayer.isEmpty())
                        for (DXFLWPolyline pline : polyLinesByLayer) {
                            Measurement m = new MeasurementDetail(pline, true);
                            f.getWashBasins().add(m);
                        }
                }
        return pl;
    }

    private void collectSanityDetails(PlanDetail pl, DXFDocument doc, Block block, String layerPrefix,
            int typicalCount) {
        Map<String, Integer> subFeaturesColor = pl.getSubFeatureColorCodesMaster().get(SANITATION);
        List<DXFLWPolyline> polyLinesByLayer;
        // 1. Water closets
        String layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_WATER_CLOSET");
        List<String> layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        Measurement measurement = new MeasurementDetail(pline, true);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_WATER_CLOSET))
                            block.getSanityDetails().getMaleWaterClosets().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_FEMALE_WATER_CLOSET))
                            block.getSanityDetails().getFemaleWaterClosets().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_VISITORS_WATER_CLOSET))
                            block.getSanityDetails().getMaleVisitorsWaterClosets().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_FEMALE_VISITORS_WATER_CLOSET))
                            block.getSanityDetails().getFemaleVisitorsWaterClosets().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_OR_FEMALE_VISITORS_WATER_CLOSET))
                            block.getSanityDetails().getMaleOrFemaleVisitorsWaterClosets().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_COMMON_WATER_CLOSET))
                            block.getSanityDetails().getCommonWaterClosets().add(measurement);
                    }
        }

        
        // PARKING_AREA
        layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_PARKING_AREA");
        layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);  
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        if (!pline.isClosed()) {
                            pl.getErrors().put(pline.getLayerName() + " not closed", pline.getLayerName() + " is not closed ");
                        }
                        BigDecimal occupancyArea = Util.getPolyLineArea(pline);
                        LOG.error(" occupancyArea *************** " + occupancyArea);
                        OccupancyDetail occupancy = new OccupancyDetail();
                        occupancy.setPolyLine(pline);
                        occupancy.setBuiltUpArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
                        occupancy.setExistingBuiltUpArea(BigDecimal.ZERO);
                        occupancy.setType(Util.findOccupancyType(pline));
                        occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
                        LOG.error(" occupancy type " + occupancy.getType());
                        if (occupancy.getType() == null && occupancy.getTypeHelper() == null)
                            pl.addError(VALIDATION_WRONG_COLORCODE_PARKINGAREA, getLocaleMessage(
                            		VALIDATION_WRONG_COLORCODE_PARKINGAREA, String.valueOf(pline.getColor()), s));
                        else
                        	block.getSanityDetails().addParkingArea(occupancy);
                    }
        }
        
        // Urinals
        layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_URINAL");
        layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        Measurement measurement = new MeasurementDetail(pline, true);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_WATER_CLOSET))
                            block.getSanityDetails().getMaleUrinals().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_VISITORS_WATER_CLOSET))
                            block.getSanityDetails().getMaleVisitorUrinals().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_COMMON_WATER_CLOSET))
                            block.getSanityDetails().getCommonUrinals().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_OR_FEMALE_VISITORS_WATER_CLOSET))
                            block.getSanityDetails().getMaleOrFemaleVisitorsUrinals().add(measurement);
                       //block.getSanityDetails().getUrinals().add(measurement);
                    }
        }

        // Bath rooms
        layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_BATH");
        layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        Measurement measurement = new MeasurementDetail(pline, true);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_WATER_CLOSET))
                            block.getSanityDetails().getMaleBathRooms().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_FEMALE_WATER_CLOSET))
                            block.getSanityDetails().getFemaleBathRooms().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_COMMON_WATER_CLOSET))
                            block.getSanityDetails().getMaleBathRooms().add(measurement);
                    }
        }
        // Bath rooms with Water Closet
        layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_WC_BATH");
        layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        Measurement measurement = new MeasurementDetail(pline, true);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_MALE_WATER_CLOSET))
                            block.getSanityDetails().getMaleRoomsWithWaterCloset().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_FEMALE_WATER_CLOSET))
                            block.getSanityDetails().getFemaleRoomsWithWaterCloset().add(measurement);
                        if (pline.getColor() == subFeaturesColor.get(COLOR_KEY_COMMON_WATER_CLOSET))
                            block.getSanityDetails().getMaleRoomsWithWaterCloset().add(measurement);
                    }
        }

        // Drinking water
        layerName = layerPrefix + layerNames.getLayerName("LAYER_NAME_DRINKING_WATER");
        layerNames1 = Util.getLayerNamesLike(doc, layerName);
        for (String s : layerNames1) {
            polyLinesByLayer = Util.getPolyLinesByLayer(doc, s);
            if (!polyLinesByLayer.isEmpty())
                for (DXFLWPolyline pline : polyLinesByLayer)
                    for (int i = 0; i < typicalCount; i++) {
                        Measurement measurement = new MeasurementDetail(pline, true);
                        block.getSanityDetails().getDrinkingWater().add(measurement);
                    }
        }

    }

    @Override
    public PlanDetail validate(PlanDetail pl) {
        return pl;
    }

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
