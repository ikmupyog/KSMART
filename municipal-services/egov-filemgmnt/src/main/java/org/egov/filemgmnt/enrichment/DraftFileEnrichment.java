package org.egov.filemgmnt.enrichment;

import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileAddress;
import org.egov.filemgmnt.web.models.draftfile.DraftFileReference;
import org.egov.filemgmnt.web.models.draftfile.DraftFileRequest;
import org.springframework.stereotype.Component;

@Component
public class DraftFileEnrichment extends BaseEnrichment {

    public void enrichCreate(final DraftFileRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        final DraftFile file = request.getDraftFile();

        file.setId(UUID.randomUUID()
                       .toString());
        file.setAuditDetails(auditDetails);

        //Enrich Draft Reference
        final List <DraftFileReference> draftFileReference= file.getDraftFileReference();


//        final Map<String, DraftFileReference> existingDraftFileReference = file.getDraftFileReference()
//                .stream()
//                .collect(Collectors.toMap(DraftFileReference::getId,
//                        Function.identity()));

        file.getDraftFileReference()
                 .forEach(reference -> {
                             reference.setId(UUID.randomUUID()
                                     .toString());
                             if (StringUtils.isNotBlank(reference.getId())) {
                                 reference.setDraftId(file.getId());
                                 reference.setFileCode(file.getFileCode());

                                 reference.setAuditDetails(auditDetails);

                             } else {
                                 reference.setId(UUID.randomUUID()
                                         .toString());
                                 reference.setDraftId(file.getId());
                                 reference.setFileCode(file.getFileCode());
                                 reference.setAuditDetails(buildAuditDetails(userInfo.getUuid(), Boolean.TRUE));
                             }
                 });

        //Enrich Draft Address
        final List <DraftFileAddress> draftFileAddress=file.getDraftFileAddress();
//         final Map<String, DraftFileAddress> existingDraftFileAddress = file.getDraftFileAddress()
//                             .stream()
//                             .collect(Collectors.toMap(DraftFileAddress::getId,
//                                     Function.identity()));
         file.getDraftFileAddress()
                 .forEach(draftAddress -> {
                     draftAddress.setId(UUID.randomUUID()
                             .toString());
                     if (StringUtils.isNotBlank(draftAddress.getId())) {
                         draftAddress.setDraftId(file.getId());
                         draftAddress.setFileCode(file.getFileCode());
                         draftAddress.setAuditDetails(auditDetails);
                     } else {
                         draftAddress.setId(UUID.randomUUID()
                                 .toString());
                         draftAddress.setDraftId(file.getId());
                         draftAddress.setFileCode(file.getFileCode());
                         draftAddress.setAuditDetails(buildAuditDetails(userInfo.getUuid(), Boolean.TRUE));
                     }
                 });

                 }
    public void enrichUpdate(final DraftFileRequest request) {

        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        final DraftFile file = request.getDraftFile();

        file.setAuditDetails(auditDetails);
    }
}
