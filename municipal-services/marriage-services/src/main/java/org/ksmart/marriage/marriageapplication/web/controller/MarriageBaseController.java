package org.ksmart.marriage.marriageapplication.web.controller;

import javax.validation.Valid;

// import org.egov.filemgmnt.util.FMConstants;
// import org.egov.filemgmnt.web.models.RequestInfoWrapper;
// import org.egov.filemgmnt.web.models.arisingfile.ArisingFileRequest;
// import org.egov.filemgmnt.web.models.arisingfile.ArisingFileResponse;
// import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
// import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchResponse;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationResponse;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.egov.tracer.model.ErrorRes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Marriage Application")
@Validated
interface MarriageApplicationBaseController {

    @Operation(summary = "Create  Marriage Application.",
               description = "",
               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                             schema = @Schema(implementation = MarriageDetailsRequest.class)),
                                          required = true),
               responses = {
                       @ApiResponse(responseCode = "200",
                                    description = "Marriage application created successfully",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = MarriageApplicationResponse.class))),
                       @ApiResponse(responseCode = "400",
                                    description = "Bad marriage application service request",
                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                                       schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<MarriageApplicationResponse> saveMarriageDetails(@Valid MarriageDetailsRequest request);

//    @Operation(summary = "Update arising file.",
//               description = "",
//               requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
//                                                             schema = @Schema(implementation = ArisingFileRequest.class)),
//                                          required = true),
//               responses = {
//                       @ApiResponse(responseCode = "200",
//                                    description = "Arising file updated successfully",
//                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
//                                                       schema = @Schema(implementation = ArisingFileResponse.class))),
//                       @ApiResponse(responseCode = "400",
//                                    description = "Bad arising file service request",
//                                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
//                                                       schema = @Schema(implementation = ErrorRes.class))) })
//    ResponseEntity<ArisingFileResponse> update(@Valid ArisingFileRequest request);

    // @Operation(summary = "Search arising files with the given query parameters.",
    //            description = "",
    //            requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
    //                                                          schema = @Schema(implementation = RequestInfoWrapper.class)),
    //                                       required = true),
    //            parameters = {
    //                    @Parameter(in = ParameterIn.QUERY,
    //                               name = "tenantId",
    //                               required = true,
    //                               allowEmptyValue = false,
    //                               description = "Tenant identification number",
    //                               schema = @Schema(type = "string",
    //                                                pattern = FMConstants.PATTERN_TENANT,
    //                                                accessMode = Schema.AccessMode.READ_ONLY)),
    //                    @Parameter(in = ParameterIn.QUERY,
    //                               name = "fileCode",
    //                               required = false,
    //                               allowEmptyValue = true,
    //                               description = "File code",
    //                               schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)),
    //                    @Parameter(in = ParameterIn.QUERY,
    //                               name = "fromDate",
    //                               required = false,
    //                               allowEmptyValue = true,
    //                               description = "Arising file date, search from",
    //                               schema = @Schema(type = "integer",
    //                                                format = "int64",
    //                                                accessMode = Schema.AccessMode.READ_ONLY)),
    //                    @Parameter(in = ParameterIn.QUERY,
    //                               name = "toDate",
    //                               required = false,
    //                               allowEmptyValue = true,
    //                               description = "Arising file date, search to",
    //                               schema = @Schema(type = "integer",
    //                                                format = "int64",
    //                                                accessMode = Schema.AccessMode.READ_ONLY)),
    //                    @Parameter(in = ParameterIn.QUERY,
    //                               name = "fileStatus",
    //                               required = false,
    //                               allowEmptyValue = true,
    //                               description = "File status",
    //                               schema = @Schema(type = "string", accessMode = Schema.AccessMode.READ_ONLY)) },
    //            responses = {
    //                    @ApiResponse(responseCode = "200",
    //                                 description = "Arising file(s) retrieved successfully",
    //                                 content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
    //                                                    schema = @Schema(implementation = ArisingFileSearchResponse.class))),
    //                    @ApiResponse(responseCode = "400",
    //                                 description = "Bad arising file search request",
    //                                 content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
    //                                                    schema = @Schema(implementation = ErrorRes.class))) })
    // ResponseEntity<ArisingFileSearchResponse> search(@Valid RequestInfoWrapper request,
    //                                                  @Valid ArisingFileSearchCriteria searchCriteria);
}
