
package org.egov.edcr;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.entity.edcr.EdcrPdfDetail;
import org.egov.common.entity.edcr.PlanFeature;
import org.egov.edcr.feature.DxfToPdfConverterExtract;
import org.egov.edcr.feature.PlanInfoFeatureExtract;
import org.egov.edcr.service.ExtractService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnit44Runner;

@RunWith(MockitoJUnit44Runner.class)
public class DxfToPdfExtractTest extends BaseTest {

	//private static final Logger LOG = Logger.getLogger(DxfToPdfExtractTest.class); 
	DxfToPdfConverterExtract dxfToPdfExtract = new DxfToPdfConverterExtract();

	@Before
	public void setUp() throws Exception {
		dxfFile = "SAMPLE_6_APARTMENT_REVSION_10.dxf";
		
		super.setUp();
	}

	/*@Test
	public final void testExtract() {
		
		String appconfigValue="BLK_*_ELEVATION_NO_*_PRINT,A0,2,LANDSCAPE#BLK_*_ELEVATION_NO_*_PRINT:MAD";

		Map<String, String> dxfLayerNamesInFile = new HashMap<String, String>();
		List<PlanFeature> features=new ArrayList<>();
		PlanFeature pf = new PlanFeature(PlanInfoFeatureExtract.class);
        features.add(pf);
	     
       
		
		ExtractService exs=new ExtractService();
		exs.extract(f, null, null, features);
		PlanInfoFeatureExtract ex=new PlanInfoFeatureExtract();
		ex.extract(pl);

		List<EdcrPdfDetail> pdfLayerNames = dxfToPdfExtract.getPdfLayerNames(pl, appconfigValue, dxfLayerNamesInFile);
		System.out.println("pdfname ");
		for(EdcrPdfDetail detail:pdfLayerNames)
		{
			System.out.println("pdfname :"+detail.getLayer() + " List Of Layers " +detail.getLayers());
	 
			
			
		}
		
	}*/

}
