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

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;
import static org.egov.edcr.utility.DcrConstants.OBJECTDEFINED_DESC;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED_DESC;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RecycleWasteWater extends FeatureProcess {
    private static final BigDecimal TWO_THOUSAND = BigDecimal.valueOf(2000);
    private static final String SUB_RULE_79_6_DESCRIPTION = "Recycling and reuse of waste water generated facility ";
    private static final String SUB_RULE_79_6 = "79(6)";
    private static final BigDecimal FIVE_THOUSAND = BigDecimal.valueOf(5000);

    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();
        if (pl != null && pl.getUtility() != null) {
            // waste water recycle plant defined or not
            if (!pl.getOccupancies().isEmpty()) {
                for (Occupancy occupancy : pl.getOccupancies()) {
                	String occupCode = occupancy.getTypeHelper().getType().getCode();
                    if (checkOccupancyTypeEqualsToNonConditionalOccupancyTypes(occupCode)
                            && pl.getUtility().getWasteWaterRecyclePlant().isEmpty()) {
                        errors.put(SUB_RULE_79_6_DESCRIPTION,
                                edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                        SUB_RULE_79_6_DESCRIPTION }, LocaleContextHolder.getLocale()));
                        pl.addErrors(errors);
                        break;
                    } else if ((occupCode.equals(A4) || occupCode.equals(A2) || occupCode.equals(A3))
							&& pl.getVirtualBuilding().getTotalBuitUpArea() != null
							&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(TWO_THOUSAND) > 0
                            && pl.getUtility().getWasteWaterRecyclePlant().isEmpty()) {
                        errors.put(SUB_RULE_79_6_DESCRIPTION,
                                edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                        SUB_RULE_79_6_DESCRIPTION }, LocaleContextHolder.getLocale()));
                        break;
                    } else if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
							&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(FIVE_THOUSAND) > 0
                            && pl.getUtility().getWasteWaterRecyclePlant().isEmpty()) {
                        errors.put(SUB_RULE_79_6_DESCRIPTION,
                                edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                        SUB_RULE_79_6_DESCRIPTION }, LocaleContextHolder.getLocale()));
                        break;
                    }
                    

                }
            }
        }
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
    	List<String> occupancies = pl.getOccupancies().stream().map(occ -> occ.getTypeHelper().getType().getCode()).collect(Collectors.toList());
		if (!occupancies.contains(A1) || !occupancies.contains(H)) {
			validate(pl);
			scrutinyDetail = new ScrutinyDetail();
			scrutinyDetail.addColumnHeading(1, RULE_NO);
			scrutinyDetail.addColumnHeading(2, DESCRIPTION);
			scrutinyDetail.addColumnHeading(3, REQUIRED);
			scrutinyDetail.addColumnHeading(4, PROVIDED);
			scrutinyDetail.addColumnHeading(5, STATUS);
			scrutinyDetail.setKey("Common_Waste Water Recycle Plant");
			if (!pl.getOccupancies().isEmpty()) {
				for (String occupCode : occupancies) {
					if (checkOccupancyTypeEqualsToNonConditionalOccupancyTypes(occupCode)) {
						processWasteWaterRecyclePlant(pl);
						break;
					} else if ((occupCode.equals(A4) || occupCode.equals(A2) || occupCode.equals(A3))
							&& pl.getVirtualBuilding().getTotalBuitUpArea() != null
							&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(TWO_THOUSAND) > 0) {
						processWasteWaterRecyclePlant(pl);
						break;
					} else if (pl.getVirtualBuilding().getTotalBuitUpArea() != null
							&& pl.getVirtualBuilding().getTotalBuitUpArea().compareTo(FIVE_THOUSAND) > 0) {
						processWasteWaterRecyclePlant(pl);
						break;
					}
				}
			}
		}
        return pl;
    }

    private void processWasteWaterRecyclePlant(Plan pl) {
        if (!pl.getUtility().getWasteWaterRecyclePlant().isEmpty()) {
            setReportOutputDetailsWithoutOccupancy(pl, SUB_RULE_79_6, SUB_RULE_79_6_DESCRIPTION, "",
                    OBJECTDEFINED_DESC, Result.Accepted.getResultVal());
            return;
        } else {
            setReportOutputDetailsWithoutOccupancy(pl, SUB_RULE_79_6, SUB_RULE_79_6_DESCRIPTION, "",
                    OBJECTNOTDEFINED_DESC, Result.Not_Accepted.getResultVal());
            return;
        }
    }

	private boolean checkOccupancyTypeEqualsToNonConditionalOccupancyTypes(String occupCode) {
		return occupCode.equals(G1) || occupCode.equals(G2) || occupCode.equals(G3)
				|| occupCode.equals(G4) || occupCode.equals(G5) || occupCode.equals(I) || occupCode.equals(I1)
				|| occupCode.equals(I2) || occupCode.equals(I3) || occupCode.equals(I4) || occupCode.equals(I5)
				|| occupCode.equals(I6);
	}


    private void setReportOutputDetailsWithoutOccupancy(Plan pl, String ruleNo, String ruleDesc, String expected, String actual,
            String status) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
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
