package org.egov.edcr.feature;

import static org.apache.commons.lang3.StringUtils.isBlank;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.DARamp;
import org.egov.common.entity.edcr.DARoom;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Ramp;
import org.egov.common.entity.edcr.TypicalFloor;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RampServiceExtract extends FeatureExtract {

    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        HashMap<String, String> errors = new HashMap<>();
        if (pl != null && !pl.getBlocks().isEmpty())
            for (Block block : pl.getBlocks()) {
                String rampLayerNameRegex = String.format(layerNames.getLayerName("LAYER_NAME_DA_RAMP"), block.getNumber())
                        + "_+\\d";
                List<String> rampLayerNames = Util.getLayerNamesLike(pl.getDoc(), rampLayerNameRegex);
                for (String rampLayerName : rampLayerNames) {
                    List<DXFLWPolyline> polyLines = Util.getPolyLinesByLayer(pl.getDoc(), rampLayerName);
                    String[] layerArray = rampLayerName.split("_", 5);
                    BigDecimal slope = extractSlope(pl, rampLayerName, errors);

                    List<Measurement> convertedPolyLines = polyLines.stream()
                            .map(polyLine -> new MeasurementDetail(polyLine, true)).collect(Collectors.toList());

                    if (!polyLines.isEmpty() && polyLines != null && !layerArray[4].isEmpty()
                            && layerArray[4] != null) {
                        DARamp daRamp = new DARamp();
                        daRamp.setNumber(Integer.valueOf(layerArray[4]));
                        daRamp.setMeasurements(convertedPolyLines);
                        daRamp.setPresentInDxf(true);
                        daRamp.setSlope(slope);
                        block.addDARamps(daRamp);
                    }

                }
                if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
                    outside: for (Floor floor : block.getBuilding().getFloors()) {
                        if (!block.getTypicalFloor().isEmpty())
                            for (TypicalFloor tp : block.getTypicalFloor())
                                if (tp.getRepetitiveFloorNos().contains(floor.getNumber()))
                                    for (Floor allFloors : block.getBuilding().getFloors())
                                        if (allFloors.getNumber().equals(tp.getModelFloorNo()))
                                            if (!allFloors.getDaRooms().isEmpty()) {
                                                floor.setDaRooms(allFloors.getDaRooms());
                                                continue outside;
                                            }
                        String daRoomLayerName = String.format(layerNames.getLayerName("LAYER_NAME_DA_ROOM"), block.getNumber(),
                                floor.getNumber());
                        List<DXFLWPolyline> polyLinesByLayer = Util.getPolyLinesByLayer(pl.getDoc(), daRoomLayerName);
                        if (!polyLinesByLayer.isEmpty() && polyLinesByLayer != null)
                            for (DXFLWPolyline polyline : polyLinesByLayer) {
                            	List<Measurement> convertedPolyLines = polyLinesByLayer.stream()
                                        .map(polyLine -> new MeasurementDetail(polyLine, true)).collect(Collectors.toList());
                                DARoom daRoom = new DARoom();
                                daRoom.setMeasurements(convertedPolyLines);
                                daRoom.setPresentInDxf(true);
                                floor.addDaRoom(daRoom);
                            }
                    }
                    outside: for (Floor floor : block.getBuilding().getFloors()) {
                        if (!block.getTypicalFloor().isEmpty())
                            for (TypicalFloor tp : block.getTypicalFloor())
                                if (tp.getRepetitiveFloorNos().contains(floor.getNumber()))
                                    for (Floor allFloors : block.getBuilding().getFloors())
                                        if (allFloors.getNumber().equals(tp.getModelFloorNo()))
                                            if (!allFloors.getRamps().isEmpty()) {
                                                floor.setRamps(allFloors.getRamps());
                                                continue outside;
                                            }
                        String rampRegex = String.format(layerNames.getLayerName("LAYER_NAME_RAMP"), block.getNumber(),
                                floor.getNumber()) + "_+\\d";
                        List<String> rampLayer = Util.getLayerNamesLike(pl.getDoc(), rampRegex);
                        if (!rampLayer.isEmpty())
                            for (String rmpLayer : rampLayer) {
                                List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(pl.getDoc(), rmpLayer);
                                String[] splitLayer = rmpLayer.split("_", 6);
                                if (splitLayer[5] != null && !splitLayer[5].isEmpty() && !polylines.isEmpty()) {
                                    Ramp ramp = new Ramp();
                                    ramp.setNumber(Integer.valueOf(splitLayer[5]));
                                    boolean isClosed = polylines.stream()
                                            .allMatch(dxflwPolyline -> dxflwPolyline.isClosed());
                                    ramp.setRampClosed(isClosed);
                                    List<Measurement> rampPolyLine = polylines.stream()
                                            .map(dxflwPolyline -> new MeasurementDetail(dxflwPolyline, true))
                                            .collect(Collectors.toList());
                                    ramp.setRamps(rampPolyLine);
                                    String floorHeight = Util.getMtextByLayerName(pl.getDoc(), rmpLayer, "FLR_HT_M");

                                    if (!isBlank(floorHeight)) {
                                        if (floorHeight.contains("="))
                                            floorHeight = floorHeight.split("=")[1] != null
                                                    ? floorHeight.split("=")[1].replaceAll("[^\\d.]", "")
                                                    : "";
                                        else
                                            floorHeight = floorHeight.replaceAll("[^\\d.]", "");

                                        if (!isBlank(floorHeight)) {
                                            BigDecimal height = BigDecimal.valueOf(Double.parseDouble(floorHeight));
                                            ramp.setFloorHeight(height);
                                        }
                                        floor.addRamps(ramp);
                                    }
                                }
                            }
                    }
                }
            }
        return pl;
    }

	private BigDecimal extractSlope(PlanDetail pl, String rampLayerName, HashMap<String, String> errors) {
		String text = Util.getMtextByLayerName(pl.getDoc(), rampLayerName);
		BigDecimal slope = BigDecimal.ZERO;
        if (StringUtils.isNotBlank(text)) {
            String[] textArray = text.split("=", 2);
            String slopeText = "";
            if (textArray.length > 1)
                slopeText = textArray[1];
            String[] slopeDividendAndDivisor = {};
            if (StringUtils.isNotBlank(slopeText)) {
                slopeText = slopeText.toUpperCase();
                if (slopeText.contains("IN")) {
                    slopeDividendAndDivisor = slopeText.split("IN", 2);

                    if (slopeDividendAndDivisor != null && slopeDividendAndDivisor.length > 1
                            && slopeDividendAndDivisor[0] != null
                            && slopeDividendAndDivisor[1] != null) {
                        slopeDividendAndDivisor[0] = slopeDividendAndDivisor[0].replaceAll("[^\\d.]",
                                "");
                        slopeDividendAndDivisor[1] = slopeDividendAndDivisor[1].replaceAll("[^\\d.]",
                                "");
                        if (StringUtils.isNotBlank(slopeDividendAndDivisor[0])
                                && StringUtils.isNotBlank(slopeDividendAndDivisor[1])) {
                            BigDecimal numerator = getNumericValue(slopeDividendAndDivisor[0], pl,
                                    "Slope value in " + rampLayerName);
                            BigDecimal denominator = getNumericValue(slopeDividendAndDivisor[1], pl,
                                    "Slope value in " + rampLayerName);
                            if (numerator != null && denominator != null
                                    && denominator.compareTo(BigDecimal.ZERO) > 0)
                                slope = numerator.divide(denominator, 2, RoundingMode.HALF_UP);
                        } else {
                            errors.put("Slope format defined " + rampLayerName,
                                    "Slope format defined in layer " + rampLayerName
                                            + " is not valid (to be defined like ex: 1IN12).");
                            pl.addErrors(errors);
                        }
                    }
                } else {
                    errors.put("Slope format defined " + rampLayerName, "Slope format defined in layer "
                            + rampLayerName + " is not valid (to be defined like ex: 1IN12).");
                    pl.addErrors(errors);
                }

            }
        }
		return slope;
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
