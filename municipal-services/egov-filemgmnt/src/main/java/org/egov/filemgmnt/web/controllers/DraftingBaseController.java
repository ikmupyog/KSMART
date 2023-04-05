package org.egov.filemgmnt.web.controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.egov.filemgmnt.web.models.drafting.DraftingResponse;
import org.egov.tracer.model.ErrorRes;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

@Tag(name="Drafting")
interface DraftingBaseController {
    @Operation(summary = "Create Drafting Details.",
            description = "",
            requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = DraftingRequest.class)),
                    required = true),
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "Draft details created successfully",
                            content = @Content(mediaType = "Drafting/json",
                                    schema = @Schema(implementation = DraftingResponse.class))),
                    @ApiResponse(responseCode = "400",
                            description = "Bad file service request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<DraftingResponse> create(@Valid DraftingRequest request);
    @Operation(summary = "Update Drafting Details.",
            description = "",
            requestBody = @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = DraftingRequest.class)),
                    required = true),
            responses = {
                    @ApiResponse(responseCode = "200",
                            description = "Drafting details updated successfully",
                            content = @Content(mediaType = "Drafting/json",
                                    schema = @Schema(implementation = DraftingResponse.class))),
                    @ApiResponse(responseCode = "400",
                            description = "Bad request",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorRes.class))) })
    ResponseEntity<DraftingResponse> update(@Valid DraftingRequest request);
}
