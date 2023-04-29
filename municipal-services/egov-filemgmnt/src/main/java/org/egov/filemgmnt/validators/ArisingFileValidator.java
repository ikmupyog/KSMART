package org.egov.filemgmnt.validators;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ArisingFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArisingFileValidator {

    @Autowired
    private FMConfiguration fmConfig;

    private final ArisingFileRepository repository;
    private final MdmsValidator mdmsValidator;

    ArisingFileValidator(final ArisingFileRepository repository, final MdmsValidator mdmsValidator) {

        this.repository = repository;
        this.mdmsValidator = mdmsValidator;
    }

//    public void validateArisingFileUpdate(ArisingFileRequest request, List<ArisingFile> searchResult) {
//        List<ArisingFile> files = request.getArisingFileDetail();
//
//        if (CollectionUtils.isEmpty(files)) {
//            throw new CustomException(REQUIRED.getCode(), "Communication file is required.");
//        }
//        if (files.size() > 1) { // NOPMD
//            throw new CustomException(INVALID_UPDATE.getCode(),
//                    "Supports only single communication file update requset.");
//
//        }
//        if (files.size() != searchResult.size()) {
//            throw new CustomException(INVALID_UPDATE.getCode(), "Arising file(s) not found in database.");
//
//        }
//    }
//
}
