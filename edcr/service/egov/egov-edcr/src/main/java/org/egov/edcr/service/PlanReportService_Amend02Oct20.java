package org.egov.edcr.service;

import static ar.com.fdvs.dj.domain.constants.Stretching.RELATIVE_TO_BAND_HEIGHT;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.F3;

import java.awt.Color;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.dcr.helper.Declaration;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.DcrReportBlockDetail;
import org.egov.common.entity.edcr.DcrReportFloorDetail;
import org.egov.common.entity.edcr.DcrReportFloorUnitDetail;
import org.egov.common.entity.edcr.DcrReportOutput;
import org.egov.common.entity.edcr.DcrReportPlanDetail;
import org.egov.common.entity.edcr.ElectricLine;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.FloorUnit;
import org.egov.common.entity.edcr.MezzanineFloor;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.ParkingArea;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.ReportOccupancyFloorUnit;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.ScrutinyDetail.ColumnHeadingDetail;
import org.egov.common.entity.edcr.VirtualBuilding;
import org.egov.common.entity.edcr.VirtualBuildingReport;
import org.egov.edcr.autonumber.DcrApplicationNumberGenerator;
import org.egov.edcr.autonumber.OCPlanScrutinyNumberGenerator;
import org.egov.edcr.entity.ApplicationType;
import org.egov.edcr.entity.EdcrApplication;
import org.egov.edcr.entity.EdcrApplicationDetail;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.egov.infra.reporting.util.ReportUtil;
import org.egov.infra.utils.DateUtils;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ar.com.fdvs.dj.core.DJConstants;
import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.core.layout.HorizontalBandAlignment;
import ar.com.fdvs.dj.domain.AutoText;
import ar.com.fdvs.dj.domain.DJCalculation;
import ar.com.fdvs.dj.domain.DJDataSource;
import ar.com.fdvs.dj.domain.DynamicReport;
import ar.com.fdvs.dj.domain.Style;
import ar.com.fdvs.dj.domain.builders.ColumnBuilder;
import ar.com.fdvs.dj.domain.builders.ColumnBuilderException;
import ar.com.fdvs.dj.domain.builders.FastReportBuilder;
import ar.com.fdvs.dj.domain.constants.Font;
import ar.com.fdvs.dj.domain.constants.HorizontalAlign;
import ar.com.fdvs.dj.domain.constants.Page;
import ar.com.fdvs.dj.domain.constants.VerticalAlign;
import ar.com.fdvs.dj.domain.entities.Subreport;
import ar.com.fdvs.dj.domain.entities.columns.AbstractColumn;
import ar.com.fdvs.dj.domain.entities.conditionalStyle.ConditionalStyle;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class PlanReportService_Amend02Oct20 extends PlanReportService {
	
    private static final Logger LOG = LogManager.getLogger(PlanReportService_Amend02Oct20.class);

    private static final String TOTAL = "Total";
    private static final String DESCRIPTION = "DESCRIPTION";
    private static final String RULE_NO = "RULE NO";
    public static final String BLOCK = "Block";
    public static final String STATUS = "STATUS";
    @Value("${edcr.client.subreport}")
    private boolean clientSpecificSubReport;
    @Autowired
    private CityService cityService;
    @Autowired
    private DcrApplicationNumberGenerator dcrApplicationNumberGenerator;
    @Autowired
    private OCPlanScrutinyNumberGenerator ocPlanScrutinyNumberGenerator;
    @Autowired
    private JasperReportService reportService;


    public static final String FRONT_YARD_DESC = "Front Setback";
    public static final String REAR_YARD_DESC = "Rear Setback";
    public static final String SIDE_YARD1_DESC = "Side Setback 1";
    public static final String SIDE_YARD2_DESC = "Side Setback 2";
    public static final String BSMT_FRONT_YARD_DESC = "Basement Front Setback";
    public static final String BSMT_REAR_YARD_DESC = "Basement Rear Setback";
    public static final String BSMT_SIDE_YARD1_DESC = "Basement Side Setback 1";
    public static final String BSMT_SIDE_YARD2_DESC = "Basement Side Setback 2";
    public static final String BSMT_SIDE_YARD_DESC = "Basement Side Setback";
    public static final String SIDE_YARD_DESC = "Side Setback";
    private static final String SIDENUMBER = "Side Number";
    private static final String SIDENUMBER_NAME = "Setback";
    private static final String LEVEL = "Level";
    private static final String COMBINED_BLOCKS_SUMMARY_DETAILS = "2) OVERALL AREA SUMMARY";
    //private static final String GENERAL_DETAILS = "GENERALDETAILS";
    private static final String BLOCK_WISE_SUMMARY = "3) BLOCKWISE VALIDATIONS";
    private static final String TOTAL_FLOOR_UNITS = "Total Floor Units";
    private static final String NUMBERS = " Numbers";
    private static final String DINE_ROOM = "dineRoom";
    private static final String ROOM_WOAB = "roomWOAB";
    private static final String ROOM_WAB = "roomWAB";
    private static final String A4_UNITS = "a4Units";
    private static final String A1_UNITS = "a1Units";
    public static final String FLOOR_UNITS = "Floor Units";
    private static final String PARKING_AREA = "AREA PROVIDED FOR PARKING INSIDE THE BUILDING IN SQ M";
    public static final String KITCHEN_UNITS = "Kithchen Units";


    private Subreport getSub(ScrutinyDetail detail, int j, String title, String heading, String subheading,
            String dataSourceName) {
        try {
            List<ConditionalStyle> listCondStyle = getConditonalStyles();
            FastReportBuilder frb = new FastReportBuilder();
            int size = detail.getColumnHeading().keySet().size();
            Double byeLawColumnSize = 60d;
            Double statusColumnSize = 60d;
            Double columnSize = (595d - (byeLawColumnSize + statusColumnSize)) / (size - 2);
            for (Integer s : detail.getColumnHeading().keySet()) {
                ColumnHeadingDetail columnHeading = detail.getColumnHeading().get(s);
                int columnWidth = columnSize.intValue();
                if ("Rule No".equalsIgnoreCase(columnHeading.name)) {
                    columnWidth = byeLawColumnSize.intValue();
                }
                if (STATUS.equalsIgnoreCase(columnHeading.name)) {
                    columnWidth = statusColumnSize.intValue();
                }
                frb.addColumn(columnHeading.name.toUpperCase(), columnHeading.name, String.class.getName(), columnWidth);
            }
            //frb.setMargins(1, 1, 1, 1);
            frb.setUseFullPageWidth(true);
            List<AbstractColumn> columns = frb.getColumns();
            for (AbstractColumn col : columns) {
                if (STATUS.equalsIgnoreCase(col.getTitle()))
                    col.setConditionalStyles(listCondStyle);

            }
            if (heading != null)
                frb.setTitle(j + "." + heading.toUpperCase());
            else
                frb.setTitle(title.toUpperCase());

            if (subheading != null)
                frb.setSubtitle("\t" + subheading.toUpperCase());
            
            frb.setTitleStyle(reportService.getNewReportTitleStyle());
           // frb.setHeaderHeight(5);
            frb.setDefaultStyles(reportService.getNewReportTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getNewReportColumnHeaderStyle(), reportService.getNewReportDetailNumberStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            sub.setDatasource(new DJDataSource(dataSourceName, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException | ClassNotFoundException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;

    }

    private Subreport getBlkDetails(DcrReportBlockDetail dcrReportBlockDetail, boolean isProposed) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

           /* AbstractColumn colored = ColumnBuilder.getNew().setColumnProperty("",String.class.getName() ).
                    setWidth(45).setHeaderStyle(reportService.getColouredStyle())
                     
                    .build();*/

            AbstractColumn floor = ColumnBuilder.getNew().setColumnProperty("floorNo", String.class.getName())
                    .setTitle("FLOOR").setWidth(45).setHeaderStyle(reportService.getNewReportColumnHeaderStyle()).build();
            
            AbstractColumn floorDescription = ColumnBuilder.getNew().setColumnProperty("floorDescription", String.class.getName())
                    .setTitle("FLOOR DESCRIPTION").setWidth(100).setHeaderStyle(reportService.getNewReportColumnHeaderStyle())
                    .build();

            AbstractColumn occupancy = ColumnBuilder.getNew().setColumnProperty("occupancy", String.class.getName())
                    .setTitle("OCCUPANCY").setWidth(100).setHeaderStyle(reportService.getNewReportColumnHeaderStyle())
                    .build();

            AbstractColumn builtUpArea = createColumn("builtUpArea","Num","BUILT UP AREA (Sq M)",100,null);
          
            frb.addGlobalFooterVariable(builtUpArea, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());
            
            AbstractColumn floorArea =createColumn("floorArea","Num","FLOOR AREA (Sq M)",100,null);
            		
            frb.addGlobalFooterVariable(floorArea, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());

            AbstractColumn parkingDetail =ColumnBuilder.getNew().setColumnProperty("parkingDetail", String.class.getName())
                    .setTitle(PARKING_AREA).setWidth(100).setHeaderStyle(reportService.getNewReportColumnHeaderParkingStyle())
                    .build();
            		
            frb.addGlobalFooterVariable(parkingDetail, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());
         
            frb.addColumn(floor);
            frb.addColumn(floorDescription);
            frb.addColumn(occupancy);
            frb.addColumn(builtUpArea);
            frb.addColumn(floorArea);
            frb.addColumn(parkingDetail);

			if (isProposed)
				frb.setTitle("2) PROPOSED AREA AND OCCUPANCY");
			else
				frb.setTitle("2) EXISTING AREA AND OCCUPANCY");
            frb.setTitleStyle(reportService.getTitleStyle());
           /* frb.setHeaderHeight(5);
            frb.setTopMargin(10);
            frb.setBottomMargin(0);
            frb.setLeftMargin(20);*/
            frb.setMargins(0, 0, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getNewReportColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNewReportDetailStyle());
            DynamicReport build = frb.build();
             
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            if (isProposed) {
                sub.setDatasource(new DJDataSource("Block No " + dcrReportBlockDetail.getBlockNo(),
                        DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            } else
                sub.setDatasource(new DJDataSource("Existing Block No " + dcrReportBlockDetail.getBlockNo(),
                        DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
    
 /*   private Subreport getGeneralDetails() {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            AbstractColumn colored = ColumnBuilder.getNew().setColumnProperty("",String.class.getName() ).
                    setWidth(45).setHeaderStyle(reportService.getColouredStyle())
                     
                    .build();

            AbstractColumn keyFiled = ColumnBuilder.getNew().setColumnProperty("floorNo", String.class.getName())
                    .setTitle("FLOOR").setWidth(45).setHeaderStyle(reportService.getNewReportColumnHeaderStyle()).build();
            
            AbstractColumn floorDescription = ColumnBuilder.getNew().setColumnProperty("floorDescription", String.class.getName())
                    .setTitle("FLOOR DESCRIPTION").setWidth(100).setHeaderStyle(reportService.getNewReportColumnHeaderStyle())
                    .build();

            AbstractColumn occupancy = ColumnBuilder.getNew().setColumnProperty("occupancy", String.class.getName())
                    .setTitle("OCCUPANCY").setWidth(100).setHeaderStyle(reportService.getNewReportColumnHeaderStyle())
                    .build();

            AbstractColumn builtUpArea = createColumn("builtUpArea","Num","BUILT UP AREA(Sq M)",100,null);
          
            frb.addGlobalFooterVariable(builtUpArea, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());
            
            AbstractColumn floorArea =createColumn("floorArea","Num","FLOOR AREA(Sq M)",100,null);
            		
            frb.addGlobalFooterVariable(floorArea, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());

            AbstractColumn parkingDetail =ColumnBuilder.getNew().setColumnProperty("parkingDetail", String.class.getName())
                    .setTitle(PARKING_AREA).setWidth(60).setHeaderStyle(reportService.getNewReportColumnHeaderParkingStyle())
                    .build();
            		
            frb.addGlobalFooterVariable(parkingDetail, DJCalculation.SUM, reportService.getNewReportDetailNumberStyle());
         
            frb.addColumn(floor);
            frb.addColumn(floorDescription);
            frb.addColumn(occupancy);
            frb.addColumn(builtUpArea);
            frb.addColumn(floorArea);
            frb.addColumn(parkingDetail);

          
            frb.setTitle("2) PROPOSED AREA AND OCUUPANCY") ;
            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setHeaderHeight(5);
            frb.setTopMargin(10);
            frb.setBottomMargin(0);
            frb.setLeftMargin(20);
            
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getNewReportColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNewReportDetailStyle());
            DynamicReport build = frb.build();
             
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            if (isProposed) {
                sub.setDatasource(new DJDataSource("Block No " + dcrReportBlockDetail.getBlockNo(),
                        DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            } else
                sub.setDatasource(new DJDataSource("Existing Block No " + dcrReportBlockDetail.getBlockNo(),
                        DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }*/

	private AbstractColumn createColumn(String jField,String type, String heading,int width,Style style) {
	if(style==null)
	{
		if(type.equals("Num"))
		{
			style=reportService.getNewReportDetailNumberStyle();
		}
		else
		{
			style=reportService.getNewReportDetailStyle();
		}
	}
		return ColumnBuilder.getNew()
		        .setColumnProperty(jField, type.equals("Num")?BigDecimal.class.getName():String.class.getName())
		        .setTitle(heading)
		        .setWidth(width)
		        .setStyle(style)
		        .setHeaderStyle(reportService.getNewReportColumnHeaderStyle()).build();
	}
   
	/*private AbstractColumn createColumn(String jField, type, String heading,int width,Style style) {
		
		return ColumnBuilder.getNew()
		        .setColumnProperty(jField, type.equals("Num")?BigDecimal.class.getName():String.class.getName()).setTitle(heading)
		        .setWidth(width).setStyle(style)
		        .setHeaderStyle(reportService.getNewReportColumnHeaderStyle()).build();
	}*/

    private Subreport getAreaDetails(boolean isProposed) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            AbstractColumn builtUpArea = ColumnBuilder.getNew()
                    .setColumnProperty(isProposed ? "proposedBuitUpArea" : "totalExistingBuiltUpArea",
                            BigDecimal.class.getName())
                    .setTitle("Built Up Area in m²").setWidth(120).setStyle(reportService.getTotalNumberStyle())
                    .build();
            
            AbstractColumn floorArea = ColumnBuilder.getNew()
                    .setColumnProperty(isProposed ? "proposedFloorArea" : "totalExistingFloorArea", BigDecimal.class.getName())
                    .setTitle("Floor Area in m²").setWidth(120)
                    .setStyle(reportService.getTotalNumberStyle())
                    .build();

            frb.addColumn(builtUpArea);
            frb.addColumn(floorArea);

            if (isProposed)
                frb.setTitle("Total Proposed Areas");
            else
                frb.setTitle("Total Existing Areas");

            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setHeaderHeight(5);
            frb.setTopMargin(5);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            if (isProposed) {
                sub.setDatasource(
                        new DJDataSource("Total Proposed Details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            } else
                sub.setDatasource(
                        new DJDataSource("Total Existing Details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    
    private Subreport createBlockDetails(DcrReportBlockDetail dcrReportBlockDetail, boolean isProposed, List<DcrReportFloorDetail> list) {
        try {

            FastReportBuilder frb = new FastReportBuilder();
            
            AbstractColumn colored = ColumnBuilder.getNew()
                    .setWidth(50).setStyle(reportService.getColouredStyle())
                    .build();
            
            AbstractColumn rest = ColumnBuilder.getNew()
                     .setWidth(520)
                     .build();

            frb.addColumn(colored);
            frb.addColumn(rest);
            frb.addSubreportInGroup("rest", 1, getBlkDetails(dcrReportBlockDetail,isProposed).getDynamicReport(), new ClassicLayoutManager(),
            		"block details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0, null, false, true);

            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setHeaderHeight(5);
            frb.setTopMargin(5);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            
            sub.setDynamicReport(build);
            
            
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
          /* LayoutManager mgr= new ClassicLayoutManager();
           mgr.applyLayout(arg0, arg1);*/
          
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
    
    private Subreport getTotalAreaDetails(VirtualBuildingReport virtualBuildingReport) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            if (virtualBuildingReport.getTotalConstructedArea() != null
                    && virtualBuildingReport.getTotalConstructedArea().compareTo(BigDecimal.ZERO) > 0) {
                AbstractColumn builtUpArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuitUpArea", BigDecimal.class.getName()).setTitle("BUILT UP AREA (Sq M)")
                        .setWidth(135).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName())
                        .setTitle("FLOOR AREA (Sq M)").setWidth(135)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                AbstractColumn coverageArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalCoverageArea", BigDecimal.class.getName()).setTitle("COVERED AREA (Sq M)")
                        .setWidth(135).setStyle(reportService.getNewReportDetailStyle()).build();

                AbstractColumn constructedArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalConstructedArea", BigDecimal.class.getName())
                        .setTitle("ALREADY CONSTRUCTED AREA Sq M)").setWidth(140)
                        .setStyle(reportService.getNewReportDetailStyle()).build();

                frb.addColumn(builtUpArea);
                frb.addColumn(floorArea);
                frb.addColumn(coverageArea);
                frb.addColumn(constructedArea);
            } else {
                AbstractColumn builtUpArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuitUpArea", BigDecimal.class.getName()).setTitle("BUILT UP AREA(Sq M)")
                        .setWidth(180).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName())
                        .setTitle("FLOOR AREA (Sq M)").setWidth(180)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                AbstractColumn coverageArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalCoverageArea", BigDecimal.class.getName()).setTitle("COVERED AREA (Sq M)")
                        .setWidth(180).setStyle(reportService.getNewReportDetailStyle()).build();

                frb.addColumn(builtUpArea);
                frb.addColumn(floorArea);
                frb.addColumn(coverageArea);
            }

            frb.setTitle("TOTAL AREA");
            frb.setTitleStyle(reportService.getNewReportTitleStyle());
            //frb.setHeaderHeight(5);
            //frb.setTopMargin(5);
            //frb.setTopMargin(120);
            frb.setMargins(0, 15, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource("Total Area Details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
    
      
    private Subreport getRegularizationArea(VirtualBuildingReport virtualBuildingReport, boolean isExistingBuildingPresent) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            if (virtualBuildingReport.getTotalConstructedArea() != null
                    && virtualBuildingReport.getTotalConstructedArea().compareTo(BigDecimal.ZERO) > 0) {
            	
            	 AbstractColumn blocks = ColumnBuilder.getNew()
                         .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                         .setWidth(120).setStyle(reportService.getNewReportDetailStyle()).build();
                AbstractColumn builtUpArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuiltUpArea", BigDecimal.class.getName()).setTitle("BUILT UP AREA (Sq M)")
                        .setWidth(210).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName())
                        .setTitle("FLOOR AREA (Sq M)").setWidth(210)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

              
                frb.addColumn(blocks);
                frb.addColumn(builtUpArea);
                frb.addColumn(floorArea);
                
            } else {
                AbstractColumn blocks = ColumnBuilder.getNew()
                        .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                        .setWidth(120).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn builtupArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuiltUpArea", BigDecimal.class.getName())
                        .setTitle("BUILT UP AREA (Sq M)").setWidth(210)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName()).setTitle("FLOOR AREA (Sq M)")
                        .setWidth(210).setStyle(reportService.getNewReportDetailStyle()).build();

                frb.addColumn(blocks);
                frb.addColumn(builtupArea);
                frb.addColumn(floorArea);
            }

            if(isExistingBuildingPresent)
             	frb.setTitle("2-4) REGULARIZATION AREA");
             else
             	frb.setTitle("2-3) REGULARIZATION AREA");
            
            frb.setTitleStyle(reportService.getNewReportTitleStyle());
            //frb.setHeaderHeight(5);
           // frb.setTopMargin(5);
           
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setMargins(0, 0, 0, 0);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource("Regularization Area Details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    private Subreport getExistingArea(VirtualBuildingReport virtualBuildingReport) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            if (virtualBuildingReport.getTotalConstructedArea() != null
                    && virtualBuildingReport.getTotalConstructedArea().compareTo(BigDecimal.ZERO) > 0) {
            	
            	 AbstractColumn blocks = ColumnBuilder.getNew()
                         .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                         .setWidth(120).setStyle(reportService.getNewReportDetailStyle()).build();
                AbstractColumn builtUpArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuiltUpArea", BigDecimal.class.getName()).setTitle("BUILT UP AREA (Sq M)")
                        .setWidth(210).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName())
                        .setTitle("FLOOR AREA (Sq M)").setWidth(210)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

              
                frb.addColumn(blocks);
                frb.addColumn(builtUpArea);
                frb.addColumn(floorArea);
                
            } else {
                AbstractColumn blocks = ColumnBuilder.getNew()
                        .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                        .setWidth(120).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn builtupArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuiltUpArea", BigDecimal.class.getName())
                        .setTitle("BUILT UP AREA (Sq M)").setWidth(210)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName()).setTitle("FLOOR AREA (Sq M)")
                        .setWidth(210).setStyle(reportService.getNewReportDetailStyle()).build();

                frb.addColumn(blocks);
                frb.addColumn(builtupArea);
                frb.addColumn(floorArea);
            }

            frb.setTitle("2-1) EXISTING AREA");
            frb.setTitleStyle(reportService.getNewReportTitleStyle());
            //frb.setHeaderHeight(5);
           // frb.setTopMargin(5);
           
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setMargins(0, 0, 0, 0);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource("Existing Area Details", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    private Subreport getProposedArea(String dataSource, boolean isExistingBuildingPresent) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

             {
            	 
            	/* AbstractColumn emptyRow = ColumnBuilder.getNew().setWidth(120)
                         .setColumnProperty("empty", String.class.getName())  .setWidth(120).build(); */
                         
                        
                AbstractColumn blocks = ColumnBuilder.getNew()
                        .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                        .setWidth(120).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn builtupArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalBuiltUpArea", BigDecimal.class.getName())
                        .setTitle("BUILT UP AREA (Sq M)").setWidth(210)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                AbstractColumn floorArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalFloorArea", BigDecimal.class.getName()).setTitle("FLOOR AREA (Sq M)")
                        .setWidth(210).setStyle(reportService.getNewReportDetailStyle()).build();
                //frb.addColumn(emptyRow);
                frb.addColumn(blocks);
                frb.addColumn(builtupArea);
                frb.addColumn(floorArea);
            }

             if(isExistingBuildingPresent)
             	frb.setTitle("2-2) PROPOSED AREA");
             else 
             	frb.setTitle("2-1) PROPOSED AREA");
            frb.setTitleStyle(reportService.getNewReportSubTitleStyle());
           
           // frb.setSubtitleHeight(5);
          
           // frb.setHeaderHeight(5);
           // frb.setTopMargin(5);
           // frb.setLeftMargin(120);
            frb.setMargins(0, 0, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource(dataSource, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
   
    private Subreport createCoveredArea(String dataSource, boolean isExistingBuildingPresent) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

             {
                AbstractColumn blocks = ColumnBuilder.getNew()
                        .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                        .setWidth(200).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn builtupArea = ColumnBuilder.getNew()
                        .setColumnProperty("totalCoveredArea", BigDecimal.class.getName())
                        .setTitle("BUILT UP AREA (Sq M)").setWidth(340)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                frb.addColumn(blocks);
                frb.addColumn(builtupArea);
                
            }

             if(isExistingBuildingPresent)
             	frb.setTitle("2-3) COVERED AREA");
             else
             	frb.setTitle("2-2) COVERED AREA");
            frb.setTitleStyle(reportService.getDetailNewHeaderStyle());
            frb.setHeaderHeight(5);
            //frb.setTopMargin(5);
            //frb.setLeftMargin(25);
            frb.setMargins(0, 0, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource(dataSource, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
    
    private Subreport getUnits(String dataSource, boolean isExistingBuildingPresent) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

             {
            	 
                AbstractColumn blocks = ColumnBuilder.getNew()
                        .setColumnProperty("blockNo", String.class.getName()).setTitle("BLOCKS")
                        .setWidth(200).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn units = ColumnBuilder.getNew()
                        .setColumnProperty("totalUnits", BigDecimal.class.getName())
                        .setTitle("TOTAL UNITS (NUMBERS)").setWidth(340)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();

                frb.addColumn(blocks);
                frb.addColumn(units);
            }

             if(isExistingBuildingPresent)
             	frb.setTitle("2-4) UNITS");
             else 
             	frb.setTitle("2-3) UNITS");
            frb.setTitleStyle(reportService.getNewReportSubTitleStyle());
           
           // frb.setSubtitleHeight(5);
          
           // frb.setHeaderHeight(5);
           // frb.setTopMargin(5);
           // frb.setLeftMargin(120);
            frb.setMargins(0, 0, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource(dataSource, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }
    
    private Subreport createHeaderSubreport(String title, String dataSourceName) {
        try {

            FastReportBuilder frb = new FastReportBuilder();
            frb.setUseFullPageWidth(true);
            frb.setTitle(title);
            frb.setShowDetailBand(false);
            frb.setMargins(0, 0, 0, 0);
            frb.setTitleStyle(reportService.getNewReportSubReportTitleStyle());
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setTitleHeight(20);
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            sub.setDatasource(new DJDataSource(dataSourceName, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    private Subreport createFooterSubreport(String title, String dataSourceName) {
        try {

            FastReportBuilder frb = new FastReportBuilder();
            frb.setUseFullPageWidth(true);
            frb.setTitleHeight(5);
            frb.setTitle(title);
            frb.setMargins(0, 0, 0, 0);
            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            sub.setDatasource(new DJDataSource(dataSourceName, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

    protected void closeStream(final InputStream stream) {
        if (stream != null)
            try {
                stream.close();
            } catch (final IOException e) {
                if (LOG.isDebugEnabled())
                    LOG.debug("Error" + e.getMessage());

            }
    }

    public InputStream generateReport(Plan plan, EdcrApplication dcrApplication) {
    	
    	LOG.info("starting report......Amend02Oct20");

        FastReportBuilder drb = new FastReportBuilder();
        StringBuilder reportBuilder = new StringBuilder();

        final Style titleStyle = new Style("titleStyle");
        titleStyle.setFont(new Font(50, Font._FONT_TIMES_NEW_ROMAN, true));
        titleStyle.setHorizontalAlign(HorizontalAlign.CENTER);

        titleStyle.setFont(new Font(2, Font._FONT_TIMES_NEW_ROMAN, false));
        String applicationNumber = StringUtils.isNotBlank(dcrApplication.getApplicationNumber())
                ? dcrApplication.getApplicationNumber()
                : "NA";
        String applicationDate = DateUtils.toDefaultDateFormat(dcrApplication.getApplicationDate());

        if (plan.getVirtualBuilding() != null && !plan.getVirtualBuilding().getOccupancyTypes().isEmpty()) {
            List<String> occupancies = new ArrayList<>();
            plan.getVirtualBuilding().getOccupancyTypes().forEach(occ -> {
                if (occ.getType() != null)
                    occupancies.add(occ.getType().getName());
            });
            Set<String> distinctOccupancies = new HashSet<>(occupancies);
            plan.getPlanInformation()
                    .setOccupancy(distinctOccupancies.stream().map(String::new).collect(Collectors.joining(",")));
        }
        boolean reportStatus = false;
        boolean finalReportStatus = true;
        StringBuilder errors = new StringBuilder();
        StringBuilder nocs = new StringBuilder();
        if (plan.getNoObjectionCertificates() != null && plan.getNoObjectionCertificates().size() > 0) {
            int i = 1;
            for (Map.Entry<String, String> entry : plan.getNoObjectionCertificates().entrySet()) {
                nocs.append(String.valueOf(i)).append(". ");
                nocs.append(entry.getValue());
                nocs.append("\n");
                i++;
            }
        }

        if (plan.getErrors() != null && plan.getErrors().size() > 0) {
            int i = 1;
            for (Map.Entry<String, String> entry : plan.getErrors().entrySet()) {
                errors.append(String.valueOf(i)).append(". ");
                errors.append(entry.getValue());
                errors.append("\n");
                i++;
                finalReportStatus = false;
            }
        }

        drb.setPageSizeAndOrientation(new Page(842, 595, true));
        final JRDataSource ds = new JRBeanCollectionDataSource(Collections.singletonList(plan));
        String voltages = "";
        StringBuilder voltageString = new StringBuilder();

        if (!plan.getElectricLine().isEmpty()) {
            for (ElectricLine electricLine : plan.getElectricLine()) {
                voltageString.append(String.valueOf(electricLine.getVoltage() == null ? 0 : electricLine.getVoltage()))
                        .append(",");
            }
            if (voltageString.length() > 1) {
                voltages = voltageString.deleteCharAt(voltageString.length() - 1).toString() + " KV";
            }
        }
        if (StringUtils.isBlank(voltages)) {
            voltages = String.valueOf(BigDecimal.ZERO) + " KV";
        }

        SimpleDateFormat sf = new SimpleDateFormat("HH:MM");
        String uploadTime= sf.format(dcrApplication.getApplicationDate());
        final Map<String, Object> valuesMap = new HashMap<>();
        valuesMap.put("ulbName", ApplicationThreadLocals.getMunicipalityName());
        valuesMap.put("applicantName", dcrApplication.getApplicantName());
        valuesMap.put("licensee", dcrApplication.getArchitectInformation());
        valuesMap.put("applicationNumber", applicationNumber);
        valuesMap.put("applicationDate", applicationDate);
        valuesMap.put("fileName", dcrApplication.getDxfFile().getOriginalFilename());
        valuesMap.put("uploadTime", uploadTime);
        valuesMap.put("errors", plan.getErrors());
        valuesMap.put("errorString", errors.toString());
        valuesMap.put("nocString", nocs.toString());
        
        valuesMap.put("nocs", plan.getNoObjectionCertificates());
        valuesMap.put("reportGeneratedDate", DateUtils.toDefaultDateTimeFormat(new Date()));
        valuesMap.put("currentYear", new LocalDate().getYear());
        valuesMap.put("far", plan.getFarDetails() != null ? plan.getFarDetails().getProvidedFar() : "");
        valuesMap.put("coverage", plan.getCoverage());
        valuesMap.put("totalFloorArea",
                plan.getVirtualBuilding() != null ? plan.getVirtualBuilding().getTotalFloorArea()
                        : BigDecimal.valueOf(0));
        valuesMap.put("totalBuiltUpArea",
                plan.getVirtualBuilding() != null ? plan.getVirtualBuilding().getTotalBuitUpArea()
                        : BigDecimal.valueOf(0));
        valuesMap.put("electricLineVoltage", voltages);
        valuesMap.put("blockCount",
                plan.getBlocks() != null && !plan.getBlocks().isEmpty() ? plan.getBlocks().size() : 0);
        valuesMap.put("surrenderRoadArea", plan.getTotalSurrenderRoadArea());
        String egovLogo = ReportUtil.getImageURL("/egi/resources/global/images/LSGD.png");
        valuesMap.put("egovLogo", egovLogo);
        String cityLogo = ReportUtil.getImageURL("/egi/resources/global/images/ksmart.png");
        valuesMap.put("cityLogo", cityLogo);
        valuesMap.put("footerLogo", egovLogo); /// this to add new logo
       
        //noOfMechanicalParking ,alteredArea ,village ,desam
        valuesMap.put("surveyNumber", plan.getPlanInfoProperties().get("RS_NO"));
        valuesMap.put("noOfMechanicalParking", plan.getPlanInformation().getNoOfMechanicalParking());
        valuesMap.put("alteredArea", plan.getPlanInformation().getAlteredArea());
        valuesMap.put("revenewWard", plan.getPlanInformation().getRevenueWard());
        valuesMap.put("village", plan.getPlanInformation().getVillage());
        valuesMap.put("desam", plan.getPlanInformation().getDesam());
        valuesMap.put("planInfoPlotArea", plan.getPlanInformation().getPlotArea());
        valuesMap.put("accWidth", plan.getPlanInformation().getAccessWidth());
        valuesMap.put("demolitionArea",plan.getPlanInformation().getDemolitionArea());

        if (clientSpecificSubReport) {

            List<DcrReportBlockDetail> blockDetails = new ArrayList<>();

            List<DcrReportBlockDetail> existingBlockDetails = buildBlockWiseExistingInfo(plan);
            List<DcrReportBlockDetail> regularizationBlockDetails = buildBlockWiseRegularizationInfo(plan);

            List<DcrReportBlockDetail> proposedBlockDetails = buildBlockWiseProposedInfo(plan);
            List<ReportOccupancyFloorUnit> plotFloorUnits = buildUnitsOfPlot(proposedBlockDetails);
            
            VirtualBuildingReport virtualBuildingReport = buildVirtualBuilding(plan.getVirtualBuilding());
            
           /* List<String> generalDetails = new ArrayList<>();
            generalDetails.add(GENERAL_DETAILS);
            drb.addConcatenatedReport(creategeneralDetails(GENERAL_DETAILS, GENERAL_DETAILS));
            valuesMap.put(GENERAL_DETAILS, generalDetails);*/
            

            List<String> combinedSummary = new ArrayList<>();
            combinedSummary.add(COMBINED_BLOCKS_SUMMARY_DETAILS);
            drb.addConcatenatedReport(createHeaderSubreport(COMBINED_BLOCKS_SUMMARY_DETAILS, COMBINED_BLOCKS_SUMMARY_DETAILS));
            valuesMap.put(COMBINED_BLOCKS_SUMMARY_DETAILS, combinedSummary);

            // Add total area details
            
           
            
            drb.addConcatenatedReport(getExistingArea(virtualBuildingReport));
            valuesMap.put("Existing Area Details", existingBlockDetails);   
          

            boolean isExistingBuildingPresent = false;
            if(virtualBuildingReport.getTotalExistingBuiltUpArea().compareTo(BigDecimal.ZERO) > 0)
            	isExistingBuildingPresent = true;
            drb.addConcatenatedReport(getProposedArea("Proposed Area Details", isExistingBuildingPresent));
            valuesMap.put("Proposed Area Details", proposedBlockDetails);
            
            List<DcrReportBlockDetail> coveredAreas = new ArrayList<>();
            BigDecimal proposedBuiltupArea = proposedBlockDetails.stream().map(pbd -> pbd.getTotalBuiltUpArea()).reduce(BigDecimal.ZERO, BigDecimal::add);
            if(proposedBuiltupArea.compareTo(BigDecimal.ZERO) > 0)
            	coveredAreas.addAll(proposedBlockDetails);
            BigDecimal totalCoveredArea = existingBlockDetails.stream().map(pbd -> pbd.getTotalCoveredArea()).reduce(BigDecimal.ZERO, BigDecimal::add);
            if(totalCoveredArea.compareTo(BigDecimal.ZERO) > 0)
            	coveredAreas.addAll(existingBlockDetails);
            drb.addConcatenatedReport(createCoveredArea("Covered Area Details", isExistingBuildingPresent));
            valuesMap.put("Covered Area Details", coveredAreas);
          
            drb.addConcatenatedReport(getRegularizationArea(virtualBuildingReport,isExistingBuildingPresent));
            valuesMap.put("Regularization Area Details", regularizationBlockDetails);   
            
			if (plan.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ZERO) > 0) {
				drb.addConcatenatedReport(getUnits("Total Units", isExistingBuildingPresent));
				valuesMap.put("Total Units", proposedBlockDetails);
			}
          
            drb.addConcatenatedReport(getTotalAreaDetails(virtualBuildingReport));
            valuesMap.put("Total Area Details", Arrays.asList(virtualBuildingReport));
            
            
            Set<String> common = new TreeSet<>();
            Map<String, ScrutinyDetail> allMap = new HashMap<>();
            Map<String, Set<String>> blocks = new TreeMap<>();
            LOG.info("Generate Report.......");
            List<ScrutinyDetail> scrutinyDetails = plan.getReportOutput().getScrutinyDetails();
            for (ScrutinyDetail sd : scrutinyDetails) {
                LOG.info(sd.getKey());
                LOG.info(sd.getHeading());
                String[] split = {};
                if (sd.getKey() != null)
                    split = sd.getKey().split("_");
                if (split.length == 2) {
                    common.add(split[1]);
                    allMap.put(split[1], sd);

                } else if (split.length == 3) {
                    if (blocks.get(split[1]) == null) {
                        Set<String> features = new TreeSet<>();
                        features.add(split[2]);
                        blocks.put(split[1], features);
                    } else {
                        blocks.get(split[1]).add(split[2]);
                    }
                    allMap.put(split[1] + split[2], sd);
                }
            }
            
            for(Block  b: plan.getBlocks()) {
            	if(b.getCompletelyExisting()) {
            		allMap.put(b.getNumber(), new ScrutinyDetail());
            		blocks.put(b.getNumber(), new HashSet<>());
            	}
            }
            List<String> blockSummary = new ArrayList<>();
            blockSummary.add(BLOCK_WISE_SUMMARY);
            drb.addConcatenatedReport(createHeaderSubreport(BLOCK_WISE_SUMMARY, BLOCK_WISE_SUMMARY));
            valuesMap.put(BLOCK_WISE_SUMMARY, blockSummary);

          /*  This portion is moved down inside the block features as of 2-12-2023
           * 
           *  // Add existing block details
            if (existingBlockDetails != null && !existingBlockDetails.isEmpty()) {
                for (DcrReportBlockDetail existingBlockDetail : existingBlockDetails) {
                    blockDetails.add(existingBlockDetail);
                    drb.addConcatenatedReport(getBlkDetails(existingBlockDetail, false));
                    valuesMap.put("Existing Block No " + existingBlockDetail.getBlockNo(),
                            existingBlockDetail.getDcrReportFloorDetails());
                }
                drb.addConcatenatedReport(getAreaDetails(false));
                valuesMap.put("Total Existing Details", Arrays.asList(virtualBuildingReport));
            }

          


            // Add proposed block details
            for (DcrReportBlockDetail dcrReportBlockDetail : proposedBlockDetails) {
                blockDetails.add(dcrReportBlockDetail);
                drb.addConcatenatedReport(getBlkDetails(dcrReportBlockDetail, true));
                valuesMap.put("Block No " + dcrReportBlockDetail.getBlockNo(),
                        dcrReportBlockDetail.getDcrReportFloorDetails());
            }

            if (existingBlockDetails != null && !existingBlockDetails.isEmpty()) {
                drb.addConcatenatedReport(getAreaDetails(true));
                valuesMap.put("Total Proposed Details", Arrays.asList(virtualBuildingReport));
            }
            
            // Block Wise Floor Units
            for (DcrReportBlockDetail dcrReportBlockDetail : proposedBlockDetails) {
                drb.addConcatenatedReport(getBlkFloorUnitDetails(dcrReportBlockDetail, true));
                valuesMap.put("Block No -" + dcrReportBlockDetail.getBlockNo(),
                        dcrReportBlockDetail.getDcrReportFloorUnitDetails());
            }*/

            // Add Total Floor Units Across Plot
            // Show Only when plot have more one block
            
            
         /* 
          * ths is skipped as of new format as on 2-12-23
          *   if (proposedBlockDetails.size() > 1) {
                drb.addConcatenatedReport(getTotalUnitDetails());
                valuesMap.put(TOTAL_FLOOR_UNITS, plotFloorUnits);
            }*/


            DcrReportPlanDetail dcrReportPlanDetail = new DcrReportPlanDetail();
            dcrReportPlanDetail.setVirtualBuildingReport(virtualBuildingReport);
            dcrReportPlanDetail.setDcrReportBlockDetailList(blockDetails);

         

           
         
            
            LOG.info("completed  "+common);

            for (String blkName : blocks.keySet()) {
                List blkHeading = new ArrayList();
                blkHeading.add(BLOCK + blkName);
                drb.addConcatenatedReport(
                        createHeaderSubreport("BLOCK " + blkName, BLOCK + blkName));
                valuesMap.put(BLOCK + blkName, blkHeading);
                int j = 0;
                // This is only for set back
                ScrutinyDetail front = null;
                ScrutinyDetail rear = null;
                ScrutinyDetail side = null;
            	if (existingBlockDetails != null && !existingBlockDetails.isEmpty()) {
					for (DcrReportBlockDetail existingBlockDetail : existingBlockDetails) {
						if (existingBlockDetail.getBlockNo().equals(blkName)) {
							blockDetails.add(existingBlockDetail);

							drb.addConcatenatedReport(getBlkDetails(existingBlockDetail, false));
							valuesMap.put("Existing Block No " + existingBlockDetail.getBlockNo(),
									existingBlockDetail.getDcrReportFloorDetails());

						}
					}
                   
                }
             	if (regularizationBlockDetails != null && !regularizationBlockDetails.isEmpty()) {
                    for (DcrReportBlockDetail regularizeBlockDetail : regularizationBlockDetails) {
                    	 if(regularizeBlockDetail.getBlockNo().equals(blkName))
                    			 {
                        blockDetails.add(regularizeBlockDetail);
                     
                        drb.addConcatenatedReport(getBlkDetails(regularizeBlockDetail, false));
                        valuesMap.put("Regularization Block No " + regularizeBlockDetail.getBlockNo(),
                                regularizeBlockDetail.getDcrReportFloorDetails());

						}
					}

				}
            	
            	if(proposedBlockDetails!=null && !proposedBlockDetails.isEmpty())
            	{
                	for (DcrReportBlockDetail dcrReportBlockDetail : proposedBlockDetails)
                	{
                		if(dcrReportBlockDetail.getBlockNo().equals(blkName))
                		{
                        blockDetails.add(dcrReportBlockDetail);
                        drb.addConcatenatedReport(getBlkDetails(dcrReportBlockDetail, true));
                        valuesMap.put("Block No " + dcrReportBlockDetail.getBlockNo(),
                                dcrReportBlockDetail.getDcrReportFloorDetails());
                                    
                       }
                    }
            	}

                for (String blkFeature : blocks.get(blkName)) {
                	
                
                	
                    if (blkFeature.equals(FRONT_YARD_DESC) || blkFeature.equals(REAR_YARD_DESC)
                            || blkFeature.equals(SIDE_YARD_DESC)) {

                        if (blkFeature.equals(FRONT_YARD_DESC)) {
                            front = allMap.get(blkName + blkFeature);
                            front.getDetail().get(0).put(SIDENUMBER_NAME, "FRONT");
                            continue;
                        }
                        if (blkFeature.equals(REAR_YARD_DESC)) {
                            rear = allMap.get(blkName + blkFeature);
                            rear.getDetail().get(0).put(SIDENUMBER_NAME, "REAR");
                            continue;
                        }

                        side = allMap.get(blkName + blkFeature);
                        // List<Map<String, String>> detail = allMap.get(blkName +
                        // blkFeature).getDetail();
                        List<Map<String, String>> detail = side.getDetail();

                        if (front != null)
                            detail.add(0, front.getDetail().get(0));
                        if (rear != null)
                            detail.add(1, rear.getDetail().get(0));

                        for (Map<String, String> d : detail) {
                            String sideNumber = d.get(SIDENUMBER);
                            if (StringUtils.isNotBlank(sideNumber)) {
                                d.remove(SIDENUMBER);
                                d.put(SIDENUMBER_NAME, sideNumber);
                            }
                        }
                        side.addColumnHeading(2, SIDENUMBER_NAME);
                        side.addColumnHeading(4, LEVEL);
                        // allMap.get(blkName + blkFeature).setHeading(SIDENUMBER_NMAE);

                        j++;
                        drb.addConcatenatedReport(
                                getSub(allMap.get(blkName + blkFeature), j, j + "." + blkFeature, SIDENUMBER_NAME,
                                        allMap.get(blkName + blkFeature).getSubHeading(), blkName + blkFeature));
                        valuesMap.put(blkName + blkFeature, allMap.get(blkName + blkFeature).getDetail());

                        List featureFooter = new ArrayList();
                        if (allMap.get(blkName + blkFeature).getRemarks() != null) {
                            drb.addConcatenatedReport(
                                    createFooterSubreport("Remarks :  " + allMap.get(blkName + blkFeature).getRemarks(),
                                            "Remarks_" + blkName + blkFeature));
                            featureFooter.add(allMap.get(blkName + blkFeature).getRemarks());
                            valuesMap.put("Remarks_" + blkName + blkFeature, featureFooter);
                        }
                    } else {
                        continue;
                    }

                }
                // This is only for rest
                
                LOG.info("starting "+blkName);
                for (String blkFeature : blocks.get(blkName)) {
                    if (blkFeature.equals(FRONT_YARD_DESC) || blkFeature.equals(REAR_YARD_DESC)
                            || blkFeature.equals(SIDE_YARD_DESC)) {
                        continue;
                    } else {
                        j++;
                        drb.addConcatenatedReport(getSub(allMap.get(blkName + blkFeature), j, j + "." + blkFeature,
                                allMap.get(blkName + blkFeature).getHeading(),
                                allMap.get(blkName + blkFeature).getSubHeading(), blkName + blkFeature));
                        valuesMap.put(blkName + blkFeature, allMap.get(blkName + blkFeature).getDetail());

                        List featureFooter = new ArrayList();
                        if (allMap.get(blkName + blkFeature).getRemarks() != null) {
                            drb.addConcatenatedReport(
                                    createFooterSubreport("Remarks :  " + allMap.get(blkName + blkFeature).getRemarks(),
                                            "Remarks_" + blkName + blkFeature));
                            featureFooter.add(allMap.get(blkName + blkFeature).getRemarks());
                            valuesMap.put("Remarks_" + blkName + blkFeature, featureFooter);

                        }

                    }
                }

            }
            
            int i = 0;
            List<String> cmnHeading = new ArrayList<>();
            cmnHeading.add("Common");
            drb.addConcatenatedReport(createHeaderSubreport("4) PLOT LEVEL VALIDATIONS", "Common"));
            valuesMap.put("Common", cmnHeading);
            for (String cmnFeature : common) {
                i++;
                drb.addConcatenatedReport(getSub(allMap.get(cmnFeature), i, i + "." + cmnFeature,
                        allMap.get(cmnFeature).getHeading(), allMap.get(cmnFeature).getSubHeading(), cmnFeature));
                valuesMap.put(cmnFeature, allMap.get(cmnFeature).getDetail());
                List featureFooter = new ArrayList();
                if (allMap.get(cmnFeature).getRemarks() != null) {
                    drb.addConcatenatedReport(
                            createFooterSubreport("Remarks :  " + allMap.get(cmnFeature).getRemarks(),
                                    "Remarks_" + cmnFeature));
                    featureFooter.add(allMap.get(cmnFeature).getRemarks());
                    valuesMap.put("Remarks_" + cmnFeature, featureFooter);
                }
            }
 
            List<String> declarationHeading = new ArrayList<>();
            declarationHeading.add("Declarationheading");
            drb.addConcatenatedReport(createHeaderSubreport("5) DECLARATIONS BY THE APPLICANT (S)", "Declarationheading"));
            valuesMap.put("Declarationheading", declarationHeading);
			List<Declaration> declaration = getDeclaration(plan);
			drb.addConcatenatedReport(createDeclarationSubReport("applicantDeclaration"));
			valuesMap.put("applicantDeclaration", declaration);
			 
 
            
            
            if (finalReportStatus)
                for (String cmnFeature : common) {
                    for (Map<String, String> commonStatus : allMap.get(cmnFeature).getDetail()) {
                        if (commonStatus.get(STATUS).equalsIgnoreCase(Result.Not_Accepted.getResultVal())) {
                            finalReportStatus = false;
                        }
                    }
                }

            if (finalReportStatus)
                for (String blkName : blocks.keySet()) {
                    for (String blkFeature : blocks.get(blkName)) {
                        for (Map<String, String> blkStatus : allMap.get(blkName + blkFeature).getDetail()) {
                            if (blkStatus.get(STATUS).equalsIgnoreCase(Result.Not_Accepted.getResultVal())) {
                                finalReportStatus = false;
                            }
                        }
                    }
                }

        } else {
            /*
             * List<PlanRule> planRules = planRuleService.findRulesByPlanDetail(planDetail); for (PlanRule pl : planRules) {
             * String rules = pl.getRules(); String[] ruleSet = rules.split(","); for (String s : ruleSet) { String ruleName =
             * "rule" + s; if(LOG.isDebugEnabled()) LOG.debug(s); Object ruleBean = getRuleBean(ruleName); if (ruleBean != null) {
             * GeneralRule bean = (GeneralRule) ruleBean; if (bean != null){ reportStatus = bean.generateRuleReport(planDetail,
             * drb, valuesMap, reportStatus); if(!reportStatus) { finalReportStatus=false; } } } else LOG.error("Skipping rule " +
             * ruleName + "Since rule cannot be injected"); } }
             */
        }

        if (ApplicationType.OCCUPANCY_CERTIFICATE.equals(dcrApplication.getApplicationType())
                && StringUtils.isNotBlank(dcrApplication.getEdcrApplicationDetails().get(0).getComparisonDcrNumber())) {
            plan.setMainDcrPassed(finalReportStatus);
            finalReportStatus = finalReportStatus && (dcrApplication.getDeviationStatus().equalsIgnoreCase("Accepted"));
        }
        
        LOG.info("status"+finalReportStatus);
        reportBuilder.append("Report Status : " + (finalReportStatus ? "Accepted" : "Not Accepted")).append("\\n")
                .append("\\n");
        reportBuilder.append("Rules Verified : ").append("\\n");
        valuesMap.put("reportStatus", (finalReportStatus ? "Accepted" : "Not Accepted"));
        drb.setTemplateFile("/reports/templates/edcr_report.jrxml");
        drb.setMargins(5, 0, 33, 20);
        if (ApplicationType.OCCUPANCY_CERTIFICATE.equals(dcrApplication.getApplicationType())) {
            valuesMap.put("planPermissionNumber", dcrApplication.getPlanPermitNumber());
            valuesMap.put("bpaApplicationDate", DateUtils.toDefaultDateFormat(dcrApplication.getPermitApplicationDate()));
        }
        if (finalReportStatus) {
            String dcrApplicationNumber = "";
            if (ApplicationType.OCCUPANCY_CERTIFICATE.equals(dcrApplication.getApplicationType()))
                dcrApplicationNumber = ocPlanScrutinyNumberGenerator.generateEdcrApplicationNumber();
            else
                dcrApplicationNumber = dcrApplicationNumberGenerator.generateEdcrApplicationNumber(dcrApplication);
            EdcrApplicationDetail edcrApplicationDetail = dcrApplication.getEdcrApplicationDetails().get(0);
            edcrApplicationDetail.setDcrNumber(dcrApplicationNumber);
            valuesMap.put("dcrNo", dcrApplicationNumber);
        }
        LOG.info("Generating QR Code");
      /*  if (finalReportStatus) {
            valuesMap.put("qrCode", generatePDF417Code(buildQRCodeDetails(dcrApplication, finalReportStatus)));
        }*/
        LOG.info("Generating QR Code completed");
        valuesMap.put("applicationType", dcrApplication.getApplicationType().getApplicationTypeVal());
       // Map<String, String> serviceTypeList = DxfFileConstants.getServiceTypeList();
        Map<String, String> serviceTypeList = new ConcurrentHashMap<>();
        serviceTypeList.put("NEW_CONSTRUCTION", "New Construction");

        if (StringUtils.isNotBlank(dcrApplication.getServiceType())) {
            String serviceType = serviceTypeList.get(dcrApplication.getServiceType());
            valuesMap.put("serviceType", serviceType);
        }

        if (StringUtils.isNotBlank(dcrApplication.getServiceType())) {
            String serviceType = serviceTypeList.get(dcrApplication.getServiceType());
            valuesMap.put("serviceType", serviceType);
        }
        final DynamicReport dr = drb.build();
        plan.setEdcrPassed(finalReportStatus);
        InputStream exportPdf = null;
        try {
        	LOG.info("starting DynamicJasperHelper....");
            JasperPrint generateJasperPrint = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(),
                    ds, valuesMap);
            LOG.info("completed DynamicJasperHelper.generateJasperPrint");
            exportPdf = reportService.exportPdf(generateJasperPrint);
            LOG.info("completed reportService.exportPdf("); 
            
        } catch (IOException | JRException e) {
            LOG.error("Error occurred when generating Jasper report", e);
        }
        LOG.info("completed the report Amend02Oct20 ..");
        return exportPdf;

    }

    private List<Declaration> getDeclaration(Plan plan) {
 
    	List<Declaration> declarations= new LinkedList<>();
    	Declaration declaration1=new Declaration();
    	declaration1.setSlNo("1");
    	declaration1.setStatement("Is there any opening on the sides of the buildings, at a height above 2.10 m, "
    			+ "where the open space available is less than or equal to 60 cm? ");
    	declaration1.setValue(plan.getPlanInformation().getOpeningOnSideAbove2mtsDesc());
    	declarations.add(declaration1);
    	Declaration declaration2=new Declaration();
    	declaration2.setSlNo("2");
    	declaration2.setStatement("Is there any opening on sides of the buildings, at a height below 2.10 m, where the open space available is less than or equal to 60 cm?");
    	declaration2.setValue(plan.getPlanInformation().getOpeningOnSideBelow2mtsDesc());
    	declarations.add(declaration2);
    	Declaration declaration3=new Declaration();
    	declaration3.setSlNo("3");
    	declaration3.setStatement("Is there any opening on rear side of the buildings, at a height above 2.10 m, where the open space available is less than 1.0 m?");
    	declaration3.setValue(plan.getPlanInformation().getOpeningOnRearAbove2mtsDesc());
    	declarations.add(declaration3);
    	Declaration declaration4=new Declaration();
    	declaration4.setSlNo("4");
    	declaration4.setStatement("Is there any opening on rear side of the buildings, at a height below 2.10 m, where the open space available is less than 1.0 m? ");
    	declaration4.setValue(plan.getPlanInformation().getOpeningOnRearBelow2mtsDesc());
    	declarations.add(declaration4);
    	Declaration declaration5=new Declaration();
    	declaration5.setSlNo("5");
    	declaration5.setStatement("Whether NOC from the adjascent plot owner to abut the side of the buildings available?");
    	declaration5.setValue(plan.getPlanInformation().getNocToAbutSideDesc());
    	declarations.add(declaration5);
    	Declaration declaration6=new Declaration();
    	declaration6.setSlNo("6");
    	declaration6.setStatement("Whether NOC from the adjascent plot owner to abut the rear of the buildings available?");
    	declaration6.setValue(plan.getPlanInformation().getNocToAbutRearDesc());
    	declarations.add(declaration6);
    	Declaration declaration7=new Declaration();
    	declaration7.setSlNo("7");
    	declaration7.setStatement("Whether the building belongs to the category of Govt. Or Aided School?");
    	String governmentOrAidedSchool = plan.getPlanInformation().getGovernmentOrAidedSchool() != null && plan.getPlanInformation().getGovernmentOrAidedSchool() ? "YES" : "NA";
    	declaration7.setValue(governmentOrAidedSchool);
    	declarations.add(declaration7);
    	Declaration declaration8=new Declaration();
    	declaration8.setSlNo("8");
    	declaration8.setStatement("Whether the building situated in a plot included in an authorised Commercial Zone?");
    	declaration8.setValue(plan.getPlanInformation().getPlotInCommercialZone());
    	declarations.add(declaration8);
    	Declaration declaration9=new Declaration();
    	declaration9.setSlNo("9");
    	declaration9.setStatement("Is there any opening on side 01 of the commercial building situated in the Commercial Zone?");
    	declaration9.setValue(plan.getPlanInformation().getCommercialZoneBldgOpenOnSide1());
    	declarations.add(declaration9);
    	Declaration declaration10=new Declaration();
    	declaration10.setSlNo("10");
    	declaration10.setStatement("Is there any opening on side 02 of the building situated in the Commercial Zone?");
    	declaration10.setValue(plan.getPlanInformation().getCommercialZoneBldgOpenOnSide2());
    	declarations.add(declaration10);

    	return declarations;
    	
	}

	private Subreport createDeclarationSubReport(String dataSource) {
        try {

            FastReportBuilder frb = new FastReportBuilder();
 
             {
            	AbstractColumn slNo = ColumnBuilder.getNew()
                         .setColumnProperty("slNo", String.class.getName()).setTitle("SL.NO")
                         .setWidth(40).setStyle(reportService.getNewReportDetailStyle()).build();
                AbstractColumn declaration = ColumnBuilder.getNew()
                        .setColumnProperty("statement", String.class.getName()).setTitle("DECLARATION")
                        .setWidth(400).setStyle(reportService.getNewReportDetailStyle()).build();
                
                AbstractColumn values = ColumnBuilder.getNew()
                        .setColumnProperty("value", String.class.getName())
                        .setTitle("PROVIDED VALUE").setWidth(105)
                        .setStyle(reportService.getNewReportDetailStyle())
                        .build();
                frb.addColumn(slNo);
                frb.addColumn(declaration);
                frb.addColumn(values);
                
            }

            frb.setTitleStyle(reportService.getDetailNewHeaderStyle());
            frb.setHeaderHeight(5);
 
            frb.setMargins(0, 0, 0, 0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(), reportService.getNewReportDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setLayoutManager(new ClassicLayoutManager());
            sub.setDatasource(new DJDataSource("declarations" ,
                    DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setStyle(style);

            sub.setDatasource(new DJDataSource(dataSource, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));

            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            LOG.error(e.getMessage(), e);
        }
        return null;
    }

	public Subreport generateDcrSubReport(final List<DcrReportOutput> dcrReportOutputs) {
        FastReportBuilder drb = new FastReportBuilder();

        final Style titleStyle = new Style("titleStyle");
        titleStyle.setFont(Font.ARIAL_MEDIUM_BOLD);
        titleStyle.setHorizontalAlign(HorizontalAlign.CENTER);
        titleStyle.setVerticalAlign(VerticalAlign.BOTTOM);

        final Style columnStyle = reportService.getColumnStyle();
        final Style columnHeaderStyle = reportService.getColumnHeaderStyle();
        drb.setTitle("Building Rule Scrutiny");
        drb.setTitleStyle(titleStyle);
        try {
            drb.addColumn("KMBR Rule No.", "key", String.class.getName(), 50, columnStyle, columnHeaderStyle);
            drb.addColumn("Rule description", DESCRIPTION, String.class.getName(), 120, columnStyle, columnHeaderStyle);
            drb.addColumn("Required by Rule", "expectedResult", String.class.getName(), 120, columnStyle,
                    columnHeaderStyle);
            drb.addColumn("Provided as per drawings", "actualResult", String.class.getName(), 120, columnStyle,
                    columnHeaderStyle);
            drb.addColumn("Accepted / Not Accepted ", "status", String.class.getName(), 50, columnStyle, columnHeaderStyle);
        } catch (ColumnBuilderException | ClassNotFoundException e) {
            LOG.error(e.getMessage(), e);
        }
        drb.setUseFullPageWidth(true);
        drb.setPageSizeAndOrientation(Page.Page_Legal_Landscape());

        if (LOG.isDebugEnabled()) {
            for (DcrReportOutput dcrReportOutput : dcrReportOutputs) {
                LOG.debug("********* Key " + dcrReportOutput.getKey());
                LOG.debug("********* Description " + dcrReportOutput.getDescription());
                LOG.debug("********* Expected result " + dcrReportOutput.getExpectedResult());
                LOG.debug("********* Actual result " + dcrReportOutput.getActualResult());
                LOG.debug("********* Status " + dcrReportOutput.getStatus());
            }
        }

        new JRBeanCollectionDataSource(dcrReportOutputs);
        final DJDataSource djds = new DJDataSource("subreportds", DJConstants.DATA_SOURCE_ORIGIN_PARAMETER,
                DJConstants.DATA_SOURCE_TYPE_JRDATASOURCE);

        final Subreport subRep = new Subreport();
        subRep.setLayoutManager(new ClassicLayoutManager());
        subRep.setDynamicReport(drb.build());
        subRep.setDatasource(djds);
        subRep.setUseParentReportParameters(true);

        return subRep;
    }

    private String buildQRCodeDetails(final EdcrApplication dcrApplication, boolean reportStatus) {
        StringBuilder qrCodeValue = new StringBuilder();
        qrCodeValue = !StringUtils
                .isEmpty(dcrApplication.getEdcrApplicationDetails().get(0).getDcrNumber())
                        ? qrCodeValue.append("DCR Number : ")
                                .append(dcrApplication.getEdcrApplicationDetails().get(0).getDcrNumber()).append("\n")
                        : qrCodeValue.append("DCR Number : ").append("N/A").append("\n");
        qrCodeValue = !StringUtils.isEmpty(dcrApplication.getApplicationNumber())
                ? qrCodeValue.append("Application Number : ").append(dcrApplication.getApplicationNumber()).append("\n")
                : qrCodeValue.append("Application Number : ").append("N/A").append("\n");
        qrCodeValue = dcrApplication.getApplicationDate() != null
                ? qrCodeValue.append("Application Date : ").append(dcrApplication.getApplicationDate()).append("\n")
                : qrCodeValue.append("Application Date : ").append("N/A").append("\n");
        qrCodeValue = qrCodeValue.append("Report Status :").append(reportStatus ? "Accepted" : "Not Accepted")
                .append("\n");
        return qrCodeValue.toString();
    }

    private List<DcrReportBlockDetail> buildBlockWiseProposedInfo(Plan plan) {
        List<DcrReportBlockDetail> dcrReportBlockDetails = new ArrayList<>();

        List<Block> blocks = plan.getBlocks();

        if (!blocks.isEmpty()) {

            for (Block block : blocks) {

                Building building = block.getBuilding();
                if (building != null && !block.getCompletelyExisting()) {
                    DcrReportBlockDetail dcrReportBlockDetail = new DcrReportBlockDetail();
                    dcrReportBlockDetail.setBlockNo(block.getNumber());
                    dcrReportBlockDetail.setCoverageArea(building.getCoverageArea());
                    dcrReportBlockDetail.setBuildingHeight(building.getBuildingHeight());
                    dcrReportBlockDetail.setConstructedArea(building.getTotalConstructedArea());
                    dcrReportBlockDetail.setTotalBuiltUpArea(building.getTotalBuitUpArea().subtract(building.getTotalExistingBuiltUpArea()));
                    dcrReportBlockDetail.setTotalFloorArea(building.getTotalFloorArea().subtract(building.getTotalExistingFloorArea()));
                    dcrReportBlockDetail.setTotalRegularizionArea( dcrReportBlockDetail.getTotalRegularizionArea().add(building.getRegularizationgBuiltUpArea()));
                    dcrReportBlockDetail.setTotalCoveredArea( dcrReportBlockDetail.getTotalCoveredArea().add(building.getCoverageArea()));
                    List<Floor> floors = building.getFloors();

                    if (!floors.isEmpty()) {
                        List<DcrReportFloorDetail> dcrReportFloorDetails = new ArrayList<>();
                        for (Floor floor : floors) {

                            List<Occupancy> occupancies = floor.getOccupancies();

                            if (!occupancies.isEmpty()) {

								for (Occupancy occupancy : occupancies) {
									if (occupancy.getBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
										StringBuilder parkingDetail = new StringBuilder();
										if (!floor.getParkingProvidedInsideBuilding().isEmpty()) {
											Iterator<ParkingArea> itr = floor.getParkingProvidedInsideBuilding()
													.iterator();
											while (itr.hasNext()) {
												ParkingArea p = itr.next();
												if (p.getParkingArea() != null && p.getOccupancyType() != null) {
													parkingDetail.append(p.getOccupancyType().getType().getName())
															.append("-").append(p.getParkingArea());
													if (itr.hasNext())
														parkingDetail.append(", ");
												}
											}
										}
										String occupancyName = "";
										if (occupancy.getTypeHelper() != null)
											if (occupancy.getTypeHelper().getSubtype() != null)
												occupancyName = occupancy.getTypeHelper().getSubtype().getName();
											else {
												if (occupancy.getTypeHelper().getType() != null)
													occupancyName = occupancy.getTypeHelper().getType().getName();
											}
										DcrReportFloorDetail dcrReportFloorDetail = new DcrReportFloorDetail();
										String floorNo;
										if (floor.getTerrace()) {
											floorNo = "Terrace";
											dcrReportFloorDetail.setFloorDescription("Terrace");
										} else if (occupancy.getIsMezzanine())
											floorNo = floor.getNumber() + " (Mezzanine " + floor.getNumber() + ")";
										else
											floorNo = String.valueOf(floor.getNumber());
										dcrReportFloorDetail.setFloorNo(floorNo);
										dcrReportFloorDetail.setOccupancy(occupancyName);
										
										dcrReportFloorDetail.setBuiltUpArea(
												 occupancy.getBuiltUpArea()
																.subtract(occupancy.getExistingBuiltUpArea())
																.subtract(occupancy.getRegularizationBuiltUpArea()));
										dcrReportFloorDetail.setFloorArea(
												 occupancy.getFloorArea()
																.subtract(occupancy.getExistingFloorArea())
																.subtract(occupancy.getRegularizationBuiltUpArea()));
										
										if (parkingDetail.length() > 0)
											dcrReportFloorDetail.setParkingDetail(parkingDetail.toString());
										else
											dcrReportFloorDetail.setParkingDetail("-");
										if (dcrReportFloorDetail.getBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
											dcrReportFloorDetails.add(dcrReportFloorDetail);
										}
									}
								}
                            }

                            List<MezzanineFloor> mezzanineFloors = floor.getMezzanineFloor();

                            if (mezzanineFloors != null && !mezzanineFloors.isEmpty()) {
                                for (MezzanineFloor mezzanineFloor : mezzanineFloors) {
                                    DcrReportFloorDetail dcrReportFloorDetail = new DcrReportFloorDetail();
                                    dcrReportFloorDetail
                                            .setFloorNo(floor.getTerrace() ? "Terrace \nmezzanine " + mezzanineFloor.getNumber()
                                                    : floor.getNumber().toString() + "\nmezzanine " + mezzanineFloor.getNumber());
                                    dcrReportFloorDetail.setOccupancy(mezzanineFloor.getTypeHelper() != null
                                            ? mezzanineFloor.getTypeHelper().getType().getName()
                                            : "");
                                    dcrReportFloorDetail.setBuiltUpArea(mezzanineFloor.getBuiltUpArea());
                                    dcrReportFloorDetail.setFloorArea(mezzanineFloor.getFloorArea());
                                    dcrReportFloorDetail.setCarpetArea(mezzanineFloor.getCarpetArea());
                                    if (dcrReportFloorDetail.getBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
                                        dcrReportFloorDetails.add(dcrReportFloorDetail);
                                    }
                                }
                            }

                            // Build floor units details
                            buildFloorUnitsOfBlock(dcrReportBlockDetail, floor);
                        }
                        dcrReportFloorDetails = dcrReportFloorDetails.stream()
                                .sorted(Comparator.comparing(DcrReportFloorDetail::getFloorNo))
                                .collect(Collectors.toList());

                        dcrReportBlockDetail.setDcrReportFloorDetails(dcrReportFloorDetails);
                    }
                    dcrReportBlockDetails.add(dcrReportBlockDetail);
                }

            }

        }
        return dcrReportBlockDetails;
    }
    
    
    private List<DcrReportBlockDetail> buildBlockWiseRegularizationInfo(Plan plan)
    {
        List<DcrReportBlockDetail> dcrReportBlockDetails = new ArrayList<>();

        List<Block> blocks = plan.getBlocks();

        if (!blocks.isEmpty()) {

            for (Block block : blocks) {

                Building building = block.getBuilding();
                if (building != null && building.getRegularizationgBuiltUpArea() != null
                        && building.getRegularizationgBuiltUpArea().compareTo(BigDecimal.ZERO) > 0
                        && building.getRegularizationgBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
                    DcrReportBlockDetail dcrReportBlockDetail = new DcrReportBlockDetail();
                    dcrReportBlockDetail.setBlockNo(block.getNumber());
                    
                    dcrReportBlockDetail.setTotalBuiltUpArea(dcrReportBlockDetail.getTotalRegularizionArea().add(building.getRegularizationgBuiltUpArea()));
                    dcrReportBlockDetail.setTotalFloorArea(dcrReportBlockDetail.getTotalRegularizionArea().add(building.getRegularizationgBuiltUpArea()));
                    List<Floor> floors = building.getFloors();

                    if (!floors.isEmpty()) {
                        List<DcrReportFloorDetail> dcrReportFloorDetails = new ArrayList<>();
                        for (Floor floor : floors) {

                            List<Occupancy> occupancies = floor.getOccupancies();

                            if (!occupancies.isEmpty()) {

                                for (Occupancy occupancy : occupancies) {
                                	StringBuilder parkingDetail = new StringBuilder();
                                    String occupancyName = "";
                                    if (occupancy.getTypeHelper() != null)
                                        if (occupancy.getTypeHelper().getSubtype() != null)
                                            occupancyName = occupancy.getTypeHelper().getSubtype().getName();
                                        else if (occupancy.getTypeHelper().getType() != null)
                                            occupancyName = occupancy.getTypeHelper().getType().getName();
                                    if (occupancy != null
                                            && occupancy.getRegularizationBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
                                        DcrReportFloorDetail dcrReportFloorDetail = new DcrReportFloorDetail();
                                        dcrReportFloorDetail
                                                .setFloorNo(floor.getTerrace() ? "Terrace" : floor.getNumber().toString());
                                        dcrReportFloorDetail.setOccupancy(occupancyName);
                                        dcrReportFloorDetail.setBuiltUpArea(occupancy.getRegularizationBuiltUpArea());
                                        dcrReportFloorDetail.setFloorArea(occupancy.getRegularizationBuiltUpArea());
                                        dcrReportFloorDetails.add(dcrReportFloorDetail);
                                    }
                                }

                            }

                        }
                        dcrReportFloorDetails = dcrReportFloorDetails.stream()
                                .sorted(Comparator.comparing(DcrReportFloorDetail::getFloorNo))
                                .collect(Collectors.toList());

                        dcrReportBlockDetail.setDcrReportFloorDetails(dcrReportFloorDetails);
                    }
                    dcrReportBlockDetails.add(dcrReportBlockDetail);
                }
	         }

        }
        return dcrReportBlockDetails;
    
    }
    
    private List<DcrReportBlockDetail> buildBlockWiseExistingInfo(Plan plan) {
        List<DcrReportBlockDetail> dcrReportBlockDetails = new ArrayList<>();

        List<Block> blocks = plan.getBlocks();

        if (!blocks.isEmpty()) {

            for (Block block : blocks) {

                Building building = block.getBuilding();
                if (building != null && building.getTotalExistingBuiltUpArea() != null
                        && building.getTotalExistingBuiltUpArea().compareTo(BigDecimal.ZERO) > 0
                        && building.getTotalExistingFloorArea().compareTo(BigDecimal.ZERO) > 0) {
                    DcrReportBlockDetail dcrReportBlockDetail = new DcrReportBlockDetail();
                    dcrReportBlockDetail.setBlockNo(block.getNumber());
                    
		            dcrReportBlockDetail.setTotalBuiltUpArea(building.getTotalExistingBuiltUpArea());
                    dcrReportBlockDetail.setTotalFloorArea(building.getTotalExistingFloorArea());
                    if(block.getCompletelyExisting())
                    	dcrReportBlockDetail.setTotalCoveredArea( dcrReportBlockDetail.getTotalCoveredArea().add(building.getCoverageArea()));

                    List<Floor> floors = building.getFloors();

                    if (!floors.isEmpty()) {
                        List<DcrReportFloorDetail> dcrReportFloorDetails = new ArrayList<>();
                        for (Floor floor : floors) {

                            List<Occupancy> occupancies = floor.getOccupancies();

                            if (!occupancies.isEmpty()) {

                                for (Occupancy occupancy : occupancies) {
                                	StringBuilder parkingDetail = new StringBuilder();
                                    if (!floor.getParkingProvidedInsideBuilding().isEmpty()) {
                                        Iterator<ParkingArea> itr = floor.getParkingProvidedInsideBuilding().iterator();
                                        while (itr.hasNext()) {
                                       	 ParkingArea p = itr.next();
                                            if (p.getExistParkingArea() != null && p.getOccupancyType() != null) {
                                                parkingDetail.append(p.getOccupancyType().getType().getName()).append("-")
                                                        .append(p.getExistParkingArea());
                                                if (itr.hasNext())
                                                    parkingDetail.append(", ");
                                            }
                                        }
                                    }
                                    String occupancyName = "";
                                    if (occupancy.getTypeHelper() != null)
                                        if (occupancy.getTypeHelper().getSubtype() != null)
                                            occupancyName = occupancy.getTypeHelper().getSubtype().getName();
                                        else if (occupancy.getTypeHelper().getType() != null)
                                            occupancyName = occupancy.getTypeHelper().getType().getName();
                                    if (occupancy != null
                                            && occupancy.getExistingBuiltUpArea().compareTo(BigDecimal.ZERO) > 0) {
                                        DcrReportFloorDetail dcrReportFloorDetail = new DcrReportFloorDetail();
                                        dcrReportFloorDetail
                                                .setFloorNo(floor.getTerrace() ? "Terrace" : floor.getNumber().toString());
                                        dcrReportFloorDetail.setOccupancy(occupancyName);
                                        dcrReportFloorDetail.setBuiltUpArea(occupancy.getExistingBuiltUpArea());
                                        dcrReportFloorDetail.setFloorArea(occupancy.getExistingFloorArea());
                                        if (parkingDetail.length() > 0)
                                            dcrReportFloorDetail.setParkingDetail(parkingDetail.toString());
                                        else
                                            dcrReportFloorDetail.setParkingDetail("-");	
                                        dcrReportFloorDetails.add(dcrReportFloorDetail);
                                    }
                                }

                            }

                        }
                        dcrReportFloorDetails = dcrReportFloorDetails.stream()
                                .sorted(Comparator.comparing(DcrReportFloorDetail::getFloorNo))
                                .collect(Collectors.toList());

                        dcrReportBlockDetail.setDcrReportFloorDetails(dcrReportFloorDetails);
                    }
                    dcrReportBlockDetails.add(dcrReportBlockDetail);
                }
				/*
				 * else{ DcrReportBlockDetail dcrReportBlockDetail = new DcrReportBlockDetail();
				 * dcrReportBlockDetail.setBlockNo(block.getNumber());
				 * 
				 * dcrReportBlockDetail.setTotalBuiltUpArea(BigDecimal.ZERO);
				 * dcrReportBlockDetail.setTotalFloorArea( BigDecimal.ZERO);
				 * dcrReportBlockDetail.setTotalCoveredArea(BigDecimal.ZERO);
				 * dcrReportBlockDetails.add(dcrReportBlockDetail);
				 * 
				 * }
				 */

            }

        }
        return dcrReportBlockDetails;
    }

    private VirtualBuildingReport buildVirtualBuilding(VirtualBuilding virtualBuilding) {
        VirtualBuildingReport virtualBuildingReport = new VirtualBuildingReport();

        if (virtualBuilding != null) {
            if (virtualBuilding.getTotalExistingBuiltUpArea() != null) {
                virtualBuildingReport.setProposedBuitUpArea(
                        virtualBuilding.getTotalBuitUpArea().subtract(virtualBuilding.getTotalExistingBuiltUpArea()));
                virtualBuildingReport.setProposedFloorArea(
                        virtualBuilding.getTotalFloorArea().subtract(virtualBuilding.getTotalExistingFloorArea()));
                virtualBuildingReport.setProposedCarpetArea(
                        virtualBuilding.getTotalCarpetArea().subtract(virtualBuilding.getTotalExistingCarpetArea()));
            }
            virtualBuildingReport.setTotalExistingBuiltUpArea(virtualBuilding.getTotalExistingBuiltUpArea());

            virtualBuildingReport.setTotalExistingFloorArea(virtualBuilding.getTotalExistingFloorArea());
            virtualBuildingReport.setTotalExistingCarpetArea(virtualBuilding.getTotalExistingCarpetArea());

            virtualBuildingReport.setTotalCoverageArea(virtualBuilding.getTotalCoverageArea());

            virtualBuildingReport.setTotalBuitUpArea(virtualBuilding.getTotalBuitUpArea());
            virtualBuildingReport.setTotalFloorArea(virtualBuilding.getTotalFloorArea());
            virtualBuildingReport.setTotalCarpetArea(virtualBuilding.getTotalCarpetArea());

            virtualBuildingReport.setTotalConstructedArea(virtualBuilding.getTotalConstructedArea());
        }
        return virtualBuildingReport;
    }

    private List<ConditionalStyle> getConditonalStyles() {
        List<ConditionalStyle> conditionalStyles = new ArrayList<>();
        FetchCondition fc = new FetchCondition(STATUS, "Not Accepted");

        ConditionalStyle cs = new ConditionalStyle(fc, reportService.getDetailStyle(Color.RED));
        conditionalStyles.add(cs);

        fc = new FetchCondition(STATUS, "Accepted");

        cs = new ConditionalStyle(fc, reportService.getDetailStyle(new Color(0, 128, 0)));
        conditionalStyles.add(cs);

        fc = new FetchCondition(STATUS, "Verify");

        cs = new ConditionalStyle(fc, reportService.getDetailStyle(new Color(30, 144, 255)));
        conditionalStyles.add(cs);

        return conditionalStyles;
    }
    
    private void buildFloorUnitsOfBlock(DcrReportBlockDetail dcrReportBlockDetail, Floor floor) {
        if (floor.getUnits() != null && !floor.getUnits().isEmpty()) {
        	if(floor.getUnits() != null)
            	dcrReportBlockDetail.setTotalUnits(dcrReportBlockDetail.getTotalUnits().add(BigDecimal.valueOf(floor.getUnits().size())));
			/*
			 * Map<String, Map<String, Integer>> unitMap = new ConcurrentHashMap<>();
			 * Map<String, Integer> unitCount = new ConcurrentHashMap<>();
			 */
			/*
			 * for (FloorUnit unit : floor.getUnits()) {
			 * dcrReportBlockDetail.setTotalUnits(dcrReportBlockDetail.getTotalUnits().add(
			 * BigDecimal.ONE));
			 * 
			 * String occName = unit.getOccupancy().getTypeHelper().getType().getName();
			 * String occCode = unit.getOccupancy().getTypeHelper().getType().getCode();
			 * 
			 * if (occCode.equals(A1)) { if (unitMap.containsKey(occName)) { Map<String,
			 * Integer> unitCountExist = unitMap.get(occName); unitCountExist.put(A1_UNITS,
			 * unitCountExist.get(A1_UNITS) + 1); unitMap.put(occName, unitCountExist); }
			 * else { unitCount.put(A1_UNITS, 1); unitMap.put(occName, unitCount); } } if
			 * (occCode.equals(A4)) { if (unitMap.containsKey(occName)) { Map<String,
			 * Integer> unitCountExist = unitMap.get(occName); unitCountExist.put(A4_UNITS,
			 * unitCountExist.get(A4_UNITS) + 1); unitMap.put(occName, unitCountExist); }
			 * else { unitCount.put(A4_UNITS, 1); unitMap.put(occName, unitCount); } } if
			 * (occCode.equals(A2) || occCode.equals(F3)) { if
			 * (unit.getOccupancy().getWithAttachedBath()) { if
			 * (unitMap.containsKey(occName) && unitMap.get(occName).containsKey(ROOM_WAB))
			 * { Map<String, Integer> unitCountExist = unitMap.get(occName);
			 * unitCountExist.put(ROOM_WAB, unitCountExist.get(ROOM_WAB) + 1);
			 * unitMap.put(occName, unitCountExist); } else { unitCount.put(ROOM_WAB, 1);
			 * unitMap.put(occName, unitCount); }
			 * dcrReportBlockDetail.setUnitsWithAttachBath(
			 * dcrReportBlockDetail.getUnitsWithAttachBath().add(BigDecimal.ONE)); } if
			 * (unit.getOccupancy().getWithOutAttachedBath()) { if
			 * (unitMap.containsKey(occName) && unitMap.get(occName).containsKey(ROOM_WOAB))
			 * { Map<String, Integer> unitCountExist = unitMap.get(occName);
			 * unitCountExist.put(ROOM_WOAB, unitCountExist.get(ROOM_WOAB) + 1);
			 * unitMap.put(occName, unitCountExist); } else { unitCount.put(ROOM_WOAB, 1);
			 * unitMap.put(occName, unitCount); }
			 * dcrReportBlockDetail.setUnitsWithoutAttachBath(
			 * dcrReportBlockDetail.getUnitsWithoutAttachBath().add(BigDecimal.ONE)); } if
			 * (unit.getOccupancy().getWithDinningSpace()) { if
			 * (unitMap.containsKey(occName) && unitMap.get(occName).containsKey(DINE_ROOM))
			 * { Map<String, Integer> unitCountExist = unitMap.get(occName);
			 * unitCountExist.put(DINE_ROOM, unitCountExist.get(DINE_ROOM) + 1);
			 * unitMap.put(occName, unitCountExist); } else { unitCount.put(DINE_ROOM, 1);
			 * unitMap.put(occName, unitCount); }
			 * dcrReportBlockDetail.setUnitsWithDinningRoom(
			 * dcrReportBlockDetail.getUnitsWithDinningRoom().add(BigDecimal.ONE)); } }
			 * 
			 * }
			 */
			/*
			 * if (dcrReportBlockDetail.getUnits().isEmpty()) {
			 * dcrReportBlockDetail.setUnits(unitMap); } else { Map<String, Map<String,
			 * Integer>> existUnits = dcrReportBlockDetail.getUnits(); for
			 * (Map.Entry<String, Map<String, Integer>> occUnit : unitMap.entrySet()) { if
			 * (existUnits.containsKey(occUnit.getKey())) { for (Map.Entry<String, Integer>
			 * unitCnt : occUnit.getValue().entrySet()) { if
			 * (existUnits.get(occUnit.getKey()).containsKey(unitCnt.getKey())) {
			 * existUnits.get(occUnit.getKey()).put(unitCnt.getKey(),
			 * existUnits.get(occUnit.getKey()).get(unitCnt.getKey()) + unitCnt.getValue());
			 * } else { existUnits.get(occUnit.getKey()).put(unitCnt.getKey(),
			 * unitCnt.getValue()); } } } else { Map<String, Integer> unit = new
			 * ConcurrentHashMap<>(); for (Map.Entry<String, Integer> unitCnt :
			 * occUnit.getValue().entrySet()) { unit.put(unitCnt.getKey(),
			 * unitCnt.getValue()); } existUnits.put(occUnit.getKey(), unit); } }
			 * dcrReportBlockDetail.setUnits(existUnits); }
			 */
			/*
			 * for (Map.Entry<String, Map<String, Integer>> occupancyMap :
			 * unitMap.entrySet()) { for (Map.Entry<String, Integer> units :
			 * occupancyMap.getValue().entrySet()) { DcrReportFloorUnitDetail floorUnit =
			 * new DcrReportFloorUnitDetail(); if
			 * (A1_UNITS.equalsIgnoreCase(units.getKey())) {
			 * floorUnit.setDescription(KITCHEN_UNITS);
			 * floorUnit.setFloorNo(String.valueOf(floor.getNumber()));
			 * floorUnit.setOccupancy(occupancyMap.getKey());
			 * floorUnit.setUnits(BigDecimal.valueOf(units.getValue())); } else if
			 * (A4_UNITS.equalsIgnoreCase(units.getKey())) {
			 * floorUnit.setDescription(FLOOR_UNITS);
			 * floorUnit.setFloorNo(String.valueOf(floor.getNumber()));
			 * floorUnit.setOccupancy(occupancyMap.getKey());
			 * floorUnit.setUnits(BigDecimal.valueOf(units.getValue())); } else if
			 * (ROOM_WAB.equalsIgnoreCase(units.getKey())) {
			 * floorUnit.setDescription("Rooms With Attached BathRoom");
			 * floorUnit.setFloorNo(String.valueOf(floor.getNumber()));
			 * floorUnit.setOccupancy(occupancyMap.getKey());
			 * floorUnit.setUnits(BigDecimal.valueOf(units.getValue())); } else if
			 * (ROOM_WOAB.equalsIgnoreCase(units.getKey())) {
			 * floorUnit.setDescription("Rooms Without Attached BathRoom");
			 * floorUnit.setFloorNo(String.valueOf(floor.getNumber()));
			 * floorUnit.setOccupancy(occupancyMap.getKey());
			 * floorUnit.setUnits(BigDecimal.valueOf(units.getValue())); } else if
			 * (DINE_ROOM.equalsIgnoreCase(units.getKey())) {
			 * floorUnit.setDescription("Dinning Rooms");
			 * floorUnit.setFloorNo(String.valueOf(floor.getNumber()));
			 * floorUnit.setOccupancy(occupancyMap.getKey());
			 * floorUnit.setUnits(BigDecimal.valueOf(units.getValue())); }
			 * dcrReportBlockDetail.getDcrReportFloorUnitDetails().add(floorUnit); }
			 * 
			 * }
			 */
        }
    }
    
    private Subreport getBlkFloorUnitDetails(DcrReportBlockDetail dcrReportBlockDetail, boolean isProposed) {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            AbstractColumn floorNo = ColumnBuilder.getNew()
                    .setColumnProperty("floorNo", String.class.getName())
                    .setTitle("Floor").setWidth(120)
                    .build();

            AbstractColumn occupancy = ColumnBuilder.getNew()
                    .setColumnProperty("occupancy", String.class.getName())
                    .setTitle("Occupancy").setWidth(120)
                    .build();

            AbstractColumn description = ColumnBuilder.getNew()
                    .setColumnProperty("description", String.class.getName())
                    .setTitle("Description").setWidth(170)
                    .build();

            AbstractColumn units = ColumnBuilder.getNew()
                    .setColumnProperty("units", BigDecimal.class.getName())
                    .setTitle("Unit in Numbers").setWidth(120)
                    .setStyle(reportService.getNumberStyle())
                    .build();

            frb.addGlobalFooterVariable(units, DJCalculation.SUM, reportService.getNumberStyle());

            frb.addColumn(floorNo);
            frb.addColumn(occupancy);
            frb.addColumn(description);
            frb.addColumn(units);

            if (dcrReportBlockDetail.getBlockNo() != null && isProposed) {
                frb.setTitle("Block No " + dcrReportBlockDetail.getBlockNo() +
                        " - Unit Details");
                StringBuilder totalUnitsText = new StringBuilder();
                int orderNo = 0;
                boolean show = false;
                if (dcrReportBlockDetail.getUnitsWithAttachBath().doubleValue() > 0
                        || dcrReportBlockDetail.getUnitsWithoutAttachBath().doubleValue() > 0
                        || dcrReportBlockDetail.getUnitsWithDinningRoom().doubleValue() > 0)
                    show = true;
                if (dcrReportBlockDetail.getTotalUnits().doubleValue() > 0 && show) {
                    orderNo = 1;
                    totalUnitsText.append(orderNo).append(". Total Units ")
                            .append(dcrReportBlockDetail.getTotalUnits().intValue())
                            .append(NUMBERS).append(" Includes,").append("\\n");
                }
                if (dcrReportBlockDetail.getUnitsWithAttachBath().doubleValue() > 0) {
                    orderNo++;
                    totalUnitsText.append(orderNo).append(". Units With Attached Bathroom ")
                            .append(dcrReportBlockDetail.getUnitsWithAttachBath().intValue())
                            .append(NUMBERS).append("\\n");
                }
                if (dcrReportBlockDetail.getUnitsWithoutAttachBath().doubleValue() > 0) {
                    orderNo++;
                    totalUnitsText.append(orderNo).append(". Units Without Attached Bathroom ")
                            .append(dcrReportBlockDetail.getUnitsWithoutAttachBath().intValue())
                            .append(NUMBERS).append("\\n");
                }
                if (dcrReportBlockDetail.getUnitsWithDinningRoom().doubleValue() > 0) {
                    orderNo++;
                    totalUnitsText.append(orderNo).append(". Units With Dinning Room ")
                            .append(dcrReportBlockDetail.getUnitsWithDinningRoom().intValue())
                            .append(NUMBERS);
                }
                if (totalUnitsText.length() > 0) {
                    AutoText autoText = new AutoText(totalUnitsText.toString(),
                            AutoText.POSITION_FOOTER, HorizontalBandAlignment.LEFT, 530);
                    autoText.setHeight(50);
                    autoText.setStyle(reportService.getTotalNumberStyle());
                    frb.addAutoText(autoText);
                }
            }

            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setHeaderHeight(5);
            frb.setTopMargin(10);
            frb.setBottomMargin(0);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(),
                    reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            if (isProposed) {
                sub.setDatasource(new DJDataSource("Block No -" + dcrReportBlockDetail.getBlockNo(),
                        DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            }
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    private List<ReportOccupancyFloorUnit> buildUnitsOfPlot(List<DcrReportBlockDetail> blockDetails) {
        List<ReportOccupancyFloorUnit> plotFloorUnits = new LinkedList<>();
        for (DcrReportBlockDetail block : blockDetails) {
            for (Map.Entry<String, Map<String, Integer>> blockMap : block.getUnits().entrySet()) {
                ReportOccupancyFloorUnit blockUnit = new ReportOccupancyFloorUnit();
                blockUnit.setOccupancy(blockMap.getKey());
                blockUnit.setUnitCount(BigDecimal
                        .valueOf(blockMap.getValue().entrySet().stream().map(m -> m.getValue()).reduce(0, Integer::sum)));
                plotFloorUnits.add(blockUnit);
            }
        }
        return plotFloorUnits;
    }
    
    private Subreport getTotalUnitDetails() {
        try {

            FastReportBuilder frb = new FastReportBuilder();

            AbstractColumn occupancy = ColumnBuilder.getNew()
                    .setColumnProperty("occupancy", String.class.getName())
                    .setTitle("Occupancy").setWidth(120)
                    .setStyle(reportService.getBldgDetlsHeaderStyle())
                    .build();

            AbstractColumn units = ColumnBuilder.getNew()
                    .setColumnProperty("unitCount", BigDecimal.class.getName())
                    .setTitle("Unit in Numbers").setWidth(120)
                    .setStyle(reportService.getNumberStyle())
                    .build();
            frb.addColumn(occupancy);
            frb.addColumn(units);
            frb.setTitle(TOTAL_FLOOR_UNITS);
            frb.setTitleStyle(reportService.getTitleStyle());
            frb.setHeaderHeight(5);
            frb.setTopMargin(5);
            frb.setDefaultStyles(reportService.getTitleStyle(), reportService.getSubTitleStyle(),
                    reportService.getColumnHeaderStyle(),
                    reportService.getDetailStyle());
            frb.setAllowDetailSplit(false);
            frb.setPageSizeAndOrientation(Page.Page_A4_Portrait());
            frb.setGrandTotalLegend(TOTAL);
            frb.setGrandTotalLegendStyle(reportService.getNumberStyle());
            DynamicReport build = frb.build();
            Subreport sub = new Subreport();
            sub.setDynamicReport(build);
            Style style = new Style();
            style.setStretchWithOverflow(true);
            style.setStreching(RELATIVE_TO_BAND_HEIGHT);
            sub.setStyle(style);
            sub.setDatasource(new DJDataSource(TOTAL_FLOOR_UNITS, DJConstants.DATA_SOURCE_ORIGIN_PARAMETER, 0));
            sub.setLayoutManager(new ClassicLayoutManager());
            return sub;
        } catch (ColumnBuilderException e) {
            e.printStackTrace();
        }
        return null;
    }
}
