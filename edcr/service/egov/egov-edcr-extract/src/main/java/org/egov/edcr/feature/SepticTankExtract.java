package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.SepticTank;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFDocument;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SepticTankExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(SepticTankExtract.class);
    
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail validate(PlanDetail planDetail) {
        return planDetail;
    }

    @Override
    public PlanDetail extract(PlanDetail planDetail) {
    	LOG.debug("Extracting septic tank information!!!!");
        DXFDocument doc = planDetail.getDoc();
        List<String> septicTankLayers = Util.getLayerNamesLike(doc, layerNames.getLayerName("LAYER_NAME_SEPTIC_TANK"));
        List<SepticTank> septicTanks = new ArrayList<>();
        for (String septicTankLayer : septicTankLayers) {
            List<DXFLWPolyline> septicTankPolyLine = Util.getPolyLinesByLayer(doc, septicTankLayer);
            List<BigDecimal> distanceFromWaterSource = Util.getListOfDimensionByColourCode(planDetail, septicTankLayer,
                    DxfFileConstants.INDEX_COLOR_ONE);
            List<BigDecimal> distanceFromBuilding = Util.getListOfDimensionByColourCode(planDetail, septicTankLayer,
                    DxfFileConstants.INDEX_COLOR_TWO);

            SepticTank septicTank = new SepticTank();
            if (!septicTankPolyLine.isEmpty()) {
                MeasurementDetail measurement = new MeasurementDetail(septicTankPolyLine.get(0), true);
                septicTank.setArea(measurement.getArea());
                septicTank.setHeight(measurement.getHeight());
                septicTank.setWidth(measurement.getWidth());
                if (septicTankPolyLine.get(0).getColor() == 1) {
                    septicTank.setType(DcrConstants.EXISTING);
                } else if (septicTankPolyLine.get(0).getColor() == 2) {
                    septicTank.setType(DcrConstants.PROPOSED);
                }
            }
            septicTank.setDistanceFromBuilding(distanceFromBuilding);
            septicTank.setDistanceFromWaterSource(distanceFromWaterSource);
            septicTanks.add(septicTank);
        }
        planDetail.setSepticTanks(septicTanks);

        return planDetail;
    }

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
