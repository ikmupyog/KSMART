package org.ksmart.marriage.common.repository.builder;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CommonQueryBuilder {

	private static final String QUERY_BRIDE_DETAILS = new StringBuilder()
			.append("mbd.id as bd_id,mbd.residentship as bd_residentship,mbd.adharno as bd_adharno,mbd.passportno as bd_passportno,")
			.append("mbd.socialsecurityno as bd_socialsecurityno,mbd.firstname_en as bd_firstname_en,mbd.firstname_mal as bd_firstname_mal,mbd.middlename_en as bd_middlename_en,")
			.append("mbd.fathername_mal as bd_fathername_mal,mbd.middlename_mal as bd_middlename_mal,mbd.lastname_en as bd_lastname_en,mbd.lastname_mal as bd_lastname_mal,mbd.mobile as bd_mobile,")
			.append("mbd.emailid as bd_emailid,mbd.gender as bd_gender,mbd.dateofbirth as bd_dateofbirth,mbd.age as bd_age,mbd.parent_guardian as bd_parent_guardian,mbd.fathername_en as bd_fathername_en,")
			.append("mbd.mothername_en as bd_mothername_en,mbd.mothername_mal as bd_mothername_mal,mbd.father_adharno as bd_father_adharno,mbd.mother_adharno as bd_mother_adharno,")
			.append("mbd.guardianname_en as bd_guardianname_en,mbd.guardianname_mal as bd_guardianname_mal,mbd.guardian_adhar as bd_guardian_adhar,mbd.profession_en as bd_profession_en,")
			.append("mbd.profession_mal as bd_profession_mal,mbd.maritalstatusid as bd_maritalstatusid,mbd.is_spouse_living as bd_is_spouse_living,mbd.no_of_spouse_living as bd_no_of_spouse_living,")
			.append("mbd.marriageid as bd_marriageid,mbd.photo_url as bd_photo_url,mbd.createdtime as bd_createdtime,mbd.createdby as bd_createdby,mbd.lastmodifiedtime as bd_lastmodifiedtime,mbd.lastmodifiedby as bd_lastmodifiedby").toString();


	public String getQueryBrideDetails() {
		return QUERY_BRIDE_DETAILS;
	}


}





