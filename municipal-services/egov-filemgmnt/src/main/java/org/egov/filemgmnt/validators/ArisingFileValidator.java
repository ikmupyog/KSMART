package org.egov.filemgmnt.validators;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ArisingFileRepository;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ArisingFileValidator {

    private final ArisingFileRepository arisingFileRepository;
    private final FMConfiguration fmConfig;
    private final MdmsValidator mdmsValidator;

    public ArisingFileValidator(ArisingFileRepository arisingFileRepository, FMConfiguration fmConfig,
                                MdmsValidator mdmsValidator) {

        this.arisingFileRepository = arisingFileRepository;
        this.fmConfig = fmConfig;
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
