package com.translator.controller;

import com.translator.common.model.RequestInfoWrapper;
import com.translator.service.TranslatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/translator")
public class TranslatorController {
   	@Autowired
    TranslatorService translatorService;
@GetMapping(value = {"/translate"})
    public void translateToMalayalam(@RequestBody RequestInfoWrapper request, @ModelAttribute String words) {
     translatorService.translateMalayalam(words, request.getRequestInfo());
}

}
