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
import static org.egov.edcr.constants.AmendmentConstants.*;
import static org.egov.edcr.utility.DcrConstants.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlotDetail;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.egov.edcr.utility.math.Polygon;
import org.egov.edcr.utility.math.Ray;
import org.kabeja.dxf.DXFVertex;
import org.kabeja.dxf.helpers.Point;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class OverHangs extends FeatureProcess {

    private static final Logger LOG = LogManager.getLogger(OverHangs.class);
    private static final String SUB_RULE_24_10 = "24(10)";
    private static final String SUB_RULE_AMD19_26_9 = "26(9)";
    final Ray rayCasting = new Ray(new Point(-1.123456789, -1.987654321, 0d));
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

    @Override
    public Plan validate(Plan pl) {

        return pl;
    }

    @Override
    public Plan process(Plan pl) {
    	LOG.info("Processing OverHang shades...");
        String subRule;
        if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
            subRule = SUB_RULE_AMD19_26_9;
			pl.getFeatureAmendments().put(SHADE, AMEND_DATE_081119.toString());
        }
        else
            subRule = SUB_RULE_24_10;
        List<Block> blocks = pl.getBlocks();
        for (Block block : blocks) {
            if (block.getBuilding() != null &&
					block.getBuilding().getShade() != null) {
				MeasurementDetail shade = (MeasurementDetail) block.getBuilding().getShade();
				PlotDetail plot = (PlotDetail) pl.getPlot();
				if (shade.getPolyLine() != null && plot.getPolyLine() != null) {
					scrutinyDetail = new ScrutinyDetail();
					scrutinyDetail.addColumnHeading(1, RULE_NO);
					scrutinyDetail.addColumnHeading(2, REQUIRED);
					scrutinyDetail.addColumnHeading(3, PROVIDED);
					scrutinyDetail.addColumnHeading(4, STATUS);
					scrutinyDetail.setHeading(SHADE);
					scrutinyDetail.setKey("Block_" + block.getName() + "_" + SHADE);

					Polygon plotPolygon = Util.getPolygon(plot.getPolyLine());

					Iterator shadeIterator = shade.getPolyLine().getVertexIterator();
					Boolean shadeOutSideBoundary = false;

					while (shadeIterator.hasNext()) {
						DXFVertex dxfVertex = (DXFVertex) shadeIterator.next();
						Point point = dxfVertex.getPoint();
						if (!rayCasting.contains(point, plotPolygon))
							shadeOutSideBoundary = true;

					}

					Map<String, String> details = new HashMap<>();
					details.put(RULE_NO, subRule);
					details.put(REQUIRED,
							DcrConstants.SHADE + " for block " + block.getNumber() + " Should be inside Plot Boundary");

					if (shadeOutSideBoundary) {
						details.put(PROVIDED,
								DcrConstants.SHADE + " for block " + block.getNumber() + "  is outside Plot Boundary");
						details.put(STATUS, Result.Not_Accepted.getResultVal());
					} else {
						details.put(PROVIDED,
								DcrConstants.SHADE + " for block " + block.getNumber() + "  is inside Plot Boundary");
						details.put(STATUS, Result.Accepted.getResultVal());
					}

					scrutinyDetail.getDetail().add(details);
					pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
				}
			}
        }
        return pl;
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> meanofAccessAmendments = new ConcurrentHashMap<>();
        meanofAccessAmendments.put(AMEND_NOV19, AMEND_DATE_081119);
        return meanofAccessAmendments;
    }

}
