package com.openhack.controller;

import com.openhack.services.ActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserActivationController {

    @Autowired
    private ActivationService activationService;

    private ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/activate", method = {RequestMethod.GET})
    public ResponseEntity<?> userActivation(@RequestParam(value = "email",required = true) String email){

        ResponseEntity responseEntity = activationService.activateUserAccount(email);

        return responseEntity;
    }
}
