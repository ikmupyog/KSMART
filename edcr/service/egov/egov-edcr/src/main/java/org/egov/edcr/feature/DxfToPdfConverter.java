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

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.egov.common.entity.edcr.EdcrPdfDetail;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class DxfToPdfConverter extends FeatureProcess {

	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();


	@Override
	public Plan validate(Plan plan) {
		

		Map<String, Boolean> mandatory=new HashMap<String, Boolean>();
		Boolean servicePlan=false,sectionPlan=false,sitePlan=false,floorPlan=false,parkingPlan=false,utility=false,elevationPlan=false;
		Boolean excavationPlan=false;
		boolean isSinglePrint=false;
		for(EdcrPdfDetail detail: plan.getEdcrPdfDetails())
		{
			if(detail.getConvertedPdf()!=null){
			if(detail.getConvertedPdf().getName().contains("SINGLE") || detail.getConvertedPdf().getName().contains("_S_PRINT"))
			{
				isSinglePrint=true;
			}
			
			if(detail.getConvertedPdf().getName().contains("SITE_PLAN"))
				sitePlan=true;
			else if(detail.getConvertedPdf().getName().contains("SERVICE_PLAN"))
				servicePlan=true;
			else if(detail.getConvertedPdf().getName().contains("UTILITY"))
				utility=true;
			
			if(null !=plan.getParkingRequired() && plan.getParkingRequired()>0)
			{
				if(detail.getConvertedPdf().getName().contains("PARKING_PLAN"))
					parkingPlan=true;
			}
			if(null !=plan.getPlanInformation().getDepthCutting() && plan.getPlanInformation().getDepthCutting()==true )
			{
				if(detail.getConvertedPdf().getName().contains("EXCAVATION_PLAN"))
					excavationPlan=true;
			}
			}
		}
		for(EdcrPdfDetail detail: plan.getEdcrPdfDetails())
		{	
			if(isSinglePrint) break;
			if(detail.getConvertedPdf()!=null){
			if(!isSinglePrint)
			{
				if(detail.getConvertedPdf().getName().contains("SECTION_PLAN"))
					sectionPlan=true;	
				else if(detail.getConvertedPdf().getName().contains("FLOOR_PLAN"))
					floorPlan=true;
				else if(detail.getConvertedPdf().getName().contains("ELEVATION_PLAN"))
					elevationPlan=true;
			}
			
			
		}
		}
		
		if(!servicePlan )
		{
			plan.addError("service.plan.print.mandatory", "SERVICE_PLAN_PRINT is mandatory");
		}
		if(!sitePlan )
		{
			plan.addError("site.plan.print.mandatory", "SITE_PLAN_PRINT is mandatory");
		}
		if(!utility )
		{
			plan.addError("utility.plan.print.mandatory", "UTILITY_PLAN_PRINT is mandatory");
		}
		
		if(!isSinglePrint && !sectionPlan )
		{
			plan.addError("section.plan.print.mandatory", "SECTION_PLAN_PRINT is mandatory");
		}
		if(!isSinglePrint && !floorPlan )
		{
			plan.addError("floor.plan.print.mandatory", "FLOOR_PLAN_PRINT is mandatory");
		}
		if(!isSinglePrint && !elevationPlan )
		{
			plan.addError("elevation.plan.print.mandatory", "ELEVATION_PLAN_PRINT is mandatory");
		}
		
		if(null !=plan.getParkingRequired() && plan.getParkingRequired() >0 && !parkingPlan)
		{
			plan.addError("parking.plan.print.mandatory", "PARKING_PLAN_PRINT is mandatory");
		}
	
		if( (null !=plan.getPlanInformation().getDepthCutting() && plan.getPlanInformation().getDepthCutting()==true ) && !excavationPlan )
		{
			plan.addError("site.plan.print.mandatory", "EXCAVATION_DETAIL is mandatory");
		}
		
		
		return plan;
	}

	@Override
	public Plan process(Plan plan) {
		validate(plan);
		return plan;
		}


	@Override
	public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
	}

}