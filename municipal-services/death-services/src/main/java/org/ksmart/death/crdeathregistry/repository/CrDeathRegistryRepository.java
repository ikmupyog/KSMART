package org.ksmart.death.crdeathregistry.repository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.crdeath.kafka.producer.CrDeathProducer;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.repository.querybuilder.CrDeathRgistryQueryBuilder;
import org.ksmart.death.crdeathregistry.repository.rowmapper.CrDeathRegistryRowMapper;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryConstants;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryMdmsUtil;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathPdfResp;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;

import ch.qos.logback.core.joran.conditional.ThenAction;
import lombok.extern.slf4j.Slf4j;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on 05.12.2022
     */
@Slf4j
@Repository
public class CrDeathRegistryRepository {
    
    private final JdbcTemplate jdbcTemplate;
    private final CrDeathRgistryQueryBuilder queryBuilder;
    private final CrDeathRegistryRowMapper rowMapper;
    //RAkhi S on 19.12.2022
    private final CrDeathProducer producer;

    @Autowired
	private CrDeathRegistryConfiguration config;

    @Autowired
    private RestTemplate restTemplate;

    //rakhi s on 23.12.2022
    @Autowired
    CrDeathRegistryMdmsUtil util;

    @Autowired
    CrDeathRegistryRepository(JdbcTemplate jdbcTemplate, CrDeathRgistryQueryBuilder queryBuilder,
                            CrDeathRegistryRowMapper rowMapper,CrDeathProducer producer,
                            CrDeathRegistryMdmsUtil util) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.producer = producer;
        this.util = util;
        
    }

    public List<CrDeathRegistryDtl> getDeathApplication(CrDeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<CrDeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; // NOPMD
    }
    //UPDATE
    // public String getDeathRegNoold(String tenantId,int  Year) {
        
    //    List<Object> preparedStmtValues = new ArrayList<>();
    //    String result=null;

    //    String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
    //    List<Map<String,Object>> regno= jdbcTemplate.queryForList(query);
    //    if (regno.size()>1) {
    //      result=String.valueOf(regno.get(0).get("regno"))+"/"+String.valueOf(Year);
    //    }
    //    else{
    //      result="1/"+String.valueOf(Year);
    //    }
    //    System.out.println("JasmineRegNo"+regno);
    //   // regno.put("result",result);
    //    return result; 
    // }

    public List<Map<String, Object>>  getDeathRegDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
       // String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
       String query = queryBuilder.getDeathRegNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
       // List<> regDetails = jdbcTemplate.query(query, preparedStmtValues.toArray());
        return regDetails; 
     }

     //Rakhi S on 16.12.2022
    public DeathPdfResp saveDeathCertPdf(DeathPdfApplicationRequest pdfApplicationRequest) {
        DeathPdfResp  result= new DeathPdfResp();
        try {
            SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");	
			pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
				String uiHost = config.getUiAppHost();
				String deathCertPath = config.getDeathCertLink();
				deathCertPath = deathCertPath.replace("$id",cert.getId());
				deathCertPath = deathCertPath.replace("$tenantId",cert.getTenantId());
				deathCertPath = deathCertPath.replace("$regNo",cert.getRegistrationNo());
				deathCertPath = deathCertPath.replace("$dateofdeath",format.format(cert.getDateOfDeath()));
				deathCertPath = deathCertPath.replace("$gender",cert.getDeceasedGender().toString());
                
                // cert.setDeathACKNo("DR/CRT/01/2022");
				deathCertPath = deathCertPath.replace("$deathcertificateno",cert.getDeathACKNo());

				String finalPath = uiHost + deathCertPath;
                //RAkhi S on 23.12.2022 MDMS Call
                Object mdmsData = util.mDMSCallCertificate(pdfApplicationRequest.getRequestInfo(), cert.getTenantId());
                //Rakhi S on 24.12.2022
                 Map<String,List<String>> masterData = getAttributeValues(mdmsData);
                 String[] masterArray = {CrDeathRegistryConstants.TENANTS};
                 String lbName = masterData.get(CrDeathRegistryConstants.TENANTS).toString();
                 lbName = lbName.replaceAll("[\\[\\]\\(\\)]", "");
                 cert.setLocalBodyName(lbName);
                
                //Rakhi S on 16.12.2022
                cert.setFullName(cert.getDeceasedTitle() + 
                                cert.getDeceasedFirstNameMl() + 
                                cert.getDeceasedMiddleNameMl() + 
                                cert.getDeceasedLastNameMl() + " / " +
                                cert.getDeceasedFirstNameEn() +
                                cert.getDeceasedMiddleNameEn() +
                                cert.getDeceasedLastNameEn() );

                cert.setGender(cert.getDeceasedGender());

                cert.setMotherName(cert.getFemaleDependentTitle()+
                                    cert.getFemaleDependentNameMl()+" / "+
                                    cert.getFemaleDependentNameEn());  
        
                cert.setMaledependentname(cert.getMaleDependentTitle()+
                                            cert.getMaleDependentNameMl()+" / "+
                                            cert.getMaleDependentNameEn());

                cert.setPresentAddressFullEn(cert.getAddressInfo().getPresentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPresentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getHoueNameEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStreetNameEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCityEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getLocalityEn()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCountryId());  

                cert.setPresentAddressFullMl(cert.getAddressInfo().getPresentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPresentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getHoueNameMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStreetNameMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCityMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getLocalityMl()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPresentAddress().getCountryId());
                                            
                cert.setPermanentAddressFullEn(cert.getAddressInfo().getPermanentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPermanentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getHoueNameEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStreetNameEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCityEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getLocalityEn()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCountryId());  

                cert.setPermanentAddressFullMl(cert.getAddressInfo().getPermanentAddress().getResidenceAsscNo() + " "+
                                            cert.getAddressInfo().getPermanentAddress().getHouseNo()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getHoueNameMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStreetNameMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCityMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getLocalityMl()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getDistrictId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getStateId()+ " "+
                                            cert.getAddressInfo().getPermanentAddress().getCountryId());

                cert.setRegistrationDate(cert.getRegistrationDate());
                cert.setLocalBodyName(cert.getLocalBodyName());
                cert.setEmbeddedUrl(getShortenedUrl(finalPath));
            });
            // log.info(new Gson().toJson(pdfApplicationRequest));

            DeathPdfApplicationRequest req = DeathPdfApplicationRequest.builder().deathCertificate(pdfApplicationRequest.getDeathCertificate()).requestInfo(pdfApplicationRequest.getRequestInfo()).build();
                
            pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
            String uiHost = config.getEgovPdfHost();
            String deathCertPath = config.getEgovPdfDeathEndPoint();
            String tenantId = cert.getTenantId().split("\\.")[0];
            deathCertPath = deathCertPath.replace("$tenantId",tenantId);
            String pdfFinalPath = uiHost + deathCertPath;
            DeathPdfResp response = restTemplate.postForObject(pdfFinalPath, req, DeathPdfResp.class);

            if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                        "No file store id found from pdf service");
            }
            result.setFilestoreIds(response.getFilestoreIds());
			});	
        }
        catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("PDF_ERROR","Error in generating PDF");
		}
		return result;
  
    }
    //Rakhi S on 16.12.2022
    public String getShortenedUrl(String url){
		HashMap<String,String> body = new HashMap<>();
		body.put("url",url);
		StringBuilder builder = new StringBuilder(config.getUrlShortnerHost());
		builder.append(config.getUrlShortnerEndpoint());
		String res = restTemplate.postForObject(builder.toString(), body, String.class);
		if(StringUtils.isEmpty(res)){
			log.error("URL_SHORTENING_ERROR","Unable to shorten url: "+url);
			return url;
		}
		else return res;
	}

    //Rakhi S IKM on 19.12.2022
    public void save(DeathCertRequest deathCertRequest) {
  	    producer.push(config.getSaveDeathTopic(), deathCertRequest);
	}
    //Rakhi S ikm on 24.12.2022
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH, 
        CrDeathRegistryConstants.COMMON_MASTER_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }


}
