package com.openhack.controller;

import com.openhack.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login", method = {RequestMethod.GET})
    public ResponseEntity<?> getLogin(@RequestParam(value = "email",required = true) String email,
                                      @RequestParam(value = "password",required = true) String password){

        ResponseEntity responseEntity = loginService.readLogin(email,password);
        return responseEntity;

    }
}