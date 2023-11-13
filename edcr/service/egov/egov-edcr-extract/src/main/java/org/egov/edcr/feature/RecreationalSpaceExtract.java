package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.RecreationArea;
import org.egov.common.entity.edcr.RoofArea;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecreationalSpaceExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(RecreationalSpaceExtract.class);
    public static final String SUB_RULE_50_DESC = "Recreational space for Residential Apartment ";
    public static final String SUB_RULE_50_DESC_CELLER = " Ground floor Recreational space ";
    public static final String SUB_RULE_50 = "50";
    public static final String SUB_RULE_50_2 = "50(2)";
    public static final String RECREATION = "RECREATION";
    public static final int TOTALNUMBEROFUNITS = 12;
    public static final BigDecimal THREE = BigDecimal.valueOf(3);
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of Recreational Space Extract......");
        String layerRegEx;
        for (Block block : pl.getBlocks())
            for (Floor floor : block.getBuilding().getFloors()) {
                layerRegEx = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                        + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber() + "_"
                        + RECREATION;
                for (DXFLWPolyline pline : Util.getPolyLinesByLayer(pl.getDoc(), layerRegEx))
                    for (Occupancy occup : floor.getOccupancies())
                        if ("A4".equals(occup.getTypeHelper().getType().getCode()))
                            occup.getRecreationalSpace().add(new MeasurementDetail(pline, true));
                String roofAreaLayerName = String.format(layerNames.getLayerName("LAYER_NAME_ROOF_AREA"),
                        block.getNumber(), floor.getNumber());
                List<DXFLWPolyline> roofAreas = Util.getPolyLinesByLayer(pl.getDoc(), roofAreaLayerName);

				if (roofAreas != null && !roofAreas.isEmpty()) {
					List<RoofArea> roofAreaList = new ArrayList<>();
					for (DXFLWPolyline pline : roofAreas) {
						Measurement measurement = new MeasurementDetail(pline, true);
						RoofArea roofArea = new RoofArea();
						roofArea.setArea(measurement.getArea());
						roofArea.setColorCode(measurement.getColorCode());
						roofArea.setHeight(measurement.getHeight());
						roofArea.setWidth(measurement.getWidth());
						roofArea.setLength(measurement.getLength());
						roofArea.setInvalidReason(measurement.getInvalidReason());
						roofArea.setPresentInDxf(true);
						roofArea.setMinimumSide(measurement.getMinimumSide());
						roofAreaList.add(roofArea);
					}
					floor.setRoofAreas(roofAreaList);
				}
            }
        
        String outsideBuildRecreateAreaRegex = layerNames.getLayerName("LAYER_NAME_EXT_RECREATION");
        RecreationArea rca = new RecreationArea();
        for (DXFLWPolyline pline : Util.getPolyLinesByLayer(pl.getDoc(), outsideBuildRecreateAreaRegex)) {
        	Measurement measurement = new MeasurementDetail(pline, true);
        	rca.getOutsideBuildingRecreationArea().add(measurement);
        }
        	
        String terraceRecreateAreaRegex = layerNames.getLayerName("LAYER_NAME_TERRACE_RECREATION");
        for (DXFLWPolyline pline : Util.getPolyLinesByLayer(pl.getDoc(), terraceRecreateAreaRegex)) {
        	Measurement measurement = new MeasurementDetail(pline, true);
        	rca.getTerraceRecreationArea().add(measurement);
        }
        
        if (LOG.isDebugEnabled())
            LOG.debug("End of Recreational Space Extract......");
        return pl;
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
