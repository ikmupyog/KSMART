package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.BioGas;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BioGasServiceExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(BioGasServiceExtract.class);
    
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail validate(PlanDetail planDetail) {
        return planDetail;
    }

    @Override
    public PlanDetail extract(PlanDetail planDetail) {
    	String layername = layerNames.getLayerName("LAYER_NAME_BIO_GAS");
        if (planDetail.getDoc().containsDXFLayer(layername)) {
            List<DXFLWPolyline> bioGasPolyLine = Util.getPolyLinesByLayer(planDetail.getDoc(), layername);
            if (bioGasPolyLine != null && !bioGasPolyLine.isEmpty())
                for (DXFLWPolyline pline : bioGasPolyLine) {
                   BioGas bioGas = new BioGas();
                    bioGas.setPresentInDxf(true);
                    BigDecimal area = Util.getPolyLineArea(pline);
                    bioGas.setArea(area);
                    planDetail.getUtility().addBioGas(bioGas);
                }

            List<DXFCircle> bioGasPolyLineCircles = Util.getPolyCircleByLayer(planDetail.getDoc(), layername);
            if (bioGasPolyLineCircles != null && !bioGasPolyLineCircles.isEmpty())
                for (DXFCircle dxfCircle : bioGasPolyLineCircles) {
                    BioGas bioGas = new BioGas();
                    bioGas.setPresentInDxf(true);
                    double radius = dxfCircle.getRadius();
                    double area = 3.14 * radius * radius;
                    bioGas.setArea(BigDecimal.valueOf(area));
                    planDetail.getUtility().addBioGas(bioGas);
                }
        }
        return planDetail;
    }

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
