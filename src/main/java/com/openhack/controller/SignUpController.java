package com.openhack.controller;

import com.openhack.services.LoginService;
import com.openhack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private EmailActivationLink emailActivationLink;

    private ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/signup", method = {RequestMethod.POST})
    public ResponseEntity<?> postSignUp(@RequestParam(value = "name",required = true) String name,
                                        @RequestParam(value = "screenname",required = true)  String screenname,
                                        @RequestParam(value = "email",required = true) String email,
                                        @RequestParam(value = "password",required = true) String password,
                                        @RequestParam(value = "usertype", required = false,defaultValue = "hacker") String userType){

        ResponseEntity responseEntity;

        responseEntity = userService.createUser(name,screenname,email,userType,"registered");
        if(responseEntity.getStatusCode() != HttpStatus.OK){
            System.out.println("called######");
            return new ResponseEntity<>(responseEntity,responseHeader.getHeader(),HttpStatus.CREATED);
        }

        responseEntity = loginService.createLogin(email,password);
        if(responseEntity.getStatusCode() != HttpStatus.OK){
            return new ResponseEntity<>(responseEntity,responseHeader.getHeader(),HttpStatus.CREATED);
        }

        //emailActivationLink.sendActivationLink(email);



        return new ResponseEntity<>(ResponseEntity.ok().body("Please activate account using link sent to email"),responseHeader.getHeader(), HttpStatus.CREATED);

    }

}
