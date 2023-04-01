//package org.ksmart.marriage.common.repository.builder;
//
//import lombok.extern.slf4j.Slf4j;
//import org.apache.kafka.common.protocol.types.Field;
//import org.springframework.stereotype.Component;
//
//@Slf4j
//@Component
//public class CommonQueryBuilder {
//
//	private static final String QUERY_BRIDE_DETAILS = new StringBuilder()
//			.append("mbd.id as bd_id,mbd.residentship as bd_residentship,mbd.adharno as bd_adharno,mbd.passportno as bd_passportno,")
//			.append("mbd.socialsecurityno as bd_socialsecurityno,mbd.firstname_en as bd_firstname_en,mbd.firstname_mal as bd_firstname_mal,mbd.middlename_en as bd_middlename_en,")
//			.append("mbd.fathername_mal as bd_fathername_mal,mbd.middlename_mal as bd_middlename_mal,mbd.lastname_en as bd_lastname_en,mbd.lastname_mal as bd_lastname_mal,mbd.mobile as bd_mobile,")
//			.append("mbd.emailid as bd_emailid,mbd.gender as bd_gender,mbd.dateofbirth as bd_dateofbirth,mbd.age as bd_age,mbd.parent_guardian as bd_parent_guardian,mbd.fathername_en as bd_fathername_en,")
//			.append("mbd.mothername_en as bd_mothername_en,mbd.mothername_mal as bd_mothername_mal,mbd.father_adharno as bd_father_adharno,mbd.mother_adharno as bd_mother_adharno,")
//			.append("mbd.guardianname_en as bd_guardianname_en,mbd.guardianname_mal as bd_guardianname_mal,mbd.guardian_adhar as bd_guardian_adhar,mbd.profession_en as bd_profession_en,")
//			.append("mbd.profession_mal as bd_profession_mal,mbd.maritalstatusid as bd_maritalstatusid,mbd.is_spouse_living as bd_is_spouse_living,mbd.no_of_spouse_living as bd_no_of_spouse_living,")
//			.append("mbd.marriageid as bd_marriageid,mbd.photo_url as bd_photo_url,mbd.createdtime as bd_createdtime,mbd.createdby as bd_createdby,mbd.lastmodifiedtime as bd_lastmodifiedtime,mbd.lastmodifiedby as bd_lastmodifiedby").toString();
//
//
//	private static final String QUERY_GROOM_DETAILS = new StringBuilder()
//			.append("mrd.id as gd_id,mrd.residentship as gd_residentship,mrd.adharno as gd_adharno,mrd.passportno as gd_passportno,mrd.socialsecurityno as gd_socialsecurityno,mrd.firstname_en as gd_firstname_en,mrd.firstname_mal as gd_firstname_mal,")
//			.append("mrd.middlename_en as gd_middlename_en,mrd.middlename_mal as gd_middlename_mal,mrd.lastname_en as gd_lastname_en,mrd.lastname_mal as gd_lastname_mal,mrd.mobile as gd_mobile,mrd.emailid as gd_emailid,mrd.gender as gd_gender,")
//			.append("mrd.dateofbirth as gd_dateofbirth,mrd.age as gd_age,mrd.parent_guardian as gd_parent_guardian,mrd.fathername_en as gd_fathername_en,mrd.fathername_mal as gd_fathername_mal,mrd.mothername_en as gd_mothername_en,")
//			.append("mrd.mothername_mal as gd_mothername_mal,mrd.father_adharno as gd_father_adharno,mrd.mother_adharno as gd_mother_adharno,mrd.guardianname_en as gd_guardianname_en,mrd.guardianname_mal as gd_guardianname_mal,")
//			.append("mrd.profession_en as gd_profession_en,mrd.profession_mal as gd_profession_mal,mrd.maritalstatusid as gd_maritalstatusid,mrd.guardian_adhar as gd_guardian_adhar,")
//			.append("mrd.is_spouse_living as gd_is_spouse_living,mrd.no_of_spouse_living as gd_no_of_spouse_living,mrd.marriageid as gd_marriageid,mrd.photo_url as gd_photo_url")
//			.toString();
//
//	private static final String QUERY_PRESENTADDRESS_DETAILS = new StringBuilder()
//			.append("mpress.id as pes_id,mpress.houseno as pes_houseno,mpress.housename_no_en as pes_housename_no_en,mpress.housename_no_ml as pes_housename_no_ml,mpress.villageid as pes_villageid,mpress.village_name as pes_village_name,")
//			.append("mpress.talukid as pes_talukid,mpress.taluk_name as pes_taluk_name,mpress.ward_code as pes_ward_code,mpress.doorno as pes_doorno,mpress.locality_en as pes_locality_en,mpress.locality_ml as pes_locality_ml,mpress.street_name_en as pes_street_name_en,")
//			.append("mpress.street_name_ml as pes_street_name_ml,mpress.districtid as pes_districtid,mpress.stateid as pes_stateid,mpress.poid as pes_poid,mpress.pinno as pes_pinno,mpress.countryid as pes_countryid,mpress.marriageid as pes_marriageid")
//			.toString();
//
//
//	private static final String QUERY_PERMANENTADDRESS_DETAILS = new StringBuilder()
//			.append("mper.id as per_id,mper.houseno as per_houseno,mper.housename_no_en as per_housename_no_en,mper.housename_no_ml as per_housename_no_ml,mper.villageid as per_villageid,mper.village_name as per_village_name,")
//			.append("mper.talukid as per_talukid,mper.taluk_name as per_taluk_name,mper.ward_code as per_ward_code,mper.doorno as per_doorno,mper.locality_en as per_locality_en,mper.locality_ml as per_locality_ml,mper.street_name_en as per_street_name_en,")
//			.append("mper.street_name_ml as per_street_name_ml,mper.districtid as per_districtid,mper.stateid as per_stateid,mper.poid as per_poid,mper.pinno as per_pinno,mper.countryid as per_countryid,mper.marriageid as per_marriageid")
//			.toString();
//
//	private static final String QUERY_WITNESS_DETAILS = new StringBuilder()
//			.append("mwd.id as wd_id,mwd.adharno as wd_adharno,mwd.name_en as wd_name_en,mwd.name_mal as wd_name_mal,mwd.age as wd_age,mwd.address_en as wd_address_en,mwd.address_mal as wd_address_mal,mwd.mobile as wd_mobile,mwd.is_message_received as wd_is_message_received,")
//			.append("mwd.is_esigned as wd_is_esigned,mwd.marriageid as wd_marriageid,mwd.w2_adharno as wd_w2_adharno,mwd.w2_name_en as wd_w2_name_en,mwd.w2_name_mal as wd_w2_name_mal,mwd.w2_age as wd_w2_age,mwd.w2_address_en as wd_w2_address_en,")
//			.append("mwd.w2_address_mal as wd_w2_address_mal,mwd.w2_mobile as wd_w2_mobile,mwd.w2_is_message_received as wd_w2_is_message_received,mwd.w2_is_esigned as wd_w2_is_esigned")
//			.toString();
//
//	public String getQueryBrideDetails() {
//
//		return QUERY_BRIDE_DETAILS;
//	}
//	public String getGroomDetails(){
//
//		return QUERY_GROOM_DETAILS;
//	}
//
// 	public String getPresentAddressDetails(){
//
//		return QUERY_PRESENTADDRESS_DETAILS;
//	}
//
//	public String getPermanentAddressDetails(){
//
//		return QUERY_PERMANENTADDRESS_DETAILS;
//	}
//
//	public  String getWitnessDetails(){
//
//		return QUERY_WITNESS_DETAILS;
//	}
//}
//
//
//
//
//
