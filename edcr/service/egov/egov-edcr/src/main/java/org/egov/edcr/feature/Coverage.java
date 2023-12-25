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
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;
import static org.egov.edcr.constants.DxfFileConstants.J;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.service.ProcessHelper;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class Coverage extends FeatureProcess {
    // private static final String OCCUPANCY2 = "OCCUPANCY";

    private static final Logger LOG = LogManager.getLogger(Coverage.class);

    private static final String RULE_DESCRIPTION_KEY = "coverage.description";
    private static final String RULE_EXPECTED_KEY = "coverage.expected";
    private static final String RULE_ACTUAL_KEY = "coverage.actual";
    private static final BigDecimal ThirtyFive = BigDecimal.valueOf(35);
    private static final BigDecimal Forty = BigDecimal.valueOf(40);
    private static final BigDecimal FortyFive = BigDecimal.valueOf(45);
    private static final BigDecimal Fifty = BigDecimal.valueOf(50);
    private static final BigDecimal Sixty = BigDecimal.valueOf(60);
    private static final BigDecimal SixtyFive = BigDecimal.valueOf(65);
    private static final BigDecimal Seventy = BigDecimal.valueOf(70);
    private static final BigDecimal SeventyFive = BigDecimal.valueOf(75);
    private static final BigDecimal Eighty = BigDecimal.valueOf(80);
    public static final String RULE_31_1 = "31(1)";
    public static final String RULE_AMD19_27_1 = "27(1)";

	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

    
    @Override
    public Plan validate(Plan pl) {
        for (Block block : pl.getBlocks()) {
            if (block.getCoverage().isEmpty()) {
                pl.addError("coverageArea" + block.getNumber(), "Coverage Area for block " + block.getNumber() + " not Provided");
            }
        }
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        BigDecimal totalCoverage = BigDecimal.ZERO;
        BigDecimal totalCoverageArea = BigDecimal.ZERO;

		for (Block block : pl.getBlocks()) {
			BigDecimal coverageAreaWithoutDeduction = BigDecimal.ZERO;
			BigDecimal coverageDeductionArea = BigDecimal.ZERO;

			for (Measurement coverage : block.getCoverage()) {
				coverageAreaWithoutDeduction = coverageAreaWithoutDeduction.add(coverage.getArea());
			}
			for (Measurement deduct : block.getCoverageDeductions()) {
				coverageDeductionArea = coverageDeductionArea.add(deduct.getArea());
			}
			if (block.getBuilding() != null) {
				block.getBuilding().setCoverageArea(coverageAreaWithoutDeduction.subtract(coverageDeductionArea));
				BigDecimal coverage = BigDecimal.ZERO;
				if (pl.getPlot().getArea().doubleValue() > 0)
					coverage = block.getBuilding().getCoverageArea().multiply(BigDecimal.valueOf(100))
							.divide(pl.getPlot().getArea(), DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);

				block.getBuilding().setCoverage(coverage);

				totalCoverageArea = totalCoverageArea.add(block.getBuilding().getCoverageArea());
				// totalCoverage =
				// totalCoverage.add(block.getBuilding().getCoverage());
			}

		}

        //pl.setCoverageArea(totalCoverageArea);
        // use plotBoundaryArea
        if (pl.getPlot() != null && pl.getPlot().getPlotBndryArea().doubleValue() > 0 && pl.getPlanInformation().getPlotArea() != null) {
            BigDecimal plotBndryArea = pl.getPlot().getPlotBndryArea().setScale(0, ROUNDMODE_MEASUREMENTS);
            BigDecimal plotArea = pl.getPlanInformation().getPlotArea().setScale(0, ROUNDMODE_MEASUREMENTS);

            BigDecimal area = plotBndryArea.compareTo(plotArea) >= 0 ? plotArea : plotBndryArea;
        if (area.doubleValue() > 0)
            totalCoverage = totalCoverageArea.multiply(BigDecimal.valueOf(100)).divide(area,
                    DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
        pl.setCoverage(totalCoverage);
        if (pl.getVirtualBuilding() != null) {
            pl.getVirtualBuilding().setTotalCoverageArea(totalCoverageArea);
        }
        
        /*
         * Check whether in each block, same set of occupencies present ?
         * If same occupancy type for whole plan the use covered area. compare with plot area required. 
         * If different occupancies, get floorwise occupancies and check the coverage percentage and compare the area with plot area
         * If  More than one blocks and occupancies are same, use covered area concept. Else, each blockwise, floor wise use the same logic.
         * Print covered or occupancy wise floorwise output.
         */
		
        // for weighted coverage 
           boolean exemption = ProcessHelper.isSmallPlot(pl);
			if (exemption) {
				// Print excemption details for small plot.
				ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
				scrutinyDetail.setKey("Common_Coverage");
				scrutinyDetail.setHeading("Coverage in Percentage");
				scrutinyDetail.addColumnHeading(1, RULE_NO);
				scrutinyDetail.addColumnHeading(2, DESCRIPTION);
				scrutinyDetail.addColumnHeading(3, OCCUPANCY);
				scrutinyDetail.addColumnHeading(4, PROVIDED);
				scrutinyDetail.addColumnHeading(5, STATUS);

				String desc = "Coverage";
				String ruleNo = RULE_AMD19_27_1;

				OccupancyTypeHelper mostRestrictiveOccupancy = getMostRestrictiveCoverage(
						pl.getVirtualBuilding().getOccupancyTypes());
				String occupancyname = mostRestrictiveOccupancy.getType().getName();

				Map<String, String> details = new HashMap<>();
				details.put(RULE_NO, ruleNo);
				details.put(DESCRIPTION, desc);
				details.put(OCCUPANCY, occupancyname);
				details.put(PROVIDED, "Excempted for small plot.");
				details.put(STATUS, Result.Accepted.getResultVal());
				scrutinyDetail.getDetail().add(details);
				pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
			        
			} else {
				if(pl.getOccupancies()!=null && pl.getOccupancies().size()==1) //Mean the blocks has more than one type of occupancy or any one block has more than one type of occupancy.
				{
					//Based on covered area, based on most restrictive occupancy, calculate the expected plot area
					
					//BigDecimal weightedArea = BigDecimal.ZERO;
					BigDecimal weightedCoverage = BigDecimal.ZERO;
					weightedCoverage = weightedCoverage.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);

 
					OccupancyTypeHelper mostRestrictiveOccupancy = getMostRestrictiveCoverage(
							pl.getVirtualBuilding().getOccupancyTypes());
					weightedCoverage=getPermissibleCoverage(mostRestrictiveOccupancy);
					
			    	processCoverage(pl, mostRestrictiveOccupancy.getType().getName(), pl.getCoverage().setScale(2, ROUNDMODE_MEASUREMENTS),
							weightedCoverage.setScale(2, ROUNDMODE_MEASUREMENTS));
				
				}else
				{
			        Map<Integer, List<Occupancy>> codesMap = new HashMap<Integer,List<Occupancy>>();
					BigDecimal weightedArea = BigDecimal.ZERO;

					 for (Block block : pl.getBlocks()) {
						//sum total area present in each floor, occupancy wise. Also save block and floor information to print.
					  
						if( block.getBuilding()!=null)
						 for (Floor flr : block.getBuilding().getFloors() ) {
							 
							 if(codesMap!=null && !codesMap.isEmpty() && codesMap.containsKey(Integer.valueOf(flr.getNumber()))) {
								 List<Occupancy> occupancies = codesMap.get(flr.getNumber());
								 occupancies.addAll(flr.getOccupancies());
								 codesMap.put(Integer.valueOf(flr.getNumber()), occupancies);  
							 } else
								 codesMap.put(flr.getNumber(), flr.getOccupancies());
						 }
					 }
					 
			            BigDecimal pArea = plotBndryArea.compareTo(plotArea) >= 0 ? plotArea : plotBndryArea;
				 
				        for (Map.Entry<Integer, List<Occupancy>> floorOccupancies : codesMap.entrySet())  
				        {
				        	for(Occupancy occ:floorOccupancies.getValue())
							 {
								BigDecimal occupancyWiseCoverage = occ.getBuiltUpArea().multiply(getPermissibleCoverage(occ.getTypeHelper()));
								weightedArea = weightedArea.add(occupancyWiseCoverage);
							}
				        	processCoverage(pl,"Coverage in Floor " +floorOccupancies.getKey(), weightedArea.setScale(2, ROUNDMODE_MEASUREMENTS),
				        			pArea.setScale(2, ROUNDMODE_MEASUREMENTS));
				        }
				   
					 }
					 //each floorwise, occupancy wise, coverage valuewise compare required plot area.
				}
			}
			 
        return pl;
    }

    private BigDecimal getPermissibleCoverage(OccupancyTypeHelper type) {
        switch (type.getType().getCode()) {
        case B1:
            return ThirtyFive;
        case B2:
        case B3:
            return Fifty;

        case D1:
            return Fifty;
        case D:
        case D2:	
            return Forty;

        case I1:
		case I2:
		case I3:
		case I4:
		case I5:
		case I6:
        case F3:
            return FortyFive;

        case C:
        case C1:
        case C2:
        case C3:
            return Fifty;

        case A1:
        case A4:
        case A5:
        case A2:
        case A3:
        case F:
        case F1:
        case F2:
            return SixtyFive;

        case E:
        case G1:
        case G2:
        case G3:
        case G4:
        case G5:
            return Sixty;
        case H:
            return Seventy;
        case J:
            return SixtyFive;

        default:
            return BigDecimal.ZERO;
        }
    }
    private void processCoverage(Plan pl, String occupancy, BigDecimal coverage, BigDecimal upperLimit) {
        ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.setKey("Common_Coverage");
        scrutinyDetail.setHeading("Coverage in Percentage");
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, OCCUPANCY);
        scrutinyDetail.addColumnHeading(4, PERMISSIBLE);
        scrutinyDetail.addColumnHeading(5, PROVIDED);
        scrutinyDetail.addColumnHeading(6, STATUS);

        String desc = getLocaleMessage(RULE_DESCRIPTION_KEY, upperLimit.toString());
        String actualResult = getLocaleMessage(RULE_ACTUAL_KEY, coverage.toString());
        String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, upperLimit.toString());
        String ruleNo= RULE_AMD19_27_1;; 	
        
        if (coverage.doubleValue() > 0 && coverage.doubleValue() <= upperLimit.doubleValue()) {
            Map<String, String> details = new HashMap<>();
            details.put(RULE_NO, ruleNo);
            details.put(DESCRIPTION, desc);
            details.put(OCCUPANCY, occupancy);
            details.put(PERMISSIBLE, expectedResult);
            details.put(PROVIDED, actualResult);
            details.put(STATUS, Result.Accepted.getResultVal());
            scrutinyDetail.getDetail().add(details);
            pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

        } else {
            Map<String, String> details = new HashMap<>();
            details.put(RULE_NO, ruleNo);
            details.put(DESCRIPTION, desc);
            details.put(OCCUPANCY, occupancy);
            details.put(PERMISSIBLE, expectedResult);
            details.put(PROVIDED, actualResult);
            details.put(STATUS, Result.Not_Accepted.getResultVal());
            scrutinyDetail.getDetail().add(details);
            pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

        }

    }

    protected OccupancyTypeHelper getMostRestrictiveCoverage(Set<OccupancyTypeHelper> distinctOccupancyTypes) {
        Set<String> codes = new HashSet<>();
        Map<String, OccupancyTypeHelper> codesMap = new HashMap<>();
        for (OccupancyTypeHelper typeHelper : distinctOccupancyTypes) {
            if (typeHelper.getType() != null)
                codesMap.put(typeHelper.getType().getCode(), typeHelper);
            if (typeHelper.getSubtype() != null)
                codesMap.put(typeHelper.getSubtype().getCode(), typeHelper);
        }
        codes = codesMap.keySet();
        if (codes.contains(B1))
            return codesMap.get(B1);
        if (codes.contains(D2))
            return codesMap.get(D2);
        if (codes.contains(D))
            return codesMap.get(D);
        if (codes.contains(D1))
            return codesMap.get(D1);
        if (codes.contains(B2))
            return codesMap.get(B2);
        if (codes.contains(B3))
            return codesMap.get(B3);
        if (codes.contains(I2))
            return codesMap.get(I2);
        if (codes.contains(I1))
            return codesMap.get(I1);
        if (codes.contains(F3))
            return codesMap.get(F3);
        if (codes.contains(C))
            return codesMap.get(C);
        if (codes.contains(C1))
            return codesMap.get(C1);
        if (codes.contains(C2))
            return codesMap.get(C2);
        if (codes.contains(C3))
            return codesMap.get(C3);
        if (codes.contains(E))
            return codesMap.get(E);
        if (codes.contains(G1))
            return codesMap.get(G1);
        if (codes.contains(G2))
            return codesMap.get(G2);
        if (codes.contains(A1))
            return codesMap.get(A1);
        if (codes.contains(A4))
            return codesMap.get(A4);
        if (codes.contains(A5))
            return codesMap.get(A5);
        if (codes.contains(A2))
            return codesMap.get(A2);
        if (codes.contains(F))
            return codesMap.get(F);
        if (codes.contains(F1))
            return codesMap.get(F1);
        if (codes.contains(F2))
            return codesMap.get(F2);
        if (codes.contains(H))
            return codesMap.get(H);
        if (codes.contains(J))
            return codesMap.get(J);
        else
            return null;
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> coverageAmend = new ConcurrentHashMap<>();
        coverageAmend.put(AMEND_NOV19, AMEND_DATE_081119);
        return coverageAmend;
    }
}
