package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicantPersonalRowMapper implements ResultSetExtractor<List<ApplicantPersonal>>, BaseRowMapper {

    @Override
    public List<ApplicantPersonal> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD
        final List<ApplicantPersonal> result = new ArrayList<>();

        while (rs.next()) {
            result.add(getApplicantPersonal(rs));
        }
        return result;
    }

//    @Override
//    public List<ApplicantPersonal> extractData2(ResultSet rs) throws SQLException, DataAccessException { // NOPMD
//
//        List<ApplicantPersonal> result = new ArrayList<>();
//        while (rs.next()) {
//            FileDetail file = FileDetail.builder()
//                                        .fileCode(rs.getString("filecode"))
//                                        .build();
//            ApplicantChild child = ApplicantChild.builder()
//                                                 .ownerNameMal(rs.getString("ownernamemal"))
//                                                 .ownerAddressMal(rs.getString("owneraddressmal"))
//                                                 .durationOfResidenceInYears(rs.getString("durationofresidenceinyears"))
//                                                 .durationOfResidenceInMonths(rs.getString("durationofresidenceinmonths"))
//                                                 .build();
//            ApplicantAddress address = ApplicantAddress.builder()
//                                                       .wardNo(rs.getString("wardno"))
//                                                       .buildingNo(rs.getString("buildingno"))
//                                                       .houseName(rs.getString("housename"))
//                                                       .localPlace(rs.getString("localplace"))
//                                                       .mainPlace(rs.getString("mainplace"))
//                                                       .build();
//            ApplicantServiceDetail service = ApplicantServiceDetail.builder()
//                                                                   .serviceMinorType(rs.getString("serviceminortype"))
//                                                                   .build();
//
//            ApplicantServiceDocument applicantservicedoc = ApplicantServiceDocument.builder()
//                                                                                   .documentTypeId(rs.getString("documenttypeid"))
//                                                                                   .fileStoreId(rs.getString("filestoreid"))
//                                                                                   .build();
//            ApplicantDocument applicantdoc = ApplicantDocument.builder()
//                                                              .documentTypeId(rs.getString("documenttypeid"))
//                                                              .documentNumber(rs.getString("documentnumber"))
//                                                              .build();
//
//            result.add(ApplicantPersonal.builder()
//                                        .id(rs.getString("id"))
//                                        .aadhaarNo(rs.getString("aadhaarno"))
//                                        .email(rs.getString("email"))
//                                        .firstName(rs.getString("firstname"))
//                                        .lastName(rs.getString("lastname"))
//                                        .title(rs.getString("title"))
//                                        .mobileNo(rs.getString("mobileno"))
//                                        .tenantId(rs.getString("tenantid"))
//                                        .auditDetails(getAuditDetails(rs))
//                                        .fileDetail(file)
//                                        .applicantChild(child)
//                                        .applicantAddress(address)
//
//                                        .serviceDetails(service)
//                                        .build());
//        }
//
//        return result;
//    }
}
